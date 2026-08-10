import { UserProfile } from '../types';

export interface User {
  uid: string;
  account: string;
  nickname: string;
  email?: string | null;
}

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

export const db: any = null;

export const serverProxyRegister = async (
  account: string,
  password: string,
  nickname?: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password, nickname })
    });
    const data = await resp.json();
    if (resp.ok && data.success) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
      }
      return { success: true, message: data.message, user: data.user, profile: data.profile };
    } else {
      return { success: false, message: data.error || data.message || '注册失败' };
    }
  } catch (err: any) {
    return { success: false, message: '网络连接失败，请重试 (' + (err?.message || '网络超时') + ')' };
  }
};

export const serverProxyLogin = async (
  account: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, password })
    });
    const data = await resp.json();
    if (resp.ok && data.success) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
      }
      return { success: true, message: data.message, user: data.user, profile: data.profile };
    } else {
      return { success: false, message: data.error || data.message || '登录失败' };
    }
  } catch (err: any) {
    return { success: false, message: '网络连接失败，请重试 (' + (err?.message || '网络超时') + ')' };
  }
};

export const saveUserProfileToCloud = async (
  profile: UserProfile, 
  userUid?: string
): Promise<boolean> => {
  try {
    const uid = userUid || auth.currentUser?.uid || profile.id;
    if (!uid) return false;
    const resp = await fetch(`${getApiBase()}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, profile })
    });
    const data = await resp.json();
    return data.success === true;
  } catch {
    return false;
  }
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid })
    });
    const data = await resp.json();
    if (resp.ok && data.success && data.profile) {
      return data.profile;
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
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account, newPassword, nickname })
    });
    const data = await resp.json();
    return { success: data.success === true, message: data.message || data.error || '密码重置完成' };
  } catch (err: any) {
    return { success: false, message: '网络请求失败：' + err.message };
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
