import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

signInWithEmailAndPassword(auth, 'test@example.com', 'password123').then(async cred => {
  console.log('Logged in as:', cred.user.uid);
  const userRef = doc(db, 'users', cred.user.uid);
  const snap = await getDoc(userRef);
  console.log('User doc:', snap.data());
  process.exit(0);
}).catch(e => {
  console.error('Auth Error:', e);
  process.exit(1);
});
