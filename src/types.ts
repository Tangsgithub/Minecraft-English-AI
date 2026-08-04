export type ApiProvider = 'deepseek' | 'gemini' | 'custom';
export type ApiRequestMode = 'direct' | 'proxy';

export interface ApiKeyConfig {
  provider: ApiProvider;
  apiKey: string;
  baseUrl?: string;
  model: string;
  requestMode?: ApiRequestMode;
}

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
