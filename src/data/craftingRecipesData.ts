// ========================================================================
// MINECRAFT × 新概念英语 深度认知工坊 · 核心合成配方库与构词词根词典
// ========================================================================

export interface CraftingRecipe {
  id: string;
  nameEn: string;
  nameZh: string;
  phonetic: string;
  mcIcon: string;
  category: string;
  recipeType?: 'nce_word' | 'mc_equipment';
  requiredIngredients: { name: string; icon: string }[];
  gridPattern: (string | null)[]; // 3x3 array (9 elements)
  sampleSentence: string;
  sampleTranslation: string;
  wordBreakdown?: string;
  grammarTip?: string;
  unlockedLevel: number;
  requiredLessonId?: number;
}

export interface WordPartInfo {
  zh: string;
  icon: string;
  category: 'items' | 'places' | 'people' | 'health' | 'time';
}

export const NCE_WORD_PARTS_MAP: Record<string, WordPartInfo> = {
  "hand": {
    "zh": "手",
    "icon": "✋",
    "category": "items"
  },
  "bag": {
    "zh": "包/袋",
    "icon": "👜",
    "category": "items"
  },
  "cloak": {
    "zh": "斗篷/外衣",
    "icon": "🧥",
    "category": "places"
  },
  "room": {
    "zh": "房间/室",
    "icon": "🚪",
    "category": "places"
  },
  "suit": {
    "zh": "套装/西装",
    "icon": "👔",
    "category": "items"
  },
  "case": {
    "zh": "箱/盒子",
    "icon": "💼",
    "category": "items"
  },
  "pass": {
    "zh": "通行/通过",
    "icon": "🎫",
    "category": "items"
  },
  "port": {
    "zh": "港口/关卡",
    "icon": "🚢",
    "category": "items"
  },
  "school": {
    "zh": "学校",
    "icon": "🏫",
    "category": "people"
  },
  "boy": {
    "zh": "男孩",
    "icon": "👦",
    "category": "people"
  },
  "police": {
    "zh": "警察/治安",
    "icon": "👮",
    "category": "people"
  },
  "man": {
    "zh": "男人/人",
    "icon": "👨",
    "category": "people"
  },
  "woman": {
    "zh": "女人",
    "icon": "👩",
    "category": "people"
  },
  "post": {
    "zh": "邮政/邮件",
    "icon": "📮",
    "category": "people"
  },
  "milk": {
    "zh": "牛奶",
    "icon": "🥛",
    "category": "people"
  },
  "air": {
    "zh": "空中/航空",
    "icon": "✈️",
    "category": "people"
  },
  "hostess": {
    "zh": "女招待/空姐",
    "icon": "👩‍✈️",
    "category": "people"
  },
  "grand": {
    "zh": "老一辈/崇高",
    "icon": "👴",
    "category": "people"
  },
  "father": {
    "zh": "父亲",
    "icon": "👨",
    "category": "people"
  },
  "mother": {
    "zh": "母亲",
    "icon": "👩",
    "category": "people"
  },
  "watch": {
    "zh": "手表/钟表",
    "icon": "⌚",
    "category": "items"
  },
  "maker": {
    "zh": "制造者/匠人",
    "icon": "🛠️",
    "category": "people"
  },
  "ice": {
    "zh": "冰/冰块",
    "icon": "🧊",
    "category": "health"
  },
  "cream": {
    "zh": "奶油/乳酪",
    "icon": "🍨",
    "category": "health"
  },
  "tea": {
    "zh": "茶/茶叶",
    "icon": "🍵",
    "category": "items"
  },
  "pot": {
    "zh": "壶/罐",
    "icon": "🫖",
    "category": "items"
  },
  "book": {
    "zh": "书本/书籍",
    "icon": "📖",
    "category": "items"
  },
  "class": {
    "zh": "班级/课",
    "icon": "🧑‍🏫",
    "category": "places"
  },
  "bed": {
    "zh": "床/睡眠",
    "icon": "🛏️",
    "category": "places"
  },
  "living": {
    "zh": "生活/起居",
    "icon": "🛋️",
    "category": "places"
  },
  "dining": {
    "zh": "就餐/进食",
    "icon": "🍽️",
    "category": "places"
  },
  "bath": {
    "zh": "沐浴/洗澡",
    "icon": "🛁",
    "category": "places"
  },
  "news": {
    "zh": "新闻/消息",
    "icon": "📰",
    "category": "items"
  },
  "paper": {
    "zh": "纸张/报纸",
    "icon": "📄",
    "category": "items"
  },
  "black": {
    "zh": "黑色",
    "icon": "⬛",
    "category": "items"
  },
  "board": {
    "zh": "木板/黑板",
    "icon": "🪵",
    "category": "items"
  },
  "play": {
    "zh": "玩耍/游戏",
    "icon": "⚽",
    "category": "places"
  },
  "ground": {
    "zh": "场地/地面",
    "icon": "⛳",
    "category": "places"
  },
  "home": {
    "zh": "家/家庭",
    "icon": "🏡",
    "category": "time"
  },
  "work": {
    "zh": "劳动/作业",
    "icon": "💼",
    "category": "time"
  },
  "note": {
    "zh": "笔记/便条",
    "icon": "📝",
    "category": "items"
  },
  "sun": {
    "zh": "太阳/阳光",
    "icon": "☀️",
    "category": "items"
  },
  "glasses": {
    "zh": "眼镜/玻璃杯",
    "icon": "👓",
    "category": "items"
  },
  "head": {
    "zh": "头/头部",
    "icon": "🤕",
    "category": "health"
  },
  "tooth": {
    "zh": "牙齿",
    "icon": "🦷",
    "category": "health"
  },
  "ear": {
    "zh": "耳朵/听力",
    "icon": "👂",
    "category": "health"
  },
  "stomach": {
    "zh": "胃/肚子",
    "icon": "🩺",
    "category": "health"
  },
  "ache": {
    "zh": "疼痛/隐痛",
    "icon": "⚡",
    "category": "health"
  },
  "aspirin": {
    "zh": "阿司匹林",
    "icon": "💊",
    "category": "health"
  },
  "tablet": {
    "zh": "药片/片剂",
    "icon": "⚪",
    "category": "health"
  },
  "week": {
    "zh": "星期/周",
    "icon": "📅",
    "category": "time"
  },
  "end": {
    "zh": "末尾/结束",
    "icon": "🔚",
    "category": "time"
  },
  "card": {
    "zh": "卡片/明信片",
    "icon": "💌",
    "category": "items"
  },
  "down": {
    "zh": "向下/在下",
    "icon": "⬇️",
    "category": "time"
  },
  "up": {
    "zh": "向上/在上",
    "icon": "⬆️",
    "category": "time"
  },
  "stairs": {
    "zh": "楼梯/阶梯",
    "icon": "🪜",
    "category": "time"
  },
  "rail": {
    "zh": "铁轨/轨道",
    "icon": "🛤️",
    "category": "places"
  },
  "way": {
    "zh": "道路/途径",
    "icon": "🛣️",
    "category": "places"
  },
  "break": {
    "zh": "打破/中断",
    "icon": "💥",
    "category": "health"
  },
  "fast": {
    "zh": "禁食/斋戒",
    "icon": "🍽️",
    "category": "health"
  },
  "type": {
    "zh": "打字/机打",
    "icon": "⌨️",
    "category": "items"
  },
  "writer": {
    "zh": "书写者/作者",
    "icon": "✍️",
    "category": "items"
  },
  "traffic": {
    "zh": "交通/车流",
    "icon": "🚦",
    "category": "time"
  },
  "lights": {
    "zh": "信号灯/照明",
    "icon": "💡",
    "category": "time"
  }
};

