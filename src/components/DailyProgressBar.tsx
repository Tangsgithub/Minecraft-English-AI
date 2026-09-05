import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import {
  Target,
  Clock,
  BookOpen,
  Mic,
  Sparkles,
  Trophy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClickSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';

interface DailyProgressBarProps {
  profile: UserProfile;
  onNavigateToTab?: (tab: 'map' | 'radio' | 'vocab' | 'missions') => void;
  onOpenAlexChat?: () => void;
  onOpenParentDashboard?: () => void;
  compact?: boolean;
}

export const DailyProgressBar: React.FC<DailyProgressBarProps> = ({
  profile,
  onNavigateToTab,
  onOpenAlexChat,
  onOpenParentDashboard,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCelebratedRef = useRef(false);

  // 1. Calculate Today's Goals & Progress (Customizable by Parents)
  const todayMinutes = profile.todayStudyMinutes ?? 0;
  const timeGoal = profile.parentSettings?.dailyTimeGoalMinutes || profile.learningGoal || 15;
  const timeProgress = Math.min(1, todayMinutes / timeGoal);

  const todayWords = profile.todayMasteredWordsCount ?? 0;
  const wordsGoal = profile.parentSettings?.dailyWordsGoal || 5;
  const wordsProgress = Math.min(1, todayWords / wordsGoal);

  const todayDialogues =
    (profile.todayAlexChatDone ? 1 : 0) +
    ((profile.todayCompletedLessonsCount ?? 0) > 0 ? 1 : 0);
  const dialogueGoal = profile.parentSettings?.dailyDialogueGoal || 2;
  const dialogueProgress = Math.min(1, todayDialogues / dialogueGoal);

  const overallPercent = Math.min(
    100,
    Math.round(((timeProgress + wordsProgress + dialogueProgress) / 3) * 100)
  );

  const completedGoalsCount =
    (timeProgress >= 1 ? 1 : 0) +
    (wordsProgress >= 1 ? 1 : 0) +
    (dialogueProgress >= 1 ? 1 : 0);

  const isAllComplete = overallPercent >= 100;

  // Trigger celebration once when reaching 100%
  useEffect(() => {
    if (isAllComplete && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.2 }
        });
        playLevelUpSound();
      } catch (e) {
        // ignore in case of iframe constraints
      }
    }
  }, [isAllComplete]);

  // Click outside to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    playClickSound();
    setIsOpen(prev => !prev);
    if (!isOpen && isAllComplete) {
      playEmeraldSound();
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Capsule Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`group flex items-center space-x-1.5 sm:space-x-2 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border-2 transition-all cursor-pointer select-none active:translate-y-0.5 shadow-sm ${
          isAllComplete
            ? 'bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-emerald-500/30 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
            : 'bg-slate-950/70 hover:bg-slate-900 border-slate-700/80 hover:border-emerald-500/60 text-slate-200'
        }`}
        title="点击查看今日学习目标与进度明细"
      >
        {/* Left Icon with subtle bounce/pulse */}
        <div className="relative shrink-0 flex items-center justify-center">
          {isAllComplete ? (
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-bounce" />
          ) : (
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
          )}
          {isAllComplete && (
            <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-yellow-200 absolute -top-1 -right-1 animate-ping" />
          )}
        </div>

        {/* Progress Bar & Label Container */}
        <div className="flex flex-col items-start min-w-[52px] xs:min-w-[70px] sm:min-w-[90px]">
          <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] font-black font-mono leading-none mb-0.5 sm:mb-1">
            <span className={isAllComplete ? 'text-amber-300' : 'text-slate-300'}>
              <span className="hidden xs:inline">今日</span>{isAllComplete ? '达成' : '目标'}
            </span>
            <span
              className={`font-mono font-black ${
                isAllComplete ? 'text-amber-300' : 'text-emerald-400'
              }`}
            >
              {overallPercent}%
            </span>
          </div>

          {/* Minecraft Themed Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isAllComplete
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 shadow-[0_0_6px_rgba(52,211,153,0.7)]'
              }`}
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Arrow toggle */}
        <div className="text-slate-400 group-hover:text-white transition-colors shrink-0">
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      {/* Floating Detailed Popover */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mt-2.5 w-72 sm:w-80 max-w-[92vw] bg-slate-900/98 backdrop-blur-md border-3 border-slate-700 rounded-2xl p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.85)] z-[100] animate-in fade-in zoom-in-95 duration-150 font-sans text-white">
          
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-emerald-950 rounded-lg border border-emerald-500/40 text-emerald-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white font-mono flex items-center gap-1.5">
                  <span>今日探险目标</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {completedGoalsCount}/3 项完成
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  完成全部 3 项可锁定今日连胜与绿宝石
                </p>
              </div>
            </div>
            {isAllComplete && (
              <span className="text-xs animate-bounce" title="今日全勤完成！">
                🏆
              </span>
            )}
          </div>

          {/* 3 Core Goals Breakdown */}
          <div className="space-y-2.5">
            
            {/* Goal 1: 学习时间 */}
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-bold text-slate-200">学习时长</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-blue-300">
                  {todayMinutes} / {timeGoal} 分钟
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(timeProgress * 100)}%` }}
                />
              </div>
              {timeProgress >= 1 ? (
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>已达成当日学习时长目标</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>还差 {Math.max(0, timeGoal - todayMinutes)} 分钟</span>
                  {onNavigateToTab && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigateToTab('radio');
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-0.5 cursor-pointer"
                    >
                      <span>去电台磨耳朵</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Goal 2: 掌握单词 */}
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold text-slate-200">掌握生词</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-amber-300">
                  {todayWords} / {wordsGoal} 个
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(wordsProgress * 100)}%` }}
                />
              </div>
              {wordsProgress >= 1 ? (
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>已牢固掌握 5 个生词方块</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>还差 {Math.max(0, wordsGoal - todayWords)} 个生词</span>
                  {onNavigateToTab && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigateToTab('map');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-0.5 cursor-pointer"
                    >
                      <span>闯关收集生词</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Goal 3: 开口练习与对话 */}
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-slate-200">开口对练</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-300">
                  {todayDialogues} / {dialogueGoal} 次
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(dialogueProgress * 100)}%` }}
                />
              </div>
              {dialogueProgress >= 1 ? (
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>今天已完成开口目标 ({todayDialogues}/{dialogueGoal})</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>还差 {Math.max(0, dialogueGoal - todayDialogues)} 次开口</span>
                  {onOpenAlexChat && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenAlexChat();
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-0.5 cursor-pointer"
                    >
                      <span>找 Alex 连麦</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Reward Status Banner & Parent Config Hint */}
          <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-slate-300">
                  {isAllComplete ? '全天任务达成奖励' : '全勤奖励预留'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black">
                +10 💎 绿宝石
              </span>
            </div>

            {onOpenParentDashboard && (
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
                <span>🎯 目标支持家长在家长中心随时调整</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenParentDashboard();
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer"
                >
                  去设定 ➔
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

/* Full Card View for Landing Page or Dashboard Hero */
export const DailyProgressCard: React.FC<{
  profile: UserProfile;
  onEnterStudyHall: () => void;
  onOpenParentDashboard?: () => void;
}> = ({ profile, onEnterStudyHall, onOpenParentDashboard }) => {
  const todayMinutes = profile.todayStudyMinutes ?? 0;
  const timeGoal = profile.parentSettings?.dailyTimeGoalMinutes || profile.learningGoal || 15;
  const timeProgress = Math.min(1, todayMinutes / timeGoal);

  const todayWords = profile.todayMasteredWordsCount ?? 0;
  const wordsGoal = profile.parentSettings?.dailyWordsGoal || 5;
  const wordsProgress = Math.min(1, todayWords / wordsGoal);

  const todayDialogues =
    (profile.todayAlexChatDone ? 1 : 0) +
    ((profile.todayCompletedLessonsCount ?? 0) > 0 ? 1 : 0);
  const dialogueGoal = profile.parentSettings?.dailyDialogueGoal || 2;
  const dialogueProgress = Math.min(1, todayDialogues / dialogueGoal);

  const overallPercent = Math.min(
    100,
    Math.round(((timeProgress + wordsProgress + dialogueProgress) / 3) * 100)
  );

  const isAllComplete = overallPercent >= 100;

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border-3 shadow-lg transition-all relative overflow-hidden ${
        isAllComplete
          ? 'bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border-amber-400/80 shadow-[0_4px_20px_rgba(251,191,36,0.2)]'
          : 'bg-slate-900/95 border-slate-700/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Background Subtle Minecraft Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-500/50 text-emerald-400">
              {isAllComplete ? (
                <Trophy className="w-5 h-5 text-amber-300 animate-bounce" />
              ) : (
                <Target className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-mono flex items-center gap-2">
                <span>今日学习任务进度</span>
                <span
                  className={`text-xs font-black font-mono px-2 py-0.5 rounded-full border ${
                    isAllComplete
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {overallPercent}% 已完成
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isAllComplete
                  ? '太棒啦！今日 3 大探险目标已全额达成，保持连胜！'
                  : '每天坚持 15 分钟 + 掌握 5 个生词 + 2 次开口，稳步精通英语！'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onEnterStudyHall();
            }}
            className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl border-2 border-slate-950 shadow-[2px_2px_0_0_#000] flex items-center space-x-1.5 transition-all active:translate-y-0.5 cursor-pointer shrink-0"
          >
            <span>{isAllComplete ? '进入大厅继续冒险' : '立即冲刺今日任务'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Animated Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isAllComplete
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
              }`}
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-blue-400" />
              <span>学习时长</span>
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-white mt-0.5">
              {todayMinutes} / {timeGoal} 分
            </div>
          </div>

          <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>掌握生词</span>
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-white mt-0.5">
              {todayWords} / {wordsGoal} 个
            </div>
          </div>

          <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Mic className="w-3 h-3 text-emerald-400" />
              <span>开口对练</span>
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-white mt-0.5">
              {todayDialogues} / {dialogueGoal} 次
            </div>
          </div>
        </div>

        {/* Footer info & Parent setting button */}
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-400 pt-0.5">
          <span>🎯 今日目标：{timeGoal}分钟 · {wordsGoal}个生词 · {dialogueGoal}次开口</span>
          {onOpenParentDashboard && (
            <button
              type="button"
              onClick={onOpenParentDashboard}
              className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>家长调整目标</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
