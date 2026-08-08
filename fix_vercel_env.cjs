const fs = require('fs');
let code = fs.readFileSync('server/auth.ts', 'utf8');

const target = /let configData;\s*try \{/;
const replacement = `let configData;
  if (process.env.FIREBASE_APPLET_CONFIG) {
    try {
      configData = JSON.parse(process.env.FIREBASE_APPLET_CONFIG);
    } catch (e) {
      console.warn("Could not parse FIREBASE_APPLET_CONFIG env var", e);
    }
  }

  if (!configData) {
    try {`;

const target2 = /\}\s*catch \(e\) \{\s*console\.warn\("Could not read config via fs", e\);\s*\}/;
const replacement2 = `} catch (e) {
       console.warn("Could not read config via fs", e);
    }
  }`;

if (code.match(target) && code.match(target2)) {
  code = code.replace(target, replacement);
  code = code.replace(target2, replacement2);
  fs.writeFileSync('server/auth.ts', code);
  console.log("Patched server/auth.ts for FIREBASE_APPLET_CONFIG");
} else {
  console.log("Regex didn't match.");
}
