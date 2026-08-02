import { Badge, Mission } from '../types';

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
  {
    id: 'mission_001',
    title: '搭建你的第一个木屋',
    titleZh: '搭建你的第一个木屋',
    description: '在村庄里选定一片场地，用英文向 Alex 介绍你的小屋。',
    mcChallenge: 'Build a Wooden House',
    englishChallenge: 'Say: "This is my house. It has a wooden door."',
    xpReward: 30,
    emeraldReward: 10,
    category: 'adventure',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'mission_002',
    title: '问候 Alex 老师',
    titleZh: '问候 Alex 老师',
    description: '在对话中对 Alex 使用英语道声“Excuse me!”或“Good morning!”',
    mcChallenge: 'Greet Alex NPC',
    englishChallenge: 'Say: "Excuse me! Are you a teacher?"',
    xpReward: 20,
    emeraldReward: 5,
    category: 'daily',
    requiredLessonId: 1,
    isCompleted: false
  },
  {
    id: 'mission_003',
    title: '下矿寻找钻石矿脉',
    titleZh: '下矿寻找钻石矿脉',
    description: '学习挖矿词汇（mine, diamond, pickaxe），并向 Alex 发送一个问句。',
    mcChallenge: 'Explore Diamond Cave',
    englishChallenge: 'Ask: "Where can I find diamonds?"',
    xpReward: 40,
    emeraldReward: 15,
    category: 'challenge',
    requiredLessonId: 3,
    isCompleted: false
  },
  {
    id: 'mission_004',
    title: '在村庄集市交易',
    titleZh: '在村庄集市交易',
    description: '用英文询问物品价格或询问村民的职业。',
    mcChallenge: 'Trade with Villagers',
    englishChallenge: 'Ask: "How much is the bread? It is one emerald."',
    xpReward: 35,
    emeraldReward: 12,
    category: 'adventure',
    requiredLessonId: 17,
    isCompleted: false
  }
];

export function getTierForLevel(level: number): LevelTier {
  let currentTier = LEVEL_TIERS[0];
  for (const tier of LEVEL_TIERS) {
    if (level >= tier.level) {
      currentTier = tier;
    }
  }
  return currentTier;
}
