export interface BiomeChapter {
  unit: number;
  title: string;
  titleZh: string;
  biomeName: string;
  biomeNameZh: string;
  icon: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
  bossName: string;
  bossIcon: string;
  storyOverview: string;
  lessonsStory: Record<number, string>;
}

export const BIOME_CHAPTERS: BiomeChapter[] = [
  {
    unit: 1,
    title: 'Chapter 1: Village Landing',
    titleZh: '第 1 章：村庄启航与初次相遇',
    biomeName: 'Oak Plains',
    biomeNameZh: '橡木平原·初始村庄',
    icon: '🏡',
    bgGradient: 'from-emerald-500/20 via-green-400/10 to-amber-100/30',
    borderColor: '#487E2C',
    accentColor: '#487E2C',
    textColor: 'text-[#2D2D2D]',
    badgeBg: 'bg-emerald-600',
    bossName: '村庄长老 · 礼貌考验',
    bossIcon: '👨‍🌾',
    storyOverview: '探险家在平原村庄醒来，遇到 Alex 老师。学会基本的礼貌问候，帮助村民分类散落的手提包、书籍与面包，赚取第一笔绿宝石，筹备探险背包！',
    lessonsStory: {
      1: '在村庄广场遇到了 Alex 老师，Steve 捡到了丢落的 Handbag（手提包），学会用 "Excuse me!" 打招呼。',
      2: '在村庄铁匠铺，Alex 询问这是不是 Steve 的外衣，学习物品归属问句。',
      3: '在村庄书库，Alex 介绍村里的图书管理员，学习询问姓名与自我介绍。',
      4: '在村庄农田，和农民伯伯交流农作物，学习日常礼貌用语 "Thank you" 与 "You are welcome"。',
      5: '村庄大门前，准备出远门前检查随身装备，学习描述物品颜色与名称。',
      6: '平原小溪边，与钓鱼的村民对话，学会询问物主与辨认简单的数词。',
      7: '村庄哨塔，遇到驻守的弓箭手，学会询问方向与地点。',
      8: '村庄牧场，与牧羊人一起数羊，练习数词与复数名词。',
      9: '村庄集市，用绿宝石向游商购买地图，学习物品单复数与出示物品。',
      10: '村庄面包房，享用新鲜出炉的面包，学习常用表达 "Here you are"。',
      11: '村庄井口，交流井水的清凉，练习简短肯定句与否定句。',
      12: '村庄大路口，完成第 1 单元试炼！村庄长老赠予通往繁茂森林的钥匙地图！'
    }
  },
  {
    unit: 2,
    title: 'Chapter 2: Lush Forest Quest',
    titleZh: '第 2 章：繁茂森林与古老遗迹',
    biomeName: 'Lush Forest',
    biomeNameZh: '繁茂森林·苔藓密林',
    icon: '🌲',
    bgGradient: 'from-green-600/20 via-emerald-500/10 to-teal-100/30',
    borderColor: '#2D6A4F',
    accentColor: '#2D6A4F',
    textColor: 'text-[#1B4332]',
    badgeBg: 'bg-green-700',
    bossName: '森林守护者 · 职业与身份之试',
    bossIcon: '🧝',
    storyOverview: '进入高耸的橡木与桦树林，林间有古老的石头遗迹。在这里，遇到各种不同职业的旅人（工程师、矿工、建造师），用英语确认彼此身份与工具。',
    lessonsStory: {
      13: '踏入森林深处，遇到正在砍树的木工，学习职业表达 "Is he a carpenter?"',
      14: '苔藓遗迹旁，遇到正在测量建筑的工程员，练习职业名词与肯定/否定回答。',
      15: '森林小屋前，向护林员打听前方的路，学习人称代词 he/she/it。',
      16: '林间清泉旁，遇到采药的医师，学会用英语描述人的状态（tired/cold/hungry）。',
      17: '古老石拱门下，发现了一张神秘遗迹卡片，练习指示代词 this/that。',
      18: '林间小道上，与巡逻的守卫互通姓名，练习身份确认句型。',
      19: '森林凉亭里，与老学者探讨古老符文，学会表达 "I think so"。',
      20: '树屋高台上，俯瞰森林全景，学会描述远处的物体与风景。',
      21: '探险营地里，和队员分发苹果与橡木块，练习 "Give me..." 祈使句。',
      22: '遗迹入口处，仔细辨认墙上的古老职业图案，学习多种职业词汇。',
      23: '林间篝火旁，听老矿工讲述森林地底的故事，练习动词 is/are 的运用。',
      24: '森林核心遗迹，通关第 2 单元！森林守护者开启通向沙漠神殿的传送法阵！'
    }
  },
  {
    unit: 3,
    title: 'Chapter 3: Desert Temple Maze',
    titleZh: '第 3 章：沙漠神殿与金字塔谜题',
    biomeName: 'Desert Temple',
    biomeNameZh: '沙漠神殿·炽热沙丘',
    icon: '🏜️',
    bgGradient: 'from-amber-500/20 via-yellow-400/10 to-[#F4A261]/20',
    borderColor: '#D97706',
    accentColor: '#D97706',
    textColor: 'text-[#78350F]',
    badgeBg: 'bg-amber-600',
    bossName: '金字塔法老 · 方位与神秘箱',
    bossIcon: '🏺',
    storyOverview: '穿越无垠的黄沙，来到气势磅礴的沙漠神殿。避开红石机关，寻找隐藏在密室中的宝箱，学会准确描述房屋结构、家具与方位！',
    lessonsStory: {
      25: '来到神殿门口，用英语询问神殿大门的位置："Where is the door?"',
      26: '步入神殿前厅，观察神殿里的红石灯与石柱，学会使用 there is/are 句型。',
      27: '神殿长廊，向神殿守护者询问宝箱放置在哪个房间。',
      28: '沙石休息室，描述房间里的床、桌子与壁挂，练习方位介词 on/in/under。',
      29: '神殿庭院，看见沙地上的骆驼与水井，学习描述空间中的物品。',
      30: '神殿宝库外，与商队交流骆驼上的背包，练习询问 "Is there any...?"',
      31: '暗道入口，用英文确认钥匙在谁的手里："Is it in your pocket?"',
      32: '神殿密室，打开第一个切石机宝箱，学习颜色与材质描述。',
      33: '神殿高塔，观察沙漠中的日落与沙暴，练习表语形容词。',
      34: '沙漠绿洲旁，补充水壶与金苹果，学习食品与饮品表达。',
      35: '神殿壁画前，破解金字塔文字，练习方位短语 next to/behind。',
      36: '沙漠神殿顶层，击败谜题，拿到冰雪山巅的指南针！'
    }
  },
  {
    unit: 4,
    title: 'Chapter 4: Snowy Mountain Frost',
    titleZh: '第 4 章：冰雪山巅与寒霜避难所',
    biomeName: 'Snowy Peaks',
    biomeNameZh: '冰雪山巅·极寒避难所',
    icon: '❄️',
    bgGradient: 'from-sky-500/20 via-[#A8DADC]/20 to-blue-100/30',
    borderColor: '#0284C7',
    accentColor: '#0284C7',
    textColor: 'text-[#0C4A6E]',
    badgeBg: 'bg-sky-600',
    bossName: '雪傀儡领主 · 试炼与衣物选择',
    bossIcon: '☃️',
    storyOverview: '登攀寒风呼啸的雪山顶峰，搭建保暖的皮革庇护所。在极寒之中练习选择疑问句、穿戴衣物词汇与天气表达，防范雪傀儡与冻伤！',
    lessonsStory: {
      37: '山脚下换上厚重的皮革外套，学习各类衣物词汇 (coat/hat/sweater)。',
      38: '攀登冰川道，询问对方穿的是哪一件外套："Which coat is yours?"',
      39: '雪山避难小屋，在暖炉旁烘干湿透的靴子，练习选择疑问句 (this or that)。',
      40: '半山腰滑雪场，与 Alex 练习形容词比较（warm/warmer, cold/colder）。',
      41: '冰窟营地，用红石火把取暖，学习天气描述 (It is snowing/cold)。',
      42: '雪山观景台，远眺冰封湖面，学会使用 "Put on your hat!" 祈使句。',
      43: '冰霜吊桥，小心通过结冰的木桥，学习祈使句与安全指示。',
      44: '雪傀儡工坊，帮助雪傀儡穿上围巾，练习颜色与尺寸。',
      45: '极光观赏点，感叹美丽的夜空极光，学习感叹句 "How beautiful!"',
      46: '冰川遗迹，发现被冻住的古老箱子，用热汤融化寒冰。',
      47: '山顶气象站，测量雪山温度与风速，练习数字与单位。',
      48: '雪山最高峰！击败寒霜试炼，获取通往深海神殿的海晶符文！'
    }
  },
  {
    unit: 5,
    title: 'Chapter 5: Deep Ocean Voyage',
    titleZh: '第 5 章：深海神殿与航海传奇',
    biomeName: 'Deep Ocean',
    biomeNameZh: '深海神殿·蔚蓝遗迹',
    icon: '🌊',
    bgGradient: 'from-[#1D3557]/20 via-[#457B9D]/20 to-cyan-100/30',
    borderColor: '#1D3557',
    accentColor: '#1D3557',
    textColor: 'text-[#1D3557]',
    badgeBg: 'bg-cyan-700',
    bossName: '远古守卫者 · 海底故事之解',
    bossIcon: '🦈',
    storyOverview: '乘坐橡木船潜入深海神殿，穿上水下呼吸护甲。探索沉船宝藏，用过去时态与 Alex 老师讲述曾经的航海传奇与遗失的黄金！',
    lessonsStory: {
      49: '在海港码头登船，学习船舶与航海词汇 (ship/boat/sea)。',
      50: '出海航行途中，观察海面上的热带鱼与海豚，练习描述正在发生的动作。',
      51: '潜入深海神殿入口，穿戴水下呼吸头盔，学习身体部位与装备词汇。',
      52: '沉船遗迹舱门前，讲述昨天航海遇到的风暴，首次接触一般过去时 (was/were)。',
      53: '海底甲板上，寻找失落的航海日志，用过去时描述昨天的活动。',
      54: '海晶石长廊，躲避远古守卫者的光束，练习现在进行时 (is swimming)。',
      55: '海底宝藏室，打开藏宝箱发现海心核心，学习表达感叹与惊喜。',
      56: '海底神殿主殿，与 Alex 回顾过去一周的探险历程，巩固过去时态。',
      57: '珊瑚礁海湾，浮出水面休息，学习描述大海的壮观与丰富生态。',
      58: '海岛灯塔，在灯塔上向远方打信号灯，练习问答句型。',
      59: '沉船船长室，破译老船长的留信，练习阅读理解与关键单词。',
      60: '深海神殿终点！拿到矿山钥匙，启程前往废弃矿井！'
    }
  },
  {
    unit: 6,
    title: 'Chapter 6: Abandoned Mineshaft',
    titleZh: '第 6 章：废弃矿井与红石铁轨',
    biomeName: 'Abandoned Mineshaft',
    biomeNameZh: '废弃矿井·红石地下城',
    icon: '⛏️',
    bgGradient: 'from-[#4A3B32]/20 via-[#8C6D58]/20 to-[#EEDDCC]/30',
    borderColor: '#78350F',
    accentColor: '#78350F',
    textColor: 'text-[#451A03]',
    badgeBg: 'bg-amber-800',
    bossName: '红石工程师 · 矿车与数量挑战',
    bossIcon: '🚂',
    storyOverview: '深入地下数百格的废弃矿井，开采闪耀的钻石、红石与金矿。修复充能铁轨，乘坐红石矿车在地下疾驰，掌握数量词与疑问句！',
    lessonsStory: {
      61: '乘坐地下电梯降落矿井，学习各种矿石词汇 (coal/iron/gold/diamond)。',
      62: '在铁轨岔路口，询问矿车去向："Where does this minecart go?"',
      63: '红石实验室，帮助工程师连接红石线路，学习条件句与逻辑表达。',
      64: '钻石矿脉前，用铁镐挖掘矿石，练习数量词 (some/any/many/much)。',
      65: '蜘蛛网通道，小心清除毒蜘蛛网，学会发出警告与命令句。',
      66: '地下铁匠铺，用高炉冶炼铁锭，练习操作步骤 (First, Next, Then)。',
      67: '地下岩浆河，搭设桥梁跨越危崖，学习安全注意事项。',
      68: '矿井调度站，计算矿车运输的货物重量，练习基数词与序数词。',
      69: '地下天然溶洞，欣赏闪烁的紫水晶簇，学习感叹句与形容词。',
      70: '红石机关门，输入正确的英语单词密码解开大门。',
      71: '地下转运站，与 Alex 乘坐充能矿车冲刺，练习日常交际口语。',
      72: '通关地下矿井！拿到前往蘑菇岛的航海通行证！'
    }
  },
  {
    unit: 7,
    title: 'Chapter 7: Mushroom Island',
    titleZh: '第 7 章：蘑菇岛与奇幻生态',
    biomeName: 'Mushroom Island',
    biomeNameZh: '蘑菇岛·紫菌净土',
    icon: '🍄',
    bgGradient: 'from-purple-500/20 via-pink-400/10 to-purple-100/30',
    borderColor: '#7E22CE',
    accentColor: '#7E22CE',
    textColor: 'text-[#581C87]',
    badgeBg: 'bg-purple-700',
    bossName: '哞菇守护者 · 比较级与特色料理',
    bossIcon: '🐮',
    storyOverview: '登陆大海中央极其罕见的蘑菇岛，这里没有敌对生物。与可爱的哞菇相处，采集巨大蘑菇与菌丝，用比较级与最高级探讨食物合成与生态！',
    lessonsStory: {
      73: '踏上紫色菌丝土地，探索神奇的蘑菇岛生态，学习形容词原级与比较级。',
      74: '遇到巨大的红蘑菇树，比较树的高矮与大小 (taller/bigger)。',
      75: '与萌萌的哞菇互动，用碗盛取蘑菇煲，学习食物与烹饪词汇。',
      76: '蘑菇岛海滩，搭建温馨的蘑菇小屋，练习描述房屋布局与舒适度。',
      77: '菌丝草地上，观察不一样的神奇生物，练习形容词最高级 (the biggest)。',
      78: '蘑菇岛研究站，记录蘑菇孢子生长过程，学习生词与科学表达。',
      79: '岛屿果园，采摘神秘的甜心浆果，练习用英语表达喜好 (like/prefer)。',
      80: '蘑菇岛茶会，与 Alex 和村民享用下午茶，练习客套话与提议 (Would you like...?)',
      81: '山顶观景台，比较不同小岛的景色，巩固比较级与最高级语法。',
      82: '神奇养殖场，照顾各种小动物，学习动物词汇与关爱表达。',
      83: '蘑菇岛地下泉，品尝清甜的泉水，练习形容词与感知动词。',
      84: '蘑菇岛满员欢聚！获得潜入地底暗黑古城的静音护符！'
    }
  },
  {
    unit: 8,
    title: 'Chapter 8: Ancient City Warden',
    titleZh: '第 8 章：暗黑古城与远古守卫',
    biomeName: 'Ancient City',
    biomeNameZh: '暗黑古城·深暗地底',
    icon: '🏛️',
    bgGradient: 'from-slate-800/30 via-slate-700/20 to-slate-200/40',
    borderColor: '#0F172A',
    accentColor: '#0F172A',
    textColor: 'text-[#0F172A]',
    badgeBg: 'bg-slate-900',
    bossName: '远古 Warden · 静音沟通与完成时',
    bossIcon: '👁️',
    storyOverview: '悄然潜入地底深处的暗黑古城，四周充满幽匿块。必须轻声细语沟通，使用现在完成时讲述探险成果，解除远古封印！',
    lessonsStory: {
      85: '蹑手蹑脚进入暗黑古城入口，学习轻声沟通与静音短语 (Keep quiet!)。',
      86: '幽匿块散发微光，学习表达 "Have you seen the Warden?" 现在完成时。',
      87: '远古竞技场残垣，用羊毛地毯铺路避开振动，学习材料与物理属性。',
      88: '暗黑古城中心神坛，破译记载远古历史的铭文，练习动词过去分词。',
      89: '古城图书室，搜寻珍贵的回响碎片，练习表达 "I have already finished..."',
      90: '幽匿催化体旁，观察经验值吸收，练习提问 "How long have you been here?"',
      91: '古城密室宝箱，发现附魔金苹果，练习描述非凡的效果与功能。',
      92: '暗黑长廊，避开 Warden 的感知范围，练习条件句与谨慎指令。',
      93: '远古传送门框架前，探讨框架材料与激活方式，练习推理动词 (must/might)。',
      94: '古城钟楼，敲响古老的避险之钟，练习状态表达。',
      95: '安全避难点，与 Alex 总结古城探索所得，全面复习现在完成时。',
      96: '暗黑古城封印解除！拿到下界传送门打火石！'
    }
  },
  {
    unit: 9,
    title: 'Chapter 9: Nether Fortress Fire',
    titleZh: '第 9 章：下界要塞与烈焰考验',
    biomeName: 'Nether Fortress',
    biomeNameZh: '下界要塞·地狱岩浆',
    icon: '🔥',
    bgGradient: 'from-red-600/25 via-rose-500/15 to-amber-100/30',
    borderColor: '#991B1B',
    accentColor: '#991B1B',
    textColor: 'text-[#7F1D1D]',
    badgeBg: 'bg-red-800',
    bossName: '烈焰人领主 · 条件句与急救药水',
    bossIcon: '👺',
    storyOverview: '点燃紫色的下界传送门，来到炽热的下界要塞！在岩浆与烈焰人之间穿梭，采集下界疣，炼制抗火药水，学习条件状语从句与急救指令！',
    lessonsStory: {
      97: '跨过紫色的下界传送门，来到地狱岩阶梯，学习急救与警告词汇。',
      98: '下界要塞红砖长廊，遇到巡逻的烈焰人，学习条件句 "If it attacks, use potion!"',
      99: '下界疣农场，采集珍贵的炼药原材料，学习药水名称与功效。',
      100: '酿造台实验室，与 Alex 合作配制抗火药水，练习祈使句与操作流程。',
      101: '灵魂沙峡谷，艰难跨过减速的灵魂沙，学习情感与感觉表达 (slow/scared/brave)。',
      102: '下界桥梁上，用下界砖搭建防护墙，练习安全建造指令。',
      103: '猪灵要塞遗迹，用金锭与猪灵进行交易，练习商务与交换口语。',
      104: '岩浆瀑布边，乘坐炽足兽跨越岩浆海，学习交通与控制指令。',
      105: '下界刷怪笼前，击退烈焰人收集烈焰棒，学习战斗与防守词汇。',
      106: '玄武岩三角洲，躲避恶魂的火球袭击，练习快速反应问答。',
      107: '下界营地，用金苹果补充体力，总结下界探险收获。',
      108: '下界要塞试炼通过！获得炼制末影之眼的关键材料烈焰粉！'
    }
  },
  {
    unit: 10,
    title: 'Chapter 10: Warped Forest Endermen',
    titleZh: '第 10 章：诡异森林与末影人圣域',
    biomeName: 'Warped Forest',
    biomeNameZh: '诡异森林·青蓝菌林',
    icon: '🔮',
    bgGradient: 'from-teal-600/25 via-cyan-500/15 to-teal-100/30',
    borderColor: '#115E59',
    accentColor: '#115E59',
    textColor: 'text-[#134E4A]',
    badgeBg: 'bg-teal-800',
    bossName: '末影使者 · 高级句型与末影珍珠',
    bossIcon: '👽',
    storyOverview: '走进充满幽蓝荧光的诡异森林，这里到处生长着巨大的诡异巨菌。与末影人安全相处，搜集末影珍珠，与 Alex 练习高级语法与情态动词！',
    lessonsStory: {
      109: '漫步在青蓝色的诡异森林中，学习各种绚丽颜色的高级表达。',
      110: '戴上雕刻南瓜头躲避末影人的注视，练习情态动词 "You must wear a pumpkin!"',
      111: '诡异藤蔓高塔，攀爬藤蔓采集静音孢子，练习动作与方向动词。',
      112: '末影人圣坛，用英语与末影使者进行友好交流，学习高级问答句型。',
      113: '菌丝高台上，收集落下的末影珍珠，练习表达 "I need twelve pearls to activate..."',
      114: '诡异森林绿洲，在幽蓝灯笼下休息，学习感叹句与复杂句式。',
      115: '闪烁的菌核下，与 Alex 合成末影之眼，学习化学与合成步骤表达。',
      116: '诡异森林出口，抛掷末影之眼指引方向，学习方位与轨迹描述。',
      117: '古老要塞地下入口，追随末影之眼的落点，练习追踪与发现口语。',
      118: '要塞地下迷宫，破解门上的复合句语法卡片，成功找到传送门房间。',
      119: '传送门房间，将 12 颗末影之眼嵌入框架，体会激动人心的时刻！',
      120: '激活末地传送门！全服解锁末地遗迹航线！'
    }
  },
  {
    unit: 11,
    title: 'Chapter 11: Ender Ruins Dragon',
    titleZh: '第 11 章：末地遗迹与龙之试炼',
    biomeName: 'Ender Ruins',
    biomeNameZh: '末地遗迹·浮空岛屿',
    icon: '🐉',
    bgGradient: 'from-purple-900/30 via-indigo-900/20 to-slate-200/40',
    borderColor: '#581C87',
    accentColor: '#581C87',
    textColor: 'text-[#3B0764]',
    badgeBg: 'bg-purple-950',
    bossName: '末影龙 · 复合句与决战策略',
    bossIcon: '🐲',
    storyOverview: '纵身跃入末地传送门，来到悬浮在虚空中的黑曜石高塔群！摧毁末影水晶，与 Alex 制定决战团队策略，用复合句发起终极挑战！',
    lessonsStory: {
      121: '降落在末地黑曜石平台上，俯瞰虚空与黑曜石塔，学习险境应对表达。',
      122: '搭建保护掩体，用弓箭远距离瞄准末影水晶，学习动作动词与方位。',
      123: '攀登黑曜石柱顶端，用水桶自救，练习紧急状况下的祈使句与配合。',
      124: '末地龙巢中央，末影龙俯冲扫尾，学会使用 "Watch out!" 与团队协作指令。',
      125: '摧毁最后一个末影水晶，削弱末影龙的恢复能力，练习因果关系表达 (because/so)。',
      126: '在龙巢祭坛前与 Alex 制定总攻计划，练习表达观点 (I think we should...)。',
      127: '拉开附魔强弓射击龙心，学习表态与励志短语 (Never give up!)。',
      128: '末影龙吐出龙息，用空瓶采集龙息药水，学习物资收集与整理。',
      129: '发起最后的冲锋打败末影龙！看到金色的经验雨倾泻而下，感叹胜利！',
      130: '龙蛋祭坛开启，获得黑曜石龙蛋徽章，练习获奖感言与分享。',
      131: '折跃门出现，投掷末影珍珠穿过折跃门，通往外末地群岛。',
      132: '末地遗迹终极胜利！即将进入终末之城开启毕业盛典！'
    }
  },
  {
    unit: 12,
    title: 'Chapter 12: End City Mastery',
    titleZh: '第 12 章：终末之城与大师勋章',
    biomeName: 'End City',
    biomeNameZh: '终末之城·紫珀高塔',
    icon: '🏰',
    bgGradient: 'from-fuchsia-600/20 via-purple-500/10 to-[#EEDDCC]/30',
    borderColor: '#A21CAF',
    accentColor: '#A21CAF',
    textColor: 'text-[#701A75]',
    badgeBg: 'bg-fuchsia-800',
    bossName: '全服总导师 Alex · 英语通关毕业典礼',
    bossIcon: '🎓',
    storyOverview: '登顶巍峨的紫珀高塔，探索末影船，穿上鞘翅在天空中自由翱翔！在全服舞台上举行《新概念英语第一册 144 课》毕业盛典，荣获英语大师勋章！',
    lessonsStory: {
      133: '来到紫珀块构筑的终末之城脚下，学习建筑结构与高级形容词。',
      134: '躲避潜影贝的漂浮导弹，在悬浮状态下练习口语回答。',
      135: '登上高耸入云的末影船，探索船舱里的藏宝箱。',
      136: '在船头斩获终极宝物——鞘翅 (Elytra)，学习飞行与自由表达。',
      137: '穿上鞘翅从高塔滑翔而下，体验在 Minecraft 天空翱翔的快乐。',
      138: '终末之城广场，与 144 课遇到的所有 NPC 欢聚一堂，练习社交礼仪。',
      139: '回顾从 Unit 1 到 Unit 12 的整个故事全景，巩固全部核心句型。',
      140: '在全服广场展示收集到的绿宝石与成就徽章，练习成就分享。',
      141: '撰写给 Alex 老师的感谢信，练习英文书信与情感表达。',
      142: '参加英语大挑战答辩，流利回答 Alex 老师提出的综合英语问题。',
      143: '站上终极毕业颁奖台，接受村庄长老与 Alex 老师颁发的《英语大师证书》！',
      144: '全服烟花绽放！🎉 通关新概念英语第一册 144 课，开启更广阔的世界探险！'
    }
  }
];

export function getBiomeChapterByUnit(unit: number): BiomeChapter {
  return BIOME_CHAPTERS.find(b => b.unit === unit) || BIOME_CHAPTERS[0];
}

export function getBiomeChapterByLesson(lessonId: number): BiomeChapter {
  const unit = Math.min(12, Math.max(1, Math.ceil(lessonId / 12)));
  return getBiomeChapterByUnit(unit);
}
