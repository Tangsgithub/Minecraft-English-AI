const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

code = code.replace(/      \}\n\n      \} else \{/g, '      } else {');

fs.writeFileSync('src/components/AuthModal.tsx', code);
