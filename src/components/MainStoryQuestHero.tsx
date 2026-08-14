import React, { useState } from 'react';
import { UserProfile, Lesson, CourseVolumeId } from '../types';
import { getLessonById } from '../data/lessonsData';
import { getBiomeChapterByUnit } from '../data/storyData';
import { MinecraftAvatar } from './MinecraftAvatar';
import { speakText, playClickSound, playEmeraldSound } from '../utils/audio';
import {
  Sparkles, Volume2, Play, MessageSquare, Compass, Shield, Flame,
  Award, CheckCircle2, ChevronRight, Swords, ArrowRight, Zap, Target
} from 'lucide-react';

interface MainStoryQuestHeroProps {
  profile: UserProfile;
  selectedVolumeId: CourseVolumeId;
  onOpenLesson: (lessonId: number) => void;
  onStartChat: (lesson: Lesson) => void;
  onScrollToCurrentBiome?: (unit: number) => void;
}

export const MainStoryQuestHero: React.FC<MainStoryQuestHeroProps> = ({
  profile,
  selectedVolumeId,
  onOpenLesson,
  onStartChat,
  onScrollToCurrentBiome
}) => {
  const currentLessonId = profile.currentLessonId || 1;
  const currentLesson = getLessonById(currentLessonId, selectedVolumeId);
  const currentUnit = Math.ceil(currentLessonId / 12);
  const biomeChapter = getBiomeChapterByUnit(currentUnit);

  // Story snippet for current lesson
  const storySnippet = biomeChapter.lessonsStory[currentLessonId] ||
    `Steve 与 Alex 老师在 ${biomeChapter.biomeNameZh} 展开第 ${currentLessonId} 课冒险。`;

  const [alexSpoken, setAlexSpoken] = useState<boolean>(false);

  // Dynamic mentor advice based on current lesson
  const alexGreetingEn = currentLesson.targetSentences[0]
    ? `Hey ${profile.nickname || 'Steve'}! Let's practice: "${currentLesson.targetSentences[0]}"`
    : `Hey ${profile.nickname || 'Steve'}! Ready for Lesson ${currentLessonId} in ${biomeChapter.biomeName}?`;

  const handlePlayAlexVoice = () => {
    playClickSound();
    setAlexSpoken(true);
    speakText(alexGreetingEn, { lang: 'en-US', speaker: 'Alex' });
  };

  // Calculate Unit Progress (e.g. lesson 3 in unit 1 => 3/12 completed or in progress)
  const unitStartId = (currentUnit - 1) * 12 + 1;
  const unitEndId = currentUnit * 12;
  const completedInUnit = (profile.completedLessonIds || []).filter(
    id => id >= unitStartId && id <= unitEndId
  ).length;
  const progressPercent = Math.min(100, Math.round((completedInUnit / 12) * 100));

  return (
    <div className="relative bg-gradient-to-br from-[#2D471E] via-[#3C6424] to-[#1E3314] border-3 sm:border-4 border-[#14240C] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.35)] overflow-hidden text-white">
      
      {/* Background Pixel Grid & Vignette Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-5 sm:gap-6">
        
        {/* Left / Top Stage: Main Characters in Spotlight (Steve & Alex) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 sm:gap-5 flex-1 min-w-0">
          
          {/* Character Stage Pedestal */}
          <div className="flex items-center space-x-3 shrink-0 bg-black/30 border-2 border-black/50 p-2.5 sm:p-3 rounded-2xl shadow-inner">
            {/* Player Character (Steve) */}
            <div
              onClick={() => {
                playClickSound();
                speakText(`I am ${profile.nickname || 'Steve'}, level ${profile.level} adventurer!`, { lang: 'en-US', speaker: 'Steve' });
              }}
              className="flex flex-col items-center group cursor-pointer"
              title="点击让 Steve 发声"
            >
              <div className="relative transform group-hover:scale-105 group-hover:-translate-y-1 transition-transform">
                <MinecraftAvatar speaker={profile.nickname || 'Steve'} size={56} className="shadow-lg" />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 border border-black rounded-md px-1 text-[9px] font-mono font-black text-black">
                  Lv.{profile.level}
                </div>
              </div>
              <span className="text-[11px] font-mono font-black text-amber-300 mt-1.5 truncate max-w-[64px]">
                {profile.nickname || 'Steve'}
              </span>
            </div>

            {/* Battle / Collaboration Crest */}
            <div className="flex flex-col items-center justify-center px-1">
              <Swords className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-[9px] font-mono font-black text-emerald-300 uppercase">Co-op</span>
            </div>

            {/* Mentor Character (Alex) */}
            <div
              onClick={handlePlayAlexVoice}
              className="flex flex-col items-center group cursor-pointer"
              title="点击听 Alex 老师今日任务寄语"
            >
              <div className="relative transform group-hover:scale-105 group-hover:-translate-y-1 transition-transform">
                <MinecraftAvatar speaker="Alex" size={56} className="shadow-lg" />
                <div className="absolute -top-1 -right-1 bg-emerald-500 border border-black rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  <Volume2 className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
              <span className="text-[11px] font-mono font-black text-emerald-300 mt-1.5">
                Alex 老师
              </span>
            </div>
          </div>

          {/* Alex's Interactive Speech Bubble & Quest Overview */}
          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
            {/* Top Tag & Biome */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-[#FF6321] text-white border border-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>主线剧情关卡</span>
              </span>
              <span className="bg-black/40 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center space-x-1">
                <span>{biomeChapter.icon}</span>
                <span>Unit {currentUnit} · {biomeChapter.biomeNameZh}</span>
              </span>
            </div>

            {/* Main Lesson Title */}
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black font-mono tracking-tight text-amber-300 flex items-center justify-center sm:justify-start gap-2">
                <span>Lesson {currentLesson.id}:</span>
                <span className="truncate">{currentLesson.title}</span>
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">
                {currentLesson.titleZh}
              </p>
            </div>

            {/* Dynamic Dialogue Speech Balloon */}
            <div
              onClick={handlePlayAlexVoice}
              className="bg-black/35 hover:bg-black/45 border-2 border-emerald-500/40 hover:border-emerald-400 p-2.5 rounded-xl cursor-pointer transition-colors text-left flex items-start space-x-2.5 group"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono font-bold text-emerald-200 line-clamp-2 leading-relaxed">
                  "{alexGreetingEn}"
                </p>
                <p className="text-[11px] font-mono text-slate-300 mt-0.5 line-clamp-1">
                  📖 {storySnippet}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Bottom Action Hero Box (One-Click Launch & Rewards) */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-stretch gap-3 shrink-0 lg:w-72 bg-black/40 border-2 border-black/60 p-3.5 sm:p-4 rounded-2xl">
          
          {/* Chapter Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
              <span className="flex items-center space-x-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>领地主线通关进度</span>
              </span>
              <span className="text-amber-300 font-black">{completedInUnit}/12 课 ({progressPercent}%)</span>
            </div>
            
            {/* Minecraft Block Progress Bar */}
            <div className="w-full h-3 bg-black/60 border border-black rounded-full overflow-hidden p-0.5 flex">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(72,126,44,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Rewards Badge */}
          <div className="flex items-center justify-between bg-black/30 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span className="text-slate-300">本课通关奖励:</span>
            <div className="flex items-center space-x-2 font-black">
              <span className="text-emerald-400">+10 ❇️</span>
              <span className="text-amber-400">+40 XP</span>
            </div>
          </div>

          {/* Big Action Buttons */}
          <div className="flex flex-col gap-2">
            {/* Primary Main Quest Launcher */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onOpenLesson(currentLesson.id);
              }}
              className="w-full bg-[#487E2C] hover:bg-[#5AA137] active:bg-[#355E20] border-2 border-[#2A4718] text-white py-2.5 sm:py-3 px-4 rounded-xl font-mono font-black text-sm flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#1E3314] active:translate-y-1 active:shadow-none transition-all transform group cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-amber-300 group-hover:scale-110 transition-transform" />
              <span>立即进入主线探险</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary 1V1 Alex Chat Button */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onStartChat(currentLesson);
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 border-2 border-amber-800 text-amber-950 py-2 px-3 rounded-xl font-mono font-black text-xs flex items-center justify-center space-x-1.5 shadow-[0_3px_0_0_#78350F] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>与 Alex 老师 1V1 口语对练</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
