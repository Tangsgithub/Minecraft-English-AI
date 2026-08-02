import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  {
    id: 1,
    unit: 1,
    title: 'Excuse me!',
    titleZh: '对不起！/ 打扰一下！',
    topic: 'Greetings & Politeness',
    topicZh: '礼貌问候与物品确认',
    difficulty: 'easy',
    minecraftScene: 'Village Square (村庄广场)',
    sceneDescription: 'Steve in the village square accidentally drops his handbag near Alex.',
    vocabulary: [
      {
        id: 'l1_1',
        word: 'excuse',
        phonetic: '/ɪkˈskjuːz/',
        meaning: '原谅；打扰',
        mcItem: 'Handbag',
        mcItemIcon: '💼',
        sampleSentence: 'Excuse me, is this your handbag?',
        sampleTranslation: '打扰一下，这是你的手提包吗？'
      },
      {
        id: 'l1_2',
        word: 'pardon',
        phonetic: '/ˈpɑː.dən/',
        meaning: '原谅；请再说一遍',
        mcItem: 'Book',
        mcItemIcon: '📖',
        sampleSentence: 'Pardon? Could you speak again?',
        sampleTranslation: '什么？你能再说一遍吗？'
      },
      {
        id: 'l1_3',
        word: 'handbag',
        phonetic: '/ˈhænd.bæɡ/',
        meaning: '女用手提包',
        mcItem: 'Chest',
        mcItemIcon: '👝',
        sampleSentence: 'My handbag contains emeralds and bread.',
        sampleTranslation: '我的手提包里有绿宝石和面包。'
      },
      {
        id: 'l1_4',
        word: 'thank you',
        phonetic: '/θæŋk juː/',
        meaning: '谢谢你',
        mcItem: 'Flower',
        mcItemIcon: '🌷',
        sampleSentence: 'Thank you very much, Alex!',
        sampleTranslation: '非常感谢你，亚历克斯！'
      }
    ],
    targetSentences: [
      'Excuse me!',
      'Is this your handbag?',
      'Pardon?',
      'Yes, it is.',
      'Thank you very much.'
    ],
    targetSentenceTranslations: [
      '对不起 / 打扰一下！',
      '这是你的手提包吗？',
      '请再说一遍？',
      '是的，它是。',
      '非常感谢你。'
    ],
    dialogueScript: [
      {
        speaker: 'Steve',
        text: 'Excuse me!',
        translation: '打扰一下！',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'Yes?',
        translation: '什么事？',
        avatar: '👩'
      },
      {
        speaker: 'Steve',
        text: 'Is this your handbag?',
        translation: '这是你的手提包吗？',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'Pardon?',
        translation: '什么？（请再说一遍）',
        avatar: '👩'
      },
      {
        speaker: 'Steve',
        text: 'Is this your handbag?',
        translation: '这是你的手提包吗？',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'Yes, it is. Thank you very much!',
        translation: '是的，它是。非常感谢你！',
        avatar: '👩'
      }
    ],
    grammarNote: 'Be 动词一般疑问句：Is this your + 物品名？回答：Yes, it is. / No, it isn\'t.'
  },
  {
    id: 3,
    unit: 1,
    title: 'Sorry, sir.',
    titleZh: '对不起，先生。',
    topic: 'Coatroom & Items',
    topicZh: '寄存处与认领物品',
    difficulty: 'easy',
    minecraftScene: 'Village Tavern & Guard Room (村庄守卫室)',
    sceneDescription: 'Steve is picking up his coat and umbrella from the village guard post.',
    vocabulary: [
      {
        id: 'l3_1',
        word: 'umbrella',
        phonetic: '/ʌmˈbrel.ə/',
        meaning: '伞',
        mcItem: 'Shield',
        mcItemIcon: '☂️',
        sampleSentence: 'Is this your umbrella, Steve?',
        sampleTranslation: '史蒂夫，这是你的伞吗？'
      },
      {
        id: 'l3_2',
        word: 'coat',
        phonetic: '/kəʊt/',
        meaning: '外套；大衣',
        mcItem: 'Leather Armor',
        mcItemIcon: '🧥',
        sampleSentence: 'Here is your coat and your hat.',
        sampleTranslation: '这是你的外套和帽子。'
      },
      {
        id: 'l3_3',
        word: 'ticket',
        phonetic: '/ˈtɪk.ɪt/',
        meaning: '票；凭证牌',
        mcItem: 'Paper',
        mcItemIcon: '🎟️',
        sampleSentence: 'My cloakroom ticket number is 5.',
        sampleTranslation: '我的衣帽寄存牌是5号。'
      }
    ],
    targetSentences: [
      'My coat and my hat, please.',
      'Here is my ticket.',
      'Is this your umbrella?',
      'No, it isn\'t.',
      'Here it is. Thank you, sir.'
    ],
    targetSentenceTranslations: [
      '请拿我的外套和帽子。',
      '这是我的凭证牌。',
      '这是你的伞吗？',
      '不，不是。',
      '给你。谢谢你，先生。'
    ],
    dialogueScript: [
      {
        speaker: 'Steve',
        text: 'My coat and my hat, please. Here is my ticket.',
        translation: '请拿我的外套和帽子。这是我的凭证。',
        avatar: '👦'
      },
      {
        speaker: 'Villager Guard',
        text: 'Thank you, sir. Number 5. Is this your umbrella?',
        translation: '谢谢您，先生。5号。这是您的伞吗？',
        avatar: '👳'
      },
      {
        speaker: 'Steve',
        text: 'No, it isn\'t.',
        translation: '不，不是。',
        avatar: '👦'
      },
      {
        speaker: 'Villager Guard',
        text: 'Is this it?',
        translation: '是这一把吗？',
        avatar: '👳'
      },
      {
        speaker: 'Steve',
        text: 'Yes, it is. Thank you very much.',
        translation: '是的，就是它。非常感谢。',
        avatar: '👦'
      }
    ],
    grammarNote: '否定回答：No, it isn\'t. 指示代词：This (这个)，That (那个)。'
  },
  {
    id: 5,
    unit: 1,
    title: 'Nice to meet you.',
    titleZh: '很高兴见到你。',
    topic: 'Introductions & Nationality',
    topicZh: '自我介绍与国籍/身份',
    difficulty: 'easy',
    minecraftScene: 'Crafting School (村庄合成学校)',
    sceneDescription: 'Alex introduces a new builder student, Hans, to Chang-Fu in the classroom.',
    vocabulary: [
      {
        id: 'l5_1',
        word: 'student',
        phonetic: '/ˈstjuː.dənt/',
        meaning: '学生',
        mcItem: 'Book',
        mcItemIcon: '🎓',
        sampleSentence: 'Tom is a hardworking student in Minecraft.',
        sampleTranslation: '汤姆在我的世界里是一个勤奋的学生。'
      },
      {
        id: 'l5_2',
        word: 'teacher',
        phonetic: '/ˈtiː.tʃər/',
        meaning: '老师',
        mcItem: 'Lectern',
        mcItemIcon: '👩‍🏫',
        sampleSentence: 'Alex is our friendly English teacher.',
        sampleTranslation: '亚历克斯是我们的友好英语老师。'
      },
      {
        id: 'l5_3',
        word: 'Chinese',
        phonetic: '/ˌtʃaɪˈniːz/',
        meaning: '中国人的；中文',
        mcItem: 'Red Banner',
        mcItemIcon: '🇨🇳',
        sampleSentence: 'Chang-Fu is Chinese.',
        sampleTranslation: '常福是中国人。'
      }
    ],
    targetSentences: [
      'This is Mr. Blake.',
      'He is a new student.',
      'Nice to meet you.',
      'Are you French?',
      'No, I am Chinese.'
    ],
    targetSentenceTranslations: [
      '这是布莱克先生。',
      '他是一位新学生。',
      '很高兴见到你。',
      '你是法国人吗？',
      '不，我是中国人。'
    ],
    dialogueScript: [
      {
        speaker: 'Alex',
        text: 'Good morning, Mr. Blake. This is Chang-Fu.',
        translation: '早上好，布莱克先生。这是常福。',
        avatar: '👩'
      },
      {
        speaker: 'Mr. Blake',
        text: 'Nice to meet you, Chang-Fu.',
        translation: '很高兴见到你，常福。',
        avatar: '👨'
      },
      {
        speaker: 'Chang-Fu',
        text: 'Nice to meet you too, Mr. Blake.',
        translation: '也很高兴见到您，布莱克先生。',
        avatar: '👦'
      },
      {
        speaker: 'Mr. Blake',
        text: 'Are you French?',
        translation: '你是法国人吗？',
        avatar: '👨'
      },
      {
        speaker: 'Chang-Fu',
        text: 'No, I am Chinese.',
        translation: '不，我是中国人。',
        avatar: '👦'
      }
    ],
    grammarNote: '人称代词与 Be 动词：I am, You are, He is, She is. 常用问候语：Nice to meet you.'
  },
  {
    id: 17,
    unit: 2,
    title: 'How do you do?',
    titleZh: '你好！/ 初次见面好！',
    topic: 'Occupations in Village',
    topicZh: '职业名称与询问身份',
    difficulty: 'medium',
    minecraftScene: 'Village Trading Post (村庄集市交易站)',
    sceneDescription: 'Steve introduces Mr. Jackson, the chief village engineer, to Alex.',
    vocabulary: [
      {
        id: 'l17_1',
        word: 'engineer',
        phonetic: '/ˌen.dʒɪˈnɪər/',
        meaning: '工程师；红石专家',
        mcItem: 'Redstone Repeater',
        mcItemIcon: '⚙️',
        sampleSentence: 'Mr. Jackson is a Redstone engineer.',
        sampleTranslation: '杰克逊先生是一位红石工程师。'
      },
      {
        id: 'l17_2',
        word: 'builder',
        phonetic: '/ˈbɪl.dər/',
        meaning: '建筑师；建造者',
        mcItem: 'Golden Hammer',
        mcItemIcon: '🧱',
        sampleSentence: 'Steve is an expert builder in Minecraft.',
        sampleTranslation: '史蒂夫是我的世界里的专家建筑师。'
      },
      {
        id: 'l17_3',
        word: 'miner',
        phonetic: '/ˈmaɪ.nər/',
        meaning: '矿工',
        mcItem: 'Diamond Pickaxe',
        mcItemIcon: '⛏️',
        sampleSentence: 'The miner found gold and lapis lazuli.',
        sampleTranslation: '矿工发现了黄金和青金石。'
      }
    ],
    targetSentences: [
      'How do you do?',
      'Are you a teacher?',
      'No, I am an engineer.',
      'What is your job?',
      'I am a Minecraft builder.'
    ],
    targetSentenceTranslations: [
      '你好（正式初次见面招呼）？',
      '你是一名老师吗？',
      '不，我是一名工程师。',
      '你的职业是什么？',
      '我是一名我的世界建筑师。'
    ],
    dialogueScript: [
      {
        speaker: 'Steve',
        text: 'Alex, this is Mr. Jackson.',
        translation: '亚历克斯，这是杰克逊先生。',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'How do you do?',
        translation: '您好！',
        avatar: '👩'
      },
      {
        speaker: 'Mr. Jackson',
        text: 'How do you do?',
        translation: '您好！',
        avatar: '👨'
      },
      {
        speaker: 'Alex',
        text: 'Are you a teacher, Mr. Jackson?',
        translation: '杰克逊先生，您是一位老师吗？',
        avatar: '👩'
      },
      {
        speaker: 'Mr. Jackson',
        text: 'No, I am a Redstone engineer.',
        translation: '不，我是一位红石工程师。',
        avatar: '👨'
      }
    ],
    grammarNote: '冠词用法：a teacher, an engineer (元音音素开头用 an)。询问职业：What is your job? / What do you do?'
  },
  {
    id: 25,
    unit: 3,
    title: 'Mrs. Smith\'s kitchen',
    titleZh: '史密斯太太的厨房',
    topic: 'House & Kitchen Items',
    topicZh: '房屋与厨房物品描述',
    difficulty: 'medium',
    minecraftScene: 'Cozy Brick House Kitchen (温馨砖块屋厨房)',
    sceneDescription: 'Exploring Mrs. Smith\'s kitchen with clean wooden counters, furnace, and food.',
    vocabulary: [
      {
        id: 'l25_1',
        word: 'kitchen',
        phonetic: '/ˈkɪtʃ.ən/',
        meaning: '厨房',
        mcItem: 'Furnace',
        mcItemIcon: '🍳',
        sampleSentence: 'There is a furnace in the kitchen.',
        sampleTranslation: '厨房里有一个熔炉。'
      },
      {
        id: 'l25_2',
        word: 'refrigerator',
        phonetic: '/rɪˈfrɪdʒ.ər.eɪ.tər/',
        meaning: '冰箱；冰柜',
        mcItem: 'Iron Block',
        mcItemIcon: '🧊',
        sampleSentence: 'Put the apples in the refrigerator.',
        sampleTranslation: '把苹果放进冰箱里。'
      },
      {
        id: 'l25_3',
        word: 'table',
        phonetic: '/ˈteɪ.bəl/',
        meaning: '桌子',
        mcItem: 'Crafting Table',
        mcItemIcon: '🪑',
        sampleSentence: 'The bread is on the table.',
        sampleTranslation: '面包在桌子上。'
      }
    ],
    targetSentences: [
      'This is Mrs. Smith\'s kitchen.',
      'It is a clean kitchen.',
      'The refrigerator is white.',
      'Where is the bread?',
      'It is on the table.'
    ],
    targetSentenceTranslations: [
      '这是史密斯太太的厨房。',
      '这是一个干净的厨房。',
      '冰箱是白色的。',
      '面包在哪里？',
      '它在桌子上。'
    ],
    dialogueScript: [
      {
        speaker: 'Alex',
        text: 'Welcome to Mrs. Smith\'s kitchen!',
        translation: '欢迎来到史密斯太太的厨房！',
        avatar: '👩'
      },
      {
        speaker: 'Steve',
        text: 'Wow, it is very clean and big.',
        translation: '哇，这里非常干净又宽敞。',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'Where is the apple?',
        translation: '苹果在哪里？',
        avatar: '👩'
      },
      {
        speaker: 'Steve',
        text: 'It is on the wooden table.',
        translation: '它在木桌子上。',
        avatar: '👦'
      }
    ],
    grammarNote: '方位介词 on, in, under 的表达。名词所有格：Mrs. Smith\'s (史密斯太太的)。'
  },
  {
    id: 50,
    unit: 4,
    title: 'Taking a Minecart',
    titleZh: '乘坐矿车',
    topic: 'Travel & Transportation',
    topicZh: '交通方式与出行表达',
    difficulty: 'medium',
    minecraftScene: 'Underground Rail Station (地下矿车轨道站)',
    sceneDescription: 'Steve and Alex take a powered minecart through the rails to the fortress.',
    vocabulary: [
      {
        id: 'l50_1',
        word: 'minecart',
        phonetic: '/ˈmaɪn.kɑːt/',
        meaning: '矿车',
        mcItem: 'Minecart',
        mcItemIcon: '🛒',
        sampleSentence: 'Get into the minecart quickly!',
        sampleTranslation: '快点坐进矿车里！'
      },
      {
        id: 'l50_2',
        word: 'station',
        phonetic: '/ˈsteɪ.ʃən/',
        meaning: '车站；火车站',
        mcItem: 'Rail',
        mcItemIcon: '🚉',
        sampleSentence: 'We arrived at Central Station.',
        sampleTranslation: '我们到达了中央车站。'
      },
      {
        id: 'l50_3',
        word: 'fast',
        phonetic: '/fɑːst/',
        meaning: '快的；快速地',
        mcItem: 'Powered Rail',
        mcItemIcon: '⚡',
        sampleSentence: 'Powered rails make the minecart go very fast.',
        sampleTranslation: '充能铁轨能让矿车跑得非常快。'
      }
    ],
    targetSentences: [
      'Let us take a minecart.',
      'Where are you going?',
      'I am going to the village.',
      'How much is the ticket?',
      'It is one emerald.'
    ],
    targetSentenceTranslations: [
      '让我们乘矿车吧。',
      '你要去哪里？',
      '我要去村庄。',
      '车票多少绿宝石？',
      '一颗绿宝石。'
    ],
    dialogueScript: [
      {
        speaker: 'Steve',
        text: 'Where are you going, Alex?',
        translation: '亚历克斯，你要去哪里？',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'I am going to the diamond mine.',
        translation: '我要去钻石矿洞。',
        avatar: '👩'
      },
      {
        speaker: 'Steve',
        text: 'Let us take the redstone minecart!',
        translation: '我们一起坐红石矿车吧！',
        avatar: '👦'
      },
      {
        speaker: 'Alex',
        text: 'Great idea! It is super fast.',
        translation: '太棒的主意！它超级快。',
        avatar: '👩'
      }
    ],
    grammarNote: '现在进行时表示将来或正在发生：I am going to... 询问价格：How much is...'
  }
];

