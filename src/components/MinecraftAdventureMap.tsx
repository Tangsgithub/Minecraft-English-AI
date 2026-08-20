import React, { useState, useRef, useEffect } from 'react';
import { Lesson, UserProfile } from '../types';
import { BiomeChapter, getBiomeChapterByUnit, getBiomeChapterByLesson } from '../data/storyData';
import { MinecraftAvatar } from './MinecraftAvatar';
import { getFullLessonsCatalog, getLessonById } from '../data/lessonsData';
import { getVolumeProgress, isVolumeFullyUnlocked, getLessonUnlockStatus, LessonUnlockStatus } from '../utils/volumeProgress';
import {
  Lock, CheckCircle, Sparkles, Volume2, MessageSquare, Play,
  ChevronRight, Award, Trophy, MapPin, Compass, Shield, Flame,
  HelpCircle, Zap, BookOpen
} from 'lucide-react';
import { speakText, playClickSound, playBlockBreakSound, playAnvilSound } from '../utils/audio';

interface MinecraftAdventureMapProps {
  profile: UserProfile;
  selectedUnit: number;
  onSelectLesson: (lessonId: number) => void;
  onStartChat: (lesson: Lesson) => void;
  onOralTest?: (lesson: Lesson) => void;
  onOpenVipModal?: () => void;
}

interface BiomeStyle {
  name: string;
  nameZh: string;
  bgGradient: string;
  containerBg: string;
  blockBg: string;
  blockBorder: string;
  blockShadow: string;
  pathColor: string;
  activeRing: string;
  decorEmblems: string[];
  mobs: string[];
  bossEmblem: string;
  cardBannerBg: string;
  particleIcon: string;
}

