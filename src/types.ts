export type ApiProvider = 'deepseek' | 'gemini' | 'custom';
export type ApiRequestMode = 'direct' | 'proxy';

export interface ApiKeyConfig {
  provider: ApiProvider;
  apiKey: string;
  baseUrl?: string;
  model: string;
  requestMode?: ApiRequestMode;
}

export type CourseVolumeId = 'vol1' | 'vol2' | 'vol3' | 'vol4';

export interface CourseVolumeConfig {
  id: CourseVolumeId;
  title: string;
  subtitle: string;
  mcWorldTheme: string;
  badge: string;
  totalLessons: number;
  unlockedLevelReq: number;
  status: 'active' | 'preview' | 'coming_soon';
  description: string;
  targetAge: string;
  features: string[];
}

export const APP_VERSION_INFO = {
  version: 'v2.0.0',
  buildCode: '2026.08.13-BUILD-PROD',
  editionName: 'Minecraft English World (新概念第1册 + 第2册 100% 官方全量版)',
  releaseNotes: '《新概念英语》第1册（1~144关）与第2册（1~96关）共 240 篇权威原版课文已 100% 全量真实上线！覆盖基础句型与红石复杂语法，第3、4册处于教研打磨中。',
  volumes: [
    {
      id: 'vol1',
      title: '新概念英语 第1册',
      subtitle: 'Minecraft 基础方块建造篇',
      mcWorldTheme: '🟩 橡木森林与生存新手村',
      badge: '1册 官方正式版 (1-144关)',
      totalLessons: 144,
      unlockedLevelReq: 1,
      status: 'active',
      description: '适合 6-12 岁零基础孩子，100% 真实新概念课文与双语例句，结合 Minecraft 场景掌握 144 个基础双语词汇与高频句型。',
      targetAge: '6-12 岁 / 零基础~初级',
      features: ['144个100%真实新概念关卡', 'Alex AI真人级跟读纠音', '配套全套精讲与练习']
    },
    {
      id: 'vol2',
      title: '新概念英语 第2册',
      subtitle: 'Minecraft 红石工业与复杂句型篇',
      mcWorldTheme: '⚡ 红石机械与要塞探险',
      badge: '2册 官方正式版 (1-96关 全量原版)',
      totalLessons: 96,
      unlockedLevelReq: 1,
      status: 'active',
      description: '【全书 96 关 100% 真实原版上线】掌握时态演练、双宾语、间接引语、条件从句与红石逻辑，包含《A private conversation》、《The dead return》等 96 篇经典原版课文。',
      targetAge: '8-14 岁 / 进阶中级',
      features: ['96个100%真实红石剧情关卡', 'Alex AI长句复述与情景对话', '精细语法考点与实战例句']
    },
    {
      id: 'vol3',
      title: '新概念英语 第3册',
      subtitle: 'Minecraft 主题建筑与高级美文篇',
      mcWorldTheme: '🌌 末地神殿与建筑艺术典籍',
      badge: '3册 敬请期待 (锁定中)',
      totalLessons: 60,
      unlockedLevelReq: 999,
      status: 'coming_soon',
      description: '【敬请期待 · 教研精磨中】赏析长篇美文、培养高级写作词汇与辩论口语，即将上线。',
      targetAge: '10-16 岁 / 雅思/小托福进阶',
      features: ['60篇长篇美文架构分析', 'Alex AI 辩论与原声配音', '敬请期待上线']
    },
    {
      id: 'vol4',
      title: '新概念英语 第4册',
      subtitle: 'Minecraft 末地龙巢与流利英语篇',
      mcWorldTheme: '🐉 末地龙巢与终界风暴',
      badge: '4册 敬请期待 (锁定中)',
      totalLessons: 48,
      unlockedLevelReq: 999,
      status: 'coming_soon',
      description: '【敬请期待 · 教研精磨中】挑战顶级名篇与哲学美文，同 Alex 探讨深层科技与思辨，即将上线。',
      targetAge: '12-18 岁 / 高级流利',
      features: ['48篇世界名篇思想碰撞', 'Alex AI 辩论与深度思辨', '敬请期待上线']
    }
  ] as CourseVolumeConfig[]
};

export interface ParentSettings {
  parentPin?: string;
  dailyTimeLimitMinutes: number; // e.g. 45
  continuousTimeLimitMinutes: number; // e.g. 20
  eyeProtectionEnabled: boolean;
  speechRate: number; // e.g. 0.9
  correctionStrictness: 'gentle' | 'standard' | 'strict';
  customRewardTitle?: string;
}

export interface VolumeProgress {
  currentLessonId: number;
  unlockedLessonIds: number[];
  completedLessonIds: number[];
}

export interface UserProfile {
  id: string;
  account?: string;
  email?: string;
  nickname: string;
  age: number;
  level: number;
  xp: number;
  emeralds: number;
  streakDays: number;
  lastActiveDate: string;
  selectedAvatar: string;
  customAvatarUrl?: string;
  learningGoal?: number;
  todayMinutes?: number;
  vocabulary?: any[];
  completedMissions?: any[];
  unlockedCraftingIds?: string[];
  enderChestCount?: number;
  eyeCareEnabled?: boolean;
  eyeCareMinutes?: number;
  currentLessonId: number;
  unlockedLessonIds: number[];
  completedLessonIds?: number[];
  volumeProgress?: Partial<Record<CourseVolumeId, VolumeProgress>>;
  completedMissionIds: string[];
  readyToClaimMissionIds?: string[];
  unlockedBadgeIds: string[];
  masteredWords: string[];
  apiKeyConfig: ApiKeyConfig;
  isInitialSetupDone: boolean;
  todayStudyMinutes?: number;
  totalStudyMinutes?: number;
  parentSettings?: ParentSettings;
  isVip?: boolean;
  vipActivatedAt?: number;
  activatedVolumes?: CourseVolumeId[];
  lastEnderChestClaimDate?: string;
  selectedVolumeId?: CourseVolumeId;
  createdAt?: number;
  updatedAt?: number;
}

export interface VocabItem {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  category?: string;
  mcItem?: string;
  mcItemIcon?: string;
  sampleSentence: string;
  sampleTranslation: string;
  requiredLessonId?: number;
}

export interface DialogueTurn {
  speaker: string;
  text: string;
  translation: string;
  avatar?: string;
}

export interface Lesson {
  id: number;
  unit: number;
  title: string;
  titleZh: string;
  topic: string;
  topicZh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minecraftScene: string;
  sceneDescription: string;
  vocabulary: VocabItem[];
  targetSentences: string[];
  targetSentenceTranslations: string[];
  dialogueScript: DialogueTurn[];
  grammarNote: string;
}

export interface Mission {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  mcChallenge: string;
  englishChallenge: string;
  xpReward: number;
  emeraldReward: number;
  category: 'daily' | 'adventure' | 'challenge';
  requiredLessonId?: number;
  isCompleted?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'alex' | 'system';
  text: string;
  translation?: string;
  grammarCorrection?: string;
  betterExpression?: string;
  encouragement?: string;
  timestamp: number;
  audioPlaying?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  iconName: string;
  category: 'level' | 'lesson' | 'vocab' | 'streak' | 'mission';
  requiredValue: number;
  isUnlocked?: boolean;
  unlockedAt?: string;
}
