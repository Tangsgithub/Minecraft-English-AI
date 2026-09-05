// Authentic NCE Book 1 Unit 3 Data (Lessons 49 - 72)
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

export const NCE_BOOK1_UNIT3_DATA: Record<number, LessonCorpusItem> = {
  "49": {
    "id": 49,
    "unit": 3,
    "title": "At the butcher's",
    "titleZh": "在肉店",
    "topic": "Shopping for Meat",
    "topicZh": "在肉店买肉与喜好表达",
    "grammar": "Do you want any...? / Do you like...? 与不可数肉类名词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "BUTCHER",
        "text": "Do you want any meat today, Mrs. Bird?",
        "translation": "伯德太太，您今天需要买肉吗？",
        "avatar": "👨‍🍳"
      },
      {
        "speaker": "MRS. BIRD",
        "text": "Yes, please.",
        "translation": "是的，我买一点。",
        "avatar": "👩"
      },
      {
        "speaker": "BUTCHER",
        "text": "Do you want beef or lamb?",
        "translation": "您要牛肉还是羊肉？",
        "avatar": "👨‍🍳"
      },
      {
        "speaker": "MRS. BIRD",
        "text": "Beef, please.",
        "translation": "请给我牛肉。",
        "avatar": "👩"
      },
      {
        "speaker": "BUTCHER",
        "text": "This lamb's very good.",
        "translation": "这只羊肉非常好。",
        "avatar": "👨‍🍳"
      },
      {
        "speaker": "MRS. BIRD",
        "text": "I like lamb, but my husband doesn't like it.",
        "translation": "我喜欢羊肉，但我丈夫不喜欢。",
        "avatar": "👩"
      },
      {
        "speaker": "BUTCHER",
        "text": "What about some steak? This is a nice piece.",
        "translation": "来点牛排怎么样？这是一块上好的牛排。",
        "avatar": "👨‍🍳"
      },
      {
        "speaker": "MRS. BIRD",
        "text": "Give me that piece, please. And a pound of mince, too.",
        "translation": "请把那块给我。还要一磅肉馅。",
        "avatar": "👩"
      },
      {
        "speaker": "BUTCHER",
        "text": "Do you want a chicken, Mrs. Bird? They're very choice.",
        "translation": "您想要一只鸡吗，伯德太太？这些鸡肉质很好。",
        "avatar": "👨‍🍳"
      },
      {
        "speaker": "MRS. BIRD",
        "text": "No, thank you. My husband likes steak, but he doesn't like chicken.",
        "translation": "不，谢谢。我丈夫喜欢牛排，但他不喜欢鸡肉。",
        "avatar": "👩"
      },
      {
        "speaker": "BUTCHER",
        "text": "To tell you the truth, Mrs. Bird, I don't like chicken either!",
        "translation": "说老实话，伯德太太，我也不喜欢鸡肉！",
        "avatar": "👨‍🍳"
      }
    ],
    "sentences": [
      {
        "en": "Do you want any meat today, Mrs. Bird? Yes, please.",
        "zh": "伯德太太，您今天需要买肉吗？是的，我买一点。"
      },
      {
        "en": "Do you want beef or lamb? Beef, please.",
        "zh": "您要牛肉还是羊肉？请给我牛肉。"
      },
      {
        "en": "I like lamb, but my husband doesn't like it.",
        "zh": "我喜欢羊肉，但我丈夫不喜欢。"
      },
      {
        "en": "Give me that piece, please. And a pound of mince, too.",
        "zh": "请把那块给我。还要一磅肉馅。"
      },
      {
        "en": "My husband likes steak, but he doesn't like chicken.",
        "zh": "我丈夫喜欢牛排，但他不喜欢鸡肉。"
      },
      {
        "en": "To tell you the truth, Mrs. Bird, I don't like chicken either!",
        "zh": "说老实话，伯德太太，我也不喜欢鸡肉！"
      }
    ],
    "words": [
      {
        "word": "butcher",
        "phonetic": "/ˈbʊtʃə/",
        "meaning": "n. 卖肉者，屠夫",
        "mcItem": "Iron Sword",
        "mcItemIcon": "👨‍🍳",
        "sampleSentence": "He is a butcher.",
        "sampleTranslation": "他是个屠夫。"
      },
      {
        "word": "meat",
        "phonetic": "/miːt/",
        "meaning": "n. 肉",
        "mcItem": "Beef",
        "mcItemIcon": "🥩",
        "sampleSentence": "Buy some meat.",
        "sampleTranslation": "买些肉。"
      },
      {
        "word": "beef",
        "phonetic": "/biːf/",
        "meaning": "n. 牛肉",
        "mcItem": "Cooked Beef",
        "mcItemIcon": "🥩",
        "sampleSentence": "I like beef.",
        "sampleTranslation": "我喜欢牛肉。"
      },
      {
        "word": "lamb",
        "phonetic": "/læm/",
        "meaning": "n. 羊肉",
        "mcItem": "Mutton",
        "mcItemIcon": "🥩",
        "sampleSentence": "This lamb is tender.",
        "sampleTranslation": "这羊肉很嫩。"
      },
      {
        "word": "steak",
        "phonetic": "/steɪk/",
        "meaning": "n. 牛排",
        "mcItem": "Cooked Beef",
        "mcItemIcon": "🥩",
        "sampleSentence": "We had steak for dinner.",
        "sampleTranslation": "我们晚餐吃了牛排。"
      },
      {
        "word": "truth",
        "phonetic": "/truːθ/",
        "meaning": "n. 真相，实话",
        "mcItem": "Compass",
        "mcItemIcon": "✨",
        "sampleSentence": "Tell the truth.",
        "sampleTranslation": "说实话。"
      }
    ],
    "grammarNote": "一般现在时第三人称单数：likes / doesn't like。either 用于否定句句末表示“也”。"
  },
  "50": {
    "id": 50,
    "unit": 3,
    "title": "He likes ... / He doesn't like ...",
    "titleZh": "他喜欢…… / 他不喜欢……",
    "topic": "Third-Person Likes & Dislikes",
    "topicZh": "第三人称喜好与食物种类",
    "grammar": "一般现在时第三人称肯定句与否定句",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Does he like tomatoes?",
        "translation": "他喜欢西红柿吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he does. He likes tomatoes, but he doesn't like potatoes.",
        "translation": "是的，他喜欢。他喜欢西红柿，但他不喜欢土豆。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Does she like cabbage?",
        "translation": "她喜欢卷心菜吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, she doesn't. She likes peas, but she doesn't like cabbage.",
        "translation": "不，她不喜欢。她喜欢豌豆，但不喜欢卷心菜。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He likes tomatoes, but he doesn't like potatoes.",
        "zh": "他喜欢西红柿，但他不喜欢土豆。"
      },
      {
        "en": "She likes cabbage, but she doesn't like lettuce.",
        "zh": "她喜欢卷心菜，但她不喜欢生菜。"
      },
      {
        "en": "He likes peas, but he doesn't like beans.",
        "zh": "他喜欢豌豆，但他不喜欢蚕豆。"
      },
      {
        "en": "She likes bananas, but she doesn't like oranges.",
        "zh": "她喜欢香蕉，但她不喜欢橙子。"
      },
      {
        "en": "He likes apples, but he doesn't like pears.",
        "zh": "他喜欢苹果，但他不喜欢梨。"
      },
      {
        "en": "She likes grapes, but she doesn't like peaches.",
        "zh": "她喜欢葡萄，但她不喜欢桃子。"
      }
    ],
    "words": [
      {
        "word": "tomato",
        "phonetic": "/təˈmɑːtəʊ/",
        "meaning": "n. 西红柿 (pl. tomatoes)",
        "mcItem": "Apple",
        "mcItemIcon": "🍅",
        "sampleSentence": "Tomatoes are red.",
        "sampleTranslation": "西红柿是红色的。"
      },
      {
        "word": "potato",
        "phonetic": "/pəˈteɪtəʊ/",
        "meaning": "n. 土豆 (pl. potatoes)",
        "mcItem": "Potato",
        "mcItemIcon": "🥔",
        "sampleSentence": "He likes potatoes.",
        "sampleTranslation": "他喜欢土豆。"
      },
      {
        "word": "cabbage",
        "phonetic": "/ˈkæbɪdʒ/",
        "meaning": "n. 卷心菜",
        "mcItem": "Oak Leaves",
        "mcItemIcon": "🥬",
        "sampleSentence": "Fresh cabbage.",
        "sampleTranslation": "新鲜卷心菜。"
      },
      {
        "word": "lettuce",
        "phonetic": "/ˈletɪs/",
        "meaning": "n. 生菜",
        "mcItem": "Grass",
        "mcItemIcon": "🥗",
        "sampleSentence": "Lettuce in salad.",
        "sampleTranslation": "沙拉里的生菜。"
      },
      {
        "word": "grape",
        "phonetic": "/ɡreɪp/",
        "meaning": "n. 葡萄",
        "mcItem": "Sweet Berries",
        "mcItemIcon": "🍇",
        "sampleSentence": "Purple grapes.",
        "sampleTranslation": "紫葡萄。"
      },
      {
        "word": "peach",
        "phonetic": "/piːtʃ/",
        "meaning": "n. 桃子",
        "mcItem": "Apple",
        "mcItemIcon": "🍑",
        "sampleSentence": "Juicy peaches.",
        "sampleTranslation": "多汁的桃子。"
      }
    ],
    "grammarNote": "一般现在时第三人称单数否定句：doesn't + 动词原形 (doesn't like)。"
  },
  "51": {
    "id": 51,
    "unit": 3,
    "title": "A pleasant climate",
    "titleZh": "宜人的气候",
    "topic": "Weather & Geography",
    "topicZh": "希腊与英国的气候对比",
    "grammar": "Where do you come from? 与 一般现在时国家与季节",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "HANS",
        "text": "Where do you come from?",
        "translation": "你是哪国人？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "I come from Greece.",
        "translation": "我来自希腊。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "What's the climate like in your country?",
        "translation": "你们国家的气候怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "It's very pleasant.",
        "translation": "气候非常宜人。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "What's the weather like in spring?",
        "translation": "春天的天气怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "It's often windy in March. It's always warm in April and May, but it rains sometimes.",
        "translation": "三月经常刮风。四月和五月总是很暖和，但有时下雨。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "What's it like in summer?",
        "translation": "夏天怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "It's always hot in June, July and August. The sun shines every day.",
        "translation": "六月、七月和八月总是很热。太阳每天都照耀着。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "Is it cold or warm in autumn?",
        "translation": "秋天冷还是暖和？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "It's always warm in September and October. It's often cold in November and it rains sometimes.",
        "translation": "九月和十月总是很暖和。十一月经常很冷，有时下雨。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "Is it very cold in winter?",
        "translation": "冬天非常冷吗？",
        "avatar": "👦"
      },
      {
        "speaker": "DIMITRI",
        "text": "It's often cold in December, January and February. It snows sometimes.",
        "translation": "十二月、一月和二月经常很冷。有时下雪。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Where do you come from? I come from Greece.",
        "zh": "你是哪国人？我来自希腊。"
      },
      {
        "en": "What's the climate like in your country? It's very pleasant.",
        "zh": "你们国家的气候怎么样？气候非常宜人。"
      },
      {
        "en": "It's often windy in March. It's always warm in April and May, but it rains sometimes.",
        "zh": "三月经常刮风。四月和五月总是很暖和，但有时下雨。"
      },
      {
        "en": "It's always hot in June, July and August. The sun shines every day.",
        "zh": "六月、七月和八月总是很热。太阳每天都照耀着。"
      },
      {
        "en": "It's often cold in December, January and February. It snows sometimes.",
        "zh": "十二月、一月和二月经常很冷。有时下雪。"
      }
    ],
    "words": [
      {
        "word": "climate",
        "phonetic": "/ˈklaɪmət/",
        "meaning": "n. 气候",
        "mcItem": "Clock",
        "mcItemIcon": "🌤️",
        "sampleSentence": "A mild climate.",
        "sampleTranslation": "温和的气候。"
      },
      {
        "word": "pleasant",
        "phonetic": "/ˈpleznt/",
        "meaning": "adj. 宜人的",
        "mcItem": "Flower",
        "mcItemIcon": "🌸",
        "sampleSentence": "Pleasant weather.",
        "sampleTranslation": "宜人的天气。"
      },
      {
        "word": "spring",
        "phonetic": "/sprɪŋ/",
        "meaning": "n. 春季",
        "mcItem": "Oak Sapling",
        "mcItemIcon": "🌱",
        "sampleSentence": "Spring is coming.",
        "sampleTranslation": "春天来了。"
      },
      {
        "word": "summer",
        "phonetic": "/ˈsʌmə/",
        "meaning": "n. 夏季",
        "mcItem": "Sun",
        "mcItemIcon": "🏖️",
        "sampleSentence": "Hot summer days.",
        "sampleTranslation": "炎热的夏日。"
      },
      {
        "word": "autumn",
        "phonetic": "/ˈɔːtəm/",
        "meaning": "n. 秋季",
        "mcItem": "Birch Leaves",
        "mcItemIcon": "🍂",
        "sampleSentence": "Leaves fall in autumn.",
        "sampleTranslation": "秋天树叶飘落。"
      },
      {
        "word": "winter",
        "phonetic": "/ˈwɪntə/",
        "meaning": "n. 冬季",
        "mcItem": "Snowball",
        "mcItemIcon": "❄️",
        "sampleSentence": "It's cold in winter.",
        "sampleTranslation": "冬天很冷。"
      }
    ],
    "grammarNote": "频度副词：always (总是 100%), often (经常 70%), sometimes (有时 30%), never (从不 0%)。放于 be 动词之后，行为动词之前。"
  },
  "52": {
    "id": 52,
    "unit": 3,
    "title": "What nationality are they? Where do they come from?",
    "titleZh": "他们是哪国人？他们来自哪里？",
    "topic": "Nationalities & Months",
    "topicZh": "国籍、来源国与十二个月份",
    "grammar": "Where do you come from? I come from... 与 月份",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What nationality are you?",
        "translation": "你是哪国人？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm Greek. I come from Greece.",
        "translation": "我是希腊人。我来自希腊。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where does he come from?",
        "translation": "他来自哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He comes from England. He is English.",
        "translation": "他来自英国。他是英国人。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Where do you come from? I come from the United States.",
        "zh": "你来自哪里？我来自美国。"
      },
      {
        "en": "Where does he come from? He comes from France.",
        "zh": "他来自哪里？他来自法国。"
      },
      {
        "en": "Where do they come from? They come from Germany.",
        "zh": "他们来自哪里？他们来自德国。"
      },
      {
        "en": "January, February, March, April, May, June.",
        "zh": "一月，二月，三月，四月，五月，六月。"
      },
      {
        "en": "July, August, September, October, November, December.",
        "zh": "七月，八月，九月，十月，十一月，十二月。"
      }
    ],
    "words": [
      {
        "word": "January",
        "phonetic": "/ˈdʒænjuəri/",
        "meaning": "n. 一月",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "January is the first month.",
        "sampleTranslation": "一月是一年的第一个月。"
      },
      {
        "word": "March",
        "phonetic": "/mɑːtʃ/",
        "meaning": "n. 三月",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "It's windy in March.",
        "sampleTranslation": "三月份多风。"
      },
      {
        "word": "June",
        "phonetic": "/dʒuːn/",
        "meaning": "n. 六月",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "June is summer.",
        "sampleTranslation": "六月是夏天。"
      },
      {
        "word": "September",
        "phonetic": "/sepˈtembə/",
        "meaning": "n. 九月",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "September is autumn.",
        "sampleTranslation": "九月是秋天。"
      },
      {
        "word": "December",
        "phonetic": "/dɪˈsembə/",
        "meaning": "n. 十二月",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "December has Christmas.",
        "sampleTranslation": "十二月有圣诞节。"
      }
    ],
    "grammarNote": "12个月份名称前用介词 in：in March, in August, in December。"
  },
  "53": {
    "id": 53,
    "unit": 3,
    "title": "An interesting climate",
    "titleZh": "有趣的气候",
    "topic": "British Climate & Weather",
    "topicZh": "英国多变的气候与四季",
    "grammar": "What is the weather like in...? 与 气候描述",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "HANS",
        "text": "Where do you come from?",
        "translation": "你是哪国人？",
        "avatar": "👦"
      },
      {
        "speaker": "JIM",
        "text": "I come from England.",
        "translation": "我来自英国。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "What's the climate like in your country?",
        "translation": "你们国家的气候怎么样？",
        "avatar": "👦"
      },
      {
        "speaker": "JIM",
        "text": "It's mild, but it's not always pleasant.",
        "translation": "气候温和，但并不总是宜人。",
        "avatar": "👦"
      },
      {
        "speaker": "JIM",
        "text": "The weather's often cold in North and East England, and it's often warm in South and West England.",
        "translation": "英格兰北部和东部的天气经常冷，而南部和西部经常温暖。",
        "avatar": "👦"
      },
      {
        "speaker": "HANS",
        "text": "Which seasons do you like best?",
        "translation": "你最喜欢哪个季节？",
        "avatar": "👦"
      },
      {
        "speaker": "JIM",
        "text": "I like spring and summer. The days are long and the nights are short. The sun rises early and sets late.",
        "translation": "我喜欢春季和夏季。白天长，黑夜短。太阳升起得早，落山得晚。",
        "avatar": "👦"
      },
      {
        "speaker": "JIM",
        "text": "I don't like autumn and winter. The days are short and the nights are long. The sun rises late and sets early. Our climate is not very good, but it's certainly interesting. It's our favourite subject of conversation.",
        "translation": "我不喜欢秋季和冬季。白天短，黑夜长。太阳升起得迟，落山得早。我们的气候不算太好，但确实很有趣。它是我们最喜欢的谈话话题。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Where do you come from? I come from England.",
        "zh": "你是哪国人？我来自英国。"
      },
      {
        "en": "The weather's often cold in North and East England, and it's often warm in South and West England.",
        "zh": "英格兰北部和东部的天气经常冷，而南部和西部经常温暖。"
      },
      {
        "en": "Which seasons do you like best? I like spring and summer.",
        "zh": "你最喜欢哪个季节？我喜欢春季和夏季。"
      },
      {
        "en": "The days are long and the nights are short. The sun rises early and sets late.",
        "zh": "白天长，黑夜短。太阳升起得早，落山得晚。"
      },
      {
        "en": "Our climate is not very good, but it's certainly interesting. It's our favourite subject of conversation.",
        "zh": "我们的气候不算太好，但确实很有趣。它是我们最喜欢的谈话话题。"
      }
    ],
    "words": [
      {
        "word": "mild",
        "phonetic": "/maɪld/",
        "meaning": "adj. 温和的，温暖的",
        "mcItem": "Campfire",
        "mcItemIcon": "🌤️",
        "sampleSentence": "A mild winter.",
        "sampleTranslation": "温和的冬天。"
      },
      {
        "word": "north",
        "phonetic": "/nɔːθ/",
        "meaning": "n. & adj. 北方",
        "mcItem": "Compass",
        "mcItemIcon": "🧭",
        "sampleSentence": "North of England.",
        "sampleTranslation": "英格兰北部。"
      },
      {
        "word": "south",
        "phonetic": "/saʊθ/",
        "meaning": "n. & adj. 南方",
        "mcItem": "Compass",
        "mcItemIcon": "🧭",
        "sampleSentence": "Birds fly to the south.",
        "sampleTranslation": "鸟儿飞向南方。"
      },
      {
        "word": "season",
        "phonetic": "/ˈsiːzn/",
        "meaning": "n. 季节",
        "mcItem": "Clock",
        "mcItemIcon": "🍂",
        "sampleSentence": "Four seasons in a year.",
        "sampleTranslation": "一年有四个季节。"
      },
      {
        "word": "rise",
        "phonetic": "/raɪz/",
        "meaning": "v. 升起",
        "mcItem": "Sun",
        "mcItemIcon": "🌅",
        "sampleSentence": "The sun rises early.",
        "sampleTranslation": "太阳升起得很早。"
      },
      {
        "word": "conversation",
        "phonetic": "/ˌkɒnvəˈseɪʃn/",
        "meaning": "n. 谈话",
        "mcItem": "Book",
        "mcItemIcon": "💬",
        "sampleSentence": "A friendly conversation.",
        "sampleTranslation": "友好的交谈。"
      }
    ],
    "grammarNote": "反义词搭配：north/south, east/west, long/short, rise/set, early/late。Which season do you like best? 最喜欢哪季？"
  },
  "54": {
    "id": 54,
    "unit": 3,
    "title": "What nationality are they? Where do they come from?",
    "titleZh": "他们是哪国人？他们来自哪里？",
    "topic": "Global Geography",
    "topicZh": "更多国家与国籍问答",
    "grammar": "What nationality is he? / Where does he come from?",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What nationality is she?",
        "translation": "她是哪国人？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She's French. She comes from France.",
        "translation": "她是法国人。她来自法国。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where do they come from?",
        "translation": "他们来自哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They come from Germany. They are German.",
        "translation": "他们来自德国。他们是德国人。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He is Australian. He comes from Australia.",
        "zh": "他是澳大利亚人。他来自澳大利亚。"
      },
      {
        "en": "She is Austrian. She comes from Austria.",
        "zh": "她是奥地利人。她来自奥地利。"
      },
      {
        "en": "He is Canadian. He comes from Canada.",
        "zh": "他是加拿大人。他来自加拿大。"
      },
      {
        "en": "She is Chinese. She comes from China.",
        "zh": "她是中国人。她来自中国。"
      },
      {
        "en": "He is Finnish. He comes from Finland.",
        "zh": "他是芬兰人。他来自芬兰。"
      },
      {
        "en": "She is Indian. She comes from India.",
        "zh": "她是印度人。她来自印度。"
      },
      {
        "en": "He is Japanese. He comes from Japan.",
        "zh": "他是日本人。他来自日本。"
      },
      {
        "en": "She is Nigerian. She comes from Nigeria.",
        "zh": "她是尼日利亚人。她来自尼日利亚。"
      },
      {
        "en": "He is Turkish. He comes from Turkey.",
        "zh": "他是土耳其人。他来自土耳其。"
      },
      {
        "en": "She is Korean. She comes from Korea.",
        "zh": "她是韩国人。她来自韩国。"
      }
    ],
    "words": [
      {
        "word": "Australia",
        "phonetic": "/ɒˈstreɪliə/",
        "meaning": "n. 澳大利亚",
        "mcItem": "Banner",
        "mcItemIcon": "🇦🇺",
        "sampleSentence": "He comes from Australia.",
        "sampleTranslation": "他来自澳大利亚。"
      },
      {
        "word": "Canada",
        "phonetic": "/ˈkænədə/",
        "meaning": "n. 加拿大",
        "mcItem": "Banner",
        "mcItemIcon": "🇨🇦",
        "sampleSentence": "Canada is cold in winter.",
        "sampleTranslation": "加拿大冬天很冷。"
      },
      {
        "word": "China",
        "phonetic": "/ˈtʃaɪnə/",
        "meaning": "n. 中国",
        "mcItem": "Banner",
        "mcItemIcon": "🇨🇳",
        "sampleSentence": "We love China.",
        "sampleTranslation": "我们热爱中国。"
      },
      {
        "word": "Japan",
        "phonetic": "/dʒəˈpæn/",
        "meaning": "n. 日本",
        "mcItem": "Banner",
        "mcItemIcon": "🇯🇵",
        "sampleSentence": "He is from Japan.",
        "sampleTranslation": "他来自日本。"
      }
    ],
    "grammarNote": "国家与国籍对应关系：China -> Chinese, Japan -> Japanese, Canada -> Canadian, Australia -> Australian。"
  },
  "55": {
    "id": 55,
    "unit": 3,
    "title": "The Sawyer family",
    "titleZh": "索耶一家人",
    "topic": "Daily Routine & Family",
    "topicZh": "家庭日常生活日程安排",
    "grammar": "一般现在时第三人称单数 (动词加 -s/-es)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "ALEX",
        "text": "The Sawyers live at 87 King Street.",
        "translation": "索耶一家住在国王街87号。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "In the morning, Mr. Sawyer goes to work and the children go to school.",
        "translation": "早上，索耶先生去上班，孩子们去上学。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "Mrs. Sawyer stays at home every day. She does the housework. She always eats her lunch at noon.",
        "translation": "索耶太太每天呆在家里。她做家务。她总是在中午吃午饭。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "In the afternoon, she usually sees her friends. They often drink tea together.",
        "translation": "下午，她通常去会朋友。她们经常在一起喝茶。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "In the evening, the children come home from school. They arrive home early. Mr. Sawyer comes home from work. He arrives home late.",
        "translation": "傍晚，孩子们放学回家。他们到家很早。索耶先生下班回家。他到家很晚。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "At night, the children always do their homework, then they go to bed. Mr. Sawyer usually reads his newspaper, but sometimes he and his wife watch television.",
        "translation": "晚上，孩子们总是做作业，然后上床睡觉。索耶先生通常看报纸，但有时他和妻子一起看电视。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "The Sawyers live at 87 King Street.",
        "zh": "索耶一家住在国王街87号。"
      },
      {
        "en": "In the morning, Mr. Sawyer goes to work and the children go to school.",
        "zh": "早上，索耶先生去上班，孩子们去上学。"
      },
      {
        "en": "Mrs. Sawyer stays at home every day. She does the housework.",
        "zh": "索耶太太每天呆在家里。她做家务。"
      },
      {
        "en": "In the afternoon, she usually sees her friends. They often drink tea together.",
        "zh": "下午，她通常去会朋友。她们经常在一起喝茶。"
      },
      {
        "en": "In the evening, the children come home from school. Mr. Sawyer comes home from work.",
        "zh": "傍晚，孩子们放学回家。索耶先生下班回家。"
      },
      {
        "en": "At night, the children always do their homework. Mr. Sawyer usually reads his newspaper.",
        "zh": "晚上，孩子们总是做作业。索耶先生通常看报纸。"
      }
    ],
    "words": [
      {
        "word": "housework",
        "phonetic": "/ˈhaʊswɜːk/",
        "meaning": "n. 家务",
        "mcItem": "Broom",
        "mcItemIcon": "🧹",
        "sampleSentence": "She does the housework.",
        "sampleTranslation": "她做家务。"
      },
      {
        "word": "lunch",
        "phonetic": "/lʌntʃ/",
        "meaning": "n. 午餐",
        "mcItem": "Bread",
        "mcItemIcon": "🍱",
        "sampleSentence": "Eat lunch at noon.",
        "sampleTranslation": "中午吃午餐。"
      },
      {
        "word": "together",
        "phonetic": "/təˈɡeðə/",
        "meaning": "adv. 一起",
        "mcItem": "Heart",
        "mcItemIcon": "👥",
        "sampleSentence": "They play together.",
        "sampleTranslation": "他们一起玩。"
      },
      {
        "word": "evening",
        "phonetic": "/ˈiːvnɪŋ/",
        "meaning": "n. 傍晚，晚上",
        "mcItem": "Campfire",
        "mcItemIcon": "🌆",
        "sampleSentence": "In the evening.",
        "sampleTranslation": "在傍晚。"
      },
      {
        "word": "arrive",
        "phonetic": "/əˈraɪv/",
        "meaning": "v. 到达",
        "mcItem": "Compass",
        "mcItemIcon": "🛬",
        "sampleSentence": "Arrive home early.",
        "sampleTranslation": "早早到家。"
      }
    ],
    "grammarNote": "时间介词搭配：in the morning / afternoon / evening; at noon / night / 6 o'clock。第三人称单数加 -s (lives, stays, reads, eats) 或 -es (goes, does, watches)。"
  },
  "56": {
    "id": 56,
    "unit": 3,
    "title": "What do they usually do?",
    "titleZh": "他们通常做什么？",
    "topic": "Daily Habits & Clock Times",
    "topicZh": "钟点时刻与日常习惯问答",
    "grammar": "What does he/she usually do at...? / He usually...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What does Mr. Sawyer usually do in the morning?",
        "translation": "索耶先生早上通常做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He usually goes to work at eight o'clock.",
        "translation": "他通常8点去上班。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What do the children do in the morning?",
        "translation": "孩子们早上做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They go to school at half past eight.",
        "translation": "他们8点半去上学。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He goes to work at eight o'clock in the morning.",
        "zh": "他早上8点去上班。"
      },
      {
        "en": "She does the housework at nine o'clock.",
        "zh": "她9点做家务。"
      },
      {
        "en": "She eats lunch at twelve o'clock at noon.",
        "zh": "她中午12点吃午饭。"
      },
      {
        "en": "She drinks tea at four o'clock in the afternoon.",
        "zh": "她下午4点喝茶。"
      },
      {
        "en": "The children come home at five o'clock in the evening.",
        "zh": "孩子们傍晚5点回家。"
      },
      {
        "en": "They do their homework at seven o'clock at night.",
        "zh": "他们晚上7点做作业。"
      }
    ],
    "words": [
      {
        "word": "usually",
        "phonetic": "/ˈjuː.ʒu.ə.li/",
        "meaning": "adv. 通常地，平常",
        "mcItem": "Clock",
        "mcItemIcon": "⏰",
        "sampleSentence": "He usually goes to work at eight.",
        "sampleTranslation": "他通常八点去上班。"
      },
      {
        "word": "morning",
        "phonetic": "/ˈmɔː.nɪŋ/",
        "meaning": "n. 早晨，上午",
        "mcItem": "Daylight Detector",
        "mcItemIcon": "🌅",
        "sampleSentence": "Farm wheat in the morning.",
        "sampleTranslation": "早晨收割小麦。"
      },
      {
        "word": "afternoon",
        "phonetic": "/ˌɑːf.təˈnuːn/",
        "meaning": "n. 下午",
        "mcItem": "Sun",
        "mcItemIcon": "☀️",
        "sampleSentence": "Study in the afternoon.",
        "sampleTranslation": "下午学习。"
      },
      {
        "word": "evening",
        "phonetic": "/ˈiːv.nɪŋ/",
        "meaning": "n. 傍晚，晚上",
        "mcItem": "Campfire",
        "mcItemIcon": "🌆",
        "sampleSentence": "Read books in the evening.",
        "sampleTranslation": "傍晚看书。"
      },
      {
        "word": "night",
        "phonetic": "/naɪt/",
        "meaning": "n. 夜晚，黑夜",
        "mcItem": "Bed",
        "mcItemIcon": "🌙",
        "sampleSentence": "Sleep peacefully at night.",
        "sampleTranslation": "夜晚安稳入睡。"
      },
      {
        "word": "housework",
        "phonetic": "/ˈhaʊs.wɜːk/",
        "meaning": "n. 家务劳动",
        "mcItem": "Broom",
        "mcItemIcon": "🧹",
        "sampleSentence": "She does the housework at nine o'clock.",
        "sampleTranslation": "她在九点钟做家务。"
      }
    ],
    "grammarNote": "具体钟点前用介词 at：at eight o'clock, at half past eight。"
  },
  "57": {
    "id": 57,
    "unit": 3,
    "title": "An unusual day",
    "titleZh": "很不平常的一天",
    "topic": "Routine vs. Ongoing Actions",
    "topicZh": "日常习惯与当下特殊情况对比",
    "grammar": "一般现在时 (通常习惯) 与 现在进行时 (此时此刻) 综合对比",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "ALEX",
        "text": "It is eight o'clock. The children go to school by car every day, but today, they are going to school on foot.",
        "translation": "现在是8点钟。孩子们每天乘小汽车去上学，但今天，他们正步行去上学。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "It is ten o'clock. Mrs. Sawyer usually stays at home in the morning, but this morning, she is going to the shops.",
        "translation": "现在是10点钟。索耶太太通常上午呆在家里，但今天上午，她正去商店买东西。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "It is four o'clock. In the afternoon, Mrs. Sawyer usually drinks tea in the living room, but this afternoon, she is drinking tea in the garden.",
        "translation": "现在是4点钟。下午，索耶太太通常在客厅喝茶，但今天下午，她正在花园里喝茶。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "It is six o'clock. In the evening, the children usually do their homework, but this evening, they are not doing their homework. They are playing in the garden.",
        "translation": "现在是6点钟。傍晚，孩子们通常做作业，但今天傍晚，他们没做作业。他们正在花园里玩。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "It is nine o'clock. Mr. Sawyer usually reads his newspaper at night, but tonight he is not reading his newspaper. He is reading an interesting book.",
        "translation": "现在是9点钟。索耶先生通常在晚上看报纸，但今晚他没看报纸。他正在读一本有趣的书。",
        "avatar": "👩‍🦰"
      }
    ],
    "sentences": [
      {
        "en": "The children go to school by car every day, but today, they are going to school on foot.",
        "zh": "孩子们每天乘车上学，但今天他们步行去上学。"
      },
      {
        "en": "Mrs. Sawyer usually stays at home, but this morning, she is going to the shops.",
        "zh": "索耶太太通常呆在家里，但今天上午她正去商店。"
      },
      {
        "en": "Mrs. Sawyer usually drinks tea in the living room, but this afternoon, she is drinking tea in the garden.",
        "zh": "索耶太太通常在客厅喝茶，但今天下午她在花园里喝茶。"
      },
      {
        "en": "The children usually do their homework, but this evening, they are playing in the garden.",
        "zh": "孩子们通常做作业，但今天傍晚他们在花园里玩耍。"
      },
      {
        "en": "Mr. Sawyer usually reads his newspaper, but tonight he is reading an interesting book.",
        "zh": "索耶先生通常看报纸，但今晚他在读一本有趣的书。"
      }
    ],
    "words": [
      {
        "word": "o'clock",
        "phonetic": "/əˈklɒk/",
        "meaning": "adv. ……点钟",
        "mcItem": "Clock",
        "mcItemIcon": "🕒",
        "sampleSentence": "It is eight o'clock.",
        "sampleTranslation": "现在是8点钟。"
      },
      {
        "word": "shop",
        "phonetic": "/ʃɒp/",
        "meaning": "n. 商店",
        "mcItem": "Emerald",
        "mcItemIcon": "🏬",
        "sampleSentence": "She is going to the shops.",
        "sampleTranslation": "她正去商店买东西。"
      },
      {
        "word": "moment",
        "phonetic": "/ˈməʊmənt/",
        "meaning": "n. 片刻，瞬间",
        "mcItem": "Clock",
        "mcItemIcon": "⏱️",
        "sampleSentence": "At the moment.",
        "sampleTranslation": "此刻，目前。"
      }
    ],
    "grammarNote": "时态对比标志词：usually / every day (一般现在时) vs. today / this morning / at the moment (现在进行时)。交通方式：by car / on foot。"
  },
  "58": {
    "id": 58,
    "unit": 3,
    "title": "What's the time?",
    "titleZh": "几点钟了？",
    "topic": "Telling Time",
    "topicZh": "时间表达法 (past / to)",
    "grammar": "What's the time? / It's ... past / to ...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's the time, please?",
        "translation": "请问几点钟了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's eight o'clock.",
        "translation": "8点整。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's the time now?",
        "translation": "现在几点了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's a quarter past eight.",
        "translation": "8点15分。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's the time by your watch?",
        "translation": "你的表几点了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's half past eight.",
        "translation": "8点半。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is it nine o'clock yet?",
        "translation": "到9点了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, it's a quarter to nine.",
        "translation": "还没，差一刻9点 (8点45)。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "It is seven o'clock.",
        "zh": "现在是7点整。"
      },
      {
        "en": "It is five past seven.",
        "zh": "现在是7点05分。"
      },
      {
        "en": "It is a quarter past seven.",
        "zh": "现在是7点15分。"
      },
      {
        "en": "It is half past seven.",
        "zh": "现在是7点30分。"
      },
      {
        "en": "It is twenty to eight.",
        "zh": "现在是差20分8点 (7点40)。"
      },
      {
        "en": "It is a quarter to eight.",
        "zh": "现在是差一刻8点 (7点45)。"
      },
      {
        "en": "It is ten to eight.",
        "zh": "现在是差10分8点 (7点50)。"
      }
    ],
    "words": [
      {
        "word": "time",
        "phonetic": "/taɪm/",
        "meaning": "n. 时间",
        "mcItem": "Clock",
        "mcItemIcon": "⏱️",
        "sampleSentence": "What's the time, please?",
        "sampleTranslation": "请问几点了？"
      },
      {
        "word": "half",
        "phonetic": "/hɑːf/",
        "meaning": "n. 半，一半",
        "mcItem": "Cake",
        "mcItemIcon": "🌓",
        "sampleSentence": "It is half past seven.",
        "sampleTranslation": "现在是七点半。"
      },
      {
        "word": "past",
        "phonetic": "/pɑːst/",
        "meaning": "prep. 过了(几点)",
        "mcItem": "Rail",
        "mcItemIcon": "⏭️",
        "sampleSentence": "It is ten past eight.",
        "sampleTranslation": "现在是八点十分。"
      },
      {
        "word": "quarter",
        "phonetic": "/ˈkwɔː.tər/",
        "meaning": "n. 一刻钟，四分之一",
        "mcItem": "Gold Nugget",
        "mcItemIcon": "🕒",
        "sampleSentence": "It is a quarter past nine.",
        "sampleTranslation": "现在是九点一刻。"
      },
      {
        "word": "clock",
        "phonetic": "/klɒk/",
        "meaning": "n. 钟，时钟",
        "mcItem": "Clock",
        "mcItemIcon": "🕰️",
        "sampleSentence": "The wall clock is ticking.",
        "sampleTranslation": "挂钟在滴答作响。"
      },
      {
        "word": "o'clock",
        "phonetic": "/əˈklɒk/",
        "meaning": "adv. ...点钟",
        "mcItem": "Bell",
        "mcItemIcon": "⏰",
        "sampleSentence": "It is exactly eight o'clock.",
        "sampleTranslation": "现在正好是八点整。"
      }
    ],
    "grammarNote": "时间表达：分针≤30分用 past (a quarter past eight = 8:15)；分针>30分用 to (a quarter to nine = 8:45)。"
  },
  "59": {
    "id": 59,
    "unit": 3,
    "title": "Is that all?",
    "titleZh": "就这些吗？",
    "topic": "Grocery Shopping & Quantities",
    "topicZh": "杂货店购物与计量词",
    "grammar": "I want some... / Have you got any...? 与 容器量词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "GROCER",
        "text": "Good morning, Mrs. Richards.",
        "translation": "早上好，理查兹太太。",
        "avatar": "👨‍🌾"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "Good morning, Mr. Jenkins.",
        "translation": "早上好，詹金斯先生。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "I want some envelopes, please.",
        "translation": "请给我拿几个信封。",
        "avatar": "👩"
      },
      {
        "speaker": "GROCER",
        "text": "Do you want the large size or the small size?",
        "translation": "您要大号的还是小号的？",
        "avatar": "👨‍🌾"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "The large size, please. Do you have any writing paper?",
        "translation": "要大号的。您有信纸吗？",
        "avatar": "👩"
      },
      {
        "speaker": "GROCER",
        "text": "Yes, we do. I don't have any small pads, but I have some large pads. Would you like this pad?",
        "translation": "有。我没有小本的便笺薄，但有些大本的。您要这种吗？",
        "avatar": "👨‍🌾"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "Yes, please. I want that one. And I want a bottle of ink, too.",
        "translation": "好的，我就要那本。我还要一瓶墨水。",
        "avatar": "👩"
      },
      {
        "speaker": "GROCER",
        "text": "What colour? Blue or black?",
        "translation": "什么颜色的？蓝色的还是黑色的？",
        "avatar": "👨‍🌾"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "Blue, please.",
        "translation": "蓝色的。",
        "avatar": "👩"
      },
      {
        "speaker": "GROCER",
        "text": "A large bottle or a small one?",
        "translation": "大瓶的还是小瓶的？",
        "avatar": "👨‍🌾"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "A small one, please. Is that all?",
        "translation": "请拿小瓶的。就这些了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. RICHARDS",
        "text": "No, I want half a pound of butter, and a tin of tobacco, too.",
        "translation": "不，我还要半磅黄油和一罐烟丝。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "I want some envelopes, please. Do you want the large size or the small size?",
        "zh": "请给我拿几个信封。您要大号的还是小号的？"
      },
      {
        "en": "Do you have any writing paper? I don't have any small pads, but I have some large pads.",
        "zh": "您有信纸吗？我没有小本便笺薄，但有些大本的。"
      },
      {
        "en": "I want a bottle of ink, too. Blue, please.",
        "zh": "我还要一瓶墨水。请拿蓝色的。"
      },
      {
        "en": "Is that all? No, I want half a pound of butter, and a tin of tobacco, too.",
        "zh": "就这些了吗？不，我还要半磅黄油和一罐烟丝。"
      }
    ],
    "words": [
      {
        "word": "envelope",
        "phonetic": "/ˈenvələʊp/",
        "meaning": "n. 信封",
        "mcItem": "Paper",
        "mcItemIcon": "✉️",
        "sampleSentence": "Put the letter in the envelope.",
        "sampleTranslation": "把信放进信封。"
      },
      {
        "word": "pad",
        "phonetic": "/pæd/",
        "meaning": "n. 便笺簿",
        "mcItem": "Book",
        "mcItemIcon": "📝",
        "sampleSentence": "A pad of writing paper.",
        "sampleTranslation": "一本信纸便笺薄。"
      },
      {
        "word": "ink",
        "phonetic": "/ɪŋk/",
        "meaning": "n. 墨水",
        "mcItem": "Ink Sac",
        "mcItemIcon": "🖋️",
        "sampleSentence": "A bottle of blue ink.",
        "sampleTranslation": "一瓶蓝墨水。"
      },
      {
        "word": "tobacco",
        "phonetic": "/təˈbækəʊ/",
        "meaning": "n. 烟丝，烟草",
        "mcItem": "Wheat Seeds",
        "mcItemIcon": "🍂",
        "sampleSentence": "A tin of tobacco.",
        "sampleTranslation": "一听烟丝。"
      },
      {
        "word": "size",
        "phonetic": "/saɪz/",
        "meaning": "n. 尺寸，大小",
        "mcItem": "Compass",
        "mcItemIcon": "📐",
        "sampleSentence": "What size do you want?",
        "sampleTranslation": "你要什么尺码？"
      }
    ],
    "grammarNote": "量词搭配：a pad of (便笺簿), a bottle of (墨水), a tin of (烟草), half a pound of (半磅)。"
  },
  "60": {
    "id": 60,
    "unit": 3,
    "title": "What's the time?",
    "titleZh": "几点钟了？",
    "topic": "Time Practice & Routines",
    "topicZh": "时间表达深化与日常活动时间",
    "grammar": "It's ... past / to ... 钟点练习",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's the time?",
        "translation": "几点钟了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's five past one.",
        "translation": "1点05分。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's the time?",
        "translation": "几点钟了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's twenty to three.",
        "translation": "2点40分 (差20分3点)。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "It's five past one.",
        "zh": "1点05分。"
      },
      {
        "en": "It's ten past two.",
        "zh": "2点10分。"
      },
      {
        "en": "It's a quarter past three.",
        "zh": "3点15分。"
      },
      {
        "en": "It's twenty past four.",
        "zh": "4点20分。"
      },
      {
        "en": "It's twenty-five past five.",
        "zh": "5点25分。"
      },
      {
        "en": "It's half past six.",
        "zh": "6点30分。"
      },
      {
        "en": "It's twenty-five to seven.",
        "zh": "6点35分。"
      },
      {
        "en": "It's twenty to eight.",
        "zh": "7点40分。"
      },
      {
        "en": "It's a quarter to nine.",
        "zh": "8点45分。"
      },
      {
        "en": "It's ten to ten.",
        "zh": "9点50分。"
      }
    ],
    "words": [
      {
        "word": "to",
        "phonetic": "/tuː/",
        "meaning": "prep. 差(几点到几点)",
        "mcItem": "Compass",
        "mcItemIcon": "⏳",
        "sampleSentence": "It is ten to nine.",
        "sampleTranslation": "现在是差十分九点。"
      },
      {
        "word": "early",
        "phonetic": "/ˈɜː.li/",
        "meaning": "adj./adv. 早的，提早",
        "mcItem": "Daylight Detector",
        "mcItemIcon": "🌄",
        "sampleSentence": "They arrived early today.",
        "sampleTranslation": "他们今天到得很早。"
      },
      {
        "word": "late",
        "phonetic": "/leɪt/",
        "meaning": "adj./adv. 迟的，迟到",
        "mcItem": "Soul Lantern",
        "mcItemIcon": "⌛",
        "sampleSentence": "Don't be late for class.",
        "sampleTranslation": "上课不要迟到。"
      },
      {
        "word": "minute",
        "phonetic": "/ˈmɪn.ɪt/",
        "meaning": "n. 分钟",
        "mcItem": "Redstone Repeater",
        "mcItemIcon": "⏲️",
        "sampleSentence": "Wait for twenty minutes.",
        "sampleTranslation": "等待二十分钟。"
      },
      {
        "word": "hurry",
        "phonetic": "/ˈhʌr.i/",
        "meaning": "v. 匆忙，赶快",
        "mcItem": "Potion of Swiftness",
        "mcItemIcon": "🏃",
        "sampleSentence": "Hurry up, we have ten minutes.",
        "sampleTranslation": "快点，我们还有十分钟。"
      },
      {
        "word": "catch",
        "phonetic": "/kætʃ/",
        "meaning": "v. 赶上，捕捉",
        "mcItem": "Lead",
        "mcItemIcon": "🎣",
        "sampleSentence": "Run fast to catch the bus.",
        "sampleTranslation": "快跑去赶公共汽车。"
      }
    ],
    "grammarNote": "数字 1-60 在时间中的运用：five past, ten past, quarter past, twenty past, half past, twenty to, quarter to, ten to, five to。"
  },
  "61": {
    "id": 61,
    "unit": 3,
    "title": "A bad cold",
    "titleZh": "重感冒",
    "topic": "Illness & Medical Advice",
    "topicZh": "生病不适与医生嘱咐",
    "grammar": "Have you got a...? / You must stay in bed",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "MR. WILLIAMS",
        "text": "Where's Jimmy?",
        "translation": "吉米在哪儿？",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "He's in bed.",
        "translation": "他躺在床上呢。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. WILLIAMS",
        "text": "What's the matter with him?",
        "translation": "他怎么啦？",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "He feels ill.",
        "translation": "他觉得不舒服。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. WILLIAMS",
        "text": "He looks ill. We must call the doctor.",
        "translation": "他看起来病了。我们得叫医生。",
        "avatar": "👨"
      },
      {
        "speaker": "DOCTOR",
        "text": "How is Jimmy today?",
        "translation": "吉米今天怎么样？",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "He's not very well, Doctor.",
        "translation": "他不太好，医生。",
        "avatar": "👩"
      },
      {
        "speaker": "DOCTOR",
        "text": "Open your mouth, Jimmy. Show me your tongue. Say 'Ah'.",
        "translation": "张开嘴，吉米。让我看看你的舌头。说‘啊——’。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "DOCTOR",
        "text": "He has a bad cold, Mrs. Williams, so he must stay in bed for a week. That's good news for Jimmy. He doesn't like school!",
        "translation": "他得了重感冒，威廉斯太太，因此他必须卧床一周。这对吉米是个好消息。他不喜欢上学！",
        "avatar": "👨‍⚕️"
      }
    ],
    "sentences": [
      {
        "en": "Where's Jimmy? He's in bed. He feels ill.",
        "zh": "吉米在哪儿？他躺在床上呢。他觉得不舒服。"
      },
      {
        "en": "He looks ill. We must call the doctor.",
        "zh": "他看起来病了。我们必须叫医生。"
      },
      {
        "en": "Open your mouth, Jimmy. Show me your tongue. Say 'Ah'.",
        "zh": "张开嘴，吉米。让我看看你的舌头。说‘啊——’。"
      },
      {
        "en": "He has a bad cold, so he must stay in bed for a week.",
        "zh": "他得了重感冒，因此他必须在床上躺一周。"
      },
      {
        "en": "That's good news for Jimmy. He doesn't like school!",
        "zh": "这对吉米是个好消息。他不喜欢上学！"
      }
    ],
    "words": [
      {
        "word": "doctor",
        "phonetic": "/ˈdɒktə/",
        "meaning": "n. 医生",
        "mcItem": "Potion",
        "mcItemIcon": "👨‍⚕️",
        "sampleSentence": "Call the doctor.",
        "sampleTranslation": "叫医生。"
      },
      {
        "word": "mouth",
        "phonetic": "/maʊθ/",
        "meaning": "n. 嘴",
        "mcItem": "Player Head",
        "mcItemIcon": "👄",
        "sampleSentence": "Open your mouth.",
        "sampleTranslation": "张开嘴。"
      },
      {
        "word": "tongue",
        "phonetic": "/tʌŋ/",
        "meaning": "n. 舌头",
        "mcItem": "Beef",
        "mcItemIcon": "👅",
        "sampleSentence": "Show me your tongue.",
        "sampleTranslation": "让我看看你的舌头。"
      },
      {
        "word": "cold",
        "phonetic": "/kəʊld/",
        "meaning": "n. 感冒",
        "mcItem": "Ice",
        "mcItemIcon": "🤧",
        "sampleSentence": "Have a bad cold.",
        "sampleTranslation": "得了重感冒。"
      },
      {
        "word": "news",
        "phonetic": "/njuːz/",
        "meaning": "n. 消息 (不可数)",
        "mcItem": "Paper",
        "mcItemIcon": "📰",
        "sampleSentence": "Good news!",
        "sampleTranslation": "好消息！"
      }
    ],
    "grammarNote": "系表结构：feel ill (感觉不适), look ill (看起来病了)。have a cold 得了感冒。stay in bed 卧床休息。"
  },
  "62": {
    "id": 62,
    "unit": 3,
    "title": "What's the matter with him/her/them?",
    "titleZh": "他/她/他们怎么了？",
    "topic": "Aches & Pains",
    "topicZh": "身体不适与各种病痛表达",
    "grammar": "have got a headache / stomach ache / toothache / earache / fever",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's the matter with him?",
        "translation": "他怎么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He has a headache. He must take an aspirin.",
        "translation": "他头痛。他必须吃一片阿司匹林。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's the matter with her?",
        "translation": "她怎么了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She has a toothache. She must see a dentist.",
        "translation": "她牙痛。她必须看牙医。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He has a headache. He must take an aspirin.",
        "zh": "他头痛。他必须吃阿司匹林。"
      },
      {
        "en": "She has a toothache. She must see a dentist.",
        "zh": "她牙痛。她必须去看牙医。"
      },
      {
        "en": "He has a stomach ache. He must take some medicine.",
        "zh": "他胃痛。他必须吃点药。"
      },
      {
        "en": "She has an earache. She must see a doctor.",
        "zh": "她耳朵痛。她必须去看医生。"
      },
      {
        "en": "He has a fever. He must stay in bed.",
        "zh": "他发烧了。他必须卧床休息。"
      },
      {
        "en": "He has measles. He must stay in bed.",
        "zh": "他出麻疹了。他必须卧床休息。"
      }
    ],
    "words": [
      {
        "word": "headache",
        "phonetic": "/ˈhedeɪk/",
        "meaning": "n. 头痛",
        "mcItem": "Skeleton Skull",
        "mcItemIcon": "🤕",
        "sampleSentence": "I have a headache.",
        "sampleTranslation": "我头疼。"
      },
      {
        "word": "aspirin",
        "phonetic": "/ˈæsprɪn/",
        "meaning": "n. 阿司匹林",
        "mcItem": "Sugar",
        "mcItemIcon": "💊",
        "sampleSentence": "Take an aspirin.",
        "sampleTranslation": "吃一片阿司匹林。"
      },
      {
        "word": "toothache",
        "phonetic": "/ˈtuːθeɪk/",
        "meaning": "n. 牙痛",
        "mcItem": "Quartz",
        "mcItemIcon": "🦷",
        "sampleSentence": "He has a toothache.",
        "sampleTranslation": "他牙疼。"
      },
      {
        "word": "dentist",
        "phonetic": "/ˈdentɪst/",
        "meaning": "n. 牙医",
        "mcItem": "Potion",
        "mcItemIcon": "🩺",
        "sampleSentence": "See a dentist.",
        "sampleTranslation": "看牙医。"
      },
      {
        "word": "medicine",
        "phonetic": "/ˈmedsn/",
        "meaning": "n. 药",
        "mcItem": "Potion",
        "mcItemIcon": "🧪",
        "sampleSentence": "Take your medicine.",
        "sampleTranslation": "把药吃了。"
      },
      {
        "word": "fever",
        "phonetic": "/ˈfiːvə/",
        "meaning": "n. 发烧",
        "mcItem": "Blaze Powder",
        "mcItemIcon": "🌡️",
        "sampleSentence": "She has a fever.",
        "sampleTranslation": "她发烧了。"
      }
    ],
    "grammarNote": "病痛词缀 -ache：headache (头痛), toothache (牙痛), earache (耳痛), stomach ache (胃痛)。have a fever 发烧。"
  },
  "63": {
    "id": 63,
    "unit": 3,
    "title": "Thank you, doctor.",
    "titleZh": "谢谢您，医生。",
    "topic": "Doctor's Advice & Recovery",
    "topicZh": "病情好转与复查要求",
    "grammar": "How is he today? / He is better / You mustn't...",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "DOCTOR",
        "text": "How's Jimmy today?",
        "translation": "吉米今天怎么样？",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "He's much better, thank you, Doctor.",
        "translation": "他好多了，谢谢您，医生。",
        "avatar": "👩"
      },
      {
        "speaker": "DOCTOR",
        "text": "Can I see him please, Mrs. Williams?",
        "translation": "我可以看看他吗，威廉斯太太？",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "Certainly, Doctor. Come upstairs.",
        "translation": "当然可以，医生。请上楼吧。",
        "avatar": "👩"
      },
      {
        "speaker": "DOCTOR",
        "text": "You look very well, Jimmy. You are better now, but you mustn't get up yet. You must stay in bed for another two days.",
        "translation": "你看起来气色很好，吉米。你现在好多了，但你还千万不能起床。你必须在床上再躺两天。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "DOCTOR",
        "text": "The boy mustn't go to school yet, Mrs. Williams. And he mustn't eat rich food.",
        "translation": "这孩子还不能去上学，威廉斯太太。而且他千万不能吃油腻的食物。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "Does he have a temperature, Doctor?",
        "translation": "他还发烧吗，医生？",
        "avatar": "👩"
      },
      {
        "speaker": "DOCTOR",
        "text": "No, he doesn't. He has no temperature now.",
        "translation": "不，他不发烧了。他现在体温正常。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "Must he stay in bed?",
        "translation": "他还必须卧床吗？",
        "avatar": "👩"
      },
      {
        "speaker": "DOCTOR",
        "text": "Yes, he must. He can get up for about two hours each day, but you must keep the room warm.",
        "translation": "是的，必须卧床。他每天可以起床活动大约两小时，但您必须保持房间温暖。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "DOCTOR",
        "text": "Where's Mr. Williams this evening?",
        "translation": "威廉斯先生今晚在哪儿？",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MRS. WILLIAMS",
        "text": "He's in bed, Doctor! He has a bad cold, too!",
        "translation": "他躺在床上呢，医生！他也得了重感冒！",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "How's Jimmy today? He's much better, thank you, Doctor.",
        "zh": "吉米今天怎么样？他好多了，谢谢您，医生。"
      },
      {
        "en": "You look very well, Jimmy. You mustn't get up yet.",
        "zh": "你看起来气色很好，吉米。你还千万不能起床。"
      },
      {
        "en": "The boy mustn't go to school yet, and he mustn't eat rich food.",
        "zh": "这孩子还不能去上学，而且他千万不能吃油腻食物。"
      },
      {
        "en": "Does he have a temperature, Doctor? No, he doesn't.",
        "zh": "他还发烧吗，医生？不，他体温正常。"
      },
      {
        "en": "Where's Mr. Williams this evening? He's in bed, too!",
        "zh": "威廉斯先生今晚在哪儿？他也躺在床上呢！"
      }
    ],
    "words": [
      {
        "word": "certainly",
        "phonetic": "/ˈsɜːtnli/",
        "meaning": "adv. 当然",
        "mcItem": "Emerald",
        "mcItemIcon": "👌",
        "sampleSentence": "Certainly, you may.",
        "sampleTranslation": "当然可以。"
      },
      {
        "word": "upstairs",
        "phonetic": "/ˌʌpˈsteəz/",
        "meaning": "adv. 在楼上，往楼上",
        "mcItem": "Ladder",
        "mcItemIcon": "🪜",
        "sampleSentence": "Come upstairs.",
        "sampleTranslation": "上楼来。"
      },
      {
        "word": "get up",
        "phonetic": "/ˌɡet ˈʌp/",
        "meaning": "起床",
        "mcItem": "Bed",
        "mcItemIcon": "🌅",
        "sampleSentence": "Get up early.",
        "sampleTranslation": "早起。"
      },
      {
        "word": "mustn't",
        "phonetic": "/ˈmʌsnt/",
        "meaning": "modal v. 不准，千万不可",
        "mcItem": "Barrier",
        "mcItemIcon": "🚫",
        "sampleSentence": "You mustn't touch it.",
        "sampleTranslation": "你千万不能碰它。"
      },
      {
        "word": "temperature",
        "phonetic": "/ˈtemprətʃə/",
        "meaning": "n. 体温，温度",
        "mcItem": "Blaze Rod",
        "mcItemIcon": "🌡️",
        "sampleSentence": "Have a temperature.",
        "sampleTranslation": "发烧。"
      }
    ],
    "grammarNote": "mustn't 表示“禁止、千万不可”；have a temperature 相当于 have a fever (发热/发烧)。"
  },
  "64": {
    "id": 64,
    "unit": 3,
    "title": "Don't ...! / You mustn't ...!",
    "titleZh": "不要……！ / 你千万不能……！",
    "topic": "Prohibitions & Warnings",
    "topicZh": "禁止与警告指令",
    "grammar": "Don't + 动词原形 与 You mustn't + 动词原形 对比",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Don't get up yet!",
        "translation": "先别起床！",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "You mustn't get up yet. You must stay in bed.",
        "translation": "你千万不能起床。你必须卧床休息。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Don't eat rich food!",
        "translation": "别吃油腻食物！",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "You mustn't eat rich food. It's bad for you.",
        "translation": "你千万不能吃油腻食物。对你身体不好。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Don't play with matches! You mustn't play with matches.",
        "zh": "别玩火柴！你千万不能玩火柴。"
      },
      {
        "en": "Don't drive fast! You mustn't drive fast.",
        "zh": "别开快车！你千万不能开快车。"
      },
      {
        "en": "Don't open the door! You mustn't open the door.",
        "zh": "别开门！你千万不能开门。"
      },
      {
        "en": "Don't cross the road! You mustn't cross the road.",
        "zh": "别过马路！你千万不能过马路。"
      }
    ],
    "words": [
      {
        "word": "must",
        "phonetic": "/mʌst/",
        "meaning": "modal v. 必须，应当",
        "mcItem": "Netherite Ingot",
        "mcItemIcon": "❗",
        "sampleSentence": "You must stay in bed.",
        "sampleTranslation": "你必须躺在床上休息。"
      },
      {
        "word": "mustn't",
        "phonetic": "/ˈmʌs.ənt/",
        "meaning": "modal v. 绝不准，不能",
        "mcItem": "Barrier",
        "mcItemIcon": "🚫",
        "sampleSentence": "You mustn't play with matches.",
        "sampleTranslation": "你绝不能玩火柴。"
      },
      {
        "word": "fast",
        "phonetic": "/fɑːst/",
        "meaning": "adv./adj. 快速地",
        "mcItem": "Powered Rail",
        "mcItemIcon": "⚡",
        "sampleSentence": "Don't drive too fast on rainy days.",
        "sampleTranslation": "雨天开车不要太快。"
      },
      {
        "word": "play",
        "phonetic": "/pleɪ/",
        "meaning": "v. 玩耍，玩弄",
        "mcItem": "Slimeball",
        "mcItemIcon": "🎮",
        "sampleSentence": "Don't play in the street.",
        "sampleTranslation": "不要在马路上玩耍。"
      },
      {
        "word": "quiet",
        "phonetic": "/ˈkwaɪ.ət/",
        "meaning": "adj. 安静的",
        "mcItem": "Wool",
        "mcItemIcon": "🤫",
        "sampleSentence": "You must be quiet in the hospital.",
        "sampleTranslation": "在医院里你必须保持安静。"
      },
      {
        "word": "match",
        "phonetic": "/mætʃ/",
        "meaning": "n. 火柴",
        "mcItem": "Torch",
        "mcItemIcon": "🔥",
        "sampleSentence": "Keep matches away from children.",
        "sampleTranslation": "让火柴远离孩子。"
      }
    ],
    "grammarNote": "否定祈使句 Don't... 与情态禁止 You mustn't... 表达语气强弱与转换。"
  },
  "65": {
    "id": 65,
    "unit": 3,
    "title": "Not a baby",
    "titleZh": "不是小孩子了",
    "topic": "Parenting & Growing Up",
    "topicZh": "父母管教与自我独立",
    "grammar": "反身代词 (myself, yourself) 与 钟点日程",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "FATHER",
        "text": "What are you doing, Jill?",
        "translation": "吉尔，你在干什么？",
        "avatar": "👨"
      },
      {
        "speaker": "JILL",
        "text": "I'm looking at myself in the mirror.",
        "translation": "我正在镜子里照我自己呢。",
        "avatar": "👧"
      },
      {
        "speaker": "FATHER",
        "text": "What are you going to do tonight?",
        "translation": "你今晚打算干什么？",
        "avatar": "👨"
      },
      {
        "speaker": "JILL",
        "text": "I'm going to the cinema with Terry.",
        "translation": "我打算和特里一起去看电影。",
        "avatar": "👧"
      },
      {
        "speaker": "FATHER",
        "text": "You must be home at ten o'clock, Jill. You mustn't be late.",
        "translation": "你必须在10点钟回家，吉尔。千万不能迟到。",
        "avatar": "👨"
      },
      {
        "speaker": "JILL",
        "text": "Oh, Dad! I'm not a baby! I'm seventeen! I can look after myself!",
        "translation": "哦，爸爸！我不是小孩子了！我十七岁了！我能照顾我自己！",
        "avatar": "👧"
      },
      {
        "speaker": "FATHER",
        "text": "I know you are seventeen, Jill. But you must be home at ten o'clock!",
        "translation": "我知道你十七岁了，吉尔。但你必须十点回家！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "What are you doing, Jill? I'm looking at myself in the mirror.",
        "zh": "吉尔，你在干什么？我正在照镜子。"
      },
      {
        "en": "What are you going to do tonight? I'm going to the cinema with Terry.",
        "zh": "你今晚打算干什么？我打算和特里一起去看电影。"
      },
      {
        "en": "You must be home at ten o'clock, Jill. You mustn't be late.",
        "zh": "你必须在10点钟回家，吉尔。千万不能迟到。"
      },
      {
        "en": "I'm not a baby! I'm seventeen! I can look after myself!",
        "zh": "我不是小孩子了！我十七岁了！我能照顾我自己！"
      }
    ],
    "words": [
      {
        "word": "baby",
        "phonetic": "/ˈbeɪbi/",
        "meaning": "n. 婴儿，幼童",
        "mcItem": "Player Head",
        "mcItemIcon": "👶",
        "sampleSentence": "The baby is sleeping.",
        "sampleTranslation": "宝宝正在睡觉。"
      },
      {
        "word": "myself",
        "phonetic": "/maɪˈself/",
        "meaning": "pron. 我自己",
        "mcItem": "Player Head",
        "mcItemIcon": "🪞",
        "sampleSentence": "I can do it myself.",
        "sampleTranslation": "我自己能做。"
      },
      {
        "word": "mirror",
        "phonetic": "/ˈmɪrə/",
        "meaning": "n. 镜子",
        "mcItem": "Glass Pane",
        "mcItemIcon": "🪞",
        "sampleSentence": "Look in the mirror.",
        "sampleTranslation": "照镜子。"
      },
      {
        "word": "cinema",
        "phonetic": "/ˈsɪnəmə/",
        "meaning": "n. 电影院",
        "mcItem": "Painting",
        "mcItemIcon": "🎬",
        "sampleSentence": "Go to the cinema.",
        "sampleTranslation": "去电影院。"
      },
      {
        "word": "seventeen",
        "phonetic": "/ˌsevnˈtiːn/",
        "meaning": "num. 十七",
        "mcItem": "Experience Bottle",
        "mcItemIcon": "1️⃣7️⃣",
        "sampleSentence": "She is seventeen.",
        "sampleTranslation": "她十七岁。"
      },
      {
        "word": "look after",
        "phonetic": "/ˌlʊk ˈɑːftə/",
        "meaning": "照料，照顾",
        "mcItem": "Heart",
        "mcItemIcon": "🤝",
        "sampleSentence": "Look after yourself.",
        "sampleTranslation": "照顾好你自己。"
      }
    ],
    "grammarNote": "反身代词：myself (我自己), yourself (你自己)。look after oneself 照顾某人自己。"
  },
  "66": {
    "id": 66,
    "unit": 3,
    "title": "What's the time?",
    "titleZh": "几点钟了？",
    "topic": "Time & Calendar",
    "topicZh": "时间问答与年龄数字",
    "grammar": "What's the time? / How old is he/she?",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's the time?",
        "translation": "几点钟了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's twenty past eight.",
        "translation": "8点20分。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "How old are you?",
        "translation": "你多大了？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm seventeen years old.",
        "translation": "我十七岁了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "It's five to ten.",
        "zh": "9点55分 (差5分10点)。"
      },
      {
        "en": "It's ten past eleven.",
        "zh": "11点10分。"
      },
      {
        "en": "It's half past twelve.",
        "zh": "12点30分。"
      },
      {
        "en": "She can look after herself.",
        "zh": "她能照顾好她自己。"
      },
      {
        "en": "He can look after himself.",
        "zh": "他能照顾好他自己。"
      },
      {
        "en": "They can look after themselves.",
        "zh": "他们能照顾好他们自己。"
      }
    ],
    "words": [
      {
        "word": "himself",
        "phonetic": "/hɪmˈself/",
        "meaning": "pron. 他自己",
        "mcItem": "Player Head",
        "mcItemIcon": "👦",
        "sampleSentence": "He saw himself.",
        "sampleTranslation": "他看到了他自己。"
      },
      {
        "word": "herself",
        "phonetic": "/hɜːˈself/",
        "meaning": "pron. 她自己",
        "mcItem": "Player Head",
        "mcItemIcon": "👧",
        "sampleSentence": "She dressed herself.",
        "sampleTranslation": "她自己穿衣服。"
      },
      {
        "word": "themselves",
        "phonetic": "/ðəmˈselvz/",
        "meaning": "pron. 他们自己",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "They enjoyed themselves.",
        "sampleTranslation": "他们玩得很开心。"
      }
    ],
    "grammarNote": "反身代词一览：myself, yourself, himself, herself, itself, ourselves, yourselves, themselves。"
  },
  "67": {
    "id": 67,
    "unit": 3,
    "title": "The weekend",
    "titleZh": "周末",
    "topic": "Weekend Plans & Simple Past Intro",
    "topicZh": "周末打算与做某事",
    "grammar": "What are you going to do at the weekend? 一般将来打算",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MR. JOHNSON",
        "text": "Hello, Peter. What are you going to do this weekend?",
        "translation": "你好，彼得。这个周末你打算做什么？",
        "avatar": "👨"
      },
      {
        "speaker": "PETER",
        "text": "I'm going to play football with my friends on Saturday afternoon.",
        "translation": "周六下午我打算和朋友们踢足球。",
        "avatar": "👦"
      },
      {
        "speaker": "MR. JOHNSON",
        "text": "Are you going to do your homework?",
        "translation": "你打算做作业吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PETER",
        "text": "Yes, I'm going to do my homework on Sunday morning.",
        "translation": "是的，我打算在周日上午做作业。",
        "avatar": "👦"
      },
      {
        "speaker": "MR. JOHNSON",
        "text": "What about Sunday afternoon?",
        "translation": "周日下午呢？",
        "avatar": "👨"
      },
      {
        "speaker": "PETER",
        "text": "My father and I are going to wash the car. Then in the evening, we are going to watch television.",
        "translation": "我和爸爸打算洗车。然后晚上我们打算看电视。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "What are you going to do this weekend?",
        "zh": "这个周末你打算做什么？"
      },
      {
        "en": "I'm going to play football with my friends on Saturday afternoon.",
        "zh": "周六下午我打算和朋友们踢足球。"
      },
      {
        "en": "I'm going to do my homework on Sunday morning.",
        "zh": "我打算在周日上午做作业。"
      },
      {
        "en": "My father and I are going to wash the car.",
        "zh": "我和爸爸打算洗车。"
      }
    ],
    "words": [
      {
        "word": "weekend",
        "phonetic": "/ˌwiːkˈend/",
        "meaning": "n. 周末",
        "mcItem": "Clock",
        "mcItemIcon": "🏖️",
        "sampleSentence": "Have a nice weekend.",
        "sampleTranslation": "周末愉快。"
      },
      {
        "word": "football",
        "phonetic": "/ˈfʊtbɔːl/",
        "meaning": "n. 足球",
        "mcItem": "Slimeball",
        "mcItemIcon": "⚽",
        "sampleSentence": "Play football.",
        "sampleTranslation": "踢足球。"
      },
      {
        "word": "Saturday",
        "phonetic": "/ˈsætədeɪ/",
        "meaning": "n. 星期六",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "See you on Saturday.",
        "sampleTranslation": "周六见。"
      },
      {
        "word": "Sunday",
        "phonetic": "/ˈsʌndeɪ/",
        "meaning": "n. 星期日",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "Sunday is a rest day.",
        "sampleTranslation": "星期日是休息日。"
      }
    ],
    "grammarNote": "星期几前面用介词 on：on Saturday, on Sunday morning。"
  },
  "68": {
    "id": 68,
    "unit": 3,
    "title": "What's the time?",
    "titleZh": "几点钟了？",
    "topic": "Days of the Week",
    "topicZh": "星期与日程安排",
    "grammar": "on + 星期几 与 be going to",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What are you going to do on Monday?",
        "translation": "你星期一打算做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm going to work.",
        "translation": "我打算去上班。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What is he going to do on Friday?",
        "translation": "他星期五打算做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He is going to visit his grandparents.",
        "translation": "他打算去拜访祖父母。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.",
        "zh": "星期一，星期二，星期三，星期四，星期五，星期六，星期日。"
      },
      {
        "en": "What are you going to do on Wednesday?",
        "zh": "你星期三打算做什么？"
      },
      {
        "en": "I'm going to clean the house on Friday.",
        "zh": "我打算周五打扫房子。"
      }
    ],
    "words": [
      {
        "word": "Monday",
        "phonetic": "/ˈmʌndeɪ/",
        "meaning": "n. 星期一",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "On Monday.",
        "sampleTranslation": "在星期一。"
      },
      {
        "word": "Tuesday",
        "phonetic": "/ˈtjuːzdeɪ/",
        "meaning": "n. 星期二",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "On Tuesday.",
        "sampleTranslation": "在星期二。"
      },
      {
        "word": "Wednesday",
        "phonetic": "/ˈwenzdeɪ/",
        "meaning": "n. 星期三",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "On Wednesday.",
        "sampleTranslation": "在星期三。"
      },
      {
        "word": "Thursday",
        "phonetic": "/ˈθɜːzdeɪ/",
        "meaning": "n. 星期四",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "On Thursday.",
        "sampleTranslation": "在星期四。"
      },
      {
        "word": "Friday",
        "phonetic": "/ˈfraɪdeɪ/",
        "meaning": "n. 星期五",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "On Friday.",
        "sampleTranslation": "在星期五。"
      }
    ],
    "grammarNote": "一周七天的英文名称及缩写：Mon, Tue, Wed, Thu, Fri, Sat, Sun。"
  },
  "69": {
    "id": 69,
    "unit": 3,
    "title": "The car race",
    "titleZh": "汽车比赛",
    "topic": "Car Racing & Simple Past (was/were)",
    "topicZh": "赛车现场与一般过去时 be 动词",
    "grammar": "一般过去时 be 动词 (There was / There were / was / were)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "JACK",
        "text": "There is a car race near our town every year. In 1995, there was a very big race.",
        "translation": "我们镇附近每年都有一场赛车。在1995年，有一场非常盛大的比赛。",
        "avatar": "👨"
      },
      {
        "speaker": "JULIE",
        "text": "There were hundreds of people there. My wife and I were at the race.",
        "translation": "那里有成百上千的人。我和我的妻子当时都在比赛现场。",
        "avatar": "👩"
      },
      {
        "speaker": "JACK",
        "text": "Our friends Julie and Jack were there, too. You can see us in the crowd. We were on the left.",
        "translation": "我们的朋友朱莉和杰克也在那儿。你可以在人群中看到我们。我们当时在左边。",
        "avatar": "👨"
      },
      {
        "speaker": "JULIE",
        "text": "There were twenty cars in the race. There were English cars, French cars, German cars, and Italian cars.",
        "translation": "比赛中有20辆赛车。有英国车、法国车、德国车和意大利车。",
        "avatar": "👩"
      },
      {
        "speaker": "JACK",
        "text": "It was an exciting race. Number twenty-eight was the winner. It was an Italian car.",
        "translation": "这是一场令人激动的比赛。28号车是获胜者。它是一辆意大利赛车。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "In 1995, there was a very big race.",
        "zh": "在1995年，有一场非常盛大的比赛。"
      },
      {
        "en": "There were hundreds of people there. My wife and I were at the race.",
        "zh": "那里有成百上千的人。我和我的妻子当时都在比赛现场。"
      },
      {
        "en": "Our friends Julie and Jack were there, too. We were on the left.",
        "zh": "我们的朋友朱莉和杰克也在那儿。我们当时在左边。"
      },
      {
        "en": "There were twenty cars in the race.",
        "zh": "比赛中有20辆赛车。"
      },
      {
        "en": "It was an exciting race. Number twenty-eight was the winner.",
        "zh": "这是一场令人激动的比赛。28号车是获胜者。"
      }
    ],
    "words": [
      {
        "word": "race",
        "phonetic": "/reɪs/",
        "meaning": "n. 比赛，竞赛",
        "mcItem": "Minecart",
        "mcItemIcon": "🏎️",
        "sampleSentence": "The car race is exciting.",
        "sampleTranslation": "赛车比赛令人激动。"
      },
      {
        "word": "hundred",
        "phonetic": "/ˈhʌndrəd/",
        "meaning": "num. 百",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "💯",
        "sampleSentence": "Hundreds of people.",
        "sampleTranslation": "成百上千的人。"
      },
      {
        "word": "crowd",
        "phonetic": "/kraʊd/",
        "meaning": "n. 人群",
        "mcItem": "Player Head",
        "mcItemIcon": "👥",
        "sampleSentence": "In the crowd.",
        "sampleTranslation": "在人群中。"
      },
      {
        "word": "exciting",
        "phonetic": "/ɪkˈsaɪtɪŋ/",
        "meaning": "adj. 令人激动的",
        "mcItem": "Firework Rocket",
        "mcItemIcon": "🎉",
        "sampleSentence": "An exciting match.",
        "sampleTranslation": "一场令人激动的比赛。"
      },
      {
        "word": "winner",
        "phonetic": "/ˈwɪnə/",
        "meaning": "n. 获胜者",
        "mcItem": "Trophy",
        "mcItemIcon": "🏆",
        "sampleSentence": "He is the winner.",
        "sampleTranslation": "他是获胜者。"
      }
    ],
    "grammarNote": "be 动词一般过去时：I/He/She/It was; We/You/They were。There was (单数存在), There were (复数存在)。"
  },
  "70": {
    "id": 70,
    "unit": 3,
    "title": "When were they there?",
    "titleZh": "他们什么时候在那里的？",
    "topic": "Past Time Expressions",
    "topicZh": "过去时间状语与过去状态",
    "grammar": "Where was he / were you? I was / We were...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Where were you yesterday?",
        "translation": "你昨天在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I was at home.",
        "translation": "我当时在家里。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where was he last week?",
        "translation": "他上周在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He was in London.",
        "translation": "他当时在伦敦。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I was at the office yesterday.",
        "zh": "我昨天在办公室。"
      },
      {
        "en": "They were at the station last night.",
        "zh": "他们昨晚在车站。"
      },
      {
        "en": "She was at school this morning.",
        "zh": "她今天早晨在学校。"
      },
      {
        "en": "We were in Paris last year.",
        "zh": "我们去年在巴黎。"
      }
    ],
    "words": [
      {
        "word": "when",
        "phonetic": "/wen/",
        "meaning": "副词：什么时候；何时",
        "mcItem": "Clock",
        "mcItemIcon": "⏰",
        "sampleSentence": "When were you at the train station?",
        "sampleTranslation": "你什么时候在火车站的？"
      },
      {
        "word": "station",
        "phonetic": "/ˈsteɪ.ʃən/",
        "meaning": "名词：车站；局",
        "mcItem": "Minecart",
        "mcItemIcon": "🚉",
        "sampleSentence": "The train arrived at the station on time.",
        "sampleTranslation": "火车准时到达了车站。"
      },
      {
        "word": "yesterday",
        "phonetic": "/ˈjes.tə.deɪ/",
        "meaning": "名词/副词：昨天",
        "mcItem": "Daylight Detector",
        "mcItemIcon": "📅",
        "sampleSentence": "They were in Paris yesterday morning.",
        "sampleTranslation": "他们昨天早晨在巴黎。"
      },
      {
        "word": "morning",
        "phonetic": "/ˈmɔː.nɪŋ/",
        "meaning": "名词：早晨；上午",
        "mcItem": "Sunlight",
        "mcItemIcon": "🌅",
        "sampleSentence": "It was a sunny morning in the village.",
        "sampleTranslation": "那是村庄里一个晴朗的早晨。"
      },
      {
        "word": "evening",
        "phonetic": "/ˈiːv.nɪŋ/",
        "meaning": "名词：傍晚；晚上",
        "mcItem": "Lantern",
        "mcItemIcon": "🌆",
        "sampleSentence": "We stayed at home yesterday evening.",
        "sampleTranslation": "我们昨天傍晚呆在家里。"
      }
    ],
    "grammarNote": "过去时间状语：yesterday, last night, last week, last month, last year, in 1995。"
  },
  "71": {
    "id": 71,
    "unit": 3,
    "title": "He's awful!",
    "titleZh": "他太讨厌了！",
    "topic": "Telephone Chat & Past Action",
    "topicZh": "电话聊天与评价他人",
    "grammar": "一般过去时 (was / did) 与 电话用语",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "JANE",
        "text": "What's Ron Miller like, Pauline?",
        "translation": "波琳，罗恩·米勒是个什么样的人？",
        "avatar": "👧"
      },
      {
        "speaker": "PAULINE",
        "text": "He's awful! He's telephone me four times yesterday, and three times the day before yesterday.",
        "translation": "他太讨厌了！他昨天给我打了四次电话，前天打了三次。",
        "avatar": "👩"
      },
      {
        "speaker": "PAULINE",
        "text": "He telephoned the office yesterday morning and yesterday afternoon. My boss answered the telephone.",
        "translation": "他昨天上午和昨天下午都往办公室打电话。是我老板接的电话。",
        "avatar": "👩"
      },
      {
        "speaker": "JANE",
        "text": "What did your boss say to him?",
        "translation": "你老板对他说什么了？",
        "avatar": "👧"
      },
      {
        "speaker": "PAULINE",
        "text": "He said, 'Pauline is typing letters. She can't speak to you now!'",
        "translation": "老板说：‘波琳正在打信。她现在不能和你讲话！’",
        "avatar": "👩"
      },
      {
        "speaker": "PAULINE",
        "text": "Then Ron telephoned again last night, but I didn't answer the phone.",
        "translation": "后来罗恩昨晚又打电话来，但我没有接电话。",
        "avatar": "👩"
      },
      {
        "speaker": "JANE",
        "text": "Did he telephone again this morning?",
        "translation": "他今天早上又打电话了吗？",
        "avatar": "👧"
      },
      {
        "speaker": "PAULINE",
        "text": "Yes, he did! He's awful!",
        "translation": "是的，他又打了！他真讨厌！",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "What's Ron Miller like, Pauline? He's awful!",
        "zh": "波琳，罗恩·米勒是个什么样的人？他太讨厌了！"
      },
      {
        "en": "He telephoned me four times yesterday, and three times the day before yesterday.",
        "zh": "他昨天给我打了四次电话，前天打了三次。"
      },
      {
        "en": "My boss answered the telephone.",
        "zh": "是我老板接的电话。"
      },
      {
        "en": "What did your boss say to him?",
        "zh": "你老板对他说什么了？"
      },
      {
        "en": "He said, 'Pauline is typing letters. She can't speak to you now!'",
        "zh": "他说：‘波琳正在打信。她现在不能和你讲话！’"
      },
      {
        "en": "Did he telephone again this morning? Yes, he did!",
        "zh": "他今天早上又打电话了吗？是的，他又打了！"
      }
    ],
    "words": [
      {
        "word": "awful",
        "phonetic": "/ˈɔːfl/",
        "meaning": "adj. 极讨厌的，可怕的",
        "mcItem": "Poison Potion",
        "mcItemIcon": "😣",
        "sampleSentence": "He is awful!",
        "sampleTranslation": "他太讨厌了！"
      },
      {
        "word": "telephone",
        "phonetic": "/ˈtelɪfəʊn/",
        "meaning": "v. & n. 打电话；电话",
        "mcItem": "Bell",
        "mcItemIcon": "📞",
        "sampleSentence": "Telephone me tonight.",
        "sampleTranslation": "今晚给我打电话。"
      },
      {
        "word": "time",
        "phonetic": "/taɪm/",
        "meaning": "n. 次数",
        "mcItem": "Clock",
        "mcItemIcon": "🔢",
        "sampleSentence": "Three times.",
        "sampleTranslation": "三次。"
      },
      {
        "word": "answer",
        "phonetic": "/ˈɑːnsə/",
        "meaning": "v. 回答，接听",
        "mcItem": "Book",
        "mcItemIcon": "🗣️",
        "sampleSentence": "Answer the telephone.",
        "sampleTranslation": "接电话。"
      },
      {
        "word": "again",
        "phonetic": "/əˈɡen/",
        "meaning": "adv. 又，再",
        "mcItem": "Repeater",
        "mcItemIcon": "🔁",
        "sampleSentence": "Try again.",
        "sampleTranslation": "再试一次。"
      },
      {
        "word": "say",
        "phonetic": "/seɪ/",
        "meaning": "v. 说 (past: said /sed/)",
        "mcItem": "Book",
        "mcItemIcon": "💬",
        "sampleSentence": "What did he say?",
        "sampleTranslation": "他说什么了？"
      }
    ],
    "grammarNote": "一般过去时规则动词：telephone -> telephoned, answer -> answered。不规则动词：say -> said。疑问与否定助动词 did / didn't。"
  },
  "72": {
    "id": 72,
    "unit": 3,
    "title": "When did you ...?",
    "titleZh": "你什么时候……的？",
    "topic": "Regular Past Actions",
    "topicZh": "一般过去时规则动词提问与应答",
    "grammar": "When did you...? / I ...ed yesterday / last night",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When did you air the room?",
        "translation": "你什么时候给房间通的风？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I aired it yesterday morning.",
        "translation": "我昨天上午通的风。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When did she clean the blackboard?",
        "translation": "她什么时候擦的黑板？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She cleaned it yesterday afternoon.",
        "translation": "她昨天下午擦的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I aired the room yesterday morning.",
        "zh": "我昨天上午给房间通了风。"
      },
      {
        "en": "I cleaned the blackboard yesterday afternoon.",
        "zh": "我昨天下午擦了黑板。"
      },
      {
        "en": "I opened the window this morning.",
        "zh": "我今天早上开了窗户。"
      },
      {
        "en": "I sharpened the pencil yesterday.",
        "zh": "我昨天削了铅笔。"
      },
      {
        "en": "I turned on the television last night.",
        "zh": "我昨晚开了电视。"
      },
      {
        "en": "I listened to the radio last night.",
        "zh": "我昨晚听了收音机。"
      },
      {
        "en": "I washed the dishes after dinner.",
        "zh": "晚饭后我洗了盘子。"
      },
      {
        "en": "I boiled the water this morning.",
        "zh": "我今天早上烧了水。"
      }
    ],
    "words": [
      {
        "word": "yesterday",
        "phonetic": "/ˈjes.tə.deɪ/",
        "meaning": "adv./n. 昨天",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "I cleaned the room yesterday.",
        "sampleTranslation": "我昨天打扫了房间。"
      },
      {
        "word": "air",
        "phonetic": "/eər/",
        "meaning": "v. 使通风，换气",
        "mcItem": "Glass",
        "mcItemIcon": "💨",
        "sampleSentence": "She aired the bedroom yesterday morning.",
        "sampleTranslation": "她昨天上午给卧室通了风。"
      },
      {
        "word": "clean",
        "phonetic": "/kliːn/",
        "meaning": "v. 打扫，清洗",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🧽",
        "sampleSentence": "He cleaned the blackboard after class.",
        "sampleTranslation": "下课后他擦了黑板。"
      },
      {
        "word": "wash",
        "phonetic": "/wɒʃ/",
        "meaning": "v. 洗涤，洗",
        "mcItem": "Cauldron",
        "mcItemIcon": "🧼",
        "sampleSentence": "They washed the dishes after dinner.",
        "sampleTranslation": "晚饭后他们洗了碗。"
      },
      {
        "word": "boil",
        "phonetic": "/bɔɪl/",
        "meaning": "v. 煮沸，烧开",
        "mcItem": "Blaze Powder",
        "mcItemIcon": "🫖",
        "sampleSentence": "She boiled some water for tea.",
        "sampleTranslation": "她烧了些水泡茶。"
      },
      {
        "word": "open",
        "phonetic": "/ˈəʊ.pən/",
        "meaning": "v. 打开",
        "mcItem": "Iron Door",
        "mcItemIcon": "🚪",
        "sampleSentence": "He opened the window to let fresh air in.",
        "sampleTranslation": "他打开窗户让新鲜空气进来。"
      }
    ],
    "grammarNote": "规则动词过去式加 -ed 读音规则：清辅音后读 /t/ (walked, washed)，浊辅音与元音后读 /d/ (cleaned, opened)，/t/ 或 /d/ 结尾后读 /ɪd/ (waited, painted)。"
  }
};