const BIOME_THEMES: Record<number, BiomeStyle> = {
  1: {
    name: 'Oak Plains & Village',
    nameZh: '主世界·绿洲村庄',
    bgGradient: 'from-emerald-800 via-green-700 to-lime-800',
    containerBg: 'bg-[#1e3409]',
    blockBg: 'bg-[#5C8A2F]',
    blockBorder: 'border-[#35531B]',
    blockShadow: 'shadow-[0_8px_0_0_#233910]',
    pathColor: 'border-lime-500/80',
    activeRing: 'ring-lime-400',
    decorEmblems: ['🌳', '🏡', '🌾', '🪵', '🌻', '🪵'],
    mobs: ['👨‍🌾', '🐑', '🐔', '🐷'],
    bossEmblem: '🛡️ 掠夺者队长',
    cardBannerBg: 'bg-[#487E2C]',
    particleIcon: '🍃'
  },
  2: {
    name: 'Lush Forest & Jungle',
    nameZh: '茂密森林与丛林神庙',
    bgGradient: 'from-emerald-950 via-teal-900 to-green-950',
    containerBg: 'bg-[#0f2d1e]',
    blockBg: 'bg-[#2D6A4F]',
    blockBorder: 'border-[#173A2B]',
    blockShadow: 'shadow-[0_8px_0_0_#0D241A]',
    pathColor: 'border-emerald-400/80',
    activeRing: 'ring-emerald-300',
    decorEmblems: ['🌲', '🍄', '🌿', '🗿', '🌴'],
    mobs: ['🧝', '🦊', '🐺', '🦜'],
    bossEmblem: '🗿 丛林守护石像',
    cardBannerBg: 'bg-emerald-900',
    particleIcon: '🌿'
  },
  3: {
    name: 'Desert Temple & Ocean Ruins',
    nameZh: '烈日沙漠与深海遗迹',
    bgGradient: 'from-amber-800 via-teal-800 to-amber-900',
    containerBg: 'bg-[#3b1d03]',
    blockBg: 'bg-[#D97706]',
    blockBorder: 'border-[#854304]',
    blockShadow: 'shadow-[0_8px_0_0_#542a02]',
    pathColor: 'border-amber-400/80',
    activeRing: 'ring-amber-300',
    decorEmblems: ['🏜️', '🌵', '🏺', '🌊', '⛵', '🐬'],
    mobs: ['🐫', '🦈', '🦂', '🧜‍♂️'],
    bossEmblem: '🏺 远古法老与深海守卫者',
    cardBannerBg: 'bg-amber-800',
    particleIcon: '✨'
  },
  4: {
    name: 'Mineshaft & Ice Taiga',
    nameZh: '地下矿道与极寒雪原',
    bgGradient: 'from-sky-900 via-blue-900 to-indigo-950',
    containerBg: 'bg-[#0b2742]',
    blockBg: 'bg-[#0284C7]',
    blockBorder: 'border-[#034f78]',
    blockShadow: 'shadow-[0_8px_0_0_#02344f]',
    pathColor: 'border-sky-300/80',
    activeRing: 'ring-sky-200',
    decorEmblems: ['⛏️', '🚂', '💎', '❄️', '🏔️', '☃️'],
    mobs: ['🕷️', '☃️', '🐻‍❄️', '⚙️'],
    bossEmblem: '🧊 霜冻巨魔与矿洞蜘蛛皇',
    cardBannerBg: 'bg-sky-800',
    particleIcon: '❄️'
  },
  5: {
    name: 'Nether Fortress & Ancient City',
    nameZh: '下界熔岩要塞与深暗古城',
    bgGradient: 'from-rose-950 via-red-900 to-slate-950',
    containerBg: 'bg-[#330707]',
    blockBg: 'bg-[#991B1B]',
    blockBorder: 'border-[#590e0e]',
    blockShadow: 'shadow-[0_8px_0_0_#380808]',
    pathColor: 'border-rose-400/80',
    activeRing: 'ring-rose-300',
    decorEmblems: ['🔥', '🧱', '🧪', '👺', '👁️', '🕯️'],
    mobs: ['👹', '🔥', '💀', '👁️'],
    bossEmblem: '🔥 烈焰领主与喧嚣监守者',
    cardBannerBg: 'bg-rose-950',
    particleIcon: '🔥'
  },
  6: {
    name: 'The End & Grand Spire',
    nameZh: '末地龙巢与毕业大舞台',
    bgGradient: 'from-fuchsia-950 via-purple-900 to-black',
    containerBg: 'bg-[#17021c]',
    blockBg: 'bg-[#C026D3]',
    blockBorder: 'border-[#781485]',
    blockShadow: 'shadow-[0_8px_0_0_#4c0b54]',
    pathColor: 'border-fuchsia-400/80',
    activeRing: 'ring-fuchsia-300',
    decorEmblems: ['🏰', '🪽', '🎓', '🏆', '🎉', '🐉'],
    mobs: ['🎓', '🎉', '👑', '🐉'],
    bossEmblem: '🐉 末影龙 (Ender Dragon)',
    cardBannerBg: 'bg-fuchsia-950',
    particleIcon: '👑'
  }
};

