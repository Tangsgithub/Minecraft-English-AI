const fs = require('fs');
let code = fs.readFileSync('server/auth.ts', 'utf8');

const target = /let db: any = null;\s*try \{\s*const __dirname = path\.dirname\(fileURLToPath\(import\.meta\.url\)\);\s*const configPath = path\.join\(__dirname, '\.\.\/firebase-applet-config\.json'\);\s*if \(fs\.existsSync\(configPath\)\) \{\s*const configData = JSON\.parse\(fs\.readFileSync\(configPath, 'utf8'\)\);\s*const app = initializeApp\(configData\);\s*db = getFirestore\(app, configData\.firestoreDatabaseId \|\| '\(default\)'\);\s*console\.log\('\[Server Firestore Proxy\] Initialized successfully with DB:', configData\.firestoreDatabaseId\);\s*\} else \{\s*console\.warn\('\[Server Firestore Proxy\] firebase-applet-config\.json not found'\);\s*\}\s*\} catch \(err\) \{\s*console\.error\('\[Server Firestore Proxy\] Initialization failed:', err\);\s*\}/;

const replacement = `
let db: any = null;
try {
  // Use absolute path fallback for Vercel, or try requiring it directly
  let configData;
  try {
     // Dynamic require so esbuild/Vercel tracks it if possible, or we fallback to reading it
     const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
     if (fs.existsSync(configPath)) {
       configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
     } else {
       const dirConfigPath = path.join(__dirname, '../firebase-applet-config.json');
       if (fs.existsSync(dirConfigPath)) {
         configData = JSON.parse(fs.readFileSync(dirConfigPath, 'utf8'));
       }
     }
  } catch (e) {
     console.warn("Could not read config via fs", e);
  }

  if (configData) {
    const app = initializeApp(configData);
    db = getFirestore(app, configData.firestoreDatabaseId || '(default)');
    console.log('[Server Firestore Proxy] Initialized successfully with DB:', configData.firestoreDatabaseId);
  } else {
    console.warn('[Server Firestore Proxy] firebase-applet-config.json not found');
  }
} catch (err) {
  console.error('[Server Firestore Proxy] Initialization failed:', err);
}
`;

if(code.match(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('server/auth.ts', code);
  console.log("Patched server/auth.ts for Vercel DB config");
} else {
  console.log("Regex didn't match.");
}
