import React, { useState, useMemo } from 'react';
import { MINECRAFT_VOCABULARY } from '../data/minecraftVocabData';
import { LESSONS_DATA, getLessonById } from '../data/lessonsData';
import { getFullBook1VocabList } from '../data/book1VocabManager';
import { NCE_WORD_CRAFTING_RECIPES } from '../data/craftingRecipesData';
import { VocabItem, UserProfile, CourseVolumeId } from '../types';
import { Volume2, Search, CheckCircle, Sparkles, BookOpen, Layers, Play, Award, RotateCcw, HelpCircle, CheckCircle2, XCircle, Lock, Unlock, Filter, ArrowRight, Crown, MapPin, Hammer } from 'lucide-react';
import { playClickSound, playEmeraldSound, speakText, playLevelUpSound } from '../utils/audio';
import { OralEvaluationModal } from './OralEvaluationModal';
import { getVolumeProgress, hasLessonAccess, isLessonPaywallLocked, isVolumeFullyUnlocked } from '../utils/volumeProgress';
import confetti from 'canvas-confetti';

interface MinecraftVocabViewProps {
  profile: UserProfile;
  onToggleMasterWord: (word: string) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
  onOpenVipModal?: () => void;
  onNavigateToLesson?: (lessonId: number) => void;
  onNavigateToCrafting?: () => void;
}