export const NCE_WORD_CRAFTING_RECIPES: CraftingRecipe[] = [
  {
    "id": "nce_handbag",
    "nameEn": "handbag",
    "nameZh": "手提包",
    "phonetic": "/ˈhændbæɡ/",
    "mcIcon": "👜",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "hand (手)",
        "icon": "✋"
      },
      {
        "name": "bag (包/袋)",
        "icon": "👜"
      }
    ],
    "gridPattern": [
      "hand",
      "bag",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "I found a leather handbag in the village chest.",
    "sampleTranslation": "我在村庄箱子里发现了一个皮革手提包。",
    "wordBreakdown": "复合名词：hand (手) + bag (包) ➔ 随手携带的提包。",
    "grammarTip": "可数名词：Is this your handbag? 这是你的手提包吗？",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "nce_cloakroom",
    "nameEn": "cloakroom",
    "nameZh": "衣帽间/寄物处",
    "phonetic": "/ˈkləʊkruːm/",
    "mcIcon": "🚪",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "cloak (斗篷/外衣)",
        "icon": "🧥"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "cloak",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Hang your iron armor in the cloakroom.",
    "sampleTranslation": "把你的铁盔甲挂在衣帽间里。",
    "wordBreakdown": "复合名词：cloak (斗篷/外衣) + room (房间) ➔ 存放外套的衣帽间。",
    "grammarTip": "地点名词：My coat and umbrella are in the cloakroom.",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "nce_suitcase",
    "nameEn": "suitcase",
    "nameZh": "手提箱/旅行箱",
    "phonetic": "/ˈsuːtkeɪs/",
    "mcIcon": "💼",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "suit (套装/西装)",
        "icon": "👔"
      },
      {
        "name": "case (箱/盒子)",
        "icon": "💼"
      }
    ],
    "gridPattern": [
      "suit",
      "case",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Pack cobblestone and torches into the suitcase.",
    "sampleTranslation": "将圆石与火把打包进手提箱中。",
    "wordBreakdown": "复合名词：suit (套装) + case (箱盒) ➔ 专装衣物西服的大旅行箱。",
    "grammarTip": "可数名词：Here is my ticket and my suitcase.",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "nce_passport",
    "nameEn": "passport",
    "nameZh": "护照/通行证",
    "phonetic": "/ˈpɑːspɔːt/",
    "mcIcon": "🎫",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "pass (通行/通过)",
        "icon": "🎫"
      },
      {
        "name": "port (港口/关卡)",
        "icon": "🚢"
      }
    ],
    "gridPattern": [
      "pass",
      "port",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "You must show your passport at the server portal.",
    "sampleTranslation": "你必须在服务器传送门前出示护照。",
    "wordBreakdown": "复合名词：pass (通过) + port (港口/口岸) ➔ 出入港口的国际通行凭证。",
    "grammarTip": "名词搭配：show one's passport (出示护照)。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "nce_schoolboy",
    "nameEn": "schoolboy",
    "nameZh": "男学生",
    "phonetic": "/ˈskuːlbɔɪ/",
    "mcIcon": "👦",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "school (学校)",
        "icon": "🏫"
      },
      {
        "name": "boy (男孩)",
        "icon": "👦"
      }
    ],
    "gridPattern": [
      "school",
      "boy",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The schoolboy tamed a wolf on his way home.",
    "sampleTranslation": "那个男学生在回家路上驯服了一只狼。",
    "wordBreakdown": "复合名词：school (学校) + boy (男孩) ➔ 上学的男生。",
    "grammarTip": "名词词组：The young schoolboy is crafting a wooden sword.",
    "unlockedLevel": 1,
    "requiredLessonId": 5
  },
  {
    "id": "nce_policeman",
    "nameEn": "policeman",
    "nameZh": "男警察",
    "phonetic": "/pəˈliːsmən/",
    "mcIcon": "👮",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "police (警察/治安)",
        "icon": "👮"
      },
      {
        "name": "man (男人/人)",
        "icon": "👨"
      }
    ],
    "gridPattern": [
      "police",
      "man",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The policeman protected the villagers from zombies.",
    "sampleTranslation": "警察保护村民不受僵尸侵害。",
    "wordBreakdown": "复合名词：police (警方) + man (男士) ➔ 维护秩序的男警官。",
    "grammarTip": "复数形式为 policemen；职业疑问句：What is his job? He is a policeman.",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "nce_policewoman",
    "nameEn": "policewoman",
    "nameZh": "女警察",
    "phonetic": "/pəˈliːswʊmən/",
    "mcIcon": "👮‍♀️",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "police (警察/治安)",
        "icon": "👮"
      },
      {
        "name": "woman (女人)",
        "icon": "👩"
      }
    ],
    "gridPattern": [
      "police",
      "woman",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The policewoman fired arrows to alert the team.",
    "sampleTranslation": "女警官射出响箭向小队示警。",
    "wordBreakdown": "复合名词：police (警方) + woman (女性) ➔ 女警官。",
    "grammarTip": "复数形式为 policewomen；同根女性词汇。",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "nce_postman",
    "nameEn": "postman",
    "nameZh": "邮递员",
    "phonetic": "/ˈpəʊstmən/",
    "mcIcon": "📮",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "post (邮政/邮件)",
        "icon": "📮"
      },
      {
        "name": "man (男人/人)",
        "icon": "👨"
      }
    ],
    "gridPattern": [
      "post",
      "man",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The postman delivered letters across the snowy biomes.",
    "sampleTranslation": "邮递员穿越雪原生物群系递送书信。",
    "wordBreakdown": "复合名词：post (邮政) + man (人) ➔ 递送邮件报纸的人。",
    "grammarTip": "职业表达：The postman comes every morning at seven.",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "nce_milkman",
    "nameEn": "milkman",
    "nameZh": "送奶工",
    "phonetic": "/ˈmɪlkmən/",
    "mcIcon": "🥛",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "milk (牛奶)",
        "icon": "🥛"
      },
      {
        "name": "man (男人/人)",
        "icon": "👨"
      }
    ],
    "gridPattern": [
      "milk",
      "man",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The milkman traded fresh milk for emeralds.",
    "sampleTranslation": "送奶工用新鲜牛奶换取了绿宝石。",
    "wordBreakdown": "复合名词：milk (牛奶) + man (人) ➔ 每日送新鲜牛奶的专员。",
    "grammarTip": "名词辨析：milk 为不可数名词，milkman 为可数职业名词。",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "nce_airhostess",
    "nameEn": "airhostess",
    "nameZh": "空中小姐/空姐",
    "phonetic": "/ˈeəˌhəʊstəs/",
    "mcIcon": "👩‍✈️",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "air (空中/航空)",
        "icon": "✈️"
      },
      {
        "name": "hostess (女招待/空姐)",
        "icon": "👩‍✈️"
      }
    ],
    "gridPattern": [
      "air",
      "hostess",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The airhostess glided with elytra through the clouds.",
    "sampleTranslation": "空姐借助鞘翅在云层间平稳滑翔。",
    "wordBreakdown": "复合名词：air (空中) + hostess (女主人/女招待) ➔ 飞机客舱乘务员。",
    "grammarTip": "名词词性：名词加 -ess 后缀通常表示女性身份。",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "nce_grandfather",
    "nameEn": "grandfather",
    "nameZh": "祖父/外祖父",
    "phonetic": "/ˈɡrænˌfɑːðə/",
    "mcIcon": "👴",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "grand (老一辈/崇高)",
        "icon": "👴"
      },
      {
        "name": "father (父亲)",
        "icon": "👨"
      }
    ],
    "gridPattern": [
      "grand",
      "father",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Grandfather taught me how to fish in the river.",
    "sampleTranslation": "祖父教会了我在河流中钓鱼。",
    "wordBreakdown": "复合名词：grand (尊贵/长辈) + father (父亲) ➔ 爷爷或外公。",
    "grammarTip": "家庭称谓：My grandfather is very friendly.",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "nce_grandmother",
    "nameEn": "grandmother",
    "nameZh": "祖母/外祖母",
    "phonetic": "/ˈɡrænˌmʌðə/",
    "mcIcon": "👵",
    "category": "mobs",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "grand (老一辈/崇高)",
        "icon": "👴"
      },
      {
        "name": "mother (母亲)",
        "icon": "👩"
      }
    ],
    "gridPattern": [
      "grand",
      "mother",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Grandmother baked delicious pumpkin pie for us.",
    "sampleTranslation": "祖母为我们烘焙了美味的南瓜派。",
    "wordBreakdown": "复合名词：grand (尊贵/长辈) + mother (母亲) ➔ 奶奶或外婆。",
    "grammarTip": "家庭称谓：Her grandmother bakes delicious pumpkin pies.",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "nce_watchmaker",
    "nameEn": "watchmaker",
    "nameZh": "钟表匠",
    "phonetic": "/ˈwɒtʃmeɪkə/",
    "mcIcon": "⌚",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "watch (手表/钟表)",
        "icon": "⌚"
      },
      {
        "name": "maker (制造者/匠人)",
        "icon": "🛠️"
      }
    ],
    "gridPattern": [
      "watch",
      "maker",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The watchmaker crafted a golden clock with redstone.",
    "sampleTranslation": "钟表匠用红石制作了一个金质时钟。",
    "wordBreakdown": "复合名词：watch (钟表) + maker (制作者) ➔ 修理与精造精密钟表的工匠。",
    "grammarTip": "动词衍生：maker 来自 make + -er，表示从事某种制作的人。",
    "unlockedLevel": 1,
    "requiredLessonId": 13
  },
  {
    "id": "nce_icecream",
    "nameEn": "icecream",
    "nameZh": "冰淇淋",
    "phonetic": "/ˌaɪs ˈkriːm/",
    "mcIcon": "🍨",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "ice (冰/冰块)",
        "icon": "🧊"
      },
      {
        "name": "cream (奶油/乳酪)",
        "icon": "🍨"
      }
    ],
    "gridPattern": [
      "ice",
      "cream",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Eating cold icecream restored three hunger points.",
    "sampleTranslation": "吃冰凉的冰淇淋恢复了 3 点饥饿值。",
    "wordBreakdown": "复合名词：ice (冰块) + cream (奶油) ➔ 冰甜爽口的甜品。",
    "grammarTip": "常见句型：Do you want some ice cream? 你想要来点冰淇淋吗？",
    "unlockedLevel": 1,
    "requiredLessonId": 15
  },
  {
    "id": "nce_classroom",
    "nameEn": "classroom",
    "nameZh": "教室",
    "phonetic": "/ˈklɑːsruːm/",
    "mcIcon": "🧑‍🏫",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "class (班级/课)",
        "icon": "🧑‍🏫"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "class",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Our redstone classroom has nineteen lecterns.",
    "sampleTranslation": "我们的红石教室里有 19 个讲台。",
    "wordBreakdown": "复合名词：class (班级/课程) + room (房间) ➔ 授课学习的场所。",
    "grammarTip": "介词搭配：in the classroom (在教室里)。",
    "unlockedLevel": 1,
    "requiredLessonId": 17
  },
  {
    "id": "nce_teapot",
    "nameEn": "teapot",
    "nameZh": "茶壶",
    "phonetic": "/ˈtiːpɒt/",
    "mcIcon": "🫖",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "tea (茶/茶叶)",
        "icon": "🍵"
      },
      {
        "name": "pot (壶/罐)",
        "icon": "🫖"
      }
    ],
    "gridPattern": [
      "tea",
      "pot",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Boil water in the teapot next to the furnace.",
    "sampleTranslation": "在熔炉旁边的茶壶里烧开水。",
    "wordBreakdown": "复合名词：tea (茶) + pot (壶) ➔ 冲泡清茶的茶具。",
    "grammarTip": "名词词组：a cup of tea; fill the teapot with water.",
    "unlockedLevel": 1,
    "requiredLessonId": 19
  },
  {
    "id": "nce_textbook",
    "nameEn": "textbook",
    "nameZh": "课本/教材",
    "phonetic": "/ˈtekstbʊk/",
    "mcIcon": "📖",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "class (班级/课)",
        "icon": "🧑‍🏫"
      },
      {
        "name": "book (书本/书籍)",
        "icon": "📖"
      }
    ],
    "gridPattern": [
      "class",
      "book",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Place the enchanted textbook on the enchanting table.",
    "sampleTranslation": "将附魔课本放置在附魔台上。",
    "wordBreakdown": "复合名词：class (课堂) + book (书籍) ➔ 课程配套教科书。",
    "grammarTip": "搭配用法：open your textbook at lesson twenty-one.",
    "unlockedLevel": 1,
    "requiredLessonId": 21
  },
  {
    "id": "nce_bedroom",
    "nameEn": "bedroom",
    "nameZh": "卧室/卧房",
    "phonetic": "/ˈbedruːm/",
    "mcIcon": "🛏️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "bed (床/睡眠)",
        "icon": "🛏️"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "bed",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Set your spawn point by sleeping in the bedroom.",
    "sampleTranslation": "在卧室床上睡觉重置你的重生点。",
    "wordBreakdown": "复合名词：bed (床) + room (房) ➔ 睡眠休息的卧房。",
    "grammarTip": "介词短语：go to the bedroom to sleep through the night.",
    "unlockedLevel": 1,
    "requiredLessonId": 25
  },
  {
    "id": "nce_livingroom",
    "nameEn": "livingroom",
    "nameZh": "客厅/起居室",
    "phonetic": "/ˈlɪvɪŋruːm/",
    "mcIcon": "🛋️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "living (生活/起居)",
        "icon": "🛋️"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "living",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "We built a cozy fireplace inside the livingroom.",
    "sampleTranslation": "我们在客厅里建造了一个温馨的壁炉。",
    "wordBreakdown": "复合名词：living (生活) + room (室) ➔ 招待客人、日常休闲的居室。",
    "grammarTip": "空间句型：There is a sofa and a fireplace in the livingroom.",
    "unlockedLevel": 1,
    "requiredLessonId": 25
  },
  {
    "id": "nce_diningroom",
    "nameEn": "diningroom",
    "nameZh": "餐厅/饭厅",
    "phonetic": "/ˈdaɪnɪŋruːm/",
    "mcIcon": "🍽️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "dining (就餐/进食)",
        "icon": "🍽️"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "dining",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "All team members gathered in the diningroom for cake.",
    "sampleTranslation": "所有队员齐聚在餐厅分享蛋糕。",
    "wordBreakdown": "复合名词：dining (用餐) + room (室) ➔ 全家聚餐进食的房间。",
    "grammarTip": "介词短语：have dinner in the diningroom.",
    "unlockedLevel": 1,
    "requiredLessonId": 25
  },
  {
    "id": "nce_bathroom",
    "nameEn": "bathroom",
    "nameZh": "浴室/洗手间",
    "phonetic": "/ˈbɑːθruːm/",
    "mcIcon": "🛁",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "bath (沐浴/洗澡)",
        "icon": "🛁"
      },
      {
        "name": "room (房间/室)",
        "icon": "🚪"
      }
    ],
    "gridPattern": [
      "bath",
      "room",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "A water bucket is placed in the bathroom cauldron.",
    "sampleTranslation": "浴室炼药锅里放着一桶清澈的水。",
    "wordBreakdown": "复合名词：bath (泡澡) + room (房) ➔ 沐浴洗漱的卫生间。",
    "grammarTip": "日常问询：Where is the bathroom, please?",
    "unlockedLevel": 1,
    "requiredLessonId": 25
  },
  {
    "id": "nce_newspaper",
    "nameEn": "newspaper",
    "nameZh": "报纸",
    "phonetic": "/ˈnjuːzpeɪpə/",
    "mcIcon": "📰",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "news (新闻/消息)",
        "icon": "📰"
      },
      {
        "name": "paper (纸张/报纸)",
        "icon": "📄"
      }
    ],
    "gridPattern": [
      "news",
      "paper",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The villager librarian reads a morning newspaper.",
    "sampleTranslation": "图书管理员村民在清晨阅读报纸。",
    "wordBreakdown": "复合名词：news (新闻) + paper (纸张) ➔ 刊登时事新闻的报纸。",
    "grammarTip": "固定短语：read a newspaper; read the news in the paper.",
    "unlockedLevel": 1,
    "requiredLessonId": 29
  },
  {
    "id": "nce_blackboard",
    "nameEn": "blackboard",
    "nameZh": "黑板",
    "phonetic": "/ˈblækbɔːd/",
    "mcIcon": "⬛",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "black (黑色)",
        "icon": "⬛"
      },
      {
        "name": "board (木板/黑板)",
        "icon": "🪵"
      }
    ],
    "gridPattern": [
      "black",
      "board",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The teacher drew a crafting recipe on the blackboard.",
    "sampleTranslation": "老师在黑板上画下了一个合成配方。",
    "wordBreakdown": "复合名词：black (黑色) + board (木板) ➔ 用粉笔书写的教学黑板。",
    "grammarTip": "教学指令：Look at the blackboard and write down sentences.",
    "unlockedLevel": 1,
    "requiredLessonId": 33
  },
  {
    "id": "nce_playground",
    "nameEn": "playground",
    "nameZh": "操场/运动场",
    "phonetic": "/ˈpleɪɡraʊnd/",
    "mcIcon": "⚽",
    "category": "places",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "play (玩耍/游戏)",
        "icon": "⚽"
      },
      {
        "name": "ground (场地/地面)",
        "icon": "⛳"
      }
    ],
    "gridPattern": [
      "play",
      "ground",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Horses and iron golems roam across the playground.",
    "sampleTranslation": "马匹与铁傀儡在运动场地上漫步。",
    "wordBreakdown": "复合名词：play (玩乐) + ground (场地) ➔ 户外活动的操场。",
    "grammarTip": "空间介词：The students are running on the playground.",
    "unlockedLevel": 1,
    "requiredLessonId": 35
  },
  {
    "id": "nce_homework",
    "nameEn": "homework",
    "nameZh": "家庭作业",
    "phonetic": "/ˈhəʊmwɜːk/",
    "mcIcon": "📝",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "home (家/家庭)",
        "icon": "🏡"
      },
      {
        "name": "work (劳动/作业)",
        "icon": "💼"
      }
    ],
    "gridPattern": [
      "home",
      "work",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Finish your English homework before exploring caves.",
    "sampleTranslation": "去矿洞探险前先把你的英语作业做完。",
    "wordBreakdown": "复合名词：home (家中) + work (功课) ➔ 放学在家完成的学习作业。",
    "grammarTip": "不可数名词：do one's homework (切勿加 -s 或 a homework)。",
    "unlockedLevel": 1,
    "requiredLessonId": 37
  },
  {
    "id": "nce_notebook",
    "nameEn": "notebook",
    "nameZh": "笔记本",
    "phonetic": "/ˈnəʊtbʊk/",
    "mcIcon": "📓",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "note (笔记/便条)",
        "icon": "📝"
      },
      {
        "name": "book (书本/书籍)",
        "icon": "📖"
      }
    ],
    "gridPattern": [
      "note",
      "book",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Record coordinates of the diamond mine in your notebook.",
    "sampleTranslation": "在笔记本里记下钻石矿脉的具体坐标。",
    "wordBreakdown": "复合名词：note (笔记) + book (簿本) ➔ 随手记录点滴的日记本。",
    "grammarTip": "搭配用法：write new words down in your notebook.",
    "unlockedLevel": 1,
    "requiredLessonId": 39
  },
  {
    "id": "nce_sunglasses",
    "nameEn": "sunglasses",
    "nameZh": "太阳镜/墨镜",
    "phonetic": "/ˈsʌnɡlɑːsɪz/",
    "mcIcon": "🕶️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "sun (太阳/阳光)",
        "icon": "☀️"
      },
      {
        "name": "glasses (眼镜/玻璃杯)",
        "icon": "👓"
      }
    ],
    "gridPattern": [
      "sun",
      "glasses",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Wear sunglasses when walking under the desert sun.",
    "sampleTranslation": "在烈日下的沙漠中漫步时请戴上太阳镜。",
    "wordBreakdown": "复合名词：sun (日光) + glasses (眼镜) ➔ 遮挡强光的墨镜。",
    "grammarTip": "复数专用名词：a pair of sunglasses (一副太阳镜)。",
    "unlockedLevel": 1,
    "requiredLessonId": 43
  },
  {
    "id": "nce_headache",
    "nameEn": "headache",
    "nameZh": "头痛",
    "phonetic": "/ˈhedeɪk/",
    "mcIcon": "🤕",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "head (头/头部)",
        "icon": "🤕"
      },
      {
        "name": "ache (疼痛/隐痛)",
        "icon": "⚡"
      }
    ],
    "gridPattern": [
      "head",
      "ache",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "After hours of mining in the deep slate, Steve got a headache.",
    "sampleTranslation": "在深板岩层长时间采矿后，史蒂夫头痛了。",
    "wordBreakdown": "复合名词：head (头) + ache (持续隐痛) ➔ 头部疼痛。",
    "grammarTip": "病痛句型：I have got a bad headache.",
    "unlockedLevel": 1,
    "requiredLessonId": 61
  },
  {
    "id": "nce_toothache",
    "nameEn": "toothache",
    "nameZh": "牙痛",
    "phonetic": "/ˈtuːθeɪk/",
    "mcIcon": "🦷",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "tooth (牙齿)",
        "icon": "🦷"
      },
      {
        "name": "ache (疼痛/隐痛)",
        "icon": "⚡"
      }
    ],
    "gridPattern": [
      "tooth",
      "ache",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Eating too much sugar cane gave the player a toothache.",
    "sampleTranslation": "吃太多甘蔗让玩家牙痛了。",
    "wordBreakdown": "复合名词：tooth (单颗牙) + ache (疼痛) ➔ 牙齿神经痛。",
    "grammarTip": "病痛搭配：see the dentist for toothache.",
    "unlockedLevel": 1,
    "requiredLessonId": 61
  },
  {
    "id": "nce_earache",
    "nameEn": "earache",
    "nameZh": "耳朵痛",
    "phonetic": "/ˈɪəreɪk/",
    "mcIcon": "👂",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "ear (耳朵/听力)",
        "icon": "👂"
      },
      {
        "name": "ache (疼痛/隐痛)",
        "icon": "⚡"
      }
    ],
    "gridPattern": [
      "ear",
      "ache",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The loud creeper blast gave him a sudden earache.",
    "sampleTranslation": "苦力怕的巨响爆炸让他突然耳朵生疼。",
    "wordBreakdown": "复合名词：ear (耳朵) + ache (疼痛) ➔ 耳鸣耳痛。",
    "grammarTip": "句型表达：He caught a cold and has a terrible earache.",
    "unlockedLevel": 1,
    "requiredLessonId": 61
  },
  {
    "id": "nce_stomachache",
    "nameEn": "stomachache",
    "nameZh": "胃痛/肚子痛",
    "phonetic": "/ˈstʌməkeɪk/",
    "mcIcon": "🩺",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "stomach (胃/肚子)",
        "icon": "🩺"
      },
      {
        "name": "ache (疼痛/隐痛)",
        "icon": "⚡"
      }
    ],
    "gridPattern": [
      "stomach",
      "ache",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Eating raw chicken causes hunger and stomachache.",
    "sampleTranslation": "食用生鸡肉会导致饥饿效果与胃痛。",
    "wordBreakdown": "复合名词：stomach (胃肠) + ache (隐痛) ➔ 消化不良腹部痛。",
    "grammarTip": "固定词组：have a stomachache (胃部不适)。",
    "unlockedLevel": 1,
    "requiredLessonId": 61
  },
  {
    "id": "nce_aspirin",
    "nameEn": "aspirin tablet",
    "nameZh": "阿司匹林药片",
    "phonetic": "/ˈæsprɪn ˈtæblət/",
    "mcIcon": "💊",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "aspirin (阿司匹林)",
        "icon": "💊"
      },
      {
        "name": "tablet (药片/片剂)",
        "icon": "⚪"
      }
    ],
    "gridPattern": [
      "aspirin",
      "tablet",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Take an aspirin tablet with water to relieve pain.",
    "sampleTranslation": "配温水服用一片阿司匹林以缓解病痛。",
    "wordBreakdown": "复合搭配：aspirin (阿司匹林解热镇痛药) + tablet (片剂) ➔ 解热镇痛药片。",
    "grammarTip": "服药句型：Take two aspirin tablets and stay in bed.",
    "unlockedLevel": 1,
    "requiredLessonId": 61
  },
  {
    "id": "nce_weekend",
    "nameEn": "weekend",
    "nameZh": "周末",
    "phonetic": "/ˌwiːkˈend/",
    "mcIcon": "📅",
    "category": "time",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "week (星期/周)",
        "icon": "📅"
      },
      {
        "name": "end (末尾/结束)",
        "icon": "🔚"
      }
    ],
    "gridPattern": [
      "week",
      "end",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "We plan a great nether fortress expedition this weekend.",
    "sampleTranslation": "我们计划在这个周末开启一场盛大的下界要塞远征。",
    "wordBreakdown": "复合名词：week (工作周) + end (结束) ➔ 周六与周日的周末时光。",
    "grammarTip": "时间介词搭配：at the weekend (英式) / on the weekend (美式)。",
    "unlockedLevel": 1,
    "requiredLessonId": 65
  },
  {
    "id": "nce_postcard",
    "nameEn": "postcard",
    "nameZh": "明信片",
    "phonetic": "/ˈpəʊstkɑːd/",
    "mcIcon": "💌",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "post (邮政/邮件)",
        "icon": "📮"
      },
      {
        "name": "card (卡片/明信片)",
        "icon": "💌"
      }
    ],
    "gridPattern": [
      "post",
      "card",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "I sent a postcard from the top of the mountain peak.",
    "sampleTranslation": "我从险峻的山巅寄出了一张风景明信片。",
    "wordBreakdown": "复合名词：post (邮资/邮递) + card (卡片) ➔ 印有精美风景的明信片。",
    "grammarTip": "书信搭配：send a postcard to my best friend.",
    "unlockedLevel": 1,
    "requiredLessonId": 67
  },
  {
    "id": "nce_upstairs",
    "nameEn": "upstairs",
    "nameZh": "在楼上/往楼上",
    "phonetic": "/ˌʌpˈsteəz/",
    "mcIcon": "⬆️",
    "category": "time",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "up (向上/在上)",
        "icon": "⬆️"
      },
      {
        "name": "stairs (楼梯/阶梯)",
        "icon": "🪜"
      }
    ],
    "gridPattern": [
      "up",
      "stairs",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Climb the oak stairs to go upstairs to the rooftop.",
    "sampleTranslation": "踩着橡木阶梯前往屋顶楼上。",
    "wordBreakdown": "复合副词/名词：up (向上) + stairs (台阶) ➔ 位于楼上的区域。",
    "grammarTip": "方位副词：go upstairs (上楼)；The bedroom is upstairs.",
    "unlockedLevel": 1,
    "requiredLessonId": 71
  },
  {
    "id": "nce_downstairs",
    "nameEn": "downstairs",
    "nameZh": "在楼下/往楼下",
    "phonetic": "/ˌdaʊnˈsteəz/",
    "mcIcon": "⬇️",
    "category": "time",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "down (向下/在下)",
        "icon": "⬇️"
      },
      {
        "name": "stairs (楼梯/阶梯)",
        "icon": "🪜"
      }
    ],
    "gridPattern": [
      "down",
      "stairs",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Store heavy minerals in the vault downstairs.",
    "sampleTranslation": "将贵重的矿物原料存放在楼下地窖中。",
    "wordBreakdown": "复合副词/名词：down (向下) + stairs (台阶) ➔ 顺着楼梯往下。",
    "grammarTip": "方位副词：come downstairs (下楼)；He is waiting downstairs.",
    "unlockedLevel": 1,
    "requiredLessonId": 71
  },
  {
    "id": "nce_railway",
    "nameEn": "railway",
    "nameZh": "铁路/铁轨线路",
    "phonetic": "/ˈreɪlweɪ/",
    "mcIcon": "🛤️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "rail (铁轨/轨道)",
        "icon": "🛤️"
      },
      {
        "name": "way (道路/途径)",
        "icon": "🛣️"
      }
    ],
    "gridPattern": [
      "rail",
      "way",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "The powered railway connects the main base to the mine.",
    "sampleTranslation": "充能铁路线路将主基地与采矿场紧紧相连。",
    "wordBreakdown": "复合名词：rail (铁道钢轨) + way (通路) ➔ 供矿车飞驰的铁路线路。",
    "grammarTip": "交通表达：travel by railway; ride along the railway line.",
    "unlockedLevel": 1,
    "requiredLessonId": 75
  },
  {
    "id": "nce_breakfast",
    "nameEn": "breakfast",
    "nameZh": "早餐/早点",
    "phonetic": "/ˈbrekfəst/",
    "mcIcon": "🥐",
    "category": "health",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "break (打破/中断)",
        "icon": "💥"
      },
      {
        "name": "fast (禁食/斋戒)",
        "icon": "🍽️"
      }
    ],
    "gridPattern": [
      "break",
      "fast",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Eat bread and cooked porkchop for a strong breakfast.",
    "sampleTranslation": "吃刚烤好的面包与熟猪排作为能量充沛的早餐。",
    "wordBreakdown": "复合词解密：break (破除) + fast (斋戒/禁食) ➔ 破除夜间长久空腹的第一餐！",
    "grammarTip": "三餐固定搭配：have breakfast (切勿加冠词 a)。",
    "unlockedLevel": 1,
    "requiredLessonId": 77
  },
  {
    "id": "nce_typewriter",
    "nameEn": "typewriter",
    "nameZh": "打字机",
    "phonetic": "/ˈtaɪpraɪtə/",
    "mcIcon": "⌨️",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "type (打字/机打)",
        "icon": "⌨️"
      },
      {
        "name": "writer (书写者/作者)",
        "icon": "✍️"
      }
    ],
    "gridPattern": [
      "type",
      "writer",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Use the typewriter to compose an official guild contract.",
    "sampleTranslation": "用打字机撰写一份正式的公会冒险契约。",
    "wordBreakdown": "复合名词：type (打字印刷) + writer (书写仪器) ➔ 机械打字机。",
    "grammarTip": "机械工具：type letters rapidly on the old typewriter.",
    "unlockedLevel": 1,
    "requiredLessonId": 81
  },
  {
    "id": "nce_trafficlights",
    "nameEn": "traffic lights",
    "nameZh": "交通信号灯/红绿灯",
    "phonetic": "/ˈtræfɪk laɪts/",
    "mcIcon": "🚦",
    "category": "tools",
    "recipeType": "nce_word",
    "requiredIngredients": [
      {
        "name": "traffic (交通/车流)",
        "icon": "🚦"
      },
      {
        "name": "lights (信号灯/照明)",
        "icon": "💡"
      }
    ],
    "gridPattern": [
      "traffic",
      "lights",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Redstone lamps act as smart traffic lights for minecarts.",
    "sampleTranslation": "红石灯用作引导矿车安全交汇的智能交通信号灯。",
    "wordBreakdown": "复合名词短语：traffic (车辆往来) + lights (指示灯) ➔ 指挥秩序的红绿灯。",
    "grammarTip": "交通指示：Wait when the traffic lights turn red.",
    "unlockedLevel": 1,
    "requiredLessonId": 83
  }
];

