import React from 'react';
import { UserProfile } from '../types';
import { LEVEL_TIERS, BADGES_DATA, getTierForLevel, getLevelFromXp } from '../data/gamificationData';
import { Trophy, Award, Flame, BookOpen, CheckCircle, Lock, Shield, Sparkles } from 'lucide-react';

interface AchievementsViewProps {
  profile: UserProfile;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ profile }) => {
  const currentTier = getTierForLevel(profile.level);

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
              加入 Minecraft 英语冒险探险队 • 年龄 {profile.age} 岁
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
                <span>已掌握 {profile.masteredWords.length} 单词</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Growth Path (Whitepaper Section 8.6) */}
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
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#2D2D2D]">
        <h3 className="text-sm font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#FFD700]" />
          <span>荣誉勋章陈列馆 (Achievement Badges)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES_DATA.map(badge => {
            const isUnlocked = profile.unlockedBadgeIds.includes(badge.id) || badge.isUnlocked;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-4 transition-all flex items-start space-x-3 ${
                  isUnlocked
                    ? 'bg-amber-50/80 border-[#FFD700] text-[#2D2D2D] shadow-[4px_4px_0px_0px_rgba(255,215,0,0.2)]'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                  {badge.iconName}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-black font-mono text-xs text-[#2D2D2D]">
                      {badge.titleZh}
                    </h4>
                    {!isUnlocked && <Lock className="w-3 h-3 text-slate-400" />}
                  </div>
                  <p className="text-[11px] text-slate-600 font-bold leading-tight">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
