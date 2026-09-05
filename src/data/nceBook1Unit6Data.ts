// Authentic NCE Book 1 Unit 6 Data (Lessons 121 - 144)
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

export const NCE_BOOK1_UNIT6_DATA: Record<number, LessonCorpusItem> = {
  "121": {
    "id": 121,
    "unit": 6,
    "title": "The man in a hat",
    "titleZh": "戴帽子的男人",
    "topic": "Identification & Relative Clauses",
    "topicZh": "辨别人物与定语从句 (who/that)",
    "grammar": "定语从句 (who / that 指代人): The man who is wearing a hat",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "CAROLINE",
        "text": "Who is that man in the dark suit and hat over there?",
        "translation": "那边那个穿深色西装、戴帽子的男人是谁？",
        "avatar": "👩"
      },
      {
        "speaker": "HUGH",
        "text": "Which one? The man who is standing near the window?",
        "translation": "哪一个？站在窗户旁边的那个男人吗？",
        "avatar": "👨"
      },
      {
        "speaker": "CAROLINE",
        "text": "No, the man who is talking to the policeman.",
        "translation": "不，正在跟警察讲话的那个男人。",
        "avatar": "👩"
      },
      {
        "speaker": "HUGH",
        "text": "Oh, that's Mr. Carter. He is the manager of the local bank.",
        "translation": "噢，那是卡特先生。他是当地银行的经理。",
        "avatar": "👨"
      },
      {
        "speaker": "CAROLINE",
        "text": "Why is he talking to the policeman?",
        "translation": "他为什么在跟警察说话？",
        "avatar": "👩"
      },
      {
        "speaker": "HUGH",
        "text": "Because someone stole his wallet on the train this morning!",
        "translation": "因为今天早上有人在火车上偷了他的钱包！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Who is that man in the dark suit and hat over there?",
        "zh": "那边那个穿深色西服、戴帽子的男人是谁？"
      },
      {
        "en": "The man who is standing near the window.",
        "zh": "站在窗户旁边的那个男人。"
      },
      {
        "en": "The man who is talking to the policeman.",
        "zh": "正在跟警察说话的那个男人。"
      },
      {
        "en": "He is the manager of the local bank.",
        "zh": "他是当地银行的经理。"
      }
    ],
    "words": [
      {
        "word": "manager",
        "phonetic": "/ˈmænɪdʒə/",
        "meaning": "n. 经理",
        "mcItem": "Player Head",
        "mcItemIcon": "👨‍💼",
        "sampleSentence": "The bank manager.",
        "sampleTranslation": "银行经理。"
      },
      {
        "word": "suit",
        "phonetic": "/suːt/",
        "meaning": "n. 一套衣服，西装",
        "mcItem": "Leather Chestplate",
        "mcItemIcon": "👔",
        "sampleSentence": "A dark suit.",
        "sampleTranslation": "深色西装。"
      },
      {
        "word": "local",
        "phonetic": "/ˈləʊkl/",
        "meaning": "adj. 当地的，本地的",
        "mcItem": "Map",
        "mcItemIcon": "📍",
        "sampleSentence": "The local library.",
        "sampleTranslation": "当地图书馆。"
      }
    ],
    "grammarNote": "定语从句：关系代词 who / that 先行词指人，在从句中作主语 (The man who is talking to the policeman)。"
  },
  "122": {
    "id": 122,
    "unit": 6,
    "title": "Who ...? / Which ...?",
    "titleZh": "哪个……？ / 哪一个……？",
    "topic": "Relative Pronouns Practice",
    "topicZh": "关系代词 who 与 which 练习",
    "grammar": "who (指人) vs. which / that (指物)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Which lady is your sister?",
        "translation": "哪位女士是你姐姐？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The lady who is playing the piano.",
        "translation": "正在弹钢琴的那位女士。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Which car belongs to you?",
        "translation": "哪辆车是你的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "The car which is parked under the big tree.",
        "translation": "停在大树下的那辆车。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The boy who won the race is my cousin.",
        "zh": "赢得比赛的那个男孩是我表弟。"
      },
      {
        "en": "The book which is on the desk is mine.",
        "zh": "桌子上的那本书是我的。"
      },
      {
        "en": "The girl who speaks French is from Paris.",
        "zh": "讲法语的那个女孩来自巴黎。"
      }
    ],
    "words": [
      {
        "word": "who",
        "phonetic": "/huː/",
        "meaning": "pron. 谁(引导定语从句修饰人)",
        "mcItem": "Player Head",
        "mcItemIcon": "🧑",
        "sampleSentence": "The boy who won the race is my brother.",
        "sampleTranslation": "赢得比赛的那个男孩是我弟弟。"
      },
      {
        "word": "which",
        "phonetic": "/wɪtʃ/",
        "meaning": "pron. 哪一个(引导定语从句修饰物)",
        "mcItem": "Diamond",
        "mcItemIcon": "💎",
        "sampleSentence": "The book which is on the desk is mine.",
        "sampleTranslation": "桌子上的那本书是我的。"
      },
      {
        "word": "that",
        "phonetic": "/ðæt/",
        "meaning": "pron. 引导定语从句修饰人或物",
        "mcItem": "Book",
        "mcItemIcon": "📜",
        "sampleSentence": "The umbrella that I bought yesterday.",
        "sampleTranslation": "我昨天买的那把雨伞。"
      },
      {
        "word": "lady",
        "phonetic": "/ˈleɪ.di/",
        "meaning": "n. 女士，夫人",
        "mcItem": "Rose",
        "mcItemIcon": "👒",
        "sampleSentence": "The lady who is playing the piano is an artist.",
        "sampleTranslation": "正在弹钢琴的那位女士是一位艺术家。"
      },
      {
        "word": "umbrella",
        "phonetic": "/ʌmˈbrel.ə/",
        "meaning": "n. 雨伞",
        "mcItem": "Shield",
        "mcItemIcon": "☂️",
        "sampleSentence": "The umbrella which has a carved wooden handle.",
        "sampleTranslation": "那把有着雕花木手柄的雨伞。"
      },
      {
        "word": "photograph",
        "phonetic": "/ˈfəʊ.tə.ɡrɑːf/",
        "meaning": "n. 照片",
        "mcItem": "Painting",
        "mcItemIcon": "🖼️",
        "sampleSentence": "Look at the photograph that we took.",
        "sampleTranslation": "看我们拍的那张照片。"
      }
    ],
    "grammarNote": "定语从句关系词选择：先行词为人用 who/that，先行词为物用 which/that。"
  },
  "123": {
    "id": 123,
    "unit": 6,
    "title": "A trip to Australia",
    "titleZh": "澳大利亚之行",
    "topic": "Travel Correspondence & Relative Clauses",
    "topicZh": "澳洲旅行见闻与定语从句",
    "grammar": "who / which 定语从句综合",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "SCOTT",
        "text": "Look at this letter from Mike. He is having a great trip in Australia.",
        "translation": "看迈克寄来的这封信。他在澳大利亚玩得非常棒。",
        "avatar": "👨"
      },
      {
        "speaker": "TERRY",
        "text": "What does he say in the letter?",
        "translation": "他在信里说了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "SCOTT",
        "text": "He says he met a friendly Australian guide who showed him around Sydney.",
        "translation": "他说他遇到了一个友好的澳大利亚向导，带他游览了悉尼。",
        "avatar": "👨"
      },
      {
        "speaker": "TERRY",
        "text": "Did he see kangaroos and koalas?",
        "translation": "他看到袋鼠和考拉了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "SCOTT",
        "text": "Yes! He visited a wildlife park which has hundreds of native animals.",
        "translation": "看到了！他参观了一家拥有数百种本土野生动物的自然公园。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "He is having a great trip in Australia.",
        "zh": "他在澳大利亚旅行过得很棒。"
      },
      {
        "en": "He met a guide who showed him around Sydney.",
        "zh": "他遇到了一位带他游览悉尼的导游。"
      },
      {
        "en": "He visited a wildlife park which has hundreds of native animals.",
        "zh": "他参观了一个拥有数百种本土动物的野生动物公园。"
      }
    ],
    "words": [
      {
        "word": "trip",
        "phonetic": "/trɪp/",
        "meaning": "n. 旅行",
        "mcItem": "Compass",
        "mcItemIcon": "🧳",
        "sampleSentence": "Have a good trip.",
        "sampleTranslation": "旅途愉快。"
      },
      {
        "word": "guide",
        "phonetic": "/ɡaɪd/",
        "meaning": "n. 导游，向导",
        "mcItem": "Spyglass",
        "mcItemIcon": "🧭",
        "sampleSentence": "A tour guide.",
        "sampleTranslation": "旅行导游。"
      },
      {
        "word": "wildlife",
        "phonetic": "/ˈwaɪldlaɪf/",
        "meaning": "n. 野生动物",
        "mcItem": "Egg",
        "mcItemIcon": "🦘",
        "sampleSentence": "Protect wildlife.",
        "sampleTranslation": "保护野生动物。"
      }
    ],
    "grammarNote": "定语从句修饰先行词：guide (人) + who; park (物) + which。"
  },
  "124": {
    "id": 124,
    "unit": 6,
    "title": "Who / which / that",
    "titleZh": "谁 / 哪个 / 那个人或物",
    "topic": "Complex Attributive Sentences",
    "topicZh": "定语从句连接词辨析",
    "grammar": "Clause structures with who, which, and that",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Do you know the man who wrote this book?",
        "translation": "你认识写这本书的人吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he is a famous writer who lives in London.",
        "translation": "认识，他是一位住在伦敦的著名作家。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "This is the computer that I bought yesterday.",
        "zh": "这是我昨天买的电脑。"
      },
      {
        "en": "The flowers which are in the vase are fresh.",
        "zh": "花瓶里的花很新鲜。"
      },
      {
        "en": "The people who live next door are very polite.",
        "zh": "住在隔壁的人非常有礼貌。"
      }
    ],
    "words": [
      {
        "word": "writer",
        "phonetic": "/ˈraɪ.tər/",
        "meaning": "n. 作家，著述者",
        "mcItem": "Book and Quill",
        "mcItemIcon": "✍️",
        "sampleSentence": "The famous writer whom we met yesterday.",
        "sampleTranslation": "我们昨天见到的那位著名作家。"
      },
      {
        "word": "computer",
        "phonetic": "/kəmˈpjuː.tər/",
        "meaning": "n. 计算机，电脑",
        "mcItem": "Redstone Block",
        "mcItemIcon": "💻",
        "sampleSentence": "The computer that I bought last week.",
        "sampleTranslation": "我上周买的那台电脑。"
      },
      {
        "word": "actor",
        "phonetic": "/ˈæk.tər/",
        "meaning": "n. 男演员",
        "mcItem": "Player Head",
        "mcItemIcon": "🎭",
        "sampleSentence": "The actor whom everybody likes.",
        "sampleTranslation": "人人都喜欢的那位演员。"
      },
      {
        "word": "letter",
        "phonetic": "/ˈlet.ər/",
        "meaning": "n. 信件",
        "mcItem": "Paper",
        "mcItemIcon": "✉️",
        "sampleSentence": "The letter that she received this morning.",
        "sampleTranslation": "她今晨收到的那封信。"
      },
      {
        "word": "film",
        "phonetic": "/fɪlm/",
        "meaning": "n. 电影",
        "mcItem": "Glowstone",
        "mcItemIcon": "🎞️",
        "sampleSentence": "The film which we saw last night was exciting.",
        "sampleTranslation": "我们昨晚看的电影很刺激。"
      },
      {
        "word": "serve",
        "phonetic": "/sɜːv/",
        "meaning": "v. 服务，款待",
        "mcItem": "Cake",
        "mcItemIcon": "🍽️",
        "sampleSentence": "The meal that the waiter served was delicious.",
        "sampleTranslation": "服务员端上来的那一餐很美味。"
      }
    ],
    "grammarNote": "that 既可以代指人也可以代指物，在限制性定语从句中可替代 who 或 which。"
  },
  "125": {
    "id": 125,
    "unit": 6,
    "title": "Tea for two",
    "titleZh": "两人品茶",
    "topic": "Cafe Ordering & Passive Intro",
    "topicZh": "茶馆点餐与被动语态铺垫",
    "grammar": "Passive voice context & service expressions",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "SUSAN",
        "text": "Can we have a table by the window, please?",
        "translation": "请问我们可以坐靠窗的那张桌子吗？",
        "avatar": "👩"
      },
      {
        "speaker": "WAITRESS",
        "text": "Certainly, madam. This table is reserved for you.",
        "translation": "当然可以，女士。这张桌子为您留好了。",
        "avatar": "👧"
      },
      {
        "speaker": "SUSAN",
        "text": "We'd like tea for two, please, with some scones and strawberry jam.",
        "translation": "请来两份茶，配一些司康饼和草莓酱。",
        "avatar": "👩"
      },
      {
        "speaker": "WAITRESS",
        "text": "Fresh scones are baked every morning in our kitchen.",
        "translation": "新鲜的司康饼每天早晨都在我们厨房里烘烤。",
        "avatar": "👧"
      },
      {
        "speaker": "SUSAN",
        "text": "That sounds delicious. Thank you!",
        "translation": "听起来很美味。谢谢！",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Can we have a table by the window, please?",
        "zh": "请问我们可以要靠窗的桌子吗？"
      },
      {
        "en": "This table is reserved for you.",
        "zh": "这张桌子是为您预订的。"
      },
      {
        "en": "Fresh scones are baked every morning in our kitchen.",
        "zh": "新鲜司康饼每天早晨都在我们厨房现烤。"
      },
      {
        "en": "Tea for two, please.",
        "zh": "请来两人份的茶。"
      }
    ],
    "words": [
      {
        "word": "reserve",
        "phonetic": "/rɪˈzɜːv/",
        "meaning": "v. 预订，保留",
        "mcItem": "Book",
        "mcItemIcon": "🏷️",
        "sampleSentence": "Reserve a table.",
        "sampleTranslation": "预订一张桌子。"
      },
      {
        "word": "bake",
        "phonetic": "/beɪk/",
        "meaning": "v. 烘烤",
        "mcItem": "Smoker",
        "mcItemIcon": "🥐",
        "sampleSentence": "Bake bread.",
        "sampleTranslation": "烤面包。"
      },
      {
        "word": "jam",
        "phonetic": "/dʒæm/",
        "meaning": "n. 果酱",
        "mcItem": "Sweet Berries",
        "mcItemIcon": "🍓",
        "sampleSentence": "Strawberry jam.",
        "sampleTranslation": "草莓酱。"
      }
    ],
    "grammarNote": "一般现在时被动语态：am/is/are + 过去分词 (are baked, is reserved)。强调动作承受者而非执行者。"
  },
  "126": {
    "id": 126,
    "unit": 6,
    "title": "Have you got ...? / Do you have ...?",
    "titleZh": "你拥有……吗？",
    "topic": "Possession & Habits",
    "topicZh": "所有权与日常习惯问答",
    "grammar": "Have you got...? (英式) vs. Do you have...? (美式)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Have you got any spare time today?",
        "translation": "你今天有空余时间吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I have plenty of time this afternoon.",
        "translation": "有，我今天下午有很多时间。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Have you got a car? Yes, I have.",
        "zh": "你有汽车吗？是的，我有。"
      },
      {
        "en": "Do you have breakfast every morning? Yes, I do.",
        "zh": "你每天早晨都吃早饭吗？是的，我吃。"
      }
    ],
    "words": [
      {
        "word": "have to",
        "phonetic": "/hæv tuː/",
        "meaning": "phr. 不得不，必须(客观)",
        "mcItem": "Netherite Ingot",
        "mcItemIcon": "📋",
        "sampleSentence": "I have to finish my homework before eight.",
        "sampleTranslation": "八点前我必须完成家庭作业。"
      },
      {
        "word": "need",
        "phonetic": "/niːd/",
        "meaning": "v./modal v. 需要",
        "mcItem": "Bread",
        "mcItemIcon": "🍞",
        "sampleSentence": "You do not need to water the garden today.",
        "sampleTranslation": "你今天不需要给花园浇水。"
      },
      {
        "word": "water",
        "phonetic": "/ˈwɔː.tər/",
        "meaning": "v. 浇水; n. 水",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🚿",
        "sampleSentence": "Peter had to water the dry lawn.",
        "sampleTranslation": "彼得不得不给干枯的草坪浇水。"
      },
      {
        "word": "rain",
        "phonetic": "/reɪn/",
        "meaning": "v./n. 下雨，雨水",
        "mcItem": "Splash Bottle",
        "mcItemIcon": "🌧️",
        "sampleSentence": "It began to rain heavily.",
        "sampleTranslation": "天开始下起了大雨。"
      },
      {
        "word": "spare",
        "phonetic": "/speər/",
        "meaning": "adj. 备用的，多余的，空闲的",
        "mcItem": "Tripwire Hook",
        "mcItemIcon": "🗝️",
        "sampleSentence": "Have you got any spare time this afternoon?",
        "sampleTranslation": "你今天下午有空闲时间吗？"
      },
      {
        "word": "plenty",
        "phonetic": "/ˈplen.ti/",
        "meaning": "n./pron. 充足，大量",
        "mcItem": "Chest",
        "mcItemIcon": "🌾",
        "sampleSentence": "We have plenty of tea for everyone.",
        "sampleTranslation": "我们为大家准备了充足的茶水。"
      }
    ],
    "grammarNote": "表示“拥有”时：Have you got = Do you have；表示习惯性动作时（如 have breakfast），只能用 Do you have...?"
  },
  "127": {
    "id": 127,
    "unit": 6,
    "title": "A famous actress",
    "titleZh": "著名的女演员",
    "topic": "Celebrity & Passive Voice",
    "topicZh": "明星生活与一般现在时被动语态",
    "grammar": "Present Simple Passive: is/are + past participle",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "REPORTER",
        "text": "Look! That's Karen Marsh, the famous film actress.",
        "translation": "瞧！那是著名电影女演员卡伦·马什。",
        "avatar": "👨"
      },
      {
        "speaker": "KATE",
        "text": "She is admired by millions of fans all over the world.",
        "translation": "她受到全世界数百万影迷的仰慕。",
        "avatar": "👩"
      },
      {
        "speaker": "REPORTER",
        "text": "Her new film is being shown in cinemas this week.",
        "translation": "她的新电影本周正在各大影院上映。",
        "avatar": "👨"
      },
      {
        "speaker": "KATE",
        "text": "She is interviewed on television almost every day.",
        "translation": "她几乎每天都在电视上接受采访。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "That's Karen Marsh, the famous film actress.",
        "zh": "那是著名电影女演员卡伦·马什。"
      },
      {
        "en": "She is admired by millions of fans all over the world.",
        "zh": "她受到全世界数以百万计影迷的钦佩。"
      },
      {
        "en": "She is interviewed on television almost every day.",
        "zh": "她几乎每天都在电视上接受采访。"
      }
    ],
    "words": [
      {
        "word": "actress",
        "phonetic": "/ˈæktrəs/",
        "meaning": "n. 女演员",
        "mcItem": "Player Head",
        "mcItemIcon": "🎭",
        "sampleSentence": "A famous actress.",
        "sampleTranslation": "著名的女演员。"
      },
      {
        "word": "admire",
        "phonetic": "/ədˈmaɪə/",
        "meaning": "v. 仰慕，钦佩",
        "mcItem": "Heart",
        "mcItemIcon": "🌟",
        "sampleSentence": "Admire a hero.",
        "sampleTranslation": "钦佩英雄。"
      },
      {
        "word": "interview",
        "phonetic": "/ˈɪntəvjuː/",
        "meaning": "v. & n. 采访，面试",
        "mcItem": "Book",
        "mcItemIcon": "🎙️",
        "sampleSentence": "Interview a star.",
        "sampleTranslation": "采访明星。"
      }
    ],
    "grammarNote": "被动语态公式：主语 + be + 动词过去分词 + (by 动作执行者)。如：She is admired by fans."
  },
  "128": {
    "id": 128,
    "unit": 6,
    "title": "It is made ... / It is used ...",
    "titleZh": "它是被制造…… / 它是被使用……",
    "topic": "Passive Voice Production",
    "topicZh": "物品材质与用途被动表达",
    "grammar": "is/are made in/of/from ...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Where is this car made?",
        "translation": "这辆车是在哪里制造的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It is made in Germany.",
        "translation": "它是在德国制造的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What is paper made from?",
        "translation": "纸是用什么原料做的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It is made from wood.",
        "translation": "它是用木材造的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "This watch is made in Switzerland.",
        "zh": "这块手表是瑞士制造的。"
      },
      {
        "en": "The table is made of solid wood.",
        "zh": "这张桌子是由实木制成的。"
      },
      {
        "en": "English is spoken in many countries.",
        "zh": "英语在许多国家被使用。"
      }
    ],
    "words": [
      {
        "word": "can't be",
        "phonetic": "/kɑːnt biː/,",
        "meaning": "phr. 不可能是(否定推测)",
        "mcItem": "Barrier",
        "mcItemIcon": "❌",
        "sampleSentence": "He can't be sixty years old! He looks young.",
        "sampleTranslation": "他不可能六十岁！他看起来很年轻。"
      },
      {
        "word": "must be",
        "phonetic": "/mʌst biː/",
        "meaning": "phr. 一定是(肯定推测)",
        "mcItem": "Emerald",
        "mcItemIcon": "✔️",
        "sampleSentence": "She must be at least forty.",
        "sampleTranslation": "她肯定至少有四十岁了。"
      },
      {
        "word": "dentist",
        "phonetic": "/ˈden.tɪst/",
        "meaning": "n. 牙医",
        "mcItem": "Bone",
        "mcItemIcon": "👨‍⚕️",
        "sampleSentence": "He can't be a dentist; he is an engineer.",
        "sampleTranslation": "他不可能是一名牙医；他是工程师。"
      },
      {
        "word": "busy",
        "phonetic": "/ˈbɪz.i/",
        "meaning": "adj. 忙碌的",
        "mcItem": "Clock",
        "mcItemIcon": "🏃",
        "sampleSentence": "The doctor must be busy right now.",
        "sampleTranslation": "医生现在一定很忙。"
      },
      {
        "word": "famous",
        "phonetic": "/ˈfeɪ.məs/",
        "meaning": "adj. 著名的",
        "mcItem": "Golden Crown",
        "mcItemIcon": "🌟",
        "sampleSentence": "She is a very famous film actress.",
        "sampleTranslation": "她是极其著名的电影女演员。"
      },
      {
        "word": "young",
        "phonetic": "/jʌŋ/",
        "meaning": "adj. 年轻的",
        "mcItem": "Baby Sheep",
        "mcItemIcon": "🌱",
        "sampleSentence": "She looks very young on television.",
        "sampleTranslation": "她在电视上看起来非常年轻。"
      }
    ],
    "grammarNote": "be made of (看得出原材料：物理变化) vs. be made from (看不出原材料：化学变化) vs. be made in (在某地制造)。"
  },
  "129": {
    "id": 129,
    "unit": 6,
    "title": "Seventy miles an hour",
    "titleZh": "时速70英里",
    "topic": "Speeding & Past Passive",
    "topicZh": "超速行驶与一般过去时被动语态",
    "grammar": "Past Simple Passive: was/were + past participle",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "POLICEMAN",
        "text": "You were driving at seventy miles an hour, sir.",
        "translation": "先生，您刚才以每小时70英里的速度行驶。",
        "avatar": "👮"
      },
      {
        "speaker": "DRIVER",
        "text": "Was I, officer? I didn't realize I was going so fast.",
        "translation": "是吗，警官？我没意识到我开得这么快。",
        "avatar": "👨"
      },
      {
        "speaker": "POLICEMAN",
        "text": "This road is restricted to thirty miles an hour. A pedestrian was hit here last week.",
        "translation": "这条路限速30英里。上周这里有一名行人被撞了。",
        "avatar": "👮"
      },
      {
        "speaker": "DRIVER",
        "text": "I'm very sorry. It won't happen again.",
        "translation": "非常抱歉。不会再发生了。",
        "avatar": "👨"
      },
      {
        "speaker": "POLICEMAN",
        "text": "I must give you a ticket. You were caught on camera.",
        "translation": "我必须给您开罚单。您被监控摄像头拍下了。",
        "avatar": "👮"
      }
    ],
    "sentences": [
      {
        "en": "You were driving at seventy miles an hour, sir.",
        "zh": "先生，您刚才以每小时70英里的速度驾驶。"
      },
      {
        "en": "A pedestrian was hit here last week.",
        "zh": "上周有一名行人在这里被撞了。"
      },
      {
        "en": "You were caught on camera.",
        "zh": "您被摄像头拍下了。"
      }
    ],
    "words": [
      {
        "word": "mile",
        "phonetic": "/maɪl/",
        "meaning": "n. 英里",
        "mcItem": "Compass",
        "mcItemIcon": "🛣️",
        "sampleSentence": "Seventy miles.",
        "sampleTranslation": "70英里。"
      },
      {
        "word": "speed",
        "phonetic": "/spiːd/",
        "meaning": "n. 速度",
        "mcItem": "Sugar",
        "mcItemIcon": "🏎️",
        "sampleSentence": "High speed.",
        "sampleTranslation": "高速。"
      },
      {
        "word": "pedestrian",
        "phonetic": "/pəˈdestriən/",
        "meaning": "n. 行人",
        "mcItem": "Player Head",
        "mcItemIcon": "🚶",
        "sampleSentence": "Crosswalk for pedestrians.",
        "sampleTranslation": "行人斑马线。"
      }
    ],
    "grammarNote": "一般过去时被动语态：was / were + 动词过去分词。如：A pedestrian was hit (一名行人被撞了)。"
  },
  "130": {
    "id": 130,
    "unit": 6,
    "title": "When was it built/repaired?",
    "titleZh": "它是何时被建造/修理的？",
    "topic": "Past Passive Inquiries",
    "topicZh": "过去被动事件问答",
    "grammar": "When was it done? / It was done in...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When was this ancient castle built?",
        "translation": "这座古城堡是何时建造的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It was built in the fourteenth century.",
        "translation": "它建于14世纪。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When was the bridge repaired?",
        "translation": "这座桥是什么时候修好的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It was repaired last year.",
        "translation": "它是去年修缮的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The Great Wall was built thousands of years ago.",
        "zh": "长城建于数千年前。"
      },
      {
        "en": "These letters were typed yesterday morning.",
        "zh": "这些信是昨天上午打好的。"
      },
      {
        "en": "The stolen car was found by the police.",
        "zh": "被盗车辆已被警方找到。"
      }
    ],
    "words": [
      {
        "word": "abroad",
        "phonetic": "/əˈbrɔːd/",
        "meaning": "adv. 在国外，到海外",
        "mcItem": "Elytra",
        "mcItemIcon": "✈️",
        "sampleSentence": "He can't have been abroad last week.",
        "sampleTranslation": "他上周不可能在国外。"
      },
      {
        "word": "drive",
        "phonetic": "/draɪv/",
        "meaning": "v. 驾驶，开车",
        "mcItem": "Minecart",
        "mcItemIcon": "🚗",
        "sampleSentence": "He was driving at seventy miles an hour.",
        "sampleTranslation": "他正以每小时70英里的速度行驶。"
      },
      {
        "word": "speed",
        "phonetic": "/spiːd/",
        "meaning": "n. 速度",
        "mcItem": "Powered Rail",
        "mcItemIcon": "⚡",
        "sampleSentence": "The car was travelling at high speed.",
        "sampleTranslation": "汽车正以高速飞驰。"
      },
      {
        "word": "overtake",
        "phonetic": "/ˌəʊ.vəˈteɪk/",
        "meaning": "v. 超车，赶上",
        "mcItem": "Potion of Swiftness",
        "mcItemIcon": "🏎️",
        "sampleSentence": "The police car overtook the red car.",
        "sampleTranslation": "警车超越了那辆红色轿车。"
      },
      {
        "word": "mile",
        "phonetic": "/maɪl/",
        "meaning": "n. 英里",
        "mcItem": "Compass",
        "mcItemIcon": "🛣️",
        "sampleSentence": "Seventy miles an hour on the motorway.",
        "sampleTranslation": "高速公路上每小时七十英里。"
      },
      {
        "word": "licence",
        "phonetic": "/ˈlaɪ.səns/",
        "meaning": "n. 执照，驾照",
        "mcItem": "Paper",
        "mcItemIcon": "🪪",
        "sampleSentence": "May I see your driving licence, please?",
        "sampleTranslation": "请让我看一下您的驾驶执照好吗？"
      }
    ],
    "grammarNote": "特殊疑问句被动语态：When + was/were + 主语 + 过去分词...?"
  },
  "131": {
    "id": 131,
    "unit": 6,
    "title": "Don't be so sure!",
    "titleZh": "别那么肯定！",
    "topic": "Uncertain Future & Holiday Decisions",
    "topicZh": "假期安排与可能情态推测",
    "grammar": "Modals of possibility: may / might (可能，也许)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "Harry",
        "text": "Where are you going to spend your holidays this year, Gary?",
        "translation": "今年你打算去哪里度假，加里？",
        "avatar": "👨"
      },
      {
        "speaker": "Gary",
        "text": "We may go abroad. I'm not sure. My wife wants to go to Egypt.",
        "translation": "我们可能会出国。我不确定。我妻子想去埃及。",
        "avatar": "🧔"
      },
      {
        "speaker": "Harry",
        "text": "Will you travel by sea or by air?",
        "translation": "你们坐轮船还是坐飞机去？",
        "avatar": "👨"
      },
      {
        "speaker": "Gary",
        "text": "We may travel by sea. It may be cheaper, but it takes a long time.",
        "translation": "我们可能会坐船。坐船可能便宜些，但要花很长时间。",
        "avatar": "🧔"
      },
      {
        "speaker": "Harry",
        "text": "I'm sure you will enjoy yourselves.",
        "translation": "我敢肯定你们会玩得非常开心的。",
        "avatar": "👨"
      },
      {
        "speaker": "Gary",
        "text": "Don't be so sure! We might not go anywhere. My wife always worries about the dog and house!",
        "translation": "别那么肯定！我们可能哪儿也去不了。我妻子总发愁家里的狗和房子！",
        "avatar": "🧔"
      }
    ],
    "sentences": [
      {
        "en": "Where are you going to spend your holidays this year, Gary?",
        "zh": "今年你打算去哪里度假，加里？"
      },
      {
        "en": "We may go abroad. My wife wants to go to Egypt.",
        "zh": "我们可能会出国。我妻子想去埃及。"
      },
      {
        "en": "Don't be so sure! We might not go anywhere.",
        "zh": "别那么肯定！我们可能哪儿也去不了。"
      },
      {
        "en": "Who is going to look after the dog, the house, and the garden?",
        "zh": "谁来照看狗、房子和花园呢？"
      }
    ],
    "words": [
      {
        "word": "sure",
        "phonetic": "/ʃɔːr/",
        "meaning": "adj. 确信的，肯定的",
        "mcItem": "Spyglass",
        "mcItemIcon": "🔍",
        "sampleSentence": "Don't be so sure about their plans.",
        "sampleTranslation": "对他们的计划别那么肯定。"
      },
      {
        "word": "abroad",
        "phonetic": "/əˈbrɔːd/",
        "meaning": "adv. 到国外，在国外",
        "mcItem": "Compass",
        "mcItemIcon": "🌍",
        "sampleTranslation": "我们今年可能会出国。",
        "sampleSentence": "We may go abroad this year."
      },
      {
        "word": "Egypt",
        "phonetic": "/ˈiː.dʒɪpt/",
        "meaning": "n. 埃及",
        "mcItem": "Sandstone",
        "mcItemIcon": "🏜️",
        "sampleSentence": "His wife wants to travel to Egypt.",
        "sampleTranslation": "他的妻子想去埃及旅游。"
      },
      {
        "word": "worry",
        "phonetic": "/ˈwʌr.i/",
        "meaning": "v. 发愁，担心",
        "mcItem": "Soul Lantern",
        "mcItemIcon": "😟",
        "sampleSentence": "She always worries too much about everything.",
        "sampleTranslation": "她总是对一切都忧心忡忡。"
      },
      {
        "word": "look after",
        "phonetic": "/lʊk ˈɑːf.tər/",
        "meaning": "phr. 照看，照料",
        "mcItem": "Wolf",
        "mcItemIcon": "🐕",
        "sampleSentence": "Who is going to look after the dog?",
        "sampleTranslation": "谁来照料这条狗？"
      },
      {
        "word": "mind",
        "phonetic": "/maɪnd/",
        "meaning": "n. 头脑，想法",
        "mcItem": "Book",
        "mcItemIcon": "🧠",
        "sampleSentence": "We cannot make up our minds yet.",
        "sampleTranslation": "我们还没有下定决心。"
      }
    ],
    "grammarNote": "情态动词 may 与 might 表示对未来的可能性推测 (也许，可能)。might 语气比 may 更加不确定。"
  },
  "132": {
    "id": 132,
    "unit": 6,
    "title": "It must be done",
    "titleZh": "必须被完成",
    "topic": "Modal Passive Practice",
    "topicZh": "情态动词被动句转换",
    "grammar": "must be / can be / should be + past participle",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Can this broken watch be repaired?",
        "translation": "这块坏了的手表能修好吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, it can be repaired in an hour.",
        "translation": "可以，一小时内就能修好。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The homework must be finished today.",
        "zh": "作业必须今天完成。"
      },
      {
        "en": "The room should be cleaned every day.",
        "zh": "房间应该每天清扫。"
      },
      {
        "en": "The door must not be opened.",
        "zh": "门千万不能打开。"
      }
    ],
    "words": [
      {
        "word": "may",
        "phonetic": "/meɪ/",
        "meaning": "modal v. 可能，也许",
        "mcItem": "Ender Pearl",
        "mcItemIcon": "🎲",
        "sampleSentence": "He may be at home or in the library.",
        "sampleTranslation": "他可能在家里或者在图书馆。"
      },
      {
        "word": "might",
        "phonetic": "/maɪt/",
        "meaning": "modal v. 或许，可能(更弱可能性)",
        "mcItem": "Chorus Fruit",
        "mcItemIcon": "🔮",
        "sampleSentence": "We might go by train if the car breaks down.",
        "sampleTranslation": "如果车坏了我们或许会坐火车去。"
      },
      {
        "word": "perhaps",
        "phonetic": "/pəˈhæps/",
        "meaning": "adv. 也许，可能",
        "mcItem": "Compass",
        "mcItemIcon": "💭",
        "sampleSentence": "Perhaps they have already arrived in London.",
        "sampleTranslation": "也许他们已经抵达伦敦了。"
      },
      {
        "word": "sea",
        "phonetic": "/siː/",
        "meaning": "n. 海洋，海",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🌊",
        "sampleSentence": "Travel across the Mediterranean Sea.",
        "sampleTranslation": "横渡地中海航行。"
      },
      {
        "word": "air",
        "phonetic": "/eər/",
        "meaning": "n. 空中，航空",
        "mcItem": "Elytra",
        "mcItemIcon": "✈️",
        "sampleSentence": "Travel by air is faster.",
        "sampleTranslation": "乘飞机旅行更快。"
      },
      {
        "word": "cheap",
        "phonetic": "/tʃiːp/",
        "meaning": "adj. 便宜的",
        "mcItem": "Copper Ingot",
        "mcItemIcon": "🏷️",
        "sampleSentence": "It may be cheaper, but takes longer.",
        "sampleTranslation": "它可能便宜些，但花的时间更长。"
      }
    ],
    "grammarNote": "否定形式：must not be done, cannot be done。"
  },
  "133": {
    "id": 133,
    "unit": 6,
    "title": "Sensational news!",
    "titleZh": "爆炸性新闻！",
    "topic": "Breaking News & Indirect Questions",
    "topicZh": "突发新闻与间接疑问句",
    "grammar": "Indirect questions: She asked if... / He asked where...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "LUCY",
        "text": "Have you read the sensational news in the newspaper?",
        "translation": "你看报纸上的爆炸性新闻了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "TINA",
        "text": "No, what is it? Tell me quickly!",
        "translation": "没有，是什么？快告诉我！",
        "avatar": "👧"
      },
      {
        "speaker": "LUCY",
        "text": "Karen Marsh has just married for the third time!",
        "translation": "卡伦·马什刚刚第三次结婚了！",
        "avatar": "👩"
      },
      {
        "speaker": "TINA",
        "text": "Really? Who did she marry?",
        "translation": "真的吗？她和谁结婚了？",
        "avatar": "👧"
      },
      {
        "speaker": "LUCY",
        "text": "She married a wealthy young businessman.",
        "translation": "她嫁给了一位富有的年轻商人。",
        "avatar": "👩"
      },
      {
        "speaker": "TINA",
        "text": "Reporters asked them where they were going to spend their honeymoon.",
        "translation": "记者们问他们打算去哪里度蜜月。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Have you read the sensational news in the newspaper?",
        "zh": "你看到报纸上的爆炸性新闻了吗？"
      },
      {
        "en": "Karen Marsh has just married for the third time!",
        "zh": "卡伦·马什刚刚第三次结婚了！"
      },
      {
        "en": "She married a wealthy young businessman.",
        "zh": "她嫁给了一位富有的年轻商人。"
      },
      {
        "en": "Reporters asked them where they were going to spend their honeymoon.",
        "zh": "记者问他们打算去哪里度蜜月。"
      }
    ],
    "words": [
      {
        "word": "sensational",
        "phonetic": "/senˈseɪʃənl/",
        "meaning": "adj. 轰动的，耸人听闻的",
        "mcItem": "Firework Rocket",
        "mcItemIcon": "💥",
        "sampleSentence": "Sensational news.",
        "sampleTranslation": "轰动新闻。"
      },
      {
        "word": "marry",
        "phonetic": "/ˈmæri/",
        "meaning": "v. 结婚",
        "mcItem": "Heart",
        "mcItemIcon": "💍",
        "sampleSentence": "Get married.",
        "sampleTranslation": "结婚。"
      },
      {
        "word": "wealthy",
        "phonetic": "/ˈwelθi/",
        "meaning": "adj. 富有的",
        "mcItem": "Diamond",
        "mcItemIcon": "💰",
        "sampleSentence": "A wealthy man.",
        "sampleTranslation": "富翁。"
      },
      {
        "word": "honeymoon",
        "phonetic": "/ˈhʌnimuːn/",
        "meaning": "n. 蜜月",
        "mcItem": "Honey Bottle",
        "mcItemIcon": "🍯",
        "sampleSentence": "Spend a honeymoon.",
        "sampleTranslation": "度蜜月。"
      }
    ],
    "grammarNote": "间接特殊疑问句语序变陈述语序：asked + where/what/when + 主语 + 谓语 (asked where they were going)。"
  },
  "134": {
    "id": 134,
    "unit": 6,
    "title": "He asked me if / what ...",
    "titleZh": "他问我是否 / 什么……",
    "topic": "Reported Questions Practice",
    "topicZh": "转述疑问句陈述语序",
    "grammar": "asked if/whether... (一般疑问句) & asked wh-... (特殊疑问句)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What did the policeman ask you?",
        "translation": "警察问你什么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He asked me if I had seen the accident.",
        "translation": "他问我是否看见了那场事故。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What did the teacher ask him?",
        "translation": "老师问他什么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She asked him why he was late.",
        "translation": "老师问他为什么迟到了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He asked me if I spoke English.",
        "zh": "他问我是否讲英语。"
      },
      {
        "en": "She asked where the railway station was.",
        "zh": "她问火车站位于哪里。"
      },
      {
        "en": "They asked what time the plane would take off.",
        "zh": "他们问飞机什么时候起飞。"
      }
    ],
    "words": [
      {
        "word": "said",
        "phonetic": "/sed/",
        "meaning": "v. (say的过去式)说",
        "mcItem": "Paper",
        "mcItemIcon": "💬",
        "sampleSentence": "He said that he was very pleased.",
        "sampleTranslation": "他说他非常高兴。"
      },
      {
        "word": "thought",
        "phonetic": "/θɔːt/",
        "meaning": "v. (think的过去式)想，认为",
        "mcItem": "Lectern",
        "mcItemIcon": "💭",
        "sampleSentence": "She thought that the report was true.",
        "sampleTranslation": "她以为那篇报道是真的。"
      },
      {
        "word": "news",
        "phonetic": "/njuːz/",
        "meaning": "n. 新闻，消息",
        "mcItem": "Book and Quill",
        "mcItemIcon": "📰",
        "sampleSentence": "Have you heard the sensational news?",
        "sampleTranslation": "你听到这则耸人听闻的新闻了吗？"
      },
      {
        "word": "retire",
        "phonetic": "/rɪˈtaɪər/",
        "meaning": "v. 退休，退役",
        "mcItem": "Armchair",
        "mcItemIcon": "🛋️",
        "sampleSentence": "She said that she would retire from the screen.",
        "sampleTranslation": "她说她将告别银幕退休。"
      },
      {
        "word": "famous",
        "phonetic": "/ˈfeɪ.məs/",
        "meaning": "adj. 著名的",
        "mcItem": "Diamond",
        "mcItemIcon": "🌟",
        "sampleSentence": "The famous actress announced her retirement.",
        "sampleTranslation": "著名女演员宣布了她的退休。"
      },
      {
        "word": "future",
        "phonetic": "/ˈfjuː.tʃər/",
        "meaning": "n. 未来，前途",
        "mcItem": "Clock",
        "mcItemIcon": "🔮",
        "sampleSentence": "Think carefully about your future.",
        "sampleTranslation": "仔细考虑你的未来。"
      }
    ],
    "grammarNote": "转述一般疑问句用 if 或 whether 连接，且必须使用陈述语序（主语在前，谓语在后）。"
  },
  "135": {
    "id": 135,
    "unit": 6,
    "title": "The latest report",
    "titleZh": "最新报道",
    "topic": "News Broadcast & Future Passive",
    "topicZh": "新闻广播与一般将来时被动语态",
    "grammar": "Future Passive: will be + past participle",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "ANCHOR",
        "text": "Here is the latest news report.",
        "translation": "下面播送最新新闻报道。",
        "avatar": "🎙️"
      },
      {
        "speaker": "REPORTER",
        "text": "A new modern hospital will be built in the north of the city next year.",
        "translation": "一座新的现代化医院将于明年在城市北部建成。",
        "avatar": "👩‍💼"
      },
      {
        "speaker": "ANCHOR",
        "text": "Over five hundred doctors and nurses will be employed.",
        "translation": "届时将雇佣500多名医护人员。",
        "avatar": "🎙️"
      },
      {
        "speaker": "REPORTER",
        "text": "The opening ceremony will be held in October.",
        "translation": "开幕典礼将于十月举行。",
        "avatar": "👩‍💼"
      }
    ],
    "sentences": [
      {
        "en": "A new modern hospital will be built next year.",
        "zh": "一座新的现代化医院将于明年建成。"
      },
      {
        "en": "Over five hundred doctors and nurses will be employed.",
        "zh": "将雇佣500多名医护人员。"
      },
      {
        "en": "The opening ceremony will be held in October.",
        "zh": "开幕式将在十月举行。"
      }
    ],
    "words": [
      {
        "word": "report",
        "phonetic": "/rɪˈpɔːt/",
        "meaning": "n. 报道，报告",
        "mcItem": "Paper",
        "mcItemIcon": "📰",
        "sampleSentence": "A news report.",
        "sampleTranslation": "新闻报道。"
      },
      {
        "word": "employ",
        "phonetic": "/ɪmˈplɔɪ/",
        "meaning": "v. 雇佣",
        "mcItem": "Player Head",
        "mcItemIcon": "💼",
        "sampleSentence": "Employ staff.",
        "sampleTranslation": "雇佣员工。"
      },
      {
        "word": "ceremony",
        "phonetic": "/ˈserəməni/",
        "meaning": "n. 典礼，仪式",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "🎊",
        "sampleSentence": "An opening ceremony.",
        "sampleTranslation": "开幕典礼。"
      }
    ],
    "grammarNote": "一般将来时被动语态：will be + 过去分词 (will be built, will be held)。"
  },
  "136": {
    "id": 136,
    "unit": 6,
    "title": "It will be done",
    "titleZh": "它将被完成",
    "topic": "Future Passive Practice",
    "topicZh": "将来被动句态转换",
    "grammar": "will be done by / in ...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When will the road be finished?",
        "translation": "这条路什么时候能修好？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It will be completed next month.",
        "translation": "它将于下个月竣工。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The new stadium will be opened next summer.",
        "zh": "新体育场将于明年夏天开放。"
      },
      {
        "en": "All letters will be posted tomorrow.",
        "zh": "所有信件将于明天寄出。"
      }
    ],
    "words": [
      {
        "word": "marry",
        "phonetic": "/ˈmær.i/",
        "meaning": "v. 结婚，娶，嫁",
        "mcItem": "Golden Apple",
        "mcItemIcon": "💍",
        "sampleSentence": "She said that she was going to marry Carlos.",
        "sampleTranslation": "她说她准备嫁给卡洛斯。"
      },
      {
        "word": "report",
        "phonetic": "/rɪˈpɔːt/",
        "meaning": "n. 报道，报告",
        "mcItem": "Paper",
        "mcItemIcon": "📑",
        "sampleSentence": "Read the latest report in today's paper.",
        "sampleTranslation": "阅读今天报纸上的最新报道。"
      },
      {
        "word": "allow",
        "phonetic": "/əˈlaʊ/",
        "meaning": "v. 允许，准许",
        "mcItem": "Shield",
        "mcItemIcon": "🛡️",
        "sampleSentence": "Her future husband will not allow her to act.",
        "sampleTranslation": "她未来的丈夫不会允许她演戏。"
      },
      {
        "word": "would",
        "phonetic": "/wʊd/",
        "meaning": "modal v. 将(will的过去式)",
        "mcItem": "Arrow",
        "mcItemIcon": "🏹",
        "sampleSentence": "She said that she would never make another film.",
        "sampleTranslation": "她说她决不再拍电影了。"
      },
      {
        "word": "introduce",
        "phonetic": "/ˌɪn.trəˈdjuːs/",
        "meaning": "v. 介绍，引见",
        "mcItem": "Player Head",
        "mcItemIcon": "🤝",
        "sampleSentence": "Allow me to introduce Carlos.",
        "sampleTranslation": "请允许我介绍卡洛斯。"
      },
      {
        "word": "husband",
        "phonetic": "/ˈhʌz.bənd/",
        "meaning": "n. 丈夫",
        "mcItem": "Armor Stand",
        "mcItemIcon": "🤵",
        "sampleSentence": "He will be her sixth husband.",
        "sampleTranslation": "他将是她的第六任丈夫。"
      }
    ],
    "grammarNote": "将来被动语态常配合将来时间状语：tomorrow, next week, next year, soon。"
  },
  "137": {
    "id": 137,
    "unit": 6,
    "title": "A pleasant dream",
    "titleZh": "美梦",
    "topic": "Dreams & Unreal Conditionals",
    "topicZh": "美好梦境与虚拟语气 (Second Conditional)",
    "grammar": "Second Conditional: If I had ..., I would ... (与现在事实相反假设)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "BRIAN",
        "text": "You were smiling in your sleep, Julie. What were you dreaming about?",
        "translation": "朱莉，你睡梦中一直在微笑。你梦见什么了？",
        "avatar": "👨"
      },
      {
        "speaker": "JULIE",
        "text": "I had a wonderful dream! I dreamt that I won a million pounds in the lottery!",
        "translation": "我做了一个美梦！我梦见我在彩票中赢得了一百万英镑！",
        "avatar": "👩"
      },
      {
        "speaker": "BRIAN",
        "text": "A million pounds! What would you do if you had that much money?",
        "translation": "一百万英镑！如果你有那么多钱，你会做什么？",
        "avatar": "👨"
      },
      {
        "speaker": "JULIE",
        "text": "If I had a million pounds, I would buy a luxury yacht and sail around the world with you!",
        "translation": "如果我有一百万英镑，我就买一艘豪华游艇，和你一起环游世界！",
        "avatar": "👩"
      },
      {
        "speaker": "BRIAN",
        "text": "That's a lovely dream. But now it's time to wake up and go to work!",
        "translation": "真是一个美好的梦。不过现在该醒醒去上班了！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "What were you dreaming about? I had a wonderful dream!",
        "zh": "你梦见什么了？我做了一个美妙的梦！"
      },
      {
        "en": "What would you do if you had that much money?",
        "zh": "如果你有那么多钱，你会做什么？"
      },
      {
        "en": "If I had a million pounds, I would buy a luxury yacht.",
        "zh": "如果我有一百万英镑，我就买一艘豪华游艇。"
      },
      {
        "en": "I would sail around the world with you!",
        "zh": "我会和你一起环游世界！"
      }
    ],
    "words": [
      {
        "word": "dream",
        "phonetic": "/driːm/",
        "meaning": "n. & v. 梦；做梦 (past: dreamt/dreamed)",
        "mcItem": "Bed",
        "mcItemIcon": "💭",
        "sampleSentence": "A pleasant dream.",
        "sampleTranslation": "一个美梦。"
      },
      {
        "word": "million",
        "phonetic": "/ˈmɪljən/",
        "meaning": "num. 百万",
        "mcItem": "Diamond",
        "mcItemIcon": "💰",
        "sampleSentence": "A million pounds.",
        "sampleTranslation": "一百万英镑。"
      },
      {
        "word": "lottery",
        "phonetic": "/ˈlɒtəri/",
        "meaning": "n. 彩票",
        "mcItem": "Paper",
        "mcItemIcon": "🎟️",
        "sampleSentence": "Win the lottery.",
        "sampleTranslation": "中彩票。"
      },
      {
        "word": "yacht",
        "phonetic": "/jɒt/",
        "meaning": "n. 游艇，帆船",
        "mcItem": "Boat",
        "mcItemIcon": "🛥️",
        "sampleSentence": "A luxury yacht.",
        "sampleTranslation": "豪华游艇。"
      },
      {
        "word": "sail",
        "phonetic": "/seɪl/",
        "meaning": "v. 航行",
        "mcItem": "Boat",
        "mcItemIcon": "⛵",
        "sampleSentence": "Sail across the ocean.",
        "sampleTranslation": "横渡大洋。"
      }
    ],
    "grammarNote": "第二类条件句（虚拟语气，表示对现在的假设）：If + 主语 + 动词过去式 (be动词常用were), 主语 + would + 动词原形。如：If I had money, I would buy a yacht."
  },
  "138": {
    "id": 138,
    "unit": 6,
    "title": "If I were ... / If I had ...",
    "titleZh": "如果我是…… / 如果我有……",
    "topic": "Second Conditional Practice",
    "topicZh": "虚拟语气假设与愿望",
    "grammar": "If I were you, I would... / If I had time, I would...",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What would you do if you were in my place?",
        "translation": "如果你处在我的位置，你会怎么做？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "If I were you, I would accept the job offer.",
        "translation": "如果我是你，我就会接受这份工作邀请。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "If I were rich, I would help poor people.",
        "zh": "如果我很富有，我就会帮助穷人。"
      },
      {
        "en": "If she knew the answer, she would tell us.",
        "zh": "如果她知道答案，她就会告诉我们的。"
      },
      {
        "en": "If I had wings, I would fly in the sky.",
        "zh": "如果我有翅膀，我就会在天空飞翔。"
      }
    ],
    "words": [
      {
        "word": "if",
        "phonetic": "/ɪf/",
        "meaning": "conj. 如果，假如",
        "mcItem": "Redstone Wire",
        "mcItemIcon": "🔀",
        "sampleSentence": "If I had a lot of money, I would travel.",
        "sampleTranslation": "如果我有很多钱，我会去环游世界。"
      },
      {
        "word": "rich",
        "phonetic": "/rɪtʃ/",
        "meaning": "adj. 富有的，有钱的",
        "mcItem": "Gold Block",
        "mcItemIcon": "💰",
        "sampleSentence": "If they were rich, they would buy a mansion.",
        "sampleTranslation": "如果他们有钱，他们会买一座大宅。"
      },
      {
        "word": "spend",
        "phonetic": "/spend/",
        "meaning": "v. 花费(金钱/时间)",
        "mcItem": "Emerald",
        "mcItemIcon": "💸",
        "sampleSentence": "Don't spend all the money on luxury goods.",
        "sampleTranslation": "不要把所有钱都花在奢侈品上。"
      },
      {
        "word": "poor",
        "phonetic": "/pɔːr/",
        "meaning": "adj. 贫穷的",
        "mcItem": "Rotten Flesh",
        "mcItemIcon": "🏚️",
        "sampleSentence": "We would be poor again if we spent it all.",
        "sampleTranslation": "如果我们全花光，我们又会变穷。"
      },
      {
        "word": "dream",
        "phonetic": "/driːm/",
        "meaning": "n. 梦想，美梦",
        "mcItem": "Bed",
        "mcItemIcon": "💭",
        "sampleSentence": "It is a pleasant dream, but depends on \"if\"!",
        "sampleTranslation": "这是一个美好的梦，但一切取决于“如果”！"
      },
      {
        "word": "travel",
        "phonetic": "/ˈtræv.əl/",
        "meaning": "v. 旅行，漫游",
        "mcItem": "Boat",
        "mcItemIcon": "🚢",
        "sampleSentence": "They want to travel around the world.",
        "sampleTranslation": "他们想环游世界。"
      }
    ],
    "grammarNote": "在虚拟条件句中，be 动词在所有人称后都可以统一用 were (If I were you...)。"
  },
  "139": {
    "id": 139,
    "unit": 6,
    "title": "Is that you, John?",
    "titleZh": "是你吗，约翰？",
    "topic": "Phone Call & Past Recollections",
    "topicZh": "电话联系与往事回忆",
    "grammar": "Review of tenses in natural dialogue",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "MARY",
        "text": "Hello? 6428.",
        "translation": "喂？这里是6428。",
        "avatar": "👩"
      },
      {
        "speaker": "JOHN",
        "text": "Hello, Mary. Is that you?",
        "translation": "你好，玛丽。是你吗？",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "Yes, John! Where are you calling from?",
        "translation": "是的，约翰！你在哪里打电话呢？",
        "avatar": "👩"
      },
      {
        "speaker": "JOHN",
        "text": "I'm calling from London. I've just arrived at the station.",
        "translation": "我从伦敦打过来的。我刚到车站。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "Have you had dinner yet?",
        "translation": "你吃过晚饭了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "JOHN",
        "text": "Not yet. I'll take a taxi to your house right away.",
        "translation": "还没。我马上乘出租车去你家。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "Great! I have prepared a hot meal for you.",
        "translation": "太好了！我已经为你准备好了热腾腾的饭菜。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Where are you calling from? I'm calling from London.",
        "zh": "你在哪里打电话？我从伦敦打过来的。"
      },
      {
        "en": "I've just arrived at the station.",
        "zh": "我刚到达车站。"
      },
      {
        "en": "I'll take a taxi to your house right away.",
        "zh": "我马上打车去你家。"
      },
      {
        "en": "I have prepared a hot meal for you.",
        "zh": "我已经为你准备好了一顿热饭。"
      }
    ],
    "words": [
        {
                "word": "telephone",
                "phonetic": "/ˈtel.ɪ.fəʊn/",
                "meaning": "名词：电话；动词：打电话",
                "mcItem": "Bell",
                "mcItemIcon": "☎️",
                "sampleSentence": "The telephone is ringing in the front hall.",
                "sampleTranslation": "前厅的电话正在响。"
        },
        {
                "word": "call",
                "phonetic": "/kɔːl/",
                "meaning": "动词：通话；打电话",
                "mcItem": "Jukebox",
                "mcItemIcon": "📞",
                "sampleSentence": "Who is calling, please?",
                "sampleTranslation": "请问是哪一位在打电话？"
        },
        {
                "word": "speak",
                "phonetic": "/spiːk/",
                "meaning": "动词：说话；通话",
                "mcItem": "Note Block",
                "mcItemIcon": "🗣️",
                "sampleSentence": "This is John speaking from the London office.",
                "sampleTranslation": "我是伦敦办公室的约翰。"
        },
        {
                "word": "message",
                "phonetic": "/ˈmes.ɪdʒ/",
                "meaning": "名词：消息；留言",
                "mcItem": "Writable Book",
                "mcItemIcon": "📩",
                "sampleSentence": "Can I take a message for Mr. Smith?",
                "sampleTranslation": "我能为史密斯先生记个留言吗？"
        },
        {
                "word": "hold on",
                "phonetic": "/həʊld ɒn/",
                "meaning": "短语：等一下；别挂断",
                "mcItem": "Clock",
                "mcItemIcon": "⏳",
                "sampleSentence": "Please hold on for a moment while I check.",
                "sampleTranslation": "请稍候片刻，我查一下。"
        }
      ],
    "grammarNote": "电话经典句型：Is that you...? / This is ... speaking. I'm calling from..."
  },
  "140": {
    "id": 140,
    "unit": 6,
    "title": "What did you say?",
    "titleZh": "你说什么了？",
    "topic": "Comprehensive Tense Review",
    "topicZh": "全书核心时态综合转述",
    "grammar": "Summary of Direct and Indirect Speech",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What did John tell you on the phone?",
        "translation": "约翰在电话里对你说什么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He told me that he had arrived and would take a taxi to our house.",
        "translation": "他告诉我他已经到了，并将打出租车来我们家。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He said that he was very hungry.",
        "zh": "他说他非常饿。"
      },
      {
        "en": "She told me that she would arrive at six o'clock.",
        "zh": "她告诉我她将在6点到达。"
      },
      {
        "en": "They said that they had already seen the exhibition.",
        "zh": "他们说他们已经看过了展览。"
      }
    ],
    "words": [
      {
        "word": "want",
        "phonetic": "/wɒnt/",
        "meaning": "v. 想要，希望",
        "mcItem": "Chest",
        "mcItemIcon": "🎯",
        "sampleSentence": "He wants to know if dinner is ready.",
        "sampleTranslation": "他想知道晚餐是否准备好了。"
      },
      {
        "word": "know",
        "phonetic": "/nəʊ/",
        "meaning": "v. 知道，了解",
        "mcItem": "Book",
        "mcItemIcon": "💡",
        "sampleSentence": "Does anyone know where John is?",
        "sampleTranslation": "有人知道约翰在哪里吗？"
      },
      {
        "word": "wonder",
        "phonetic": "/ˈwʌn.dər/",
        "meaning": "v. 想知道，琢磨",
        "mcItem": "Spyglass",
        "mcItemIcon": "🤔",
        "sampleSentence": "I wonder why he was late.",
        "sampleTranslation": "我想知道他为什么迟到了。"
      },
      {
        "word": "telephone",
        "phonetic": "/ˈtel.ɪ.fəʊn/",
        "meaning": "n. 电话",
        "mcItem": "Redstone Repeater",
        "mcItemIcon": "☎️",
        "sampleSentence": "He answered the ringing telephone.",
        "sampleTranslation": "他接听了正在鸣响的电话。"
      },
      {
        "word": "engineer",
        "phonetic": "/ˌen.dʒɪˈnɪər/",
        "meaning": "n. 工程师",
        "mcItem": "Redstone Dust",
        "mcItemIcon": "👷",
        "sampleSentence": "The telephone engineer is repairing the line.",
        "sampleTranslation": "电话工程师正在修理线路。"
      },
      {
        "word": "repair",
        "phonetic": "/rɪˈpeər/",
        "meaning": "v. 修理，修复",
        "mcItem": "Anvil",
        "mcItemIcon": "🔧",
        "sampleSentence": "He is repairing the broken connection.",
        "sampleTranslation": "他正在检修损坏的接线。"
      }
    ],
    "grammarNote": "时态呼应法则：主句谓语为过去时 (said, told)，从句时态往后推一个时态（一般现在->一般过去，现在完成->过去完成，will->would）。"
  },
  "141": {
    "id": 141,
    "unit": 6,
    "title": "Sally's first train ride",
    "titleZh": "萨莉的第一次火车旅行",
    "topic": "Childhood Travel & Narration",
    "topicZh": "童年火车旅行回忆",
    "grammar": "Past Continuous & Past Simple Narrative",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "MOTHER",
        "text": "Sally was only six years old when she had her first train journey.",
        "translation": "萨莉第一次坐火车旅行时只有六岁。",
        "avatar": "👩"
      },
      {
        "speaker": "SALLY",
        "text": "She was sitting near the window with her mother. The train was moving fast through the countryside.",
        "translation": "她和母亲坐在一起靠近窗户。火车在乡村快速穿行。",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "Sally was looking out at green hills, rivers, and quiet villages.",
        "translation": "萨莉望着窗外的青山、河流和宁静的村庄。",
        "avatar": "👩"
      },
      {
        "speaker": "SALLY",
        "text": "'Look, Mummy!' cried Sally. 'The trees and houses are running backwards!'",
        "translation": "‘瞧，妈妈！’萨莉叫道，‘树和房子都在往后跑呢！’",
        "avatar": "👧"
      },
      {
        "speaker": "MOTHER",
        "text": "Her mother smiled and explained that the train was carrying them forward.",
        "translation": "母亲笑了笑，向她解释是火车正载着她们向前奔跑。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Sally was only six years old when she had her first train journey.",
        "zh": "萨莉第一次火车旅行时才六岁。"
      },
      {
        "en": "She was sitting near the window with her mother.",
        "zh": "她和母亲一起坐在靠窗的座位上。"
      },
      {
        "en": "The train was moving fast through the countryside.",
        "zh": "火车在乡间飞驰。"
      },
      {
        "en": "'The trees and houses are running backwards!'",
        "zh": "‘树和房子都在向后跑！’"
      }
    ],
    "words": [
      {
        "word": "journey",
        "phonetic": "/ˈdʒɜːni/",
        "meaning": "n. 旅行，旅程",
        "mcItem": "Minecart",
        "mcItemIcon": "🚆",
        "sampleSentence": "A long journey.",
        "sampleTranslation": "漫长的旅程。"
      },
      {
        "word": "countryside",
        "phonetic": "/ˈkʌntrisaɪd/",
        "meaning": "n. 乡下，农村",
        "mcItem": "Grass Block",
        "mcItemIcon": "🌾",
        "sampleSentence": "Beautiful countryside.",
        "sampleTranslation": "美丽的乡村。"
      },
      {
        "word": "backwards",
        "phonetic": "/ˈbækwədz/",
        "meaning": "adv. 向后，倒退",
        "mcItem": "Arrow",
        "mcItemIcon": "🔙",
        "sampleSentence": "Move backwards.",
        "sampleTranslation": "向后移动。"
      },
      {
        "word": "forward",
        "phonetic": "/ˈfɔːwəd/",
        "meaning": "adv. 向前",
        "mcItem": "Arrow",
        "mcItemIcon": "🔜",
        "sampleSentence": "Move forward.",
        "sampleTranslation": "向前移动。"
      },
      {
        "word": "explain",
        "phonetic": "/ɪkˈspleɪn/",
        "meaning": "v. 解释，说明",
        "mcItem": "Book",
        "mcItemIcon": "💡",
        "sampleSentence": "Explain the rules.",
        "sampleTranslation": "解释规则。"
      }
    ],
    "grammarNote": "过去进行时描写叙事画面：was sitting, was moving, was looking out。"
  },
  "142": {
    "id": 142,
    "unit": 6,
    "title": "What was happening?",
    "titleZh": "当时正在发生什么？",
    "topic": "Past Continuous Context Drill",
    "topicZh": "过去进行时与过去时对照",
    "grammar": "was/were doing when ... did",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What were you doing at eight o'clock last night?",
        "translation": "昨晚8点你正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I was reading a novel in my bedroom.",
        "translation": "我当时正在卧室里读一本小说。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He was driving home when the storm started.",
        "zh": "暴风雨开始时，他正在开车回家。"
      },
      {
        "en": "They were having dinner when the phone rang.",
        "zh": "电话铃响时，他们正在吃晚餐。"
      }
    ],
    "words": [
      {
        "word": "invite",
        "phonetic": "/ɪnˈvaɪt/",
        "meaning": "v. 邀请",
        "mcItem": "Written Book",
        "mcItemIcon": "💌",
        "sampleSentence": "Someone invited Sally to a party.",
        "sampleTranslation": "有人邀请萨莉去参加聚会。"
      },
      {
        "word": "party",
        "phonetic": "/ˈpɑː.ti/",
        "meaning": "n. 聚会，派对",
        "mcItem": "Cake",
        "mcItemIcon": "🎈",
        "sampleSentence": "She went to an exciting children's party.",
        "sampleTranslation": "她去参加了一场热闹的儿童派对。"
      },
      {
        "word": "powder",
        "phonetic": "/ˈpaʊ.dər/",
        "meaning": "n. 香粉，粉饼",
        "mcItem": "Sugar",
        "mcItemIcon": "🪞",
        "sampleSentence": "The lady put powder on her nose.",
        "sampleTranslation": "那位女士往鼻子上扑粉。"
      },
      {
        "word": "mirror",
        "phonetic": "/ˈmɪr.ər/",
        "meaning": "n. 镜子",
        "mcItem": "Glass Pane",
        "mcItemIcon": "🪞",
        "sampleSentence": "She looked at herself in the mirror.",
        "sampleTranslation": "她在镜子里看着自己。"
      },
      {
        "word": "beautiful",
        "phonetic": "/ˈbjuː.tɪ.fəl/",
        "meaning": "adj. 美丽的，漂亮的",
        "mcItem": "Diamond",
        "mcItemIcon": "✨",
        "sampleSentence": "She wanted to make herself beautiful.",
        "sampleTranslation": "她想把自己打扮得漂漂亮亮。"
      },
      {
        "word": "ugly",
        "phonetic": "/ˈʌɡ.li/",
        "meaning": "adj. 丑陋的，难看的",
        "mcItem": "Zombie Head",
        "mcItemIcon": "🙈",
        "sampleSentence": "'But you are still ugly!' Sally said.",
        "sampleTranslation": "“可你还是很难看！”萨莉说道。"
      }
    ],
    "grammarNote": "when 引导的时间状语从句与过去进行时结合。"
  },
  "143": {
    "id": 143,
    "unit": 6,
    "title": "A walk through the woods",
    "titleZh": "林中漫步",
    "topic": "Nature Walk & Culminating Narrative",
    "topicZh": "林间散步与自然景观描述",
    "grammar": "Comprehensive integration of prepositions, tenses, and clauses",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "MR. SMITH",
        "text": "On a warm autumn afternoon, Mr. and Mrs. Smith went for a walk through the quiet woods.",
        "translation": "在一个温暖的秋日下午，史密斯夫妇去宁静的树林里散步。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. SMITH",
        "text": "Golden leaves were falling from the trees, covering the ground like a soft carpet.",
        "translation": "金黄的树叶正从树上飘落，像一层柔软的地毯覆盖着大地。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. SMITH",
        "text": "They walked along the winding path until they reached a crystal-clear stream.",
        "translation": "他们沿着蜿蜒的小径前行，直到来到一条清澈见底的小溪边。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. SMITH",
        "text": "'This is the most peaceful place in the world,' whispered Mrs. Smith.",
        "translation": "‘这是世界上最宁静的地方，’史密斯太太轻声说道。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. SMITH",
        "text": "They sat on a wooden bench, listened to birds singing, and enjoyed the beauty of nature.",
        "translation": "他们坐在一条木长凳上，聆听鸟儿歌唱，享受着大自然的美好。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Mr. and Mrs. Smith went for a walk through the quiet woods.",
        "zh": "史密斯夫妇去宁静的树林里散步。"
      },
      {
        "en": "Golden leaves were falling from the trees.",
        "zh": "金黄色的树叶正从树上飘落。"
      },
      {
        "en": "They walked along the path until they reached a stream.",
        "zh": "他们沿着小径走，直到到达一条小溪。"
      },
      {
        "en": "'This is the most peaceful place in the world.'",
        "zh": "‘这是世界上最宁静的地方。’"
      },
      {
        "en": "They listened to birds singing and enjoyed nature.",
        "zh": "他们倾听鸟儿歌唱，享受大自然。"
      }
    ],
    "words": [
      {
        "word": "leaf",
        "phonetic": "/liːf/",
        "meaning": "n. 叶子 (pl. leaves)",
        "mcItem": "Oak Leaves",
        "mcItemIcon": "🍂",
        "sampleSentence": "Autumn leaves.",
        "sampleTranslation": "秋叶。"
      },
      {
        "word": "carpet",
        "phonetic": "/ˈkɑːpɪt/",
        "meaning": "n. 地毯",
        "mcItem": "Red Carpet",
        "mcItemIcon": "🧶",
        "sampleSentence": "A soft carpet.",
        "sampleTranslation": "柔软的地毯。"
      },
      {
        "word": "path",
        "phonetic": "/pɑːθ/",
        "meaning": "n. 小路，小径",
        "mcItem": "Dirt Path",
        "mcItemIcon": "🛤️",
        "sampleSentence": "A forest path.",
        "sampleTranslation": "森林小路。"
      },
      {
        "word": "stream",
        "phonetic": "/striːm/",
        "meaning": "n. 小溪，溪流",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🏞️",
        "sampleSentence": "A clear stream.",
        "sampleTranslation": "清澈的小溪。"
      },
      {
        "word": "bench",
        "phonetic": "/bentʃ/",
        "meaning": "n. 长凳",
        "mcItem": "Oak Stairs",
        "mcItemIcon": "🪑",
        "sampleSentence": "Sit on a bench.",
        "sampleTranslation": "坐在长凳上。"
      },
      {
        "word": "nature",
        "phonetic": "/ˈneɪtʃə/",
        "meaning": "n. 自然，大自然",
        "mcItem": "Grass Block",
        "mcItemIcon": "🌲",
        "sampleSentence": "Love nature.",
        "sampleTranslation": "热爱大自然。"
      }
    ],
    "grammarNote": "全书时态与从句大融合：过去时叙事 (went, sat, listened, enjoyed)，过去进行时渲染 (were falling)，最高级表达 (the most peaceful)。"
  },
  "144": {
    "id": 144,
    "unit": 6,
    "title": "He hasn't been served yet",
    "titleZh": "他还没有被招待",
    "topic": "Present Perfect Passive",
    "topicZh": "现在完成时被动语态",
    "grammar": "has/have been + past participle (现在完成时被动语态)",
    "difficulty": "hard",
    "dialogue": [
      {
        "speaker": "Customer",
        "text": "Excuse me, waiter! I haven't been served yet!",
        "translation": "打扰一下，服务员！我还没有受到招待呢！",
        "avatar": "👨"
      },
      {
        "speaker": "Waiter",
        "text": "I'm very sorry, sir. We are short-staffed today.",
        "translation": "非常抱歉，先生。我们今天人手紧缺。",
        "avatar": "🧑‍💼"
      },
      {
        "speaker": "Customer",
        "text": "Has my order been taken to the kitchen yet?",
        "translation": "我的菜单送去厨房了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "Waiter",
        "text": "Yes, sir. Your dinner has already been cooked. I will bring it right away.",
        "translation": "是的，先生。您的晚餐已经做好了。我马上端上来。",
        "avatar": "🧑‍💼"
      }
    ],
    "sentences": [
      {
        "en": "He hasn't been served yet.",
        "zh": "他还没有被招待。"
      },
      {
        "en": "Has the letter been posted yet? Yes, it has already been posted.",
        "zh": "信已经寄出去了吗？是的，已经寄出去了。"
      },
      {
        "en": "Has the car been repaired yet? No, it hasn't been repaired yet.",
        "zh": "汽车修好了吗？还没有，还没修好。"
      },
      {
        "en": "All the guest rooms have already been cleaned.",
        "zh": "所有的客房都已经被打扫干净了。"
      }
    ],
    "words": [
      {
        "word": "serve",
        "phonetic": "/sɜːv/",
        "meaning": "v. 招待，服务，端上(菜肴)",
        "mcItem": "Cake",
        "mcItemIcon": "🍽️",
        "sampleSentence": "He hasn't been served yet by the waiter.",
        "sampleTranslation": "他还没有受到服务员的招待。"
      },
      {
        "word": "customer",
        "phonetic": "/ˈkʌs.tə.mər/",
        "meaning": "n. 顾客，主顾",
        "mcItem": "Emerald",
        "mcItemIcon": "👥",
        "sampleSentence": "The polite waiter served the new customer.",
        "sampleTranslation": "礼貌的服务员招待了新顾客。"
      },
      {
        "word": "counter",
        "phonetic": "/ˈkaʊn.tər/",
        "meaning": "n. 柜台，吧台",
        "mcItem": "Oak Wood",
        "mcItemIcon": "🏬",
        "sampleSentence": "Place your order at the counter.",
        "sampleTranslation": "在柜台处点单。"
      },
      {
        "word": "order",
        "phonetic": "/ˈɔː.dər/",
        "meaning": "n. 订购，点餐; v. 点餐",
        "mcItem": "Paper",
        "mcItemIcon": "📝",
        "sampleSentence": "Has your dinner order been taken?",
        "sampleTranslation": "你的晚餐点单记录好了吗？"
      },
      {
        "word": "promptly",
        "phonetic": "/ˈprɒmpt.li/",
        "meaning": "adv. 迅速地，准时地",
        "mcItem": "Clock",
        "mcItemIcon": "⚡",
        "sampleSentence": "All guests should be served promptly.",
        "sampleTranslation": "所有客人都应受到迅速及时的招待。"
      },
      {
        "word": "delay",
        "phonetic": "/dɪˈleɪ/",
        "meaning": "n./v. 耽搁，延误",
        "mcItem": "Soul Sand",
        "mcItemIcon": "⏳",
        "sampleSentence": "We sincerely apologize for the delay.",
        "sampleTranslation": "我们对这次延误深表歉意。"
      }
    ],
    "grammarNote": "现在完成时被动语态：主语 + have/has + been + 动词过去分词。强调过去的动作对现在造成的被动影响。"
  }
};