export const MinecraftVocabView: React.FC<MinecraftVocabViewProps> = ({
  profile,
  onToggleMasterWord,
  onAwardEmeralds,
  onOpenVipModal,
  onNavigateToLesson,
  onNavigateToCrafting
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'quiz' | 'ebbinghaus'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [oralTarget, setOralTarget] = useState<VocabItem | null>(null);

  // Ebbinghaus Review State
  const [ebbinghausIndex, setEbbinghausIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [ebbinghausCompletedCount, setEbbinghausCompletedCount] = useState<number>(0);

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Progress Unlock Filters
  const [unlockFilter, setUnlockFilter] = useState<'all' | 'unlocked' | 'locked'>('unlocked');
  const [lessonRangeFilter, setLessonRangeFilter] = useState<string>('all');
  const [selectedSpecificLesson, setSelectedSpecificLesson] = useState<number | null>(null);
  const [reviewScope, setReviewScope] = useState<'all_unlocked' | 'latest_lesson' | 'hard_only' | 'range_trial'>('all_unlocked');

  // Determine user's volume progress and highest unlocked lesson
  const currentVolId: CourseVolumeId = profile.selectedVolumeId || 'vol1';
  const volumeProgress = getVolumeProgress(profile, currentVolId);
  const unlockedLessonSet = new Set(volumeProgress.unlockedLessonIds);
  const completedLessonSet = new Set(volumeProgress.completedLessonIds);
  const maxUnlockedLesson = Math.max(...volumeProgress.unlockedLessonIds, volumeProgress.currentLessonId || 1, 1);

  // Case-insensitive Mastered Words Set for 100% accurate status matching
  const masteredSet = new Set((profile.masteredWords || []).map(w => w.toLowerCase()));

  // 1. Extract vocabulary for Book 1 (Volume 1 contains full 900+ words across 144 lessons)
  const combinedList: VocabItem[] = getFullBook1VocabList();

  // Helper to check if item is Minecraft specific
  const mcIds = new Set(MINECRAFT_VOCABULARY.map(m => m.id));
  const isMcVocabItem = (item: VocabItem) => item.id.startsWith('mc_') || item.category === 'Minecraft' || mcIds.has(item.id);

  // Check whether a word is currently unlocked based on learning progress and VIP authorization
  const isWordUnlocked = (item: VocabItem): boolean => {
    const reqLesson = item.requiredLessonId || 1;
    const isAccessibleViaPaywall = hasLessonAccess(profile, currentVolId, reqLesson);
    const isReachedOnMap =
      unlockedLessonSet.has(reqLesson) ||
      completedLessonSet.has(reqLesson) ||
      reqLesson <= maxUnlockedLesson;
    return isAccessibleViaPaywall && isReachedOnMap;
  };

  const isWordPaywallLocked = (item: VocabItem): boolean => {
    const reqLesson = item.requiredLessonId || 1;
    return isLessonPaywallLocked(profile, currentVolId, reqLesson);
  };

  // Calculate unlock statistics
  const unlockedVocabList = combinedList.filter(item => isWordUnlocked(item));
  
  // Total mastered in whole library and within unlocked list
  const totalMasteredInLibrary = combinedList.filter(item => masteredSet.has(item.word.toLowerCase())).length;
  const masteredUnlockedCount = unlockedVocabList.filter(item => masteredSet.has(item.word.toLowerCase())).length;

  // 构词配方索引表（用于双向关联配方实验室）
  const craftableWordsMap = useMemo(() => {
    const map = new Map<string, typeof NCE_WORD_CRAFTING_RECIPES[0]>();
    NCE_WORD_CRAFTING_RECIPES.forEach(r => {
      map.set(r.nameEn.toLowerCase(), r);
    });
    return map;
  }, []);

  const categories = [
    { id: 'all', label: '全部种类', icon: '📚' },
    { id: 'Crafting', label: `构词合成 (${NCE_WORD_CRAFTING_RECIPES.length})`, icon: '🔨' },
    { id: 'Minecraft', label: 'Minecraft 方块/道具', icon: '🟩' },
    { id: 'Course', label: '新概念核心课文词', icon: '📖' }
  ];

  // Filtering Logic based on Search, Category, Unlock Status, Lesson Range & Specific Lesson
  const filteredVocab = combinedList.filter(item => {
    const isMc = isMcVocabItem(item);
    const isUnlocked = isWordUnlocked(item);
    const reqLesson = item.requiredLessonId || 1;
    const isCraftable = craftableWordsMap.has(item.word.toLowerCase());

    // Specific Lesson Filter (e.g. user chose Lesson 10)
    if (selectedSpecificLesson !== null && reqLesson !== selectedSpecificLesson) {
      return false;
    }

    // Lesson Range Filter
    if (lessonRangeFilter === 'current' && reqLesson > maxUnlockedLesson) return false;
    if (lessonRangeFilter === '1-20' && (reqLesson < 1 || reqLesson > 20)) return false;
    if (lessonRangeFilter === '21-50' && (reqLesson < 21 || reqLesson > 50)) return false;
    if (lessonRangeFilter === '51-100' && (reqLesson < 51 || reqLesson > 100)) return false;
    if (lessonRangeFilter === '101-144' && (reqLesson < 101 || reqLesson > 144)) return false;

    // Unlock Status Filter
    if (unlockFilter === 'unlocked' && !isUnlocked) return false;
    if (unlockFilter === 'locked' && isUnlocked) return false;

    // Category Filter
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'Crafting' && isCraftable) ||
      (activeCategory === 'Minecraft' && isMc) ||
      (activeCategory === 'Course' && !isMc);

    // Search Query Filter
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery) ||
      item.sampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Helper to retrieve lesson title for exact provenance display
  const getLessonTitle = (lessonId?: number): string => {
    if (!lessonId) return '';
    const l = getLessonById(lessonId, currentVolId);
    return l?.titleZh || l?.title || `Lesson ${lessonId}`;
  };

  // Interactive Review/Quiz pool MUST strictly use unlocked words so student isn't tested on unlearned content!
  // Filter further according to user's chosen reviewScope
  let reviewPoolCandidates = unlockedVocabList;
  if (reviewScope === 'latest_lesson') {
    const latestItems = unlockedVocabList.filter(v => (v.requiredLessonId || 1) === maxUnlockedLesson);
    if (latestItems.length > 0) reviewPoolCandidates = latestItems;
  } else if (reviewScope === 'hard_only') {
    const hardItems = unlockedVocabList.filter(v => !masteredSet.has(v.word.toLowerCase()));
    if (hardItems.length > 0) reviewPoolCandidates = hardItems;
  } else if (reviewScope === 'range_trial') {
    const trialItems = unlockedVocabList.filter(v => (v.requiredLessonId || 1) <= 20);
    if (trialItems.length > 0) reviewPoolCandidates = trialItems;
  }

  const reviewPool = reviewPoolCandidates.length > 0 ? reviewPoolCandidates : (unlockedVocabList.length > 0 ? unlockedVocabList : combinedList.slice(0, 5));

  // Current Quiz Question item
  const currentQuizItem = reviewPool[quizIndex % Math.max(1, reviewPool.length)];

  // Generate 4 options for quiz from unlocked words (strict progress-bound candidates)
  const getQuizOptions = (correctItem: VocabItem) => {
    if (!correctItem) return [];
    const unlockedOthers = unlockedVocabList.filter(v => v.word.toLowerCase() !== correctItem.word.toLowerCase());
    const fallbackOthers = combinedList.filter(v => v.word.toLowerCase() !== correctItem.word.toLowerCase());
    const candidateList = unlockedOthers.length >= 3 ? unlockedOthers : fallbackOthers;

    const shuffledOthers = [...candidateList];
    for (let i = shuffledOthers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOthers[i], shuffledOthers[j]] = [shuffledOthers[j], shuffledOthers[i]];
    }
    const options = [correctItem, ...shuffledOthers.slice(0, 3)];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const [currentOptions, setCurrentOptions] = useState<VocabItem[]>(() => getQuizOptions(currentQuizItem));

  // Keep options synced if scope or quizItem changes
  React.useEffect(() => {
    if (currentQuizItem) {
      setCurrentOptions(getQuizOptions(currentQuizItem));
    }
  }, [currentQuizItem?.word, reviewScope]);

  const handleNextQuizQuestion = () => {
    const nextIdx = (quizIndex + 1) % reviewPool.length;
    setQuizIndex(nextIdx);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setCurrentOptions(getQuizOptions(reviewPool[nextIdx]));
  };

  const handleSelectQuizOption = (option: VocabItem) => {
    if (selectedAnswer !== null) return; // Prevent double click
    setSelectedAnswer(option.word);

    if (option.word.toLowerCase() === currentQuizItem.word.toLowerCase()) {
      setIsAnswerCorrect(true);
      playEmeraldSound();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      setQuizScore(prev => prev + 1);
      if (onAwardEmeralds) onAwardEmeralds(3, 10);
    } else {
      setIsAnswerCorrect(false);
      playClickSound();
    }
  };

  // Phonics Audio slow breakdown helper
  const handlePhonicsAudioBreakdown = (word: string) => {
    speakText(word.split('').join(' . '));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Mode Switcher */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-[#FFD700] border-2 border-black rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">
              📦
            </div>
            <div>
              <h2 className="text-lg font-black font-mono text-[#2D2D2D] flex items-center gap-2">
                <span>Minecraft & 新概念英语智能词库</span>
                <span className="text-xs bg-[#7CFC00] text-emerald-950 font-mono font-bold px-2 py-0.5 rounded-md border border-black">
                  按学习进度开放
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-mono font-bold">
                当前学习进度：<span className="text-[#487E2C] font-black">第 {maxUnlockedLesson} 课</span> • 已解封词汇 <span className="text-[#FF6321] font-black">{unlockedVocabList.length}</span> / {combinedList.length} 词 • 累积已掌握 <span className="text-[#487E2C] font-black">{totalMasteredInLibrary}</span> 词
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('grid');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black border-2 transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#2A4718]'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📚 词汇宝典
            </button>

            <button
              onClick={() => {
                playClickSound();
                setViewMode('ebbinghaus');
                setIsCardFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black border-2 transition-all ${
                viewMode === 'ebbinghaus'
                  ? 'bg-purple-600 border-black text-white shadow-[0_3px_0_0_#4c1d95]'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🧠 艾宾浩斯抗遗忘复习
            </button>

            <button
              onClick={() => {
                playClickSound();
                setViewMode('quiz');
                if (currentOptions.length === 0 && currentQuizItem) {
                  setCurrentOptions(getQuizOptions(currentQuizItem));
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black border-2 transition-all ${
                viewMode === 'quiz'
                  ? 'bg-[#FF6321] border-black text-white shadow-[0_3px_0_0_#993300]'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🎴 闪卡听音挑战 (+3 ❇️)
            </button>
          </div>
        </div>

        {/* Visual Progress Bar for Unlock Status */}
        <div className="bg-slate-100 p-3 rounded-2xl border-2 border-slate-200 space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Unlock className="w-4 h-4 text-[#487E2C]" />
              <span>词库随探险关卡开放度（第 1 ~ {maxUnlockedLesson} 关）:</span>
            </span>
            <span className="text-[#487E2C] font-black">
              {Math.round((unlockedVocabList.length / Math.max(1, combinedList.length)) * 100)}% ({unlockedVocabList.length}/{combinedList.length} 词)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-[#7CFC00] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, Math.round((unlockedVocabList.length / combinedList.length) * 100)))}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between font-bold">
            <span>🎮 通关更多地图关卡或激活完整课程，即可解锁更多新概念 & MC 联动词汇</span>
            <span>已掌握率: {unlockedVocabList.length > 0 ? Math.round((masteredUnlockedCount / unlockedVocabList.length) * 100) : 0}%</span>
          </div>
        </div>

        {/* Search Box & Multi-Filter Controls in Grid Mode */}
        {viewMode === 'grid' && (
          <div className="space-y-3 pt-2 border-t-2 border-slate-100 font-mono">
            
            {/* Filter Bar Row 1: Lock Status & Category */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              
              {/* Lock Status Filter Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-xs text-slate-400 font-bold shrink-0">进度状态:</span>
                <button
                  onClick={() => { playClickSound(); setUnlockFilter('unlocked'); }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 shrink-0 ${
                    unlockFilter === 'unlocked'
                      ? 'bg-emerald-600 border-black text-white shadow-sm'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  <span>已开放 ({unlockedVocabList.length})</span>
                </button>

                <button
                  onClick={() => { playClickSound(); setUnlockFilter('locked'); }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 shrink-0 ${
                    unlockFilter === 'locked'
                      ? 'bg-rose-600 border-black text-white shadow-sm'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-slate-200" />
                  <span>待开放 ({combinedList.length - unlockedVocabList.length})</span>
                </button>

                <button
                  onClick={() => { playClickSound(); setUnlockFilter('all'); }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 transition-all shrink-0 ${
                    unlockFilter === 'all'
                      ? 'bg-[#487E2C] border-black text-white shadow-sm'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  全部词汇 ({combinedList.length})
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-xs text-slate-400 font-bold shrink-0">类别:</span>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playClickSound();
                      setActiveCategory(cat.id);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center space-x-1 border-2 transition-all shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-[#FF6321] border-black text-white shadow-sm'
                        : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Filter Bar Row 2: Lesson Range & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
              
              {/* Lesson Range Selector */}
              <div className="flex items-center space-x-1.5 overflow-x-auto">
                <span className="text-xs text-slate-400 font-bold shrink-0">关卡区间:</span>
                {[
                  { id: 'all', label: '全部关卡' },
                  { id: 'current', label: `🎯 学习进度 (1~${maxUnlockedLesson}课)` },
                  { id: '1-20', label: '1~20 课 (免费试学)' },
                  { id: '21-50', label: '21~50 课' },
                  { id: '51-100', label: '51~100 课' },
                  { id: '101-144', label: '101~144 课' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      playClickSound();
                      setLessonRangeFilter(r.id);
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all shrink-0 ${
                      lessonRangeFilter === r.id
                        ? 'bg-amber-400 border-black text-amber-950 font-black shadow-xs'
                        : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索单词 / 音标 / 释义..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
                />
              </div>

            </div>

            {/* Filter Bar Row 3: Quick Lesson Pill Selector */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pt-1.5 border-t border-slate-100 pb-0.5">
              <span className="text-xs text-slate-400 font-bold shrink-0">单课速选:</span>
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedSpecificLesson(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all shrink-0 ${
                  selectedSpecificLesson === null
                    ? 'bg-[#487E2C] border-black text-white shadow-xs'
                    : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                }`}
              >
                全部课时
              </button>
              {Array.from({ length: Math.min(Math.max(maxUnlockedLesson, 10), 144) }, (_, i) => i + 1).map(lessonNum => {
                const isCompleted = completedLessonSet.has(lessonNum);
                const isUnlocked = unlockedLessonSet.has(lessonNum) || lessonNum <= maxUnlockedLesson;
                const isSelected = selectedSpecificLesson === lessonNum;
                return (
                  <button
                    key={lessonNum}
                    onClick={() => {
                      playClickSound();
                      setSelectedSpecificLesson(isSelected ? null : lessonNum);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black border transition-all shrink-0 flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-400 border-black text-amber-950 shadow-xs scale-105'
                        : isCompleted
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 hover:bg-emerald-200'
                          : isUnlocked
                            ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span>L{lessonNum}</span>
                    {isCompleted && <span className="text-[10px]">✅</span>}
                  </button>
                );
              })}
            </div>

          </div>
        )}
      </div>

      {/* Mode 1: Vocab Grid Mode */}
      {viewMode === 'grid' && (
        <>
          {filteredVocab.length === 0 ? (
            <div className="p-8 text-center bg-white border-4 border-slate-200 rounded-3xl space-y-3 font-mono">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-black text-slate-700">没有找到符合当前学习进度的词汇</h3>
              <p className="text-xs text-slate-500 font-bold">
                尝试切换筛选条件（如选择“全部词汇”或前往地图通关更多关卡）。
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setUnlockFilter('all');
                  setActiveCategory('all');
                  setLessonRangeFilter('all');
                  setSelectedSpecificLesson(null);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 border-2 border-black rounded-xl text-xs font-black text-amber-950 shadow-sm"
              >
                重置所有筛选条件 🔄
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {filteredVocab.map(item => {
                const isMastered = masteredSet.has(item.word.toLowerCase());
                const reqLesson = item.requiredLessonId || 1;
                const isUnlocked = isWordUnlocked(item);
                const isPaywallLocked = isWordPaywallLocked(item);

                // Locked Card View (Respects Learning Progression & VIP Access)
                if (!isUnlocked) {
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-3xl border-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm ${
                        isPaywallLocked
                          ? 'border-amber-400 bg-amber-50/70 text-slate-500'
                          : 'border-slate-300 bg-slate-100/90 text-slate-400'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl grayscale opacity-60 shrink-0 border-2 ${
                              isPaywallLocked ? 'bg-amber-100 border-amber-300' : 'bg-slate-200 border-slate-300'
                            }`}>
                              {item.mcItemIcon || '📦'}
                            </div>
                            <div>
                              <h3 className="font-mono font-black text-sm text-slate-700 flex items-center gap-1">
                                {isPaywallLocked ? (
                                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                                ) : (
                                  <Lock className="w-3.5 h-3.5 text-rose-500" />
                                )}
                                <span>{item.word}</span>
                              </h3>
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                isPaywallLocked
                                  ? 'text-purple-900 bg-purple-100 border-purple-300'
                                  : 'text-amber-900 bg-amber-100 border-amber-300'
                              }`}>
                                {isPaywallLocked ? `👑 VIP 专属 (第 ${reqLesson} 课)` : `🔒 第 ${reqLesson} 关解锁`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-3 rounded-2xl border text-center space-y-1 ${
                          isPaywallLocked
                            ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                            : 'bg-slate-200/80 border-slate-300 text-slate-600'
                        }`}>
                          <p className="text-xs font-mono font-black">
                            {item.meaning}
                          </p>
                          <p className="text-[10px] font-mono font-semibold opacity-80">
                            {isPaywallLocked
                              ? `解锁完整144课，立即解封此单词的跟读评测与艾宾浩斯记忆库！`
                              : `通关探险地图第 ${reqLesson} 关，即可解封此单词！`}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 mt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold">
                        <span className="text-slate-400 text-[10px]">
                          {isMcVocabItem(item) ? '🟩 MC 道具' : '📖 新概念词汇'}
                        </span>
                        
                        {isPaywallLocked ? (
                          <button
                            onClick={() => {
                              playClickSound();
                              if (onOpenVipModal) onOpenVipModal();
                            }}
                            className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-2.5 py-1 rounded-xl border border-black flex items-center space-x-1 text-[10px] font-black shadow-xs hover:scale-105 active:scale-95 transition-all"
                          >
                            <Crown className="w-3 h-3 text-amber-200" />
                            <span>激活解锁 VIP ✨</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              playClickSound();
                              if (onNavigateToLesson) onNavigateToLesson(reqLesson);
                            }}
                            className="bg-emerald-600 text-white px-2.5 py-1 rounded-xl border border-black flex items-center space-x-1 text-[10px] font-black shadow-xs hover:bg-emerald-700 transition-all"
                          >
                            <MapPin className="w-3 h-3 text-amber-300" />
                            <span>去闯关解锁 ⚔️</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                // Unlocked Card View
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-3xl border-4 transition-all duration-200 flex flex-col justify-between relative overflow-hidden ${
                      isMastered
                        ? 'bg-green-50 border-[#487E2C] shadow-[6px_6px_0px_0px_rgba(72,126,44,0.2)]'
                        : 'bg-white border-slate-200 hover:border-[#487E2C] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    {/* Top Row: Icon, Word & Phonics */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-11 h-11 bg-slate-100 border-2 border-slate-300 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0">
                            {item.mcItemIcon || '🧱'}
                          </div>
                          <div>
                            <h3 className="font-black text-base text-[#2D2D2D] font-mono leading-tight flex items-center gap-1.5">
                              <span>{item.word}</span>
                              {item.requiredLessonId && (
                                <span className="text-[9px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded font-bold">
                                  第{item.requiredLessonId}关
                                </span>
                              )}
                            </h3>
                            <span className="text-[11px] font-mono text-slate-400 font-bold">
                              {item.phonetic}
                            </span>
                          </div>
                        </div>

                        {/* Audio Speaker & Practice Buttons */}
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => speakText(item.word)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#487E2C] rounded-xl border-2 border-slate-300 transition-colors"
                            title="朗读标准发音"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              playClickSound();
                              setOralTarget(item);
                            }}
                            className="px-2 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl border-2 border-amber-300 font-mono font-black text-[10px] flex items-center space-x-1 shadow-sm"
                            title="开启口语跟读发音评测"
                          >
                            <span>🎙️ 跟读</span>
                          </button>
                        </div>
                      </div>

                      {/* Phonics Syllable Breakdown Badge */}
                      <div className="mb-2 inline-flex items-center space-x-1 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold text-amber-900">
                        <span>🔤 自然拼读:</span>
                        <span className="text-[#FF6321] font-black tracking-widest">{item.word.split('').join('-')}</span>
                        <button
                          onClick={() => handlePhonicsAudioBreakdown(item.word)}
                          className="ml-1 text-xs text-[#487E2C] hover:underline"
                          title="慢速逐音节听读"
                        >
                          [慢速]
                        </button>
                      </div>

                      {/* Meaning & Category */}
                      <div className="mb-3 space-y-1">
                        <p className="text-sm font-black text-[#FF6321]">
                          {item.meaning}
                        </p>
                        {item.mcItem && (
                          <p className="text-[11px] font-mono text-slate-500 font-bold">
                            🎮 关联物品：{item.mcItem}
                          </p>
                        )}
                      </div>

                      {/* Sample Sentence */}
                      <div className="p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                        <p className="text-[#487E2C] font-bold italic">
                          "{item.sampleSentence}"
                        </p>
                        <p className="text-slate-500 text-[11px] font-semibold">
                          {item.sampleTranslation}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Card Action: Mark Mastered */}
                    <div className="pt-3 mt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center space-x-1 overflow-hidden flex-wrap gap-y-1">
                        {isMcVocabItem(item) ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            🟩 MC 专属
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            📖 新概念 1
                          </span>
                        )}
                        {craftableWordsMap.has(item.word.toLowerCase()) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                              onNavigateToCrafting?.();
                            }}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 flex items-center gap-0.5 transition-all shadow-sm"
                            title="已收录进配方宝典库，点击前往合成实验室进行 3×3 构词合成拼装"
                          >
                            <span>🔨</span>
                            <span>配方可合成</span>
                          </button>
                        )}
                        <span className="text-[10px] text-slate-400 font-bold truncate">
                          {item.category || ''}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          playEmeraldSound();
                          onToggleMasterWord(item.word);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-black flex items-center space-x-1 border-2 transition-all ${
                          isMastered
                            ? 'bg-[#487E2C] border-black text-white shadow-sm'
                            : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'text-[#7CFC00]' : 'text-slate-400'}`} />
                        <span>{isMastered ? '已掌握 (+5 ❇️)' : '标记掌握'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Mode 2: Ebbinghaus Spaced Repetition Flashcards Review */}
      {viewMode === 'ebbinghaus' && (
        <div className="max-w-xl mx-auto bg-white border-4 border-purple-600 rounded-[2.5rem] p-5 sm:p-6 text-center space-y-4 shadow-[10px_10px_0px_0px_rgba(147,51,234,0.15)] animate-in zoom-in-95 font-mono">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 flex-wrap gap-2">
            <span className="text-xs font-black text-purple-700 flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>🧠 艾宾浩斯智能复习 ({reviewPool.length > 0 ? ebbinghausIndex + 1 : 0}/{reviewPool.length})</span>
            </span>

            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              今日抗遗忘打卡: {ebbinghausCompletedCount} 词
            </span>
          </div>

          {/* Review Scope Filter Toolbar */}
          <div className="bg-purple-50/70 p-2.5 rounded-2xl border border-purple-200 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-900">
              <span>🎯 复习关卡范围 (严格按进度已学关卡)：</span>
              <span className="text-purple-600 font-black">{reviewPool.length} 词在库</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              <button
                onClick={() => { playClickSound(); setReviewScope('all_unlocked'); setEbbinghausIndex(0); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'all_unlocked'
                    ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                    : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                🌐 全部已学 (L1~{maxUnlockedLesson})
              </button>

              <button
                onClick={() => { playClickSound(); setReviewScope('latest_lesson'); setEbbinghausIndex(0); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'latest_lesson'
                    ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                    : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                📍 仅最新关卡 (L{maxUnlockedLesson})
              </button>

              <button
                onClick={() => { playClickSound(); setReviewScope('hard_only'); setEbbinghausIndex(0); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'hard_only'
                    ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                    : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                ⚠️ 生词弱项优先
              </button>

              {maxUnlockedLesson > 20 && (
                <button
                  onClick={() => { playClickSound(); setReviewScope('range_trial'); setEbbinghausIndex(0); }}
                  className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                    reviewScope === 'range_trial'
                      ? 'bg-purple-600 text-white border-purple-800 shadow-sm'
                      : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  🌱 1-20课基础期
                </button>
              )}
            </div>
          </div>

          {/* 5-Stage Ebbinghaus Memory Cycle Bar */}
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between font-bold text-purple-900">
              <span>艾宾浩斯 5 阶段记忆周期：</span>
              <span className="text-purple-600">阶段 3/5 (第1天记忆巩固期)</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-center font-bold">
              <div className="p-1 rounded bg-purple-200 text-purple-900 border border-purple-300">5分钟</div>
              <div className="p-1 rounded bg-purple-200 text-purple-900 border border-purple-300">30分钟</div>
              <div className="p-1 rounded bg-purple-600 text-white font-black border border-purple-800 shadow-sm animate-pulse">1天后</div>
              <div className="p-1 rounded bg-slate-100 text-slate-500 border border-slate-200">2天后</div>
              <div className="p-1 rounded bg-slate-100 text-slate-500 border border-slate-200">7天后</div>
            </div>
          </div>

          {/* Flashcard Body */}
          {(() => {
            const currentItem = reviewPool[ebbinghausIndex % Math.max(1, reviewPool.length)];
            if (!currentItem) {
              return (
                <div className="p-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 space-y-2">
                  <p className="text-sm font-bold text-slate-600">当前分类范围暂无待复习词汇</p>
                  <button
                    onClick={() => setReviewScope('all_unlocked')}
                    className="px-4 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                  >
                    查看全部已学词库
                  </button>
                </div>
              );
            }

            const reqLesson = currentItem.requiredLessonId || 1;
            const lessonTitle = getLessonTitle(reqLesson);

            return (
              <div className="space-y-4">
                <div
                  onClick={() => {
                    playClickSound();
                    setIsCardFlipped(!isCardFlipped);
                  }}
                  className="bg-gradient-to-b from-purple-50 via-white to-slate-50 border-4 border-purple-300 hover:border-purple-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all shadow-inner space-y-3 relative min-h-[220px] flex flex-col items-center justify-center"
                >
                  {/* Lesson Provenance Badge */}
                  <div className="inline-flex items-center space-x-1.5 bg-purple-100 text-purple-900 border border-purple-300 px-3 py-1 rounded-full text-[11px] font-black">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    <span>来源：第 {reqLesson} 课 {lessonTitle ? `《${lessonTitle}》` : ''}</span>
                    {onNavigateToLesson && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToLesson(reqLesson);
                        }}
                        className="underline text-purple-700 hover:text-purple-950 ml-1 cursor-pointer"
                        title="直达本课地图与对话"
                      >
                        [直达本课]
                      </span>
                    )}
                  </div>

                  <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl flex items-center justify-center text-4xl shadow-md">
                    {currentItem.mcItemIcon || '🧠'}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-purple-950 tracking-wide">
                      {currentItem.word}
                    </h3>
                    {currentItem.phonetic && (
                      <p className="text-xs font-bold text-purple-600 mt-1">
                        [{currentItem.phonetic}]
                      </p>
                    )}
                  </div>

                  {/* Flipped Content */}
                  {isCardFlipped ? (
                    <div className="pt-2 border-t border-purple-200 text-center space-y-2 animate-in fade-in">
                      <p className="text-base font-black text-amber-900">
                        中文释义：{currentItem.meaning}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        "{currentItem.sampleSentence}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs font-bold text-slate-400 animate-pulse">
                      👆 点击卡片翻面查看释义与例句
                    </p>
                  )}
                </div>

                {/* Voice and AI Speech Evaluation Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      speakText(currentItem.word);
                    }}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-xl font-black text-xs text-slate-700 flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                  >
                    <Volume2 className="w-4 h-4 text-purple-600" />
                    <span>示范朗读</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setOralTarget(currentItem);
                    }}
                    className="py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 border-2 border-black text-slate-950 rounded-xl font-black text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm active:scale-95"
                  >
                    <span>🎙️ AI 发音打分</span>
                  </button>
                </div>

                {/* 3-Tier Ebbinghaus Rating Buttons */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-bold text-slate-500">评估当前掌握度（自动排列下次复习时间）：</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        setEbbinghausCompletedCount(prev => prev + 1);
                        if (onAwardEmeralds) onAwardEmeralds(1, 2);
                        setIsCardFlipped(false);
                        setEbbinghausIndex(prev => (prev + 1) % reviewPool.length);
                      }}
                      className="py-2.5 bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 text-rose-900 rounded-xl font-black text-xs space-y-0.5 active:scale-95 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span>😖 较难</span>
                      </div>
                      <div className="text-[9px] text-rose-700 font-normal">归生词本 (1天后)</div>
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        setEbbinghausCompletedCount(prev => prev + 1);
                        if (onAwardEmeralds) onAwardEmeralds(2, 4);
                        setIsCardFlipped(false);
                        setEbbinghausIndex(prev => (prev + 1) % reviewPool.length);
                      }}
                      className="py-2.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 rounded-xl font-black text-xs space-y-0.5 active:scale-95 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span>😐 尚可</span>
                      </div>
                      <div className="text-[9px] text-amber-700 font-normal">巩固复习 (2天后)</div>
                    </button>

                    <button
                      onClick={() => {
                        playEmeraldSound();
                        setEbbinghausCompletedCount(prev => prev + 1);
                        if (onAwardEmeralds) onAwardEmeralds(3, 6);
                        setIsCardFlipped(false);
                        setEbbinghausIndex(prev => (prev + 1) % reviewPool.length);
                      }}
                      className="py-2.5 bg-emerald-500 hover:bg-emerald-400 border-2 border-black text-slate-950 rounded-xl font-black text-xs space-y-0.5 shadow-sm active:scale-95 transition-all"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span>😃 熟练</span>
                      </div>
                      <div className="text-[9px] text-slate-900 font-bold">长期记忆 (7天后)</div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Mode 3: Interactive Flashcard Quiz Game Mode */}
      {viewMode === 'quiz' && (
        <div className="max-w-xl mx-auto bg-white border-4 border-[#FF6321] rounded-[2.5rem] p-5 sm:p-6 text-center space-y-5 shadow-[10px_10px_0px_0px_rgba(255,99,33,0.15)] animate-in zoom-in-95 font-mono">
          
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <span className="text-xs font-black text-[#FF6321] flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>智能闪卡挑战 ({reviewPool.length > 0 ? quizIndex + 1 : 0}/{reviewPool.length} 题)</span>
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-[#487E2C] bg-green-100 px-3 py-1 rounded-full border border-green-300">
                连对得分: {quizScore} 题
              </span>
            </div>
          </div>

          {/* Quiz Scope Filter Toolbar */}
          <div className="bg-orange-50/70 p-2.5 rounded-2xl border border-orange-200 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[11px] font-bold text-orange-950">
              <span>🎯 闪卡出题范围 (严格按进度已学关卡)：</span>
              <span className="text-[#FF6321] font-black">{reviewPool.length} 题就绪</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              <button
                onClick={() => { playClickSound(); setReviewScope('all_unlocked'); setQuizIndex(0); setSelectedAnswer(null); setIsAnswerCorrect(null); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'all_unlocked'
                    ? 'bg-[#FF6321] text-white border-orange-800 shadow-sm'
                    : 'bg-white text-orange-900 border-orange-200 hover:bg-orange-100'
                }`}
              >
                🌐 全部已学 (L1~{maxUnlockedLesson})
              </button>

              <button
                onClick={() => { playClickSound(); setReviewScope('latest_lesson'); setQuizIndex(0); setSelectedAnswer(null); setIsAnswerCorrect(null); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'latest_lesson'
                    ? 'bg-[#FF6321] text-white border-orange-800 shadow-sm'
                    : 'bg-white text-orange-900 border-orange-200 hover:bg-orange-100'
                }`}
              >
                📍 仅最新关卡 (L{maxUnlockedLesson})
              </button>

              <button
                onClick={() => { playClickSound(); setReviewScope('hard_only'); setQuizIndex(0); setSelectedAnswer(null); setIsAnswerCorrect(null); }}
                className={`px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
                  reviewScope === 'hard_only'
                    ? 'bg-[#FF6321] text-white border-orange-800 shadow-sm'
                    : 'bg-white text-orange-900 border-orange-200 hover:bg-orange-100'
                }`}
              >
                ⚠️ 攻克生词题
              </button>
            </div>
          </div>

          {currentQuizItem ? (
            <>
              {/* Question Display */}
              <div className="bg-slate-50 border-4 border-slate-200 rounded-3xl p-5 sm:p-6 space-y-3 relative shadow-inner">
                {/* Lesson Provenance Badge */}
                {(() => {
                  const reqLesson = currentQuizItem.requiredLessonId || 1;
                  const lessonTitle = getLessonTitle(reqLesson);
                  return (
                    <div className="inline-flex items-center space-x-1.5 bg-orange-100 text-orange-900 border border-orange-300 px-3 py-1 rounded-full text-[11px] font-black">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>来源：第 {reqLesson} 课 {lessonTitle ? `《${lessonTitle}》` : ''}</span>
                    </div>
                  );
                })()}

                <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-md">
                  {currentQuizItem.mcItemIcon || '🧱'}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => speakText(currentQuizItem.word)}
                    className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#487E2C] hover:bg-[#355E20] text-white rounded-full font-black text-xs shadow-sm active:scale-95 transition-transform"
                  >
                    <Volume2 className="w-4 h-4 text-[#FFD700]" />
                    <span>点击听英语发音示范 🔊</span>
                  </button>
                  <p className="text-sm font-black text-slate-600">
                    请选出对应这个 Minecraft 道具/核心单词的正确英文：
                  </p>
                </div>
              </div>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentOptions.map((opt) => {
                  const isSelected = selectedAnswer === opt.word;
                  const isCorrectOpt = opt.word.toLowerCase() === currentQuizItem.word.toLowerCase();

                  let btnStyle = 'bg-white border-slate-300 hover:border-[#FF6321] text-slate-800';
                  if (selectedAnswer !== null) {
                    if (isCorrectOpt) {
                      btnStyle = 'bg-[#487E2C] border-black text-white shadow-md';
                    } else if (isSelected && !isCorrectOpt) {
                      btnStyle = 'bg-rose-500 border-black text-white shadow-md';
                    }
                  }

                  return (
                    <button
                      key={opt.word}
                      onClick={() => handleSelectQuizOption(opt)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-2xl border-4 font-black text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-left flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="space-y-0.5">
                        <span className="block">{opt.word}</span>
                        <span className="text-xs opacity-80 block font-normal">{opt.meaning}</span>
                      </div>

                      {selectedAnswer !== null && (
                        <div>
                          {isCorrectOpt && <CheckCircle2 className="w-6 h-6 text-[#7CFC00]" />}
                          {isSelected && !isCorrectOpt && <XCircle className="w-6 h-6 text-white" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Question */}
              {selectedAnswer !== null && (
                <div className="pt-2 space-y-3">
                  <p className={`font-black text-sm flex items-center justify-center space-x-1 ${
                    isAnswerCorrect ? 'text-[#487E2C]' : 'text-rose-600'
                  }`}>
                    {isAnswerCorrect ? (
                      <>
                        <Award className="w-5 h-5 text-[#FFD700]" />
                        <span>回答完全正确！获得 +3 绿宝石 ❇️ +10 XP！</span>
                      </>
                    ) : (
                      <span>非常接近啦！正确答案是："{currentQuizItem.word}" ({currentQuizItem.meaning})</span>
                    )}
                  </p>

                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white py-3 rounded-2xl font-black text-sm shadow-[0_4px_0_0_#993300] flex items-center justify-center space-x-2"
                  >
                    <span>下一题 ➡️</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 space-y-2">
              <p className="text-sm font-bold text-slate-600">当前范围暂无可挑战词汇题目</p>
              <button
                onClick={() => setReviewScope('all_unlocked')}
                className="px-4 py-1.5 bg-[#FF6321] text-white rounded-xl text-xs font-bold"
              >
                开启全部已学关卡挑战
              </button>
            </div>
          )}

        </div>
      )}

      {oralTarget && (
        <OralEvaluationModal
          targetText={oralTarget.word}
          translation={oralTarget.meaning}
          phonetic={oralTarget.phonetic}
          mcItemIcon={oralTarget.mcItemIcon || '🧱'}
          onClose={() => setOralTarget(null)}
          onAwardEmeralds={(emeralds, xp) => {
            if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
          }}
        />
      )}

    </div>
  );
};
