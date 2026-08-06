const fs = require('fs');

let viewContent = fs.readFileSync('src/components/CraftingLabView.tsx', 'utf8');

// There are two "const RECIPES" now.
// Let's just remove everything between "const RECIPES" and "interface SentencePattern {"

const startIdx = viewContent.indexOf('const RECIPES:');
const endIdx = viewContent.indexOf('interface SentencePattern {');

if(startIdx > -1 && endIdx > -1) {
    const before = viewContent.substring(0, startIdx);
    const after = viewContent.substring(endIdx);
    const newView = before + 'const RECIPES: CraftingRecipe[] = EXTRA_CRAFTING_RECIPES;\n\n' + after;
    fs.writeFileSync('src/components/CraftingLabView.tsx', newView);
    console.log("Fixed CraftingLabView again!");
} else {
    console.log("Could not find RECIPES in CraftingLabView");
}
