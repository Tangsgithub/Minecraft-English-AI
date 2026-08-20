// Authentic NCE Book 1 Unit 4 Data (Lessons 73 - 96)
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

export const NCE_BOOK1_UNIT4_DATA: Record<number, LessonCorpusItem> = {
  "73": {
    "id": 73,
    "unit": 4,
    "title": "The way to King Street",
    "titleZh": "去国王街的路线",
    "topic": "Asking for Directions",
    "topicZh": "问路与路线指引",
    "grammar": "Can you tell me the way to...? / How do I get to...?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "MAN",
        "text": "Excuse me. Can you tell me the way to King Street, please?",
        "translation": "劳驾。请问去国王街怎么走？",
        "avatar": "👨"
      },
      {
        "speaker": "LADY",
        "text": "King Street? Let me see. Go straight ahead, then turn right at the traffic lights.",
        "translation": "国王街？让我想想。一直往前走，然后在红绿灯处向右拐。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Is it far from here?",
        "translation": "离这儿远吗？",
        "avatar": "👨"
      },
      {
        "speaker": "LADY",
        "text": "No, it's not far. It's about five minutes' walk.",
        "translation": "不，不远。步行大约五分钟。",
        "avatar": "👩"
      },
      {
        "speaker": "MAN",
        "text": "Thank you very much.",
        "translation": "非常感谢你。",
        "avatar": "👨"
      },
      {
        "speaker": "LADY",
        "text": "You're welcome.",
        "translation": "不客气。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Excuse me. Can you tell me the way to King Street, please?",
        "zh": "劳驾。请问去国王街怎么走？"
      },
      {
        "en": "Go straight ahead, then turn right at the traffic lights.",
        "zh": "一直往前走，然后在红绿灯处向右拐。"
      },
      {
        "en": "Is it far from here? No, it's about five minutes' walk.",
        "zh": "离这儿远吗？不，步行大约五分钟。"
      },
      {
        "en": "Turn left at the second crossing.",
        "zh": "在第二个十字路口向左拐。"
      }
    ],
    "words": [
      {
        "word": "straight",
        "phonetic": "/streɪt/",
        "meaning": "adv. 直地",
        "mcItem": "Rail",
        "mcItemIcon": "⬆️",
        "sampleSentence": "Go straight ahead.",
        "sampleTranslation": "一直往前走。"
      },
      {
        "word": "ahead",
        "phonetic": "/əˈhed/",
        "meaning": "adv. 向前",
        "mcItem": "Compass",
        "mcItemIcon": "👉",
        "sampleSentence": "Walk straight ahead.",
        "sampleTranslation": "径直往前走。"
      },
      {
        "word": "traffic",
        "phonetic": "/ˈtræfɪk/",
        "meaning": "n. 交通",
        "mcItem": "Minecart",
        "mcItemIcon": "🚦",
        "sampleSentence": "Heavy traffic.",
        "sampleTranslation": "拥挤的交通。"
      },
      {
        "word": "light",
        "phonetic": "/laɪt/",
        "meaning": "n. 灯光，信号灯",
        "mcItem": "Redstone Lamp",
        "mcItemIcon": "🚥",
        "sampleSentence": "Traffic lights.",
        "sampleTranslation": "红绿灯。"
      },
      {
        "word": "far",
        "phonetic": "/fɑː/",
        "meaning": "adj. & adv. 远的",
        "mcItem": "Map",
        "mcItemIcon": "🗺️",
        "sampleSentence": "It is far away.",
        "sampleTranslation": "它很远。"
      }
    ],
    "grammarNote": "指路常用短语：go straight ahead (直走), turn left/right (左转/右转), at the traffic lights (在交通灯处), five minutes' walk (五分钟步行路程)。"
  },
  "74": {
    "id": 74,
    "unit": 4,
    "title": "What did they do?",
    "titleZh": "他们做了什么？",
    "topic": "Irregular Past Verbs",
    "topicZh": "不规则动词过去式训练",
    "grammar": "不规则动词一般过去时 (went, saw, bought, took, came)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What did he do yesterday?",
        "translation": "他昨天做了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He went to the park and met his friends.",
        "translation": "他去了公园并见了他的朋友们。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What did she buy at the market?",
        "translation": "她在市场上买了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "She bought some fruit and vegetables.",
        "translation": "她买了一些水果和蔬菜。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He went to school by bus yesterday.",
        "zh": "他昨天乘公交车去上学了。"
      },
      {
        "en": "She saw a very interesting film last night.",
        "zh": "她昨晚看了一部非常有趣的电影。"
      },
      {
        "en": "They bought a new car last month.",
        "zh": "他们上个月买了一辆新车。"
      },
      {
        "en": "He came to my office the day before yesterday.",
        "zh": "他前天来了我的办公室。"
      },
      {
        "en": "She took a photograph of the church.",
        "zh": "她拍了一张教堂的照片。"
      }
    ],
    "words": [
      {
        "word": "went",
        "phonetic": "/went/",
        "meaning": "v. 去 (go的过去式)",
        "mcItem": "Boots",
        "mcItemIcon": "🚶",
        "sampleSentence": "He went home.",
        "sampleTranslation": "他回家了。"
      },
      {
        "word": "saw",
        "phonetic": "/sɔː/",
        "meaning": "v. 看见 (see的过去式)",
        "mcItem": "Ender Eye",
        "mcItemIcon": "👀",
        "sampleSentence": "I saw him yesterday.",
        "sampleTranslation": "我昨天看到他了。"
      },
      {
        "word": "bought",
        "phonetic": "/bɔːt/",
        "meaning": "v. 买 (buy的过去式)",
        "mcItem": "Emerald",
        "mcItemIcon": "🛒",
        "sampleSentence": "She bought a bag.",
        "sampleTranslation": "她买了一个包。"
      },
      {
        "word": "took",
        "phonetic": "/tʊk/",
        "meaning": "v. 拿，带 (take的过去式)",
        "mcItem": "Bundle",
        "mcItemIcon": "📸",
        "sampleSentence": "He took a photo.",
        "sampleTranslation": "他拍了照片。"
      },
      {
        "word": "came",
        "phonetic": "/keɪm/",
        "meaning": "v. 来 (come的过去式)",
        "mcItem": "Compass",
        "mcItemIcon": "🏃",
        "sampleSentence": "She came back late.",
        "sampleTranslation": "她很晚才回来。"
      }
    ],
    "grammarNote": "高频不规则动词原形与过去式：go-went, see-saw, buy-bought, take-took, come-came, meet-met, give-gave, drink-drank, eat-ate。"
  },
  "75": {
    "id": 75,
    "unit": 4,
    "title": "Uncomfortable shoes",
    "titleZh": "不舒服的鞋子",
    "topic": "Shoe Shopping & Complaints",
    "topicZh": "买鞋与试穿感受",
    "grammar": "I bought them ... ago / They're too small / Can I try them on?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "LADY",
        "text": "Do you have any shoes like these?",
        "translation": "你们有像这样的鞋吗？",
        "avatar": "👩"
      },
      {
        "speaker": "SHOP ASSISTANT",
        "text": "What size do you take, madam?",
        "translation": "女士，您穿多大号的？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "LADY",
        "text": "Size five.",
        "translation": "5号。",
        "avatar": "👩"
      },
      {
        "speaker": "SHOP ASSISTANT",
        "text": "What colour would you like?",
        "translation": "您想要什么颜色的？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "LADY",
        "text": "Black, please.",
        "translation": "黑色的。",
        "avatar": "👩"
      },
      {
        "speaker": "SHOP ASSISTANT",
        "text": "Try on this pair, please. How do they feel?",
        "translation": "请试穿这双。感觉怎么样？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "LADY",
        "text": "They're too tight. They hurt my feet.",
        "translation": "太紧了。挤得我脚疼。",
        "avatar": "👩"
      },
      {
        "speaker": "SHOP ASSISTANT",
        "text": "Try size five and a half.",
        "translation": "试试五号半的吧。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "LADY",
        "text": "These are much more comfortable. I'll take them.",
        "translation": "这双舒服多了。我就买这双。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "Do you have any shoes like these? What size do you take?",
        "zh": "你们有像这样的鞋吗？您穿多大号？"
      },
      {
        "en": "Try on this pair, please. How do they feel?",
        "zh": "请试穿这双。感觉怎么样？"
      },
      {
        "en": "They're too tight. They hurt my feet.",
        "zh": "太紧了。挤得我脚疼。"
      },
      {
        "en": "These are much more comfortable. I'll take them.",
        "zh": "这双舒服多了。我就买这双。"
      }
    ],
    "words": [
      {
        "word": "comfortable",
        "phonetic": "/ˈkʌmftəbl/",
        "meaning": "adj. 舒服的",
        "mcItem": "Wool",
        "mcItemIcon": "🛋️",
        "sampleSentence": "These shoes are comfortable.",
        "sampleTranslation": "这些鞋子很舒服。"
      },
      {
        "word": "uncomfortable",
        "phonetic": "/ʌnˈkʌmftəbl/",
        "meaning": "adj. 不舒服的",
        "mcItem": "Cactus",
        "mcItemIcon": "😣",
        "sampleSentence": "An uncomfortable chair.",
        "sampleTranslation": "一把不舒服的椅子。"
      },
      {
        "word": "tight",
        "phonetic": "/taɪt/",
        "meaning": "adj. 紧的",
        "mcItem": "Lead",
        "mcItemIcon": "🤏",
        "sampleSentence": "The shoes are tight.",
        "sampleTranslation": "鞋子很紧。"
      },
      {
        "word": "hurt",
        "phonetic": "/hɜːt/",
        "meaning": "v. 弄痛，伤害",
        "mcItem": "Sword",
        "mcItemIcon": "💔",
        "sampleSentence": "My feet hurt.",
        "sampleTranslation": "我的脚很痛。"
      },
      {
        "word": "pair",
        "phonetic": "/peə/",
        "meaning": "n. 一双，一对",
        "mcItem": "Boots",
        "mcItemIcon": "👟",
        "sampleSentence": "A pair of shoes.",
        "sampleTranslation": "一双鞋。"
      }
    ],
    "grammarNote": "量词短语：a pair of shoes (一双鞋)。too + 形容词表示“太……”(too tight)。try on 试穿。"
  },
  "76": {
    "id": 76,
    "unit": 4,
    "title": "When did you buy ...?",
    "titleZh": "你什么时候买的……？",
    "topic": "Time Expressions with 'ago'",
    "topicZh": "ago 时间副词与过去时表达",
    "grammar": "When did you buy...? / I bought it ... ago",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When did you buy that coat?",
        "translation": "你什么时候买的那件大衣？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I bought it two weeks ago.",
        "translation": "我两周前买的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When did they arrive in Beijing?",
        "translation": "他们什么时候到达北京的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They arrived three days ago.",
        "translation": "他们三天前到的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I bought this car two years ago.",
        "zh": "我两年前买了这辆车。"
      },
      {
        "en": "He left school five months ago.",
        "zh": "他五个月前毕业离校了。"
      },
      {
        "en": "She came to London a week ago.",
        "zh": "她一周前来到伦敦。"
      },
      {
        "en": "We met him twenty minutes ago.",
        "zh": "我们20分钟前见到了他。"
      }
    ],
    "words": [
      {
        "word": "ago",
        "phonetic": "/əˈɡəʊ/",
        "meaning": "adv. 以前",
        "mcItem": "Clock",
        "mcItemIcon": "⌛",
        "sampleSentence": "Three days ago.",
        "sampleTranslation": "三天前。"
      }
    ],
    "grammarNote": "时间段 + ago 是典型的一般过去时标志词：an hour ago, two days ago, three weeks ago, a year ago。"
  },
  "77": {
    "id": 77,
    "unit": 4,
    "title": "Terrible toothache",
    "titleZh": "糟糕的牙痛",
    "topic": "At the Dentist & Appointments",
    "topicZh": "牙医诊所就诊与预约",
    "grammar": "have an appointment / What's the matter? / Must I...?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "DENTIST",
        "text": "Good morning, Mr. Croft. What's the trouble?",
        "translation": "早上好，克罗夫特先生。怎么不舒服？",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MR. CROFT",
        "text": "I have a terrible toothache, Doctor. It started last night.",
        "translation": "我牙痛得厉害，医生。是昨晚开始痛的。",
        "avatar": "👨"
      },
      {
        "speaker": "DENTIST",
        "text": "Open your mouth wide, please. Let me examine it.",
        "translation": "请把嘴张大。让我检查一下。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "DENTIST",
        "text": "Ah yes. There's a bad cavity in this tooth. I must fill it.",
        "translation": "啊，是的。这颗牙有个严重的龋洞。我必须把它补好。",
        "avatar": "👨‍⚕️"
      },
      {
        "speaker": "MR. CROFT",
        "text": "Will it hurt, Doctor?",
        "translation": "会痛吗，医生？",
        "avatar": "👨"
      },
      {
        "speaker": "DENTIST",
        "text": "No, it won't hurt at all. I'll give you an injection first.",
        "translation": "不，一点也不痛。我先给你打一针麻药。",
        "avatar": "👨‍⚕️"
      }
    ],
    "sentences": [
      {
        "en": "Good morning, Mr. Croft. What's the trouble?",
        "zh": "早上好，克罗夫特先生。怎么不舒服？"
      },
      {
        "en": "I have a terrible toothache, Doctor. It started last night.",
        "zh": "我牙痛得厉害，医生。是昨晚开始痛的。"
      },
      {
        "en": "Open your mouth wide, please. Let me examine it.",
        "zh": "请把嘴张大。让我检查一下。"
      },
      {
        "en": "There's a bad cavity in this tooth. I must fill it.",
        "zh": "这颗牙有个严重的龋洞。我必须把它补好。"
      },
      {
        "en": "No, it won't hurt at all. I'll give you an injection first.",
        "zh": "不，一点也不痛。我先给你打一针。"
      }
    ],
    "words": [
      {
        "word": "trouble",
        "phonetic": "/ˈtrʌbl/",
        "meaning": "n. 麻烦，疾病",
        "mcItem": "Barrier",
        "mcItemIcon": "❓",
        "sampleSentence": "What's the trouble?",
        "sampleTranslation": "怎么啦？"
      },
      {
        "word": "examine",
        "phonetic": "/ɪɡˈzæmɪn/",
        "meaning": "v. 检查",
        "mcItem": "Spyglass",
        "mcItemIcon": "🔍",
        "sampleSentence": "Examine the patient.",
        "sampleTranslation": "检查病人。"
      },
      {
        "word": "cavity",
        "phonetic": "/ˈkævəti/",
        "meaning": "n. 龋齿洞",
        "mcItem": "Quartz",
        "mcItemIcon": "🦷",
        "sampleSentence": "A tooth cavity.",
        "sampleTranslation": "牙齿龋洞。"
      },
      {
        "word": "fill",
        "phonetic": "/fɪl/",
        "meaning": "v. 填补，充填",
        "mcItem": "Bucket",
        "mcItemIcon": "🪥",
        "sampleSentence": "Fill a tooth.",
        "sampleTranslation": "补牙。"
      },
      {
        "word": "injection",
        "phonetic": "/ɪnˈdʒekʃn/",
        "meaning": "n. 注射，打针",
        "mcItem": "Potion",
        "mcItemIcon": "💉",
        "sampleSentence": "Give an injection.",
        "sampleTranslation": "打一针。"
      }
    ],
    "grammarNote": "诊所问诊经典句型：What's the trouble? / What's the matter? not ... at all 一点也不……。"
  },
  "78": {
    "id": 78,
    "unit": 4,
    "title": "When did you ...?",
    "titleZh": "你什么时候……的？",
    "topic": "Past Appointments & Events",
    "topicZh": "过去发生的就医与活动安排",
    "grammar": "When did you go to...? / I went there ... ago",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When did you see the doctor?",
        "translation": "你什么时候看的医生？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I saw him yesterday afternoon.",
        "translation": "我昨天下午去看的。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When did you have your appointment?",
        "translation": "你什么时候预约的？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I had it two days ago.",
        "translation": "我两天前去的。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I saw the dentist three days ago.",
        "zh": "我三天前看了牙医。"
      },
      {
        "en": "He had an operation last month.",
        "zh": "他上个月做了手术。"
      },
      {
        "en": "She took the medicine this morning.",
        "zh": "她今天早上吃了药。"
      },
      {
        "en": "We visited the hospital last week.",
        "zh": "我们上周去了医院。"
      }
    ],
    "words": [
      {
        "word": "appointment",
        "phonetic": "/əˈpɔɪntmənt/",
        "meaning": "n. 约会，预约",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "Make an appointment.",
        "sampleTranslation": "预约挂号。"
      }
    ],
    "grammarNote": "make an appointment (预约) / have an appointment (有预约)。"
  },
  "79": {
    "id": 79,
    "unit": 4,
    "title": "Carol's shopping list",
    "titleZh": "卡罗尔的购物清单",
    "topic": "Shopping Planning & Need/Must",
    "topicZh": "列购物清单与家庭必需品",
    "grammar": "We need some... / Do we have any...? / We must buy...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "TOM",
        "text": "What are you doing, Carol?",
        "translation": "卡罗尔，你在做什么？",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "I'm making a shopping list. What do we need?",
        "translation": "我在写购物清单。我们需要什么？",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "We need some tea and coffee. There's none left.",
        "translation": "我们需要茶和咖啡。一点都没剩了。",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "Is there any butter?",
        "translation": "还有黄油吗？",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "No, there isn't. We must buy some butter and some eggs, too.",
        "translation": "没有了。我们还得买些黄油和鸡蛋。",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "What about fruit?",
        "translation": "水果呢？",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "We have plenty of apples, but we need some oranges.",
        "translation": "我们有好多苹果，但需要买些橙子。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "I'm making a shopping list. What do we need?",
        "zh": "我在写购物清单。我们需要什么？"
      },
      {
        "en": "We need some tea and coffee. There's none left.",
        "zh": "我们需要茶和咖啡。一点都没剩了。"
      },
      {
        "en": "We must buy some butter and some eggs, too.",
        "zh": "我们还得买些黄油和鸡蛋。"
      },
      {
        "en": "We have plenty of apples, but we need some oranges.",
        "zh": "我们有好多苹果，但需要买些橙子。"
      }
    ],
    "words": [
      {
        "word": "list",
        "phonetic": "/lɪst/",
        "meaning": "n. 清单，列表",
        "mcItem": "Paper",
        "mcItemIcon": "📝",
        "sampleSentence": "A shopping list.",
        "sampleTranslation": "购物清单。"
      },
      {
        "word": "need",
        "phonetic": "/niːd/",
        "meaning": "v. 需要",
        "mcItem": "Chest",
        "mcItemIcon": "🛒",
        "sampleSentence": "We need some milk.",
        "sampleTranslation": "我们需要一些牛奶。"
      },
      {
        "word": "plenty",
        "phonetic": "/ˈplenti/",
        "meaning": "n. & pron. 充足，大量",
        "mcItem": "Chest",
        "mcItemIcon": "🧺",
        "sampleSentence": "Plenty of apples.",
        "sampleTranslation": "大量的苹果。"
      },
      {
        "word": "left",
        "phonetic": "/left/",
        "meaning": "adj. 剩下的",
        "mcItem": "Bowl",
        "mcItemIcon": "⏳",
        "sampleSentence": "There's none left.",
        "sampleTranslation": "一点也没剩了。"
      }
    ],
    "grammarNote": "plenty of (大量/充足，接可数或不可数名词)；there is none left (一点也没剩下)。"
  },
  "80": {
    "id": 80,
    "unit": 4,
    "title": "I must ... / I need ...",
    "titleZh": "我必须…… / 我需要……",
    "topic": "Necessity & Shopping Items",
    "topicZh": "必要性表达与生活用品采购",
    "grammar": "I must buy... / I have plenty of... / There is none",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Do you need any bread?",
        "translation": "你需要面包吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, I have plenty of bread, but I need some cheese.",
        "translation": "不，我有很多面包，但我需要一些奶酪。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Must you go to the shops now?",
        "translation": "你现在必须去商店吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I must. There is no food in the fridge.",
        "translation": "是的，必须去。冰箱里没有食物了。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I need some soap and toothpaste.",
        "zh": "我需要些肥皂和牙膏。"
      },
      {
        "en": "We have plenty of coffee, but we need some sugar.",
        "zh": "我们有大量咖啡，但需要些糖。"
      },
      {
        "en": "I must go to the chemist's this afternoon.",
        "zh": "我今天下午必须去一趟药店。"
      },
      {
        "en": "She needs a bottle of olive oil.",
        "zh": "她需要一瓶橄榄油。"
      }
    ],
    "words": [
      {
        "word": "toothpaste",
        "phonetic": "/ˈtuːθpeɪst/",
        "meaning": "n. 牙膏",
        "mcItem": "Potion",
        "mcItemIcon": "🪥",
        "sampleSentence": "A tube of toothpaste.",
        "sampleTranslation": "一管牙膏。"
      },
      {
        "word": "chemist",
        "phonetic": "/ˈkemɪst/",
        "meaning": "n. 药剂师，药房",
        "mcItem": "Brewing Stand",
        "mcItemIcon": "💊",
        "sampleSentence": "At the chemist's.",
        "sampleTranslation": "在药房。"
      }
    ],
    "grammarNote": "情态动词 must (主观必须) 与 实义动词 need (需要) 的用法区别。"
  },
  "81": {
    "id": 81,
    "unit": 4,
    "title": "Roast beef and potatoes",
    "titleZh": "烤牛肉和土豆",
    "topic": "Cooking & Dinner Preparations",
    "topicZh": "烹饪晚餐与采购归来",
    "grammar": "Past tense narrations / What did you buy?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "TOM",
        "text": "Hi, Carol! Where were you?",
        "translation": "嗨，卡罗尔！你刚才在哪儿？",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "I was at the shops. I bought some beef and some potatoes.",
        "translation": "我刚才去商店了。我买了些牛肉和土豆。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "What are you going to cook for dinner?",
        "translation": "你晚饭打算做什么？",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "I'm going to make roast beef and roast potatoes. Your favourite!",
        "translation": "我打算做烤牛肉和烤土豆。你最爱吃的！",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "Wonderful! Did you buy any beer?",
        "translation": "太棒了！你买啤酒了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "CAROL",
        "text": "No, I didn't. I forgot. But I bought some orange juice.",
        "translation": "没有，我忘了。但我买了一些橙汁。",
        "avatar": "👩"
      },
      {
        "speaker": "TOM",
        "text": "Never mind. Orange juice is fine with me.",
        "translation": "没关系。橙汁对我来说也很好。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Where were you? I was at the shops.",
        "zh": "你刚才在哪儿？我刚才在商店。"
      },
      {
        "en": "I bought some beef and some potatoes.",
        "zh": "我买了些牛肉和土豆。"
      },
      {
        "en": "I'm going to make roast beef and roast potatoes.",
        "zh": "我打算做烤牛肉和烤土豆。"
      },
      {
        "en": "Did you buy any beer? No, I forgot.",
        "zh": "你买啤酒了吗？没有，我忘了。"
      },
      {
        "en": "Never mind. Orange juice is fine with me.",
        "zh": "没关系。橙汁对我来说也很好。"
      }
    ],
    "words": [
      {
        "word": "roast",
        "phonetic": "/rəʊst/",
        "meaning": "v. & adj. 烤，烘烤",
        "mcItem": "Smoker",
        "mcItemIcon": "🍖",
        "sampleSentence": "Roast beef.",
        "sampleTranslation": "烤牛肉。"
      },
      {
        "word": "beer",
        "phonetic": "/bɪə/",
        "meaning": "n. 啤酒",
        "mcItem": "Potion",
        "mcItemIcon": "🍺",
        "sampleSentence": "A glass of beer.",
        "sampleTranslation": "一杯啤酒。"
      },
      {
        "word": "forget",
        "phonetic": "/fəˈɡet/",
        "meaning": "v. 忘记 (past: forgot)",
        "mcItem": "Compass",
        "mcItemIcon": "🤦",
        "sampleSentence": "I forgot my key.",
        "sampleTranslation": "我忘了带钥匙。"
      },
      {
        "word": "mind",
        "phonetic": "/maɪnd/",
        "meaning": "v. 介意",
        "mcItem": "Heart",
        "mcItemIcon": "💭",
        "sampleSentence": "Never mind.",
        "sampleTranslation": "没关系，不要紧。"
      }
    ],
    "grammarNote": "交际用语：Never mind. (没关系/别放在心上)。forget 的过去式是 forgot。"
  },
  "82": {
    "id": 82,
    "unit": 4,
    "title": "What did you buy?",
    "titleZh": "你买了什么？",
    "topic": "Shopping Past Actions",
    "topicZh": "过去购买物品汇报",
    "grammar": "What did you buy? / I bought some...",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What did you buy at the grocer's?",
        "translation": "你在杂货店买了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I bought a loaf of bread and a tin of soup.",
        "translation": "我买了一条面包和一听罐头汤。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Did you remember the butter?",
        "translation": "你记得买黄油了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I bought half a pound of butter.",
        "translation": "记得，我买了半磅黄油。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I bought a pound of mince and some chicken.",
        "zh": "我买了一磅肉馅和一些鸡肉。"
      },
      {
        "en": "She bought some cabbage and carrots.",
        "zh": "她买了些卷心菜和胡萝卜。"
      },
      {
        "en": "He forgot to buy the tickets.",
        "zh": "他忘了买票。"
      },
      {
        "en": "They drank all the milk.",
        "zh": "他们喝光了所有的牛奶。"
      }
    ],
    "words": [
      {
        "word": "carrot",
        "phonetic": "/ˈkærət/",
        "meaning": "n. 胡萝卜",
        "mcItem": "Carrot",
        "mcItemIcon": "🥕",
        "sampleSentence": "Rabbits like carrots.",
        "sampleTranslation": "兔子喜欢胡萝卜。"
      }
    ],
    "grammarNote": "不规则过去式：drink -> drank, forget -> forgot, buy -> bought。"
  },
  "83": {
    "id": 83,
    "unit": 4,
    "title": "Going on holiday",
    "titleZh": "去度假",
    "topic": "Travel Plans & Holiday Packing",
    "topicZh": "旅行度假与现在完成时初探",
    "grammar": "Have you packed your bags? / Present Perfect vs. Past Simple",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "SAM",
        "text": "Hello, Penny. Are you ready for the holiday?",
        "translation": "你好，彭妮。假期准备好了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Almost. I've packed my suitcase.",
        "translation": "差不多了。我已经收拾好手提箱了。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Have you found your passport?",
        "translation": "你找到你的护照了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "Yes, I have. It's on the dressing table.",
        "translation": "找到了。在梳妆台上呢。",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Have you printed the tickets yet?",
        "translation": "你把票打印好了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "PENNY",
        "text": "No, not yet. Can you do it for me, please?",
        "translation": "还没有。你能帮我打印一下吗？",
        "avatar": "👩"
      },
      {
        "speaker": "SAM",
        "text": "Certainly. We are going to have a wonderful time in Greece!",
        "translation": "没问题。我们在希腊一定会过得非常愉快！",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Are you ready for the holiday? Almost.",
        "zh": "假期准备好了吗？差不多了。"
      },
      {
        "en": "I've packed my suitcase.",
        "zh": "我已经收拾好手提箱了。"
      },
      {
        "en": "Have you found your passport? Yes, I have.",
        "zh": "你找到你的护照了吗？是的，找到了。"
      },
      {
        "en": "Have you printed the tickets yet? No, not yet.",
        "zh": "你把票打印好了吗？还没有。"
      },
      {
        "en": "We are going to have a wonderful time in Greece!",
        "zh": "我们在希腊一定会过得非常愉快！"
      }
    ],
    "words": [
      {
        "word": "holiday",
        "phonetic": "/ˈhɒlədeɪ/",
        "meaning": "n. 假期，节日",
        "mcItem": "Sun",
        "mcItemIcon": "🏖️",
        "sampleSentence": "Go on holiday.",
        "sampleTranslation": "去度假。"
      },
      {
        "word": "pack",
        "phonetic": "/pæk/",
        "meaning": "v. 打包，收拾",
        "mcItem": "Chest",
        "mcItemIcon": "🧳",
        "sampleSentence": "Pack your bag.",
        "sampleTranslation": "收拾你的包。"
      },
      {
        "word": "suitcase",
        "phonetic": "/ˈsuːtkeɪs/",
        "meaning": "n. 手提箱",
        "mcItem": "Bundle",
        "mcItemIcon": "🧳",
        "sampleSentence": "A heavy suitcase.",
        "sampleTranslation": "沉重的手提箱。"
      },
      {
        "word": "passport",
        "phonetic": "/ˈpɑːspɔːt/",
        "meaning": "n. 护照",
        "mcItem": "Book",
        "mcItemIcon": "🛂",
        "sampleSentence": "Show your passport.",
        "sampleTranslation": "出示你的护照。"
      },
      {
        "word": "already",
        "phonetic": "/ɔːlˈredi/",
        "meaning": "adv. 已经",
        "mcItem": "Clock",
        "mcItemIcon": "✅",
        "sampleSentence": "I have already finished.",
        "sampleTranslation": "我已经完成了。"
      }
    ],
    "grammarNote": "现在完成时结构：have/has + 过去分词 (done)。表示动作已完成并对现在产生影响。already (已经), yet (尚未)。"
  },
  "84": {
    "id": 84,
    "unit": 4,
    "title": "Have you had ...?",
    "titleZh": "你已经……了吗？",
    "topic": "Present Perfect Practice",
    "topicZh": "现在完成时肯定与疑问训练",
    "grammar": "Have you ...ed / Had you had...? / I have already...",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Have you had your breakfast yet?",
        "translation": "你吃过早饭了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I've already had it.",
        "translation": "是的，我已经吃过了。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Has he cleaned the car yet?",
        "translation": "他擦车了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, he hasn't cleaned it yet.",
        "translation": "还没，他还没擦呢。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I have already finished my homework.",
        "zh": "我已经做完了作业。"
      },
      {
        "en": "She has washed the dishes.",
        "zh": "她已经洗好了盘子。"
      },
      {
        "en": "They have arrived at the airport.",
        "zh": "他们已经到达机场了。"
      },
      {
        "en": "He hasn't written the email yet.",
        "zh": "他还没写那封电子邮件。"
      }
    ],
    "words": [],
    "grammarNote": "现在完成时肯定句通常用 already；疑问句和否定句句末用 yet。"
  },
  "85": {
    "id": 85,
    "unit": 4,
    "title": "Paris in the spring",
    "titleZh": "巴黎之春",
    "topic": "Travel Memories & Experiences",
    "topicZh": "巴黎之旅与经历",
    "grammar": "Have you ever been to...? / I have been to Paris",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "GEORGE",
        "text": "Have you ever been to Paris, Ken?",
        "translation": "肯，你去过巴黎吗？",
        "avatar": "👨"
      },
      {
        "speaker": "KEN",
        "text": "Yes, I have. I went there two years ago in the spring.",
        "translation": "是的，去过。我两年前春天去的。",
        "avatar": "👨"
      },
      {
        "speaker": "GEORGE",
        "text": "Did you enjoy it?",
        "translation": "玩得开心吗？",
        "avatar": "👨"
      },
      {
        "speaker": "KEN",
        "text": "Yes, it was wonderful. The city was beautiful and the food was delicious.",
        "translation": "是的，太美妙了。城市很美，食物非常可口。",
        "avatar": "👨"
      },
      {
        "speaker": "GEORGE",
        "text": "My wife and I are going there next month.",
        "translation": "我和妻子下个月打算去那里。",
        "avatar": "👨"
      },
      {
        "speaker": "KEN",
        "text": "You will love it! Don't forget to visit the Eiffel Tower and the Louvre.",
        "translation": "你们一定会喜欢的！别忘了参观埃菲尔铁塔和卢浮宫。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Have you ever been to Paris? Yes, I have.",
        "zh": "你去过巴黎吗？是的，去过。"
      },
      {
        "en": "I went there two years ago in the spring.",
        "zh": "我两年前春天去的。"
      },
      {
        "en": "The city was beautiful and the food was delicious.",
        "zh": "城市很美，食物非常可口。"
      },
      {
        "en": "My wife and I are going there next month.",
        "zh": "我和妻子下个月打算去那里。"
      },
      {
        "en": "Don't forget to visit the Eiffel Tower.",
        "zh": "别忘了参观埃菲尔铁塔。"
      }
    ],
    "words": [
      {
        "word": "Paris",
        "phonetic": "/ˈpærɪs/",
        "meaning": "n. 巴黎",
        "mcItem": "Banner",
        "mcItemIcon": "🗼",
        "sampleSentence": "Paris is romantic.",
        "sampleTranslation": "巴黎很浪漫。"
      },
      {
        "word": "ever",
        "phonetic": "/ˈevə/",
        "meaning": "adv. 曾经",
        "mcItem": "Clock",
        "mcItemIcon": "❔",
        "sampleSentence": "Have you ever seen it?",
        "sampleTranslation": "你曾经见过它吗？"
      },
      {
        "word": "delicious",
        "phonetic": "/dɪˈlɪʃəs/",
        "meaning": "adj. 可口的，美味的",
        "mcItem": "Cake",
        "mcItemIcon": "😋",
        "sampleSentence": "Delicious food.",
        "sampleTranslation": "美味的食物。"
      },
      {
        "word": "tower",
        "phonetic": "/ˈtaʊə/",
        "meaning": "n. 塔",
        "mcItem": "Cobblestone Wall",
        "mcItemIcon": "🗼",
        "sampleSentence": "The Eiffel Tower.",
        "sampleTranslation": "埃菲尔铁塔。"
      }
    ],
    "grammarNote": "Have you ever been to...? (你去过……吗？表示人生经历)。have been to (去过已回) vs. have gone to (去了未归)。"
  },
  "86": {
    "id": 86,
    "unit": 4,
    "title": "What have they done?",
    "titleZh": "他们做了什么？",
    "topic": "Present Perfect Affirmative",
    "topicZh": "完成动作与当前状态关联",
    "grammar": "Subject + have/has + past participle",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What has he done?",
        "translation": "他做了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "He has painted the door. It looks clean now.",
        "translation": "他把门刷了漆。现在看起来很干净。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What have they done?",
        "translation": "他们做了什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They have washed the car.",
        "translation": "他们洗了车。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "He has turned off the television.",
        "zh": "他已经关掉了电视。"
      },
      {
        "en": "She has boiled the water.",
        "zh": "她已经把水烧开了。"
      },
      {
        "en": "They have repaired the bridge.",
        "zh": "他们已经修好了桥梁。"
      },
      {
        "en": "I have already made the bed.",
        "zh": "我已经把床铺好了。"
      }
    ],
    "words": [],
    "grammarNote": "现在完成时强调过去动作对现在留下的结果或影响。"
  },
  "87": {
    "id": 87,
    "unit": 4,
    "title": "A car crash",
    "titleZh": "车祸",
    "topic": "Road Accidents & Eyewitness",
    "topicZh": "交通事故目击与叙述",
    "grammar": "Past Simple vs. Past Continuous / Did you see...?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "POLICEMAN",
        "text": "Did you see the accident, sir?",
        "translation": "先生，您看见这场事故了吗？",
        "avatar": "👮"
      },
      {
        "speaker": "MR. CROFT",
        "text": "Yes, officer. I was walking down the street when it happened.",
        "translation": "是的，警官。事故发生时我正顺着街道走。",
        "avatar": "👨"
      },
      {
        "speaker": "POLICEMAN",
        "text": "What happened exactly?",
        "translation": "具体发生了什么？",
        "avatar": "👮"
      },
      {
        "speaker": "MR. CROFT",
        "text": "A blue car was driving too fast. It ran into a lamp post at the corner.",
        "translation": "一辆蓝色小汽车开得太快了。它撞上了拐角处的路灯柱。",
        "avatar": "👨"
      },
      {
        "speaker": "POLICEMAN",
        "text": "Was anyone hurt?",
        "translation": "有人受伤吗？",
        "avatar": "👮"
      },
      {
        "speaker": "MR. CROFT",
        "text": "Fortunately, no one was badly injured. The driver was shaken, but he is okay.",
        "translation": "幸运的是，没有人受重伤。司机受了惊吓，但他没大碍。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Did you see the accident, sir? Yes, officer.",
        "zh": "先生，您看见这场事故了吗？是的，警官。"
      },
      {
        "en": "I was walking down the street when it happened.",
        "zh": "事故发生时我正顺着街道走。"
      },
      {
        "en": "A blue car was driving too fast. It ran into a lamp post.",
        "zh": "一辆蓝色小车开得太快。它撞到了路灯柱上。"
      },
      {
        "en": "Fortunately, no one was badly injured.",
        "zh": "幸运的是，没有人受重伤。"
      }
    ],
    "words": [
      {
        "word": "crash",
        "phonetic": "/kræʃ/",
        "meaning": "n. & v. 碰撞，撞击",
        "mcItem": "TNT",
        "mcItemIcon": "💥",
        "sampleSentence": "A car crash.",
        "sampleTranslation": "车祸。"
      },
      {
        "word": "accident",
        "phonetic": "/ˈæksɪdənt/",
        "meaning": "n. 事故，意外",
        "mcItem": "Barrier",
        "mcItemIcon": "⚠️",
        "sampleSentence": "A traffic accident.",
        "sampleTranslation": "交通事故。"
      },
      {
        "word": "officer",
        "phonetic": "/ˈɒfɪsə/",
        "meaning": "n. 警官，官员",
        "mcItem": "Iron Helmet",
        "mcItemIcon": "👮",
        "sampleSentence": "Yes, officer.",
        "sampleTranslation": "是的，警官。"
      },
      {
        "word": "happen",
        "phonetic": "/ˈhæpən/",
        "meaning": "v. 发生",
        "mcItem": "Clock",
        "mcItemIcon": "⚡",
        "sampleSentence": "What happened?",
        "sampleTranslation": "发生什么了？"
      },
      {
        "word": "post",
        "phonetic": "/pəʊst/",
        "meaning": "n. 柱子，标杆",
        "mcItem": "Fence",
        "mcItemIcon": "💈",
        "sampleSentence": "A lamp post.",
        "sampleTranslation": "路灯柱。"
      },
      {
        "word": "corner",
        "phonetic": "/ˈkɔːnə/",
        "meaning": "n. 拐角，角落",
        "mcItem": "Cobblestone",
        "mcItemIcon": "📐",
        "sampleSentence": "At the corner.",
        "sampleTranslation": "在拐角处。"
      }
    ],
    "grammarNote": "过去进行时 (was/were + doing) 与 一般过去时 (did) 的组合运用：主句用进行时表示背景动作，when 从句用一般过去时表示突发事件。"
  },
  "88": {
    "id": 88,
    "unit": 4,
    "title": "Have you ... yet?",
    "titleZh": "你已经……了吗？",
    "topic": "Inquiries with 'yet' and 'already'",
    "topicZh": "现在完成时 yet 与 already 问答",
    "grammar": "Have you ... yet? / Yes, I have already... / No, not yet.",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Have you seen the doctor yet?",
        "translation": "你去看医生了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I have already seen him.",
        "translation": "是的，我已经看过了。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Have they repaired the car yet?",
        "translation": "他们修好车了吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, they haven't repaired it yet.",
        "translation": "还没，他们还没修好呢。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Have you posted the letter yet?",
        "zh": "你把信寄出去了吗？"
      },
      {
        "en": "I haven't written the report yet.",
        "zh": "我还没写好报告。"
      },
      {
        "en": "She has already bought the groceries.",
        "zh": "她已经买好了食品杂货。"
      },
      {
        "en": "They haven't called the police yet.",
        "zh": "他们还没有报警。"
      }
    ],
    "words": [],
    "grammarNote": "yet 用于疑问句（表示“已经……了吗”）和否定句（表示“还未”）；already 用于肯定句。"
  },
  "89": {
    "id": 89,
    "unit": 4,
    "title": "For sale",
    "titleZh": "待售",
    "topic": "Real Estate & House Viewing",
    "topicZh": "房屋租售与看房",
    "grammar": "How long have you lived here? / for + 时间段",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "BUYER",
        "text": "Good afternoon. I believe this house is for sale.",
        "translation": "下午好。我想这所房子是待售的吧。",
        "avatar": "👨"
      },
      {
        "speaker": "OWNER",
        "text": "Yes, that's right. Come in, please.",
        "translation": "是的，没错。请进吧。",
        "avatar": "👩"
      },
      {
        "speaker": "BUYER",
        "text": "How long have you lived here?",
        "translation": "您在这里住了多久了？",
        "avatar": "👨"
      },
      {
        "speaker": "OWNER",
        "text": "I've lived here for twenty years, since 1985.",
        "translation": "我在这里住了二十年了，从1985年起。",
        "avatar": "👩"
      },
      {
        "speaker": "BUYER",
        "text": "Why do you want to sell it?",
        "translation": "您为什么要卖掉它呢？",
        "avatar": "👨"
      },
      {
        "speaker": "OWNER",
        "text": "Because my children have grown up and left home. The house is too big for me now.",
        "translation": "因为我的孩子们都长大了，离开了家。现在这房子对我来说太大了。",
        "avatar": "👩"
      }
    ],
    "sentences": [
      {
        "en": "I believe this house is for sale. Come in, please.",
        "zh": "我想这所房子是待售的。请进吧。"
      },
      {
        "en": "How long have you lived here? I've lived here for twenty years.",
        "zh": "您在这里住了多久了？我在这里住了二十年。"
      },
      {
        "en": "I have lived here since 1985.",
        "zh": "我从1985年起就住在这里。"
      },
      {
        "en": "The house is too big for me now.",
        "zh": "现在这房子对我来说太大了。"
      }
    ],
    "words": [
      {
        "word": "sale",
        "phonetic": "/seɪl/",
        "meaning": "n. 卖，出售",
        "mcItem": "Emerald",
        "mcItemIcon": "🏷️",
        "sampleSentence": "For sale.",
        "sampleTranslation": "待售。"
      },
      {
        "word": "since",
        "phonetic": "/sɪns/",
        "meaning": "prep. & conj. 自从",
        "mcItem": "Clock",
        "mcItemIcon": "📅",
        "sampleSentence": "Since 1985.",
        "sampleTranslation": "自从1985年以来。"
      },
      {
        "word": "grow",
        "phonetic": "/ɡrəʊ/",
        "meaning": "v. 生长，成长 (past: grew, pp: grown)",
        "mcItem": "Wheat",
        "mcItemIcon": "🌱",
        "sampleSentence": "Grow up.",
        "sampleTranslation": "长大。"
      },
      {
        "word": "sell",
        "phonetic": "/sel/",
        "meaning": "v. 卖 (past: sold)",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "💰",
        "sampleSentence": "Sell the house.",
        "sampleTranslation": "卖房子。"
      }
    ],
    "grammarNote": "现在完成时与延续性时间状语：for + 时间段 (for twenty years), since + 时间点 (since 1985)。How long have you lived here? 询问延续时间。"
  },
  "90": {
    "id": 90,
    "unit": 4,
    "title": "Have you ever ...?",
    "titleZh": "你曾经……过吗？",
    "topic": "Life Experiences & Past Participles",
    "topicZh": "经历经验与不规则动词过去分词",
    "grammar": "Have you ever + past participle? / I have never...",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "Have you ever flown in an aeroplane?",
        "translation": "你曾经坐过飞机吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "Yes, I have flown many times.",
        "translation": "是的，我坐过很多次。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "Have you ever seen a ghost?",
        "translation": "你曾经见过鬼吗？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "No, I have never seen one!",
        "translation": "不，我从来没见过！",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Have you ever eaten Japanese food?",
        "zh": "你吃过日本料理吗？"
      },
      {
        "en": "I have never driven a sports car.",
        "zh": "我从来没有开过跑车。"
      },
      {
        "en": "She has visited five European countries.",
        "zh": "她已经访问了五个欧洲国家。"
      },
      {
        "en": "Have you ever read this novel?",
        "zh": "你读过这本小说吗？"
      }
    ],
    "words": [
      {
        "word": "never",
        "phonetic": "/ˈnevə/",
        "meaning": "adv. 从未",
        "mcItem": "Barrier",
        "mcItemIcon": "⛔",
        "sampleSentence": "I have never been there.",
        "sampleTranslation": "我从未去过那里。"
      }
    ],
    "grammarNote": "ever (曾经 - 用于疑问句), never (从未 - 带有否定意义用于肯定句型)。"
  },
  "91": {
    "id": 91,
    "unit": 4,
    "title": "Poor Ian!",
    "titleZh": "可怜的伊恩！",
    "topic": "Injuries & Sympathy",
    "topicZh": "身体骨折受伤与慰问",
    "grammar": "Future with will / won't & Simple Past (broke, fell)",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "JENNY",
        "text": "Have you heard the news about Ian?",
        "translation": "你听到关于伊恩的消息了吗？",
        "avatar": "👧"
      },
      {
        "speaker": "MARK",
        "text": "No, what happened?",
        "translation": "没有，发生什么事了？",
        "avatar": "👦"
      },
      {
        "speaker": "JENNY",
        "text": "He fell out of a tree yesterday and broke his right leg.",
        "translation": "他昨天从树上摔下来，摔断了右腿。",
        "avatar": "👧"
      },
      {
        "speaker": "MARK",
        "text": "Oh dear! Poor Ian! Is he in hospital?",
        "translation": "天哪！可怜的伊恩！他在医院吗？",
        "avatar": "👦"
      },
      {
        "speaker": "JENNY",
        "text": "Yes, he is. The doctor said he will have to stay in bed for six weeks.",
        "translation": "是的。医生说他得在床上躺六个星期。",
        "avatar": "👧"
      },
      {
        "speaker": "MARK",
        "text": "He won't be able to play football with us this term.",
        "translation": "这个学期他不能和我们一起踢足球了。",
        "avatar": "👦"
      },
      {
        "speaker": "JENNY",
        "text": "No, he won't. Let's go and visit him this evening.",
        "translation": "是的，不能了。我们今晚去看看他吧。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "Have you heard the news about Ian? No, what happened?",
        "zh": "你听到关于伊恩的消息了吗？没有，发生什么事了？"
      },
      {
        "en": "He fell out of a tree yesterday and broke his right leg.",
        "zh": "他昨天从树上摔下来，摔断了右腿。"
      },
      {
        "en": "He will have to stay in bed for six weeks.",
        "zh": "他将不得不卧床六周。"
      },
      {
        "en": "He won't be able to play football with us this term.",
        "zh": "这个学期他将无法和我们一起踢足球了。"
      },
      {
        "en": "Let's go and visit him this evening.",
        "zh": "我们今晚去探望他吧。"
      }
    ],
    "words": [
      {
        "word": "poor",
        "phonetic": "/pɔː/",
        "meaning": "adj. 可怜的，贫穷的",
        "mcItem": "Heart",
        "mcItemIcon": "🥺",
        "sampleSentence": "Poor boy!",
        "sampleTranslation": "可怜的孩子！"
      },
      {
        "word": "fall",
        "phonetic": "/fɔːl/",
        "meaning": "v. 落下，掉下 (past: fell)",
        "mcItem": "Feather",
        "mcItemIcon": "🍂",
        "sampleSentence": "Fall off a bike.",
        "sampleTranslation": "从自行车上摔下来。"
      },
      {
        "word": "break",
        "phonetic": "/breɪk/",
        "meaning": "v. 折断，打破 (past: broke)",
        "mcItem": "Stick",
        "mcItemIcon": "🦴",
        "sampleSentence": "Break a leg.",
        "sampleTranslation": "摔断腿。"
      },
      {
        "word": "hospital",
        "phonetic": "/ˈhɒspɪtl/",
        "meaning": "n. 医院",
        "mcItem": "Red Bed",
        "mcItemIcon": "🏥",
        "sampleSentence": "In hospital.",
        "sampleTranslation": "在住院。"
      },
      {
        "word": "will",
        "phonetic": "/wɪl/",
        "meaning": "modal v. 将，会",
        "mcItem": "Clock",
        "mcItemIcon": "🔮",
        "sampleSentence": "He will come tomorrow.",
        "sampleTranslation": "他明天会来。"
      }
    ],
    "grammarNote": "一般将来时 will / won't (will not) + 动词原形。will have to (将不得不), won't be able to (将无法)。"
  },
  "92": {
    "id": 92,
    "unit": 4,
    "title": "When will you ...?",
    "titleZh": "你什么时候……？",
    "topic": "Future Time with will",
    "topicZh": "将来时间表达与动词原形",
    "grammar": "When will you...? / I will ... tomorrow / next week",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When will you return the book?",
        "translation": "你什么时候还书？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "I'll return it tomorrow morning.",
        "translation": "我明天早晨还。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When will they arrive in New York?",
        "translation": "他们什么时候到达纽约？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "They'll arrive next Friday.",
        "translation": "他们下周五到。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "I will call you tomorrow.",
        "zh": "我明天给你打电话。"
      },
      {
        "en": "He will finish the project next month.",
        "zh": "他下个月将完成该项目。"
      },
      {
        "en": "She won't come to the party tonight.",
        "zh": "她今晚不会来参加聚会。"
      },
      {
        "en": "We will travel to Japan next year.",
        "zh": "我们明年将去日本旅行。"
      }
    ],
    "words": [
      {
        "word": "tomorrow",
        "phonetic": "/təˈmɒrəʊ/",
        "meaning": "adv. & n. 明天",
        "mcItem": "Clock",
        "mcItemIcon": "⏩",
        "sampleSentence": "See you tomorrow.",
        "sampleTranslation": "明天见。"
      },
      {
        "word": "next",
        "phonetic": "/nekst/",
        "meaning": "adj. 下一个的",
        "mcItem": "Compass",
        "mcItemIcon": "⏭️",
        "sampleSentence": "Next week.",
        "sampleTranslation": "下周。"
      }
    ],
    "grammarNote": "一般将来时标志词：tomorrow, next week/month/year, in the future, soon。"
  },
  "93": {
    "id": 93,
    "unit": 4,
    "title": "Our new neighbour",
    "titleZh": "我们的新邻居",
    "topic": "Meeting Neighbours & Career",
    "topicZh": "结识邻里与职业发展",
    "grammar": "Has he met...? / He worked in... before he moved here",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "NIGEL",
        "text": "Hello, Mrs. Croft. Have you met our new neighbour yet?",
        "translation": "你好，克罗夫特太太。你见过我们的新邻居了吗？",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. CROFT",
        "text": "No, I haven't. Who is he?",
        "translation": "还没有。他是谁呀？",
        "avatar": "👩"
      },
      {
        "speaker": "NIGEL",
        "text": "His name is Paul Baker. He's a pilot.",
        "translation": "他叫保罗·贝克。他是一名飞行员。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. CROFT",
        "text": "A pilot! That sounds like an exciting job. Where did he work before?",
        "translation": "飞行员！听起来是个令人激动的职业。他以前在哪里工作？",
        "avatar": "👩"
      },
      {
        "speaker": "NIGEL",
        "text": "He worked for British Airways. He has flown all over the world.",
        "translation": "他以前为英国航空公司工作。他飞遍了全世界。",
        "avatar": "👨"
      },
      {
        "speaker": "MRS. CROFT",
        "text": "How long will he stay here?",
        "translation": "他打算在这里住多久？",
        "avatar": "👩"
      },
      {
        "speaker": "NIGEL",
        "text": "He says he will live here for at least two years.",
        "translation": "他说他至少会在这里住两年。",
        "avatar": "👨"
      }
    ],
    "sentences": [
      {
        "en": "Have you met our new neighbour yet? No, I haven't.",
        "zh": "你见过我们的新邻居了吗？还没有。"
      },
      {
        "en": "His name is Paul Baker. He's a pilot.",
        "zh": "他叫保罗·贝克。他是一名飞行员。"
      },
      {
        "en": "He worked for British Airways. He has flown all over the world.",
        "zh": "他以前为英国航空公司工作。他飞遍了全世界。"
      },
      {
        "en": "How long will he stay here? For at least two years.",
        "zh": "他打算在这里住多久？至少两年。"
      }
    ],
    "words": [
      {
        "word": "neighbour",
        "phonetic": "/ˈneɪbə/",
        "meaning": "n. 邻居",
        "mcItem": "Player Head",
        "mcItemIcon": "🏡",
        "sampleSentence": "A friendly neighbour.",
        "sampleTranslation": "友好的邻居。"
      },
      {
        "word": "pilot",
        "phonetic": "/ˈpaɪlət/",
        "meaning": "n. 飞行员",
        "mcItem": "Elytra",
        "mcItemIcon": "👨‍✈️",
        "sampleSentence": "He is an airline pilot.",
        "sampleTranslation": "他是一名民航飞行员。"
      },
      {
        "word": "world",
        "phonetic": "/wɜːld/",
        "meaning": "n. 世界",
        "mcItem": "Globe",
        "mcItemIcon": "🌍",
        "sampleSentence": "All over the world.",
        "sampleTranslation": "全世界。"
      },
      {
        "word": "least",
        "phonetic": "/liːst/",
        "meaning": "adj. & adv. 最少",
        "mcItem": "Gold Nugget",
        "mcItemIcon": "📉",
        "sampleSentence": "At least two days.",
        "sampleTranslation": "至少两天。"
      }
    ],
    "grammarNote": "all over the world (全世界); at least (至少)。fly-flew-flown (不规则变化)。"
  },
  "94": {
    "id": 94,
    "unit": 4,
    "title": "When will ...?",
    "titleZh": "什么时候……？",
    "topic": "Future Queries",
    "topicZh": "将来计划提问与答复",
    "grammar": "When will you/he/they...? / ... will ... tomorrow / next week",
    "difficulty": "easy",
    "dialogue": [
      {
        "speaker": "A",
        "text": "When will the train arrive?",
        "translation": "火车什么时候到达？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It will arrive in ten minutes.",
        "translation": "十分钟后到达。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "When will the meeting begin?",
        "translation": "会议什么时候开始？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "It will begin at nine o'clock tomorrow.",
        "translation": "明天上午9点开始。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "The train will arrive at platform 3 in ten minutes.",
        "zh": "列车将在10分钟后到达3号站台。"
      },
      {
        "en": "We will leave for Shanghai next Monday.",
        "zh": "我们下周一出发前往上海。"
      },
      {
        "en": "She will be back soon.",
        "zh": "她很快就会回来的。"
      }
    ],
    "words": [],
    "grammarNote": "in + 时间段 表示“在……之后”(常用于将来时)：in ten minutes (10分钟后), in three days (3天后)。"
  },
  "95": {
    "id": 95,
    "unit": 4,
    "title": "Tickets, please.",
    "titleZh": "请出示车票。",
    "topic": "Train Travel & Buying Tickets",
    "topicZh": "火车购票与乘车",
    "grammar": "Single or return? / How much is it? / Which platform?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "PASSENGER",
        "text": "Two tickets to London, please.",
        "translation": "请给我两张去伦敦的票。",
        "avatar": "👨"
      },
      {
        "speaker": "CLERK",
        "text": "Single or return, sir?",
        "translation": "单程还是往返，先生？",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "PASSENGER",
        "text": "Return, please. We're coming back tonight.",
        "translation": "往返票。我们今晚回来。",
        "avatar": "👨"
      },
      {
        "speaker": "CLERK",
        "text": "That's twenty-four pounds, please.",
        "translation": "一共24英镑。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "PASSENGER",
        "text": "Here is thirty pounds.",
        "translation": "给你30英镑。",
        "avatar": "👨"
      },
      {
        "speaker": "CLERK",
        "text": "And six pounds change. Thank you.",
        "translation": "找您6英镑。谢谢。",
        "avatar": "👨‍💼"
      },
      {
        "speaker": "PASSENGER",
        "text": "Which platform does the next train leave from?",
        "translation": "下一班列车在哪个站台发车？",
        "avatar": "👨"
      },
      {
        "speaker": "CLERK",
        "text": "Platform four. It leaves at ten twenty.",
        "translation": "4号站台。10点20分发车。",
        "avatar": "👨‍💼"
      }
    ],
    "sentences": [
      {
        "en": "Two tickets to London, please. Single or return?",
        "zh": "两张去伦敦的票。单程还是往返？"
      },
      {
        "en": "Return, please. We're coming back tonight.",
        "zh": "往返票。我们今晚回来。"
      },
      {
        "en": "That's twenty-four pounds, please. And six pounds change.",
        "zh": "一共24英镑。找您6英镑。"
      },
      {
        "en": "Which platform does the next train leave from? Platform four.",
        "zh": "下一班列车在哪个站台发车？4号站台。"
      }
    ],
    "words": [
      {
        "word": "ticket",
        "phonetic": "/ˈtɪkɪt/",
        "meaning": "n. 票",
        "mcItem": "Paper",
        "mcItemIcon": "🎫",
        "sampleSentence": "Train ticket.",
        "sampleTranslation": "火车票。"
      },
      {
        "word": "single",
        "phonetic": "/ˈsɪŋɡl/",
        "meaning": "adj. & n. 单程的；单程票",
        "mcItem": "Arrow",
        "mcItemIcon": "➡️",
        "sampleSentence": "A single ticket.",
        "sampleTranslation": "单程票。"
      },
      {
        "word": "return",
        "phonetic": "/rɪˈtɜːn/",
        "meaning": "adj. & n. 往返的；往返票",
        "mcItem": "Repeater",
        "mcItemIcon": "🔁",
        "sampleSentence": "A return ticket.",
        "sampleTranslation": "往返票。"
      },
      {
        "word": "pound",
        "phonetic": "/paʊnd/",
        "meaning": "n. 英镑",
        "mcItem": "Gold Ingot",
        "mcItemIcon": "💷",
        "sampleSentence": "Ten pounds.",
        "sampleTranslation": "10英镑。"
      },
      {
        "word": "change",
        "phonetic": "/tʃeɪndʒ/",
        "meaning": "n. 零钱，找零",
        "mcItem": "Iron Nugget",
        "mcItemIcon": "🪙",
        "sampleSentence": "Here is your change.",
        "sampleTranslation": "这是找您的零钱。"
      },
      {
        "word": "platform",
        "phonetic": "/ˈplætfɔːm/",
        "meaning": "n. 站台，月台",
        "mcItem": "Smooth Stone",
        "mcItemIcon": "🚉",
        "sampleSentence": "Platform four.",
        "sampleTranslation": "4号站台。"
      }
    ],
    "grammarNote": "火车站买票常用语：Single or return? (单程还是双程？), change (找回的零钱), Which platform...? (哪个站台？)。"
  },
  "96": {
    "id": 96,
    "unit": 4,
    "title": "What will you do?",
    "titleZh": "你会做什么？",
    "topic": "Conditional Future Actions",
    "topicZh": "将来条件句与打算",
    "grammar": "If it rains, I will... / What will you do if...?",
    "difficulty": "medium",
    "dialogue": [
      {
        "speaker": "A",
        "text": "What will you do if it rains tomorrow?",
        "translation": "如果明天下雨你做什么？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "If it rains, I will stay at home and read.",
        "translation": "如果下雨，我就会呆在家里看书。",
        "avatar": "👧"
      },
      {
        "speaker": "A",
        "text": "What will you do if you miss the train?",
        "translation": "如果你错过了火车你怎么办？",
        "avatar": "👦"
      },
      {
        "speaker": "B",
        "text": "If I miss the train, I'll take the next one.",
        "translation": "如果错过火车，我就乘下一班。",
        "avatar": "👧"
      }
    ],
    "sentences": [
      {
        "en": "If it rains tomorrow, I'll stay at home.",
        "zh": "如果明天下雨，我将呆在家里。"
      },
      {
        "en": "If he comes, I will tell him the news.",
        "zh": "如果他来，我将把消息告诉他。"
      },
      {
        "en": "If you study hard, you will pass the exam.",
        "zh": "如果你努力学习，你就会通过考试。"
      },
      {
        "en": "If we hurry, we will catch the bus.",
        "zh": "如果我们赶快，我们就会赶上公交车。"
      }
    ],
    "words": [
      {
        "word": "if",
        "phonetic": "/ɪf/",
        "meaning": "conj. 如果",
        "mcItem": "Redstone",
        "mcItemIcon": "🔀",
        "sampleSentence": "If you are ready.",
        "sampleTranslation": "如果你准备好了。"
      }
    ],
    "grammarNote": "真实条件状语从句主将从现原则：主句用一般将来时 (will + do)，if 从句用一般现在时 (rains, comes)。"
  }
};
