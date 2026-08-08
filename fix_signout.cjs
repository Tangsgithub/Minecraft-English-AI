const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf8');

code = code.replace(/export const signOut = async \(\) => \{/g, 'export const signOut = async (authObj?: any) => {');

fs.writeFileSync('src/lib/firebase.ts', code);
