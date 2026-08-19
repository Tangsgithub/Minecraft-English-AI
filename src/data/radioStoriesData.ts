export interface StoryParagraph {
  id: string;
  english: string;
  chinese: string;
  speaker: 'Alex' | 'Steve';
}

export interface StoryVocab {
  word: string;
  phonetic: string;
  meaning: string;
}

export interface RadioStory {
  id: string;
  title: string;
  titleZh: string;
  category: 'mc_adventure' | 'classic_fables';
  categoryName: string;
  narrator: 'Alex' | 'Steve';
  durationApprox: string;
  discTheme: {
    name: string;
    color: string;
    border: string;
    icon: string;
  };
  summary: string;
  vocabularyLoot: StoryVocab[];
  paragraphs: StoryParagraph[];
}

export const RADIO_STORIES: RadioStory[] = [
  {
    id: 'story_lost_wolf',
    title: 'The Lost Wolf in the Pine Forest',
    titleZh: '松木森林里迷路的小狼',
    category: 'mc_adventure',
    categoryName: '🌲 MC 森林探险篇',
    narrator: 'Alex',
    durationApprox: '3 分钟',
    discTheme: {
      name: 'Otherside (星空之境)',
      color: 'from-cyan-600 via-blue-700 to-indigo-950',
      border: 'border-cyan-400',
      icon: '🐺'
    },
    summary: '在一个飘着雪花的黄昏，Alex 在高耸的松木森林深处听到了微弱的呜咽声。一只小白狼正被困在灌木丛后...',
    vocabularyLoot: [
      { word: 'forest', phonetic: '/ˈfɒrɪst/', meaning: '森林' },
      { word: 'tame', phonetic: '/teɪm/', meaning: '驯服 / 温顺的' },
      { word: 'bone', phonetic: '/bəʊn/', meaning: '骨头' },
      { word: 'faithful', phonetic: '/ˈfeɪθfl/', meaning: '忠诚的' }
    ],
    paragraphs: [
      {
        id: 'wolf_p1',
        english: 'Once upon a time, deep inside a quiet pine forest, the sun began to set behind snowy hills.',
        chinese: '从前，在一片静谧的松木森林深处，夕阳正缓缓落入白雪皑皑的山丘之后。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p2',
        english: 'Alex was walking home with a backpack full of fresh wood and red apples.',
        chinese: 'Alex 正背着装满新鲜木材和红苹果的背包往家走。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p3',
        english: 'Suddenly, she heard a soft whimper coming from behind a tall sweet berry bush.',
        chinese: '突然，她听到一丛高大的甜浆果灌木后传来一阵微弱的呜咽声。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p4',
        english: 'She stepped forward quietly. To her surprise, a little white wolf was shivering in the cold snow.',
        chinese: '她轻轻走上前去。令她惊讶的是，一只小白狼正在寒冷的雪地里瑟瑟发抖。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p5',
        english: 'Alex smiled gently. She took a clean bone out of her bag and held it out carefully.',
        chinese: 'Alex 温柔地笑了。她从背包里拿出一根干净的骨头，小心翼翼地递了过去。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p6',
        english: 'The little wolf sniffed the bone, wagged its tail joyfully, and bright red hearts floated around it.',
        chinese: '小狼闻了闻骨头，欢快地摇起了尾巴，周围飘起了亮晶晶的红色小爱心。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p7',
        english: 'From that cold evening on, Alex and her faithful wolf became best friends, exploring the vast Minecraft world together.',
        chinese: '从那个寒冷的傍晚起，Alex 和她忠诚的狼成为了最好的朋友，一起探索广阔的 Minecraft 世界。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_golden_apple',
    title: 'Steve and the Golden Apple Temple',
    titleZh: '史蒂夫与金苹果沙漠神殿',
    category: 'mc_adventure',
    categoryName: '🏜️ MC 沙漠遗迹篇',
    narrator: 'Steve',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Pigstep (下界烈焰)',
      color: 'from-amber-600 via-yellow-700 to-amber-950',
      border: 'border-yellow-400',
      icon: '🍎'
    },
    summary: '炎热的沙漠无边无际。Steve 带着地图和钻石镐，终于发现了掩埋在黄沙下的远古沙漠神殿...',
    vocabularyLoot: [
      { word: 'desert', phonetic: '/ˈdezət/', meaning: '沙漠' },
      { word: 'temple', phonetic: '/ˈtempl/', meaning: '神殿 / 遗迹' },
      { word: 'treasure', phonetic: '/ˈtreʒə(r)/', meaning: '宝藏' },
      { word: 'pressure plate', phonetic: '/ˈpreʃə pleɪt/', meaning: '压力板' }
    ],
    paragraphs: [
      {
        id: 'apple_p1',
        english: 'Under the burning golden sun, Steve walked across the endless sand dunes of the great desert.',
        chinese: '在灼热的金色阳光下，Steve 漫步穿越大沙漠无边无际的沙丘。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p2',
        english: 'His camel carried fresh water jars, torches, and a gleaming enchanted diamond pickaxe.',
        chinese: '他的骆驼驮着清凉的水罐、火把和一把闪烁着附魔光芒的钻石镐。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p3',
        english: 'Ahead of him, two ancient sandstone towers rose majestically above the shimmering horizon.',
        chinese: '在他前方，两座古老的砂岩塔楼在闪烁的地平线上巍然耸立。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p4',
        english: 'It was a mysterious desert temple! Steve stepped inside and saw the hidden underground chamber.',
        chinese: '这是一座神秘的沙漠神殿！Steve 步入其中，看到了隐藏在地下的密室。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p5',
        english: 'Be careful! A stone pressure plate was hidden right in the middle beneath the terracotta floor.',
        chinese: '小心！在陶瓦地板正中央藏着一块石头压力板。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p6',
        english: 'Steve mined the side walls carefully and avoided the TNT trap below.',
        chinese: 'Steve 小心翼翼地挖掘侧面墙壁，避开了下方的 TNT 陷阱。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p7',
        english: 'Inside the four chests, he discovered shiny emeralds, enchanted books, and a glowing Golden Apple!',
        chinese: '在四个宝箱里，他发现了闪闪发光的绿宝石、附魔书和一颗散发着金色光芒的金苹果！',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_first_night',
    title: 'Alex’s Very First Night',
    titleZh: '爱丽克斯的第一个生存之夜',
    category: 'mc_adventure',
    categoryName: '🏡 MC 新手生存篇',
    narrator: 'Alex',
    durationApprox: '3 分钟',
    discTheme: {
      name: 'Chirp (红石之歌)',
      color: 'from-rose-600 via-red-700 to-neutral-900',
      border: 'border-rose-400',
      icon: '🪵'
    },
    summary: '刚来到方块世界，太阳下山前必须砍木头、造工作台和建造避难所！看 Alex 如何机智应对第一个黑夜。',
    vocabularyLoot: [
      { word: 'craft', phonetic: '/krɑːft/', meaning: '合成 / 制作' },
      { word: 'shelter', phonetic: '/ˈʃeltə(r)/', meaning: '避难所 / 房屋' },
      { word: 'torch', phonetic: '/tɔːtʃ/', meaning: '火把' },
      { word: 'sunrise', phonetic: '/ˈsʌnraɪz/', meaning: '日出' }
    ],
    paragraphs: [
      {
        id: 'night_p1',
        english: 'Alex opened her eyes and found herself standing on a grassy hill beside an ocean.',
        chinese: 'Alex 睁开眼睛，发现自己站在海边一个青草葱郁的小山丘上。',
        speaker: 'Alex'
      },
      {
        id: 'night_p2',
        english: 'She knew the first rule of Minecraft: punch a tree and gather wood blocks before dark!',
        chinese: '她深知 Minecraft 的第一法则：在天黑之前砍树并收集木块！',
        speaker: 'Alex'
      },
      {
        id: 'night_p3',
        english: 'She crafted wooden planks, created a workbench, and quickly made a wooden pickaxe and a sword.',
        chinese: '她合成了木板，制造了一张工作台，并迅速做出一把木镐和一把木剑。',
        speaker: 'Alex'
      },
      {
        id: 'night_p4',
        english: 'As twilight fell, curious stars appeared in the square sky and zombies began to moan in the dark distance.',
        chinese: '当夜幕降临，好奇的星星出现在方形的天空中，僵尸开始在幽暗的远处低吼。',
        speaker: 'Alex'
      },
      {
        id: 'night_p5',
        english: 'Alex built a cozy wooden cabin into the cliff, placed warm torches on the walls, and slept peacefully on a red bed.',
        chinese: 'Alex 在悬崖上建造了一间温馨的木屋，在墙上插上温暖的火把，安然地睡在红色的床上。',
        speaker: 'Alex'
      },
      {
        id: 'night_p6',
        english: 'When the bright sunrise painted the clouds gold, she was ready for another exciting new adventure.',
        chinese: '当璀璨的日出将云朵染成金色，她已经准备好迎接又一次激动人心的新探险。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_tortoise_hare',
    title: 'The Tortoise and the Hare in Block World',
    titleZh: '方块世界里的龟兔赛跑',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Steve',
    durationApprox: '3 分钟',
    discTheme: {
      name: 'Cat (绿宝石之乐)',
      color: 'from-emerald-600 via-teal-700 to-slate-900',
      border: 'border-emerald-400',
      icon: '🐢'
    },
    summary: '骄傲的兔子佩戴着急速药水，嘲笑背着厚重海龟壳的乌龟。到底谁能最先到达终点的黑曜石旗帜？',
    vocabularyLoot: [
      { word: 'hare', phonetic: '/heə(r)/', meaning: '野兔' },
      { word: 'tortoise', phonetic: '/ˈtɔːtəs/', meaning: '陆龟 / 海龟' },
      { word: 'speed', phonetic: '/spiːd/', meaning: '速度' },
      { word: 'persevere', phonetic: '/ˌpɜːsɪˈvɪə(r)/', meaning: '坚持不懈' }
    ],
    paragraphs: [
      {
        id: 'hare_p1',
        english: 'In a peaceful sunny village, a speedy brown Hare loved boasting about how fast he could sprint.',
        chinese: '在一个宁静晴朗的村庄里，一只飞快的棕色兔子总喜欢炫耀自己能跑得有多快。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p2',
        english: 'A calm green Tortoise stepped forward and challenged the Hare to a grand race across the sunflower plains.',
        chinese: '一只沉稳的绿色乌龟走上前去，向兔子发起了穿越向日葵平原的长跑挑战。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p3',
        english: 'The Hare laughed out loud: "You are so slow! I will win this race with my eyes closed!"',
        chinese: '兔子哈哈大笑：“你太慢了！我闭着眼睛都能赢下这场比赛！”',
        speaker: 'Steve'
      },
      {
        id: 'hare_p4',
        english: 'The race began. The Hare dashed ahead like a lightning arrow and was soon far ahead.',
        chinese: '比赛开始了。兔子像离弦之箭一样疾驰而去，很快把对手远远甩在身后。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p5',
        english: 'Thinking he had plenty of time, the Hare lay down under a shady oak tree and fell sound asleep.',
        chinese: '兔子觉得时间还很充裕，便在一棵荫凉的橡树下躺下，呼呼大睡起来。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p6',
        english: 'Meanwhile, the Tortoise never stopped. Step by step, block by block, he walked patiently past the sleeping Hare.',
        chinese: '与此同时，乌龟一刻也没有停歇。一步一个方块，他耐心地走过了熟睡中的兔子。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p7',
        english: 'When the Hare woke up, the Tortoise had already crossed the finish line. Slow and steady wins the race!',
        chinese: '当兔子醒来时，乌龟已经冲过了终点线。稳扎稳打、持之以恒才是制胜之道！',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_three_pigs',
    title: 'The Three Little Pigs Build in Minecraft',
    titleZh: '三只小猪方块建房记',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Alex',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Mall (紫晶回响)',
      color: 'from-purple-600 via-indigo-800 to-slate-950',
      border: 'border-purple-400',
      icon: '🐷'
    },
    summary: '第一只小猪用稻草搭建，第二只小猪用橡木建造，第三只小猪采集坚硬的圆石与黑曜石...',
    vocabularyLoot: [
      { word: 'straw', phonetic: '/strɔː/', meaning: '稻草 / 麦秆' },
      { word: 'cobblestone', phonetic: '/ˈkɒblstəʊn/', meaning: '圆石 / 鹅卵石' },
      { word: 'obsidian', phonetic: '/ɒbˈsɪdiən/', meaning: '黑曜石' },
      { word: 'solid', phonetic: '/ˈsɒlɪd/', meaning: '坚固的 / 结实的' }
    ],
    paragraphs: [
      {
        id: 'pigs_p1',
        english: 'Three little pigs set out into the sunny forest to build their very own dream houses.',
        chinese: '三只小猪结伴走进阳光明媚的森林，准备建造属于自己的梦想小屋。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p2',
        english: 'The first lazy pig quickly built a simple hut out of yellow wheat straw bales.',
        chinese: '第一只懒惰的小猪用黄色的小麦干草块飞快地搭了一座简陋的小草屋。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p3',
        english: 'The second pig spent a little more time and constructed a neat cottage made of oak wood planks.',
        chinese: '第二只小猪多花了一点时间，用橡木木板建造了一座整洁的小木屋。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p4',
        english: 'The third hardworking pig mined deep underground and built a strong fortress out of cobblestone and obsidian.',
        chinese: '第三只勤劳的小猪在地下深处采矿，用坚固的圆石和黑曜石建造了一座坚不可摧的堡垒。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p5',
        english: 'One stormy night, a hungry Creeper and a wild Wolf came to blow the houses down.',
        chinese: '在一个暴风雨之夜，一只饥饿的苦力怕和野狼前来，试图摧毁这些房屋。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p6',
        english: 'The straw and wood huts collapsed, but the stone fortress stood firm and protected all three brothers safely.',
        chinese: '草屋和木屋倒塌了，但坚硬的石头堡垒岿然不动，安全地守护了三兄弟。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_iron_golem',
    title: 'The Iron Golem and the Little Poppy',
    titleZh: '铁傀儡与小红花虞美人',
    category: 'mc_adventure',
    categoryName: '🤖 MC 暖心守护篇',
    narrator: 'Steve',
    durationApprox: '3 分钟',
    discTheme: {
      name: 'Mellohi (粉晶之梦)',
      color: 'from-fuchsia-600 via-pink-700 to-slate-950',
      border: 'border-fuchsia-400',
      icon: '🌹'
    },
    summary: '高大威猛的铁傀儡默默守护着村民。在宁静的午后，他弯下腰，将一朵鲜红的虞美人送给村里的小女孩...',
    vocabularyLoot: [
      { word: 'golem', phonetic: '/ˈɡəʊləm/', meaning: '傀儡 / 守护者' },
      { word: 'protect', phonetic: '/prəˈtekt/', meaning: '保护 / 守护' },
      { word: 'poppy', phonetic: '/ˈpɒpi/', meaning: '虞美人（红花）' },
      { word: 'village', phonetic: '/ˈvɪlɪdʒ/', meaning: '村庄' }
    ],
    paragraphs: [
      {
        id: 'golem_p1',
        english: 'In the center of a quiet village stood a giant Iron Golem with glowing friendly green eyes.',
        chinese: '在宁静村庄的正中央，矗立着一位身躯高大、有着友好绿色眼睛的铁傀儡。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p2',
        english: 'Day and night, rain or shine, he patrolled the cobblestone streets to keep all villagers safe from monsters.',
        chinese: '日日夜夜，风雨无阻，他在鹅卵石街道上巡逻，保护所有村民不受怪物的伤害。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p3',
        english: 'Though his iron body was heavy and strong, inside he possessed a warm and gentle heart.',
        chinese: '虽然他的铁躯沉重而强壮，但在坚硬的铁甲之下，他拥有一颗无比温柔的心。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p4',
        english: 'One spring morning, a little villager girl was playing near the village well.',
        chinese: '一个春天的早晨，一位村民小女孩在村庄的水井旁玩耍。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p5',
        english: 'The Iron Golem knelt down slowly, picked a bright red poppy flower, and handed it to her with a smile.',
        chinese: '铁傀儡慢慢地单膝跪下，摘下一朵鲜艳的红色虞美人花，微笑着递给了她。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p6',
        english: 'The little girl giggled happily, and peace filled the lovely Minecraft valley.',
        chinese: '小女孩开心地咯咯笑了起来，宁静祥和充满了这片美丽的 Minecraft 山谷。',
        speaker: 'Steve'
      }
    ]
  }
];
