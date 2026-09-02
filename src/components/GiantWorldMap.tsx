import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Lesson } from '../types';
import { BIOME_CHAPTERS, BiomeChapter, getBiomeChapterByUnit } from '../data/storyData';
import { LessonStudyModal } from './LessonStudyModal';
import { MinecraftAvatar } from './MinecraftAvatar';
import { getFullLessonsCatalog, getLessonById } from '../data/lessonsData';
import { getVolumeProgress, hasLessonAccess, isVolumeFullyUnlocked, isLessonPaywallLocked, getLessonUnlockStatus, LessonUnlockStatus } from '../utils/volumeProgress';
import {
  Compass, Lock, Play, CheckCircle, Volume2, Sparkles, MessageSquare, BookOpen,
  Award, Star, MapPin, ZoomIn, ZoomOut, RefreshCw, Flame, Shield, Trophy, HelpCircle, X,
  LayoutGrid, ChevronLeft, ChevronRight, Zap, Layers
} from 'lucide-react';
import { playClickSound, speakText, playEmeraldSound, playBlockBreakSound, playAnvilSound } from '../utils/audio';

interface GiantWorldMapProps {
  profile: UserProfile;
  onSelectLessonForChat: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
  onOpenVipModal?: () => void;
}

interface MapNPC {
  id: string;
  unit: number;
  name: string;
  nameZh: string;
  avatar: string;
  locationName: string;
  greetingEn: string;
  greetingZh: string;
  triviaEn: string;
  triviaZh: string;
  rewardEmeralds: number;
}

const MAP_NPCS: MapNPC[] = [
  {
    id: 'npc_unit_1',
    unit: 1,
    name: 'Village Elder',
    nameZh: '村庄长老 · 艾伦',
    avatar: '👨‍🌾',
    locationName: '平原村庄广场',
    greetingEn: 'Welcome to Oak Village! "Excuse me, is this your handbag?"',
    greetingZh: '欢迎来到橡木村庄！“请问这是你的手提包吗？”',
    triviaEn: 'How do you say "请问" politely in English?',
    triviaZh: '用英语礼貌地表达“请问 / 打扰一下”该怎么说？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_2',
    unit: 2,
    name: 'Forest Guardian',
    nameZh: '森林护林员 · 莱恩',
    avatar: '🧝',
    locationName: '繁茂森林遗迹',
    greetingEn: 'Greetings adventurer! Are you a carpenter or an engineer?',
    greetingZh: '你好，探险者！你是一位木工还是一位工程师呢？',
    triviaEn: 'Complete the sentence: "Is he a miner?" - "Yes, ____ is."',
    triviaZh: '填空：“Is he a miner?” - “Yes, ____ is.”',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_3',
    unit: 3,
    name: 'Desert & Sea Captain',
    nameZh: '沙漠与深海航海家 · 德雷克',
    avatar: '🦈',
    locationName: '沙漠金字塔与深海神殿',
    greetingEn: 'Ahoy! We discovered ancient treasures in both pyramid and sunken ship!',
    greetingZh: '嗨，伙伴！我们在金字塔与沉船里都发现了远古宝藏！',
    triviaEn: 'Which preposition means "在...里面"? (on, in, or under)',
    triviaZh: '哪个介词表示“在...里面”？(on, in, 还是 under)',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_4',
    unit: 4,
    name: 'Redstone & Frost Explorer',
    nameZh: '红石工程师 · 凯文',
    avatar: '🚂',
    locationName: '废弃矿井与极寒雪山',
    greetingEn: 'All aboard the minecart! How many diamonds did you mine today?',
    greetingZh: '准备出发！你今天采掘了多少颗钻石？',
    triviaEn: 'Which word is used for plural countable items: "many" or "much"?',
    triviaZh: '对于可数名词复数，用 "many" 还是 "much"？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_5',
    unit: 5,
    name: 'Blaze & Sculk Guardian',
    nameZh: '下界要塞·烈焰领主',
    avatar: '👺',
    locationName: '下界熔岩要塞与深暗古城',
    greetingEn: 'If it gets too hot or dangerous, drink a fire resistance potion!',
    greetingZh: '如果感觉太热或遇到危险，就喝下一瓶抗火药水吧！',
    triviaEn: 'Which conjunction means "如果"?',
    triviaZh: '表示“如果”的英文连词是哪个？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_6',
    unit: 6,
    name: 'Teacher Alex',
    nameZh: '全服总导师 · Alex 老师',
    avatar: '🎓',
    locationName: '终末之城·毕业大舞台',
    greetingEn: 'Congratulations! You completed all 144 English lessons!',
    greetingZh: '热烈祝贺！你成功通关了全部 144 课英语核心课程！',
    triviaEn: 'What is the title of our textbook? "New _____ English Book 1"',
    triviaZh: '我们学习的经典教材名称是：《New _____ English Book 1》？',
    rewardEmeralds: 10
  }
];

