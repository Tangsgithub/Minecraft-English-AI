import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Lesson } from '../types';
import { BIOME_CHAPTERS, getBiomeChapterByUnit, getBiomeChapterByLesson, BiomeChapter } from '../data/storyData';
import { getFullLessonsCatalog, LESSONS_DATA } from '../data/lessonsData';
import {
  CheckCircle, Lock, Play, Sparkles, Volume2, MessageSquare, Compass,
  Award, Star, ChevronRight, BookOpen, Trophy, Flame, Shield, Flag, MapPin, Mic
} from 'lucide-react';
import { playClickSound, speakText, playBlockBreakSound } from '../utils/audio';

interface MinecraftAdventureMapProps {
  profile: UserProfile;
  selectedUnit: number;
  onSelectLesson: (lessonId: number) => void;
  onStartChat: (lesson: Lesson) => void;
  onOralTest?: (target: { text: string; translation?: string; phonetic?: string }) => void;
}

// Rich Minecraft Biome Theme Data
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
    name: 'Desert Temple & Oasis',
    nameZh: '烈日沙漠与金字塔遗迹',
    bgGradient: 'from-amber-800 via-yellow-700 to-amber-900',
    containerBg: 'bg-[#3b1d03]',
    blockBg: 'bg-[#D97706]',
    blockBorder: 'border-[#854304]',
    blockShadow: 'shadow-[0_8px_0_0_#542a02]',
    pathColor: 'border-amber-400/80',
    activeRing: 'ring-amber-300',
    decorEmblems: ['🏜️', '🌵', '🏺', '🕌', '📜'],
    mobs: ['🐫', '🐍', '🏜️', '🦂'],
    bossEmblem: '🏺 沙漠木乃伊王',
    cardBannerBg: 'bg-amber-800',
    particleIcon: '✨'
  },
  4: {
    name: 'Snowy Taiga & Ice Spikes',
    nameZh: '极寒雪原与冰刺峰',
    bgGradient: 'from-sky-900 via-blue-800 to-indigo-950',
    containerBg: 'bg-[#0b2742]',
    blockBg: 'bg-[#0284C7]',
    blockBorder: 'border-[#034f78]',
    blockShadow: 'shadow-[0_8px_0_0_#02344f]',
    pathColor: 'border-sky-300/80',
    activeRing: 'ring-sky-200',
    decorEmblems: ['❄️', '🏔️', '🪵', '🧊', '☃️'],
    mobs: ['☃️', '🐻‍❄️', '🐧', '🐺'],
    bossEmblem: '🧊 霜冻巨魔霸主',
    cardBannerBg: 'bg-sky-800',
    particleIcon: '❄️'
  },
  5: {
    name: 'Ocean Monument & Coral Reef',
    nameZh: '深海沉船与海底神殿',
    bgGradient: 'from-teal-950 via-cyan-900 to-blue-950',
    containerBg: 'bg-[#072a2e]',
    blockBg: 'bg-[#0D9488]',
    blockBorder: 'border-[#095750]',
    blockShadow: 'shadow-[0_8px_0_0_#053a36]',
    pathColor: 'border-teal-300/80',
    activeRing: 'ring-teal-200',
    decorEmblems: ['🌊', '⛵', '⚓', '🐬', '🦪'],
    mobs: ['🦈', '🐙', '🐠', '🧜‍♂️'],
    bossEmblem: '🔱 远古守卫者',
    cardBannerBg: 'bg-teal-900',
    particleIcon: '💧'
  },
  6: {
    name: 'Abandoned Mineshaft',
    nameZh: '地下大矿坑与红石铁道',
    bgGradient: 'from-amber-950 via-orange-950 to-stone-900',
    containerBg: 'bg-[#210e03]',
    blockBg: 'bg-[#78350F]',
    blockBorder: 'border-[#421d07]',
    blockShadow: 'shadow-[0_8px_0_0_#2b1304]',
    pathColor: 'border-amber-500/80',
    activeRing: 'ring-amber-400',
    decorEmblems: ['⛏️', '🚂', '💎', '🪙', '🕸️'],
    mobs: ['🕷️', '🦇', '⚙️', '🧟'],
    bossEmblem: '🕷️ 洞穴蜘蛛母体',
    cardBannerBg: 'bg-amber-950',
    particleIcon: '💎'
  },
  7: {
    name: 'Mushroom Fields',
    nameZh: '神秘蘑菇岛与孢子平原',
    bgGradient: 'from-purple-950 via-fuchsia-950 to-pink-950',
    containerBg: 'bg-[#280938]',
    blockBg: 'bg-[#7E22CE]',
    blockBorder: 'border-[#49127a]',
    blockShadow: 'shadow-[0_8px_0_0_#2f0a52]',
    pathColor: 'border-purple-300/80',
    activeRing: 'ring-purple-300',
    decorEmblems: ['🍄', '🌸', '🔮', '🥣', '✨'],
    mobs: ['🐮', '🍄', '🦋', '🧙‍♀️'],
    bossEmblem: '🍄 巨型蘑菇牛王',
    cardBannerBg: 'bg-purple-900',
    particleIcon: '✨'
  },
  8: {
    name: 'Ancient City & Sculk Realm',
    nameZh: '深暗古城与幽匿遗迹',
    bgGradient: 'from-[#0b132b] via-[#1c2541] to-[#0b132b]',
    containerBg: 'bg-[#080d1a]',
    blockBg: 'bg-[#1E293B]',
    blockBorder: 'border-[#0d1421]',
    blockShadow: 'shadow-[0_8px_0_0_#05080e]',
    pathColor: 'border-cyan-400/80',
    activeRing: 'ring-cyan-300',
    decorEmblems: ['🏛️', '👁️', '📜', '💎', '🕯️'],
    mobs: ['👻', '🦇', '💀', ' Warden'],
    bossEmblem: '👁️ 喧嚣监守者 (Warden)',
    cardBannerBg: 'bg-slate-950',
    particleIcon: '🌌'
  },
  9: {
    name: 'Nether Fortress',
    nameZh: '下界地狱要塞与岩浆湖',
    bgGradient: 'from-rose-950 via-red-900 to-amber-950',
    containerBg: 'bg-[#330707]',
    blockBg: 'bg-[#991B1B]',
    blockBorder: 'border-[#590e0e]',
    blockShadow: 'shadow-[0_8px_0_0_#380808]',
    pathColor: 'border-rose-400/80',
    activeRing: 'ring-rose-300',
    decorEmblems: ['🔥', '🧱', '🧪', '👺', '🌋'],
    mobs: ['👹', '🔥', '🐖', '💀'],
    bossEmblem: '🔥 烈焰人霸主',
    cardBannerBg: 'bg-rose-950',
    particleIcon: '🔥'
  },
  10: {
    name: 'Warped & Crimson Forest',
    nameZh: '诡异森林与紫晶迷宫',
    bgGradient: 'from-teal-950 via-emerald-900 to-teal-950',
    containerBg: 'bg-[#062423]',
    blockBg: 'bg-[#0D9488]',
    blockBorder: 'border-[#074741]',
    blockShadow: 'shadow-[0_8px_0_0_#042c28]',
    pathColor: 'border-teal-300/80',
    activeRing: 'ring-teal-200',
    decorEmblems: ['🔮', '🌌', '🎃', '💎', '🌿'],
    mobs: ['👽', '👁️', '👾', '🐗'],
    bossEmblem: '🔮 猪灵蛮兵大元帅',
    cardBannerBg: 'bg-teal-950',
    particleIcon: '🔮'
  },
  11: {
    name: 'Ender Stronghold',
    nameZh: '末地传送门与要塞地牢',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-950',
    containerBg: 'bg-[#1a082b]',
    blockBg: 'bg-[#581C87]',
    blockBorder: 'border-[#330f52]',
    blockShadow: 'shadow-[0_8px_0_0_#200933]',
    pathColor: 'border-purple-400/80',
    activeRing: 'ring-purple-300',
    decorEmblems: ['🐉', '💎', '🏹', '🔮', '🌌'],
    mobs: ['🐲', '🐲', '💥', '👁️'],
    bossEmblem: '👁️ 末影使者元老',
    cardBannerBg: 'bg-purple-950',
    particleIcon: '✨'
  },
  12: {
    name: 'The End & Dragon Spire',
    nameZh: '末地顶峰与终极龙巢',
    bgGradient: 'from-fuchsia-950 via-purple-900 to-black',
    containerBg: 'bg-[#17021c]',
    blockBg: 'bg-[#C026D3]',
    blockBorder: 'border-[#781485]',
    blockShadow: 'shadow-[0_8px_0_0_#4c0b54]',
    pathColor: 'border-fuchsia-400/80',
    activeRing: 'ring-fuchsia-300',
    decorEmblems: ['🏰', '🪽', '🎓', '🏆', '🎉'],
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
  onOralTest
}) => {
  // Active selected lesson object for FIXED OVERLAY MODAL
  const [modalLesson, setModalLesson] = useState<Lesson | null>(null);
  const [breakingNodeId, setBreakingNodeId] = useState<number | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const activeNodeRef = useRef<HTMLDivElement>(null);

  const catalog = getFullLessonsCatalog();

  // Filter lessons based on selectedUnit (0 = all 144, 1-12 = unit 1-12)
  const displayLessons = catalog.filter(l => selectedUnit === 0 || l.unit === selectedUnit);

  const currentChapter: BiomeChapter = selectedUnit > 0
    ? getBiomeChapterByUnit(selectedUnit)
    : getBiomeChapterByLesson(profile.currentLessonId);

  // Compute stats
  const completedInView = displayLessons.filter(l => {
    return l.id < profile.currentLessonId || (profile.unlockedLessonIds.includes(l.id) && profile.unlockedLessonIds.includes(l.id + 1));
  }).length;
  const progressPercent = Math.round((completedInView / displayLessons.length) * 100) || 0;

  // Auto-scroll to current active node on mount/change
  useEffect(() => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedUnit, profile.currentLessonId]);

  // Construct complete Lesson object with vocabulary and dialogues
  const getFullLessonObj = (lessonId: number): Lesson => {
    const found = LESSONS_DATA.find(l => l.id === lessonId);
    if (found) return found;

    const cat = catalog.find(c => c.id === lessonId);
    const unitNum = cat?.unit || 1;
    const chapter = getBiomeChapterByUnit(unitNum);
    const storySnippet = chapter.lessonsStory[lessonId] || `Steve 与 Alex 老师在 ${chapter.biomeNameZh} 展开第 ${lessonId} 课的英语挑战。`;

    return {
      id: lessonId,
      unit: unitNum,
      title: cat?.title || `Lesson ${lessonId}`,
      titleZh: cat?.titleZh || `第 ${lessonId} 课`,
      topic: cat?.topic || 'Minecraft Adventure',
      topicZh: '我的世界场景表达',
      difficulty: cat?.difficulty || 'easy',
      minecraftScene: `${chapter.biomeNameZh} 探索关卡`,
      sceneDescription: storySnippet,
      vocabulary: [
        {
          id: `l${lessonId}_1`,
          word: 'adventure',
          phonetic: '/ədˈven.tʃər/',
          meaning: '冒险；探索',
          mcItem: 'Compass',
          mcItemIcon: '🧭',
          sampleSentence: `Lesson ${lessonId} is full of exciting English adventures!`,
          sampleTranslation: `第 ${lessonId} 课充满刺激的英语冒险！`
        },
        {
          id: `l${lessonId}_2`,
          word: 'craft',
          phonetic: '/krɑːft/',
          meaning: '打造；合成',
          mcItem: 'Crafting Table',
          mcItemIcon: '🛠️',
          sampleSentence: `Let us craft new sentences together!`,
          sampleTranslation: `让我们一起打造新的句子吧！`
        }
      ],
      targetSentences: [
        `Welcome to Lesson ${lessonId}!`,
        `Are you ready for the ${chapter.biomeNameZh} challenge?`
      ],
      targetSentenceTranslations: [
        `欢迎来到第 ${lessonId} 课！`,
        `你准备好接受 ${chapter.biomeNameZh} 的挑战了吗？`
      ],
      dialogueScript: [
        {
          speaker: 'Alex',
          text: `Hello, ${profile.nickname || 'Olaf'}! Welcome to Lesson ${lessonId} in ${chapter.biomeNameZh}.`,
          translation: `你好，${profile.nickname || 'Olaf'}！欢迎来到 ${chapter.biomeNameZh} 的第 ${lessonId} 课。`,
          avatar: '👩'
        },
        {
          speaker: 'Steve',
          text: `Hi Alex! I am ready to practice target sentences today!`,
          translation: `嗨，Alex！我准备好今天练习核心句型了！`,
          avatar: '👦'
        }
      ],
      grammarNote: `复习 Unit ${unitNum} 的核心地道句型表达与自然拼读发音。`
    };
  };

  const handleOpenNodeModal = (lessonId: number, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    playBlockBreakSound();
    setBreakingNodeId(lessonId);
    setTimeout(() => setBreakingNodeId(null), 700);

    const lessonObj = getFullLessonObj(lessonId);
    setModalLesson(lessonObj);
  };

  const activeTheme = BIOME_THEMES[selectedUnit] || BIOME_THEMES[1];

  return (
    <div className="space-y-6">
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
              🎮 Minecraft 2D 像素大世界地图
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

            const isCompleted = item.id < profile.currentLessonId || (profile.unlockedLessonIds.includes(item.id) && profile.unlockedLessonIds.includes(item.id + 1));
            const isUnlocked = profile.unlockedLessonIds.includes(item.id) || item.id === 1 || item.id <= profile.currentLessonId || isCompleted;
            const isCurrent = profile.currentLessonId === item.id;
            const isBossNode = item.id % 12 === 0;
            const isFirstInUnit = (item.id - 1) % 12 === 0;

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
              <React.Fragment key={item.id}>
                {/* Biome Divider Banner (When viewing all or unit header) */}
                {isFirstInUnit && (selectedUnit === 0 || index === 0) && (
                  <div className="my-8 relative z-20">
                    <div className={`p-4 sm:p-5 rounded-2xl border-4 border-black ${theme.cardBannerBg} text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl bg-black/40 p-2.5 rounded-2xl border-2 border-white/20 shadow-inner">
                          {chapter.icon}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                              Unit {chapter.unit} 生态领地
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-mono font-black text-white mt-1">
                            {chapter.titleZh} ({chapter.biomeNameZh})
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 bg-black/50 px-3.5 py-2 rounded-xl text-xs font-mono border border-amber-400/30 text-amber-200">
                        <span>领地首领:</span>
                        <span className="text-base">{chapter.bossIcon}</span>
                        <span className="font-black text-white">{chapter.bossName}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  ref={isCurrent ? activeNodeRef : null}
                  className={`relative flex ${alignClass} transition-all duration-300 z-10`}
                >
                  {/* Animated Connecting Pathway Wire */}
                  {index < displayLessons.length - 1 && (() => {
                    const nextLesson = displayLessons[index + 1];
                    const isNextCompleted = nextLesson && (nextLesson.id < profile.currentLessonId || (profile.unlockedLessonIds.includes(item.id) && profile.unlockedLessonIds.includes(nextLesson.id)));
                    const isSegmentCompleted = isCompleted && isNextCompleted;
                    const isSegmentActive = isCompleted && nextLesson && nextLesson.id === profile.currentLessonId;

                    return (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-24 -z-10 pointer-events-none flex flex-col items-center justify-center">
                        {isSegmentCompleted ? (
                          <div className="w-3.5 h-full bg-gradient-to-b from-lime-400 via-emerald-400 to-green-500 rounded-full border-2 border-black shadow-[0_0_15px_rgba(74,222,128,0.9)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:14px_14px] animate-pulse" />
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] animate-bounce">
                              ❇️
                            </div>
                          </div>
                        ) : isSegmentActive ? (
                          <div className="w-3.5 h-full bg-gradient-to-b from-amber-300 via-orange-400 to-amber-500 rounded-full border-2 border-black shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse relative overflow-hidden">
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full blur-[1px] animate-ping" />
                          </div>
                        ) : (
                          <div className="w-1.5 h-full border-l-4 border-dashed border-slate-700/80" />
                        )}

                        {/* Mid-path Progress Badge */}
                        {isSegmentCompleted && (
                          <div className="absolute top-1/2 -translate-y-1/2 bg-emerald-500 border border-black rounded-full w-5 h-5 flex items-center justify-center shadow-md text-[9px]">
                            ⚡
                          </div>
                        )}
                        {isSegmentActive && (
                          <div className="absolute top-1/2 -translate-y-1/2 bg-amber-400 border border-black rounded-full w-5 h-5 flex items-center justify-center shadow-md text-[9px] animate-bounce">
                            ✨
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Node Wrapper */}
                  <div className={`relative group ${offsetClass}`}>

                    {/* Hover Tooltip Badge */}
                    {isUnlocked && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform group-hover:-translate-y-1">
                        <div className="bg-amber-300 text-amber-950 font-mono font-black text-xs px-3 py-1 rounded-xl border-2 border-black shadow-lg flex items-center space-x-1.5 whitespace-nowrap">
                          <span>✨ 挖掘关卡 L{item.id}</span>
                        </div>
                        <div className="w-2.5 h-2.5 bg-amber-300 rotate-45 -mt-1 mx-auto border-r border-b border-black" />
                      </div>
                    )}

                    {/* Left Decorative Terrain Item */}
                    <div className="absolute -left-12 top-2 text-2xl select-none hidden sm:block animate-bounce opacity-90">
                      {decorItem}
                    </div>

                    {/* Right Decorative Mob */}
                    {decorMob && (
                      <div className="absolute -right-12 top-4 text-2xl select-none hidden sm:block opacity-90">
                        {decorMob}
                      </div>
                    )}

                    {/* Steve Player Character Avatar above Current Node */}
                    {isCurrent && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
                        <div className="bg-[#FF6321] text-white px-3.5 py-1.5 rounded-2xl font-mono font-black text-xs shadow-[0_5px_0_0_#992E00] border-2 border-black flex items-center space-x-2 whitespace-nowrap">
                          <span className="text-lg">{profile.selectedAvatar || '👦'}</span>
                          <span>探险者 {profile.nickname || 'Olaf'} 在此关</span>
                        </div>
                        <div className="w-3.5 h-3.5 bg-[#FF6321] rotate-45 -mt-2 border-r-2 border-b-2 border-black" />
                      </div>
                    )}

                    {/* Block Breaking Particles Burst Overlay */}
                    {breakingNodeId === item.id && (
                      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
                        <div className="absolute w-3.5 h-3.5 bg-amber-400 border border-black animate-ping -translate-x-7 -translate-y-7" />
                        <div className="absolute w-3 h-3 bg-green-500 border border-black animate-ping translate-x-7 -translate-y-6" />
                        <div className="absolute w-3.5 h-3.5 bg-[#FF6321] border border-black animate-ping -translate-x-6 translate-y-7" />
                        <div className="absolute w-3 h-3 bg-yellow-300 border border-black animate-ping translate-x-7 translate-y-6" />
                        <div className="absolute w-4 h-4 bg-stone-300 border border-black animate-ping -translate-y-10" />
                        <div className="absolute w-4 h-4 bg-stone-600 border border-black animate-ping translate-y-10" />
                        <div className="absolute w-2.5 h-2.5 bg-amber-200 border border-black animate-ping -translate-x-10" />
                        <div className="absolute w-2.5 h-2.5 bg-emerald-400 border border-black animate-ping translate-x-10" />
                      </div>
                    )}

                    {/* 3D Minecraft Pixel Block Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenNodeModal(item.id, isUnlocked)}
                      disabled={!isUnlocked}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 font-mono flex flex-col items-center justify-center relative transition-all duration-300 transform ${
                        breakingNodeId === item.id ? 'scale-125 rotate-6 brightness-150' : ''
                      } ${
                        isCurrent
                          ? 'bg-[#FF6321] border-amber-300 text-white shadow-[0_8px_0_0_#992E00] ring-4 ring-amber-400/80 scale-110 z-20 group-hover:-translate-y-2 group-hover:scale-120 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.9)] group-hover:ring-amber-300'
                          : isCompleted
                          ? `${theme.blockBg} ${theme.blockBorder} ${theme.blockShadow} text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(72,126,44,0.9)] group-hover:ring-4 group-hover:ring-lime-300 group-hover:z-30 cursor-pointer`
                          : isUnlocked
                          ? 'bg-amber-600 border-amber-900 shadow-[0_6px_0_0_#542803] text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-300 group-hover:z-30 cursor-pointer'
                          : 'bg-slate-900 border-slate-950 shadow-[0_4px_0_0_#020617] text-slate-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {/* Boss Badge Crown */}
                      {isBossNode && (
                        <div className="absolute -top-3 -right-3 bg-amber-400 border-2 border-black rounded-xl p-1 text-sm shadow-md animate-pulse">
                          👑
                        </div>
                      )}

                      {/* Top Bevel Pixel Highlight */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 rounded-t-xl pointer-events-none" />

                      {/* Status Icon */}
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-amber-300 drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]" />
                      ) : isCurrent ? (
                        <Compass className="w-8 h-8 text-white animate-spin-slow drop-shadow-md" />
                      ) : isUnlocked ? (
                        <Play className="w-7 h-7 fill-white text-white drop-shadow-md" />
                      ) : (
                        <Lock className="w-6 h-6 text-slate-500" />
                      )}

                      <span className="text-xs sm:text-sm font-black font-mono mt-0.5 tracking-wider drop-shadow-md">
                        L{item.id}
                      </span>
                    </button>

                    {/* Title Box below block */}
                    <div className="mt-2.5 text-center max-w-[140px] mx-auto bg-black/80 border-2 border-white/20 rounded-xl p-1.5 shadow-md backdrop-blur-sm">
                      <p className={`text-[11px] font-mono font-black truncate ${isCurrent ? 'text-amber-300' : isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {item.title.split(':')[0]}
                      </p>
                      <p className="text-[10px] font-bold text-slate-300 truncate">
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
                            完成前 12 课对话训练即可参与答辩，赢取限定勋章与 100 绿宝石！
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
              </React.Fragment>
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
                className="bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-xl font-mono text-base font-black border-2 border-white/30 flex items-center justify-center transition-colors shrink-0"
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
                        className="p-1.5 bg-green-50 hover:bg-green-100 text-[#487E2C] border border-[#487E2C] rounded-lg shrink-0"
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
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-black py-3 rounded-2xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5"
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
                className="w-full bg-[#487E2C] hover:bg-[#355E20] text-white border-2 border-black py-3 rounded-2xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>💬 与 Alex 老师实战对话</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
