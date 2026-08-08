const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// In api/chat
code = code.replace(
  /const apiKey = config\?\.apiKey \|\| process\.env\.GEMINI_API_KEY \|\| '';/g,
  "const apiKey = config?.apiKey || (provider === 'deepseek' ? process.env.DEEPSEEK_API_KEY : process.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';"
);

fs.writeFileSync('server.ts', code);
console.log("Patched server.ts for DEEPSEEK_API_KEY");
