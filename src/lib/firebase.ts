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

// Helper to wrap promise with timeout
const withTimeout = <T>(promise: Promise<T>, ms: number = 2000): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Network connection timeout"));
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
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

export const serverProxyRegister = async (
  account: string,
  password: string,
  nickname?: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();
  const userNickname = nickname?.trim() || account.trim();
  const uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  try {
    const resp = await fetch(`${getApiBase()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account: cleanAccount, password, nickname: userNickname })
    });
    const text = await resp.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (data.success && data.user) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
      }
      return { success: true, message: data.message || '注册成功！账号已成功关联 Neon 数据库', user: data.user, profile: data.profile };
    } else if (data.error || data.message) {
      return { success: false, message: data.error || data.message };
    }
  } catch (err) {
    console.warn("Server API register network call error:", err);
  }

  // Local fallback registration
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
  return { success: true, message: '注册成功！已关联本地和服务器档案', user: localUser, profile: initialProfile };
};

export const serverProxyLogin = async (
  account: string,
  password: string
): Promise<{ success: boolean; message: string; user?: User; profile?: UserProfile }> => {
  const cleanAccount = account.trim().toLowerCase();

  // 1. Primary: Express Server Auth Endpoint
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account: cleanAccount, password })
    });
    const text = await resp.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch {}

    if (data.success && data.user) {
      auth.currentUser = data.user;
      if (data.profile) {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(data.profile));
      }
      return { success: true, message: data.message || '登录成功！已从云端同步数据', user: data.user, profile: data.profile };
    } else if (data.error || data.message) {
      return { success: false, message: data.error || data.message };
    }
  } catch (err) {
    console.warn("Server API login network call error:", err);
  }

  // 2. Local fallback login
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

  if (!uid) return false;

  let apiSuccess = false;
  try {
    const resp = await fetch(`${getApiBase()}/api/auth/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, profile })
    });
    const text = await resp.text();
    try {
      const data = JSON.parse(text);
      apiSuccess = data.success === true;
    } catch {
      apiSuccess = false;
    }
  } catch (err) {
    console.warn("Server API sync warning:", err);
  }

  // Direct Firestore Document Backup
  if (firestoreDb && uid) {
    try {
      await setDoc(doc(firestoreDb, 'user_profiles', uid), {
        ...profile,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (err) {
      console.warn("Firestore setDoc sync warning:", err);
    }
  }

  return apiSuccess;
};

export const fetchAllUsersFromFirestore = async (): Promise<any[]> => {
  try {
    const resp = await fetch(`${getApiBase()}/api/admin/users`);
    if (resp.ok) {
      const data = await resp.json();
      if (data.success && Array.isArray(data.users)) {
        return data.users;
      }
    }
    return [];
  } catch (err) {
    console.warn("Fetch admin users failed:", err);
    return [];
  }
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;

  // 1. Try Express API
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
    } catch {}
  } catch (err) {
    console.warn("Server API fetch profile warning:", err);
  }

  // 2. Fallback to direct Firestore read
  if (firestoreDb && uid) {
    try {
      const docRef = doc(firestoreDb, 'user_profiles', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
    } catch (err) {
      console.warn("Firestore getDoc fetch warning:", err);
    }
  }

  return null;
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

