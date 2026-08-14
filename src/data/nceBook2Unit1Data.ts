import { VocabItem } from '../types';

export interface Book2LessonData {
  lessonId: number;
  title: string;
  titleZh: string;
  topic: string;
  topicZh: string;
  grammar: string;
  grammarDetail: string;
  mcScene: string;
  mcSceneDesc: string;
  vocab: Omit<VocabItem, 'id'>[];
  sentences: Array<{ en: string; zh: string }>;
  dialogue: Array<{ speaker: string; text: string; translation: string; avatar: string }>;
}

export const NCE_BOOK2_UNIT1_DATA: Record<number, Book2LessonData> = {
  1: {
    lessonId: 1,
    title: "A private conversation",
    titleZh: "私人谈话",
    topic: "Theater & Manners",
    topicZh: "剧场礼仪与倾听",
    grammar: "简单句的六种基本句型与一般过去时",
    grammarDetail: "重点掌握主+谓+宾+状语的词序结构，以及一般过去时规则动词与不规则动词变化。",
    mcScene: "红石要塞 · 剧场演播厅",
    mcSceneDesc: "Steve 和 Alex 在要塞红石剧场观看演出，身后有两位村民在激烈大声交谈。",
    vocab: [
      { word: 'private', phonetic: '/ˈpraɪvət/', meaning: '形容词：私人的；私密的', mcItem: 'Locked Chest', mcItemIcon: '🔒', sampleSentence: 'This is a private redstone vault.', sampleTranslation: '这是一座私人红石金库。' },
      { word: 'conversation', phonetic: '/ˌkɒnvəˈseɪʃn/', meaning: '名词：谈话；交谈', mcItem: 'Lectern', mcItemIcon: '💬', sampleSentence: 'They had a loud conversation during the play.', sampleTranslation: '他们在演出期间大声交谈。' },
      { word: 'theatre', phonetic: '/ˈθɪətə(r)/', meaning: '名词：剧院；戏院', mcItem: 'Stage Light', mcItemIcon: '🎭', sampleSentence: 'We went to the village theatre last night.', sampleTranslation: '我们昨晚去了村庄剧院。' },
      { word: 'seat', phonetic: '/siːt/', meaning: '名词：座位', mcItem: 'Stairs Chair', mcItemIcon: '🪑', sampleSentence: 'I had a very good seat near the front.', sampleTranslation: '我的座位很好，靠在前面。' },
      { word: 'loudly', phonetic: '/ˈlaʊdli/', meaning: '副词：大声地', mcItem: 'Noteblock', mcItemIcon: '📢', sampleSentence: 'The two players were talking loudly behind me.', sampleTranslation: '两位玩家在我身后大声说话。' },
      { word: 'angry', phonetic: '/ˈæŋɡri/', meaning: '形容词：生气的；愤怒的', mcItem: 'Angry Villager', mcItemIcon: '😡', sampleSentence: 'I got very angry and turned around.', sampleTranslation: '我变得非常生气并转过身去。' },
      { word: 'attention', phonetic: '/əˈtenʃn/', meaning: '名词：注意力；专心', mcItem: 'Compass', mcItemIcon: '🎯', sampleSentence: 'They did not pay any attention to me.', sampleTranslation: '他们丝毫没有理会我。' },
      { word: 'bear', phonetic: '/beə(r)/', meaning: '动词：忍受；容忍', mcItem: 'Shield', mcItemIcon: '🛡️', sampleSentence: 'In the end, I could not bear it.', sampleTranslation: '最后，我再也无法忍受了。' },
      { word: 'business', phonetic: '/ˈbɪznəs/', meaning: '名词：事情；生意', mcItem: 'Emerald', mcItemIcon: '💼', sampleSentence: 'It is none of your business!', sampleTranslation: '这不关你的事！' }
    ],
    sentences: [
      { en: "Last week I went to the theatre.", zh: "上周我去了剧院。" },
      { en: "I had a very good seat.", zh: "我的座位很好。" },
      { en: "The play was very interesting.", zh: "那出戏非常有趣。" },
      { en: "I did not enjoy it.", zh: "我却一点也没能享受其中。" },
      { en: "A young man and a young woman were sitting behind me.", zh: "一对年轻男女正坐在我身后。" },
      { en: "They were talking loudly.", zh: "他们在大声交谈。" },
      { en: "I could not hear the actors.", zh: "我听不清演员在说什么。" },
      { en: "I turned round and looked at them angrily.", zh: "我转过身愤怒地看着他们。" },
      { en: "In the end, I could not bear it.", zh: "最后，我实在无法忍受了。" },
      { en: "\"It is none of your business,\" the young man said rudely. \"This is a private conversation!\"", zh: "“这不关你的事，”那个年轻人粗鲁地说。“这是私人谈话！”" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Last week I went to the theatre. I had a very good seat.", translation: "上周我去了剧院，我的座位非常好。", avatar: "👦" },
      { speaker: "Alex", text: "Did you enjoy the play?", translation: "你欣赏那出戏了吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I did not enjoy it! A young man and a young woman behind me were talking loudly.", translation: "我一点也没享受到！我身后的一对年轻人一直在大声说话。", avatar: "👦" },
      { speaker: "Alex", text: "Couldn't you hear the actors?", translation: "你听不清演员的声音吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I turned round and said, 'I can't hear a word!'", translation: "我转过身说：‘我一个字都听不见！’", avatar: "👦" },
      { speaker: "Alex", text: "What did the young man say?", translation: "那个年轻人说了什么？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "He said rudely: 'It is none of your business! This is a private conversation!'", translation: "他粗鲁地说：‘这不关你的事！这是私人谈话！’", avatar: "👦" }
    ]
  },
  2: {
    lessonId: 2,
    title: "Breakfast or lunch?",
    titleZh: "早餐还是午餐？",
    topic: "Daily Habits",
    topicZh: "作息时间与习惯",
    grammar: "一般现在时与现在进行时对比",
    grammarDetail: "辨析习惯性动作（often/always + 一般现在时）与说话时刻正在发生的动作（be + doing）。",
    mcScene: "红石基建 · 史蒂夫的林中小屋",
    mcSceneDesc: "一个阳光明媚的周日早晨，Steve 在小屋里睡懒觉，Alex 姑妈打来电话。",
    vocab: [
      { word: 'until', phonetic: '/ənˈtɪl/', meaning: '介词/连词：直到……为止', mcItem: 'Clock', mcItemIcon: '⏳', sampleSentence: 'I stayed in bed until lunchtime.', sampleTranslation: '我一直赖在床上直到午饭时间。' },
      { word: 'outside', phonetic: '/ˌaʊtˈsaɪd/', meaning: '副词/介词：在外面', mcItem: 'Door', mcItemIcon: '🌲', sampleSentence: 'It was dark and raining outside.', sampleTranslation: '外面天色阴暗还在下雨。' },
      { word: 'ring', phonetic: '/rɪŋ/', meaning: '动词：(钟/电话)鸣响', mcItem: 'Bell', mcItemIcon: '🔔', sampleSentence: 'Just then, the redstone bell rang.', sampleTranslation: '就在那时，红石警钟响了。' },
      { word: 'aunt', phonetic: '/ɑːnt/', meaning: '名词：阿姨；姑母', mcItem: 'Player Head', mcItemIcon: '👩', sampleSentence: 'My Aunt Lucy called from the station.', sampleTranslation: '我的露西姑母从车站打来电话。' },
      { word: 'repeat', phonetic: '/rɪˈpiːt/', meaning: '动词：重复；重说', mcItem: 'Repeater', mcItemIcon: '🔁', sampleSentence: '"Breakfast?" she repeated in surprise.', sampleTranslation: '“早餐？”她吃惊地重复道。' }
    ],
    sentences: [
      { en: "It was Sunday. I never get up early on Sundays.", zh: "那是个星期天。星期天我从不早起。" },
      { en: "I sometimes stay in bed until lunch time.", zh: "我有时一直躺到吃午饭的时候。" },
      { en: "Last Sunday I got up very late.", zh: "上个星期天我起得很晚。" },
      { en: "I looked out of the window. It was dark outside.", zh: "我望向窗外，外面一片昏暗。" },
      { en: "Just then, the telephone rang. It was my aunt Lucy.", zh: "就在那时，电话响了。是我姑母露西打来的。" },
      { en: "\"I've just arrived by train,\" she said. \"I'm coming to see you.\"", zh: "“我刚坐火车到，”她说，“我马上来看你。”" },
      { en: "\"But I'm still having breakfast,\" I said.", zh: "“但我还在吃早饭呢，”我说。" },
      { en: "\"What are you doing?\" she asked.", zh: "“你在做什么？”她问。" },
      { en: "\"I'm having breakfast,\" I repeated.", zh: "“我正在吃早饭，”我又说了一遍。" },
      { en: "\"Dear me!\" she said. \"Do you always get up so late? It's one o'clock!\"", zh: "“天哪！”她说，“你总是起得这么晚吗？现在已经一点钟了！”" }
    ],
    dialogue: [
      { speaker: "Steve", text: "It was Sunday, and I got up at one o'clock.", translation: "那是个星期天，我一点钟才起床。", avatar: "👦" },
      { speaker: "Alex", text: "Did your aunt Lucy call you?", translation: "你的露西姑母给你打电话了吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Yes, she said she was coming to see me, but I was still having breakfast!", translation: "是的，她说要来看我，可我还在吃早餐！", avatar: "👦" },
      { speaker: "Alex", text: "What did she say when you said you were having breakfast?", translation: "当你说你在吃早餐时，她说了什么？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "She cried: 'Dear me! Do you always get up so late? It is one o'clock!'", translation: "她大叫道：‘天哪！你总是起这么晚吗？现在已经一点了！’", avatar: "👦" }
    ]
  },
  3: {
    lessonId: 3,
    title: "Please send me a card",
    titleZh: "请给我寄张明信片",
    topic: "Travel Postcards",
    topicZh: "旅行明信片与问候",
    grammar: "双宾语结构 Give / Send sb. sth. 与一般过去时",
    grammarDetail: "掌握 send sb. sth. = send sth. to sb.，及动词过去式 sent, bought, spent 等。",
    mcScene: "下界传送门前 · 意大利风情村",
    mcSceneDesc: "Steve 在欧洲意大利度假探险，买下了 37 张明信片准备寄给好友。",
    vocab: [
      { word: 'send', phonetic: '/send/', meaning: '动词：寄；发送', mcItem: 'Dispenser', mcItemIcon: '📮', sampleSentence: 'Please send me a postcard from Italy.', sampleTranslation: '请从意大利给我寄一张明信片。' },
      { word: 'postcard', phonetic: '/ˈpəʊstkɑːd/', meaning: '名词：明信片', mcItem: 'Paper', mcItemIcon: '✉️', sampleSentence: 'Postcards always spoil my holidays.', sampleTranslation: '明信片总会破坏我的假期。' },
      { word: 'spoil', phonetic: '/spɔɪl/', meaning: '动词：损坏；破坏', mcItem: 'Tnt', mcItemIcon: '💥', sampleSentence: 'Rain spoiled our outdoor adventure.', sampleTranslation: '大雨破坏了我们的户外探险。' },
      { word: 'museum', phonetic: '/mjuˈziːəm/', meaning: '名词：博物馆', mcItem: 'Armor Stand', mcItemIcon: '🏛️', sampleSentence: 'I visited museums and sat in public gardens.', sampleTranslation: '我参观了博物馆并在公园里静坐。' },
      { word: 'public', phonetic: '/ˈpʌblɪk/', meaning: '形容词：公共的；大众的', mcItem: 'Beacon', mcItemIcon: '🌐', sampleSentence: 'Public gardens are peaceful in summer.', sampleTranslation: '公共花园在夏天非常宁静。' },
      { word: 'friendly', phonetic: '/ˈfrendli/', meaning: '形容词：友好的', mcItem: 'Iron Golem', mcItemIcon: '😊', sampleSentence: 'A friendly waiter taught me a few words of Italian.', sampleTranslation: '一位友好的服务员教了我几句意大利语。' },
      { word: 'decision', phonetic: '/dɪˈsɪʒn/', meaning: '名词：决定；决心', mcItem: 'Enchanted Book', mcItemIcon: '⚖️', sampleSentence: 'I made a big decision on the last day.', sampleTranslation: '我在最后一天做出了一个重大决定。' }
    ],
    sentences: [
      { en: "Postcards always spoil my holidays.", zh: "明信片总会破坏我的假期。" },
      { en: "Last summer, I went to Italy.", zh: "去年夏天，我去了意大利。" },
      { en: "I visited museums and sat in public gardens.", zh: "我参观了博物馆，并在公园里小憩。" },
      { en: "A friendly waiter taught me a few words of Italian.", zh: "一位热情的服务员教了我几句意大利语。" },
      { en: "Every day I thought about postcards.", zh: "每天我都在惦记着明信片的事。" },
      { en: "My holidays passed quickly, but I did not send cards to my friends.", zh: "假期过得飞快，但我一张卡片也没给朋友寄。" },
      { en: "On the last day I made a big decision.", zh: "在最后一天，我做出了一个重大决定。" },
      { en: "I got up early and bought thirty-seven cards.", zh: "我起了个大早，买了37张明信片。" },
      { en: "I spent the whole day in my room, but I did not write a single card!", zh: "我在房间里呆了整整一天，可连一张也没写成！" }
    ],
    dialogue: [
      { speaker: "Alex", text: "Did you enjoy your trip to Italy, Steve?", translation: "史蒂夫，你的意大利之旅开心吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I visited museums, but postcards spoiled my holiday!", translation: "我参观了博物馆，但明信片毁了我的假期！", avatar: "👦" },
      { speaker: "Alex", text: "Did you buy cards for your friends?", translation: "你给朋友们买明信片了吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I bought thirty-seven postcards on the last day!", translation: "我在最后一天买了整整37张明信片！", avatar: "👦" },
      { speaker: "Alex", text: "How many did you write and send?", translation: "你写完寄出了多少张？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I spent the whole day in my room, but I did not write a single card!", translation: "我在房间坐了一整天，可一张都没写出来！", avatar: "👦" }
    ]
  },
  4: {
    lessonId: 4,
    title: "An exciting trip",
    titleZh: "激动人心的旅行",
    topic: "Adventures",
    topicZh: "探险与旅行体验",
    grammar: "现在完成时 have just / already done 与过去时区分",
    grammarDetail: "掌握 has just/already + 过去分词表示刚刚完成的动作，以及 have been to 与 have gone to 的区别。",
    mcScene: "澳大利亚热带草原 · 丛林要塞",
    mcSceneDesc: "Steve 收到了在澳大利亚做飞行工程师的哥哥 Tim 寄来的一封信。",
    vocab: [
      { word: 'exciting', phonetic: '/ɪkˈsaɪtɪŋ/', meaning: '形容词：令人兴奋的', mcItem: 'Firework Rocket', mcItemIcon: '✨', sampleSentence: 'Tim is having an exciting trip in Australia.', sampleTranslation: '蒂姆正在澳大利亚经历一次激动人心的旅行。' },
      { word: 'receive', phonetic: '/rɪˈsiːv/', meaning: '动词：收到；接到', mcItem: 'Hopper', mcItemIcon: '📥', sampleSentence: 'I have just received a letter from my brother.', sampleTranslation: '我刚收到了我哥哥寄来的一封信。' },
      { word: 'firm', phonetic: '/fɜːm/', meaning: '名词：商行；公司', mcItem: 'Emerald Block', mcItemIcon: '🏢', sampleSentence: 'He is working for a big engineering firm.', sampleTranslation: '他正在一家大型工程公司工作。' },
      { word: 'abroad', phonetic: '/əˈbrɔːd/', meaning: '副词：在国外；出国', mcItem: 'Elytra', mcItemIcon: '✈️', sampleSentence: 'Tim has been abroad for six months.', sampleTranslation: '蒂姆已经在国外呆了六个月了。' },
      { word: 'centre', phonetic: '/ˈsentə(r)/', meaning: '名词：中心；中央', mcItem: 'Lodestone', mcItemIcon: '📍', sampleSentence: 'Alice Springs is in the centre of Australia.', sampleTranslation: '艾利斯斯普林斯位于澳大利亚的中心。' }
    ],
    sentences: [
      { en: "I have just received a letter from my brother, Tim.", zh: "我刚刚收到我哥哥蒂姆的一封来信。" },
      { en: "He is in Australia. He has been there for six months.", zh: "他在澳大利亚。他已经在那里呆了六个月了。" },
      { en: "Tim is an engineer. He is working for a big firm.", zh: "蒂姆是一名工程师，他正在一家大公司工作。" },
      { en: "He has already visited a great number of different places in Australia.", zh: "他已经游览了澳大利亚的大量不同地方。" },
      { en: "He has just bought an Australian car and has gone to Alice Springs.", zh: "他刚刚买了一辆澳大利亚汽车，并且已经去了艾利斯斯普林斯。" },
      { en: "My brother has never been abroad before, so he is finding this trip very exciting.", zh: "我哥哥以前从未出过国，所以他觉得这次旅行非常令人兴奋。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "I have just received a letter from my brother Tim.", translation: "我刚收到了我哥哥蒂姆寄来的信。", avatar: "👦" },
      { speaker: "Alex", text: "Where is he now?", translation: "他现在在哪里？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "He is in Australia. He has already visited many exciting places.", translation: "他在澳大利亚，他已经游览了许多令人兴奋的地方。", avatar: "👦" },
      { speaker: "Alex", text: "Has he bought a car there?", translation: "他在那里买车了吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Yes, he has just bought an Australian car and driven to Alice Springs!", translation: "是的，他刚买了一辆澳洲汽车并开去了艾利斯斯普林斯！", avatar: "👦" }
    ]
  },
  5: {
    lessonId: 5,
    title: "No wrong numbers",
    titleZh: "无错号之虞",
    topic: "Communication",
    topicZh: "电话沟通与特别通讯",
    grammar: "现在完成时与一般过去时的对比运用",
    grammarDetail: "区分动作发生在过去特定时间（ago, yesterday 用过去时）与对现在造成的影响（现在完成时）。",
    mcScene: "信鸽信标站 · 红石车库",
    mcSceneDesc: "波默罗伊先生在伦敦开了一家车库，为了避免电话占线，买来信鸽传递消息。",
    vocab: [
      { word: 'pigeon', phonetic: '/ˈpɪdʒɪn/', meaning: '名词：鸽子', mcItem: 'Feather', mcItemIcon: '🕊️', sampleSentence: 'Pigeons can carry messages across towns.', sampleTranslation: '鸽子可以跨城镇传递信件。' },
      { word: 'message', phonetic: '/ˈmesɪdʒ/', meaning: '名词：信息；消息', mcItem: 'Written Book', mcItemIcon: '✉️', sampleSentence: 'The bird carried an urgent message to the garage.', sampleTranslation: '这只鸟给车库带来了一条紧急消息。' },
      { word: 'cover', phonetic: '/ˈkʌvə(r)/', meaning: '动词：跨越；覆盖', mcItem: 'Leather', mcItemIcon: '📏', sampleSentence: 'The pigeon covered the distance in three minutes.', sampleTranslation: '这只鸽子在三分钟内飞完了这段距离。' },
      { word: 'distance', phonetic: '/ˈdɪstəns/', meaning: '名词：距离', mcItem: 'Compass', mcItemIcon: '🧭', sampleSentence: 'The distance between the two villages is three miles.', sampleTranslation: '两个村庄之间的距离是三英里。' },
      { word: 'request', phonetic: '/rɪˈkwest/', meaning: '名词/动词：要求；请求', mcItem: 'Paper', mcItemIcon: '📜', sampleSentence: 'He sent urgent requests for spare parts.', sampleTranslation: '他发送了索要备件的紧急申请。' },
      { word: 'spare', phonetic: '/speə(r)/', meaning: '形容词：备用的；多余的', mcItem: 'Chest', mcItemIcon: '🔧', sampleSentence: 'We keep spare redstone torches in the chest.', sampleTranslation: '我们在箱子里存放备用红石火把。' }
    ],
    sentences: [
      { en: "Mr. James Scott has a garage in Silbury and now he has just bought another garage in Pinhurst.", zh: "詹姆斯·斯科特先生在锡尔伯里拥有一家车库，现在他又在平赫斯特买下了另一家车库。" },
      { en: "Pinhurst is only five miles from Silbury, but Mr. Scott cannot get a telephone for his new garage.", zh: "平赫斯特离锡尔伯里只有5英里，但斯科特先生无法为他的新车库装上电话。" },
      { en: "So he has just bought twelve pigeons.", zh: "所以他刚刚买了12只信鸽。" },
      { en: "Yesterday, a pigeon carried the first message from Pinhurst to Silbury.", zh: "昨天，一只信鸽把第一封信从平赫斯特送到了锡尔伯里。" },
      { en: "The bird covered the distance in three minutes.", zh: "这只鸟在三分钟内飞完了这段距离。" },
      { en: "In this way, Mr. Scott has sent a great many requests for spare parts and other urgent messages.", zh: "通过这种方式，斯科特先生发送了大量的备件申请和其他紧急信息。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Why did Mr. Scott buy twelve pigeons?", translation: "斯科特先生为什么买了12只信鸽？", avatar: "👦" },
      { speaker: "Alex", text: "Because he could not get a telephone for his new garage in Pinhurst!", translation: "因为他在平赫斯特的新车库申请不到电话！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "How fast did the pigeon fly yesterday?", translation: "昨天那只鸽子飞得有多快？", avatar: "👦" },
      { speaker: "Alex", text: "It covered the five-mile distance in just three minutes!", translation: "它仅仅用了三分钟就飞完了五英里的路程！", avatar: "👩‍🦰" }
    ]
  },
  6: {
    lessonId: 6,
    title: "Percy Buttons",
    titleZh: "佩西·巴顿斯",
    topic: "Beggars & Meals",
    topicZh: "拜访与食物赠予",
    grammar: "冠词 a, an, the 与不定代词的正确使用",
    grammarDetail: "掌握定冠词 the（特指）与不定冠词 a/an（泛指）的区别，以及 every, some, any 的搭配用法。",
    mcScene: "村庄面包房 · 木门前",
    mcSceneDesc: "乞丐佩西·巴顿斯每隔一段时间便来敲门要一顿饭，并在木门上留下独特的符号。",
    vocab: [
      { word: 'beggar', phonetic: '/ˈbeɡə(r)/', meaning: '名词：乞丐', mcItem: 'Stick', mcItemIcon: '🧔', sampleSentence: 'Percy Buttons is a well-known village beggar.', sampleTranslation: '佩西·巴顿斯是一位远近闻名的村庄乞丐。' },
      { word: 'food', phonetic: '/fuːd/', meaning: '名词：食物', mcItem: 'Bread', mcItemIcon: '🍞', sampleSentence: 'I gave him a meal and a glass of milk.', sampleTranslation: '我给了他一顿饭和一杯牛奶。' },
      { word: 'pocket', phonetic: '/ˈpɒkɪt/', meaning: '名词：衣袋；口袋', mcItem: 'Bundle', mcItemIcon: '👛', sampleSentence: 'He put the emerald into his deep pocket.', sampleTranslation: '他把绿宝石放进了他深深的口袋。' },
      { word: 'call', phonetic: '/kɔːl/', meaning: '动词：拜访；造访；称呼', mcItem: 'Bell', mcItemIcon: '🚪', sampleSentence: 'He calls at every house in the street once a month.', sampleTranslation: '他每个月在这条街的每家每户拜访一次。' },
      { word: 'piece', phonetic: '/piːs/', meaning: '名词：一块；一张', mcItem: 'Cheese', mcItemIcon: '🧀', sampleSentence: 'I gave him a piece of cheese and a cup of tea.', sampleTranslation: '我给了他一块奶酪和一杯茶。' }
    ],
    sentences: [
      { en: "I have just moved to a house in Bridge Street.", zh: "我刚刚搬到大桥街的一所房子里。" },
      { en: "Yesterday a beggar knocked at my door.", zh: "昨天一个乞丐来敲我的门。" },
      { en: "He asked me for a meal and a glass of beer.", zh: "他向我要一顿饭和一杯啤酒。" },
      { en: "In return for this, the beggar stood on his head and sang songs.", zh: "作为回报，这个乞丐倒立并唱起了歌。" },
      { en: "I gave him a meal and he drank the beer.", zh: "我给了他一顿饭，他把啤酒喝光了。" },
      { en: "Later a neighbour told me about him.", zh: "后来一位邻居向我谈起了他。" },
      { en: "His name is Percy Buttons. He calls at every house once a month and always asks for a meal.", zh: "他的名字叫佩西·巴顿斯。他每月挨家挨户拜访一次，总是要一顿饭吃。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "A beggar knocked at my door yesterday and stood on his head!", translation: "昨天有个乞丐来敲我的门，还在地上倒立！", avatar: "👦" },
      { speaker: "Alex", text: "Did you give him any food?", translation: "你给他食物了吗？", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "I gave him a warm meal and a drink.", translation: "我给了他一顿热饭和一杯饮料。", avatar: "👦" },
      { speaker: "Alex", text: "My neighbour says his name is Percy Buttons! He comes every month!", translation: "我邻居说他的名字叫佩西·巴顿斯！他每个月都来！", avatar: "👩‍🦰" }
    ]
  },
  7: {
    lessonId: 7,
    title: "Too late",
    titleZh: "为时太晚",
    topic: "Detectives & Thieves",
    topicZh: "侦探与机场破案",
    grammar: "过去进行时 was / were doing 与一般过去时的结合",
    grammarDetail: "掌握当一个持续性动作（过去进行时）正在进行时，被另一个短暂动作（一般过去时）打断的句型。",
    mcScene: "红石机场 · 钻石走私追踪",
    mcSceneDesc: "两名侦探守在希思罗机场停机坪，守候装有珍贵钻石的包裹。",
    vocab: [
      { word: 'detective', phonetic: '/dɪˈtektɪv/', meaning: '名词：侦探', mcItem: 'Spyglass', mcItemIcon: '🕵️', sampleSentence: 'Detectives were waiting at the airport all morning.', sampleTranslation: '侦探们整个上午都在机场守候。' },
      { word: 'airport', phonetic: '/ˈeəpɔːt/', meaning: '名词：机场；航空港', mcItem: 'Runway Rail', mcItemIcon: '🛫', sampleSentence: 'The plane arrived at the airport on time.', sampleTranslation: '飞机准时到达了机场。' },
      { word: 'expect', phonetic: '/ɪkˈspekt/', meaning: '动词：期待；预料', mcItem: 'Clock', mcItemIcon: '⏳', sampleSentence: 'They were expecting a valuable parcel of diamonds.', sampleTranslation: '他们正在等待一包昂贵的钻石。' },
      { word: 'valuable', phonetic: '/ˈvæljuəbl/', meaning: '形容词：贵重的；有价值的', mcItem: 'Diamond Block', mcItemIcon: '💎', sampleSentence: 'Diamonds are extremely valuable in Minecraft.', sampleTranslation: '钻石在我的世界里极其珍贵。' },
      { word: 'parcel', phonetic: '/ˈpɑːsl/', meaning: '名词：包裹', mcItem: 'Shulker Box', mcItemIcon: '📦', sampleSentence: 'Someone had stolen the diamonds from the parcel.', sampleTranslation: '有人已经从包裹里盗走了钻石。' },
      { word: 'diamond', phonetic: '/ˈdaɪəmənd/', meaning: '名词：钻石', mcItem: 'Diamond', mcItemIcon: '💠', sampleSentence: 'The precious diamonds were missing from the case.', sampleTranslation: '箱子里的珍贵钻石不翼而飞了。' },
      { word: 'steal', phonetic: '/stiːl/', meaning: '动词：偷窃 (stole, stolen)', mcItem: 'Thief Mask', mcItemIcon: '🦹', sampleSentence: 'Thieves stole the gems while the guards were away.', sampleTranslation: '警卫离开时小偷偷走了宝石。' }
    ],
    sentences: [
      { en: "The plane was late and detectives were waiting at the airport all morning.", zh: "飞机晚点了，侦探们整个上午都在机场等待。" },
      { en: "They were expecting a valuable parcel of diamonds from South Africa.", zh: "他们正等待着一个从南非寄来的贵重钻石包裹。" },
      { en: "A few hours earlier, someone had told the police that thieves would try to steal the diamonds.", zh: "几个小时前，有人向警方报信说小偷将企图盗窃这些钻石。" },
      { en: "When the plane arrived, some of the detectives were waiting inside the main building while others were waiting on the airfield.", zh: "当飞机到达时，一些侦探在大楼内守候，其他人则在停机坪上等待。" },
      { en: "Two men took the parcel off the plane and carried it into the Customs House.", zh: "两名男子把包裹从飞机上搬下来，运进了海关大楼。" },
      { en: "While two detectives were keeping guard at the door, two others opened the parcel.", zh: "当两名侦探在门口把守时，另外两名侦探打开了包裹。" },
      { en: "To their surprise, the precious parcel was full of stones and sand!", zh: "令他们大吃一惊的是，这个贵重包裹里装满了石头和沙子！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Were the detectives waiting at the airport all morning?", translation: "侦探们整个上午都在机场等待吗？", avatar: "👦" },
      { speaker: "Alex", text: "Yes! They were expecting a valuable parcel of diamonds from South Africa.", translation: "是的！他们正等着一个从南非寄来的贵重钻石包裹。", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What did they find when they opened the parcel?", translation: "当他们打开包裹时发现了什么？", avatar: "👦" },
      { speaker: "Alex", text: "To their surprise, the parcel was full of stones and sand! The thieves were too clever!", translation: "令他们吃惊的是，包裹里塞满了石头和沙子！小偷太狡猾了！", avatar: "👩‍🦰" }
    ]
  },
  8: {
    lessonId: 8,
    title: "The best and the worst",
    titleZh: "最好的和最差的",
    topic: "Gardening Competition",
    topicZh: "园艺比赛与评价",
    grammar: "形容词与副词的比较级和最高级 (Comparative & Superlative)",
    grammarDetail: "掌握规则变化 (-er, -est, more, most) 与不规则变化 (good/well -> better -> best, bad -> worse -> worst)。",
    mcScene: "村庄花园 · 丰收竞赛评选",
    mcSceneDesc: "每年村里都会评选最美花园，比尔·弗利斯先生每次都拿到最差奖，但他毫不在意。",
    vocab: [
      { word: 'competition', phonetic: '/ˌkɒmpəˈtɪʃn/', meaning: '名词：比赛；竞争', mcItem: 'Trophy', mcItemIcon: '🏆', sampleSentence: 'Joe always wins the best garden competition.', sampleTranslation: '乔总是赢得最佳花园比赛。' },
      { word: 'neat', phonetic: '/niːt/', meaning: '形容词：整齐的；整洁的', mcItem: 'Shears', mcItemIcon: '✂️', sampleSentence: 'His garden is always neat and tidy.', sampleTranslation: '他的花园总是整洁而美观。' },
      { word: 'path', phonetic: '/pɑːθ/', meaning: '名词：小路；通道', mcItem: 'Dirt Path', mcItemIcon: '🛤️', sampleSentence: 'Stone paths make the garden look beautiful.', sampleTranslation: '石子小路让花园看起来格外美丽。' },
      { word: 'wooden', phonetic: '/ˈwʊdn/', meaning: '形容词：木制的', mcItem: 'Oak Fence', mcItemIcon: '🪵', sampleSentence: 'There is a small wooden pool in the centre.', sampleTranslation: '中央有一个小巧的木制水池。' },
      { word: 'pool', phonetic: '/puːl/', meaning: '名词：水池；水塘', mcItem: 'Water Bucket', mcItemIcon: '🏊', sampleSentence: 'Water lilies float in the garden pool.', sampleTranslation: '睡莲漂浮在花园水池中。' }
    ],
    sentences: [
      { en: "Joe Sanders has the most beautiful garden in our town.", zh: "乔·桑德斯拥有我们镇上最漂亮的花园。" },
      { en: "Nearly everybody enters for 'The Nicest Garden Competition' each year, but Joe wins every time.", zh: "每年几乎每个人都参加“最佳花园竞赛”，但每次都是乔获胜。" },
      { en: "Bill Frith's garden is larger than Joe's.", zh: "比尔·弗利斯的花园比乔的花园更大。" },
      { en: "Bill works harder than Joe and grows more flowers and vegetables.", zh: "比尔比乔工作更努力，种植了更多的花卉和蔬菜。" },
      { en: "Joe's garden is more interesting.", zh: "乔的花园更加有趣。" },
      { en: "He has made neat paths and has built a wooden bridge over a pool.", zh: "他修筑了整洁的小路，并在水池上架起了一座木桥。" },
      { en: "I like Bill's garden best. He always wins a little prize for the worst garden in the town!", zh: "我最喜欢比尔的花园。他总是能赢得全镇最差花园的小奖品！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Who has the most beautiful garden in town?", translation: "镇上谁的花园最漂亮？", avatar: "👦" },
      { speaker: "Alex", text: "Joe Sanders! He wins the competition every single year.", translation: "乔·桑德斯！他每年都赢得这项比赛。", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Doesn't Bill Frith work harder than Joe?", translation: "比尔·弗利斯难道不比乔工作更卖力吗？", avatar: "👦" },
      { speaker: "Alex", text: "Bill works much harder, but his garden is the untidiest! He always wins the prize for the worst garden!", translation: "比尔卖力得多，但他花园最乱！他总是赢得最差花园奖！", avatar: "👩‍🦰" }
    ]
  },
  9: {
    lessonId: 9,
    title: "A cold welcome",
    titleZh: "冷淡的欢迎",
    topic: "New Year's Eve",
    topicZh: "跨年钟声与迎新",
    grammar: "介词 in, on, at 表示时间与地点的精确用法",
    grammarDetail: "at midnight/6 o'clock (时间点), on Wednesday/New Year's Eve (具体某天), in 2026/January (年份/月份)。",
    mcScene: "主城市政大厅 · 大钟楼顶",
    mcSceneDesc: "除夕之夜，成千上万的玩家聚集在城镇钟楼广场等待大钟敲响 12 点迎接新年。",
    vocab: [
      { word: 'welcome', phonetic: '/ˈwelkəm/', meaning: '名词/动词：欢迎', mcItem: 'Banner', mcItemIcon: '🎉', sampleSentence: 'The big crowd gave the New Year a cold welcome.', sampleTranslation: '大批人群给新年送上了一场“冷淡”的欢迎。' },
      { word: 'crowd', phonetic: '/kraʊd/', meaning: '名词：人群', mcItem: 'Villagers', mcItemIcon: '👥', sampleSentence: 'A huge crowd gathered in Town Hall square.', sampleTranslation: '一大群人聚集在市政厅广场。' },
      { word: 'gather', phonetic: '/ˈɡæðə(r)/', meaning: '动词：聚集；集合', mcItem: 'Campfire', mcItemIcon: '🔥', sampleSentence: 'Players gathered to welcome the New Year.', sampleTranslation: '玩家们聚集在一起迎接新年。' },
      { word: 'hand', phonetic: '/hænd/', meaning: '名词：指针；手', mcItem: 'Clock Hand', mcItemIcon: '👉', sampleSentence: 'The big hands of the clock pointed to twelve.', sampleTranslation: '大钟的粗大指针指向了12点。' },
      { word: 'shout', phonetic: '/ʃaʊt/', meaning: '动词：大喊；高呼', mcItem: 'Goat Horn', mcItemIcon: '📣', sampleSentence: 'Everybody shouted: "Happy New Year!"', sampleTranslation: '每个人都高呼：“新年快乐！”' },
      { word: 'refuse', phonetic: '/rɪˈfjuːz/', meaning: '动词：拒绝', mcItem: 'Barrier', mcItemIcon: '🚫', sampleSentence: 'The huge town clock refused to strike.', sampleTranslation: '那座巨大的城镇大钟拒绝敲响。' }
    ],
    sentences: [
      { en: "On Wednesday evening, we went to the Town Hall.", zh: "星期三晚上，我们去了市政厅。" },
      { en: "It was the last day of the year and a large crowd of people had gathered under the Town Hall clock.", zh: "这是一年的最后一天，一大群人聚集在市政厅的大钟下面。" },
      { en: "It would strike twelve in twenty minutes' time.", zh: "再过二十分钟，大钟就要敲响十二下了。" },
      { en: "Fifteen minutes passed and then, at five to twelve, the clock stopped.", zh: "十五分钟过去了，随后在差五分十二点时，大钟停了。" },
      { en: "The big clock refused to welcome the New Year.", zh: "这座大钟拒绝迎接新年的到来。" },
      { en: "At that moment, everybody began to laugh and sing.", zh: "在那一刻，大家开始大笑并唱起歌来。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Did you go to the Town Hall on New Year's Eve, Alex?", translation: "除夕之夜你去市政厅了吗，亚历克斯？", avatar: "👦" },
      { speaker: "Alex", text: "Yes, a large crowd had gathered under the big clock.", translation: "去了，一大群人聚集在大钟下面。", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Did the clock strike twelve?", translation: "大钟敲响十二点了吗？", avatar: "👦" },
      { speaker: "Alex", text: "No, at five to twelve the clock stopped! It refused to strike!", translation: "没有，差五分十二点时钟停了！它拒绝敲响！", avatar: "👩‍🦰" }
    ]
  },
  10: {
    lessonId: 10,
    title: "Not for jazz",
    titleZh: "爵士乐不适用",
    topic: "Musical Instruments",
    topicZh: "古老乐器与古董保护",
    grammar: "被动语态 (Passive Voice: is/was + past participle)",
    grammarDetail: "掌握动作承受者作主语时的被动结构，如 was made in 1681, was damaged by someone。",
    mcScene: "古董收藏室 · 大键琴陈列室",
    mcSceneDesc: "史密斯夫人拥有一台 17 世纪制造的珍贵羽管键琴（大键琴），但最近却被弄坏了。",
    vocab: [
      { word: 'jazz', phonetic: '/dʒæz/', meaning: '名词：爵士乐', mcItem: 'Jukebox', mcItemIcon: '🎷', sampleSentence: 'This ancient instrument was not made for jazz.', sampleTranslation: '这件古老乐器不是为演奏爵士乐制造的。' },
      { word: 'clavichord', phonetic: '/ˈklævɪkɔːd/', meaning: '名词：古钢琴；翼琴', mcItem: 'Note Block', mcItemIcon: '🎹', sampleSentence: 'The clavichord was kept in the living room.', sampleTranslation: '这台翼琴被保存在起居室里。' },
      { word: 'recently', phonetic: '/ˈriːsntli/', meaning: '副词：最近', mcItem: 'Clock', mcItemIcon: '🕒', sampleSentence: 'The instrument was recently damaged by a visitor.', sampleTranslation: '这件乐器最近被一位访客损坏了。' },
      { word: 'damage', phonetic: '/ˈdæmɪdʒ/', meaning: '动词/名词：损坏；毁坏', mcItem: 'Anvil', mcItemIcon: '🔨', sampleSentence: 'Two strings were broken and damaged.', sampleTranslation: '两根琴弦断裂损坏了。' },
      { word: 'key', phonetic: '/kiː/', meaning: '名词：琴键；钥匙', mcItem: 'Tripwire Hook', mcItemIcon: '🗝️', sampleSentence: 'She struck the keys too hard.', sampleTranslation: '她用力敲击了琴键。' },
      { word: 'shock', phonetic: '/ʃɒk/', meaning: '名词/动词：震惊', mcItem: 'Lightning Rod', mcItemIcon: '⚡', sampleSentence: 'We were all shocked by the terrible sound.', sampleTranslation: '我们都被那可怕的声音震惊了。' }
    ],
    sentences: [
      { en: "We have an old musical instrument. It is called a clavichord.", zh: "我们有一件古老的乐器，它叫羽管键琴。" },
      { en: "It was made in Germany in 1681.", zh: "它是1681年在德国制造的。" },
      { en: "Our clavichord is kept in the living room.", zh: "我们的羽管键琴一直存放在客厅里。" },
      { en: "It has belonged to our family for a long time.", zh: "它归我们家族所有已经有很长时间了。" },
      { en: "The instrument was bought by my grandfather many years ago.", zh: "这件乐器是我祖父在很多年前买下的。" },
      { en: "Recently it was damaged by a visitor.", zh: "最近它被一位来客弄坏了。" },
      { en: "She struck the keys too hard and two of the strings were broken.", zh: "她敲击琴键过于用力，导致两根琴弦断了。" },
      { en: "My father was shocked. Now our clavichord is being repaired by a friend.", zh: "我的父亲大为震惊。现在我们的羽管键琴正由一位朋友进行修理。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "When was your clavichord made?", translation: "你的羽管键琴是什么时候制造的？", avatar: "👦" },
      { speaker: "Alex", text: "It was made in Germany in 1681! It is very precious.", translation: "它是1681年在德国制造的！非常珍贵。", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What happened to it recently?", translation: "它最近怎么了？", avatar: "👦" },
      { speaker: "Alex", text: "A guest played jazz on it and struck the keys too hard! Two strings were broken!", translation: "一位客人用它弹奏爵士乐而且敲键太用力！弹断了两根琴弦！", avatar: "👩‍🦰" }
    ]
  },
  11: {
    lessonId: 11,
    title: "One man's meat is another man's poison",
    titleZh: "各有所爱",
    topic: "Unusual Foods",
    topicZh: "奇特食物与文化偏好",
    grammar: "动词的现在与过去习惯用法 Review",
    grammarDetail: "探讨不同国家饮食习惯，掌握 used to 与一般现在时的对比表达。",
    mcScene: "下界营地 · 奇怪的炖汤",
    mcSceneDesc: "Steve 在营地煮蜗牛大餐，村民们看了连连摇头，而 Alex 却吃得津津有味。",
    vocab: [
      { word: 'poison', phonetic: '/ˈpɔɪzn/', meaning: '名词：毒药；有害物', mcItem: 'Spider Eye', mcItemIcon: '☠️', sampleSentence: 'One man\'s meat is another man\'s poison.', sampleTranslation: '各有所爱（萝卜白菜，各有所爱）。' },
      { word: 'snail', phonetic: '/sneɪl/', meaning: '名词：蜗牛', mcItem: 'Slimeball', mcItemIcon: '🐌', sampleSentence: 'Snails are considered a delicacy in France.', sampleTranslation: '在法国，蜗牛被认为是一种美味佳肴。' },
      { word: 'dish', phonetic: '/dɪʃ/', meaning: '名词：菜肴；盘子', mcItem: 'Bowl', mcItemIcon: '🍲', sampleSentence: 'He ordered a delicious traditional dish.', sampleTranslation: '他点了一道美味的传统菜肴。' },
      { word: 'ill', phonetic: '/ɪl/', meaning: '形容词：生病的；不舒服的', mcItem: 'Poison Potion', mcItemIcon: '🤒', sampleSentence: 'The thought of eating snails made him ill.', sampleTranslation: '一想到要吃蜗牛就让他感到不适。' }
    ],
    sentences: [
      { en: "People are often surprised when they discover how much people in other countries eat.", zh: "当人们发现其他国家的人吃些什么时，常常感到惊讶。" },
      { en: "Snails are considered a great delicacy in France.", zh: "在法国，蜗牛被视为一道绝佳的珍馐。" },
      { en: "My friend Robert lives in a village in England.", zh: "我的朋友罗伯特住在英格兰的一个村庄里。" },
      { en: "He collects snails in his garden and eats them with pleasure.", zh: "他在花园里收集蜗牛，并津津有味地吃掉它们。" },
      { en: "His English neighbours think that he is completely mad!", zh: "他的英国邻居们认为他完全疯了！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Do people really eat snails in France, Alex?", translation: "在法国人们真的吃蜗牛吗，亚历克斯？", avatar: "👦" },
      { speaker: "Alex", text: "Yes! They consider snails a great delicacy!", translation: "是的！他们把蜗牛视为一道珍馐美味！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What do Robert's English neighbours think of him?", translation: "罗伯特的英国邻居怎么看他？", avatar: "👦" },
      { speaker: "Alex", text: "They think he is completely mad, but as the proverb says: one man's meat is another man's poison!", translation: "他们觉得他疯了，但正如谚语所说：各有所爱！", avatar: "👩‍🦰" }
    ]
  },
  12: {
    lessonId: 12,
    title: "Goodbye and good luck",
    titleZh: "再见，祝你好运",
    topic: "Voyages",
    topicZh: "扬帆远航与航海探险",
    grammar: "一般将来时 (Simple Future: will / shall / be going to)",
    grammarDetail: "掌握 will + 动词原形表示将要发生的事情或承诺，以及将来时间状语的搭配。",
    mcScene: "深海港口 · 巨型帆船启航",
    mcSceneDesc: "史蒂夫的好友船长准备驾船单人环游世界，全港口的伙伴都来为他送行。",
    vocab: [
      { word: 'luck', phonetic: '/lʌk/', meaning: '名词：运气；幸运', mcItem: 'Rabbit Foot', mcItemIcon: '🍀', sampleSentence: 'We wished him goodbye and good luck.', sampleTranslation: '我们祝他再见并祝他好运。' },
      { word: 'captain', phonetic: '/ˈkæptɪn/', meaning: '名词：船长；队长', mcItem: 'Spyglass', mcItemIcon: '🧑‍✈️', sampleSentence: 'Captain Barker will sail across the ocean tomorrow.', sampleTranslation: '巴克船长明天将扬帆横渡大洋。' },
      { word: 'sail', phonetic: '/seɪl/', meaning: '动词：航行；扬帆', mcItem: 'Boat', mcItemIcon: '⛵', sampleSentence: 'He is going to sail round the world alone.', sampleTranslation: '他打算独自一人环游世界航行。' },
      { word: 'harbour', phonetic: '/ˈhɑːbə(r)/', meaning: '名词：港口；海港', mcItem: 'Pier', mcItemIcon: '⚓', sampleSentence: 'A crowd gathered at the harbour to wave goodbye.', sampleTranslation: '人群聚集在港口挥手告别。' },
      { word: 'proud', phonetic: '/praʊd/', meaning: '形容词：自豪的；骄傲的', mcItem: 'Golden Crown', mcItemIcon: '👑', sampleSentence: 'We are very proud of his brave voyage.', sampleTranslation: '我们为他勇敢的航行感到非常骄傲。' }
    ],
    sentences: [
      { en: "Our friend, Captain Charles Alison, will sail from Portsmouth tomorrow.", zh: "我们的朋友查尔斯·艾利森船长明天将从朴次茅斯启航。" },
      { en: "We shall meet him at the harbour early in the morning.", zh: "我们一早将在港口与他会面。" },
      { en: "He will be in his small boat, Topsail.", zh: "他将登上他的小帆船‘顶帆号’。" },
      { en: "Topsail is a famous little boat.", zh: "‘顶帆号’是一艘著名的小船。" },
      { en: "It has sailed across the Atlantic many times.", zh: "它曾多次横渡大西洋。" },
      { en: "Captain Alison will set out on an eight-thousand-mile journey.", zh: "艾利森船长将踏上八千英里的漫长征程。" },
      { en: "We are proud of him. He will take part in an important race.", zh: "我们为他感到骄傲。他将参加一项重要的航海比赛。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "When will Captain Alison set sail?", translation: "艾利森船长什么时候启航？", avatar: "👦" },
      { speaker: "Alex", text: "He will sail from Portsmouth early tomorrow morning!", translation: "他明天一早将从朴次茅斯港启航！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "How long is his journey?", translation: "他的航程有多长？", avatar: "👦" },
      { speaker: "Alex", text: "He will take part in an eight-thousand-mile race across the ocean!", translation: "他将参加一场长达八千英里的跨洋航海比赛！", avatar: "👩‍🦰" }
    ]
  },
  13: {
    lessonId: 13,
    title: "The Greenwood Boys",
    titleZh: "绿林少年",
    topic: "Pop Music",
    topicZh: "流行乐队与巡回演出",
    grammar: "将来进行时 (Future Continuous: will be doing)",
    grammarDetail: "掌握 will be doing 表示在将来某个特定时刻正在进行的动作，以及表示预定安排。",
    mcScene: "露天音乐广场 · 红石音响舞台",
    mcSceneDesc: "当红流行流行乐队‘绿林少年’即将来到小镇举办巡回演唱会，粉丝们已全副武装。",
    vocab: [
      { word: 'group', phonetic: '/ɡruːp/', meaning: '名词：乐团；小组', mcItem: 'Note Block', mcItemIcon: '🎸', sampleSentence: 'The Greenwood Boys are a famous pop group.', sampleTranslation: '‘绿林少年’是一支著名的流行乐团。' },
      { word: 'pop', phonetic: '/pɒp/', meaning: '形容词/名词：流行的；通俗的', mcItem: 'Music Disc', mcItemIcon: '🎵', sampleSentence: 'Pop singers attract thousands of young fans.', sampleTranslation: '流行歌手吸引了成千上万的年轻歌迷。' },
      { word: 'club', phonetic: '/klʌb/', meaning: '名词：俱乐部', mcItem: 'Beacon', mcItemIcon: '🎪', sampleSentence: 'They will give five performances at the town club.', sampleTranslation: '他们将在镇俱乐部举办五场演出。' },
      { word: 'performance', phonetic: '/pəˈfɔːməns/', meaning: '名词：演出；表演', mcItem: 'Firework', mcItemIcon: '🎤', sampleSentence: 'All tickets for the performance have been sold out.', sampleTranslation: '演出的所有门票均已售罄。' },
      { word: 'police', phonetic: '/pəˈliːs/', meaning: '名词：警察', mcItem: 'Iron Helmet', mcItemIcon: '👮', sampleSentence: 'The police will have a difficult time keeping order.', sampleTranslation: '警察在维持秩序方面将面临严峻挑战。' }
    ],
    sentences: [
      { en: "The Greenwood Boys are a group of pop singers.", zh: "‘绿林少年’是一群流行歌手组合。" },
      { en: "At present, they are visiting all parts of the country.", zh: "目前，他们正在全国各地巡回演出。" },
      { en: "They will be arriving here tomorrow.", zh: "他们将于明天抵达这里。" },
      { en: "They will be staying for five days.", zh: "他们将在这里逗留五天。" },
      { en: "During this time, they will give five performances.", zh: "在此期间，他们将举行五场演出。" },
      { en: "As usual, the police will have a difficult time keeping order.", zh: "像往常一样，警察在维持秩序时将大费周折。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Have you heard the news about the Greenwood Boys?", translation: "你听到关于‘绿林少年’的新闻了吗？", avatar: "👦" },
      { speaker: "Alex", text: "Yes! They will be arriving tomorrow and staying for five days!", translation: "听到了！他们明天就到，而且要逗留五天！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Will you go to the concert?", translation: "你会去演唱会吗？", avatar: "👦" },
      { speaker: "Alex", text: "I already bought my ticket! Most of the young people in town will be there!", translation: "我已经买好票了！镇上的大部分年轻人都去！", avatar: "👩‍🦰" }
    ]
  },
  14: {
    lessonId: 14,
    title: "Do you speak English?",
    titleZh: "你会讲英语吗？",
    topic: "Travel Misunderstandings",
    topicZh: "旅行搭车与语言趣事",
    grammar: "过去完成时 (Past Perfect: had + past participle)",
    grammarDetail: "掌握 had + done 表示“过去的过去”，常与 before, after, as soon as, when 等引导的时间状语从句连用。",
    mcScene: "乡村公路旁 · 顺风矿车",
    mcSceneDesc: "Steve 开车在英格兰乡村旅行，途中搭上了一位年轻男子，发生了一段啼笑皆非的对话。",
    vocab: [
      { word: 'amusing', phonetic: '/əˈmjuːzɪŋ/', meaning: '形容词：有趣的；逗乐的', mcItem: 'Book', mcItemIcon: '😄', sampleSentence: 'I had an amusing experience last year.', sampleTranslation: '我去年有一段非常有趣的经历。' },
      { word: 'experience', phonetic: '/ɪkˈspɪəriəns/', meaning: '名词：经历；经验', mcItem: 'Exp Bottle', mcItemIcon: '🧪', sampleSentence: 'Travel gives you valuable experiences.', sampleTranslation: '旅行能给你带来宝贵的经历。' },
      { word: 'wave', phonetic: '/weɪv/', meaning: '动词：招手；挥动', mcItem: 'Hand', mcItemIcon: '👋', sampleSentence: 'A young man waved to me on the road.', sampleTranslation: '一名年轻男子在路边向我招手。' },
      { word: 'lift', phonetic: '/lɪft/', meaning: '名词：顺风车；搭车', mcItem: 'Minecart', mcItemIcon: '🚗', sampleSentence: 'I stopped and gave him a lift.', sampleTranslation: '我停下车顺路捎了他一程。' },
      { word: 'reply', phonetic: '/rɪˈplaɪ/', meaning: '动词/名词：回答；答复', mcItem: 'Paper', mcItemIcon: '🗣️', sampleSentence: 'He replied in fluent German.', sampleTranslation: '他用流利的德语作了回答。' },
      { word: 'language', phonetic: '/ˈlæŋɡwɪdʒ/', meaning: '名词：语言', mcItem: 'Enchanted Book', mcItemIcon: '🌐', sampleSentence: 'Neither of us spoke each other\'s language.', sampleTranslation: '我们俩谁也听不懂对方的语言。' }
    ],
    sentences: [
      { en: "I had an amusing experience last year.", zh: "去年我经历了一件滑稽可笑的事。" },
      { en: "After I had left a small village in the south of France, I drove on to the next town.", zh: "在离开法国南部的一个小村庄后，我驱车前往下一个城镇。" },
      { en: "On the way, a young man waved to me.", zh: "途中，一个年轻人向我招手。" },
      { en: "I stopped and he asked me for a lift.", zh: "我停下车，他请求搭我的顺风车。" },
      { en: "As soon as he had got into the car, I said good morning to him in French.", zh: "他一上车，我就用法语向他道早安。" },
      { en: "He replied in the same language and asked if I spoke English.", zh: "他用同样的语言回答并问我会不会说英语。" },
      { en: "\"I do not speak a word of English,\" I said.", zh: "“我一个字英语也不会说，”我说。" },
      { en: "\"Neither do I,\" the young man said with a smile.", zh: "“我也不会，”年轻人微笑着说。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Why did you give the young man a lift in France?", translation: "你为什么在法国捎那个年轻人一程？", avatar: "👦" },
      { speaker: "Alex", text: "He was standing by the road waving to me, so I stopped.", translation: "他站在路边向我招手，于是我就停了车。", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Did you talk to each other in English?", translation: "你们用英语交谈了吗？", avatar: "👦" },
      { speaker: "Alex", text: "No! I said I didn't speak English, and he replied: 'Neither do I!'", translation: "没有！我说我不会英语，他回答说：‘我也不会！’", avatar: "👩‍🦰" }
    ]
  },
  15: {
    lessonId: 15,
    title: "Good news",
    titleZh: "佳音 / 好消息",
    topic: "Secret News",
    topicZh: "秘书与加薪好消息",
    grammar: "直接引语变间接引语 (Indirect Speech)",
    grammarDetail: "掌握当主句动词为过去时（said, told）时，从句时态相应后推一级的规则。",
    mcScene: "要塞办公室 · 局长办公桌",
    mcSceneDesc: "秘书詹姆斯小姐向大家宣布了一个令所有员工振奋的好消息：全员涨薪！",
    vocab: [
      { word: 'secretary', phonetic: '/ˈsekrətri/', meaning: '名词：秘书', mcItem: 'Book and Quill', mcItemIcon: '👩‍💼', sampleSentence: 'The secretary typed letters efficiently.', sampleTranslation: '秘书高效地打好了信件。' },
      { word: 'nervous', phonetic: '/ˈnɜːvəs/', meaning: '形容词：紧张的', mcItem: 'Soul Sand', mcItemIcon: '😰', sampleSentence: 'I felt very nervous when entering the boss\'s office.', sampleTranslation: '走进老板办公室时我感到非常紧张。' },
      { word: 'afford', phonetic: '/əˈfɔːd/', meaning: '动词：买得起；负担得起', mcItem: 'Gold Ingot', mcItemIcon: '💰', sampleSentence: 'The firm cannot afford to pay high wages.', sampleTranslation: '公司无法承担支付高额工资。' },
      { word: 'extra', phonetic: '/ˈekstrə/', meaning: '形容词：额外的；附加的', mcItem: 'Emerald Block', mcItemIcon: '➕', sampleSentence: 'He promised to give me an extra thousand pounds a year.', sampleTranslation: '他答应每年额外给我一千英镑。' }
    ],
    sentences: [
      { en: "The secretary told me that Mr. Harmsworth would see me.", zh: "秘书告诉我哈姆斯沃斯先生要见我。" },
      { en: "I felt very nervous when I went into his office.", zh: "走进他的办公室时，我感到非常紧张。" },
      { en: "He did not look up from his desk when I entered.", zh: "我进去时，他连头也没从办公桌前抬一下。" },
      { en: "\"Business is very bad,\" he told me.", zh: "“现在生意很不景气，”他告诉我。" },
      { en: "He said that the firm could not afford to pay such large salaries.", zh: "他说公司无法负担支付如此高昂的薪资。" },
      { en: "Then he smiled and said: \"I am going to give you an extra thousand a year!\"", zh: "然后他微笑着说：“我打算每年多给你一千镑！”" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Why were you so nervous when visiting the manager?", translation: "你去见经理时为什么那么紧张？", avatar: "👦" },
      { speaker: "Alex", text: "Because he started by saying business was very bad and salaries were too high!", translation: "因为他一开始就说生意惨淡、薪水太高！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Did he dismiss you?", translation: "他解雇你了吗？", avatar: "👦" },
      { speaker: "Alex", text: "No, he gave me a raise! He said he would pay me an extra thousand a year!", translation: "没有，他给我加薪了！他说每年额外多给我一千镑！", avatar: "👩‍🦰" }
    ]
  },
  16: {
    lessonId: 16,
    title: "A polite request",
    titleZh: "礼貌的要求",
    topic: "Polite Signs",
    topicZh: "警示牌与文明礼貌",
    grammar: "条件状语从句 (Type 1 Conditional: If + Present, Future)",
    grammarDetail: "掌握真实条件句：主句用一般将来时，if 从句用一般现在时（主将从现）。",
    mcScene: "主城交通枢纽 · 停车指示牌",
    mcSceneDesc: "公园门口树立了一块格外醒目的礼貌警示牌，提醒玩家文明停车。",
    vocab: [
      { word: 'park', phonetic: '/pɑːk/', meaning: '动词：停车；名词：公园', mcItem: 'Minecart', mcItemIcon: '🅿️', sampleSentence: 'If you park your car here, the sign will warn you.', sampleTranslation: '如果你把车停在这里，标志牌会提醒你。' },
      { word: 'traffic', phonetic: '/ˈtræfɪk/', meaning: '名词：交通；车辆往来', mcItem: 'Redstone Lamp', mcItemIcon: '🚦', sampleSentence: 'Heavy traffic blocked the entrance.', sampleTranslation: '繁忙的交通堵塞了入口。' },
      { word: 'ticket', phonetic: '/ˈtɪkɪt/', meaning: '名词：罚单；车票', mcItem: 'Paper', mcItemIcon: '🎫', sampleSentence: 'The traffic warden gave him a parking ticket.', sampleTranslation: '交通管理员给了他一张违章停车罚单。' },
      { word: 'polite', phonetic: '/pəˈlaɪt/', meaning: '形容词：有礼貌的；客气的', mcItem: 'Flower', mcItemIcon: '🌸', sampleSentence: 'This sign is written as a very polite request.', sampleTranslation: '这个告示牌是以一种非常有礼貌的请求形式写成的。' }
    ],
    sentences: [
      { en: "If you park your car in the wrong place, a traffic policeman will soon find it.", zh: "如果你把车停在错误的地方，交警很快就会发现它。" },
      { en: "You will be very lucky if he lets you go without a ticket.", zh: "如果他不给你开罚单就放你走，那你可真算走运了。" },
      { en: "However, this does not always happen.", zh: "然而，事情并不总是这样。" },
      { en: "Traffic police are usually polite and helpful.", zh: "交警通常都彬彬有礼且乐于助人。" },
      { en: "A polite sign in our town says: \"If you park here, we will welcome your car!\"", zh: "我们镇上一块礼貌的牌子上写着：“如果您在此停车，我们热烈欢迎您的爱车！”" }
    ],
    dialogue: [
      { speaker: "Steve", text: "What happens if you park your minecart in the wrong spot?", translation: "如果你把矿车停错地方会怎样？", avatar: "👦" },
      { speaker: "Alex", text: "If you park in the wrong place, the traffic policeman will give you a ticket!", translation: "如果你停错地方，交警就会给你开罚单！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What does the polite sign outside the garage say?", translation: "车库外面那块有礼貌的牌子上写着什么？", avatar: "👦" },
      { speaker: "Alex", text: "It says: 'If you park here, we thank you for your cooperation!'", translation: "上面写着：‘如果您在此停车，我们感谢您的配合！’", avatar: "👩‍🦰" }
    ]
  },
  17: {
    lessonId: 17,
    title: "Always young",
    titleZh: "青春常驻",
    topic: "Actors & Ages",
    topicZh: "演员与不老传奇",
    grammar: "情态动词 must, have to, can 的用法",
    grammarDetail: "掌握 must 表主观必须或肯定推测，have to 表客观需要，can 表能力或允许。",
    mcScene: "大剧院化妆间 · 聚光灯下",
    mcSceneDesc: "著名女演员詹妮弗在舞台上永远扮演 17 岁少女，台下观众无不为她的演技折服。",
    vocab: [
      { word: 'appear', phonetic: '/əˈpɪə(r)/', meaning: '动词：出现；登台演出', mcItem: 'Ender Pearl', mcItemIcon: '🌟', sampleSentence: 'She will appear as a young girl in the new play.', sampleTranslation: '她将在新剧中以少女形象登台。' },
      { word: 'stage', phonetic: '/steɪdʒ/', meaning: '名词：舞台', mcItem: 'Oak Planks', mcItemIcon: '🎭', sampleSentence: 'The actress has been on the stage for thirty-five years.', sampleTranslation: '这位女演员已经在舞台上活跃了35年。' },
      { word: 'bright', phonetic: '/braɪt/', meaning: '形容词：明亮的；鲜艳的', mcItem: 'Glowstone', mcItemIcon: '💡', sampleSentence: 'Bright lights illuminated the stage.', sampleTranslation: '明亮的灯光照亮了舞台。' },
      { word: 'stocking', phonetic: '/ˈstɒkɪŋ/', meaning: '名词：长筒袜', mcItem: 'Leather Boots', mcItemIcon: '🧦', sampleSentence: 'She must wear orange stockings in the play.', sampleTranslation: '她在剧中必须穿橙色长袜。' }
    ],
    sentences: [
      { en: "My aunt Jennifer is an actress. She must be at least thirty-five years old.", zh: "我的詹妮弗阿姨是一位女演员。她至少有35岁了。" },
      { en: "In spite of this, she often appears on the stage as a young girl.", zh: "尽管如此，她经常在舞台上以年轻姑娘的形象亮相。" },
      { en: "Jennifer will take part in a new play soon.", zh: "詹妮弗很快将参加一部新剧的演出。" },
      { en: "This time, she will be a girl of seventeen.", zh: "这一次，她将扮演一个十七岁的少女。" },
      { en: "In the play, she must appear in a bright red dress and orange stockings.", zh: "在剧中，她必须身穿鲜红色的裙子和橙色的长袜登场。" },
      { en: "As someone said recently, she is always young!", zh: "正如最近有人所说，她永远年轻！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "How old is the famous actress Jennifer?", translation: "著名女演员詹妮弗多大年纪了？", avatar: "👦" },
      { speaker: "Alex", text: "She must be at least thirty-five, but she plays the role of a girl of seventeen!", translation: "她至少三十五岁了，但她扮演一个十七岁的少女！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What must she wear in the new play?", translation: "她在新剧里必须穿什么？", avatar: "👦" },
      { speaker: "Alex", text: "She must appear in a bright red dress and orange stockings!", translation: "她必须穿一件亮红色的连衣裙和橙色长袜登台！", avatar: "👩‍🦰" }
    ]
  },
  18: {
    lessonId: 18,
    title: "He often does this!",
    titleZh: "他经常这样做！",
    topic: "Pubs & Landlords",
    topicZh: "旅店老板与遗落包裹",
    grammar: "动词的经常性与短暂性用法 (have done vs had done)",
    grammarDetail: "通过幽默小故事，掌握一般现在时表经常性习惯，与过去完成时表已完成状态的搭配。",
    mcScene: "村庄小酒馆 · 吧台角落",
    mcSceneDesc: "酒馆常客比尔每次喝完饮料都把包忘在吧台上，老板早已见怪不怪。",
    vocab: [
      { word: 'pub', phonetic: '/pʌb/', meaning: '名词：小酒馆；客栈', mcItem: 'Brewing Stand', mcItemIcon: '🍺', sampleSentence: 'The village pub is cozy and warm.', sampleTranslation: '村庄小酒馆温馨而舒适。' },
      { word: 'landlord', phonetic: '/ˈlændlɔːd/', meaning: '名词：店主；房东', mcItem: 'Villager', mcItemIcon: '🧑‍💼', sampleSentence: 'The friendly landlord gave me my forgotten bag.', sampleTranslation: '热心的店主把我遗忘的包交还给了我。' },
      { word: 'bill', phonetic: '/bɪl/', meaning: '名词：账单', mcItem: 'Paper', mcItemIcon: '🧾', sampleSentence: 'After paying the bill, he walked out.', sampleTranslation: '结完账后，他走了出去。' },
      { word: 'hurry', phonetic: '/ˈhʌri/', meaning: '动词/名词：匆忙；急忙', mcItem: 'Speed Potion', mcItemIcon: '🏃', sampleSentence: 'He was in such a hurry that he left his parcel.', sampleTranslation: '他走得太匆忙，把包裹给落下了。' }
    ],
    sentences: [
      { en: "After I had had lunch at a village pub, I looked for my bag.", zh: "在一家乡村酒馆吃完午饭后，我找寻我的包。" },
      { en: "I had left it on a chair beside the door and now it wasn't there!", zh: "我把它放在门旁的椅子上，而现在它却不在那里了！" },
      { en: "As I was looking for it, the landlord came in.", zh: "正当我寻找它时，店主走了进来。" },
      { en: "\"Did you leave a bag here?\" he asked.", zh: "“你把包落在这里了吗？”他问。" },
      { en: "\"Yes, I did,\" I answered.", zh: "“是的，我落下了，”我回答道。" },
      { en: "\"Don't worry,\" the landlord said with a laugh. \"A dog had carried it into the garden!\"", zh: "“别担心，”店主笑着说，“一只狗把它叼进花园里去了！”" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Where did you leave your bag after lunch?", translation: "吃完午饭后你把包留在哪里了？", avatar: "👦" },
      { speaker: "Alex", text: "I had left it on a chair near the door, but it was gone!", translation: "我把它留在门边的椅子上，但它不见了！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Who took your bag away?", translation: "谁把你的包拿走了？", avatar: "👦" },
      { speaker: "Alex", text: "The landlord laughed and said a dog had carried it out into the garden!", translation: "店主笑着说一只狗把它叼到了花园里！", avatar: "👩‍🦰" }
    ]
  },
  19: {
    lessonId: 19,
    title: "Sold out",
    titleZh: "票已售完",
    topic: "Box Office",
    topicZh: "售票处排队与惊喜抢票",
    grammar: "过去完成时的深入演练 (had been / had done)",
    grammarDetail: "掌握表示在过去某个时刻之前已经发生并结束的动作，如 all tickets had been sold out。",
    mcScene: "要塞售票窗口 · 绝望的长队",
    mcSceneDesc: "史蒂夫排了几个小时的长队想买戏剧门票，窗口却挂出了‘售罄’的牌子。",
    vocab: [
      { word: 'hurry', phonetic: '/ˈhʌri/', meaning: '动词：赶快；匆忙', mcItem: 'Sugar', mcItemIcon: '💨', sampleSentence: 'I hurried to the ticket office early in the morning.', sampleTranslation: '一大早我就急忙赶往售票处。' },
      { word: 'ticket', phonetic: '/ˈtɪkɪt/', meaning: '名词：门票；车票', mcItem: 'Paper', mcItemIcon: '🎟️', sampleSentence: 'Could I have two tickets for tonight please?', sampleTranslation: '请给我两张今晚的门票好吗？' },
      { word: 'pity', phonetic: '/ˈpɪti/', meaning: '名词：遗憾；可惜', mcItem: 'Tear', mcItemIcon: '😢', sampleSentence: 'What a pity that all tickets are sold out!', sampleTranslation: '所有的门票都卖光了，真是太遗憾了！' },
      { word: 'exclaim', phonetic: '/ɪkˈskleɪm/', meaning: '动词：惊呼；大叫', mcItem: 'Noteblock', mcItemIcon: '😮', sampleSentence: '"Just a minute!" a stranger exclaimed behind me.', sampleTranslation: '“请等一下！”我身后的一位陌生人惊呼道。' },
      { word: 'return', phonetic: '/rɪˈtɜːn/', meaning: '动词：归还；退回', mcItem: 'Hopper', mcItemIcon: '🔄', sampleSentence: 'He returned two tickets because he couldn\'t go.', sampleTranslation: '因为去不了，他退回了两张门票。' }
    ],
    sentences: [
      { en: "The play may begin at any moment, I said.", zh: "“演出随时可能开始，”我说。" },
      { en: "It may have begun already, Susan answered.", zh: "“可能已经开始了，”苏珊回答。" },
      { en: "I hurried to the ticket office.", zh: "我急忙赶到售票处。" },
      { en: "\"May I have two tickets please?\" I asked.", zh: "“请给我两张票好吗？”我问。" },
      { en: "\"I'm sorry, we've sold out,\" the girl said.", zh: "“很抱歉，我们的票已经售罄了，”那位姑娘说。" },
      { en: "\"What a pity!\" Susan exclaimed.", zh: "“真可惜！”苏珊惊呼道。" },
      { en: "Just then, a man hurried to the ticket office and said: \"Can I return these two tickets?\"", zh: "就在那时，一名男子匆忙赶到售票处说：“我能退这两张票吗？”" },
      { en: "\"Certainly,\" the girl said. I bought the tickets at once!", zh: "“当然可以，”姑娘说。我立刻买下了这两张票！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Did you manage to get tickets for the play, Alex?", translation: "亚历克斯，你买到话剧票了吗？", avatar: "👦" },
      { speaker: "Alex", text: "At first the girl said all tickets were sold out!", translation: "一开始那个姑娘说票已经全卖光了！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "So how did you watch the show?", translation: "那你怎么看成的演出？", avatar: "👦" },
      { speaker: "Alex", text: "Just then a man returned two tickets! I bought them immediately!", translation: "就在那时有个人来退两张票！我立刻买下了！", avatar: "👩‍🦰" }
    ]
  },
  20: {
    lessonId: 20,
    title: "One man in a boat",
    titleZh: "独木舟上的人",
    topic: "Fishing & Solitude",
    topicZh: "钓鱼垂钓与独处乐趣",
    grammar: "动名词 (Gerund: doing as Subject & Object)",
    grammarDetail: "掌握 fishing, sitting, doing 充当句子主语和宾语的用法，如 Fishing is my favourite sport。",
    mcScene: "荷塘河畔 · 独木舟垂钓",
    mcSceneDesc: "史蒂夫最喜欢的业余爱好是钓鱼，但他一条鱼也没钓到过，他只享受坐在河边的宁静。",
    vocab: [
      { word: 'catch', phonetic: '/kætʃ/', meaning: '动词：捕获；抓住 (caught, caught)', mcItem: 'Fishing Rod', mcItemIcon: '🎣', sampleSentence: 'I am not interested in catching fish.', sampleTranslation: '我对捕鱼并不感兴趣。' },
      { word: 'fisherman', phonetic: '/ˈfɪʃəmən/', meaning: '名词：渔民；钓鱼爱好者', mcItem: 'Cooked Cod', mcItemIcon: '🧑‍🌾', sampleSentence: 'Fishermen sit on the bank all day.', sampleTranslation: '钓鱼者们整天坐在河岸边。' },
      { word: 'waste', phonetic: '/weɪst/', meaning: '名词/动词：浪费', mcItem: 'Rotten Flesh', mcItemIcon: '🗑️', sampleSentence: 'Some people think fishing is a waste of time.', sampleTranslation: '有些人认为钓鱼是浪费时间。' },
      { word: 'realize', phonetic: '/ˈriːəlaɪz/', meaning: '动词：意识到；领悟', mcItem: 'Redstone Torch', mcItemIcon: '💡', sampleSentence: 'I realized that I was completely empty-handed.', sampleTranslation: '我意识到自己完全两手空空。' }
    ],
    sentences: [
      { en: "Fishing is my favourite sport.", zh: "钓鱼是我最喜爱的运动。" },
      { en: "I often fish for hours without catching anything.", zh: "我常常钓上好几个小时却一无所获。" },
      { en: "But this does not worry me.", zh: "但这丝毫不会让我烦恼。" },
      { en: "Some fishermen are unlucky. Instead of catching fish, they catch old boots and rubbish.", zh: "有些钓鱼人很不走运。他们抓不到鱼，反而捞起旧靴子和垃圾。" },
      { en: "I am even less lucky. I never catch anything -- not even old boots.", zh: "我甚至更不走运。我什么也钓不到——连旧靴子也没有。" },
      { en: "After having spent whole mornings on the river, I always go home with an empty bag.", zh: "在河边度过整个上午后，我总是空着袋子回家。" },
      { en: "\"You must give up fishing!\" my friends say. \"It's a waste of time.\"", zh: "“你必须放弃钓鱼！”我的朋友们说，“这是浪费时间。”" },
      { en: "They don't realize that I am not really interested in fishing. I am only interested in sitting in a boat and doing nothing at all!", zh: "他们不知道，我其实对钓鱼根本不感兴趣。我只喜欢坐在船上什么也不做！" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Why do you go fishing if you never catch any fish?", translation: "如果你一条鱼都钓不到，为什么还去钓鱼？", avatar: "👦" },
      { speaker: "Alex", text: "Because I love the peaceful river and sitting in a boat!", translation: "因为我喜欢宁静的河流，喜欢坐在小船上的感觉！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Don't your friends tell you that it's a waste of time?", translation: "你的朋友难道不说这是浪费时间吗？", avatar: "👦" },
      { speaker: "Alex", text: "They do! But they don't realize I just enjoy sitting and doing nothing at all!", translation: "他们确实这么说！但他们不懂我只是享受发呆什么都不做！", avatar: "👩‍🦰" }
    ]
  },
  21: {
    lessonId: 21,
    title: "Mad or not?",
    titleZh: "疯了吗？",
    topic: "Airport Noise",
    topicZh: "机场噪音与奇思妙想",
    grammar: "被动语态的复杂形式 (Passive Voice with Modal Verbs: must be done)",
    grammarDetail: "掌握情态动词的被动语态，如 can be heard, must be moved, will be built。",
    mcScene: "机场跑道旁 · 巨大轰鸣声",
    mcSceneDesc: "跑道旁的小屋每天都要承受数百架飞机起降的巨大噪音，房主却奇迹般地习惯了。",
    vocab: [
      { word: 'mad', phonetic: '/mæd/', meaning: '形容词：发疯的；疯狂的', mcItem: 'Poison Potion', mcItemIcon: '🤪', sampleSentence: 'People think he is mad to live near the airport.', sampleTranslation: '人们认为他住在机场附近是疯了。' },
      { word: 'reason', phonetic: '/ˈriːzn/', meaning: '名词：原因；理由', mcItem: 'Paper', mcItemIcon: '❓', sampleSentence: 'The reason is that planes take off day and night.', sampleTranslation: '原因在于飞机日夜不停地起飞。' },
      { word: 'noise', phonetic: '/nɔɪz/', meaning: '名词：噪音；喧闹声', mcItem: 'Bell', mcItemIcon: '🔊', sampleSentence: 'The deafening noise can be heard miles away.', sampleTranslation: '震耳欲聋的噪音在数英里外都能听见。' },
      { word: 'sum', phonetic: '/sʌm/', meaning: '名词：金额；总数', mcItem: 'Emerald Block', mcItemIcon: '💵', sampleSentence: 'He was offered a large sum of money for his house.', sampleTranslation: '有人出巨资购买他的房子。' },
      { word: 'determined', phonetic: '/dɪˈtɜːmɪnd/', meaning: '形容词：坚定的；决意的', mcItem: 'Netherite Ingot', mcItemIcon: '✊', sampleSentence: 'He is determined to stay in his old home.', sampleTranslation: '他下定决心留在他原来的家里。' }
    ],
    sentences: [
      { en: "Aeroplanes are slowly driving me mad.", zh: "飞机正慢慢地把我逼疯。" },
      { en: "I live near an airport and passing planes can be heard night and day.", zh: "我住在机场附近，日夜都能听到飞过的飞机声。" },
      { en: "The airport was built during the war, but for some reason it could not be used then.", zh: "这座机场是在战时修建的，但由于某种原因当时未能投入使用。" },
      { en: "Last year, however, it came into use.", zh: "然而去年，它开始启用了。" },
      { en: "Over a hundred people must have been driven away by the noise.", zh: "肯定有一百多人被这噪音给逼走了。" },
      { en: "I am one of the few people left.", zh: "我是仅存的几个人之一。" },
      { en: "I was offered a large sum of money to leave, but I am determined to stay here.", zh: "有人出了一大笔钱让我搬走，但我铁了心要留在这里。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Can passing aeroplanes be heard night and day?", translation: "飞过的飞机日夜都能听见吗？", avatar: "👦" },
      { speaker: "Alex", text: "Yes, the planes are slowly driving everyone mad!", translation: "是的，飞机的声音快把所有人都逼疯了！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Why haven't you moved away?", translation: "你为什么还不搬走呢？", avatar: "👦" },
      { speaker: "Alex", text: "I was offered a large sum of money, but I am determined to stay!", translation: "有人出大笔钱买我的房子，但我铁了心要留在这！", avatar: "👩‍🦰" }
    ]
  },
  22: {
    lessonId: 22,
    title: "A glass envelope",
    titleZh: "玻璃信封",
    topic: "Pigeon Post & Island Letters",
    topicZh: "漂流瓶与海岛特快信件",
    grammar: "一般过去时 vs 现在完成时 Review",
    grammarDetail: "对比经历（have ever done）与具体发生时间（did it two years ago）。",
    mcScene: "海岛灯塔 · 漂流瓶沙滩",
    mcSceneDesc: "两个小岛之间距离不远，渔民们用玻璃漂流瓶在岛屿之间互通信件。",
    vocab: [
      { word: 'envelope', phonetic: '/ˈenvələʊp/', meaning: '名词：信封', mcItem: 'Glass Bottle', mcItemIcon: '✉️', sampleSentence: 'He put the letter inside a glass envelope.', sampleTranslation: '他把信装进了一个玻璃瓶信封里。' },
      { word: 'bottle', phonetic: '/ˈbɒtl/', meaning: '名词：瓶子', mcItem: 'Glass Bottle', mcItemIcon: '🍾', sampleSentence: 'The bottle floated across the sea to the shore.', sampleTranslation: '瓶子漂过大海到达了海岸。' },
      { word: 'regularly', phonetic: '/ˈreɡjələli/', meaning: '副词：定期地；有规律地', mcItem: 'Clock', mcItemIcon: '🔄', sampleSentence: 'They send messages regularly in this way.', sampleTranslation: '他们通过这种方式定期传递消息。' },
      { word: 'island', phonetic: '/ˈaɪlənd/', meaning: '名词：岛屿', mcItem: 'Grass Block', mcItemIcon: '🏝️', sampleSentence: 'The two islands are only five miles apart.', sampleTranslation: '两座岛屿之间相距仅五英里。' }
    ],
    sentences: [
      { en: "My daughter, Jane, never dreamed of receiving a letter from a girl of her own age in Holland.", zh: "我的女儿简从未想过能收到一封来自荷兰同龄女孩的信。" },
      { en: "Last year, we were travelling across the Channel and Jane threw a bottle into the sea.", zh: "去年我们横渡英吉利海峡时，简往海里扔了一个瓶子。" },
      { en: "She contained a piece of paper with her name and address on it.", zh: "里面装有一张写有她姓名和地址的纸条。" },
      { en: "Both girls have been writing to each other regularly ever since.", zh: "从那以后，两个女孩一直定期通信。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "How did Jane find a penfriend in Holland?", translation: "简是怎么在荷兰找到笔友的？", avatar: "👦" },
      { speaker: "Alex", text: "She threw a glass bottle into the sea while crossing the Channel!", translation: "她在横渡海峡时把一个玻璃瓶扔进了大海！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Did someone find the bottle?", translation: "有人找到那个瓶子了吗？", avatar: "👦" },
      { speaker: "Alex", text: "Yes! A girl in Holland found it, and now they write regularly!", translation: "是的！荷兰的一个女孩找到了它，现在她们定期通信！", avatar: "👩‍🦰" }
    ]
  },
  23: {
    lessonId: 23,
    title: "A new house",
    titleZh: "新居 / 新房子",
    topic: "Modern Architecture",
    topicZh: "现代建筑与古老风格",
    grammar: "There be 句型与定语从句 (which / that / who)",
    grammarDetail: "掌握 There is/are 与关系代词 which/that 引导的修饰限定结构。",
    mcScene: "红石现代别墅 · 庄园落成",
    mcSceneDesc: "史蒂夫在橡木林边建造了一栋全新的现代化建筑，邻居们都来参观。",
    vocab: [
      { word: 'modern', phonetic: '/ˈmɒdn/', meaning: '形容词：现代的；新式的', mcItem: 'Quartz Block', mcItemIcon: '🏢', sampleSentence: 'I have had a new modern house built.', sampleTranslation: '我让人建起了一座全新的现代化房屋。' },
      { word: 'strange', phonetic: '/streɪndʒ/', meaning: '形容词：奇怪的；古怪的', mcItem: 'Sculk Sensor', mcItemIcon: '👽', sampleSentence: 'It looks strange to people in the village.', sampleTranslation: '在村里人看来它显得很古怪。' },
      { word: 'district', phonetic: '/ˈdɪstrɪkt/', meaning: '名词：地区；区域', mcItem: 'Map', mcItemIcon: '🗺️', sampleSentence: 'It is the most unusual house in the district.', sampleTranslation: '它是该地区最与众不同的房屋。' }
    ],
    sentences: [
      { en: "I had a new house built in the country, but it looks very strange.", zh: "我在乡下盖了一所新房子，但它看起来很奇怪。" },
      { en: "It was designed by a well-known architect.", zh: "它是由一位著名的建筑师设计的。" },
      { en: "The house is made of glass and steel.", zh: "这所房子是用玻璃和钢材建成的。" },
      { en: "Everyone in the district comes to admire it.", zh: "该地区的每个人都来参观欣赏它。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "What is your new house made of, Alex?", translation: "亚历克斯，你的新房子是用什么建造的？", avatar: "👦" },
      { speaker: "Alex", text: "It is made of glass and steel, designed by a famous architect!", translation: "它是用玻璃和钢材建造的，由著名建筑师设计！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "Do people in the district like it?", translation: "当地的人们喜欢它吗？", avatar: "👦" },
      { speaker: "Alex", text: "They think it's very modern and completely unusual in this area!", translation: "他们觉得它非常现代，在这一带独具一格！", avatar: "👩‍🦰" }
    ]
  },
  24: {
    lessonId: 24,
    title: "It could be worse",
    titleZh: "情况可能更糟",
    topic: "Optimism & Hard Luck",
    topicZh: "乐观心态与倒霉经历",
    grammar: "新概念第二册第 1 单元综合复习与考点回顾",
    grammarDetail: "综合梳理时态（一般过去、过去进行、过去完成）、语序、被动语态及情态动词。",
    mcScene: "红石要塞 · 庆功宴与第 1 单元毕业仪式",
    mcSceneDesc: "经理损失了一笔大钱，但依然微笑着说：‘情况可能更糟！’，大家共同庆祝第 1 单元学成。",
    vocab: [
      { word: 'worse', phonetic: '/wɜːs/', meaning: '形容词：更糟的；更坏的', mcItem: 'Broken Shield', mcItemIcon: '📉', sampleSentence: 'Never mind, it could be worse!', sampleTranslation: '没关系，情况可能更糟呢！' },
      { word: 'optimistic', phonetic: '/ˌɒptɪˈmɪstɪk/', meaning: '形容词：乐观的', mcItem: 'Golden Apple', mcItemIcon: '☀️', sampleSentence: 'He is always cheerful and optimistic.', sampleTranslation: '他总是开朗而乐观。' },
      { word: 'lose', phonetic: '/luːz/', meaning: '动词：失去；丢失 (lost, lost)', mcItem: 'Dropped Item', mcItemIcon: '💸', sampleSentence: 'He lost fifty pounds, but he did not complain.', sampleTranslation: '他丢了50英镑，但他没有抱怨。' },
      { word: 'cheer', phonetic: '/tʃɪə(r)/', meaning: '动词/名词：欢呼；振作', mcItem: 'Firework', mcItemIcon: '🎉', sampleSentence: 'We cheered for our graduation from Unit 1!', sampleTranslation: '我们为第1单元的顺利结业欢呼！' }
    ],
    sentences: [
      { en: "I entered the hotel manager's office and sat down.", zh: "我走进饭店经理的办公室坐了下来。" },
      { en: "I had just lost fifty pounds and I felt very upset.", zh: "我刚刚丢了50英镑，心里非常难过。" },
      { en: "\"I have lost all my money,\" I said.", zh: "“我把所有的钱都弄丢了，”我说。" },
      { en: "\"Never mind,\" the manager answered cheerfully. \"It could be worse!\"", zh: "“没关系，”经理爽朗地回答，“情况可能更糟呢！”" },
      { en: "\"How could it be worse?\" I asked.", zh: "“还能怎么更糟呢？”我问。" },
      { en: "\"You could have lost one hundred pounds!\" he said with a warm smile.", zh: "“你本来可能丢一百英镑的呀！”他带着温暖的微笑说道。" }
    ],
    dialogue: [
      { speaker: "Steve", text: "Why was the manager smiling when you told him you lost fifty pounds?", translation: "当你告诉经理你丢了50英镑时，他为什么还在微笑？", avatar: "👦" },
      { speaker: "Alex", text: "Because he is an extreme optimist!", translation: "因为他是一个极度乐观的人！", avatar: "👩‍🦰" },
      { speaker: "Steve", text: "What comforting words did he say to you?", translation: "他对你说了什么安慰的话？", avatar: "👦" },
      { speaker: "Alex", text: "He said: 'Never mind, it could be worse! You could have lost a hundred pounds!'", translation: "他说：‘没关系，情况可能更糟！你本可能丢一百镑的！’", avatar: "👩‍🦰" }
    ]
  }
};
