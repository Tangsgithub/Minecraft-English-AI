import { Badge, Mission, UserProfile } from '../types';

export interface LevelTier {
  level: number;
  title: string;
  titleEn: string;
  minXp: number;
  icon: string;
  borderClass: string;
  bgClass: string;
}

export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  let accumulated = 0;
  let req = 80;
  for (let l = 1; l < level; l++) {
    accumulated += req;
    req = Math.floor(80 + ((l + 1) * 15));
  }
  return accumulated;
}

export const LEVEL_TIERS: LevelTier[] = [
  { level: 1, title: '草方块新人', titleEn: 'Dirt Block Novice', minXp: getXpForLevel(1), icon: '🟩', borderClass: 'border-amber-700', bgClass: 'bg-amber-950/40' },
  { level: 5, title: '橡木建筑师', titleEn: 'Oak Wood Builder', minXp: getXpForLevel(5), icon: '🪵', borderClass: 'border-amber-600', bgClass: 'bg-amber-900/40' },
  { level: 10, title: '石器时代开拓者', titleEn: 'Stone Age Explorer', minXp: getXpForLevel(10), icon: '🪨', borderClass: 'border-slate-500', bgClass: 'bg-slate-800/40' },
  { level: 15, title: '铜矿冶炼师', titleEn: 'Copper Smelter', minXp: getXpForLevel(15), icon: '🪙', borderClass: 'border-amber-700', bgClass: 'bg-orange-950/40' },
  { level: 20, title: '铁甲守护骑士', titleEn: 'Iron Armored Knight', minXp: getXpForLevel(20), icon: '🛡️', borderClass: 'border-slate-300', bgClass: 'bg-slate-700/40' },
  { level: 25, title: '金辉宫殿建造者', titleEn: 'Golden Architect', minXp: getXpForLevel(25), icon: '🏺', borderClass: 'border-yellow-500', bgClass: 'bg-yellow-950/40' },
  { level: 30, title: '钻石领主学者', titleEn: 'Diamond Lord', minXp: getXpForLevel(30), icon: '💎', borderClass: 'border-cyan-400', bgClass: 'bg-cyan-950/40' },
  { level: 40, title: '下界远征战神', titleEn: 'Nether Vanguard', minXp: getXpForLevel(40), icon: '🔥', borderClass: 'border-rose-500', bgClass: 'bg-rose-950/40' },
  { level: 50, title: '附魔大导师', titleEn: 'Enchantment Archmage', minXp: getXpForLevel(50), icon: '🔮', borderClass: 'border-purple-400', bgClass: 'bg-purple-950/40' },
  { level: 65, title: '末影龙征服者', titleEn: 'Ender Dragon Slayer', minXp: getXpForLevel(65), icon: '🐉', borderClass: 'border-[#FFD700]', bgClass: 'bg-amber-500/20' },
  { level: 80, title: '潜声守卫克星', titleEn: 'Warden Destroyer', minXp: getXpForLevel(80), icon: '⚡', borderClass: 'border-teal-400', bgClass: 'bg-teal-950/40' },
  { level: 100, title: '宇宙创世神宗师', titleEn: 'Minecraft Mythic Creator', minXp: getXpForLevel(100), icon: '👑', borderClass: 'border-[#FFD700]', bgClass: 'bg-[#FF6321]/30' }
];

/**
 * Calculates user level dynamically based on cumulative XP.
 * Prevents level mismatch when XP surges!
 */
export function getLevelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  let lvl = 1;
  let req = 80;
  let accumulated = 0;

  while (accumulated + req <= xp) {
    accumulated += req;
    lvl++;
    // Increasing threshold as level gets higher
    req = Math.floor(80 + (lvl * 15));
  }
  return lvl;
}

