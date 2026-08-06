const fs = require('fs');

// 1. Add crafting table to EXTRA_CRAFTING_RECIPES
let dataContent = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');

const tableRecipe = `
  {
    id: 'recipe_crafting_table',
    nameEn: 'Crafting Table',
    nameZh: '工作台 / 合成台',
    phonetic: '/ˈkrɑːf.tɪŋ ˈteɪ.bəl/',
    mcIcon: '🪵',
    category: '基础装备',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: ['🪵', '🪵', null, '🪵', '🪵', null, null, null, null],
    sampleSentence: 'Place four wood planks on the grid to craft a crafting table.',
    sampleTranslation: '在网格上放置四个木板即可合成工作台。',
    unlockedLevel: 1
  },`;

dataContent = dataContent.replace('export const EXTRA_CRAFTING_RECIPES: CraftingRecipe[] = [', 'export const EXTRA_CRAFTING_RECIPES: CraftingRecipe[] = [' + tableRecipe);
fs.writeFileSync('src/data/craftingRecipesData.ts', dataContent);

// 2. Remove RECIPES from CraftingLabView
let viewContent = fs.readFileSync('src/components/CraftingLabView.tsx', 'utf8');

// Replace everything from `const RECIPES: CraftingRecipe[] = [` to `// Mock sentence patterns`
// Wait, I will just use regex to replace `const RECIPES: CraftingRecipe[] = [ ... ];`
// with `const RECIPES = EXTRA_CRAFTING_RECIPES;`

const startIdx = viewContent.indexOf('const RECIPES: CraftingRecipe[] = [');
if(startIdx > -1) {
    const endIdx = viewContent.indexOf('export interface SentencePattern', startIdx);
    const before = viewContent.substring(0, startIdx);
    const after = viewContent.substring(endIdx);
    const newView = before + 'const RECIPES: CraftingRecipe[] = EXTRA_CRAFTING_RECIPES;\n\n' + after;
    fs.writeFileSync('src/components/CraftingLabView.tsx', newView);
    console.log("Fixed CraftingLabView!");
} else {
    console.log("Could not find RECIPES in CraftingLabView");
}
