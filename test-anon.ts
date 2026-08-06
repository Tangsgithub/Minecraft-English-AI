import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);

signInAnonymously(auth).then(async cred => {
  console.log('Anonymous login success! UID:', cred.user.uid);
  process.exit(0);
}).catch(e => {
  console.error('Anon Auth Error:', e);
  process.exit(1);
});
