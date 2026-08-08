const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/dotenv\.config\(\);\s*app\.use\(express\.json\(\)\);/, 'dotenv.config();\nconst app = express();\napp.use(express.json());');

fs.writeFileSync('server.ts', code);
console.log('Fixed scope 2');
