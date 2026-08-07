import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function main() {
  const email = "576299576@qq.com";
  const safeDocId = email.toLowerCase().trim().replace(/[^a-zA-Z0-9_.-]/g, '_');
  console.log("SafeDocId:", safeDocId);
  const indexRef = doc(db, 'user_accounts', safeDocId);
  const indexSnap = await getDoc(indexRef);
  if (indexSnap.exists()) {
    console.log("Index doc exists:", indexSnap.data());
  } else {
    console.log("Index doc not found");
  }

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const snap = await getDocs(q);
  console.log("Found in users:", snap.size);
  snap.forEach(doc => {
    console.log(doc.id, "=>", doc.data());
  });
  
  process.exit(0);
}
main();
