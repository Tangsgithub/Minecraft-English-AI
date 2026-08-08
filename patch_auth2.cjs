const fs = require('fs');
let code = fs.readFileSync('server/auth.ts', 'utf8');

const regex = /const configPath = path\.join\(process\.cwd\(\), 'firebase-applet-config\.json'\);/;
const replace = `
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, '../firebase-applet-config.json');
`;

if (code.match(regex)) {
   code = code.replace(regex, replace);
   // but wait, import { fileURLToPath } must be at top level
   code = `import { fileURLToPath } from 'url';\n` + code.replace("import { fileURLToPath } from 'url';", "");
   fs.writeFileSync('server/auth.ts', code);
   console.log("Patched server/auth.ts");
} else {
   console.log("Regex not matched");
}
