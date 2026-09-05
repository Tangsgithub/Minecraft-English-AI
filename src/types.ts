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
  editionName: 'Minecraft English World (新概念第1册 100% 官方全量版)',
  releaseNotes: '《新概念英语》第1册（1~144关）共 144 篇权威原版课文已 100% 全量真实上线！结合 Minecraft 像素世界观沉浸式掌握基础词汇与高频句型。',
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
  dailyTimeGoalMinutes?: number; // e.g. 15
  dailyWordsGoal?: number; // e.g. 5
  dailyDialogueGoal?: number; // e.g. 2
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
  avatar?: string;
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
  oralEvaluationCount?: number;
  apiKeyConfig: ApiKeyConfig;
  isInitialSetupDone: boolean;
  todayStudyMinutes?: number;
  totalStudyMinutes?: number;
  totalStudyDays?: number;
  activeDates?: string[];
  dailyMissionsDate?: string;
  todayCompletedLessonsCount?: number;
  todayMasteredWordsCount?: number;
  todayAlexChatDone?: boolean;
  todayCheckedIn?: boolean;
  completedDailyMissionIds?: string[];
  parentSettings?: ParentSettings;
  isVip?: boolean;
  vipActivatedAt?: number;
  activatedVolumes?: CourseVolumeId[];
  isAdmin?: boolean;
  role?: string;
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

export interface LessonTeachingMaterial {
  videoType?: 'bilibili' | 'youtube' | 'mp4' | 'custom';
  videoUrl?: string;
  videoTitle?: string;
  pptType?: 'office_online' | 'pdf' | 'custom_link';
  pptUrl?: string;
  pptTitle?: string;
  teacherNote?: string;
  updatedAt?: number;
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
  teachingMaterial?: LessonTeachingMaterial;
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
