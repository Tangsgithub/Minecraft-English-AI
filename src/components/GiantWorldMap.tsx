import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Lesson } from '../types';
import { BIOME_CHAPTERS, BiomeChapter, getBiomeChapterByUnit } from '../data/storyData';
import { LessonStudyModal } from './LessonStudyModal';
import { getFullLessonsCatalog, getLessonById } from '../data/lessonsData';
import {
  Compass, Lock, Play, CheckCircle, Volume2, Sparkles, MessageSquare, BookOpen,
  Award, Star, MapPin, ZoomIn, ZoomOut, RefreshCw, Flame, Shield, Trophy, HelpCircle, X
} from 'lucide-react';
import { playClickSound, speakText, playEmeraldSound, playBlockBreakSound } from '../utils/audio';

interface GiantWorldMapProps {
  profile: UserProfile;
  onSelectLessonForChat: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
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
    name: 'Desert Pharaoh',
    nameZh: '金字塔守卫 · 阿蒙',
    avatar: '🏺',
    locationName: '沙漠金字塔神殿',
    greetingEn: 'Halt! Where is the secret chest in the pyramid?',
    greetingZh: '站住！金字塔里的秘密宝箱在什么地方？',
    triviaEn: 'Which preposition means "在...里面"? (on, in, or under)',
    triviaZh: '哪个介词表示“在...里面”？(on, in, 还是 under)',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_4',
    unit: 4,
    name: 'Frost Snowman',
    nameZh: '冰雪守护者 · 雪人小白',
    avatar: '☃️',
    locationName: '雪山极寒避难所',
    greetingEn: 'Brrr! It is so cold! Put on your coat and hat!',
    greetingZh: '好冷啊！快穿上你的外套，戴上你的帽子！',
    triviaEn: 'What is the English word for "帽子"?',
    triviaZh: '“帽子”的英文单词是什么？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_5',
    unit: 5,
    name: 'Sea Captain',
    nameZh: '深海航海家 · 德雷克',
    avatar: '🦈',
    locationName: '深海沉船与神殿',
    greetingEn: 'Ahoy matey! Yesterday we found an ancient treasure!',
    greetingZh: '嗨，伙伴！昨天我们找到了一份远古宝藏！',
    triviaEn: 'What is the past tense of "is" and "are"?',
    triviaZh: '“is” 和 “are” 的过去式分别是什么？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_6',
    unit: 6,
    name: 'Redstone Miner',
    nameZh: '红石工程师 · 凯文',
    avatar: '🚂',
    locationName: '废弃矿井铁道',
    greetingEn: 'All aboard! How many diamonds did you mine today?',
    greetingZh: '准备出发！你今天采掘了多少颗钻石？',
    triviaEn: 'Which word is used for plural countable items: "many" or "much"?',
    triviaZh: '对于可数名词复数，用 "many" 还是 "much"？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_7',
    unit: 7,
    name: 'Mooshroom Chef',
    nameZh: '蘑菇岛厨师 · 哞哞',
    avatar: '🐮',
    locationName: '紫菌蘑菇岛',
    greetingEn: 'Welcome! This mushroom soup is warmer and tastier!',
    greetingZh: '欢迎！这碗蘑菇煲比刚才的更烫、更美味！',
    triviaEn: 'What is the comparative form of "tall"?',
    triviaZh: '单词 "tall"（高的）的比较级形式是什么？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_8',
    unit: 8,
    name: 'Ancient Warden Guard',
    nameZh: '古城守卫 · 幽影',
    avatar: '👁️',
    locationName: '暗黑古城中心',
    greetingEn: 'Shh... Have you seen the Warden? Keep quiet!',
    greetingZh: '嘘... 你看见 Warden 监守者了吗？保持安静！',
    triviaEn: 'How do you form the present perfect tense? (have/has + _____)',
    triviaZh: '现在完成时的结构是：have/has + 动词的什么形式？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_9',
    unit: 9,
    name: 'Blaze Fire Lord',
    nameZh: '下界要塞·烈焰领主',
    avatar: '👺',
    locationName: '下界熔岩要塞',
    greetingEn: 'If it gets too hot, drink a fire resistance potion!',
    greetingZh: '如果感觉太热，就喝下一瓶抗火药水吧！',
    triviaEn: 'Which conjunction means "如果"?',
    triviaZh: '表示“如果”的英文连词是哪个？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_10',
    unit: 10,
    name: 'Warped Enderman',
    nameZh: '诡异森林·末影使者',
    avatar: '👽',
    locationName: '青蓝诡异菌林',
    greetingEn: 'You must wear a carved pumpkin to talk with me peacefully!',
    greetingZh: '你必须戴上雕刻南瓜头，才能和我和平交头接耳！',
    triviaEn: 'Which modal verb expresses strict necessity: "must" or "can"?',
    triviaZh: '哪个情态动词表达“必须”：must 还是 can？',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_11',
    unit: 11,
    name: 'Dragon Trainer',
    nameZh: '龙巢训导官 · 亚瑟',
    avatar: '🐲',
    locationName: '末地黑曜石浮岛',
    greetingEn: 'The Ender Dragon is coming! Never give up, hero!',
    greetingZh: '末影龙来了！绝不放弃，英雄！',
    triviaEn: 'How do you encourage someone in English: "Never ____ up!"',
    triviaZh: '英文里鼓励别人“绝不放弃”该怎么说：Never ____ up!',
    rewardEmeralds: 5
  },
  {
    id: 'npc_unit_12',
    unit: 12,
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
  3: { bg: 'bg-[#B45309]/95 text-white', border: 'border-[#78350F]', headerGradient: 'from-[#D97706] via-[#B45309] to-[#78350F]', badgeBg: 'bg-[#D97706]', decor: '🏜️ 🌵 🕌' },
  4: { bg: 'bg-[#0369A1]/95 text-white', border: 'border-[#075985]', headerGradient: 'from-[#0284C7] via-[#0369A1] to-[#075985]', badgeBg: 'bg-[#0284C7]', decor: '❄️ 🏔️ ☃️' },
  5: { bg: 'bg-[#0F766E]/95 text-white', border: 'border-[#115E59]', headerGradient: 'from-[#0D9488] via-[#0F766E] to-[#115E59]', badgeBg: 'bg-[#0D9488]', decor: '🌊 ⛵ 🐬' },
  6: { bg: 'bg-[#592203]/95 text-white', border: 'border-[#3A1501]', headerGradient: 'from-[#78350F] via-[#592203] to-[#3A1501]', badgeBg: 'bg-[#78350F]', decor: '⛏️ 🚂 💎' },
  7: { bg: 'bg-[#6B21A8]/95 text-white', border: 'border-[#4C1D95]', headerGradient: 'from-[#7E22CE] via-[#6B21A8] to-[#581C87]', badgeBg: 'bg-[#7E22CE]', decor: '🍄 🐮 🔮' },
  8: { bg: 'bg-[#0F172A]/95 text-white', border: 'border-[#020617]', headerGradient: 'from-[#1E293B] via-[#0F172A] to-[#020617]', badgeBg: 'bg-[#334155]', decor: '👁️ 🏛️ 🕯️' },
  9: { bg: 'bg-[#991B1B]/95 text-white', border: 'border-[#7F1D1D]', headerGradient: 'from-[#B91C1C] via-[#991B1B] to-[#7F1D1D]', badgeBg: 'bg-[#DC2626]', decor: '🔥 👺 🗡️' },
  10: { bg: 'bg-[#831843]/95 text-white', border: 'border-[#701A75]', headerGradient: 'from-[#9D174D] via-[#831843] to-[#701A75]', badgeBg: 'bg-[#BE185D]', decor: '👺 🌲 🐖' },
  11: { bg: 'bg-[#2E1065]/95 text-white', border: 'border-[#1E1B4B]', headerGradient: 'from-[#4C1D95] via-[#2E1065] to-[#1E1B4B]', badgeBg: 'bg-[#6D28D9]', decor: '🌌 🏙️ 🚀' },
  12: { bg: 'bg-[#1E1B4B]/95 text-white', border: 'border-[#0F172A]', headerGradient: 'from-[#312E81] via-[#1E1B4B] to-[#0F172A]', badgeBg: 'bg-[#4338CA]', decor: '🐉 👑 🔮' },
};

