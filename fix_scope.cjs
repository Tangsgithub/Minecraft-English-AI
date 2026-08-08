const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/async function startServer\(\) \{/, 'const app = express();\nasync function startServer() {');
code = code.replace(/const app = express\(\);\n\s*app\.use\(express\.json\(\)\);/g, 'app.use(express.json());');

fs.writeFileSync('server.ts', code);
console.log('Fixed scope');