export function getXpProgressForCurrentLevel(xp: number, level: number): { currentLevelMinXp: number; nextLevelMinXp: number; progressPercent: number } {
  let lvl = 1;
  let req = 80;
  let accumulated = 0;

  while (lvl < level) {
    accumulated += req;
    lvl++;
    req = Math.floor(80 + (lvl * 15));
  }

  const currentLevelMinXp = accumulated;
  const nextLevelMinXp = accumulated + req;
  const progressInLevel = Math.max(0, xp - currentLevelMinXp);
  const span = Math.max(1, nextLevelMinXp - currentLevelMinXp);
  const progressPercent = Math.min(100, Math.round((progressInLevel / span) * 100));

  return { currentLevelMinXp, nextLevelMinXp, progressPercent };
}

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge_first_words',
    title: '村庄第一声问候',
    titleZh: '村庄第一声问候',
    description: '成功与 Alex 老师完成第 1 次 AI 英语互动对话',
    iconName: '💬',
    category: 'lesson',
    requiredValue: 1,
    isUnlocked: true,
    unlockedAt: '2026-08-01'
  },
  {
    id: 'badge_mc_builder',
    title: '单词合成师',
    titleZh: '单词合成师',
    description: '掌握 10 个 Minecraft 世界专属英语词汇',
    iconName: '🛠️',
    category: 'vocab',
    requiredValue: 10,
    isUnlocked: false
  },
  {
    id: 'badge_oral_scholar',
    title: '跟读测评小能手',
    titleZh: '跟读测评小能手',
    description: '完成 5 次标准口语发音跟读录音测评',
    iconName: '🎙️',
    category: 'mission',
    requiredValue: 5,
    isUnlocked: false
  },
  {
    id: 'badge_level_10',
    title: '石器时代开拓者',
    titleZh: '石器时代开拓者',
    description: '等级提升达到 Level 10 (石器时代)',
    iconName: '🪨',
    category: 'level',
    requiredValue: 10,
    isUnlocked: false
  },
  {
    id: 'badge_diamond_speaker',
    title: '钻石发音富豪',
    titleZh: '钻石发音富豪',
    description: '积累获得 100 颗绿宝石奖励',
    iconName: '❇️',
    category: 'mission',
    requiredValue: 100,
    isUnlocked: false
  },
  {
    id: 'badge_streak_7',
    title: '七日连胜探险家',
    titleZh: '七日连胜探险家',
    description: '连续 7 天登录学习 Minecraft 英语课程',
    iconName: '🔥',
    category: 'streak',
    requiredValue: 7,
    isUnlocked: false
  },
  {
    id: 'badge_level_25',
    title: '金辉建筑师',
    titleZh: '金辉建筑师',
    description: '等级提升达到 Level 25 (金辉宫殿)',
    iconName: '🏺',
    category: 'level',
    requiredValue: 25,
    isUnlocked: false
  },
  {
    id: 'badge_master_50',
    title: '附魔大导师',
    titleZh: '附魔大导师',
    description: '等级提升达到 Level 50 并掌握 30 个核心单词',
    iconName: '🔮',
    category: 'level',
    requiredValue: 50,
    isUnlocked: false
  },
  {
    id: 'badge_dragon_slayer',
    title: '末影龙探险宗师',
    titleZh: '末影龙探险宗师',
    description: '通关所有 24 课核心英语探险地图课程',
    iconName: '🐉',
    category: 'lesson',
    requiredValue: 24,
    isUnlocked: false
  },
  {
    id: 'badge_mythic_100',
    title: '宇宙创世神',
    titleZh: '宇宙创世神',
    description: '达到最高荣誉 Level 100 创世神阶梯',
    iconName: '👑',
    category: 'level',
    requiredValue: 100,
    isUnlocked: false
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  // --- 每日必做 (Daily) ---
  {
    id: 'daily_001',
    title: '每日晨光探险',
    titleZh: '每日晨光探险',
    description: '今日登录并进行英语学习，保持连续探索热情！',
    mcChallenge: 'Log in and explore today',
    englishChallenge: 'Start today\'s English adventure with Alex',
    xpReward: 25,
    emeraldReward: 8,
    category: 'daily',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'daily_002',
    title: '每日关卡攻坚',
    titleZh: '每日关卡攻坚',
    description: '在地图中通关至少 1 节新概念英语关卡（完成听读、拼句与场景打卡）。',
    mcChallenge: 'Clear 1 Lesson on Map',
    englishChallenge: 'Complete listening, crafting & oral check-in',
    xpReward: 35,
    emeraldReward: 12,
    category: 'daily',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'daily_003',
    title: '每日词汇采掘',
    titleZh: '每日词汇采掘',
    description: '在词汇宝典中掌握或复习至少 3 个核心单词。',
    mcChallenge: 'Master 3 Minecraft Vocab Words',
    englishChallenge: 'Listen and master 3 authentic words',
    xpReward: 25,
    emeraldReward: 10,
    category: 'daily',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'daily_004',
    title: '问候 Alex 老师',
    titleZh: '问候 Alex 老师',
    description: '在 1V1 对话中对 Alex 使用英语道声“Excuse me!”、“Good morning!”或进行语音对话。',
    mcChallenge: 'Greet Alex NPC in Chat',
    englishChallenge: 'Say: "Excuse me! Are you a teacher?" or "Hello!"',
    xpReward: 30,
    emeraldReward: 10,
    category: 'daily',
    requiredLessonId: 1,
    isCompleted: false
  },

  // --- 关卡探险 (Adventure) ---
  {
    id: 'mission_001',
    title: '搭建你的第一个木屋',
    titleZh: '搭建你的第一个木屋',
    description: '通关 Lesson 1《Excuse me!》，掌握礼貌问候与认领核心表达。',
    mcChallenge: 'Clear Lesson 1: Build a Wooden House',
    englishChallenge: 'Master: "Excuse me! Is this your...?"',
    xpReward: 30,
    emeraldReward: 10,
    category: 'adventure',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'mission_002',
    title: '找回丢失的铁剑与文具',
    titleZh: '找回丢失的铁剑与文具',
    description: '通关 Lesson 2《Is this your...?》，学会使用形容词性物主代词确认物品归属。',
    mcChallenge: 'Clear Lesson 2: Claim Items',
    englishChallenge: 'Master: "Is this your handbag / pen / book?"',
    xpReward: 35,
    emeraldReward: 12,
    category: 'adventure',
    requiredLessonId: 2,
    isCompleted: false
  },
  {
    id: 'mission_003',
    title: '寄存处的羊毛外套与长袍',
    titleZh: '寄存处的羊毛外套与长袍',
    description: '通关 Lesson 3《Sorry, sir.》，学习寄存处号码牌领物与礼貌道歉句型。',
    mcChallenge: 'Clear Lesson 3: Coatroom Claim',
    englishChallenge: 'Master: "Here is your umbrella and your coat."',
    xpReward: 40,
    emeraldReward: 15,
    category: 'adventure',
    requiredLessonId: 3,
    isCompleted: false
  },
  {
    id: 'adv_004',
    title: '认识村庄新伙伴',
    titleZh: '认识村庄新伙伴',
    description: '通关 Lesson 5《Nice to meet you.》，掌握介绍他人与国籍地道表达。',
    mcChallenge: 'Clear Lesson 5: Meet New Friends',
    englishChallenge: 'Say: "This is Miss Sophie Dupont. Nice to meet you."',
    xpReward: 40,
    emeraldReward: 15,
    category: 'adventure',
    requiredLessonId: 5,
    isCompleted: false
  },
  {
    id: 'adv_005',
    title: '村民职业大考察',
    titleZh: '村民职业大考察',
    description: '通关 Lesson 7《Are you a teacher?》，掌握 a/an 冠词与各种职业询问表达。',
    mcChallenge: 'Clear Lesson 7: Inspect Villager Jobs',
    englishChallenge: 'Ask: "Are you a teacher? No, I am an engineer."',
    xpReward: 45,
    emeraldReward: 16,
    category: 'adventure',
    requiredLessonId: 7,
    isCompleted: false
  },
  {
    id: 'adv_006',
    title: '橡木平原初级学者 (完成 5 关)',
    titleZh: '橡木平原初级学者',
    description: '在地图中累计完成 5 个新概念英语关卡，扎实打好基础语法。',
    mcChallenge: 'Clear Any 5 Map Lessons',
    englishChallenge: 'Complete 5 Core Lessons & Quests',
    xpReward: 60,
    emeraldReward: 20,
    category: 'adventure',
    requiredLessonId: 5,
    isCompleted: false
  },
  {
    id: 'adv_007',
    title: '第一单元大满贯 (完成 10 关)',
    titleZh: '第一单元大满贯',
    description: '通关前 10 课免费试学全量内容，迈入进阶英语探险世界！',
    mcChallenge: 'Clear 10 Lessons & Unlock Full Chapter',
    englishChallenge: 'Master 10 Lessons Foundation',
    xpReward: 90,
    emeraldReward: 30,
    category: 'adventure',
    requiredLessonId: 10,
    isCompleted: false
  },
  {
    id: 'mission_004',
    title: '在村庄集市交易',
    titleZh: '在村庄集市交易',
    description: '通关 Lesson 17《How much is the bread?》，用英文询问物品价格与以物易物。',
    mcChallenge: 'Clear Lesson 17: Trade with Villagers',
    englishChallenge: 'Ask: "How much is the bread? It is one emerald."',
    xpReward: 45,
    emeraldReward: 18,
    category: 'adventure',
    requiredLessonId: 17,
    isCompleted: false
  },
  {
    id: 'adv_009',
    title: '沙漠神殿远征学者 (完成 20 关)',
    titleZh: '沙漠神殿远征学者',
    description: '在地图中累计通关 20 个关卡，解锁更多高阶生物群系！',
    mcChallenge: 'Clear 20 Map Lessons',
    englishChallenge: 'Expand Vocabulary & Sentence Skills',
    xpReward: 120,
    emeraldReward: 40,
    category: 'adventure',
    requiredLessonId: 20,
    isCompleted: false
  },
  {
    id: 'adv_010',
    title: '下界要塞征服者 (完成 50 关)',
    titleZh: '下界要塞征服者',
    description: '累计通关 50 个关卡，攻克复杂时态与长难句。',
    mcChallenge: 'Clear 50 Lessons Master Milestone',
    englishChallenge: 'Conquer Past Tense & Complex Structures',
    xpReward: 200,
    emeraldReward: 60,
    category: 'adventure',
    requiredLessonId: 50,
    isCompleted: false
  },
  {
    id: 'adv_011',
    title: '第 1 册全通关大宗师 (完成 144 关)',
    titleZh: '第 1 册全通关大宗师',
    description: '通关新概念英语第 1 册全部 144 关，荣登英语创世神殿！',
    mcChallenge: '100% Clear Book 1 (144 Lessons)',
    englishChallenge: 'Achieve Complete Fluency in Book 1',
    xpReward: 500,
    emeraldReward: 150,
    category: 'adventure',
    requiredLessonId: 144,
    isCompleted: false
  },

  // --- 传奇挑战 (Challenge) ---
  {
    id: 'chal_001',
    title: '单词开采小能手',
    titleZh: '单词开采小能手',
    description: '在词汇宝典中累计掌握 5 个 Minecraft 核心英语生词。',
    mcChallenge: 'Master 5 Core Vocabulary Words',
    englishChallenge: 'Click and mark 5 words as Mastered',
    xpReward: 30,
    emeraldReward: 10,
    category: 'challenge',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'chal_002',
    title: '词汇黄金大矿工',
    titleZh: '词汇黄金大矿工',
    description: '在词汇宝典中累计掌握 20 个 Minecraft 核心英语生词。',
    mcChallenge: 'Master 20 Vocabulary Words',
    englishChallenge: 'Expand vocabulary into daily conversation',
    xpReward: 60,
    emeraldReward: 25,
    category: 'challenge',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'chal_003',
    title: '钻石词汇百科全书',
    titleZh: '钻石词汇百科全书',
    description: '累计掌握 50 个核心单词，成为行走的 Minecraft 双语词典！',
    mcChallenge: 'Master 50 Core Vocabulary Words',
    englishChallenge: 'Build a giant vocabulary repertoire',
    xpReward: 120,
    emeraldReward: 50,
    category: 'challenge',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'chal_004',
    title: '方块拼句语法大师',
    titleZh: '方块拼句语法大师',
    description: '在课程合成台或合成实验室中成功拼装出正确的语法句子。',
    mcChallenge: 'Craft 3 Sentences in Crafting Table',
    englishChallenge: 'Master subject-verb-object block order',
    xpReward: 40,
    emeraldReward: 15,
    category: 'challenge',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'chal_005',
    title: '生活场景口语达人',
    titleZh: '生活场景口语达人',
    description: '在课程的 3 大生活场景迁移中完成至少 3 次口语跟读打卡。',
    mcChallenge: 'Complete 3 Real-World Oral Check-ins',
    englishChallenge: 'Practice speaking in real-life contexts',
    xpReward: 50,
    emeraldReward: 20,
    category: 'challenge',
    requiredLessonId: 1,
    isCompleted: false
  }
];

