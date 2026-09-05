import { RadioStory } from '../storyTypes';

export const MC_ADVENTURE_STORIES: RadioStory[] = [
  {
    id: 'story_lost_wolf',
    title: 'The Lost Wolf in the Snowy Taiga',
    titleZh: '雪原针叶林里迷路的小白狼',
    category: 'mc_adventure',
    categoryName: '🌲 MC 森林探险篇',
    narrator: 'Alex',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Otherside (星空之境)',
      color: 'from-cyan-600 via-blue-700 to-indigo-950',
      border: 'border-cyan-400',
      icon: '🐺'
    },
    summary: '飘着漫天大雪的黄昏，Alex 深入积雪覆盖的原始针叶林，在冰霜灌木丛后发现了一只瑟瑟发抖的幼狼。在突遇骷髅射手的危机时刻，一根洁白的骨头与温柔的信任，铸就了一段生死相随的深厚羁绊...',
    vocabularyLoot: [
      { word: 'taiga', phonetic: '/ˈtaɪɡə/', meaning: '针叶林 / 泰加林' },
      { word: 'whimper', phonetic: '/ˈwɪmpə(r)/', meaning: '抽泣 / 呜咽声' },
      { word: 'shiver', phonetic: '/ˈʃɪvə(r)/', meaning: '发抖 / 战栗' },
      { word: 'tame', phonetic: '/teɪm/', meaning: '驯服 / 温驯的' },
      { word: 'faithful', phonetic: '/ˈfeɪθfl/', meaning: '忠诚的 / 守信的' },
      { word: 'companion', phonetic: '/kəmˈpænjən/', meaning: '同伴 / 伴侣' }
    ],
    paragraphs: [
      {
        id: 'wolf_p1',
        english: 'As twilight fell over the snowy taiga, cold wind whispered through tall spruce trees covered in heavy white powder.',
        chinese: '当夜幕笼罩雪原针叶林，刺骨的寒风在挂满厚重白雪的高大云杉树间低声呼啸。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p2',
        english: 'Alex tightened her thick wool jacket, carrying an iron lantern and a backpack filled with sweet berries and red apples.',
        chinese: 'Alex 裹紧了身上厚实的羊毛外套，提着一盏铁灯笼，背包里装满了刚采摘的甜浆果和新鲜红苹果。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p3',
        english: 'Suddenly, a faint, trembling whimper drifted through the frozen air from behind a snowy sweet berry bush.',
        chinese: '突然，一阵微弱而颤抖的呜咽声穿过冰冷的空气，从一丛挂着积雪的甜浆果灌木后飘来。',
        speaker: 'Steve'
      },
      {
        id: 'wolf_p4',
        english: 'Alex knelt down quietly in the soft powder snow and raised her lantern to peer into the dark branches.',
        chinese: 'Alex 悄悄在松软的积雪中单膝跪下，举起灯笼，仔细端详着昏暗树枝后的动静。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p5',
        english: 'There huddled a little white wolf pup, shivering uncontrollably with ice crystals clinging to its soft fur.',
        chinese: '那里蜷缩着一只小白狼幼崽，冻得浑身发抖，柔软的绒毛上凝结着晶莹的冰晶。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p6',
        english: '"Don’t be scared, little one," Alex whispered softly. "You are completely safe now."',
        chinese: '“别害怕，小家伙，”Alex 温柔地轻声说道，“你现在安全了。”',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p7',
        english: 'Just then, the rattling sound of bones echoed from the trees! A stray skeleton drew its bow in the twilight!',
        chinese: '就在这时，林间传来了令人毛骨悚然的骨骼碰撞声！一只流浪骷髅正在暮色中缓缓拉开长弓！',
        speaker: 'Steve'
      },
      {
        id: 'wolf_p8',
        english: 'Alex quickly raised her wooden shield, deflecting the arrow with a loud thud, and pulled a clean bone from her satchel.',
        chinese: 'Alex 迅速举起木盾，砰的一声挡飞了箭矢，随即从随身皮包里拿出一根洁白的骨头。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p9',
        english: 'She gently presented the bone to the shivering pup while protecting it from the cold wind.',
        chinese: '她在为小狼抵挡寒风的同时，温柔地将骨头递到了小狼眼前。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p10',
        english: 'The little wolf sniffed the bone eagerly, took a delighted crunch, and bright red floating hearts magically sparkled above its head!',
        chinese: '小狼急切地闻了闻骨头，开心地咔嚓咬了下去，几颗亮晶晶的红色小爱心神奇地在它头顶飘浮绽放！',
        speaker: 'Steve'
      },
      {
        id: 'wolf_p11',
        english: 'A neat red collar appeared around the wolf’s neck, and it let out a proud, cheerful bark, standing bravely beside its new friend.',
        chinese: '一个精致的红色项圈出现在狼的颈项上，它发出一声骄傲欢快的叫声，勇敢地站立在新朋友的身旁。',
        speaker: 'Alex'
      },
      {
        id: 'wolf_p12',
        english: 'Together, girl and wolf walked through the moonlit forest toward a warm cabin where glowing fireplace logs awaited them.',
        chinese: '女孩与忠诚的狼并肩穿行在月光浸染的林海雪原，朝着不远处壁炉柴火噼啪作响的温暖木屋走去。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_golden_apple',
    title: 'Steve and the Desert Pyramid Secret',
    titleZh: '史蒂夫与远古沙漠金字塔之谜',
    category: 'mc_adventure',
    categoryName: '🏜️ MC 沙漠遗迹篇',
    narrator: 'Steve',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Pigstep (下界烈焰)',
      color: 'from-amber-600 via-yellow-700 to-amber-950',
      border: 'border-yellow-400',
      icon: '🍎'
    },
    summary: '炽热烈日下，Steve 骑着高大双峰骆驼横跨浩瀚无垠的金色沙海。在两座古老砂岩尖塔之间，他发现了深埋千年的沙漠神殿。面对危机四伏的 TNT 压力板暗器陷阱，唯有沉着冷静才能夺得绝世闪耀的附魔金苹果...',
    vocabularyLoot: [
      { word: 'pyramid', phonetic: '/ˈpɪrəmɪd/', meaning: '金字塔 / 棱锥体' },
      { word: 'sandstone', phonetic: '/ˈsændstəʊn/', meaning: '砂岩' },
      { word: 'pressure plate', phonetic: '/ˈpreʃə pleɪt/', meaning: '压力板' },
      { word: 'disarm', phonetic: '/dɪsˈɑːm/', meaning: '解除 / 拆除武装' },
      { word: 'enchanted', phonetic: '/ɪnˈtʃɑːntɪd/', meaning: '附魔的 / 施魔法的' },
      { word: 'treasure', phonetic: '/ˈtreʒə(r)/', meaning: '珍宝 / 宝藏' }
    ],
    paragraphs: [
      {
        id: 'apple_p1',
        english: 'Under the blistering noon sun, endless golden waves of sand stretched across the vast desert horizon.',
        chinese: '在正午骄阳的炙烤下，漫无边际的金色沙浪延绵至广袤沙漠的地平线尽头。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p2',
        english: 'Steve patted the soft neck of his trusty camel, checking his compass, water canteens, and glistening diamond pickaxe.',
        chinese: 'Steve 轻轻拍了拍忠实骆驼柔软的脖颈，检查着指南针、水囊以及闪耀着寒光的钻石镐。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p3',
        english: 'Rising majestically above the shimmering heat dunes were two square carved sandstone towers adorned with bright orange terracotta.',
        chinese: '在热浪蒸腾的沙丘之上，两座由雕纹砂岩砌成、饰有鲜艳橙色陶瓦的方形塔楼傲然耸立。',
        speaker: 'Alex'
      },
      {
        id: 'apple_p4',
        english: '"A Desert Pyramid!" Steve exclaimed with excitement. "Legends say ancient pharaohs buried rare treasures deep underneath!"',
        chinese: '“沙漠金字塔！”Steve 兴奋地惊呼道，“传说远古的先祖将罕见的珍宝深埋在地下殿堂之中！”',
        speaker: 'Steve'
      },
      {
        id: 'apple_p5',
        english: 'Entering the cool, shadow-filled hall, Steve placed torches along the sandstone walls, revealing an ornate blue terracotta seal on the floor.',
        chinese: '步入清凉而幽暗的大殿，Steve 在砂岩墙壁上插满火把，地面上一枚华美的蓝色陶瓦印记显露出来。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p6',
        english: 'Every veteran explorer knows the deadly trap: directly underneath that colored seal lies a deep drop onto a stone pressure plate!',
        chinese: '每一位资深探险家都清楚这里的致命陷阱：在彩色印记正下方，是一口直通石质压力板的垂直深坑！',
        speaker: 'Alex'
      },
      {
        id: 'apple_p7',
        english: 'If someone steps carelessly onto the plate, nine hidden blocks of TNT beneath will detonate simultaneously, destroying everything!',
        chinese: '如果有人不慎踩中压力板，下方的九颗 TNT 炸药将瞬间引爆，将一切化为乌有！',
        speaker: 'Alex'
      },
      {
        id: 'apple_p8',
        english: 'Steve knelt down and used his pickaxe to carefully mine the outer ring of sandstone blocks instead of dropping down the middle.',
        chinese: 'Steve 单膝跪地，小心翼翼地挥镐开凿外圈的砂岩方块，避开正中间的空洞，沿着侧面阶梯向下挖掘。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p9',
        english: 'He descended safely with a ladder and immediately disarmed the stone pressure plate with one precise strike of his pickaxe.',
        chinese: '他顺着梯子平稳下降到底部，果断挥起镐头，精准地将石质压力板安全拆除。',
        speaker: 'Steve'
      },
      {
        id: 'apple_p10',
        english: 'Surrounding him stood four ancient loot chests untouched for centuries in the quiet darkness.',
        chinese: '环绕在他四周的，是四只在静谧黑暗中尘封了数个世纪之久的古老宝箱。',
        speaker: 'Alex'
      },
      {
        id: 'apple_p11',
        english: 'Opening the lids, Steve gasped: brilliant green emeralds, golden horse armor, an Enchanted Book of Mending, and a glowing Golden Apple!',
        chinese: '掀开箱盖，Steve 不禁屏住呼吸：璀璨的绿宝石、金质马铠、一本经验修补附魔书，以及一颗散发着耀眼光芒的附魔金苹果！',
        speaker: 'Steve'
      },
      {
        id: 'apple_p12',
        english: 'The magical golden fruit radiated warm energy, granting absorption shields and swift regeneration to whoever held it.',
        chinese: '这颗神奇的黄金果实散发着温热的生命能量，能赋予持有者坚不可摧的伤害吸收护盾与生命恢复之力。',
        speaker: 'Alex'
      },
      {
        id: 'apple_p13',
        english: 'Steve packed his saddlebags with gratitude and rode beneath the starlit desert sky, victorious and wise.',
        chinese: 'Steve 心怀感恩将珍宝装满马鞍袋，在漫天繁星的沙漠夜空下载誉策驼而行，充满智慧与喜悦。',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_first_night',
    title: 'Alex’s First Survival Night',
    titleZh: '爱丽克斯的极限生存初夜',
    category: 'mc_adventure',
    categoryName: '🏡 MC 新手生存篇',
    narrator: 'Alex',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Chirp (红石之歌)',
      color: 'from-rose-600 via-red-700 to-neutral-900',
      border: 'border-rose-400',
      icon: '🪵'
    },
    summary: '降临在未知的大陆边缘，头顶太阳以肉眼可见的速度坠向山峦。Alex 争分夺秒采集原木、打磨石器、烧制木炭并在悬崖峭壁中开凿避难所。当僵尸的低吼在木门外回荡，这间点缀着温暖火把的小屋成为了最坚实的港湾...',
    vocabularyLoot: [
      { word: 'survival', phonetic: '/səˈvaɪvl/', meaning: '生存 / 幸存' },
      { word: 'planks', phonetic: '/plæŋks/', meaning: '木板' },
      { word: 'crafting table', phonetic: '/ˈkrɑːftɪŋ ˈteɪbl/', meaning: '工作台' },
      { word: 'furnace', phonetic: '/ˈfɜːnɪs/', meaning: '熔炉' },
      { word: 'charcoal', phonetic: '/ˈtʃɑːkəʊl/', meaning: '木炭' },
      { word: 'shelter', phonetic: '/ˈʃeltə(r)/', meaning: '避难所 / 居所' }
    ],
    paragraphs: [
      {
        id: 'night_p1',
        english: 'Alex opened her eyes on a lush green cliffside overlooking an endless turquoise ocean.',
        chinese: 'Alex 睁开双眼，发现自己置身于一处草木繁茂的翠绿悬崖上，俯瞰着无边无际的碧蓝海洋。',
        speaker: 'Alex'
      },
      {
        id: 'night_p2',
        english: 'The square sun was already past its zenith, casting long shadows across the valley. She had less than ten minutes before nightfall.',
        chinese: '方形的太阳已经越过天空正顶，将长长的阴影投洒在山谷间。距离夜幕降临只剩不到十分钟。',
        speaker: 'Steve'
      },
      {
        id: 'night_p3',
        english: 'Remembering the golden rule of survival, Alex sprinted toward a sturdy oak tree and began punching the trunk with bare fists.',
        chinese: '牢记着荒野求生的黄金法则，Alex 飞奔向一棵结实的橡树，开始用双手全力敲击树干。',
        speaker: 'Alex'
      },
      {
        id: 'night_p4',
        english: 'With rhythmic thuds, five solid logs popped into her inventory. She converted them into planks and crafted a wooden Crafting Table.',
        chinese: '随着富有节奏的闷响，五根坚固的原木落入背包。她迅速将其分解为木板，并合成了第一张工作台。',
        speaker: 'Alex'
      },
      {
        id: 'night_p5',
        english: 'Using sticks and planks, she fashioned a wooden pickaxe and immediately dug into the exposed gray stone of the mountainside.',
        chinese: '利用木棍与木板，她做出一把木镐，立刻向山体表面裸露的灰色岩石开凿挖掘。',
        speaker: 'Steve'
      },
      {
        id: 'night_p6',
        english: 'Within moments, cobblestone yielded a stronger stone sword, a stone pickaxe, and a heavy cobblestone furnace.',
        chinese: '片刻之间，采集到的圆石便打造成了更加坚韧的石剑、石镐，以及一座厚重的圆石熔炉。',
        speaker: 'Alex'
      },
      {
        id: 'night_p7',
        english: 'Because no coal was found nearby, Alex ingeniously smelted raw logs with spare planks to produce black, fragrant charcoal.',
        chinese: '因为附近没有天然煤矿，Alex 机智地用剩余木板作为燃料烘烤原木，烧制出了乌黑芬芳的木炭。',
        speaker: 'Steve'
      },
      {
        id: 'night_p8',
        english: 'She combined charcoal with wooden sticks, lighting up four brilliant torches that flickered with warm golden flames.',
        chinese: '她将木炭与木棍组合，合成了四支散发着温暖金色光晕、熊熊燃烧的明亮火把。',
        speaker: 'Alex'
      },
      {
        id: 'night_p9',
        english: 'The last rays of crimson sunlight dipped beneath the sea. The square moon rose, and eerie moans filled the dark plains.',
        chinese: '最后一抹深红色的晚霞没入海面。方形的月亮升起，阴森的低吼声顿时弥漫在漆黑的原野上。',
        speaker: 'Steve'
      },
      {
        id: 'night_p10',
        english: 'Alex sealed the entrance of her cliff cave with oak planks, leaving a glass window to watch the starry square sky.',
        chinese: 'Alex 用橡木板牢牢封堵住悬崖洞穴的入口，只留下一面玻璃小窗，用以凝望满天繁星的方形夜空。',
        speaker: 'Alex'
      },
      {
        id: 'night_p11',
        english: 'Zombies groaned and spiders hissed outside in the dark, but inside her little bunker, it was safe, warm, and bright.',
        chinese: '尽管门外有僵尸在徘徊呻吟、蜘蛛在黑夜中嘶鸣，但在她的小小壁垒里，一切都是那么安全、温暖且光明。',
        speaker: 'Steve'
      },
      {
        id: 'night_p12',
        english: 'She crafted a soft red bed from sheep wool, closing her eyes in peaceful slumber, ready for tomorrow’s grand mining journey.',
        chinese: '她用羊毛精心制成一张柔软的红色床铺，闭上双眼安然入梦，满怀信心地准备迎接明日更加宏大的挖矿旅程。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_ocean_monument',
    title: 'The Mystery of the Sunken Ocean Monument',
    titleZh: '深海神殿与海晶石守护者探秘',
    category: 'mc_adventure',
    categoryName: '🌊 MC 海洋奇境篇',
    narrator: 'Alex',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Wait (深蓝波涛)',
      color: 'from-teal-600 via-cyan-800 to-slate-950',
      border: 'border-teal-400',
      icon: '🔱'
    },
    summary: '乘风破浪的橡木帆船停泊在深海大裂谷上方。Alex 和 Steve 饮下水下呼吸与夜视药水，潜入散发幽绿微光的海晶石神殿。面对庞大远古守卫者施加的挖掘疲劳诅咒，他们凭借水门战术与三叉戟化险为夷，赢取了珍稀的金块与吸水海绵...',
    vocabularyLoot: [
      { word: 'monument', phonetic: '/ˈmɒnjumənt/', meaning: '纪念碑 / 远古神殿' },
      { word: 'prismarine', phonetic: '/ˈprɪzməriːn/', meaning: '海晶石' },
      { word: 'potion', phonetic: '/ˈpəʊʃn/', meaning: '药水 / 魔药' },
      { word: 'guardian', phonetic: '/ˈɡɑːdiən/', meaning: '守卫者 / 护卫' },
      { word: 'sponge', phonetic: '/spʌndʒ/', meaning: '海绵' },
      { word: 'trident', phonetic: '/ˈtraɪdnt/', meaning: '三叉戟' }
    ],
    paragraphs: [
      {
        id: 'ocean_p1',
        english: 'Gulls circled overhead as Alex and Steve rowed their oak boat over the deep, endless indigo ocean.',
        chinese: '海鸥在头顶盘旋，Alex 和 Steve 划动着橡木小船，航行在深邃无垠的靛蓝大洋之上。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p2',
        english: 'Beneath the calm waves lay a breathtaking sight: a colossal pyramid of aqua prismarine bricks glowing softly in the dark abyss.',
        chinese: '在平静的波涛之下，一处令人屏息的壮丽景象若隐若现：一座由水蓝色海晶石砖砌成的庞大神殿，在幽暗的深渊中泛着微光。',
        speaker: 'Steve'
      },
      {
        id: 'ocean_p3',
        english: '"Drink your Potion of Water Breathing and Night Vision now!" Alex instructed, handing Steve a blue glass flask.',
        chinese: '“立刻喝下水下呼吸与夜视药水！”Alex 叮嘱道，递给 Steve 一瓶蔚蓝色的玻璃药水瓶。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p4',
        english: 'They dove gracefully into the water. Suddenly, the murky depths transformed into crystal-clear turquoise halls illuminated by Sea Lanterns.',
        chinese: '他们优雅地扎入水中。刹那间，浑浊的深海在夜视药水的作用下化为晶莹剔透的水晶宫殿，被海晶灯照耀得通明透亮。',
        speaker: 'Steve'
      },
      {
        id: 'ocean_p5',
        english: 'Spiky, one-eyed Guardians darted through the water, targeting the intruders with crackling orange laser beams.',
        chinese: '浑身长满尖刺、独眼森然的守卫者在水中穿梭，射出一道道噼啪作响的橙色激光，直指两位闯入者。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p6',
        english: 'A ghostly gray face flashed across their vision with a haunting wail: the Elder Guardian had inflicted Mining Fatigue III!',
        chinese: '一张幽灵般的灰白面孔伴随着凄厉的哀鸣在眼前一闪而过：远古守卫者对他们施加了三级挖掘疲劳诅咒！',
        speaker: 'Steve'
      },
      {
        id: 'ocean_p7',
        english: 'Their mining pickaxes felt heavier than lead, making it almost impossible to break through the thick prismarine walls.',
        chinese: '两人的矿镐瞬间沉重如铅，几乎无法击碎厚实的海晶石外墙。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p8',
        english: '"Follow me to the central treasure chamber!" Steve signaled with his hand, guiding Alex through underwater arched corridors.',
        chinese: '“跟我游向中央宝藏密室！”Steve 打出潜水手势，引领 Alex 穿过蜿蜒的拱形水底回廊。',
        speaker: 'Steve'
      },
      {
        id: 'ocean_p9',
        english: 'In the grand ceiling room, the massive, pale Elder Guardian loomed, ready to blast them with high-powered ocean magic.',
        chinese: '在宏伟的高顶主殿中，身形庞大、皮肤苍白的远古守卫者盘踞在此，正准备释放高威力的海洋法术冲击。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p10',
        english: 'Alex raised her Loyalty Trident, aiming directly at the creature with lightning-fast reflexes and heroic determination.',
        chinese: 'Alex 举起附有忠诚魔咒的三叉戟，凭借如闪电般迅捷的反应与英勇的决心，直指巨兽的核心。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p11',
        english: 'With a resounding burst of bubbles, the beast was vanquished, dropping rare wet sponges and restoring their mining strength.',
        chinese: '伴随着一阵剧烈翻腾的气泡爆炸，巨兽终于被击退，散落下一批珍贵的湿海绵，并解除了沉重的挖掘束缚。',
        speaker: 'Steve'
      },
      {
        id: 'ocean_p12',
        english: 'Steve placed a door against the stone to create an air pocket, enabling them to smelt the sponges and harvest eight pure gold blocks from the core.',
        chinese: 'Steve 巧妙地在石壁前立起一扇木门隔出换气空气舱，使他们得以烘干海绵并采集神殿核心的八颗纯金块。',
        speaker: 'Alex'
      },
      {
        id: 'ocean_p13',
        english: 'Swimming back to the surface beneath sunset clouds, the two partners cheered for the greatest underwater conquest of their lives.',
        chinese: '迎着漫天晚霞游回海面，两位并肩作战的伙伴相视欢呼，庆祝他们人生中最伟大的水下征服。',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_nether_fortress',
    title: 'Expedition to the Blazing Nether Fortress',
    titleZh: '突进下界要塞与炽烈烈焰人',
    category: 'mc_adventure',
    categoryName: '🔥 MC 下界远征篇',
    narrator: 'Steve',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Stal (黑曜石交响)',
      color: 'from-orange-600 via-red-800 to-stone-950',
      border: 'border-orange-500',
      icon: '🔥'
    },
    summary: '由十四颗坚不可摧的黑曜石筑起传送门，打火石迸发出紫色流光的空间裂隙。Steve 与 Alex 首次踏足热浪翻滚的下界维度。在深红森林与滚烫岩浆瀑布交织的险境中，他们寻觅着黑色下界砖要塞，誓要取得炼制高级药水必不可少的烈焰棒...',
    vocabularyLoot: [
      { word: 'portal', phonetic: '/ˈpɔːtl/', meaning: '传送门 / 入口' },
      { word: 'obsidian', phonetic: '/ɒbˈsɪdiən/', meaning: '黑曜石' },
      { word: 'fortress', phonetic: '/ˈfɔːtrəs/', meaning: '要塞 / 堡垒' },
      { word: 'blaze', phonetic: '/bleɪz/', meaning: '烈焰人 / 烈火' },
      { word: 'brewing', phonetic: '/ˈbruːɪŋ/', meaning: '酿造 / 调制药水' },
      { word: 'dimension', phonetic: '/daɪˈmenʃn/', meaning: '维度 / 空间' }
    ],
    paragraphs: [
      {
        id: 'nether_p1',
        english: 'Fourteen heavy blocks of dark purple obsidian formed a rectangular frame against the stone wall of Steve’s base.',
        chinese: '十四块深紫色的沉重黑曜石方块，在 Steve 基地的石壁前搭建起一座规整的矩形门框。',
        speaker: 'Steve'
      },
      {
        id: 'nether_p2',
        english: 'Alex struck flint and steel together. A spark flew, and a shimmering violet portal sprang to life with humming cosmic energy.',
        chinese: 'Alex 划动打火石。火星迸射之间，一圈波光粼粼的紫色流光门帘伴随着低沉的宇宙共鸣声霍然洞开。',
        speaker: 'Alex'
      },
      {
        id: 'nether_p3',
        english: 'Stepping through the dimensional barrier, they felt immediate searing heat. Below them roared a crimson sea of molten lava.',
        chinese: '穿过维度的空间屏障，扑面而来的是滚烫灼人的热浪。在他们脚下，奔腾翻涌着赤红色的熔岩火海。',
        speaker: 'Steve'
      },
      {
        id: 'nether_p4',
        english: 'Towering weeping vines hung from crimson trees, while giant white Ghasts floated high above the burning netherrack ceiling.',
        chinese: '猩红巨树上垂下依依的垂泪藤，而庞大的白色恶魂在燃烧的下界岩穹顶高处幽幽游荡。',
        speaker: 'Alex'
      },
      {
        id: 'nether_p5',
        english: '"Look over there across the lava lake!" Steve pointed. "A dark red bridge made of nether bricks! That is the fortress!"',
        chinese: '“快看熔岩湖对岸！”Steve 指向远方，“一座由下界砖砌成的深红色飞桥！那就是下界要塞！”',
        speaker: 'Steve'
      },
      {
        id: 'nether_p6',
        english: 'They bridged carefully across the boiling lake, keeping low to avoid attracting the attention of patrolling Wither Skeletons.',
        chinese: '他们小心翼翼地在沸腾的岩浆湖上架桥前行，弯腰潜行，以防引来巡逻的凋灵骷髅的注意。',
        speaker: 'Alex'
      },
      {
        id: 'nether_p7',
        english: 'Inside the dark fortress corridor, the distinctive metallic spinning whir of a monster spawner echoed ahead.',
        chinese: '步入昏暗幽深的要塞长廊，前方回荡起刷怪笼特有的金属齿轮旋转轰鸣声。',
        speaker: 'Steve'
      },
      {
        id: 'nether_p8',
        english: 'Blazes appeared! Floating fiery monsters surrounded by swirling yellow rods shot explosive fireballs toward the doorway!',
        chinese: '烈焰人现身了！这些被金黄旋转烈焰棒环绕的悬浮火怪，正朝着走廊入口喷射出连环爆裂火球！',
        speaker: 'Alex'
      },
      {
        id: 'nether_p9',
        english: 'Steve held up his enchanted shield, absorbing the fiery impact with metallic clangs while Alex drank a Potion of Fire Resistance.',
        chinese: 'Steve 稳稳举起附魔盾牌，在金属碰撞声中化解了火球冲击，与此同时 Alex 仰头饮下了一瓶抗火药水。',
        speaker: 'Steve'
      },
      {
        id: 'nether_p10',
        english: 'Immune to burns, Alex charged forward with her diamond sword, scattering the Blazes and securing six shining golden Blaze Rods!',
        chinese: '获得了免疫灼烧之力的 Alex 手持钻石剑果断前冲，击溃了烈焰人群，成功斩获了六根金光灿灿的烈焰棒！',
        speaker: 'Alex'
      },
      {
        id: 'nether_p11',
        english: 'Beside the spawner staircase, they also gathered crimson Nether Wart growing in beds of soul sand.',
        chinese: '在刷怪笼台阶旁，他们还采集到了生长在灵魂沙上的鲜红下界疣。',
        speaker: 'Steve'
      },
      {
        id: 'nether_p12',
        english: '"With these rods and warts, we can craft a Brewing Stand and synthesize potions of strength, healing, and invisibility!" Alex celebrated.',
        chinese: '“有了这些烈焰棒和下界疣，我们就能制造酿造台，炼制力量、生命恢复和隐形药水了！”Alex 欢欣鼓舞。',
        speaker: 'Alex'
      },
      {
        id: 'nether_p13',
        english: 'Tired but thrilled, the brave adventurers stepped back into the purple portal, returning triumphant to the tranquil Overworld.',
        chinese: '虽满身疲惫却心潮澎湃，两位勇敢的探险家步入紫色传送门，凯旋返回安宁祥和的主世界。',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_iron_golem',
    title: 'The Iron Golem and the Little Poppy',
    titleZh: '铁傀儡与小红花虞美人的守护誓约',
    category: 'mc_adventure',
    categoryName: '🤖 MC 暖心守护篇',
    narrator: 'Steve',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Mellohi (粉晶之梦)',
      color: 'from-fuchsia-600 via-pink-700 to-slate-950',
      border: 'border-fuchsia-400',
      icon: '🌹'
    },
    summary: '高大威严的铁傀儡日夜守卫着方块小镇。在深夜僵尸围攻的危难关头，他挥动铁臂将怪物抛向高空；而在阳光明媚的清晨，身躯庞大的铁巨人却极其轻柔地摘下一朵鲜红的虞美人花，悄悄递到了失落的小女孩手中...',
    vocabularyLoot: [
      { word: 'golem', phonetic: '/ˈɡəʊləm/', meaning: '傀儡 / 守护石人' },
      { word: 'patrol', phonetic: '/pəˈtrəʊl/', meaning: '巡逻 / 巡查' },
      { word: 'defend', phonetic: '/dɪˈfend/', meaning: '保卫 / 防御' },
      { word: 'poppy', phonetic: '/ˈpɒpi/', meaning: '虞美人（红花）' },
      { word: 'gentle', phonetic: '/ˈdʒentl/', meaning: '温柔的 / 和蔼的' },
      { word: 'gratitude', phonetic: '/ˈɡrætɪtjuːd/', meaning: '感激 / 感恩之情' }
    ],
    paragraphs: [
      {
        id: 'golem_p1',
        english: 'In the center of a bustling village paved with cobblestone streets stood an imposing Iron Golem with vine-covered shoulders.',
        chinese: '在铺满鹅卵石街道的繁华村庄中心，矗立着一位肩头缠绕着藤蔓、身躯高大威严的铁傀儡。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p2',
        english: 'Forged from four solid iron blocks and a carved pumpkin, his eyes glowed with steady, protective green light.',
        chinese: '他由四块坚不可摧的铁块与一颗雕刻南瓜铸就而成，双眼中闪烁着坚定而守护的绿色微光。',
        speaker: 'Alex'
      },
      {
        id: 'golem_p3',
        english: 'Day and night, under sunshine and heavy thunder showers, he patrolled the perimeter to keep every villager safe.',
        chinese: '日日夜夜，无论艳阳高照还是雷雨倾盆，他不知疲倦地巡视在村庄边缘，守护着每位村民的安全。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p4',
        english: 'One midnight, dark clouds concealed the moon. A hungry horde of zombies emerged from the gloomy dark oak forest.',
        chinese: '某个午夜，乌云遮蔽了明月。一大群饥饿的僵尸从幽暗浓密的黑橡木森林中蜂拥而出。',
        speaker: 'Alex'
      },
      {
        id: 'golem_p5',
        english: 'The village alarm bell clanged furiously! Villagers locked their wooden doors and hid trembling in their homes.',
        chinese: '村庄警钟急促鸣响！村民们纷纷锁上木门，颤抖着躲藏在家中。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p6',
        english: 'Without a moment’s hesitation, the Iron Golem charged forward, his heavy iron steps shaking the very ground.',
        chinese: '没有丝毫犹豫，铁傀儡迎难而上，沉重有力的铁蹄震得大地嗡嗡作响。',
        speaker: 'Alex'
      },
      {
        id: 'golem_p7',
        english: 'With thunderous swings of his long metal arms, he tossed attacking monsters twenty feet into the night air, shattering their advance.',
        chinese: '伴随着长长铁臂如奔雷般的猛烈挥击，他将扑来的怪物抛向二十英尺的高空，彻底粉碎了敌人的进攻。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p8',
        english: 'Several scratches scarred his metallic chest, but he stood unwavering until the bright golden sunrise cleared all danger.',
        chinese: '虽然坚硬的铁胸上留下了道道抓痕，但他宛如钢铁长城般屹立不倒，直至破晓金阳将所有危险驱散。',
        speaker: 'Alex'
      },
      {
        id: 'golem_p9',
        english: 'Later that peaceful morning, a little villager girl named Mia was sitting by the village water fountain, looking sad.',
        chinese: '在那天祥和晴朗的上午，一位名叫 Mia 的村民小女孩独自坐在喷泉边，神情有些沮丧。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p10',
        english: 'The giant Iron Golem walked over quietly, each step gentle so as not to startle the little child.',
        chinese: '巨大的铁傀儡悄步走来，每一步都放得极轻极柔，生怕惊扰到了这个弱小的孩子。',
        speaker: 'Alex'
      },
      {
        id: 'golem_p11',
        english: 'He bent down on one massive iron knee, carefully plucked a vibrant red poppy flower, and held it out with a tender smile.',
        chinese: '他单膝跪在坚硬的地上，用巨大的铁指无比轻巧地摘下一朵盛开的鲜红虞美人，带着温柔的微笑递到了她面前。',
        speaker: 'Steve'
      },
      {
        id: 'golem_p12',
        english: 'Mia’s eyes sparkled with joy as she accepted the blossom. True strength is not just about battle, but the kindness to protect what you love.',
        chinese: 'Mia 的双眸绽放出惊喜的光芒，欣然接过了花朵。真正的强大不仅在于战无不胜的力量，更在于用温柔守护所爱之人的心。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_elytra_flight',
    title: 'The Great Elytra Flight to the End Ship',
    titleZh: '末地之城与鞘翅滑翔飞行记',
    category: 'mc_adventure',
    categoryName: '🌌 MC 末地探索篇',
    narrator: 'Alex',
    durationApprox: '5 分钟',
    discTheme: {
      name: '13 (幽冥回响)',
      color: 'from-violet-700 via-purple-900 to-black',
      border: 'border-purple-400',
      icon: '🪽'
    },
    summary: '击溃末影龙之后，中央岛屿升起了小巧璀璨的末地折跃门。Alex 和 Steve 投掷末影珍珠穿梭于万千悬浮小岛之间。穿越盛开紫颂花的末地外岛，一座宏伟的紫珀块城堡与漂浮在虚空之上的末地船赫然显现。传说中能让人自由翱翔天际的鞘翅，正静静等待着勇敢的滑翔者...',
    vocabularyLoot: [
      { word: 'elytra', phonetic: '/ˈelɪtrə/', meaning: '鞘翅 / 滑翔羽翼' },
      { word: 'void', phonetic: '/vɔɪd/', meaning: '虚空 / 虚无空间' },
      { word: 'gateway', phonetic: '/ˈɡeɪtweɪ/', meaning: '折跃门 / 通道' },
      { word: 'glide', phonetic: '/ɡlaɪd/', meaning: '滑翔 / 翱翔' },
      { word: 'shulker', phonetic: '/ˈʃʌlkə/', meaning: '潜影贝' },
      { word: 'levitation', phonetic: '/ˌlevɪˈteɪʃn/', meaning: '漂浮 / 悬浮状态' }
    ],
    paragraphs: [
      {
        id: 'elytra_p1',
        english: 'After the mighty Ender Dragon was defeated, a small bedrock structure with a glowing beacon opened high in the purple void sky.',
        chinese: '在强大的末影龙被击败后，一座高悬在紫色虚空天际、闪耀着信标光芒的基岩建筑悄然开启。',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p2',
        english: 'Alex tossed an Ender Pearl precisely into the tiny portal hole, teleporting thousands of blocks away to the outer End islands.',
        chinese: 'Alex 将一颗末影珍珠精准掷入狭窄的折跃门孔洞，瞬间跨越数千方块，传送到了浩瀚的末地外岛群。',
        speaker: 'Steve'
      },
      {
        id: 'elytra_p3',
        english: 'Weird purple Chorus Plants grew like alien trees across yellow end stone terrain, floating silently above infinite empty void.',
        chinese: '奇异的紫色紫颂植物如同外星树木般生长在淡黄色的末地石上，静静漂浮在深不见底的虚空之上。',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p4',
        english: '"Look ahead!" Steve called out through his diamond helmet. "A towering city of purpur pillars and stained glass!"',
        chinese: '“快看前面！”Steve 透过钻石盔甲呼喊道，“一座由紫珀柱和彩色玻璃构筑的高耸末地城！”',
        speaker: 'Steve'
      },
      {
        id: 'elytra_p5',
        english: 'Hovering right beside the highest tower of the city was a majestic wooden vessel: an ancient End Ship docked in midair!',
        chinese: '在城市最高塔楼的正前方，赫然停泊着一艘宏伟的木质飞船：一艘静止悬浮于半空之中的古老末地船！',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p6',
        english: 'As they climbed the exterior spirals, lurking Shulkers opened their shell boxes, firing swirling white bullets.',
        chinese: '当他们攀爬外侧回旋楼梯时，潜伏的潜影贝纷纷打开贝壳，发射出盘旋呼啸的白色魔法飞弹。',
        speaker: 'Steve'
      },
      {
        id: 'elytra_p7',
        english: 'Hit by the bullet, Alex experienced the strange sensation of Levitation, floating uncontrollably upward toward the high sky.',
        chinese: '被飞弹击中后，Alex 体验到了奇异的漂浮状态，身不由己地朝着高空缓缓升起。',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p8',
        english: 'Thinking quickly, Steve tossed an Ender Pearl straight onto the ship’s wooden deck, pulling Alex along with a lead before the effect wore off.',
        chinese: '机智敏捷的 Steve 立即将末影珍珠掷向飞船的木甲板，并在漂浮失效前用拴绳稳稳拉住了 Alex。',
        speaker: 'Steve'
      },
      {
        id: 'elytra_p9',
        english: 'On the ship’s prow sat the legendary carved Dragon Head, while inside the captain’s hold hung an item frame holding a sleek pair of Elytra.',
        chinese: '在飞船的船头昂然矗立着传说中的巨龙首，而在船长舱室的物品展示框中，正静静陈列着一对轻盈修长的鞘翅！',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p10',
        english: 'Alex equipped the beetle-like wings onto her chestplate and ignited a propulsion firework in her left hand.',
        chinese: 'Alex 将如甲虫飞翼般的鞘翅装备在胸甲上，左手握紧了一束用于助推的烟花火箭。',
        speaker: 'Alex'
      },
      {
        id: 'elytra_p11',
        english: 'She leapt bravely into the endless void, spread the wings, fired the rocket, and soared like an eagle across the purple stars!',
        chinese: '她毅然纵身跃入无边无际的虚空，展开双翼，点燃火箭，如雄鹰般在紫色的璀璨群星间自由翱翔！',
        speaker: 'Steve'
      },
      {
        id: 'elytra_p12',
        english: '"We can fly! The entire world is beneath our wings!" she laughed, dipping and diving with absolute freedom and wonder.',
        chinese: '“我们能飞了！整个世界都在我们的双翼之下！”她开怀大笑，在惊叹与极致自由中灵动滑翔。',
        speaker: 'Alex'
      }
    ]
  }
];
