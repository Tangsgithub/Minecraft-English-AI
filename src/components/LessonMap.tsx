import React, { useState, useRef, useEffect } from 'react';
import { Lesson, UserProfile, APP_VERSION_INFO, CourseVolumeId } from '../types';
import { getFullLessonsCatalog, getLessonById } from '../data/lessonsData';
import { getBiomeChapterByUnit } from '../data/storyData';
import { getVolumeProgress, hasLessonAccess, isVolumeFullyUnlocked, isLessonPaywallLocked, getLessonUnlockStatus, LessonUnlockStatus } from '../utils/volumeProgress';
import {
  BookOpen, Search, Volume2, Sparkles, CheckCircle, Lock, Play,
  MessageSquare, ChevronRight, ChevronLeft, Award, Map, LayoutGrid,
  Globe, Flame, Zap, Compass, Star, ArrowRight, CheckCircle2, Headphones, Key
} from 'lucide-react';
import { playClickSound, playEmeraldSound, speakText, playAnvilSound } from '../utils/audio';
import { OralEvaluationModal } from './OralEvaluationModal';
import { MinecraftAdventureMap } from './MinecraftAdventureMap';
import { GiantWorldMap } from './GiantWorldMap';
import { LessonStudyModal } from './LessonStudyModal';
import { MinecraftAvatar } from './MinecraftAvatar';

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
  const volProg = getVolumeProgress(profile, selectedVolumeId);
  const currentLessonId = volProg.currentLessonId;
  const unlockedList = volProg.unlockedLessonIds;
  const completedList = volProg.completedLessonIds;

  // Default to current player's unit, or Unit 1
  const initialUnit = Math.min(12, Math.max(1, Math.ceil(currentLessonId / 12)));
  const [selectedUnit, setSelectedUnit] = useState<number>(initialUnit);
  const [viewMode, setViewMode] = useState<'grid' | 'world' | 'map'>('grid'); // Default to clean, efficient grid
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [oralTarget, setOralTarget] = useState<{ text: string; translation?: string; phonetic?: string } | null>(null);

  const [lockedNotice, setLockedNotice] = useState<{ lessonId: number; msg: string } | null>(null);

  const currentLesson = getLessonById(currentLessonId, selectedVolumeId);
  const currentUnitNum = Math.min(12, Math.max(1, Math.ceil(currentLessonId / 12)));
  const currentBiome = getBiomeChapterByUnit(currentUnitNum);
  const hasCurrentLessonAccess = hasLessonAccess(profile, selectedVolumeId, currentLesson.id);

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
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleZh.includes(searchQuery) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString() === searchQuery.trim();
    return matchesUnit && matchesSearch;
  });

  const handleOpenLessonDetail = (lessonId: number) => {
    if (!hasLessonAccess(profile, selectedVolumeId, lessonId)) {
      playClickSound();
      if (onOpenVipModal) onOpenVipModal();
      return;
    }
    playClickSound();
    const lessonData = getLessonById(lessonId, selectedVolumeId);
    setActiveLesson(lessonData);
  };

  const handlePlayVoice = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playClickSound();
    speakText(text, { lang: 'en-US' });
  };

  const currentVolume = APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId) || APP_VERSION_INFO.volumes[0];

  return (
    <div className="space-y-4">
      
      {/* 1. Concise, High-Efficiency "Continue Learning" Quick-Action Hero Bar */}
      <div className="bg-gradient-to-r from-[#244318] via-[#355E20] to-[#1E3314] border-2 sm:border-3 border-black rounded-2xl p-3.5 sm:p-4 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative shrink-0">
            <MinecraftAvatar speaker="Alex" size={44} className="shadow-md" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border border-black flex items-center justify-center text-[9px] font-black text-black">
              ✓
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-black text-[10px] font-mono font-black px-1.5 py-0.2 rounded uppercase">
                当前主线
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold truncate">
                Unit {currentUnitNum} · {currentBiome.biomeNameZh}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black font-mono text-amber-200 truncate mt-0.5">
              Lesson {currentLesson.id}: {currentLesson.title}
              <span className="text-slate-300 text-xs font-normal ml-1.5 hidden md:inline font-sans">
                ({currentLesson.titleZh})
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
          {hasCurrentLessonAccess ? (
            <button
              type="button"
              onClick={() => handleOpenLessonDetail(currentLesson.id)}
              className="flex-1 sm:flex-none bg-[#FF6321] hover:bg-[#ff7a42] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black border border-black flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>进入学习 (第 {currentLesson.id} 课)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                if (onOpenVipModal) onOpenVipModal();
              }}
              className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black border border-black flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>激活 VIP 解锁第 {currentLesson.id} 课</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (!hasCurrentLessonAccess) {
                playClickSound();
                if (onOpenVipModal) onOpenVipModal();
                return;
              }
              onSelectLessonForChat(currentLesson);
            }}
            className="bg-black/40 hover:bg-black/60 text-emerald-300 border border-emerald-500/40 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1 shrink-0 cursor-pointer"
            title="与 Alex 老师练习本课口语"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI 对练</span>
          </button>
        </div>
      </div>

      {/* 2. Streamlined Controls & Unit Selector Ribbon */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
        
        {/* Top Control Bar: Volume Title, View Modes & Fast Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-black font-mono text-slate-800 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-[#487E2C]" />
              <span>{currentVolume.title}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">共 144 课</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex items-center space-x-0.5 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('grid');
                }}
                className={`px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#487E2C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>课程列表</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('world');
                }}
                className={`px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                  viewMode === 'world'
                    ? 'bg-[#487E2C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>全景地图</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('map');
                }}
                className={`px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                  viewMode === 'map'
                    ? 'bg-[#487E2C] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>卷轴路标</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative flex-1 sm:w-48 min-w-[140px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索课程/单词..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-2.5 py-1 text-xs text-slate-800 font-mono font-medium focus:border-[#487E2C] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Unit Selection Strip */}
        <div className="flex items-center space-x-1 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleScrollUnits('left')}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 shrink-0"
            title="向左"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={unitNavRef}
            className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none snap-x flex-1 min-w-0"
          >
            <button
              ref={(el) => { unitTabRefs.current[0] = el; }}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedUnit(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-black whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                selectedUnit === 0
                  ? 'bg-[#487E2C] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              全部 (1-144)
            </button>

            {Array.from({ length: 12 }, (_, i) => i + 1).map(uNum => {
              const ch = getBiomeChapterByUnit(uNum);
              const isSelected = selectedUnit === uNum;
              const isCurrentUnit = currentUnitNum === uNum;
              const uStart = (uNum - 1) * 12 + 1;
              const uEnd = uNum * 12;
              const uDone = completedList.filter(id => id >= uStart && id <= uEnd).length;

              return (
                <button
                  key={uNum}
                  ref={(el) => { unitTabRefs.current[uNum] = el; }}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedUnit(uNum);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#487E2C] text-white shadow-xs font-black'
                      : isCurrentUnit
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{ch.icon}</span>
                  <span>Unit {uNum}</span>
                  {uDone > 0 && (
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                      ({uDone}/12)
                    </span>
                  )}
                  {isCurrentUnit && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => handleScrollUnits('right')}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 shrink-0"
            title="向右"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main Display Area: Clean Grid (Default) or Map View */}
      {viewMode === 'grid' ? (
        <div className="space-y-3">
          {/* Header info if filtering by unit */}
          {selectedUnit > 0 && (
            <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="text-base">{getBiomeChapterByUnit(selectedUnit).icon}</span>
                <span className="font-bold text-slate-900">
                  Unit {selectedUnit}: {getBiomeChapterByUnit(selectedUnit).titleZh}
                </span>
                <span className="text-slate-500 font-medium">
                  ({getBiomeChapterByUnit(selectedUnit).biomeNameZh})
                </span>
              </div>
              <span className="text-slate-500">第 {(selectedUnit - 1) * 12 + 1} - {selectedUnit * 12} 课</span>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {filteredCatalog.map(item => {
              const unlockStatus = getLessonUnlockStatus(profile, selectedVolumeId, item.id);
              const { isUnlocked, isCompleted, isCurrent, isPaywallLocked, isProgressionLocked } = unlockStatus;
              const isTrial = selectedVolumeId === 'vol1' && item.id <= 20 && !isVolumeFullyUnlocked(profile, 'vol1');

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isPaywallLocked) {
                      playClickSound();
                      if (onOpenVipModal) onOpenVipModal();
                      return;
                    }
                    if (isProgressionLocked) {
                      playAnvilSound();
                      setLockedNotice({
                        lessonId: item.id,
                        msg: unlockStatus.lockReasonMsg
                      });
                      setTimeout(() => setLockedNotice(null), 3500);
                      return;
                    }
                    handleOpenLessonDetail(item.id);
                  }}
                  className={`rounded-xl border-2 p-3 sm:p-3.5 transition-all flex flex-col justify-between cursor-pointer relative ${
                    isCurrent
                      ? 'bg-amber-50/60 border-[#FF6321] shadow-sm hover:shadow-md scale-[1.01]'
                      : isPaywallLocked
                      ? 'bg-amber-50/20 border-amber-300/80 hover:border-amber-500 hover:shadow-sm'
                      : isUnlocked
                      ? 'bg-white border-slate-300 hover:border-[#487E2C] hover:shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60 cursor-pointer hover:border-slate-400'
                  }`}
                >
                  {/* Top Bar: Lesson ID & Badges */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span className={`text-xs font-mono font-black ${isCurrent ? 'text-[#FF6321]' : isPaywallLocked ? 'text-amber-700' : isUnlocked ? 'text-[#487E2C]' : 'text-slate-500'}`}>
                        Lesson {item.id}
                      </span>
                      {isCurrent && (
                        <span className="bg-[#FF6321] text-white text-[9px] font-mono font-black px-1.5 py-0.2 rounded">
                          当前
                        </span>
                      )}
                      {isTrial && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                          🆓 试学
                        </span>
                      )}
                      {isPaywallLocked && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-mono font-black px-1.5 py-0.2 rounded flex items-center space-x-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>需激活</span>
                        </span>
                      )}
                      {isProgressionLocked && !isPaywallLocked && (
                        <span className="bg-slate-200 text-slate-700 border border-slate-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded flex items-center space-x-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>未解锁</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      {isUnlocked && (
                        <button
                          type="button"
                          onClick={(e) => handlePlayVoice(e, item.title)}
                          className="p-1 rounded-md text-slate-400 hover:text-[#487E2C] hover:bg-slate-100"
                          title="听标题发音"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {item.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Lesson Titles */}
                  <div className="my-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-mono line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {item.titleZh}
                    </p>
                  </div>

                  {/* Bottom: Topic & Action */}
                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 truncate max-w-[120px] text-[11px]">
                      {item.topic}
                    </span>

                    <div>
                      {isPaywallLocked ? (
                        <span className="text-amber-700 font-bold flex items-center space-x-0.5 text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>激活解锁</span>
                        </span>
                      ) : isCompleted ? (
                        <span className="text-emerald-600 font-bold flex items-center space-x-0.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>已学完</span>
                        </span>
                      ) : isUnlocked ? (
                        <span className="text-[#FF6321] font-black flex items-center space-x-0.5 text-[11px]">
                          <Play className="w-3 h-3 fill-current" />
                          <span>开始</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center space-x-0.5 text-[11px]">
                          <Lock className="w-3 h-3" />
                          <span>前课未完</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : viewMode === 'world' ? (
        <GiantWorldMap
          profile={profile}
          onSelectLessonForChat={onSelectLessonForChat}
          onCompleteLesson={onCompleteLesson}
          onAwardEmeralds={onAwardEmeralds}
          onOpenVipModal={onOpenVipModal}
        />
      ) : (
        <MinecraftAdventureMap
          profile={profile}
          selectedUnit={selectedUnit === 0 ? 1 : selectedUnit}
          onSelectLesson={handleOpenLessonDetail}
          onStartChat={onSelectLessonForChat}
          onOralTest={(target) => setOralTarget(target)}
          onOpenVipModal={onOpenVipModal}
        />
      )}

      {/* Modals */}
      {activeLesson && (
        <LessonStudyModal
          lesson={activeLesson}
          profile={profile}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={(lessonId) => {
            if (onCompleteLesson) {
              onCompleteLesson(lessonId);
            }
          }}
          onStartPractice={(lesson) => {
            if (onCompleteLesson) {
              onCompleteLesson(lesson.id);
            }
            setActiveLesson(null);
            onSelectLessonForChat(lesson);
          }}
          onAwardEmeralds={onAwardEmeralds}
          onOpenVipModal={onOpenVipModal}
        />
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

      {/* Progression Lock Guidance Toast */}
      {lockedNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-slate-950/95 border-2 border-amber-500 text-amber-200 px-5 py-3 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.8)] font-mono text-xs sm:text-sm font-black flex items-center space-x-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{lockedNotice.msg}</span>
            <button
              type="button"
              onClick={() => setLockedNotice(null)}
              className="ml-2 text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700"
            >
              知道了
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
