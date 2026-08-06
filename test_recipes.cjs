const fs = require('fs');
let data = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');
const match = data.match(/export const EXTRA_CRAFTING_RECIPES: CraftingRecipe\[\] = (\[.*\]);/s);
if (match) {
    let arr = eval(match[1]);
    console.log(arr[0].gridPattern);
    console.log(arr[1].gridPattern);
}
