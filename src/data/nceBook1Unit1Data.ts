// Authentic NCE Book 1 Unit 1 Data (Lessons 1 - 24)
export interface LessonCorpusItem {
  id: number;
  unit: number;
  title: string;
  titleZh: string;
  topic: string;
  topicZh: string;
  grammar: string;
  difficulty: 'easy' | 'medium' | 'hard';
  dialogue: Array<{
    speaker: string;
    text: string;
    translation: string;
    avatar: string;
  }>;
  sentences: Array<{
    en: string;
    zh: string;
  }>;
  words: Array<{
    word: string;
    phonetic: string;
    meaning: string;
    mcItem: string;
    mcItemIcon: string;
    sampleSentence: string;
    sampleTranslation: string;
  }>;
  grammarNote: string;
}

export const NCE_BOOK1_UNIT1_DATA: Record<number, LessonCorpusItem> = {
  "1": {
    "id": 1,
    "unit": 1,
    "title": "Excuse me!",
    "titleZh": "对不起！",
    "topic": "Greetings & Politeness",
    "topicZh": "礼貌问候与认领",
    "grammar": "Be动词一般疑问句与礼貌用语",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MAN",
        "text": "Excuse me!",
        "translation": "对不起！",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Yes?",
        "translation": "什么事？",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Is this your handbag?",
        "translation": "这是您的手提包吗？",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Pardon?",
        "translation": "对不起，请再说一遍。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Is this your handbag?",
        "translation": "这是您的手提包吗？",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Yes, it is.",
        "translation": "是的，是我的。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Thank you very much.",
        "translation": "非常感谢！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Excuse me!",
        "zh": "对不起！"
      },
      {
        "en": "Yes?",
        "zh": "什么事？"
      },
      {
        "en": "Is this your handbag?",
        "zh": "这是您的手提包吗？"
      },
      {
        "en": "Pardon?",
        "zh": "对不起，请再说一遍。"
      },
      {
        "en": "Is this your handbag?",
        "zh": "这是您的手提包吗？"
      },
      {
        "en": "Yes, it is.",
        "zh": "是的，是我的。"
      },
      {
        "en": "Thank you very much.",
        "zh": "非常感谢！"
      }
    ],
    "words": [
      {
        "word": "excuse",
        "phonetic": "/ɪkˈskjuːz/",
        "meaning": "v. 原谅",
        "mcItem": "Paper",
        "mcItemIcon": "📜",
        "sampleSentence": "Excuse me, is this your handbag?",
        "sampleTranslation": "对不起，这是您的手提包吗？"
      },
      {
        "word": "me",
        "phonetic": "/miː/",
        "meaning": "pron. 我 (宾格)",
        "mcItem": "Player Head",
        "mcItemIcon": "👤",
        "sampleSentence": "Give me the book, please.",
        "sampleTranslation": "请把那本书给我。"
      },
      {
        "word": "yes",
        "phonetic": "/jes/",
        "meaning": "adv. 是的",
        "mcItem": "Emerald",
        "mcItemIcon": "✅",
        "sampleSentence": "Yes, it is.",
        "sampleTranslation": "是的，它是。"
      },
      {
        "word": "is",
        "phonetic": "/ɪz/",
        "meaning": "v. be 动词现在时第三人称单数",
        "mcItem": "Beacon",
        "mcItemIcon": "🔹",
        "sampleSentence": "Is this your pencil?",
        "sampleTranslation": "这是你的铅笔吗？"
      },
      {
        "word": "this",
        "phonetic": "/ðɪs/",
        "meaning": "pron. 这",
        "mcItem": "Compass",
        "mcItemIcon": "👉",
        "sampleSentence": "This is my coat.",
        "sampleTranslation": "这是我的外套。"
      },
      {
        "word": "your",
        "phonetic": "/jɔː/",
        "meaning": "possessive adj. 你的，你们的",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "Is this your handbag?",
        "sampleTranslation": "这是你的手提包吗？"
      },
      {
        "word": "handbag",
        "phonetic": "/ˈhændbæɡ/",
        "meaning": "n. (女用)手提包",
        "mcItem": "Bundle",
        "mcItemIcon": "👜",
        "sampleSentence": "Her handbag is on the chair.",
        "sampleTranslation": "她的手提包在椅子上。"
      },
      {
        "word": "pardon",
        "phonetic": "/ˈpɑːdn/",
        "meaning": "int. 原谅，请再说一遍",
        "mcItem": "Bell",
        "mcItemIcon": "🔔",
        "sampleSentence": "Pardon? I didn't hear you.",
        "sampleTranslation": "对不起，我没听清。"
      },
      {
        "word": "it",
        "phonetic": "/ɪt/",
        "meaning": "pron. 它",
        "mcItem": "Item Frame",
        "mcItemIcon": "📦",
        "sampleSentence": "It is a new car.",
        "sampleTranslation": "这是一辆新车。"
      },
      {
        "word": "thank you",
        "phonetic": "/ˈθæŋk juː/",
        "meaning": "感谢你(们)",
        "mcItem": "Heart",
        "mcItemIcon": "💖",
        "sampleSentence": "Thank you very much.",
        "sampleTranslation": "非常感谢。"
      },
      {
        "word": "very much",
        "phonetic": "/ˈveri mʌtʃ/",
        "meaning": "adv. 非常地",
        "mcItem": "Star",
        "mcItemIcon": "⭐",
        "sampleSentence": "Thank you very much.",
        "sampleTranslation": "非常感谢。"
      }
    ],
    "grammarNote": "Excuse me 常用于与陌生人搭话、打断别人说话或从别人身边挤过时。Is this your ...? 是一般疑问句，句调读升调。Pardon? 是 I beg your pardon 的省略。"
  },
  "2": {
    "id": 2,
    "unit": 1,
    "title": "Is this your ...?",
    "titleZh": "这是你的……吗？",
    "topic": "Personal Belongings",
    "topicZh": "个人物品确认",
    "grammar": "形容词性物主代词与名词一般疑问句及否定句",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Is this your pen?",
        "translation": "这是你的钢笔吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it isn't my pen. It's your pen.",
        "translation": "不，这不是我的钢笔。这是你的钢笔。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your pencil?",
        "translation": "这是你的铅笔吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it isn't my pencil. It's your pencil.",
        "translation": "不，这不是我的铅笔。这是你的铅笔。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your book?",
        "translation": "这是你的书吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it isn't my book. It's your book.",
        "translation": "不，这不是我的书。这是你的书。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your watch?",
        "translation": "这是你的手表吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, it is. It's my watch. Thank you.",
        "translation": "是的，它是我的手表。谢谢。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Is this your pen?",
        "zh": "这是你的钢笔吗？"
      },
      {
        "en": "Is this your pencil?",
        "zh": "这是你的铅笔吗？"
      },
      {
        "en": "Is this your book?",
        "zh": "这是你的书吗？"
      },
      {
        "en": "Is this your watch?",
        "zh": "这是你的手表吗？"
      },
      {
        "en": "Is this your coat?",
        "zh": "这是你的上衣吗？"
      },
      {
        "en": "Is this your dress?",
        "zh": "这是你的连衣裙吗？"
      },
      {
        "en": "Is this your skirt?",
        "zh": "这是你的裙子吗？"
      },
      {
        "en": "Is this your shirt?",
        "zh": "这是你的衬衣吗？"
      },
      {
        "en": "Is this your car?",
        "zh": "这是你的小汽车吗？"
      },
      {
        "en": "Is this your house?",
        "zh": "这是你的房子吗？"
      }
    ],
    "words": [
      {
        "word": "pen",
        "phonetic": "/pen/",
        "meaning": "n. 钢笔",
        "mcItem": "Feather",
        "mcItemIcon": "🖊️",
        "sampleSentence": "Is this your pen?",
        "sampleTranslation": "这是你的钢笔吗？"
      },
      {
        "word": "pencil",
        "phonetic": "/ˈpensl/",
        "meaning": "n. 铅笔",
        "mcItem": "Stick",
        "mcItemIcon": "✏️",
        "sampleSentence": "This is a pencil.",
        "sampleTranslation": "这是一支铅笔。"
      },
      {
        "word": "book",
        "phonetic": "/bʊk/",
        "meaning": "n. 书",
        "mcItem": "Book",
        "mcItemIcon": "📖",
        "sampleSentence": "Is this your book?",
        "sampleTranslation": "这是你的书吗？"
      },
      {
        "word": "watch",
        "phonetic": "/wɒtʃ/",
        "meaning": "n. 手表",
        "mcItem": "Clock",
        "mcItemIcon": "⌚",
        "sampleSentence": "This is my watch.",
        "sampleTranslation": "这是我的手表。"
      },
      {
        "word": "coat",
        "phonetic": "/kəʊt/",
        "meaning": "n. 上衣，外衣",
        "mcItem": "Leather Tunic",
        "mcItemIcon": "🧥",
        "sampleSentence": "Is this your coat?",
        "sampleTranslation": "这是你的上衣吗？"
      },
      {
        "word": "dress",
        "phonetic": "/dres/",
        "meaning": "n. 连衣裙",
        "mcItem": "Leather Armor",
        "mcItemIcon": "👗",
        "sampleSentence": "She is wearing a beautiful dress.",
        "sampleTranslation": "她穿着一条漂亮的连衣裙。"
      },
      {
        "word": "skirt",
        "phonetic": "/skɜːt/",
        "meaning": "n. 裙子",
        "mcItem": "Leather Leggings",
        "mcItemIcon": "👗",
        "sampleSentence": "Her skirt is blue.",
        "sampleTranslation": "她的裙子是蓝色的。"
      },
      {
        "word": "shirt",
        "phonetic": "/ʃɜːt/",
        "meaning": "n. 衬衣",
        "mcItem": "Iron Chestplate",
        "mcItemIcon": "👔",
        "sampleSentence": "Is this your shirt?",
        "sampleTranslation": "这是你的衬衫吗？"
      },
      {
        "word": "car",
        "phonetic": "/kɑː/",
        "meaning": "n. 小汽车",
        "mcItem": "Minecart",
        "mcItemIcon": "🚗",
        "sampleSentence": "It is a red car.",
        "sampleTranslation": "这是一辆红色的小汽车。"
      },
      {
        "word": "house",
        "phonetic": "/haʊs/",
        "meaning": "n. 房子",
        "mcItem": "Oak Door",
        "mcItemIcon": "🏠",
        "sampleSentence": "This is our house.",
        "sampleTranslation": "这是我们的房子。"
      }
    ],
    "grammarNote": "句型练习：Is this your ...? 否定回答：No, it isn't. / No, it isn't my ... It's your ..."
  },
  "3": {
    "id": 3,
    "unit": 1,
    "title": "Sorry, sir.",
    "titleZh": "对不起，先生。",
    "topic": "Coatroom & Claims",
    "topicZh": "寄存处领物",
    "grammar": "Here is/are 结构与否定回答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MAN",
        "text": "My coat and my umbrella please.",
        "translation": "请把我的大衣和伞给我。",
        "avatar": "👨"
      },
      {
        "speaker": "MAN",
        "text": "Here is my ticket.",
        "translation": "这是我（寄存东西）的牌子。",
        "avatar": "👨"
      },
      {
        "speaker": "ATTENDANT",
        "text": "Thank you, sir. Number five.",
        "translation": "谢谢，先生。是5号。",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "ATTENDANT",
        "text": "Here's your umbrella and your coat.",
        "translation": "这是您的伞和大衣。",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "MAN",
        "text": "This is not my umbrella.",
        "translation": "这不是我的伞。",
        "avatar": "👨"
      },
      {
        "speaker": "ATTENDANT",
        "text": "Sorry, sir.",
        "translation": "对不起，先生。",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "ATTENDANT",
        "text": "Is this your umbrella?",
        "translation": "这把伞是您的吗？",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "MAN",
        "text": "No, it isn't.",
        "translation": "不，不是！",
        "avatar": "👨"
      },
      {
        "speaker": "ATTENDANT",
        "text": "Is this it?",
        "translation": "这把是吗？",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "MAN",
        "text": "Yes, it is.",
        "translation": "是，是这把。",
        "avatar": "👨"
      },
      {
        "speaker": "MAN",
        "text": "Thank you very much.",
        "translation": "非常感谢。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "My coat and my umbrella please.",
        "zh": "请把我的大衣和伞给我。"
      },
      {
        "en": "Here is my ticket.",
        "zh": "这是我（寄存东西）的牌子。"
      },
      {
        "en": "Thank you, sir. Number five.",
        "zh": "谢谢，先生。是5号。"
      },
      {
        "en": "Here's your umbrella and your coat.",
        "zh": "这是您的伞和大衣。"
      },
      {
        "en": "This is not my umbrella.",
        "zh": "这不是我的伞。"
      },
      {
        "en": "Sorry, sir.",
        "zh": "对不起，先生。"
      },
      {
        "en": "Is this your umbrella?",
        "zh": "这把伞是您的吗？"
      },
      {
        "en": "No, it isn't.",
        "zh": "不，不是！"
      },
      {
        "en": "Is this it?",
        "zh": "这把是吗？"
      },
      {
        "en": "Yes, it is.",
        "zh": "是，是这把。"
      },
      {
        "en": "Thank you very much.",
        "zh": "非常感谢。"
      }
    ],
    "words": [
      {
        "word": "umbrella",
        "phonetic": "/ʌmˈbrelə/",
        "meaning": "n. 伞",
        "mcItem": "Shield",
        "mcItemIcon": "☂️",
        "sampleSentence": "Take an umbrella with you.",
        "sampleTranslation": "随身带一把伞。"
      },
      {
        "word": "please",
        "phonetic": "/pliːz/",
        "meaning": "int. 请",
        "mcItem": "Emerald",
        "mcItemIcon": "🙏",
        "sampleSentence": "Please give me my ticket.",
        "sampleTranslation": "请把我的票给我。"
      },
      {
        "word": "here",
        "phonetic": "/hɪə/",
        "meaning": "adv. 这里",
        "mcItem": "Compass",
        "mcItemIcon": "📍",
        "sampleSentence": "Here is your ticket.",
        "sampleTranslation": "这是您的票。"
      },
      {
        "word": "my",
        "phonetic": "/maɪ/",
        "meaning": "possessive adj. 我的",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "This is my coat.",
        "sampleTranslation": "这是我的大衣。"
      },
      {
        "word": "ticket",
        "phonetic": "/ˈtɪkɪt/",
        "meaning": "n. 票，牌子",
        "mcItem": "Paper",
        "mcItemIcon": "🎟️",
        "sampleSentence": "Here is my ticket.",
        "sampleTranslation": "这是我的票。"
      },
      {
        "word": "number",
        "phonetic": "/ˈnʌmbə/",
        "meaning": "n. 号码",
        "mcItem": "Compass",
        "mcItemIcon": "🔢",
        "sampleSentence": "Number five, please.",
        "sampleTranslation": "请看5号。"
      },
      {
        "word": "five",
        "phonetic": "/faɪv/",
        "meaning": "num. 五",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "5️⃣",
        "sampleSentence": "I have five books.",
        "sampleTranslation": "我有五本书。"
      },
      {
        "word": "sorry",
        "phonetic": "/ˈsɒri/",
        "meaning": "adj. 对不起的",
        "mcItem": "Heart",
        "mcItemIcon": "😔",
        "sampleSentence": "Sorry, sir.",
        "sampleTranslation": "对不起，先生。"
      },
      {
        "word": "sir",
        "phonetic": "/sɜː/",
        "meaning": "n. 先生",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "🎩",
        "sampleSentence": "Yes, sir.",
        "sampleTranslation": "是的，先生。"
      },
      {
        "word": "cloakroom",
        "phonetic": "/ˈkləʊkrʊm/",
        "meaning": "n. 衣帽存放处",
        "mcItem": "Chest",
        "mcItemIcon": "🚪",
        "sampleSentence": "Leave your coat in the cloakroom.",
        "sampleTranslation": "把大衣留在衣帽存放处。"
      }
    ],
    "grammarNote": "Here's 是 Here is 的缩写形式。Sorry = I'm sorry。Is this it? 中 it 代替前面提到的 your umbrella。"
  },
  "4": {
    "id": 4,
    "unit": 1,
    "title": "Is this your ...?",
    "titleZh": "这是你的……吗？",
    "topic": "School Supplies & Family",
    "topicZh": "学习用品与家庭确认",
    "grammar": "物主代词与名词单数疑问句扩展",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Is this your suit?",
        "translation": "这是你的西服吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it isn't my suit. It's his suit.",
        "translation": "不，这不是我的西服。这是他的西服。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your school?",
        "translation": "这是你的学校吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, it is. It's our school.",
        "translation": "是的，这是我们的学校。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your teacher?",
        "translation": "这是你的老师吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he is.",
        "translation": "是的，他是。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is this your son?",
        "translation": "这是你的儿子吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he is. And that is my daughter.",
        "translation": "是的，他是。那是我的女儿。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Is this your suit?",
        "zh": "这是你的西服吗？"
      },
      {
        "en": "Is this your school?",
        "zh": "这是你的学校吗？"
      },
      {
        "en": "Is this your teacher?",
        "zh": "这是你的老师吗？"
      },
      {
        "en": "Is this your son?",
        "zh": "这是你的儿子吗？"
      },
      {
        "en": "Is this your daughter?",
        "zh": "这是你的女儿吗？"
      }
    ],
    "words": [
      {
        "word": "suit",
        "phonetic": "/suːt/",
        "meaning": "n. 一套衣服，西服",
        "mcItem": "Diamond Armor",
        "mcItemIcon": "👔",
        "sampleSentence": "He wears a dark suit.",
        "sampleTranslation": "他穿着一套深色西服。"
      },
      {
        "word": "school",
        "phonetic": "/skuːl/",
        "meaning": "n. 学校",
        "mcItem": "Lectern",
        "mcItemIcon": "🏫",
        "sampleSentence": "This is our school.",
        "sampleTranslation": "这是我们的学校。"
      },
      {
        "word": "teacher",
        "phonetic": "/ˈtiːtʃə/",
        "meaning": "n. 老师",
        "mcItem": "Book",
        "mcItemIcon": "👩‍🏫",
        "sampleSentence": "Mr. Blake is our teacher.",
        "sampleTranslation": "布莱克先生是我们的老师。"
      },
      {
        "word": "son",
        "phonetic": "/sʌn/",
        "meaning": "n. 儿子",
        "mcItem": "Player Head",
        "mcItemIcon": "👦",
        "sampleSentence": "Is this your son?",
        "sampleTranslation": "这是你的儿子吗？"
      },
      {
        "word": "daughter",
        "phonetic": "/ˈdɔːtə/",
        "meaning": "n. 女儿",
        "mcItem": "Player Head",
        "mcItemIcon": "👧",
        "sampleSentence": "This is my daughter, Susan.",
        "sampleTranslation": "这是我的女儿苏珊。"
      }
    ],
    "grammarNote": "扩展词汇与句型：Is this your suit/school/teacher/son/daughter? 练习物主代词与家庭成员词汇。"
  },
  "5": {
    "id": 5,
    "unit": 1,
    "title": "Nice to meet you.",
    "titleZh": "很高兴见到你。",
    "topic": "Introductions & Nationalities",
    "topicZh": "介绍朋友与国籍",
    "grammar": "This is... 介绍句型与国籍形容词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MR. BLAKE",
        "text": "Good morning.",
        "translation": "早上好。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "STUDENTS",
        "text": "Good morning, Mr. Blake.",
        "translation": "早上好，布莱克先生。",
        "avatar": "👥"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "This is Miss Sophie Dupont. Sophie is a new student. She is French.",
        "translation": "这位是索菲娅·杜邦小姐。索菲娅是个新学生。她是法国人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "Sophie, this is Hans. He is German.",
        "translation": "索菲娅，这位是汉斯。他是德国人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "HANS",
        "text": "Nice to meet you.",
        "translation": "很高兴见到你。",
        "avatar": "👦"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "And this is Naoko. She's Japanese.",
        "translation": "这位是直子。她是日本人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "NAOKO",
        "text": "Nice to meet you.",
        "translation": "很高兴见到你。",
        "avatar": "👧"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "And this is Chang-woo. He's Korean.",
        "translation": "这位是昌宇。他是韩国人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "CHANG-WOO",
        "text": "Nice to meet you.",
        "translation": "很高兴见到你。",
        "avatar": "👦"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "And this is Luming. He's Chinese.",
        "translation": "这位是鲁明。他是中国人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "LUMING",
        "text": "Nice to meet you.",
        "translation": "很高兴见到你。",
        "avatar": "👦"
      },
      {
        "speaker": "MR. BLAKE",
        "text": "And this is Xiaohui. She's Chinese, too.",
        "translation": "这位是晓惠。她也是中国人。",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "XIAOHUI",
        "text": "Nice to meet you.",
        "translation": "很高兴见到你。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Good morning.",
        "zh": "早上好。"
      },
      {
        "en": "Good morning, Mr. Blake.",
        "zh": "早上好，布莱克先生。"
      },
      {
        "en": "This is Miss Sophie Dupont.",
        "zh": "这位是索菲娅·杜邦小姐。"
      },
      {
        "en": "Sophie is a new student. She is French.",
        "zh": "索菲娅是个新学生。她是法国人。"
      },
      {
        "en": "Sophie, this is Hans. He is German.",
        "zh": "索菲娅，这位是汉斯。他是德国人。"
      },
      {
        "en": "Nice to meet you.",
        "zh": "很高兴见到你。"
      },
      {
        "en": "And this is Naoko. She's Japanese.",
        "zh": "这位是直子。她是日本人。"
      },
      {
        "en": "And this is Chang-woo. He's Korean.",
        "zh": "这位是昌宇。他是韩国人。"
      },
      {
        "en": "And this is Luming. He's Chinese.",
        "zh": "这位是鲁明。他是中国人。"
      },
      {
        "en": "And this is Xiaohui. She's Chinese, too.",
        "zh": "这位是晓惠。她也是中国人。"
      }
    ],
    "words": [
      {
        "word": "Mr.",
        "phonetic": "/ˈmɪstə/",
        "meaning": "先生",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "🎩",
        "sampleSentence": "Good morning, Mr. Blake.",
        "sampleTranslation": "早上好，布莱克先生。"
      },
      {
        "word": "good",
        "phonetic": "/ɡʊd/",
        "meaning": "adj. 好",
        "mcItem": "Golden Apple",
        "mcItemIcon": "👍",
        "sampleSentence": "Good morning!",
        "sampleTranslation": "早上好！"
      },
      {
        "word": "morning",
        "phonetic": "/ˈmɔːnɪŋ/",
        "meaning": "n. 早晨",
        "mcItem": "Clock",
        "mcItemIcon": "🌅",
        "sampleSentence": "In the morning, the sun rises.",
        "sampleTranslation": "早晨，太阳升起。"
      },
      {
        "word": "Miss",
        "phonetic": "/mɪs/",
        "meaning": "小姐",
        "mcItem": "Flower",
        "mcItemIcon": "👩",
        "sampleSentence": "This is Miss Sophie Dupont.",
        "sampleTranslation": "这位是索菲娅·杜邦小姐。"
      },
      {
        "word": "new",
        "phonetic": "/njuː/",
        "meaning": "adj. 新的",
        "mcItem": "Emerald",
        "mcItemIcon": "✨",
        "sampleSentence": "Sophie is a new student.",
        "sampleTranslation": "索菲娅是个新学生。"
      },
      {
        "word": "student",
        "phonetic": "/ˈstjuːdnt/",
        "meaning": "n. 学生",
        "mcItem": "Book",
        "mcItemIcon": "🎓",
        "sampleSentence": "He is an English student.",
        "sampleTranslation": "他是一名英语学生。"
      },
      {
        "word": "French",
        "phonetic": "/frentʃ/",
        "meaning": "adj. & n. 法国人",
        "mcItem": "Banner",
        "mcItemIcon": "🇫🇷",
        "sampleSentence": "She is French.",
        "sampleTranslation": "她是法国人。"
      },
      {
        "word": "German",
        "phonetic": "/ˈdʒɜːmən/",
        "meaning": "adj. & n. 德国人",
        "mcItem": "Banner",
        "mcItemIcon": "🇩🇪",
        "sampleSentence": "He is German.",
        "sampleTranslation": "他是德国人。"
      },
      {
        "word": "nice",
        "phonetic": "/naɪs/",
        "meaning": "adj. 美好的",
        "mcItem": "Diamond",
        "mcItemIcon": "😊",
        "sampleSentence": "Nice to meet you.",
        "sampleTranslation": "很高兴见到你。"
      },
      {
        "word": "meet",
        "phonetic": "/miːt/",
        "meaning": "v. 遇见",
        "mcItem": "Map",
        "mcItemIcon": "🤝",
        "sampleSentence": "Nice to meet you.",
        "sampleTranslation": "很高兴见到你。"
      },
      {
        "word": "Japanese",
        "phonetic": "/ˌdʒæpəˈniːz/",
        "meaning": "adj. & n. 日本人",
        "mcItem": "Banner",
        "mcItemIcon": "🇯🇵",
        "sampleSentence": "She's Japanese.",
        "sampleTranslation": "她是日本人。"
      },
      {
        "word": "Korean",
        "phonetic": "/kəˈrɪən/",
        "meaning": "adj. & n. 韩国人",
        "mcItem": "Banner",
        "mcItemIcon": "🇰🇷",
        "sampleSentence": "He's Korean.",
        "sampleTranslation": "他是韩国人。"
      },
      {
        "word": "Chinese",
        "phonetic": "/ˌtʃaɪˈniːz/",
        "meaning": "adj. & n. 中国人",
        "mcItem": "Banner",
        "mcItemIcon": "🇨🇳",
        "sampleSentence": "He's Chinese.",
        "sampleTranslation": "他是中国人。"
      },
      {
        "word": "too",
        "phonetic": "/tuː/",
        "meaning": "adv. 也",
        "mcItem": "Repeater",
        "mcItemIcon": "➕",
        "sampleSentence": "She is Chinese, too.",
        "sampleTranslation": "她也是中国人。"
      }
    ],
    "grammarNote": "This is Miss ... 一般用于将某人介绍给他人。Nice to meet you 用于初次与同学、朋友见面等非正式场合。"
  },
  "6": {
    "id": 6,
    "unit": 1,
    "title": "What make is it?",
    "titleZh": "它是什么牌子的？",
    "topic": "Brands & Cars",
    "topicZh": "物品品牌询问",
    "grammar": "选择疑问句与国籍/品牌表达",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What make is it?",
        "translation": "它是什么牌子的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's a Volvo. It's Swedish.",
        "translation": "它是沃尔沃。是瑞典产的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is it a Swedish car or a French car?",
        "translation": "它是瑞典汽车还是法国汽车？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It isn't a French car. It's a Swedish car.",
        "translation": "它不是法国汽车。它是瑞典汽车。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What make is that car?",
        "translation": "那辆车是什么牌子的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's a Mercedes. It's German.",
        "translation": "它是梅赛德斯。是德国产的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "It's a Volvo. (Swedish)",
        "zh": "它是沃尔沃。（瑞典的）"
      },
      {
        "en": "It's a Peugeot. (French)",
        "zh": "它是标致。（法国的）"
      },
      {
        "en": "It's a Mercedes. (German)",
        "zh": "它是梅赛德斯。（德国的）"
      },
      {
        "en": "It's a Toyota. (Japanese)",
        "zh": "它是丰田。（日本的）"
      },
      {
        "en": "It's a Daewoo. (Korean)",
        "zh": "它是大宇。（韩国的）"
      },
      {
        "en": "It's a Mini. (English)",
        "zh": "它是迷你。（英国的）"
      },
      {
        "en": "It's a Ford. (American)",
        "zh": "它是福特。（美国的）"
      },
      {
        "en": "It's a Fiat. (Italian)",
        "zh": "它是菲亚特。（意大利的）"
      }
    ],
    "words": [
      {
        "word": "make",
        "phonetic": "/meɪk/",
        "meaning": "n. (产品的)牌号",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "What make is your car?",
        "sampleTranslation": "你的车是什么牌子的？"
      },
      {
        "word": "Swedish",
        "phonetic": "/ˈswiːdɪʃ/",
        "meaning": "adj. 瑞典的",
        "mcItem": "Banner",
        "mcItemIcon": "🇸🇪",
        "sampleSentence": "It is a Swedish car.",
        "sampleTranslation": "这是一辆瑞典汽车。"
      },
      {
        "word": "English",
        "phonetic": "/ˈɪŋɡlɪʃ/",
        "meaning": "adj. 英国的",
        "mcItem": "Banner",
        "mcItemIcon": "🇬🇧",
        "sampleSentence": "It's an English car.",
        "sampleTranslation": "这是一辆英国汽车。"
      },
      {
        "word": "American",
        "phonetic": "/əˈmerɪkən/",
        "meaning": "adj. 美国的",
        "mcItem": "Banner",
        "mcItemIcon": "🇺🇸",
        "sampleSentence": "It is an American car.",
        "sampleTranslation": "这是一辆美国汽车。"
      },
      {
        "word": "Italian",
        "phonetic": "/ɪˈtæliən/",
        "meaning": "adj. 意大利的",
        "mcItem": "Banner",
        "mcItemIcon": "🇮🇹",
        "sampleSentence": "Fiat is an Italian make.",
        "sampleTranslation": "菲亚特是意大利品牌。"
      },
      {
        "word": "Volvo",
        "phonetic": "/ˈvɒlvəʊ/",
        "meaning": "n. 沃尔沃",
        "mcItem": "Minecart",
        "mcItemIcon": "🚙",
        "sampleSentence": "It's a Volvo.",
        "sampleTranslation": "这是一辆沃尔沃。"
      },
      {
        "word": "Peugeot",
        "phonetic": "/ˈpɜːʒəʊ/",
        "meaning": "n. 标致",
        "mcItem": "Minecart",
        "mcItemIcon": "🚗",
        "sampleSentence": "It's a Peugeot.",
        "sampleTranslation": "这是一辆标致。"
      },
      {
        "word": "Mercedes",
        "phonetic": "/məˈseɪdiːz/",
        "meaning": "n. 梅赛德斯",
        "mcItem": "Minecart",
        "mcItemIcon": "🏎️",
        "sampleSentence": "It's a Mercedes.",
        "sampleTranslation": "这是一辆梅赛德斯。"
      },
      {
        "word": "Toyota",
        "phonetic": "/təʊˈjəʊtə/",
        "meaning": "n. 丰田",
        "mcItem": "Minecart",
        "mcItemIcon": "🚘",
        "sampleSentence": "It's a Toyota.",
        "sampleTranslation": "这是一辆丰田。"
      },
      {
        "word": "Daewoo",
        "phonetic": "/ˈdaɪwuː/",
        "meaning": "n. 大宇",
        "mcItem": "Minecart",
        "mcItemIcon": "🛺",
        "sampleSentence": "It's a Daewoo.",
        "sampleTranslation": "这是一辆大宇。"
      },
      {
        "word": "Mini",
        "phonetic": "/ˈmɪni/",
        "meaning": "n. 迷你",
        "mcItem": "Minecart",
        "mcItemIcon": "🚙",
        "sampleSentence": "It's a Mini.",
        "sampleTranslation": "这是一辆迷你。"
      },
      {
        "word": "Ford",
        "phonetic": "/fɔːd/",
        "meaning": "n. 福特",
        "mcItem": "Minecart",
        "mcItemIcon": "🚗",
        "sampleSentence": "It's a Ford.",
        "sampleTranslation": "这是一辆福特。"
      },
      {
        "word": "Fiat",
        "phonetic": "/ˈfiːæt/",
        "meaning": "n. 菲亚特",
        "mcItem": "Minecart",
        "mcItemIcon": "🏎️",
        "sampleSentence": "It's a Fiat.",
        "sampleTranslation": "这是一辆菲亚特。"
      }
    ],
    "grammarNote": "句型：What make is it? 选择疑问句：Is it a Swedish car or a French car? It isn't a French car. It's a Swedish car."
  },
  "7": {
    "id": 7,
    "unit": 1,
    "title": "Are you a teacher?",
    "titleZh": "你是教师吗？",
    "topic": "Occupations",
    "topicZh": "职业与身份询问",
    "grammar": "a/an 不定冠词区别与特殊疑问句 What is your job?",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "ROBERT",
        "text": "I am a new student. My name's Robert.",
        "translation": "我是个新学生，我的名字叫罗伯特。",
        "avatar": "👨"
      },
      {
        "speaker": "SOPHIE",
        "text": "Nice to meet you. My name's Sophie.",
        "translation": "很高兴见到你。我的名字叫索菲娅。",
        "avatar": "👩"
      },
      {
        "speaker": "ROBERT",
        "text": "Are you French?",
        "translation": "你是法国人吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SOPHIE",
        "text": "Yes, I am.",
        "translation": "是的，我是法国人。",
        "avatar": "👩"
      },
      {
        "speaker": "SOPHIE",
        "text": "Are you French, too?",
        "translation": "你也是法国人吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ROBERT",
        "text": "No, I am not.",
        "translation": "不，我不是。",
        "avatar": "👨"
      },
      {
        "speaker": "SOPHIE",
        "text": "What nationality are you?",
        "translation": "你是哪国人？",
        "avatar": "👩"
      },
      {
        "speaker": "ROBERT",
        "text": "I'm Italian.",
        "translation": "我是意大利人。",
        "avatar": "👨"
      },
      {
        "speaker": "ROBERT",
        "text": "Are you a teacher?",
        "translation": "你是教师吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SOPHIE",
        "text": "No, I'm not.",
        "translation": "不，我不是。",
        "avatar": "👩"
      },
      {
        "speaker": "ROBERT",
        "text": "What's your job?",
        "translation": "你是做什么工作的？",
        "avatar": "👨"
      },
      {
        "speaker": "SOPHIE",
        "text": "I'm a keyboard operator.",
        "translation": "我是电脑录入员。",
        "avatar": "👩"
      },
      {
        "speaker": "SOPHIE",
        "text": "What's your job?",
        "translation": "你是做什么工作的？",
        "avatar": "👩"
      },
      {
        "speaker": "ROBERT",
        "text": "I'm an engineer.",
        "translation": "我是工程师。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "I am a new student. My name's Robert.",
        "zh": "我是个新学生，我的名字叫罗伯特。"
      },
      {
        "en": "Nice to meet you. My name's Sophie.",
        "zh": "很高兴见到你。我的名字叫索菲娅。"
      },
      {
        "en": "Are you French? Yes, I am.",
        "zh": "你是法国人吗？是的，我是法国人。"
      },
      {
        "en": "Are you French, too? No, I am not.",
        "zh": "你也是法国人吗？不，我不是。"
      },
      {
        "en": "What nationality are you? I'm Italian.",
        "zh": "你是哪国人？我是意大利人。"
      },
      {
        "en": "Are you a teacher? No, I'm not.",
        "zh": "你是教师吗？不，我不是。"
      },
      {
        "en": "What's your job? I'm a keyboard operator.",
        "zh": "你是做什么工作的？我是电脑录入员。"
      },
      {
        "en": "What's your job? I'm an engineer.",
        "zh": "你是做什么工作的？我是工程师。"
      }
    ],
    "words": [
      {
        "word": "I",
        "phonetic": "/aɪ/",
        "meaning": "pron. 我",
        "mcItem": "Player Head",
        "mcItemIcon": "👤",
        "sampleSentence": "I am a student.",
        "sampleTranslation": "我是个学生。"
      },
      {
        "word": "am",
        "phonetic": "/æm/",
        "meaning": "v. be 动词现在时第一人称单数",
        "mcItem": "Beacon",
        "mcItemIcon": "🔹",
        "sampleSentence": "I am Robert.",
        "sampleTranslation": "我是罗伯特。"
      },
      {
        "word": "are",
        "phonetic": "/ɑː/",
        "meaning": "v. be 动词现在时复数及第二人称",
        "mcItem": "Beacon",
        "mcItemIcon": "🔹",
        "sampleSentence": "Are you a teacher?",
        "sampleTranslation": "你是老师吗？"
      },
      {
        "word": "name",
        "phonetic": "/neɪm/",
        "meaning": "n. 名字",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "My name is Sophie.",
        "sampleTranslation": "我的名字叫索菲娅。"
      },
      {
        "word": "what",
        "phonetic": "/wɒt/",
        "meaning": "adj. & pron. 什么",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "What is your job?",
        "sampleTranslation": "你的工作是什么？"
      },
      {
        "word": "nationality",
        "phonetic": "/ˌnæʃəˈnæləti/",
        "meaning": "n. 国籍",
        "mcItem": "Banner",
        "mcItemIcon": "🌐",
        "sampleSentence": "What nationality are you?",
        "sampleTranslation": "你是哪国人？"
      },
      {
        "word": "job",
        "phonetic": "/dʒɒb/",
        "meaning": "n. 工作",
        "mcItem": "Iron Pickaxe",
        "mcItemIcon": "💼",
        "sampleSentence": "What's your job?",
        "sampleTranslation": "你是做什么工作的？"
      },
      {
        "word": "keyboard",
        "phonetic": "/ˈkiːbɔːd/",
        "meaning": "n. 电脑键盘",
        "mcItem": "Redstone Lamp",
        "mcItemIcon": "⌨️",
        "sampleSentence": "Type on the keyboard.",
        "sampleTranslation": "在键盘上打字。"
      },
      {
        "word": "operator",
        "phonetic": "/ˈɒpəreɪtə/",
        "meaning": "n. 操作人员",
        "mcItem": "Comparator",
        "mcItemIcon": "🧑‍💻",
        "sampleSentence": "She is a keyboard operator.",
        "sampleTranslation": "她是电脑录入员。"
      },
      {
        "word": "engineer",
        "phonetic": "/ˌendʒɪˈnɪə/",
        "meaning": "n. 工程师",
        "mcItem": "Redstone",
        "mcItemIcon": "👷",
        "sampleSentence": "I'm an engineer.",
        "sampleTranslation": "我是工程师。"
      }
    ],
    "grammarNote": "What nationality are you? 用来询问对方国籍。注意冠词：a keyboard operator (辅音音素开头用 a), an engineer (元音音素开头用 an)。"
  },
  "8": {
    "id": 8,
    "unit": 1,
    "title": "What's your job?",
    "titleZh": "你是做什么工作的？",
    "topic": "Jobs & Careers",
    "topicZh": "职业问答表达",
    "grammar": "职业名词与物主代词 his/her 问答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's his job? Is he a policeman?",
        "translation": "他是做什么工作的？他是警察吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he is.",
        "translation": "是的，他是。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's her job? Is she a policewoman?",
        "translation": "她是做什么工作的？她是女警察吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, she is.",
        "translation": "是的，她是。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's his job? Is he a taxi driver?",
        "translation": "他是做什么工作的？他是出租车司机吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he is.",
        "translation": "是的，他是。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's her job? Is she an air hostess?",
        "translation": "她是做什么工作的？她是空中小姐吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, she is.",
        "translation": "是的，她是。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I'm a policeman.",
        "zh": "我是警察。"
      },
      {
        "en": "I'm a policewoman.",
        "zh": "我是女警察。"
      },
      {
        "en": "I'm a taxi driver.",
        "zh": "我是出租汽车司机。"
      },
      {
        "en": "I'm an air hostess.",
        "zh": "我是空中小姐。"
      },
      {
        "en": "I'm a postman.",
        "zh": "我是邮递员。"
      },
      {
        "en": "I'm a nurse.",
        "zh": "我是护士。"
      },
      {
        "en": "I'm a mechanic.",
        "zh": "我是机械师。"
      },
      {
        "en": "I'm a hairdresser.",
        "zh": "我是理发师。"
      },
      {
        "en": "I'm a housewife.",
        "zh": "我是家庭妇女。"
      },
      {
        "en": "I'm a milkman.",
        "zh": "我是送牛奶的人。"
      }
    ],
    "words": [
      {
        "word": "policeman",
        "phonetic": "/pəˈliːsmən/",
        "meaning": "n. 警察",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "👮",
        "sampleSentence": "He is a policeman.",
        "sampleTranslation": "他是一名警察。"
      },
      {
        "word": "policewoman",
        "phonetic": "/pəˈliːsˌwʊmən/",
        "meaning": "n. 女警察",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "👮‍♀️",
        "sampleSentence": "She is a policewoman.",
        "sampleTranslation": "她是一名女警察。"
      },
      {
        "word": "taxi driver",
        "phonetic": "/ˈtæksi ˈdraɪvə/",
        "meaning": "n. 出租汽车司机",
        "mcItem": "Minecart",
        "mcItemIcon": "🚕",
        "sampleSentence": "I am a taxi driver.",
        "sampleTranslation": "我是一名出租车司机。"
      },
      {
        "word": "air hostess",
        "phonetic": "/ˈeə ˌhəʊstəs/",
        "meaning": "n. 空中小姐",
        "mcItem": "Elytra",
        "mcItemIcon": "✈️",
        "sampleSentence": "She is an air hostess.",
        "sampleTranslation": "她是一名空姐。"
      },
      {
        "word": "postman",
        "phonetic": "/ˈpəʊstmən/",
        "meaning": "n. 邮递员",
        "mcItem": "Chest",
        "mcItemIcon": "📮",
        "sampleSentence": "The postman brings letters.",
        "sampleTranslation": "邮递员送来信件。"
      },
      {
        "word": "nurse",
        "phonetic": "/nɜːs/",
        "meaning": "n. 护士",
        "mcItem": "Potion",
        "mcItemIcon": "👩‍⚕️",
        "sampleSentence": "I'm a nurse.",
        "sampleTranslation": "我是一名护士。"
      },
      {
        "word": "mechanic",
        "phonetic": "/mɪˈkænɪk/",
        "meaning": "n. 机械师",
        "mcItem": "Anvil",
        "mcItemIcon": "🔧",
        "sampleSentence": "He is a mechanic.",
        "sampleTranslation": "他是一名机械师。"
      },
      {
        "word": "hairdresser",
        "phonetic": "/ˈheəˌdresə/",
        "meaning": "n. 理发师",
        "mcItem": "Shears",
        "mcItemIcon": "💇",
        "sampleSentence": "She is a hairdresser.",
        "sampleTranslation": "她是一名理发师。"
      },
      {
        "word": "housewife",
        "phonetic": "/ˈhaʊswaɪf/",
        "meaning": "n. 家庭妇女",
        "mcItem": "Furnace",
        "mcItemIcon": "👩‍🍳",
        "sampleSentence": "I'm a housewife.",
        "sampleTranslation": "我是一名家庭主妇。"
      },
      {
        "word": "milkman",
        "phonetic": "/ˈmɪlkmən/",
        "meaning": "n. 送牛奶的人",
        "mcItem": "Milk Bucket",
        "mcItemIcon": "🥛",
        "sampleSentence": "I'm a milkman.",
        "sampleTranslation": "我是送牛奶的人。"
      }
    ],
    "grammarNote": "职业句型：What's his/her job? Is he/she a/an ...? Yes, he/she is."
  },
  "9": {
    "id": 9,
    "unit": 1,
    "title": "How are you today?",
    "titleZh": "你今天好吗？",
    "topic": "Daily Greetings",
    "topicZh": "日常身体状况问候",
    "grammar": "How are you? 及其回答与第三人称问候",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "STEVEN",
        "text": "Hello, Helen.",
        "translation": "你好，海伦。",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "Hi, Steven.",
        "translation": "你好，史蒂文。",
        "avatar": "👩"
      },
      {
        "speaker": "STEVEN",
        "text": "How are you today?",
        "translation": "你今天好吗？",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "I'm very well, thank you. And you?",
        "translation": "很好，谢谢你。你好吗？",
        "avatar": "👩"
      },
      {
        "speaker": "STEVEN",
        "text": "I'm fine, thanks.",
        "translation": "很好，谢谢。",
        "avatar": "👨"
      },
      {
        "speaker": "STEVEN",
        "text": "How is Tony?",
        "translation": "托尼好吗？",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "He's fine, thanks. How's Emma?",
        "translation": "他很好，谢谢。埃玛好吗？",
        "avatar": "👩"
      },
      {
        "speaker": "STEVEN",
        "text": "She's very well, too, Helen.",
        "translation": "她也很好，海伦。",
        "avatar": "👨"
      },
      {
        "speaker": "STEVEN",
        "text": "Goodbye, Helen. Nice to see you.",
        "translation": "再见，海伦。见到你真高兴。",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "Nice to see you, too, Steven. Goodbye.",
        "translation": "见到你我也很高兴，史蒂文。再见。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Hello, Helen. Hi, Steven.",
        "zh": "你好，海伦。你好，史蒂文。"
      },
      {
        "en": "How are you today?",
        "zh": "你今天好吗？"
      },
      {
        "en": "I'm very well, thank you. And you?",
        "zh": "很好，谢谢你。你好吗？"
      },
      {
        "en": "I'm fine, thanks.",
        "zh": "很好，谢谢。"
      },
      {
        "en": "How is Tony? He's fine, thanks.",
        "zh": "托尼好吗？他很好，谢谢。"
      },
      {
        "en": "How's Emma? She's very well, too, Helen.",
        "zh": "埃玛好吗？她也很好，海伦。"
      },
      {
        "en": "Goodbye, Helen. Nice to see you.",
        "zh": "再见，海伦。见到你真高兴。"
      },
      {
        "en": "Nice to see you, too, Steven. Goodbye.",
        "zh": "见到你我也很高兴，史蒂文。再见。"
      }
    ],
    "words": [
      {
        "word": "hello",
        "phonetic": "/həˈləʊ/",
        "meaning": "int. 喂 (表示问候)",
        "mcItem": "Bell",
        "mcItemIcon": "👋",
        "sampleSentence": "Hello, Helen.",
        "sampleTranslation": "你好，海伦。"
      },
      {
        "word": "hi",
        "phonetic": "/haɪ/",
        "meaning": "int. 喂，嗨",
        "mcItem": "Bell",
        "mcItemIcon": "🖐️",
        "sampleSentence": "Hi, Steven.",
        "sampleTranslation": "嗨，史蒂文。"
      },
      {
        "word": "how",
        "phonetic": "/haʊ/",
        "meaning": "adv. 怎样",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "How are you today?",
        "sampleTranslation": "你今天好吗？"
      },
      {
        "word": "today",
        "phonetic": "/təˈdeɪ/",
        "meaning": "adv. 今天",
        "mcItem": "Sun",
        "mcItemIcon": "📅",
        "sampleSentence": "How are you today?",
        "sampleTranslation": "你今天好吗？"
      },
      {
        "word": "well",
        "phonetic": "/wel/",
        "meaning": "adj. 身体好",
        "mcItem": "Golden Apple",
        "mcItemIcon": "💪",
        "sampleSentence": "I'm very well, thank you.",
        "sampleTranslation": "我身体很好，谢谢。"
      },
      {
        "word": "fine",
        "phonetic": "/faɪn/",
        "meaning": "adj. 美好的",
        "mcItem": "Emerald",
        "mcItemIcon": "👌",
        "sampleSentence": "I'm fine, thanks.",
        "sampleTranslation": "我很好，多谢。"
      },
      {
        "word": "thanks",
        "phonetic": "/θæŋks/",
        "meaning": "int. 谢谢",
        "mcItem": "Heart",
        "mcItemIcon": "🙏",
        "sampleSentence": "I'm fine, thanks.",
        "sampleTranslation": "我很好，多谢。"
      },
      {
        "word": "goodbye",
        "phonetic": "/ˌɡʊdˈbaɪ/",
        "meaning": "int. 再见",
        "mcItem": "Oak Door",
        "mcItemIcon": "🚪",
        "sampleSentence": "Goodbye, Helen.",
        "sampleTranslation": "再见，海伦。"
      },
      {
        "word": "see",
        "phonetic": "/siː/",
        "meaning": "v. 见",
        "mcItem": "Eye of Ender",
        "mcItemIcon": "👀",
        "sampleSentence": "Nice to see you.",
        "sampleTranslation": "见到你真高兴。"
      }
    ],
    "grammarNote": "How are you? 是熟人见面问候语。And you? = And how are you? Nice to see you. 用于熟人见面客气话。"
  },
  "10": {
    "id": 10,
    "unit": 1,
    "title": "Look at ...",
    "titleZh": "看……",
    "topic": "Observations & Adjectives",
    "topicZh": "人物特征描述",
    "grammar": "Look at 祈使句与形容词表语",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Look at that man! He's fat.",
        "translation": "看那个男人！他很胖。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Look at that woman! She's thin.",
        "translation": "看那个女人！她很瘦。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Look at that policeman! He's tall.",
        "translation": "看那个警察！他很高。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Look at that policewoman! She's short.",
        "translation": "看那个女警察！她很矮。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Look at Steven! He's hot.",
        "translation": "看史蒂文！他很热。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Look at Emma! She's cold.",
        "translation": "看埃玛！她很冷。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Look at that man! (fat)",
        "zh": "看那个男人！（胖）"
      },
      {
        "en": "Look at that woman! (thin)",
        "zh": "看那个女人！（瘦）"
      },
      {
        "en": "Look at that policeman! (tall)",
        "zh": "看那个警察！（高）"
      },
      {
        "en": "Look at that policewoman! (short)",
        "zh": "看那个女警察！（矮）"
      },
      {
        "en": "Look at that mechanic! (dirty)",
        "zh": "看那个机械师！（脏）"
      },
      {
        "en": "Look at that nurse! (clean)",
        "zh": "看那个护士！（干净）"
      },
      {
        "en": "Look at Steven! (hot)",
        "zh": "看史蒂文！（热）"
      },
      {
        "en": "Look at Emma! (cold)",
        "zh": "看埃玛！（冷）"
      },
      {
        "en": "Look at that milkman! (old)",
        "zh": "看那个送奶工！（老）"
      },
      {
        "en": "Look at that air hostess! (young)",
        "zh": "看那个空姐！（年轻）"
      },
      {
        "en": "Look at that hairdresser! (busy)",
        "zh": "看那个理发师！（忙）"
      },
      {
        "en": "Look at that housewife! (lazy)",
        "zh": "看那个家庭主妇！（懒）"
      }
    ],
    "words": [
      {
        "word": "fat",
        "phonetic": "/fæt/",
        "meaning": "adj. 胖的",
        "mcItem": "Porkchop",
        "mcItemIcon": "🥩",
        "sampleSentence": "He is fat.",
        "sampleTranslation": "他很胖。"
      },
      {
        "word": "woman",
        "phonetic": "/ˈwʊmən/",
        "meaning": "n. 女人",
        "mcItem": "Player Head",
        "mcItemIcon": "👩",
        "sampleSentence": "Look at that woman!",
        "sampleTranslation": "看那个女人！"
      },
      {
        "word": "thin",
        "phonetic": "/θɪn/",
        "meaning": "adj. 瘦的",
        "mcItem": "Stick",
        "mcItemIcon": "📏",
        "sampleSentence": "She is thin.",
        "sampleTranslation": "她很瘦。"
      },
      {
        "word": "tall",
        "phonetic": "/tɔːl/",
        "meaning": "adj. 高的",
        "mcItem": "Oak Sapling",
        "mcItemIcon": "🌲",
        "sampleSentence": "He is tall.",
        "sampleTranslation": "他很高。"
      },
      {
        "word": "short",
        "phonetic": "/ʃɔːt/",
        "meaning": "adj. 矮的，短的",
        "mcItem": "Grass",
        "mcItemIcon": "🌱",
        "sampleSentence": "She is short.",
        "sampleTranslation": "她很矮。"
      },
      {
        "word": "dirty",
        "phonetic": "/ˈdɜːti/",
        "meaning": "adj. 脏的",
        "mcItem": "Dirt",
        "mcItemIcon": "🟫",
        "sampleSentence": "His hands are dirty.",
        "sampleTranslation": "他的手很脏。"
      },
      {
        "word": "clean",
        "phonetic": "/kliːn/",
        "meaning": "adj. 干净的",
        "mcItem": "Glass",
        "mcItemIcon": "✨",
        "sampleSentence": "The room is clean.",
        "sampleTranslation": "房间很干净。"
      },
      {
        "word": "hot",
        "phonetic": "/hɒt/",
        "meaning": "adj. 热的",
        "mcItem": "Lava Bucket",
        "mcItemIcon": "🔥",
        "sampleSentence": "Steven is hot.",
        "sampleTranslation": "史蒂文很热。"
      },
      {
        "word": "cold",
        "phonetic": "/kəʊld/",
        "meaning": "adj. 冷的",
        "mcItem": "Ice",
        "mcItemIcon": "❄️",
        "sampleSentence": "Emma is cold.",
        "sampleTranslation": "埃玛很冷。"
      },
      {
        "word": "old",
        "phonetic": "/əʊld/",
        "meaning": "adj. 老的",
        "mcItem": "Cobblestone",
        "mcItemIcon": "👴",
        "sampleSentence": "The milkman is old.",
        "sampleTranslation": "送奶工老了。"
      },
      {
        "word": "young",
        "phonetic": "/jʌŋ/",
        "meaning": "adj. 年轻的",
        "mcItem": "Wheat Seeds",
        "mcItemIcon": "🧒",
        "sampleSentence": "She is young.",
        "sampleTranslation": "她很年轻。"
      },
      {
        "word": "busy",
        "phonetic": "/ˈbɪzi/",
        "meaning": "adj. 忙的",
        "mcItem": "Redstone",
        "mcItemIcon": "🏃",
        "sampleSentence": "He is very busy.",
        "sampleTranslation": "他很忙碌。"
      },
      {
        "word": "lazy",
        "phonetic": "/ˈleɪzi/",
        "meaning": "adj. 懒的",
        "mcItem": "Bed",
        "mcItemIcon": "🦥",
        "sampleSentence": "Don't be lazy.",
        "sampleTranslation": "别偷懒。"
      }
    ],
    "grammarNote": "祈使句：Look at ... / 描述人特征：He's / She's + 形容词。"
  },
  "11": {
    "id": 11,
    "unit": 1,
    "title": "Is this your shirt?",
    "titleZh": "这是你的衬衫吗？",
    "topic": "Possessives & Clothes",
    "topicZh": "归属询问与衣物",
    "grammar": "Whose 引导的特殊疑问句与名词所有格",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "TEACHER",
        "text": "Whose shirt is that?",
        "translation": "那是谁的衬衫？",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "TEACHER",
        "text": "Is this your shirt, Dave?",
        "translation": "戴夫，这是你的衬衫吗？",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "DAVE",
        "text": "No, sir. It's not my shirt.",
        "translation": "不，先生。这不是我的衬衫。",
        "avatar": "👦"
      },
      {
        "speaker": "DAVE",
        "text": "This is my shirt. My shirt's blue.",
        "translation": "这是我的衬衫。我的衬衫是蓝色的。",
        "avatar": "👦"
      },
      {
        "speaker": "TEACHER",
        "text": "Is this shirt Tim's?",
        "translation": "这件衬衫是蒂姆的吗？",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "DAVE",
        "text": "Perhaps it is, sir. Tim's shirt's white.",
        "translation": "也许是，先生。蒂姆的衬衫是白色的。",
        "avatar": "👦"
      },
      {
        "speaker": "TEACHER",
        "text": "Tim!",
        "translation": "蒂姆！",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "TIM",
        "text": "Yes, sir?",
        "translation": "什么事，先生？",
        "avatar": "👦"
      },
      {
        "speaker": "TEACHER",
        "text": "Is this your shirt?",
        "translation": "这是你的衬衫吗？",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "TIM",
        "text": "Yes, sir.",
        "translation": "是的，先生。",
        "avatar": "👦"
      },
      {
        "speaker": "TEACHER",
        "text": "Here you are. Catch!",
        "translation": "给你。接着！",
        "avatar": "👨‍🏫"
      },
      {
        "speaker": "TIM",
        "text": "Thank you, sir.",
        "translation": "谢谢您，先生。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Whose shirt is that?",
        "zh": "那是谁的衬衫？"
      },
      {
        "en": "Is this your shirt, Dave?",
        "zh": "戴夫，这是你的衬衫吗？"
      },
      {
        "en": "No, sir. It's not my shirt.",
        "zh": "不，先生。这不是我的衬衫。"
      },
      {
        "en": "This is my shirt. My shirt's blue.",
        "zh": "这是我的衬衫。我的衬衫是蓝色的。"
      },
      {
        "en": "Is this shirt Tim's?",
        "zh": "这件衬衫是蒂姆的吗？"
      },
      {
        "en": "Perhaps it is, sir. Tim's shirt's white.",
        "zh": "也许是，先生。蒂姆的衬衫是白色的。"
      },
      {
        "en": "Tim! Yes, sir?",
        "zh": "蒂姆！什么事，先生？"
      },
      {
        "en": "Is this your shirt? Yes, sir.",
        "zh": "这是你的衬衫吗？是的，先生。"
      },
      {
        "en": "Here you are. Catch!",
        "zh": "给你。接着！"
      },
      {
        "en": "Thank you, sir.",
        "zh": "谢谢您，先生。"
      }
    ],
    "words": [
      {
        "word": "whose",
        "phonetic": "/huːz/",
        "meaning": "pron. 谁的",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "Whose shirt is that?",
        "sampleTranslation": "那是谁的衬衫？"
      },
      {
        "word": "blue",
        "phonetic": "/bluː/",
        "meaning": "adj. 蓝色的",
        "mcItem": "Lapis Lazuli",
        "mcItemIcon": "🔷",
        "sampleSentence": "My shirt is blue.",
        "sampleTranslation": "我的衬衫是蓝色的。"
      },
      {
        "word": "perhaps",
        "phonetic": "/pəˈhæps/",
        "meaning": "adv. 大概，或许",
        "mcItem": "Feather",
        "mcItemIcon": "🤔",
        "sampleSentence": "Perhaps it is his pen.",
        "sampleTranslation": "也许那是他的钢笔。"
      },
      {
        "word": "white",
        "phonetic": "/waɪt/",
        "meaning": "adj. 白色的",
        "mcItem": "Quartz",
        "mcItemIcon": "⚪",
        "sampleSentence": "Tim's shirt is white.",
        "sampleTranslation": "蒂姆的衬衫是白色的。"
      },
      {
        "word": "catch",
        "phonetic": "/kætʃ/",
        "meaning": "v. 抓住，接住",
        "mcItem": "Fishing Rod",
        "mcItemIcon": "🎣",
        "sampleSentence": "Catch the ball!",
        "sampleTranslation": "接住球！"
      }
    ],
    "grammarNote": "Whose 是疑问代词，在此作定语修饰 shirt。Tim's 是 Tim 的所有格形式。Here you are 是递给对方东西时的常用语。"
  },
  "12": {
    "id": 12,
    "unit": 1,
    "title": "Whose is this ...?",
    "titleZh": "这……是谁的？",
    "topic": "Belongings & Possessive Pronouns",
    "topicZh": "物品归属与名词所有格",
    "grammar": "Whose is this/that...? It's my/your/his/her...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Whose is this handbag?",
        "translation": "这只手提包是谁的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's Stella's. It's her handbag.",
        "translation": "是斯特拉的。是她的手提包。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Whose is that car?",
        "translation": "那辆车是谁的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's Paul's. It's his car.",
        "translation": "是保罗的。是他的车。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Whose is this umbrella?",
        "translation": "这把伞是谁的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's Steven's. It's his umbrella.",
        "translation": "是史蒂文的。是他的伞。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Whose is this handbag? It's Stella's.",
        "zh": "这只手提包是谁的？是斯特拉的。"
      },
      {
        "en": "Whose is that car? It's Paul's.",
        "zh": "那辆车是谁的？是保罗的。"
      },
      {
        "en": "Whose is this coat? It's Sophie's.",
        "zh": "这件大衣是谁的？是索菲娅的。"
      },
      {
        "en": "Whose is this umbrella? It's Steven's.",
        "zh": "这把伞是谁的？是史蒂文的。"
      },
      {
        "en": "Whose is this pen? It's my son's.",
        "zh": "这支钢笔是谁的？是我儿子的。"
      },
      {
        "en": "Whose is this dress? It's my daughter's.",
        "zh": "这条连衣裙是谁的？是我女儿的。"
      },
      {
        "en": "Whose is this suit? It's my father's.",
        "zh": "这套西服是谁的？是我父亲的。"
      },
      {
        "en": "Whose is this skirt? It's my mother's.",
        "zh": "这条裙子是谁的？是我母亲的。"
      },
      {
        "en": "Whose is this blouse? It's my sister's.",
        "zh": "这件女衬衫是谁的？是我姐姐的。"
      },
      {
        "en": "Whose is this tie? It's my brother's.",
        "zh": "这条领带是谁的？是我哥哥的。"
      }
    ],
    "words": [
      {
        "word": "father",
        "phonetic": "/ˈfɑːðə/",
        "meaning": "n. 父亲",
        "mcItem": "Player Head",
        "mcItemIcon": "👨",
        "sampleSentence": "My father is at home.",
        "sampleTranslation": "我父亲在家。"
      },
      {
        "word": "mother",
        "phonetic": "/ˈmʌðə/",
        "meaning": "n. 母亲",
        "mcItem": "Player Head",
        "mcItemIcon": "👩",
        "sampleSentence": "My mother is cooking.",
        "sampleTranslation": "我母亲在做饭。"
      },
      {
        "word": "blouse",
        "phonetic": "/blaʊz/",
        "meaning": "n. 女衬衫",
        "mcItem": "Leather Armor",
        "mcItemIcon": "👚",
        "sampleSentence": "This is her blouse.",
        "sampleTranslation": "这是她的女衬衫。"
      },
      {
        "word": "sister",
        "phonetic": "/ˈsɪstə/",
        "meaning": "n. 姐，妹",
        "mcItem": "Player Head",
        "mcItemIcon": "👧",
        "sampleSentence": "She is my sister.",
        "sampleTranslation": "她是我的妹妹。"
      },
      {
        "word": "tie",
        "phonetic": "/taɪ/",
        "meaning": "n. 领带",
        "mcItem": "String",
        "mcItemIcon": "👔",
        "sampleSentence": "His tie is orange.",
        "sampleTranslation": "他的领带是橙色的。"
      },
      {
        "word": "brother",
        "phonetic": "/ˈbrʌðə/",
        "meaning": "n. 兄，弟",
        "mcItem": "Player Head",
        "mcItemIcon": "👦",
        "sampleSentence": "He is my brother.",
        "sampleTranslation": "他是我的兄弟。"
      },
      {
        "word": "his",
        "phonetic": "/hɪz/",
        "meaning": "possessive adj. 他的",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "That is his coat.",
        "sampleTranslation": "那是他的外套。"
      },
      {
        "word": "her",
        "phonetic": "/hɜː/",
        "meaning": "possessive adj. 她的",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "This is her car.",
        "sampleTranslation": "这是她的车。"
      }
    ],
    "grammarNote": "Whose is this ...? / It's my father's. 名词后加 's 表示所有格。"
  },
  "13": {
    "id": 13,
    "unit": 1,
    "title": "A new dress",
    "titleZh": "一件新连衣裙",
    "topic": "Colors & Clothes",
    "topicZh": "颜色与衣服评价",
    "grammar": "What colour is...? 句型与感叹表达",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "LOUISE",
        "text": "What colour's your new dress?",
        "translation": "你的新连衣裙是什么颜色的？",
        "avatar": "👧"
      },
      {
        "speaker": "ANNA",
        "text": "It's green.",
        "translation": "是绿色的。",
        "avatar": "👩"
      },
      {
        "speaker": "ANNA",
        "text": "Come upstairs and see it.",
        "translation": "到楼上来看看吧。",
        "avatar": "👩"
      },
      {
        "speaker": "LOUISE",
        "text": "Thank you.",
        "translation": "谢谢。",
        "avatar": "👧"
      },
      {
        "speaker": "ANNA",
        "text": "Look! Here it is!",
        "translation": "瞧，就是这件。",
        "avatar": "👩"
      },
      {
        "speaker": "LOUISE",
        "text": "That's a nice dress. It's very smart.",
        "translation": "这件连衣裙真好，真漂亮。",
        "avatar": "👧"
      },
      {
        "speaker": "ANNA",
        "text": "My hat's new, too.",
        "translation": "我的帽子也是新的。",
        "avatar": "👩"
      },
      {
        "speaker": "LOUISE",
        "text": "What colour is it?",
        "translation": "是什么颜色的？",
        "avatar": "👧"
      },
      {
        "speaker": "ANNA",
        "text": "It's the same colour. It's green, too.",
        "translation": "一样的颜色，也是绿的。",
        "avatar": "👩"
      },
      {
        "speaker": "LOUISE",
        "text": "That is a lovely hat!",
        "translation": "真是一顶可爱的帽子！",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "What colour's your new dress? It's green.",
        "zh": "你的新连衣裙是什么颜色的？是绿色的。"
      },
      {
        "en": "Come upstairs and see it. Thank you.",
        "zh": "到楼上来看看吧。谢谢。"
      },
      {
        "en": "Look! Here it is!",
        "zh": "瞧，就是这件。"
      },
      {
        "en": "That's a nice dress. It's very smart.",
        "zh": "这件连衣裙真好，真漂亮。"
      },
      {
        "en": "My hat's new, too. What colour is it?",
        "zh": "我的帽子也是新的。是什么颜色的？"
      },
      {
        "en": "It's the same colour. It's green, too.",
        "zh": "一样的颜色，也是绿的。"
      },
      {
        "en": "That is a lovely hat!",
        "zh": "真是一顶可爱的帽子！"
      }
    ],
    "words": [
      {
        "word": "colour",
        "phonetic": "/ˈkʌlə/",
        "meaning": "n. 颜色",
        "mcItem": "Dye",
        "mcItemIcon": "🎨",
        "sampleSentence": "What colour is your dress?",
        "sampleTranslation": "你的裙子是什么颜色的？"
      },
      {
        "word": "green",
        "phonetic": "/ɡriːn/",
        "meaning": "adj. 绿色的",
        "mcItem": "Lime Dye",
        "mcItemIcon": "🟢",
        "sampleSentence": "The dress is green.",
        "sampleTranslation": "连衣裙是绿色的。"
      },
      {
        "word": "come",
        "phonetic": "/kʌm/",
        "meaning": "v. 来",
        "mcItem": "Lead",
        "mcItemIcon": "🚶",
        "sampleSentence": "Come upstairs and see it.",
        "sampleTranslation": "到楼上来看看吧。"
      },
      {
        "word": "upstairs",
        "phonetic": "/ˌʌpˈsteəz/",
        "meaning": "adv. 楼上",
        "mcItem": "Ladder",
        "mcItemIcon": "🪜",
        "sampleSentence": "Go upstairs, please.",
        "sampleTranslation": "请上楼。"
      },
      {
        "word": "smart",
        "phonetic": "/smɑːt/",
        "meaning": "adj. 时髦的，巧妙的",
        "mcItem": "Diamond",
        "mcItemIcon": "✨",
        "sampleSentence": "It is very smart.",
        "sampleTranslation": "它非常时髦漂亮。"
      },
      {
        "word": "hat",
        "phonetic": "/hæt/",
        "meaning": "n. 帽子",
        "mcItem": "Leather Cap",
        "mcItemIcon": "👒",
        "sampleSentence": "My hat is new.",
        "sampleTranslation": "我的帽子是新的。"
      },
      {
        "word": "same",
        "phonetic": "/seɪm/",
        "meaning": "adj. 相同的",
        "mcItem": "Repeater",
        "mcItemIcon": "♊",
        "sampleSentence": "It's the same colour.",
        "sampleTranslation": "它是一样的颜色。"
      },
      {
        "word": "lovely",
        "phonetic": "/ˈlʌvli/",
        "meaning": "adj. 可爱的，秀丽的",
        "mcItem": "Heart",
        "mcItemIcon": "💖",
        "sampleSentence": "That is a lovely hat!",
        "sampleTranslation": "那是一顶可爱的帽子！"
      }
    ],
    "grammarNote": "What colour's = What colour is。Come upstairs and see it. 中的 and 不当“和”讲，而是表示目的。"
  },
  "14": {
    "id": 14,
    "unit": 1,
    "title": "What colour is your ...?",
    "titleZh": "你的……是什么颜色的？",
    "topic": "Color Descriptions",
    "topicZh": "颜色特征描述",
    "grammar": "What colour is your...? 与 It is + 颜色",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What colour is your umbrella?",
        "translation": "你的伞是什么颜色的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's black.",
        "translation": "它是黑色的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What colour is your car?",
        "translation": "你的汽车是什么颜色的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's blue.",
        "translation": "它是蓝色的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What colour is your coat?",
        "translation": "你的外套是什么颜色的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's grey.",
        "translation": "它是灰色的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "What colour is your umbrella? It's black.",
        "zh": "你的雨伞是什么颜色的？是黑色的。"
      },
      {
        "en": "What colour is your car? It's blue.",
        "zh": "你的小汽车是什么颜色的？是蓝色的。"
      },
      {
        "en": "What colour is your shirt? It's white.",
        "zh": "你的衬衫是什么颜色的？是白色的。"
      },
      {
        "en": "What colour is your coat? It's grey.",
        "zh": "你的外套是什么颜色的？是灰色的。"
      },
      {
        "en": "What colour is your case? It's brown.",
        "zh": "你的箱子是什么颜色的？是棕色的。"
      },
      {
        "en": "What colour is your carpet? It's red.",
        "zh": "你的地毯是什么颜色的？是红色的。"
      },
      {
        "en": "What colour is your blouse? It's yellow.",
        "zh": "你的女衬衫是什么颜色的？是黄色的。"
      },
      {
        "en": "What colour is your tie? It's orange.",
        "zh": "你的领带是什么颜色的？是橙色的。"
      },
      {
        "en": "What colour is your hat? It's grey and black.",
        "zh": "你的帽子是什么颜色的？是灰黑相间的。"
      },
      {
        "en": "What colour is your dog? It's brown and white.",
        "zh": "你的狗是什么颜色的？是棕白相间的。"
      }
    ],
    "words": [
      {
        "word": "case",
        "phonetic": "/keɪs/",
        "meaning": "n. 箱子",
        "mcItem": "Chest",
        "mcItemIcon": "🧰",
        "sampleSentence": "My case is brown.",
        "sampleTranslation": "我的箱子是棕色的。"
      },
      {
        "word": "carpet",
        "phonetic": "/ˈkɑːpɪt/",
        "meaning": "n. 地毯",
        "mcItem": "Red Carpet",
        "mcItemIcon": "🧶",
        "sampleSentence": "The red carpet is clean.",
        "sampleTranslation": "红地毯很干净。"
      },
      {
        "word": "dog",
        "phonetic": "/dɒɡ/",
        "meaning": "n. 狗",
        "mcItem": "Bone",
        "mcItemIcon": "🐕",
        "sampleSentence": "This is a brown and white dog.",
        "sampleTranslation": "这是一条棕白相间的狗。"
      }
    ],
    "grammarNote": "询问单数物品颜色：What colour is your ...? 回答：It is / It's + 颜色形容词。"
  },
  "15": {
    "id": 15,
    "unit": 1,
    "title": "Your passports, please.",
    "titleZh": "请出示你们的护照。",
    "topic": "Customs & Plurals",
    "topicZh": "海关查验与复数",
    "grammar": "名词复数规则与复数代词 these / they",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Are you Swedish?",
        "translation": "你们是瑞典人吗？",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "No, we are not. We are Danish.",
        "translation": "不，我们不是瑞典人。我们是丹麦人。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Are your friends Danish, too?",
        "translation": "你们的朋友也是丹麦人吗？",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "No, they aren't. They are Norwegian.",
        "translation": "不，他们不是丹麦人。他们是挪威人。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Your passports, please.",
        "translation": "请出示你们的护照。",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "Here they are.",
        "translation": "给您。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Are these your cases?",
        "translation": "这些是你们的箱子吗？",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "No, they aren't.",
        "translation": "不，不是。",
        "avatar": "👧"
      },
      {
        "speaker": "GIRLS",
        "text": "Our cases are brown. Here they are.",
        "translation": "我们的箱子是棕色的。在这儿呢。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Are you tourists?",
        "translation": "你们是来旅游的吗？",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "Yes, we are.",
        "translation": "是的，我们是来旅游的。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "Are your friends tourists too?",
        "translation": "你们的朋友也是来旅游的吗？",
        "avatar": "👮"
      },
      {
        "speaker": "GIRLS",
        "text": "Yes, they are.",
        "translation": "是的，他们也是。",
        "avatar": "👧"
      },
      {
        "speaker": "CUSTOMS OFFICER",
        "text": "That's fine. Thank you very much.",
        "translation": "好了。非常感谢。",
        "avatar": "👮"
      }
    ],
    "sentences": [
      {
        "en": "Are you Swedish? No, we are not. We are Danish.",
        "zh": "你们是瑞典人吗？不，我们不是。我们是丹麦人。"
      },
      {
        "en": "Are your friends Danish, too? No, they aren't. They are Norwegian.",
        "zh": "你们的朋友也是丹麦人吗？不，他们不是。他们是挪威人。"
      },
      {
        "en": "Your passports, please. Here they are.",
        "zh": "请出示你们的护照。给您。"
      },
      {
        "en": "Are these your cases? No, they aren't.",
        "zh": "这些是你们的箱子吗？不，不是。"
      },
      {
        "en": "Our cases are brown. Here they are.",
        "zh": "我们的箱子是棕色的。在这儿呢。"
      },
      {
        "en": "Are you tourists? Yes, we are.",
        "zh": "你们是来旅游的吗？是的，我们是。"
      },
      {
        "en": "Are your friends tourists too? Yes, they are.",
        "zh": "你们的朋友也是来旅游的吗？是的，他们也是。"
      },
      {
        "en": "That's fine. Thank you very much.",
        "zh": "好了。非常感谢。"
      }
    ],
    "words": [
      {
        "word": "customs",
        "phonetic": "/ˈkʌstəmz/",
        "meaning": "n. 海关",
        "mcItem": "Iron Gate",
        "mcItemIcon": "🛃",
        "sampleSentence": "Pass through the customs.",
        "sampleTranslation": "通过海关。"
      },
      {
        "word": "officer",
        "phonetic": "/ˈɒfɪsə/",
        "meaning": "n. 官员",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "👮",
        "sampleSentence": "The customs officer checked our passports.",
        "sampleTranslation": "海关官员检查了我们的护照。"
      },
      {
        "word": "girl",
        "phonetic": "/ɡɜːl/",
        "meaning": "n. 女孩，姑娘",
        "mcItem": "Player Head",
        "mcItemIcon": "👧",
        "sampleSentence": "The girl is a tourist.",
        "sampleTranslation": "那个女孩是个游客。"
      },
      {
        "word": "Danish",
        "phonetic": "/ˈdeɪnɪʃ/",
        "meaning": "adj. & n. 丹麦人",
        "mcItem": "Banner",
        "mcItemIcon": "🇩🇰",
        "sampleSentence": "We are Danish.",
        "sampleTranslation": "我们是丹麦人。"
      },
      {
        "word": "friend",
        "phonetic": "/frend/",
        "meaning": "n. 朋友",
        "mcItem": "Heart",
        "mcItemIcon": "🤝",
        "sampleSentence": "They are my friends.",
        "sampleTranslation": "他们是我的朋友。"
      },
      {
        "word": "Norwegian",
        "phonetic": "/nɔːˈwiːdʒən/",
        "meaning": "adj. & n. 挪威人",
        "mcItem": "Banner",
        "mcItemIcon": "🇳🇴",
        "sampleSentence": "They are Norwegian.",
        "sampleTranslation": "他们是挪威人。"
      },
      {
        "word": "passport",
        "phonetic": "/ˈpɑːspɔːt/",
        "meaning": "n. 护照",
        "mcItem": "Book",
        "mcItemIcon": "🛂",
        "sampleSentence": "Here are our passports.",
        "sampleTranslation": "这是我们的护照。"
      },
      {
        "word": "brown",
        "phonetic": "/braʊn/",
        "meaning": "adj. 棕色的",
        "mcItem": "Cocoa Beans",
        "mcItemIcon": "🟤",
        "sampleSentence": "Our cases are brown.",
        "sampleTranslation": "我们的箱子是棕色的。"
      },
      {
        "word": "tourist",
        "phonetic": "/ˈtʊərɪst/",
        "meaning": "n. 旅游者",
        "mcItem": "Map",
        "mcItemIcon": "🧳",
        "sampleSentence": "Are you tourists?",
        "sampleTranslation": "你们是游客吗？"
      }
    ],
    "grammarNote": "名词复数：加 -s。friend -> friends, tourist -> tourists, case -> cases。复数指示代词 these，复数主格代词 they。"
  },
  "16": {
    "id": 16,
    "unit": 1,
    "title": "Are you ...?",
    "titleZh": "你们是……吗？",
    "topic": "Plural Greetings & Colors",
    "topicZh": "复数身份确认与物品颜色",
    "grammar": "复数一般疑问句与复数物品颜色提问",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Are you Russian?",
        "translation": "你们是俄罗斯人吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, we aren't. We're English.",
        "translation": "不，我们不是。我们是英国人。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Are these your shirts?",
        "translation": "这些是你们的衬衫吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "What colour are your shirts? Our shirts are white.",
        "translation": "你们的衬衫是什么颜色的？我们的衬衫是白色的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Are you Russian? English? American? Dutch?",
        "zh": "你们是俄罗斯人吗？英国人？美国人？荷兰人？"
      },
      {
        "en": "Are these your red books?",
        "zh": "这些是你们的红皮书吗？"
      },
      {
        "en": "What colour are your shirts? Our shirts are white.",
        "zh": "你们的衬衫是什么颜色的？我们的衬衫是白色的。"
      },
      {
        "en": "What colour are your coats? Our coats are grey.",
        "zh": "你们的大衣是什么颜色的？我们的大衣是灰色的。"
      },
      {
        "en": "What colour are your tickets? Our tickets are yellow.",
        "zh": "你们的票是什么颜色的？我们的票是黄色的。"
      },
      {
        "en": "What colour are your suits? Our suits are blue.",
        "zh": "你们的西服是什么颜色的？我们的西服是蓝色的。"
      }
    ],
    "words": [
      {
        "word": "Russian",
        "phonetic": "/ˈrʌʃn/",
        "meaning": "adj. & n. 俄罗斯人",
        "mcItem": "Banner",
        "mcItemIcon": "🇷🇺",
        "sampleSentence": "Are they Russian?",
        "sampleTranslation": "他们是俄罗斯人吗？"
      },
      {
        "word": "Dutch",
        "phonetic": "/dʌtʃ/",
        "meaning": "adj. & n. 荷兰人",
        "mcItem": "Banner",
        "mcItemIcon": "🇳🇱",
        "sampleSentence": "They are Dutch.",
        "sampleTranslation": "他们是荷兰人。"
      },
      {
        "word": "these",
        "phonetic": "/ðiːz/",
        "meaning": "pron. 这些",
        "mcItem": "Compass",
        "mcItemIcon": "👉",
        "sampleSentence": "Are these your books?",
        "sampleTranslation": "这些是你的书吗？"
      },
      {
        "word": "red",
        "phonetic": "/red/",
        "meaning": "adj. 红色的",
        "mcItem": "Red Dye",
        "mcItemIcon": "🔴",
        "sampleSentence": "These are red books.",
        "sampleTranslation": "这些是红色的书。"
      },
      {
        "word": "grey",
        "phonetic": "/ɡreɪ/",
        "meaning": "adj. 灰色的",
        "mcItem": "Gray Dye",
        "mcItemIcon": "🔘",
        "sampleSentence": "My coat is grey.",
        "sampleTranslation": "我的大衣是灰色的。"
      },
      {
        "word": "yellow",
        "phonetic": "/ˈjeləʊ/",
        "meaning": "adj. 黄色的",
        "mcItem": "Yellow Dye",
        "mcItemIcon": "🟡",
        "sampleSentence": "The tickets are yellow.",
        "sampleTranslation": "票是黄色的。"
      },
      {
        "word": "black",
        "phonetic": "/blæk/",
        "meaning": "adj. 黑色的",
        "mcItem": "Black Dye",
        "mcItemIcon": "⚫",
        "sampleSentence": "He has a black hat.",
        "sampleTranslation": "他有一顶黑帽子。"
      },
      {
        "word": "orange",
        "phonetic": "/ˈɒrɪndʒ/",
        "meaning": "adj. 橘黄色的",
        "mcItem": "Orange Dye",
        "mcItemIcon": "🟠",
        "sampleSentence": "The tie is orange.",
        "sampleTranslation": "领带是橙色的。"
      }
    ],
    "grammarNote": "复数提问颜色：What colour are your ...? 回答：Our ... are + 颜色形容词。"
  },
  "17": {
    "id": 17,
    "unit": 1,
    "title": "How do you do?",
    "titleZh": "你好！",
    "topic": "Formal Greetings",
    "topicZh": "正式初次见面问候",
    "grammar": "How do you do? 礼貌应答与复数主语代词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MR. JACKSON",
        "text": "Come and meet our employees, Mr. Richards.",
        "translation": "来见见我们的雇员，理查兹先生。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "Thank you, Mr. Jackson.",
        "translation": "谢谢，杰克逊先生。",
        "avatar": "👨"
      },
      {
        "speaker": "MR. JACKSON",
        "text": "This is Nicola Grey, and this is Claire Taylor.",
        "translation": "这位是尼古拉·格雷，这位是克莱尔·泰勒。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "How do you do?",
        "translation": "你们好！",
        "avatar": "👨"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "Those women are very hard-working. What are their jobs?",
        "translation": "那些姑娘很勤快。她们是做什么工作的？",
        "avatar": "👨"
      },
      {
        "speaker": "MR. JACKSON",
        "text": "They're keyboard operators.",
        "translation": "她们是电脑输入员。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. JACKSON",
        "text": "This is Michael Baker, and this is Jeremy Short.",
        "translation": "这位是迈克尔·贝克，这位是杰里米·肖特。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "How do you do?",
        "translation": "你们好！",
        "avatar": "👨"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "They aren't very busy! What are their jobs?",
        "translation": "他们不很忙吧！他们是做什么工作的？",
        "avatar": "👨"
      },
      {
        "speaker": "MR. JACKSON",
        "text": "They're sales reps. They're very lazy.",
        "translation": "他们是推销员。他们非常懒。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. RICHARDS",
        "text": "Who is this young man?",
        "translation": "这个年轻人是谁？",
        "avatar": "👨"
      },
      {
        "speaker": "MR. JACKSON",
        "text": "This is Jim. He's our office assistant.",
        "translation": "他是吉姆。是我们办公室的勤杂人员。",
        "avatar": "👨‍💼"
      }
    ],
    "sentences": [
      {
        "en": "Come and meet our employees, Mr. Richards.",
        "zh": "来见见我们的雇员，理查兹先生。"
      },
      {
        "en": "This is Nicola Grey, and this is Claire Taylor. How do you do?",
        "zh": "这位是尼古拉·格雷，这位是克莱尔·泰勒。你们好！"
      },
      {
        "en": "Those women are very hard-working. What are their jobs?",
        "zh": "那些姑娘很勤快。她们是做什么工作的？"
      },
      {
        "en": "They're keyboard operators.",
        "zh": "她们是电脑输入员。"
      },
      {
        "en": "This is Michael Baker, and this is Jeremy Short. How do you do?",
        "zh": "这位是迈克尔·贝克，这位是杰里米·肖特。你们好！"
      },
      {
        "en": "They're sales reps. They're very lazy.",
        "zh": "他们是推销员。他们非常懒。"
      },
      {
        "en": "Who is this young man? This is Jim. He's our office assistant.",
        "zh": "这个年轻人是谁？他是吉姆。是我们办公室的勤杂人员。"
      }
    ],
    "words": [
      {
        "word": "employee",
        "phonetic": "/ɪmˈplɔɪiː/",
        "meaning": "n. 雇员",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "Meet our new employees.",
        "sampleTranslation": "见见我们的新雇员。"
      },
      {
        "word": "hard-working",
        "phonetic": "/ˌhɑːdˈwɜːkɪŋ/",
        "meaning": "adj. 勤奋的",
        "mcItem": "Iron Pickaxe",
        "mcItemIcon": "💪",
        "sampleSentence": "They are very hard-working.",
        "sampleTranslation": "他们非常勤奋。"
      },
      {
        "word": "sales reps",
        "phonetic": "/ˈseɪlz reps/",
        "meaning": "推销员 (sales representatives)",
        "mcItem": "Emerald",
        "mcItemIcon": "💼",
        "sampleSentence": "They're sales reps.",
        "sampleTranslation": "他们是推销员。"
      },
      {
        "word": "man",
        "phonetic": "/mæn/",
        "meaning": "n. 男人",
        "mcItem": "Player Head",
        "mcItemIcon": "👨",
        "sampleSentence": "Who is this young man?",
        "sampleTranslation": "这个年轻人是谁？"
      },
      {
        "word": "office",
        "phonetic": "/ˈɒfɪs/",
        "meaning": "n. 办公室",
        "mcItem": "Lectern",
        "mcItemIcon": "🏢",
        "sampleSentence": "He works in our office.",
        "sampleTranslation": "他在我们办公室工作。"
      },
      {
        "word": "assistant",
        "phonetic": "/əˈsɪstənt/",
        "meaning": "n. 助手",
        "mcItem": "Book",
        "mcItemIcon": "🧑‍💼",
        "sampleSentence": "Jim is our office assistant.",
        "sampleTranslation": "吉姆是我们的办公室勤杂人员。"
      }
    ],
    "grammarNote": "How do you do? 用于正式初次见面，对方同样用 How do you do? 回答。sales reps 是 sales representatives 的简写。"
  },
  "18": {
    "id": 18,
    "unit": 1,
    "title": "What are their jobs?",
    "titleZh": "他们是做什么工作的？",
    "topic": "Plural Professions",
    "topicZh": "复数职业询问",
    "grammar": "复数职业名词变化与否定问答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What are their jobs? Are they mechanics?",
        "translation": "他们是做什么工作的？他们是机械师吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They aren't mechanics. They're sales reps.",
        "translation": "他们不是机械师。他们是推销员。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What are their jobs? Are they keyboard operators?",
        "translation": "她们是做什么工作的？她们是电脑录入员吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They aren't keyboard operators. They're air hostesses.",
        "translation": "她们不是电脑录入员。她们是空中小姐。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "What are their jobs? They're sales reps.",
        "zh": "他们是做什么工作的？他们是推销员。"
      },
      {
        "en": "They're keyboard operators.",
        "zh": "她们是电脑录入员。"
      },
      {
        "en": "They're mechanics.",
        "zh": "他们是机械师。"
      },
      {
        "en": "They're engineers.",
        "zh": "他们是工程师。"
      },
      {
        "en": "They're hairdressers.",
        "zh": "他们是理发师。"
      },
      {
        "en": "They're teachers.",
        "zh": "他们是老师。"
      },
      {
        "en": "They're customs officers.",
        "zh": "他们是海关官员。"
      },
      {
        "en": "They're taxi drivers.",
        "zh": "他们是出租车司机。"
      },
      {
        "en": "They're nurses.",
        "zh": "她们是护士。"
      },
      {
        "en": "They're air hostesses.",
        "zh": "她们是空中小姐。"
      },
      {
        "en": "They're housewives.",
        "zh": "她们是家庭主妇。"
      },
      {
        "en": "They're milkmen.",
        "zh": "他们是送奶工。"
      },
      {
        "en": "They're postmen.",
        "zh": "他们是邮递员。"
      },
      {
        "en": "They're policemen.",
        "zh": "他们是警察。"
      },
      {
        "en": "They're policewomen.",
        "zh": "她们是女警察。"
      }
    ],
    "words": [],
    "grammarNote": "不规则复数：man -> men, woman -> women, housewife -> housewives, milkman -> milkmen, policeman -> policemen。"
  },
  "19": {
    "id": 19,
    "unit": 1,
    "title": "Tired and thirsty",
    "titleZh": "又累又渴",
    "topic": "Feelings & Needs",
    "topicZh": "感受与需求表达",
    "grammar": "What's the matter with...? 与 there be 句型",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MOTHER",
        "text": "What's the matter, children?",
        "translation": "怎么啦，孩子们？",
        "avatar": "👩"
      },
      {
        "speaker": "GIRL",
        "text": "We're tired ...",
        "translation": "我们累了……",
        "avatar": "👧"
      },
      {
        "speaker": "BOY",
        "text": "… and thirsty, Mum.",
        "translation": "……口也渴，妈妈。",
        "avatar": "👦"
      },
      {
        "speaker": "MOTHER",
        "text": "Sit down here.",
        "translation": "坐在这儿吧。",
        "avatar": "👩"
      },
      {
        "speaker": "MOTHER",
        "text": "Are you all right now?",
        "translation": "你们现在好些了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "BOY",
        "text": "No, we aren't.",
        "translation": "不，还没有。",
        "avatar": "👦"
      },
      {
        "speaker": "MOTHER",
        "text": "Look! There's an ice cream man.",
        "translation": "瞧！有个卖冰淇淋的。",
        "avatar": "👩"
      },
      {
        "speaker": "MOTHER",
        "text": "Two ice creams please.",
        "translation": "请拿两份冰淇淋。",
        "avatar": "👩"
      },
      {
        "speaker": "MOTHER",
        "text": "Here you are, children.",
        "translation": "拿着，孩子们。",
        "avatar": "👩"
      },
      {
        "speaker": "CHILDREN",
        "text": "Thanks, Mum.",
        "translation": "谢谢，妈妈。",
        "avatar": "👥"
      },
      {
        "speaker": "GIRL",
        "text": "These ice creams are nice.",
        "translation": "这些冰淇淋真好吃。",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "Are you all right now?",
        "translation": "你们现在好了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "CHILDREN",
        "text": "Yes, we are, thank you!",
        "translation": "是的，现在好了，谢谢您！",
        "avatar": "👥"
      }
    ],
    "sentences": [
      {
        "en": "What's the matter, children?",
        "zh": "怎么啦，孩子们？"
      },
      {
        "en": "We're tired and thirsty, Mum.",
        "zh": "我们累了口也渴，妈妈。"
      },
      {
        "en": "Sit down here.",
        "zh": "坐在这儿吧。"
      },
      {
        "en": "Are you all right now? No, we aren't.",
        "zh": "你们现在好些了吗？不，还没有。"
      },
      {
        "en": "Look! There's an ice cream man.",
        "zh": "瞧！有个卖冰淇淋的。"
      },
      {
        "en": "Two ice creams please.",
        "zh": "请拿两份冰淇淋。"
      },
      {
        "en": "Here you are, children. Thanks, Mum.",
        "zh": "拿着，孩子们。谢谢，妈妈。"
      },
      {
        "en": "These ice creams are nice.",
        "zh": "这些冰淇淋真好吃。"
      },
      {
        "en": "Are you all right now? Yes, we are, thank you!",
        "zh": "你们现在好了吗？是的，现在好了，谢谢您！"
      }
    ],
    "words": [
      {
        "word": "matter",
        "phonetic": "/ˈmætə/",
        "meaning": "n. 事情",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "What's the matter?",
        "sampleTranslation": "怎么了？"
      },
      {
        "word": "children",
        "phonetic": "/ˈtʃɪldrən/",
        "meaning": "n. 孩子们 (child的复数)",
        "mcItem": "Player Head",
        "mcItemIcon": "🧒",
        "sampleSentence": "The children are playing.",
        "sampleTranslation": "孩子们正在玩耍。"
      },
      {
        "word": "tired",
        "phonetic": "/ˈtaɪəd/",
        "meaning": "adj. 累，疲乏",
        "mcItem": "Bed",
        "mcItemIcon": "🥱",
        "sampleSentence": "We are very tired.",
        "sampleTranslation": "我们很累。"
      },
      {
        "word": "boy",
        "phonetic": "/bɔɪ/",
        "meaning": "n. 男孩",
        "mcItem": "Player Head",
        "mcItemIcon": "👦",
        "sampleSentence": "He is a good boy.",
        "sampleTranslation": "他是个好男孩。"
      },
      {
        "word": "thirsty",
        "phonetic": "/ˈθɜːsti/",
        "meaning": "adj. 渴",
        "mcItem": "Water Bottle",
        "mcItemIcon": "🥤",
        "sampleSentence": "I am thirsty.",
        "sampleTranslation": "我渴了。"
      },
      {
        "word": "Mum",
        "phonetic": "/mʌm/",
        "meaning": "n. 妈妈 (儿语)",
        "mcItem": "Player Head",
        "mcItemIcon": "👩",
        "sampleSentence": "Thanks, Mum.",
        "sampleTranslation": "谢谢妈妈。"
      },
      {
        "word": "sit down",
        "phonetic": "/ˌsɪt ˈdaʊn/",
        "meaning": "坐下",
        "mcItem": "Stairs",
        "mcItemIcon": "🪑",
        "sampleSentence": "Sit down here, please.",
        "sampleTranslation": "请坐在这里。"
      },
      {
        "word": "right",
        "phonetic": "/raɪt/",
        "meaning": "adj. 好，可以",
        "mcItem": "Emerald",
        "mcItemIcon": "👌",
        "sampleSentence": "Are you all right now?",
        "sampleTranslation": "你现在好些了吗？"
      },
      {
        "word": "ice cream",
        "phonetic": "/ˌaɪs ˈkriːm/",
        "meaning": "冰淇淋",
        "mcItem": "Snowball",
        "mcItemIcon": "🍦",
        "sampleSentence": "Two ice creams, please.",
        "sampleTranslation": "请给两份冰淇淋。"
      }
    ],
    "grammarNote": "What's the matter? = Tell me what's wrong. 怎么啦？There's = There is。There is an ice cream man."
  },
  "20": {
    "id": 20,
    "unit": 1,
    "title": "Look at them!",
    "titleZh": "看看他/它们！",
    "topic": "Feelings & States",
    "topicZh": "描述他人状态与复数反义词",
    "grammar": "宾格代词 them 与反义形容词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Look at them! They're clean.",
        "translation": "看看她们！她们很干净。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Look at those shoes! They're dirty.",
        "translation": "看看那些鞋！它们很脏。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Look at the children! They're hot.",
        "translation": "看那些孩子！他们很热。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Look at them! They're cold.",
        "translation": "看他们！他们很冷。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "They're clean. They're dirty.",
        "zh": "它们是干净的。它们是脏的。"
      },
      {
        "en": "They're hot. They're cold.",
        "zh": "他们很热。他们很冷。"
      },
      {
        "en": "They're fat. They're thin.",
        "zh": "他们很胖。他们很瘦。"
      },
      {
        "en": "They're big. They're small.",
        "zh": "它们很大。它们很小。"
      },
      {
        "en": "They're open. They're shut.",
        "zh": "它们开着。它们关着。"
      },
      {
        "en": "They're light. They're heavy.",
        "zh": "它们很轻。它们很重。"
      },
      {
        "en": "They're old. They're young.",
        "zh": "他们年纪大了。他们很年轻。"
      },
      {
        "en": "They're old. They're new.",
        "zh": "它们旧了。它们是新的。"
      },
      {
        "en": "They're short. They're tall.",
        "zh": "他们很矮。他们很高。"
      },
      {
        "en": "They're short. They're long.",
        "zh": "它们很短。它们很长。"
      }
    ],
    "words": [
      {
        "word": "big",
        "phonetic": "/bɪɡ/",
        "meaning": "adj. 大的",
        "mcItem": "Giant",
        "mcItemIcon": "🐘",
        "sampleSentence": "They're big.",
        "sampleTranslation": "它们很大。"
      },
      {
        "word": "small",
        "phonetic": "/smɔːl/",
        "meaning": "adj. 小的",
        "mcItem": "Button",
        "mcItemIcon": "🐜",
        "sampleSentence": "They're small.",
        "sampleTranslation": "它们很小。"
      },
      {
        "word": "open",
        "phonetic": "/ˈəʊpən/",
        "meaning": "adj. 开着的",
        "mcItem": "Trapdoor",
        "mcItemIcon": "🔓",
        "sampleSentence": "The shops are open.",
        "sampleTranslation": "商店开着门。"
      },
      {
        "word": "shut",
        "phonetic": "/ʃʌt/",
        "meaning": "adj. 关着的",
        "mcItem": "Iron Door",
        "mcItemIcon": "🔒",
        "sampleSentence": "The doors are shut.",
        "sampleTranslation": "门是关着的。"
      },
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "meaning": "adj. 轻的",
        "mcItem": "Feather",
        "mcItemIcon": "🪶",
        "sampleSentence": "The box is light.",
        "sampleTranslation": "箱子很轻。"
      },
      {
        "word": "heavy",
        "phonetic": "/ˈhevi/",
        "meaning": "adj. 重的",
        "mcItem": "Anvil",
        "mcItemIcon": "🏋️",
        "sampleSentence": "The cases are heavy.",
        "sampleTranslation": "箱子很重。"
      },
      {
        "word": "long",
        "phonetic": "/lɒŋ/",
        "meaning": "adj. 长的",
        "mcItem": "Stick",
        "mcItemIcon": "📏",
        "sampleSentence": "They are long.",
        "sampleTranslation": "它们很长。"
      },
      {
        "word": "shoe",
        "phonetic": "/ʃuː/",
        "meaning": "n. 鞋子",
        "mcItem": "Leather Boots",
        "mcItemIcon": "👞",
        "sampleSentence": "His shoes are dirty.",
        "sampleTranslation": "他的鞋很脏。"
      },
      {
        "word": "grandfather",
        "phonetic": "/ˈɡrændˌfɑːðə/",
        "meaning": "n. 祖父，外祖父",
        "mcItem": "Player Head",
        "mcItemIcon": "👴",
        "sampleSentence": "My grandfather is reading.",
        "sampleTranslation": "我祖父在看书。"
      },
      {
        "word": "grandmother",
        "phonetic": "/ˈɡrændˌmʌðə/",
        "meaning": "n. 祖母，外祖母",
        "mcItem": "Player Head",
        "mcItemIcon": "👵",
        "sampleSentence": "My grandmother is kind.",
        "sampleTranslation": "我祖母很慈祥。"
      }
    ],
    "grammarNote": "反义词对比：big/small, open/shut, light/heavy, old/young, short/long。They're = They are。"
  },
  "21": {
    "id": 21,
    "unit": 1,
    "title": "Which book?",
    "titleZh": "哪一本书？",
    "topic": "Selection & One",
    "topicZh": "物品挑选与指示",
    "grammar": "Which 疑问句与代词 one",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MAN",
        "text": "Give me a book please, Jane.",
        "translation": "请拿本书给我，简。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Which book?",
        "translation": "哪一本？",
        "avatar": "👩"
      },
      {
        "speaker": "WOMAN",
        "text": "This one?",
        "translation": "是这本吗？",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "No, not that one. The red one.",
        "translation": "不，不是那本。是那本红皮的。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "This one?",
        "translation": "这本吗？",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Yes, please.",
        "translation": "是的，请给我。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Here you are.",
        "translation": "给你。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Thank you.",
        "translation": "谢谢。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Give me a book please, Jane.",
        "zh": "请拿本书给我，简。"
      },
      {
        "en": "Which book? This one?",
        "zh": "哪一本？是这本吗？"
      },
      {
        "en": "No, not that one. The red one.",
        "zh": "不，不是那本。是那本红皮的。"
      },
      {
        "en": "This one? Yes, please.",
        "zh": "这本吗？是的，请给我。"
      },
      {
        "en": "Here you are. Thank you.",
        "zh": "给你。谢谢。"
      }
    ],
    "words": [
      {
        "word": "give",
        "phonetic": "/ɡɪv/",
        "meaning": "v. 给",
        "mcItem": "Chest",
        "mcItemIcon": "🤲",
        "sampleSentence": "Give me a book, please.",
        "sampleTranslation": "请给我一本书。"
      },
      {
        "word": "one",
        "phonetic": "/wʌn/",
        "meaning": "pron. 一个 (不定代词)",
        "mcItem": "Book",
        "mcItemIcon": "1️⃣",
        "sampleSentence": "Give me the red one.",
        "sampleTranslation": "给我红色的那个。"
      },
      {
        "word": "which",
        "phonetic": "/wɪtʃ/",
        "meaning": "question word 哪一个",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "Which book do you want?",
        "sampleTranslation": "你想要哪本书？"
      }
    ],
    "grammarNote": "Give me a book, please. 是祈使句。Which book? 哪一本？This one? 中的 one 是不定代词，代替 book。"
  },
  "22": {
    "id": 22,
    "unit": 1,
    "title": "Give me/him/her/us/them a ...",
    "titleZh": "给我/他/她/我们/他们一个……",
    "topic": "Imperatives & Direct Object",
    "topicZh": "递交与请求",
    "grammar": "双宾语结构与不定代词 which one",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Give me a cup please.",
        "translation": "请给我一只茶杯。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Which one? This dirty one?",
        "translation": "哪一只？这只脏的吗？",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "No, not this dirty one. That clean one.",
        "translation": "不，不要这只脏的。要那只干净的。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Here you are.",
        "translation": "给你。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Thank you.",
        "translation": "谢谢。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Give me a cup please. Which one? That clean one.",
        "zh": "请给我一只茶杯。哪一只？那只干净的。"
      },
      {
        "en": "Give him a glass please. Which one? That full one.",
        "zh": "请给他一只玻璃杯。哪一只？那只满的。"
      },
      {
        "en": "Give her a bottle please. Which one? That small one.",
        "zh": "请给她一个瓶子。哪一个？那个小的。"
      },
      {
        "en": "Give us a box please. Which one? That big one.",
        "zh": "请给我们一个盒子。哪一个？那个大的。"
      },
      {
        "en": "Give them a tin please. Which one? That new one.",
        "zh": "请给他们一个罐头。哪一个？那个新的。"
      },
      {
        "en": "Give me a knife please. Which one? That sharp one.",
        "zh": "请给我一把小刀。哪一把？那把锋利的。"
      },
      {
        "en": "Give him a spoon please. Which one? That old one.",
        "zh": "请给他一把勺子。哪一把？那把旧的。"
      },
      {
        "en": "Give her a fork please. Which one? That large one.",
        "zh": "请给她一把叉子。哪一把？那把大的。"
      }
    ],
    "words": [
      {
        "word": "empty",
        "phonetic": "/ˈempti/",
        "meaning": "adj. 空的",
        "mcItem": "Glass Bottle",
        "mcItemIcon": "🫙",
        "sampleSentence": "The glass is empty.",
        "sampleTranslation": "玻璃杯是空的。"
      },
      {
        "word": "full",
        "phonetic": "/fʊl/",
        "meaning": "adj. 满的",
        "mcItem": "Potion",
        "mcItemIcon": "🧪",
        "sampleSentence": "The bottle is full.",
        "sampleTranslation": "瓶子是满的。"
      },
      {
        "word": "large",
        "phonetic": "/lɑːdʒ/",
        "meaning": "adj. 大的",
        "mcItem": "Chest",
        "mcItemIcon": "📦",
        "sampleSentence": "This is a large box.",
        "sampleTranslation": "这是一个大盒子。"
      },
      {
        "word": "little",
        "phonetic": "/ˈlɪtl/",
        "meaning": "adj. 小的",
        "mcItem": "Button",
        "mcItemIcon": "🔘",
        "sampleSentence": "Give me the little one.",
        "sampleTranslation": "给我那个小的。"
      },
      {
        "word": "sharp",
        "phonetic": "/ʃɑːp/",
        "meaning": "adj. 尖的，锋利的",
        "mcItem": "Iron Sword",
        "mcItemIcon": "🗡️",
        "sampleSentence": "The knife is sharp.",
        "sampleTranslation": "这把小刀很锋利。"
      },
      {
        "word": "blunt",
        "phonetic": "/blʌnt/",
        "meaning": "adj. 钝的",
        "mcItem": "Wooden Sword",
        "mcItemIcon": "🗡️",
        "sampleSentence": "The knife is blunt.",
        "sampleTranslation": "小刀钝了。"
      },
      {
        "word": "box",
        "phonetic": "/bɒks/",
        "meaning": "n. 盒子，箱子",
        "mcItem": "Chest",
        "mcItemIcon": "📦",
        "sampleSentence": "Pass me that box.",
        "sampleTranslation": "把那个盒子递给我。"
      },
      {
        "word": "glass",
        "phonetic": "/ɡlɑːs/",
        "meaning": "n. 杯子",
        "mcItem": "Glass",
        "mcItemIcon": "🥛",
        "sampleSentence": "There is a glass on the table.",
        "sampleTranslation": "桌上有个玻璃杯。"
      },
      {
        "word": "cup",
        "phonetic": "/kʌp/",
        "meaning": "n. 茶杯",
        "mcItem": "Flower Pot",
        "mcItemIcon": "☕",
        "sampleSentence": "Give me a cup, please.",
        "sampleTranslation": "请给我一只茶杯。"
      },
      {
        "word": "bottle",
        "phonetic": "/ˈbɒtl/",
        "meaning": "n. 瓶子",
        "mcItem": "Glass Bottle",
        "mcItemIcon": "🍾",
        "sampleSentence": "The bottle is on the table.",
        "sampleTranslation": "瓶子在桌上。"
      },
      {
        "word": "tin",
        "phonetic": "/tɪn/",
        "meaning": "n. 罐头",
        "mcItem": "Iron Ingot",
        "mcItemIcon": "🥫",
        "sampleSentence": "Open the tin.",
        "sampleTranslation": "打开罐头。"
      },
      {
        "word": "knife",
        "phonetic": "/naɪf/",
        "meaning": "n. 刀子",
        "mcItem": "Iron Sword",
        "mcItemIcon": "🔪",
        "sampleSentence": "Give me the sharp knife.",
        "sampleTranslation": "给我那把锋利的刀。"
      },
      {
        "word": "fork",
        "phonetic": "/fɔːk/",
        "meaning": "n. 叉子",
        "mcItem": "Stick",
        "mcItemIcon": "🍴",
        "sampleSentence": "Here is a fork.",
        "sampleTranslation": "这是一把叉子。"
      },
      {
        "word": "spoon",
        "phonetic": "/spuːn/",
        "meaning": "n. 勺子",
        "mcItem": "Shovel",
        "mcItemIcon": "🥄",
        "sampleSentence": "The spoon is in the cup.",
        "sampleTranslation": "勺子在杯子里。"
      }
    ],
    "grammarNote": "人称代词宾格：me, him, her, us, them。祈使句结构：Give + 宾格 + 名词。"
  },
  "23": {
    "id": 23,
    "unit": 1,
    "title": "Which glasses?",
    "titleZh": "哪几只杯子？",
    "topic": "Plural Selection",
    "topicZh": "复数物品挑选",
    "grammar": "Which + 复数名词 与 代词 ones",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MAN",
        "text": "Give me some glasses please, Jane.",
        "translation": "请拿给我几只玻璃杯，简。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Which glasses?",
        "translation": "哪几只？",
        "avatar": "👩"
      },
      {
        "speaker": "WOMAN",
        "text": "These glasses?",
        "translation": "这几只吗？",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "No, not those. The ones on the shelf.",
        "translation": "不，不是那几只。是架子上的那几只。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "These?",
        "translation": "这几只？",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Yes, please.",
        "translation": "是的，请拿给我。",
        "avatar": "👨"
      },
      {
        "speaker": "WOMAN",
        "text": "Here you are.",
        "translation": "给你。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Thanks.",
        "translation": "谢谢。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Give me some glasses please, Jane.",
        "zh": "请拿给我几只玻璃杯，简。"
      },
      {
        "en": "Which glasses? These glasses?",
        "zh": "哪几只？这几只吗？"
      },
      {
        "en": "No, not those. The ones on the shelf.",
        "zh": "不，不是那几只。是架子上的那几只。"
      },
      {
        "en": "These? Yes, please.",
        "zh": "这几只？是的，请拿给我。"
      },
      {
        "en": "Here you are. Thanks.",
        "zh": "给你。谢谢。"
      }
    ],
    "words": [
      {
        "word": "on",
        "phonetic": "/ɒn/",
        "meaning": "prep. 在……之上",
        "mcItem": "Oak Trapdoor",
        "mcItemIcon": "🔝",
        "sampleSentence": "The glasses are on the shelf.",
        "sampleTranslation": "玻璃杯在架子上。"
      },
      {
        "word": "shelf",
        "phonetic": "/ʃelf/",
        "meaning": "n. 架子，搁板",
        "mcItem": "Bookshelf",
        "mcItemIcon": "🪜",
        "sampleSentence": "Put the books on the shelf.",
        "sampleTranslation": "把书放在书架上。"
      }
    ],
    "grammarNote": "Give me some glasses 中，give 后面接双宾语（间接宾语 me，直接宾语 some glasses）。The ones on the shelf 中的 ones 代表 glasses。"
  },
  "24": {
    "id": 24,
    "unit": 1,
    "title": "Give me/him/her/us/them some ...",
    "titleZh": "给我/他/她/我们/他们一些……",
    "topic": "Quantity Request",
    "topicZh": "不可数/复数物品请求",
    "grammar": "Give some + 复数名词 与 方位介词 on",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Give me some pens please.",
        "translation": "请给我几支钢笔。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Which ones? The ones on the desk?",
        "translation": "哪几支？书桌上的那几支吗？",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Yes, please.",
        "translation": "是的，请给我。",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Here you are.",
        "translation": "给你。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Thank you.",
        "translation": "谢谢。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Give me some pens please. Which ones? The ones on the desk.",
        "zh": "请给我几支钢笔。哪几支？书桌上的那几支。"
      },
      {
        "en": "Give him some ties please. Which ones? The ones on the chair.",
        "zh": "请给他几条领带。哪几条？椅子上的那几条。"
      },
      {
        "en": "Give her some spoons please. Which ones? The ones on the table.",
        "zh": "请给她几把勺子。哪几把？桌上的那几把。"
      },
      {
        "en": "Give us some plates please. Which ones? The ones on the cupboard.",
        "zh": "请给我们几个盘子。哪几个？食橱上的那几个。"
      },
      {
        "en": "Give them some cigarettes please. Which ones? The ones on the television.",
        "zh": "请给他们几支香烟。哪几支？电视机上的那几支。"
      },
      {
        "en": "Give me some boxes please. Which ones? The ones on the floor.",
        "zh": "请给我几个盒子。哪几个？地板上的那几个。"
      },
      {
        "en": "Give him some bottles please. Which ones? The ones on the dressing table.",
        "zh": "请给他几个瓶子。哪几个？梳妆台上的那几个。"
      },
      {
        "en": "Give her some books please. Which ones? The ones on the shelf.",
        "zh": "请给她几本书。哪几本？书架上的那几本。"
      },
      {
        "en": "Give us some magazines please. Which ones? The ones on the bed.",
        "zh": "请给我们几本杂志。哪几本？床上的那几本。"
      },
      {
        "en": "Give them some newspapers please. Which ones? The ones on the stereo.",
        "zh": "请给他们几份报纸。哪几份？立体声音响上的那几份。"
      }
    ],
    "words": [
      {
        "word": "desk",
        "phonetic": "/desk/",
        "meaning": "n. 课桌",
        "mcItem": "Crafting Table",
        "mcItemIcon": "🪵",
        "sampleSentence": "The pens are on the desk.",
        "sampleTranslation": "钢笔在书桌上。"
      },
      {
        "word": "table",
        "phonetic": "/ˈteɪbl/",
        "meaning": "n. 桌子",
        "mcItem": "Oak Fence",
        "mcItemIcon": "🪑",
        "sampleSentence": "The spoons are on the table.",
        "sampleTranslation": "勺子在桌上。"
      },
      {
        "word": "plate",
        "phonetic": "/pleɪt/",
        "meaning": "n. 盘子",
        "mcItem": "Pressure Plate",
        "mcItemIcon": "🍽️",
        "sampleSentence": "Put the plate on the table.",
        "sampleTranslation": "把盘子放在桌上。"
      },
      {
        "word": "cupboard",
        "phonetic": "/ˈkʌbəd/",
        "meaning": "n. 食橱",
        "mcItem": "Chest",
        "mcItemIcon": "🗄️",
        "sampleSentence": "The plates are on the cupboard.",
        "sampleTranslation": "盘子在食橱上。"
      },
      {
        "word": "cigarette",
        "phonetic": "/ˌsɪɡəˈret/",
        "meaning": "n. 香烟",
        "mcItem": "Torch",
        "mcItemIcon": "🚬",
        "sampleSentence": "There are cigarettes on the television.",
        "sampleTranslation": "电视机上有香烟。"
      },
      {
        "word": "television",
        "phonetic": "/ˈtelɪvɪʒn/",
        "meaning": "n. 电视机",
        "mcItem": "Painting",
        "mcItemIcon": "📺",
        "sampleSentence": "The television is near the window.",
        "sampleTranslation": "电视机在窗户旁边。"
      },
      {
        "word": "floor",
        "phonetic": "/flɔː/",
        "meaning": "n. 地板",
        "mcItem": "Oak Planks",
        "mcItemIcon": "🪵",
        "sampleSentence": "The boxes are on the floor.",
        "sampleTranslation": "箱子在地板上。"
      },
      {
        "word": "dressing table",
        "phonetic": "/ˈdresɪŋ ˌteɪbl/",
        "meaning": "梳妆台",
        "mcItem": "Crafting Table",
        "mcItemIcon": "🪞",
        "sampleSentence": "The bottles are on the dressing table.",
        "sampleTranslation": "瓶子在梳妆台上。"
      },
      {
        "word": "magazine",
        "phonetic": "/ˌmæɡəˈziːn/",
        "meaning": "n. 杂志",
        "mcItem": "Book",
        "mcItemIcon": "📰",
        "sampleSentence": "She is reading a magazine.",
        "sampleTranslation": "她正在看一本杂志。"
      },
      {
        "word": "bed",
        "phonetic": "/bed/",
        "meaning": "n. 床",
        "mcItem": "Red Bed",
        "mcItemIcon": "🛏️",
        "sampleSentence": "The magazines are on the bed.",
        "sampleTranslation": "杂志在床上。"
      },
      {
        "word": "newspaper",
        "phonetic": "/ˈnjuːzpeɪpə/",
        "meaning": "n. 报纸",
        "mcItem": "Paper",
        "mcItemIcon": "🗞️",
        "sampleSentence": "He reads a newspaper every evening.",
        "sampleTranslation": "他每天晚上读报。"
      },
      {
        "word": "stereo",
        "phonetic": "/ˈsteriəʊ/",
        "meaning": "n. 立体声音响",
        "mcItem": "Jukebox",
        "mcItemIcon": "📻",
        "sampleSentence": "The newspapers are on the stereo.",
        "sampleTranslation": "报纸在音响上。"
      }
    ],
    "grammarNote": "复数物品请求：Give me some + 复数名词。复数不定代词 which ones。"
  }
};