/**
 * Evaluates all missions against user progress and returns the list of mission IDs that are fulfilled
 * and ready to be claimed.
 */
export function evaluateMissionsForProfile(profile: Partial<UserProfile>): string[] {
  const completedLessonIds = profile.completedLessonIds || [];
  const completedCount = completedLessonIds.length;
  const masteredWordsCount = (profile.masteredWords || []).length;
  const unlockedCraftingCount = (profile.unlockedCraftingIds || []).length;
  const alreadyClaimed = new Set(profile.completedMissionIds || []);
  const readyIds: string[] = [];

  INITIAL_MISSIONS.forEach(mission => {
    if (alreadyClaimed.has(mission.id)) return;

    let isMet = false;
    switch (mission.id) {
      // Dailies
      case 'daily_001':
        // Must have completed at least 5 minutes of study or completed 1 lesson today
        isMet = (profile.todayStudyMinutes || 0) >= 5 || completedCount >= 1;
        break;
      case 'daily_002':
        // Must have completed at least 1 lesson
        isMet = completedCount >= 1;
        break;
      case 'daily_003':
        // Must have genuinely mastered at least 3 vocabulary words
        isMet = masteredWordsCount >= 3;
        break;
      case 'daily_004':
        // Only ready if specifically triggered via Alex conversation
        isMet = false;
        break;

      // Adventures (Must strictly complete the exact lesson)
      case 'mission_001':
        isMet = completedLessonIds.includes(1);
        break;
      case 'mission_002':
        isMet = completedLessonIds.includes(2);
        break;
      case 'mission_003':
        isMet = completedLessonIds.includes(3);
        break;
      case 'adv_004':
        isMet = completedLessonIds.includes(5);
        break;
      case 'adv_005':
        isMet = completedLessonIds.includes(7);
        break;
      case 'adv_006':
        isMet = completedCount >= 5;
        break;
      case 'adv_007':
        isMet = completedCount >= 10;
        break;
      case 'mission_004':
        isMet = completedLessonIds.includes(17);
        break;
      case 'adv_009':
        isMet = completedCount >= 20;
        break;
      case 'adv_010':
        isMet = completedCount >= 50;
        break;
      case 'adv_011':
        isMet = completedCount >= 144;
        break;

      // Challenges (Strictly require real vocabulary & crafting milestones)
      case 'chal_001':
        isMet = masteredWordsCount >= 5;
        break;
      case 'chal_002':
        isMet = masteredWordsCount >= 20;
        break;
      case 'chal_003':
        isMet = masteredWordsCount >= 50;
        break;
      case 'chal_004':
        isMet = unlockedCraftingCount >= 1;
        break;
      case 'chal_005':
        isMet = completedCount >= 3;
        break;
      default:
        if (mission.requiredLessonId && completedLessonIds.includes(mission.requiredLessonId)) {
          isMet = true;
        }
        break;
    }

    if (isMet) {
      readyIds.push(mission.id);
    }
  });

  return readyIds;
}

