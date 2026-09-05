// Authentic NCE Book 1 Unit 2 Data (Lessons 25 - 48)
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

export const NCE_BOOK1_UNIT2_DATA: Record<number, LessonCorpusItem> = {
  "25": {
    "id": 25,
    "unit": 2,
    "title": "Mrs. Smith's kitchen",
    "titleZh": "史密斯太太的厨房",
    "topic": "Kitchen & Locations",
    "topicZh": "房间与厨房物品",
    "grammar": "方位介词 (in, on, under, beside) 与 There is / Where is",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "ALEX",
        "text": "Mrs. Smith's kitchen is small.",
        "translation": "史密斯太太的厨房很小。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is a refrigerator in the kitchen.",
        "translation": "厨房里有个电冰箱。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "The refrigerator is white. It is on the right.",
        "translation": "电冰箱是白色的，它在右边。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is an electric cooker in the kitchen.",
        "translation": "厨房里有个电灶。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "The cooker is blue. It is on the left.",
        "translation": "电灶是蓝色的，它在左边。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is a table in the middle of the room.",
        "translation": "房间中央有张桌子。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "There is a bottle on the table. The bottle is empty.",
        "translation": "桌上有个瓶子，瓶子是空的。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is a cup on the table, too. The cup is clean.",
        "translation": "桌上还有一只茶杯，茶杯是干净的。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Mrs. Smith's kitchen is small.",
        "zh": "史密斯太太的厨房很小。"
      },
      {
        "en": "There is a refrigerator in the kitchen.",
        "zh": "厨房里有个电冰箱。"
      },
      {
        "en": "The refrigerator is white. It is on the right.",
        "zh": "电冰箱是白色的，它在右边。"
      },
      {
        "en": "There is an electric cooker in the kitchen.",
        "zh": "厨房里有个电灶。"
      },
      {
        "en": "The cooker is blue. It is on the left.",
        "zh": "电灶是蓝色的，它在左边。"
      },
      {
        "en": "There is a table in the middle of the room.",
        "zh": "房间中央有张桌子。"
      },
      {
        "en": "There is a bottle on the table. The bottle is empty.",
        "zh": "桌上有个瓶子，瓶子是空的。"
      },
      {
        "en": "There is a cup on the table, too. The cup is clean.",
        "zh": "桌上还有一只茶杯，茶杯是干净的。"
      }
    ],
    "words": [
      {
        "word": "kitchen",
        "phonetic": "/ˈkɪtʃɪn/",
        "meaning": "n. 厨房",
        "mcItem": "Smoker",
        "mcItemIcon": "🍳",
        "sampleSentence": "The kitchen is small.",
        "sampleTranslation": "厨房很小。"
      },
      {
        "word": "refrigerator",
        "phonetic": "/rɪˈfrɪdʒəreɪtə/",
        "meaning": "n. 电冰箱",
        "mcItem": "Iron Block",
        "mcItemIcon": "🧊",
        "sampleSentence": "There is a refrigerator in the kitchen.",
        "sampleTranslation": "厨房里有一台冰箱。"
      },
      {
        "word": "electric",
        "phonetic": "/ɪˈlektrɪk/",
        "meaning": "adj. 带电的，电动的",
        "mcItem": "Redstone Torch",
        "mcItemIcon": "⚡",
        "sampleSentence": "This is an electric cooker.",
        "sampleTranslation": "这是一个电灶。"
      },
      {
        "word": "cooker",
        "phonetic": "/ˈkʊkə/",
        "meaning": "n. 炉灶",
        "mcItem": "Furnace",
        "mcItemIcon": "🍳",
        "sampleSentence": "The cooker is on the left.",
        "sampleTranslation": "炉灶在左边。"
      },
      {
        "word": "middle",
        "phonetic": "/ˈmɪdl/",
        "meaning": "n. 中间",
        "mcItem": "Target",
        "mcItemIcon": "🎯",
        "sampleSentence": "The table is in the middle of the room.",
        "sampleTranslation": "桌子在房间中间。"
      }
    ],
    "grammarNote": "There is + 单数名词 + 地点状语：表示某处有某物。on the right 在右边，on the left 在左边，in the middle of 在……中间。"
  },
  "26": {
    "id": 26,
    "unit": 2,
    "title": "Where is it?",
    "titleZh": "它在哪里？",
    "topic": "Location & Positions",
    "topicZh": "物品位置提问与回答",
    "grammar": "Where is it? 与 介词短语 (in/on/under/beside/near)",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Where is the cup?",
        "translation": "杯子在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's on the table.",
        "translation": "在桌子上。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where is the box?",
        "translation": "盒子在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's on the floor.",
        "translation": "在地板上。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where is the bottle?",
        "translation": "瓶子在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's in the refrigerator.",
        "translation": "在电冰箱里。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Where is the cup? It's on the table.",
        "zh": "杯子在哪里？在桌子上。"
      },
      {
        "en": "Where is the box? It's on the floor.",
        "zh": "盒子在哪里？在地板上。"
      },
      {
        "en": "Where is the bottle? It's in the refrigerator.",
        "zh": "瓶子在哪里？在冰箱里。"
      },
      {
        "en": "Where is the spoon? It's in the cup.",
        "zh": "勺子在哪里？在杯子里。"
      },
      {
        "en": "Where is the plate? It's on the cooker.",
        "zh": "盘子在哪里？在炉灶上。"
      },
      {
        "en": "Where is the fork? It's on the tin.",
        "zh": "叉子在哪里？在罐头上。"
      },
      {
        "en": "Where is the knife? It's in the box.",
        "zh": "刀在哪里？在盒子里。"
      }
    ],
    "words": [
      {
        "word": "teapot",
        "phonetic": "/ˈtiː.pɒt/",
        "meaning": "n. 茶壶",
        "mcItem": "Cauldron",
        "mcItemIcon": "🫖",
        "sampleSentence": "The teapot is on the shelf.",
        "sampleTranslation": "茶壶在架子上。"
      },
      {
        "word": "cup",
        "phonetic": "/kʌp/",
        "meaning": "n. 茶杯",
        "mcItem": "Bowl",
        "mcItemIcon": "☕",
        "sampleSentence": "The cup is on the table.",
        "sampleTranslation": "茶杯在桌子上。"
      },
      {
        "word": "middle",
        "phonetic": "/ˈmɪd.əl/",
        "meaning": "n. 中间，中央",
        "mcItem": "Target",
        "mcItemIcon": "🎯",
        "sampleSentence": "The table is in the middle of the room.",
        "sampleTranslation": "桌子在房间正中央。"
      },
      {
        "word": "floor",
        "phonetic": "/flɔːr/",
        "meaning": "n. 地板",
        "mcItem": "Oak Planks",
        "mcItemIcon": "🪵",
        "sampleSentence": "The rug is on the wooden floor.",
        "sampleTranslation": "地毯铺在木地板上。"
      },
      {
        "word": "plate",
        "phonetic": "/pleɪt/",
        "meaning": "n. 盘子",
        "mcItem": "Pressure Plate",
        "mcItemIcon": "🍽️",
        "sampleSentence": "Put the warm bread on the plate.",
        "sampleTranslation": "把温热的面包放在盘子里。"
      }
    ],
    "grammarNote": "询问单数物品位置：Where is the ...? 回答：It's in / on / under / near the ..."
  },
  "27": {
    "id": 27,
    "unit": 2,
    "title": "Mrs. Smith's living room",
    "titleZh": "史密斯太太的客厅",
    "topic": "Living Room & Plural Objects",
    "topicZh": "客厅与复数物品位置",
    "grammar": "There are + 复数名词 与 介词短语",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "ALEX",
        "text": "Mrs. Smith's living room is large.",
        "translation": "史密斯太太的客厅很大。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is a television in the room.",
        "translation": "客厅里有台电视机。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "The television is near the window.",
        "translation": "电视机靠近窗户。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There are some magazines on the television.",
        "translation": "电视机上放着几本杂志。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "There is a table in the room.",
        "translation": "客厅里有张桌子。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There are some armchairs in the room.",
        "translation": "客厅里有几把扶手椅。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "The armchairs are near the table.",
        "translation": "扶手椅靠近桌子。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There is a stereo in the room.",
        "translation": "客厅里有台立体声音响。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "The stereo is near the door.",
        "translation": "音响靠近门。",
        "avatar": "👩‍🦰"
      },
      {
        "speaker": "STEVE",
        "text": "There are some books on the stereo.",
        "translation": "音响上有几本书。",
        "avatar": "👦"
      },
      {
        "speaker": "ALEX",
        "text": "There are some pictures in the room. The pictures are on the wall.",
        "translation": "客厅里有几幅画。画挂在墙上。",
        "avatar": "👩‍🦰"
      }
    ],
    "sentences": [
      {
        "en": "Mrs. Smith's living room is large.",
        "zh": "史密斯太太的客厅很大。"
      },
      {
        "en": "There is a television in the room. The television is near the window.",
        "zh": "客厅里有台电视机。电视机靠近窗户。"
      },
      {
        "en": "There are some magazines on the television.",
        "zh": "电视机上放着几本杂志。"
      },
      {
        "en": "There are some armchairs in the room. The armchairs are near the table.",
        "zh": "客厅里有几把扶手椅。扶手椅靠近桌子。"
      },
      {
        "en": "There is a stereo in the room. The stereo is near the door.",
        "zh": "客厅里有台立体声音响。音响靠近门。"
      },
      {
        "en": "There are some books on the stereo.",
        "zh": "音响上有几本书。"
      },
      {
        "en": "There are some pictures in the room. The pictures are on the wall.",
        "zh": "客厅里有几幅画。画挂在墙上。"
      }
    ],
    "words": [
      {
        "word": "living room",
        "phonetic": "/ˈlɪvɪŋ ˌruːm/",
        "meaning": "客厅",
        "mcItem": "Painting",
        "mcItemIcon": "🛋️",
        "sampleSentence": "The living room is large.",
        "sampleTranslation": "客厅很大。"
      },
      {
        "word": "armchair",
        "phonetic": "/ˈɑːmtʃeə/",
        "meaning": "n. 扶手椅",
        "mcItem": "Stairs",
        "mcItemIcon": "💺",
        "sampleSentence": "Sit in the armchair.",
        "sampleTranslation": "坐在扶手椅上。"
      },
      {
        "word": "window",
        "phonetic": "/ˈwɪndəʊ/",
        "meaning": "n. 窗户",
        "mcItem": "Glass Pane",
        "mcItemIcon": "🪟",
        "sampleSentence": "Open the window, please.",
        "sampleTranslation": "请打开窗户。"
      },
      {
        "word": "picture",
        "phonetic": "/ˈpɪktʃə/",
        "meaning": "n. 图画",
        "mcItem": "Painting",
        "mcItemIcon": "🖼️",
        "sampleSentence": "The pictures are on the wall.",
        "sampleTranslation": "画在墙上。"
      },
      {
        "word": "wall",
        "phonetic": "/wɔːl/",
        "meaning": "n. 墙",
        "mcItem": "Cobblestone Wall",
        "mcItemIcon": "🧱",
        "sampleSentence": "The picture is on the wall.",
        "sampleTranslation": "画挂在墙上。"
      }
    ],
    "grammarNote": "There are + 复数名词 + 地点状语：表示某处有某些人/物。注意 some 用于肯定句。"
  },
  "28": {
    "id": 28,
    "unit": 2,
    "title": "Where are they?",
    "titleZh": "它们在哪里？",
    "topic": "Plural Locations",
    "topicZh": "复数物品位置询问",
    "grammar": "Where are they? 与 They are on/in/near/under...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Where are the books?",
        "translation": "书在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're on the shelf.",
        "translation": "它们在架子上。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where are the cups?",
        "translation": "茶杯在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're on the table.",
        "translation": "它们在桌子上。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where are the glasses?",
        "translation": "玻璃杯在哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're in the cupboard.",
        "translation": "它们在食橱里。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Where are the trousers? They're on the bed.",
        "zh": "裤子在哪里？在床上。"
      },
      {
        "en": "Where are the shoes? They're on the floor.",
        "zh": "鞋在哪里？在地板上。"
      },
      {
        "en": "Where are the glasses? They're in the cupboard.",
        "zh": "玻璃杯在哪里？在食橱里。"
      },
      {
        "en": "Where are the bottles? They're in the refrigerator.",
        "zh": "瓶子在哪里？在冰箱里。"
      },
      {
        "en": "Where are the books? They're on the shelf.",
        "zh": "书在哪里？在书架上。"
      },
      {
        "en": "Where are the tickets? They're on the table.",
        "zh": "票在哪里？在桌子上。"
      }
    ],
    "words": [
      {
        "word": "trousers",
        "phonetic": "/ˈtraʊ.zəz/",
        "meaning": "名词：裤子（复数）",
        "mcItem": "Leather Leggings",
        "mcItemIcon": "👖",
        "sampleSentence": "His trousers are hanging on the wardrobe door.",
        "sampleTranslation": "他的裤子挂在衣柜门上。"
      },
      {
        "word": "kitchen",
        "phonetic": "/ˈkɪtʃ.ɪn/",
        "meaning": "名词：厨房",
        "mcItem": "Smoker",
        "mcItemIcon": "🍳",
        "sampleSentence": "Alex is preparing soup in the kitchen.",
        "sampleTranslation": "亚历克斯正在厨房里煮汤。"
      },
      {
        "word": "bedroom",
        "phonetic": "/ˈbed.ruːm/",
        "meaning": "名词：卧室",
        "mcItem": "Red Bed",
        "mcItemIcon": "🛏️",
        "sampleSentence": "My comfortable bed is in the bedroom.",
        "sampleTranslation": "我舒适的床在卧室里。"
      },
      {
        "word": "living room",
        "phonetic": "/ˈlɪv.ɪŋ ˌruːm/",
        "meaning": "名词：客厅；起居室",
        "mcItem": "Painting",
        "mcItemIcon": "🛋️",
        "sampleSentence": "They are sitting quietly in the living room.",
        "sampleTranslation": "他们正安静地坐在客厅里。"
      }
    ],
    "grammarNote": "询问复数物品位置：Where are the ...? 回答：They're on / in / under the ..."
  },
  "29": {
    "id": 29,
    "unit": 2,
    "title": "Come in, Amy.",
    "titleZh": "进来，艾米。",
    "topic": "Housekeeping & Cleaning",
    "topicZh": "房间整理与打扫",
    "grammar": "情态动词 must 与祈使句",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Come in, Amy.",
        "translation": "进来，艾米。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Shut the door, please.",
        "translation": "请关上门。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "This bedroom's very untidy.",
        "translation": "这间卧室太不整洁了。",
        "avatar": "👩"
      },
      {
        "speaker": "AMY",
        "text": "What must I do, Mrs. Mustafa?",
        "translation": "我该做什么呢，穆斯塔法太太？",
        "avatar": "👧"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Open the window and air the room.",
        "translation": "打开窗户，给房间透透气。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Then put these clothes in the wardrobe.",
        "translation": "然后把这些衣服放进衣柜里。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Make the bed.",
        "translation": "铺好床。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Dust the dressing table.",
        "translation": "掸掉梳妆台上的灰尘。",
        "avatar": "👩"
      },
      {
        "speaker": "MRS. MUSTAFA",
        "text": "Sweep the floor.",
        "translation": "扫扫地。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Come in, Amy. Shut the door, please.",
        "zh": "进来，艾米。请关上门。"
      },
      {
        "en": "This bedroom's very untidy.",
        "zh": "这间卧室太不整洁了。"
      },
      {
        "en": "What must I do, Mrs. Mustafa?",
        "zh": "我该做什么呢，穆斯塔法太太？"
      },
      {
        "en": "Open the window and air the room.",
        "zh": "打开窗户，给房间透透气。"
      },
      {
        "en": "Then put these clothes in the wardrobe.",
        "zh": "然后把这些衣服放进衣柜里。"
      },
      {
        "en": "Make the bed.",
        "zh": "铺好床。"
      },
      {
        "en": "Dust the dressing table.",
        "zh": "掸掉梳妆台上的灰尘。"
      },
      {
        "en": "Sweep the floor.",
        "zh": "扫扫地。"
      }
    ],
    "words": [
      {
        "word": "bedroom",
        "phonetic": "/ˈbedruːm/",
        "meaning": "n. 卧室",
        "mcItem": "Bed",
        "mcItemIcon": "🛏️",
        "sampleSentence": "The bedroom is clean.",
        "sampleTranslation": "卧室很干净。"
      },
      {
        "word": "untidy",
        "phonetic": "/ʌnˈtaɪdi/",
        "meaning": "adj. 乱七八糟的",
        "mcItem": "Dirt",
        "mcItemIcon": "🧹",
        "sampleSentence": "The room is very untidy.",
        "sampleTranslation": "房间非常不整洁。"
      },
      {
        "word": "wardrobe",
        "phonetic": "/ˈwɔːdrəʊb/",
        "meaning": "n. 大衣柜",
        "mcItem": "Chest",
        "mcItemIcon": "🚪",
        "sampleSentence": "Put it in the wardrobe.",
        "sampleTranslation": "把它放进衣柜。"
      },
      {
        "word": "dust",
        "phonetic": "/dʌst/",
        "meaning": "v. 掸掉灰尘",
        "mcItem": "Feather",
        "mcItemIcon": "🪶",
        "sampleSentence": "Dust the table.",
        "sampleTranslation": "擦去桌上的灰尘。"
      },
      {
        "word": "sweep",
        "phonetic": "/swiːp/",
        "meaning": "v. 扫",
        "mcItem": "Broom",
        "mcItemIcon": "🧹",
        "sampleSentence": "Sweep the floor.",
        "sampleTranslation": "扫地。"
      }
    ],
    "grammarNote": "情态动词 must：What must I do? (我必须做什么？) 后面接动词原形。Make the bed 整理床铺，Air the room 给房间通风。"
  },
  "30": {
    "id": 30,
    "unit": 2,
    "title": "What must I do?",
    "titleZh": "我应该做什么？",
    "topic": "Chores & Imperatives",
    "topicZh": "家务指令与动作要求",
    "grammar": "祈使句与情态动词 must 回答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What must I do?",
        "translation": "我该做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Open the window.",
        "translation": "打开窗户。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What must I do?",
        "translation": "我该做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Shut the door.",
        "translation": "关上门。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What must I do?",
        "translation": "我该做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Turn on the light.",
        "translation": "开灯。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Open the window.",
        "zh": "打开窗户。"
      },
      {
        "en": "Shut the door.",
        "zh": "关上门。"
      },
      {
        "en": "Turn on the light.",
        "zh": "开灯。"
      },
      {
        "en": "Turn off the tap.",
        "zh": "关上水龙头。"
      },
      {
        "en": "Put on your coat.",
        "zh": "穿上你的大衣。"
      },
      {
        "en": "Take off your shoes.",
        "zh": "脱下你的鞋子。"
      },
      {
        "en": "Sweep the floor.",
        "zh": "扫地。"
      },
      {
        "en": "Clean the blackboard.",
        "zh": "擦黑板。"
      },
      {
        "en": "Dust the dressing table.",
        "zh": "掸掉梳妆台上的灰尘。"
      },
      {
        "en": "Empty the cup.",
        "zh": "倒空杯子。"
      },
      {
        "en": "Read this book.",
        "zh": "读这本书。"
      },
      {
        "en": "Sharpen this pencil.",
        "zh": "削这支铅笔。"
      }
    ],
    "words": [
      {
        "word": "sharpen",
        "phonetic": "/ˈʃɑːpən/",
        "meaning": "v. 削尖，磨快",
        "mcItem": "Grindstone",
        "mcItemIcon": "✏️",
        "sampleSentence": "Sharpen this pencil.",
        "sampleTranslation": "削这支铅笔。"
      },
      {
        "word": "put on",
        "phonetic": "/ˌpʊt ˈɒn/",
        "meaning": "穿上",
        "mcItem": "Armor",
        "mcItemIcon": "🧥",
        "sampleSentence": "Put on your coat.",
        "sampleTranslation": "穿上你的外套。"
      },
      {
        "word": "take off",
        "phonetic": "/ˌteɪk ˈɒf/",
        "meaning": "脱掉",
        "mcItem": "Boots",
        "mcItemIcon": "👞",
        "sampleSentence": "Take off your shoes.",
        "sampleTranslation": "脱掉你的鞋子。"
      },
      {
        "word": "turn on",
        "phonetic": "/ˌtɜːn ˈɒn/",
        "meaning": "开(电灯/收音机等)",
        "mcItem": "Lever",
        "mcItemIcon": "💡",
        "sampleSentence": "Turn on the light.",
        "sampleTranslation": "打开灯。"
      },
      {
        "word": "turn off",
        "phonetic": "/ˌtɜːn ˈɒf/",
        "meaning": "关(电灯/水龙头等)",
        "mcItem": "Tripwire Hook",
        "mcItemIcon": "🚰",
        "sampleSentence": "Turn off the tap.",
        "sampleTranslation": "关掉水龙头。"
      }
    ],
    "grammarNote": "动词短语对比：turn on / turn off; put on / take off。祈使句结构：动词原形开头。"
  },
  "31": {
    "id": 31,
    "unit": 2,
    "title": "Where's Sally?",
    "titleZh": "萨莉在哪里？",
    "topic": "Present Continuous (Singular)",
    "topicZh": "现在进行时单数行为",
    "grammar": "现在进行时 (be + doing) 正在发生的动作",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "JEAN",
        "text": "Where's Sally, Jack?",
        "translation": "杰克，萨莉在哪儿？",
        "avatar": "👧"
      },
      {
        "speaker": "JACK",
        "text": "She's in the garden, Jean.",
        "translation": "她在花园里，简。",
        "avatar": "👦"
      },
      {
        "speaker": "JEAN",
        "text": "What's she doing?",
        "translation": "她在干什么？",
        "avatar": "👧"
      },
      {
        "speaker": "JACK",
        "text": "She's sitting under the tree.",
        "translation": "她正在树底下坐着。",
        "avatar": "👦"
      },
      {
        "speaker": "JEAN",
        "text": "Is Tim in the garden, too?",
        "translation": "蒂姆也在花园里吗？",
        "avatar": "👧"
      },
      {
        "speaker": "JACK",
        "text": "Yes, he is. He's climbing the tree.",
        "translation": "是的，他也在。他正在爬树。",
        "avatar": "👦"
      },
      {
        "speaker": "JEAN",
        "text": "I beg your pardon? Who's climbing the tree?",
        "translation": "你说什么？谁在爬树？",
        "avatar": "👧"
      },
      {
        "speaker": "JACK",
        "text": "Tim is.",
        "translation": "蒂姆在爬树。",
        "avatar": "👦"
      },
      {
        "speaker": "JEAN",
        "text": "What about the dog?",
        "translation": "那只狗呢？",
        "avatar": "👧"
      },
      {
        "speaker": "JACK",
        "text": "The dog's in the garden, too. It's running across the grass. It's running after a cat.",
        "translation": "狗也在花园里。它正在草地上跑，正在追一只猫。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "Where's Sally, Jack? She's in the garden, Jean.",
        "zh": "杰克，萨莉在哪儿？她在花园里，简。"
      },
      {
        "en": "What's she doing? She's sitting under the tree.",
        "zh": "她在干什么？她正在树底下坐着。"
      },
      {
        "en": "Is Tim in the garden, too? Yes, he is. He's climbing the tree.",
        "zh": "蒂姆也在花园里吗？是的，他也在。他正在爬树。"
      },
      {
        "en": "I beg your pardon? Who's climbing the tree? Tim is.",
        "zh": "你说什么？谁在爬树？蒂姆在爬树。"
      },
      {
        "en": "What about the dog?",
        "zh": "那只狗呢？"
      },
      {
        "en": "The dog's in the garden, too. It's running across the grass. It's running after a cat.",
        "zh": "狗也在花园里。它正在草地上跑，正在追一只猫。"
      }
    ],
    "words": [
      {
        "word": "garden",
        "phonetic": "/ˈɡɑːdn/",
        "meaning": "n. 花园",
        "mcItem": "Rose Bush",
        "mcItemIcon": "🏡",
        "sampleSentence": "She is in the garden.",
        "sampleTranslation": "她在花园里。"
      },
      {
        "word": "under",
        "phonetic": "/ˈʌndə/",
        "meaning": "prep. 在……之下",
        "mcItem": "Oak Trapdoor",
        "mcItemIcon": "⬇️",
        "sampleSentence": "She is sitting under the tree.",
        "sampleTranslation": "她坐在树下。"
      },
      {
        "word": "tree",
        "phonetic": "/triː/",
        "meaning": "n. 树",
        "mcItem": "Oak Log",
        "mcItemIcon": "🌳",
        "sampleSentence": "The tree is tall.",
        "sampleTranslation": "这棵树很高。"
      },
      {
        "word": "climb",
        "phonetic": "/klaɪm/",
        "meaning": "v. 爬，攀登",
        "mcItem": "Ladder",
        "mcItemIcon": "🧗",
        "sampleSentence": "He is climbing the tree.",
        "sampleTranslation": "他正在爬树。"
      },
      {
        "word": "grass",
        "phonetic": "/ɡrɑːs/",
        "meaning": "n. 草，草地",
        "mcItem": "Grass Block",
        "mcItemIcon": "🌱",
        "sampleSentence": "It is running across the grass.",
        "sampleTranslation": "它正跑过草地。"
      }
    ],
    "grammarNote": "现在进行时：主语 + be (am/is/are) + 动词-ing。sitting (双写t加ing), running (双写n加ing), climbing。"
  },
  "32": {
    "id": 32,
    "unit": 2,
    "title": "What's he/she/it doing?",
    "titleZh": "他/她/它正在做什么？",
    "topic": "Present Continuous Actions",
    "topicZh": "现在进行时单数动作描述",
    "grammar": "现在进行时疑问句 What is he/she doing?",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What's he doing?",
        "translation": "他正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He's opening the window.",
        "translation": "他正在开窗户。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's she doing?",
        "translation": "她正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She's reading a book.",
        "translation": "她正在读书。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What's the cat doing?",
        "translation": "猫正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It's drinking milk.",
        "translation": "它正在喝牛奶。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He's opening the window.",
        "zh": "他正在打开窗户。"
      },
      {
        "en": "He's shutting the door.",
        "zh": "他正在关门。"
      },
      {
        "en": "He's putting on his coat.",
        "zh": "他正在穿上大衣。"
      },
      {
        "en": "He's taking off his shoes.",
        "zh": "他正在脱鞋。"
      },
      {
        "en": "He's turning on the light.",
        "zh": "他正在开灯。"
      },
      {
        "en": "He's turning off the tap.",
        "zh": "他正在关水龙头。"
      },
      {
        "en": "She's sweeping the floor.",
        "zh": "她正在扫地。"
      },
      {
        "en": "She's dusting the dressing table.",
        "zh": "她正在掸梳妆台上的灰尘。"
      },
      {
        "en": "She's emptying the cup.",
        "zh": "她正在倒空茶杯。"
      },
      {
        "en": "She's reading a magazine.",
        "zh": "她正在读杂志。"
      },
      {
        "en": "He's sharpening a pencil.",
        "zh": "他正在削铅笔。"
      },
      {
        "en": "It's drinking milk.",
        "zh": "它正在喝牛奶。"
      }
    ],
    "words": [
      {
        "word": "type",
        "phonetic": "/taɪp/",
        "meaning": "v. 打字",
        "mcItem": "Paper",
        "mcItemIcon": "⌨️",
        "sampleSentence": "She is typing a letter.",
        "sampleTranslation": "她正在打一封信。"
      },
      {
        "word": "letter",
        "phonetic": "/ˈletə/",
        "meaning": "n. 信",
        "mcItem": "Paper",
        "mcItemIcon": "✉️",
        "sampleSentence": "He is writing a letter.",
        "sampleTranslation": "他正在写一封信。"
      },
      {
        "word": "basket",
        "phonetic": "/ˈbɑːskɪt/",
        "meaning": "n. 篮子",
        "mcItem": "Chest",
        "mcItemIcon": "🧺",
        "sampleSentence": "The apples are in the basket.",
        "sampleTranslation": "苹果在篮子里。"
      },
      {
        "word": "tooth",
        "phonetic": "/tuːθ/",
        "meaning": "n. 牙齿 (pl. teeth)",
        "mcItem": "Quartz",
        "mcItemIcon": "🦷",
        "sampleSentence": "Brush your teeth.",
        "sampleTranslation": "刷牙。"
      },
      {
        "word": "meal",
        "phonetic": "/miːl/",
        "meaning": "n. 一顿饭",
        "mcItem": "Cooked Beef",
        "mcItemIcon": "🍲",
        "sampleSentence": "Enjoy your meal.",
        "sampleTranslation": "享受你的美餐。"
      }
    ],
    "grammarNote": "动词-ing变形规则：一般直接+ing；以不发音e结尾去e+ing (typing, closing)；重读闭音节双写尾字母+ing (putting, running, sitting)。"
  },
  "33": {
    "id": 33,
    "unit": 2,
    "title": "A fine day",
    "titleZh": "晴天",
    "topic": "Park & Family Outing",
    "topicZh": "公园散步与正在进行的动作",
    "grammar": "现在进行时复数形式 (We / They are doing)",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "MR. JONES",
        "text": "It is a fine day today.",
        "translation": "今天天气很好。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. JONES",
        "text": "There are some clouds in the sky, but the sun is shining.",
        "translation": "天空中有些白云，但阳光明媚。",
        "avatar": "👩"
      },
      {
        "speaker": "MR. JONES",
        "text": "Mr. Jones is with his family. They are walking over the bridge.",
        "translation": "琼斯先生和他的家人在一起。他们正在过桥。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. JONES",
        "text": "There are some boats on the river. Mr. Jones and his wife are looking at them.",
        "translation": "河上有些小船。琼斯先生和他的妻子正在看那些船。",
        "avatar": "👩"
      },
      {
        "speaker": "SALLY",
        "text": "Sally is looking at a big ship. The ship is going under the bridge.",
        "translation": "萨莉正在看一艘大船。这艘船正在从桥下驶过。",
        "avatar": "👧"
      },
      {
        "speaker": "TIM",
        "text": "Tim is looking at an aeroplane. The aeroplane is flying over the river.",
        "translation": "蒂姆正在看一架飞机。飞机正飞过河流上方。",
        "avatar": "👦"
      }
    ],
    "sentences": [
      {
        "en": "It is a fine day today.",
        "zh": "今天天气很好。"
      },
      {
        "en": "There are some clouds in the sky, but the sun is shining.",
        "zh": "天空中有些白云，但阳光明媚。"
      },
      {
        "en": "Mr. Jones is with his family. They are walking over the bridge.",
        "zh": "琼斯先生和他的家人在一起。他们正在过桥。"
      },
      {
        "en": "There are some boats on the river. Mr. Jones and his wife are looking at them.",
        "zh": "河上有些小船。琼斯先生和他的妻子正在看那些船。"
      },
      {
        "en": "Sally is looking at a big ship. The ship is going under the bridge.",
        "zh": "萨莉正在看一艘大船。这艘船正在从桥下驶过。"
      },
      {
        "en": "Tim is looking at an aeroplane. The aeroplane is flying over the river.",
        "zh": "蒂姆正在看一架飞机。飞机正飞过河流上方。"
      }
    ],
    "words": [
      {
        "word": "cloud",
        "phonetic": "/klaʊd/",
        "meaning": "n. 云",
        "mcItem": "White Wool",
        "mcItemIcon": "☁️",
        "sampleSentence": "There are clouds in the sky.",
        "sampleTranslation": "天上有云。"
      },
      {
        "word": "sky",
        "phonetic": "/skaɪ/",
        "meaning": "n. 天空",
        "mcItem": "Blue Wool",
        "mcItemIcon": "🌌",
        "sampleSentence": "The sky is blue.",
        "sampleTranslation": "天空是蓝色的。"
      },
      {
        "word": "shine",
        "phonetic": "/ʃaɪn/",
        "meaning": "v. 照耀",
        "mcItem": "Beacon",
        "mcItemIcon": "✨",
        "sampleSentence": "The sun shines brightly.",
        "sampleTranslation": "太阳明亮地照耀着。"
      },
      {
        "word": "bridge",
        "phonetic": "/brɪdʒ/",
        "meaning": "n. 桥",
        "mcItem": "Oak Planks",
        "mcItemIcon": "🌉",
        "sampleSentence": "The bridge is over the river.",
        "sampleTranslation": "桥在河上。"
      },
      {
        "word": "river",
        "phonetic": "/ˈrɪvə/",
        "meaning": "n. 河",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🌊",
        "sampleSentence": "The river is long.",
        "sampleTranslation": "这条河很长。"
      },
      {
        "word": "aeroplane",
        "phonetic": "/ˈeərəpleɪn/",
        "meaning": "n. 飞机",
        "mcItem": "Elytra",
        "mcItemIcon": "✈️",
        "sampleSentence": "The aeroplane is flying high.",
        "sampleTranslation": "飞机飞得很高。"
      }
    ],
    "grammarNote": "介词辨析：over (在……上方跨越/穿过), under (在……正下方), on (在……表面上)。"
  },
  "34": {
    "id": 34,
    "unit": 2,
    "title": "What are they doing?",
    "titleZh": "他们在做什么？",
    "topic": "Group Actions",
    "topicZh": "复数人物动作进行时",
    "grammar": "现在进行时复数疑问与陈述 What are they doing? They are...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What are they doing?",
        "translation": "他们正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're walking over the bridge.",
        "translation": "他们正在过桥。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What are the boys doing?",
        "translation": "男孩们正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're swimming in the river.",
        "translation": "他们正在河里游泳。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What are the girls doing?",
        "translation": "女孩们正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're sitting on the grass.",
        "translation": "她们正坐在草地上。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "They're walking over the bridge.",
        "zh": "他们正在过桥。"
      },
      {
        "en": "They're swimming in the river.",
        "zh": "他们正在河里游泳。"
      },
      {
        "en": "They're sitting on the grass.",
        "zh": "她们正坐在草地上。"
      },
      {
        "en": "They're running between the trees.",
        "zh": "他们正在树林间奔跑。"
      },
      {
        "en": "They're flying over the houses.",
        "zh": "它们正飞过房屋上方。"
      },
      {
        "en": "They're jumping over the wall.",
        "zh": "他们正跳过墙头。"
      }
    ],
    "words": [
      {
        "word": "sleep",
        "phonetic": "/sliːp/",
        "meaning": "v. 睡觉",
        "mcItem": "Bed",
        "mcItemIcon": "😴",
        "sampleSentence": "The baby is sleeping.",
        "sampleTranslation": "宝宝正在睡觉。"
      },
      {
        "word": "shave",
        "phonetic": "/ʃeɪv/",
        "meaning": "v. 刮脸",
        "mcItem": "Shears",
        "mcItemIcon": "🪒",
        "sampleSentence": "He is shaving in the bathroom.",
        "sampleTranslation": "他正在浴室刮胡子。"
      },
      {
        "word": "cry",
        "phonetic": "/kraɪ/",
        "meaning": "v. 哭",
        "mcItem": "Tear",
        "mcItemIcon": "😢",
        "sampleSentence": "Why are you crying?",
        "sampleTranslation": "你为什么哭？"
      },
      {
        "word": "wash",
        "phonetic": "/wɒʃ/",
        "meaning": "v. 洗",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🧼",
        "sampleSentence": "She is washing her hands.",
        "sampleTranslation": "她正在洗手。"
      },
      {
        "word": "wait",
        "phonetic": "/weɪt/",
        "meaning": "v. 等",
        "mcItem": "Clock",
        "mcItemIcon": "⏳",
        "sampleSentence": "They are waiting for the bus.",
        "sampleTranslation": "他们正在等公共汽车。"
      },
      {
        "word": "jump",
        "phonetic": "/dʒʌmp/",
        "meaning": "v. 跳",
        "mcItem": "Slime Block",
        "mcItemIcon": "🦘",
        "sampleSentence": "He is jumping over the wall.",
        "sampleTranslation": "他正在跳过矮墙。"
      }
    ],
    "grammarNote": "复数动作描述：They are + doing... / What are they doing?"
  },
  "35": {
    "id": 35,
    "unit": 2,
    "title": "Our village",
    "titleZh": "我们的村庄",
    "topic": "Village Life & Scenery",
    "topicZh": "乡村风光与地理位置",
    "grammar": "介词短语 (between, beside, into, out of, along) 与方位描述",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "TOM",
        "text": "This is a photograph of our village.",
        "translation": "这是我们村庄的一张照片。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "Our village is in a valley. It is between two hills.",
        "translation": "我们的村庄坐落在一个山谷中。它在两座山丘之间。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "The village is on a river.",
        "translation": "村庄位于一条小河边。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "Here is another photograph of the village.",
        "translation": "这是我们村庄的另一张照片。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "My wife and I are walking along the banks of the river. We are on the left.",
        "translation": "我和我的妻子正沿着河岸散步。我们在左边。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "There is a boy in the water. He is swimming across the river.",
        "translation": "水里有个男孩。他正游过小河。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "Here is another photograph. This is the school building.",
        "translation": "这是另一张照片。这是学校的教学楼。",
        "avatar": "👨"
      },
      {
        "speaker": "MARY",
        "text": "It is beside a park. The park is on the right.",
        "translation": "它在一个公园旁边。公园在右边。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "Some children are coming out of the building. Some of them are going into the park.",
        "translation": "一些孩子正从大楼里出来。他们中的一些正走进公园。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "This is a photograph of our village.",
        "zh": "这是我们村庄的一张照片。"
      },
      {
        "en": "Our village is in a valley. It is between two hills.",
        "zh": "我们的村庄坐落在一个山谷中。它在两座山丘之间。"
      },
      {
        "en": "The village is on a river.",
        "zh": "村庄位于一条小河边。"
      },
      {
        "en": "My wife and I are walking along the banks of the river.",
        "zh": "我和我的妻子正沿着河岸散步。"
      },
      {
        "en": "There is a boy in the water. He is swimming across the river.",
        "zh": "水里有个男孩。他正游过小河。"
      },
      {
        "en": "This is the school building. It is beside a park.",
        "zh": "这是学校的教学楼。它在一个公园旁边。"
      },
      {
        "en": "Some children are coming out of the building. Some of them are going into the park.",
        "zh": "一些孩子正从大楼里出来。他们中的一些正走进公园。"
      }
    ],
    "words": [
      {
        "word": "village",
        "phonetic": "/ˈvɪlɪdʒ/",
        "meaning": "n. 村庄",
        "mcItem": "Oak Door",
        "mcItemIcon": "🏘️",
        "sampleSentence": "Our village is beautiful.",
        "sampleTranslation": "我们的村庄很美。"
      },
      {
        "word": "valley",
        "phonetic": "/ˈvæli/",
        "meaning": "n. 山谷",
        "mcItem": "Grass Block",
        "mcItemIcon": "🏞️",
        "sampleSentence": "The village is in a valley.",
        "sampleTranslation": "村庄位于山谷中。"
      },
      {
        "word": "hill",
        "phonetic": "/hɪl/",
        "meaning": "n. 小山",
        "mcItem": "Stone",
        "mcItemIcon": "⛰️",
        "sampleSentence": "The hill is green.",
        "sampleTranslation": "小山很绿。"
      },
      {
        "word": "bank",
        "phonetic": "/bæŋk/",
        "meaning": "n. 河岸",
        "mcItem": "Sand",
        "mcItemIcon": "🏖️",
        "sampleSentence": "We walk on the river bank.",
        "sampleTranslation": "我们走在河岸上。"
      },
      {
        "word": "building",
        "phonetic": "/ˈbɪldɪŋ/",
        "meaning": "n. 大楼，建筑物",
        "mcItem": "Bricks",
        "mcItemIcon": "🏫",
        "sampleSentence": "This is the school building.",
        "sampleTranslation": "这是学校大楼。"
      }
    ],
    "grammarNote": "动态介词短语：into (进入), out of (出来), across (穿过表面), along (沿着)。"
  },
  "36": {
    "id": 36,
    "unit": 2,
    "title": "Where ...?",
    "titleZh": "……在哪里？",
    "topic": "Prepositional Motion",
    "topicZh": "空间动态介词训练",
    "grammar": "Where are they going/coming? 与 动态介词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Where are the children going?",
        "translation": "孩子们去哪里？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're going into the school.",
        "translation": "他们正走进学校。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Where are they coming from?",
        "translation": "他们从哪里来？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They're coming out of the school.",
        "translation": "他们正从学校走出来。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "They're going into the shop.",
        "zh": "他们正走进商店。"
      },
      {
        "en": "They're coming out of the shop.",
        "zh": "他们正走出商店。"
      },
      {
        "en": "They're walking along the street.",
        "zh": "他们正沿着街道散步。"
      },
      {
        "en": "They're walking across the square.",
        "zh": "他们正穿过广场。"
      },
      {
        "en": "He's swimming across the river.",
        "zh": "他正游过小河。"
      },
      {
        "en": "The plane is flying over the mountains.",
        "zh": "飞机正飞过群山。"
      }
    ],
    "words": [
      {
        "word": "into",
        "phonetic": "/ˈɪn.tuː/",
        "meaning": "prep. 进入...里面",
        "mcItem": "Hopper",
        "mcItemIcon": "📥",
        "sampleSentence": "Walk into the cozy house.",
        "sampleTranslation": "走进温馨的房屋。"
      },
      {
        "word": "out of",
        "phonetic": "/aʊt əv/",
        "meaning": "prep. 从...出来",
        "mcItem": "Dispenser",
        "mcItemIcon": "📤",
        "sampleSentence": "Come out of the deep mine.",
        "sampleTranslation": "从深矿井里走出来。"
      },
      {
        "word": "over",
        "phonetic": "/ˈəʊ.vər/",
        "meaning": "prep. 越过，在...上方",
        "mcItem": "Oak Fence",
        "mcItemIcon": "🪜",
        "sampleSentence": "Walk over the stone bridge.",
        "sampleTranslation": "走过石桥。"
      },
      {
        "word": "between",
        "phonetic": "/bɪˈtwiːn/",
        "meaning": "prep. 在...之间",
        "mcItem": "Two Chests",
        "mcItemIcon": "↔️",
        "sampleSentence": "Stand between the two pillars.",
        "sampleTranslation": "站在两根柱子之间。"
      },
      {
        "word": "across",
        "phonetic": "/əˈkrɒs/",
        "meaning": "prep. 横过，穿过",
        "mcItem": "Bridge",
        "mcItemIcon": "🌉",
        "sampleSentence": "Swim across the calm river.",
        "sampleTranslation": "游过平静的小河。"
      },
      {
        "word": "along",
        "phonetic": "/əˈlɒŋ/",
        "meaning": "prep. 沿着",
        "mcItem": "Powered Rail",
        "mcItemIcon": "🛤️",
        "sampleSentence": "Ride along the railway line.",
        "sampleTranslation": "沿着铁路线骑行。"
      }
    ],
    "grammarNote": "动态介词：into / out of, across / along, over / under。"
  },
  "37": {
    "id": 37,
    "unit": 2,
    "title": "Making a bookcase",
    "titleZh": "做书架",
    "topic": "Carpentry & Future Intention",
    "topicZh": "木工与将来打算 (be going to)",
    "grammar": "be going to + 动词原形 表示将要发生或打算",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "SUSAN",
        "text": "You're working hard, George. What are you doing?",
        "translation": "你干得真辛苦，乔治。你在干什么呢？",
        "avatar": "👩"
      },
      {
        "speaker": "GEORGE",
        "text": "I'm making a bookcase.",
        "translation": "我正在做书架。",
        "avatar": "👨"
      },
      {
        "speaker": "SUSAN",
        "text": "Give me that hammer please, George.",
        "translation": "请把那把锤子给我，乔治。",
        "avatar": "👩"
      },
      {
        "speaker": "GEORGE",
        "text": "Which hammer? This one?",
        "translation": "哪一把？这把吗？",
        "avatar": "👨"
      },
      {
        "speaker": "SUSAN",
        "text": "No, not that one. The big one.",
        "translation": "不，不是那把。是那把大的。",
        "avatar": "👩"
      },
      {
        "speaker": "GEORGE",
        "text": "Here you are.",
        "translation": "给你。",
        "avatar": "👨"
      },
      {
        "speaker": "SUSAN",
        "text": "Thanks, George. What are you going to do now?",
        "translation": "谢谢，乔治。你现在打算做什么？",
        "avatar": "👩"
      },
      {
        "speaker": "GEORGE",
        "text": "I'm going to paint it.",
        "translation": "我打算给它刷漆。",
        "avatar": "👨"
      },
      {
        "speaker": "SUSAN",
        "text": "What colour are you going to paint it?",
        "translation": "你打算给它刷什么颜色？",
        "avatar": "👩"
      },
      {
        "speaker": "GEORGE",
        "text": "I'm going to paint it pink.",
        "translation": "我打算刷成粉红色。",
        "avatar": "👨"
      },
      {
        "speaker": "SUSAN",
        "text": "Pink! This bookcase isn't for me. It's for my daughter, Susan.",
        "translation": "粉红色！这个书架不是给我的，是给我女儿苏珊的。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "You're working hard, George. What are you doing? I'm making a bookcase.",
        "zh": "你干得真辛苦，乔治。你在干什么呢？我正在做书架。"
      },
      {
        "en": "Give me that hammer please, George. Which hammer? This one? No, not that one. The big one.",
        "zh": "请把那把锤子给我，乔治。哪一把？这把吗？不，不是那把。是那把大的。"
      },
      {
        "en": "What are you going to do now? I'm going to paint it.",
        "zh": "你现在打算做什么？我打算给它刷漆。"
      },
      {
        "en": "What colour are you going to paint it? I'm going to paint it pink.",
        "zh": "你打算给它刷什么颜色？我打算刷成粉红色。"
      },
      {
        "en": "This bookcase isn't for me. It's for my daughter, Susan.",
        "zh": "这个书架不是给我的，是给我女儿苏珊的。"
      }
    ],
    "words": [
      {
        "word": "bookcase",
        "phonetic": "/ˈbʊkkeɪs/",
        "meaning": "n. 书架，书柜",
        "mcItem": "Bookshelf",
        "mcItemIcon": "📚",
        "sampleSentence": "The bookcase is new.",
        "sampleTranslation": "这个书架是新的。"
      },
      {
        "word": "hammer",
        "phonetic": "/ˈhæmə/",
        "meaning": "n. 锤子",
        "mcItem": "Mace",
        "mcItemIcon": "🔨",
        "sampleSentence": "Give me the hammer.",
        "sampleTranslation": "把锤子给我。"
      },
      {
        "word": "paint",
        "phonetic": "/peɪnt/",
        "meaning": "v. 刷漆，画",
        "mcItem": "Brush",
        "mcItemIcon": "🖌️",
        "sampleSentence": "I am going to paint the door.",
        "sampleTranslation": "我打算粉刷门。"
      },
      {
        "word": "pink",
        "phonetic": "/pɪŋk/",
        "meaning": "adj. & n. 粉红色",
        "mcItem": "Pink Dye",
        "mcItemIcon": "🌸",
        "sampleSentence": "She likes pink dresses.",
        "sampleTranslation": "她喜欢粉红色的连衣裙。"
      },
      {
        "word": "hard",
        "phonetic": "/hɑːd/",
        "meaning": "adv. 努力地",
        "mcItem": "Iron Pickaxe",
        "mcItemIcon": "💪",
        "sampleSentence": "He works hard every day.",
        "sampleTranslation": "他每天都很努力工作。"
      }
    ],
    "grammarNote": "be going to + 动词原形：打算做某事。What are you going to do? I am going to paint it."
  },
  "38": {
    "id": 38,
    "unit": 2,
    "title": "What are you going to do?",
    "titleZh": "你准备做什么？",
    "topic": "Future Plans & Daily Tasks",
    "topicZh": "将来打算与即时行动对比",
    "grammar": "be going to (将来打算) vs. 现在进行时 (正在做)",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What are you going to do?",
        "translation": "你准备做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm going to shave.",
        "translation": "我准备刮胡子。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What are you doing now?",
        "translation": "你现在正在做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm shaving.",
        "translation": "我正在刮胡子。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I'm going to shave. I'm shaving.",
        "zh": "我准备刮胡子。我正在刮胡子。"
      },
      {
        "en": "I'm going to wash the dishes. I'm washing the dishes.",
        "zh": "我准备洗盘子。我正在洗盘子。"
      },
      {
        "en": "I'm going to cook a meal. I'm cooking a meal.",
        "zh": "我准备做饭。我正在做饭。"
      },
      {
        "en": "I'm going to listen to the radio. I'm listening to the radio.",
        "zh": "我准备听收音机。我正在听收音机。"
      },
      {
        "en": "I'm going to read this book. I'm reading this book.",
        "zh": "我准备读这本书。我正在读这本书。"
      }
    ],
    "words": [
      {
        "word": "do",
        "phonetic": "/duː/",
        "meaning": "动词：做；干",
        "mcItem": "Crafting Table",
        "mcItemIcon": "🔨",
        "sampleSentence": "What are you going to do this afternoon?",
        "sampleTranslation": "今天下午你打算做什么？"
      },
      {
        "word": "homework",
        "phonetic": "/ˈhəʊm.wɜːk/",
        "meaning": "名词：家庭作业",
        "mcItem": "Writable Book",
        "mcItemIcon": "📝",
        "sampleSentence": "Finish your English homework before playing Minecraft.",
        "sampleTranslation": "玩我的世界之前先完成你的英语作业。"
      },
      {
        "word": "shave",
        "phonetic": "/ʃeɪv/",
        "meaning": "动词：刮脸；刮胡子",
        "mcItem": "Shears",
        "mcItemIcon": "🪒",
        "sampleSentence": "My father is going to shave this morning.",
        "sampleTranslation": "我父亲今天早晨打算刮胡子。"
      },
      {
        "word": "wash",
        "phonetic": "/wɒʃ/",
        "meaning": "动词：洗；洗涤",
        "mcItem": "Water Bucket",
        "mcItemIcon": "🧼",
        "sampleSentence": "Wash your hands before eating dinner.",
        "sampleTranslation": "吃晚饭前洗洗手。"
      },
      {
        "word": "listen",
        "phonetic": "/ˈlɪs.ən/",
        "meaning": "动词：听",
        "mcItem": "Jukebox",
        "mcItemIcon": "🎧",
        "sampleSentence": "Listen to the music disc on the jukebox.",
        "sampleTranslation": "在唱片机上听音乐唱片。"
      }
    ],
    "grammarNote": "对比时态：I'm going to do... (打算做) 与 I'm doing... (正在做)。"
  },
  "39": {
    "id": 39,
    "unit": 2,
    "title": "Don't drop it!",
    "titleZh": "别摔了！",
    "topic": "Household Tasks & Warnings",
    "topicZh": "搬运物品与警告提醒",
    "grammar": "否定祈使句 (Don't + 动词原形) 与 宾格代词",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "SAM",
        "text": "What are you going to do with that vase, Penny?",
        "translation": "彭妮，你打算拿那个花瓶做什么？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "I'm going to put it on this table, Sam.",
        "translation": "我打算把它放在这张桌子上，萨姆。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Don't do that. Give it to me.",
        "translation": "别放在那儿。把它给我吧。",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "What are you going to do with it?",
        "translation": "你打算拿它做什么？",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "I'm going to put it here, in front of the window.",
        "translation": "我打算把它放在这儿，窗户前面。",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Be careful! Don't drop it!",
        "translation": "当心！别摔了！",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Don't worry. There ...! It's a lovely vase, isn't it?",
        "translation": "别担心。放好了……！这是个好看的花瓶，是不是？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Those flowers are lovely, too.",
        "translation": "那些花也很漂亮。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "What are you going to do with that vase, Penny?",
        "zh": "彭妮，你打算拿那个花瓶做什么？"
      },
      {
        "en": "I'm going to put it on this table, Sam.",
        "zh": "我打算把它放在这张桌子上，萨姆。"
      },
      {
        "en": "Don't do that. Give it to me.",
        "zh": "别放在那儿。把它给我吧。"
      },
      {
        "en": "What are you going to do with it?",
        "zh": "你打算拿它做什么？"
      },
      {
        "en": "I'm going to put it here, in front of the window.",
        "zh": "我打算把它放在这儿，窗户前面。"
      },
      {
        "en": "Be careful! Don't drop it!",
        "zh": "当心！别摔了！"
      },
      {
        "en": "Don't worry. There ...! It's a lovely vase, isn't it?",
        "zh": "别担心。放好了……！这是个好看的花瓶，是不是？"
      },
      {
        "en": "Those flowers are lovely, too.",
        "zh": "那些花也很漂亮。"
      }
    ],
    "words": [
      {
        "word": "vase",
        "phonetic": "/vɑːz/",
        "meaning": "n. 花瓶",
        "mcItem": "Decorated Pot",
        "mcItemIcon": "🏺",
        "sampleSentence": "The vase is on the table.",
        "sampleTranslation": "花瓶在桌上。"
      },
      {
        "word": "front",
        "phonetic": "/frʌnt/",
        "meaning": "n. 前面",
        "mcItem": "Compass",
        "mcItemIcon": "⬆️",
        "sampleSentence": "In front of the window.",
        "sampleTranslation": "在窗户前面。"
      },
      {
        "word": "careful",
        "phonetic": "/ˈkeəfl/",
        "meaning": "adj. 小心的",
        "mcItem": "Shield",
        "mcItemIcon": "⚠️",
        "sampleSentence": "Be careful!",
        "sampleTranslation": "小心！"
      },
      {
        "word": "drop",
        "phonetic": "/drɒp/",
        "meaning": "v. 掉下，落下",
        "mcItem": "Anvil",
        "mcItemIcon": "⬇️",
        "sampleSentence": "Don't drop it!",
        "sampleTranslation": "别摔了！"
      },
      {
        "word": "flower",
        "phonetic": "/ˈflaʊə/",
        "meaning": "n. 花",
        "mcItem": "Poppy",
        "mcItemIcon": "🌸",
        "sampleSentence": "Those flowers are lovely.",
        "sampleTranslation": "那些花很可爱。"
      }
    ],
    "grammarNote": "否定祈使句：Don't + 动词原形。Don't drop it! / Don't worry! in front of 表示“在……前面”。"
  },
  "40": {
    "id": 40,
    "unit": 2,
    "title": "What are you going to do?",
    "titleZh": "你准备做什么？",
    "topic": "Future Activities",
    "topicZh": "各种准备进行的活动",
    "grammar": "be going to + 祈使否定提示",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What are you going to do with that vase?",
        "translation": "你准备拿那个花瓶做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'm going to put it on the table.",
        "translation": "我准备把它放在桌子上。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Be careful! Don't drop it!",
        "translation": "小心！别摔了！",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Don't worry. I'm being careful.",
        "translation": "别担心。我很小心。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I'm going to put it on the table.",
        "zh": "我准备把它放在桌上。"
      },
      {
        "en": "I'm going to take it off the table.",
        "zh": "我准备把它从桌上拿下来。"
      },
      {
        "en": "I'm going to put them on the shelf.",
        "zh": "我准备把它们放在架子上。"
      },
      {
        "en": "I'm going to take them off the shelf.",
        "zh": "我准备把它们从架子上拿下来。"
      }
    ],
    "words": [
      {
        "word": "show",
        "phonetic": "/ʃəʊ/",
        "meaning": "v. 展示，给...看",
        "mcItem": "Painting",
        "mcItemIcon": "🖼️",
        "sampleSentence": "Show me your diamond sword.",
        "sampleTranslation": "给我看你的钻石剑。"
      },
      {
        "word": "send",
        "phonetic": "/send/",
        "meaning": "v. 寄出，派遣",
        "mcItem": "Minecart with Chest",
        "mcItemIcon": "📦",
        "sampleSentence": "Send a parcel to your friend.",
        "sampleTranslation": "给你的朋友寄一个包裹。"
      },
      {
        "word": "take off",
        "phonetic": "/teɪk ɒf/",
        "meaning": "phr. 脱下，拿走",
        "mcItem": "Armor Stand",
        "mcItemIcon": "🧥",
        "sampleSentence": "Take off your muddy boots.",
        "sampleTranslation": "脱下你满是泥巴的靴子。"
      },
      {
        "word": "put on",
        "phonetic": "/pʊt ɒn/",
        "meaning": "phr. 穿上，戴上",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "🪖",
        "sampleSentence": "Put on your warm coat.",
        "sampleTranslation": "穿上你保暖的外套。"
      },
      {
        "word": "turn on",
        "phonetic": "/tɜːn ɒn/",
        "meaning": "phr. 打开(电灯、水龙头等)",
        "mcItem": "Redstone Lamp",
        "mcItemIcon": "💡",
        "sampleSentence": "Turn on the redstone light.",
        "sampleTranslation": "打开红石灯。"
      },
      {
        "word": "turn off",
        "phonetic": "/tɜːn ɒf/",
        "meaning": "phr. 关掉(电灯、水龙头等)",
        "mcItem": "Lever",
        "mcItemIcon": "🔌",
        "sampleSentence": "Turn off the tap carefully.",
        "sampleTranslation": "小心关上水龙头。"
      }
    ],
    "grammarNote": "put on (放置在……上) / take off (从……拿下来)。"
  },
  "41": {
    "id": 41,
    "unit": 2,
    "title": "Penny's bag",
    "titleZh": "彭妮的提包",
    "topic": "Bag Contents & There is/are",
    "topicZh": "包中物品与数量提问",
    "grammar": "Is there any...? / There is some/no...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "SAM",
        "text": "Is that you, Penny?",
        "translation": "是你吗，彭妮？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, Sam.",
        "translation": "是我，萨姆。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "What are you doing?",
        "translation": "你在干什么呢？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "I'm looking for my pen.",
        "translation": "我正在找我的钢笔。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Where is it?",
        "translation": "在哪儿呢？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "I don't know. It isn't in my bag.",
        "translation": "我不知道。它不在我的包里。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Is there any cheese in your bag?",
        "translation": "你包里有奶酪吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, there is. There's a piece of cheese in my bag.",
        "translation": "是的，有。我包里有一块奶酪。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Is there any bread in your bag?",
        "translation": "你包里有面包吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, there is. There's a loaf of bread in my bag.",
        "translation": "是的，有。我包里有一条面包。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Is there any soap in your bag?",
        "translation": "你包里有肥皂吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "No, there isn't. There's a bar of chocolate in my bag.",
        "translation": "不，没有。我包里有一块巧克力。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Is there any tea in your bag?",
        "translation": "你包里有茶吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, there is. There's a pound of tea in my bag.",
        "translation": "是的，有。我包里有一磅茶叶。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Look, Penny! There's your pen, in your pocket!",
        "translation": "瞧，彭妮！你的笔在你的口袋里呢！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Is that you, Penny? Yes, Sam.",
        "zh": "是你吗，彭妮？是我，萨姆。"
      },
      {
        "en": "What are you doing? I'm looking for my pen.",
        "zh": "你在干什么呢？我正在找我的钢笔。"
      },
      {
        "en": "Is there any cheese in your bag? There's a piece of cheese in my bag.",
        "zh": "你包里有奶酪吗？我包里有一块奶酪。"
      },
      {
        "en": "Is there any bread in your bag? There's a loaf of bread in my bag.",
        "zh": "你包里有面包吗？我包里有一条面包。"
      },
      {
        "en": "Is there any chocolate in your bag? There's a bar of chocolate in my bag.",
        "zh": "你包里有巧克力吗？我包里有一块巧克力。"
      },
      {
        "en": "Is there any tea in your bag? There's a pound of tea in my bag.",
        "zh": "你包里有茶吗？我包里有一磅茶叶。"
      },
      {
        "en": "Look, Penny! There's your pen, in your pocket!",
        "zh": "瞧，彭妮！你的笔在你的口袋里呢！"
      }
    ],
    "words": [
      {
        "word": "cheese",
        "phonetic": "/tʃiːz/",
        "meaning": "n. 乳酪，干酪",
        "mcItem": "Cake",
        "mcItemIcon": "🧀",
        "sampleSentence": "A piece of cheese.",
        "sampleTranslation": "一块奶酪。"
      },
      {
        "word": "soap",
        "phonetic": "/səʊp/",
        "meaning": "n. 肥皂",
        "mcItem": "Slimeball",
        "mcItemIcon": "🧼",
        "sampleSentence": "A bar of soap.",
        "sampleTranslation": "一块肥皂。"
      },
      {
        "word": "chocolate",
        "phonetic": "/ˈtʃɒklət/",
        "meaning": "n. 巧克力",
        "mcItem": "Cocoa Beans",
        "mcItemIcon": "🍫",
        "sampleSentence": "A bar of chocolate.",
        "sampleTranslation": "一块巧克力。"
      },
      {
        "word": "loaf",
        "phonetic": "/ləʊf/",
        "meaning": "n. (面包的)条，个",
        "mcItem": "Bread",
        "mcItemIcon": "🥖",
        "sampleSentence": "Two loaves of bread.",
        "sampleTranslation": "两条面包。"
      },
      {
        "word": "bar",
        "phonetic": "/bɑː/",
        "meaning": "n. 块，条",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "🍫",
        "sampleSentence": "A bar of soap.",
        "sampleTranslation": "一块肥皂。"
      },
      {
        "word": "pound",
        "phonetic": "/paʊnd/",
        "meaning": "n. 磅",
        "mcItem": "Weight",
        "mcItemIcon": "⚖️",
        "sampleSentence": "A pound of tea.",
        "sampleTranslation": "一磅茶叶。"
      }
    ],
    "grammarNote": "不可数名词量词搭配：a piece of (cheese), a loaf of (bread), a bar of (soap/chocolate), a pound of (tea)。"
  },
  "42": {
    "id": 42,
    "unit": 2,
    "title": "Is there a ... in/on that ...?",
    "titleZh": "在那个……中/上有一个……吗？",
    "topic": "Uncountable & Countable Inquiries",
    "topicZh": "可数与不可数存在性提问",
    "grammar": "Is there a... / Is there any... 疑问句",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Is there any milk in that bottle?",
        "translation": "那个瓶子里有牛奶吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, there is some milk in it.",
        "translation": "是的，里面有些牛奶。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is there any butter in that dish?",
        "translation": "那个盘子里有黄油吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, there isn't any butter in it.",
        "translation": "不，里面没有黄油。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Is there any milk in that bottle?",
        "zh": "那个瓶子里有牛奶吗？"
      },
      {
        "en": "Is there any butter on that plate?",
        "zh": "那个盘子里有黄油吗？"
      },
      {
        "en": "Is there any sugar in that bowl?",
        "zh": "那个碗里有糖吗？"
      },
      {
        "en": "Is there any coffee in that cup?",
        "zh": "那个杯子里有咖啡吗？"
      }
    ],
    "words": [
      {
        "word": "milk",
        "phonetic": "/mɪlk/",
        "meaning": "n. 牛奶",
        "mcItem": "Milk Bucket",
        "mcItemIcon": "🥛",
        "sampleSentence": "Drink some milk.",
        "sampleTranslation": "喝点牛奶。"
      },
      {
        "word": "butter",
        "phonetic": "/ˈbʌtə/",
        "meaning": "n. 黄油",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "🧈",
        "sampleSentence": "Butter on bread.",
        "sampleTranslation": "面包上的黄油。"
      },
      {
        "word": "sugar",
        "phonetic": "/ˈʃʊɡə/",
        "meaning": "n. 糖",
        "mcItem": "Sugar",
        "mcItemIcon": "🍬",
        "sampleSentence": "Sugar in the tea.",
        "sampleTranslation": "茶里的糖。"
      },
      {
        "word": "coffee",
        "phonetic": "/ˈkɒfi/",
        "meaning": "n. 咖啡",
        "mcItem": "Cocoa Beans",
        "mcItemIcon": "☕",
        "sampleSentence": "A cup of coffee.",
        "sampleTranslation": "一杯咖啡。"
      }
    ],
    "grammarNote": "some 用于肯定句，any 用于疑问句和否定句：Is there any...? / There isn't any..."
  },
  "43": {
    "id": 43,
    "unit": 2,
    "title": "Hurry up!",
    "titleZh": "快点！",
    "topic": "Kitchen Supplies & Hurry",
    "topicZh": "找东西与催促",
    "grammar": "Can you see any...? / There is none / There are some",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "PENNY",
        "text": "Can you make the tea, Sam?",
        "translation": "萨姆，你会沏茶吗？",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Yes, of course I can, Penny.",
        "translation": "是的，我当然会，彭妮。",
        "avatar": "👨"
      },
      {
        "speaker": "SAM",
        "text": "Is there any water in this kettle?",
        "translation": "这水壶里有水吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, there is.",
        "translation": "有水。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Where's the tea, Penny?",
        "translation": "彭妮，茶在哪儿？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "It's over there, behind the teapot.",
        "translation": "在那边，茶壶后面。",
        "avatar": "👩"
      },
      {
        "speaker": "PENNY",
        "text": "Can you see it?",
        "translation": "你看见了吗？",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "I can see the teapot, but I can't see the tea.",
        "translation": "我看见茶壶了，但我看不见茶叶。",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "There it is! It's in front of you!",
        "translation": "在那儿呢！就在你眼前！",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Ah, yes, now I can see it.",
        "translation": "啊，是的，现在我看见了。",
        "avatar": "👨"
      },
      {
        "speaker": "SAM",
        "text": "Where are the cups, Penny?",
        "translation": "彭妮，茶杯在哪儿？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "There are some in the cupboard. Can you find them?",
        "translation": "食橱里有一些。你能找到吗？",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Yes, here they are.",
        "translation": "能，在这儿呢。",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Hurry up, Sam! The water's boiling!",
        "translation": "快点，萨姆！水开了！",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Can you make the tea, Sam? Yes, of course I can, Penny.",
        "zh": "萨姆，你会沏茶吗？是的，我当然会，彭妮。"
      },
      {
        "en": "Is there any water in this kettle? Yes, there is.",
        "zh": "这水壶里有水吗？有水。"
      },
      {
        "en": "Where's the tea, Penny? It's over there, behind the teapot.",
        "zh": "彭妮，茶在哪儿？在那边，茶壶后面。"
      },
      {
        "en": "I can see the teapot, but I can't see the tea.",
        "zh": "我看见茶壶了，但我看不见茶叶。"
      },
      {
        "en": "Where are the cups, Penny? There are some in the cupboard.",
        "zh": "彭妮，茶杯在哪儿？食橱里有一些。"
      },
      {
        "en": "Hurry up, Sam! The water's boiling!",
        "zh": "快点，萨姆！水开了！"
      }
    ],
    "words": [
      {
        "word": "kettle",
        "phonetic": "/ˈketl/",
        "meaning": "n. 水壶",
        "mcItem": "Cauldron",
        "mcItemIcon": "🫖",
        "sampleSentence": "Water is in the kettle.",
        "sampleTranslation": "水在壶里。"
      },
      {
        "word": "behind",
        "phonetic": "/bɪˈhaɪnd/",
        "meaning": "prep. 在……后面",
        "mcItem": "Oak Trapdoor",
        "mcItemIcon": "🔙",
        "sampleSentence": "It is behind the teapot.",
        "sampleTranslation": "它在茶壶后面。"
      },
      {
        "word": "teapot",
        "phonetic": "/ˈtiːpɒt/",
        "meaning": "n. 茶壶",
        "mcItem": "Flower Pot",
        "mcItemIcon": "🫖",
        "sampleSentence": "The teapot is on the table.",
        "sampleTranslation": "茶壶在桌上。"
      },
      {
        "word": "boil",
        "phonetic": "/bɔɪl/",
        "meaning": "v. 沸腾，开",
        "mcItem": "Campfire",
        "mcItemIcon": "♨️",
        "sampleSentence": "The water is boiling.",
        "sampleTranslation": "水开了。"
      },
      {
        "word": "hurry up",
        "phonetic": "/ˌhʌri ˈʌp/",
        "meaning": "赶快，快点",
        "mcItem": "Clock",
        "mcItemIcon": "⚡",
        "sampleSentence": "Hurry up, we are late!",
        "sampleTranslation": "快点，我们迟到了！"
      }
    ],
    "grammarNote": "情态动词 can 表能力：Can you make the tea? Yes, I can. / I can't see the tea."
  },
  "44": {
    "id": 44,
    "unit": 2,
    "title": "Are there any ...?",
    "titleZh": "有些……吗？",
    "topic": "Countable/Uncountable Inquiry",
    "topicZh": "复数与不可数实物问答",
    "grammar": "Are there any...? / Is there any...? 与 回答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Are there any spoons on the table?",
        "translation": "桌上有勺子吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, there are some.",
        "translation": "是的，有一些。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Is there any tea in the teapot?",
        "translation": "茶壶里有茶吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, there isn't any.",
        "translation": "不，一点也没有。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Are there any spoons on the table? Yes, there are some.",
        "zh": "桌上有勺子吗？是的，有一些。"
      },
      {
        "en": "Are there any plates in the cupboard? No, there aren't any.",
        "zh": "食橱里有盘子吗？不，没有。"
      },
      {
        "en": "Is there any water in the kettle? Yes, there is some.",
        "zh": "壶里有水吗？是的，有一些。"
      },
      {
        "en": "Is there any milk in the bottle? No, there isn't any.",
        "zh": "瓶里有牛奶吗？不，没有。"
      }
    ],
    "words": [
      {
        "word": "any",
        "phonetic": "/ˈen.i/",
        "meaning": "det. 任何，一些(否定/疑问)",
        "mcItem": "Emerald",
        "mcItemIcon": "❓",
        "sampleSentence": "Are there any spoons on the table?",
        "sampleTranslation": "桌子上有勺子吗？"
      },
      {
        "word": "some",
        "phonetic": "/sʌm/",
        "meaning": "det. 一些，若干(肯定句)",
        "mcItem": "Bundle",
        "mcItemIcon": "📦",
        "sampleSentence": "There are some apples in the basket.",
        "sampleTranslation": "篮子里有一些苹果。"
      },
      {
        "word": "spoon",
        "phonetic": "/spuːn/",
        "meaning": "n. 勺子，调羹",
        "mcItem": "Iron Shovel",
        "mcItemIcon": "🥄",
        "sampleSentence": "A clean silver spoon.",
        "sampleTranslation": "一把干净的银勺。"
      },
      {
        "word": "plate",
        "phonetic": "/pleɪt/",
        "meaning": "n. 盘子，碟子",
        "mcItem": "Heavy Pressure Plate",
        "mcItemIcon": "🍽️",
        "sampleSentence": "There are plates in the cupboard.",
        "sampleTranslation": "碗橱里有一些盘子。"
      },
      {
        "word": "fork",
        "phonetic": "/fɔːk/",
        "meaning": "n. 叉子",
        "mcItem": "Trident",
        "mcItemIcon": "🍴",
        "sampleSentence": "Pass me the fork, please.",
        "sampleTranslation": "请递给我叉子。"
      },
      {
        "word": "cupboard",
        "phonetic": "/ˈkʌb.əd/",
        "meaning": "n. 碗橱，壁橱",
        "mcItem": "Barrel",
        "mcItemIcon": "🗄️",
        "sampleSentence": "Store cups in the cupboard.",
        "sampleTranslation": "把茶杯存放在碗橱里。"
      }
    ],
    "grammarNote": "复数可数用 Are there any...? / 不可数用 Is there any...?"
  },
  "45": {
    "id": 45,
    "unit": 2,
    "title": "The boss's letter",
    "titleZh": "老板的信",
    "topic": "Office Work & Ability",
    "topicZh": "办公室工作与能力考查",
    "grammar": "情态动词 can 的用法与请求表达",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "THE BOSS",
        "text": "Can you come here a minute please, Bob?",
        "translation": "请你来一下好吗，鲍勃？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "BOB",
        "text": "Yes, sir?",
        "translation": "什么事，先生？",
        "avatar": "👨"
      },
      {
        "speaker": "THE BOSS",
        "text": "Where's Pamela?",
        "translation": "帕梅拉在哪儿？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "BOB",
        "text": "She's next door. She's in her office, sir.",
        "translation": "她在隔壁。她在她的办公室里，先生。",
        "avatar": "👨"
      },
      {
        "speaker": "THE BOSS",
        "text": "Can she type this letter for me? Ask her please.",
        "translation": "她能为我打这封信吗？请问问她。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "BOB",
        "text": "Yes, sir.",
        "translation": "好的，先生。",
        "avatar": "👨"
      },
      {
        "speaker": "BOB",
        "text": "Can you type this letter for the boss please, Pamela?",
        "translation": "帕梅拉，请你给老板打这封信好吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PAMELA",
        "text": "Yes, of course I can.",
        "translation": "行，我当然能打。",
        "avatar": "👩"
      },
      {
        "speaker": "THE BOSS",
        "text": "Where's the letter?",
        "translation": "信在哪儿？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "BOB",
        "text": "Here it is. But I can't read it. The boss's handwriting is terrible!",
        "translation": "在这儿。但我看不懂。老板的书法太糟糕了！",
        "avatar": "👨"
      },
      {
        "speaker": "PAMELA",
        "text": "Don't worry. I can read it.",
        "translation": "别担心。我能看懂。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Can you come here a minute please, Bob? Yes, sir?",
        "zh": "请你来一下好吗，鲍勃？什么事，先生？"
      },
      {
        "en": "Where's Pamela? She's next door. She's in her office, sir.",
        "zh": "帕梅拉在哪儿？她在隔壁。她在她的办公室里，先生。"
      },
      {
        "en": "Can she type this letter for me? Ask her please.",
        "zh": "她能为我打这封信吗？请问问她。"
      },
      {
        "en": "Can you type this letter for the boss please, Pamela? Yes, of course I can.",
        "zh": "帕梅拉，请你给老板打这封信好吗？行，我当然能打。"
      },
      {
        "en": "Here it is. But I can't read it. The boss's handwriting is terrible!",
        "zh": "在这儿。但我看不懂。老板的书法太糟糕了！"
      },
      {
        "en": "Don't worry. I can read it.",
        "zh": "别担心。我能看懂。"
      }
    ],
    "words": [
      {
        "word": "can",
        "phonetic": "/kæn/",
        "meaning": "modal v. 能够",
        "mcItem": "Beacon",
        "mcItemIcon": "💡",
        "sampleSentence": "Can you type this letter?",
        "sampleTranslation": "你能打这封信吗？"
      },
      {
        "word": "boss",
        "phonetic": "/bɒs/",
        "meaning": "n. 老板，上司",
        "mcItem": "Player Head",
        "mcItemIcon": "👨‍💼",
        "sampleSentence": "The boss is in his office.",
        "sampleTranslation": "老板在他的办公室里。"
      },
      {
        "word": "minute",
        "phonetic": "/ˈmɪnɪt/",
        "meaning": "n. 分钟",
        "mcItem": "Clock",
        "mcItemIcon": "⏱️",
        "sampleSentence": "Wait a minute, please.",
        "sampleTranslation": "请等一分钟。"
      },
      {
        "word": "ask",
        "phonetic": "/ɑːsk/",
        "meaning": "v. 请求，问",
        "mcItem": "Book",
        "mcItemIcon": "❓",
        "sampleSentence": "Ask her to come here.",
        "sampleTranslation": "请她到这里来。"
      },
      {
        "word": "handwriting",
        "phonetic": "/ˈhændˌraɪtɪŋ/",
        "meaning": "n. 书写，笔迹",
        "mcItem": "Feather",
        "mcItemIcon": "✍️",
        "sampleSentence": "His handwriting is terrible.",
        "sampleTranslation": "他的字迹太糟糕了。"
      },
      {
        "word": "terrible",
        "phonetic": "/ˈterəbl/",
        "meaning": "adj. 糟糕的，可怕的",
        "mcItem": "TNT",
        "mcItemIcon": "💥",
        "sampleSentence": "The weather is terrible.",
        "sampleTranslation": "天气很糟糕。"
      }
    ],
    "grammarNote": "Can you come here a minute please? (委婉请求)。Can she type...? (询问能力)。"
  },
  "46": {
    "id": 46,
    "unit": 2,
    "title": "Can you ...?",
    "titleZh": "你能……吗？",
    "topic": "Abilities & Skills",
    "topicZh": "技能与能力问答",
    "grammar": "情态动词 can 问答",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Can you make a bookcase?",
        "translation": "你能做一个书架吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I can. / No, I can't.",
        "translation": "是的，我能。/ 不，我不能。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Can he drive a car?",
        "translation": "他会开车吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, he can. / No, he can't.",
        "translation": "是的，他会。/ 不，他不会。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Can you lift this chair? Yes, I can.",
        "zh": "你能举起这把椅子吗？是的，我能。"
      },
      {
        "en": "Can you type this letter? Yes, I can.",
        "zh": "你能打这封信吗？是的，我能。"
      },
      {
        "en": "Can you paint this bookcase? Yes, I can.",
        "zh": "你能给这个书架刷漆吗？是的，我能。"
      },
      {
        "en": "Can you see that plane? Yes, I can.",
        "zh": "你能看见那架飞机吗？是的，我能。"
      }
    ],
    "words": [
      {
        "word": "lift",
        "phonetic": "/lɪft/",
        "meaning": "v. 举起",
        "mcItem": "Piston",
        "mcItemIcon": "🏋️",
        "sampleSentence": "Can you lift this box?",
        "sampleTranslation": "你能搬起这个盒子吗？"
      },
      {
        "word": "cake",
        "phonetic": "/keɪk/",
        "meaning": "n. 蛋糕",
        "mcItem": "Cake",
        "mcItemIcon": "🎂",
        "sampleSentence": "Make a chocolate cake.",
        "sampleTranslation": "做一个巧克力蛋糕。"
      },
      {
        "word": "biscuit",
        "phonetic": "/ˈbɪskɪt/",
        "meaning": "n. 饼干",
        "mcItem": "Cookie",
        "mcItemIcon": "🍪",
        "sampleSentence": "Eat a biscuit.",
        "sampleTranslation": "吃块饼干。"
      }
    ],
    "grammarNote": "Can you + 动词原形? 肯定回答：Yes, I can. 否定回答：No, I can't."
  },
  "47": {
    "id": 47,
    "unit": 2,
    "title": "A cup of coffee",
    "titleZh": "一杯咖啡",
    "topic": "Coffee & Tea Offers",
    "topicZh": "咖啡招待与喜好询问",
    "grammar": "Do you like...? / Do you want...? 一般现在时疑问句",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "CHRISTINE",
        "text": "Do you like coffee, Ann?",
        "translation": "安，你喜欢咖啡吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "Yes, I do.",
        "translation": "是的，我喜欢。",
        "avatar": "👧"
      },
      {
        "speaker": "CHRISTINE",
        "text": "Do you want a cup?",
        "translation": "你想来一杯吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "Yes, please, Christine.",
        "translation": "好的，请来一杯，克里斯汀。",
        "avatar": "👧"
      },
      {
        "speaker": "CHRISTINE",
        "text": "Do you want any sugar?",
        "translation": "你要放些糖吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "Yes, please.",
        "translation": "是的，请放些。",
        "avatar": "👧"
      },
      {
        "speaker": "CHRISTINE",
        "text": "Do you want any milk?",
        "translation": "你要放些牛奶吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "No, thank you. I don't like milk in my coffee. I like black coffee.",
        "translation": "不，谢谢。我的咖啡里不喜欢加牛奶。我喜欢黑咖啡。",
        "avatar": "👧"
      },
      {
        "speaker": "CHRISTINE",
        "text": "Do you like biscuits?",
        "translation": "你喜欢饼干吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "Yes, I do.",
        "translation": "是的，我喜欢。",
        "avatar": "👧"
      },
      {
        "speaker": "CHRISTINE",
        "text": "Do you want one?",
        "translation": "你想来一块吗？",
        "avatar": "👩"
      },
      {
        "speaker": "ANN",
        "text": "Yes, please.",
        "translation": "好的，请来一块。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Do you like coffee, Ann? Yes, I do.",
        "zh": "安，你喜欢咖啡吗？是的，我喜欢。"
      },
      {
        "en": "Do you want a cup? Yes, please, Christine.",
        "zh": "你想来一杯吗？好的，请来一杯，克里斯汀。"
      },
      {
        "en": "Do you want any sugar? Yes, please.",
        "zh": "你要放些糖吗？是的，请放些。"
      },
      {
        "en": "Do you want any milk? No, thank you. I don't like milk in my coffee. I like black coffee.",
        "zh": "你要放些牛奶吗？不，谢谢。我的咖啡里不喜欢加牛奶。我喜欢黑咖啡。"
      },
      {
        "en": "Do you like biscuits? Yes, I do.",
        "zh": "你喜欢饼干吗？是的，我喜欢。"
      },
      {
        "en": "Do you want one? Yes, please.",
        "zh": "你想来一块吗？好的，请来一块。"
      }
    ],
    "words": [
      {
        "word": "like",
        "phonetic": "/laɪk/",
        "meaning": "v. 喜欢",
        "mcItem": "Heart",
        "mcItemIcon": "❤️",
        "sampleSentence": "I like coffee.",
        "sampleTranslation": "我喜欢咖啡。"
      },
      {
        "word": "want",
        "phonetic": "/wɒnt/",
        "meaning": "v. 想要",
        "mcItem": "Chest",
        "mcItemIcon": "🤲",
        "sampleSentence": "Do you want a cup?",
        "sampleTranslation": "你想来一杯吗？"
      },
      {
        "word": "black",
        "phonetic": "/blæk/",
        "meaning": "adj. 不加牛奶的(咖啡)",
        "mcItem": "Black Dye",
        "mcItemIcon": "☕",
        "sampleSentence": "I like black coffee.",
        "sampleTranslation": "我喜欢纯黑咖啡。"
      }
    ],
    "grammarNote": "一般现在时疑问句：Do you like...? 回答：Yes, I do. / No, I don't. 实义动词疑问句借用助动词 do。"
  },
  "48": {
    "id": 48,
    "unit": 2,
    "title": "Do you like ...? / Do you want ...?",
    "titleZh": "你喜欢……吗？ / 你想要……吗？",
    "topic": "Preferences & Wants",
    "topicZh": "喜好与意愿扩展表达",
    "grammar": "Do you like / want + 宾语",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Do you like fresh butter?",
        "translation": "你喜欢新鲜黄油吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I do. / No, I don't.",
        "translation": "是的，我喜欢。/ 不，我不喜欢。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Do you want some?",
        "translation": "你想要一些吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, please. / No, thank you.",
        "translation": "好的，请给一些。/ 不，谢谢。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Do you like fresh eggs? Do you want any?",
        "zh": "你喜欢新鲜鸡蛋吗？你想要一些吗？"
      },
      {
        "en": "Do you like butter? Do you want any?",
        "zh": "你喜欢黄油吗？你想要一些吗？"
      },
      {
        "en": "Do you like pure honey? Do you want any?",
        "zh": "你喜欢纯蜂蜜吗？你想要一些吗？"
      },
      {
        "en": "Do you like ripe bananas? Do you want any?",
        "zh": "你喜欢熟香蕉吗？你想要一些吗？"
      },
      {
        "en": "Do you like jam? Do you want any?",
        "zh": "你喜欢果酱吗？你想要一些吗？"
      },
      {
        "en": "Do you like sweet oranges? Do you want any?",
        "zh": "你喜欢甜橙吗？你想要一些吗？"
      },
      {
        "en": "Do you like ice cream? Do you want any?",
        "zh": "你喜欢冰淇淋吗？你想要一些吗？"
      },
      {
        "en": "Do you like beer? Do you want any?",
        "zh": "你喜欢啤酒吗？你想要一些吗？"
      }
    ],
    "words": [
      {
        "word": "fresh",
        "phonetic": "/freʃ/",
        "meaning": "adj. 新鲜的",
        "mcItem": "Apple",
        "mcItemIcon": "🥗",
        "sampleSentence": "These eggs are fresh.",
        "sampleTranslation": "这些鸡蛋很新鲜。"
      },
      {
        "word": "butter",
        "phonetic": "/ˈbʌtə/",
        "meaning": "n. 黄油",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "🧈",
        "sampleSentence": "Fresh butter is good.",
        "sampleTranslation": "新鲜黄油很好吃。"
      },
      {
        "word": "honey",
        "phonetic": "/ˈhʌni/",
        "meaning": "n. 蜂蜜",
        "mcItem": "Honey Bottle",
        "mcItemIcon": "🍯",
        "sampleSentence": "Honey is sweet.",
        "sampleTranslation": "蜂蜜是甜的。"
      },
      {
        "word": "ripe",
        "phonetic": "/raɪp/",
        "meaning": "adj. 成熟的",
        "mcItem": "Golden Apple",
        "mcItemIcon": "🍌",
        "sampleSentence": "The bananas are ripe.",
        "sampleTranslation": "香蕉熟了。"
      },
      {
        "word": "banana",
        "phonetic": "/bəˈnɑːnə/",
        "meaning": "n. 香蕉",
        "mcItem": "Wheat",
        "mcItemIcon": "🍌",
        "sampleSentence": "I like bananas.",
        "sampleTranslation": "我喜欢香蕉。"
      },
      {
        "word": "jam",
        "phonetic": "/dʒæm/",
        "meaning": "n. 果酱",
        "mcItem": "Sweet Berries",
        "mcItemIcon": "🍓",
        "sampleSentence": "Strawberry jam on bread.",
        "sampleTranslation": "面包上的草莓酱。"
      }
    ],
    "grammarNote": "一般现在时句型：Do you like + 可数名词复数 / 不可数名词? Do you want some / any?"
  }
};
