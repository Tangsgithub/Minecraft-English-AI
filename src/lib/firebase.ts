import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc
} from 'firebase/firestore';
import { UserProfile } from '../types';
import firebaseConfigData from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigData);
export const auth = getAuth(app);
export const db = getFirestore(
  app, 
  firebaseConfigData.firestoreDatabaseId || '(default)'
);

export const saveUserProfileToCloud = async (profile: UserProfile, userUid?: string): Promise<boolean> => {
  const uid = userUid || auth.currentUser?.uid;
  if (!uid) return false;

  try {
    const userDocRef = doc(db, 'users', uid);
    const cleanProfileData = {
      ...profile,
      uid,
      email: auth.currentUser?.email || '',
      updatedAt: new Date().toISOString()
    };
    await setDoc(userDocRef, cleanProfileData, { merge: true });
    return true;
  } catch (err) {
    console.error('Error saving profile to Firestore:', err);
    return false;
  }
};

export const fetchUserProfileFromCloud = async (uid: string): Promise<UserProfile | null> => {
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

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
export type { User };
