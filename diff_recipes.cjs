const fs = require('fs');
const content = fs.readFileSync('src/components/CraftingLabView.tsx', 'utf8');
const ids = [...content.matchAll(/id: '(recipe_[^']+)'/g)].map(m => m[1]);
const content2 = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');
const ids2 = [...content2.matchAll(/id: '(recipe_[^']+)'/g)].map(m => m[1]);

console.log('In CraftingLabView but not in data:', ids.filter(id => !ids2.includes(id)));
