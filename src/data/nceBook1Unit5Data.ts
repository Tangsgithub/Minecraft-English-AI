// Authentic NCE Book 1 Unit 5 Data (Lessons 97 - 120)
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

export const NCE_BOOK1_UNIT5_DATA: Record<number, LessonCorpusItem> = {
  "97": {
    "id": 97,
    "unit": 5,
    "title": "A small blue case",
    "titleZh": "一只蓝色的小箱子",
    "topic": "Lost and Found & Possessions",
    "topicZh": "失物招领与行李认领",
    "grammar": "Possessive pronouns (mine, yours, hers, his, ours, theirs) 与 物主归属",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "MR. HALL",
        "text": "Excuse me. Does this small blue case belong to you?",
        "translation": "劳驾。这只蓝色小箱子是你的吗？",
        "avatar": "👨"
      },
      {
        "speaker": "MISS EVANS",
        "text": "No, it doesn't. Mine is a large brown case.",
        "translation": "不，不是我的。我的是一只棕色的大箱子。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. HALL",
        "text": "Is this small black one yours?",
        "translation": "这只黑色的小箱子是你的吗？",
        "avatar": "👨"
      },
      {
        "speaker": "MISS EVANS",
        "text": "No, it isn't. That case is hers, I think. She left it on the seat.",
        "translation": "不，不是。我想那是她的箱子。她把它落在了座位上。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. HALL",
        "text": "Let's take them to the lost property office.",
        "translation": "我们把它们送到失物招领处去吧。",
        "avatar": "👨"
      },
      {
        "speaker": "MISS EVANS",
        "text": "Good idea. Someone will be looking for them.",
        "translation": "好主意。肯定有人在找它们呢。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Does this small blue case belong to you? No, it doesn't.",
        "zh": "这只蓝色小箱子是你的吗？不，不是。"
      },
      {
        "en": "Mine is a large brown case.",
        "zh": "我的是一只棕色的大箱子。"
      },
      {
        "en": "Is this small black one yours?",
        "zh": "这只黑色的小箱子是你的吗？"
      },
      {
        "en": "That case is hers, I think.",
        "zh": "我想那个箱子是她的。"
      },
      {
        "en": "Let's take them to the lost property office.",
        "zh": "我们把它们送到失物招领处去吧。"
      }
    ],
    "words": [
      {
        "word": "belong",
        "phonetic": "/bɪˈlɒŋ/",
        "meaning": "v. 属于",
        "mcItem": "Lead",
        "mcItemIcon": "🔗",
        "sampleSentence": "It belongs to me.",
        "sampleTranslation": "它属于我。"
      },
      {
        "word": "case",
        "phonetic": "/keɪs/",
        "meaning": "n. 箱子，手提箱",
        "mcItem": "Chest",
        "mcItemIcon": "💼",
        "sampleSentence": "A small blue case.",
        "sampleTranslation": "一个蓝色小箱子。"
      },
      {
        "word": "mine",
        "phonetic": "/maɪn/",
        "meaning": "pron. 我的 (名词性物主代词)",
        "mcItem": "Player Head",
        "mcItemIcon": "🙋",
        "sampleSentence": "This book is mine.",
        "sampleTranslation": "这本书是我的。"
      },
      {
        "word": "yours",
        "phonetic": "/jɔːz/",
        "meaning": "pron. 你的，你们的",
        "mcItem": "Player Head",
        "mcItemIcon": "🫵",
        "sampleSentence": "Is this yours?",
        "sampleTranslation": "这是你的吗？"
      },
      {
        "word": "hers",
        "phonetic": "/hɜːz/",
        "meaning": "pron. 她的",
        "mcItem": "Player Head",
        "mcItemIcon": "👧",
        "sampleSentence": "The bag is hers.",
        "sampleTranslation": "那个包是她的。"
      },
      {
        "word": "lost",
        "phonetic": "/lɒst/",
        "meaning": "adj. 遗失的",
        "mcItem": "Compass",
        "mcItemIcon": "❓",
        "sampleSentence": "Lost and found.",
        "sampleTranslation": "失物招领。"
      },
      {
        "word": "property",
        "phonetic": "/ˈprɒpəti/",
        "meaning": "n. 财产，物品",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "💎",
        "sampleSentence": "Lost property office.",
        "sampleTranslation": "失物招领处。"
      }
    ],
    "grammarNote": "名词性物主代词 = 形容词性物主代词 + 名词：mine (= my case), yours (= your case), hers (= her case), his (= his case), ours (= our case), theirs (= their case)。belong to (属于)。"
  },
  "98": {
    "id": 98,
    "unit": 5,
    "title": "Whose is it? / Whose are they?",
    "titleZh": "这是谁的？ / 这些是谁的？",
    "topic": "Possession Inquiries",
    "topicZh": "物主关系归属提问",
    "grammar": "Whose is this...? / It's mine/yours/his/hers/ours/theirs",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Whose is this pen?",
        "translation": "这支钢笔是谁的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's mine. Thank you.",
        "translation": "是我的。谢谢。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Whose glasses are these?",
        "translation": "这副眼镜是谁的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're his. He left them on the desk.",
        "translation": "是他的。他把它们落在桌子上了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Whose handbag is this? It's hers.",
        "zh": "这是谁的手提包？是她的。"
      },
      {
        "en": "Whose umbrella is that? It's mine.",
        "zh": "那是谁的伞？是我的。"
      },
      {
        "en": "Whose keys are these? They're ours.",
        "zh": "这些是谁的钥匙？是我们的。"
      },
      {
        "en": "Whose books are those? They're theirs.",
        "zh": "那些是谁的书？是他们的。"
      }
    ],
    "words": [
      {
        "word": "ours",
        "phonetic": "/ˈaʊəz/",
        "meaning": "pron. 我们的",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "The classroom is ours.",
        "sampleTranslation": "教室是我们的。"
      },
      {
        "word": "theirs",
        "phonetic": "/ðeəz/",
        "meaning": "pron. 他们的",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "The car is theirs.",
        "sampleTranslation": "那辆车是他们的。"
      }
    ],
    "grammarNote": "Whose 引导特殊疑问句提问归属：Whose is this...? / Whose are these...?"
  },
  "99": {
    "id": 99,
    "unit": 5,
    "title": "Owl Hall",
    "titleZh": "猫头鹰庄园",
    "topic": "Hotel Booking & Room Preferences",
    "topicZh": "旅馆入住与房间偏好",
    "grammar": "I'd like a room / Which one do you prefer? / Comparatives",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "RECEPTIONIST",
        "text": "Good evening, sir. Can I help you?",
        "translation": "晚上好，先生。有什么我可以帮您的吗？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. CRANE",
        "text": "Good evening. I'd like a room for the night, please.",
        "translation": "晚上好。我想订一间今晚的房间。",
        "avatar": "👨"
      },
      {
        "speaker": "RECEPTIONIST",
        "text": "Do you want a single room or a double room?",
        "translation": "您想要单人间还是双人间？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. CRANE",
        "text": "A single room, please.",
        "translation": "单人间。",
        "avatar": "👨"
      },
      {
        "speaker": "RECEPTIONIST",
        "text": "We have Room 12 on the first floor and Room 24 on the second floor. Room 12 is larger, but Room 24 is quieter.",
        "translation": "我们一楼有12号房，二楼有24号房。12号房大一些，但24号房更安静。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "MR. CRANE",
        "text": "I'll take Room 24. I prefer a quiet room.",
        "translation": "我要24号房。我喜欢安静的房间。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "I'd like a room for the night, please.",
        "zh": "我想订一间今晚的房间。"
      },
      {
        "en": "Do you want a single room or a double room?",
        "zh": "您想要单人间还是双人间？"
      },
      {
        "en": "Room 12 is larger, but Room 24 is quieter.",
        "zh": "12号房大一些，但24号房更安静。"
      },
      {
        "en": "I'll take Room 24. I prefer a quiet room.",
        "zh": "我要24号房。我喜欢安静的房间。"
      }
    ],
    "words": [
      {
        "word": "hall",
        "phonetic": "/hɔːl/",
        "meaning": "n. 大厅，庄园",
        "mcItem": "Bricks",
        "mcItemIcon": "🏰",
        "sampleSentence": "In the hotel hall.",
        "sampleTranslation": "在旅馆大厅里。"
      },
      {
        "word": "double",
        "phonetic": "/ˈdʌbl/",
        "meaning": "adj. 双人的，双重的",
        "mcItem": "Red Bed",
        "mcItemIcon": "🛏️",
        "sampleSentence": "A double room.",
        "sampleTranslation": "双人间。"
      },
      {
        "word": "quiet",
        "phonetic": "/ˈkwaɪət/",
        "meaning": "adj. 安静的",
        "mcItem": "Wool",
        "mcItemIcon": "🤫",
        "sampleSentence": "A quiet place.",
        "sampleTranslation": "安静的地方。"
      },
      {
        "word": "prefer",
        "phonetic": "/prɪˈfɜː/",
        "meaning": "v. 更喜欢",
        "mcItem": "Heart",
        "mcItemIcon": "❤️",
        "sampleSentence": "I prefer tea to coffee.",
        "sampleTranslation": "相比咖啡我更喜欢茶。"
      }
    ],
    "grammarNote": "形容词比较级：large -> larger, quiet -> quieter。I'd like (= I would like) 表示客气意愿。prefer 表示“更喜欢”。"
  },
  "100": {
    "id": 100,
    "unit": 5,
    "title": "Which one do you want?",
    "titleZh": "你要哪一个？",
    "topic": "Comparatives & Superlatives",
    "topicZh": "比较级与最高级选择",
    "grammar": "Which one is better/cheaper/larger? This one is...-er than that one.",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Which room do you want?",
        "translation": "你想要哪个房间？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I want the smaller one. It's cheaper.",
        "translation": "我想要小的那间。更便宜些。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Which car is faster?",
        "translation": "哪辆车更快？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The red one is faster than the blue one.",
        "translation": "红色的那辆比蓝色的那辆快。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "This coat is warmer than that one.",
        "zh": "这件大衣比那件更保暖。"
      },
      {
        "en": "This suitcase is heavier than mine.",
        "zh": "这个箱子比我的更沉。"
      },
      {
        "en": "That bicycle is cheaper than this one.",
        "zh": "那辆自行车比这辆便宜。"
      },
      {
        "en": "My brother is taller than me.",
        "zh": "我哥哥比我高。"
      }
    ],
    "words": [
      {
        "word": "cheaper",
        "phonetic": "/ˈtʃiːpə/",
        "meaning": "adj. 更便宜的",
        "mcItem": "Emerald",
        "mcItemIcon": "🏷️",
        "sampleSentence": "It is cheaper.",
        "sampleTranslation": "它更便宜。"
      },
      {
        "word": "heavier",
        "phonetic": "/ˈheviə/",
        "meaning": "adj. 更重的",
        "mcItem": "Anvil",
        "mcItemIcon": "⚖️",
        "sampleSentence": "Heavier box.",
        "sampleTranslation": "更重的箱子。"
      },
      {
        "word": "faster",
        "phonetic": "/ˈfɑːstə/",
        "meaning": "adj. 更快的",
        "mcItem": "Sugar",
        "mcItemIcon": "⚡",
        "sampleSentence": "Run faster.",
        "sampleTranslation": "跑得更快。"
      }
    ],
    "grammarNote": "比较级基本句型：A + be + 形容词比较级 + than + B (This room is cheaper than that one)。"
  },
  "101": {
    "id": 101,
    "unit": 5,
    "title": "A card from Jimmy",
    "titleZh": "一张吉米寄来的明信片",
    "topic": "Postcards & Indirect Speech",
    "topicZh": "明信片与间接引语转述",
    "grammar": "宾语从句 / He says that he is having a good time",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "PENNY",
        "text": "Look, Mum! Here's a postcard from Jimmy.",
        "translation": "瞧，妈妈！这是吉米寄来的一张明信片。",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "Oh, wonderful! What does he say?",
        "translation": "哦，太棒了！他在上面说什么了？",
        "avatar": "👩"
      },
      {
        "speaker": "PENNY",
        "text": "He says he is having a great time in Scotland. The weather is sunny and warm.",
        "translation": "他说他在苏格兰玩得非常开心。天气晴朗暖和。",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "Does he say when he will be back?",
        "translation": "他说他什么时候回来吗？",
        "avatar": "👩"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, he says he will come back next Friday afternoon.",
        "translation": "说了，他说他下周五下午回来。",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "That's good. We all miss him very much.",
        "translation": "太好了。我们大家都非常想念他。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Here's a postcard from Jimmy. What does he say?",
        "zh": "这是吉米寄来的一张明信片。他说了什么？"
      },
      {
        "en": "He says that he is having a great time in Scotland.",
        "zh": "他说他在苏格兰玩得非常开心。"
      },
      {
        "en": "He says that the weather is sunny and warm.",
        "zh": "他说天气晴朗暖和。"
      },
      {
        "en": "He says that he will come back next Friday.",
        "zh": "他说他下周五回来。"
      }
    ],
    "words": [
      {
        "word": "card",
        "phonetic": "/kɑːd/",
        "meaning": "n. 明信片，卡片",
        "mcItem": "Paper",
        "mcItemIcon": "💌",
        "sampleSentence": "Send a card.",
        "sampleTranslation": "寄一张明信片。"
      },
      {
        "word": "Scotland",
        "phonetic": "/ˈskɒtlənd/",
        "meaning": "n. 苏格兰",
        "mcItem": "Banner",
        "mcItemIcon": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "sampleSentence": "He lives in Scotland.",
        "sampleTranslation": "他住在苏格兰。"
      },
      {
        "word": "sunny",
        "phonetic": "/ˈsʌni/",
        "meaning": "adj. 阳光充足的，晴朗的",
        "mcItem": "Sun",
        "mcItemIcon": "☀️",
        "sampleSentence": "A sunny day.",
        "sampleTranslation": "晴朗的一天。"
      },
      {
        "word": "miss",
        "phonetic": "/mɪs/",
        "meaning": "v. 想念，错过",
        "mcItem": "Heart",
        "mcItemIcon": "🥺",
        "sampleSentence": "I miss you.",
        "sampleTranslation": "我想念你。"
      }
    ],
    "grammarNote": "宾语从句：主句 + that引导的从句 (He says that...)。主句是一般现在时，从句时态根据实际语意决定。"
  },
  "102": {
    "id": 102,
    "unit": 5,
    "title": "He says that ... / He tells me that ...",
    "titleZh": "他说…… / 他告诉我……",
    "topic": "Reporting Statements",
    "topicZh": "转述陈述句练习",
    "grammar": "He says that... / She says that...",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What does he say?",
        "translation": "他说什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He says that he is tired and wants to go to bed.",
        "translation": "他说他很累，想去睡觉。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What does she say?",
        "translation": "她说说什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She says that she has already done the washing.",
        "translation": "她说她已经洗好衣服了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He says that he feels much better today.",
        "zh": "他说他今天感觉好多了。"
      },
      {
        "en": "She says that she will arrive tomorrow.",
        "zh": "她说她明天会到达。"
      },
      {
        "en": "They say that they are very busy.",
        "zh": "他们说他们非常忙。"
      },
      {
        "en": "He tells me that he likes English.",
        "zh": "他告诉我他喜欢英语。"
      }
    ],
    "words": [],
    "grammarNote": "say that... (说……), tell somebody that... (告诉某人……)。that 在口语中经常省略。"
  },
  "103": {
    "id": 103,
    "unit": 5,
    "title": "The French test",
    "titleZh": "法语考试",
    "topic": "School Exams & Difficulty",
    "topicZh": "考试经历与难易程度评价",
    "grammar": "too + adj. + to do (太……而不能……) / enough 的位置",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "MOM",
        "text": "How was the French test today, Gary?",
        "translation": "加里，今天的法语考试怎么样？",
        "avatar": "👩"
      },
      {
        "speaker": "GARY",
        "text": "It was very difficult, Mum. I'm afraid I didn't pass.",
        "translation": "太难了，妈妈。恐怕我没及格。",
        "avatar": "👦"
      },
      {
        "speaker": "MOM",
        "text": "Why was it so difficult?",
        "translation": "为什么这么难呢？",
        "avatar": "👩"
      },
      {
        "speaker": "GARY",
        "text": "The exam was too long for us to finish in one hour. And the listening test was not clear enough.",
        "translation": "试卷太长了，我们一小时内根本做不完。而且听力测试也不够清楚。",
        "avatar": "👦"
      },
      {
        "speaker": "MOM",
        "text": "Don't worry too much. You studied hard. I'm sure you did your best.",
        "translation": "别太担心了。你学习很用功。我相信你已经尽力了。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "How was the French test today, Gary? It was very difficult.",
        "zh": "加里，今天的法语考试怎么样？太难了。"
      },
      {
        "en": "The exam was too long for us to finish in one hour.",
        "zh": "试卷太长，我们在一个小时内做不完。"
      },
      {
        "en": "The listening test was not clear enough.",
        "zh": "听力测试不够清楚。"
      },
      {
        "en": "I'm sure you did your best.",
        "zh": "我相信你已经尽力了。"
      }
    ],
    "words": [
      {
        "word": "test",
        "phonetic": "/test/",
        "meaning": "n. 测验，考试",
        "mcItem": "Book",
        "mcItemIcon": "📝",
        "sampleSentence": "A math test.",
        "sampleTranslation": "数学测验。"
      },
      {
        "word": "difficult",
        "phonetic": "/ˈdɪfɪkəlt/",
        "meaning": "adj. 困难的",
        "mcItem": "Obsidian",
        "mcItemIcon": "🤯",
        "sampleSentence": "A difficult question.",
        "sampleTranslation": "难题。"
      },
      {
        "word": "pass",
        "phonetic": "/pɑːs/",
        "meaning": "v. 通过，及格",
        "mcItem": "Emerald",
        "mcItemIcon": "✅",
        "sampleSentence": "Pass the exam.",
        "sampleTranslation": "通过考试。"
      },
      {
        "word": "enough",
        "phonetic": "/ɪˈnʌf/",
        "meaning": "adj. & adv. 足够地，充足的",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "👌",
        "sampleSentence": "Good enough.",
        "sampleTranslation": "足够好。"
      }
    ],
    "grammarNote": "句型结构：too + 形容词 + to do (太……以至于不能……)；形容词 + enough + to do (足够……可以做……)。注意 enough 放在形容词之后。"
  },
  "104": {
    "id": 104,
    "unit": 5,
    "title": "Too ... / ... enough",
    "titleZh": "太…… / 足够……",
    "topic": "Adjective Degree Modifiers",
    "topicZh": "程度副词 too 与 enough 应用",
    "grammar": "too + adj. / adj. + enough",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Can you carry this box?",
        "translation": "你能搬动这个箱子吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it is too heavy for me to carry.",
        "translation": "不能，太沉了，我搬不动。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is the water warm enough to swim?",
        "translation": "水温够暖和可以游泳吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, it is warm enough.",
        "translation": "是的，够暖和了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The tea is too hot to drink.",
        "zh": "茶太烫了，没法喝。"
      },
      {
        "en": "He is old enough to go to school.",
        "zh": "他年龄够大了，可以上学了。"
      },
      {
        "en": "This coat is too small for him.",
        "zh": "这件大衣对他来说太小了。"
      },
      {
        "en": "The room is big enough for ten people.",
        "zh": "这个房间足够大，能容纳十个人。"
      }
    ],
    "words": [],
    "grammarNote": "too...to 表示否定含义；...enough to 表示肯定能力或条件允许。"
  },
  "105": {
    "id": 105,
    "unit": 5,
    "title": "Full of mistakes",
    "titleZh": "全是错误",
    "topic": "Work Review & Adverbs of Manner",
    "topicZh": "工作审查与方式副词",
    "grammar": "Adverbs formed with -ly (slowly, carefully, badly, beautifully) & irregular adverbs (well, fast, hard)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "THE BOSS",
        "text": "Come in, Sandra. Look at this letter.",
        "translation": "进来，桑德拉。看看这封信。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "SANDRA",
        "text": "Yes, sir? What's wrong with it?",
        "translation": "什么事，先生？有什么问题吗？",
        "avatar": "👩"
      },
      {
        "speaker": "THE BOSS",
        "text": "It's full of mistakes! You typed it too quickly and carelessly.",
        "translation": "全是错误！你打得太快、太粗心了。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "SANDRA",
        "text": "I'm very sorry, sir. I was in a hurry.",
        "translation": "非常抱歉，先生。我当时很着急。",
        "avatar": "👩"
      },
      {
        "speaker": "THE BOSS",
        "text": "You must type it again, and please do it slowly and carefully this time.",
        "translation": "你必须重新打一遍，这次请打得慢一些、仔细一些。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "SANDRA",
        "text": "Yes, sir. I'll type it correctly.",
        "translation": "好的，先生。我会正确打好的。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "It's full of mistakes! You typed it too quickly and carelessly.",
        "zh": "全是错误！你打得太快、太粗心了。"
      },
      {
        "en": "I'm very sorry, sir. I was in a hurry.",
        "zh": "非常抱歉，先生。我当时匆匆忙忙。"
      },
      {
        "en": "Please do it slowly and carefully this time.",
        "zh": "这次请慢一点、认真仔细地做。"
      },
      {
        "en": "She speaks English very well.",
        "zh": "她英语讲得非常好。"
      }
    ],
    "words": [
      {
        "word": "mistake",
        "phonetic": "/mɪˈsteɪk/",
        "meaning": "n. 错误",
        "mcItem": "Barrier",
        "mcItemIcon": "❌",
        "sampleSentence": "Make a mistake.",
        "sampleTranslation": "犯错误。"
      },
      {
        "word": "carefully",
        "phonetic": "/ˈkeəfəli/",
        "meaning": "adv. 仔细地，认真地",
        "mcItem": "Spyglass",
        "mcItemIcon": "🧐",
        "sampleSentence": "Listen carefully.",
        "sampleTranslation": "认真听。"
      },
      {
        "word": "carelessly",
        "phonetic": "/ˈkeələsli/",
        "meaning": "adv. 粗心地",
        "mcItem": "Anvil",
        "mcItemIcon": "🤦",
        "sampleSentence": "Drive carelessly.",
        "sampleTranslation": "粗心驾驶。"
      },
      {
        "word": "correctly",
        "phonetic": "/kəˈrektli/",
        "meaning": "adv. 正确地",
        "mcItem": "Emerald",
        "mcItemIcon": "✅",
        "sampleSentence": "Answer correctly.",
        "sampleTranslation": "正确回答。"
      },
      {
        "word": "slowly",
        "phonetic": "/ˈsləʊli/",
        "meaning": "adv. 慢慢地",
        "mcItem": "Turtle Helmet",
        "mcItemIcon": "🐢",
        "sampleSentence": "Walk slowly.",
        "sampleTranslation": "慢点走。"
      },
      {
        "word": "quickly",
        "phonetic": "/ˈkwɪkli/",
        "meaning": "adv. 迅速地",
        "mcItem": "Sugar",
        "mcItemIcon": "⚡",
        "sampleSentence": "Run quickly.",
        "sampleTranslation": "快跑。"
      }
    ],
    "grammarNote": "副词修饰动词：形容词+ly构成副词 (slow->slowly, careful->carefully)。不规则副词：good->well, fast->fast, hard->hard。"
  },
  "106": {
    "id": 106,
    "unit": 5,
    "title": "How did he/she do it?",
    "titleZh": "他/她是怎么做的？",
    "topic": "Adverb Drill Practice",
    "topicZh": "方式副词动作训练",
    "grammar": "How did he do it? / He did it carefully/badly/well",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "How did he drive?",
        "translation": "他开车开得怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He drove very dangerously.",
        "translation": "他开得很危险。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "How did she sing?",
        "translation": "她唱得怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She sang beautifully.",
        "translation": "她唱得非常美妙。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He did his homework carelessly.",
        "zh": "他做作业很粗心。"
      },
      {
        "en": "She plays the piano wonderfully.",
        "zh": "她钢琴弹得极好。"
      },
      {
        "en": "They worked hard all day.",
        "zh": "他们整天都很努力地工作。"
      },
      {
        "en": "He ran fast and won the race.",
        "zh": "他跑得很快并赢得了比赛。"
      }
    ],
    "words": [],
    "grammarNote": "How 引导疑问句提问动作方式：How did he do it? -> He did it well/badly/slowly。"
  },
  "107": {
    "id": 107,
    "unit": 5,
    "title": "It's too small.",
    "titleZh": "太小了。",
    "topic": "Clothing Fit & Comparatives",
    "topicZh": "服装尺码与更合适款式",
    "grammar": "Comparatives with -er and more: larger, smaller, more comfortable",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "ASSISTANT",
        "text": "Do you like that blue dress, madam?",
        "translation": "女士，您喜欢那件蓝色的连衣裙吗？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "CUSTOMER",
        "text": "Yes, I like the colour, but it's too small for me.",
        "translation": "喜欢，我喜欢这颜色，但对我来说太小了。",
        "avatar": "👩"
      },
      {
        "speaker": "ASSISTANT",
        "text": "Would you like to try this green one? It's a larger size.",
        "translation": "您想试试这件绿色的吗？是大一号的。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "CUSTOMER",
        "text": "Yes, please. Oh, this one fits much better.",
        "translation": "好的。噢，这件合身多了。",
        "avatar": "👩"
      },
      {
        "speaker": "ASSISTANT",
        "text": "And it is more comfortable than the blue one.",
        "translation": "而且它比那件蓝色的更舒服。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "CUSTOMER",
        "text": "How much is it? I'll buy it.",
        "translation": "多少钱？我买了。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "I like the colour, but it's too small for me.",
        "zh": "我喜欢这颜色，但对我来说太小了。"
      },
      {
        "en": "Would you like to try this green one? It's a larger size.",
        "zh": "您想试试这件绿色的吗？是大一号的。"
      },
      {
        "en": "This one fits much better.",
        "zh": "这件合身多了。"
      },
      {
        "en": "It is more comfortable than the blue one.",
        "zh": "它比那件蓝色的更舒服。"
      }
    ],
    "words": [
      {
        "word": "dress",
        "phonetic": "/dres/",
        "meaning": "n. 连衣裙",
        "mcItem": "Leather Tunic",
        "mcItemIcon": "👗",
        "sampleSentence": "A blue dress.",
        "sampleTranslation": "蓝色连衣裙。"
      },
      {
        "word": "fit",
        "phonetic": "/fɪt/",
        "meaning": "v. 合身，适合",
        "mcItem": "Iron Chestplate",
        "mcItemIcon": "👌",
        "sampleSentence": "It fits well.",
        "sampleTranslation": "它很合身。"
      }
    ],
    "grammarNote": "多音节形容词比较级加 more：more comfortable, more expensive, more beautiful。"
  },
  "108": {
    "id": 108,
    "unit": 5,
    "title": "How do they compare?",
    "titleZh": "它们如何比较？",
    "topic": "Comparative Forms Drill",
    "topicZh": "单音节与多音节比较级",
    "grammar": "A is more ... than B / A is ...-er than B",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Which film is more interesting?",
        "translation": "哪部电影更有趣？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The second one is more interesting than the first.",
        "translation": "第二部比第一部更有趣。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Which book is more difficult?",
        "translation": "哪本书更难？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "This grammar book is more difficult.",
        "translation": "这本语法书更难。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "This watch is more expensive than that one.",
        "zh": "这块手表比那块更贵。"
      },
      {
        "en": "Plane travel is faster and more expensive than train travel.",
        "zh": "坐飞机比坐火车更快、更贵。"
      },
      {
        "en": "This sofa is more comfortable than that chair.",
        "zh": "这张沙发比那把椅子更舒服。"
      }
    ],
    "words": [],
    "grammarNote": "比较级构成总结：单音节词+er (taller, faster)；多音节词+more (more expensive, more interesting)。"
  },
  "109": {
    "id": 109,
    "unit": 5,
    "title": "A good idea",
    "titleZh": "好主意",
    "topic": "Weekend Ideas & Suggestions",
    "topicZh": "周末出游建议与商量",
    "grammar": "Shall we...? / Let's... / Why don't we...?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "CHARLOTTE",
        "text": "Shall we go for a picnic this Saturday, Jane?",
        "translation": "简，我们这个星期六去野餐好吗？",
        "avatar": "👩"
      },
      {
        "speaker": "JANE",
        "text": "That's a good idea! Where shall we go?",
        "translation": "好主意！我们去哪儿呢？",
        "avatar": "👧"
      },
      {
        "speaker": "CHARLOTTE",
        "text": "Shall we go to the lake in the woods? It's very peaceful there.",
        "translation": "我们去树林里的湖边好吗？那里很宁静。",
        "avatar": "👩"
      },
      {
        "speaker": "JANE",
        "text": "Yes, let's do that. What food shall we take?",
        "translation": "好，就这么办。我们带什么吃的？",
        "avatar": "👧"
      },
      {
        "speaker": "CHARLOTTE",
        "text": "Let's take some sandwiches, boiled eggs, and some fruit juice.",
        "translation": "我们带些三明治、熟鸡蛋和果汁吧。",
        "avatar": "👩"
      },
      {
        "speaker": "JANE",
        "text": "Great! I'll make the sandwiches.",
        "translation": "太棒了！我来做三明治。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Shall we go for a picnic this Saturday? That's a good idea!",
        "zh": "我们这个星期六去野餐好吗？好主意！"
      },
      {
        "en": "Where shall we go? Shall we go to the lake in the woods?",
        "zh": "我们去哪儿呢？我们去树林里的湖边好吗？"
      },
      {
        "en": "What food shall we take? Let's take some sandwiches.",
        "zh": "我们带什么吃的？我们带些三明治吧。"
      },
      {
        "en": "Great! I'll make the sandwiches.",
        "zh": "太棒了！我来做三明治。"
      }
    ],
    "words": [
      {
        "word": "idea",
        "phonetic": "/aɪˈdɪə/",
        "meaning": "n. 主意，想法",
        "mcItem": "Beacon",
        "mcItemIcon": "💡",
        "sampleSentence": "A good idea.",
        "sampleTranslation": "好主意。"
      },
      {
        "word": "picnic",
        "phonetic": "/ˈpɪknɪk/",
        "meaning": "n. 野餐",
        "mcItem": "Bread",
        "mcItemIcon": "🧺",
        "sampleSentence": "Go for a picnic.",
        "sampleTranslation": "去野餐。"
      },
      {
        "word": "lake",
        "phonetic": "/leɪk/",
        "meaning": "n. 湖",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🏞️",
        "sampleSentence": "Swim in the lake.",
        "sampleTranslation": "在湖里游泳。"
      },
      {
        "word": "wood",
        "phonetic": "/wʊd/",
        "meaning": "n. 树林 (常用woods)",
        "mcItem": "Oak Log",
        "mcItemIcon": "🌲",
        "sampleSentence": "Walk in the woods.",
        "sampleTranslation": "在树林里散步。"
      },
      {
        "word": "sandwich",
        "phonetic": "/ˈsænwɪtʃ/",
        "meaning": "n. 三明治",
        "mcItem": "Bread",
        "mcItemIcon": "🥪",
        "sampleSentence": "Ham sandwiches.",
        "sampleTranslation": "火腿三明治。"
      }
    ],
    "grammarNote": "征求意见句型：Shall we + 动词原形? / Let's + 动词原形。回复表达赞同：That's a good idea! / Great!"
  },
  "110": {
    "id": 110,
    "unit": 5,
    "title": "Shall we ...? / Let's ...",
    "titleZh": "我们……好吗？ / 让我们……",
    "topic": "Making Suggestions",
    "topicZh": "提出建议与活动倡议",
    "grammar": "Shall we + verb / Let's + verb",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Shall we go to the cinema tonight?",
        "translation": "今晚我们去看电影好吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, let's go. Which film shall we see?",
        "translation": "好啊，去吧。我们看哪部电影？",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Shall we have dinner first?",
        "translation": "我们先吃晚饭好吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Let's eat at that Italian restaurant.",
        "translation": "我们在那家意大利餐馆吃吧。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Shall we have a cup of coffee?",
        "zh": "我们喝杯咖啡好吗？"
      },
      {
        "en": "Let's go for a walk in the park.",
        "zh": "我们去公园散散步吧。"
      },
      {
        "en": "Shall we invite our neighbours?",
        "zh": "我们邀请邻居们好吗？"
      },
      {
        "en": "Let's start the meeting now.",
        "zh": "我们现在开始开会吧。"
      }
    ],
    "words": [],
    "grammarNote": "情态动词 shall 在第一人称疑问句中用于征求对方意见：Shall I / Shall we...?"
  },
  "111": {
    "id": 111,
    "unit": 5,
    "title": "The most expensive model",
    "titleZh": "最昂贵的型号",
    "topic": "Electronics Shopping & Superlatives",
    "topicZh": "选购家电与最高级商品",
    "grammar": "Superlative degree: the most expensive, the cheapest, the best",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "CUSTOMER",
        "text": "I want to buy a television set. Can you show me some models?",
        "translation": "我想买一台电视机。你能给我看几种型号吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SALESMAN",
        "text": "Certainly, sir. This model here is the cheapest one in the shop.",
        "translation": "当然可以，先生。这边的这款是店里最便宜的型号。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "CUSTOMER",
        "text": "Is it good quality?",
        "translation": "质量好吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SALESMAN",
        "text": "It's not bad, but this one over here has the best picture quality. It is the most expensive model, however.",
        "translation": "还不错，但是那边的这台画面质量最好。不过它是最贵的型号。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "CUSTOMER",
        "text": "The price is too high. Do you have something in between?",
        "translation": "价格太高了。你们有介于两者之间的吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SALESMAN",
        "text": "Yes, this middle one is our most popular model. It is very reliable.",
        "translation": "有，中间这台是我们最畅销的型号。它非常耐用可靠。",
        "avatar": "👨‍💼"
      }
    ],
    "sentences": [
      {
        "en": "This model here is the cheapest one in the shop.",
        "zh": "这里的这个型号是店里最便宜的。"
      },
      {
        "en": "This one has the best picture quality.",
        "zh": "这个画质最好。"
      },
      {
        "en": "It is the most expensive model, however.",
        "zh": "然而，它是最贵的型号。"
      },
      {
        "en": "This middle one is our most popular model.",
        "zh": "中间这台是我们最受欢迎的型号。"
      }
    ],
    "words": [
      {
        "word": "model",
        "phonetic": "/ˈmɒdl/",
        "meaning": "n. 型号，款式",
        "mcItem": "Armor Stand",
        "mcItemIcon": "📺",
        "sampleSentence": "The latest model.",
        "sampleTranslation": "最新型号。"
      },
      {
        "word": "expensive",
        "phonetic": "/ɪkˈspensɪv/",
        "meaning": "adj. 昂贵的",
        "mcItem": "Diamond",
        "mcItemIcon": "💎",
        "sampleSentence": "An expensive watch.",
        "sampleTranslation": "昂贵的手表。"
      },
      {
        "word": "quality",
        "phonetic": "/ˈkwɒləti/",
        "meaning": "n. 质量，品质",
        "mcItem": "Netherite Ingot",
        "mcItemIcon": "✨",
        "sampleSentence": "High quality.",
        "sampleTranslation": "高品质。"
      },
      {
        "word": "popular",
        "phonetic": "/ˈpɒpjələ/",
        "meaning": "adj. 受欢迎的，流行的",
        "mcItem": "Heart",
        "mcItemIcon": "🔥",
        "sampleSentence": "A popular song.",
        "sampleTranslation": "流行歌曲。"
      },
      {
        "word": "reliable",
        "phonetic": "/rɪˈlaɪəbl/",
        "meaning": "adj. 可靠的，耐用的",
        "mcItem": "Shield",
        "mcItemIcon": "🛡️",
        "sampleSentence": "A reliable car.",
        "sampleTranslation": "可靠的汽车。"
      }
    ],
    "grammarNote": "最高级构成：the + -est (the cheapest, the largest) 或 the most + 多音节形容词 (the most expensive, the most popular)。good -> better -> best。"
  },
  "112": {
    "id": 112,
    "unit": 5,
    "title": "Which one is the best/worst?",
    "titleZh": "哪一个是最好/最差的？",
    "topic": "Superlative Comparison Drill",
    "topicZh": "三者及以上最高级对比",
    "grammar": "the + superlative in/of ...",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Which is the tallest building in the city?",
        "translation": "哪座是城里最高的建筑？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The tower over there is the tallest.",
        "translation": "那边的那座塔是最高的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Which runner was the fastest in the race?",
        "translation": "比赛中哪个运动员跑得最快？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Number 5 was the fastest.",
        "translation": "5号选手是最快的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He is the oldest man in the village.",
        "zh": "他是村里年纪最大的人。"
      },
      {
        "en": "This is the most exciting book I have ever read.",
        "zh": "这是我读过的最令人激动的书。"
      },
      {
        "en": "January is usually the coldest month of the year.",
        "zh": "一月通常是一年中最冷的月份。"
      }
    ],
    "words": [],
    "grammarNote": "最高级常搭配范围介词短语：in + 单数地点/集体 (in the world, in the city), of + 复数/时间范围 (of the three, of the year)。"
  },
  "113": {
    "id": 113,
    "unit": 5,
    "title": "Small change",
    "titleZh": "零钱",
    "topic": "Bus Travel & Change Issues",
    "topicZh": "公交车买票与零钱矛盾",
    "grammar": "Indirect imperatives: He told me to... / He asked me not to...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "PASSENGER",
        "text": "Fares, please! One ticket to the station.",
        "translation": "买票！一张去火车站的票。",
        "avatar": "👨"
      },
      {
        "speaker": "CONDUCTOR",
        "text": "That's fifty pence, please.",
        "translation": "50便士，请付钱。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "PASSENGER",
        "text": "I'm sorry, I only have a twenty-pound note. Can you change it?",
        "translation": "不好意思，我只有一张20英镑的纸币。你能找开吗？",
        "avatar": "👨"
      },
      {
        "speaker": "CONDUCTOR",
        "text": "A twenty-pound note! I haven't got that much change. Haven't you got any small change?",
        "translation": "一张20英镑纸币！我可没那么多零钱找给你。你难道没有零钱吗？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "PASSENGER",
        "text": "I'm afraid I don't.",
        "translation": "恐怕没有。",
        "avatar": "👨"
      },
      {
        "speaker": "CONDUCTOR",
        "text": "The conductor told me to get off the bus if I couldn't pay exact change!",
        "translation": "售票员告诉我，如果我不能付正好的零钱就下车！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "One ticket to the station, please. That's fifty pence.",
        "zh": "一张去车站的票。50便士。"
      },
      {
        "en": "I only have a twenty-pound note. Can you change it?",
        "zh": "我只有一张20英镑的纸币。你能找开吗？"
      },
      {
        "en": "I haven't got that much change.",
        "zh": "我没有那么多零钱找。"
      },
      {
        "en": "He told me to get off the bus.",
        "zh": "他叫我下车。"
      }
    ],
    "words": [
      {
        "word": "fare",
        "phonetic": "/feə/",
        "meaning": "n. 车费，票价",
        "mcItem": "Emerald",
        "mcItemIcon": "🎫",
        "sampleSentence": "Bus fare.",
        "sampleTranslation": "公交车费。"
      },
      {
        "word": "conductor",
        "phonetic": "/kənˈdʌktə/",
        "meaning": "n. 售票员，列车长",
        "mcItem": "Player Head",
        "mcItemIcon": "👨‍✈️",
        "sampleSentence": "The bus conductor.",
        "sampleTranslation": "公交车售票员。"
      },
      {
        "word": "pence",
        "phonetic": "/pens/",
        "meaning": "n. 便士 (penny的复数)",
        "mcItem": "Iron Nugget",
        "mcItemIcon": "🪙",
        "sampleSentence": "Fifty pence.",
        "sampleTranslation": "50便士。"
      },
      {
        "word": "note",
        "phonetic": "/nəʊt/",
        "meaning": "n. 纸币",
        "mcItem": "Paper",
        "mcItemIcon": "💵",
        "sampleSentence": "A ten-pound note.",
        "sampleTranslation": "十英镑纸币。"
      }
    ],
    "grammarNote": "间接祈使句结构：tell / ask sb (not) to do sth (告诉/要求某人[不要]做某事)。"
  },
  "114": {
    "id": 114,
    "unit": 5,
    "title": "He told me to ... / He asked me not to ...",
    "titleZh": "他叫我…… / 他叫我不要……",
    "topic": "Reported Commands & Requests",
    "topicZh": "转述祈使命令与请求",
    "grammar": "tell sb to do / ask sb not to do",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What did the teacher say to you?",
        "translation": "老师对你说什么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She told me to open my book and read lesson one.",
        "translation": "她叫我打开书读第一课。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What did the doctor tell him?",
        "translation": "医生对他说什么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The doctor asked him not to smoke.",
        "translation": "医生叫他不要抽烟。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He told me to wait here.",
        "zh": "他叫我在这里等。"
      },
      {
        "en": "She asked me to close the window.",
        "zh": "她请我关上窗户。"
      },
      {
        "en": "The policeman told him not to drive so fast.",
        "zh": "警察叫他不要开得那么快。"
      },
      {
        "en": "Mother told the boy to wash his hands.",
        "zh": "妈妈叫男孩去洗手。"
      }
    ],
    "words": [],
    "grammarNote": "祈使句变间接引语：动词原形变带 to 的动词不定式 (to do)；Don't do 变 not to do。"
  },
  "115": {
    "id": 115,
    "unit": 5,
    "title": "Knock, knock!",
    "titleZh": "咚咚敲门声！",
    "topic": "Visitors & Indefinite Pronouns",
    "topicZh": "访客与不定代词应用",
    "grammar": "Indefinite pronouns: someone, anyone, no one, everyone, nothing, everything",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "HELEN",
        "text": "Listen! Someone is knocking at the door.",
        "translation": "听！有人在敲门。",
        "avatar": "👩"
      },
      {
        "speaker": "JIM",
        "text": "I didn't hear anything.",
        "translation": "我什么也没听见。",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "There it is again! Knock, knock! Can you go and see who it is?",
        "translation": "又响了！咚咚！你能去看看是谁吗？",
        "avatar": "👩"
      },
      {
        "speaker": "JIM",
        "text": "All right. ... There's no one there. Everyone in the building is asleep.",
        "translation": "好吧。……门外一个人也没有。这栋楼里的所有人都在睡觉呢。",
        "avatar": "👨"
      },
      {
        "speaker": "HELEN",
        "text": "Look at the window, Jim! It was only the tree branch hitting the glass in the wind!",
        "translation": "瞧窗户，吉姆！只是风吹树枝拍打玻璃的声音！",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Listen! Someone is knocking at the door.",
        "zh": "听！有人在敲门。"
      },
      {
        "en": "I didn't hear anything.",
        "zh": "我什么也没听见。"
      },
      {
        "en": "There's no one there.",
        "zh": "那里一个人也没有。"
      },
      {
        "en": "Everyone in the building is asleep.",
        "zh": "大楼里的所有人都在睡觉。"
      }
    ],
    "words": [
      {
        "word": "knock",
        "phonetic": "/nɒk/",
        "meaning": "v. & n. 敲，敲击",
        "mcItem": "Oak Door",
        "mcItemIcon": "🚪",
        "sampleSentence": "Knock at the door.",
        "sampleTranslation": "敲门。"
      },
      {
        "word": "someone",
        "phonetic": "/ˈsʌmwʌn/",
        "meaning": "pron. 有人，某人",
        "mcItem": "Player Head",
        "mcItemIcon": "👤",
        "sampleSentence": "Someone is here.",
        "sampleTranslation": "有人在这儿。"
      },
      {
        "word": "anyone",
        "phonetic": "/ˈeniwʌn/",
        "meaning": "pron. 任何人",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "Is anyone there?",
        "sampleTranslation": "有人在吗？"
      },
      {
        "word": "no one",
        "phonetic": "/ˈnəʊ wʌn/",
        "meaning": "pron. 没有人",
        "mcItem": "Barrier",
        "mcItemIcon": "🚫",
        "sampleSentence": "No one knows.",
        "sampleTranslation": "没有人知道。"
      },
      {
        "word": "everyone",
        "phonetic": "/ˈevriwʌn/",
        "meaning": "pron. 每个人，大家",
        "mcItem": "Player Head",
        "mcItemIcon": "👨‍👩‍👧‍👦",
        "sampleSentence": "Everyone is happy.",
        "sampleTranslation": "大家都很快乐。"
      },
      {
        "word": "asleep",
        "phonetic": "/əˈsliːp/",
        "meaning": "adj. 睡着的",
        "mcItem": "Bed",
        "mcItemIcon": "😴",
        "sampleSentence": "Fast asleep.",
        "sampleTranslation": "熟睡。"
      }
    ],
    "grammarNote": "复合不定代词用法：someone/something (肯定句), anyone/anything (疑问/否定句), no one/nothing (表完全否定), everyone/everything (表全体)。作主语时谓语动词用单数形式。"
  },
  "116": {
    "id": 116,
    "unit": 5,
    "title": "Every / Some / Any / No",
    "titleZh": "每个 / 某个 / 任何 / 没有",
    "topic": "Indefinite Compounds Drill",
    "topicZh": "不定复合代词分类与变换",
    "grammar": "Indefinite pronouns compound chart",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Did anyone call while I was out?",
        "translation": "我出去时有人打电话吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, no one called. Everything was quiet.",
        "translation": "没有，没人打。一切都很安静。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is there anything to eat in the fridge?",
        "translation": "冰箱里有东西吃吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "There's something on the top shelf.",
        "translation": "最上面那层有些东西。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Someone left an umbrella here.",
        "zh": "有人把雨伞落在这里了。"
      },
      {
        "en": "I looked everywhere, but found nothing.",
        "zh": "我到处找了，但什么也没找到。"
      },
      {
        "en": "Is there anybody in the office?",
        "zh": "办公室里有人吗？"
      },
      {
        "en": "Nobody knows the answer.",
        "zh": "没有人知道答案。"
      }
    ],
    "words": [],
    "grammarNote": "代词与副词词根组合：-one / -body (指人), -thing (指物), -where (指地点)。"
  },
  "117": {
    "id": 117,
    "unit": 5,
    "title": "Tommy's breakfast",
    "titleZh": "汤米的早餐",
    "topic": "Past Perfect & Morning Routine",
    "topicZh": "早晨起床与过去完成时",
    "grammar": "Past Perfect: had + past participle (过去的过去)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "MOTHER",
        "text": "Tommy! Come downstairs and eat your breakfast! It's eight o'clock!",
        "translation": "汤米！下楼来吃早餐！已经8点了！",
        "avatar": "👩"
      },
      {
        "speaker": "TOMMY",
        "text": "I'm coming, Mum!",
        "translation": "我来了，妈妈！",
        "avatar": "👦"
      },
      {
        "speaker": "MOTHER",
        "text": "Have you washed your hands and face?",
        "translation": "你洗过手和脸了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "TOMMY",
        "text": "Yes, I had washed them before I came downstairs.",
        "translation": "洗过了，我下楼之前就已经洗好了。",
        "avatar": "👦"
      },
      {
        "speaker": "MOTHER",
        "text": "Good boy. Now drink your warm milk.",
        "translation": "好孩子。现在把温牛奶喝了吧。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Come downstairs and eat your breakfast!",
        "zh": "下楼来吃早餐！"
      },
      {
        "en": "I had washed them before I came downstairs.",
        "zh": "在我下楼之前，我已经洗好了。"
      },
      {
        "en": "The train had left when we arrived at the station.",
        "zh": "当我们到达车站时，火车已经开走了。"
      }
    ],
    "words": [
      {
        "word": "downstairs",
        "phonetic": "/ˌdaʊnˈsteəz/",
        "meaning": "adv. 往楼下，在楼下",
        "mcItem": "Ladder",
        "mcItemIcon": "👇",
        "sampleSentence": "Go downstairs.",
        "sampleTranslation": "下楼。"
      }
    ],
    "grammarNote": "过去完成时：had + 过去分词。表示在过去某一时间或动作之前已经发生或完成的动作（过去的过去）。"
  },
  "118": {
    "id": 118,
    "unit": 5,
    "title": "What had happened?",
    "titleZh": "发生了什么？",
    "topic": "Past Perfect Situations",
    "topicZh": "先后发生过去的动作",
    "grammar": "When A happened, B had already done",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Why was he late?",
        "translation": "他为什么迟到了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Because his alarm clock hadn't gone off.",
        "translation": "因为他的闹钟没有响。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Did you see the beginning of the movie?",
        "translation": "你看到电影开头了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it had already begun before we entered the cinema.",
        "translation": "没有，我们进电影院前它就已经开始了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "She had already cooked dinner when her husband returned.",
        "zh": "当她丈夫回来时，她已经做好了晚饭。"
      },
      {
        "en": "They had finished the test before the bell rang.",
        "zh": "在铃声响之前，他们就已经做完了试卷。"
      }
    ],
    "words": [],
    "grammarNote": "时间对比：较早发生的动作用过去完成时 (had done)，较晚发生的动作用一般过去时 (did)。"
  },
  "119": {
    "id": 119,
    "unit": 5,
    "title": "A true story",
    "titleZh": "一个真实的故事",
    "topic": "Anecdotes & Narrative",
    "topicZh": "奇闻故事与过去时态交织",
    "grammar": "Past Simple & Past Perfect in storytelling",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "GEORGE",
        "text": "Do you like stories, Arthur? I'll tell you a true story.",
        "translation": "亚瑟，你喜欢听故事吗？我给你讲一个真实的故事。",
        "avatar": "👨"
      },
      {
        "speaker": "ARTHUR",
        "text": "Yes, please. Go ahead.",
        "translation": "好啊，讲吧。",
        "avatar": "👨"
      },
      {
        "speaker": "GEORGE",
        "text": "A thief entered a house at night while the family were sleeping. He stole all their jewellery.",
        "translation": "一个贼在深夜潜入了一户人家，当时全家人都在睡觉。他偷走了他们所有的珠宝首饰。",
        "avatar": "👨"
      },
      {
        "speaker": "GEORGE",
        "text": "As he was leaving through the window, he dropped his wallet containing his identity card!",
        "translation": "当他正从窗户逃走时，他掉下了装有自己身份证的钱包！",
        "avatar": "👨"
      },
      {
        "speaker": "ARTHUR",
        "text": "How foolish! The police must have caught him immediately!",
        "translation": "太蠢了！警察肯定立刻就把他抓住了！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "I'll tell you a true story.",
        "zh": "我给你讲一个真实的故事。"
      },
      {
        "en": "A thief entered a house at night while the family were sleeping.",
        "zh": "一个贼在夜间潜入了一户人家，当时全家都在睡觉。"
      },
      {
        "en": "He dropped his wallet containing his identity card!",
        "zh": "他掉下了装有自己身份证的钱包！"
      },
      {
        "en": "The police caught him very quickly.",
        "zh": "警察很快就抓获了他。"
      }
    ],
    "words": [
      {
        "word": "story",
        "phonetic": "/ˈstɔːri/",
        "meaning": "n. 故事",
        "mcItem": "Book",
        "mcItemIcon": "📖",
        "sampleSentence": "Tell a story.",
        "sampleTranslation": "讲故事。"
      },
      {
        "word": "thief",
        "phonetic": "/θiːf/",
        "meaning": "n. 贼 (pl. thieves)",
        "mcItem": "Iron Ingot",
        "mcItemIcon": "🦹",
        "sampleSentence": "A thief stole my bag.",
        "sampleTranslation": "小偷偷了我的包。"
      },
      {
        "word": "jewellery",
        "phonetic": "/ˈdʒuːəlri/",
        "meaning": "n. 珠宝首饰",
        "mcItem": "Diamond",
        "mcItemIcon": "💍",
        "sampleSentence": "Valuable jewellery.",
        "sampleTranslation": "贵重的珠宝。"
      },
      {
        "word": "wallet",
        "phonetic": "/ˈwɒlɪt/",
        "meaning": "n. 钱包",
        "mcItem": "Bundle",
        "mcItemIcon": "👛",
        "sampleSentence": "Drop a wallet.",
        "sampleTranslation": "掉钱包。"
      }
    ],
    "grammarNote": "故事叙述中的时态融合：一般过去时叙述主干，过去进行时描写背景，过去完成时补充前情。"
  },
  "120": {
    "id": 120,
    "unit": 5,
    "title": "It had happened before ...",
    "titleZh": "以前发生过……",
    "topic": "Past Perfect Review",
    "topicZh": "过去完成时综合操练",
    "grammar": "had done before / after",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Had you ever visited England before 2000?",
        "translation": "在2000年之前你曾访问过英国吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, I had never visited England before that year.",
        "translation": "没有，在那一年之前我从未去过英国。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He had learned French before he went to Paris.",
        "zh": "在他去巴黎之前，他就已经学过法语了。"
      },
      {
        "en": "The fire had destroyed the building before firefighters arrived.",
        "zh": "在消防员到达之前，大火就已经摧毁了建筑。"
      }
    ],
    "words": [],
    "grammarNote": "过去完成时常用时间状语：by the time + 过去时间从句, before + 过去时间点/从句。"
  }
};
