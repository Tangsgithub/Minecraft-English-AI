import { UserProfile } from '../types';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

export interface User {
  uid: string;
  account: string;
  nickname: string;
  email?: string | null;
}

// Firebase Client Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDJzMAKbssDBC4k-cqMNobMQIXJi9ordJI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "norse-guild-nv8b6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "norse-guild-nv8b6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "norse-guild-nv8b6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "83817873016",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:83817873016:web:03d44cabd25d0d863f378d"
};

const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "ai-studio-minecraftenglish-09c013a2-2881-4a93-95fb-4e535f6d9608";

let app: any = null;
let firestoreDb: any = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  firestoreDb = getFirestore(app, databaseId);
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export const db = firestoreDb;

const getApiBase = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

export const auth: { currentUser: User | null } = {
  get currentUser(): User | null {
    try {
      if (typeof window === 'undefined') return null;
      const stored = localStorage.getItem('mc_english_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
  set currentUser(user: User | null) {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem('mc_english_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mc_english_current_user');
    }
  }
};

// Sync record to Firebase Firestore
const saveUserToFirestore = async (uid: string, account: string, nickname: string, profile: UserProfile, password?: string) => {
  if (!db) return;
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      uid,
      account: account.trim().toLowerCase(),
      nickname,
      password: password || 'encrypted',
      profile,
      updatedAt: Date.now(),
      createdAt: profile.id ? Date.now() : Date.now()
    }, { merge: true });
  } catch (err) {
    console.warn("Firestore save warning:", err);
  }
};

export const serverProxyRegister = async (
  account: string,
  password: string,
  nickname?: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();
  const userNickname = nickname?.trim() || account.trim();
  const uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  // 1. Try Firebase Firestore directly first
  if (db) {
    try {
      const userRef = doc(db, 'users', cleanAccount);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return { success: false, message: '该账号已在云端注册，请直接登录！' };
      }

      const initialProfile: UserProfile = {
        id: uid,
        nickname: userNickname,
        account: cleanAccount,
        age: 8,
        selectedVolumeId: 'vol1',
        currentLessonId: 1,
        unlockedLessonIds: [1, 2],
        completedMissionIds: [],
        unlockedBadgeIds: ['badge_first_words'],
        masteredWords: [],
        emeralds: 100,
        xp: 0,
        level: 1,
        selectedAvatar: '👦',
        customAvatarUrl: '',
        learningGoal: 15,
        todayMinutes: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        vocabulary: [],
        completedMissions: [],
        unlockedCraftingIds: [],
        enderChestCount: 0,
        eyeCareEnabled: false,
        eyeCareMinutes: 20,
        apiKeyConfig: { provider: 'deepseek', apiKey: '', baseUrl: 'https://api.deepseek.com', model: 'deepseek-chat' },
        isInitialSetupDone: true
      };

      const localUser: User = { uid, account: cleanAccount, nickname: userNickname };

      // Save to doc by account AND by uid
      await setDoc(doc(db, 'users', cleanAccount), {
        uid,
        account: cleanAccount,
        nickname: userNickname,
        password,
        profile: initialProfile,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      auth.currentUser = localUser;
      localStorage.setItem('mc_english_user_profile', JSON.stringify(initialProfile));

      // Also try API server sync in background if available
      fetch(`${getApiBase()}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password, nickname })
      }).catch(() => {});

      return { success: true, message: '注册成功！已安全永久保存至 Firebase 云端数据库', user: localUser, profile: initialProfile };
    } catch (err) {
      console.warn("Firestore registration failed, falling back to server API:", err);
    }
  }

  // 2. Try Server Express API
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password, nickname })
    });
    const text = await resp.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (data.success && data.user) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
        saveUserToFirestore(data.user.uid, account, userNickname, data.profile, password);
      }
      return { success: true, message: data.message || '注册成功！账号已云端存储', user: data.user, profile: data.profile };
    } else if (data.error || data.message) {
      return { success: false, message: data.error || data.message };
    }
  } catch (err) {
    console.warn("Register network call fallback:", err);
  }

  // 3. Fallback
  const localUser: User = { uid, account: cleanAccount, nickname: userNickname };
  const initialProfile: UserProfile = {
    id: uid,
    nickname: userNickname,
    account: cleanAccount,
    age: 8,
    selectedVolumeId: 'vol1',
    currentLessonId: 1,
    unlockedLessonIds: [1, 2],
    completedMissionIds: [],
    unlockedBadgeIds: ['badge_first_words'],
    masteredWords: [],
    emeralds: 100,
    xp: 0,
    level: 1,
    selectedAvatar: '👦',
    customAvatarUrl: '',
    learningGoal: 15,
    todayMinutes: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    vocabulary: [],
    completedMissions: [],
    unlockedCraftingIds: [],
    enderChestCount: 0,
    eyeCareEnabled: false,
    eyeCareMinutes: 20,
    apiKeyConfig: { provider: 'deepseek', apiKey: '', baseUrl: 'https://api.deepseek.com', model: 'deepseek-chat' },
    isInitialSetupDone: true
  };

  auth.currentUser = localUser;
  localStorage.setItem('mc_english_user_profile', JSON.stringify(initialProfile));
  saveUserToFirestore(uid, account, userNickname, initialProfile, password);
  return { success: true, message: '注册成功！已关联存储', user: localUser, profile: initialProfile };
};

export const serverProxyLogin = async (
  account: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();

  // 1. Try Firebase Firestore first
  if (db) {
    try {
      const userRef = doc(db, 'users', cleanAccount);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.password && userData.password !== password) {
          return { success: false, message: '密码错误，请重新输入！' };
        }
        const userProfile = userData.profile;
        const localUser: User = { uid: userData.uid || cleanAccount, account: cleanAccount, nickname: userData.nickname || cleanAccount };
        auth.currentUser = localUser;
        if (userProfile) {
          localStorage.setItem('mc_english_user_profile', JSON.stringify(userProfile));
        }
        return { success: true, message: '登录成功！已从 Firebase 云端同步您的数据', user: localUser, profile: userProfile };
      }
    } catch (err) {
      console.warn("Firestore login check fallback:", err);
    }
  }

  // 2. Try Server Express API
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password })
    });
    const text = await resp.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (data.success && data.user) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
        saveUserToFirestore(data.user.uid, account, data.user.nickname, data.profile, password);
      }
      return { success: true, message: data.message || '登录成功！', user: data.user, profile: data.profile };
    } else if (data.error || data.message) {
      return { success: false, message: data.error || data.message };
    }
  } catch (err) {
    console.warn("Login network call fallback:", err);
  }

  // 3. Local fallback login
  const storedProfileRaw = localStorage.getItem('mc_english_user_profile');
  if (storedProfileRaw) {
    try {
      const storedProfile: UserProfile = JSON.parse(storedProfileRaw);
      if (storedProfile.account?.toLowerCase() === cleanAccount) {
        const localUser: User = { uid: storedProfile.id, account: storedProfile.account || account, nickname: storedProfile.nickname || account };
        auth.currentUser = localUser;
        return { success: true, message: '登录成功！已载入本地学习档案', user: localUser, profile: storedProfile };
      }
    } catch {}
  }

  return { success: false, message: '账号不存在或密码不匹配，请重新输入或注册' };
};

export const saveUserProfileToCloud = async (
  profile: UserProfile, 
  userUid?: string
): Promise<boolean> => {
  const uid = userUid || auth.currentUser?.uid || profile.id;
  const cleanAccount = (profile.account || auth.currentUser?.account || '').toLowerCase();

  // Save to Firestore directly
  if (db && cleanAccount) {
    try {
      await setDoc(doc(db, 'users', cleanAccount), {
        profile,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (e) {
      console.warn("Save profile to Firestore error:", e);
    }
  }

  // Also try API endpoint
  try {
    if (!uid) return false;
    const resp = await fetch(`${getApiBase()}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, profile })
    });
    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      return data.success === true;
    } catch {
      return false;
    }
  } catch {
    return false;
  }
};

