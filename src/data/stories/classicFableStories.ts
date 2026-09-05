import { RadioStory } from '../storyTypes';

export const CLASSIC_FABLE_STORIES: RadioStory[] = [
  {
    id: 'story_tortoise_hare',
    title: 'The Tortoise and the Hare in Block World',
    titleZh: '方块世界里的新龟兔赛跑',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Steve',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Cat (绿宝石之乐)',
      color: 'from-emerald-600 via-teal-700 to-slate-900',
      border: 'border-emerald-400',
      icon: '🐢'
    },
    summary: '骄傲飞奔的野兔揣着迅捷药水，在金黄色的热带草原上肆意嘲弄背着厚重海龟壳的乌龟。面对横跨向日葵平原、泥泞沼泽与灵魂沙滩的漫长赛道，兔子因傲慢而在大橡树荫下呼呼大睡，而沉稳踏实的乌龟凭借滴水穿石的坚毅毅力，率先冲向了终点的黑曜石胜利锦旗...',
    vocabularyLoot: [
      { word: 'boast', phonetic: '/bəʊst/', meaning: '吹嘘 / 夸口' },
      { word: 'swiftness', phonetic: '/ˈswɪftnəs/', meaning: '迅捷 / 快速' },
      { word: 'tortoise', phonetic: '/ˈtɔːtəs/', meaning: '陆龟 / 乌龟' },
      { word: 'perseverance', phonetic: '/ˌpɜːsɪˈvɪərəns/', meaning: '坚持不懈 / 毅力' },
      { word: 'obstacle', phonetic: '/ˈɒbstəkl/', meaning: '障碍 / 阻碍物' },
      { word: 'victory', phonetic: '/ˈvɪktəri/', meaning: '胜利 / 凯旋' }
    ],
    paragraphs: [
      {
        id: 'hare_p1',
        english: 'In a sunny village nestled between sunflower plains and acacia savannahs, a speedy brown Hare never stopped boasting about his speed.',
        chinese: '在一个坐落在向日葵平原与金合欢热带草原之间的晴朗村庄里，一只飞快的棕色野兔总是不停地炫耀自己的惊人速度。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p2',
        english: '"Nobody in the entire realm can outrun me!" the Hare laughed, sipping a splash of Potion of Swiftness II. "I am faster than a phantom arrow!"',
        chinese: '“整个王国里没有人能跑得过我！”兔子哈哈大笑，抿了一口二级迅捷药水，“我比幽灵箭矢还要快！”',
        speaker: 'Steve'
      },
      {
        id: 'hare_p3',
        english: 'A calm green Tortoise carrying an enchanted Turtle Shell helmet stepped slowly out of the pond and raised his head.',
        chinese: '一只沉稳的绿色乌龟戴着附魔海龟壳头盔，不紧不慢地从池塘里爬上岸，缓缓抬起了头。',
        speaker: 'Alex'
      },
      {
        id: 'hare_p4',
        english: '"I will accept your challenge to a grand race," the Tortoise said gently. "From the village well to the obsidian flag on Mt. Lookout."',
        chinese: '“我接受你的挑战，来一场公平的竞速，”乌龟温和地说道，“就从村庄水井起跑，直到瞭望山顶上的黑曜石锦旗。”',
        speaker: 'Alex'
      },
      {
        id: 'hare_p5',
        english: 'All villagers laughed and cheered! Iron Golems stood at the starting line and clanged the brass bell. Ding-dong! The race began!',
        chinese: '全村村民都在欢笑雀跃！铁傀儡守在起跑线上敲响了黄铜钟。叮咚！比赛正式开始！',
        speaker: 'Steve'
      },
      {
        id: 'hare_p6',
        english: 'The Hare zoomed forward like a bolt of lightning, kicking up clouds of dust and vanishing beyond the hill in mere seconds.',
        chinese: '野兔如离弦的闪电般呼啸冲出，卷起漫天尘土，短短几秒内就消失在山丘之后。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p7',
        english: 'The Tortoise took one steady step, then another. He swam smoothly through the wide river while the Hare ran miles ahead.',
        chinese: '乌龟迈出坚定的一步，接着又是一步。他从容游过宽阔的河流，而兔子早已甩开数英里之遥。',
        speaker: 'Alex'
      },
      {
        id: 'hare_p8',
        english: 'Near the halfway mark, the Hare looked back and saw nobody behind him. "That slowpoke won’t catch up until tomorrow!" he chuckled.',
        chinese: '快到半程时，野兔回头张望，身后空空如也。“那个慢吞吞的家伙恐怕明天也追不上我！”他自满地嗤笑道。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p9',
        english: 'Feeling full and drowsy from sweet berries, the Hare stretched out beneath a shady oak tree and fell fast asleep.',
        chinese: '吃了太多甜浆果而腹胀困倦的野兔，便在一棵茂密的橡树荫下伸了个懒腰，很快便呼呼大睡起来。',
        speaker: 'Steve'
      },
      {
        id: 'hare_p10',
        english: 'The square sun marched across the sky. The Tortoise kept walking without a single pause, never complaining about his heavy shell.',
        chinese: '方形的太阳在天穹缓缓移动。乌龟没有停歇片刻，一步一个脚印，从不抱怨身上的壳有多沉重。',
        speaker: 'Alex'
      },
      {
        id: 'hare_p11',
        english: 'He quietly passed the snoring Hare, climbed the rugged rocky slope, and touched the fluttering purple banner at the peak.',
        chinese: '他悄悄走过了鼾声如雷的野兔身旁，攀上陡峭坎坷的岩石斜坡，在山顶触碰到了迎风招展的紫色锦旗。',
        speaker: 'Alex'
      },
      {
        id: 'hare_p12',
        english: 'When the Hare woke up in panic, villagers were already throwing confetti: "Slow and steady with true perseverance wins the race!"',
        chinese: '当野兔在惊慌中醒来时，村民们已经在抛撒彩带欢呼：“持之以恒、脚踏实地才是制胜的真谛！”',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_three_pigs',
    title: 'The Three Little Pigs Build in Minecraft',
    titleZh: '三只小猪方块建房记',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Alex',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Mall (紫晶回响)',
      color: 'from-purple-600 via-indigo-800 to-slate-950',
      border: 'border-purple-400',
      icon: '🐷'
    },
    summary: '离开母猪妈妈的庇护，三只小猪各自前往荒野建造属于自己的避难所。老大贪图省事用麦秆捆堆成草棚；老二图快用轻薄的橡木板钉成木屋；唯有勤勉的老三深入矿坑开采坚硬深板岩与黑曜石。当饥肠辘辘的恶狼与潜伏的苦力怕在暴风雨夜发动猛烈突袭，坚不可摧的堡垒守护了三兄弟的平安...',
    vocabularyLoot: [
      { word: 'bale', phonetic: '/beɪl/', meaning: '大包 / 干草捆' },
      { word: 'timber', phonetic: '/ˈtɪmbə(r)/', meaning: '木材 / 原木' },
      { word: 'deepslate', phonetic: '/ˈdiːpsleɪt/', meaning: '深板岩' },
      { word: 'fortress', phonetic: '/ˈfɔːtrəs/', meaning: '堡垒 / 坚固要塞' },
      { word: 'explosion', phonetic: '/ɪkˈspləʊʒn/', meaning: '爆炸 / 爆发' },
      { word: 'indestructible', phonetic: '/ˌɪndɪˈstrʌktəbl/', meaning: '不可毁灭的 / 坚不可摧的' }
    ],
    paragraphs: [
      {
        id: 'pigs_p1',
        english: 'Once upon a time in a fertile oak forest, three little pig brothers packed their wooden shovels to build their dream homes.',
        chinese: '从前，在一片土地肥沃的橡树林里，三只小猪兄弟背起他们的木铲，准备建造属于自己的梦想家园。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p2',
        english: 'The eldest brother was impatient and loved playing tag. "I want to finish quickly so I can go chase butterflies!" he said.',
        chinese: '猪大哥性子急躁又爱玩耍。“我想早点盖完房子，好去原野上追蝴蝶！”他说道。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p3',
        english: 'He gathered yellow hay bales from the nearest wheat field and stacked them into a flimsy straw shack in less than an hour.',
        chinese: '他从附近的麦田里搬来金黄的干草捆，不到一个小时就草草堆成了一间单薄的稻草棚屋。',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p4',
        english: 'The second brother gathered oak wood. He hammered together lightweight planks and twigs, building a neat but frail wooden cabin.',
        chinese: '猪二哥收集了一些橡木木头。他用轻薄的木板和树枝钉在一起，建造了一间外表整洁但结构脆弱的小木屋。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p5',
        english: 'The third brother knew the dangers of monsters. He spent three whole days digging deep into the earth with an iron pickaxe.',
        chinese: '猪小弟深知夜晚怪物的危险。他足足花了整整三天时间，手持铁镐深入地底辛勤开采。',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p6',
        english: 'He reinforced his thick foundation with reinforced deepslate, built walls of obsidian, installed iron doors, and placed a redstone lock.',
        chinese: '他用坚硬的强化深板岩打下厚实地基，用黑曜石筑起高墙，装配了铁质大门并连上红石暗锁。',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p7',
        english: 'One stormy night, thunder roared across the dark sky. A hungry Wolf accompanied by a hissing green Creeper prowled out of the trees!',
        chinese: '一个暴风雨之夜，惊雷划破漆黑的天空。一只饥肠辘辘的凶狠野狼伴随着嘶嘶作响的绿色苦力怕，从林间悄然逼近！',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p8',
        english: 'The wolf came to the straw hut and blew a furious gust of wind charge! With a whoosh, the dry hay bales scattered into the storm!',
        chinese: '野狼来到草屋前，释放出狂暴的风弹！呼的一声，干燥的干草捆在暴风雨中被吹得漫天飞散！',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p9',
        english: 'The terrified first pig squealed and ran for his life into the second brother’s wooden house, slamming the oak door shut.',
        chinese: '惊恐万状的猪大哥尖叫着夺路狂奔，冲进了二哥的木屋，砰的一声把橡木门死死关上。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p10',
        english: 'The Creeper sneaked right up to the timber wall and hissed: "Sssssss... BOOM!" The wooden planks shattered into flying splinters!',
        chinese: '苦力怕悄悄靠近木墙，发出了致命的嘶鸣：“嘶嘶嘶……轰！”整座木屋瞬间被炸得四分五裂！',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p11',
        english: 'Both trembling brothers sprinted desperately toward the third brother’s dark obsidian castle. "Let us in! Help!" they cried.',
        chinese: '颤抖的两兄弟拼命狂奔向三弟的深色黑曜石城堡。“快放我们进去！救命啊！”他们呼救道。',
        speaker: 'Alex'
      },
      {
        id: 'pigs_p12',
        english: 'The third pig opened the heavy iron door, pulled them inside, and activated the redstone lever to lock the fortress airtight.',
        chinese: '猪小弟迅速打开沉重的铁门将哥哥们迎入屋内，拉下红石拉杆，将整座要塞严丝合缝地封闭起来。',
        speaker: 'Steve'
      },
      {
        id: 'pigs_p13',
        english: 'No matter how the wolf scratched and how many creepers exploded outside, the obsidian fortress stood completely unharmed. Hard work saves the day!',
        chinese: '任凭恶狼如何狠抓猛挠、任凭门外苦力怕如何爆炸，黑曜石城堡始终岿然不动。只有脚踏实地的辛劳，才能筑就最稳固的平安！',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_boy_cried_wolf',
    title: 'The Boy Who Cried "Creeper!"',
    titleZh: '方块村庄里喊苦力怕的牧羊少年',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Steve',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Far (晨曦号角)',
      color: 'from-amber-500 via-orange-600 to-stone-900',
      border: 'border-amber-400',
      icon: '🔔'
    },
    summary: '村庄牧羊少年 Liam 觉得看守羊群十分无聊。为了捉弄大家，他两次猛摇警钟大喊“苦力怕来啦！”，看着举着钻石剑飞奔而来的村民气喘吁吁，他笑得前仰后合。然而当真正的夜色降临，草丛中真的传来了嘶嘶的引信声时，再也没有人相信他的呼喊...',
    vocabularyLoot: [
      { word: 'shepherd', phonetic: '/ˈʃepəd/', meaning: '牧羊人 / 牧童' },
      { word: 'prank', phonetic: '/præŋk/', meaning: '恶作剧 / 捉弄' },
      { word: 'alarm', phonetic: '/əˈlɑːm/', meaning: '警报 / 警钟' },
      { word: 'deceive', phonetic: '/dɪˈsiːv/', meaning: '欺骗 / 蒙骗' },
      { word: 'trustworthy', phonetic: '/ˈtrʌstwɜːði/', meaning: '值得信赖的' },
      { word: 'consequence', phonetic: '/ˈkɒnsɪkwəns/', meaning: '后果 / 结果' }
    ],
    paragraphs: [
      {
        id: 'boy_p1',
        english: 'Liam was a young village boy tasked with guarding a fluffy flock of white and pink sheep on a gentle pasture hill.',
        chinese: 'Liam 是一个年轻的村庄男孩，负责在柔和的草坡上放牧一群毛茸茸的白色与粉色羊群。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p2',
        english: 'Shearing sheep and watching them chew grass all afternoon felt dreadfully boring to him. He wanted excitement.',
        chinese: '整整一个下午都在给羊剪毛、看着它们嚼草，这让他感到百无聊赖。他渴望找点刺激。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p3',
        english: 'He glanced down at the village square below where blacksmiths and farmers were peacefully trading emeralds.',
        chinese: '他向下望向村庄广场，铁匠和农夫们正在那里平静地用农作物交换绿宝石。',
        speaker: 'Alex'
      },
      {
        id: 'boy_p4',
        english: 'A mischievous grin spread across Liam’s face. He ran to the pasture watchtower and pounded the brass bell violently!',
        chinese: '一抹狡黠的坏笑浮现在 Liam 的脸上。他飞奔到放牧岗哨塔上，猛烈地敲响了黄铜大钟！',
        speaker: 'Steve'
      },
      {
        id: 'boy_p5',
        english: '"Help! Creeper! A giant green creeper is about to explode our sheep!" he screamed at the top of his lungs.',
        chinese: '“救命啊！苦力怕！一只巨大的绿色苦力怕要炸掉我们的羊群了！”他扯开嗓子歇斯底里地呼喊。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p6',
        english: 'Farmers dropped their hoes, the iron blacksmith grabbed his diamond sword, and the Iron Golem thundered up the grassy hill.',
        chinese: '农夫们扔下锄头，铁匠抄起钻石剑，铁傀儡也踏着轰鸣的大步飞奔冲上草坡。',
        speaker: 'Alex'
      },
      {
        id: 'boy_p7',
        english: 'When they arrived breathless, there was no monster at all. Liam rolled on the grass, holding his stomach and laughing mockingly.',
        chinese: '当大家气喘吁吁赶到时，眼前根本没有怪物的影子。Liam 正在草地上打滚，捂着肚子放声嘲笑。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p8',
        english: '"Don’t raise a false alarm, boy! Monsters are not a game!" warned the village elder sternly before they walked back down.',
        chinese: '“孩子，绝不能乱拉虚假警报！怪物可不是拿来开玩笑的！”村庄长者严厉地警告后，村民们纷纷扫兴下山。',
        speaker: 'Alex'
      },
      {
        id: 'boy_p9',
        english: 'Two days later, Liam did the exact same prank again. Once more, kind villagers rushed to help, only to be laughed at again.',
        chinese: '两天后，Liam 故技重施再次恶作剧。善良的村民们又一次匆匆赶来救援，结果换来的依然是无情的嘲弄。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p10',
        english: 'Then, at dusk on the third day, the sky turned ink-black. From behind the tall ferns, three real green Creepers crept forward, hissing dangerously!',
        chinese: '直到第三天的傍晚，天空变得如墨般漆黑。高大的蕨类植物后，三只真正的绿色苦力怕悄然潜伏逼近，发出极具威胁的嘶嘶声！',
        speaker: 'Alex'
      },
      {
        id: 'boy_p11',
        english: '"Creeper! It’s real this time! Please save my sheep!" Liam shrieked in genuine terror, ringing the bell frantically.',
        chinese: '“苦力怕！这次是真的！求求大家救救我的羊！”Liam 吓得魂飞魄散，发疯般摇晃着警钟。',
        speaker: 'Steve'
      },
      {
        id: 'boy_p12',
        english: 'Down in the village, people shook their heads: "He is lying again." Nobody came. Liam learned that once you lose trust, nobody believes a liar even when he speaks truth.',
        chinese: '山下的村民们只是摇了摇头：“他又在撒谎了。”没有一个人再上山。Liam 泪流满面，终于懂得一旦失去了诚信，哪怕你说的是真话，也再无人相信。',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_ant_grasshopper',
    title: 'The Ant and the Grasshopper’s Winter',
    titleZh: '勤劳方块蚁与寒冬蟋蟀',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Alex',
    durationApprox: '5 分钟',
    discTheme: {
      name: 'Blocks (红石丰收)',
      color: 'from-green-600 via-emerald-700 to-stone-900',
      border: 'border-green-400',
      icon: '🐜'
    },
    summary: '在阳光明媚、麦浪滚滚的盛夏，勤劳的小蚁工不知疲倦地收获小麦、烘焙面包，并在地下粮仓储备充足的干草块与木炭。而悠闲的蟋蟀却天天在向日葵上拉琴唱歌，嘲笑蚂蚁太辛苦。当刺骨的严冬风暴带来漫天冰霜与饥寒，谁才能在温馨的壁炉旁安度长冬？',
    vocabularyLoot: [
      { word: 'harvest', phonetic: '/ˈhɑːvɪst/', meaning: '丰收 / 收获' },
      { word: 'granary', phonetic: '/ˈɡrænəri/', meaning: '粮仓 / 谷仓' },
      { word: 'diligence', phonetic: '/ˈdɪlɪdʒəns/', meaning: '勤勉 / 勤奋' },
      { word: 'blizzard', phonetic: '/ˈblɪzəd/', meaning: '暴风雪' },
      { word: 'famine', phonetic: '/ˈfæmɪn/', meaning: '饥荒 / 绝粮' },
      { word: 'prepare', phonetic: '/prɪˈpeə(r)/', meaning: '准备 / 预备' }
    ],
    paragraphs: [
      {
        id: 'ant_p1',
        english: 'Throughout the golden summer days, warm sunlight danced over endless rolling fields of yellow wheat and red poppies.',
        chinese: '在整个金色的夏日里，温暖的阳光在金黄连绵的麦浪与火红的虞美人花海上轻快跳跃。',
        speaker: 'Alex'
      },
      {
        id: 'ant_p2',
        english: 'A small, hardworking Ant worked tirelessly from sunrise to sunset, harvesting wheat with an iron hoe and carrying seeds on his back.',
        chinese: '一只身材小巧却无比勤劳的蚂蚁从日出到日落不知疲倦地忙碌着，手持铁锄收割小麦，背上背满了饱满的种子。',
        speaker: 'Alex'
      },
      {
        id: 'ant_p3',
        english: 'He dug deep beneath the roots of an old oak tree, carving out a dry, warm granary lined with chest upon chest of baked potatoes and bread.',
        chinese: '他在一棵古老橡树的根部深处开凿地窖，打造了一座干燥温暖的地下粮仓，里面整齐摆满了装有烤马铃薯和香甜面包的储物箱。',
        speaker: 'Steve'
      },
      {
        id: 'ant_p4',
        english: 'Nearby on a giant sunflower petal, a merry Grasshopper sat playing his note block fiddle, chirping tunes into the summer breeze.',
        chinese: '在附近一朵高大的向日葵花瓣上，一只快乐的蟋蟀正悠然拉着他的音符盒小提琴，把欢快的旋律吹送进夏日的微风中。',
        speaker: 'Alex'
      },
      {
        id: 'ant_p5',
        english: '"Why do you work so miserably, little Ant?" the Grasshopper laughed. "The world is full of sunshine! Come dance with me!"',
        chinese: '“你何必把自己搞得这么辛苦，小蚂蚁？”蟋蟀嘲笑道，“世界充满阳光与欢笑！快来跟我一起跳舞吧！”',
        speaker: 'Steve'
      },
      {
        id: 'ant_p6',
        english: '"Winter in this biome is long and merciless," the Ant replied wiping sweat from his brow. "Without stored food and fuel, you will perish in the cold."',
        chinese: '“这片生物群系的寒冬漫长而残酷，”小蚂蚁擦了擦额头的汗珠回答道，“如果不储备粮食和燃料，你会在严寒中挨饿受冻的。”',
        speaker: 'Alex'
      },
      {
        id: 'ant_p7',
        english: 'The Grasshopper simply shrugged his wings: "Winter is months away! Live in the moment, boring little builder!"',
        chinese: '蟋蟀只是耸了耸翅膀：“冬天还早着呢！及时行乐吧，你这个无趣的小建筑工！”',
        speaker: 'Steve'
      },
      {
        id: 'ant_p8',
        english: 'Autumn swept through quickly, turning leaves to brittle amber, and soon the sky grew dark with heavy snow clouds.',
        chinese: '秋风转瞬即逝，将树叶吹落成满地枯黄的琥珀色，沉沉的雪云很快遮天蔽日。',
        speaker: 'Alex'
      },
      {
        id: 'ant_p9',
        english: 'A fierce blizzard struck! Powder snow piled four blocks high, lakes froze solid into packed ice, and every blade of grass died under frost.',
        chinese: '一场猛烈的暴风雪呼啸而至！细雪堆积了整整四个方块高，湖泊全部结成了坚固的浮冰，每一根青草都被冰霜吞没。',
        speaker: 'Steve'
      },
      {
        id: 'ant_p10',
        english: 'Shivering, starving, and unable to find a single grain in the deep freeze, the Grasshopper weakly limped to the Ant’s doorway.',
        chinese: '浑身颤抖、饥肠辘辘且在极寒雪地里找不到哪怕一粒粮食的蟋蟀，虚弱地一瘸一拐挪到了小蚂蚁的门前。',
        speaker: 'Alex'
      },
      {
        id: 'ant_p11',
        english: 'Inside, a stone fireplace crackled with glowing charcoal, and the scent of fresh honey cookies warmed the cozy room.',
        chinese: '屋内，石砌壁炉里的木炭噼啪作响，新鲜出炉的蜂蜜饼干香气让整个温馨的房间暖意融融。',
        speaker: 'Steve'
      },
      {
        id: 'ant_p12',
        english: 'The kind Ant shared a hot bowl of mushroom stew and said: "Today I feed you, but remember: he who prepares diligently in summer never fears the winter freeze."',
        chinese: '善良的蚂蚁盛出一碗热气腾腾的蘑菇煲递给它，轻声说道：“今天我愿意接济你，但请永远记住：唯有在夏日未雨绸缪勤勉耕耘，冬日才无需惧怕风霜。”',
        speaker: 'Alex'
      }
    ]
  },
  {
    id: 'story_lion_mouse',
    title: 'The Jungle Lion and the Clever Mouse',
    titleZh: '丛林守卫狮与灵巧小鼠',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Steve',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Chirp (丛林回音)',
      color: 'from-amber-600 via-yellow-700 to-stone-900',
      border: 'border-yellow-400',
      icon: '🦁'
    },
    summary: '高傲威严的丛林狮王在密林古树下打盹，不慎被一只觅食的小方块鼠惊醒。狮王本欲一掌将其拍下，却因小鼠“哪怕再弱小也终有一日能报答恩情”的真诚恳求而心软放行。数周后，狮王误踩捕兽者的红石绊线活塞重牢，身陷坚韧藤蔓捕网，昔日微不足道的小伙伴成了唯一的希望...',
    vocabularyLoot: [
      { word: 'majestic', phonetic: '/məˈdʒestɪk/', meaning: '威严的 / 雄伟的' },
      { word: 'slumber', phonetic: '/ˈslʌmbə(r)/', meaning: '睡眠 / 沉睡' },
      { word: 'plead', phonetic: '/pliːd/', meaning: '恳求 / 哀求' },
      { word: 'compassion', phonetic: '/kəmˈpæʃn/', meaning: '同情 / 怜悯' },
      { word: 'tripwire', phonetic: '/ˈtrɪpwaɪə(r)/', meaning: '绊线 / 陷阱机关' },
      { word: 'gratitude', phonetic: '/ˈɡrætɪtjuːd/', meaning: '感恩 / 感谢' }
    ],
    paragraphs: [
      {
        id: 'lion_p1',
        english: 'Deep in a lush tropical jungle filled with hanging cocoa beans and dense bamboo groves, a majestic Lion took his afternoon nap.',
        chinese: '在挂满可可豆、翠竹丛生的繁茂热带雨林深处，一头威风凛凛的雄狮正在享受他的午后小憩。',
        speaker: 'Steve'
      },
      {
        id: 'lion_p2',
        english: 'A tiny, playful brown Field Mouse was darting between melon blocks, searching for scattered pumpkin seeds.',
        chinese: '一只活泼小巧的棕色田鼠正在西瓜方块间敏捷穿梭，寻找着散落在地上的南瓜种子。',
        speaker: 'Alex'
      },
      {
        id: 'lion_p3',
        english: 'Not paying attention, the little mouse scurried right over the sleeping Lion’s giant golden paws and across his bushy mane!',
        chinese: '一个不留神，小田鼠竟直接从沉睡狮王巨大的金色爪子上蹿了过去，踩过他浓密的棕色鬃毛！',
        speaker: 'Steve'
      },
      {
        id: 'lion_p4',
        english: 'With an earth-shaking roar, the Lion woke up and slammed his heavy paw down, pinning the trembling mouse to the mossy ground.',
        chinese: '伴随着一声震颤丛林的怒吼，狮王猛然惊醒，巨爪重重拍下，将瑟瑟发抖的小老鼠按在长满苔藓的地面上。',
        speaker: 'Steve'
      },
      {
        id: 'lion_p5',
        english: '"Please forgive me, Great King of the Jungle!" the tiny mouse squeaked desperately. "If you spare my life, I promise I will repay your kindness one day!"',
        chinese: '“丛林之王，求求您饶了我吧！”小田鼠拼命求饶道，“只要您放我一命，我保证有朝一日一定会报答您的恩情！”',
        speaker: 'Alex'
      },
      {
        id: 'lion_p6',
        english: 'The Lion laughed thunderously: "You? A creature smaller than a single apple slice repay the king of beasts? What a hilarious joke!"',
        chinese: '狮王仰天大笑如雷：“你？一个甚至比不上一块苹果片大的小不点，想报答百兽之王？真是天大的笑话！”',
        speaker: 'Steve'
      },
      {
        id: 'lion_p7',
        english: 'Yet moved by the creature’s brave sincerity, the Lion lifted his paw and let the tiny mouse scamper safely into the ferns.',
        chinese: '然而被小动物那份勇敢与真诚所打动，狮王微微动了恻隐之心，抬起巨爪，任由小老鼠一溜烟钻进蕨类丛中。',
        speaker: 'Alex'
      },
      {
        id: 'lion_p8',
        english: 'A few weeks later, hunters from a nearby fortress set up a clever redstone trap using tripwire hooks and sticky pistons.',
        chinese: '几周之后，来自附近要塞的猎人利用绊线钩和粘性活塞，在丛林要道上布下了一道精密的红石陷阱。',
        speaker: 'Steve'
      },
      {
        id: 'lion_p9',
        english: 'While hunting at night, the Lion tripped the string! Heavy net ropes wrapped tightly around his limbs, pulling him into the air.',
        chinese: '夜晚捕猎时，狮王不慎绊动了细绳！粗重的捕兽绳网瞬间将他的四肢死死缠绕，将他高高吊挂在半空之中。',
        speaker: 'Alex'
      },
      {
        id: 'lion_p10',
        english: 'The Lion roared in agony and frustration, but the thick jungle vine cords only tightened further around his golden neck.',
        chinese: '狮王痛苦焦躁地狂吼挣扎，但坚韧的热带藤蔓绳索却越勒越紧，让他动弹不得。',
        speaker: 'Steve'
      },
      {
        id: 'lion_p11',
        english: 'Hearing the familiar roar, the little mouse rushed to the scene and immediately began gnawing at the master knot with razor-sharp teeth.',
        chinese: '听到了那声熟悉的哀吼，小老鼠立刻飞奔赶赴现场，用它如剃刀般锋利的门牙奋力啃咬主绳结。',
        speaker: 'Alex'
      },
      {
        id: 'lion_p12',
        english: 'Snap! The thick vine broke! The mighty Lion fell safely to the grass, humbled and grateful. No act of kindness, however small, is ever wasted.',
        chinese: '崩！坚固的藤网应声断裂！威严的狮王安然跌落回草地，既感动又敬佩。不论多么微小的善良，也永远不会被辜负。',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_north_wind_sun',
    title: 'The Frost Wind and the Radiant Sun',
    titleZh: '冰霜风暴与温暖阳光的较量',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Alex',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Mellohi (金阳晨辉)',
      color: 'from-sky-500 via-amber-500 to-slate-900',
      border: 'border-sky-400',
      icon: '☀️'
    },
    summary: '来自极北冰川的寒霜之风吹着刺骨的冻雨，向天空中的金色太阳炫耀自己无上的威力。他们约定以地上行走的一位穿着厚重皮革皮草大衣的旅行者为目标，看谁能先让他脱下外衣。狂暴的暴雪咆哮换来的只是旅行者更紧的包裹；而温煦和煦的阳光，却在无声之中温暖了人间...',
    vocabularyLoot: [
      { word: 'gale', phonetic: '/ɡeɪl/', meaning: '大风 / 强风' },
      { word: 'radiant', phonetic: '/ˈreɪdiənt/', meaning: '容光焕发的 / 灿烂的' },
      { word: 'dispute', phonetic: '/dɪˈspjuːt/', meaning: '争端 / 争辩' },
      { word: 'cloak', phonetic: '/kləʊk/', meaning: '斗篷 / 披风' },
      { word: 'gentleness', phonetic: '/ˈdʒentlnəs/', meaning: '温和 / 柔和' },
      { word: 'persuasion', phonetic: '/pəˈsweɪʒn/', meaning: '说服 / 劝导' }
    ],
    paragraphs: [
      {
        id: 'sun_p1',
        english: 'High up in the square sky above towering snowy peaks, a fierce icy North Wind was arguing loudly with the golden Sun.',
        chinese: '在高耸巍峨的雪山上方巍然的方形天际，一阵狂暴刺骨的极北寒风正在与金色的太阳激烈争吵。',
        speaker: 'Alex'
      },
      {
        id: 'sun_p2',
        english: '"I am the most powerful force in all dimensions!" howled the North Wind. "I can uproot giant oak trees and freeze deep oceans in seconds!"',
        chinese: '“我才是所有维度里最强大的力量！”北风咆哮道，“我能连根拔起千年橡树，瞬息之间将万丈大洋冰封三尺！”',
        speaker: 'Steve'
      },
      {
        id: 'sun_p3',
        english: 'The radiant golden Sun smiled serenely: "True strength is not measured by destructive fury, but by gentle warmth."',
        chinese: '璀璨温暖的金阳平静微笑：“真正的强大绝非用毁灭的暴怒来衡量，而是看那润物细无声的温和。”',
        speaker: 'Alex'
      },
      {
        id: 'sun_p4',
        english: 'Looking down along a stone mountain trail, they spotted an explorer traveling on foot, wrapped in a thick leather fur coat.',
        chinese: '俯瞰着蜿蜒在崇山峻岭间的石砌小道，他们注意到一位徒步探险的旅行者，身上紧紧裹着一件厚重温暖的皮革皮草大衣。',
        speaker: 'Steve'
      },
      {
        id: 'sun_p5',
        english: '"Let us make a contest!" proposed the North Wind. "Whichever of us can force that traveler to take off his coat shall be crowned champion."',
        chinese: '“让我们比试一场吧！”北风提议道，“谁若能让那位旅行者脱下身上的厚重大衣，谁就是当之无愧的霸主。”',
        speaker: 'Steve'
      },
      {
        id: 'sun_p6',
        english: 'The Sun nodded and stepped behind a soft white cloud. The North Wind took a deep breath and unleashed a howling blizzard!',
        chinese: '太阳点头应允，悄然退到一朵洁白轻柔的云朵身后。北风深吸一口气，瞬间掀起了狂暴呼啸的风雪！',
        speaker: 'Alex'
      },
      {
        id: 'sun_p7',
        english: 'Freezing gale winds tore through the trees, hurling powder snow and ice shards directly into the traveler’s face.',
        chinese: '刺骨的飓风在林木间肆虐穿梭，将漫天飞雪与锐利冰晶狂暴地砸向旅行者的脸颊。',
        speaker: 'Steve'
      },
      {
        id: 'sun_p8',
        english: 'Yet the harder the wind blew, the more tightly the shivering man clutched his coat, pulling his hood down and buttoning every clasp.',
        chinese: '然而风刮得越猛烈，瑟瑟发抖的男人就把大衣裹得越紧，拉低风帽，扣紧了身上的每一个扣子。',
        speaker: 'Alex'
      },
      {
        id: 'sun_p9',
        english: 'Exhausted and out of breath, the North Wind finally stopped. It was the Sun’s turn.',
        chinese: '精疲力竭、上气不接下气的北风终于吹不动了。现在轮到太阳出场了。',
        speaker: 'Steve'
      },
      {
        id: 'sun_p10',
        english: 'The Sun stepped out gracefully, bathing the mountain meadow in soothing, brilliant golden rays. The snow melted, and birds began to chirp.',
        chinese: '太阳从容步出云层，将明媚温暖的万丈金光洒向山间草甸。积雪悄然消融，群鸟重又欢快啼鸣。',
        speaker: 'Alex'
      },
      {
        id: 'sun_p11',
        english: 'Feeling delightful warmth, the traveler unbuttoned his collar, wiped his brow, joyfully took off his heavy coat, and continued under the blue sky. Gentleness and patience succeed where brute force always fails.',
        chinese: '感受到了宜人的暖意，旅行者解开领口，擦拭额头的细汗，开心地脱下厚重的大衣拎在手上，在蔚蓝晴空下欢快前行。温和与从容能够办到的事，蛮横与暴力往往适得其反。',
        speaker: 'Steve'
      }
    ]
  },
  {
    id: 'story_crow_pitcher',
    title: 'The Thirsty Crow and the Stone Cauldron',
    titleZh: '聪明的方块黑乌鸦与深石大锅',
    category: 'classic_fables',
    categoryName: '🏰 经典寓言新编',
    narrator: 'Steve',
    durationApprox: '4 分钟',
    discTheme: {
      name: 'Ward (回响绿意)',
      color: 'from-emerald-700 via-stone-800 to-black',
      border: 'border-emerald-500',
      icon: '🦅'
    },
    summary: '烈日炙烤下的恶地红色黏土荒原中，一只飞越万里的黑乌鸦口干舌燥。在废弃的炼药女巫棚屋前，他终于发现了一只装着纯净清泉的铁铸大锅。然而水位极低，乌鸦的喙无法触及水面。在无法撞倒沉重大锅的绝境下，这只智慧的小鸟拾起一块块坚硬的鹅卵石，演绎了用智慧化解困境的千古佳话...',
    vocabularyLoot: [
      { word: 'parched', phonetic: '/pɑːtʃt/', meaning: '干涸的 / 口渴难耐的' },
      { word: 'cauldron', phonetic: '/ˈkɔːldrən/', meaning: '大锅 / 炼药铁锅' },
      { word: 'ingenuity', phonetic: '/ˌɪndʒəˈnjuːəti/', meaning: '独创性 / 聪明才智' },
      { word: 'pebble', phonetic: '/ˈpebl/', meaning: '鹅卵石 / 小石子' },
      { word: 'gradually', phonetic: '/ˈɡrædʒuəli/', meaning: '逐渐地 / 逐步地' },
      { word: 'triumph', phonetic: '/ˈtraɪʌmf/', meaning: '巨大成功 / 胜利' }
    ],
    paragraphs: [
      {
        id: 'crow_p1',
        english: 'Under the burning heat of the Badlands mesa, red clay canyons radiated intense warmth into the dry afternoon air.',
        chinese: '在恶地台地的烈日炙烤下，红土峡谷将滚烫的热浪蒸腾入干燥窒息的午后空气中。',
        speaker: 'Steve'
      },
      {
        id: 'crow_p2',
        english: 'A clever black Crow had flown for miles without seeing a single lake or fresh water spring. His throat was parched.',
        chinese: '一只机敏的黑乌鸦已经飞行了数英里，沿途未曾见到任何湖泊或清泉。他的喉咙干渴得快要冒火。',
        speaker: 'Steve'
      },
      {
        id: 'crow_p3',
        english: 'Just as his wings were growing weak, he spotted an old abandoned witch hut made of spruce logs tucked beneath a rocky bluff.',
        chinese: '就在双翼渐感疲惫沉重之际，他敏锐地发现在岩石峭壁下方，掩映着一间由云杉原木搭建的荒废女巫小屋。',
        speaker: 'Alex'
      },
      {
        id: 'crow_p4',
        english: 'Perched on the wooden porch sat a heavy iron brewing cauldron containing clear, cool water at the very bottom.',
        chinese: '在木质门廊上，静静端放着一只沉重的炼药铁锅，最底部积存着半碗清凉甘洌的泉水。',
        speaker: 'Steve'
      },
      {
        id: 'crow_p5',
        english: 'The Crow eagerly stretched his neck over the rim, but his black beak was too short to reach the liquid surface.',
        chinese: '乌鸦急切地从锅口探下脖子，然而他的乌黑长喙太短，根本够不着水面。',
        speaker: 'Alex'
      },
      {
        id: 'crow_p6',
        english: 'He tried pushing the cauldron with his chest, but the heavy iron forged from seven solid ingots would not budge an inch.',
        chinese: '他试图用胸膛撞翻大锅，但这口由七块坚硬铁锭锻造而成的重锅沉重如山，纹丝不动。',
        speaker: 'Steve'
      },
      {
        id: 'crow_p7',
        english: 'Giving up was not an option. The thirsty Crow looked around and noticed a pile of small gray cobblestone pebbles near the path.',
        chinese: '放弃绝不是勇敢者的选择。干渴的乌鸦环顾四周，敏锐地注意到了小径旁堆放的一撮灰色鹅卵石子。',
        speaker: 'Alex'
      },
      {
        id: 'crow_p8',
        english: 'An idea flashed in his mind! He flew down, picked up a smooth pebble in his beak, carried it back, and dropped it into the pot: Plop!',
        chinese: '灵光乍现！他轻盈俯冲而下，用喙衔起一颗圆润的鹅卵石飞回锅边，咚的一声投了进去！',
        speaker: 'Steve'
      },
      {
        id: 'crow_p9',
        english: 'He picked up a second stone, a third, and a tenth. One by one, the stones settled at the bottom, displacing the water upward.',
        chinese: '接着是第二颗、第三颗、第十颗。石子一颗接一颗沉入锅底，将清澈的泉水逐步顶托上升。',
        speaker: 'Alex'
      },
      {
        id: 'crow_p10',
        english: 'Slowly but surely, the crystal water rose higher and higher until it reached the very brim of the iron cauldron!',
        chinese: '虽然缓慢却坚定不移，晶莹的泉水一寸一寸抬高，直至漫到了铁锅的最顶边缘！',
        speaker: 'Steve'
      },
      {
        id: 'crow_p11',
        english: 'The crow drank deeply and quenched his thirst in total triumph. Where muscle fails, patience and ingenuity will always conquer.',
        chinese: '乌鸦畅快地俯身痛饮，在凯旋的喜悦中尽情解渴。当蛮力无能为力之时，耐心与智慧永远是化解困境的最强之剑。',
        speaker: 'Alex'
      }
    ]
  }
];
