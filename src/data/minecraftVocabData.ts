import { VocabItem } from '../types';

export const MINECRAFT_VOCABULARY: VocabItem[] = [
  // Lesson 1 Unlocks
  {
    id: 'mc_001',
    word: 'block',
    phonetic: '/blɒk/',
    meaning: '方块；块',
    category: 'Minecraft基础',
    mcItem: 'Grass Block',
    mcItemIcon: '🟩',
    sampleSentence: 'Minecraft is made of many colorful blocks.',
    sampleTranslation: '我的世界是由许多彩色方块组成的。',
    requiredLessonId: 1
  },
  {
    id: 'mc_002',
    word: 'craft',
    phonetic: '/krɑːft/',
    meaning: '合成；制作',
    category: 'Minecraft基础',
    mcItem: 'Crafting Table',
    mcItemIcon: '🛠️',
    sampleSentence: 'I can craft a wooden pickaxe with sticks and planks.',
    sampleTranslation: '我可以用木棍和木板合成一把木镐。',
    requiredLessonId: 1
  },
  {
    id: 'mc_003',
    word: 'mine',
    phonetic: '/maɪn/',
    meaning: '采矿；矿山',
    category: 'Minecraft基础',
    mcItem: 'Iron Ore',
    mcItemIcon: '⛏️',
    sampleSentence: 'Let us mine some diamonds in the deep cave!',
    sampleTranslation: '让我们去深洞里采一些钻石吧！',
    requiredLessonId: 1
  },
  {
    id: 'mc_004',
    word: 'build',
    phonetic: '/bɪld/',
    meaning: '建造；构建',
    category: 'Minecraft基础',
    mcItem: 'Oak Planks',
    mcItemIcon: '🪵',
    sampleSentence: 'Alex and Steve build a cozy house together.',
    sampleTranslation: '亚历克斯和史蒂夫一起造了一间温馨的房子。',
    requiredLessonId: 1
  },
  {
    id: 'mc_005',
    word: 'house',
    phonetic: '/haʊs/',
    meaning: '房子；房屋',
    category: 'Minecraft基础',
    mcItem: 'Brick House',
    mcItemIcon: '🏠',
    sampleSentence: 'My house has a red door and glass windows.',
    sampleTranslation: '我的房子有一扇红门和玻璃窗。',
    requiredLessonId: 1
  },

  // Lesson 2 Unlocks
  {
    id: 'mc_006',
    word: 'village',
    phonetic: '/ˈvɪl.ɪdʒ/',
    meaning: '村庄；村民聚集地',
    category: '探索环境',
    mcItem: 'Villager',
    mcItemIcon: '👨‍🌾',
    sampleSentence: 'We found a friendly village near the desert.',
    sampleTranslation: '我们在沙漠附近发现了一个友好的村庄。',
    requiredLessonId: 2
  },
  {
    id: 'mc_007',
    word: 'torch',
    phonetic: '/tɔːtʃ/',
    meaning: '火把',
    category: '探索环境',
    mcItem: 'Torch',
    mcItemIcon: '🔦',
    sampleSentence: 'Place a torch to light up the dark cave.',
    sampleTranslation: '放一把火把照亮漆黑的溶洞。',
    requiredLessonId: 2
  },
  {
    id: 'mc_008',
    word: 'apple',
    phonetic: '/ˈæp.əl/',
    meaning: '苹果',
    category: '生存食物',
    mcItem: 'Golden Apple',
    mcItemIcon: '🍎',
    sampleSentence: 'An apple restores 4 hunger points in Minecraft.',
    sampleTranslation: '苹果在我的世界里可以恢复4点饥饿值。',
    requiredLessonId: 2
  },

  // Lesson 3 Unlocks (Minerals & Combat)
  {
    id: 'mc_009',
    word: 'diamond',
    phonetic: '/ˈdaɪə.mənd/',
    meaning: '钻石',
    category: '矿产资源',
    mcItem: 'Diamond',
    mcItemIcon: '💎',
    sampleSentence: 'Diamond is the rarest and strongest mineral.',
    sampleTranslation: '钻石是最稀有也最坚硬的矿物。',
    requiredLessonId: 3
  },
  {
    id: 'mc_010',
    word: 'sword',
    phonetic: '/sɔːd/',
    meaning: '剑；武器',
    category: '武器装备',
    mcItem: 'Iron Sword',
    mcItemIcon: '⚔️',
    sampleSentence: 'Hold your sword to defend the village at night!',
    sampleTranslation: '拿起你的剑在夜晚保卫村庄！',
    requiredLessonId: 3
  },
  {
    id: 'mc_011',
    word: 'monster',
    phonetic: '/ˈmɒn.stər/',
    meaning: '怪物',
    category: '生物怪兽',
    mcItem: 'Creeper',
    mcItemIcon: '👾',
    sampleSentence: 'Be careful! Monsters appear when it gets dark.',
    sampleTranslation: '小心！天黑时怪物就会出现。',
    requiredLessonId: 3
  },
  {
    id: 'mc_012',
    word: 'emerald',
    phonetic: '/ˈem.ər.əld/',
    meaning: '绿宝石；硬币',
    category: '矿产资源',
    mcItem: 'Emerald',
    mcItemIcon: '❇️',
    sampleSentence: 'You earned 10 emeralds for finishing your English mission!',
    sampleTranslation: '你完成英语任务获得了10颗绿宝石！',
    requiredLessonId: 3
  },

  // Lesson 5 Unlocks
  {
    id: 'mc_013',
    word: 'inventory',
    phonetic: '/ˈɪn.vən.tər.i/',
    meaning: '物品栏；背包',
    category: '工具箱',
    mcItem: 'Chest',
    mcItemIcon: '🎒',
    sampleSentence: 'Open your inventory to check your collected items.',
    sampleTranslation: '打开你的背包查看收集到的物品。',
    requiredLessonId: 5
  },
  {
    id: 'mc_014',
    word: 'creeper',
    phonetic: '/ˈkriː.pər/',
    meaning: '苦力怕；爬行者',
    category: '生物怪兽',
    mcItem: 'Creeper Head',
    mcItemIcon: '🟩',
    sampleSentence: 'Sssss... A creeper is standing behind the tree!',
    sampleTranslation: '嘶嘶……一只苦力怕站在树后面！',
    requiredLessonId: 5
  },
  {
    id: 'mc_015',
    word: 'redstone',
    phonetic: '/ˈred.stəʊn/',
    meaning: '红石；电路线',
    category: '红石机械',
    mcItem: 'Redstone Dust',
    mcItemIcon: '🔴',
    sampleSentence: 'Redstone can connect lamps and mechanical doors.',
    sampleTranslation: '红石可以连接红石灯和机械门。',
    requiredLessonId: 5
  },
  {
    id: 'mc_016',
    word: 'furnace',
    phonetic: '/ˈfɜː.nɪs/',
    meaning: '熔炉；炼钢炉',
    category: '红石机械',
    mcItem: 'Furnace',
    mcItemIcon: '🔥',
    sampleSentence: 'Use coal in the furnace to smelt raw iron ores.',
    sampleTranslation: '在熔炉里使用煤炭来熔炼粗铁矿。',
    requiredLessonId: 5
  },

  // Lesson 8 Unlocks (Intermediate Adventures)
  {
    id: 'mc_017',
    word: 'shield',
    phonetic: '/ʃiːld/',
    meaning: '盾牌；防护罩',
    category: '武器装备',
    mcItem: 'Wooden Shield',
    mcItemIcon: '🛡️',
    sampleSentence: 'Raise your shield to block skeleton arrows!',
    sampleTranslation: '举起你的盾牌挡住骷髅射出的箭矢！',
    requiredLessonId: 8
  },
  {
    id: 'mc_018',
    word: 'anvil',
    phonetic: '/ˈæn.vɪl/',
    meaning: '铁砧；修补台',
    category: '工具箱',
    mcItem: 'Anvil',
    mcItemIcon: '⚒️',
    sampleSentence: 'Repair your broken tools on the iron anvil.',
    sampleTranslation: '在铁砧上修补你损坏的工具。',
    requiredLessonId: 8
  },
  {
    id: 'mc_019',
    word: 'enderman',
    phonetic: '/ˈend.ə.mæn/',
    meaning: '末影人；小紫眼',
    category: '生物怪兽',
    mcItem: 'Ender Pearl',
    mcItemIcon: '👁️',
    sampleSentence: 'Do not look directly into the Enderman\'s eyes!',
    sampleTranslation: '不要直视末影人的眼睛！',
    requiredLessonId: 8
  },
  {
    id: 'mc_020',
    word: 'potion',
    phonetic: '/ˈpəʊ.ʃən/',
    meaning: '药水；魔法药水',
    category: '魔法炼药',
    mcItem: 'Potion of Healing',
    mcItemIcon: '🧪',
    sampleSentence: 'Drink a potion of healing to restore your health instantly.',
    sampleTranslation: '喝下一瓶治疗药水立刻恢复生命值。',
    requiredLessonId: 8
  },

  // Lesson 12 Unlocks (Nether World)
  {
    id: 'mc_021',
    word: 'nether',
    phonetic: '/ˈneð.ər/',
    meaning: '下界；地狱维度',
    category: '维度探险',
    mcItem: 'Nether Portal',
    mcItemIcon: '🌋',
    sampleSentence: 'Build a portal with obsidian to travel to the Nether.',
    sampleTranslation: '用黑曜石搭建传送门前往下界维度。',
    requiredLessonId: 12
  },
  {
    id: 'mc_022',
    word: 'obsidian',
    phonetic: '/əbˈsɪd.i.ən/',
    meaning: '黑曜石',
    category: '矿产资源',
    mcItem: 'Obsidian Block',
    mcItemIcon: '⬛',
    sampleSentence: 'Water flowing onto lava creates dark obsidian.',
    sampleTranslation: '水流浇在岩浆上会生成黑暗坚硬的黑曜石。',
    requiredLessonId: 12
  },
  {
    id: 'mc_023',
    word: 'crossbow',
    phonetic: '/ˈkrɒs.bəʊ/',
    meaning: '弩；远距离武器',
    category: '武器装备',
    mcItem: 'Crossbow',
    mcItemIcon: '🏹',
    sampleSentence: 'Load fireworks into your crossbow for explosive damage!',
    sampleTranslation: '将烟花装进弩箭发射暴击伤害！',
    requiredLessonId: 12
  },

  // Lesson 15 Unlocks (Magic & Artifacts)
  {
    id: 'mc_024',
    word: 'enchanted',
    phonetic: '/ɪnˈtʃɑːn.tɪd/',
    meaning: '附魔的；魔力的',
    category: '魔法炼药',
    mcItem: 'Enchanted Book',
    mcItemIcon: '🔮',
    sampleSentence: 'An enchanted sword deals double damage to undead enemies.',
    sampleTranslation: '附魔剑对不死族敌人造成双倍伤害。',
    requiredLessonId: 15
  },
  {
    id: 'mc_025',
    word: 'totem',
    phonetic: '/ˈtəʊ.təm/',
    meaning: '图腾；不死图腾',
    category: '魔法炼药',
    mcItem: 'Totem of Undying',
    mcItemIcon: '🗿',
    sampleSentence: 'Holding a totem of undying saves your life from fatal blows.',
    sampleTranslation: '手持不死图腾可以在致命一击中救你一命。',
    requiredLessonId: 15
  },
  {
    id: 'mc_026',
    word: 'beacon',
    phonetic: '/ˈbiː.kən/',
    meaning: '信标；光束塔',
    category: '探索环境',
    mcItem: 'Beacon',
    mcItemIcon: '🌟',
    sampleSentence: 'The beacon shoots a tall beam of light into the sky.',
    sampleTranslation: '信标向天空发射出一道宏伟的巨大光柱。',
    requiredLessonId: 15
  },

  // Lesson 20 Unlocks (The End Realm)
  {
    id: 'mc_027',
    word: 'dragon',
    phonetic: '/ˈdræɡ.ən/',
    meaning: '末影龙；巨龙',
    category: '维度探险',
    mcItem: 'Ender Dragon Egg',
    mcItemIcon: '🐉',
    sampleSentence: 'The Ender Dragon guards the island in The End.',
    sampleTranslation: '末影龙守护着末地维度的中央浮岛。',
    requiredLessonId: 20
  },
  {
    id: 'mc_028',
    word: 'elytra',
    phonetic: '/ˈel.ɪ.trə/',
    meaning: '鞘翅；飞行翼',
    category: '武器装备',
    mcItem: 'Elytra Wings',
    mcItemIcon: '🪽',
    sampleSentence: 'Equip elytra to glide smoothly across the endless sky!',
    sampleTranslation: '装备鞘翅在无垠的天空中流畅滑翔！',
    requiredLessonId: 20
  },
  {
    id: 'mc_029',
    word: 'trident',
    phonetic: '/ˈtraɪ.dənt/',
    meaning: '三叉戟；海王武器',
    category: '武器装备',
    mcItem: 'Trident',
    mcItemIcon: '🔱',
    sampleSentence: 'Throw your trident into thunderous rainstorms to ride lightning!',
    sampleTranslation: '在雷雨中掷出三叉戟御雷前行！',
    requiredLessonId: 20
  },
  {
    id: 'mc_030',
    word: 'spyglass',
    phonetic: '/ˈspaɪ.ɡlɑːs/',
    meaning: '望远镜；单筒镜',
    category: '工具箱',
    mcItem: 'Spyglass',
    mcItemIcon: '🔭',
    sampleSentence: 'Look through the spyglass to spot distant pillager outposts.',
    sampleTranslation: '透过单筒望远镜观察远方的掠夺者前哨站。',
    requiredLessonId: 24
  }
];