export const MinecraftAdventureMap: React.FC<MinecraftAdventureMapProps> = ({
  profile,
  selectedUnit,
  onSelectLesson,
  onStartChat,
  onOralTest,
  onOpenVipModal
}) => {
  // Active selected lesson object for FIXED OVERLAY MODAL
  const [modalLesson, setModalLesson] = useState<Lesson | null>(null);
  const [breakingNodeId, setBreakingNodeId] = useState<number | null>(null);
  const [lockedNotice, setLockedNotice] = useState<{ lessonId: number; msg: string } | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLDivElement>(null);

  const currentVolId = profile.selectedVolumeId || 'vol1';
  const catalog = getFullLessonsCatalog(currentVolId);
  const volProg = getVolumeProgress(profile, currentVolId);
  const currentLessonId = volProg.currentLessonId;
  const unlockedLessonIds = volProg.unlockedLessonIds;
  const completedLessonIds = volProg.completedLessonIds;

  // Filter lessons based on selectedUnit (0 = all, 1-6 = unit 1-6)
  const displayLessons = catalog.filter(l => selectedUnit === 0 || l.unit === selectedUnit);

  const currentChapter: BiomeChapter = selectedUnit > 0
    ? getBiomeChapterByUnit(selectedUnit)
    : getBiomeChapterByLesson(currentLessonId);

  // Compute stats
  const completedInView = displayLessons.filter(l => {
    return l.id < currentLessonId || completedLessonIds.includes(l.id);
  }).length;
  const progressPercent = Math.round((completedInView / displayLessons.length) * 100) || 0;

  // Auto-scroll to current active node on mount/change
  useEffect(() => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedUnit, currentLessonId]);

  // Construct complete Lesson object with vocabulary and dialogues
  const getFullLessonObj = (lessonId: number): Lesson => {
    return getLessonById(lessonId, currentVolId);
  };

  const handleOpenNodeModal = (lessonId: number, status: LessonUnlockStatus) => {
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
    setBreakingNodeId(lessonId);
    setTimeout(() => setBreakingNodeId(null), 700);

    const lessonObj = getFullLessonObj(lessonId);
    setModalLesson(lessonObj);
  };

  const activeTheme = BIOME_THEMES[selectedUnit] || BIOME_THEMES[1];

  return (
    <div className="space-y-6 select-none">
      {/* Chapter Story Header Banner */}
      <div className={`p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border-4 border-black bg-gradient-to-r ${currentChapter.bgGradient} text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] relative overflow-hidden`}>
        {/* Background Pixel Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black/40 border-4 border-white/40 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg shrink-0 select-none animate-pulse">
              {currentChapter.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[11px] font-mono font-black text-white px-3 py-0.5 rounded-full ${currentChapter.badgeBg} border-2 border-black shadow-sm flex items-center space-x-1`}>
                  <span>Unit {currentChapter.unit}</span>
                  <span>•</span>
                  <span>{currentChapter.biomeNameZh}</span>
                </span>
                <span className="text-xs font-mono font-black text-amber-900 bg-amber-300 px-2.5 py-0.5 rounded-full border border-black/30 flex items-center space-x-1">
                  <span>{currentChapter.bossIcon}</span>
                  <span>{currentChapter.bossName}</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-mono drop-shadow-md">
                {currentChapter.titleZh}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-100/95 mt-1 max-w-2xl leading-relaxed drop-shadow-sm">
                📖 {currentChapter.storyOverview}
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full md:w-60 bg-black/40 border-3 border-white/30 rounded-2xl p-3 shadow-md shrink-0 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs font-mono font-black mb-1.5 text-white">
              <span className="flex items-center space-x-1">
                <Compass className="w-4 h-4 text-lime-400" />
                <span>冒险进度</span>
              </span>
              <span className="text-amber-300">{completedInView} / {displayLessons.length} 课</span>
            </div>
            <div className="w-full bg-black/50 h-3.5 rounded-full overflow-hidden border-2 border-white/20">
              <div
                className="bg-gradient-to-r from-lime-400 via-amber-300 to-amber-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-200 mt-1">
              <span>❇️ 宝石: {profile.emeralds || 0}</span>
              <span className="text-lime-300">通关率 {progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Minecraft World Map Stage Container */}
      <div
        ref={mapContainerRef}
        className={`relative ${activeTheme.containerBg} border-4 border-black rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] min-h-[650px] transition-colors duration-500`}
      >
        {/* Pixel Block Grid Backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Top HUD Legend */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b-2 border-white/10 text-white font-mono text-xs font-bold">
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-lime-400 animate-ping border border-white" />
            <span className="text-lime-300 text-sm font-mono font-black">
              🎮 Minecraft 2D 像素大世界地图 (6大生态领地)
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-amber-200 hidden sm:inline">点击关卡方块开启英语冒险对话与预习</span>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="px-2.5 py-1 bg-lime-700/80 border border-lime-400 rounded-lg text-white font-mono flex items-center space-x-1">
              <span>🟩</span>
              <span>已完成</span>
            </span>
            <span className="px-2.5 py-1 bg-amber-500 border border-amber-300 rounded-lg text-white font-mono animate-pulse flex items-center space-x-1">
              <span>🟧</span>
              <span>当前进度</span>
            </span>
            <span className="px-2.5 py-1 bg-black/60 border border-white/20 rounded-lg text-slate-400 font-mono flex items-center space-x-1">
              <span>⬛</span>
              <span>待解锁</span>
            </span>
          </div>
        </div>

        {/* Pathway Container */}
        <div className="relative max-w-4xl mx-auto py-6 space-y-14 z-10">
          {displayLessons.map((item, index) => {
            const unitNum = item.unit;
            const theme = BIOME_THEMES[unitNum] || BIOME_THEMES[1];
            const chapter = getBiomeChapterByUnit(unitNum);
            const storySnippet = chapter.lessonsStory[item.id] || `Steve 与 Alex 老师在 ${chapter.biomeNameZh} 展开第 ${item.id} 课对话。`;

            const unlockStatus = getLessonUnlockStatus(profile, currentVolId, item.id);
            const { isUnlocked, isCompleted, isCurrent, isPaywallLocked, isProgressionLocked } = unlockStatus;
            const isTrial = currentVolId === 'vol1' && item.id <= 20 && !isVolumeFullyUnlocked(profile, 'vol1');

            const isBossNode = item.id % 24 === 0;
            const isFirstInUnit = (item.id - 1) % 24 === 0;

            // Sinuous serpentine winding pathway calculation
            const stepMod = index % 6;
            let alignClass = 'justify-center';
            let offsetClass = '';
            if (stepMod === 1) {
              alignClass = 'justify-start md:pl-24';
              offsetClass = 'md:translate-x-6';
            } else if (stepMod === 2) {
              alignClass = 'justify-start md:pl-48';
              offsetClass = 'md:translate-x-12';
            } else if (stepMod === 4) {
              alignClass = 'justify-end md:pr-48';
              offsetClass = 'md:-translate-x-12';
            } else if (stepMod === 5) {
              alignClass = 'justify-end md:pr-24';
              offsetClass = 'md:-translate-x-6';
            }

            const decorItem = theme.decorEmblems[index % theme.decorEmblems.length];
            const decorMob = index % 3 === 0 ? theme.mobs[index % theme.mobs.length] : null;

            return (
              <div key={item.id} className="relative w-full">
                {/* Biome Divider Banner (When viewing all and arriving at unit start) */}
                {selectedUnit === 0 && isFirstInUnit && (
                  <div className="my-8 relative z-20">
                    <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-4 border-black bg-gradient-to-r ${chapter.bgGradient} text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-between`}>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <span className="text-3xl sm:text-4xl bg-black/30 p-2 rounded-2xl border-2 border-white/30">
                          {chapter.icon}
                        </span>
                        <div>
                          <span className={`text-[10px] font-mono font-black uppercase text-white px-2.5 py-0.5 rounded-full border border-black/40 ${chapter.badgeBg}`}>
                            Unit {chapter.unit} • {chapter.biomeName}
                          </span>
                          <h3 className="text-base sm:text-xl font-mono font-black text-white mt-1">
                            {chapter.titleZh}
                          </h3>
                          <p className="text-xs text-amber-100 font-bold hidden sm:block">
                            {chapter.storyOverview}
                          </p>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs hidden md:block">
                        <span className="text-amber-300 font-bold block">驻守首领</span>
                        <span className="text-white font-black">{chapter.bossIcon} {chapter.bossName}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sinuous Node Row */}
                <div className={`flex items-center ${alignClass} relative`}>
                  {/* Decorative Environmental Pixel Sprite on side */}
                  <div className="hidden sm:flex items-center space-x-2 text-2xl select-none opacity-80 pointer-events-none px-4">
                    <span>{decorItem}</span>
                    {decorMob && <span className="animate-bounce" style={{ animationDuration: '3s' }}>{decorMob}</span>}
                  </div>

                  {/* Main Block Node */}
                  <div
                    ref={isCurrent ? activeNodeRef : null}
                    className={`relative flex flex-col items-center transition-transform ${offsetClass}`}
                  >
                    {/* Steve Floating Head for Current Node */}
                    {isCurrent && (
                      <div className="absolute -top-16 z-30 flex flex-col items-center animate-bounce">
                        <div className="bg-[#FF6321] text-white border-2 border-black px-2.5 py-1 rounded-xl text-xs font-mono font-black shadow-lg flex items-center space-x-1.5 whitespace-nowrap">
                          <MinecraftAvatar speaker={profile.nickname || 'Steve'} size={20} />
                          <span>{profile.nickname || 'Steve'} 在这里！</span>
                        </div>
                        <div className="w-3 h-3 bg-[#FF6321] rotate-45 -mt-1.5 border-r-2 border-b-2 border-black" />
                      </div>
                    )}

                    {/* Block Node Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenNodeModal(item.id, unlockStatus)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 font-mono font-black flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 group cursor-pointer ${
                        breakingNodeId === item.id ? 'scale-125 rotate-6 brightness-150' : ''
                      } ${
                        isCurrent
                          ? 'bg-[#FF6321] border-amber-300 text-white shadow-[0_10px_0_0_#992E00] ring-4 ring-amber-400 scale-110 z-20 group-hover:-translate-y-2 group-hover:scale-120 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.9)]'
                          : isPaywallLocked
                          ? 'bg-amber-950/90 border-amber-500 shadow-[0_8px_0_0_#451a03] text-amber-200 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-400 group-hover:z-30'
                          : isCompleted
                          ? `${theme.blockBg} ${theme.blockBorder} ${theme.blockShadow} text-white group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(92,138,47,0.9)] group-hover:ring-4 group-hover:ring-lime-300 group-hover:z-30`
                          : isUnlocked
                          ? 'bg-amber-600 border-amber-900 shadow-[0_8px_0_0_#542a02] text-white group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-300 group-hover:z-30'
                          : 'bg-black/70 border-black shadow-[0_6px_0_0_#0a0a0a] text-slate-500 opacity-70 group-hover:opacity-90'
                      }`}
                    >
                      {/* Top Pixel Bevel */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 rounded-t-xl pointer-events-none" />

                      {/* Boss Crown Badge */}
                      {isBossNode && (
                        <div className="absolute -top-3 -right-3 bg-amber-400 border-2 border-black rounded-xl p-1 text-sm shadow-md animate-bounce">
                          👑
                        </div>
                      )}

                      {/* Trial Badge */}
                      {isTrial && (
                        <div className="absolute -top-3 -left-3 bg-emerald-500 border-2 border-black rounded-xl px-1.5 py-0.5 text-[9px] font-black text-white shadow-md">
                          试学
                        </div>
                      )}

                      {/* Paywall Lock Badge */}
                      {isPaywallLocked && (
                        <div className="absolute -top-3 -left-3 bg-amber-500 border-2 border-black rounded-xl px-1.5 py-0.5 text-[9px] font-black text-black shadow-md flex items-center space-x-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>VIP</span>
                        </div>
                      )}

                      {/* Progression Lock Badge */}
                      {isProgressionLocked && !isPaywallLocked && (
                        <div className="absolute -top-3 -left-3 bg-slate-900 border border-slate-700 rounded-xl px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-300 shadow-md flex items-center space-x-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>锁定</span>
                        </div>
                      )}

                      {/* Status Icon */}
                      <div className="mb-0.5">
                        {isPaywallLocked ? (
                          <Lock className="w-6 h-6 text-amber-400 drop-shadow-md" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-7 h-7 text-amber-300 drop-shadow-md" />
                        ) : isCurrent ? (
                          <Compass className="w-7 h-7 text-white animate-spin-slow drop-shadow-md" />
                        ) : isUnlocked ? (
                          <Play className="w-6 h-6 fill-white text-white drop-shadow-md" />
                        ) : (
                          <Lock className="w-6 h-6 text-slate-500" />
                        )}
                      </div>

                      {/* Lesson Number */}
                      <span className="text-xs sm:text-sm font-black tracking-wider">
                        L{item.id}
                      </span>
                    </button>

                    {/* Lesson Title & Dialogue Snippet Tag */}
                    <div className="mt-2.5 text-center max-w-[140px] bg-black/80 border-2 border-white/20 rounded-xl p-1.5 shadow-md">
                      <p className={`text-[11px] font-mono font-black truncate ${isCurrent ? 'text-amber-300' : isPaywallLocked ? 'text-amber-300' : isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-300 truncate font-bold">
                        {item.titleZh}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Chapter Boss Milestone Landmark Card */}
                {isBossNode && (
                  <div className="my-8 relative z-20">
                    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 border-4 border-black p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl bg-black/30 p-2.5 rounded-2xl border-2 border-white/30 animate-bounce">
                          {chapter.bossIcon}
                        </span>
                        <div>
                          <span className="bg-black/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black text-amber-200 uppercase tracking-wider border border-white/10">
                            Unit {chapter.unit} 终极首领答辩
                          </span>
                          <h4 className="text-lg font-mono font-black text-white mt-1">
                            击败 {chapter.bossName} • 解锁下一生态
                          </h4>
                          <p className="text-xs font-bold text-amber-100 mt-0.5">
                            完成前 24 课对话训练即可参与答辩，赢取限定勋章与 100 绿宝石！
                          </p>
                        </div>
                      </div>

                      <div className="bg-black/40 border-2 border-white/20 rounded-xl px-4 py-2 text-center text-xs font-mono shrink-0">
                        <span className="text-amber-300 font-bold block">通关最高赏金</span>
                        <span className="text-white font-black text-sm">❇️ 100 绿宝石 + 🏆 勋章</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FIXED TOP-LAYER MODAL FOR LESSON PREVIEW & ACTIONS */}
      {modalLesson && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border-4 border-black rounded-3xl w-full max-w-lg text-[#2D2D2D] shadow-[14px_14px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden my-auto max-h-[90dvh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#487E2C] p-4 sm:p-5 border-b-4 border-black text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black/30 border-2 border-white/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {getBiomeChapterByUnit(modalLesson.unit).icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-amber-300 font-bold">
                    <span>Unit {modalLesson.unit}</span>
                    <span>•</span>
                    <span>Lesson {modalLesson.id}</span>
                  </div>
                  <h3 className="text-lg font-black font-mono leading-tight">
                    {modalLesson.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-100">
                    {modalLesson.titleZh}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalLesson(null)}
                className="bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-xl font-mono text-base font-black border-2 border-white/30 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Scrollable Content */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              
              {/* Minecraft Scene Story */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center justify-between text-amber-900 font-mono font-black">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-[#FF6321]" />
                    <span>场景故事: {modalLesson.minecraftScene}</span>
                  </span>
                </div>
                <p className="text-amber-950 font-bold leading-relaxed text-[11px]">
                  {modalLesson.sceneDescription}
                </p>
              </div>

              {/* Target Sentences Preview */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[#487E2C] font-mono font-black">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>核心句型 Preview</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {modalLesson.targetSentences.map((sentence, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <p className="font-mono font-black text-[#2D2D2D] text-xs">
                          "{sentence}"
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold">
                          {modalLesson.targetSentenceTranslations[idx]}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakText(sentence)}
                        className="p-1.5 bg-green-50 hover:bg-green-100 text-[#487E2C] border border-[#487E2C] rounded-lg shrink-0 cursor-pointer"
                        title="播放语音"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minecraft Vocabulary Preview */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 space-y-2">
                <span className="font-mono font-black text-[#487E2C] block">
                  🧱 核心 Minecraft 词汇:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {modalLesson.vocabulary.map(v => (
                    <div key={v.id} className="p-2 bg-white rounded-xl border border-slate-300 flex items-center space-x-2">
                      <span className="text-xl">{v.mcItemIcon || '🧱'}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono font-black text-xs truncate">{v.word}</p>
                        <p className="text-[10px] text-[#FF6321] font-bold truncate">{v.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Action Buttons */}
            <div className="p-4 bg-slate-100 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const lessonId = modalLesson.id;
                  setModalLesson(null);
                  onSelectLesson(lessonId);
                }}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-black py-3 rounded-2xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#487E2C]" />
                <span>📖 预习课件与语法秘籍</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentL = modalLesson;
                  setModalLesson(null);
                  onStartChat(currentL);
                }}
                className="w-full bg-[#487E2C] hover:bg-[#355E20] text-white border-2 border-black py-3 rounded-2xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>💬 与 Alex 老师实战对话</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Locked Level Interactive Guidance Toast */}
      {lockedNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-slate-950/95 border-3 border-amber-500 text-amber-200 px-5 py-3 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.8)] font-mono text-xs sm:text-sm font-black flex items-center space-x-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{lockedNotice.msg}</span>
            <button
              type="button"
              onClick={() => setLockedNotice(null)}
              className="ml-2 text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700 cursor-pointer"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
