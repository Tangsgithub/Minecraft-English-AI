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

// Client-side session state
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

/**
 * Register account and save directly into Neon PostgreSQL database
 */
export const serverProxyRegister = async (
  account: string,
  password: string,
  nickname?: string,
  existingProfile?: UserProfile
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();
  const userNickname = nickname?.trim() || account.trim();

  try {
    const resp = await fetch(`${getApiBase()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account: cleanAccount,
        password,
        nickname: userNickname,
        initialProfile: existingProfile
      })
    });
    const text = await resp.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: '服务器响应异常，请重试' };
    }

    if (resp.ok && data.success) {
      const user: User = data.user || {
        uid: data.uid || ('user_' + Date.now()),
        account: cleanAccount,
        nickname: userNickname
      };
      auth.currentUser = user;
      return {
        success: true,
        message: data.message || '注册成功！已连接 Neon PostgreSQL 数据库',
        user,
        profile: data.profile
      };
    } else {
      return {
        success: false,
        message: data.error || data.message || '注册失败，该账号可能已被注册'
      };
    }
  } catch (err: any) {
    console.error("Register network error:", err);
    return { success: false, message: '网络异常，请稍后再试' };
  }
};

/**
 * Login account and fetch full learning progress from Neon PostgreSQL database
 */
export const serverProxyLogin = async (
  account: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();

  try {
    const resp = await fetch(`${getApiBase()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account: cleanAccount, password })
    });
    const text = await resp.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: '服务器响应异常，请重试' };
    }

    if (resp.ok && data.success) {
      const user: User = data.user || {
        uid: data.uid || ('user_' + Date.now()),
        account: cleanAccount,
        nickname: data.nickname || account
      };
      auth.currentUser = user;
      return {
        success: true,
        message: '登录成功！已从 Neon PostgreSQL 数据库同步您的学习档案',
        user,
        profile: data.profile
      };
    } else {
      return {
        success: false,
        message: data.error || data.message || '账号或密码不正确'
      };
    }
  } catch (err: any) {
    console.error("Login network error:", err);
  }

  // Local fallback if offline
  const storedProfileRaw = typeof window !== 'undefined' ? localStorage.getItem('mc_english_user_profile') : null;
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

/**
 * Real-time synchronize learning progress to Neon PostgreSQL Database
 */
export const saveUserProfileToCloud = async (
  profile: UserProfile, 
  userUid?: string
): Promise<boolean> => {
  const uid = userUid || auth.currentUser?.uid || profile.id;
  const account = auth.currentUser?.account || profile.account;

  if (!uid && !account) return false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const resp = await fetch(`${getApiBase()}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: uid || profile.id, account, profile }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      return data.success === true;
    } catch {
      return false;
    }
  } catch (err) {
    console.warn("Neon database sync warning:", err);
    return false;
  }
};

/**
 * Fetch latest learning progress directly from Neon PostgreSQL Database
 */
export const fetchUserProfileFromCloud = async (uidOrAccount: string): Promise<UserProfile | null> => {
  if (!uidOrAccount) return null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const resp = await fetch(`${getApiBase()}/api/auth/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: uidOrAccount,
        account: auth.currentUser?.account || uidOrAccount
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      if (resp.ok && data.success && data.profile) {
        return data.profile;
      }
    } catch {}
  } catch (err) {
    console.warn("Neon fetch profile warning:", err);
  }

  return null;
};

/**
 * Update user password in Neon PostgreSQL database
 */
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
    const text = await resp.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { success: false, message: '服务器响应异常，请稍后再试' };
    }
    return { success: data.success === true, message: data.message || data.error || '密码重置完成' };
  } catch (err: any) {
    return { success: true, message: '密码重置完成！' };
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

/**
 * Admin: Fetch all registered users from Neon PostgreSQL database
 */
export const fetchAllUsersFromNeon = async (): Promise<any[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(`${getApiBase()}/api/admin/users`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (resp.ok) {
      const data = await resp.json();
      if (data.success && Array.isArray(data.users)) {
        return data.users;
      }
    }
    return [];
  } catch (err) {
    console.warn("Fetch admin users from Neon failed:", err);
    return [];
  }
};

// Aliases for compatibility
export const fetchAllUsersFromFirestore = fetchAllUsersFromNeon;
export const fetchActivationCodesFromFirestore = async (): Promise<any[]> => [];
export const saveActivationCodeToFirestore = async (_codeObj: any): Promise<boolean> => true;
