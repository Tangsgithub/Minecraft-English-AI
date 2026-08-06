import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { UserProfile } from '../types';
import firebaseConfigData from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigData);
export const auth = getAuth(app);
export const db = getFirestore(
  app, 
  firebaseConfigData.firestoreDatabaseId || '(default)'
);

export const saveUserProfileToCloud = async (
  profile: UserProfile, 
  userUid?: string, 
  password?: string
): Promise<boolean> => {
  const uid = userUid || auth.currentUser?.uid || profile.id;
  if (!uid) return false;

  // 1. Try server proxy endpoint first (completely bypasses client network restrictions in China)
  try {
    const resp = await fetch('/api/user/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, uid })
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data.success) return true;
    }
  } catch (e) {
    console.warn('Server proxy save profile fallback to client SDK:', e);
  }

  // 2. Client SDK fallback
  try {
    const userDocRef = doc(db, 'users', uid);
    const cleanEmail = (profile.email || auth.currentUser?.email || '').toLowerCase().trim();
    
    const cleanProfileData = {
      ...profile,
      uid,
      email: cleanEmail,
      updatedAt: new Date().toISOString()
    };
    await setDoc(userDocRef, cleanProfileData, { merge: true });

    if (cleanEmail) {
      const accountIndexRef = doc(db, 'user_accounts', cleanEmail.replace(/[^a-zA-Z0-9_.-]/g, '_'));
      const accountData: any = {
        uid,
        email: cleanEmail,
        nickname: profile.nickname,
        profile: cleanProfileData,
        updatedAt: new Date().toISOString()
      };
      if (password) {
        accountData.password = password;
      }
      await setDoc(accountIndexRef, accountData, { merge: true });
    }

    return true;
  } catch (err) {
    console.error('Error saving profile to Firestore:', err);
    return false;
  }
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  // 1. Try server proxy endpoint first
  try {
    const resp = await fetch(`/api/user/get-profile?uid=${encodeURIComponent(uid)}`);
    if (resp.ok) {
      const data = await resp.json();
      if (data.profile) return data.profile as UserProfile;
    }
  } catch (e) {
    console.warn('Server proxy get profile fallback to client SDK:', e);
  }

  // 2. Client SDK fallback
  try {
    const userDocRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
  } catch (err) {
    console.error('Error fetching profile from Firestore:', err);
  }
  return null;
};

// Check if user account (email or nickname) already exists in Firestore for deduplication
export const checkUserExistsInFirestore = async (
  email: string, 
  nickname?: string
): Promise<{ exists: boolean; reason?: 'email' | 'nickname' }> => {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Try server proxy first
  try {
    const resp = await fetch('/api/auth/check-dup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, nickname })
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (e) {
    console.warn('Server proxy check-dup fallback to client SDK:', e);
  }

  // 2. Client SDK fallback
  const safeDocId = cleanEmail.replace(/[^a-zA-Z0-9_.-]/g, '_');
  try {
    const accountIndexRef = doc(db, 'user_accounts', safeDocId);
    const docSnap = await getDoc(accountIndexRef);
    if (docSnap.exists()) {
      return { exists: true, reason: 'email' };
    }

    const usersRef = collection(db, 'users');
    const qEmail = query(usersRef, where('email', '==', cleanEmail));
    const querySnapEmail = await getDocs(qEmail);
    if (!querySnapEmail.empty) {
      return { exists: true, reason: 'email' };
    }

    if (nickname) {
      const qNick = query(usersRef, where('nickname', '==', nickname.trim()));
      const querySnapNick = await getDocs(qNick);
      if (!querySnapNick.empty) {
        return { exists: true, reason: 'nickname' };
      }
    }
  } catch (err) {
    console.warn('Firestore deduplication check warning:', err);
  }

  return { exists: false };
};

// Find account by email in Firestore
export const findUserAccountByEmail = async (email: string): Promise<any | null> => {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Server proxy first
  try {
    const resp = await fetch(`/api/user/get-profile?email=${encodeURIComponent(cleanEmail)}`);
    if (resp.ok) {
      const data = await resp.json();
      if (data.profile) return { profile: data.profile, email: cleanEmail };
    }
  } catch (e) {
    console.warn('Server proxy find account fallback:', e);
  }

  // 2. Client SDK fallback
  const safeDocId = cleanEmail.replace(/[^a-zA-Z0-9_.-]/g, '_');
  try {
    const accountIndexRef = doc(db, 'user_accounts', safeDocId);
    const docSnap = await getDoc(accountIndexRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }

    const usersRef = collection(db, 'users');
    const qEmail = query(usersRef, where('email', '==', cleanEmail));
    const querySnap = await getDocs(qEmail);
    if (!querySnap.empty) {
      return querySnap.docs[0].data();
    }
  } catch (err) {
    console.error('Error finding user account by email:', err);
  }
  return null;
};

// Modify user password in Firestore and Firebase Auth
export const updateUserPassword = async (
  email: string,
  newPassword: string,
  oldPasswordVerification?: string
): Promise<{ success: boolean; message: string }> => {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Server proxy password update
  try {
    const resp = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, newPassword, oldPassword: oldPasswordVerification })
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data.success) return data;
      else if (data.message) return data;
    }
  } catch (e) {
    console.warn('Server proxy change-password fallback to client SDK:', e);
  }

  // 2. Client SDK fallback
  const safeDocId = cleanEmail.replace(/[^a-zA-Z0-9_.-]/g, '_');

  try {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
      } catch (authErr: any) {
        console.warn('Firebase Auth updatePassword failed:', authErr);
      }
    }

    const accountIndexRef = doc(db, 'user_accounts', safeDocId);
    const docSnap = await getDoc(accountIndexRef);

    if (docSnap.exists()) {
      const accData = docSnap.data();
      if (oldPasswordVerification && accData.password && accData.password !== oldPasswordVerification) {
        return { success: false, message: '旧密码输入错误，校验未通过！' };
      }

      await setDoc(accountIndexRef, { password: newPassword, updatedAt: new Date().toISOString() }, { merge: true });

      if (accData.uid) {
        const userDocRef = doc(db, 'users', accData.uid);
        await setDoc(userDocRef, { password: newPassword, updatedAt: new Date().toISOString() }, { merge: true });
      }

      return { success: true, message: '密码修改成功！数据库及云端已更新。' };
    } else {
      await setDoc(accountIndexRef, { email: cleanEmail, password: newPassword, updatedAt: new Date().toISOString() }, { merge: true });
      return { success: true, message: '密码更新成功！' };
    }
  } catch (err: any) {
    console.error('Update password error:', err);
    return { success: false, message: '修改密码失败: ' + (err.message || '网络连接超时') };
  }
};

// Server Proxy Login & Register High-Level Helpers
export const serverProxyLogin = async (email: string, password: string) => {
  try {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (e) {
    console.warn('Server proxy login error:', e);
  }
  return null;
};

export const serverProxyRegister = async (email: string, password: string, nickname: string, initialProfile: any) => {
  try {
    const resp = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nickname, initialProfile })
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (e) {
    console.warn('Server proxy register error:', e);
  }
  return null;
};

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
};
export type { User };


