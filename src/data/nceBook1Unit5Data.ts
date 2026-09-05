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
        "word": "whose",
        "phonetic": "/huːz/",
        "meaning": "代词：谁的",
        "mcItem": "Name Tag",
        "mcItemIcon": "🏷️",
        "sampleSentence": "Whose diamond sword is this on the table?",
        "sampleTranslation": "桌上这把钻石剑是谁的？"
      },
      {
        "word": "mine",
        "phonetic": "/maɪn/",
        "meaning": "名词性物主代词：我的",
        "mcItem": "Diamond Pickaxe",
        "mcItemIcon": "⛏️",
        "sampleSentence": "That iron armor is mine, not his.",
        "sampleTranslation": "那件铁盔甲是我的，不是他的。"
      },
      {
        "word": "yours",
        "phonetic": "/jɔːz/",
        "meaning": "名词性物主代词：你的；你们的",
        "mcItem": "Golden Apple",
        "mcItemIcon": "🍎",
        "sampleSentence": "Is this golden apple yours or hers?",
        "sampleTranslation": "这个金苹果是你的还是她的？"
      },
      {
        "word": "hers",
        "phonetic": "/hɜːz/",
        "meaning": "名词性物主代词：她的",
        "mcItem": "Emerald",
        "mcItemIcon": "💚",
        "sampleSentence": "The emerald pendant on the shelf is hers.",
        "sampleTranslation": "架子上的绿宝石吊坠是她的。"
      },
      {
        "word": "theirs",
        "phonetic": "/ðeəz/",
        "meaning": "名词性物主代词：他们的",
        "mcItem": "Chest",
        "mcItemIcon": "📦",
        "sampleSentence": "That wooden cottage belongs to them; it is theirs.",
        "sampleTranslation": "那座木屋归他们所有，是他们的。"
      }
    ],
    "grammarNote": "Whose 引导特殊疑问句提问归属：Whose is this...? / Whose are these...?"
  },
  "99": {
    "id": 99,
    "unit": 5,
    "title": "Ow!",
    "titleZh": "啊哟！",
    "topic": "Emergencies & Accidents",
    "topicZh": "意外摔倒与就医",
    "grammar": "Past events & indirect reporting: I slipped and fell / What's the matter?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "Pat",
        "text": "What's the matter, Andy?",
        "translation": "怎么了，安迪？",
        "avatar": "👩"
      },
      {
        "speaker": "Andy",
        "text": "Ow! I slipped and fell downstairs.",
        "translation": "哎呀！我滑倒从楼梯上摔下来了。",
        "avatar": "👦"
      },
      {
        "speaker": "Pat",
        "text": "Have you hurt yourself?",
        "translation": "你伤着了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "Andy",
        "text": "Yes, I think so. My back hurts badly.",
        "translation": "是的，我想是摔伤了。我的背疼得厉害。",
        "avatar": "👦"
      },
      {
        "speaker": "Pat",
        "text": "Can you stand up?",
        "translation": "你能站起来吗？",
        "avatar": "👩"
      },
      {
        "speaker": "Andy",
        "text": "No, I can't. Don't touch me!",
        "translation": "不，我站不起来。别碰我！",
        "avatar": "👦"
      },
      {
        "speaker": "Pat",
        "text": "Don't move. I will call the doctor immediately.",
        "translation": "别动。我马上打电话叫医生。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "What's the matter, Andy?",
        "zh": "怎么了，安迪？"
      },
      {
        "en": "I slipped and fell downstairs.",
        "zh": "我滑倒从楼梯上摔下来了。"
      },
      {
        "en": "My back hurts badly.",
        "zh": "我的背疼得厉害。"
      },
      {
        "en": "I will call the doctor immediately.",
        "zh": "我马上打电话叫医生。"
      }
    ],
    "words": [
      {
        "word": "slip",
        "phonetic": "/slɪp/",
        "meaning": "v. 滑倒，滑脱",
        "mcItem": "Ice",
        "mcItemIcon": "🧊",
        "sampleSentence": "He slipped on the wet stone stairs.",
        "sampleTranslation": "他在湿滑的石阶上滑倒了。"
      },
      {
        "word": "fall",
        "phonetic": "/fɔːl/",
        "meaning": "v. 跌倒，下落",
        "mcItem": "Feather",
        "mcItemIcon": "🍂",
        "sampleSentence": "Be careful not to fall downstairs.",
        "sampleTranslation": "小心不要从楼梯上摔下去。"
      },
      {
        "word": "downstairs",
        "phonetic": "/ˌdaʊnˈsteəz/",
        "meaning": "adv. 往楼下，在楼下",
        "mcItem": "Ladder",
        "mcItemIcon": "🪜",
        "sampleSentence": "He walked downstairs carefully.",
        "sampleTranslation": "他小心翼翼地走下楼。"
      },
      {
        "word": "hurt",
        "phonetic": "/hɜːt/",
        "meaning": "v. 伤害，感到疼痛",
        "mcItem": "Potion of Harming",
        "mcItemIcon": "🩹",
        "sampleSentence": "My back hurts badly after the fall.",
        "sampleTranslation": "摔倒后我的背部疼得厉害。"
      },
      {
        "word": "back",
        "phonetic": "/bæk/",
        "meaning": "n. 背部，后背",
        "mcItem": "Leather Tunic",
        "mcItemIcon": "🥋",
        "sampleSentence": "Lie down flat on your back.",
        "sampleTranslation": "平躺在你的背上。"
      },
      {
        "word": "immediately",
        "phonetic": "/ɪˈmiː.di.ət.li/",
        "meaning": "adv. 立即，马上",
        "mcItem": "Splash Potion of Healing",
        "mcItemIcon": "⚡",
        "sampleSentence": "Call the doctor immediately.",
        "sampleTranslation": "立即打电话叫医生。"
      }
    ],
    "grammarNote": "学习表示意外跌倒与身体疼痛的句型：slip (slipped), fall (fell), hurt (hurt)。"
  },
  "100": {
    "id": 100,
    "unit": 5,
    "title": "He says that ... She says that ...",
    "titleZh": "他说…… / 她说……",
    "topic": "Reported Speech",
    "topicZh": "间接引语转述",
    "grammar": "Subject + says/tells that + clause (转述某人所说内容)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What does Andy say?",
        "translation": "安迪说了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He says that he slipped and fell downstairs.",
        "translation": "他说他滑倒从楼梯上摔下来了。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Does he say that he can stand up?",
        "translation": "他说他能站起来吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, he says that he can't move his leg.",
        "translation": "不，他说他的腿动不了。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What does the doctor say?",
        "translation": "医生怎么说？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The doctor says that Andy must stay in bed for a week.",
        "translation": "医生说安迪必须卧床休息一周。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He says that he slipped and fell downstairs.",
        "zh": "他说他滑倒从楼梯上摔下来了。"
      },
      {
        "en": "She says that she feels much better today.",
        "zh": "她说她今天感觉好多了。"
      },
      {
        "en": "The doctor tells him that he must rest in bed.",
        "zh": "医生告诉他他必须卧床休息。"
      },
      {
        "en": "They say that the train will be on time.",
        "zh": "他们说火车会准时到达。"
      }
    ],
    "words": [
      {
        "word": "say",
        "phonetic": "/seɪ/",
        "meaning": "v. 说，讲",
        "mcItem": "Book",
        "mcItemIcon": "💬",
        "sampleSentence": "He says that he is ready to help.",
        "sampleTranslation": "他说他准备好提供帮助了。"
      },
      {
        "word": "tell",
        "phonetic": "/tel/,",
        "meaning": "v. 告诉，吩咐",
        "mcItem": "Note Block",
        "mcItemIcon": "🗣️",
        "sampleSentence": "She tells me that the exam is over.",
        "sampleTranslation": "她告诉我考试结束了。"
      },
      {
        "word": "licence",
        "phonetic": "/ˈlaɪ.səns/",
        "meaning": "n. 执照，许可证",
        "mcItem": "Paper",
        "mcItemIcon": "🪪",
        "sampleSentence": "He says that he forgot his licence at home.",
        "sampleTranslation": "他说他把执照忘在家里了。"
      },
      {
        "word": "headache",
        "phonetic": "/ˈhed.eɪk/",
        "meaning": "n. 头痛",
        "mcItem": "Potion",
        "mcItemIcon": "🤕",
        "sampleSentence": "She says that she has a bad headache.",
        "sampleTranslation": "她说她头痛得厉害。"
      },
      {
        "word": "rest",
        "phonetic": "/rest/",
        "meaning": "v./n. 休息",
        "mcItem": "Bed",
        "mcItemIcon": "🛏️",
        "sampleSentence": "The doctor says that you must rest.",
        "sampleTranslation": "医生说你必须休息。"
      },
      {
        "word": "better",
        "phonetic": "/ˈbet.ər/",
        "meaning": "adj. 更好的，病情好转的",
        "mcItem": "Golden Apple",
        "mcItemIcon": "🌟",
        "sampleSentence": "He feels much better this afternoon.",
        "sampleTranslation": "他今天下午感觉好多了。"
      }
    ],
    "grammarNote": "间接引语宾语从句：主句动词为 say / tell 时，引导词 that 常可省略。注意从句中的人称转换。"
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
    "words": [
      {
        "word": "say",
        "phonetic": "/seɪ/",
        "meaning": "v. 说，讲",
        "mcItem": "Paper",
        "mcItemIcon": "💬",
        "sampleSentence": "He says that he feels tired.",
        "sampleTranslation": "他说他感到疲劳。"
      },
      {
        "word": "tell",
        "phonetic": "/tel/",
        "meaning": "v. 告诉，吩咐",
        "mcItem": "Book and Quill",
        "mcItemIcon": "📢",
        "sampleSentence": "She tells me to wait here.",
        "sampleTranslation": "她叫我在这里等候。"
      },
      {
        "word": "tired",
        "phonetic": "/taɪəd/",
        "meaning": "adj. 累的，疲倦的",
        "mcItem": "Bed",
        "mcItemIcon": "🥱",
        "sampleSentence": "He says that he is too tired to continue.",
        "sampleTranslation": "他说他太累了无法继续。"
      },
      {
        "word": "thirsty",
        "phonetic": "/ˈθɜː.sti/",
        "meaning": "adj. 口渴的",
        "mcItem": "Water Bottle",
        "mcItemIcon": "💧",
        "sampleSentence": "She says that she needs a drink.",
        "sampleTranslation": "她说她需要喝点水。"
      },
      {
        "word": "hungry",
        "phonetic": "/ˈhʌŋ.ɡri/",
        "meaning": "adj. 饥饿的",
        "mcItem": "Cooked Mutton",
        "mcItemIcon": "🍖",
        "sampleSentence": "The miners say that they are very hungry.",
        "sampleTranslation": "矿工们说他们非常饥饿。"
      },
      {
        "word": "cold",
        "phonetic": "/kəʊld/",
        "meaning": "adj. 寒冷的",
        "mcItem": "Snowball",
        "mcItemIcon": "❄️",
        "sampleSentence": "He tells me that the wind is cold outside.",
        "sampleTranslation": "他告诉我外面风很大很冷。"
      }
    ],
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
    "words": [
      {
        "word": "too",
        "phonetic": "/tuː/",
        "meaning": "adv. 太，过于",
        "mcItem": "Anvil",
        "mcItemIcon": "🏋️",
        "sampleSentence": "The tea is too hot to drink.",
        "sampleTranslation": "茶太烫了喝不下。"
      },
      {
        "word": "enough",
        "phonetic": "/ɪˈnʌf/",
        "meaning": "adv./adj. 足够，充分",
        "mcItem": "Bread",
        "mcItemIcon": "🍞",
        "sampleSentence": "He is old enough to go to school.",
        "sampleTranslation": "他到了可以上学的年龄。"
      },
      {
        "word": "heavy",
        "phonetic": "/ˈhev.i/",
        "meaning": "adj. 沉重的",
        "mcItem": "Obsidian",
        "mcItemIcon": "🪨",
        "sampleSentence": "This chest is too heavy to carry.",
        "sampleTranslation": "这个箱子太重了搬不动。"
      },
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "meaning": "adj. 轻便的",
        "mcItem": "Feather",
        "mcItemIcon": "🪶",
        "sampleSentence": "A feather is very light.",
        "sampleTranslation": "羽毛非常轻。"
      },
      {
        "word": "strong",
        "phonetic": "/strɒŋ/",
        "meaning": "adj. 强壮的",
        "mcItem": "Iron Golem",
        "mcItemIcon": "💪",
        "sampleSentence": "He is strong enough to lift the rock.",
        "sampleTranslation": "他足够强壮可以举起岩石。"
      },
      {
        "word": "weak",
        "phonetic": "/wiːk/",
        "meaning": "adj. 虚弱的",
        "mcItem": "Rotten Flesh",
        "mcItemIcon": "🥀",
        "sampleSentence": "He is too weak to run fast.",
        "sampleTranslation": "他太虚弱了跑不快。"
      }
    ],
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
    "words": [
      {
        "word": "slowly",
        "phonetic": "/ˈsləʊ.li/",
        "meaning": "adv. 慢慢地",
        "mcItem": "Soul Sand",
        "mcItemIcon": "🐢",
        "sampleSentence": "He drove his car very slowly.",
        "sampleTranslation": "他开车开得很慢。"
      },
      {
        "word": "quickly",
        "phonetic": "/ˈkwɪk.li/",
        "meaning": "adv. 迅速地",
        "mcItem": "Potion of Swiftness",
        "mcItemIcon": "🐇",
        "sampleSentence": "Run quickly to the safe shelter.",
        "sampleTranslation": "迅速跑向安全避难所。"
      },
      {
        "word": "carefully",
        "phonetic": "/ˈkeə.fəl.i/",
        "meaning": "adv. 仔细地，小心地",
        "mcItem": "Spyglass",
        "mcItemIcon": "🧐",
        "sampleSentence": "Do your homework carefully.",
        "sampleTranslation": "认真仔细地写作业。"
      },
      {
        "word": "carelessly",
        "phonetic": "/ˈkeə.ləs.li/",
        "meaning": "adv. 粗心地，马虎地",
        "mcItem": "Creeper Head",
        "mcItemIcon": "⚠️",
        "sampleSentence": "He wrote the numbers carelessly.",
        "sampleTranslation": "他马马虎虎地写下了数字。"
      },
      {
        "word": "quietly",
        "phonetic": "/ˈkwaɪ.ət.li/",
        "meaning": "adv. 安静地，轻轻地",
        "mcItem": "Wool",
        "mcItemIcon": "🤫",
        "sampleSentence": "Open the door quietly.",
        "sampleTranslation": "轻轻地把门打开。"
      },
      {
        "word": "rudely",
        "phonetic": "/ˈruːd.li/",
        "meaning": "adv. 无礼地，粗暴地",
        "mcItem": "Iron Sword",
        "mcItemIcon": "😠",
        "sampleSentence": "Never speak rudely to your elders.",
        "sampleTranslation": "绝不要对长辈无礼说话。"
      }
    ],
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
        "word": "small",
        "phonetic": "/smɔːl/",
        "meaning": "形容词：小的；狭小的",
        "mcItem": "Button",
        "mcItemIcon": "🤏",
        "sampleSentence": "This dress is too small for me.",
        "sampleTranslation": "这条裙子对我来说太小了。"
      },
      {
        "word": "large",
        "phonetic": "/lɑːdʒ/",
        "meaning": "形容词：大的；巨大的",
        "mcItem": "Giant Mushroom",
        "mcItemIcon": "🐘",
        "sampleSentence": "Do you have a larger size in this blue coat?",
        "sampleTranslation": "这件蓝色外套有大一点的尺码吗？"
      },
      {
        "word": "suit",
        "phonetic": "/suːt/",
        "meaning": "动词：适合；合身",
        "mcItem": "Diamond Chestplate",
        "mcItemIcon": "👔",
        "sampleSentence": "That green hat suits Alex very well.",
        "sampleTranslation": "那顶绿帽子非常适合亚历克斯。"
      },
      {
        "word": "try on",
        "phonetic": "/traɪ ɒn/",
        "meaning": "词组：试穿",
        "mcItem": "Armor Stand",
        "mcItemIcon": "👗",
        "sampleSentence": "May I try on this comfortable pair of shoes?",
        "sampleTranslation": "我可以试穿这双舒适的鞋吗？"
      },
      {
        "word": "size",
        "phonetic": "/saɪz/",
        "meaning": "名词：尺码；尺寸",
        "mcItem": "Name Tag",
        "mcItemIcon": "📏",
        "sampleSentence": "What shoe size do you take, sir?",
        "sampleTranslation": "先生，你穿几号尺码的鞋？"
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
    "words": [
      {
        "word": "cheap",
        "phonetic": "/tʃiːp/",
        "meaning": "adj. 便宜的",
        "mcItem": "Dirt",
        "mcItemIcon": "🪙",
        "sampleSentence": "Train tickets are cheaper than plane tickets.",
        "sampleTranslation": "火车票比飞机票便宜。"
      },
      {
        "word": "expensive",
        "phonetic": "/ɪkˈspen.sɪv/",
        "meaning": "adj. 昂贵的",
        "mcItem": "Diamond",
        "mcItemIcon": "💎",
        "sampleSentence": "This watch is more expensive than that one.",
        "sampleTranslation": "这块手表比那块昂贵。"
      },
      {
        "word": "comfortable",
        "phonetic": "/ˈkʌm.fə.tə.bəl/",
        "meaning": "adj. 舒适的",
        "mcItem": "Bed",
        "mcItemIcon": "🛋️",
        "sampleSentence": "A comfortable chair by the fireplace.",
        "sampleTranslation": "壁炉旁一把舒适的椅子。"
      },
      {
        "word": "modern",
        "phonetic": "/ˈmɒd.ən/",
        "meaning": "adj. 现代化的",
        "mcItem": "Sea Lantern",
        "mcItemIcon": "🏙️",
        "sampleSentence": "This city has modern transport.",
        "sampleTranslation": "这座城市有现代化的交通系统。"
      },
      {
        "word": "exciting",
        "phonetic": "/ɪkˈsaɪ.tɪŋ/",
        "meaning": "adj. 令人激动的",
        "mcItem": "Firework Rocket",
        "mcItemIcon": "🎆",
        "sampleSentence": "The second film was more exciting.",
        "sampleTranslation": "第二部电影更加激动人心。"
      },
      {
        "word": "fast",
        "phonetic": "/fɑːst/",
        "meaning": "adj. 快捷的",
        "mcItem": "Elytra",
        "mcItemIcon": "🏎️",
        "sampleSentence": "Traveling by air is faster.",
        "sampleTranslation": "坐飞机旅行更加快捷。"
      }
    ],
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
    "words": [
      {
        "word": "shall",
        "phonetic": "/ʃæl/",
        "meaning": "modal v. 我们...好吗",
        "mcItem": "Compass",
        "mcItemIcon": "🤝",
        "sampleSentence": "Shall we go to the cinema tonight?",
        "sampleTranslation": "我们今晚去电影院好吗？"
      },
      {
        "word": "let's",
        "phonetic": "/lets/",
        "meaning": "phr. 让我们",
        "mcItem": "Bell",
        "mcItemIcon": "🔔",
        "sampleSentence": "Let's go for a walk in the park.",
        "sampleTranslation": "让我们去公园散步吧。"
      },
      {
        "word": "cinema",
        "phonetic": "/ˈsɪn.ə.mɑː/",
        "meaning": "n. 电影院",
        "mcItem": "Glowstone",
        "mcItemIcon": "🎬",
        "sampleSentence": "Watch a good movie at the cinema.",
        "sampleTranslation": "在电影院看一部好电影。"
      },
      {
        "word": "park",
        "phonetic": "/pɑːk/",
        "meaning": "n. 公园",
        "mcItem": "Oak Sapling",
        "mcItemIcon": "🌳",
        "sampleSentence": "The flowers in the park are blooming.",
        "sampleTranslation": "公园里的花儿正在盛开。"
      },
      {
        "word": "restaurant",
        "phonetic": "/ˈres.trɒnt/",
        "meaning": "n. 餐馆，饭店",
        "mcItem": "Cake",
        "mcItemIcon": "🍽️",
        "sampleSentence": "Shall we have dinner at a restaurant?",
        "sampleTranslation": "我们在餐馆吃晚餐好吗？"
      },
      {
        "word": "beach",
        "phonetic": "/biːtʃ/",
        "meaning": "n. 海滩",
        "mcItem": "Sand",
        "mcItemIcon": "🏖️",
        "sampleSentence": "Let's spend Sunday at the beach.",
        "sampleTranslation": "让我们在海滩度过周日吧。"
      }
    ],
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
    "words": [
      {
        "word": "best",
        "phonetic": "/best/",
        "meaning": "adj. 最好的",
        "mcItem": "Netherite Sword",
        "mcItemIcon": "👑",
        "sampleSentence": "This is the best book I have ever read.",
        "sampleTranslation": "这是我读过的最好的书。"
      },
      {
        "word": "worst",
        "phonetic": "/wɜːst/",
        "meaning": "adj. 最差的",
        "mcItem": "Poisonous Potato",
        "mcItemIcon": "👎",
        "sampleSentence": "That was the worst storm this winter.",
        "sampleTranslation": "那是今年冬天最糟糕的一场风暴。"
      },
      {
        "word": "tallest",
        "phonetic": "/ˈtɔː.lɪst/",
        "meaning": "adj. 最高的",
        "mcItem": "Bamboo",
        "mcItemIcon": "🎋",
        "sampleSentence": "He is the tallest student in class.",
        "sampleTranslation": "他是班上最高的学生。"
      },
      {
        "word": "shortest",
        "phonetic": "/ˈʃɔː.tɪst/",
        "meaning": "adj. 最矮的，最短的",
        "mcItem": "Flower",
        "mcItemIcon": "📏",
        "sampleSentence": "Take the shortest route home.",
        "sampleTranslation": "走最短的路线回家。"
      },
      {
        "word": "most",
        "phonetic": "/məʊst/",
        "meaning": "adv./adj. 最，绝大多数",
        "mcItem": "Totem of Undying",
        "mcItemIcon": "🌟",
        "sampleSentence": "The most interesting museum in London.",
        "sampleTranslation": "伦敦最有趣的博物馆。"
      },
      {
        "word": "least",
        "phonetic": "/liːst/",
        "meaning": "adv./adj. 最少，最不",
        "mcItem": "Stick",
        "mcItemIcon": "📉",
        "sampleSentence": "This is the least expensive model.",
        "sampleTranslation": "这是最不贵的一个型号。"
      }
    ],
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
    "words": [
      {
        "word": "ask",
        "phonetic": "/ɑːsk/",
        "meaning": "v. 请求，要求",
        "mcItem": "Paper",
        "mcItemIcon": "❓",
        "sampleSentence": "She asked me to close the window.",
        "sampleTranslation": "她请我关上窗户。"
      },
      {
        "word": "tell",
        "phonetic": "/tel/",
        "meaning": "v. 命令，叫某人做",
        "mcItem": "Bell",
        "mcItemIcon": "📢",
        "sampleSentence": "The teacher told us to open our books.",
        "sampleTranslation": "老师叫我们打开书本。"
      },
      {
        "word": "order",
        "phonetic": "/ˈɔː.dər/",
        "meaning": "v. 命令，嘱咐",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "🛡️",
        "sampleSentence": "The doctor ordered him to stay in bed.",
        "sampleTranslation": "医生嘱咐他要卧床休养。"
      },
      {
        "word": "shut",
        "phonetic": "/ʃʌt/",
        "meaning": "v. 关上，合上",
        "mcItem": "Oak Door",
        "mcItemIcon": "🚪",
        "sampleSentence": "He asked me to shut the front door.",
        "sampleTranslation": "他让我关上前门。"
      },
      {
        "word": "wait",
        "phonetic": "/weɪt/",
        "meaning": "v. 等待，等候",
        "mcItem": "Clock",
        "mcItemIcon": "⏳",
        "sampleSentence": "She told me to wait in the hall.",
        "sampleTranslation": "她叫我在大厅等候。"
      },
      {
        "word": "none",
        "phonetic": "/nʌn/",
        "meaning": "pron. 没有任何东西/人",
        "mcItem": "Barrier",
        "mcItemIcon": "📭",
        "sampleSentence": "I have got none left in my pocket.",
        "sampleTranslation": "我兜里一点零钱也没剩了。"
      }
    ],
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
    "words": [
      {
        "word": "everywhere",
        "phonetic": "/ˈev.ri.weər/",
        "meaning": "adv. 到处，处处",
        "mcItem": "Map",
        "mcItemIcon": "🗺️",
        "sampleSentence": "Wildflowers grow everywhere in spring.",
        "sampleTranslation": "春天到处都盛开着野花。"
      },
      {
        "word": "nowhere",
        "phonetic": "/ˈnəʊ.weər/",
        "meaning": "adv. 无处，哪里都不",
        "mcItem": "Void",
        "mcItemIcon": "🚫",
        "sampleSentence": "I had nowhere to shelter from heavy rain.",
        "sampleTranslation": "我无处躲避倾盆大雨。"
      },
      {
        "word": "somewhere",
        "phonetic": "/ˈsʌm.weər/",
        "meaning": "adv. 在某处",
        "mcItem": "Compass",
        "mcItemIcon": "📍",
        "sampleSentence": "The key is somewhere in the drawer.",
        "sampleTranslation": "钥匙在抽屉的某处。"
      },
      {
        "word": "anywhere",
        "phonetic": "/ˈen.i.weər/",
        "meaning": "adv. 任何地方",
        "mcItem": "Elytra",
        "mcItemIcon": "🌐",
        "sampleSentence": "Did you go anywhere during the weekend?",
        "sampleTranslation": "周末你去了什么地方吗？"
      },
      {
        "word": "everyone",
        "phonetic": "/ˈev.ri.wʌn/",
        "meaning": "pron. 每个人，大家",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "Everyone in the room stood up.",
        "sampleTranslation": "房间里的每个人都站了起来。"
      },
      {
        "word": "nobody",
        "phonetic": "/ˈnəʊ.bə.di/",
        "meaning": "pron. 没有人",
        "mcItem": "Barrier",
        "mcItemIcon": "👤",
        "sampleSentence": "Nobody answered when I knocked on the door.",
        "sampleTranslation": "我敲门时没有人应声。"
      }
    ],
    "grammarNote": "代词与副词词根组合：-one / -body (指人), -thing (指物), -where (指地点)。"
  },
  "117": {
    "id": 117,
    "unit": 5,
    "title": "Tommy's breakfast",
    "titleZh": "汤米的早餐",
    "topic": "Swallowing Coins & Humorous Narrative",
    "topicZh": "误吞硬币与幽默叙事",
    "grammar": "Past Continuous (was doing) & Present Perfect: hasn't had any change yet",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "Mother",
        "text": "When my husband was going into the dining room this morning, he dropped some coins on the floor.",
        "translation": "今天早晨我丈夫走进餐厅时，把一些硬币掉在地上了。",
        "avatar": "👩"
      },
      {
        "speaker": "Mother",
        "text": "There were coins everywhere. We looked for them, but we could not find them all.",
        "translation": "到处都是硬币。我们到处找，但没有把它们全找出来。",
        "avatar": "👩"
      },
      {
        "speaker": "Mother",
        "text": "While we were having breakfast, our little boy, Tommy, found two small fifty pence coins on the floor. He put them both into his mouth.",
        "translation": "当我们吃早饭时，我们的小儿子汤米在地板上找到了两枚小小的50便士硬币。他把两枚都放进了嘴里。",
        "avatar": "👩"
      },
      {
        "speaker": "Father",
        "text": "'These are very small coins,' my husband said. 'Tommy might swallow them!'",
        "translation": "“这些硬币太小了，”我丈夫说，“汤米可能会咽下去的！”",
        "avatar": "👨"
      },
      {
        "speaker": "Mother",
        "text": "Later that morning, when I was doing the housework, my husband phoned from the office.",
        "translation": "那天上午晚些时候，我正在做家务，丈夫从办公室打来电话。",
        "avatar": "👩"
      },
      {
        "speaker": "Father",
        "text": "'How's Tommy?' he asked.",
        "translation": "“汤米怎么样了？”他问。",
        "avatar": "👨"
      },
      {
        "speaker": "Mother",
        "text": "'I don't know,' I answered, 'Tommy hasn't had any change yet!'",
        "translation": "“我不知道，”我回答，“汤米身上还没有任何零钱（变化）呢！”",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "When my husband was going into the dining room, he dropped some coins on the floor.",
        "zh": "当我的丈夫走进餐厅时，他把一些硬币掉在了地板上。"
      },
      {
        "en": "While we were having breakfast, Tommy found two coins and put them into his mouth.",
        "zh": "当我们正在吃早餐时，汤米找到了两枚硬币并放进了嘴里。"
      },
      {
        "en": "These are very small coins. Tommy might swallow them!",
        "zh": "这些硬币太小了。汤米可能会咽下去！"
      },
      {
        "en": "Tommy hasn't had any change yet!",
        "zh": "汤米身上还没有任何零钱（变化）呢！"
      }
    ],
    "words": [
      {
        "word": "coin",
        "phonetic": "/kɔɪn/",
        "meaning": "n. 硬币",
        "mcItem": "Gold Nugget",
        "mcItemIcon": "🪙",
        "sampleSentence": "He dropped two small coins on the floor.",
        "sampleTranslation": "他把两枚小硬币掉在了地上。"
      },
      {
        "word": "swallow",
        "phonetic": "/ˈswɒl.əʊ/",
        "meaning": "v. 吞下，咽下",
        "mcItem": "Apple",
        "mcItemIcon": "👄",
        "sampleSentence": "Be careful, Tommy might swallow them!",
        "sampleTranslation": "当心，汤米可能会把它们咽下去！"
      },
      {
        "word": "later",
        "phonetic": "/ˈleɪ.tər/",
        "meaning": "adv. 后来，随后",
        "mcItem": "Clock",
        "mcItemIcon": "⏰",
        "sampleSentence": "Later that morning, he phoned from the office.",
        "sampleTranslation": "那天上午晚些时候，他从办公室打来电话。"
      },
      {
        "word": "dining room",
        "phonetic": "/ˈdaɪ.nɪŋ ruːm/",
        "meaning": "n. 餐厅",
        "mcItem": "Oak Table",
        "mcItemIcon": "🍽️",
        "sampleSentence": "He was going into the dining room.",
        "sampleTranslation": "他正走进餐厅。"
      },
      {
        "word": "change",
        "phonetic": "/tʃeɪndʒ/",
        "meaning": "n. 零钱；变化",
        "mcItem": "Emerald",
        "mcItemIcon": "💰",
        "sampleSentence": "Tommy hasn't had any change yet!",
        "sampleTranslation": "汤米身上还没有任何零钱（变化）呢！"
      },
      {
        "word": "toilet",
        "phonetic": "/ˈtɔɪ.lət/",
        "meaning": "n. 厕所，洗手间",
        "mcItem": "Cauldron",
        "mcItemIcon": "🚽",
        "sampleSentence": "Take the child to the toilet promptly.",
        "sampleTranslation": "及时带孩子去洗手间。"
      }
    ],
    "grammarNote": "过去进行时 (was/were + doing) 表示在过去某一时刻或阶段正在进行的动作，常与 when, while 连用。注意结尾关于 change (零钱/变化) 的双关幽默。"
  },
  "118": {
    "id": 118,
    "unit": 5,
    "title": "What were you doing?",
    "titleZh": "你在做什么？",
    "topic": "Past Continuous vs Simple Past",
    "topicZh": "过去进行时与一般过去时对比",
    "grammar": "What were you doing when...? / I was doing... when/while/just as",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What were you doing when the telephone rang?",
        "translation": "电话铃响时你正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I was making a phone call in the hall.",
        "translation": "我当时正在门厅打电话。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What was he doing when you arrived?",
        "translation": "你到达时他正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He was looking for the dropped coins on the floor.",
        "translation": "他正在地板上寻找掉落的硬币。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Did you drop the change?",
        "translation": "是你把零钱掉地上了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I dropped them just as I was going into the dining room.",
        "translation": "是的，我刚走进餐厅时就把硬币掉了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "What were you doing when the telephone rang? I was making a telephone call.",
        "zh": "电话响的时候你正在做什么？我正在打电话。"
      },
      {
        "en": "He dropped some coins just as he was going into the dining room.",
        "zh": "他正要走进餐厅时，把一些硬币掉在了地上。"
      },
      {
        "en": "What was she doing when he arrived? She was cooking dinner in the kitchen.",
        "zh": "他到达时她正在做什么？她当时正在厨房做晚饭。"
      },
      {
        "en": "Someone knocked on the door while I was having a bath.",
        "zh": "我正在洗澡时有人敲了门。"
      }
    ],
    "words": [
      {
        "word": "ring",
        "phonetic": "/rɪŋ/",
        "meaning": "v. (铃、电话)响",
        "mcItem": "Bell",
        "mcItemIcon": "🔔",
        "sampleSentence": "The telephone rang while I was cooking.",
        "sampleTranslation": "我做饭时电话响了。"
      },
      {
        "word": "postman",
        "phonetic": "/ˈpəʊst.mən/",
        "meaning": "n. 邮递员",
        "mcItem": "Paper",
        "mcItemIcon": "📮",
        "sampleSentence": "What were you doing when the postman arrived?",
        "sampleTranslation": "邮递员到达时你在做什么？"
      },
      {
        "word": "arrive",
        "phonetic": "/əˈraɪv/",
        "meaning": "v. 到达，抵达",
        "mcItem": "Minecart",
        "mcItemIcon": "🏁",
        "sampleSentence": "He arrived while we were having breakfast.",
        "sampleTranslation": "我们在吃早饭时他到了。"
      },
      {
        "word": "drop",
        "phonetic": "/drɒp/",
        "meaning": "v. 掉落，落下",
        "mcItem": "Gold Nugget",
        "mcItemIcon": "🪙",
        "sampleSentence": "He dropped some coins on the floor.",
        "sampleTranslation": "他把一些硬币掉在了地板上。"
      },
      {
        "word": "kitchen",
        "phonetic": "/ˈkɪtʃ.ɪn/",
        "meaning": "n. 厨房",
        "mcItem": "Furnace",
        "mcItemIcon": "🍳",
        "sampleSentence": "She was baking bread in the kitchen.",
        "sampleTranslation": "她当时正在厨房里烤面包。"
      },
      {
        "word": "garden",
        "phonetic": "/ˈɡɑː.dən/",
        "meaning": "n. 花园",
        "mcItem": "Poppy",
        "mcItemIcon": "🌸",
        "sampleSentence": "He was working in the garden when it began to rain.",
        "sampleTranslation": "天开始下雨时他正在花园里干活。"
      }
    ],
    "grammarNote": "过去进行时与一般过去时结合：表示长动作（进行时 was/were doing）被一个短动作（过去时 did）打断，常由 when / while / just as 引导。"
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
    "title": "It had already happened",
    "titleZh": "事情已经发生了",
    "topic": "Past Perfect Situations",
    "topicZh": "过去完成时情境演练",
    "grammar": "had + past participle (动作发生在过去某一特定时间之前)",
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
    "words": [
      {
        "word": "already",
        "phonetic": "/ɔːlˈred.i/",
        "meaning": "adv. 已经",
        "mcItem": "Experience Bottle",
        "mcItemIcon": "✨",
        "sampleSentence": "The train had already left when I arrived at the station.",
        "sampleTranslation": "当我到达车站时，火车已经开走了。"
      },
      {
        "word": "before",
        "phonetic": "/bɪˈfɔːr/",
        "meaning": "prep./conj. 在...之前",
        "mcItem": "Clock",
        "mcItemIcon": "⏪",
        "sampleSentence": "He had lived in London before he moved to Paris.",
        "sampleTranslation": "在搬去巴黎之前他曾在伦敦居住。"
      },
      {
        "word": "destroy",
        "phonetic": "/dɪˈstrɔɪ/",
        "meaning": "v. 破坏，摧毁",
        "mcItem": "TNT",
        "mcItemIcon": "💥",
        "sampleSentence": "The fire had destroyed the building before firefighters arrived.",
        "sampleTranslation": "在消防队员到达前，大火已经烧毁了建筑。"
      },
      {
        "word": "burn",
        "phonetic": "/bɜːn/",
        "meaning": "v. 燃烧，着火",
        "mcItem": "Campfire",
        "mcItemIcon": "🔥",
        "sampleSentence": "The old letters had burned to ashes.",
        "sampleTranslation": "旧信件已经烧成灰烬。"
      },
      {
        "word": "station",
        "phonetic": "/ˈsteɪ.ʃən/",
        "meaning": "n. 车站",
        "mcItem": "Rail",
        "mcItemIcon": "🚉",
        "sampleSentence": "We hurried to the train station.",
        "sampleTranslation": "我们赶往火车站。"
      },
      {
        "word": "leave",
        "phonetic": "/liːv/",
        "meaning": "v. 离开，离去",
        "mcItem": "Oak Door",
        "mcItemIcon": "🚪",
        "sampleSentence": "The ship had already left the harbour.",
        "sampleTranslation": "轮船已经离开了港口。"
      }
    ],
    "grammarNote": "过去完成时常用时间状语：by the time + 过去时间从句, before + 过去时间点/从句。"
  }
};
