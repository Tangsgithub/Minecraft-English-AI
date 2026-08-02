import React, { useState } from 'react';
import { Lesson, UserProfile } from '../types';
import { getFullLessonsCatalog, LESSONS_DATA } from '../data/lessonsData';
import { BookOpen, Search, Volume2, Sparkles, CheckCircle, Lock, Play, MessageSquare, ChevronRight, Award } from 'lucide-react';
import { playClickSound, playEmeraldSound, speakText } from '../utils/audio';
import { OralEvaluationModal } from './OralEvaluationModal';

interface LessonMapProps {
  profile: UserProfile;
  onSelectLessonForChat: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
}

export const LessonMap: React.FC<LessonMapProps> = ({
  profile,
  onSelectLessonForChat,
  onCompleteLesson,
  onAwardEmeralds
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [oralTarget, setOralTarget] = useState<{ text: string; translation?: string; phonetic?: string } | null>(null);

  const catalog = getFullLessonsCatalog();

  // Filter lessons
  const filteredCatalog = catalog.filter(item => {
    const matchesUnit = selectedUnit === 0 || item.unit === selectedUnit;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleZh.includes(searchQuery) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString() === searchQuery.trim();
    return matchesUnit && matchesSearch;
  });

  const handleOpenLessonDetail = (lessonId: number) => {
    playClickSound();
    // Look up detailed lesson data or construct lesson view
    const found = LESSONS_DATA.find(l => l.id === lessonId);
    if (found) {
      setActiveLesson(found);
    } else {
      // Fallback structured lesson template for catalog placeholders
      const catalogItem = catalog.find(c => c.id === lessonId);
      setActiveLesson({
        id: lessonId,
        unit: catalogItem?.unit || 1,
        title: catalogItem?.title || `Lesson ${lessonId}`,
        titleZh: catalogItem?.titleZh || `第 ${lessonId} 课`,
        topic: catalogItem?.topic || 'Minecraft Adventure',
        topicZh: '我的世界场景表达',
        difficulty: catalogItem?.difficulty || 'easy',
        minecraftScene: 'Minecraft Village Crafting Station',
        sceneDescription: `Steve and Alex meet at the crafting table for Lesson ${lessonId}.`,
        vocabulary: [
          {
            id: `l${lessonId}_1`,
            word: 'crafting',
            phonetic: '/ˈkrɑːf.tɪŋ/',
            meaning: '合成；制作',
            mcItem: 'Crafting Table',
            mcItemIcon: '🛠️',
            sampleSentence: `Let us practice English for Lesson ${lessonId}!`,
            sampleTranslation: `让我们练习第 ${lessonId} 课的英语吧！`
          }
        ],
        targetSentences: [
          `Welcome to Lesson ${lessonId}!`,
          'Can you build a wooden house?',
          'Yes, I can.'
        ],
        targetSentenceTranslations: [
          `欢迎来到第 ${lessonId} 课！`,
          '你能造一间木头房子吗？',
          '是的，我可以。'
        ],
        dialogueScript: [
          { speaker: 'Alex', text: `Hello! Ready for Lesson ${lessonId}?`, translation: `你好！准备好学习第 ${lessonId} 课了吗？`, avatar: '👩' },
          { speaker: 'Steve', text: 'Yes, Alex! I brought my pickaxe.', translation: '是的，亚历克斯！我带了我的铁镐。', avatar: '👦' }
        ],
        grammarNote: '情态动词 Can 的用法：Can + 动词原形。'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Unit Navigation */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#487E2C] text-white border-2 border-black rounded-xl flex items-center justify-center font-bold shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black font-mono text-[#2D2D2D]">
              《新概念英语第一册》144 课 Minecraft 冒险地图
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索课程编号/主题/关键词..."
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
            />
          </div>
        </div>

        {/* Units Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              playClickSound();
              setSelectedUnit(0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black whitespace-nowrap border-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
              selectedUnit === 0
                ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#2A4718]'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            全部 144 课
          </button>

          {Array.from({ length: 12 }, (_, i) => i + 1).map(uNum => (
            <button
              key={uNum}
              onClick={() => {
                playClickSound();
                setSelectedUnit(uNum);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-black whitespace-nowrap border-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                selectedUnit === uNum
                  ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#2A4718]'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Unit {uNum} (第 {(uNum - 1) * 12 + 1}-{uNum * 12} 课)
            </button>
          ))}
        </div>
      </div>

      {/* 144 Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredCatalog.map(item => {
          const isUnlocked = profile.unlockedLessonIds.includes(item.id) || item.id === 1;
          const isCompleted = profile.unlockedLessonIds.includes(item.id + 1) || item.id < profile.currentLessonId;
          const isCurrent = profile.currentLessonId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => isUnlocked && handleOpenLessonDetail(item.id)}
              className={`rounded-3xl border-4 p-4 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#FF6321] shadow-[8px_8px_0px_0px_rgba(255,99,33,0.25)] ring-2 ring-[#FF6321]/50 transform hover:-translate-y-1'
                  : isUnlocked
                  ? 'bg-white border-[#487E2C] hover:border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.12)] transform hover:-translate-y-1'
                  : 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed shadow-none'
              }`}
            >
              {/* Badge Overlay */}
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-[#FF6321] text-white font-mono font-black text-[10px] px-2.5 py-0.5 rounded-bl-xl shadow-sm uppercase tracking-wider">
                  当前进度的课
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-black text-[#487E2C]">
                    Lesson {item.id}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase border ${
                    item.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : item.difficulty === 'medium'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-black text-[#2D2D2D] mb-0.5 line-clamp-1 font-mono">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-slate-500 mb-3 line-clamp-1">
                  {item.titleZh}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 font-bold text-[11px] truncate max-w-[130px]">
                  {item.topic}
                </span>

                <div className="flex items-center space-x-1">
                  {isCompleted ? (
                    <span className="text-green-600 font-black flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="text-[10px]">已完成</span>
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[#FF6321] font-black flex items-center space-x-1">
                      <Play className="w-3.5 h-3.5 fill-[#FF6321]" />
                      <span className="text-[10px]">学习</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[10px]">解锁中</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Detailed Study Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-[#487E2C] rounded-[2.5rem] w-full max-w-3xl text-[#2D2D2D] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-6">
            
            {/* Modal Header */}
            <div className="bg-[#487E2C] p-6 border-b-4 border-[#355E20] flex items-center justify-between text-white">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#7CFC00] font-bold mb-1">
                  <span>Unit {activeLesson.unit}</span>
                  <span>•</span>
                  <span>Lesson {activeLesson.id}</span>
                  <span>•</span>
                  <span className="bg-black/20 px-2 py-0.5 rounded-full border border-white/20 text-white">
                    {activeLesson.minecraftScene}
                  </span>
                </div>
                <h2 className="text-2xl font-black font-mono">
                  {activeLesson.title} ({activeLesson.titleZh})
                </h2>
              </div>

              <button
                onClick={() => setActiveLesson(null)}
                className="bg-black/20 hover:bg-black/40 text-white px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border-2 border-white/30"
              >
                ✕ 关闭
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Target Sentences Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-3">
                <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span>核心句型挑战 (Target Sentences)</span>
                </h3>

                <div className="space-y-2">
                  {activeLesson.targetSentences.map((sentence, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-slate-200 shadow-sm"
                    >
                      <div>
                        <p className="text-base font-black font-mono text-[#2D2D2D]">
                          "{sentence}"
                        </p>
                        <p className="text-xs text-slate-500 font-bold mt-0.5">
                          {activeLesson.targetSentenceTranslations[idx]}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => speakText(sentence)}
                          className="p-2 bg-green-50 hover:bg-green-100 text-[#487E2C] border-2 border-[#487E2C] rounded-xl transition-colors shadow-sm"
                          title="朗读示范发音"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            playClickSound();
                            setOralTarget({
                              text: sentence,
                              translation: activeLesson.targetSentenceTranslations[idx]
                            });
                          }}
                          className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl border-2 border-amber-300 font-mono font-black text-[10px] flex items-center space-x-1 shadow-sm"
                          title="开启口语跟读发音评测"
                        >
                          <span>🎙️ 跟读测评</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Vocabulary */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
                  <span>📦 本课 Minecraft 核心词汇</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeLesson.vocabulary.map((vocab) => (
                    <div
                      key={vocab.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-start space-x-3 shadow-sm"
                    >
                      <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl border-2 border-slate-300 shadow-sm shrink-0">
                        {vocab.mcItemIcon || '🧱'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-base text-[#2D2D2D] font-mono">
                            {vocab.word}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {vocab.phonetic}
                          </span>
                        </div>
                        <p className="text-xs font-black text-[#FF6321] mb-1">
                          {vocab.meaning}
                        </p>
                        <p className="text-[11px] text-slate-600 italic line-clamp-1">
                          "{vocab.sampleSentence}"
                        </p>
                      </div>
                      <button
                        onClick={() => speakText(vocab.word)}
                        className="p-1.5 text-slate-400 hover:text-[#487E2C]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minecraft Roleplay Script */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-3">
                <h3 className="text-xs font-mono font-black text-[#487E2C] uppercase tracking-wider">
                  🎭 Minecraft 场景原声对话练习
                </h3>
                <div className="space-y-3">
                  {activeLesson.dialogueScript.map((turn, index) => (
                    <div key={index} className="flex items-start space-x-3 text-xs">
                      <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-lg shrink-0 shadow-sm">
                        {turn.avatar || (turn.speaker === 'Alex' ? '👩' : '👦')}
                      </div>
                      <div className="flex-1 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-black text-[#487E2C]">
                            {turn.speaker}
                          </span>
                          <button
                            onClick={() => speakText(turn.text)}
                            className="text-slate-400 hover:text-[#487E2C]"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-mono font-bold text-[#2D2D2D] text-xs mb-0.5">{turn.text}</p>
                        <p className="text-[11px] text-slate-500">{turn.translation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar Note */}
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-xs space-y-1">
                <span className="font-mono font-black text-amber-900 block">💡 语法秘籍 (Grammar Secret):</span>
                <p className="text-amber-800 font-bold">{activeLesson.grammarNote}</p>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  playEmeraldSound();
                  onCompleteLesson(activeLesson.id);
                }}
                className="w-full sm:w-auto bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-700 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Award className="w-4 h-4 text-[#FFD700]" />
                <span>标记本课完成 (+30 XP)</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  const currentL = activeLesson;
                  setActiveLesson(null);
                  onSelectLessonForChat(currentL);
                }}
                className="w-full sm:w-auto bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-3 rounded-2xl text-xs font-mono font-black flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#2A4718] transform hover:translate-y-0.5 active:translate-y-[4px] active:shadow-none"
              >
                <MessageSquare className="w-4 h-4" />
                <span>与 Alex 老师进入第 {activeLesson.id} 课实战对话！</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {oralTarget && (
        <OralEvaluationModal
          targetText={oralTarget.text}
          translation={oralTarget.translation}
          phonetic={oralTarget.phonetic}
          onClose={() => setOralTarget(null)}
          onAwardEmeralds={(emeralds, xp) => {
            if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
          }}
        />
      )}

    </div>
  );
};
