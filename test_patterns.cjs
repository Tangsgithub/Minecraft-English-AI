const fs = require('fs');
let data = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');
const match = data.match(/export const EXTRA_CRAFTING_RECIPES: CraftingRecipe\[\] = (\[.*\]);/s);
if (match) {
    let arr = eval(match[1]);
    const bad = arr.filter(r => !r.gridPattern || r.gridPattern.length !== 9);
    console.log("Bad patterns count:", bad.length);
}
