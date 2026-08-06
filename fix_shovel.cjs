const fs = require('fs');
let data = fs.readFileSync('src/data/craftingRecipesData.ts', 'utf8');

data = data.replace(
  "nameEn: 'Wooden Shovel',\n    nameZh: '木铲',\n    phonetic: '/ˈwʊd.ən ˈʃʌv.əl/',\n    mcIcon: '🪵',",
  "nameEn: 'Wooden Shovel',\n    nameZh: '木铲',\n    phonetic: '/ˈwʊd.ən ˈʃʌv.əl/',\n    mcIcon: '🥄',"
);

data = data.replace(
  "nameEn: 'Fence',\n    nameZh: '橡木栅栏',\n    phonetic: '/fens/',\n    mcIcon: '🪵',",
  "nameEn: 'Fence',\n    nameZh: '橡木栅栏',\n    phonetic: '/fens/',\n    mcIcon: '🚧',"
);

fs.writeFileSync('src/data/craftingRecipesData.ts', data);
