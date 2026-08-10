import React, { useState } from 'react';
import { MINECRAFT_VOCABULARY } from '../data/minecraftVocabData';
import { LESSONS_DATA } from '../data/lessonsData';
import { NCE_BOOK1_FULL_VOCAB } from '../data/nceBook1FullVocab';
import { VocabItem, UserProfile } from '../types';
import { Volume2, Search, CheckCircle, Sparkles, BookOpen, Layers, Play, Award, RotateCcw, HelpCircle, CheckCircle2, XCircle, Lock, Unlock, Filter, ArrowRight } from 'lucide-react';
import { playClickSound, playEmeraldSound, speakText, playLevelUpSound } from '../utils/audio';
import { OralEvaluationModal } from './OralEvaluationModal';
import confetti from 'canvas-confetti';

interface MinecraftVocabViewProps {
  profile: UserProfile;
  onToggleMasterWord: (word: string) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
}

export const MinecraftVocabView: React.FC<MinecraftVocabViewProps> = ({
  profile,
  onToggleMasterWord,
  onAwardEmeralds
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

  // New Progress Unlock Filters
  const [unlockFilter, setUnlockFilter] = useState<'all' | 'unlocked' | 'locked'>('unlocked');
  const [lessonRangeFilter, setLessonRangeFilter] = useState<string>('all');

  // Determine user's highest unlocked lesson
  const maxUnlockedLesson = Math.max(...(profile.unlockedLessonIds || [1]), 1);

  // 1. Convert NCE Full Vocab into VocabItem list
  const nceFullList: VocabItem[] = NCE_BOOK1_FULL_VOCAB.map((item, idx) => ({
    id: `nce_full_${item.lessonId}_${idx}`,
    word: item.word,
    phonetic: item.phonetic || '',
    meaning: item.meaning,
    category: 'Course',
    mcItem: item.mcItem,
    mcItemIcon: item.mcItemIcon,
    sampleSentence: item.sampleSentence,
    sampleTranslation: item.sampleTranslation,
    requiredLessonId: item.lessonId
  }));

  // 2. Combine Minecraft vocabulary, Lesson vocabulary, and Full NCE vocabulary
  const allLessonVocab: VocabItem[] = LESSONS_DATA.flatMap(l =>
    l.vocabulary.map(v => ({ ...v, requiredLessonId: v.requiredLessonId || l.id }))
  );

  const combinedList: VocabItem[] = [];
  const wordMap = new Map<string, VocabItem>();

  // Add Minecraft Vocabulary (assign lessonId smoothly if missing)
  MINECRAFT_VOCABULARY.forEach((mv, idx) => {
    const requiredLesson = mv.requiredLessonId || Math.min(144, Math.floor(idx / 2) + 1);
    wordMap.set(mv.word.toLowerCase(), {
      ...mv,
      category: mv.category || 'Minecraft',
      requiredLessonId: requiredLesson
    });
  });

  // Add Lesson Vocab
  allLessonVocab.forEach(lv => {
    const key = lv.word.toLowerCase();
    if (!wordMap.has(key)) {
      wordMap.set(key, lv);
    }
  });

  // Add NCE Full Vocab
  nceFullList.forEach(nv => {
    const key = nv.word.toLowerCase();
    if (!wordMap.has(key)) {
      wordMap.set(key, nv);
    }
  });

  wordMap.forEach(item => combinedList.push(item));

  // Sort by requiredLessonId ascending so words unlock sequentially
  combinedList.sort((a, b) => (a.requiredLessonId || 1) - (b.requiredLessonId || 1));

  // Helper to check if item is Minecraft specific
  const mcIds = new Set(MINECRAFT_VOCABULARY.map(m => m.id));
  const isMcVocabItem = (item: VocabItem) => item.id.startsWith('mc_') || item.category === 'Minecraft' || mcIds.has(item.id);

  // Calculate unlock statistics
  const unlockedVocabList = combinedList.filter(
    item => !item.requiredLessonId || item.requiredLessonId <= maxUnlockedLesson
  );
  const masteredWords = profile.masteredWords || [];
  const masteredUnlockedCount = unlockedVocabList.filter(item => masteredWords.includes(item.word)).length;

  const categories = [
    { id: 'all', label: '全部种类', icon: '📚' },
    { id: 'Minecraft', label: 'Minecraft 方块/道具', icon: '🟩' },
    { id: 'Course', label: '新概念 1 核心课文词', icon: '📖' }
  ];

  // Filtering Logic based on Search, Category, Unlock Status & Lesson Range
  const filteredVocab = combinedList.filter(item => {
    const isMc = isMcVocabItem(item);
    const isUnlocked = !item.requiredLessonId || item.requiredLessonId <= maxUnlockedLesson;

    // Unlock Status Filter
    if (unlockFilter === 'unlocked' && !isUnlocked) return false;
    if (unlockFilter === 'locked' && isUnlocked) return false;

    // Lesson Range Filter
    const reqLesson = item.requiredLessonId || 1;
    if (lessonRangeFilter === 'current' && reqLesson > maxUnlockedLesson) return false;
    if (lessonRangeFilter === '1-10' && (reqLesson < 1 || reqLesson > 10)) return false;
    if (lessonRangeFilter === '11-30' && (reqLesson < 11 || reqLesson > 30)) return false;
    if (lessonRangeFilter === '31-70' && (reqLesson < 31 || reqLesson > 70)) return false;
    if (lessonRangeFilter === '71-144' && (reqLesson < 71 || reqLesson > 144)) return false;

    // Category Filter
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'Minecraft' && isMc) ||
      (activeCategory === 'Course' && !isMc);

    // Search Query Filter
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery) ||
      item.sampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Interactive Review/Quiz pool defaults to unlocked words to prevent testing unlearned content
  const reviewPool = viewMode === 'grid' ? filteredVocab : (unlockedVocabList.length > 0 ? unlockedVocabList : filteredVocab);

  // Current Quiz Question item
  const currentQuizItem = reviewPool[quizIndex % Math.max(1, reviewPool.length)];

  // Generate 4 options for quiz
  const getQuizOptions = (correctItem: VocabItem) => {
    if (!correctItem) return [];
    const others = combinedList.filter(v => v.word !== correctItem.word);
    const shuffledOthers = [...others];
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
                  按关卡进度解锁
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-mono font-bold">
                已通关解锁至：<span className="text-[#487E2C] font-black">第 1 ~ {maxUnlockedLesson} 课</span> • 已解锁 <span className="text-[#FF6321] font-black">{unlockedVocabList.length}</span> / {combinedList.length} 词 • 掌握 <span className="text-[#487E2C] font-black">{masteredUnlockedCount}</span> 个
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
              📚 词汇全库
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
              🧠 艾宾浩斯抗遗忘打怪复习
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
              🎴 闪卡听音答题 (+3 ❇️)
            </button>
          </div>
        </div>

        {/* Visual Progress Bar for Unlock Status */}
        <div className="bg-slate-100 p-3 rounded-2xl border-2 border-slate-200 space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Unlock className="w-4 h-4 text-[#487E2C]" />
              <span>智能词库地图解锁进度（当前关卡 1 ~ {maxUnlockedLesson}）:</span>
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
            <span>🎮 通关更多地图路线，即可解封并学习更多新概念智能词汇</span>
            <span>当前掌握率: {unlockedVocabList.length > 0 ? Math.round((masteredUnlockedCount / unlockedVocabList.length) * 100) : 0}%</span>
          </div>
        </div>

        {/* Search Box & Multi-Filter Controls in Grid Mode */}
        {viewMode === 'grid' && (
          <div className="space-y-3 pt-2 border-t-2 border-slate-100 font-mono">
            
            {/* Filter Bar Row 1: Lock Status & Category */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              
              {/* Lock Status Filter Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-xs text-slate-400 font-bold shrink-0">状态:</span>
                <button
                  onClick={() => { playClickSound(); setUnlockFilter('unlocked'); }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 shrink-0 ${
                    unlockFilter === 'unlocked'
                      ? 'bg-emerald-600 border-black text-white shadow-sm'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  <span>已解锁 ({unlockedVocabList.length})</span>
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
                  <span>待解锁 ({combinedList.length - unlockedVocabList.length})</span>
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
                <span className="text-xs text-slate-400 font-bold shrink-0">分类:</span>
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
                  { id: 'current', label: `🎯 关卡 1~${maxUnlockedLesson}` },
                  { id: '1-10', label: '1~10 课' },
                  { id: '11-30', label: '11~30 课' },
                  { id: '31-70', label: '31~70 课' },
                  { id: '71-144', label: '71~144 课' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => { playClickSound(); setLessonRangeFilter(r.id); }}
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

          </div>
        )}
      </div>

      {/* Mode 1: Vocab Grid Mode */}
      {viewMode === 'grid' && (
        <>
          {filteredVocab.length === 0 ? (
            <div className="p-8 text-center bg-white border-4 border-slate-200 rounded-3xl space-y-3 font-mono">
              <div className="text-4xl">🔍</div>
              <h3 className="text-base font-black text-slate-700">没有找到符合条件的词汇</h3>
              <p className="text-xs text-slate-500 font-bold">
                尝试切换筛选条件（如选择“全部词汇”或清除搜索框）查看更多新概念智能词汇。
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setUnlockFilter('all');
                  setActiveCategory('all');
                  setLessonRangeFilter('all');
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 border-2 border-black rounded-xl text-xs font-black text-amber-950 shadow-sm"
              >
                重置所有筛选条件 🔄
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {filteredVocab.map(item => {
                const isMastered = (profile.masteredWords || []).includes(item.word);
                const reqLesson = item.requiredLessonId || 1;
                const isUnlocked = !item.requiredLessonId || reqLesson <= maxUnlockedLesson;

                if (!isUnlocked) {
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-3xl border-4 border-slate-300 bg-slate-100/90 text-slate-400 flex flex-col justify-between relative overflow-hidden shadow-sm hover:border-slate-400 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-11 h-11 bg-slate-200 border-2 border-slate-300 rounded-2xl flex items-center justify-center text-2xl grayscale opacity-50 shrink-0">
                              {item.mcItemIcon || '📦'}
                            </div>
                            <div>
                              <h3 className="font-mono font-black text-sm text-slate-700 flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5 text-rose-500" />
                                <span>{item.word}</span>
                              </h3>
                              <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                                🔒 第 {reqLesson} 关解锁
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-200/80 rounded-2xl border border-slate-300 text-center space-y-1">
                          <p className="text-xs font-mono font-black text-slate-600">
                            {item.meaning}
                          </p>
                          <p className="text-[10px] font-mono text-slate-500 font-semibold">
                            🎮 通关地图第 {reqLesson} 关，即可解封此单词的跟读评测与艾宾浩斯复习！
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 mt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold">
                        <span className="text-slate-400">
                          {isMcVocabItem(item) ? '🟩 MC 道具' : '📖 新概念词汇'}
                        </span>
                        <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg border border-slate-300 flex items-center space-x-1 text-[10px] font-black">
                          <span>待冒险解锁 ⚔️</span>
                        </span>
                      </div>
                    </div>
                  );
                }

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
                      <div className="flex items-center space-x-1 overflow-hidden">
                        {isMcVocabItem(item) ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            🟩 MC 专属
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded-md text-[10px] font-black shrink-0">
                            📖 新概念 1
                          </span>
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
        <div className="max-w-xl mx-auto bg-white border-4 border-purple-600 rounded-[2.5rem] p-6 text-center space-y-5 shadow-[10px_10px_0px_0px_rgba(147,51,234,0.15)] animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 font-mono flex-wrap gap-2">
            <span className="text-xs font-black text-purple-700 flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>🧠 艾宾浩斯遗忘曲线抗遗忘复习 ({ebbinghausIndex + 1}/{filteredVocab.length})</span>
            </span>

            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              今日抗遗忘打卡: {ebbinghausCompletedCount} 词
            </span>
          </div>

          {/* 5-Stage Ebbinghaus Memory Cycle Bar */}
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 space-y-1.5 font-mono text-[10px]">
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
            const currentItem = filteredVocab[ebbinghausIndex % Math.max(1, filteredVocab.length)];
            if (!currentItem) return null;

            return (
              <div className="space-y-4">
                <div
                  onClick={() => {
                    playClickSound();
                    setIsCardFlipped(!isCardFlipped);
                  }}
                  className="bg-gradient-to-b from-purple-50 via-white to-slate-50 border-4 border-purple-300 hover:border-purple-500 rounded-3xl p-6 sm:p-8 cursor-pointer transition-all shadow-inner space-y-3 relative min-h-[220px] flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl flex items-center justify-center text-4xl shadow-md">
                    {currentItem.mcItemIcon || '🧠'}
                  </div>

                  <div>
                    <h3 className="text-2xl font-black font-mono text-purple-950 tracking-wide">
                      {currentItem.word}
                    </h3>
                    {currentItem.phonetic && (
                      <p className="text-xs font-mono font-bold text-purple-600 mt-1">
                        [{currentItem.phonetic}]
                      </p>
                    )}
                  </div>

                  {/* Flipped Content */}
                  {isCardFlipped ? (
                    <div className="pt-2 border-t border-purple-200 text-center space-y-2 animate-in fade-in">
                      <p className="text-base font-black text-amber-900 font-mono">
                        中文释义：{currentItem.meaning}
                      </p>
                      <p className="text-xs font-mono text-slate-600 italic">
                        "{currentItem.sampleSentence}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs font-mono font-bold text-slate-400 animate-pulse">
                      👆 点击卡片翻面查看释义与例句
                    </p>
                  )}
                </div>

                {/* Single Word TTS Voice */}
                <button
                  onClick={() => {
                    speakText(currentItem.word);
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-xl font-mono font-black text-xs text-slate-700 flex items-center justify-center space-x-1.5"
                >
                  <Volume2 className="w-4 h-4 text-purple-600" />
                  <span>朗读示范发音</span>
                </button>

                {/* 3-Tier Ebbinghaus Rating Buttons */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-mono font-bold text-slate-500">评估当前掌握度（自动排列下次复习时间）：</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        setEbbinghausCompletedCount(prev => prev + 1);
                        if (onAwardEmeralds) onAwardEmeralds(1, 2);
                        setIsCardFlipped(false);
                        setEbbinghausIndex(prev => (prev + 1) % filteredVocab.length);
                      }}
                      className="py-2.5 bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 text-rose-900 rounded-xl font-mono font-black text-xs space-y-0.5 active:scale-95 transition-all"
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
                        setEbbinghausIndex(prev => (prev + 1) % filteredVocab.length);
                      }}
                      className="py-2.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 rounded-xl font-mono font-black text-xs space-y-0.5 active:scale-95 transition-all"
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
                        setEbbinghausIndex(prev => (prev + 1) % filteredVocab.length);
                      }}
                      className="py-2.5 bg-emerald-500 hover:bg-emerald-400 border-2 border-black text-slate-950 rounded-xl font-mono font-black text-xs space-y-0.5 shadow-sm active:scale-95 transition-all"
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
      {viewMode === 'quiz' && currentQuizItem && (
        <div className="max-w-xl mx-auto bg-white border-4 border-[#FF6321] rounded-[2.5rem] p-6 text-center space-y-6 shadow-[10px_10px_0px_0px_rgba(255,99,33,0.15)] animate-in zoom-in-95">
          
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 font-mono">
            <span className="text-xs font-black text-[#FF6321] flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>闪卡看图/听音问答第 {quizIndex + 1} 题</span>
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-[#487E2C] bg-green-100 px-3 py-1 rounded-full border border-green-300">
                连对得分: {quizScore} 题
              </span>
            </div>
          </div>

          {/* Question Display */}
          <div className="bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 space-y-3 relative shadow-inner">
            <div className="w-20 h-20 bg-white border-4 border-black rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-md">
              {currentQuizItem.mcItemIcon || '🧱'}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => speakText(currentQuizItem.word)}
                className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#487E2C] hover:bg-[#355E20] text-white rounded-full font-mono font-black text-xs shadow-sm"
              >
                <Volume2 className="w-4 h-4 text-[#FFD700]" />
                <span>点击听英语发音示范 🔊</span>
              </button>
              <p className="text-sm font-black font-mono text-slate-600">
                请选出对应这个 Minecraft 道具/方块的正确英文单词：
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
                  className={`p-4 rounded-2xl border-4 font-mono font-black text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-left flex items-center justify-between ${btnStyle}`}
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
              <p className={`font-mono font-black text-sm flex items-center justify-center space-x-1 ${
                isAnswerCorrect ? 'text-[#487E2C]' : 'text-rose-600'
              }`}>
                {isAnswerCorrect ? (
                  <>
                    <Award className="w-5 h-5 text-[#FFD700]" />
                    <span>回答完全正确！极速获得 +3 绿宝石 ❇️ +10 XP！</span>
                  </>
                ) : (
                  <span>非常接近啦！正确答案是："{currentQuizItem.word}" ({currentQuizItem.meaning})</span>
                )}
              </p>

              <button
                onClick={handleNextQuizQuestion}
                className="w-full bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white py-3 rounded-2xl font-mono font-black text-sm shadow-[0_4px_0_0_#993300] flex items-center justify-center space-x-2"
              >
                <span>下一题 ➡️</span>
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

