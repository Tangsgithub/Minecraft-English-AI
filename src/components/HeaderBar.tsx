import React from 'react';
import { UserProfile } from '../types';
import { getTierForLevel, getXpProgressForCurrentLevel } from '../data/gamificationData';
import { Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle, Cloud, User as UserIcon } from 'lucide-react';
import { getSoundEnabled, toggleSoundEffects, playClickSound } from '../utils/audio';
import { User } from 'firebase/auth';

interface HeaderBarProps {
  profile: UserProfile;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onOpenHelpWizard: () => void;
  onOpenParentDashboard: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  profile,
  currentUser,
  onOpenAuth,
  onOpenSettings,
  onOpenHelpWizard,
  onOpenParentDashboard,
  soundEnabled,
  setSoundEnabled
}) => {
  const tier = getTierForLevel(profile.level);
  
  // XP calculation for next level
  const { nextLevelMinXp, progressPercent } = getXpProgressForCurrentLevel(profile.xp, profile.level);

  const handleSoundToggle = () => {
    const newState = toggleSoundEffects();
    setSoundEnabled(newState);
    if (newState) playClickSound();
  };

  return (
    <header className="bg-[#487E2C] border-b-4 border-[#355E20] text-white shadow-lg sticky top-0 z-40 pt-safe">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        
        {/* Brand & User Profile Badge */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Minecraft Pixel Box Logo */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#8B8B8B] border-2 sm:border-4 border-black flex items-center justify-center text-lg sm:text-xl shadow-md font-mono font-bold select-none transform hover:scale-105 transition-transform shrink-0">
            ⛏️
          </div>

          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-black text-sm sm:text-base md:text-lg text-white font-mono tracking-wide uppercase drop-shadow-sm">
                Minecraft English
              </span>
              <span className="text-[9px] sm:text-[10px] font-black bg-[#FFD700] text-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                AI
              </span>
            </div>

            {/* Player Name & Title Tier */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs text-white/90">
              <span className="font-bold text-[#FFD700]">👤 {profile.nickname || 'Olaf'}</span>
              <span className="opacity-60">•</span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-black/20 border border-white/30 font-bold backdrop-blur-sm whitespace-nowrap">
                {tier.icon} Lv.{profile.level} {tier.title}
              </span>
            </div>
          </div>
        </div>

        {/* Center: XP Bar & Emerald / Streak Counters */}
        <div className="flex items-center space-x-2 sm:space-x-4 bg-black/25 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border-2 border-white/20 shadow-inner backdrop-blur-sm shrink-0">
          
          {/* XP Progress Bar */}
          <div className="w-20 xs:w-28 sm:w-44">
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono font-bold mb-0.5 sm:mb-1 text-white">
              <span>XP</span>
              <span className="text-[#7CFC00]">{profile.xp}/{nextLevelMinXp}</span>
            </div>
            <div className="h-2.5 sm:h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-[#7CFC00] rounded-full transition-all duration-500 shadow-[inset_-2px_0px_4px_rgba(0,0,0,0.2)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-5 sm:h-6 w-px bg-white/30" />

          {/* Emerald Counter ❇️ */}
          <div className="flex items-center space-x-1 text-white font-mono font-black text-xs sm:text-sm" title="绿宝石奖励">
            <span className="text-sm sm:text-base">❇️</span>
            <span>{profile.emeralds}</span>
          </div>

          <div className="h-5 sm:h-6 w-px bg-white/30" />

          {/* Streak Counter 🔥 */}
          <div className="flex items-center space-x-1 text-[#FFD700] font-mono font-black text-xs sm:text-sm" title="连续连胜天数">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6321] fill-[#FF6321] animate-pulse" />
            <span>{profile.streakDays}d</span>
          </div>
        </div>

        {/* Right Actions: Auth Cloud, Sound & Settings */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          
          {/* Cloud Auth Account Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenAuth();
            }}
            className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_rgba(0,0,0,0.5)] active:translate-y-0.5 ${
              currentUser
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-amber-500 hover:bg-amber-400 text-amber-950 font-black'
            }`}
            title={currentUser ? `云端同步中: ${currentUser.email}` : '注册/登录云端数据库账号'}
          >
            <Cloud className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentUser ? 'text-emerald-200 animate-pulse' : 'text-amber-950'}`} />
            <span className="hidden xs:inline">
              {currentUser ? '云端已挂载' : '注册/登录'}
            </span>
          </button>

          {/* Parent Guardian Center button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenParentDashboard();
            }}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#FFD700] hover:bg-[#ffea75] border-2 border-black text-[#2D2D2D] rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_2px_0_0_#998000] active:translate-y-0.5"
            title="家长护航与周报报告"
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#487E2C]" />
            <span className="hidden xs:inline">家长中心</span>
          </button>

          {/* Help / Guide */}
          <button
            onClick={() => {
              playClickSound();
              onOpenHelpWizard();
            }}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-bold font-mono shadow-sm active:translate-y-0.5"
            title="查看白皮书与引导指南"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7CFC00]" />
            <span className="hidden md:inline">指南</span>
          </button>

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

          {/* Settings / API Key */}
          <button
            onClick={() => {
              playClickSound();
              onOpenSettings();
            }}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1 sm:space-x-1.5 text-xs font-black font-mono shadow-[0_2px_0_0_#993300] active:translate-y-0.5"
            title="配置 DeepSeek API Key 与系统设置"
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">API 设置</span>
          </button>
        </div>

      </div>
    </header>
  );
};

