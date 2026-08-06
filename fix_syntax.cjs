const fs = require('fs');
let content = fs.readFileSync('src/data/nceBook1FullVocab.ts', 'utf8');
content = content.replace('export const NCE_BOOK1_FULL_VOCAB: NCEVocabEntry[\n', 'export const NCE_BOOK1_FULL_VOCAB: NCEVocabEntry[] = [\n');
fs.writeFileSync('src/data/nceBook1FullVocab.ts', content);
console.log('Fixed syntax 2!');
