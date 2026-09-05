import React, { useState, useEffect } from 'react';
import { UserProfile, Badge } from '../types';
import { LEVEL_TIERS, BADGES_DATA, getTierForLevel, getLevelFromXp, evaluateBadgesForProfile } from '../data/gamificationData';
import { Trophy, Award, Flame, BookOpen, CheckCircle, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playEmeraldSound, playLevelUpSound, playClickSound } from '../utils/audio';

interface AchievementsViewProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile> | ((prev: UserProfile) => UserProfile)) => void;
  onNavigateToVocab?: () => void;
  onNavigateToMap?: () => void;
  onNavigateToCrafting?: () => void;
  onNavigateToChat?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToVocab,
  onNavigateToMap,
  onNavigateToCrafting,
  onNavigateToChat
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Real-time evaluation of all achievement badges based on player's live metrics
  const { unlockedBadgeIds, badgeProgress } = evaluateBadgesForProfile(profile);
  const currentTier = getTierForLevel(profile.level);

  // Auto-sync unlocked badge IDs back to user profile so they are persisted permanently
  useEffect(() => {
    if (!onUpdateProfile) return;
    const existing = new Set(profile.unlockedBadgeIds || []);
    const hasNew = unlockedBadgeIds.some(id => !existing.has(id));
    if (hasNew) {
      onUpdateProfile({
        unlockedBadgeIds: Array.from(new Set([...(profile.unlockedBadgeIds || []), ...unlockedBadgeIds]))
      });
    }
  }, [unlockedBadgeIds, profile.unlockedBadgeIds, onUpdateProfile]);

  const totalBadgesCount = BADGES_DATA.length;
  const unlockedBadgesCount = BADGES_DATA.filter(b => badgeProgress[b.id]?.isUnlocked).length;
  const lockedBadgesCount = totalBadgesCount - unlockedBadgesCount;
  const overallBadgePercent = Math.round((unlockedBadgesCount / Math.max(1, totalBadgesCount)) * 100);

  const filteredBadges = BADGES_DATA.filter(b => {
    const isUnlocked = badgeProgress[b.id]?.isUnlocked;
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const handleBadgeClick = (badge: Badge, isUnlocked: boolean) => {
    playClickSound();
    if (isUnlocked) {
      playEmeraldSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const getActionForBadge = (badgeId: string) => {
    switch (badgeId) {
      case 'badge_mc_builder':
      case 'badge_master_50':
        return { label: '去掌握词汇', icon: '📖', onClick: onNavigateToVocab };
      case 'badge_first_words':
        return { label: '去对话 Alex', icon: '💬', onClick: onNavigateToChat };
      case 'badge_dragon_slayer':
      case 'badge_level_10':
      case 'badge_level_25':
      case 'badge_mythic_100':
        return { label: '去地图闯关', icon: '🗺️', onClick: onNavigateToMap };
      case 'badge_oral_scholar':
        return { label: '去关卡练口语', icon: '🎙️', onClick: onNavigateToMap };
      default:
        return { label: '去探索', icon: '⚡', onClick: onNavigateToMap };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Player Card Header */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden text-[#2D2D2D]">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          
          <div className="w-20 h-20 bg-[#EEDDCC] border-4 border-[#C89D7C] rounded-2xl flex items-center justify-center text-4xl shadow-md shrink-0">
            {profile.selectedAvatar || '👦'}
          </div>

          <div className="text-center sm:text-left space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black font-mono text-[#2D2D2D]">
                {profile.nickname || 'Olaf'}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-[#487E2C] text-white border-2 border-black shadow-sm">
                {currentTier.icon} Lv.{profile.level} {currentTier.title}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-mono font-bold">
              Minecraft 英语探险队先锋学者 • 年龄 {profile.age} 岁
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono pt-2 text-slate-700 font-bold">
              <span className="flex items-center space-x-1">
                <span>❇️</span>
                <span>{profile.emeralds} 绿宝石</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-[#FF6321]">
                <Flame className="w-3.5 h-3.5 fill-[#FF6321]" />
                <span>连续 {profile.streakDays} 天学习</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-[#487E2C]">
                <BookOpen className="w-3.5 h-3.5 text-[#487E2C]" />
                <span>已掌握 {profile.masteredWords.length} 核心词汇</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-amber-600">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>已解锁 {unlockedBadgesCount} / {totalBadgesCount} 荣誉勋章</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Growth Path */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#2D2D2D]">
        <h3 className="text-sm font-mono font-black text-[#FF6321] flex items-center space-x-2 uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-[#FFD700]" />
          <span>Minecraft 英语成长阶梯 (Level Tiers)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVEL_TIERS.map(tier => {
            const calculatedLevel = getLevelFromXp(profile.xp);
            const effectiveLevel = Math.max(profile.level, calculatedLevel);
            const isReached = effectiveLevel >= tier.level && profile.xp >= tier.minXp;
            const progressPercent = tier.minXp === 0 ? 100 : Math.min(100, Math.round((profile.xp / tier.minXp) * 100));

            return (
              <div
                key={tier.level}
                className={`p-4 rounded-2xl border-4 transition-all flex flex-col justify-between space-y-2 ${
                  isReached
                    ? 'bg-green-50/90 border-[#487E2C] text-[#2D2D2D] shadow-[4px_4px_0px_0px_rgba(72,126,44,0.15)]'
                    : 'bg-slate-50 border-slate-300 opacity-80'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl shrink-0 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {tier.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-xs text-[#2D2D2D] truncate">
                        Lv.{tier.level} {tier.title}
                      </span>
                      {isReached && <CheckCircle className="w-4 h-4 text-[#487E2C] shrink-0" />}
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 font-bold mt-0.5">
                      解锁定额: {tier.minXp} XP
                    </p>
                  </div>
                </div>

                {/* Progress Bar for Locked / Reached Status */}
                <div className="pt-1">
                  {isReached ? (
                    <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-[#487E2C] bg-green-100 px-2 py-0.5 rounded-lg border border-green-300 w-fit">
                      <Sparkles className="w-3 h-3" />
                      <span>阶梯已达成</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                        <span>当前进度</span>
                        <span>{profile.xp} / {tier.minXp} ({progressPercent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                        <div
                          className="h-full bg-[#487E2C] transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-6 space-y-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#2D2D2D]">
        
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-mono font-black text-[#2D2D2D] flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#FFD700]" />
              <span>荣誉勋章陈列馆 (Hall of Honor)</span>
            </h3>
            <p className="text-xs text-slate-500 font-mono font-bold mt-0.5">
              掌握词汇、提升等级、完成测评探险即可自动解锁专属荣誉勋章！
            </p>
          </div>

          {/* Unlock Progress Banner */}
          <div className="flex items-center space-x-3 bg-amber-50 border-2 border-[#FFD700] px-4 py-2 rounded-2xl">
            <div className="text-right">
              <div className="text-xs font-mono font-black text-[#2D2D2D]">
                已解锁 {unlockedBadgesCount} / {totalBadgesCount}
              </div>
              <div className="text-[10px] font-mono font-bold text-amber-700">
                成就达成率 {overallBadgePercent}%
              </div>
            </div>
            <div className="w-20 bg-amber-200 h-3 rounded-full overflow-hidden border border-amber-300">
              <div
                className="h-full bg-[#487E2C] transition-all duration-500"
                style={{ width: `${overallBadgePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { playClickSound(); setFilter('all'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#487E2C] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全部勋章 ({totalBadgesCount})
          </button>
          <button
            onClick={() => { playClickSound(); setFilter('unlocked'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'unlocked'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🏆 已解锁 ({unlockedBadgesCount})
          </button>
          <button
            onClick={() => { playClickSound(); setFilter('locked'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              filter === 'locked'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🔒 探索中 ({lockedBadgesCount})
          </button>
        </div>

        {/* Badges Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBadges.map(badge => {
            const prog = badgeProgress[badge.id] || {
              current: 0,
              target: badge.requiredValue || 1,
              percent: 0,
              isUnlocked: false,
              statusText: '探索中',
              hintText: badge.description
            };
            const isUnlocked = prog.isUnlocked;
            const action = getActionForBadge(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge, isUnlocked)}
                className={`p-4 rounded-2xl border-4 transition-all flex flex-col justify-between space-y-3 cursor-pointer select-none relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50/60 border-[#FFD700] text-[#2D2D2D] shadow-[4px_4px_0px_0px_rgba(255,215,0,0.3)] hover:scale-[1.01]'
                    : 'bg-slate-50 border-slate-200 opacity-80 hover:opacity-95'
                }`}
              >
                {/* Top: Icon + Title */}
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0 shadow-sm transition-all ${
                    isUnlocked
                      ? 'bg-amber-100 border-[#FFD700] scale-105'
                      : 'bg-white border-slate-300 grayscale opacity-70'
                  }`}>
                    {badge.iconName}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black font-mono text-sm text-[#2D2D2D] truncate">
                        {badge.titleZh}
                      </h4>
                      {isUnlocked ? (
                        <span className="px-2 py-0.5 bg-green-100 text-[#487E2C] border border-green-300 rounded-full text-[10px] font-mono font-black flex items-center space-x-0.5">
                          <CheckCircle className="w-3 h-3" />
                          <span>已解锁</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-500 rounded-full text-[10px] font-mono font-bold flex items-center space-x-0.5">
                          <Lock className="w-3 h-3" />
                          <span>未达成</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-bold leading-tight line-clamp-2">
                      {badge.description}
                    </p>
                  </div>
                </div>

                {/* Middle: Real-time Progress Bar */}
                <div className="pt-1 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                    <span className={isUnlocked ? 'text-[#487E2C] font-black' : 'text-slate-500'}>
                      {prog.statusText}
                    </span>
                    <span className="text-slate-400">
                      {prog.percent}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isUnlocked ? 'bg-[#487E2C]' : 'bg-blue-500'
                      }`}
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>

                  <p className="text-[10px] font-mono text-slate-500 leading-tight">
                    💡 {prog.hintText}
                  </p>
                </div>

                {/* Bottom: Fast Action Button if locked */}
                {!isUnlocked && action.onClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      action.onClick?.();
                    }}
                    className="w-full py-1.5 px-3 bg-slate-100 hover:bg-[#487E2C] hover:text-white text-slate-700 rounded-xl border border-slate-300 hover:border-black font-mono font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
