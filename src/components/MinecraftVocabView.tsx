import React, { useState } from 'react';
import { MINECRAFT_VOCABULARY } from '../data/minecraftVocabData';
import { LESSONS_DATA } from '../data/lessonsData';
import { VocabItem, UserProfile } from '../types';
import { Volume2, Search, CheckCircle, Sparkles, BookOpen, Layers, Play, Award, RotateCcw, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'quiz'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [oralTarget, setOralTarget] = useState<VocabItem | null>(null);

  // Quiz Mode State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Combine Minecraft vocabulary with Lesson vocabulary
  const allLessonVocab: VocabItem[] = LESSONS_DATA.flatMap(l => l.vocabulary);
  const combinedList: VocabItem[] = [...MINECRAFT_VOCABULARY];

  allLessonVocab.forEach(lv => {
    if (!combinedList.some(v => v.word.toLowerCase() === lv.word.toLowerCase())) {
      combinedList.push(lv);
    }
  });

  const categories = [
    { id: 'all', label: '全部词汇', icon: '📚' },
    { id: 'Minecraft', label: 'Minecraft 专属方块/道具', icon: '🟩' },
    { id: 'Course', label: '新概念第一册核心词', icon: '📖' }
  ];

  const filteredVocab = combinedList.filter(item => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'Minecraft' && item.category === 'Minecraft') ||
      (activeCategory === 'Course' && item.category !== 'Minecraft');

    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.includes(searchQuery) ||
      item.sampleSentence.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Current Quiz Question item
  const currentQuizItem = filteredVocab[quizIndex % Math.max(1, filteredVocab.length)];

  // Generate 4 options for quiz
  const getQuizOptions = (correctItem: VocabItem) => {
    if (!correctItem) return [];
    const others = combinedList.filter(v => v.word !== correctItem.word);
    // Shuffle others
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correctItem, ...shuffledOthers].sort(() => 0.5 - Math.random());
    return options;
  };

  const [currentOptions, setCurrentOptions] = useState<VocabItem[]>(() => getQuizOptions(currentQuizItem));

  const handleNextQuizQuestion = () => {
    const nextIdx = (quizIndex + 1) % filteredVocab.length;
    setQuizIndex(nextIdx);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setCurrentOptions(getQuizOptions(filteredVocab[nextIdx]));
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
            <div className="w-11 h-11 bg-[#FFD700] border-2 border-black rounded-2xl flex items-center justify-center text-2xl shadow-sm">
              📦
            </div>
            <div>
              <h2 className="text-lg font-black font-mono text-[#2D2D2D]">
                Minecraft & 新概念英语智能词库
              </h2>
              <p className="text-xs text-slate-500 font-mono font-bold">
                根据地图进度解锁 ({combinedList.filter(v => !v.requiredLessonId || v.requiredLessonId <= Math.max(...(profile.unlockedLessonIds || [1]), 1)).length}/{combinedList.length}) 个 MC 探险词汇 • 掌握 {profile.masteredWords.length} 个
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center space-x-2">
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
              📚 词汇卡片模式
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
              🎴 闪卡听音互动答题 (+3 ❇️)
            </button>
          </div>
        </div>

        {/* Search Box & Category Filters if grid */}
        {viewMode === 'grid' && (
          <div className="space-y-3 pt-2 border-t-2 border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Filter Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playClickSound();
                      setActiveCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black flex items-center space-x-1.5 border-2 transition-all ${
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

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索单词 / 音标 / 意思..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: Vocab Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredVocab.map(item => {
            const isMastered = profile.masteredWords.includes(item.word);
            const maxUnlockedLesson = Math.max(...(profile.unlockedLessonIds || [1]), 1);
            const isUnlocked = !item.requiredLessonId || item.requiredLessonId <= maxUnlockedLesson;

            if (!isUnlocked) {
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl border-4 border-slate-300 bg-slate-100/90 text-slate-400 flex flex-col justify-between relative overflow-hidden shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-11 h-11 bg-slate-200 border-2 border-slate-300 rounded-2xl flex items-center justify-center text-2xl grayscale opacity-60">
                          {item.mcItemIcon || '📦'}
                        </div>
                        <div>
                          <h3 className="font-mono font-black text-sm text-slate-600">
                            🔒 {item.word}
                          </h3>
                          <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300">
                            关卡 {item.requiredLessonId} 解锁
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-200/70 rounded-2xl border border-slate-300 text-center space-y-1">
                      <p className="text-xs font-mono font-bold text-slate-600">
                        {item.meaning}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">
                        前往地图完成第 {item.requiredLessonId} 课英语冒险任务即可解锁该词汇全套标准发音与跟读！
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 mt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
                    <span>{item.category || 'Minecraft'}</span>
                    <span className="bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-300 flex items-center space-x-1">
                      <span>🔒 待解锁</span>
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
                        <h3 className="font-black text-base text-[#2D2D2D] font-mono leading-tight">
                          {item.word}
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
                        <span>🎙️ 跟读测评</span>
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
                  <span className="text-[11px] text-slate-400 font-bold">
                    {item.category || 'General'}
                  </span>

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

      {/* Mode 2: Interactive Flashcard Quiz Game Mode */}
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