// Helper to generate representative 144 placeholder lessons with realistic topics for New Concept Book 1
export function getFullLessonsCatalog(): Array<{ id: number; unit: number; title: string; titleZh: string; topic: string; difficulty: 'easy' | 'medium' | 'hard' }> {
  const catalog: Array<{ id: number; unit: number; title: string; titleZh: string; topic: string; difficulty: 'easy' | 'medium' | 'hard' }> = [];
  
  // Fill in detailed ones first
  LESSONS_DATA.forEach(lesson => {
    catalog.push({
      id: lesson.id,
      unit: lesson.unit,
      title: lesson.title,
      titleZh: lesson.titleZh,
      topic: lesson.topic,
      difficulty: lesson.difficulty
    });
  });

  // Generate complete 144 list mapping to standard New Concept English Book 1 topics & MC theme
  const unitTopics = [
    { unit: 1, topic: '问候与物品认领 (Greetings & Items)' },
    { unit: 2, topic: '职业与个人身份 (Jobs & Identity)' },
    { unit: 3, topic: '描述房屋与方位 (House & Directions)' },
    { unit: 4, topic: '服装与选择 (Clothes & Choices)' },
    { unit: 5, topic: '家庭成员与称呼 (Family & Names)' },
    { unit: 6, topic: '食物与烹饪 (Food & Cooking)' },
    { unit: 7, topic: '动物与自然 (Animals & Nature)' },
    { unit: 8, topic: '日常活动与习惯 (Daily Routines)' },
    { unit: 9, topic: '天气与季节 (Weather & Seasons)' },
    { unit: 10, topic: '购物与价格 (Shopping & Prices)' },
    { unit: 11, topic: '交通与出行 (Travel & Transportation)' },
    { unit: 12, topic: '回忆与冒险传奇 (Adventure Stories)' }
  ];

  for (let i = 1; i <= 144; i++) {
    if (!catalog.some(c => c.id === i)) {
      const uIndex = Math.floor((i - 1) / 12);
      const unitObj = unitTopics[uIndex] || unitTopics[11];
      const diff: 'easy' | 'medium' | 'hard' = i <= 48 ? 'easy' : i <= 96 ? 'medium' : 'hard';
      catalog.push({
        id: i,
        unit: unitObj.unit,
        title: `Lesson ${i}: Minecraft Adventure ${i}`,
        titleZh: `第 ${i} 课：Minecraft 英语探索`,
        topic: unitObj.topic,
        difficulty: diff
      });
    }
  }

  return catalog.sort((a, b) => a.id - b.id);
}
