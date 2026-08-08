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
  return true;
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
  return null;
};

export const checkUserExistsInFirestore = async (
  email: string, 
  nickname?: string
): Promise<{ exists: boolean; reason?: 'email' | 'nickname' }> => {
  return { exists: false };
};

export const findUserAccountByEmail = async (email: string): Promise<any | null> => {
  return null;
};

export const updateUserPassword = async (): Promise<{ success: boolean; message: string }> => {
  return { success: false, message: '登录注册功能已取消' };
};

export const serverProxyLogin = async () => {
  return { success: false, message: '登录注册功能已取消' };
};

export const serverProxyRegister = async () => {
  return { success: false, message: '登录注册功能已取消' };
};

export const signInWithEmailAndPassword = async () => {
  throw new Error("Local auth disabled.");
};

export const createUserWithEmailAndPassword = async () => {
  throw new Error("Local auth disabled.");
};

export const signOut = async () => {
  auth.currentUser = null;
  localStorage.removeItem('mc_english_user_profile');
};

export const onAuthStateChanged = (_authObj: any, callback: any) => {
  setTimeout(() => callback(null), 0);
  return () => {};
};

export const updatePassword = async () => {
  throw new Error("Local auth disabled.");
};