export const MC_EQUIPMENT_RECIPES: CraftingRecipe[] = [
  {
    "id": "mc_wooden_sword",
    "nameEn": "Wooden Sword",
    "nameZh": "木剑",
    "phonetic": "/ˈwʊdn sɔːd/",
    "mcIcon": "🗡️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "橡木木板",
        "icon": "🪵"
      },
      {
        "name": "橡木木板",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "🪵",
      null,
      null,
      "🪵",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "A wooden sword is your first trusty defense against monsters.",
    "sampleTranslation": "木剑是你防御怪物的最初武器。",
    "wordBreakdown": "装备原版合成：利用 橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Wooden Sword · 木剑。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_stone_sword",
    "nameEn": "Stone Sword",
    "nameZh": "石剑",
    "phonetic": "/stəʊn sɔːd/",
    "mcIcon": "🗡️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "圆石",
        "icon": "🪨"
      },
      {
        "name": "圆石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "🪨",
      null,
      null,
      "🪨",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "A stone sword deals more damage than a wooden blade.",
    "sampleTranslation": "石剑比木剑能造成更高的伤害。",
    "wordBreakdown": "装备原版合成：利用 圆石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Stone Sword · 石剑。",
    "unlockedLevel": 1,
    "requiredLessonId": 2
  },
  {
    "id": "mc_iron_sword",
    "nameEn": "Iron Sword",
    "nameZh": "铁剑",
    "phonetic": "/ˈaɪən sɔːd/",
    "mcIcon": "⚔️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      },
      {
        "name": "铁锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "⚙️",
      null,
      null,
      "⚙️",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Equip an iron sword before hunting zombies in the cave.",
    "sampleTranslation": "进洞猎杀僵尸前请佩戴铁剑。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Sword · 铁剑。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_golden_sword",
    "nameEn": "Golden Sword",
    "nameZh": "金剑",
    "phonetic": "/ˈɡəʊldən sɔːd/",
    "mcIcon": "⚔️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "金锭",
        "icon": "🪙"
      },
      {
        "name": "金锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "🪙",
      null,
      null,
      "🪙",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "A golden sword is highly enchantable but breaks quickly.",
    "sampleTranslation": "金剑极易附魔，但耐久度损耗较快。",
    "wordBreakdown": "装备原版合成：利用 金锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Golden Sword · 金剑。",
    "unlockedLevel": 1,
    "requiredLessonId": 6
  },
  {
    "id": "mc_diamond_sword",
    "nameEn": "Diamond Sword",
    "nameZh": "钻石剑",
    "phonetic": "/ˈdaɪəmənd sɔːd/",
    "mcIcon": "💎⚔️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      },
      {
        "name": "钻石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "💎",
      null,
      null,
      "💎",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "The diamond sword glitters with immense attack power.",
    "sampleTranslation": "钻石剑闪烁着惊人的破坏力。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Sword · 钻石剑。",
    "unlockedLevel": 1,
    "requiredLessonId": 8
  },
  {
    "id": "mc_wooden_pickaxe",
    "nameEn": "Wooden Pickaxe",
    "nameZh": "木镐",
    "phonetic": "/ˈwʊdn ˈpɪkæks/",
    "mcIcon": "⛏️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "橡木木板",
        "icon": "🪵"
      },
      {
        "name": "橡木木板",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "🪵",
      "🪵",
      "🪵",
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Use a wooden pickaxe to harvest your first pieces of cobblestone.",
    "sampleTranslation": "使用木镐开采你的第一批圆石。",
    "wordBreakdown": "装备原版合成：利用 橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Wooden Pickaxe · 木镐。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_stone_pickaxe",
    "nameEn": "Stone Pickaxe",
    "nameZh": "石镐",
    "phonetic": "/stəʊn ˈpɪkæks/",
    "mcIcon": "⛏️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "圆石",
        "icon": "🪨"
      },
      {
        "name": "圆石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "🪨",
      "🪨",
      "🪨",
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "A stone pickaxe can easily break iron ore veins.",
    "sampleTranslation": "石镐可以轻松敲碎铁矿脉。",
    "wordBreakdown": "装备原版合成：利用 圆石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Stone Pickaxe · 石镐。",
    "unlockedLevel": 1,
    "requiredLessonId": 2
  },
  {
    "id": "mc_iron_pickaxe",
    "nameEn": "Iron Pickaxe",
    "nameZh": "铁镐",
    "phonetic": "/ˈaɪən ˈpɪkæks/",
    "mcIcon": "⛏️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      },
      {
        "name": "铁锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      "⚙️",
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "An iron pickaxe is required to mine precious diamonds.",
    "sampleTranslation": "挖掘珍贵的钻石必须使用铁镐。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Pickaxe · 铁镐。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_diamond_pickaxe",
    "nameEn": "Diamond Pickaxe",
    "nameZh": "钻石镐",
    "phonetic": "/ˈdaɪəmənd ˈpɪkæks/",
    "mcIcon": "💎⛏️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      },
      {
        "name": "钻石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "💎",
      "💎",
      "💎",
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Only a diamond pickaxe can shatter dark obsidian blocks.",
    "sampleTranslation": "唯有钻石镐能够凿碎坚硬的黑曜石。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Pickaxe · 钻石镐。",
    "unlockedLevel": 1,
    "requiredLessonId": 8
  },
  {
    "id": "mc_wooden_axe",
    "nameEn": "Wooden Axe",
    "nameZh": "木斧",
    "phonetic": "/ˈwʊdn æks/",
    "mcIcon": "🪓",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "橡木木板",
        "icon": "🪵"
      },
      {
        "name": "橡木木板",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "🪵",
      "🪵",
      null,
      "🪵",
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Chop down giant trees quickly with a wooden axe.",
    "sampleTranslation": "用木斧迅速砍伐参天大树。",
    "wordBreakdown": "装备原版合成：利用 橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Wooden Axe · 木斧。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_stone_axe",
    "nameEn": "Stone Axe",
    "nameZh": "石斧",
    "phonetic": "/stəʊn æks/",
    "mcIcon": "🪓",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "圆石",
        "icon": "🪨"
      },
      {
        "name": "圆石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "🪨",
      "🪨",
      null,
      "🪨",
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "A stone axe deals devastating single-hit damage to foes.",
    "sampleTranslation": "石斧对敌人能造成沉重的单击重创。",
    "wordBreakdown": "装备原版合成：利用 圆石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Stone Axe · 石斧。",
    "unlockedLevel": 1,
    "requiredLessonId": 2
  },
  {
    "id": "mc_iron_axe",
    "nameEn": "Iron Axe",
    "nameZh": "铁斧",
    "phonetic": "/ˈaɪən æks/",
    "mcIcon": "🪓",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      },
      {
        "name": "铁锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      null,
      "⚙️",
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Clear forest logs effortlessly using an iron axe.",
    "sampleTranslation": "使用铁斧毫不费力地清理原木森林。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Axe · 铁斧。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_diamond_axe",
    "nameEn": "Diamond Axe",
    "nameZh": "钻石斧",
    "phonetic": "/ˈdaɪəmənd æks/",
    "mcIcon": "💎🪓",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      },
      {
        "name": "钻石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "💎",
      "💎",
      null,
      "💎",
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "The diamond axe splits logs like razor-sharp glass.",
    "sampleTranslation": "钻石斧劈削树干如同刀裁一般干脆。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Axe · 钻石斧。",
    "unlockedLevel": 1,
    "requiredLessonId": 8
  },
  {
    "id": "mc_wooden_shovel",
    "nameEn": "Wooden Shovel",
    "nameZh": "木锹",
    "phonetic": "/ˈwʊdn ˈʃʌvl/",
    "mcIcon": "🪵🥄",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "橡木木板",
        "icon": "🪵"
      },
      {
        "name": "橡木木板",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "🪵",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Dig dirt and sand with a wooden shovel.",
    "sampleTranslation": "用木锹挖泥土与沙子。",
    "wordBreakdown": "装备原版合成：利用 橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Wooden Shovel · 木锹。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_stone_shovel",
    "nameEn": "Stone Shovel",
    "nameZh": "石锹",
    "phonetic": "/stəʊn ˈʃʌvl/",
    "mcIcon": "🪨🥄",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "圆石",
        "icon": "🪨"
      },
      {
        "name": "圆石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "🪨",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Dig through gravel piles quickly using a stone shovel.",
    "sampleTranslation": "用石锹迅速铲穿砂砾碎石堆。",
    "wordBreakdown": "装备原版合成：利用 圆石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Stone Shovel · 石锹。",
    "unlockedLevel": 1,
    "requiredLessonId": 2
  },
  {
    "id": "mc_iron_shovel",
    "nameEn": "Iron Shovel",
    "nameZh": "铁锹",
    "phonetic": "/ˈaɪən ˈʃʌvl/",
    "mcIcon": "⚙️🥄",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      },
      {
        "name": "铁锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "⚙️",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "An iron shovel can create smooth grass pathways.",
    "sampleTranslation": "铁锹能够在草地上开辟出平整的小径。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Shovel · 铁锹。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_diamond_shovel",
    "nameEn": "Diamond Shovel",
    "nameZh": "钻石锹",
    "phonetic": "/ˈdaɪəmənd ˈʃʌvl/",
    "mcIcon": "💎🥄",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      },
      {
        "name": "钻石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      null,
      "💎",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Dig snow and clay instantaneously with a diamond shovel.",
    "sampleTranslation": "用钻石锹瞬间铲起积雪与黏土。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Shovel · 钻石锹。",
    "unlockedLevel": 1,
    "requiredLessonId": 8
  },
  {
    "id": "mc_wooden_hoe",
    "nameEn": "Wooden Hoe",
    "nameZh": "木锄",
    "phonetic": "/ˈwʊdn həʊ/",
    "mcIcon": "🪵🔨",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "橡木木板",
        "icon": "🪵"
      },
      {
        "name": "橡木木板",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "🪵",
      "🪵",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "Till dirt into fertile farmland with a wooden hoe.",
    "sampleTranslation": "用木锄将泥土耕作成为肥沃的农田。",
    "wordBreakdown": "装备原版合成：利用 橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Wooden Hoe · 木锄。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_iron_hoe",
    "nameEn": "Iron Hoe",
    "nameZh": "铁锄",
    "phonetic": "/ˈaɪən həʊ/",
    "mcIcon": "⚙️🔨",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      },
      {
        "name": "铁锭",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "An iron hoe rapidly harvests giant nether wart trees.",
    "sampleTranslation": "铁锄可以极其迅速地收割下界疣树木。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Hoe · 铁锄。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_diamond_hoe",
    "nameEn": "Diamond Hoe",
    "nameZh": "钻石锄",
    "phonetic": "/ˈdaɪəmənd həʊ/",
    "mcIcon": "💎🔨",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      },
      {
        "name": "钻石",
        "icon": "🥢"
      }
    ],
    "gridPattern": [
      "💎",
      "💎",
      null,
      null,
      "🥢",
      null,
      null,
      "🥢",
      null
    ],
    "sampleSentence": "The diamond hoe is the ultimate agricultural achievement.",
    "sampleTranslation": "钻石锄是农业劳作领域的终极里程碑。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Hoe · 钻石锄。",
    "unlockedLevel": 1,
    "requiredLessonId": 8
  },
  {
    "id": "mc_iron_helmet",
    "nameEn": "Iron Helmet",
    "nameZh": "铁头盔",
    "phonetic": "/ˈaɪən ˈhelmɪt/",
    "mcIcon": "🪖",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️",
      null,
      "⚙️",
      null,
      null,
      null
    ],
    "sampleSentence": "Protect your head from falling anvils with an iron helmet.",
    "sampleTranslation": "戴上铁头盔以保护头部免受落物伤害。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Helmet · 铁头盔。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "mc_iron_chestplate",
    "nameEn": "Iron Chestplate",
    "nameZh": "铁胸甲",
    "phonetic": "/ˈaɪən ˈtʃestpleɪt/",
    "mcIcon": "🦺",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "⚙️",
      null,
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️"
    ],
    "sampleSentence": "An iron chestplate grants excellent torso protection.",
    "sampleTranslation": "铁胸甲为躯干提供出色的护甲防护。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Chestplate · 铁胸甲。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_iron_leggings",
    "nameEn": "Iron Leggings",
    "nameZh": "铁护腿",
    "phonetic": "/ˈaɪən ˈleɡɪŋz/",
    "mcIcon": "👖",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      "⚙️",
      "⚙️",
      null,
      "⚙️",
      "⚙️",
      null,
      "⚙️"
    ],
    "sampleSentence": "Wear iron leggings to survive creeper shockwaves.",
    "sampleTranslation": "穿上铁护腿在苦力怕的冲击下幸存。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Leggings · 铁护腿。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_iron_boots",
    "nameEn": "Iron Boots",
    "nameZh": "铁靴子",
    "phonetic": "/ˈaɪən buːts/",
    "mcIcon": "👢",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "⚙️",
      null,
      "⚙️",
      "⚙️",
      null,
      "⚙️",
      null,
      null,
      null
    ],
    "sampleSentence": "Iron boots reduce fall damage during cave exploring.",
    "sampleTranslation": "铁靴子在矿洞探索中减轻高处坠落损伤。",
    "wordBreakdown": "装备原版合成：利用 铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Iron Boots · 铁靴子。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "mc_diamond_helmet",
    "nameEn": "Diamond Helmet",
    "nameZh": "钻石盔",
    "phonetic": "/ˈdaɪəmənd ˈhelmɪt/",
    "mcIcon": "💎🪖",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      }
    ],
    "gridPattern": [
      "💎",
      "💎",
      "💎",
      "💎",
      null,
      "💎",
      null,
      null,
      null
    ],
    "sampleSentence": "A diamond helmet gleams with legendary endurance.",
    "sampleTranslation": "钻石头盔闪耀着传奇般的持久韧性。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Helmet · 钻石盔。",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "mc_diamond_chestplate",
    "nameEn": "Diamond Chestplate",
    "nameZh": "钻石胸甲",
    "phonetic": "/ˈdaɪəmənd ˈtʃestpleɪt/",
    "mcIcon": "💎🦺",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      }
    ],
    "gridPattern": [
      "💎",
      null,
      "💎",
      "💎",
      "💎",
      "💎",
      "💎",
      "💎",
      "💎"
    ],
    "sampleSentence": "The diamond chestplate shields you against fierce dragon breath.",
    "sampleTranslation": "钻石胸甲能够护佑你抵抗巨龙凶猛的吐息。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Chestplate · 钻石胸甲。",
    "unlockedLevel": 1,
    "requiredLessonId": 10
  },
  {
    "id": "mc_diamond_leggings",
    "nameEn": "Diamond Leggings",
    "nameZh": "钻石护腿",
    "phonetic": "/ˈdaɪəmənd ˈleɡɪŋz/",
    "mcIcon": "💎👖",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      }
    ],
    "gridPattern": [
      "💎",
      "💎",
      "💎",
      "💎",
      null,
      "💎",
      "💎",
      null,
      "💎"
    ],
    "sampleSentence": "Diamond leggings provide impenetrable defense in combat.",
    "sampleTranslation": "钻石护腿在激战中提供无坚不摧的坚固防御。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Leggings · 钻石护腿。",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "mc_diamond_boots",
    "nameEn": "Diamond Boots",
    "nameZh": "钻石靴",
    "phonetic": "/ˈdaɪəmənd buːts/",
    "mcIcon": "💎👢",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "钻石",
        "icon": "💎"
      }
    ],
    "gridPattern": [
      "💎",
      null,
      "💎",
      "💎",
      null,
      "💎",
      null,
      null,
      null
    ],
    "sampleSentence": "Step onto fiery nether terrain safely in diamond boots.",
    "sampleTranslation": "脚穿钻石靴安全踏上下界炽热的岩浆岩地面。",
    "wordBreakdown": "装备原版合成：利用 钻石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Diamond Boots · 钻石靴。",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "mc_bow",
    "nameEn": "Bow",
    "nameZh": "弓",
    "phonetic": "/bəʊ/",
    "mcIcon": "🏹",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "蜘蛛丝+木棍",
        "icon": "🥢"
      },
      {
        "name": "蜘蛛丝+木棍",
        "icon": "🧵"
      }
    ],
    "gridPattern": [
      null,
      "🥢",
      "🧵",
      "🥢",
      null,
      "🧵",
      null,
      "🥢",
      "🧵"
    ],
    "sampleSentence": "Shoot arrows at skeletons from a safe distance with a bow.",
    "sampleTranslation": "用弓在安全距离向骷髅射箭。",
    "wordBreakdown": "装备原版合成：利用 蜘蛛丝+木棍 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Bow · 弓。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "mc_arrow",
    "nameEn": "Arrow",
    "nameZh": "箭矢",
    "phonetic": "/ˈærəʊ/",
    "mcIcon": "🎯",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "燧石+木棍+羽毛",
        "icon": "🪨"
      },
      {
        "name": "燧石+木棍+羽毛",
        "icon": "🥢"
      },
      {
        "name": "燧石+木棍+羽毛",
        "icon": "🪶"
      }
    ],
    "gridPattern": [
      "🪨",
      null,
      null,
      "🥢",
      null,
      null,
      "🪶",
      null,
      null
    ],
    "sampleSentence": "Every bow needs sharp arrows to inflict ranged damage.",
    "sampleTranslation": "每张弓都需要锋利的箭矢才能造成远程杀伤。",
    "wordBreakdown": "装备原版合成：利用 燧石+木棍+羽毛 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Arrow · 箭矢。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "mc_shield",
    "nameEn": "Shield",
    "nameZh": "盾牌",
    "phonetic": "/ʃiːld/",
    "mcIcon": "🛡️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭+橡木木板",
        "icon": "🪵"
      },
      {
        "name": "铁锭+橡木木板",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "🪵",
      "⚙️",
      "🪵",
      "🪵",
      "🪵",
      "🪵",
      null,
      "🪵",
      null
    ],
    "sampleSentence": "Raise your shield to completely block incoming arrows.",
    "sampleTranslation": "举起你的盾牌以彻底抵挡飞来的箭雨。",
    "wordBreakdown": "装备原版合成：利用 铁锭+橡木木板 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Shield · 盾牌。",
    "unlockedLevel": 1,
    "requiredLessonId": 4
  },
  {
    "id": "mc_flint_and_steel",
    "nameEn": "Flint and Steel",
    "nameZh": "打火石",
    "phonetic": "/flɪnt ənd stiːl/",
    "mcIcon": "🔥",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭+燧石",
        "icon": "⚙️"
      },
      {
        "name": "铁锭+燧石",
        "icon": "🪨"
      }
    ],
    "gridPattern": [
      "⚙️",
      null,
      null,
      null,
      "🪨",
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Use flint and steel to ignite the mysterious Nether Portal.",
    "sampleTranslation": "用打火石点燃神秘的下界传送门。",
    "wordBreakdown": "装备原版合成：利用 铁锭+燧石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Flint and Steel · 打火石。",
    "unlockedLevel": 1,
    "requiredLessonId": 5
  },
  {
    "id": "mc_shears",
    "nameEn": "Shears",
    "nameZh": "剪刀",
    "phonetic": "/ʃɪəz/",
    "mcIcon": "✂️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭×2",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      null,
      "⚙️",
      null,
      "⚙️",
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Shear sheep gently with shears without causing harm.",
    "sampleTranslation": "用剪刀温和地修剪羊毛，无需伤害绵羊。",
    "wordBreakdown": "装备原版合成：利用 铁锭×2 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Shears · 剪刀。",
    "unlockedLevel": 1,
    "requiredLessonId": 2
  },
  {
    "id": "mc_fishing_rod",
    "nameEn": "Fishing Rod",
    "nameZh": "钓鱼竿",
    "phonetic": "/ˈfɪʃɪŋ rɒd/",
    "mcIcon": "🎣",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "木棍+蜘蛛丝",
        "icon": "🥢"
      },
      {
        "name": "木棍+蜘蛛丝",
        "icon": "🧵"
      }
    ],
    "gridPattern": [
      null,
      null,
      "🥢",
      null,
      "🥢",
      "🧵",
      "🥢",
      null,
      "🧵"
    ],
    "sampleSentence": "Cast your fishing rod into deep waters to catch enchanted loot.",
    "sampleTranslation": "将钓鱼竿甩入深水以捕获附魔宝物。",
    "wordBreakdown": "装备原版合成：利用 木棍+蜘蛛丝 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Fishing Rod · 钓鱼竿。",
    "unlockedLevel": 1,
    "requiredLessonId": 3
  },
  {
    "id": "mc_clock",
    "nameEn": "Clock",
    "nameZh": "时钟",
    "phonetic": "/klɒk/",
    "mcIcon": "⌚",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "金锭+红石",
        "icon": "🪙"
      },
      {
        "name": "金锭+红石",
        "icon": "🔴"
      }
    ],
    "gridPattern": [
      null,
      "🪙",
      null,
      "🪙",
      "🔴",
      "🪙",
      null,
      "🪙",
      null
    ],
    "sampleSentence": "The clock shows the precise celestial position of the sun.",
    "sampleTranslation": "时钟展示了太阳精准的天体运行方位。",
    "wordBreakdown": "装备原版合成：利用 金锭+红石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Clock · 时钟。",
    "unlockedLevel": 1,
    "requiredLessonId": 5
  },
  {
    "id": "mc_compass",
    "nameEn": "Compass",
    "nameZh": "指南针",
    "phonetic": "/ˈkʌmpəs/",
    "mcIcon": "🧭",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁锭+红石",
        "icon": "⚙️"
      },
      {
        "name": "铁锭+红石",
        "icon": "🔴"
      }
    ],
    "gridPattern": [
      null,
      "⚙️",
      null,
      "⚙️",
      "🔴",
      "⚙️",
      null,
      "⚙️",
      null
    ],
    "sampleSentence": "A compass always points reliably back to the world spawn.",
    "sampleTranslation": "指南针始终可靠地指向世界初始出生点。",
    "wordBreakdown": "装备原版合成：利用 铁锭+红石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Compass · 指南针。",
    "unlockedLevel": 1,
    "requiredLessonId": 5
  },
  {
    "id": "mc_tnt",
    "nameEn": "TNT",
    "nameZh": "TNT炸药",
    "phonetic": "/ˌtiː en ˈtiː/",
    "mcIcon": "🧨",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "火药+沙子",
        "icon": "💥"
      },
      {
        "name": "火药+沙子",
        "icon": "⏳"
      }
    ],
    "gridPattern": [
      "💥",
      "⏳",
      "💥",
      "⏳",
      "💥",
      "⏳",
      "💥",
      "⏳",
      "💥"
    ],
    "sampleSentence": "Ignite TNT with redstone to blast open massive caverns.",
    "sampleTranslation": "用红石引爆 TNT 炸开巨大的地下岩洞。",
    "wordBreakdown": "装备原版合成：利用 火药+沙子 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：TNT · TNT炸药。",
    "unlockedLevel": 1,
    "requiredLessonId": 6
  },
  {
    "id": "mc_enchanting_table",
    "nameEn": "Enchanting Table",
    "nameZh": "附魔台",
    "phonetic": "/ɪnˈtʃɑːntɪŋ ˈteɪbl/",
    "mcIcon": "🔮",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "书本+钻石+黑曜石",
        "icon": "📖"
      },
      {
        "name": "书本+钻石+黑曜石",
        "icon": "💎"
      },
      {
        "name": "书本+钻石+黑曜石",
        "icon": "⬛"
      }
    ],
    "gridPattern": [
      null,
      "📖",
      null,
      "💎",
      "⬛",
      "💎",
      "⬛",
      "⬛",
      "⬛"
    ],
    "sampleSentence": "An enchanting table imbues gear with arcane superpowers.",
    "sampleTranslation": "附魔台为装备灌注神秘强大的超自然神力。",
    "wordBreakdown": "装备原版合成：利用 书本+钻石+黑曜石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Enchanting Table · 附魔台。",
    "unlockedLevel": 1,
    "requiredLessonId": 11
  },
  {
    "id": "mc_anvil",
    "nameEn": "Anvil",
    "nameZh": "铁砧",
    "phonetic": "/ˈænvɪl/",
    "mcIcon": "⚒️",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "铁块+铁锭",
        "icon": "⚙️"
      }
    ],
    "gridPattern": [
      "⚙️",
      "⚙️",
      "⚙️",
      null,
      "⚙️",
      null,
      "⚙️",
      "⚙️",
      "⚙️"
    ],
    "sampleSentence": "Repair and name your gear on the heavy iron anvil.",
    "sampleTranslation": "在沉重的铁砧上修理装备并为其铭刻名字。",
    "wordBreakdown": "装备原版合成：利用 铁块+铁锭 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Anvil · 铁砧。",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  },
  {
    "id": "mc_brewing_stand",
    "nameEn": "Brewing Stand",
    "nameZh": "酿造台",
    "phonetic": "/ˈbruːɪŋ stænd/",
    "mcIcon": "🧪",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "烈焰棒+圆石",
        "icon": "🔥"
      },
      {
        "name": "烈焰棒+圆石",
        "icon": "🪨"
      }
    ],
    "gridPattern": [
      null,
      "🔥",
      null,
      "🪨",
      "🪨",
      "🪨",
      null,
      null,
      null
    ],
    "sampleSentence": "Brew mystical healing and night vision potions on the stand.",
    "sampleTranslation": "在酿造台上调制神奇的治愈与夜视药水。",
    "wordBreakdown": "装备原版合成：利用 烈焰棒+圆石 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Brewing Stand · 酿造台。",
    "unlockedLevel": 1,
    "requiredLessonId": 9
  },
  {
    "id": "mc_beacon",
    "nameEn": "Beacon",
    "nameZh": "信标",
    "phonetic": "/ˈbiːkən/",
    "mcIcon": "🗼",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "下界之星+黑曜石+玻璃",
        "icon": "🪟"
      },
      {
        "name": "下界之星+黑曜石+玻璃",
        "icon": "⭐"
      },
      {
        "name": "下界之星+黑曜石+玻璃",
        "icon": "⬛"
      }
    ],
    "gridPattern": [
      "🪟",
      "🪟",
      "🪟",
      "🪟",
      "⭐",
      "🪟",
      "⬛",
      "⬛",
      "⬛"
    ],
    "sampleSentence": "The skyward beacon beam grants infinite regeneration to allies.",
    "sampleTranslation": "直冲云霄的信标光束赋予盟友源源不断的再生庇护。",
    "wordBreakdown": "装备原版合成：利用 下界之星+黑曜石+玻璃 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Beacon · 信标。",
    "unlockedLevel": 1,
    "requiredLessonId": 12
  },
  {
    "id": "mc_bread",
    "nameEn": "Bread",
    "nameZh": "面包",
    "phonetic": "/bred/",
    "mcIcon": "🍞",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "小麦×3",
        "icon": "🌾"
      }
    ],
    "gridPattern": [
      "🌾",
      "🌾",
      "🌾",
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "sampleSentence": "Bake fresh bread from golden wheat to stay well-fed.",
    "sampleTranslation": "从小麦中烘烤出新鲜的面包来填饱肚子。",
    "wordBreakdown": "装备原版合成：利用 小麦×3 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Bread · 面包。",
    "unlockedLevel": 1,
    "requiredLessonId": 1
  },
  {
    "id": "mc_cake",
    "nameEn": "Cake",
    "nameZh": "蛋糕",
    "phonetic": "/keɪk/",
    "mcIcon": "🎂",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "牛奶桶+糖+小麦+鸡蛋",
        "icon": "🥛"
      },
      {
        "name": "牛奶桶+糖+小麦+鸡蛋",
        "icon": "🍬"
      },
      {
        "name": "牛奶桶+糖+小麦+鸡蛋",
        "icon": "🥚"
      },
      {
        "name": "牛奶桶+糖+小麦+鸡蛋",
        "icon": "🌾"
      }
    ],
    "gridPattern": [
      "🥛",
      "🥛",
      "🥛",
      "🍬",
      "🥚",
      "🍬",
      "🌾",
      "🌾",
      "🌾"
    ],
    "sampleSentence": "Share delicious slices of birthday cake with friends.",
    "sampleTranslation": "与好友共同切开并分享美味的生日蛋糕。",
    "wordBreakdown": "装备原版合成：利用 牛奶桶+糖+小麦+鸡蛋 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Cake · 蛋糕。",
    "unlockedLevel": 1,
    "requiredLessonId": 6
  },
  {
    "id": "mc_golden_apple",
    "nameEn": "Golden Apple",
    "nameZh": "金苹果",
    "phonetic": "/ˈɡəʊldən ˈæpl/",
    "mcIcon": "🍏",
    "category": "equipment",
    "recipeType": "mc_equipment",
    "requiredIngredients": [
      {
        "name": "金锭×8+苹果",
        "icon": "🪙"
      },
      {
        "name": "金锭×8+苹果",
        "icon": "🍎"
      }
    ],
    "gridPattern": [
      "🪙",
      "🪙",
      "🪙",
      "🪙",
      "🍎",
      "🪙",
      "🪙",
      "🪙",
      "🪙"
    ],
    "sampleSentence": "Eating a golden apple grants absorption and rapid healing.",
    "sampleTranslation": "食用金苹果将为你带来伤害吸收与极速治愈。",
    "wordBreakdown": "装备原版合成：利用 金锭×8+苹果 在 3×3 工作台中按标准阵型排列合成。",
    "grammarTip": "Minecraft 生存核心词汇与装备名称：Golden Apple · 金苹果。",
    "unlockedLevel": 1,
    "requiredLessonId": 7
  }
];

export const EXTRA_CRAFTING_RECIPES: CraftingRecipe[] = [
  ...NCE_WORD_CRAFTING_RECIPES,
  ...MC_EQUIPMENT_RECIPES
];
