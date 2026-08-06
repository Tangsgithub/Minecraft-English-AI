import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const app = initializeApp({ credential: applicationDefault() });
const db = getFirestore();
db.collection('users').limit(1).get().then(snap => {
  console.log('Success!', snap.size);
  process.exit(0);
}).catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
