const fs = require('fs');
let code = fs.readFileSync('server/auth.ts', 'utf8');

// Replace fs.readFileSync with dynamic import or just standard import.
// Since it's TS, we can just replace the try/catch block.
const tryBlockRegex = /try \{\s*const configPath = path\.join\(process\.cwd\(\), 'firebase-applet-config\.json'\);[\s\S]*?\} catch \(e\) \{\s*console\.error\('\[Server Firestore Proxy\] Initialization Error:', e\);\s*\}/;

const newCode = `
try {
  // Use a relative require/import that Vercel can statically analyze and bundle
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  let configData;
  if (fs.existsSync(configPath)) {
    configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } else {
    // Fallback for Vercel Serverless environment where process.cwd() might differ
    configData = require('../firebase-applet-config.json');
  }

  if (configData) {
    const app = initializeApp(configData);
    db = getFirestore(app, configData.firestoreDatabaseId || '(default)');
    console.log('[Server Firestore Proxy] Initialized successfully');
  }
} catch (e) {
  console.error('[Server Firestore Proxy] Initialization Error:', e);
}
`;

code = code.replace(tryBlockRegex, newCode);
if (!code.includes('require(')) { // if regex failed
    console.log("Regex failed");
} else {
    // need to add require support in ES module or use dynamic import.
    // wait, package.json is type: module! require is not defined.
}
