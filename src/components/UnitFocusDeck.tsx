import React, { useState, useRef } from 'react';
import { UserProfile, CourseVolumeId } from '../types';
import { BIOME_CHAPTERS, BiomeChapter, getBiomeChapterByUnit } from '../data/storyData';
import { getLessonById } from '../data/lessonsData';
import { playClickSound } from '../utils/audio';
import {
  Compass, CheckCircle2, Lock, Play, ChevronRight, ChevronLeft,
  Sparkles, Trophy, BookOpen, Layers, LayoutGrid, Zap
} from 'lucide-react';

interface UnitFocusDeckProps {
  selectedUnit: number; // 0 = all, 1..6
  onSelectUnit: (unit: number) => void;
  profile: UserProfile;
  selectedVolumeId: CourseVolumeId;
  onOpenLesson: (lessonId: number) => void;
}

export const UnitFocusDeck: React.FC<UnitFocusDeckProps> = ({
  selectedUnit,
  onSelectUnit,
  profile,
  selectedVolumeId,
  onOpenLesson
}) => {
  const [deckLayout, setDeckLayout] = useState<'grid' | 'scroll'>('grid');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // If selectedUnit is 0 (All), pick current player's unit or 1 for display
  const activeUnit = selectedUnit === 0 ? (Math.min(6, Math.max(1, Math.ceil((profile.currentLessonId || 1) / 24)))) : selectedUnit;
  const currentChapter: BiomeChapter = getBiomeChapterByUnit(activeUnit);
  const currentLessonId = profile.currentLessonId || 1;
  const completedList = profile.completedLessonIds || [];
  const unlockedList = profile.unlockedLessonIds || [1];

  const unitStartId = (activeUnit - 1) * 24 + 1;
  const unitEndId = activeUnit * 24;

  // Calculate unit completion
  const completedInUnit = completedList.filter(id => id >= unitStartId && id <= unitEndId).length;
  const unitProgress = Math.min(100, Math.round((completedInUnit / 24) * 100));

  // Determine if this unit is completely locked or active
  const isUnitUnlocked = activeUnit === 1 || unlockedList.some(id => id >= unitStartId);

  const handleScrollDeck = (direction: 'left' | 'right') => {
    playClickSound();
    if (scrollContainerRef.current) {
      const scrollDist = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollDist, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Biome Navigator Deck (6 Minecraft Biome Cards) */}
      <div className="bg-white/95 border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] space-y-3">
        
        {/* Header with Title & Mode Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5 px-1">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-[#487E2C] text-white border border-black rounded-lg flex items-center justify-center font-black shadow-xs text-xs">
              🗺️
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xs sm:text-sm font-black font-mono text-[#2D2D2D]">
                  选择探险生态领地 (Unit 1 - 6)
                </h3>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-full text-[10px] font-mono font-black">
                  6大核心单元全览
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            {/* View Mode Toggle: Grid vs Scroll */}
            <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-300 flex items-center space-x-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setDeckLayout('grid');
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black flex items-center space-x-1 transition-all ${
                  deckLayout === 'grid'
                    ? 'bg-[#487E2C] text-white shadow-xs border border-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="6大生态全景平铺展示"
              >
                <LayoutGrid className="w-3 h-3" />
                <span>6单元平铺</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setDeckLayout('scroll');
                }}
                className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black flex items-center space-x-1 transition-all ${
                  deckLayout === 'scroll'
                    ? 'bg-[#487E2C] text-white shadow-xs border border-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="单行滑动查看"
              >
                <Layers className="w-3 h-3" />
                <span>滑动</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick 1~6 Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-mono font-black text-slate-500 shrink-0 flex items-center space-x-1 mr-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>直达:</span>
          </span>
          {BIOME_CHAPTERS.map(ch => {
            const isSelected = activeUnit === ch.unit;
            const startId = (ch.unit - 1) * 24 + 1;
            const endId = ch.unit * 24;
            const isPlayerHere = currentLessonId >= startId && currentLessonId <= endId;
            return (
              <button
                key={`pill-deck-${ch.unit}`}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectUnit(ch.unit);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#487E2C] text-white border-black shadow-[0_2px_0_0_#2A4718] scale-105'
                    : isPlayerHere
                    ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{ch.icon}</span>
                <span>Unit {ch.unit}</span>
                {isPlayerHere && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321] animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Display Container: Grid Mode or Scroll Mode */}
        {deckLayout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
            {BIOME_CHAPTERS.map((ch) => {
              const isSelected = activeUnit === ch.unit;
              const startId = (ch.unit - 1) * 24 + 1;
              const endId = ch.unit * 24;
              const unitDone = completedList.filter(id => id >= startId && id <= endId).length;
              const isUnitFinished = unitDone === 24;
              const isPlayerHere = currentLessonId >= startId && currentLessonId <= endId;

              return (
                <button
                  key={ch.unit}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onSelectUnit(ch.unit);
                  }}
                  className={`relative p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between text-left cursor-pointer active:translate-y-0.5 ${
                    isSelected
                      ? 'bg-[#487E2C] text-white border-black shadow-[0_3px_0_0_#2A4718] scale-[1.02] z-10'
                      : isPlayerHere
                      ? 'bg-amber-50 border-[#FF6321] text-amber-950 shadow-xs hover:bg-amber-100'
                      : isUnitFinished
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xl">{ch.icon}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                      isSelected
                        ? 'bg-black/30 text-white'
                        : isPlayerHere
                        ? 'bg-[#FF6321] text-white'
                        : isUnitFinished
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isPlayerHere ? '当前' : isUnitFinished ? '✓' : `${unitDone}/24`}
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <p className={`font-black text-xs leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      Unit {ch.unit}
                    </p>
                    <p className={`text-[10px] font-mono truncate ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {ch.biomeNameZh.split('·')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="relative group/scroll pt-1">
            <button
              type="button"
              onClick={() => handleScrollDeck('left')}
              className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border-2 border-black rounded-full flex items-center justify-center text-slate-800 shadow-md hover:bg-amber-300 transition-all active:scale-90"
              title="向左滚动"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollDeck('right')}
              className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border-2 border-black rounded-full flex items-center justify-center text-slate-800 shadow-md hover:bg-amber-300 transition-all active:scale-90"
              title="向右滚动 (至 Unit 6)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-300 px-1 snap-x"
            >
              {BIOME_CHAPTERS.map((ch) => {
                const isSelected = activeUnit === ch.unit;
                const startId = (ch.unit - 1) * 24 + 1;
                const endId = ch.unit * 24;
                const unitDone = completedList.filter(id => id >= startId && id <= endId).length;
                const isUnitFinished = unitDone === 24;
                const isPlayerHere = currentLessonId >= startId && currentLessonId <= endId;

                return (
                  <button
                    key={ch.unit}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSelectUnit(ch.unit);
                    }}
                    className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 transition-all shrink-0 snap-start flex items-center space-x-2.5 cursor-pointer active:translate-y-0.5 ${
                      isSelected
                        ? 'bg-[#487E2C] text-white border-black shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718] scale-[1.02]'
                        : isPlayerHere
                        ? 'bg-amber-50 border-[#FF6321] text-amber-950 shadow-sm hover:bg-amber-100'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{ch.icon}</span>

                    <div className="text-left">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black font-mono">
                          Unit {ch.unit}
                        </span>
                        {isPlayerHere && (
                          <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-black ${isSelected ? 'bg-amber-400 text-black' : 'bg-[#FF6321] text-white'}`}>
                            当前所在
                          </span>
                        )}
                        {isUnitFinished && (
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-emerald-600'}`} />
                        )}
                      </div>
                      <p className={`text-[10px] font-mono truncate max-w-[100px] sm:max-w-[120px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {ch.biomeNameZh.split('·')[0]} ({unitDone}/24)
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Active Unit Stage Hero Card (Overview of the 24 lessons) */}
      <div className={`relative bg-gradient-to-r ${currentChapter.bgGradient} border-2 sm:border-4 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${currentChapter.badgeBg} text-white text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border border-black shadow-xs flex items-center space-x-1`}>
                <span>{currentChapter.icon}</span>
                <span>Unit {currentChapter.unit} · {currentChapter.titleZh}</span>
              </span>
              <span className="text-xs font-mono font-bold bg-white/80 border border-slate-300 px-2 py-0.5 rounded-lg text-slate-700">
                涵盖课程：第 {unitStartId} - {unitEndId} 课 (共 24 课)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black font-mono text-[#2D2D2D]">
              {currentChapter.biomeNameZh}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
              {currentChapter.storyOverview}
            </p>
          </div>

          {/* Unit Progress & Boss Stage Banner */}
          <div className="w-full md:w-64 bg-white/90 border-2 border-black/30 p-3 sm:p-3.5 rounded-2xl shrink-0 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono font-black text-slate-700">
              <span className="flex items-center space-x-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>领地探险进度</span>
              </span>
              <span className="text-[#487E2C] font-black">{completedInUnit}/24 课 ({unitProgress}%)</span>
            </div>

            {/* Block Progress Bar */}
            <div className="w-full h-3 bg-slate-200 border border-slate-400 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#487E2C] rounded-full transition-all duration-500"
                style={{ width: `${unitProgress}%` }}
              />
            </div>

            <div className="text-[11px] font-mono text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200">
              <span>领地首领守护:</span>
              <span className="font-black text-slate-800 flex items-center space-x-1">
                <span>{currentChapter.bossIcon}</span>
                <span>{currentChapter.bossName}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 24 Focused Lessons in this Unit (Clean Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {Array.from({ length: 24 }, (_, idx) => {
          const lessonId = unitStartId + idx;
          const lessonData = getLessonById(lessonId, selectedVolumeId);
          const isCompleted = completedList.includes(lessonId) || lessonId < currentLessonId;
          const isUnlocked = isCompleted || lessonId <= currentLessonId || unlockedList.includes(lessonId) || lessonId === 1;
          const isCurrent = lessonId === currentLessonId;
          const lessonStory = currentChapter.lessonsStory[lessonId] || `第 ${lessonId} 课探险任务`;

          return (
            <div
              key={lessonId}
              onClick={() => {
                if (isUnlocked) {
                  onOpenLesson(lessonId);
                }
              }}
              className={`rounded-2xl border-3 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isCurrent
                  ? 'bg-white border-[#FF6321] shadow-[6px_6px_0px_0px_rgba(255,99,33,0.3)] ring-2 ring-[#FF6321]/40 transform -translate-y-1'
                  : isCompleted
                  ? 'bg-white border-[#487E2C] hover:border-black shadow-[4px_4px_0px_0px_rgba(72,126,44,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transform hover:-translate-y-0.5'
                  : isUnlocked
                  ? 'bg-white border-slate-700 hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transform hover:-translate-y-0.5'
                  : 'bg-slate-100/90 border-slate-300 opacity-65 cursor-not-allowed shadow-none'
              }`}
            >
              {/* Top Banner Tag */}
              {isCurrent ? (
                <div className="absolute top-0 right-0 bg-[#FF6321] text-white font-mono font-black text-[10px] px-2.5 py-0.5 rounded-bl-xl shadow-xs">
                  ⚡ 当前主线
                </div>
              ) : isCompleted ? (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-bl-xl shadow-xs">
                  ✓ 已通关
                </div>
              ) : null}

              {/* Lesson ID & Difficulty */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-1">
                    <span>Lesson {lessonId}</span>
                    {lessonId % 2 === 0 && (
                      <span className="text-[9px] bg-sky-100 text-sky-800 border border-sky-300 px-1 py-0.2 rounded">
                        练习课
                      </span>
                    )}
                  </span>
                  
                  {!isCurrent && !isCompleted && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase bg-slate-100 text-slate-600 border border-slate-300">
                      {lessonData.difficulty}
                    </span>
                  )}
                </div>

                {/* Lesson Titles */}
                <h4 className="text-sm font-black text-[#2D2D2D] font-mono line-clamp-1">
                  {lessonData.title}
                </h4>
                <p className="text-xs font-bold text-slate-500 mt-0.5 line-clamp-1">
                  {lessonData.titleZh}
                </p>

                {/* Story Micro-Snippet */}
                <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 mt-2.5 line-clamp-2 leading-relaxed">
                  🗺️ {lessonStory}
                </p>
              </div>

              {/* Footer Action Bar */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 font-bold text-[11px] truncate max-w-[120px]">
                  {lessonData.topic}
                </span>

                <div>
                  {isCompleted ? (
                    <span className="text-emerald-700 font-black flex items-center space-x-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>复习</span>
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[#FF6321] font-black flex items-center space-x-1 text-[11px]">
                      <Play className="w-3.5 h-3.5 fill-[#FF6321]" />
                      <span>闯关</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center space-x-1 text-[11px]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>未解锁</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
