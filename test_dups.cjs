const fs = require('fs');
let data = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');
const match = data.match(/export const EXTRA_CRAFTING_RECIPES: CraftingRecipe\[\] = (\[.*\]);/s);
if (match) {
    let arr = eval(match[1]);
    let seen = {};
    arr.forEach(r => {
        let key = JSON.stringify(r.gridPattern);
        if (seen[key]) {
            console.log("Duplicate pattern:", r.id, seen[key]);
        } else {
            seen[key] = r.id;
        }
    });
}
