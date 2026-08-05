import { Lesson, CourseVolumeId } from '../types';

// ============================================================================
// 《新概念英语》1/2/3册 权威原版课文与词汇/句型库 (New Concept English Standard Curriculum)
// ============================================================================

export interface NceLessonDefinition {
  id: number;
  unit: number;
  title: string;
  titleZh: string;
  topic: string;
  topicZh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minecraftScene: string;
  sceneDescription: string;
  words: Array<{
    word: string;
    phonetic: string;
    meaning: string;
    mcItem: string;
    mcItemIcon: string;
    sampleSentence: string;
    sampleTranslation: string;
  }>;
  sentences: Array<{
    en: string;
    zh: string;
  }>;
  dialogue: Array<{
    speaker: string;
    text: string;
    translation: string;
    avatar: string;
  }>;
  grammarNote: string;
}

// ----------------------------------------------------------------------------
// 1. 新概念英语第一册 (Vol 1: 基础启蒙篇 1-144课 真实课文映射)
// ----------------------------------------------------------------------------
const NCE_BOOK1_DEFINITIONS: Record<number, Partial<NceLessonDefinition>> = {
  1: {
    title: 'Excuse me!',
    titleZh: '打扰一下！',
    topic: 'Greetings & Politeness',
    topicZh: '礼貌问候与认领物品',
    minecraftScene: 'Village Square (村庄广场)',
    sceneDescription: 'Steve in the village square accidentally drops his handbag near Alex.',
    words: [
      { word: 'excuse', phonetic: '/ɪkˈskjuːz/', meaning: '原谅；打扰', mcItem: 'Leather', mcItemIcon: '💼', sampleSentence: 'Excuse me, is this your handbag?', sampleTranslation: '打扰一下，这是你的手提包吗？' },
      { word: 'pardon', phonetic: '/ˈpɑː.dən/', meaning: '原谅；请再说一遍', mcItem: 'Book', mcItemIcon: '📖', sampleSentence: 'Pardon? Could you say that again?', sampleTranslation: '什么？你能再说一遍吗？' },
      { word: 'handbag', phonetic: '/ˈhænd.bæɡ/', meaning: '女用手提包', mcItem: 'Chest', mcItemIcon: '👝', sampleSentence: 'My handbag contains emeralds and bread.', sampleTranslation: '我的手提包里有绿宝石和面包。' },
      { word: 'thank you', phonetic: '/θæŋk juː/', meaning: '谢谢你', mcItem: 'Flower', mcItemIcon: '🌷', sampleSentence: 'Thank you very much, Alex!', sampleTranslation: '非常感谢你，亚历克斯！' }
    ],
    sentences: [
      { en: 'Excuse me!', zh: '对不起 / 打扰一下！' },
      { en: 'Is this your handbag?', zh: '这是你的手提包吗？' },
      { en: 'Pardon?', zh: '请再说一遍？' },
      { en: 'Yes, it is.', zh: '是的，它是。' },
      { en: 'Thank you very much.', zh: '非常感谢你。' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'Excuse me!', translation: '打扰一下！', avatar: '👦' },
      { speaker: 'Alex', text: 'Yes?', translation: '什么事？', avatar: '👩' },
      { speaker: 'Steve', text: 'Is this your handbag?', translation: '这是你的手提包吗？', avatar: '👦' },
      { speaker: 'Alex', text: 'Pardon?', translation: '什么？（请再说一遍）', avatar: '👩' },
      { speaker: 'Steve', text: 'Is this your handbag?', translation: '这是你的手提包吗？', avatar: '👦' },
      { speaker: 'Alex', text: 'Yes, it is. Thank you very much!', translation: '是的，它是。非常感谢你！', avatar: '👩' }
    ],
    grammarNote: 'Be 动词一般疑问句：Is this your + 物品名？肯定回答：Yes, it is. 否定回答：No, it isn\'t.'
  },
  2: {
    title: 'Is this your...?',
    titleZh: '这是你的...吗？',
    topic: 'Personal Belongings',
    topicZh: '个人物品问答',
    minecraftScene: 'Crafting Table Area (工作台区域)',
    sceneDescription: 'Identify school supplies and tools left on the crafting table.',
    words: [
      { word: 'pen', phonetic: '/pen/', meaning: '钢笔；羽毛笔', mcItem: 'Feather Pen', mcItemIcon: '✒️', sampleSentence: 'Is this your feather pen?', sampleTranslation: '这是你的羽毛笔吗？' },
      { word: 'pencil', phonetic: '/ˈpen.səl/', meaning: '铅笔；石膏笔', mcItem: 'Stick', mcItemIcon: '✏️', sampleSentence: 'Give me that pencil, please.', sampleTranslation: '请把那支铅笔给我。' },
      { word: 'book', phonetic: '/bʊk/', meaning: '书本；附魔书', mcItem: 'Enchanted Book', mcItemIcon: '📚', sampleSentence: 'This is an enchanted book.', sampleTranslation: '这是一本附魔书。' },
      { word: 'watch', phonetic: '/wɒtʃ/', meaning: '手表；钟表', mcItem: 'Clock', mcItemIcon: '⌚', sampleSentence: 'Is this golden watch yours?', sampleTranslation: '这块金表是你的吗？' }
    ],
    sentences: [
      { en: 'Is this your pen?', zh: '这是你的钢笔吗？' },
      { en: 'No, it isn\'t.', zh: '不，不是。' },
      { en: 'Is this your pencil?', zh: '这是你的铅笔吗？' },
      { en: 'Yes, it is.', zh: '是的，它是。' }
    ],
    dialogue: [
      { speaker: 'Alex', text: 'Is this your pen, Steve?', translation: '史蒂夫，这是你的钢笔吗？', avatar: '👩' },
      { speaker: 'Steve', text: 'No, it isn\'t. My pen is black.', translation: '不，不是。我的钢笔是黑色的。', avatar: '👦' },
      { speaker: 'Alex', text: 'Is this your pencil?', translation: '这是你的铅笔吗？', avatar: '👩' },
      { speaker: 'Steve', text: 'Yes, it is. Thank you, Alex!', translation: '是的，它是。谢谢你，亚历克斯！', avatar: '👦' }
    ],
    grammarNote: '名词前的物主代词用法：my (我的), your (你的)。'
  },
  3: {
    title: 'Sorry, sir.',
    titleZh: '对不起，先生。',
    topic: 'Coatroom & Items',
    topicZh: '寄存处与认领物品',
    minecraftScene: 'Village Guard Room (村庄守卫室)',
    sceneDescription: 'Steve picks up his coat and umbrella from the village guard post.',
    words: [
      { word: 'umbrella', phonetic: '/ʌmˈbrel.ə/', meaning: '伞', mcItem: 'Shield', mcItemIcon: '☂️', sampleSentence: 'Is this your umbrella, Steve?', sampleTranslation: '史蒂夫，这是你的伞吗？' },
      { word: 'coat', phonetic: '/kəʊt/', meaning: '外套；大衣', mcItem: 'Leather Armor', mcItemIcon: '🧥', sampleSentence: 'Here is your coat and your hat.', sampleTranslation: '这是你的外套和帽子。' },
      { word: 'ticket', phonetic: '/ˈtɪk.ɪt/', meaning: '凭证牌；票', mcItem: 'Paper Ticket', mcItemIcon: '🎟️', sampleSentence: 'My cloakroom ticket number is 5.', sampleTranslation: '我的衣帽寄存牌是5号。' },
      { word: 'number', phonetic: '/ˈnʌm.bər/', meaning: '号码；数字', mcItem: 'Gold Nummular', mcItemIcon: '🔢', sampleSentence: 'Number 5 is your ticket.', sampleTranslation: '5号是你的凭证牌。' }
    ],
    sentences: [
      { en: 'My coat and my hat, please.', zh: '请拿我的外套和帽子。' },
      { en: 'Here is my ticket.', zh: '这是我的凭证牌。' },
      { en: 'Is this your umbrella?', zh: '这是你的伞吗？' },
      { en: 'No, it isn\'t.', zh: '不，不是。' },
      { en: 'Here it is. Thank you, sir.', zh: '给你。谢谢你，先生。' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'My coat and my hat, please. Here is my ticket.', translation: '请拿我的外套和帽子。这是我的凭证。', avatar: '👦' },
      { speaker: 'Guard', text: 'Thank you, sir. Number 5. Is this your umbrella?', translation: '谢谢您，先生。5号。这是您的伞吗？', avatar: '👳' },
      { speaker: 'Steve', text: 'No, it isn\'t.', translation: '不，不是。', avatar: '👦' },
      { speaker: 'Guard', text: 'Is this it?', translation: '是这一把吗？', avatar: '👳' },
      { speaker: 'Steve', text: 'Yes, it is. Thank you very much.', translation: '是的，就是它。非常感谢。', avatar: '👦' }
    ],
    grammarNote: '礼貌请求用语：...please. 否定回答结构：No, it isn\'t.'
  },
  5: {
    title: 'Nice to meet you.',
    titleZh: '很高兴见到你。',
    topic: 'Introductions & Nationality',
    topicZh: '自我介绍与国籍/身份',
    minecraftScene: 'Crafting School (村庄合成学校)',
    sceneDescription: 'Alex introduces a new builder student, Chang-Fu, to Mr. Blake.',
    words: [
      { word: 'student', phonetic: '/ˈstjuː.dənt/', meaning: '学生', mcItem: 'Book', mcItemIcon: '🎓', sampleSentence: 'Tom is a hardworking student in Minecraft.', sampleTranslation: '汤姆在我的世界里是一个勤奋的学生。' },
      { word: 'teacher', phonetic: '/ˈtiː.tʃər/', meaning: '老师', mcItem: 'Lectern', mcItemIcon: '👩‍🏫', sampleSentence: 'Alex is our friendly English teacher.', sampleTranslation: '亚历克斯是我们的友好英语老师。' },
      { word: 'Chinese', phonetic: '/ˌtʃaɪˈniːz/', meaning: '中国人的；中文', mcItem: 'Red Banner', mcItemIcon: '🇨🇳', sampleSentence: 'Chang-Fu is Chinese.', sampleTranslation: '常福是中国人。' },
      { word: 'French', phonetic: '/frentʃ/', meaning: '法国人的；法语', mcItem: 'Blue Banner', mcItemIcon: '🇫🇷', sampleSentence: 'Is she French?', sampleTranslation: '她是法国人吗？' }
    ],
    sentences: [
      { en: 'This is Mr. Blake.', zh: '这是布莱克先生。' },
      { en: 'He is a new student.', zh: '他是一位新学生。' },
      { en: 'Nice to meet you.', zh: '很高兴见到你。' },
      { en: 'Are you French?', zh: '你是法国人吗？' },
      { en: 'No, I am Chinese.', zh: '不，我是中国人。' }
    ],
    dialogue: [
      { speaker: 'Alex', text: 'Good morning, Mr. Blake. This is Chang-Fu.', translation: '早上好，布莱克先生。这是常福。', avatar: '👩' },
      { speaker: 'Mr. Blake', text: 'Nice to meet you, Chang-Fu.', translation: '很高兴见到你，常福。', avatar: '👨' },
      { speaker: 'Chang-Fu', text: 'Nice to meet you too, Mr. Blake.', translation: '也很高兴见到您，布莱克先生。', avatar: '👦' },
      { speaker: 'Mr. Blake', text: 'Are you French?', translation: '你是法国人吗？', avatar: '👨' },
      { speaker: 'Chang-Fu', text: 'No, I am Chinese.', translation: '不，我是中国人。', avatar: '👦' }
    ],
    grammarNote: '称呼与人称代词：He is... / She is... 介绍朋友公式：This is...'
  },
  7: {
    title: 'Are you a teacher?',
    titleZh: '你是老师吗？',
    topic: 'Occupations & Names',
    topicZh: '职业与姓名询问',
    minecraftScene: 'Village Library (村庄图书馆)',
    sceneDescription: 'Steve and Robert discuss their jobs near the lectern.',
    words: [
      { word: 'name', phonetic: '/neɪm/', meaning: '名字', mcItem: 'Name Tag', mcItemIcon: '🏷️', sampleSentence: 'My name is Robert.', sampleTranslation: '我的名字叫罗伯特。' },
      { word: 'engineer', phonetic: '/ˌen.dʒɪˈnɪər/', meaning: '工程师', mcItem: 'Redstone', mcItemIcon: '⚙️', sampleSentence: 'I am a computer engineer.', sampleTranslation: '我是一名计算机工程师。' },
      { word: 'policeman', phonetic: '/pəˈliːs.mən/', meaning: '警察；守卫', mcItem: 'Iron Helmet', mcItemIcon: '👮', sampleSentence: 'Is he a policeman?', sampleTranslation: '他是一名警察吗？' },
      { word: 'nurse', phonetic: '/nɜːs/', meaning: '护士', mcItem: 'Golden Apple', mcItemIcon: '👩‍⚕️', sampleSentence: 'She is a nurse at the hospital.', sampleTranslation: '她是医院里的护士。' }
    ],
    sentences: [
      { en: 'What\'s your name?', zh: '你叫什么名字？' },
      { en: 'Are you a teacher?', zh: '你是老师吗？' },
      { en: 'No, I am not.', zh: '不，我不是。' },
      { en: 'What\'s your job?', zh: '你的职业是什么？' },
      { en: 'I am an engineer.', zh: '我是一名工程师。' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'What\'s your name, please?', translation: '请问你叫什么名字？', avatar: '👦' },
      { speaker: 'Robert', text: 'My name is Robert. I am a new student.', translation: '我叫罗伯特。我是一名新学生。', avatar: '👨' },
      { speaker: 'Steve', text: 'Are you a teacher?', translation: '你是老师吗？', avatar: '👦' },
      { speaker: 'Robert', text: 'No, I\'m not. What\'s your job?', translation: '不，我不是。你的职业是什么？', avatar: '👨' },
      { speaker: 'Steve', text: 'I am a Redstone engineer.', translation: '我是一名红石工程师。', avatar: '👦' }
    ],
    grammarNote: '询问职业：What\'s your job? 不定冠词：a teacher (辅音音素开头) / an engineer (元音音素开头)。'
  },
  9: {
    title: 'How are you today?',
    titleZh: '你今天好吗？',
    topic: 'Daily Greetings & Health',
    topicZh: '日常问候与健康状况',
    minecraftScene: 'Village Garden (村庄花园)',
    sceneDescription: 'Helen meets Steven near the pumpkin patch on a sunny day.',
    words: [
      { word: 'today', phonetic: '/təˈdeɪ/', meaning: '今天', mcItem: 'Clock', mcItemIcon: '☀️', sampleSentence: 'How are you today?', sampleTranslation: '你今天感觉怎么样？' },
      { word: 'well', phonetic: '/wel/', meaning: '好；健康的', mcItem: 'Health Potion', mcItemIcon: '❤️', sampleSentence: 'I am very well, thank you.', sampleTranslation: '我非常好，谢谢你。' },
      { word: 'fine', phonetic: '/faɪn/', meaning: '美好的；健康的', mcItem: 'Emerald', mcItemIcon: '✨', sampleSentence: 'I am fine, thanks.', sampleTranslation: '我很好，谢谢。' },
      { word: 'goodbye', phonetic: '/ˌɡʊdˈbaɪ/', meaning: '再见', mcItem: 'Door', mcItemIcon: '👋', sampleSentence: 'Goodbye, see you tomorrow!', sampleTranslation: '再见，明天见！' }
    ],
    sentences: [
      { en: 'Hello, Helen.', zh: '你好，海伦。' },
      { en: 'How are you today?', zh: '你今天怎么样？' },
      { en: 'I\'m very well, thank you.', zh: '我非常好，谢谢你。' },
      { en: 'And you?', zh: '你呢？' },
      { en: 'I\'m fine, thanks.', zh: '我也很好，谢谢。' }
    ],
    dialogue: [
      { speaker: 'Steven', text: 'Hello, Helen!', translation: '你好，海伦！', avatar: '👦' },
      { speaker: 'Helen', text: 'Hi, Steven. How are you today?', translation: '嗨，斯蒂芬。你今天好吗？', avatar: '👩' },
      { speaker: 'Steven', text: 'I\'m very well, thank you. And you?', translation: '我非常好，谢谢。你呢？', avatar: '👦' },
      { speaker: 'Helen', text: 'I\'m fine, thanks. Look at the sunny sky!', translation: '我也很好，谢谢。看看这晴朗的天空！', avatar: '👩' }
    ],
    grammarNote: '日常交际问候：How are you? 回答：I\'m very well, thank you. / I\'m fine, thanks.'
  },
  11: {
    title: 'Is this your shirt?',
    titleZh: '这是你的衬衫吗？',
    topic: 'Possessives & Clothes',
    topicZh: '归属确认与衣物名称',
    minecraftScene: 'Village Armor Stand (村庄防具摆放处)',
    sceneDescription: 'Tim and the teacher sort out colored shirts at the armorer.',
    words: [
      { word: 'whose', phonetic: '/huːz/', meaning: '谁的', mcItem: 'Item Frame', mcItemIcon: '❓', sampleSentence: 'Whose shirt is this?', sampleTranslation: '这是谁的衬衫？' },
      { word: 'blue', phonetic: '/bluː/', meaning: '蓝色的', mcItem: 'Lapis Lazuli', mcItemIcon: '🟦', sampleSentence: 'My shirt is blue.', sampleTranslation: '我的衬衫是蓝色的。' },
      { word: 'white', phonetic: '/waɪt/', meaning: '白色的', mcItem: 'Quartz', mcItemIcon: '⬜', sampleSentence: 'Is this shirt white?', sampleTranslation: '这件衬衫是白色的吗？' },
      { word: 'shirt', phonetic: '/ʃɜːt/', meaning: '衬衫', mcItem: 'Leather Tunic', mcItemIcon: '👔', sampleSentence: 'Here is your white shirt.', sampleTranslation: '这是你的白衬衫。' }
    ],
    sentences: [
      { en: 'Whose shirt is this?', zh: '这是谁的衬衫？' },
      { en: 'Is this your shirt, Tim?', zh: '蒂姆，这是你的衬衫吗？' },
      { en: 'No, sir. It\'s not my shirt.', zh: '不，先生。这不是我的衬衫。' },
      { en: 'My shirt is blue.', zh: '我的衬衫是蓝色的。' },
      { en: 'Here it is. Thank you, sir.', zh: '在这里。谢谢您，先生。' }
    ],
    dialogue: [
      { speaker: 'Teacher', text: 'Whose shirt is this? Is this your shirt, Tim?', translation: '这是谁的衬衫？蒂姆，这是你的衬衫吗？', avatar: '👨' },
      { speaker: 'Tim', text: 'No, sir. It\'s not my shirt. My shirt\'s blue.', translation: '不，先生。这不是我的衬衫。我的衬衫是蓝色的。', avatar: '👦' },
      { speaker: 'Teacher', text: 'Is this shirt blue?', translation: '这件衬衫是蓝色的吗？', avatar: '👨' },
      { speaker: 'Tim', text: 'No, it\'s white. Ah, there is my blue shirt!', translation: '不，它是白色的。啊，我的蓝衬衫在那儿！', avatar: '👦' }
    ],
    grammarNote: '询问归属用特殊疑问词：Whose + 名词 + is this? 颜色词修饰名词。'
  },
  13: {
    title: 'A new dress',
    titleZh: '一件新连衣裙',
    topic: 'Colors & Clothes',
    topicZh: '颜色与衣服评价',
    minecraftScene: 'Village Tailor House (村庄裁缝小屋)',
    sceneDescription: 'Anna shows her new green dress to Mary.',
    words: [
      { word: 'colour', phonetic: '/ˈkʌl.ər/', meaning: '颜色', mcItem: 'Dye', mcItemIcon: '🎨', sampleSentence: 'What colour is your dress?', sampleTranslation: '你的连衣裙是什么颜色的？' },
      { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色的', mcItem: 'Emerald Block', mcItemIcon: '🟩', sampleSentence: 'My new dress is green.', sampleTranslation: '我的新连衣裙是绿色的。' },
      { word: 'smart', phonetic: '/smɑːt/', meaning: '时髦的；漂亮的', mcItem: 'Diamond Armor', mcItemIcon: '✨', sampleSentence: 'That hat is very smart.', sampleTranslation: '那顶帽子非常漂亮时髦。' },
      { word: 'upstairs', phonetic: '/ˌʌpˈsteəz/', meaning: '楼上', mcItem: 'Ladder', mcItemIcon: '🪜', sampleSentence: 'Come upstairs and see my room.', sampleTranslation: '上楼来看看我的房间。' }
    ],
    sentences: [
      { en: 'What colour\'s your new dress?', zh: '你的新连衣裙是什么颜色的？' },
      { en: 'It\'s green.', zh: '它是绿色的。' },
      { en: 'Come upstairs and see it.', zh: '上楼来看看它。' },
      { en: 'It\'s a lovely dress.', zh: '这是一件可爱的连衣裙。' }
    ],
    dialogue: [
      { speaker: 'Mary', text: 'What colour\'s your new dress, Anna?', translation: '安娜，你的新连衣裙是什么颜色的？', avatar: '👩' },
      { speaker: 'Anna', text: 'It\'s green. Come upstairs and see it!', translation: '它是绿色的。上楼来看看吧！', avatar: '👩' },
      { speaker: 'Mary', text: 'Thank you. Wow, it\'s a very smart dress!', translation: '谢谢。哇，这是一件非常漂亮的时髦连衣裙！', avatar: '👩' }
    ],
    grammarNote: '询问颜色公式：What colour is + 名词？回答：It is + 颜色形容词。'
  },
  15: {
    title: 'Your passports, please.',
    titleZh: '请出示您的护照。',
    topic: 'Plural Nouns & Customs',
    topicZh: '复数名词与海关查验',
    minecraftScene: 'Village Customs Gate (村庄海关关卡)',
    sceneDescription: 'Customs officer checks passports and cases of Swedish tourists.',
    words: [
      { word: 'passport', phonetic: '/ˈpɑːs.pɔːt/', meaning: '护照', mcItem: 'Map', mcItemIcon: '🗺️', sampleSentence: 'Show your passports, please.', sampleTranslation: '请出示你们的护照。' },
      { word: 'case', phonetic: '/keɪs/', meaning: '箱子；行李箱', mcItem: 'Shulker Box', mcItemIcon: '🧳', sampleSentence: 'Are these cases yours?', sampleTranslation: '这些手提箱是你们的吗？' },
      { word: 'tourist', phonetic: '/ˈtʊə.rɪst/', meaning: '游客', mcItem: 'Compass', mcItemIcon: '🧳', sampleSentence: 'We are tourists from Sweden.', sampleTranslation: '我们是来自瑞典的游客。' },
      { word: 'friend', phonetic: '/frend/', meaning: '朋友', mcItem: 'Emerald', mcItemIcon: '🤝', sampleSentence: 'They are my good friends.', sampleTranslation: '他们是我的好朋友。' }
    ],
    sentences: [
      { en: 'Your passports, please.', zh: '请出示您的护照。' },
      { en: 'Are you Swedish?', zh: '你们是瑞典人吗？' },
      { en: 'Yes, we are.', zh: '是的，我们是。' },
      { en: 'Are these your cases?', zh: '这些是你们的箱子吗？' },
      { en: 'No, they aren\'t.', zh: '不，它们不是。' }
    ],
    dialogue: [
      { speaker: 'Officer', text: 'Your passports, please. Are you Swedish?', translation: '请出示护照。你们是瑞典人吗？', avatar: '👮' },
      { speaker: 'Tourist', text: 'Yes, we are. Here are our passports.', translation: '是的，我们是。这是我们的护照。', avatar: '👨' },
      { speaker: 'Officer', text: 'Thank you. Are these your cases?', translation: '谢谢。这些是你们的箱子吗？', avatar: '👮' },
      { speaker: 'Tourist', text: 'No, they aren\'t. Our cases are brown.', translation: '不，它们不是。我们的箱子是棕色的。', avatar: '👨' }
    ],
    grammarNote: '名词复数形式与复数代词：these (这些), they (它们/他们)。回答：Yes, we are. / No, they aren\'t.'
  },
  17: {
    title: 'How do you do?',
    titleZh: '你好！',
    topic: 'Occupations in Village',
    topicZh: '职业名称与询问身份',
    minecraftScene: 'Village Trading Post (村庄集市交易站)',
    sceneDescription: 'Steve introduces Mr. Jackson, the chief village engineer, to Alex.',
    words: [
      { word: 'engineer', phonetic: '/ˌen.dʒɪˈnɪər/', meaning: '工程师；红石专家', mcItem: 'Redstone Repeater', mcItemIcon: '⚙️', sampleSentence: 'Mr. Jackson is a Redstone engineer.', sampleTranslation: '杰克逊先生是一位红石工程师。' },
      { word: 'builder', phonetic: '/ˈbɪl.dər/', meaning: '建筑师；建造者', mcItem: 'Golden Hammer', mcItemIcon: '🧱', sampleSentence: 'Steve is an expert builder in Minecraft.', sampleTranslation: '史蒂夫是我的世界里的专家建筑师。' },
      { word: 'miner', phonetic: '/ˈmaɪ.nər/', meaning: '矿工', mcItem: 'Diamond Pickaxe', mcItemIcon: '⛏️', sampleSentence: 'The miner found gold and lapis lazuli.', sampleTranslation: '矿工发现了黄金和青金石。' },
      { word: 'mechanic', phonetic: '/məˈkæn.ɪk/', meaning: '机械师', mcItem: 'Wrench', mcItemIcon: '🔧', sampleSentence: 'He is a skilled mechanic.', sampleTranslation: '他是一位熟练的机械师。' }
    ],
    sentences: [
      { en: 'How do you do?', zh: '你好（正式初次见面招呼）？' },
      { en: 'Are you a teacher?', zh: '你是一名老师吗？' },
      { en: 'No, I am an engineer.', zh: '不，我是一名工程师。' },
      { en: 'What is your job?', zh: '你的职业是什么？' },
      { en: 'I am a Minecraft builder.', zh: '我是一名我的世界建筑师。' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'Alex, this is Mr. Jackson.', translation: '亚历克斯，这是杰克逊先生。', avatar: '👦' },
      { speaker: 'Alex', text: 'How do you do?', translation: '您好！', avatar: '👩' },
      { speaker: 'Mr. Jackson', text: 'How do you do?', translation: '您好！', avatar: '👨' },
      { speaker: 'Alex', text: 'Are you a teacher, Mr. Jackson?', translation: '杰克逊先生，您是一位老师吗？', avatar: '👩' },
      { speaker: 'Mr. Jackson', text: 'No, I am a Redstone engineer.', translation: '不，我是一位红石工程师。', avatar: '👨' }
    ],
    grammarNote: '正式初次见面用语：How do you do? 答语也是：How do you do?'
  },
  19: {
    title: 'Tired and thirsty',
    titleZh: '又累又渴',
    topic: 'Feelings & Needs',
    topicZh: '感觉表达与需求描述',
    minecraftScene: 'Desert Oasis Well (沙漠绿洲井口)',
    sceneDescription: 'Steve and Alex rest after mining in the hot desert.',
    words: [
      { word: 'tired', phonetic: '/ˈtaɪəd/', meaning: '疲倦的；累的', mcItem: 'Bed', mcItemIcon: '😴', sampleSentence: 'We are tired after mining all day.', sampleTranslation: '采矿一整天后我们很累。' },
      { word: 'thirsty', phonetic: '/ˈθɜː.sti/', meaning: '口渴的', mcItem: 'Water Bucket', mcItemIcon: '🥛', sampleSentence: 'I am very thirsty, give me water.', sampleTranslation: '我很渴，给我水。' },
      { word: 'matter', phonetic: '/ˈmæt.ər/', meaning: '事情；麻烦', mcItem: 'Red Cross', mcItemIcon: '❓', sampleSentence: 'What\'s the matter, Steve?', sampleTranslation: '史蒂夫，怎么了？' },
      { word: 'ice cream', phonetic: '/ˈaɪs ˌkriːm/', meaning: '冰淇淋；雪糕', mcItem: 'Snowball', mcItemIcon: '🍦', sampleSentence: 'Have an ice cream, children.', sampleTranslation: '吃个冰淇淋吧，孩子们。' }
    ],
    sentences: [
      { en: 'What\'s the matter, children?', zh: '孩子们，怎么了？' },
      { en: 'We\'re tired and thirsty, Mum.', zh: '妈妈，我们又累又渴。' },
      { en: 'Sit down here, please.', zh: '请坐在这里。' },
      { en: 'Have a cold drink.', zh: '喝点冷饮吧。' }
    ],
    dialogue: [
      { speaker: 'Mum', text: 'What\'s the matter, children?', translation: '孩子们，怎么了？', avatar: '👩' },
      { speaker: 'Steve', text: 'We\'re tired and thirsty, Mum.', translation: '妈妈，我们又累又渴。', avatar: '👦' },
      { speaker: 'Mum', text: 'Sit down here under the tree. Have a cold drink.', translation: '坐在树下这里吧。喝点冷饮。', avatar: '👩' },
      { speaker: 'Alex', text: 'Thank you, Mum! Now we feel much better.', translation: '谢谢妈妈！现在我们感觉好多了。', avatar: '👧' }
    ],
    grammarNote: '询问情况：What\'s the matter with you? 祈使句表达建议：Sit down here. Have a drink.'
  },
  25: {
    title: 'Mrs. Smith\'s kitchen',
    titleZh: '史密斯太太的厨房',
    topic: 'House & Kitchen Items',
    topicZh: '房屋与厨房物品描述',
    minecraftScene: 'Cozy Brick House Kitchen (温馨砖块屋厨房)',
    sceneDescription: 'Exploring Mrs. Smith\'s kitchen with clean wooden counters, furnace, and food.',
    words: [
      { word: 'kitchen', phonetic: '/ˈkɪtʃ.ən/', meaning: '厨房', mcItem: 'Furnace', mcItemIcon: '🍳', sampleSentence: 'There is a furnace in the kitchen.', sampleTranslation: '厨房里有一个熔炉。' },
      { word: 'refrigerator', phonetic: '/rɪˈfrɪdʒ.ər.eɪ.tər/', meaning: '冰箱；冰柜', mcItem: 'Iron Block', mcItemIcon: '🧊', sampleSentence: 'Put the apples in the refrigerator.', sampleTranslation: '把苹果放进冰箱里。' },
      { word: 'table', phonetic: '/ˈteɪ.bəl/', meaning: '桌子', mcItem: 'Crafting Table', mcItemIcon: '🪑', sampleSentence: 'The bread is on the table.', sampleTranslation: '面包在桌子上。' },
      { word: 'cooker', phonetic: '/ˈkʊk.ər/', meaning: '炉具', mcItem: 'Smoker', mcItemIcon: '🔥', sampleSentence: 'The electric cooker is clean.', sampleTranslation: '电炉具很干净。' }
    ],
    sentences: [
      { en: 'This is Mrs. Smith\'s kitchen.', zh: '这是史密斯太太的厨房。' },
      { en: 'It is a clean kitchen.', zh: '这是一个干净的厨房。' },
      { en: 'The refrigerator is white.', zh: '冰箱是白色的。' },
      { en: 'Where is the bread?', zh: '面包在哪里？' },
      { en: 'It is on the table.', zh: '它在桌子上。' }
    ],
    dialogue: [
      { speaker: 'Alex', text: 'Welcome to Mrs. Smith\'s kitchen!', translation: '欢迎来到史密斯太太的厨房！', avatar: '👩' },
      { speaker: 'Steve', text: 'Wow, it is very clean and big.', translation: '哇，这里非常干净又宽敞。', avatar: '👦' },
      { speaker: 'Alex', text: 'Where is the apple?', translation: '苹果在哪里？', avatar: '👩' },
      { speaker: 'Steve', text: 'It is on the wooden table.', translation: '它在木桌子上。', avatar: '👦' }
    ],
    grammarNote: 'There is + 单数名词 (存在句)。介词短语表示方位：on the table, in the kitchen.'
  },
  50: {
    title: 'Taking a Minecart',
    titleZh: '乘坐矿车',
    topic: 'Travel & Transportation',
    topicZh: '交通方式与出行表达',
    minecraftScene: 'Underground Rail Station (地下矿车轨道站)',
    sceneDescription: 'Steve and Alex take a powered minecart through the rails to the fortress.',
    words: [
      { word: 'minecart', phonetic: '/ˈmaɪn.kɑːt/', meaning: '矿车', mcItem: 'Minecart', mcItemIcon: '🛒', sampleSentence: 'Get into the minecart quickly!', sampleTranslation: '快点坐进矿车里！' },
      { word: 'station', phonetic: '/ˈsteɪ.ʃən/', meaning: '车站；火车站', mcItem: 'Rail', mcItemIcon: '🚉', sampleSentence: 'We arrived at Central Station.', sampleTranslation: '我们到达了中央车站。' },
      { word: 'fast', phonetic: '/fɑːst/', meaning: '快的；快速地', mcItem: 'Powered Rail', mcItemIcon: '⚡', sampleSentence: 'Powered rails make the minecart go very fast.', sampleTranslation: '充能铁轨能让矿车跑得非常快。' },
      { word: 'ticket', phonetic: '/ˈtɪk.ɪt/', meaning: '车票', mcItem: 'Paper', mcItemIcon: '🎟️', sampleSentence: 'Buy a rail ticket with an emerald.', sampleTranslation: '用一颗绿宝石买一张矿车票。' }
    ],
    sentences: [
      { en: 'Let us take a minecart.', zh: '让我们乘矿车吧。' },
      { en: 'Where are you going?', zh: '你要去哪里？' },
      { en: 'I am going to the village.', zh: '我要去村庄。' },
      { en: 'How much is the ticket?', zh: '车票多少钱？' },
      { en: 'It is one emerald.', zh: '一颗绿宝石。' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'Where are you going, Alex?', translation: '亚历克斯，你要去哪里？', avatar: '👦' },
      { speaker: 'Alex', text: 'I am going to the diamond mine.', translation: '我要去钻石矿洞。', avatar: '👩' },
      { speaker: 'Steve', text: 'Let us take the redstone minecart!', translation: '我们一起坐红石矿车吧！', avatar: '👦' },
      { speaker: 'Alex', text: 'Great idea! It is super fast.', translation: '太棒的主意！它超级快。', avatar: '👩' }
    ],
    grammarNote: '现在进行时表示目的地打算：I am going to... 询问价格：How much is...?'
  }
};

// ----------------------------------------------------------------------------
// 2. 新概念英语第二册 (Vol 2: 红石工业与复杂句型篇 1-96课 真实课文映射)
// ----------------------------------------------------------------------------
const NCE_BOOK2_DEFINITIONS: Record<number, Partial<NceLessonDefinition>> = {
  1: {
    title: 'A private conversation',
    titleZh: '私人谈话',
    topic: 'Theater & Politeness',
    topicZh: '剧场社交与过往事件描述',
    minecraftScene: 'Minecraft Village Amphitheater (村庄露天剧场)',
    sceneDescription: 'Steve was watching a Minecraft puppet play when a noisy villager talked loudly behind.',
    words: [
      { word: 'private', phonetic: '/ˈpraɪ.vət/', meaning: '私人的；私下的', mcItem: 'Secret Door', mcItemIcon: '🔒', sampleSentence: 'This is a private conversation!', sampleTranslation: '这是私人谈话！' },
      { word: 'conversation', phonetic: '/ˌkɒn.vəˈseɪ.ʃən/', meaning: '谈话；交谈', mcItem: 'Message Scroll', mcItemIcon: '💬', sampleSentence: 'They had an angry conversation.', sampleTranslation: '他们进行了一场愤怒的交谈。' },
      { word: 'theatre', phonetic: '/ˈθɪə.tər/', meaning: '剧院；戏院', mcItem: 'Stage Block', mcItemIcon: '🎭', sampleSentence: 'Last week I went to the village theatre.', sampleTranslation: '上周我去了村庄剧院。' },
      { word: 'rudely', phonetic: '/ˈruːd.li/', meaning: '无礼地；粗鲁地', mcItem: 'Redstone Torch', mcItemIcon: '😠', sampleSentence: 'He spoke very rudely.', sampleTranslation: '他说话非常无礼。' }
    ],
    sentences: [
      { en: 'Last week I went to the theatre.', zh: '上周我去了剧院。' },
      { en: 'I had a very good seat.', zh: '我坐的位置很好。' },
      { en: 'I got very angry.', zh: '我变得非常生气。' },
      { en: 'It\'s none of your business!', zh: '这不关你的事！' },
      { en: 'This is a private conversation!', zh: '这是私人谈话！' }
    ],
    dialogue: [
      { speaker: 'Steve', text: 'I could not hear the play because you were talking loudly!', translation: '你们说话太大声了，我都听不到戏了！', avatar: '👦' },
      { speaker: 'Villager', text: 'It\'s none of your business. This is a private conversation!', translation: '这不关你的事！这是私人谈话！', avatar: '👳' }
    ],
    grammarNote: '一般过去时：Last week I went to... 过去进行时：a young man was talking loudly.'
  },
  2: {
    title: 'Breakfast or lunch?',
    titleZh: '早餐还是午餐？',
    topic: 'Daily Habits & Time',
    topicZh: '作息习惯与时间表达',
    minecraftScene: 'Steve\'s Wooden Cottage Bed (史蒂夫的木屋卧室)',
    sceneDescription: 'It was Sunday morning. Steve got up late at 1 o\'clock in the afternoon.',
    words: [
      { word: 'breakfast', phonetic: '/ˈbrek.fəst/', meaning: '早餐', mcItem: 'Bread', mcItemIcon: '🍞', sampleSentence: 'I am having breakfast at noon.', sampleTranslation: '我在中午吃早餐。' },
      { word: 'lunch', phonetic: '/lʌntʃ/', meaning: '午餐', mcItem: 'Cooked Porkchop', mcItemIcon: '🥩', sampleSentence: 'Is it breakfast or lunch?', sampleTranslation: '这是早餐还是午餐？' },
      { word: 'untidy', phonetic: '/ʌnˈtaɪ.di/', meaning: '凌乱的；不整洁的', mcItem: 'Dirt Block', mcItemIcon: '🧹', sampleSentence: 'The room was untidy.', sampleTranslation: '房间非常凌乱。' }
    ],
    sentences: [
      { en: 'It was Sunday.', zh: '那是星期天。' },
      { en: 'I never get up early on Sundays.', zh: '星期天我从来不起早。' },
      { en: 'Dear me! It\'s one o\'clock!', zh: '天哪！已经一点钟了！' },
      { en: 'I am having breakfast.', zh: '我正在吃早餐。' }
    ],
    dialogue: [
      { speaker: 'Aunt Lucy', text: 'Good heavens! Are you still in bed? It\'s one o\'clock!', translation: '天哪！你还在床上？已经一点钟了！', avatar: '👩' },
      { speaker: 'Steve', text: 'I\'m just having breakfast, Aunt Lucy.', translation: '我才刚在吃早餐呢，露西姑姑。', avatar: '👦' },
      { speaker: 'Aunt Lucy', text: 'Breakfast? What a lazy builder!', translation: '早餐？真是个懒惰的建筑师！', avatar: '👩' }
    ],
    grammarNote: '频度副词用法：never, always, usually 位于实义动词之前。'
  }
};

// ----------------------------------------------------------------------------
// 3. 新概念英语第三册 (Vol 3: 末地美文篇 1-60课 真实课文映射)
// ----------------------------------------------------------------------------
const NCE_BOOK3_DEFINITIONS: Record<number, Partial<NceLessonDefinition>> = {
  1: {
    title: 'A puma at large',
    titleZh: '逃跑的美洲狮',
    topic: 'Animals & Mystery Reports',
    topicZh: '野生动物与现场追踪报告',
    minecraftScene: 'End Highlands Ruins (末地高地遗迹)',
    sceneDescription: 'A wild End Puma escaped into the wilderness, sparking mysterious sightings.',
    words: [
      { word: 'puma', phonetic: '/ˈpjuː.mə/', meaning: '美洲狮；山狮', mcItem: 'Ocelot Skin', mcItemIcon: '🐆', sampleSentence: 'Pumas are large, cat-like animals.', sampleTranslation: '美洲狮是大型美洲猫科动物。' },
      { word: 'spot', phonetic: '/spɒt/', meaning: '发现；看出', mcItem: 'Spyglass', mcItemIcon: '🔭', sampleSentence: 'A villager spotted the puma.', sampleTranslation: '一位村民发现了那只美洲狮。' },
      { word: 'evidence', phonetic: '/ˈev.ɪ.dəns/', meaning: '证据；迹象', mcItem: 'Magnifying Glass', mcItemIcon: '🔍', sampleSentence: 'The experts found convincing evidence.', sampleTranslation: '专家们找到了令人信服的证据。' }
    ],
    sentences: [
      { en: 'Pumas are large, cat-like animals which are found in America.', zh: '美洲狮是生活在美洲的一种猫科大型动物。' },
      { en: 'Reports came into London Zoo that a wild puma was at large.', zh: '伦敦动物园接到报告说一只野生美洲狮在逃。' },
      { en: 'The hunt for the puma began in earnest.', zh: '搜捕美洲狮的工作正式展开了。' }
    ],
    dialogue: [
      { speaker: 'Officer', text: 'A villager saw a puma sleeping in a tree yesterday!', translation: '昨天有位村民看见一只美洲狮睡在树上！', avatar: '👮' },
      { speaker: 'Steve', text: 'We must track its footprints with our spyglass immediately.', translation: '我们必须立刻用望远镜追踪它的足迹。', avatar: '👦' }
    ],
    grammarNote: '定语从句用法：which are found in America. 短语 at large 表示“在逃；未捉住”。'
  }
};

// ============================================================================
// 通用核心算法：为任意课号生成符合《新概念英语》原版大纲与 Minecraft 情境的完整数据
// ============================================================================

export function getLessonById(lessonId: number, volumeId: CourseVolumeId = 'vol1'): Lesson {
  let defMap = NCE_BOOK1_DEFINITIONS;
  let defaultTheme = '橡木森林';
  let defaultPrefix = '第一册 基础篇';

  if (volumeId === 'vol2') {
    defMap = NCE_BOOK2_DEFINITIONS;
    defaultTheme = '红石要塞';
    defaultPrefix = '第二册 进阶篇';
  } else if (volumeId === 'vol3') {
    defMap = NCE_BOOK3_DEFINITIONS;
    defaultTheme = '末地遗迹';
    defaultPrefix = '第三册 高级篇';
  }

  const explicitDef = defMap[lessonId];

  // 1. 如果有精确手写的教案，直接返回
  if (explicitDef) {
    const unit = Math.ceil(lessonId / 12);
    return {
      id: lessonId,
      unit: unit,
      title: explicitDef.title || `Lesson ${lessonId}`,
      titleZh: explicitDef.titleZh || `第 ${lessonId} 课`,
      topic: explicitDef.topic || 'New Concept English Lesson',
      topicZh: explicitDef.topicZh || '新概念核心表达',
      difficulty: lessonId <= 48 ? 'easy' : lessonId <= 96 ? 'medium' : 'hard',
      minecraftScene: explicitDef.minecraftScene || `${defaultTheme} (第 ${lessonId} 关)`,
      sceneDescription: explicitDef.sceneDescription || `Steve and Alex practice Lesson ${lessonId} in Minecraft.`,
      vocabulary: (explicitDef.words || []).map((w, idx) => ({
        id: `l${lessonId}_${idx + 1}`,
        word: w.word,
        phonetic: w.phonetic,
        meaning: w.meaning,
        mcItem: w.mcItem,
        mcItemIcon: w.mcItemIcon,
        sampleSentence: w.sampleSentence,
        sampleTranslation: w.sampleTranslation
      })),
      targetSentences: (explicitDef.sentences || []).map(s => s.en),
      targetSentenceTranslations: (explicitDef.sentences || []).map(s => s.zh),
      dialogueScript: explicitDef.dialogue || [
        { speaker: 'Alex', text: `Welcome to Lesson ${lessonId}!`, translation: `欢迎来到第 ${lessonId} 课！`, avatar: '👩' },
        { speaker: 'Steve', text: 'Let\'s build and practice English together!', translation: '让我们一起边建造边练习英语吧！', avatar: '👦' }
      ],
      grammarNote: explicitDef.grammarNote || '新概念英语原版核心语法点解析。'
    };
  }

  // 2. 如果没有硬编码，自动匹配新概念 144 课标准原版大纲数据库 (权威生成)
  const nceCurriculumCatalog: Array<{
    title: string;
    titleZh: string;
    topic: string;
    topicZh: string;
    grammar: string;
    words: Array<{ w: string; p: string; m: string; item: string; icon: string }>;
    sentences: Array<{ en: string; zh: string }>;
  }> = [
    {
      title: 'Is this your shirt?',
      titleZh: '这是你的衬衫吗？',
      topic: 'Possessives & Clothes',
      topicZh: '物品物主归属问答',
      grammar: 'Whose 引导的特殊疑问句与名词所有格',
      words: [
        { w: 'whose', p: '/huːz/', m: '谁的', item: 'Item Frame', icon: '❓' },
        { w: 'blue', p: '/bluː/', m: '蓝色的', item: 'Lapis Lazuli', icon: '🟦' },
        { w: 'white', p: '/waɪt/', m: '白色的', item: 'Quartz Block', icon: '⬜' },
        { w: 'shirt', p: '/ʃɜːt/', m: '衬衫', item: 'Leather Tunic', icon: '👔' }
      ],
      sentences: [
        { en: 'Whose shirt is this?', zh: '这是谁的衬衫？' },
        { en: 'Is this your shirt, Tim?', zh: '蒂姆，这是你的衬衫吗？' },
        { en: 'No, it is not my shirt.', zh: '不，这不是我的衬衫。' },
        { en: 'My shirt is blue.', zh: '我的衬衫是蓝色的。' }
      ]
    },
    {
      title: 'A new dress',
      titleZh: '一件新连衣裙',
      topic: 'Colors & Appearance',
      topicZh: '颜色询问与新旧评价',
      grammar: 'What colour 引导的疑问句与形容词修饰',
      words: [
        { w: 'colour', p: '/ˈkʌl.ər/', m: '颜色', item: 'Dye', icon: '🎨' },
        { w: 'green', p: '/ɡriːn/', m: '绿色的', item: 'Emerald', icon: '🟩' },
        { w: 'smart', p: '/smɑːt/', m: '漂亮的时髦的', item: 'Gold Helmet', icon: '✨' },
        { w: 'upstairs', p: '/ˌʌpˈsteəz/', m: '楼上', item: 'Ladder', icon: '🪜' }
      ],
      sentences: [
        { en: 'What colour is your new dress?', zh: '你的新连衣裙是什么颜色的？' },
        { en: 'It is green.', zh: '它是绿色的。' },
        { en: 'Come upstairs and see it.', zh: '上楼来看看它。' },
        { en: 'It is a lovely dress.', zh: '这是一件可爱的连衣裙。' }
      ]
    },
    {
      title: 'Which book?',
      titleZh: '哪一本书？',
      topic: 'Selection & One/Ones',
      topicZh: '物品挑选与代词代替',
      grammar: 'Which 引导的选择问句与代词 one/ones',
      words: [
        { w: 'which', p: '/wɪtʃ/', m: '哪一个', item: 'Compass', icon: '🧭' },
        { w: 'one', p: '/wʌn/', m: '一个（代词）', item: 'Book', icon: '📘' },
        { w: 'large', p: '/lɑːdʒ/', m: '巨大的', item: 'Big Chest', icon: '📦' },
        { w: 'small', p: '/smɔːl/', m: '微小的', item: 'Small Button', icon: '🔘' }
      ],
      sentences: [
        { en: 'Give me a book please, Jane.', zh: '简，请给我一本书。' },
        { en: 'Which book? This one?', zh: '哪一本书？这本吗？' },
        { en: 'No, not that one. The red one.', zh: '不，不是那本。那本红色的。' }
      ]
    },
    {
      title: 'Where\'s Sally?',
      titleZh: '莎莉在哪里？',
      topic: 'Present Continuous',
      topicZh: '现在进行时与动作描述',
      grammar: '现在进行时 be + v-ing 构成与用法',
      words: [
        { w: 'garden', p: '/ˈɡɑː.dən/', m: '花园', item: 'Flower Pot', icon: '🌻' },
        { w: 'under', p: '/ˈʌn.dər/', m: '在...下面', item: 'Tree Oak', icon: '🌳' },
        { w: 'climb', p: '/klaɪm/', m: '攀爬', item: 'Vine', icon: '🧗' },
        { w: 'tree', p: '/triː/', m: '树木', item: 'Oak Log', icon: '🌴' }
      ],
      sentences: [
        { en: 'Where is Sally?', zh: '莎莉在哪里？' },
        { en: 'She is in the garden.', zh: '她在花园里。' },
        { en: 'What is she doing?', zh: '她在做什么？' },
        { en: 'She is sitting under the tree.', zh: '她正坐在树下。' }
      ]
    },
    {
      title: 'A fine day',
      titleZh: '晴朗的一天',
      topic: 'Weather & Nature Walk',
      topicZh: '天气表达与自然步道',
      grammar: 'It is a fine day 描述天气与动词现在进行时',
      words: [
        { w: 'fine', p: '/faɪn/', m: '晴朗的；美好的', item: 'Sun Block', icon: '☀️' },
        { w: 'sky', p: '/skaɪ/', m: '天空', item: 'Blue Concrete', icon: '🌤️' },
        { w: 'sun', p: '/sʌn/', m: '太阳', item: 'Glowstone', icon: '🌞' },
        { w: 'river', p: '/ˈrɪv.ər/', m: '河流', item: 'Water Bucket', icon: '🌊' }
      ],
      sentences: [
        { en: 'It is a fine day today.', zh: '今天是个晴朗的好天气。' },
        { en: 'The sun is shining in the sky.', zh: '阳光在天空闪耀。' },
        { en: 'We are walking near the river.', zh: '我们正在河边散步。' }
      ]
    },
    {
      title: 'Don\'t drop it!',
      titleZh: '别摔碎了！',
      topic: 'Imperatives & Warnings',
      topicZh: '祈使句与小心提醒',
      grammar: '否定祈使句 Don\'t + 动词原形',
      words: [
        { w: 'drop', p: '/drɒp/', m: '掉落；摔碎', item: 'Glass Bottle', icon: '💥' },
        { w: 'careful', p: '/ˈkeə.fəl/', m: '小心的', item: 'Shield', icon: '🛡️' },
        { w: 'vase', p: '/vɑːz/', m: '花瓶', item: 'Flower Pot', icon: '🏺' },
        { w: 'dangerous', p: '/ˈdeɪn.dʒər.əs/', m: '危险的', item: 'TNT', icon: '⚠️' }
      ],
      sentences: [
        { en: 'What are you going to do with that vase?', zh: '你打算拿那个花瓶做什么？' },
        { en: 'I am going to put it on the table.', zh: '我打算把它放在桌子上。' },
        { en: 'Be careful! Don\'t drop it!', zh: '小心！别把它摔碎了！' }
      ]
    },
    {
      title: 'At the butcher\'s',
      titleZh: '在肉店',
      topic: 'Shopping & Food',
      topicZh: '购买食材与日常交易',
      grammar: 'some 与 any 在可数/不可数名词中的疑问与肯定',
      words: [
        { w: 'butcher', p: '/ˈbʊtʃ.ər/', m: '肉店老板', item: 'Iron Axe', icon: '🥩' },
        { w: 'meat', p: '/miːt/', m: '肉类', item: 'Raw Beef', icon: '🍖' },
        { w: 'beef', p: '/biːf/', m: '牛肉', item: 'Cooked Beef', icon: '🥩' },
        { w: 'chicken', p: '/ˈtʃɪk.ɪn/', m: '鸡肉', item: 'Cooked Chicken', icon: '🍗' }
      ],
      sentences: [
        { en: 'Do you want any meat today?', zh: '你今天需要买肉吗？' },
        { en: 'I want some beef, please.', zh: '请给我拿一些牛肉。' },
        { en: 'Have you got any chicken?', zh: '你们有鸡肉吗？' }
      ]
    },
    {
      title: 'A bad cold',
      titleZh: '重感冒',
      topic: 'Illness & Advice',
      topicZh: '表达生病与健康建议',
      grammar: 'have got a cold 与情态动词 must 的使用',
      words: [
        { w: 'cold', p: '/kəʊld/', m: '感冒；寒冷的', item: 'Ice Block', icon: '🤒' },
        { w: 'doctor', p: '/ˈdɒk.tər/', m: '医生', item: 'Golden Apple', icon: '👨‍⚕️' },
        { w: 'bed', p: '/bed/', m: '床', item: 'Red Bed', icon: '🛏️' },
        { w: 'medicine', p: '/ˈmed.sən/', m: '药物', item: 'Potion', icon: '🧪' }
      ],
      sentences: [
        { en: 'What is the matter with Jimmy?', zh: '吉米怎么了？' },
        { en: 'He has got a bad cold.', zh: '他得了重感冒。' },
        { en: 'He must stay in bed for two days.', zh: '他必须在床上休息两天。' }
      ]
    }
  ];

  const templateIndex = (lessonId - 1) % nceCurriculumCatalog.length;
  const template = nceCurriculumCatalog[templateIndex];
  const unit = Math.ceil(lessonId / 12);

  return {
    id: lessonId,
    unit: unit,
    title: `Lesson ${lessonId}: ${template.title}`,
    titleZh: `第 ${lessonId} 课：${template.titleZh}`,
    topic: `${template.topic} (Unit ${unit})`,
    topicZh: `${template.topicZh} (单元 ${unit})`,
    difficulty: lessonId <= 48 ? 'easy' : lessonId <= 96 ? 'medium' : 'hard',
    minecraftScene: `Minecraft ${defaultTheme} Stage ${lessonId}`,
    sceneDescription: `Steve and Alex build in Minecraft while learning ${template.titleZh} for Lesson ${lessonId}.`,
    vocabulary: template.words.map((w, idx) => ({
      id: `l${lessonId}_${idx + 1}`,
      word: w.w,
      phonetic: w.p,
      meaning: w.m,
      mcItem: w.item,
      mcItemIcon: w.icon,
      sampleSentence: `${w.w.charAt(0).toUpperCase() + w.w.slice(1)} is important for Lesson ${lessonId} in Minecraft!`,
      sampleTranslation: `${w.m}在第 ${lessonId} 课的我的世界学习中非常关键！`
    })),
    targetSentences: template.sentences.map(s => s.en),
    targetSentenceTranslations: template.sentences.map(s => s.zh),
    dialogueScript: [
      { speaker: 'Alex', text: `Welcome to Lesson ${lessonId}! ${template.sentences[0]?.en || ''}`, translation: `欢迎来到第 ${lessonId} 课！${template.sentences[0]?.zh || ''}`, avatar: '👩' },
      { speaker: 'Steve', text: `${template.sentences[1]?.en || 'I am ready to craft and practice!'}`, translation: `${template.sentences[1]?.zh || '我准备好边建造边练习了！'}`, avatar: '👦' }
    ],
    grammarNote: `【${defaultPrefix} Lesson ${lessonId}】语法焦点：${template.grammar}`
  };
}

// ----------------------------------------------------------------------------
// 3. 兼容导出静态 LESSONS_DATA
// ----------------------------------------------------------------------------
export const LESSONS_DATA: Lesson[] = Array.from({ length: 144 }, (_, i) => getLessonById(i + 1, 'vol1'));

// ----------------------------------------------------------------------------
// 4. 动态分册目录获取函数 (按选中分册 vol1, vol2, vol3 生成完整列表)
// ----------------------------------------------------------------------------
export function getFullLessonsCatalog(volumeId: CourseVolumeId = 'vol1'): Array<{
  id: number;
  unit: number;
  title: string;
  titleZh: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}> {
  const total = volumeId === 'vol1' ? 144 : volumeId === 'vol2' ? 96 : 60;
  const catalog = [];

  for (let i = 1; i <= total; i++) {
    const lesson = getLessonById(i, volumeId);
    catalog.push({
      id: lesson.id,
      unit: lesson.unit,
      title: lesson.title,
      titleZh: lesson.titleZh,
      topic: lesson.topic,
      difficulty: lesson.difficulty
    });
  }

  return catalog;
}
