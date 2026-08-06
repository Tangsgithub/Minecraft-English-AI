const fs = require('fs');
let data = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');

data = data.replace(
  "id: 'recipe_crafting_table',\n    nameEn: 'Crafting Table',\n    nameZh: '工作台 / 合成台',\n    phonetic: '/ˈkrɑːf.tɪŋ ˈteɪ.bəl/',\n    mcIcon: '🪵',",
  "id: 'recipe_crafting_table',\n    nameEn: 'Crafting Table',\n    nameZh: '工作台 / 合成台',\n    phonetic: '/ˈkrɑːf.tɪŋ ˈteɪ.bəl/',\n    mcIcon: '🛠️',"
);

fs.writeFileSync('src/data/craftingRecipesData.ts', data);
