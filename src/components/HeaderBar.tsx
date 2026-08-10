import React, { useState, useEffect } from 'react';
import { UserProfile, APP_VERSION_INFO, CourseVolumeId } from '../types';
import { getTierForLevel, getXpProgressForCurrentLevel } from '../data/gamificationData';
import { Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle, Cloud, User as UserIcon, Mic, Headphones, ChevronDown } from 'lucide-react';
import { getSoundEnabled, toggleSoundEffects, playClickSound, playEmeraldSound, unlockAudio } from '../utils/audio';
import { User } from '../lib/firebase';

interface HeaderBarProps {
  selectedVolumeId: CourseVolumeId;
  onChangeVolumeId: (id: CourseVolumeId) => void;
  profile: UserProfile;
  currentUser?: User | null;
  onOpenAuth?: () => void;
  onOpenSettings: () => void;
  onOpenHelpWizard: () => void;
  onOpenParentDashboard: () => void;
  onOpenCustomerService?: () => void;
  onGoToLandingPage?: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  selectedVolumeId,
  onChangeVolumeId,
  profile,
  currentUser,
  onOpenAuth,
  onOpenSettings,
  onOpenHelpWizard,
  onOpenParentDashboard,
  onOpenCustomerService,
  onGoToLandingPage,
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

  return (
    <header className="bg-[#487E2C] border-b-2 sm:border-b-4 border-[#355E20] text-white shadow-lg sticky top-0 z-40 pt-safe">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Brand & User Profile Badge */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          {/* Minecraft Pixel Box Logo */}
          <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#8B8B8B] border-2 sm:border-4 border-black flex items-center justify-center text-base sm:text-xl shadow-md font-mono font-bold select-none shrink-0">
            ⛏️
          </div>

          <div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-black text-xs sm:text-base md:text-lg text-white font-mono tracking-tight sm:tracking-wide uppercase drop-shadow-sm hidden sm:inline">
                Minecraft English
              </span>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-[10px] sm:text-[11px] font-black bg-[#FFD700] hover:bg-amber-300 text-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm transition-colors">
                  <span>{APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId)?.title.replace('新概念英语 ', '新概念')}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute left-0 top-full mt-1 w-48 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                  {APP_VERSION_INFO.volumes.map(vol => (
                    <button
                      key={vol.id}
                      onClick={() => {
                        playClickSound();
                        onChangeVolumeId(vol.id);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold font-mono transition-colors ${selectedVolumeId === vol.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                      {vol.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Player Name & Title Tier */}
            <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs text-white/90">
              <span className="font-bold text-[#FFD700] truncate max-w-[80px] sm:max-w-none">👤 {profile.nickname || 'Olaf'}</span>
              <span className="opacity-60">•</span>
              <span className="px-1 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] bg-black/20 border border-white/30 font-bold backdrop-blur-sm whitespace-nowrap">
                {tier.icon} Lv.{profile.level}
              </span>
            </div>
          </div>
        </div>

        {/* Center: XP Bar & Emerald / Streak Counters */}
        <div className="flex items-center space-x-1.5 sm:space-x-4 bg-black/25 px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl border border-white/20 shadow-inner backdrop-blur-sm shrink-0">
          
          {/* XP Progress Bar */}
          <div className="w-16 xs:w-24 sm:w-40">
            <div className="flex justify-between text-[9px] sm:text-[11px] font-mono font-bold mb-0.5 text-white">
              <span>XP</span>
              <span className="text-[#7CFC00]">{profile.xp}/{nextLevelMinXp}</span>
            </div>
            <div className="h-2 sm:h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-[#7CFC00] rounded-full transition-all duration-500 shadow-[inset_-2px_0px_4px_rgba(0,0,0,0.2)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-4 sm:h-6 w-px bg-white/30" />

          {/* Emerald Counter ❇️ */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 text-white font-mono font-black text-xs sm:text-sm" title="绿宝石奖励">
            <span className="text-xs sm:text-base">❇️</span>
            <span>{profile.emeralds}</span>
          </div>

          <div className="h-4 sm:h-6 w-px bg-white/30" />

          {/* Streak Counter 🔥 */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 text-[#FFD700] font-mono font-black text-xs sm:text-sm" title="连续连胜天数">
            <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6321] fill-[#FF6321] animate-pulse" />
            <span>{profile.streakDays}d</span>
          </div>
        </div>

        {/* Right Actions: Auth Cloud, Sound & Settings */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          
          {/* Auth Registration & Cloud Sync Button */}
          {onOpenAuth && (
            <button
              onClick={() => {
                playClickSound();
                onOpenAuth();
              }}
              className={`px-2 sm:px-3 py-1 sm:py-2 border-2 border-black rounded-xl transition-all flex items-center space-x-1.5 text-xs font-black font-mono active:translate-y-0.5 ${
                currentUser
                  ? 'bg-emerald-900/90 hover:bg-emerald-800 text-emerald-300 border-emerald-400 shadow-[0_2px_0_0_#065f46]'
                  : 'bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-300 hover:to-green-300 text-slate-950 shadow-[0_2px_0_0_#000] animate-pulse'
              }`}
              title={currentUser ? `已登录: ${currentUser.nickname || currentUser.account} (点击管理账号)` : "免费注册/登录账号 (境内直连无需VPN)"}
            >
              <Cloud className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentUser ? 'text-emerald-400' : 'text-slate-950'}`} />
              <span className="hidden sm:inline">
                {currentUser ? (currentUser.nickname || currentUser.account) : '注册/登录'}
              </span>
              {!currentUser && (
                <span className="text-[9px] bg-amber-300 text-black px-1.5 py-0.2 rounded font-black hidden md:inline">
                  直连
                </span>
              )}
            </button>
          )}

          {/* Website / Landing Page Button */}
          {onGoToLandingPage && (
            <button
              onClick={() => {
                playClickSound();
                onGoToLandingPage();
              }}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-purple-700 hover:bg-purple-600 border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#4A148C] active:translate-y-0.5"
              title="返回官网/产品介绍"
            >
              <span className="text-xs">🌐</span>
              <span className="hidden md:inline">官网首页</span>
            </button>
          )}

          {/* Study Guide Manual Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenHelpWizard();
            }}
            className="px-2 sm:px-3 py-1 sm:py-2 bg-[#2196F3] hover:bg-[#1976D2] border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#0D47A1] active:translate-y-0.5"
            title="查看学习指导手册"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span className="hidden sm:inline">指南手册</span>
          </button>

          {/* Parent Guardian Center button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenParentDashboard();
            }}
            className="px-2 sm:px-3 py-1 sm:py-2 bg-[#FFD700] hover:bg-[#ffea75] border-2 border-black text-[#2D2D2D] rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#998000] active:translate-y-0.5"
            title="家长护航与周报报告"
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#487E2C]" />
            <span className="hidden sm:inline">家长</span>
          </button>

          {/* Customer Service button */}
          {onOpenCustomerService && (
            <button
              onClick={() => {
                playClickSound();
                onOpenCustomerService();
              }}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-emerald-500 hover:bg-emerald-400 border-2 border-black text-slate-950 font-black rounded-xl transition-all flex items-center space-x-1 text-xs font-mono shadow-[0_2px_0_0_#000] active:translate-y-0.5"
              title="在线客服与帮助支持"
            >
              <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
              <span className="hidden sm:inline">客服</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-1.5 sm:p-2 border-2 rounded-xl transition-all shadow-sm active:translate-y-0.5 ${
              soundEnabled
                ? 'bg-white/20 border-white text-white'
                : 'bg-black/30 border-white/30 text-white/60 hover:bg-black/40'
            }`}
            title={soundEnabled ? '音效已开启' : '音效已静音'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              playClickSound();
              onOpenSettings();
            }}
            className="px-2 sm:px-3 py-1 sm:py-2 bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 sm:space-x-1.5 text-xs font-black font-mono shadow-[0_2px_0_0_#993300] active:translate-y-0.5"
            title="系统设置与个性化"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">设置</span>
          </button>
        </div>

      </div>
    </header>
  );
};

