import { UserProfile } from '../types';

export interface User {
  uid: string;
  email: string | null;
}

export const auth: { currentUser: User | null } = { currentUser: null };
export const db: any = null;

export const saveUserProfileToCloud = async (
  profile: UserProfile, 
  userUid?: string, 
  password?: string
) => {
  const uid = userUid || auth.currentUser?.uid || profile.id;
  if (!uid) return false;

  try {
    const resp = await fetch('/api/user/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, uid })
    });
    if (resp.ok) {
        const data = await resp.json();
        if (data.success) return true;
      } else {
        console.warn('Request failed with status:', resp.status);
      }
  } catch (e) {
    console.warn('Server proxy save profile error:', e);
  }
  return false;
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  try {
    const resp = await fetch(`/api/user/get-profile?uid=${encodeURIComponent(uid)}`);
    if (resp.ok) {
        const data = await resp.json();
        if (data.profile) return data.profile as UserProfile;
      }
  } catch (e) {
    console.warn('Server proxy get profile error:', e);
  }
  return null;
};

export const checkUserExistsInFirestore = async (
  email: string, 
  nickname?: string
): Promise<{ exists: boolean; reason?: 'email' | 'nickname' }> => {
  const cleanEmail = email.toLowerCase().trim();
  try {
    const resp = await fetch('/api/auth/check-dup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, nickname })
    });
    if (resp.ok) {
        return await resp.json();
      } else {
        try {
          const errData = await resp.json();
          return errData;
        } catch (e) {
          console.warn('Non-JSON error response:', resp.status);
          return null;
        }
      }
  } catch (e) {
    console.warn('Server proxy check-dup error:', e);
  }
  return { exists: false };
};

export const findUserAccountByEmail = async (email: string): Promise<any | null> => {
  const cleanEmail = email.toLowerCase().trim();
  try {
    const resp = await fetch(`/api/user/get-profile?email=${encodeURIComponent(cleanEmail)}`);
    if (resp.ok) {
        const data = await resp.json();
        if (data.profile) return { profile: data.profile, email: cleanEmail };
      }
  } catch (e) {
    console.warn('Server proxy find account error:', e);
  }
  return null;
};

export const updateUserPassword = async (
  email: string,
  newPassword: string,
  oldPasswordVerification?: string
): Promise<{ success: boolean; message: string }> => {
  const cleanEmail = email.toLowerCase().trim();
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
    console.warn('Server proxy change-password error:', e);
  }
  return { success: false, message: '修改密码失败：网络连接异常，请重试！' };
};

export const serverProxyLogin = async (email: string, password: string) => {
  try {
    const resp = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (resp.ok) {
        return await resp.json();
      } else {
        try {
          const errData = await resp.json();
          return errData;
        } catch (e) {
          console.warn('Non-JSON error response:', resp.status);
          return null;
        }
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
      } else {
        try {
          const errData = await resp.json();
          return errData;
        } catch (e) {
          console.warn('Non-JSON error response:', resp.status);
          return null;
        }
      }
  } catch (e) {
    console.warn('Server proxy register error:', e);
  }
  return null;
};

export const signInWithEmailAndPassword = async () => {
  throw new Error("Local auth disabled. Use server proxy.");
};

export const createUserWithEmailAndPassword = async () => {
  throw new Error("Local auth disabled. Use server proxy.");
};

export const signOut = async (authObj?: any) => {
  auth.currentUser = null;
  localStorage.removeItem('mc_english_user_profile');
};

export const onAuthStateChanged = (authObj: any, callback: any) => {
  // Call once with null immediately
  setTimeout(() => callback(null), 0);
  return () => {};
};

export const updatePassword = async () => {
  throw new Error("Local auth disabled. Use server proxy.");
};
