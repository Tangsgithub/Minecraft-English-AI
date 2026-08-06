import { VocabItem } from '../types';

export interface NCEVocabEntry {
  lessonId: number;
  word: string;
  phonetic: string;
  meaning: string;
  mcItem: string;
  mcItemIcon: string;
  sampleSentence: string;
  sampleTranslation: string;
}

export const NCE_BOOK1_FULL_VOCAB: NCEVocabEntry[] = [
  {
    "word": "excuse",
    "phonetic": "/ɪkˈskjuːz/",
    "meaning": "动词：原谅；包涵",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Excuse me, is this your handbag?",
    "sampleTranslation": "打扰一下，这是您的手提包吗？",
    "lessonId": 1
  },
  {
    "word": "pardon",
    "phonetic": "/ˈpɑː.dən/",
    "meaning": "感叹词：请再说一遍",
    "mcItem": "Repeater",
    "mcItemIcon": "🔁",
    "sampleSentence": "Pardon? Could you repeat that please?",
    "sampleTranslation": "什么？您能再说一遍吗？",
    "lessonId": 2
  },
  {
    "word": "handbag",
    "phonetic": "/ˈhænd.bæɡ/",
    "meaning": "名词：手提包",
    "mcItem": "Chest",
    "mcItemIcon": "👝",
    "sampleSentence": "She left her handbag on the craft table.",
    "sampleTranslation": "她把手提包忘在了合成台上。",
    "lessonId": 3
  },
  {
    "word": "sir",
    "phonetic": "/sɜːr/",
    "meaning": "名词：先生（尊称）",
    "mcItem": "Iron Helmet",
    "mcItemIcon": "🎩",
    "sampleSentence": "Yes, sir, here is your iron sword.",
    "sampleTranslation": "是的先生，这是您的铁剑。",
    "lessonId": 4
  },
  {
    "word": "thank",
    "phonetic": "/θæŋk/",
    "meaning": "动词：感谢",
    "mcItem": "Emerald",
    "mcItemIcon": "💚",
    "sampleSentence": "Thank you very much for your help!",
    "sampleTranslation": "非常感谢你的帮助！",
    "lessonId": 5
  },
  {
    "word": "pen",
    "phonetic": "/pen/",
    "meaning": "名词：钢笔",
    "mcItem": "Feather",
    "mcItemIcon": "🖊️",
    "sampleSentence": "Is this your red pen on the desk?",
    "sampleTranslation": "桌上这是你的红钢笔吗？",
    "lessonId": 6
  },
  {
    "word": "pencil",
    "phonetic": "/ˈpen.səl/",
    "meaning": "名词：铅笔",
    "mcItem": "Stick",
    "mcItemIcon": "✏️",
    "sampleSentence": "Draw a Minecraft map with a pencil.",
    "sampleTranslation": "用铅笔画一张我的世界地图。",
    "lessonId": 7
  },
  {
    "word": "book",
    "phonetic": "/bʊk/",
    "meaning": "名词：书本",
    "mcItem": "Enchanted Book",
    "mcItemIcon": "📖",
    "sampleSentence": "Open your English book to Lesson 2.",
    "sampleTranslation": "打开你的英语书到第2课。",
    "lessonId": 8
  },
  {
    "word": "watch",
    "phonetic": "/wɒtʃ/",
    "meaning": "名词：手表；动词：观看",
    "mcItem": "Clock",
    "mcItemIcon": "⌚",
    "sampleSentence": "My gold watch keeps accurate time.",
    "sampleTranslation": "我的金手表走时很准。",
    "lessonId": 9
  },
  {
    "word": "coat",
    "phonetic": "/kəʊt/",
    "meaning": "名词：外套；大衣",
    "mcItem": "Leather Armor",
    "mcItemIcon": "🧥",
    "sampleSentence": "Wear a thick coat in the snowy biome.",
    "sampleTranslation": "在雪地生物群系要穿厚外套。",
    "lessonId": 10
  },
  {
    "word": "umbrella",
    "phonetic": "/ʌmˈbrel.ə/",
    "meaning": "名词：雨伞",
    "mcItem": "Shield",
    "mcItemIcon": "☂️",
    "sampleSentence": "Take an umbrella when it rains.",
    "sampleTranslation": "下雨时带一把伞。",
    "lessonId": 11
  },
  {
    "word": "ticket",
    "phonetic": "/ˈtɪk.ɪt/",
    "meaning": "名词：票；门票",
    "mcItem": "Paper",
    "mcItemIcon": "🎟️",
    "sampleSentence": "Show your ticket at the entrance.",
    "sampleTranslation": "在入口处出示门票。",
    "lessonId": 12
  },
  {
    "word": "number",
    "phonetic": "/ˈnʌm.bə/",
    "meaning": "名词：号码；数字",
    "mcItem": "Compass",
    "mcItemIcon": "🔢",
    "sampleSentence": "My coat check number is 5.",
    "sampleTranslation": "我的存衣牌号码是5号。",
    "lessonId": 13
  },
  {
    "word": "cloakroom",
    "phonetic": "/ˈkləʊk.ruːm/",
    "meaning": "名词：衣帽间",
    "mcItem": "Chest",
    "mcItemIcon": "🚪",
    "sampleSentence": "Leave your hat in the cloakroom.",
    "sampleTranslation": "把帽子留在衣帽间。",
    "lessonId": 14
  },
  {
    "word": "please",
    "phonetic": "/pliːz/",
    "meaning": "副词：请（礼貌用语）",
    "mcItem": "Emerald",
    "mcItemIcon": "🙏",
    "sampleSentence": "May I have my coat, please?",
    "sampleTranslation": "请把我的外套拿给我好吗？",
    "lessonId": 15
  },
  {
    "word": "suit",
    "phonetic": "/suːt/",
    "meaning": "名词：西装；一套衣服",
    "mcItem": "Diamond Armor",
    "mcItemIcon": "👔",
    "sampleSentence": "Steve wears a smart suit today.",
    "sampleTranslation": "史蒂夫今天穿着一身帅气的西装。",
    "lessonId": 16
  },
  {
    "word": "schoolbag",
    "phonetic": "/ˈskuːl.bæɡ/",
    "meaning": "名词：书包",
    "mcItem": "Chest",
    "mcItemIcon": "🎒",
    "sampleSentence": "Put your books into the schoolbag.",
    "sampleTranslation": "把你的书本装进书包里。",
    "lessonId": 17
  },
  {
    "word": "car",
    "phonetic": "/kɑːr/",
    "meaning": "名词：汽车",
    "mcItem": "Minecart",
    "mcItemIcon": "🚗",
    "sampleSentence": "Drive the blue car across plains.",
    "sampleTranslation": "开着蓝色的汽车驶过平原。",
    "lessonId": 18
  },
  {
    "word": "house",
    "phonetic": "/haʊs/",
    "meaning": "名词：房屋；房子",
    "mcItem": "Oak Planks",
    "mcItemIcon": "🏠",
    "sampleSentence": "They built a stone house by the river.",
    "sampleTranslation": "他们在河边盖了一间石屋。",
    "lessonId": 19
  },
  {
    "word": "dress",
    "phonetic": "/dres/",
    "meaning": "名词：连衣裙",
    "mcItem": "Leather Coat",
    "mcItemIcon": "👗",
    "sampleSentence": "Alex wears a bright green dress.",
    "sampleTranslation": "亚历克斯穿着一条亮绿色的连衣裙。",
    "lessonId": 20
  },
  {
    "word": "friend",
    "phonetic": "/frend/",
    "meaning": "名词：朋友",
    "mcItem": "Player Head",
    "mcItemIcon": "🤝",
    "sampleSentence": "Alex is my good friend in Minecraft.",
    "sampleTranslation": "亚历克斯是我在我的世界里的好朋友。",
    "lessonId": 21
  },
  {
    "word": "teacher",
    "phonetic": "/ˈtiː.tʃər/",
    "meaning": "名词：老师",
    "mcItem": "Book",
    "mcItemIcon": "👩‍🏫",
    "sampleSentence": "Mr. Smith is our English teacher.",
    "sampleTranslation": "史密斯先生是我们的英语老师。",
    "lessonId": 22
  },
  {
    "word": "student",
    "phonetic": "/ˈstjuː.dənt/",
    "meaning": "名词：学生",
    "mcItem": "Experience Bottle",
    "mcItemIcon": "🎓",
    "sampleSentence": "I am an active student in this class.",
    "sampleTranslation": "我是这堂课上一名积极的学生。",
    "lessonId": 23
  },
  {
    "word": "glad",
    "phonetic": "/ɡlæd/",
    "meaning": "形容词：高兴的",
    "mcItem": "Emerald",
    "mcItemIcon": "😃",
    "sampleSentence": "I am very glad to meet you!",
    "sampleTranslation": "很高兴见到你！",
    "lessonId": 24
  },
  {
    "word": "meet",
    "phonetic": "/miːt/",
    "meaning": "动词：遇见；结识",
    "mcItem": "Map",
    "mcItemIcon": "👋",
    "sampleSentence": "Nice to meet you in the village.",
    "sampleTranslation": "很高兴在村庄里与你相遇。",
    "lessonId": 25
  },
  {
    "word": "brand",
    "phonetic": "/brænd/",
    "meaning": "名词：品牌；商标",
    "mcItem": "Name Tag",
    "mcItemIcon": "🏷️",
    "sampleSentence": "What brand is your luxury car?",
    "sampleTranslation": "你的豪车是什么品牌的？",
    "lessonId": 26
  },
  {
    "word": "Swedish",
    "phonetic": "/ˈswiː.dɪʃ/",
    "meaning": "形容词：瑞典的",
    "mcItem": "Banner",
    "mcItemIcon": "🇸🇪",
    "sampleSentence": "Minecraft was created by a Swedish team.",
    "sampleTranslation": "我的世界是由一支瑞典团队创制的。",
    "lessonId": 27
  },
  {
    "word": "French",
    "phonetic": "/frentʃ/",
    "meaning": "形容词：法国的；法语",
    "mcItem": "Banner",
    "mcItemIcon": "🇫🇷",
    "sampleSentence": "Peugeot is a famous French car.",
    "sampleTranslation": "标致是著名的法国汽车。",
    "lessonId": 28
  },
  {
    "word": "German",
    "phonetic": "/ˈdʒɜː.mən/",
    "meaning": "形容词：德国的；德语",
    "mcItem": "Banner",
    "mcItemIcon": "🇩🇪",
    "sampleSentence": "Mercedes is a premium German vehicle.",
    "sampleTranslation": "奔驰是一款高端德国汽车。",
    "lessonId": 29
  },
  {
    "word": "Japanese",
    "phonetic": "/ˌdʒæp.ənˈiːz/",
    "meaning": "形容词：日本的",
    "mcItem": "Banner",
    "mcItemIcon": "🇯🇵",
    "sampleSentence": "Toyota is a very reliable Japanese car.",
    "sampleTranslation": "丰田是一款非常可靠的日本汽车。",
    "lessonId": 30
  },
  {
    "word": "engineer",
    "phonetic": "/ˌen.dʒɪˈnɪər/",
    "meaning": "名词：工程师",
    "mcItem": "Redstone Dust",
    "mcItemIcon": "👷",
    "sampleSentence": "A redstone engineer designs automatic doors.",
    "sampleTranslation": "红石工程师设计自动门。",
    "lessonId": 31
  },
  {
    "word": "doctor",
    "phonetic": "/ˈdɒk.tər/",
    "meaning": "名词：医生",
    "mcItem": "Golden Apple",
    "mcItemIcon": "👨‍⚕️",
    "sampleSentence": "The village doctor heals wounded miners.",
    "sampleTranslation": "村庄医生救治受伤的矿工。",
    "lessonId": 32
  },
  {
    "word": "nurse",
    "phonetic": "/nɜːs/",
    "meaning": "名词：护士",
    "mcItem": "Potion",
    "mcItemIcon": "👩‍⚕️",
    "sampleSentence": "The nurse brings healing potions to us.",
    "sampleTranslation": "护士为我们带来了治疗药水。",
    "lessonId": 33
  },
  {
    "word": "milkman",
    "phonetic": "/ˈmɪlk.mæn/",
    "meaning": "名词：送奶人",
    "mcItem": "Milk Bucket",
    "mcItemIcon": "🥛",
    "sampleSentence": "The milkman delivers fresh milk every morning.",
    "sampleTranslation": "送奶工每天早晨送来鲜牛奶。",
    "lessonId": 34
  },
  {
    "word": "mechanic",
    "phonetic": "/mɪˈkæn.ɪk/",
    "meaning": "名词：机械师；技工",
    "mcItem": "Anvil",
    "mcItemIcon": "🔧",
    "sampleSentence": "The mechanic fixes minecarts efficiently.",
    "sampleTranslation": "机械师高效地修理矿车。",
    "lessonId": 35
  },
  {
    "word": "job",
    "phonetic": "/dʒɒb/",
    "meaning": "名词：工作；职业",
    "mcItem": "Workstation",
    "mcItemIcon": "💼",
    "sampleSentence": "What is your current job in the city?",
    "sampleTranslation": "你在城里目前从事什么工作？",
    "lessonId": 36
  },
  {
    "word": "office",
    "phonetic": "/ˈɒf.ɪs/",
    "meaning": "名词：办公室",
    "mcItem": "Lectern",
    "mcItemIcon": "🏢",
    "sampleSentence": "Our office is on the third floor.",
    "sampleTranslation": "我们的办公室在三楼。",
    "lessonId": 37
  },
  {
    "word": "company",
    "phonetic": "/ˈkʌm.pə.ni/",
    "meaning": "名词：公司",
    "mcItem": "Emerald Block",
    "mcItemIcon": "🏭",
    "sampleSentence": "He works for an international company.",
    "sampleTranslation": "他在一家国际公司工作。",
    "lessonId": 38
  },
  {
    "word": "assistant",
    "phonetic": "/əˈsɪs.tənt/",
    "meaning": "名词：助手；助理",
    "mcItem": "Book",
    "mcItemIcon": "🧑‍💼",
    "sampleSentence": "The assistant typed all letters quickly.",
    "sampleTranslation": "助手快速打好了所有信件。",
    "lessonId": 39
  },
  {
    "word": "worker",
    "phonetic": "/ˈwɜː.kər/",
    "meaning": "名词：工人",
    "mcItem": "Pickaxe",
    "mcItemIcon": "👷‍♂️",
    "sampleSentence": "Miners are hardworking stone workers.",
    "sampleTranslation": "矿工是勤劳的石料工人。",
    "lessonId": 40
  },
  {
    "word": "today",
    "phonetic": "/təˈdeɪ/",
    "meaning": "副词/名词：今天",
    "mcItem": "Clock",
    "mcItemIcon": "📅",
    "sampleSentence": "How are you feeling today, Steve?",
    "sampleTranslation": "史蒂夫，你今天感觉怎么样？",
    "lessonId": 41
  },
  {
    "word": "fine",
    "phonetic": "/faɪn/",
    "meaning": "形容词：美好的；健康的",
    "mcItem": "Sun",
    "mcItemIcon": "☀️",
    "sampleSentence": "I am fine, thank you very much!",
    "sampleTranslation": "我很好，非常感谢你！",
    "lessonId": 42
  },
  {
    "word": "thanks",
    "phonetic": "/θæŋks/",
    "meaning": "感叹词/名词：多谢",
    "mcItem": "Emerald",
    "mcItemIcon": "🙏",
    "sampleSentence": "Thanks for sharing your golden apples.",
    "sampleTranslation": "谢谢你分享你的金苹果。",
    "lessonId": 43
  },
  {
    "word": "well",
    "phonetic": "/wel/",
    "meaning": "副词/形容词：身体好",
    "mcItem": "Water Bucket",
    "mcItemIcon": "🚰",
    "sampleSentence": "He is feeling very well today.",
    "sampleTranslation": "他今天感觉身体很好。",
    "lessonId": 44
  },
  {
    "word": "goodbye",
    "phonetic": "/ˌɡʊdˈbaɪ/",
    "meaning": "感叹词：再见",
    "mcItem": "Door",
    "mcItemIcon": "👋",
    "sampleSentence": "Goodbye, see you in the next lesson!",
    "sampleTranslation": "再见，下一课见！",
    "lessonId": 45
  },
  {
    "word": "fat",
    "phonetic": "/fæt/",
    "meaning": "形容词：胖的",
    "mcItem": "Porkchop",
    "mcItemIcon": "🐖",
    "sampleSentence": "That pig is very fat and cute.",
    "sampleTranslation": "那只猪非常胖且可爱。",
    "lessonId": 46
  },
  {
    "word": "thin",
    "phonetic": "/θɪn/",
    "meaning": "形容词：瘦的；薄的",
    "mcItem": "Skeleton Bone",
    "mcItemIcon": "🦴",
    "sampleSentence": "The skeleton looks tall and thin.",
    "sampleTranslation": "骷髅看起来又高又瘦。",
    "lessonId": 47
  },
  {
    "word": "tall",
    "phonetic": "/tɔːl/",
    "meaning": "形容词：高的",
    "mcItem": "Birch Tree",
    "mcItemIcon": "🌴",
    "sampleSentence": "Endermen are extremely tall creatures.",
    "sampleTranslation": "末影人是极其高大的生物。",
    "lessonId": 48
  },
  {
    "word": "short",
    "phonetic": "/ʃɔːt/",
    "meaning": "形容词：矮的；短的",
    "mcItem": "Short Grass",
    "mcItemIcon": "🌱",
    "sampleSentence": "The little villager boy is quite short.",
    "sampleTranslation": "那个小村民男孩挺矮的。",
    "lessonId": 49
  },
  {
    "word": "dirty",
    "phonetic": "/ˈdɜː.ti/",
    "meaning": "形容词：脏的",
    "mcItem": "Mud Block",
    "mcItemIcon": "🟤",
    "sampleSentence": "Wash your hands if they are dirty.",
    "sampleTranslation": "手如果脏了请洗手。",
    "lessonId": 50
  },
  {
    "word": "shirt",
    "phonetic": "/ʃɜːt/",
    "meaning": "名词：衬衫",
    "mcItem": "Leather Armor",
    "mcItemIcon": "👔",
    "sampleSentence": "His white shirt is clean.",
    "sampleTranslation": "他的白衬衫很干净。",
    "lessonId": 51
  },
  {
    "word": "tie",
    "phonetic": "/taɪ/",
    "meaning": "名词：领带",
    "mcItem": "String",
    "mcItemIcon": "👔",
    "sampleSentence": "Wear a red tie for the meeting.",
    "sampleTranslation": "开会请戴红领带。",
    "lessonId": 52
  },
  {
    "word": "shoe",
    "phonetic": "/ʃuː/",
    "meaning": "名词：鞋子",
    "mcItem": "Iron Boots",
    "mcItemIcon": "👞",
    "sampleSentence": "Tie your shoes before running.",
    "sampleTranslation": "跑步前系好鞋带。",
    "lessonId": 53
  },
  {
    "word": "blouse",
    "phonetic": "/blaʊz/",
    "meaning": "名词：女式衬衫",
    "mcItem": "Silk",
    "mcItemIcon": "👚",
    "sampleSentence": "She chose a yellow blouse.",
    "sampleTranslation": "她选了一件黄色的女衬衫。",
    "lessonId": 54
  },
  {
    "word": "skirt",
    "phonetic": "/skɜːt/",
    "meaning": "名词：裙子",
    "mcItem": "Pink Wool",
    "mcItemIcon": "👗",
    "sampleSentence": "A purple skirt looks elegant.",
    "sampleTranslation": "紫色的裙子看起来很高雅。",
    "lessonId": 55
  },
  {
    "word": "whose",
    "phonetic": "/huːz/",
    "meaning": "代词：谁的",
    "mcItem": "Question Block",
    "mcItemIcon": "❓",
    "sampleSentence": "Whose pickaxe is this on the floor?",
    "sampleTranslation": "地上这把镐头是谁的？",
    "lessonId": 56
  },
  {
    "word": "yours",
    "phonetic": "/jɔːz/",
    "meaning": "代词：你的；你们的",
    "mcItem": "Chest",
    "mcItemIcon": "📦",
    "sampleSentence": "Is this golden apple yours?",
    "sampleTranslation": "这个金苹果是你的吗？",
    "lessonId": 57
  },
  {
    "word": "hers",
    "phonetic": "/hɜːz/",
    "meaning": "代词：她的",
    "mcItem": "Flower",
    "mcItemIcon": "🌸",
    "sampleSentence": "The pink handbag is hers.",
    "sampleTranslation": "这个粉色手提包是她的。",
    "lessonId": 58
  },
  {
    "word": "ours",
    "phonetic": "/aʊəz/",
    "meaning": "代词：我们的",
    "mcItem": "House",
    "mcItemIcon": "🏰",
    "sampleSentence": "This stone castle is ours.",
    "sampleTranslation": "这座石城堡是我们的。",
    "lessonId": 59
  },
  {
    "word": "theirs",
    "phonetic": "/ðeəz/",
    "meaning": "代词：他们的",
    "mcItem": "Banner",
    "mcItemIcon": "🚩",
    "sampleSentence": "That farm is theirs.",
    "sampleTranslation": "那个农场是他们的。",
    "lessonId": 60
  },
  {
    "word": "color",
    "phonetic": "/ˈkʌl.ər/",
    "meaning": "名词：颜色",
    "mcItem": "Dye",
    "mcItemIcon": "🎨",
    "sampleSentence": "What color do you prefer?",
    "sampleTranslation": "你更喜欢哪种颜色？",
    "lessonId": 61
  },
  {
    "word": "green",
    "phonetic": "/ɡriːn/",
    "meaning": "形容词：绿色的",
    "mcItem": "Emerald",
    "mcItemIcon": "🟢",
    "sampleSentence": "Grass blocks are bright green.",
    "sampleTranslation": "草方块是鲜绿色的。",
    "lessonId": 62
  },
  {
    "word": "blue",
    "phonetic": "/bluː/",
    "meaning": "形容词：蓝色的",
    "mcItem": "Lapis Lazuli",
    "mcItemIcon": "🔵",
    "sampleSentence": "The lapis lazuli is blue.",
    "sampleTranslation": "青金石是蓝色的。",
    "lessonId": 63
  },
  {
    "word": "yellow",
    "phonetic": "/ˈjel.əʊ/",
    "meaning": "形容词：黄色的",
    "mcItem": "Gold Ingot",
    "mcItemIcon": "🟡",
    "sampleSentence": "Sunflowers are yellow.",
    "sampleTranslation": "向日葵是黄色的。",
    "lessonId": 64
  },
  {
    "word": "white",
    "phonetic": "/waɪt/",
    "meaning": "形容词：白色的",
    "mcItem": "Quartz",
    "mcItemIcon": "⚪",
    "sampleSentence": "Snowballs are white.",
    "sampleTranslation": "雪球是白色的。",
    "lessonId": 65
  },
  {
    "word": "red",
    "phonetic": "/red/",
    "meaning": "形容词：红色的",
    "mcItem": "Redstone",
    "mcItemIcon": "🔴",
    "sampleSentence": "Redstone glows red.",
    "sampleTranslation": "红石散发红光。",
    "lessonId": 66
  },
  {
    "word": "black",
    "phonetic": "/blæk/",
    "meaning": "形容词：黑色的",
    "mcItem": "Obsidian",
    "mcItemIcon": "🖤",
    "sampleSentence": "Obsidian blocks are black.",
    "sampleTranslation": "黑曜石方块是黑色的。",
    "lessonId": 67
  },
  {
    "word": "brown",
    "phonetic": "/braʊn/",
    "meaning": "形容词：棕色的",
    "mcItem": "Dirt",
    "mcItemIcon": "🟤",
    "sampleSentence": "Dirt blocks are brown.",
    "sampleTranslation": "泥土方块是棕色的。",
    "lessonId": 68
  },
  {
    "word": "pink",
    "phonetic": "/pɪŋk/",
    "meaning": "形容词：粉红色的",
    "mcItem": "Pink Petals",
    "mcItemIcon": "🩷",
    "sampleSentence": "Cherry leaves are pink.",
    "sampleTranslation": "樱花树叶是粉红色的。",
    "lessonId": 69
  },
  {
    "word": "purple",
    "phonetic": "/ˈpɜː.pəl/",
    "meaning": "形容词：紫色的",
    "mcItem": "Amethyst",
    "mcItemIcon": "💜",
    "sampleSentence": "Nether portal glows purple.",
    "sampleTranslation": "下界传送门散发紫光。",
    "lessonId": 70
  },
  {
    "word": "father",
    "phonetic": "/ˈfɑː.ðər/",
    "meaning": "名词：父亲",
    "mcItem": "Player Head",
    "mcItemIcon": "👨",
    "sampleSentence": "His father built this house.",
    "sampleTranslation": "他父亲盖了这栋房子。",
    "lessonId": 71
  },
  {
    "word": "mother",
    "phonetic": "/ˈmʌð.ər/",
    "meaning": "名词：母亲",
    "mcItem": "Player Head",
    "mcItemIcon": "👩",
    "sampleSentence": "Her mother cooks delicious soup.",
    "sampleTranslation": "她母亲煮了美味的汤。",
    "lessonId": 72
  },
  {
    "word": "brother",
    "phonetic": "/ˈbrʌð.ər/",
    "meaning": "名词：兄弟",
    "mcItem": "Player Head",
    "mcItemIcon": "👦",
    "sampleSentence": "My brother mines diamonds.",
    "sampleTranslation": "我哥哥挖掘钻石。",
    "lessonId": 73
  },
  {
    "word": "sister",
    "phonetic": "/ˈsɪs.tər/",
    "meaning": "名词：姐妹",
    "mcItem": "Player Head",
    "mcItemIcon": "👧",
    "sampleSentence": "His sister loves taming wolves.",
    "sampleTranslation": "他妹妹喜欢驯服狼。",
    "lessonId": 74
  },
  {
    "word": "son",
    "phonetic": "/sʌn/",
    "meaning": "名词：儿子",
    "mcItem": "Player Head",
    "mcItemIcon": "👶",
    "sampleSentence": "Their son is a good builder.",
    "sampleTranslation": "他们的儿子是个优秀的建造者。",
    "lessonId": 75
  },
  {
    "word": "daughter",
    "phonetic": "/ˈdɔː.tər/",
    "meaning": "名词：女儿",
    "mcItem": "Player Head",
    "mcItemIcon": "👧",
    "sampleSentence": "Their daughter likes flowers.",
    "sampleTranslation": "他们的女儿喜欢鲜花。",
    "lessonId": 76
  },
  {
    "word": "grandfather",
    "phonetic": "/ˈɡræn.fɑː.ðər/",
    "meaning": "名词：祖父；爷爷",
    "mcItem": "Lectern",
    "mcItemIcon": "👴",
    "sampleSentence": "Grandfather tells ancient legends.",
    "sampleTranslation": "爷爷讲述古老传说。",
    "lessonId": 77
  },
  {
    "word": "grandmother",
    "phonetic": "/ˈɡræn.mʌð.ər/",
    "meaning": "名词：祖母；奶奶",
    "mcItem": "Cake",
    "mcItemIcon": "👵",
    "sampleSentence": "Grandmother bakes fresh bread.",
    "sampleTranslation": "奶奶烘焙新鲜面包。",
    "lessonId": 78
  },
  {
    "word": "uncle",
    "phonetic": "/ˈʌŋ.kəl/",
    "meaning": "名词：叔叔；伯伯；舅舅",
    "mcItem": "Iron Axe",
    "mcItemIcon": "👨",
    "sampleSentence": "My uncle lives in the village.",
    "sampleTranslation": "我叔叔住在村庄里。",
    "lessonId": 79
  },
  {
    "word": "aunt",
    "phonetic": "/ɑːnt/",
    "meaning": "名词：阿姨；姑姑；伯母",
    "mcItem": "Potion",
    "mcItemIcon": "👩",
    "sampleSentence": "Aunt Mary visits us today.",
    "sampleTranslation": "玛丽阿姨今天来看望我们。",
    "lessonId": 80
  },
  {
    "word": "room",
    "phonetic": "/ruːm/",
    "meaning": "名词：房间",
    "mcItem": "Door",
    "mcItemIcon": "🚪",
    "sampleSentence": "Keep your bedroom clean.",
    "sampleTranslation": "保持卧室干净。",
    "lessonId": 81
  },
  {
    "word": "kitchen",
    "phonetic": "/ˈkɪtʃ.ən/",
    "meaning": "名词：厨房",
    "mcItem": "Smoker",
    "mcItemIcon": "🍳",
    "sampleSentence": "Cook fish in the kitchen.",
    "sampleTranslation": "在厨房里煮鱼。",
    "lessonId": 82
  },
  {
    "word": "dining-room",
    "phonetic": "/ˈdaɪ.nɪŋ ˌruːm/",
    "meaning": "名词：餐厅",
    "mcItem": "Crafting Table",
    "mcItemIcon": "🍽️",
    "sampleSentence": "We eat dinner in dining-room.",
    "sampleTranslation": "我们在餐厅吃晚饭。",
    "lessonId": 83
  },
  {
    "word": "living-room",
    "phonetic": "/ˈlɪv.ɪŋ ˌruːm/",
    "meaning": "名词：客厅",
    "mcItem": "Jukebox",
    "mcItemIcon": "🛋️",
    "sampleSentence": "Watch TV in living-room.",
    "sampleTranslation": "在客厅看电视。",
    "lessonId": 84
  },
  {
    "word": "bedroom",
    "phonetic": "/ˈbed.ruːm/",
    "meaning": "名词：卧室",
    "mcItem": "Red Bed",
    "mcItemIcon": "🛏️",
    "sampleSentence": "Sleep in your bedroom.",
    "sampleTranslation": "在卧室睡觉。",
    "lessonId": 85
  },
  {
    "word": "bathroom",
    "phonetic": "/ˈbɑːθ.ruːm/",
    "meaning": "名词：浴室；洗手间",
    "mcItem": "Cauldron",
    "mcItemIcon": "🛁",
    "sampleSentence": "Take a bath in bathroom.",
    "sampleTranslation": "在浴室洗澡。",
    "lessonId": 86
  },
  {
    "word": "table",
    "phonetic": "/ˈteɪ.bəl/",
    "meaning": "名词：桌子",
    "mcItem": "Crafting Table",
    "mcItemIcon": "🪑",
    "sampleSentence": "Put books on table.",
    "sampleTranslation": "把书放在桌上。",
    "lessonId": 87
  },
  {
    "word": "chair",
    "phonetic": "/tʃeər/",
    "meaning": "名词：椅子",
    "mcItem": "Oak Stairs",
    "mcItemIcon": "🪑",
    "sampleSentence": "Sit on this oak chair.",
    "sampleTranslation": "坐在木椅上。",
    "lessonId": 88
  },
  {
    "word": "armchair",
    "phonetic": "/ˈɑːm.tʃeər/",
    "meaning": "名词：扶手椅",
    "mcItem": "Red Wool",
    "mcItemIcon": "🛋️",
    "sampleSentence": "Relax in the armchair.",
    "sampleTranslation": "在扶手椅里放松。",
    "lessonId": 89
  },
  {
    "word": "sofa",
    "phonetic": "/ˈsəʊ.fə/",
    "meaning": "名词：沙发",
    "mcItem": "White Wool",
    "mcItemIcon": "🛋️",
    "sampleSentence": "Sit together on sofa.",
    "sampleTranslation": "一起坐在沙发上。",
    "lessonId": 90
  },
  {
    "word": "bread",
    "phonetic": "/bred/",
    "meaning": "名词：面包",
    "mcItem": "Bread",
    "mcItemIcon": "🍞",
    "sampleSentence": "Bake fresh bread daily.",
    "sampleTranslation": "每天烘焙新鲜面包。",
    "lessonId": 91
  },
  {
    "word": "butter",
    "phonetic": "/ˈbʌt.ər/",
    "meaning": "名词：黄油",
    "mcItem": "Yellow Dye",
    "mcItemIcon": "🧈",
    "sampleSentence": "Spread butter on toast.",
    "sampleTranslation": "把黄油抹在吐司上。",
    "lessonId": 92
  },
  {
    "word": "cheese",
    "phonetic": "/tʃiːz/",
    "meaning": "名词：奶酪",
    "mcItem": "Yellow Wool",
    "mcItemIcon": "🧀",
    "sampleSentence": "Melt cheese on pizza.",
    "sampleTranslation": "将奶酪融化在披萨上。",
    "lessonId": 93
  },
  {
    "word": "coffee",
    "phonetic": "/ˈkɒf.i/",
    "meaning": "名词：咖啡",
    "mcItem": "Cocoa Beans",
    "mcItemIcon": "☕",
    "sampleSentence": "Drink hot coffee in morning.",
    "sampleTranslation": "早晨喝热咖啡。",
    "lessonId": 94
  },
  {
    "word": "tea",
    "phonetic": "/tiː/",
    "meaning": "名词：茶",
    "mcItem": "Green Dye",
    "mcItemIcon": "🍵",
    "sampleSentence": "Pour a cup of green tea.",
    "sampleTranslation": "倒一杯绿茶。",
    "lessonId": 95
  },
  {
    "word": "milk",
    "phonetic": "/mɪlk/",
    "meaning": "名词：牛奶",
    "mcItem": "Milk Bucket",
    "mcItemIcon": "🥛",
    "sampleSentence": "Drink milk to stay healthy.",
    "sampleTranslation": "喝牛奶保持健康。",
    "lessonId": 96
  },
  {
    "word": "sugar",
    "phonetic": "/ˈʃʊɡ.ər/",
    "meaning": "名词：糖",
    "mcItem": "Sugar",
    "mcItemIcon": "🍬",
    "sampleSentence": "Add sugar to sweeten coffee.",
    "sampleTranslation": "加糖加甜咖啡。",
    "lessonId": 97
  },
  {
    "word": "cake",
    "phonetic": "/keɪk/",
    "meaning": "名词：蛋糕",
    "mcItem": "Cake",
    "mcItemIcon": "🎂",
    "sampleSentence": "Bake a birthday cake.",
    "sampleTranslation": "烘焙一个生日蛋糕。",
    "lessonId": 98
  },
  {
    "word": "egg",
    "phonetic": "/eɡ/",
    "meaning": "名词：鸡蛋",
    "mcItem": "Egg",
    "mcItemIcon": "🥚",
    "sampleSentence": "Collect eggs from chickens.",
    "sampleTranslation": "从母鸡那里收集鸡蛋。",
    "lessonId": 99
  },
  {
    "word": "meat",
    "phonetic": "/miːt/",
    "meaning": "名词：肉类",
    "mcItem": "Cooked Beef",
    "mcItemIcon": "🥩",
    "sampleSentence": "Cook meat on furnace.",
    "sampleTranslation": "在熔炉上烤肉。",
    "lessonId": 100
  },
  {
    "word": "apple",
    "phonetic": "/ˈæp.əl/",
    "meaning": "名词：苹果",
    "mcItem": "Apple",
    "mcItemIcon": "🍎",
    "sampleSentence": "Eat a sweet red apple.",
    "sampleTranslation": "吃一个甜甜的红苹果。",
    "lessonId": 101
  },
  {
    "word": "orange",
    "phonetic": "/ˈɒr.ɪndʒ/",
    "meaning": "名词：橙子",
    "mcItem": "Orange Dye",
    "mcItemIcon": "🍊",
    "sampleSentence": "Oranges are rich in vitamin.",
    "sampleTranslation": "橙子富含维他命。",
    "lessonId": 102
  },
  {
    "word": "banana",
    "phonetic": "/bəˈnɑː.nə/",
    "meaning": "名词：香蕉",
    "mcItem": "Gold Ingot",
    "mcItemIcon": "🍌",
    "sampleSentence": "Monkeys like bananas.",
    "sampleTranslation": "猴子喜欢香蕉。",
    "lessonId": 103
  },
  {
    "word": "peach",
    "phonetic": "/piːtʃ/",
    "meaning": "名词：桃子",
    "mcItem": "Pink Dye",
    "mcItemIcon": "🍑",
    "sampleSentence": "Peaches grow in spring.",
    "sampleTranslation": "桃子在春天生长。",
    "lessonId": 104
  },
  {
    "word": "lemon",
    "phonetic": "/ˈlem.ən/",
    "meaning": "名词：柠檬",
    "mcItem": "Yellow Dye",
    "mcItemIcon": "🍋",
    "sampleSentence": "Lemon juice is sour.",
    "sampleTranslation": "柠檬汁是酸的。",
    "lessonId": 105
  },
  {
    "word": "melon",
    "phonetic": "/ˈmel.ən/",
    "meaning": "名词：西瓜",
    "mcItem": "Melon Slice",
    "mcItemIcon": "🍉",
    "sampleSentence": "Juicy melons in summer.",
    "sampleTranslation": "夏日多汁的西瓜。",
    "lessonId": 106
  },
  {
    "word": "potato",
    "phonetic": "/pəˈteɪ.təʊ/",
    "meaning": "名词：土豆；马铃薯",
    "mcItem": "Baked Potato",
    "mcItemIcon": "🥔",
    "sampleSentence": "Bake potatoes for meal.",
    "sampleTranslation": "烤土豆做晚餐。",
    "lessonId": 107
  },
  {
    "word": "tomato",
    "phonetic": "/təˈmɑː.təʊ/",
    "meaning": "名词：西红柿；番茄",
    "mcItem": "Red Dye",
    "mcItemIcon": "🍅",
    "sampleSentence": "Fresh tomatoes from garden.",
    "sampleTranslation": "花园里的新鲜番茄。",
    "lessonId": 108
  },
  {
    "word": "onion",
    "phonetic": "/ˈʌn.jən/",
    "meaning": "名词：洋葱",
    "mcItem": "Allium",
    "mcItemIcon": "🧅",
    "sampleSentence": "Chop onions carefully.",
    "sampleTranslation": "小心地切洋葱。",
    "lessonId": 109
  },
  {
    "word": "carrot",
    "phonetic": "/ˈkær.ət/",
    "meaning": "名词：胡萝卜",
    "mcItem": "Carrot",
    "mcItemIcon": "🥕",
    "sampleSentence": "Rabbits love carrots.",
    "sampleTranslation": "兔子喜欢胡萝卜。",
    "lessonId": 110
  },
  {
    "word": "headache",
    "phonetic": "/ˈhed.eɪk/",
    "meaning": "名词：头痛",
    "mcItem": "Potion",
    "mcItemIcon": "🤕",
    "sampleSentence": "I have a headache today.",
    "sampleTranslation": "我今天感到头痛。",
    "lessonId": 111
  },
  {
    "word": "fever",
    "phonetic": "/ˈfiː.vər/",
    "meaning": "名词：发烧",
    "mcItem": "Magma Block",
    "mcItemIcon": "🔥",
    "sampleSentence": "He stays in bed with fever.",
    "sampleTranslation": "他发烧躺在床上。",
    "lessonId": 112
  },
  {
    "word": "cough",
    "phonetic": "/kɒf/",
    "meaning": "名词：咳嗽",
    "mcItem": "Potion",
    "mcItemIcon": "😷",
    "sampleSentence": "Drink warm water for cough.",
    "sampleTranslation": "咳嗽要多喝温水。",
    "lessonId": 113
  },
  {
    "word": "cold",
    "phonetic": "/kəʊld/",
    "meaning": "名词/形容词：感冒；寒冷",
    "mcItem": "Ice Block",
    "mcItemIcon": "🤒",
    "sampleSentence": "Catch a cold in winter.",
    "sampleTranslation": "冬天容易感冒。",
    "lessonId": 114
  },
  {
    "word": "toothache",
    "phonetic": "/ˈtuːθ.eɪk/",
    "meaning": "名词：牙痛",
    "mcItem": "Bone",
    "mcItemIcon": "🦷",
    "sampleSentence": "See dentist for toothache.",
    "sampleTranslation": "牙痛去看牙医。",
    "lessonId": 115
  },
  {
    "word": "medicine",
    "phonetic": "/ˈmed.sən/",
    "meaning": "名词：药物",
    "mcItem": "Healing Potion",
    "mcItemIcon": "🧪",
    "sampleSentence": "Take medicine on time.",
    "sampleTranslation": "按时服药。",
    "lessonId": 116
  },
  {
    "word": "hospital",
    "phonetic": "/ˈhɒs.pɪ.təl/",
    "meaning": "名词：医院",
    "mcItem": "Redstone Block",
    "mcItemIcon": "🏥",
    "sampleSentence": "Go to hospital for checkup.",
    "sampleTranslation": "去医院体检。",
    "lessonId": 117
  },
  {
    "word": "dentist",
    "phonetic": "/ˈden.tɪst/",
    "meaning": "名词：牙医",
    "mcItem": "Bone",
    "mcItemIcon": "👨‍⚕️",
    "sampleSentence": "Dentist checks your teeth.",
    "sampleTranslation": "牙医检查你的牙齿。",
    "lessonId": 118
  },
  {
    "word": "patient",
    "phonetic": "/ˈpeɪ.ʃənt/",
    "meaning": "名词：病人",
    "mcItem": "Bed",
    "mcItemIcon": "🛌",
    "sampleSentence": "The patient rests quietly.",
    "sampleTranslation": "病人安静地休息。",
    "lessonId": 119
  },
  {
    "word": "better",
    "phonetic": "/ˈbet.ər/",
    "meaning": "形容词：更好的",
    "mcItem": "Golden Apple",
    "mcItemIcon": "✨",
    "sampleSentence": "I feel much better now.",
    "sampleTranslation": "我现在感觉好多了。",
    "lessonId": 120
  },
  {
    "word": "heavy",
    "phonetic": "/ˈhev.i/",
    "meaning": "形容词：重的",
    "mcItem": "Anvil",
    "mcItemIcon": "🏋️",
    "sampleSentence": "Anvils are heavy.",
    "sampleTranslation": "铁砧非常重。",
    "lessonId": 121
  },
  {
    "word": "light",
    "phonetic": "/laɪt/",
    "meaning": "形容词：轻的；明亮的",
    "mcItem": "Torch",
    "mcItemIcon": "💡",
    "sampleSentence": "Feathers are light.",
    "sampleTranslation": "羽毛很轻。",
    "lessonId": 122
  },
  {
    "word": "expensive",
    "phonetic": "/ɪkˈspen.sɪv/",
    "meaning": "形容词：昂贵的",
    "mcItem": "Diamond Block",
    "mcItemIcon": "💎",
    "sampleSentence": "Diamonds are expensive.",
    "sampleTranslation": "钻石很昂贵。",
    "lessonId": 123
  },
  {
    "word": "cheap",
    "phonetic": "/tʃiːp/",
    "meaning": "形容词：便宜的",
    "mcItem": "Dirt Block",
    "mcItemIcon": "🏷️",
    "sampleSentence": "Dirt is cheap.",
    "sampleTranslation": "泥土很便宜。",
    "lessonId": 124
  },
  {
    "word": "clean",
    "phonetic": "/kliːn/",
    "meaning": "形容词：干净的",
    "mcItem": "Glass",
    "mcItemIcon": "✨",
    "sampleSentence": "Keep your room clean.",
    "sampleTranslation": "保持房间干净。",
    "lessonId": 125
  },
  {
    "word": "hot",
    "phonetic": "/hɒt/",
    "meaning": "形容词：热的",
    "mcItem": "Fire",
    "mcItemIcon": "🔥",
    "sampleSentence": "Lava is hot.",
    "sampleTranslation": "岩浆很烫。",
    "lessonId": 126
  },
  {
    "word": "warm",
    "phonetic": "/wɔːm/",
    "meaning": "形容词：温暖的",
    "mcItem": "Torch",
    "mcItemIcon": "🌤️",
    "sampleSentence": "Sunlight is warm.",
    "sampleTranslation": "阳光很温暖。",
    "lessonId": 127
  },
  {
    "word": "cool",
    "phonetic": "/kuːl/",
    "meaning": "形容词：凉爽的",
    "mcItem": "Water",
    "mcItemIcon": "🍃",
    "sampleSentence": "Cool evening breeze.",
    "sampleTranslation": "凉爽的晚风。",
    "lessonId": 128
  },
  {
    "word": "morning",
    "phonetic": "/ˈmɔː.nɪŋ/",
    "meaning": "名词：早晨",
    "mcItem": "Clock",
    "mcItemIcon": "🌅",
    "sampleSentence": "Good morning, friend!",
    "sampleTranslation": "早安，朋友！",
    "lessonId": 129
  },
  {
    "word": "afternoon",
    "phonetic": "/ˌɑːf.təˈnuːn/",
    "meaning": "名词：下午",
    "mcItem": "Clock",
    "mcItemIcon": "☀️",
    "sampleSentence": "Study in the afternoon.",
    "sampleTranslation": "在下午学习。",
    "lessonId": 130
  },
  {
    "word": "evening",
    "phonetic": "/ˈiːv.nɪŋ/",
    "meaning": "名词：傍晚",
    "mcItem": "Clock",
    "mcItemIcon": "🌆",
    "sampleSentence": "Rest in the evening.",
    "sampleTranslation": "在傍晚休息。",
    "lessonId": 131
  },
  {
    "word": "night",
    "phonetic": "/naɪt/",
    "meaning": "名词：夜晚",
    "mcItem": "Moon",
    "mcItemIcon": "🌙",
    "sampleSentence": "Monsters spawn at night.",
    "sampleTranslation": "怪物在夜间生成。",
    "lessonId": 132
  },
  {
    "word": "spring",
    "phonetic": "/sprɪŋ/",
    "meaning": "名词：春天",
    "mcItem": "Pink Petals",
    "mcItemIcon": "🌸",
    "sampleSentence": "Flowers bloom in spring.",
    "sampleTranslation": "鲜花在春天盛开。",
    "lessonId": 133
  },
  {
    "word": "summer",
    "phonetic": "/ˈsʌm.ər/",
    "meaning": "名词：夏天",
    "mcItem": "Sun",
    "mcItemIcon": "☀️",
    "sampleSentence": "Hot sunny summer.",
    "sampleTranslation": "炎热明亮的夏天。",
    "lessonId": 134
  },
  {
    "word": "autumn",
    "phonetic": "/ˈɔː.təm/",
    "meaning": "名词：秋天",
    "mcItem": "Oak Leaves",
    "mcItemIcon": "🍂",
    "sampleSentence": "Leaves turn yellow in autumn.",
    "sampleTranslation": "秋天树叶变黄。",
    "lessonId": 135
  },
  {
    "word": "winter",
    "phonetic": "/ˈwɪn.tər/",
    "meaning": "名词：冬天",
    "mcItem": "Snow Block",
    "mcItemIcon": "❄️",
    "sampleSentence": "Snow falls in winter.",
    "sampleTranslation": "冬天地下雪。",
    "lessonId": 136
  },
  {
    "word": "weather",
    "phonetic": "/ˈweð.ər/",
    "meaning": "名词：天气",
    "mcItem": "Sun",
    "mcItemIcon": "🌤️",
    "sampleSentence": "The weather is pleasant.",
    "sampleTranslation": "天气十分宜人。",
    "lessonId": 137
  },
  {
    "word": "rain",
    "phonetic": "/reɪn/",
    "meaning": "名词/动词：下雨；雨水",
    "mcItem": "Water Bucket",
    "mcItemIcon": "🌧️",
    "sampleSentence": "Heavy rain falls.",
    "sampleTranslation": "倾盆大雨落下。",
    "lessonId": 138
  },
  {
    "word": "station",
    "phonetic": "/ˈsteɪ.ʃən/",
    "meaning": "名词：车站",
    "mcItem": "Rail",
    "mcItemIcon": "🚉",
    "sampleSentence": "Wait at train station.",
    "sampleTranslation": "在火车站等候。",
    "lessonId": 139
  },
  {
    "word": "train",
    "phonetic": "/treɪn/",
    "meaning": "名词：火车",
    "mcItem": "Minecart",
    "mcItemIcon": "🚆",
    "sampleSentence": "Take fast train to city.",
    "sampleTranslation": "乘快车去城市。",
    "lessonId": 140
  },
  {
    "word": "platform",
    "phonetic": "/ˈplæt.fɔːm/",
    "meaning": "名词：站台",
    "mcItem": "Stone Slab",
    "mcItemIcon": "🚉",
    "sampleSentence": "Wait on platform 2.",
    "sampleTranslation": "在2号站台等候。",
    "lessonId": 141
  },
  {
    "word": "bus",
    "phonetic": "/bʌs/",
    "meaning": "名词：公共汽车",
    "mcItem": "Minecart",
    "mcItemIcon": "🚌",
    "sampleSentence": "Bus arrives on time.",
    "sampleTranslation": "公交车按时到达。",
    "lessonId": 142
  },
  {
    "word": "taxi",
    "phonetic": "/ˈtæk.si/",
    "meaning": "名词：出租车",
    "mcItem": "Gold Minecart",
    "mcItemIcon": "🚕",
    "sampleSentence": "Take a quick taxi.",
    "sampleTranslation": "打一辆快捷出租车。",
    "lessonId": 143
  },
  {
    "word": "plane",
    "phonetic": "/pleɪn/",
    "meaning": "名词：飞机",
    "mcItem": "Elytra",
    "mcItemIcon": "✈️",
    "sampleSentence": "Fly in airplane.",
    "sampleTranslation": "乘飞机飞行。",
    "lessonId": 144
  },
  {
    "word": "ship",
    "phonetic": "/ʃɪp/",
    "meaning": "名词：轮船",
    "mcItem": "Boat",
    "mcItemIcon": "🚢",
    "sampleSentence": "Large ocean ship.",
    "sampleTranslation": "大型远洋轮船。",
    "lessonId": 1
  },
  {
    "word": "boat",
    "phonetic": "/bəʊt/",
    "meaning": "名词：小船",
    "mcItem": "Oak Boat",
    "mcItemIcon": "🛶",
    "sampleSentence": "Row a wooden boat.",
    "sampleTranslation": "划一艘小木船。",
    "lessonId": 2
  },
  {
    "word": "airport",
    "phonetic": "/ˈeə.pɔːt/",
    "meaning": "名词：机场",
    "mcItem": "Beacon",
    "mcItemIcon": "🛫",
    "sampleSentence": "Land at international airport.",
    "sampleTranslation": "在国际机场降落。",
    "lessonId": 3
  },
  {
    "word": "passport",
    "phonetic": "/ˈpɑːs.pɔːt/",
    "meaning": "名词：护照",
    "mcItem": "Paper",
    "mcItemIcon": "📕",
    "sampleSentence": "Keep your passport safe.",
    "sampleTranslation": "妥善保管护照。",
    "lessonId": 4
  },
  {
    "word": "street",
    "phonetic": "/striːt/",
    "meaning": "名词：街道",
    "mcItem": "Dirt Path",
    "mcItemIcon": "🛣️",
    "sampleSentence": "Walk along stone street.",
    "sampleTranslation": "沿着石板街散步。",
    "lessonId": 5
  },
  {
    "word": "road",
    "phonetic": "/rəʊd/",
    "meaning": "名词：道路",
    "mcItem": "Cobblestone",
    "mcItemIcon": "🛣️",
    "sampleSentence": "Country road leads home.",
    "sampleTranslation": "乡村小路通往家园。",
    "lessonId": 6
  },
  {
    "word": "bridge",
    "phonetic": "/brɪdʒ/",
    "meaning": "名词：桥梁",
    "mcItem": "Stairs",
    "mcItemIcon": "🌉",
    "sampleSentence": "Cross stone bridge.",
    "sampleTranslation": "穿过石桥。",
    "lessonId": 7
  },
  {
    "word": "park",
    "phonetic": "/pɑːk/",
    "meaning": "名词：公园",
    "mcItem": "Grass Block",
    "mcItemIcon": "🏞️",
    "sampleSentence": "Walk in green park.",
    "sampleTranslation": "在绿意公园里散步。",
    "lessonId": 8
  },
  {
    "word": "river",
    "phonetic": "/ˈrɪv.ər/",
    "meaning": "名词：河流",
    "mcItem": "Water Bucket",
    "mcItemIcon": "🏞️",
    "sampleSentence": "River flows gently.",
    "sampleTranslation": "河水静静流淌。",
    "lessonId": 9
  },
  {
    "word": "sea",
    "phonetic": "/siː/",
    "meaning": "名词：大海",
    "mcItem": "Prismarine",
    "mcItemIcon": "🌊",
    "sampleSentence": "Sail on blue sea.",
    "sampleTranslation": "在蓝海航行。",
    "lessonId": 10
  },
  {
    "word": "island",
    "phonetic": "/ˈaɪ.lənd/",
    "meaning": "名词：岛屿",
    "mcItem": "Sand",
    "mcItemIcon": "🏝️",
    "sampleSentence": "Tropical island in sea.",
    "sampleTranslation": "大海中的热带岛屿。",
    "lessonId": 11
  },
  {
    "word": "mountain",
    "phonetic": "/ˈmaʊn.tɪn/",
    "meaning": "名词：高山",
    "mcItem": "Deepslate",
    "mcItemIcon": "⛰️",
    "sampleSentence": "Climb high mountain.",
    "sampleTranslation": "攀登巍峨高山。",
    "lessonId": 12
  },
  {
    "word": "forest",
    "phonetic": "/ˈfɒr.ɪst/",
    "meaning": "名词：森林",
    "mcItem": "Oak Log",
    "mcItemIcon": "🌲",
    "sampleSentence": "Dense green forest.",
    "sampleTranslation": "茂密的绿色森林。",
    "lessonId": 13
  },
  {
    "word": "wood",
    "phonetic": "/wʊd/",
    "meaning": "名词：树林；木材",
    "mcItem": "Log",
    "mcItemIcon": "🪵",
    "sampleSentence": "Chop wood for fuel.",
    "sampleTranslation": "砍柴作为燃料。",
    "lessonId": 14
  },
  {
    "word": "read",
    "phonetic": "/riːd/",
    "meaning": "动词：阅读",
    "mcItem": "Book",
    "mcItemIcon": "📖",
    "sampleSentence": "Read books daily.",
    "sampleTranslation": "每天读书。",
    "lessonId": 15
  },
  {
    "word": "write",
    "phonetic": "/raɪt/",
    "meaning": "动词：书写",
    "mcItem": "Feather",
    "mcItemIcon": "✍️",
    "sampleSentence": "Write letter to friend.",
    "sampleTranslation": "给朋友写信。",
    "lessonId": 16
  },
  {
    "word": "speak",
    "phonetic": "/spiːk/",
    "meaning": "动词：讲话",
    "mcItem": "Note Block",
    "mcItemIcon": "🗣️",
    "sampleSentence": "Speak English well.",
    "sampleTranslation": "英语说得好。",
    "lessonId": 17
  },
  {
    "word": "listen",
    "phonetic": "/ˈlɪs.ən/",
    "meaning": "动词：倾听",
    "mcItem": "Jukebox",
    "mcItemIcon": "👂",
    "sampleSentence": "Listen to music.",
    "sampleTranslation": "听音乐。",
    "lessonId": 18
  },
  {
    "word": "learn",
    "phonetic": "/lɜːn/",
    "meaning": "动词：学习",
    "mcItem": "Experience Bottle",
    "mcItemIcon": "📚",
    "sampleSentence": "Learn new skills.",
    "sampleTranslation": "学习新技能。",
    "lessonId": 19
  },
  {
    "word": "study",
    "phonetic": "/ˈstʌd.i/",
    "meaning": "动词：努力学习",
    "mcItem": "Lectern",
    "mcItemIcon": "📝",
    "sampleSentence": "Study hard for test.",
    "sampleTranslation": "为考试努力复习。",
    "lessonId": 20
  },
  {
    "word": "teach",
    "phonetic": "/tiːtʃ/",
    "meaning": "动词：教导",
    "mcItem": "Book",
    "mcItemIcon": "👨‍🏫",
    "sampleSentence": "Teach students grammar.",
    "sampleTranslation": "教学生语法。",
    "lessonId": 21
  },
  {
    "word": "ask",
    "phonetic": "/ɑːsk/",
    "meaning": "动词：提问",
    "mcItem": "Question Mark",
    "mcItemIcon": "❓",
    "sampleSentence": "Ask teacher a question.",
    "sampleTranslation": "问老师一个问题。",
    "lessonId": 22
  },
  {
    "word": "answer",
    "phonetic": "/ˈɑːn.sər/",
    "meaning": "动词：回答",
    "mcItem": "Sign",
    "mcItemIcon": "💬",
    "sampleSentence": "Answer question correctly.",
    "sampleTranslation": "正确回答问题。",
    "lessonId": 23
  },
  {
    "word": "understand",
    "phonetic": "/ˌʌn.dəˈstænd/",
    "meaning": "动词：理解",
    "mcItem": "Redstone Dust",
    "mcItemIcon": "🧠",
    "sampleSentence": "I understand lesson.",
    "sampleTranslation": "我理解了这堂课。",
    "lessonId": 24
  },
  {
    "word": "ability",
    "phonetic": "/ability/",
    "meaning": "新概念词汇：ability",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ability' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ability'。",
    "lessonId": 25
  },
  {
    "word": "abroad",
    "phonetic": "/abroad/",
    "meaning": "新概念词汇：abroad",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'abroad' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'abroad'。",
    "lessonId": 26
  },
  {
    "word": "absent",
    "phonetic": "/absent/",
    "meaning": "新概念词汇：absent",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'absent' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'absent'。",
    "lessonId": 27
  },
  {
    "word": "accept",
    "phonetic": "/accept/",
    "meaning": "新概念词汇：accept",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'accept' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'accept'。",
    "lessonId": 28
  },
  {
    "word": "accident",
    "phonetic": "/accident/",
    "meaning": "新概念词汇：accident",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'accident' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'accident'。",
    "lessonId": 29
  },
  {
    "word": "accuse",
    "phonetic": "/accuse/",
    "meaning": "新概念词汇：accuse",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'accuse' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'accuse'。",
    "lessonId": 30
  },
  {
    "word": "ache",
    "phonetic": "/ache/",
    "meaning": "新概念词汇：ache",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ache' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ache'。",
    "lessonId": 31
  },
  {
    "word": "across",
    "phonetic": "/across/",
    "meaning": "新概念词汇：across",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'across' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'across'。",
    "lessonId": 32
  },
  {
    "word": "action",
    "phonetic": "/action/",
    "meaning": "新概念词汇：action",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'action' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'action'。",
    "lessonId": 33
  },
  {
    "word": "actor",
    "phonetic": "/actor/",
    "meaning": "新概念词汇：actor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'actor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'actor'。",
    "lessonId": 34
  },
  {
    "word": "actress",
    "phonetic": "/actress/",
    "meaning": "新概念词汇：actress",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'actress' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'actress'。",
    "lessonId": 35
  },
  {
    "word": "address",
    "phonetic": "/address/",
    "meaning": "新概念词汇：address",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'address' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'address'。",
    "lessonId": 36
  },
  {
    "word": "admire",
    "phonetic": "/admire/",
    "meaning": "新概念词汇：admire",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'admire' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'admire'。",
    "lessonId": 37
  },
  {
    "word": "admission",
    "phonetic": "/admission/",
    "meaning": "新概念词汇：admission",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'admission' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'admission'。",
    "lessonId": 38
  },
  {
    "word": "admit",
    "phonetic": "/admit/",
    "meaning": "新概念词汇：admit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'admit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'admit'。",
    "lessonId": 39
  },
  {
    "word": "adult",
    "phonetic": "/adult/",
    "meaning": "新概念词汇：adult",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'adult' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'adult'。",
    "lessonId": 40
  },
  {
    "word": "advantage",
    "phonetic": "/advantage/",
    "meaning": "新概念词汇：advantage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'advantage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'advantage'。",
    "lessonId": 41
  },
  {
    "word": "adventure",
    "phonetic": "/adventure/",
    "meaning": "新概念词汇：adventure",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'adventure' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'adventure'。",
    "lessonId": 42
  },
  {
    "word": "advice",
    "phonetic": "/advice/",
    "meaning": "新概念词汇：advice",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'advice' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'advice'。",
    "lessonId": 43
  },
  {
    "word": "advise",
    "phonetic": "/advise/",
    "meaning": "新概念词汇：advise",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'advise' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'advise'。",
    "lessonId": 44
  },
  {
    "word": "afford",
    "phonetic": "/afford/",
    "meaning": "新概念词汇：afford",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'afford' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'afford'。",
    "lessonId": 45
  },
  {
    "word": "afraid",
    "phonetic": "/afraid/",
    "meaning": "新概念词汇：afraid",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'afraid' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'afraid'。",
    "lessonId": 46
  },
  {
    "word": "agony",
    "phonetic": "/agony/",
    "meaning": "新概念词汇：agony",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'agony' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'agony'。",
    "lessonId": 47
  },
  {
    "word": "agree",
    "phonetic": "/agree/",
    "meaning": "新概念词汇：agree",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'agree' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'agree'。",
    "lessonId": 48
  },
  {
    "word": "ahead",
    "phonetic": "/ahead/",
    "meaning": "新概念词汇：ahead",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ahead' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ahead'。",
    "lessonId": 49
  },
  {
    "word": "airline",
    "phonetic": "/airline/",
    "meaning": "新概念词汇：airline",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'airline' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'airline'。",
    "lessonId": 50
  },
  {
    "word": "alarm",
    "phonetic": "/alarm/",
    "meaning": "新概念词汇：alarm",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'alarm' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'alarm'。",
    "lessonId": 51
  },
  {
    "word": "alive",
    "phonetic": "/alive/",
    "meaning": "新概念词汇：alive",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'alive' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'alive'。",
    "lessonId": 52
  },
  {
    "word": "allow",
    "phonetic": "/allow/",
    "meaning": "新概念词汇：allow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'allow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'allow'。",
    "lessonId": 53
  },
  {
    "word": "almost",
    "phonetic": "/almost/",
    "meaning": "新概念词汇：almost",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'almost' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'almost'。",
    "lessonId": 54
  },
  {
    "word": "alone",
    "phonetic": "/alone/",
    "meaning": "新概念词汇：alone",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'alone' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'alone'。",
    "lessonId": 55
  },
  {
    "word": "along",
    "phonetic": "/along/",
    "meaning": "新概念词汇：along",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'along' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'along'。",
    "lessonId": 56
  },
  {
    "word": "aloud",
    "phonetic": "/aloud/",
    "meaning": "新概念词汇：aloud",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'aloud' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'aloud'。",
    "lessonId": 57
  },
  {
    "word": "alphabet",
    "phonetic": "/alphabet/",
    "meaning": "新概念词汇：alphabet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'alphabet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'alphabet'。",
    "lessonId": 58
  },
  {
    "word": "already",
    "phonetic": "/already/",
    "meaning": "新概念词汇：already",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'already' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'already'。",
    "lessonId": 59
  },
  {
    "word": "also",
    "phonetic": "/also/",
    "meaning": "新概念词汇：also",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'also' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'also'。",
    "lessonId": 60
  },
  {
    "word": "always",
    "phonetic": "/always/",
    "meaning": "新概念词汇：always",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'always' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'always'。",
    "lessonId": 61
  },
  {
    "word": "amazing",
    "phonetic": "/amazing/",
    "meaning": "新概念词汇：amazing",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'amazing' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'amazing'。",
    "lessonId": 62
  },
  {
    "word": "amber",
    "phonetic": "/amber/",
    "meaning": "新概念词汇：amber",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'amber' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'amber'。",
    "lessonId": 63
  },
  {
    "word": "ambition",
    "phonetic": "/ambition/",
    "meaning": "新概念词汇：ambition",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ambition' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ambition'。",
    "lessonId": 64
  },
  {
    "word": "ambulance",
    "phonetic": "/ambulance/",
    "meaning": "新概念词汇：ambulance",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ambulance' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ambulance'。",
    "lessonId": 65
  },
  {
    "word": "among",
    "phonetic": "/among/",
    "meaning": "新概念词汇：among",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'among' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'among'。",
    "lessonId": 66
  },
  {
    "word": "amount",
    "phonetic": "/amount/",
    "meaning": "新概念词汇：amount",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'amount' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'amount'。",
    "lessonId": 67
  },
  {
    "word": "ancient",
    "phonetic": "/ancient/",
    "meaning": "新概念词汇：ancient",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ancient' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ancient'。",
    "lessonId": 68
  },
  {
    "word": "anger",
    "phonetic": "/anger/",
    "meaning": "新概念词汇：anger",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anger' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anger'。",
    "lessonId": 69
  },
  {
    "word": "angry",
    "phonetic": "/angry/",
    "meaning": "新概念词汇：angry",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'angry' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'angry'。",
    "lessonId": 70
  },
  {
    "word": "animal",
    "phonetic": "/animal/",
    "meaning": "新概念词汇：animal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'animal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'animal'。",
    "lessonId": 71
  },
  {
    "word": "announce",
    "phonetic": "/announce/",
    "meaning": "新概念词汇：announce",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'announce' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'announce'。",
    "lessonId": 72
  },
  {
    "word": "annoy",
    "phonetic": "/annoy/",
    "meaning": "新概念词汇：annoy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'annoy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'annoy'。",
    "lessonId": 73
  },
  {
    "word": "another",
    "phonetic": "/another/",
    "meaning": "新概念词汇：another",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'another' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'another'。",
    "lessonId": 74
  },
  {
    "word": "anxious",
    "phonetic": "/anxious/",
    "meaning": "新概念词汇：anxious",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anxious' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anxious'。",
    "lessonId": 75
  },
  {
    "word": "anybody",
    "phonetic": "/anybody/",
    "meaning": "新概念词汇：anybody",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anybody' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anybody'。",
    "lessonId": 76
  },
  {
    "word": "anyone",
    "phonetic": "/anyone/",
    "meaning": "新概念词汇：anyone",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anyone' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anyone'。",
    "lessonId": 77
  },
  {
    "word": "anything",
    "phonetic": "/anything/",
    "meaning": "新概念词汇：anything",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anything' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anything'。",
    "lessonId": 78
  },
  {
    "word": "anyway",
    "phonetic": "/anyway/",
    "meaning": "新概念词汇：anyway",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anyway' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anyway'。",
    "lessonId": 79
  },
  {
    "word": "anywhere",
    "phonetic": "/anywhere/",
    "meaning": "新概念词汇：anywhere",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'anywhere' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'anywhere'。",
    "lessonId": 80
  },
  {
    "word": "apologize",
    "phonetic": "/apologize/",
    "meaning": "新概念词汇：apologize",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'apologize' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'apologize'。",
    "lessonId": 81
  },
  {
    "word": "apology",
    "phonetic": "/apology/",
    "meaning": "新概念词汇：apology",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'apology' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'apology'。",
    "lessonId": 82
  },
  {
    "word": "appear",
    "phonetic": "/appear/",
    "meaning": "新概念词汇：appear",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'appear' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'appear'。",
    "lessonId": 83
  },
  {
    "word": "applaud",
    "phonetic": "/applaud/",
    "meaning": "新概念词汇：applaud",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'applaud' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'applaud'。",
    "lessonId": 84
  },
  {
    "word": "applause",
    "phonetic": "/applause/",
    "meaning": "新概念词汇：applause",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'applause' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'applause'。",
    "lessonId": 85
  },
  {
    "word": "appointment",
    "phonetic": "/appointment/",
    "meaning": "新概念词汇：appointment",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'appointment' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'appointment'。",
    "lessonId": 86
  },
  {
    "word": "appreciate",
    "phonetic": "/appreciate/",
    "meaning": "新概念词汇：appreciate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'appreciate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'appreciate'。",
    "lessonId": 87
  },
  {
    "word": "approach",
    "phonetic": "/approach/",
    "meaning": "新概念词汇：approach",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'approach' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'approach'。",
    "lessonId": 88
  },
  {
    "word": "approve",
    "phonetic": "/approve/",
    "meaning": "新概念词汇：approve",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'approve' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'approve'。",
    "lessonId": 89
  },
  {
    "word": "apron",
    "phonetic": "/apron/",
    "meaning": "新概念词汇：apron",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'apron' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'apron'。",
    "lessonId": 90
  },
  {
    "word": "arch",
    "phonetic": "/arch/",
    "meaning": "新概念词汇：arch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arch'。",
    "lessonId": 91
  },
  {
    "word": "archaeologist",
    "phonetic": "/archaeologist/",
    "meaning": "新概念词汇：archaeologist",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'archaeologist' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'archaeologist'。",
    "lessonId": 92
  },
  {
    "word": "architect",
    "phonetic": "/architect/",
    "meaning": "新概念词汇：architect",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'architect' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'architect'。",
    "lessonId": 93
  },
  {
    "word": "area",
    "phonetic": "/area/",
    "meaning": "新概念词汇：area",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'area' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'area'。",
    "lessonId": 94
  },
  {
    "word": "argue",
    "phonetic": "/argue/",
    "meaning": "新概念词汇：argue",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'argue' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'argue'。",
    "lessonId": 95
  },
  {
    "word": "argument",
    "phonetic": "/argument/",
    "meaning": "新概念词汇：argument",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'argument' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'argument'。",
    "lessonId": 96
  },
  {
    "word": "arise",
    "phonetic": "/arise/",
    "meaning": "新概念词汇：arise",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arise' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arise'。",
    "lessonId": 97
  },
  {
    "word": "arithmetic",
    "phonetic": "/arithmetic/",
    "meaning": "新概念词汇：arithmetic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arithmetic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arithmetic'。",
    "lessonId": 98
  },
  {
    "word": "arm",
    "phonetic": "/arm/",
    "meaning": "新概念词汇：arm",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arm' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arm'。",
    "lessonId": 99
  },
  {
    "word": "army",
    "phonetic": "/army/",
    "meaning": "新概念词汇：army",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'army' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'army'。",
    "lessonId": 100
  },
  {
    "word": "around",
    "phonetic": "/around/",
    "meaning": "新概念词汇：around",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'around' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'around'。",
    "lessonId": 101
  },
  {
    "word": "arrange",
    "phonetic": "/arrange/",
    "meaning": "新概念词汇：arrange",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrange' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrange'。",
    "lessonId": 102
  },
  {
    "word": "arrangement",
    "phonetic": "/arrangement/",
    "meaning": "新概念词汇：arrangement",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrangement' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrangement'。",
    "lessonId": 103
  },
  {
    "word": "arrest",
    "phonetic": "/arrest/",
    "meaning": "新概念词汇：arrest",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrest' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrest'。",
    "lessonId": 104
  },
  {
    "word": "arrival",
    "phonetic": "/arrival/",
    "meaning": "新概念词汇：arrival",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrival' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrival'。",
    "lessonId": 105
  },
  {
    "word": "arrive",
    "phonetic": "/arrive/",
    "meaning": "新概念词汇：arrive",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrive' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrive'。",
    "lessonId": 106
  },
  {
    "word": "arrow",
    "phonetic": "/arrow/",
    "meaning": "新概念词汇：arrow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'arrow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'arrow'。",
    "lessonId": 107
  },
  {
    "word": "art",
    "phonetic": "/art/",
    "meaning": "新概念词汇：art",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'art' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'art'。",
    "lessonId": 108
  },
  {
    "word": "article",
    "phonetic": "/article/",
    "meaning": "新概念词汇：article",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'article' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'article'。",
    "lessonId": 109
  },
  {
    "word": "artist",
    "phonetic": "/artist/",
    "meaning": "新概念词汇：artist",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'artist' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'artist'。",
    "lessonId": 110
  },
  {
    "word": "ashamed",
    "phonetic": "/ashamed/",
    "meaning": "新概念词汇：ashamed",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ashamed' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ashamed'。",
    "lessonId": 111
  },
  {
    "word": "aside",
    "phonetic": "/aside/",
    "meaning": "新概念词汇：aside",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'aside' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'aside'。",
    "lessonId": 112
  },
  {
    "word": "asleep",
    "phonetic": "/asleep/",
    "meaning": "新概念词汇：asleep",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'asleep' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'asleep'。",
    "lessonId": 113
  },
  {
    "word": "aspect",
    "phonetic": "/aspect/",
    "meaning": "新概念词汇：aspect",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'aspect' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'aspect'。",
    "lessonId": 114
  },
  {
    "word": "assassinate",
    "phonetic": "/assassinate/",
    "meaning": "新概念词汇：assassinate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assassinate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assassinate'。",
    "lessonId": 115
  },
  {
    "word": "assemble",
    "phonetic": "/assemble/",
    "meaning": "新概念词汇：assemble",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assemble' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assemble'。",
    "lessonId": 116
  },
  {
    "word": "assembly",
    "phonetic": "/assembly/",
    "meaning": "新概念词汇：assembly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assembly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assembly'。",
    "lessonId": 117
  },
  {
    "word": "assist",
    "phonetic": "/assist/",
    "meaning": "新概念词汇：assist",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assist' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assist'。",
    "lessonId": 118
  },
  {
    "word": "assistance",
    "phonetic": "/assistance/",
    "meaning": "新概念词汇：assistance",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assistance' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assistance'。",
    "lessonId": 119
  },
  {
    "word": "associate",
    "phonetic": "/associate/",
    "meaning": "新概念词汇：associate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'associate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'associate'。",
    "lessonId": 120
  },
  {
    "word": "association",
    "phonetic": "/association/",
    "meaning": "新概念词汇：association",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'association' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'association'。",
    "lessonId": 121
  },
  {
    "word": "assume",
    "phonetic": "/assume/",
    "meaning": "新概念词汇：assume",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'assume' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'assume'。",
    "lessonId": 122
  },
  {
    "word": "astonish",
    "phonetic": "/astonish/",
    "meaning": "新概念词汇：astonish",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'astonish' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'astonish'。",
    "lessonId": 123
  },
  {
    "word": "athlete",
    "phonetic": "/athlete/",
    "meaning": "新概念词汇：athlete",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'athlete' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'athlete'。",
    "lessonId": 124
  },
  {
    "word": "athletic",
    "phonetic": "/athletic/",
    "meaning": "新概念词汇：athletic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'athletic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'athletic'。",
    "lessonId": 125
  },
  {
    "word": "atmosphere",
    "phonetic": "/atmosphere/",
    "meaning": "新概念词汇：atmosphere",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'atmosphere' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'atmosphere'。",
    "lessonId": 126
  },
  {
    "word": "attach",
    "phonetic": "/attach/",
    "meaning": "新概念词汇：attach",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attach' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attach'。",
    "lessonId": 127
  },
  {
    "word": "attack",
    "phonetic": "/attack/",
    "meaning": "新概念词汇：attack",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attack' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attack'。",
    "lessonId": 128
  },
  {
    "word": "attempt",
    "phonetic": "/attempt/",
    "meaning": "新概念词汇：attempt",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attempt' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attempt'。",
    "lessonId": 129
  },
  {
    "word": "attend",
    "phonetic": "/attend/",
    "meaning": "新概念词汇：attend",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attend' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attend'。",
    "lessonId": 130
  },
  {
    "word": "attention",
    "phonetic": "/attention/",
    "meaning": "新概念词汇：attention",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attention' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attention'。",
    "lessonId": 131
  },
  {
    "word": "attitude",
    "phonetic": "/attitude/",
    "meaning": "新概念词汇：attitude",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attitude' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attitude'。",
    "lessonId": 132
  },
  {
    "word": "attract",
    "phonetic": "/attract/",
    "meaning": "新概念词汇：attract",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attract' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attract'。",
    "lessonId": 133
  },
  {
    "word": "attraction",
    "phonetic": "/attraction/",
    "meaning": "新概念词汇：attraction",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attraction' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attraction'。",
    "lessonId": 134
  },
  {
    "word": "attractive",
    "phonetic": "/attractive/",
    "meaning": "新概念词汇：attractive",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'attractive' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'attractive'。",
    "lessonId": 135
  },
  {
    "word": "audience",
    "phonetic": "/audience/",
    "meaning": "新概念词汇：audience",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'audience' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'audience'。",
    "lessonId": 136
  },
  {
    "word": "author",
    "phonetic": "/author/",
    "meaning": "新概念词汇：author",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'author' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'author'。",
    "lessonId": 137
  },
  {
    "word": "authority",
    "phonetic": "/authority/",
    "meaning": "新概念词汇：authority",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'authority' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'authority'。",
    "lessonId": 138
  },
  {
    "word": "automatic",
    "phonetic": "/automatic/",
    "meaning": "新概念词汇：automatic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'automatic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'automatic'。",
    "lessonId": 139
  },
  {
    "word": "available",
    "phonetic": "/available/",
    "meaning": "新概念词汇：available",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'available' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'available'。",
    "lessonId": 140
  },
  {
    "word": "avenue",
    "phonetic": "/avenue/",
    "meaning": "新概念词汇：avenue",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'avenue' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'avenue'。",
    "lessonId": 141
  },
  {
    "word": "average",
    "phonetic": "/average/",
    "meaning": "新概念词汇：average",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'average' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'average'。",
    "lessonId": 142
  },
  {
    "word": "avoid",
    "phonetic": "/avoid/",
    "meaning": "新概念词汇：avoid",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'avoid' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'avoid'。",
    "lessonId": 143
  },
  {
    "word": "awake",
    "phonetic": "/awake/",
    "meaning": "新概念词汇：awake",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'awake' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'awake'。",
    "lessonId": 144
  },
  {
    "word": "award",
    "phonetic": "/award/",
    "meaning": "新概念词汇：award",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'award' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'award'。",
    "lessonId": 1
  },
  {
    "word": "aware",
    "phonetic": "/aware/",
    "meaning": "新概念词汇：aware",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'aware' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'aware'。",
    "lessonId": 2
  },
  {
    "word": "away",
    "phonetic": "/away/",
    "meaning": "新概念词汇：away",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'away' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'away'。",
    "lessonId": 3
  },
  {
    "word": "awful",
    "phonetic": "/awful/",
    "meaning": "新概念词汇：awful",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'awful' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'awful'。",
    "lessonId": 4
  },
  {
    "word": "baby",
    "phonetic": "/baby/",
    "meaning": "新概念词汇：baby",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'baby' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'baby'。",
    "lessonId": 5
  },
  {
    "word": "back",
    "phonetic": "/back/",
    "meaning": "新概念词汇：back",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'back' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'back'。",
    "lessonId": 6
  },
  {
    "word": "background",
    "phonetic": "/background/",
    "meaning": "新概念词汇：background",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'background' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'background'。",
    "lessonId": 7
  },
  {
    "word": "backwards",
    "phonetic": "/backwards/",
    "meaning": "新概念词汇：backwards",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'backwards' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'backwards'。",
    "lessonId": 8
  },
  {
    "word": "bacon",
    "phonetic": "/bacon/",
    "meaning": "新概念词汇：bacon",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bacon' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bacon'。",
    "lessonId": 9
  },
  {
    "word": "bacterium",
    "phonetic": "/bacterium/",
    "meaning": "新概念词汇：bacterium",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bacterium' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bacterium'。",
    "lessonId": 10
  },
  {
    "word": "bad",
    "phonetic": "/bad/",
    "meaning": "新概念词汇：bad",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bad' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bad'。",
    "lessonId": 11
  },
  {
    "word": "badge",
    "phonetic": "/badge/",
    "meaning": "新概念词汇：badge",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'badge' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'badge'。",
    "lessonId": 12
  },
  {
    "word": "bag",
    "phonetic": "/bag/",
    "meaning": "新概念词汇：bag",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bag' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bag'。",
    "lessonId": 13
  },
  {
    "word": "baggage",
    "phonetic": "/baggage/",
    "meaning": "新概念词汇：baggage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'baggage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'baggage'。",
    "lessonId": 14
  },
  {
    "word": "bake",
    "phonetic": "/bake/",
    "meaning": "新概念词汇：bake",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bake' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bake'。",
    "lessonId": 15
  },
  {
    "word": "baker",
    "phonetic": "/baker/",
    "meaning": "新概念词汇：baker",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'baker' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'baker'。",
    "lessonId": 16
  },
  {
    "word": "bakery",
    "phonetic": "/bakery/",
    "meaning": "新概念词汇：bakery",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bakery' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bakery'。",
    "lessonId": 17
  },
  {
    "word": "balance",
    "phonetic": "/balance/",
    "meaning": "新概念词汇：balance",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'balance' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'balance'。",
    "lessonId": 18
  },
  {
    "word": "balcony",
    "phonetic": "/balcony/",
    "meaning": "新概念词汇：balcony",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'balcony' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'balcony'。",
    "lessonId": 19
  },
  {
    "word": "bald",
    "phonetic": "/bald/",
    "meaning": "新概念词汇：bald",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bald' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bald'。",
    "lessonId": 20
  },
  {
    "word": "ball",
    "phonetic": "/ball/",
    "meaning": "新概念词汇：ball",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ball' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ball'。",
    "lessonId": 21
  },
  {
    "word": "ballet",
    "phonetic": "/ballet/",
    "meaning": "新概念词汇：ballet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ballet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ballet'。",
    "lessonId": 22
  },
  {
    "word": "balloon",
    "phonetic": "/balloon/",
    "meaning": "新概念词汇：balloon",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'balloon' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'balloon'。",
    "lessonId": 23
  },
  {
    "word": "ballpoint",
    "phonetic": "/ballpoint/",
    "meaning": "新概念词汇：ballpoint",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ballpoint' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ballpoint'。",
    "lessonId": 24
  },
  {
    "word": "band",
    "phonetic": "/band/",
    "meaning": "新概念词汇：band",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'band' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'band'。",
    "lessonId": 25
  },
  {
    "word": "bandage",
    "phonetic": "/bandage/",
    "meaning": "新概念词汇：bandage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bandage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bandage'。",
    "lessonId": 26
  },
  {
    "word": "bank",
    "phonetic": "/bank/",
    "meaning": "新概念词汇：bank",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bank' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bank'。",
    "lessonId": 27
  },
  {
    "word": "banker",
    "phonetic": "/banker/",
    "meaning": "新概念词汇：banker",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'banker' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'banker'。",
    "lessonId": 28
  },
  {
    "word": "bar",
    "phonetic": "/bar/",
    "meaning": "新概念词汇：bar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bar'。",
    "lessonId": 29
  },
  {
    "word": "barber",
    "phonetic": "/barber/",
    "meaning": "新概念词汇：barber",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'barber' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'barber'。",
    "lessonId": 30
  },
  {
    "word": "bare",
    "phonetic": "/bare/",
    "meaning": "新概念词汇：bare",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bare' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bare'。",
    "lessonId": 31
  },
  {
    "word": "bargain",
    "phonetic": "/bargain/",
    "meaning": "新概念词汇：bargain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bargain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bargain'。",
    "lessonId": 32
  },
  {
    "word": "bark",
    "phonetic": "/bark/",
    "meaning": "新概念词汇：bark",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bark' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bark'。",
    "lessonId": 33
  },
  {
    "word": "barn",
    "phonetic": "/barn/",
    "meaning": "新概念词汇：barn",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'barn' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'barn'。",
    "lessonId": 34
  },
  {
    "word": "barrel",
    "phonetic": "/barrel/",
    "meaning": "新概念词汇：barrel",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'barrel' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'barrel'。",
    "lessonId": 35
  },
  {
    "word": "barrier",
    "phonetic": "/barrier/",
    "meaning": "新概念词汇：barrier",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'barrier' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'barrier'。",
    "lessonId": 36
  },
  {
    "word": "base",
    "phonetic": "/base/",
    "meaning": "新概念词汇：base",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'base' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'base'。",
    "lessonId": 37
  },
  {
    "word": "baseball",
    "phonetic": "/baseball/",
    "meaning": "新概念词汇：baseball",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'baseball' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'baseball'。",
    "lessonId": 38
  },
  {
    "word": "basement",
    "phonetic": "/basement/",
    "meaning": "新概念词汇：basement",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'basement' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'basement'。",
    "lessonId": 39
  },
  {
    "word": "basin",
    "phonetic": "/basin/",
    "meaning": "新概念词汇：basin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'basin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'basin'。",
    "lessonId": 40
  },
  {
    "word": "basket",
    "phonetic": "/basket/",
    "meaning": "新概念词汇：basket",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'basket' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'basket'。",
    "lessonId": 41
  },
  {
    "word": "basketball",
    "phonetic": "/basketball/",
    "meaning": "新概念词汇：basketball",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'basketball' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'basketball'。",
    "lessonId": 42
  },
  {
    "word": "bat",
    "phonetic": "/bat/",
    "meaning": "新概念词汇：bat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bat'。",
    "lessonId": 43
  },
  {
    "word": "bath",
    "phonetic": "/bath/",
    "meaning": "新概念词汇：bath",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bath' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bath'。",
    "lessonId": 44
  },
  {
    "word": "bathe",
    "phonetic": "/bathe/",
    "meaning": "新概念词汇：bathe",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bathe' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bathe'。",
    "lessonId": 45
  },
  {
    "word": "bathing",
    "phonetic": "/bathing/",
    "meaning": "新概念词汇：bathing",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bathing' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bathing'。",
    "lessonId": 46
  },
  {
    "word": "battery",
    "phonetic": "/battery/",
    "meaning": "新概念词汇：battery",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'battery' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'battery'。",
    "lessonId": 47
  },
  {
    "word": "battle",
    "phonetic": "/battle/",
    "meaning": "新概念词汇：battle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'battle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'battle'。",
    "lessonId": 48
  },
  {
    "word": "bay",
    "phonetic": "/bay/",
    "meaning": "新概念词汇：bay",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bay' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bay'。",
    "lessonId": 49
  },
  {
    "word": "beach",
    "phonetic": "/beach/",
    "meaning": "新概念词汇：beach",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beach' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beach'。",
    "lessonId": 50
  },
  {
    "word": "beacon",
    "phonetic": "/beacon/",
    "meaning": "新概念词汇：beacon",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beacon' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beacon'。",
    "lessonId": 51
  },
  {
    "word": "beak",
    "phonetic": "/beak/",
    "meaning": "新概念词汇：beak",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beak' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beak'。",
    "lessonId": 52
  },
  {
    "word": "beam",
    "phonetic": "/beam/",
    "meaning": "新概念词汇：beam",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beam' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beam'。",
    "lessonId": 53
  },
  {
    "word": "bean",
    "phonetic": "/bean/",
    "meaning": "新概念词汇：bean",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bean' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bean'。",
    "lessonId": 54
  },
  {
    "word": "bear",
    "phonetic": "/bear/",
    "meaning": "新概念词汇：bear",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bear' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bear'。",
    "lessonId": 55
  },
  {
    "word": "beard",
    "phonetic": "/beard/",
    "meaning": "新概念词汇：beard",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beard' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beard'。",
    "lessonId": 56
  },
  {
    "word": "beast",
    "phonetic": "/beast/",
    "meaning": "新概念词汇：beast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beast'。",
    "lessonId": 57
  },
  {
    "word": "beat",
    "phonetic": "/beat/",
    "meaning": "新概念词汇：beat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beat'。",
    "lessonId": 58
  },
  {
    "word": "beautiful",
    "phonetic": "/beautiful/",
    "meaning": "新概念词汇：beautiful",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beautiful' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beautiful'。",
    "lessonId": 59
  },
  {
    "word": "beauty",
    "phonetic": "/beauty/",
    "meaning": "新概念词汇：beauty",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beauty' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beauty'。",
    "lessonId": 60
  },
  {
    "word": "because",
    "phonetic": "/because/",
    "meaning": "新概念词汇：because",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'because' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'because'。",
    "lessonId": 61
  },
  {
    "word": "become",
    "phonetic": "/become/",
    "meaning": "新概念词汇：become",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'become' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'become'。",
    "lessonId": 62
  },
  {
    "word": "bed",
    "phonetic": "/bed/",
    "meaning": "新概念词汇：bed",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bed' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bed'。",
    "lessonId": 63
  },
  {
    "word": "bee",
    "phonetic": "/bee/",
    "meaning": "新概念词汇：bee",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bee' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bee'。",
    "lessonId": 64
  },
  {
    "word": "beef",
    "phonetic": "/beef/",
    "meaning": "新概念词汇：beef",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beef' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beef'。",
    "lessonId": 65
  },
  {
    "word": "beer",
    "phonetic": "/beer/",
    "meaning": "新概念词汇：beer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beer'。",
    "lessonId": 66
  },
  {
    "word": "beetle",
    "phonetic": "/beetle/",
    "meaning": "新概念词汇：beetle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beetle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beetle'。",
    "lessonId": 67
  },
  {
    "word": "before",
    "phonetic": "/before/",
    "meaning": "新概念词汇：before",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'before' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'before'。",
    "lessonId": 68
  },
  {
    "word": "beg",
    "phonetic": "/beg/",
    "meaning": "新概念词汇：beg",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beg' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beg'。",
    "lessonId": 69
  },
  {
    "word": "beggar",
    "phonetic": "/beggar/",
    "meaning": "新概念词汇：beggar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beggar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beggar'。",
    "lessonId": 70
  },
  {
    "word": "begin",
    "phonetic": "/begin/",
    "meaning": "新概念词汇：begin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'begin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'begin'。",
    "lessonId": 71
  },
  {
    "word": "beginner",
    "phonetic": "/beginner/",
    "meaning": "新概念词汇：beginner",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beginner' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beginner'。",
    "lessonId": 72
  },
  {
    "word": "beginning",
    "phonetic": "/beginning/",
    "meaning": "新概念词汇：beginning",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beginning' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beginning'。",
    "lessonId": 73
  },
  {
    "word": "behave",
    "phonetic": "/behave/",
    "meaning": "新概念词汇：behave",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'behave' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'behave'。",
    "lessonId": 74
  },
  {
    "word": "behavior",
    "phonetic": "/behavior/",
    "meaning": "新概念词汇：behavior",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'behavior' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'behavior'。",
    "lessonId": 75
  },
  {
    "word": "behind",
    "phonetic": "/behind/",
    "meaning": "新概念词汇：behind",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'behind' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'behind'。",
    "lessonId": 76
  },
  {
    "word": "being",
    "phonetic": "/being/",
    "meaning": "新概念词汇：being",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'being' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'being'。",
    "lessonId": 77
  },
  {
    "word": "belief",
    "phonetic": "/belief/",
    "meaning": "新概念词汇：belief",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'belief' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'belief'。",
    "lessonId": 78
  },
  {
    "word": "believe",
    "phonetic": "/believe/",
    "meaning": "新概念词汇：believe",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'believe' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'believe'。",
    "lessonId": 79
  },
  {
    "word": "bell",
    "phonetic": "/bell/",
    "meaning": "新概念词汇：bell",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bell' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bell'。",
    "lessonId": 80
  },
  {
    "word": "belong",
    "phonetic": "/belong/",
    "meaning": "新概念词汇：belong",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'belong' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'belong'。",
    "lessonId": 81
  },
  {
    "word": "below",
    "phonetic": "/below/",
    "meaning": "新概念词汇：below",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'below' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'below'。",
    "lessonId": 82
  },
  {
    "word": "belt",
    "phonetic": "/belt/",
    "meaning": "新概念词汇：belt",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'belt' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'belt'。",
    "lessonId": 83
  },
  {
    "word": "bench",
    "phonetic": "/bench/",
    "meaning": "新概念词汇：bench",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bench' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bench'。",
    "lessonId": 84
  },
  {
    "word": "bend",
    "phonetic": "/bend/",
    "meaning": "新概念词汇：bend",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bend' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bend'。",
    "lessonId": 85
  },
  {
    "word": "beneath",
    "phonetic": "/beneath/",
    "meaning": "新概念词汇：beneath",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beneath' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beneath'。",
    "lessonId": 86
  },
  {
    "word": "benefit",
    "phonetic": "/benefit/",
    "meaning": "新概念词汇：benefit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'benefit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'benefit'。",
    "lessonId": 87
  },
  {
    "word": "berry",
    "phonetic": "/berry/",
    "meaning": "新概念词汇：berry",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'berry' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'berry'。",
    "lessonId": 88
  },
  {
    "word": "beside",
    "phonetic": "/beside/",
    "meaning": "新概念词汇：beside",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beside' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beside'。",
    "lessonId": 89
  },
  {
    "word": "besides",
    "phonetic": "/besides/",
    "meaning": "新概念词汇：besides",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'besides' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'besides'。",
    "lessonId": 90
  },
  {
    "word": "best",
    "phonetic": "/best/",
    "meaning": "新概念词汇：best",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'best' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'best'。",
    "lessonId": 91
  },
  {
    "word": "bet",
    "phonetic": "/bet/",
    "meaning": "新概念词汇：bet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bet'。",
    "lessonId": 92
  },
  {
    "word": "between",
    "phonetic": "/between/",
    "meaning": "新概念词汇：between",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'between' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'between'。",
    "lessonId": 93
  },
  {
    "word": "beyond",
    "phonetic": "/beyond/",
    "meaning": "新概念词汇：beyond",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'beyond' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'beyond'。",
    "lessonId": 94
  },
  {
    "word": "bicycle",
    "phonetic": "/bicycle/",
    "meaning": "新概念词汇：bicycle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bicycle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bicycle'。",
    "lessonId": 95
  },
  {
    "word": "big",
    "phonetic": "/big/",
    "meaning": "新概念词汇：big",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'big' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'big'。",
    "lessonId": 96
  },
  {
    "word": "bike",
    "phonetic": "/bike/",
    "meaning": "新概念词汇：bike",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bike' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bike'。",
    "lessonId": 97
  },
  {
    "word": "bill",
    "phonetic": "/bill/",
    "meaning": "新概念词汇：bill",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bill' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bill'。",
    "lessonId": 98
  },
  {
    "word": "bin",
    "phonetic": "/bin/",
    "meaning": "新概念词汇：bin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bin'。",
    "lessonId": 99
  },
  {
    "word": "biology",
    "phonetic": "/biology/",
    "meaning": "新概念词汇：biology",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'biology' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'biology'。",
    "lessonId": 100
  },
  {
    "word": "bird",
    "phonetic": "/bird/",
    "meaning": "新概念词汇：bird",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bird' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bird'。",
    "lessonId": 101
  },
  {
    "word": "birth",
    "phonetic": "/birth/",
    "meaning": "新概念词汇：birth",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'birth' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'birth'。",
    "lessonId": 102
  },
  {
    "word": "birthday",
    "phonetic": "/birthday/",
    "meaning": "新概念词汇：birthday",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'birthday' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'birthday'。",
    "lessonId": 103
  },
  {
    "word": "biscuit",
    "phonetic": "/biscuit/",
    "meaning": "新概念词汇：biscuit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'biscuit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'biscuit'。",
    "lessonId": 104
  },
  {
    "word": "bit",
    "phonetic": "/bit/",
    "meaning": "新概念词汇：bit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bit'。",
    "lessonId": 105
  },
  {
    "word": "bite",
    "phonetic": "/bite/",
    "meaning": "新概念词汇：bite",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bite' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bite'。",
    "lessonId": 106
  },
  {
    "word": "bitter",
    "phonetic": "/bitter/",
    "meaning": "新概念词汇：bitter",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bitter' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bitter'。",
    "lessonId": 107
  },
  {
    "word": "blackboard",
    "phonetic": "/blackboard/",
    "meaning": "新概念词汇：blackboard",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blackboard' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blackboard'。",
    "lessonId": 108
  },
  {
    "word": "blade",
    "phonetic": "/blade/",
    "meaning": "新概念词汇：blade",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blade' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blade'。",
    "lessonId": 109
  },
  {
    "word": "blame",
    "phonetic": "/blame/",
    "meaning": "新概念词汇：blame",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blame' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blame'。",
    "lessonId": 110
  },
  {
    "word": "blank",
    "phonetic": "/blank/",
    "meaning": "新概念词汇：blank",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blank' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blank'。",
    "lessonId": 111
  },
  {
    "word": "blanket",
    "phonetic": "/blanket/",
    "meaning": "新概念词汇：blanket",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blanket' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blanket'。",
    "lessonId": 112
  },
  {
    "word": "blast",
    "phonetic": "/blast/",
    "meaning": "新概念词汇：blast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blast'。",
    "lessonId": 113
  },
  {
    "word": "bleed",
    "phonetic": "/bleed/",
    "meaning": "新概念词汇：bleed",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bleed' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bleed'。",
    "lessonId": 114
  },
  {
    "word": "blind",
    "phonetic": "/blind/",
    "meaning": "新概念词汇：blind",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blind' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blind'。",
    "lessonId": 115
  },
  {
    "word": "block",
    "phonetic": "/block/",
    "meaning": "新概念词汇：block",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'block' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'block'。",
    "lessonId": 116
  },
  {
    "word": "blonde",
    "phonetic": "/blonde/",
    "meaning": "新概念词汇：blonde",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blonde' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blonde'。",
    "lessonId": 117
  },
  {
    "word": "blood",
    "phonetic": "/blood/",
    "meaning": "新概念词汇：blood",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blood' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blood'。",
    "lessonId": 118
  },
  {
    "word": "blow",
    "phonetic": "/blow/",
    "meaning": "新概念词汇：blow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'blow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'blow'。",
    "lessonId": 119
  },
  {
    "word": "board",
    "phonetic": "/board/",
    "meaning": "新概念词汇：board",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'board' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'board'。",
    "lessonId": 120
  },
  {
    "word": "boast",
    "phonetic": "/boast/",
    "meaning": "新概念词汇：boast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boast'。",
    "lessonId": 121
  },
  {
    "word": "body",
    "phonetic": "/body/",
    "meaning": "新概念词汇：body",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'body' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'body'。",
    "lessonId": 122
  },
  {
    "word": "boil",
    "phonetic": "/boil/",
    "meaning": "新概念词汇：boil",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boil' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boil'。",
    "lessonId": 123
  },
  {
    "word": "boiler",
    "phonetic": "/boiler/",
    "meaning": "新概念词汇：boiler",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boiler' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boiler'。",
    "lessonId": 124
  },
  {
    "word": "bold",
    "phonetic": "/bold/",
    "meaning": "新概念词汇：bold",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bold' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bold'。",
    "lessonId": 125
  },
  {
    "word": "bomb",
    "phonetic": "/bomb/",
    "meaning": "新概念词汇：bomb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bomb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bomb'。",
    "lessonId": 126
  },
  {
    "word": "bond",
    "phonetic": "/bond/",
    "meaning": "新概念词汇：bond",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bond' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bond'。",
    "lessonId": 127
  },
  {
    "word": "bone",
    "phonetic": "/bone/",
    "meaning": "新概念词汇：bone",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bone' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bone'。",
    "lessonId": 128
  },
  {
    "word": "bonus",
    "phonetic": "/bonus/",
    "meaning": "新概念词汇：bonus",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bonus' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bonus'。",
    "lessonId": 129
  },
  {
    "word": "bookcase",
    "phonetic": "/bookcase/",
    "meaning": "新概念词汇：bookcase",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bookcase' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bookcase'。",
    "lessonId": 130
  },
  {
    "word": "booking",
    "phonetic": "/booking/",
    "meaning": "新概念词汇：booking",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'booking' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'booking'。",
    "lessonId": 131
  },
  {
    "word": "bookshelf",
    "phonetic": "/bookshelf/",
    "meaning": "新概念词汇：bookshelf",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bookshelf' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bookshelf'。",
    "lessonId": 132
  },
  {
    "word": "bookstore",
    "phonetic": "/bookstore/",
    "meaning": "新概念词汇：bookstore",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bookstore' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bookstore'。",
    "lessonId": 133
  },
  {
    "word": "boot",
    "phonetic": "/boot/",
    "meaning": "新概念词汇：boot",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boot' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boot'。",
    "lessonId": 134
  },
  {
    "word": "border",
    "phonetic": "/border/",
    "meaning": "新概念词汇：border",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'border' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'border'。",
    "lessonId": 135
  },
  {
    "word": "bored",
    "phonetic": "/bored/",
    "meaning": "新概念词汇：bored",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bored' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bored'。",
    "lessonId": 136
  },
  {
    "word": "boring",
    "phonetic": "/boring/",
    "meaning": "新概念词汇：boring",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boring' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boring'。",
    "lessonId": 137
  },
  {
    "word": "born",
    "phonetic": "/born/",
    "meaning": "新概念词汇：born",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'born' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'born'。",
    "lessonId": 138
  },
  {
    "word": "borrow",
    "phonetic": "/borrow/",
    "meaning": "新概念词汇：borrow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'borrow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'borrow'。",
    "lessonId": 139
  },
  {
    "word": "boss",
    "phonetic": "/boss/",
    "meaning": "新概念词汇：boss",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boss' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boss'。",
    "lessonId": 140
  },
  {
    "word": "both",
    "phonetic": "/both/",
    "meaning": "新概念词汇：both",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'both' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'both'。",
    "lessonId": 141
  },
  {
    "word": "bother",
    "phonetic": "/bother/",
    "meaning": "新概念词汇：bother",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bother' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bother'。",
    "lessonId": 142
  },
  {
    "word": "bottle",
    "phonetic": "/bottle/",
    "meaning": "新概念词汇：bottle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bottle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bottle'。",
    "lessonId": 143
  },
  {
    "word": "bottom",
    "phonetic": "/bottom/",
    "meaning": "新概念词汇：bottom",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bottom' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bottom'。",
    "lessonId": 144
  },
  {
    "word": "bounce",
    "phonetic": "/bounce/",
    "meaning": "新概念词汇：bounce",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bounce' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bounce'。",
    "lessonId": 1
  },
  {
    "word": "bound",
    "phonetic": "/bound/",
    "meaning": "新概念词汇：bound",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bound' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bound'。",
    "lessonId": 2
  },
  {
    "word": "boundary",
    "phonetic": "/boundary/",
    "meaning": "新概念词汇：boundary",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boundary' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boundary'。",
    "lessonId": 3
  },
  {
    "word": "bow",
    "phonetic": "/bow/",
    "meaning": "新概念词汇：bow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bow'。",
    "lessonId": 4
  },
  {
    "word": "bowl",
    "phonetic": "/bowl/",
    "meaning": "新概念词汇：bowl",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bowl' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bowl'。",
    "lessonId": 5
  },
  {
    "word": "box",
    "phonetic": "/box/",
    "meaning": "新概念词汇：box",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'box' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'box'。",
    "lessonId": 6
  },
  {
    "word": "boy",
    "phonetic": "/boy/",
    "meaning": "新概念词汇：boy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'boy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'boy'。",
    "lessonId": 7
  },
  {
    "word": "brain",
    "phonetic": "/brain/",
    "meaning": "新概念词汇：brain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brain'。",
    "lessonId": 8
  },
  {
    "word": "brake",
    "phonetic": "/brake/",
    "meaning": "新概念词汇：brake",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brake' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brake'。",
    "lessonId": 9
  },
  {
    "word": "branch",
    "phonetic": "/branch/",
    "meaning": "新概念词汇：branch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'branch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'branch'。",
    "lessonId": 10
  },
  {
    "word": "brass",
    "phonetic": "/brass/",
    "meaning": "新概念词汇：brass",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brass' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brass'。",
    "lessonId": 11
  },
  {
    "word": "brave",
    "phonetic": "/brave/",
    "meaning": "新概念词汇：brave",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brave' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brave'。",
    "lessonId": 12
  },
  {
    "word": "break",
    "phonetic": "/break/",
    "meaning": "新概念词汇：break",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'break' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'break'。",
    "lessonId": 13
  },
  {
    "word": "breakfast",
    "phonetic": "/breakfast/",
    "meaning": "新概念词汇：breakfast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'breakfast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'breakfast'。",
    "lessonId": 14
  },
  {
    "word": "breath",
    "phonetic": "/breath/",
    "meaning": "新概念词汇：breath",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'breath' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'breath'。",
    "lessonId": 15
  },
  {
    "word": "breathe",
    "phonetic": "/breathe/",
    "meaning": "新概念词汇：breathe",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'breathe' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'breathe'。",
    "lessonId": 16
  },
  {
    "word": "breed",
    "phonetic": "/breed/",
    "meaning": "新概念词汇：breed",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'breed' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'breed'。",
    "lessonId": 17
  },
  {
    "word": "breeze",
    "phonetic": "/breeze/",
    "meaning": "新概念词汇：breeze",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'breeze' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'breeze'。",
    "lessonId": 18
  },
  {
    "word": "brick",
    "phonetic": "/brick/",
    "meaning": "新概念词汇：brick",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brick' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brick'。",
    "lessonId": 19
  },
  {
    "word": "bride",
    "phonetic": "/bride/",
    "meaning": "新概念词汇：bride",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bride' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bride'。",
    "lessonId": 20
  },
  {
    "word": "brief",
    "phonetic": "/brief/",
    "meaning": "新概念词汇：brief",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brief' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brief'。",
    "lessonId": 21
  },
  {
    "word": "bright",
    "phonetic": "/bright/",
    "meaning": "新概念词汇：bright",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bright' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bright'。",
    "lessonId": 22
  },
  {
    "word": "brilliant",
    "phonetic": "/brilliant/",
    "meaning": "新概念词汇：brilliant",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brilliant' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brilliant'。",
    "lessonId": 23
  },
  {
    "word": "bring",
    "phonetic": "/bring/",
    "meaning": "新概念词汇：bring",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bring' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bring'。",
    "lessonId": 24
  },
  {
    "word": "broad",
    "phonetic": "/broad/",
    "meaning": "新概念词汇：broad",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'broad' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'broad'。",
    "lessonId": 25
  },
  {
    "word": "broadcast",
    "phonetic": "/broadcast/",
    "meaning": "新概念词汇：broadcast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'broadcast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'broadcast'。",
    "lessonId": 26
  },
  {
    "word": "brochure",
    "phonetic": "/brochure/",
    "meaning": "新概念词汇：brochure",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brochure' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brochure'。",
    "lessonId": 27
  },
  {
    "word": "broken",
    "phonetic": "/broken/",
    "meaning": "新概念词汇：broken",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'broken' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'broken'。",
    "lessonId": 28
  },
  {
    "word": "bronze",
    "phonetic": "/bronze/",
    "meaning": "新概念词汇：bronze",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bronze' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bronze'。",
    "lessonId": 29
  },
  {
    "word": "brush",
    "phonetic": "/brush/",
    "meaning": "新概念词汇：brush",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'brush' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'brush'。",
    "lessonId": 30
  },
  {
    "word": "bubble",
    "phonetic": "/bubble/",
    "meaning": "新概念词汇：bubble",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bubble' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bubble'。",
    "lessonId": 31
  },
  {
    "word": "bucket",
    "phonetic": "/bucket/",
    "meaning": "新概念词汇：bucket",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bucket' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bucket'。",
    "lessonId": 32
  },
  {
    "word": "budget",
    "phonetic": "/budget/",
    "meaning": "新概念词汇：budget",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'budget' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'budget'。",
    "lessonId": 33
  },
  {
    "word": "buffet",
    "phonetic": "/buffet/",
    "meaning": "新概念词汇：buffet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'buffet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'buffet'。",
    "lessonId": 34
  },
  {
    "word": "bug",
    "phonetic": "/bug/",
    "meaning": "新概念词汇：bug",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bug' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bug'。",
    "lessonId": 35
  },
  {
    "word": "build",
    "phonetic": "/build/",
    "meaning": "新概念词汇：build",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'build' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'build'。",
    "lessonId": 36
  },
  {
    "word": "builder",
    "phonetic": "/builder/",
    "meaning": "新概念词汇：builder",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'builder' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'builder'。",
    "lessonId": 37
  },
  {
    "word": "building",
    "phonetic": "/building/",
    "meaning": "新概念词汇：building",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'building' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'building'。",
    "lessonId": 38
  },
  {
    "word": "bulb",
    "phonetic": "/bulb/",
    "meaning": "新概念词汇：bulb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bulb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bulb'。",
    "lessonId": 39
  },
  {
    "word": "bull",
    "phonetic": "/bull/",
    "meaning": "新概念词汇：bull",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bull' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bull'。",
    "lessonId": 40
  },
  {
    "word": "bullet",
    "phonetic": "/bullet/",
    "meaning": "新概念词汇：bullet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bullet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bullet'。",
    "lessonId": 41
  },
  {
    "word": "bunch",
    "phonetic": "/bunch/",
    "meaning": "新概念词汇：bunch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bunch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bunch'。",
    "lessonId": 42
  },
  {
    "word": "bundle",
    "phonetic": "/bundle/",
    "meaning": "新概念词汇：bundle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bundle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bundle'。",
    "lessonId": 43
  },
  {
    "word": "bungalow",
    "phonetic": "/bungalow/",
    "meaning": "新概念词汇：bungalow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bungalow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bungalow'。",
    "lessonId": 44
  },
  {
    "word": "burden",
    "phonetic": "/burden/",
    "meaning": "新概念词汇：burden",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'burden' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'burden'。",
    "lessonId": 45
  },
  {
    "word": "bureau",
    "phonetic": "/bureau/",
    "meaning": "新概念词汇：bureau",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bureau' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bureau'。",
    "lessonId": 46
  },
  {
    "word": "burglar",
    "phonetic": "/burglar/",
    "meaning": "新概念词汇：burglar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'burglar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'burglar'。",
    "lessonId": 47
  },
  {
    "word": "burn",
    "phonetic": "/burn/",
    "meaning": "新概念词汇：burn",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'burn' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'burn'。",
    "lessonId": 48
  },
  {
    "word": "burst",
    "phonetic": "/burst/",
    "meaning": "新概念词汇：burst",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'burst' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'burst'。",
    "lessonId": 49
  },
  {
    "word": "bush",
    "phonetic": "/bush/",
    "meaning": "新概念词汇：bush",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'bush' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'bush'。",
    "lessonId": 50
  },
  {
    "word": "business",
    "phonetic": "/business/",
    "meaning": "新概念词汇：business",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'business' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'business'。",
    "lessonId": 51
  },
  {
    "word": "businessman",
    "phonetic": "/businessman/",
    "meaning": "新概念词汇：businessman",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'businessman' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'businessman'。",
    "lessonId": 52
  },
  {
    "word": "busy",
    "phonetic": "/busy/",
    "meaning": "新概念词汇：busy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'busy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'busy'。",
    "lessonId": 53
  },
  {
    "word": "but",
    "phonetic": "/but/",
    "meaning": "新概念词汇：but",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'but' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'but'。",
    "lessonId": 54
  },
  {
    "word": "butcher",
    "phonetic": "/butcher/",
    "meaning": "新概念词汇：butcher",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'butcher' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'butcher'。",
    "lessonId": 55
  },
  {
    "word": "butterfly",
    "phonetic": "/butterfly/",
    "meaning": "新概念词汇：butterfly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'butterfly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'butterfly'。",
    "lessonId": 56
  },
  {
    "word": "button",
    "phonetic": "/button/",
    "meaning": "新概念词汇：button",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'button' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'button'。",
    "lessonId": 57
  },
  {
    "word": "buy",
    "phonetic": "/buy/",
    "meaning": "新概念词汇：buy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'buy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'buy'。",
    "lessonId": 58
  },
  {
    "word": "buyer",
    "phonetic": "/buyer/",
    "meaning": "新概念词汇：buyer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'buyer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'buyer'。",
    "lessonId": 59
  },
  {
    "word": "cabin",
    "phonetic": "/cabin/",
    "meaning": "新概念词汇：cabin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cabin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cabin'。",
    "lessonId": 60
  },
  {
    "word": "cabinet",
    "phonetic": "/cabinet/",
    "meaning": "新概念词汇：cabinet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cabinet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cabinet'。",
    "lessonId": 61
  },
  {
    "word": "cable",
    "phonetic": "/cable/",
    "meaning": "新概念词汇：cable",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cable' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cable'。",
    "lessonId": 62
  },
  {
    "word": "cafe",
    "phonetic": "/cafe/",
    "meaning": "新概念词汇：cafe",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cafe' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cafe'。",
    "lessonId": 63
  },
  {
    "word": "cage",
    "phonetic": "/cage/",
    "meaning": "新概念词汇：cage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cage'。",
    "lessonId": 64
  },
  {
    "word": "calculator",
    "phonetic": "/calculator/",
    "meaning": "新概念词汇：calculator",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'calculator' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'calculator'。",
    "lessonId": 65
  },
  {
    "word": "calendar",
    "phonetic": "/calendar/",
    "meaning": "新概念词汇：calendar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'calendar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'calendar'。",
    "lessonId": 66
  },
  {
    "word": "calf",
    "phonetic": "/calf/",
    "meaning": "新概念词汇：calf",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'calf' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'calf'。",
    "lessonId": 67
  },
  {
    "word": "call",
    "phonetic": "/call/",
    "meaning": "新概念词汇：call",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'call' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'call'。",
    "lessonId": 68
  },
  {
    "word": "calm",
    "phonetic": "/calm/",
    "meaning": "新概念词汇：calm",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'calm' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'calm'。",
    "lessonId": 69
  },
  {
    "word": "camera",
    "phonetic": "/camera/",
    "meaning": "新概念词汇：camera",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'camera' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'camera'。",
    "lessonId": 70
  },
  {
    "word": "camp",
    "phonetic": "/camp/",
    "meaning": "新概念词汇：camp",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'camp' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'camp'。",
    "lessonId": 71
  },
  {
    "word": "campaign",
    "phonetic": "/campaign/",
    "meaning": "新概念词汇：campaign",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'campaign' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'campaign'。",
    "lessonId": 72
  },
  {
    "word": "camping",
    "phonetic": "/camping/",
    "meaning": "新概念词汇：camping",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'camping' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'camping'。",
    "lessonId": 73
  },
  {
    "word": "campus",
    "phonetic": "/campus/",
    "meaning": "新概念词汇：campus",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'campus' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'campus'。",
    "lessonId": 74
  },
  {
    "word": "can",
    "phonetic": "/can/",
    "meaning": "新概念词汇：can",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'can' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'can'。",
    "lessonId": 75
  },
  {
    "word": "canal",
    "phonetic": "/canal/",
    "meaning": "新概念词汇：canal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'canal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'canal'。",
    "lessonId": 76
  },
  {
    "word": "cancel",
    "phonetic": "/cancel/",
    "meaning": "新概念词汇：cancel",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cancel' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cancel'。",
    "lessonId": 77
  },
  {
    "word": "cancer",
    "phonetic": "/cancer/",
    "meaning": "新概念词汇：cancer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cancer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cancer'。",
    "lessonId": 78
  },
  {
    "word": "candidate",
    "phonetic": "/candidate/",
    "meaning": "新概念词汇：candidate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'candidate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'candidate'。",
    "lessonId": 79
  },
  {
    "word": "candle",
    "phonetic": "/candle/",
    "meaning": "新概念词汇：candle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'candle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'candle'。",
    "lessonId": 80
  },
  {
    "word": "candy",
    "phonetic": "/candy/",
    "meaning": "新概念词汇：candy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'candy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'candy'。",
    "lessonId": 81
  },
  {
    "word": "canteen",
    "phonetic": "/canteen/",
    "meaning": "新概念词汇：canteen",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'canteen' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'canteen'。",
    "lessonId": 82
  },
  {
    "word": "cap",
    "phonetic": "/cap/",
    "meaning": "新概念词汇：cap",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cap' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cap'。",
    "lessonId": 83
  },
  {
    "word": "capable",
    "phonetic": "/capable/",
    "meaning": "新概念词汇：capable",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'capable' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'capable'。",
    "lessonId": 84
  },
  {
    "word": "capacity",
    "phonetic": "/capacity/",
    "meaning": "新概念词汇：capacity",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'capacity' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'capacity'。",
    "lessonId": 85
  },
  {
    "word": "capital",
    "phonetic": "/capital/",
    "meaning": "新概念词汇：capital",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'capital' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'capital'。",
    "lessonId": 86
  },
  {
    "word": "captain",
    "phonetic": "/captain/",
    "meaning": "新概念词汇：captain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'captain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'captain'。",
    "lessonId": 87
  },
  {
    "word": "caption",
    "phonetic": "/caption/",
    "meaning": "新概念词汇：caption",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'caption' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'caption'。",
    "lessonId": 88
  },
  {
    "word": "capture",
    "phonetic": "/capture/",
    "meaning": "新概念词汇：capture",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'capture' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'capture'。",
    "lessonId": 89
  },
  {
    "word": "card",
    "phonetic": "/card/",
    "meaning": "新概念词汇：card",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'card' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'card'。",
    "lessonId": 90
  },
  {
    "word": "cardboard",
    "phonetic": "/cardboard/",
    "meaning": "新概念词汇：cardboard",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cardboard' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cardboard'。",
    "lessonId": 91
  },
  {
    "word": "care",
    "phonetic": "/care/",
    "meaning": "新概念词汇：care",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'care' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'care'。",
    "lessonId": 92
  },
  {
    "word": "career",
    "phonetic": "/career/",
    "meaning": "新概念词汇：career",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'career' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'career'。",
    "lessonId": 93
  },
  {
    "word": "careful",
    "phonetic": "/careful/",
    "meaning": "新概念词汇：careful",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'careful' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'careful'。",
    "lessonId": 94
  },
  {
    "word": "careless",
    "phonetic": "/careless/",
    "meaning": "新概念词汇：careless",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'careless' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'careless'。",
    "lessonId": 95
  },
  {
    "word": "caretaker",
    "phonetic": "/caretaker/",
    "meaning": "新概念词汇：caretaker",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'caretaker' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'caretaker'。",
    "lessonId": 96
  },
  {
    "word": "cargo",
    "phonetic": "/cargo/",
    "meaning": "新概念词汇：cargo",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cargo' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cargo'。",
    "lessonId": 97
  },
  {
    "word": "carpet",
    "phonetic": "/carpet/",
    "meaning": "新概念词汇：carpet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'carpet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'carpet'。",
    "lessonId": 98
  },
  {
    "word": "carriage",
    "phonetic": "/carriage/",
    "meaning": "新概念词汇：carriage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'carriage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'carriage'。",
    "lessonId": 99
  },
  {
    "word": "carrier",
    "phonetic": "/carrier/",
    "meaning": "新概念词汇：carrier",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'carrier' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'carrier'。",
    "lessonId": 100
  },
  {
    "word": "carry",
    "phonetic": "/carry/",
    "meaning": "新概念词汇：carry",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'carry' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'carry'。",
    "lessonId": 101
  },
  {
    "word": "cart",
    "phonetic": "/cart/",
    "meaning": "新概念词汇：cart",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cart' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cart'。",
    "lessonId": 102
  },
  {
    "word": "cartoon",
    "phonetic": "/cartoon/",
    "meaning": "新概念词汇：cartoon",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cartoon' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cartoon'。",
    "lessonId": 103
  },
  {
    "word": "case",
    "phonetic": "/case/",
    "meaning": "新概念词汇：case",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'case' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'case'。",
    "lessonId": 104
  },
  {
    "word": "cash",
    "phonetic": "/cash/",
    "meaning": "新概念词汇：cash",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cash' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cash'。",
    "lessonId": 105
  },
  {
    "word": "cashier",
    "phonetic": "/cashier/",
    "meaning": "新概念词汇：cashier",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cashier' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cashier'。",
    "lessonId": 106
  },
  {
    "word": "casino",
    "phonetic": "/casino/",
    "meaning": "新概念词汇：casino",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'casino' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'casino'。",
    "lessonId": 107
  },
  {
    "word": "castle",
    "phonetic": "/castle/",
    "meaning": "新概念词汇：castle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'castle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'castle'。",
    "lessonId": 108
  },
  {
    "word": "casual",
    "phonetic": "/casual/",
    "meaning": "新概念词汇：casual",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'casual' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'casual'。",
    "lessonId": 109
  },
  {
    "word": "cat",
    "phonetic": "/cat/",
    "meaning": "新概念词汇：cat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cat'。",
    "lessonId": 110
  },
  {
    "word": "catalog",
    "phonetic": "/catalog/",
    "meaning": "新概念词汇：catalog",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'catalog' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'catalog'。",
    "lessonId": 111
  },
  {
    "word": "catch",
    "phonetic": "/catch/",
    "meaning": "新概念词汇：catch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'catch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'catch'。",
    "lessonId": 112
  },
  {
    "word": "category",
    "phonetic": "/category/",
    "meaning": "新概念词汇：category",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'category' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'category'。",
    "lessonId": 113
  },
  {
    "word": "cater",
    "phonetic": "/cater/",
    "meaning": "新概念词汇：cater",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cater' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cater'。",
    "lessonId": 114
  },
  {
    "word": "cathedral",
    "phonetic": "/cathedral/",
    "meaning": "新概念词汇：cathedral",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cathedral' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cathedral'。",
    "lessonId": 115
  },
  {
    "word": "cattle",
    "phonetic": "/cattle/",
    "meaning": "新概念词汇：cattle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cattle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cattle'。",
    "lessonId": 116
  },
  {
    "word": "cause",
    "phonetic": "/cause/",
    "meaning": "新概念词汇：cause",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cause' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cause'。",
    "lessonId": 117
  },
  {
    "word": "cave",
    "phonetic": "/cave/",
    "meaning": "新概念词汇：cave",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cave' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cave'。",
    "lessonId": 118
  },
  {
    "word": "ceiling",
    "phonetic": "/ceiling/",
    "meaning": "新概念词汇：ceiling",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ceiling' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ceiling'。",
    "lessonId": 119
  },
  {
    "word": "celebrate",
    "phonetic": "/celebrate/",
    "meaning": "新概念词汇：celebrate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'celebrate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'celebrate'。",
    "lessonId": 120
  },
  {
    "word": "celebration",
    "phonetic": "/celebration/",
    "meaning": "新概念词汇：celebration",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'celebration' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'celebration'。",
    "lessonId": 121
  },
  {
    "word": "celebrity",
    "phonetic": "/celebrity/",
    "meaning": "新概念词汇：celebrity",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'celebrity' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'celebrity'。",
    "lessonId": 122
  },
  {
    "word": "cell",
    "phonetic": "/cell/",
    "meaning": "新概念词汇：cell",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cell' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cell'。",
    "lessonId": 123
  },
  {
    "word": "cellar",
    "phonetic": "/cellar/",
    "meaning": "新概念词汇：cellar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cellar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cellar'。",
    "lessonId": 124
  },
  {
    "word": "cement",
    "phonetic": "/cement/",
    "meaning": "新概念词汇：cement",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cement' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cement'。",
    "lessonId": 125
  },
  {
    "word": "cemetery",
    "phonetic": "/cemetery/",
    "meaning": "新概念词汇：cemetery",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cemetery' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cemetery'。",
    "lessonId": 126
  },
  {
    "word": "center",
    "phonetic": "/center/",
    "meaning": "新概念词汇：center",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'center' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'center'。",
    "lessonId": 127
  },
  {
    "word": "central",
    "phonetic": "/central/",
    "meaning": "新概念词汇：central",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'central' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'central'。",
    "lessonId": 128
  },
  {
    "word": "century",
    "phonetic": "/century/",
    "meaning": "新概念词汇：century",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'century' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'century'。",
    "lessonId": 129
  },
  {
    "word": "cereal",
    "phonetic": "/cereal/",
    "meaning": "新概念词汇：cereal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cereal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cereal'。",
    "lessonId": 130
  },
  {
    "word": "ceremony",
    "phonetic": "/ceremony/",
    "meaning": "新概念词汇：ceremony",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'ceremony' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'ceremony'。",
    "lessonId": 131
  },
  {
    "word": "certain",
    "phonetic": "/certain/",
    "meaning": "新概念词汇：certain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'certain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'certain'。",
    "lessonId": 132
  },
  {
    "word": "certainly",
    "phonetic": "/certainly/",
    "meaning": "新概念词汇：certainly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'certainly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'certainly'。",
    "lessonId": 133
  },
  {
    "word": "certificate",
    "phonetic": "/certificate/",
    "meaning": "新概念词汇：certificate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'certificate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'certificate'。",
    "lessonId": 134
  },
  {
    "word": "chain",
    "phonetic": "/chain/",
    "meaning": "新概念词汇：chain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chain'。",
    "lessonId": 135
  },
  {
    "word": "chalk",
    "phonetic": "/chalk/",
    "meaning": "新概念词汇：chalk",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chalk' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chalk'。",
    "lessonId": 136
  },
  {
    "word": "challenge",
    "phonetic": "/challenge/",
    "meaning": "新概念词汇：challenge",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'challenge' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'challenge'。",
    "lessonId": 137
  },
  {
    "word": "chamber",
    "phonetic": "/chamber/",
    "meaning": "新概念词汇：chamber",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chamber' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chamber'。",
    "lessonId": 138
  },
  {
    "word": "champion",
    "phonetic": "/champion/",
    "meaning": "新概念词汇：champion",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'champion' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'champion'。",
    "lessonId": 139
  },
  {
    "word": "championship",
    "phonetic": "/championship/",
    "meaning": "新概念词汇：championship",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'championship' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'championship'。",
    "lessonId": 140
  },
  {
    "word": "chance",
    "phonetic": "/chance/",
    "meaning": "新概念词汇：chance",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chance' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chance'。",
    "lessonId": 141
  },
  {
    "word": "change",
    "phonetic": "/change/",
    "meaning": "新概念词汇：change",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'change' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'change'。",
    "lessonId": 142
  },
  {
    "word": "channel",
    "phonetic": "/channel/",
    "meaning": "新概念词汇：channel",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'channel' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'channel'。",
    "lessonId": 143
  },
  {
    "word": "chaos",
    "phonetic": "/chaos/",
    "meaning": "新概念词汇：chaos",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chaos' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chaos'。",
    "lessonId": 144
  },
  {
    "word": "chapter",
    "phonetic": "/chapter/",
    "meaning": "新概念词汇：chapter",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chapter' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chapter'。",
    "lessonId": 1
  },
  {
    "word": "character",
    "phonetic": "/character/",
    "meaning": "新概念词汇：character",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'character' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'character'。",
    "lessonId": 2
  },
  {
    "word": "characteristic",
    "phonetic": "/characteristic/",
    "meaning": "新概念词汇：characteristic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'characteristic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'characteristic'。",
    "lessonId": 3
  },
  {
    "word": "charge",
    "phonetic": "/charge/",
    "meaning": "新概念词汇：charge",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'charge' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'charge'。",
    "lessonId": 4
  },
  {
    "word": "charity",
    "phonetic": "/charity/",
    "meaning": "新概念词汇：charity",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'charity' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'charity'。",
    "lessonId": 5
  },
  {
    "word": "charm",
    "phonetic": "/charm/",
    "meaning": "新概念词汇：charm",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'charm' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'charm'。",
    "lessonId": 6
  },
  {
    "word": "charming",
    "phonetic": "/charming/",
    "meaning": "新概念词汇：charming",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'charming' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'charming'。",
    "lessonId": 7
  },
  {
    "word": "chart",
    "phonetic": "/chart/",
    "meaning": "新概念词汇：chart",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chart' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chart'。",
    "lessonId": 8
  },
  {
    "word": "chase",
    "phonetic": "/chase/",
    "meaning": "新概念词汇：chase",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chase' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chase'。",
    "lessonId": 9
  },
  {
    "word": "chat",
    "phonetic": "/chat/",
    "meaning": "新概念词汇：chat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chat'。",
    "lessonId": 10
  },
  {
    "word": "cheat",
    "phonetic": "/cheat/",
    "meaning": "新概念词汇：cheat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cheat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cheat'。",
    "lessonId": 11
  },
  {
    "word": "check",
    "phonetic": "/check/",
    "meaning": "新概念词汇：check",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'check' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'check'。",
    "lessonId": 12
  },
  {
    "word": "check-in",
    "phonetic": "/check-in/",
    "meaning": "新概念词汇：check-in",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'check-in' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'check-in'。",
    "lessonId": 13
  },
  {
    "word": "checkout",
    "phonetic": "/checkout/",
    "meaning": "新概念词汇：checkout",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'checkout' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'checkout'。",
    "lessonId": 14
  },
  {
    "word": "cheerful",
    "phonetic": "/cheerful/",
    "meaning": "新概念词汇：cheerful",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cheerful' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cheerful'。",
    "lessonId": 15
  },
  {
    "word": "chef",
    "phonetic": "/chef/",
    "meaning": "新概念词汇：chef",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chef' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chef'。",
    "lessonId": 16
  },
  {
    "word": "chemical",
    "phonetic": "/chemical/",
    "meaning": "新概念词汇：chemical",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chemical' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chemical'。",
    "lessonId": 17
  },
  {
    "word": "chemist",
    "phonetic": "/chemist/",
    "meaning": "新概念词汇：chemist",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chemist' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chemist'。",
    "lessonId": 18
  },
  {
    "word": "chemistry",
    "phonetic": "/chemistry/",
    "meaning": "新概念词汇：chemistry",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chemistry' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chemistry'。",
    "lessonId": 19
  },
  {
    "word": "cheque",
    "phonetic": "/cheque/",
    "meaning": "新概念词汇：cheque",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cheque' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cheque'。",
    "lessonId": 20
  },
  {
    "word": "cherry",
    "phonetic": "/cherry/",
    "meaning": "新概念词汇：cherry",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cherry' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cherry'。",
    "lessonId": 21
  },
  {
    "word": "chess",
    "phonetic": "/chess/",
    "meaning": "新概念词汇：chess",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chess' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chess'。",
    "lessonId": 22
  },
  {
    "word": "chest",
    "phonetic": "/chest/",
    "meaning": "新概念词汇：chest",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chest' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chest'。",
    "lessonId": 23
  },
  {
    "word": "chew",
    "phonetic": "/chew/",
    "meaning": "新概念词汇：chew",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chew' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chew'。",
    "lessonId": 24
  },
  {
    "word": "chicken",
    "phonetic": "/chicken/",
    "meaning": "新概念词汇：chicken",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chicken' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chicken'。",
    "lessonId": 25
  },
  {
    "word": "chief",
    "phonetic": "/chief/",
    "meaning": "新概念词汇：chief",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chief' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chief'。",
    "lessonId": 26
  },
  {
    "word": "child",
    "phonetic": "/child/",
    "meaning": "新概念词汇：child",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'child' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'child'。",
    "lessonId": 27
  },
  {
    "word": "childhood",
    "phonetic": "/childhood/",
    "meaning": "新概念词汇：childhood",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'childhood' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'childhood'。",
    "lessonId": 28
  },
  {
    "word": "chimney",
    "phonetic": "/chimney/",
    "meaning": "新概念词汇：chimney",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chimney' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chimney'。",
    "lessonId": 29
  },
  {
    "word": "chin",
    "phonetic": "/chin/",
    "meaning": "新概念词汇：chin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chin'。",
    "lessonId": 30
  },
  {
    "word": "chip",
    "phonetic": "/chip/",
    "meaning": "新概念词汇：chip",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chip' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chip'。",
    "lessonId": 31
  },
  {
    "word": "chocolate",
    "phonetic": "/chocolate/",
    "meaning": "新概念词汇：chocolate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chocolate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chocolate'。",
    "lessonId": 32
  },
  {
    "word": "choice",
    "phonetic": "/choice/",
    "meaning": "新概念词汇：choice",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'choice' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'choice'。",
    "lessonId": 33
  },
  {
    "word": "choir",
    "phonetic": "/choir/",
    "meaning": "新概念词汇：choir",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'choir' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'choir'。",
    "lessonId": 34
  },
  {
    "word": "choke",
    "phonetic": "/choke/",
    "meaning": "新概念词汇：choke",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'choke' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'choke'。",
    "lessonId": 35
  },
  {
    "word": "choose",
    "phonetic": "/choose/",
    "meaning": "新概念词汇：choose",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'choose' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'choose'。",
    "lessonId": 36
  },
  {
    "word": "chop",
    "phonetic": "/chop/",
    "meaning": "新概念词汇：chop",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'chop' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'chop'。",
    "lessonId": 37
  },
  {
    "word": "church",
    "phonetic": "/church/",
    "meaning": "新概念词汇：church",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'church' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'church'。",
    "lessonId": 38
  },
  {
    "word": "cigarette",
    "phonetic": "/cigarette/",
    "meaning": "新概念词汇：cigarette",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cigarette' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cigarette'。",
    "lessonId": 39
  },
  {
    "word": "cinema",
    "phonetic": "/cinema/",
    "meaning": "新概念词汇：cinema",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cinema' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cinema'。",
    "lessonId": 40
  },
  {
    "word": "circle",
    "phonetic": "/circle/",
    "meaning": "新概念词汇：circle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circle'。",
    "lessonId": 41
  },
  {
    "word": "circuit",
    "phonetic": "/circuit/",
    "meaning": "新概念词汇：circuit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circuit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circuit'。",
    "lessonId": 42
  },
  {
    "word": "circular",
    "phonetic": "/circular/",
    "meaning": "新概念词汇：circular",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circular' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circular'。",
    "lessonId": 43
  },
  {
    "word": "circulate",
    "phonetic": "/circulate/",
    "meaning": "新概念词汇：circulate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circulate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circulate'。",
    "lessonId": 44
  },
  {
    "word": "circumstance",
    "phonetic": "/circumstance/",
    "meaning": "新概念词汇：circumstance",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circumstance' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circumstance'。",
    "lessonId": 45
  },
  {
    "word": "circus",
    "phonetic": "/circus/",
    "meaning": "新概念词汇：circus",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'circus' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'circus'。",
    "lessonId": 46
  },
  {
    "word": "citizen",
    "phonetic": "/citizen/",
    "meaning": "新概念词汇：citizen",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'citizen' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'citizen'。",
    "lessonId": 47
  },
  {
    "word": "city",
    "phonetic": "/city/",
    "meaning": "新概念词汇：city",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'city' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'city'。",
    "lessonId": 48
  },
  {
    "word": "civil",
    "phonetic": "/civil/",
    "meaning": "新概念词汇：civil",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'civil' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'civil'。",
    "lessonId": 49
  },
  {
    "word": "claim",
    "phonetic": "/claim/",
    "meaning": "新概念词汇：claim",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'claim' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'claim'。",
    "lessonId": 50
  },
  {
    "word": "clap",
    "phonetic": "/clap/",
    "meaning": "新概念词汇：clap",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clap' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clap'。",
    "lessonId": 51
  },
  {
    "word": "clarify",
    "phonetic": "/clarify/",
    "meaning": "新概念词汇：clarify",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clarify' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clarify'。",
    "lessonId": 52
  },
  {
    "word": "clash",
    "phonetic": "/clash/",
    "meaning": "新概念词汇：clash",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clash' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clash'。",
    "lessonId": 53
  },
  {
    "word": "class",
    "phonetic": "/class/",
    "meaning": "新概念词汇：class",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'class' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'class'。",
    "lessonId": 54
  },
  {
    "word": "classic",
    "phonetic": "/classic/",
    "meaning": "新概念词汇：classic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'classic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'classic'。",
    "lessonId": 55
  },
  {
    "word": "classical",
    "phonetic": "/classical/",
    "meaning": "新概念词汇：classical",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'classical' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'classical'。",
    "lessonId": 56
  },
  {
    "word": "classify",
    "phonetic": "/classify/",
    "meaning": "新概念词汇：classify",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'classify' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'classify'。",
    "lessonId": 57
  },
  {
    "word": "classroom",
    "phonetic": "/classroom/",
    "meaning": "新概念词汇：classroom",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'classroom' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'classroom'。",
    "lessonId": 58
  },
  {
    "word": "cleaner",
    "phonetic": "/cleaner/",
    "meaning": "新概念词汇：cleaner",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cleaner' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cleaner'。",
    "lessonId": 59
  },
  {
    "word": "clear",
    "phonetic": "/clear/",
    "meaning": "新概念词汇：clear",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clear' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clear'。",
    "lessonId": 60
  },
  {
    "word": "clearly",
    "phonetic": "/clearly/",
    "meaning": "新概念词汇：clearly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clearly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clearly'。",
    "lessonId": 61
  },
  {
    "word": "clerk",
    "phonetic": "/clerk/",
    "meaning": "新概念词汇：clerk",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clerk' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clerk'。",
    "lessonId": 62
  },
  {
    "word": "clever",
    "phonetic": "/clever/",
    "meaning": "新概念词汇：clever",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clever' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clever'。",
    "lessonId": 63
  },
  {
    "word": "click",
    "phonetic": "/click/",
    "meaning": "新概念词汇：click",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'click' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'click'。",
    "lessonId": 64
  },
  {
    "word": "client",
    "phonetic": "/client/",
    "meaning": "新概念词汇：client",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'client' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'client'。",
    "lessonId": 65
  },
  {
    "word": "cliff",
    "phonetic": "/cliff/",
    "meaning": "新概念词汇：cliff",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cliff' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cliff'。",
    "lessonId": 66
  },
  {
    "word": "climate",
    "phonetic": "/climate/",
    "meaning": "新概念词汇：climate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'climate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'climate'。",
    "lessonId": 67
  },
  {
    "word": "climb",
    "phonetic": "/climb/",
    "meaning": "新概念词汇：climb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'climb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'climb'。",
    "lessonId": 68
  },
  {
    "word": "climber",
    "phonetic": "/climber/",
    "meaning": "新概念词汇：climber",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'climber' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'climber'。",
    "lessonId": 69
  },
  {
    "word": "clinic",
    "phonetic": "/clinic/",
    "meaning": "新概念词汇：clinic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clinic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clinic'。",
    "lessonId": 70
  },
  {
    "word": "cloak",
    "phonetic": "/cloak/",
    "meaning": "新概念词汇：cloak",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cloak' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cloak'。",
    "lessonId": 71
  },
  {
    "word": "clock",
    "phonetic": "/clock/",
    "meaning": "新概念词汇：clock",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clock' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clock'。",
    "lessonId": 72
  },
  {
    "word": "close",
    "phonetic": "/close/",
    "meaning": "新概念词汇：close",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'close' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'close'。",
    "lessonId": 73
  },
  {
    "word": "closed",
    "phonetic": "/closed/",
    "meaning": "新概念词汇：closed",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'closed' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'closed'。",
    "lessonId": 74
  },
  {
    "word": "closet",
    "phonetic": "/closet/",
    "meaning": "新概念词汇：closet",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'closet' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'closet'。",
    "lessonId": 75
  },
  {
    "word": "cloth",
    "phonetic": "/cloth/",
    "meaning": "新概念词汇：cloth",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cloth' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cloth'。",
    "lessonId": 76
  },
  {
    "word": "clothes",
    "phonetic": "/clothes/",
    "meaning": "新概念词汇：clothes",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clothes' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clothes'。",
    "lessonId": 77
  },
  {
    "word": "clothing",
    "phonetic": "/clothing/",
    "meaning": "新概念词汇：clothing",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clothing' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clothing'。",
    "lessonId": 78
  },
  {
    "word": "cloud",
    "phonetic": "/cloud/",
    "meaning": "新概念词汇：cloud",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cloud' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cloud'。",
    "lessonId": 79
  },
  {
    "word": "cloudy",
    "phonetic": "/cloudy/",
    "meaning": "新概念词汇：cloudy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cloudy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cloudy'。",
    "lessonId": 80
  },
  {
    "word": "club",
    "phonetic": "/club/",
    "meaning": "新概念词汇：club",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'club' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'club'。",
    "lessonId": 81
  },
  {
    "word": "clue",
    "phonetic": "/clue/",
    "meaning": "新概念词汇：clue",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clue' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clue'。",
    "lessonId": 82
  },
  {
    "word": "clumsy",
    "phonetic": "/clumsy/",
    "meaning": "新概念词汇：clumsy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'clumsy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'clumsy'。",
    "lessonId": 83
  },
  {
    "word": "coach",
    "phonetic": "/coach/",
    "meaning": "新概念词汇：coach",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coach' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coach'。",
    "lessonId": 84
  },
  {
    "word": "coal",
    "phonetic": "/coal/",
    "meaning": "新概念词汇：coal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coal'。",
    "lessonId": 85
  },
  {
    "word": "coast",
    "phonetic": "/coast/",
    "meaning": "新概念词汇：coast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coast'。",
    "lessonId": 86
  },
  {
    "word": "cobweb",
    "phonetic": "/cobweb/",
    "meaning": "新概念词汇：cobweb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cobweb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cobweb'。",
    "lessonId": 87
  },
  {
    "word": "cock",
    "phonetic": "/cock/",
    "meaning": "新概念词汇：cock",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cock' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cock'。",
    "lessonId": 88
  },
  {
    "word": "cocoa",
    "phonetic": "/cocoa/",
    "meaning": "新概念词汇：cocoa",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cocoa' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cocoa'。",
    "lessonId": 89
  },
  {
    "word": "coconut",
    "phonetic": "/coconut/",
    "meaning": "新概念词汇：coconut",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coconut' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coconut'。",
    "lessonId": 90
  },
  {
    "word": "code",
    "phonetic": "/code/",
    "meaning": "新概念词汇：code",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'code' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'code'。",
    "lessonId": 91
  },
  {
    "word": "coin",
    "phonetic": "/coin/",
    "meaning": "新概念词汇：coin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coin'。",
    "lessonId": 92
  },
  {
    "word": "collar",
    "phonetic": "/collar/",
    "meaning": "新概念词汇：collar",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'collar' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'collar'。",
    "lessonId": 93
  },
  {
    "word": "colleague",
    "phonetic": "/colleague/",
    "meaning": "新概念词汇：colleague",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'colleague' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'colleague'。",
    "lessonId": 94
  },
  {
    "word": "collect",
    "phonetic": "/collect/",
    "meaning": "新概念词汇：collect",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'collect' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'collect'。",
    "lessonId": 95
  },
  {
    "word": "collection",
    "phonetic": "/collection/",
    "meaning": "新概念词汇：collection",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'collection' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'collection'。",
    "lessonId": 96
  },
  {
    "word": "collector",
    "phonetic": "/collector/",
    "meaning": "新概念词汇：collector",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'collector' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'collector'。",
    "lessonId": 97
  },
  {
    "word": "college",
    "phonetic": "/college/",
    "meaning": "新概念词汇：college",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'college' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'college'。",
    "lessonId": 98
  },
  {
    "word": "collision",
    "phonetic": "/collision/",
    "meaning": "新概念词汇：collision",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'collision' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'collision'。",
    "lessonId": 99
  },
  {
    "word": "colony",
    "phonetic": "/colony/",
    "meaning": "新概念词汇：colony",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'colony' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'colony'。",
    "lessonId": 100
  },
  {
    "word": "column",
    "phonetic": "/column/",
    "meaning": "新概念词汇：column",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'column' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'column'。",
    "lessonId": 101
  },
  {
    "word": "comb",
    "phonetic": "/comb/",
    "meaning": "新概念词汇：comb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comb'。",
    "lessonId": 102
  },
  {
    "word": "combat",
    "phonetic": "/combat/",
    "meaning": "新概念词汇：combat",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'combat' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'combat'。",
    "lessonId": 103
  },
  {
    "word": "combination",
    "phonetic": "/combination/",
    "meaning": "新概念词汇：combination",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'combination' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'combination'。",
    "lessonId": 104
  },
  {
    "word": "combine",
    "phonetic": "/combine/",
    "meaning": "新概念词汇：combine",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'combine' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'combine'。",
    "lessonId": 105
  },
  {
    "word": "come",
    "phonetic": "/come/",
    "meaning": "新概念词汇：come",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'come' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'come'。",
    "lessonId": 106
  },
  {
    "word": "comedy",
    "phonetic": "/comedy/",
    "meaning": "新概念词汇：comedy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comedy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comedy'。",
    "lessonId": 107
  },
  {
    "word": "comfort",
    "phonetic": "/comfort/",
    "meaning": "新概念词汇：comfort",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comfort' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comfort'。",
    "lessonId": 108
  },
  {
    "word": "comfortable",
    "phonetic": "/comfortable/",
    "meaning": "新概念词汇：comfortable",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comfortable' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comfortable'。",
    "lessonId": 109
  },
  {
    "word": "command",
    "phonetic": "/command/",
    "meaning": "新概念词汇：command",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'command' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'command'。",
    "lessonId": 110
  },
  {
    "word": "commander",
    "phonetic": "/commander/",
    "meaning": "新概念词汇：commander",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'commander' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'commander'。",
    "lessonId": 111
  },
  {
    "word": "comment",
    "phonetic": "/comment/",
    "meaning": "新概念词汇：comment",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comment' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comment'。",
    "lessonId": 112
  },
  {
    "word": "commerce",
    "phonetic": "/commerce/",
    "meaning": "新概念词汇：commerce",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'commerce' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'commerce'。",
    "lessonId": 113
  },
  {
    "word": "commercial",
    "phonetic": "/commercial/",
    "meaning": "新概念词汇：commercial",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'commercial' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'commercial'。",
    "lessonId": 114
  },
  {
    "word": "commission",
    "phonetic": "/commission/",
    "meaning": "新概念词汇：commission",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'commission' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'commission'。",
    "lessonId": 115
  },
  {
    "word": "commit",
    "phonetic": "/commit/",
    "meaning": "新概念词汇：commit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'commit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'commit'。",
    "lessonId": 116
  },
  {
    "word": "committee",
    "phonetic": "/committee/",
    "meaning": "新概念词汇：committee",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'committee' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'committee'。",
    "lessonId": 117
  },
  {
    "word": "common",
    "phonetic": "/common/",
    "meaning": "新概念词汇：common",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'common' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'common'。",
    "lessonId": 118
  },
  {
    "word": "communicate",
    "phonetic": "/communicate/",
    "meaning": "新概念词汇：communicate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'communicate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'communicate'。",
    "lessonId": 119
  },
  {
    "word": "communication",
    "phonetic": "/communication/",
    "meaning": "新概念词汇：communication",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'communication' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'communication'。",
    "lessonId": 120
  },
  {
    "word": "community",
    "phonetic": "/community/",
    "meaning": "新概念词汇：community",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'community' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'community'。",
    "lessonId": 121
  },
  {
    "word": "companion",
    "phonetic": "/companion/",
    "meaning": "新概念词汇：companion",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'companion' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'companion'。",
    "lessonId": 122
  },
  {
    "word": "comparative",
    "phonetic": "/comparative/",
    "meaning": "新概念词汇：comparative",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comparative' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comparative'。",
    "lessonId": 123
  },
  {
    "word": "compare",
    "phonetic": "/compare/",
    "meaning": "新概念词汇：compare",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compare' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compare'。",
    "lessonId": 124
  },
  {
    "word": "comparison",
    "phonetic": "/comparison/",
    "meaning": "新概念词汇：comparison",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comparison' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comparison'。",
    "lessonId": 125
  },
  {
    "word": "compartment",
    "phonetic": "/compartment/",
    "meaning": "新概念词汇：compartment",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compartment' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compartment'。",
    "lessonId": 126
  },
  {
    "word": "compass",
    "phonetic": "/compass/",
    "meaning": "新概念词汇：compass",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compass' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compass'。",
    "lessonId": 127
  },
  {
    "word": "compete",
    "phonetic": "/compete/",
    "meaning": "新概念词汇：compete",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compete' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compete'。",
    "lessonId": 128
  },
  {
    "word": "competition",
    "phonetic": "/competition/",
    "meaning": "新概念词汇：competition",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'competition' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'competition'。",
    "lessonId": 129
  },
  {
    "word": "competitor",
    "phonetic": "/competitor/",
    "meaning": "新概念词汇：competitor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'competitor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'competitor'。",
    "lessonId": 130
  },
  {
    "word": "complain",
    "phonetic": "/complain/",
    "meaning": "新概念词汇：complain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'complain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'complain'。",
    "lessonId": 131
  },
  {
    "word": "complaint",
    "phonetic": "/complaint/",
    "meaning": "新概念词汇：complaint",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'complaint' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'complaint'。",
    "lessonId": 132
  },
  {
    "word": "complete",
    "phonetic": "/complete/",
    "meaning": "新概念词汇：complete",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'complete' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'complete'。",
    "lessonId": 133
  },
  {
    "word": "completely",
    "phonetic": "/completely/",
    "meaning": "新概念词汇：completely",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'completely' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'completely'。",
    "lessonId": 134
  },
  {
    "word": "complex",
    "phonetic": "/complex/",
    "meaning": "新概念词汇：complex",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'complex' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'complex'。",
    "lessonId": 135
  },
  {
    "word": "complicate",
    "phonetic": "/complicate/",
    "meaning": "新概念词汇：complicate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'complicate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'complicate'。",
    "lessonId": 136
  },
  {
    "word": "compliment",
    "phonetic": "/compliment/",
    "meaning": "新概念词汇：compliment",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compliment' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compliment'。",
    "lessonId": 137
  },
  {
    "word": "compose",
    "phonetic": "/compose/",
    "meaning": "新概念词汇：compose",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compose' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compose'。",
    "lessonId": 138
  },
  {
    "word": "composer",
    "phonetic": "/composer/",
    "meaning": "新概念词汇：composer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'composer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'composer'。",
    "lessonId": 139
  },
  {
    "word": "composition",
    "phonetic": "/composition/",
    "meaning": "新概念词汇：composition",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'composition' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'composition'。",
    "lessonId": 140
  },
  {
    "word": "compound",
    "phonetic": "/compound/",
    "meaning": "新概念词汇：compound",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compound' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compound'。",
    "lessonId": 141
  },
  {
    "word": "comprehend",
    "phonetic": "/comprehend/",
    "meaning": "新概念词汇：comprehend",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comprehend' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comprehend'。",
    "lessonId": 142
  },
  {
    "word": "comprehension",
    "phonetic": "/comprehension/",
    "meaning": "新概念词汇：comprehension",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comprehension' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comprehension'。",
    "lessonId": 143
  },
  {
    "word": "comprehensive",
    "phonetic": "/comprehensive/",
    "meaning": "新概念词汇：comprehensive",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comprehensive' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comprehensive'。",
    "lessonId": 144
  },
  {
    "word": "compress",
    "phonetic": "/compress/",
    "meaning": "新概念词汇：compress",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compress' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compress'。",
    "lessonId": 1
  },
  {
    "word": "comprise",
    "phonetic": "/comprise/",
    "meaning": "新概念词汇：comprise",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'comprise' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'comprise'。",
    "lessonId": 2
  },
  {
    "word": "compromise",
    "phonetic": "/compromise/",
    "meaning": "新概念词汇：compromise",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'compromise' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'compromise'。",
    "lessonId": 3
  },
  {
    "word": "computer",
    "phonetic": "/computer/",
    "meaning": "新概念词汇：computer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'computer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'computer'。",
    "lessonId": 4
  },
  {
    "word": "conceal",
    "phonetic": "/conceal/",
    "meaning": "新概念词汇：conceal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conceal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conceal'。",
    "lessonId": 5
  },
  {
    "word": "concentrate",
    "phonetic": "/concentrate/",
    "meaning": "新概念词汇：concentrate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concentrate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concentrate'。",
    "lessonId": 6
  },
  {
    "word": "concentration",
    "phonetic": "/concentration/",
    "meaning": "新概念词汇：concentration",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concentration' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concentration'。",
    "lessonId": 7
  },
  {
    "word": "concept",
    "phonetic": "/concept/",
    "meaning": "新概念词汇：concept",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concept' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concept'。",
    "lessonId": 8
  },
  {
    "word": "concern",
    "phonetic": "/concern/",
    "meaning": "新概念词汇：concern",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concern' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concern'。",
    "lessonId": 9
  },
  {
    "word": "concerned",
    "phonetic": "/concerned/",
    "meaning": "新概念词汇：concerned",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concerned' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concerned'。",
    "lessonId": 10
  },
  {
    "word": "concerning",
    "phonetic": "/concerning/",
    "meaning": "新概念词汇：concerning",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concerning' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concerning'。",
    "lessonId": 11
  },
  {
    "word": "concert",
    "phonetic": "/concert/",
    "meaning": "新概念词汇：concert",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concert' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concert'。",
    "lessonId": 12
  },
  {
    "word": "conclude",
    "phonetic": "/conclude/",
    "meaning": "新概念词汇：conclude",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conclude' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conclude'。",
    "lessonId": 13
  },
  {
    "word": "conclusion",
    "phonetic": "/conclusion/",
    "meaning": "新概念词汇：conclusion",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conclusion' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conclusion'。",
    "lessonId": 14
  },
  {
    "word": "concrete",
    "phonetic": "/concrete/",
    "meaning": "新概念词汇：concrete",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'concrete' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'concrete'。",
    "lessonId": 15
  },
  {
    "word": "condition",
    "phonetic": "/condition/",
    "meaning": "新概念词汇：condition",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'condition' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'condition'。",
    "lessonId": 16
  },
  {
    "word": "conduct",
    "phonetic": "/conduct/",
    "meaning": "新概念词汇：conduct",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conduct' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conduct'。",
    "lessonId": 17
  },
  {
    "word": "conductor",
    "phonetic": "/conductor/",
    "meaning": "新概念词汇：conductor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conductor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conductor'。",
    "lessonId": 18
  },
  {
    "word": "conference",
    "phonetic": "/conference/",
    "meaning": "新概念词汇：conference",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conference' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conference'。",
    "lessonId": 19
  },
  {
    "word": "confess",
    "phonetic": "/confess/",
    "meaning": "新概念词汇：confess",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confess' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confess'。",
    "lessonId": 20
  },
  {
    "word": "confession",
    "phonetic": "/confession/",
    "meaning": "新概念词汇：confession",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confession' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confession'。",
    "lessonId": 21
  },
  {
    "word": "confidence",
    "phonetic": "/confidence/",
    "meaning": "新概念词汇：confidence",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confidence' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confidence'。",
    "lessonId": 22
  },
  {
    "word": "confident",
    "phonetic": "/confident/",
    "meaning": "新概念词汇：confident",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confident' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confident'。",
    "lessonId": 23
  },
  {
    "word": "confirm",
    "phonetic": "/confirm/",
    "meaning": "新概念词汇：confirm",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confirm' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confirm'。",
    "lessonId": 24
  },
  {
    "word": "confirmation",
    "phonetic": "/confirmation/",
    "meaning": "新概念词汇：confirmation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confirmation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confirmation'。",
    "lessonId": 25
  },
  {
    "word": "conflict",
    "phonetic": "/conflict/",
    "meaning": "新概念词汇：conflict",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conflict' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conflict'。",
    "lessonId": 26
  },
  {
    "word": "confuse",
    "phonetic": "/confuse/",
    "meaning": "新概念词汇：confuse",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confuse' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confuse'。",
    "lessonId": 27
  },
  {
    "word": "confused",
    "phonetic": "/confused/",
    "meaning": "新概念词汇：confused",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confused' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confused'。",
    "lessonId": 28
  },
  {
    "word": "confusion",
    "phonetic": "/confusion/",
    "meaning": "新概念词汇：confusion",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'confusion' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'confusion'。",
    "lessonId": 29
  },
  {
    "word": "congratulate",
    "phonetic": "/congratulate/",
    "meaning": "新概念词汇：congratulate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'congratulate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'congratulate'。",
    "lessonId": 30
  },
  {
    "word": "congratulation",
    "phonetic": "/congratulation/",
    "meaning": "新概念词汇：congratulation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'congratulation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'congratulation'。",
    "lessonId": 31
  },
  {
    "word": "connect",
    "phonetic": "/connect/",
    "meaning": "新概念词汇：connect",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'connect' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'connect'。",
    "lessonId": 32
  },
  {
    "word": "connection",
    "phonetic": "/connection/",
    "meaning": "新概念词汇：connection",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'connection' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'connection'。",
    "lessonId": 33
  },
  {
    "word": "conquer",
    "phonetic": "/conquer/",
    "meaning": "新概念词汇：conquer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conquer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conquer'。",
    "lessonId": 34
  },
  {
    "word": "consequence",
    "phonetic": "/consequence/",
    "meaning": "新概念词汇：consequence",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consequence' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consequence'。",
    "lessonId": 35
  },
  {
    "word": "conservation",
    "phonetic": "/conservation/",
    "meaning": "新概念词汇：conservation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conservation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conservation'。",
    "lessonId": 36
  },
  {
    "word": "conservative",
    "phonetic": "/conservative/",
    "meaning": "新概念词汇：conservative",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conservative' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conservative'。",
    "lessonId": 37
  },
  {
    "word": "consider",
    "phonetic": "/consider/",
    "meaning": "新概念词汇：consider",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consider' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consider'。",
    "lessonId": 38
  },
  {
    "word": "considerable",
    "phonetic": "/considerable/",
    "meaning": "新概念词汇：considerable",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'considerable' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'considerable'。",
    "lessonId": 39
  },
  {
    "word": "considerate",
    "phonetic": "/considerate/",
    "meaning": "新概念词汇：considerate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'considerate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'considerate'。",
    "lessonId": 40
  },
  {
    "word": "consideration",
    "phonetic": "/consideration/",
    "meaning": "新概念词汇：consideration",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consideration' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consideration'。",
    "lessonId": 41
  },
  {
    "word": "consist",
    "phonetic": "/consist/",
    "meaning": "新概念词汇：consist",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consist' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consist'。",
    "lessonId": 42
  },
  {
    "word": "consistent",
    "phonetic": "/consistent/",
    "meaning": "新概念词汇：consistent",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consistent' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consistent'。",
    "lessonId": 43
  },
  {
    "word": "constant",
    "phonetic": "/constant/",
    "meaning": "新概念词汇：constant",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'constant' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'constant'。",
    "lessonId": 44
  },
  {
    "word": "constantly",
    "phonetic": "/constantly/",
    "meaning": "新概念词汇：constantly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'constantly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'constantly'。",
    "lessonId": 45
  },
  {
    "word": "construct",
    "phonetic": "/construct/",
    "meaning": "新概念词汇：construct",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'construct' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'construct'。",
    "lessonId": 46
  },
  {
    "word": "construction",
    "phonetic": "/construction/",
    "meaning": "新概念词汇：construction",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'construction' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'construction'。",
    "lessonId": 47
  },
  {
    "word": "consult",
    "phonetic": "/consult/",
    "meaning": "新概念词汇：consult",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consult' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consult'。",
    "lessonId": 48
  },
  {
    "word": "consultant",
    "phonetic": "/consultant/",
    "meaning": "新概念词汇：consultant",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consultant' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consultant'。",
    "lessonId": 49
  },
  {
    "word": "consume",
    "phonetic": "/consume/",
    "meaning": "新概念词汇：consume",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consume' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consume'。",
    "lessonId": 50
  },
  {
    "word": "consumer",
    "phonetic": "/consumer/",
    "meaning": "新概念词汇：consumer",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'consumer' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'consumer'。",
    "lessonId": 51
  },
  {
    "word": "contact",
    "phonetic": "/contact/",
    "meaning": "新概念词汇：contact",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contact' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contact'。",
    "lessonId": 52
  },
  {
    "word": "contain",
    "phonetic": "/contain/",
    "meaning": "新概念词汇：contain",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contain' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contain'。",
    "lessonId": 53
  },
  {
    "word": "container",
    "phonetic": "/container/",
    "meaning": "新概念词汇：container",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'container' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'container'。",
    "lessonId": 54
  },
  {
    "word": "contemporary",
    "phonetic": "/contemporary/",
    "meaning": "新概念词汇：contemporary",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contemporary' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contemporary'。",
    "lessonId": 55
  },
  {
    "word": "content",
    "phonetic": "/content/",
    "meaning": "新概念词汇：content",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'content' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'content'。",
    "lessonId": 56
  },
  {
    "word": "contest",
    "phonetic": "/contest/",
    "meaning": "新概念词汇：contest",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contest' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contest'。",
    "lessonId": 57
  },
  {
    "word": "contestant",
    "phonetic": "/contestant/",
    "meaning": "新概念词汇：contestant",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contestant' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contestant'。",
    "lessonId": 58
  },
  {
    "word": "continent",
    "phonetic": "/continent/",
    "meaning": "新概念词汇：continent",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'continent' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'continent'。",
    "lessonId": 59
  },
  {
    "word": "continual",
    "phonetic": "/continual/",
    "meaning": "新概念词汇：continual",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'continual' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'continual'。",
    "lessonId": 60
  },
  {
    "word": "continue",
    "phonetic": "/continue/",
    "meaning": "新概念词汇：continue",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'continue' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'continue'。",
    "lessonId": 61
  },
  {
    "word": "continuous",
    "phonetic": "/continuous/",
    "meaning": "新概念词汇：continuous",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'continuous' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'continuous'。",
    "lessonId": 62
  },
  {
    "word": "contract",
    "phonetic": "/contract/",
    "meaning": "新概念词汇：contract",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contract' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contract'。",
    "lessonId": 63
  },
  {
    "word": "contrary",
    "phonetic": "/contrary/",
    "meaning": "新概念词汇：contrary",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contrary' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contrary'。",
    "lessonId": 64
  },
  {
    "word": "contrast",
    "phonetic": "/contrast/",
    "meaning": "新概念词汇：contrast",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contrast' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contrast'。",
    "lessonId": 65
  },
  {
    "word": "contribute",
    "phonetic": "/contribute/",
    "meaning": "新概念词汇：contribute",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contribute' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contribute'。",
    "lessonId": 66
  },
  {
    "word": "contribution",
    "phonetic": "/contribution/",
    "meaning": "新概念词汇：contribution",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'contribution' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'contribution'。",
    "lessonId": 67
  },
  {
    "word": "control",
    "phonetic": "/control/",
    "meaning": "新概念词汇：control",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'control' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'control'。",
    "lessonId": 68
  },
  {
    "word": "convenient",
    "phonetic": "/convenient/",
    "meaning": "新概念词汇：convenient",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convenient' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convenient'。",
    "lessonId": 69
  },
  {
    "word": "convention",
    "phonetic": "/convention/",
    "meaning": "新概念词汇：convention",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convention' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convention'。",
    "lessonId": 70
  },
  {
    "word": "conventional",
    "phonetic": "/conventional/",
    "meaning": "新概念词汇：conventional",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conventional' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conventional'。",
    "lessonId": 71
  },
  {
    "word": "conversation",
    "phonetic": "/conversation/",
    "meaning": "新概念词汇：conversation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'conversation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'conversation'。",
    "lessonId": 72
  },
  {
    "word": "convert",
    "phonetic": "/convert/",
    "meaning": "新概念词汇：convert",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convert' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convert'。",
    "lessonId": 73
  },
  {
    "word": "convey",
    "phonetic": "/convey/",
    "meaning": "新概念词汇：convey",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convey' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convey'。",
    "lessonId": 74
  },
  {
    "word": "convince",
    "phonetic": "/convince/",
    "meaning": "新概念词汇：convince",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convince' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convince'。",
    "lessonId": 75
  },
  {
    "word": "convinced",
    "phonetic": "/convinced/",
    "meaning": "新概念词汇：convinced",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'convinced' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'convinced'。",
    "lessonId": 76
  },
  {
    "word": "cook",
    "phonetic": "/cook/",
    "meaning": "新概念词汇：cook",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cook' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cook'。",
    "lessonId": 77
  },
  {
    "word": "cooker",
    "phonetic": "/cooker/",
    "meaning": "新概念词汇：cooker",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cooker' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cooker'。",
    "lessonId": 78
  },
  {
    "word": "cookie",
    "phonetic": "/cookie/",
    "meaning": "新概念词汇：cookie",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cookie' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cookie'。",
    "lessonId": 79
  },
  {
    "word": "cooking",
    "phonetic": "/cooking/",
    "meaning": "新概念词汇：cooking",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cooking' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cooking'。",
    "lessonId": 80
  },
  {
    "word": "cooperate",
    "phonetic": "/cooperate/",
    "meaning": "新概念词汇：cooperate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cooperate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cooperate'。",
    "lessonId": 81
  },
  {
    "word": "cooperation",
    "phonetic": "/cooperation/",
    "meaning": "新概念词汇：cooperation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cooperation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cooperation'。",
    "lessonId": 82
  },
  {
    "word": "cope",
    "phonetic": "/cope/",
    "meaning": "新概念词汇：cope",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cope' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cope'。",
    "lessonId": 83
  },
  {
    "word": "copper",
    "phonetic": "/copper/",
    "meaning": "新概念词汇：copper",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'copper' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'copper'。",
    "lessonId": 84
  },
  {
    "word": "copy",
    "phonetic": "/copy/",
    "meaning": "新概念词汇：copy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'copy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'copy'。",
    "lessonId": 85
  },
  {
    "word": "coral",
    "phonetic": "/coral/",
    "meaning": "新概念词汇：coral",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coral' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coral'。",
    "lessonId": 86
  },
  {
    "word": "cord",
    "phonetic": "/cord/",
    "meaning": "新概念词汇：cord",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cord' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cord'。",
    "lessonId": 87
  },
  {
    "word": "core",
    "phonetic": "/core/",
    "meaning": "新概念词汇：core",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'core' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'core'。",
    "lessonId": 88
  },
  {
    "word": "corn",
    "phonetic": "/corn/",
    "meaning": "新概念词汇：corn",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'corn' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'corn'。",
    "lessonId": 89
  },
  {
    "word": "corner",
    "phonetic": "/corner/",
    "meaning": "新概念词汇：corner",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'corner' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'corner'。",
    "lessonId": 90
  },
  {
    "word": "corporate",
    "phonetic": "/corporate/",
    "meaning": "新概念词汇：corporate",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'corporate' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'corporate'。",
    "lessonId": 91
  },
  {
    "word": "corporation",
    "phonetic": "/corporation/",
    "meaning": "新概念词汇：corporation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'corporation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'corporation'。",
    "lessonId": 92
  },
  {
    "word": "correct",
    "phonetic": "/correct/",
    "meaning": "新概念词汇：correct",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'correct' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'correct'。",
    "lessonId": 93
  },
  {
    "word": "correction",
    "phonetic": "/correction/",
    "meaning": "新概念词汇：correction",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'correction' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'correction'。",
    "lessonId": 94
  },
  {
    "word": "correctly",
    "phonetic": "/correctly/",
    "meaning": "新概念词汇：correctly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'correctly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'correctly'。",
    "lessonId": 95
  },
  {
    "word": "correspond",
    "phonetic": "/correspond/",
    "meaning": "新概念词汇：correspond",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'correspond' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'correspond'。",
    "lessonId": 96
  },
  {
    "word": "correspondent",
    "phonetic": "/correspondent/",
    "meaning": "新概念词汇：correspondent",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'correspondent' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'correspondent'。",
    "lessonId": 97
  },
  {
    "word": "corridor",
    "phonetic": "/corridor/",
    "meaning": "新概念词汇：corridor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'corridor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'corridor'。",
    "lessonId": 98
  },
  {
    "word": "cost",
    "phonetic": "/cost/",
    "meaning": "新概念词汇：cost",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cost' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cost'。",
    "lessonId": 99
  },
  {
    "word": "costly",
    "phonetic": "/costly/",
    "meaning": "新概念词汇：costly",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'costly' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'costly'。",
    "lessonId": 100
  },
  {
    "word": "costume",
    "phonetic": "/costume/",
    "meaning": "新概念词汇：costume",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'costume' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'costume'。",
    "lessonId": 101
  },
  {
    "word": "cottage",
    "phonetic": "/cottage/",
    "meaning": "新概念词汇：cottage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cottage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cottage'。",
    "lessonId": 102
  },
  {
    "word": "cotton",
    "phonetic": "/cotton/",
    "meaning": "新概念词汇：cotton",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cotton' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cotton'。",
    "lessonId": 103
  },
  {
    "word": "couch",
    "phonetic": "/couch/",
    "meaning": "新概念词汇：couch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'couch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'couch'。",
    "lessonId": 104
  },
  {
    "word": "could",
    "phonetic": "/could/",
    "meaning": "新概念词汇：could",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'could' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'could'。",
    "lessonId": 105
  },
  {
    "word": "council",
    "phonetic": "/council/",
    "meaning": "新概念词汇：council",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'council' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'council'。",
    "lessonId": 106
  },
  {
    "word": "counselor",
    "phonetic": "/counselor/",
    "meaning": "新概念词汇：counselor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'counselor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'counselor'。",
    "lessonId": 107
  },
  {
    "word": "count",
    "phonetic": "/count/",
    "meaning": "新概念词汇：count",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'count' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'count'。",
    "lessonId": 108
  },
  {
    "word": "counter",
    "phonetic": "/counter/",
    "meaning": "新概念词汇：counter",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'counter' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'counter'。",
    "lessonId": 109
  },
  {
    "word": "country",
    "phonetic": "/country/",
    "meaning": "新概念词汇：country",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'country' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'country'。",
    "lessonId": 110
  },
  {
    "word": "countryside",
    "phonetic": "/countryside/",
    "meaning": "新概念词汇：countryside",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'countryside' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'countryside'。",
    "lessonId": 111
  },
  {
    "word": "county",
    "phonetic": "/county/",
    "meaning": "新概念词汇：county",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'county' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'county'。",
    "lessonId": 112
  },
  {
    "word": "couple",
    "phonetic": "/couple/",
    "meaning": "新概念词汇：couple",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'couple' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'couple'。",
    "lessonId": 113
  },
  {
    "word": "courage",
    "phonetic": "/courage/",
    "meaning": "新概念词汇：courage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'courage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'courage'。",
    "lessonId": 114
  },
  {
    "word": "courageous",
    "phonetic": "/courageous/",
    "meaning": "新概念词汇：courageous",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'courageous' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'courageous'。",
    "lessonId": 115
  },
  {
    "word": "course",
    "phonetic": "/course/",
    "meaning": "新概念词汇：course",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'course' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'course'。",
    "lessonId": 116
  },
  {
    "word": "court",
    "phonetic": "/court/",
    "meaning": "新概念词汇：court",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'court' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'court'。",
    "lessonId": 117
  },
  {
    "word": "courtyard",
    "phonetic": "/courtyard/",
    "meaning": "新概念词汇：courtyard",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'courtyard' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'courtyard'。",
    "lessonId": 118
  },
  {
    "word": "cousin",
    "phonetic": "/cousin/",
    "meaning": "新概念词汇：cousin",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cousin' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cousin'。",
    "lessonId": 119
  },
  {
    "word": "cover",
    "phonetic": "/cover/",
    "meaning": "新概念词汇：cover",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cover' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cover'。",
    "lessonId": 120
  },
  {
    "word": "coverage",
    "phonetic": "/coverage/",
    "meaning": "新概念词汇：coverage",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coverage' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coverage'。",
    "lessonId": 121
  },
  {
    "word": "covered",
    "phonetic": "/covered/",
    "meaning": "新概念词汇：covered",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'covered' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'covered'。",
    "lessonId": 122
  },
  {
    "word": "cow",
    "phonetic": "/cow/",
    "meaning": "新概念词汇：cow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cow'。",
    "lessonId": 123
  },
  {
    "word": "coward",
    "phonetic": "/coward/",
    "meaning": "新概念词汇：coward",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'coward' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'coward'。",
    "lessonId": 124
  },
  {
    "word": "cowboy",
    "phonetic": "/cowboy/",
    "meaning": "新概念词汇：cowboy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cowboy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cowboy'。",
    "lessonId": 125
  },
  {
    "word": "crack",
    "phonetic": "/crack/",
    "meaning": "新概念词汇：crack",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crack' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crack'。",
    "lessonId": 126
  },
  {
    "word": "cradle",
    "phonetic": "/cradle/",
    "meaning": "新概念词汇：cradle",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cradle' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cradle'。",
    "lessonId": 127
  },
  {
    "word": "craft",
    "phonetic": "/craft/",
    "meaning": "新概念词汇：craft",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'craft' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'craft'。",
    "lessonId": 128
  },
  {
    "word": "craftsman",
    "phonetic": "/craftsman/",
    "meaning": "新概念词汇：craftsman",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'craftsman' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'craftsman'。",
    "lessonId": 129
  },
  {
    "word": "crash",
    "phonetic": "/crash/",
    "meaning": "新概念词汇：crash",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crash' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crash'。",
    "lessonId": 130
  },
  {
    "word": "crater",
    "phonetic": "/crater/",
    "meaning": "新概念词汇：crater",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crater' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crater'。",
    "lessonId": 131
  },
  {
    "word": "crawl",
    "phonetic": "/crawl/",
    "meaning": "新概念词汇：crawl",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crawl' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crawl'。",
    "lessonId": 132
  },
  {
    "word": "crazy",
    "phonetic": "/crazy/",
    "meaning": "新概念词汇：crazy",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crazy' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crazy'。",
    "lessonId": 133
  },
  {
    "word": "cream",
    "phonetic": "/cream/",
    "meaning": "新概念词汇：cream",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cream' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cream'。",
    "lessonId": 134
  },
  {
    "word": "create",
    "phonetic": "/create/",
    "meaning": "新概念词汇：create",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'create' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'create'。",
    "lessonId": 135
  },
  {
    "word": "creation",
    "phonetic": "/creation/",
    "meaning": "新概念词汇：creation",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creation' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creation'。",
    "lessonId": 136
  },
  {
    "word": "creative",
    "phonetic": "/creative/",
    "meaning": "新概念词汇：creative",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creative' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creative'。",
    "lessonId": 137
  },
  {
    "word": "creature",
    "phonetic": "/creature/",
    "meaning": "新概念词汇：creature",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creature' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creature'。",
    "lessonId": 138
  },
  {
    "word": "credit",
    "phonetic": "/credit/",
    "meaning": "新概念词汇：credit",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'credit' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'credit'。",
    "lessonId": 139
  },
  {
    "word": "creditor",
    "phonetic": "/creditor/",
    "meaning": "新概念词汇：creditor",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creditor' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creditor'。",
    "lessonId": 140
  },
  {
    "word": "creek",
    "phonetic": "/creek/",
    "meaning": "新概念词汇：creek",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creek' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creek'。",
    "lessonId": 141
  },
  {
    "word": "creep",
    "phonetic": "/creep/",
    "meaning": "新概念词汇：creep",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creep' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creep'。",
    "lessonId": 142
  },
  {
    "word": "creeper",
    "phonetic": "/creeper/",
    "meaning": "新概念词汇：creeper",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'creeper' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'creeper'。",
    "lessonId": 143
  },
  {
    "word": "crew",
    "phonetic": "/crew/",
    "meaning": "新概念词汇：crew",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crew' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crew'。",
    "lessonId": 144
  },
  {
    "word": "cricket",
    "phonetic": "/cricket/",
    "meaning": "新概念词汇：cricket",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cricket' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cricket'。",
    "lessonId": 1
  },
  {
    "word": "crime",
    "phonetic": "/crime/",
    "meaning": "新概念词汇：crime",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crime' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crime'。",
    "lessonId": 2
  },
  {
    "word": "criminal",
    "phonetic": "/criminal/",
    "meaning": "新概念词汇：criminal",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'criminal' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'criminal'。",
    "lessonId": 3
  },
  {
    "word": "crisis",
    "phonetic": "/crisis/",
    "meaning": "新概念词汇：crisis",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crisis' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crisis'。",
    "lessonId": 4
  },
  {
    "word": "crisp",
    "phonetic": "/crisp/",
    "meaning": "新概念词汇：crisp",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crisp' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crisp'。",
    "lessonId": 5
  },
  {
    "word": "critic",
    "phonetic": "/critic/",
    "meaning": "新概念词汇：critic",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'critic' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'critic'。",
    "lessonId": 6
  },
  {
    "word": "critical",
    "phonetic": "/critical/",
    "meaning": "新概念词汇：critical",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'critical' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'critical'。",
    "lessonId": 7
  },
  {
    "word": "criticism",
    "phonetic": "/criticism/",
    "meaning": "新概念词汇：criticism",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'criticism' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'criticism'。",
    "lessonId": 8
  },
  {
    "word": "criticize",
    "phonetic": "/criticize/",
    "meaning": "新概念词汇：criticize",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'criticize' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'criticize'。",
    "lessonId": 9
  },
  {
    "word": "crop",
    "phonetic": "/crop/",
    "meaning": "新概念词汇：crop",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crop' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crop'。",
    "lessonId": 10
  },
  {
    "word": "cross",
    "phonetic": "/cross/",
    "meaning": "新概念词汇：cross",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cross' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cross'。",
    "lessonId": 11
  },
  {
    "word": "crossing",
    "phonetic": "/crossing/",
    "meaning": "新概念词汇：crossing",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crossing' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crossing'。",
    "lessonId": 12
  },
  {
    "word": "crossroads",
    "phonetic": "/crossroads/",
    "meaning": "新概念词汇：crossroads",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crossroads' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crossroads'。",
    "lessonId": 13
  },
  {
    "word": "crouch",
    "phonetic": "/crouch/",
    "meaning": "新概念词汇：crouch",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crouch' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crouch'。",
    "lessonId": 14
  },
  {
    "word": "crow",
    "phonetic": "/crow/",
    "meaning": "新概念词汇：crow",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crow' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crow'。",
    "lessonId": 15
  },
  {
    "word": "crowd",
    "phonetic": "/crowd/",
    "meaning": "新概念词汇：crowd",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crowd' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crowd'。",
    "lessonId": 16
  },
  {
    "word": "crowded",
    "phonetic": "/crowded/",
    "meaning": "新概念词汇：crowded",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crowded' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crowded'。",
    "lessonId": 17
  },
  {
    "word": "crown",
    "phonetic": "/crown/",
    "meaning": "新概念词汇：crown",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crown' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crown'。",
    "lessonId": 18
  },
  {
    "word": "crucial",
    "phonetic": "/crucial/",
    "meaning": "新概念词汇：crucial",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crucial' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crucial'。",
    "lessonId": 19
  },
  {
    "word": "cruel",
    "phonetic": "/cruel/",
    "meaning": "新概念词汇：cruel",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cruel' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cruel'。",
    "lessonId": 20
  },
  {
    "word": "cruelty",
    "phonetic": "/cruelty/",
    "meaning": "新概念词汇：cruelty",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cruelty' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cruelty'。",
    "lessonId": 21
  },
  {
    "word": "cruise",
    "phonetic": "/cruise/",
    "meaning": "新概念词汇：cruise",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'cruise' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'cruise'。",
    "lessonId": 22
  },
  {
    "word": "crumb",
    "phonetic": "/crumb/",
    "meaning": "新概念词汇：crumb",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crumb' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crumb'。",
    "lessonId": 23
  },
  {
    "word": "crumple",
    "phonetic": "/crumple/",
    "meaning": "新概念词汇：crumple",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crumple' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crumple'。",
    "lessonId": 24
  },
  {
    "word": "crush",
    "phonetic": "/crush/",
    "meaning": "新概念词汇：crush",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crush' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crush'。",
    "lessonId": 25
  },
  {
    "word": "crust",
    "phonetic": "/crust/",
    "meaning": "新概念词汇：crust",
    "mcItem": "Paper",
    "mcItemIcon": "📜",
    "sampleSentence": "Practice writing 'crust' in your English notebook.",
    "sampleTranslation": "在你的英语笔记本上练习拼写'crust'。",
    "lessonId": 26
  }
];
