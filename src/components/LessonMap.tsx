import React, { useState, useRef, useEffect } from 'react';
import { Lesson, UserProfile, APP_VERSION_INFO, CourseVolumeId } from '../types';
import { getFullLessonsCatalog, getLessonById } from '../data/lessonsData';
import { BookOpen, Search, Volume2, Sparkles, CheckCircle, Lock, Play, MessageSquare, ChevronRight, ChevronLeft, Award, Map, LayoutGrid, Globe, Flame, AlertTriangle, Layers, Zap, Compass, Star } from 'lucide-react';
import { playClickSound, playEmeraldSound, speakText } from '../utils/audio';
import { OralEvaluationModal } from './OralEvaluationModal';
import { MinecraftAdventureMap } from './MinecraftAdventureMap';
import { GiantWorldMap } from './GiantWorldMap';
import { RandomAdventureModal, RANDOM_ADVENTURE_EVENTS, RandomEvent } from './RandomAdventureModal';

interface LessonMapProps {
  selectedVolumeId: CourseVolumeId;

  profile: UserProfile;
  onSelectLessonForChat: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
  onOpenVipModal?: () => void;
}

export const LessonMap: React.FC<LessonMapProps> = ({
  selectedVolumeId,
  profile,
  onSelectLessonForChat,
  onCompleteLesson,
  onAwardEmeralds,
  onOpenVipModal
}) => {
    const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'world' | 'map' | 'grid'>('world');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [oralTarget, setOralTarget] = useState<{ text: string; translation?: string; phonetic?: string } | null>(null);
  const [activeRandomEvent, setActiveRandomEvent] = useState<RandomEvent | null>(null);
  const [pendingEventAlert, setPendingEventAlert] = useState<RandomEvent | null>(null);

  // Timed trigger for random events
  useEffect(() => {
    const triggerRandomEvent = () => {
      const randomIndex = Math.floor(Math.random() * RANDOM_ADVENTURE_EVENTS.length);
      const evt = RANDOM_ADVENTURE_EVENTS[randomIndex];
      setPendingEventAlert(evt);
    };

    // Trigger initial event after 12s, then every 45s
    const firstTimer = setTimeout(triggerRandomEvent, 12000);
    const interval = setInterval(triggerRandomEvent, 45000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleManualTriggerEvent = () => {
    playClickSound();
    const randomIndex = Math.floor(Math.random() * RANDOM_ADVENTURE_EVENTS.length);
    const evt = RANDOM_ADVENTURE_EVENTS[randomIndex];
    setActiveRandomEvent(evt);
    setPendingEventAlert(null);
  };

  const unitNavRef = useRef<HTMLDivElement>(null);
  const unitTabRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const el = unitTabRefs.current[selectedUnit];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedUnit]);

  const handleScrollUnits = (direction: 'left' | 'right') => {
    if (unitNavRef.current) {
      const amount = direction === 'left' ? -220 : 220;
      unitNavRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const catalog = getFullLessonsCatalog(selectedVolumeId);

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
    // If lesson > 10 and user is NOT VIP, pop up VIP activation modal
    if (lessonId > 10 && !profile.isVip) {
      if (onOpenVipModal) {
        onOpenVipModal();
      }
      return;
    }
    playClickSound();
    // Retrieve authentic New Concept lesson definition for current volume
    const lessonData = getLessonById(lessonId, selectedVolumeId);
    setActiveLesson(lessonData);
  };

  const currentVolume = APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId) || APP_VERSION_INFO.volumes[0];

  return (
    <div className="space-y-6">

      {/* ===== 正规会员免费体验 10 课权益 Banner ===== */}
      {!profile.isVip && (
        <div className="p-3.5 bg-slate-900 border-4 border-slate-950 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] text-white flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-400/50 rounded-xl flex items-center justify-center text-xl shrink-0">
              🎁
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2 text-xs font-black text-emerald-400">
                <span>注册会员特权：前 10 课全量免费试用</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">
                  无需开卡
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                所有注册账号均享 <strong className="text-amber-300">第 1 - 10 课全量关卡与 AI 语音对练</strong>。第 11-144 课为 VIP 尊享关卡。
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              if (onOpenVipModal) onOpenVipModal();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs border-2 border-black rounded-xl shadow-[3px_3px_0_0_#000] shrink-0 transition-transform active:translate-y-0.5"
          >
            💎 升 VIP 畅学 144 课
          </button>
        </div>
      )}
      
      {/* Search & Unit Navigation */}
      <div className="bg-white/95 border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#487E2C] text-white border-2 border-black rounded-xl flex items-center justify-center font-bold shadow-sm shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-black font-mono text-[#2D2D2D]">
              《新概念英语第一册》144 课 Minecraft 冒险地图
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* View Switcher Controls */}
            <div className="bg-slate-100 p-1 rounded-xl border-2 border-slate-300 flex items-center space-x-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('world');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black flex items-center space-x-1.5 transition-all ${
                  viewMode === 'world'
                    ? 'bg-[#487E2C] text-white shadow-sm border border-black/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>全景大地图</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('map');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black flex items-center space-x-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-[#487E2C] text-white shadow-sm border border-black/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>卷轴线路图</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('grid');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black flex items-center space-x-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#487E2C] text-white shadow-sm border border-black/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>列表网格</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative flex-1 sm:w-56 min-w-[160px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索课程/主题/关键词..."
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-9 pr-3 py-1.5 sm:py-2 text-xs text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
              />
            </div>

            {/* Random Event Trigger Button */}
            <button
              type="button"
              onClick={handleManualTriggerEvent}
              className="px-3 py-1.5 sm:py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 border-2 border-black rounded-xl text-xs font-mono font-black flex items-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 shrink-0"
              title="立即触发随机探险突发事件"
            >
              <Flame className="w-3.5 h-3.5 text-red-700 animate-bounce" />
              <span>🎲 探险突发事件</span>
            </button>
          </div>
        </div>

        {/* Pending Random Event Alert Banner */}
        {pendingEventAlert && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 border-3 border-black text-amber-950 p-3 sm:p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black/20 border-2 border-black/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {pendingEventAlert.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-mono font-black uppercase text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-red-800" />
                  <span>地图突发探险危机告警！</span>
                </div>
                <p className="text-xs font-mono font-black text-amber-950 mt-0.5">
                  {pendingEventAlert.titleZh} — {pendingEventAlert.locationName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveRandomEvent(pendingEventAlert);
                setPendingEventAlert(null);
              }}
              className="bg-black text-amber-300 hover:bg-slate-900 border-2 border-black px-4 py-2 rounded-xl text-xs font-mono font-black flex items-center space-x-1 shadow-md shrink-0 active:translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>前往处理危机 (+{pendingEventAlert.rewardEmeralds} ❇️)</span>
            </button>
          </div>
        )}

        {/* Units Filter Buttons with Left/Right Scroll Arrow Controls & Auto Scroll */}
        <div className="relative flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => handleScrollUnits('left')}
            className="p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-xl text-slate-700 shrink-0 transition-colors shadow-sm active:translate-y-0.5"
            title="向左滑动 Unit 标签"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={unitNavRef}
            className="flex items-center space-x-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x snap-mandatory scroll-smooth flex-1 min-w-0"
          >
            <button
              ref={(el) => { unitTabRefs.current[0] = el; }}
              onClick={(e) => {
                playClickSound();
                setSelectedUnit(0);
                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-black whitespace-nowrap border-2 transition-all shrink-0 snap-start active:translate-y-0.5 ${
                selectedUnit === 0
                  ? 'bg-[#487E2C] border-black text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_3px_0_0_#2A4718]'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              全部 144 课
            </button>

            {Array.from({ length: 12 }, (_, i) => i + 1).map(uNum => (
              <button
                key={uNum}
                ref={(el) => { unitTabRefs.current[uNum] = el; }}
                onClick={(e) => {
                  playClickSound();
                  setSelectedUnit(uNum);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-black whitespace-nowrap border-2 transition-all shrink-0 snap-start active:translate-y-0.5 ${
                  selectedUnit === uNum
                    ? 'bg-[#487E2C] border-black text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_3px_0_0_#2A4718]'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Unit {uNum} (第 {(uNum - 1) * 12 + 1}-{uNum * 12} 课)
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleScrollUnits('right')}
            className="p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-xl text-slate-700 shrink-0 transition-colors shadow-sm active:translate-y-0.5"
            title="向右滑动 Unit 标签"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* View Mode Content: World Map vs Adventure Path vs Grid */}
      {viewMode === 'world' ? (
        <GiantWorldMap
          profile={profile}
          onSelectLessonForChat={onSelectLessonForChat}
          onCompleteLesson={onCompleteLesson}
          onAwardEmeralds={onAwardEmeralds}
          onOpenVipModal={onOpenVipModal}
        />
      ) : viewMode === 'map' ? (
        <MinecraftAdventureMap
          profile={profile}
          selectedUnit={selectedUnit}
          onSelectLesson={handleOpenLessonDetail}
          onStartChat={onSelectLessonForChat}
          onOralTest={(target) => setOralTarget(target)}
          onOpenVipModal={onOpenVipModal}
        />
      ) : (
        /* 144 Lessons Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-5">
          {filteredCatalog.map(item => {
            const isCompleted = item.id < profile.currentLessonId || (profile.unlockedLessonIds.includes(item.id) && profile.unlockedLessonIds.includes(item.id + 1));
            const isUnlocked = profile.unlockedLessonIds.includes(item.id) || item.id === 1 || item.id <= profile.currentLessonId || isCompleted;
            const isCurrent = profile.currentLessonId === item.id;
            const isVipLocked = item.id > 10 && !profile.isVip;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVipLocked) {
                    if (onOpenVipModal) onOpenVipModal();
                  } else if (isUnlocked) {
                    handleOpenLessonDetail(item.id);
                  }
                }}
                className={`rounded-3xl border-4 p-4 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-[#FF6321] shadow-[8px_8px_0px_0px_rgba(255,99,33,0.25)] ring-2 ring-[#FF6321]/50 transform hover:-translate-y-1'
                    : isVipLocked
                    ? 'bg-amber-50/70 border-amber-400 hover:border-amber-600 shadow-[6px_6px_0px_0px_rgba(217,119,6,0.15)] transform hover:-translate-y-1'
                    : isUnlocked
                    ? 'bg-white border-[#487E2C] hover:border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.12)] transform hover:-translate-y-1'
                    : 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed shadow-none'
                }`}
              >
                {/* Badge Overlay */}
                {isCurrent && (
                  <div className="absolute top-0 right-0 bg-[#FF6321] text-white font-mono font-black text-[10px] px-2.5 py-0.5 rounded-bl-xl shadow-sm uppercase tracking-wider">
                    当前关卡
                  </div>
                )}

                {isVipLocked && !isCurrent && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono font-black text-[10px] px-2 py-0.5 rounded-bl-xl shadow-sm uppercase tracking-wider flex items-center gap-1">
                    💎 VIP 关卡
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
      )}

      {/* Lesson Detailed Study Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto pt-safe pb-safe">
          <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-3xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
            
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

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
              
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

      {activeRandomEvent && (
        <RandomAdventureModal
          event={activeRandomEvent}
          onClose={() => setActiveRandomEvent(null)}
          onAwardEmeralds={(emeralds, xp) => {
            if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
          }}
        />
      )}

    </div>
  );
};