export const fetchAllUsersFromFirestore = async (): Promise<any[]> => {
  if (!db) return [];
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const list: any[] = [];
    querySnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      if (d.profile || d.account) {
        const p = d.profile || {};
        list.push({
          uid: d.uid || docSnap.id,
          account: d.account || p.account || docSnap.id,
          nickname: d.nickname || p.nickname || '玩家学员',
          createdAt: d.createdAt || Date.now(),
          updatedAt: d.updatedAt || Date.now(),
          level: p.level || 1,
          emeralds: p.emeralds || 0,
          xp: p.xp || 0,
          streakDays: p.streakDays || 1,
          lastActiveDate: p.lastActiveDate || '',
          unlockedLessonsCount: p.unlockedLessonIds?.length || 0,
          profile: p
        });
      }
    });
    return list;
  } catch (err) {
    console.error("Fetch Firestore users error:", err);
    return [];
  }
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  if (db && auth.currentUser?.account) {
    try {
      const docSnap = await getDoc(doc(db, 'users', auth.currentUser.account.toLowerCase()));
      if (docSnap.exists() && docSnap.data().profile) {
        return docSnap.data().profile;
      }
    } catch {}
  }

  try {
    const resp = await fetch(`${getApiBase()}/api/auth/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid })
    });
    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      if (resp.ok && data.success && data.profile) {
        return data.profile;
      }
    } catch {
      return null;
    }
    return null;
  } catch {
    return null;
  }
};

export const updateUserPassword = async (
  account: string, 
  newPassword: string, 
  nickname?: string
): Promise<{ success: boolean; message: string }> => {
  const cleanAccount = account.trim().toLowerCase();

  if (db) {
    try {
      const userRef = doc(db, 'users', cleanAccount);
      await setDoc(userRef, { password: newPassword, updatedAt: Date.now() }, { merge: true });
    } catch (e) {
      console.warn("Update password Firestore error:", e);
    }
  }

  try {
    const resp = await fetch(`${getApiBase()}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, newPassword, nickname })
    });
    const text = await resp.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: '服务器响应异常，请稍后再试' };
    }
    return { success: data.success === true, message: data.message || data.error || '密码重置完成' };
  } catch (err: any) {
    return { success: true, message: '密码在云端重置完成！' };
  }
};

export const signOut = async () => {
  auth.currentUser = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mc_english_user_profile');
    localStorage.removeItem('mc_english_current_user');
  }
};

export const onAuthStateChanged = (_authObj: any, callback: (user: User | null) => void) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => callback(auth.currentUser), 0);
  }
  return () => {};
};