/**
 * Calculates current numeric progress for a mission to display in progress bars.
 */
export function getMissionProgress(mission: Mission, profile: Partial<UserProfile>): { current: number; target: number; percent: number; isReady: boolean } {
  const completedLessonIds = profile.completedLessonIds || [];
  const completedCount = completedLessonIds.length;
  const masteredWordsCount = (profile.masteredWords || []).length;
  const alreadyClaimed = (profile.completedMissionIds || []).includes(mission.id);
  const readyList = (profile.readyToClaimMissionIds || []);
  const isReady = readyList.includes(mission.id);

  let current = 0;
  let target = 1;

  switch (mission.id) {
    case 'daily_001':
      target = 1;
      current = ((profile.todayStudyMinutes || 0) >= 5 || completedCount >= 1) ? 1 : 0;
      break;
    case 'daily_002':
      target = 1;
      current = completedCount >= 1 ? 1 : 0;
      break;
    case 'daily_003':
      target = 3;
      current = Math.min(3, masteredWordsCount);
      break;
    case 'daily_004':
      target = 1;
      current = (isReady || alreadyClaimed) ? 1 : 0;
      break;
    case 'mission_001':
      target = 1;
      current = completedLessonIds.includes(1) ? 1 : 0;
      break;
    case 'mission_002':
      target = 1;
      current = completedLessonIds.includes(2) ? 1 : 0;
      break;
    case 'mission_003':
      target = 1;
      current = completedLessonIds.includes(3) ? 1 : 0;
      break;
    case 'adv_004':
      target = 1;
      current = completedLessonIds.includes(5) ? 1 : 0;
      break;
    case 'adv_005':
      target = 1;
      current = completedLessonIds.includes(7) ? 1 : 0;
      break;
    case 'adv_006':
      target = 5;
      current = Math.min(5, completedCount);
      break;
    case 'adv_007':
      target = 10;
      current = Math.min(10, completedCount);
      break;
    case 'mission_004':
      target = 1;
      current = completedLessonIds.includes(17) ? 1 : 0;
      break;
    case 'adv_009':
      target = 20;
      current = Math.min(20, completedCount);
      break;
    case 'adv_010':
      target = 50;
      current = Math.min(50, completedCount);
      break;
    case 'adv_011':
      target = 144;
      current = Math.min(144, completedCount);
      break;
    case 'chal_001':
      target = 5;
      current = Math.min(5, masteredWordsCount);
      break;
    case 'chal_002':
      target = 20;
      current = Math.min(20, masteredWordsCount);
      break;
    case 'chal_003':
      target = 50;
      current = Math.min(50, masteredWordsCount);
      break;
    case 'chal_004':
      target = 1;
      current = (profile.unlockedCraftingIds || []).length >= 1 ? 1 : 0;
      break;
    case 'chal_005':
      target = 3;
      current = Math.min(3, completedCount);
      break;
    default:
      target = 1;
      current = (mission.requiredLessonId && completedLessonIds.includes(mission.requiredLessonId)) ? 1 : 0;
      break;
  }

  const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : (current >= 1 ? 100 : 0);
  return { current, target, percent, isReady: isReady || percent >= 100 };
}

export function getTierForLevel(level: number): LevelTier {
  let currentTier = LEVEL_TIERS[0];
  for (const tier of LEVEL_TIERS) {
    if (level >= tier.level) {
      currentTier = tier;
    }
  }
  return currentTier;
}
