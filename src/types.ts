export type ApiProvider = 'deepseek' | 'gemini' | 'custom';
export type ApiRequestMode = 'direct' | 'proxy';

export interface ApiKeyConfig {
  provider: ApiProvider;
  apiKey: string;
  baseUrl?: string;
  model: string;
  requestMode?: ApiRequestMode;
}

export type CourseVolumeId = 'vol1' | 'vol2' | 'vol3';

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
  version: 'v1.6.0',
  buildCode: '2026.08.05-BUILD-PROD',
  editionName: 'Minecraft English World (新概念三册系统矩阵版)',
  releaseNotes: '新增新概念英语2册(红石工业篇)与3册(末地美文篇)系统化课程矩阵架构；升级全局版本控制与分册体系。',
  volumes: [
    {
      id: 'vol1',
      title: '新概念英语 第1册',
      subtitle: 'Minecraft 基础方块建造篇',
      mcWorldTheme: '🟩 橡木森林与生存新手村',
      badge: '1册 基础篇 (1-144关)',
      totalLessons: 144,
      unlockedLevelReq: 1,
      status: 'active',
      description: '适合 6-12 岁零基础孩子，结合 Minecraft 场景掌握 144 个基础双语词汇与高频句型。',
      targetAge: '6-12 岁 / 零基础~初级',
      features: ['144个Minecraft双语关卡', 'Alex AI基础词汇跟读', '精讲PPT与高清PDF练习册']
    },
    {
      id: 'vol2',
      title: '新概念英语 第2册',
      subtitle: 'Minecraft 红石工业与复杂句型篇',
      mcWorldTheme: '⚡ 红石机械与要塞探险',
      badge: '2册 进阶篇 (1-96关)',
      totalLessons: 96,
      unlockedLevelReq: 10,
      status: 'active',
      description: '掌握关键语法点、时态变换与红石自动化逻辑，打造复杂对话与看图叙事能力。',
      targetAge: '8-14 岁 / 进阶中级',
      features: ['96个红石剧情语法关卡', 'Alex AI长句复述与情景对话', '红石电路逻辑与句法解析']
    },
    {
      id: 'vol3',
      title: '新概念英语 第3册',
      subtitle: 'Minecraft 主题建筑与高级美文篇',
      mcWorldTheme: '🌌 末地神殿与建筑艺术典籍',
      badge: '3册 高级篇 (1-60关)',
      totalLessons: 60,
      unlockedLevelReq: 25,
      status: 'preview',
      description: '赏析长篇美文、培养高级写作词汇与辩论口语，在末地神殿中探寻文明典籍。',
      targetAge: '10-16 岁 / 雅思/小托福进阶',
      features: ['60篇长篇美文架构分析', 'Alex AI 辩论与原声配音', '自由创世作文与演讲词编写']
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

export interface UserProfile {
  id: string;
  email?: string;
  nickname: string;
  age: number;
  level: number;
  xp: number;
  emeralds: number;
  streakDays: number;
  lastActiveDate: string;
  selectedAvatar: string;
  currentLessonId: number;
  unlockedLessonIds: number[];
  completedMissionIds: string[];
  unlockedBadgeIds: string[];
  masteredWords: string[];
  apiKeyConfig: ApiKeyConfig;
  isInitialSetupDone: boolean;
  todayStudyMinutes?: number;
  totalStudyMinutes?: number;
  parentSettings?: ParentSettings;
  lastEnderChestClaimDate?: string;
  selectedVolumeId?: CourseVolumeId;
  isVip?: boolean;
  vipCodeUsed?: string;
  vipActivatedAt?: string;
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
