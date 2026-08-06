import { checkUserExistsServer } from './server/auth.js';
console.log('Test:', await checkUserExistsServer('test@example.com'));
process.exit(0);