export const GiantWorldMap: React.FC<GiantWorldMapProps> = ({
  profile,
  onSelectLessonForChat,
  onCompleteLesson,
  onAwardEmeralds
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 0.85, 1, 1.2
  const [showBgImage, setShowBgImage] = useState<boolean>(true);
  const [isDaylight, setIsDaylight] = useState<boolean>(true); // Default bright daylight Minecraft world
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeNPC, setActiveNPC] = useState<MapNPC | null>(null);
  const [npcQuizAnswered, setNpcQuizAnswered] = useState<boolean>(false);
  const [userQuizChoice, setUserQuizChoice] = useState<string | null>(null);
  const [breakingLessonId, setBreakingLessonId] = useState<number | null>(null);

  const selectedVolId = profile.selectedVolumeId || 'vol1';
  const catalog = getFullLessonsCatalog(selectedVolId);

  // Scroll to selected biome section
  const biomeSectionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleJumpToUnit = (unitNum: number) => {
    playClickSound();
    setSelectedUnit(unitNum);
    const el = biomeSectionRefs.current[unitNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenLessonDetail = (lessonId: number, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    playBlockBreakSound();
    setBreakingLessonId(lessonId);
    setTimeout(() => setBreakingLessonId(null), 700);

    const lessonData = getLessonById(lessonId, selectedVolId);
    setActiveLesson(lessonData);
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
      onAwardEmeralds(activeNPC.rewardEmeralds, 15);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Biome Quick Navigation Bar */}
      <div className="bg-white/95 border-4 border-black rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] space-y-4">
        


        {/* 12 Biome Tabs Quick Navigator */}
        <div className="">
          <p className="text-xs font-mono font-black text-slate-600 mb-2 flex items-center space-x-1">
            <Compass className="w-4 h-4 text-[#487E2C]" />
            <span>传送定位到生态领地:</span>
          </p>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {BIOME_CHAPTERS.map(ch => {
              const isActive = selectedUnit === ch.unit;
              const unitLessons = catalog.filter(l => l.unit === ch.unit);
              const completedCount = unitLessons.filter(l => l.id < profile.currentLessonId || profile.unlockedLessonIds.includes(l.id + 1)).length;
              const isUnitUnlocked = ch.unit === 1 || profile.currentLessonId >= (ch.unit - 1) * 12;

              return (
                <button
                  key={ch.unit}
                  type="button"
                  onClick={() => handleJumpToUnit(ch.unit)}
                  className={`snap-start shrink-0 px-3 py-2 rounded-xl border-2 font-mono text-xs flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-[#487E2C] border-black text-white shadow-[0_3px_0_0_#000] scale-105 font-black'
                      : isUnitUnlocked
                      ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-base">{ch.icon}</span>
                  <div className="text-left leading-tight">
                    <p className="font-bold whitespace-nowrap">Unit {ch.unit}</p>
                    <p className="text-[10px] opacity-80 whitespace-nowrap">{completedCount}/12 课</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

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
        {/* Decorative Daylight Sky Sun & Clouds floating header */}
        {isDaylight && (
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-0 opacity-80">
            <div className="flex items-center space-x-3 text-amber-300 font-mono font-black text-xs">
              <span className="text-4xl animate-spin" style={{ animationDuration: '30s' }}>☀️</span>
              <span className="bg-amber-300/20 text-amber-100 px-3 py-1 rounded-full border border-amber-300/40 backdrop-blur-sm">
                Minecraft 阳光平原大世界 • 12大生态领地全景
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

        {/* Continuous 12 Biome Regions Board */}
        <div className="relative space-y-16 max-w-5xl mx-auto py-10 z-10">
          
          {BIOME_CHAPTERS.map((ch) => {
            const unitLessons = catalog.filter(l => l.unit === ch.unit);
            const npc = MAP_NPCS.find(n => n.unit === ch.unit);
            const isUnitCurrent = profile.currentLessonId >= (ch.unit - 1) * 12 + 1 && profile.currentLessonId <= ch.unit * 12;
            const cardTheme = BIOME_CARD_STYLES[ch.unit] || BIOME_CARD_STYLES[1];

            return (
              <div
                key={ch.unit}
                ref={el => biomeSectionRefs.current[ch.unit] = el}
                className={`relative border-4 ${cardTheme.border} ${cardTheme.bg} rounded-3xl p-5 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300`}
              >
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
                      className="bg-amber-400 hover:bg-amber-300 text-amber-950 border-3 border-black px-4 py-2.5 rounded-2xl text-xs font-mono font-black flex items-center space-x-2 shadow-[0_4px_0_0_#78350F] active:translate-y-1 transition-transform shrink-0"
                    >
                      <span className="text-2xl animate-bounce">{npc.avatar}</span>
                      <div className="text-left">
                        <span className="block text-[10px] text-amber-900 font-bold">对话交头接耳</span>
                        <span className="block text-xs font-black">{npc.nameZh}</span>
                      </div>
                    </button>
                  )}
                </div>

                {/* 12 Lessons Grid Nodes inside this Biome */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                  {unitLessons.map((item) => {
                    const isCompleted = item.id < profile.currentLessonId || (profile.unlockedLessonIds.includes(item.id) && profile.unlockedLessonIds.includes(item.id + 1));
                    const isUnlocked = profile.unlockedLessonIds.includes(item.id) || item.id === 1 || item.id <= profile.currentLessonId || isCompleted;
                    const isCurrent = profile.currentLessonId === item.id;
                    const isBossNode = item.id % 12 === 0;

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
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-bounce">
                            <div className="bg-[#FF6321] text-white px-2.5 py-1 rounded-xl font-mono font-black text-[10px] shadow-md border-2 border-black flex items-center space-x-1 whitespace-nowrap">
                              <span>{profile.selectedAvatar || '👦'}</span>
                              <span>Steve 在此关</span>
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
                          onClick={() => handleOpenLessonDetail(item.id, isUnlocked)}
                          disabled={!isUnlocked}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 font-mono flex flex-col items-center justify-center relative transition-all duration-300 transform ${
                            isBreaking ? 'scale-125 rotate-6 brightness-150' : ''
                          } ${
                            isCurrent
                              ? 'bg-[#FF6321] border-amber-300 text-white shadow-[0_6px_0_0_#992E00] ring-4 ring-amber-400 scale-105 z-20 group-hover:-translate-y-2 group-hover:scale-115 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.9)] group-hover:ring-amber-300'
                              : isCompleted
                              ? 'bg-[#487E2C] border-[#2A4718] shadow-[0_5px_0_0_#182B0E] text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(72,126,44,0.9)] group-hover:ring-4 group-hover:ring-lime-300 group-hover:z-30 cursor-pointer'
                              : isUnlocked
                              ? 'bg-amber-600 border-amber-900 shadow-[0_5px_0_0_#542a02] text-white border-black group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.9)] group-hover:ring-4 group-hover:ring-amber-300 group-hover:z-30 cursor-pointer'
                              : 'bg-slate-900 border-slate-950 shadow-[0_4px_0_0_#020617] text-slate-600 cursor-not-allowed opacity-50'
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

                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-amber-300 drop-shadow-md" />
                          ) : isCurrent ? (
                            <Compass className="w-6 h-6 text-white animate-spin-slow drop-shadow-md" />
                          ) : isUnlocked ? (
                            <Play className="w-5 h-5 fill-white text-white drop-shadow-md" />
                          ) : (
                            <Lock className="w-5 h-5 text-slate-500" />
                          )}

                          <span className="text-xs font-black font-mono mt-0.5 tracking-wider">
                            L{item.id}
                          </span>
                        </button>

                        {/* Title text under node */}
                        <div className="mt-2 text-center max-w-[120px] bg-black/70 border border-white/20 rounded-lg p-1">
                          <p className={`text-[10px] font-mono font-bold truncate ${isCurrent ? 'text-amber-300' : isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                            {item.title.split(':')[0]}
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
                {ch.unit < 12 && (() => {
                  const isBridgeCompleted = profile.currentLessonId > ch.unit * 12;
                  const isBridgeActive = profile.currentLessonId >= (ch.unit - 1) * 12 + 1 && profile.currentLessonId <= ch.unit * 12;

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
          onClose={() => setActiveLesson(null)}
          onStartPractice={(lesson) => {
            setActiveLesson(null);
            onSelectLessonForChat(lesson);
          }}
        />
      )}

      {/* NPC INTERACTION DIALOGUE MODAL */}
      {activeNPC && (
        <div className="fixed inset-0 z-[110] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#1e293b] border-4 border-amber-400 rounded-3xl w-full max-w-lg text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden my-auto space-y-4 p-5 sm:p-6 relative">
            
            <button
              type="button"
              onClick={() => setActiveNPC(null)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white w-9 h-9 rounded-xl font-mono text-base font-black border-2 border-slate-600 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* NPC Header */}
            <div className="flex items-center space-x-4 border-b-2 border-slate-700 pb-4">
              <div className="w-16 h-16 bg-amber-500/20 border-3 border-amber-400 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg animate-bounce">
                {activeNPC.avatar}
              </div>
              <div>
                <span className="text-[10px] font-mono font-black uppercase text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {activeNPC.locationName}
                </span>
                <h3 className="text-xl font-black font-mono text-amber-300 mt-1">
                  {activeNPC.nameZh}
                </h3>
                <p className="text-xs font-bold text-slate-300 font-mono">
                  {activeNPC.name}
                </p>
              </div>
            </div>

            {/* Greeting Speech Bubble */}
            <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 space-y-2 relative">
              <div className="flex items-center justify-between text-amber-300 font-mono text-xs font-black">
                <span>💬 NPC English Line:</span>
                <button
                  type="button"
                  onClick={() => speakText(activeNPC.greetingEn, { speaker: activeNPC.name })}
                  className="p-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 rounded-lg flex items-center space-x-1 text-[10px]"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>朗读</span>
                </button>
              </div>
              <p className="text-sm font-mono font-black text-white leading-relaxed">
                "{activeNPC.greetingEn}"
              </p>
              <p className="text-xs text-amber-200/90 font-bold">
                {activeNPC.greetingZh}
              </p>
            </div>

            {/* Quick English Quiz Challenge */}
            <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-2 text-amber-300 font-mono text-xs font-black">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>NPC 英语小考题 (解答赚取 ❇️ 绿宝石):</span>
              </div>
              
              <div className="bg-black/40 p-3 rounded-xl border border-white/10 space-y-1">
                <p className="text-xs font-mono font-bold text-white">
                  {activeNPC.triviaEn}
                </p>
                <p className="text-[11px] text-slate-300 font-bold">
                  {activeNPC.triviaZh}
                </p>
              </div>

              {!npcQuizAnswered ? (
                <button
                  type="button"
                  onClick={handleSolveNPCQuiz}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-black py-3 rounded-xl font-mono text-xs font-black flex items-center justify-center space-x-1.5 shadow-[0_4px_0_0_#78350F] active:translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  <span>答对啦！领取 +{activeNPC.rewardEmeralds} 绿宝石</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-950/80 border-2 border-emerald-400 rounded-xl text-center text-xs font-mono text-emerald-200 font-bold flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>回答正确！已放入你的装备背包 (+{activeNPC.rewardEmeralds} ❇️)</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <button
              type="button"
              onClick={() => setActiveNPC(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-600 py-3 rounded-2xl font-mono text-xs font-bold"
            >
              继续我的世界大地图探索
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