const BIOME_CARD_STYLES: Record<number, { bg: string; border: string; headerGradient: string; badgeBg: string; decor: string }> = {
  1: { bg: 'bg-[#3e6f24]/95 text-white', border: 'border-[#224013]', headerGradient: 'from-[#487E2C] via-[#3E6F24] to-[#2D5218]', badgeBg: 'bg-[#5C8A2F]', decor: '🌳 🏡 🌾' },
  2: { bg: 'bg-[#15472B]/95 text-white', border: 'border-[#0C2D1B]', headerGradient: 'from-[#1E5C38] via-[#15472B] to-[#0D301C]', badgeBg: 'bg-[#2D6A4F]', decor: '🌲 🗿 🌿' },
  3: { bg: 'bg-[#B45309]/95 text-white', border: 'border-[#78350F]', headerGradient: 'from-[#D97706] via-[#B45309] to-[#78350F]', badgeBg: 'bg-[#D97706]', decor: '🏜️ 🌊 🐬' },
  4: { bg: 'bg-[#0369A1]/95 text-white', border: 'border-[#075985]', headerGradient: 'from-[#0284C7] via-[#0369A1] to-[#075985]', badgeBg: 'bg-[#0284C7]', decor: '⛏️ 🚂 ❄️' },
  5: { bg: 'bg-[#991B1B]/95 text-white', border: 'border-[#7F1D1D]', headerGradient: 'from-[#B91C1C] via-[#991B1B] to-[#7F1D1D]', badgeBg: 'bg-[#DC2626]', decor: '🔥 👺 👁️' },
  6: { bg: 'bg-[#1E1B4B]/95 text-white', border: 'border-[#0F172A]', headerGradient: 'from-[#312E81] via-[#1E1B4B] to-[#0F172A]', badgeBg: 'bg-[#4338CA]', decor: '🐉 👑 🎓' },
};

