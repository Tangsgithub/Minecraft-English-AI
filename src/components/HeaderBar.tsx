import React, { useState, useEffect } from 'react';
import { UserProfile, APP_VERSION_INFO, CourseVolumeId } from '../types';
import { getTierForLevel, getXpProgressForCurrentLevel } from '../data/gamificationData';
import { Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle, Cloud, User as UserIcon, Mic, Headphones, ChevronDown, LogOut } from 'lucide-react';
import { getSoundEnabled, toggleSoundEffects, playClickSound, playEmeraldSound, unlockAudio } from '../utils/audio';
import { User } from '../lib/firebase';

interface HeaderBarProps {
  selectedVolumeId: CourseVolumeId;
  onChangeVolumeId: (id: CourseVolumeId) => void;
  profile: UserProfile;
  currentUser?: User | null;
  onOpenAuth?: () => void;
  onSignOut?: () => void;
  onOpenVipModal?: () => void;
  onOpenSettings: () => void;
  onOpenUserProfile?: () => void;
  onOpenHelpWizard: () => void;
  onOpenParentDashboard: () => void;
  onOpenCustomerService?: () => void;
  onGoToLandingPage?: () => void;
  onOpenAdminConsole?: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  selectedVolumeId,
  onChangeVolumeId,
  profile,
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenVipModal,
  onOpenSettings,
  onOpenUserProfile,
  onOpenHelpWizard,
  onOpenParentDashboard,
  onOpenCustomerService,
  onGoToLandingPage,
  onOpenAdminConsole,
  soundEnabled,
  setSoundEnabled
}) => {
  const tier = getTierForLevel(profile.level);
  
  // XP calculation for next level
  const { nextLevelMinXp, progressPercent } = getXpProgressForCurrentLevel(profile.xp, profile.level);

  const handleSoundToggle = () => {
    unlockAudio();
    const newState = toggleSoundEffects();
    setSoundEnabled(newState);
    if (newState) {
      playEmeraldSound();
    }
  };

  const currentVolume = APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId) || APP_VERSION_INFO.volumes[0];

  return (
    <header className="bg-gradient-to-r from-[#17300e] via-[#2a591a] to-[#17300e] border-b-3 sm:border-b-4 border-[#0f1f09] text-white shadow-[0_8px_20px_rgba(0,0,0,0.4)] sticky top-0 z-40 pt-safe relative">
      {/* Top subtle highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2.5 sm:py-4">
        
        {/* Main Header Flex Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Crest & Volume Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 shrink-0">
            
            {/* Minecraft 3D Pixel Icon Crest */}
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={() => onGoToLandingPage?.()}
              title="返回产品官网/介绍"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#5c4033] border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl shadow-[0_3px_0_0_#2b1810] relative overflow-hidden transition-transform group-hover:scale-105 active:scale-95">
                <div className="absolute top-0 left-0 right-0 h-2.5 sm:h-3 bg-[#487E2C] border-b-2 border-[#2A4718]" />
                <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">⛏️</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="font-black text-xs sm:text-base md:text-lg text-amber-300 font-mono tracking-tight uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center space-x-1">
                  <span>MC</span>
                  <span className="text-white hidden xs:inline">ENGLISH</span>
                </h1>

                {/* Volume Switcher Dropdown Badge */}
                <div className="relative group">
                  <button
                    type="button"
                    className="flex items-center space-x-1 text-[10px] sm:text-xs font-black font-mono bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 px-2 sm:px-2.5 py-0.5 rounded-lg border-2 border-black uppercase tracking-wide shadow-xs transition-all cursor-pointer active:translate-y-0.5"
                  >
                    <span>{currentVolume.title.replace('新概念英语 ', '新概念 ')}</span>
                    <ChevronDown className="w-3 h-3 stroke-[3]" />
                  </button>
                  <div className="absolute left-0 top-full mt-2 w-60 bg-slate-900 border-2 border-amber-400/60 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden p-1.5">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                      <span>新概念教材分册</span>
                      <span className="text-amber-400 text-[9px]">1册 & 2册全量开放</span>
                    </div>
                    {APP_VERSION_INFO.volumes.map(vol => {
                      const isComingSoon = vol.status === 'coming_soon';
                      const isUnactivated = !profile.isVip && vol.id !== 'vol1' && !(profile.activatedVolumes && profile.activatedVolumes.includes(vol.id));
                      const isLocked = isComingSoon || isUnactivated;
                      const statusText = isComingSoon 
                        ? '教研打磨中 · 敬请期待' 
                        : isUnactivated
                        ? '未解锁 · 需激活'
                        : vol.id === 'vol1' 
                        ? '144关真实课文已全量开放' 
                        : '96关真实课文已全量开放';
                      return (
                        <button
                          key={vol.id}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return;
                            playClickSound();
                            onChangeVolumeId(vol.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-between my-0.5 ${
                            isLocked
                              ? 'text-slate-500 bg-slate-950/40 cursor-not-allowed opacity-75'
                              : selectedVolumeId === vol.id
                              ? 'bg-emerald-600 text-white shadow-xs cursor-pointer'
                              : 'text-slate-200 hover:bg-slate-800 hover:text-amber-300 cursor-pointer'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="flex items-center space-x-1">
                              <span>{vol.title}</span>
                              {isLocked && <span className="text-[10px]">🔒</span>}
                            </span>
                            <span className="text-[10px] font-normal opacity-70">
                              {statusText}
                            </span>
                          </div>
                          {selectedVolumeId === vol.id ? (
                            <span className="text-amber-300 text-xs">✓</span>
                          ) : isLocked ? (
                            <span className="text-[9px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded border border-slate-700">敬请期待</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Subtitle / Realm Title (Desktop Only) */}
              <div className="hidden md:flex items-center space-x-2 text-xs text-emerald-200/90 font-mono mt-0.5">
                <span className="font-bold">新概念英语探险元宇宙</span>
                <span className="opacity-40">•</span>
                <span className="text-amber-300 font-black">{tier.title}</span>
              </div>
            </div>
          </div>

          {/* Desktop HUD: Grand RPG HUD Plate (XP, Emeralds, Streak) */}
          <div className="hidden lg:flex items-center space-x-3 bg-black/40 border-2 border-black/80 px-3 py-2 rounded-2xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] ring-1 ring-white/10 shrink-0">
            
            {/* Level Badge */}
            <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-amber-400/40 px-2 py-1 rounded-xl shadow-xs shrink-0">
              <span className="text-sm">{tier.icon}</span>
              <span className="text-xs font-black font-mono text-amber-300">Lv.{profile.level}</span>
            </div>

            {/* XP Progress Bar */}
            <div className="w-36">
              <div className="flex justify-between text-[10px] font-mono font-bold mb-1 text-white">
                <span className="text-emerald-300 font-black">XP</span>
                <span className="text-amber-300 font-black">{profile.xp} / {nextLevelMinXp}</span>
              </div>
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Emerald Vault Counter */}
            <div
              className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-white font-mono font-black text-xs shadow-xs"
              title="绿宝石财富（可在村庄集市兑换道具）"
            >
              <span className="text-sm animate-pulse">❇️</span>
              <span className="text-emerald-300">{profile.emeralds}</span>
            </div>

            {/* Streak Flame Counter */}
            <div
              className="flex items-center space-x-1.5 bg-orange-950/60 border border-orange-500/40 px-2.5 py-1 rounded-xl text-white font-mono font-black text-xs shadow-xs"
              title="连续每日学习连胜天数"
            >
              <Flame className="w-3.5 h-3.5 text-[#FF6321] fill-[#FF6321] animate-bounce" />
              <span className="text-amber-300">{profile.streakDays}d</span>
            </div>
          </div>

          {/* Right Actions: User Profile / VIP / Audio / Settings */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            
            {/* User Profile & Account Center Capsule */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                if (currentUser || onOpenUserProfile) {
                  onOpenUserProfile?.();
                } else {
                  onOpenAuth?.();
                }
              }}
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-900/90 hover:bg-slate-800 border-2 border-black rounded-xl transition-all flex items-center space-x-1.5 text-xs font-black font-mono shadow-[0_2px_0_0_#000] active:translate-y-0.5 cursor-pointer"
              title="查看个人档案、VIP特权与家长控制"
            >
              <div className="w-5 h-5 rounded-lg bg-black/30 border border-white/20 flex items-center justify-center text-xs relative shrink-0">
                <span>{profile.avatar === 'alex' ? '👩‍🦰' : '🟩'}</span>
              </div>
              <span className="max-w-[55px] sm:max-w-[80px] truncate text-white font-extrabold text-[11px] sm:text-xs">
                {currentUser?.nickname || profile.nickname || '档案'}
              </span>
              {profile.isVip || (profile.activatedVolumes && profile.activatedVolumes.length > 0) ? (
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-[9px] px-1 py-0.2 rounded border border-amber-500 flex items-center space-x-0.5 shadow-xs" title="已激活权益">
                  <span>👑</span>
                  <span className="hidden sm:inline">
                    {profile.isVip ? 'VIP' : profile.activatedVolumes?.map(v => v.replace('vol', '册')).join(',')}
                  </span>
                </span>
              ) : (
                <span className="bg-emerald-800 text-emerald-200 text-[9px] px-1 py-0.2 rounded">
                  Lv.{profile.level}
                </span>
              )}
            </button>

            {/* Guide Manual Button (Medium screen and up) */}
            <button
              onClick={() => {
                playClickSound();
                onOpenHelpWizard();
              }}
              className="hidden md:flex px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#2196F3] hover:bg-[#1976D2] border-2 border-black text-white rounded-xl transition-all items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#0D47A1] active:translate-y-0.5 cursor-pointer"
              title="查看新手学习指导手册"
            >
              <HelpCircle className="w-3.5 h-3.5 text-white" />
              <span>指南</span>
            </button>

            {/* Customer Service button (Medium screen and up) */}
            {onOpenCustomerService && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCustomerService();
                }}
                className="hidden sm:flex px-2 sm:px-2.5 py-1 sm:py-1.5 bg-emerald-500 hover:bg-emerald-400 border-2 border-black text-slate-950 font-black rounded-xl transition-all items-center space-x-1 text-xs font-mono shadow-[0_2px_0_0_#14532d] active:translate-y-0.5 cursor-pointer"
                title="在线客服与支持"
              >
                <Headphones className="w-3.5 h-3.5 text-slate-950" />
                <span>客服</span>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-1.5 sm:p-2 border-2 rounded-xl transition-all shadow-[0_2px_0_0_#000] active:translate-y-0.5 cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-600/80 border-black text-white'
                  : 'bg-black/50 border-black text-white/50 hover:bg-black/60'
              }`}
              title={soundEnabled ? '音效已开启' : '音效已静音'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Settings */}
            <button
              onClick={() => {
                playClickSound();
                onOpenSettings();
              }}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#993300] active:translate-y-0.5 cursor-pointer"
              title="系统设置与个性化"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">设置</span>
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Dedicated Compact Game HUD Bar */}
        <div className="flex lg:hidden items-center justify-between mt-2 pt-2 border-t border-white/10 gap-2 font-mono">
          {/* Level & Title */}
          <div className="flex items-center space-x-1 bg-black/40 border border-white/20 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-300 shrink-0">
            <span>{tier.icon}</span>
            <span>Lv.{profile.level}</span>
          </div>

          {/* XP Progress Bar */}
          <div className="flex-1 max-w-[150px] xs:max-w-[200px]">
            <div className="flex justify-between text-[9px] font-bold text-white mb-0.5">
              <span className="text-emerald-300">XP</span>
              <span className="text-amber-300">{profile.xp}/{nextLevelMinXp}</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/20 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-lime-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Counters: Emeralds & Streak */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <div className="flex items-center space-x-1 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-lg text-[10px] font-black text-emerald-300">
              <span>❇️</span>
              <span>{profile.emeralds}</span>
            </div>
            <div className="flex items-center space-x-1 bg-orange-950/70 border border-orange-500/40 px-2 py-0.5 rounded-lg text-[10px] font-black text-amber-300">
              <Flame className="w-3 h-3 text-[#FF6321] fill-[#FF6321]" />
              <span>{profile.streakDays}d</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

