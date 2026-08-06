export interface CraftingRecipe {
  id: string;
  nameEn: string;
  nameZh: string;
  phonetic: string;
  mcIcon: string;
  category: string;
  requiredIngredients: { name: string; icon: string }[];
  gridPattern: (string | null)[]; // 3x3 array
  sampleSentence: string;
  sampleTranslation: string;
  unlockedLevel: number;
}

export const EXTRA_CRAFTING_RECIPES: CraftingRecipe[] = [
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
  },
  {
    id: 'recipe_wood_plank',
    nameEn: 'Oak Planks',
    nameZh: '橡木板；木板',
    phonetic: '/əʊk plæŋks/',
    mcIcon: '🪵',
    category: '基础材料',
    requiredIngredients: [{ name: 'Oak Log', icon: '🪵' }],
    gridPattern: [null, null, null, null, '🪵', null, null, null, null],
    sampleSentence: 'Convert wood logs into four oak planks on the crafting grid.',
    sampleTranslation: '在合成网格上将原木转换为四块橡木板。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_stick',
    nameEn: 'Stick',
    nameZh: '木棍；棍子',
    phonetic: '/stɪk/',
    mcIcon: '🥢',
    category: '基础材料',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: [null, '🪵', null, null, '🪵', null, null, null, null],
    sampleSentence: 'Craft sticks to make tools, torches, and ladders.',
    sampleTranslation: '合成木棍来制作工具、火把和梯子。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_torch',
    nameEn: 'Torch',
    nameZh: '火把；火炬',
    phonetic: '/tɔːtʃ/',
    mcIcon: '🕯️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Coal', icon: '⬛' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '⬛', null, null, '🥢', null, null, null, null],
    sampleSentence: 'Place torches inside dark caves to ward off monsters.',
    sampleTranslation: '在黑暗洞穴里放置火把以驱散怪物。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_wooden_pickaxe',
    nameEn: 'Wooden Pickaxe',
    nameZh: '木镐',
    phonetic: '/ˈwʊd.ən ˈpɪk.æks/',
    mcIcon: '⛏️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪵', '🪵', '🪵', null, '🥢', null, null, '🥢', null],
    sampleSentence: 'Use a wooden pickaxe to mine your first cobblestones.',
    sampleTranslation: '用木镐挖掘你的第一批圆石。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_wooden_axe',
    nameEn: 'Wooden Axe',
    nameZh: '木斧',
    phonetic: '/ˈwʊd.ən æks/',
    mcIcon: '🪓',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪵', '🪵', null, '🪵', '🥢', null, null, '🥢', null],
    sampleSentence: 'A wooden axe chops trees much faster than bare hands.',
    sampleTranslation: '用木斧砍树比用空手快得多。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_wooden_shovel',
    nameEn: 'Wooden Shovel',
    nameZh: '木铲',
    phonetic: '/ˈwʊd.ən ˈʃʌv.əl/',
    mcIcon: '🪵',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '🪵', null, null, '🥢', null, null, '🥢', null],
    sampleSentence: 'Dig dirt and sand easily with a wooden shovel.',
    sampleTranslation: '用木铲可以轻松挖掘泥土和沙子。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_stone_pickaxe',
    nameEn: 'Stone Pickaxe',
    nameZh: '石镐',
    phonetic: '/stəʊn ˈpɪk.æks/',
    mcIcon: '⛏️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪨', '🪨', '🪨', null, '🥢', null, null, '🥢', null],
    sampleSentence: 'Mine iron ores underground using a stone pickaxe.',
    sampleTranslation: '使用石镐在地下采掘铁矿石。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_stone_sword',
    nameEn: 'Stone Sword',
    nameZh: '石剑',
    phonetic: '/stəʊn sɔːd/',
    mcIcon: '🗡️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '🪨', null, null, '🪨', null, null, '🥢', null],
    sampleSentence: 'Defend yourself against night mobs with a stone sword.',
    sampleTranslation: '用石剑保护自己抵抗夜间怪物。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_furnace',
    nameEn: 'Furnace',
    nameZh: '熔炉',
    phonetic: '/ˈfɜː.nɪs/',
    mcIcon: '🧰',
    category: '基础装备',
    requiredIngredients: [{ name: 'Cobblestone', icon: '🪨' }],
    gridPattern: ['🪨', '🪨', '🪨', '🪨', null, '🪨', '🪨', '🪨', '🪨'],
    sampleSentence: 'Smelt iron ore and cook porkchop inside a furnace.',
    sampleTranslation: '在熔炉里冶炼铁矿石并烹饪猪排。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_chest',
    nameEn: 'Chest',
    nameZh: '木箱；宝箱',
    phonetic: '/tʃest/',
    mcIcon: '📦',
    category: '存储器具',
    requiredIngredients: [{ name: 'Wood Plank', icon: '🪵' }],
    gridPattern: ['🪵', '🪵', '🪵', '🪵', null, '🪵', '🪵', '🪵', '🪵'],
    sampleSentence: 'Store your emeralds and diamonds inside a wooden chest.',
    sampleTranslation: '将你的绿宝石和钻石存放在木箱子里。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_bed',
    nameEn: 'Bed',
    nameZh: '床；单人床',
    phonetic: '/bed/',
    mcIcon: '🛏️',
    category: '居住生活',
    requiredIngredients: [
      { name: 'Wool', icon: '🧶' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: ['🧶', '🧶', '🧶', '🪵', '🪵', '🪵', null, null, null],
    sampleSentence: 'Sleep in a bed to skip the dangerous night in Minecraft.',
    sampleTranslation: '躺在床上睡觉可以跳过我的世界中危险的夜晚。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_door',
    nameEn: 'Wooden Door',
    nameZh: '木门',
    phonetic: '/dɔːr/',
    mcIcon: '🚪',
    category: '建筑装饰',
    requiredIngredients: [{ name: 'Wood Plank', icon: '🪵' }],
    gridPattern: ['🪵', '🪵', null, '🪵', '🪵', null, '🪵', '🪵', null],
    sampleSentence: 'Close the wooden door before zombies arrive.',
    sampleTranslation: '在僵尸到来之前关上木门。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_ladder',
    nameEn: 'Ladder',
    nameZh: '梯子',
    phonetic: '/ˈlæd.ər/',
    mcIcon: '🪜',
    category: '建筑装饰',
    requiredIngredients: [{ name: 'Stick', icon: '🥢' }],
    gridPattern: ['🥢', null, '🥢', '🥢', '🥢', '🥢', '🥢', null, '🥢'],
    sampleSentence: 'Climb up the vertical ladder to reach the roof.',
    sampleTranslation: '顺着垂直的梯子爬上屋顶。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_fence',
    nameEn: 'Fence',
    nameZh: '栅栏；篱笆',
    phonetic: '/fens/',
    mcIcon: '🪵',
    category: '建筑装饰',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪵', '🥢', '🪵', '🪵', '🥢', '🪵', null, null, null],
    sampleSentence: 'Build a sturdy fence around your sheep farm.',
    sampleTranslation: '在你的羊场周围建造坚固的栅栏。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_trapdoor',
    nameEn: 'Trapdoor',
    nameZh: '活板门',
    phonetic: '/ˈtræp.dɔːr/',
    mcIcon: '🚪',
    category: '建筑装饰',
    requiredIngredients: [{ name: 'Wood Plank', icon: '🪵' }],
    gridPattern: ['🪵', '🪵', '🪵', '🪵', '🪵', '🪵', null, null, null],
    sampleSentence: 'Open the trapdoor to climb down into your basement.',
    sampleTranslation: '打开活板门爬下地下室。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_iron_pickaxe',
    nameEn: 'Iron Pickaxe',
    nameZh: '铁镐',
    phonetic: '/ˈaɪ.ən ˈpɪk.æks/',
    mcIcon: '⛏️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪙', '🪙', '🪙', null, '🥢', null, null, '🥢', null],
    sampleSentence: 'You must use an iron pickaxe to mine diamond ores.',
    sampleTranslation: '你必须使用铁镐才能采掘钻石矿石。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_iron_sword',
    nameEn: 'Iron Sword',
    nameZh: '铁剑',
    phonetic: '/ˈaɪ.ən sɔːd/',
    mcIcon: '🗡️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '🪙', null, null, '🪙', null, null, '🥢', null],
    sampleSentence: 'An iron sword gives strong protection in night adventures.',
    sampleTranslation: '铁剑能在夜间探险中提供强力的保护。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_iron_helmet',
    nameEn: 'Iron Helmet',
    nameZh: '铁头盔',
    phonetic: '/ˈaɪ.ən ˈhel.mət/',
    mcIcon: '🪖',
    category: '防具装备',
    requiredIngredients: [{ name: 'Iron Ingot', icon: '🪙' }],
    gridPattern: ['🪙', '🪙', '🪙', '🪙', null, '🪙', null, null, null],
    sampleSentence: 'Equip an iron helmet to protect your head.',
    sampleTranslation: '装备铁头盔以保护头部。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_iron_chestplate',
    nameEn: 'Iron Chestplate',
    nameZh: '铁胸甲',
    phonetic: '/ˈaɪ.ən ˈtʃest.pleɪt/',
    mcIcon: '🥼',
    category: '防具装备',
    requiredIngredients: [{ name: 'Iron Ingot', icon: '🪙' }],
    gridPattern: ['🪙', null, '🪙', '🪙', '🪙', '🪙', '🪙', '🪙', '🪙'],
    sampleSentence: 'Iron chestplate shields your body against mob attacks.',
    sampleTranslation: '铁胸甲抵御怪物对你身体的攻击。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_iron_boots',
    nameEn: 'Iron Boots',
    nameZh: '铁靴子',
    phonetic: '/ˈaɪ.ən buːts/',
    mcIcon: '👞',
    category: '防具装备',
    requiredIngredients: [{ name: 'Iron Ingot', icon: '🪙' }],
    gridPattern: ['🪙', null, '🪙', '🪙', null, '🪙', null, null, null],
    sampleSentence: 'Iron boots reduce damage taken from falling.',
    sampleTranslation: '铁靴子能减轻跌落受到的伤害。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_shield',
    nameEn: 'Shield',
    nameZh: '盾牌',
    phonetic: '/ʃiːld/',
    mcIcon: '🛡️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Iron Ingot', icon: '🪙' }
    ],
    gridPattern: ['🪵', '🪙', '🪵', '🪵', '🪵', '🪵', null, '🪵', null],
    sampleSentence: 'Raise your shield to block arrows fired by skeletons.',
    sampleTranslation: '举起盾牌挡下骷髅射出的箭头。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_bow',
    nameEn: 'Bow',
    nameZh: '弓箭；弓',
    phonetic: '/bəʊ/',
    mcIcon: '🏹',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Stick', icon: '🥢' },
      { name: 'String', icon: '🧵' }
    ],
    gridPattern: [null, '🥢', '🧵', '🥢', null, '🧵', null, '🥢', '🧵'],
    sampleSentence: 'Shoot arrows from a distance using a bow.',
    sampleTranslation: '使用弓箭从远距离射击。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_arrow',
    nameEn: 'Arrow',
    nameZh: '箭矢',
    phonetic: '/ˈær.əʊ/',
    mcIcon: '🎯',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Flint', icon: '🪨' },
      { name: 'Stick', icon: '🥢' },
      { name: 'Feather', icon: '🪶' }
    ],
    gridPattern: [null, '🪨', null, null, '🥢', null, null, '🪶', null],
    sampleSentence: 'Craft arrows with flint, sticks, and feathers.',
    sampleTranslation: '用燧石、木棍和羽毛合成箭矢。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_diamond_pickaxe',
    nameEn: 'Diamond Pickaxe',
    nameZh: '钻石镐',
    phonetic: '/ˈdaɪə.mənd ˈpɪk.æks/',
    mcIcon: '⛏️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Diamond', icon: '💎' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['💎', '💎', '💎', null, '🥢', null, null, '🥢', null],
    sampleSentence: 'A diamond pickaxe can mine obsidian and ancient debris.',
    sampleTranslation: '钻石镐可以采掘黑曜石和远古残骸。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_diamond_sword',
    nameEn: 'Diamond Sword',
    nameZh: '钻石剑',
    phonetic: '/ˈdaɪə.mənd sɔːd/',
    mcIcon: '⚔️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Diamond', icon: '💎' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '💎', null, null, '💎', null, null, '🥢', null],
    sampleSentence: 'The diamond sword deals heavy attack damage to monsters.',
    sampleTranslation: '钻石剑能对怪物造成巨大的攻击伤害。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_diamond_chestplate',
    nameEn: 'Diamond Chestplate',
    nameZh: '钻石胸甲',
    phonetic: '/ˈdaɪə.mənd ˈtʃest.pleɪt/',
    mcIcon: '🥼',
    category: '防具装备',
    requiredIngredients: [{ name: 'Diamond', icon: '💎' }],
    gridPattern: ['💎', null, '💎', '💎', '💎', '💎', '💎', '💎', '💎'],
    sampleSentence: 'Wear diamond chestplate for maximum defense capability.',
    sampleTranslation: '穿上钻石胸甲获得强大的防御能力。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_water_bucket',
    nameEn: 'Bucket',
    nameZh: '铁桶；水桶',
    phonetic: '/ˈbʌk.ɪt/',
    mcIcon: '🪣',
    category: '生存工具',
    requiredIngredients: [{ name: 'Iron Ingot', icon: '🪙' }],
    gridPattern: ['🪙', null, '🪙', null, '🪙', null, null, null, null],
    sampleSentence: 'Fill the iron bucket with water to extinguish lava.',
    sampleTranslation: '用铁桶装满水来浇灭岩浆。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_compass',
    nameEn: 'Compass',
    nameZh: '指南针',
    phonetic: '/ˈkʌm.pəs/',
    mcIcon: '🧭',
    category: '探险导航',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Redstone', icon: '🔴' }
    ],
    gridPattern: [null, '🪙', null, '🪙', '🔴', '🪙', null, '🪙', null],
    sampleSentence: 'The compass needle always points towards your spawn point.',
    sampleTranslation: '指南针的红针总是指向你的出生复活点。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_clock',
    nameEn: 'Clock',
    nameZh: '时钟',
    phonetic: '/klɒk/',
    mcIcon: '⌚',
    category: '探险导航',
    requiredIngredients: [
      { name: 'Gold Ingot', icon: '🌟' },
      { name: 'Redstone', icon: '🔴' }
    ],
    gridPattern: [null, '🌟', null, '🌟', '🔴', '🌟', null, '🌟', null],
    sampleSentence: 'Check the clock to know when night is falling.',
    sampleTranslation: '查看时钟了解夜幕何时降临。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_fishing_rod',
    nameEn: 'Fishing Rod',
    nameZh: '钓鱼竿',
    phonetic: '/ˈfɪʃ.ɪŋ rɒd/',
    mcIcon: '🎣',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Stick', icon: '🥢' },
      { name: 'String', icon: '🧵' }
    ],
    gridPattern: [null, null, '🥢', null, '🥢', '🧵', '🥢', null, '🧵'],
    sampleSentence: 'Use a fishing rod to catch cod, salmon, and treasure.',
    sampleTranslation: '用钓鱼竿钓鳕鱼、鲑鱼和珍宝。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_boat',
    nameEn: 'Boat',
    nameZh: '橡木船',
    phonetic: '/bəʊt/',
    mcIcon: '🛶',
    category: '交通载具',
    requiredIngredients: [{ name: 'Wood Plank', icon: '🪵' }],
    gridPattern: ['🪵', null, '🪵', '🪵', '🪵', '🪵', null, null, null],
    sampleSentence: 'Row a wooden boat smoothly across oceans and rivers.',
    sampleTranslation: '划着木船划过大洋和河流。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_minecart',
    nameEn: 'Minecart',
    nameZh: '矿车',
    phonetic: '/ˈmaɪn.kɑːt/',
    mcIcon: '🛒',
    category: '交通载具',
    requiredIngredients: [{ name: 'Iron Ingot', icon: '🪙' }],
    gridPattern: ['🪙', null, '🪙', '🪙', '🪙', '🪙', null, null, null],
    sampleSentence: 'Ride inside a minecart along iron rails.',
    sampleTranslation: '乘坐矿车沿着铁轨行驶。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_rail',
    nameEn: 'Rail',
    nameZh: '铁轨；轨线',
    phonetic: '/reɪl/',
    mcIcon: '🛤️',
    category: '交通载具',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪙', null, '🪙', '🪙', '🥢', '🪙', '🪙', null, '🪙'],
    sampleSentence: 'Lay iron rails to build a rapid transit system.',
    sampleTranslation: '铺设铁轨建立快速运输系统。',
    unlockedLevel: 5
  },
  {
    id: 'recipe_powered_rail',
    nameEn: 'Powered Rail',
    nameZh: '充能铁轨；动力铁轨',
    phonetic: '/ˈpaʊəd reɪl/',
    mcIcon: '⚡',
    category: '交通载具',
    requiredIngredients: [
      { name: 'Gold Ingot', icon: '🌟' },
      { name: 'Stick', icon: '🥢' },
      { name: 'Redstone', icon: '🔴' }
    ],
    gridPattern: ['🌟', null, '🌟', '🌟', '🥢', '🌟', '🌟', '🔴', '🌟'],
    sampleSentence: 'Powered rails accelerate minecarts to full speed.',
    sampleTranslation: '动力铁轨能将矿车加速到全速。',
    unlockedLevel: 6
  },
  {
    id: 'recipe_redstone_torch',
    nameEn: 'Redstone Torch',
    nameZh: '红石火把',
    phonetic: '/ˈred.stəʊn tɔːtʃ/',
    mcIcon: '🔴',
    category: '红石科技',
    requiredIngredients: [
      { name: 'Redstone', icon: '🔴' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '🔴', null, null, '🥢', null, null, null, null],
    sampleSentence: 'A redstone torch emits continuous signal power.',
    sampleTranslation: '红石火把能发出持续的信号能量。',
    unlockedLevel: 6
  },
  {
    id: 'recipe_lever',
    nameEn: 'Lever',
    nameZh: '拉杆；开关',
    phonetic: '/ˈliː.vər/',
    mcIcon: '🕹️',
    category: '红石科技',
    requiredIngredients: [
      { name: 'Stick', icon: '🥢' },
      { name: 'Cobblestone', icon: '🪨' }
    ],
    gridPattern: [null, '🥢', null, null, '🪨', null, null, null, null],
    sampleSentence: 'Flip the lever to activate hidden secret doors.',
    sampleTranslation: '扳动拉杆以开启隐藏的暗门。',
    unlockedLevel: 6
  },
  {
    id: 'recipe_piston',
    nameEn: 'Piston',
    nameZh: '活塞；机械推杆',
    phonetic: '/ˈpɪs.tən/',
    mcIcon: '🔲',
    category: '红石科技',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Redstone', icon: '🔴' }
    ],
    gridPattern: ['🪵', '🪵', '🪵', '🪨', '🪙', '🪨', '🪨', '🔴', '🪨'],
    sampleSentence: 'Pistons push blocks when activated by redstone.',
    sampleTranslation: '当被红石激活时，活塞会推开方块。',
    unlockedLevel: 6
  },
  {
    id: 'recipe_sticky_piston',
    nameEn: 'Sticky Piston',
    nameZh: '粘性活塞',
    phonetic: '/ˈstɪk.i ˈpɪs.tən/',
    mcIcon: '🟢',
    category: '红石科技',
    requiredIngredients: [
      { name: 'Slimeball', icon: '🟢' },
      { name: 'Piston', icon: '🔲' }
    ],
    gridPattern: [null, '🟢', null, null, '🔲', null, null, null, null],
    sampleSentence: 'Sticky pistons push and pull blocks back and forth.',
    sampleTranslation: '粘性活塞能够推拉方块来回移动。',
    unlockedLevel: 6
  },
  {
    id: 'recipe_tnt',
    nameEn: 'TNT',
    nameZh: '炸药；炸药包',
    phonetic: '/ˌtiː.enˈtiː/',
    mcIcon: '🧨',
    category: '红石科技',
    requiredIngredients: [
      { name: 'Gunpowder', icon: '💥' },
      { name: 'Sand', icon: '⏳' }
    ],
    gridPattern: ['💥', '⏳', '💥', '⏳', '💥', '⏳', '💥', '⏳', '💥'],
    sampleSentence: 'Ignite TNT with flint and steel to blast stone.',
    sampleTranslation: '用打火石点燃TNT炸开岩石。',
    unlockedLevel: 7
  },
  {
    id: 'recipe_bookshelf',
    nameEn: 'Bookshelf',
    nameZh: '书架；图书柜',
    phonetic: '/ˈbʊk.ʃelf/',
    mcIcon: '📚',
    category: '建筑装饰',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Book', icon: '📖' }
    ],
    gridPattern: ['🪵', '🪵', '🪵', '📖', '📖', '📖', '🪵', '🪵', '🪵'],
    sampleSentence: 'Surround the enchanting table with bookshelves for higher levels.',
    sampleTranslation: '在附魔台周围摆放书架以获得更高附魔等级。',
    unlockedLevel: 7
  },
  {
    id: 'recipe_anvil',
    nameEn: 'Anvil',
    nameZh: '铁砧',
    phonetic: '/ˈæn.vɪl/',
    mcIcon: '⚒️',
    category: '基础装备',
    requiredIngredients: [
      { name: 'Iron Block', icon: '⬛' },
      { name: 'Iron Ingot', icon: '🪙' }
    ],
    gridPattern: ['⬛', '⬛', '⬛', null, '🪙', null, '🪙', '🪙', '🪙'],
    sampleSentence: 'Repair damaged gear and combine enchantment books on an anvil.',
    sampleTranslation: '在铁砧上修复受损装备并合并附魔书。',
    unlockedLevel: 7
  },
  {
    id: 'recipe_golden_apple',
    nameEn: 'Golden Apple',
    nameZh: '金苹果',
    phonetic: '/ˈɡəʊl.dən ˈæp.əl/',
    mcIcon: '🍏',
    category: '魔法食物',
    requiredIngredients: [
      { name: 'Gold Ingot', icon: '🌟' },
      { name: 'Apple', icon: '🍎' }
    ],
    gridPattern: ['🌟', '🌟', '🌟', '🌟', '🍎', '🌟', '🌟', '🌟', '🌟'],
    sampleSentence: 'Eat a golden apple to grant powerful health regeneration.',
    sampleTranslation: '吃下一颗金苹果获得强大的生命值恢复效果。',
    unlockedLevel: 8
  },
  {
    id: 'recipe_enchanting_table',
    nameEn: 'Enchanting Table',
    nameZh: '附魔台',
    phonetic: '/ɪnˈtʃɑːn.tɪŋ ˈteɪ.bəl/',
    mcIcon: '✨',
    category: '魔法食物',
    requiredIngredients: [
      { name: 'Book', icon: '📖' },
      { name: 'Diamond', icon: '💎' },
      { name: 'Obsidian', icon: '⬛' }
    ],
    gridPattern: [null, '📖', null, '💎', '⬛', '💎', '⬛', '⬛', '⬛'],
    sampleSentence: 'Use the enchanting table to empower your gear with magic.',
    sampleTranslation: '使用附魔台用魔法强化你的装备。',
    unlockedLevel: 8
  },
  {
    id: 'recipe_brewing_stand',
    nameEn: 'Brewing Stand',
    nameZh: '酿造台',
    phonetic: '/ˈbruː.ɪŋ stænd/',
    mcIcon: '🧪',
    category: '魔法食物',
    requiredIngredients: [
      { name: 'Blaze Rod', icon: '🔥' },
      { name: 'Cobblestone', icon: '🪨' }
    ],
    gridPattern: [null, '🔥', null, '🪨', '🪨', '🪨', null, null, null],
    sampleSentence: 'Brew potions of healing and swiftness at the brewing stand.',
    sampleTranslation: '在酿造台上酿造治疗与迅捷药水。',
    unlockedLevel: 9
  },
  {
    id: 'recipe_cake',
    nameEn: 'Cake',
    nameZh: '蛋糕',
    phonetic: '/keɪk/',
    mcIcon: '🎂',
    category: '居住生活',
    requiredIngredients: [
      { name: 'Milk Bucket', icon: '🥛' },
      { name: 'Sugar', icon: '🍬' },
      { name: 'Egg', icon: '🥚' },
      { name: 'Wheat', icon: '🌾' }
    ],
    gridPattern: ['🥛', '🥛', '🥛', '🍬', '🥚', '🍬', '🌾', '🌾', '🌾'],
    sampleSentence: 'Bake a delicious cake for your Minecraft birthday celebration!',
    sampleTranslation: '为你我的世界的生日派对烘焙一个美味的蛋糕！',
    unlockedLevel: 9
  },
  {
    id: 'recipe_beacon',
    nameEn: 'Beacon',
    nameZh: '信标；光束塔',
    phonetic: '/ˈbiː.kən/',
    mcIcon: '🌟',
    category: '魔法食物',
    requiredIngredients: [
      { name: 'Nether Star', icon: '⭐' },
      { name: 'Glass', icon: '🔲' },
      { name: 'Obsidian', icon: '⬛' }
    ],
    gridPattern: ['🔲', '🔲', '🔲', '🔲', '⭐', '🔲', '⬛', '⬛', '⬛'],
    sampleSentence: 'A beacon shoots a powerful light beam into the sky.',
    sampleTranslation: '信标向空中发射出一道强大的光束。',
    unlockedLevel: 10
  }
];