export const GiantWorldMap: React.FC<GiantWorldMapProps> = ({
  profile,
  onSelectLessonForChat,
  onCompleteLesson,
  onAwardEmeralds,
  onOpenVipModal
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [biomeNavMode, setBiomeNavMode] = useState<'grid' | 'scroll'>('grid'); // Default to grid for 100% full visibility of 1-6
  const [highlightedUnit, setHighlightedUnit] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 0.85, 1, 1.2
  const [showBgImage, setShowBgImage] = useState<boolean>(true);
  const [isDaylight, setIsDaylight] = useState<boolean>(true); // Default bright daylight Minecraft world
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeNPC, setActiveNPC] = useState<MapNPC | null>(null);
  const [npcQuizAnswered, setNpcQuizAnswered] = useState<boolean>(false);
  const [userQuizChoice, setUserQuizChoice] = useState<string | null>(null);
  const [breakingLessonId, setBreakingLessonId] = useState<number | null>(null);
  const [lockedNotice, setLockedNotice] = useState<{ lessonId: number; msg: string } | null>(null);

  const selectedVolId = profile.selectedVolumeId || 'vol1';
  const catalog = getFullLessonsCatalog(selectedVolId);
  const volProg = getVolumeProgress(profile, selectedVolId);
  const currentLessonId = volProg.currentLessonId;
  const unlockedLessonIds = volProg.unlockedLessonIds;
  const completedLessonIds = volProg.completedLessonIds;

  // Scroll to selected biome section
  const biomeSectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollNavRef = useRef<HTMLDivElement>(null);

  const handleJumpToUnit = (unitNum: number) => {
    playClickSound();
    setSelectedUnit(unitNum);
    setHighlightedUnit(unitNum);
    setTimeout(() => setHighlightedUnit(null), 3000);
    const el = biomeSectionRefs.current[unitNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleScrollNav = (direction: 'left' | 'right') => {
    playClickSound();
    if (scrollNavRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollNavRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOpenLessonDetail = (lessonId: number, status: LessonUnlockStatus) => {
    if (status.isPaywallLocked) {
      playClickSound();
      if (onOpenVipModal) onOpenVipModal();
      return;
    }

    if (status.isProgressionLocked) {
      playAnvilSound();
      setLockedNotice({
        lessonId,
        msg: status.lockReasonMsg
      });
      setTimeout(() => {
        setLockedNotice(null);
      }, 3500);
      return;
    }

    playBlockBreakSound();
    setBreakingLessonId(lessonId);
    setTimeout(() => setBreakingLessonId(null), 700);

    const lessonData = getLessonById(lessonId, selectedVolId);
    if (lessonData) {
      setActiveLesson(lessonData);
    }
  };

  const handleInteractNPC = (npc: MapNPC) => {
    playClickSound();
    setActiveNPC(npc);
    setNpcQuizAnswered(false);
    setUserQuizChoice(null);
    speakText(npc.greetingEn, { speaker: npc.name });
  };

  const handleSolveNPCQuiz = () => {
    if (npcQuizAnswered || !activeNPC) return;
    playEmeraldSound();
    setNpcQuizAnswered(true);
    if (onAwardEmeralds) {
      onAwardEmeralds(activeNPC.rewardEmeralds, 20);
    }
  };

  return (
    <div className="space-y-4 select-none">
      
      {/* MAP TOP CONTROLS & MINI HUD */}
      <div className="bg-white/95 border-4 border-black rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Player Coordinates & Status */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#487E2C] text-white border-2 border-black rounded-2xl flex items-center justify-center font-black shadow-xs text-xl">
            🧭
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black font-mono text-slate-900">
                我的世界 · 全景探险地图
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-mono font-black">
                6大核心生态领地
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              当前坐标：第 <span className="text-[#FF6321] font-black">{currentLessonId}</span> 关 • 
              已通关：<span className="text-emerald-700 font-black">{completedLessonIds.length}</span> / 144
            </p>
          </div>
        </div>

        {/* Right: Map View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Day/Night Lighting Switch */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsDaylight(!isDaylight);
            }}
            className={`px-3 py-1.5 rounded-xl border-2 font-mono text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              isDaylight
                ? 'bg-amber-100 border-amber-400 text-amber-900 hover:bg-amber-200'
                : 'bg-indigo-900 border-indigo-700 text-indigo-100 hover:bg-indigo-800'
            }`}
          >
            <span>{isDaylight ? '☀️ 白昼模式' : '🌙 极夜模式'}</span>
          </button>

          {/* Background Realistic Illustration Toggle */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowBgImage(!showBgImage);
            }}
            className={`px-3 py-1.5 rounded-xl border-2 font-mono text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
              showBgImage
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{showBgImage ? '🖼️ 实景贴图: 开' : '🧱 实景贴图: 关'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border-2 border-slate-300 space-x-1">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setZoomLevel(prev => Math.max(0.8, Number((prev - 0.1).toFixed(1))));
              }}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-700"
              title="缩小地图"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-black px-1 text-slate-700">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setZoomLevel(prev => Math.min(1.2, Number((prev + 0.1).toFixed(1))));
              }}
              className="p-1 hover:bg-slate-200 rounded-lg text-slate-700"
              title="放大地图"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* BIOME FAST TELEPORT NAVIGATOR DECK (Unit 1 - 6) */}
      <div className="bg-white/95 border-4 border-black rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] space-y-3.5">
        
        {/* Header with Title, Active Location, and Mode Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b-2 border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-8 h-8 bg-[#487E2C] text-white border-2 border-black rounded-xl flex items-center justify-center font-black shadow-xs text-sm">
              <Compass className="w-4 h-4 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black font-mono text-slate-900">
                  生态领地快捷传送
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-mono font-black">
                  Unit 1 - 6 全景覆盖
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono font-semibold">
                点击任意领地可立即定位至对应生态关卡（第 1 - 144 课）
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-center">
            {/* View Mode Toggle: Grid vs Scroll */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-300 flex items-center space-x-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setBiomeNavMode('grid');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center space-x-1 transition-all ${
                  biomeNavMode === 'grid'
                    ? 'bg-[#487E2C] text-white shadow-xs border border-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="6大生态全景平铺展示（Unit 1 至 Unit 6 全部一眼可见）"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>6领地平铺全览</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setBiomeNavMode('scroll');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black flex items-center space-x-1 transition-all ${
                  biomeNavMode === 'scroll'
                    ? 'bg-[#487E2C] text-white shadow-xs border border-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="单行横滑传送条"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>横滑条</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1~6 Quick Jump Number Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-mono font-black text-slate-500 shrink-0 flex items-center space-x-1 mr-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>直达:</span>
          </span>
          {BIOME_CHAPTERS.map(ch => {
            const isSelected = selectedUnit === ch.unit;
            const currentUnitNum = Math.min(6, Math.max(1, Math.ceil(profile.currentLessonId / 24)));
            const isPlayerHere = currentUnitNum === ch.unit;
            return (
              <button
                key={`pill-${ch.unit}`}
                type="button"
                onClick={() => handleJumpToUnit(ch.unit)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#487E2C] text-white border-black shadow-[0_2px_0_0_#000] scale-105'
                    : isPlayerHere
                    ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                }`}
                title={`Unit ${ch.unit}: ${ch.titleZh} (${ch.biomeNameZh})`}
              >
                <span>{ch.icon}</span>
                <span>U{ch.unit}</span>
                {isPlayerHere && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321] animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Display Container: Grid Mode or Scroll Mode */}
        {biomeNavMode === 'grid' ? (
          /* Responsive 6-card Grid: 6 cols on desktop */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 pt-1">
            {BIOME_CHAPTERS.map(ch => {
              const isActive = selectedUnit === ch.unit;
              const unitLessons = catalog.filter(l => l.unit === ch.unit);
              const unlockedIds = profile.unlockedLessonIds || [1];
              const completedCount = unitLessons.filter(l => l.id < profile.currentLessonId || unlockedIds.includes(l.id + 1)).length;
              const isUnitFinished = completedCount === 24;
              const currentUnitNum = Math.min(6, Math.max(1, Math.ceil(profile.currentLessonId / 24)));
              const isPlayerHere = currentUnitNum === ch.unit;

              return (
                <button
                  key={ch.unit}
                  type="button"
                  onClick={() => handleJumpToUnit(ch.unit)}
                  className={`p-2.5 rounded-xl sm:rounded-2xl border-2 font-mono text-left transition-all relative flex flex-col justify-between cursor-pointer active:translate-y-0.5 ${
                    isActive
                      ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#000] ring-2 ring-amber-300 scale-[1.02] z-10'
                      : isPlayerHere
                      ? 'bg-amber-50/90 border-[#FF6321] text-amber-950 shadow-sm hover:bg-amber-100'
                      : isUnitFinished
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                      : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xl sm:text-2xl leading-none">{ch.icon}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-black/30 text-white'
                        : isPlayerHere
                        ? 'bg-[#FF6321] text-white'
                        : isUnitFinished
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isPlayerHere ? '当前' : isUnitFinished ? '✓ 通关' : `${completedCount}/24`}
                    </span>
                  </div>

                  <div className="mt-1.5 space-y-0.5">
                    <p className={`font-black text-xs leading-tight ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      Unit {ch.unit}
                    </p>
                    <p className={`text-[10px] truncate ${isActive ? 'text-emerald-100 font-bold' : 'text-slate-500 font-medium'}`}>
                      {ch.biomeNameZh.split('·')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Horizontal Scroll Mode with Left/Right Arrows */
          <div className="relative group/scroll pt-1">
            <button
              type="button"
              onClick={() => handleScrollNav('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-slate-800 shadow-md hover:bg-amber-300 transition-all active:scale-90"
              title="向左滚动生态领地"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScrollNav('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-slate-800 shadow-md hover:bg-amber-300 transition-all active:scale-90"
              title="向右滚动生态领地 (直达 Unit 6)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={scrollNavRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 px-1 snap-x"
            >
              {BIOME_CHAPTERS.map(ch => {
                const isActive = selectedUnit === ch.unit;
                const unitLessons = catalog.filter(l => l.unit === ch.unit);
                const completedCount = unitLessons.filter(l => l.id < currentLessonId || completedLessonIds.includes(l.id)).length;
                const isUnitFinished = completedCount === 24;
                const currentUnitNum = Math.min(6, Math.max(1, Math.ceil(currentLessonId / 24)));
                const isPlayerHere = currentUnitNum === ch.unit;

                return (
                  <button
                    key={ch.unit}
                    type="button"
                    onClick={() => handleJumpToUnit(ch.unit)}
                    className={`snap-start shrink-0 px-3.5 py-2.5 rounded-xl border-2 font-mono text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#000] scale-105 font-black z-10'
                        : isPlayerHere
                        ? 'bg-amber-50 border-[#FF6321] text-amber-950 font-bold hover:bg-amber-100'
                        : isUnitFinished
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-lg">{ch.icon}</span>
                    <div className="text-left leading-tight">
                      <div className="flex items-center space-x-1">
                        <p className="font-bold whitespace-nowrap">Unit {ch.unit}</p>
                        {isPlayerHere && <span className="text-[9px] bg-[#FF6321] text-white px-1 py-0.2 rounded font-black">在此关</span>}
                      </div>
                      <p className={`text-[10px] whitespace-nowrap ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {ch.biomeNameZh.split('·')[0]} ({completedCount}/24)
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* GIANT WORLD CANVAS CONTAINER */}
      <div
        className={`relative border-4 border-black rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-8 overflow-x-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden ${
          isDaylight
            ? 'bg-gradient-to-b from-[#38bdf8] via-[#487e2c] via-[#3d6e23] to-[#244215]'
            : 'bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#090d16]'
        }`}
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center'
        }}
      >
        {/* Dynamic Sky Atmosphere Badges */}
        {isDaylight && (
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-0 opacity-80">
            <div className="flex items-center space-x-3 text-amber-300 font-mono font-black text-xs">
              <span className="text-4xl animate-spin" style={{ animationDuration: '30s' }}>☀️</span>
              <span className="bg-amber-300/20 text-amber-100 px-3 py-1 rounded-full border border-amber-300/40 backdrop-blur-sm">
                Minecraft 阳光平原大世界 • 6大生态领地全景
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-6 text-2xl text-white/70">
              <span className="animate-pulse">☁️</span>
              <span className="animate-pulse" style={{ animationDelay: '1s' }}>☁️</span>
              <span className="animate-pulse" style={{ animationDelay: '2s' }}>🦅</span>
            </div>
          </div>
        )}

        {/* Isometric Minecraft World Background Image Layer */}
        {showBgImage && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 transition-opacity duration-500">
            <img
              src="https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=2000&q=80"
              alt="Minecraft Isometric Grass Mountains Village World Map Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover mix-blend-overlay filter blur-[0.5px]"
            />
          </div>
        )}

        {/* Minecraft Pixel Backdrop Grid Pattern */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Continuous 6 Biome Regions Board */}
        <div className="relative space-y-16 max-w-5xl mx-auto py-10 z-10">
          
          {BIOME_CHAPTERS.map((ch) => {
            const unitLessons = catalog.filter(l => l.unit === ch.unit);
            const npc = MAP_NPCS.find(n => n.unit === ch.unit);
            const isUnitCurrent = profile.currentLessonId >= (ch.unit - 1) * 24 + 1 && profile.currentLessonId <= ch.unit * 24;
            const cardTheme = BIOME_CARD_STYLES[ch.unit] || BIOME_CARD_STYLES[1];

            const isHighlighted = highlightedUnit === ch.unit;

            return (
              <div
                key={ch.unit}
                ref={el => biomeSectionRefs.current[ch.unit] = el}
                className={`relative border-4 ${
                  isHighlighted
                    ? 'border-amber-400 ring-8 ring-amber-400/60 shadow-[0_0_45px_rgba(251,191,36,0.9)] scale-[1.01]'
                    : cardTheme.border
                } ${cardTheme.bg} rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500`}
              >
                {/* Floating Teleport Arrived Flash Notification Banner */}
                {isHighlighted && (
                  <div className="mb-6 p-3.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-4 border-black text-amber-950 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono font-black text-xs shadow-[4px_4px_0_0_#000] animate-bounce">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-amber-950 fill-amber-950 animate-pulse" />
                      <span className="text-sm">⚡ 快捷传送已抵达：Unit {ch.unit} • {ch.titleZh} ({ch.biomeNameZh})</span>
                    </div>
                    <span className="text-xs bg-black text-amber-300 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
                      包含第 {(ch.unit - 1) * 24 + 1} - {ch.unit * 24} 课
                    </span>
                  </div>
                )}

                {/* Biome Region Header Banner */}
                <div className={`p-4 sm:p-5 rounded-2xl border-4 border-black bg-gradient-to-r ${cardTheme.headerGradient} text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8`}>
                  
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 bg-black/40 border-3 border-white/30 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner">
                      {ch.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-black uppercase text-white px-2.5 py-0.5 rounded-full border border-black/40 ${cardTheme.badgeBg}`}>
                          Unit {ch.unit} • {ch.biomeName}
                        </span>
                        <span className="text-xs select-none">{cardTheme.decor}</span>
                      </div>
                      <h3 className="text-xl font-mono font-black text-white mt-0.5">
                        {ch.titleZh}
                      </h3>
                      <p className="text-xs text-amber-100 font-bold mt-1 max-w-xl">
                        📖 {ch.storyOverview}
                      </p>
                    </div>
                  </div>

                  {/* NPC Interaction Button on Biome Header */}
                  {npc && (
                    <button
                      type="button"
                      onClick={() => handleInteractNPC(npc)}
                      className="bg-amber-400 hover:bg-amber-300 text-amber-950 border-3 border-black px-4 py-2.5 rounded-2xl text-xs font-mono font-black flex items-center space-x-2 shadow-[0_4px_0_0_#78350F] active:translate-y-1 transition-transform shrink-0 cursor-pointer"
                    >
                      <span className="text-2xl animate-bounce">{npc.avatar}</span>
                      <div className="text-left">
                        <span className="block text-[10px] text-amber-900 font-bold">对话交头接耳</span>
                        <span className="block text-xs font-black">{npc.nameZh}</span>
                      </div>
                    </button>
                  )}

                </div>

                {/* Boss / Theme Banner */}
                <div className="bg-black/30 border-2 border-white/10 rounded-2xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-200">领地驻守首领:</span>
                    <span className="text-amber-300 font-black flex items-center space-x-1">
                      <span>{ch.bossIcon}</span>
                      <span>{ch.bossName}</span>
                    </span>
                  </div>

                  {isUnitCurrent && (
                    <span className="bg-[#FF6321] text-white px-2.5 py-0.5 rounded-full font-black text-[10px] animate-pulse">
                      ⚡ 当前主线正在此生态进行
                    </span>
                  )}
                </div>

                {/* 24 Lessons Grid Nodes inside this Biome */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
                  {unitLessons.map((item) => {
                    const unlockStatus = getLessonUnlockStatus(profile, selectedVolId, item.id);
                    const { isUnlocked, isCompleted, isCurrent, isPaywallLocked, isProgressionLocked } = unlockStatus;
                    const isTrial = selectedVolId === 'vol1' && item.id <= 20 && !isVolumeFullyUnlocked(profile, 'vol1');
                    const isBossNode = item.id % 24 === 0;
                    const isBreaking = breakingLessonId === item.id;

                    return (
                      <div key={item.id} className="relative flex flex-col items-center group">
                        
                        {/* Hover Tooltip Badge */}
                        {isUnlocked && (
                          <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform group-hover:-translate-y-1">
                            <div className="bg-amber-300 text-amber-950 font-mono font-black text-[10px] px-2.5 py-1 rounded-xl border-2 border-black shadow-lg flex items-center space-x-1 whitespace-nowrap">
                              <span>✨ 点击开启 L{item.id}</span>
                            </div>
                            <div className="w-2 h-2 bg-amber-300 rotate-45 -mt-1 mx-auto border-r border-b border-black" />
                          </div>
                        )}

                        {/* Steve Avatar Floating above Current Node */}
                        {isCurrent && (
                          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
                            <div className="bg-[#FF6321] text-white px-2 py-1 rounded-xl font-mono font-black text-[10px] shadow-md border-2 border-black flex items-center space-x-1.5 whitespace-nowrap">
                              <MinecraftAvatar speaker={profile.nickname || 'Steve'} size={18} />
                              <span>{profile.nickname || 'Steve'} 在此关</span>
                            </div>
                            <div className="w-2.5 h-2.5 bg-[#FF6321] rotate-45 -mt-1 border-r border-b border-black" />
                          </div>
                        )}

                        {/* Block Breaking Particles Burst Overlay */}
                        {isBreaking && (
                          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                            <div className="absolute w-3 h-3 bg-amber-400 border border-black animate-ping -translate-x-6 -translate-y-6" />
                            <div className="absolute w-2.5 h-2.5 bg-green-500 border border-black animate-ping translate-x-6 -translate-y-5" />
                            <div className="absolute w-3 h-3 bg-[#FF6321] border border-black animate-ping -translate-x-5 translate-y-6" />
                            <div className="absolute w-2.5 h-2.5 bg-yellow-300 border border-black animate-ping translate-x-6 translate-y-5" />
                            <div className="absolute w-3.5 h-3.5 bg-stone-300 border border-black animate-ping -translate-y-8" />
                            <div className="absolute w-3.5 h-3.5 bg-stone-600 border border-black animate-ping translate-y-8" />
                            <div className="absolute w-2 h-2 bg-amber-200 border border-black animate-ping -translate-x-8" />
                            <div className="absolute w-2 h-2 bg-emerald-400 border border-black animate-ping translate-x-8" />
                          </div>
                        )}

                        {/* Pixel Node Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenLessonDetail(item.id, unlockStatus)}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 font-mono flex flex-col items-center justify-center relative transition-all duration-300 transform ${
                            isBreaking ? 'scale-125 rotate-6 brightness-150' : ''
                          } ${
                            isCurrent
                              ? 'bg-[#FF6321] border-amber-300 text-white shadow-[0_6px_0_0_#992E00] ring-4 ring-amber-400 scale-105 z-20 group-hover:-translate-y-2 group-hover:scale-115 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.9)] group-hover:ring-amber-300 cursor-pointer'
                              : isPaywallLocked
                              ? 'bg-amber-950/80 border-amber-500/80 shadow-[0_5px_0_0_#451a03] text-amber-200 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-400 group-hover:z-30 cursor-pointer'
                              : isCompleted
                              ? 'bg-[#487E2C] border-[#2A4718] shadow-[0_5px_0_0_#182B0E] text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(72,126,44,0.9)] group-hover:ring-4 group-hover:ring-lime-300 group-hover:z-30 cursor-pointer'
                              : isUnlocked
                              ? 'bg-amber-600 border-amber-900 shadow-[0_5px_0_0_#542a02] text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-300 group-hover:z-30 cursor-pointer'
                              : 'bg-slate-900 border-slate-950 shadow-[0_4px_0_0_#020617] text-slate-500 hover:bg-slate-800 hover:border-slate-700 hover:text-slate-300 cursor-pointer opacity-75 active:scale-95'
                          }`}
                        >
                          {/* Top Pixel Bevel */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-xl pointer-events-none" />

                          {/* Boss Crown Badge */}
                          {isBossNode && (
                            <div className="absolute -top-2 -right-2 bg-amber-400 border border-black rounded-lg p-0.5 text-xs shadow-md">
                              👑
                            </div>
                          )}

                          {/* Trial Badge */}
                          {isTrial && (
                            <div className="absolute -top-2 -left-2 bg-emerald-500 border border-black rounded-lg px-1 py-0.2 text-[8px] font-black text-white shadow-md">
                              试学
                            </div>
                          )}

                          {/* Paywall Lock Badge */}
                          {isPaywallLocked && (
                            <div className="absolute -top-2 -left-2 bg-amber-500 border border-black rounded-lg px-1 py-0.2 text-[8px] font-black text-black shadow-md flex items-center space-x-0.5">
                              <Lock className="w-2 h-2" />
                              <span>VIP</span>
                            </div>
                          )}

                          {/* Progression Lock Badge */}
                          {isProgressionLocked && !isPaywallLocked && (
                            <div className="absolute -top-2 -left-2 bg-slate-800 border border-slate-600 rounded-lg px-1 py-0.2 text-[8px] font-mono font-bold text-slate-300 shadow-md flex items-center space-x-0.5">
                              <Lock className="w-2 h-2" />
                              <span>锁定</span>
                            </div>
                          )}

                          {isPaywallLocked ? (
                            <Lock className="w-4 h-4 text-amber-400 drop-shadow-md" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-amber-300 drop-shadow-md" />
                          ) : isCurrent ? (
                            <Compass className="w-5 h-5 text-white animate-spin-slow drop-shadow-md" />
                          ) : isUnlocked ? (
                            <Play className="w-4 h-4 fill-white text-white drop-shadow-md" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-500" />
                          )}

                          <span className="text-[11px] font-black font-mono mt-0.5 tracking-wider">
                            L{item.id}
                          </span>
                        </button>

                        {/* Title text under node */}
                        <div className="mt-1.5 text-center max-w-[100px] bg-black/70 border border-white/20 rounded-lg p-1">
                          <p className={`text-[10px] font-mono font-bold truncate ${isCurrent ? 'text-amber-300' : isPaywallLocked ? 'text-amber-300' : isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                            {item.title}
                          </p>
                          <p className="text-[9px] text-slate-300 truncate">
                            {item.titleZh}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Inter-Biome Portal Energy Conduit Bridge */}
                {ch.unit < 6 && (() => {
                  const isBridgeCompleted = profile.currentLessonId > ch.unit * 24;
                  const isBridgeActive = profile.currentLessonId >= (ch.unit - 1) * 24 + 1 && profile.currentLessonId <= ch.unit * 24;

                  return (
                    <div className="flex flex-col items-center justify-center -mb-8 mt-6 relative z-20">
                      <div className={`w-8 h-14 border-4 border-black rounded-2xl flex flex-col items-center justify-between p-1 shadow-lg transition-all duration-300 ${
                        isBridgeCompleted
                          ? 'bg-gradient-to-b from-lime-400 via-emerald-500 to-green-600 shadow-[0_0_20px_rgba(52,211,153,0.9)] animate-pulse'
                          : isBridgeActive
                          ? 'bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-bounce'
                          : 'bg-slate-900/90 border-slate-700 opacity-60'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${isBridgeCompleted ? 'bg-white shadow-[0_0_8px_white] animate-ping' : 'bg-slate-600'}`} />
                        <span className="text-xs">
                          {isBridgeCompleted ? '❇️' : isBridgeActive ? '⚡' : '🔒'}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${isBridgeCompleted ? 'bg-white shadow-[0_0_8px_white] animate-ping' : 'bg-slate-600'}`} />
                      </div>
                      <span className="text-[10px] font-mono font-black text-amber-300 bg-black/80 border border-amber-400/40 px-2 py-0.5 rounded-full mt-1 shadow-md">
                        {isBridgeCompleted ? `Unit ${ch.unit} 传送阵已开启 ⚡` : `通关 Unit ${ch.unit} 解锁下个领地`}
                      </span>
                    </div>
                  );
                })()}

              </div>
            );
          })}

        </div>

      </div>

      {/* LESSON DETAIL MODAL */}
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
            setActiveLesson(null);
            onSelectLessonForChat(lesson);
          }}
          onOpenVipModal={onOpenVipModal}
        />
      )}

      {/* NPC CHAT & TRIVIA MODAL */}
      {activeNPC && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-stone-900 via-neutral-900 to-black border-4 border-amber-500 rounded-3xl max-w-lg w-full p-6 text-white shadow-[0_0_40px_rgba(245,158,11,0.5)] relative font-mono space-y-4">
            
            <button
              type="button"
              onClick={() => setActiveNPC(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* NPC Header */}
            <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
              <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-400 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                {activeNPC.avatar}
              </div>
              <div>
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-black uppercase">
                  {activeNPC.locationName}
                </span>
                <h3 className="text-xl font-black text-amber-300 mt-1">
                  {activeNPC.nameZh}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {activeNPC.name}
                </p>
              </div>
            </div>

            {/* NPC Spoken Dialogue */}
            <div className="bg-black/60 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>NPC 问候寄语:</span>
                <button
                  type="button"
                  onClick={() => speakText(activeNPC.greetingEn, { speaker: activeNPC.name })}
                  className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>重听发音</span>
                </button>
              </div>
              <p className="text-sm font-bold text-white leading-relaxed">
                "{activeNPC.greetingEn}"
              </p>
              <p className="text-xs text-slate-300">
                {activeNPC.greetingZh}
              </p>
            </div>

            {/* NPC English Trivia Quest */}
            <div className="bg-gradient-to-r from-amber-950/60 to-stone-900 border-2 border-amber-500/40 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-amber-300">
                <span className="flex items-center space-x-1">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>领地英语小问答挑战</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  +{activeNPC.rewardEmeralds} ❇️ 绿宝石
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-white">{activeNPC.triviaEn}</p>
                <p className="text-slate-300">{activeNPC.triviaZh}</p>
              </div>

              {!npcQuizAnswered ? (
                <button
                  type="button"
                  onClick={handleSolveNPCQuiz}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 border-2 border-black text-white py-2.5 rounded-xl font-black text-xs flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#14532d] active:translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>给出回答，领取 {activeNPC.rewardEmeralds} 绿宝石！</span>
                </button>
              ) : (
                <div className="bg-emerald-900/60 border border-emerald-500/50 p-3 rounded-xl text-center text-xs text-emerald-200 font-bold flex items-center justify-center space-x-2 animate-bounce">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>已完成答题！获得 +{activeNPC.rewardEmeralds} 绿宝石 + 20 经验值！</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* PROGRESSION LOCK NOTICE TOAST */}
      {lockedNotice && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border-2 border-amber-500 text-white font-mono text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>{lockedNotice.msg}</span>
        </div>
      )}

    </div>
  );
};
