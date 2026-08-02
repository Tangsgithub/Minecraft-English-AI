import React from 'react';
import { UserProfile } from '../types';
import { getTierForLevel, getXpProgressForCurrentLevel } from '../data/gamificationData';
import { Volume2, VolumeX, Settings, Sparkles, Flame, Shield, HelpCircle } from 'lucide-react';
import { getSoundEnabled, toggleSoundEffects, playClickSound } from '../utils/audio';

interface HeaderBarProps {
  profile: UserProfile;
  onOpenSettings: () => void;
  onOpenHelpWizard: () => void;
  onOpenParentDashboard: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  profile,
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
    <header className="bg-[#487E2C] border-b-4 border-[#355E20] text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & User Profile Badge */}
        <div className="flex items-center space-x-3">
          {/* Minecraft Pixel Box Logo */}
          <div className="w-11 h-11 bg-[#8B8B8B] border-4 border-black flex items-center justify-center text-xl shadow-md font-mono font-bold select-none transform hover:scale-105 transition-transform">
            ⛏️
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg text-white font-mono tracking-wide uppercase drop-shadow-sm">
                Minecraft English AI
              </span>
              <span className="text-[10px] font-black bg-[#FFD700] text-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                V1.0
              </span>
            </div>

            {/* Player Name & Title Tier */}
            <div className="flex items-center space-x-2 text-xs text-white/90">
              <span className="font-bold text-[#FFD700]">👤 {profile.nickname || 'Olaf'}</span>
              <span className="opacity-60">•</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/20 border border-white/30 font-bold backdrop-blur-sm">
                {tier.icon} Lv.{profile.level} {tier.title}
              </span>
            </div>
          </div>
        </div>

        {/* Center: XP Bar & Emerald / Streak Counters */}
        <div className="flex items-center space-x-4 bg-black/25 px-4 py-2 rounded-2xl border-2 border-white/20 shadow-inner backdrop-blur-sm">
          
          {/* XP Progress Bar */}
          <div className="w-28 sm:w-44">
            <div className="flex justify-between text-[11px] font-mono font-bold mb-1 text-white">
              <span>XP</span>
              <span className="text-[#7CFC00]">{profile.xp} / {nextLevelMinXp}</span>
            </div>
            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-[#7CFC00] rounded-full transition-all duration-500 shadow-[inset_-2px_0px_4px_rgba(0,0,0,0.2)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="h-6 w-px bg-white/30" />

          {/* Emerald Counter ❇️ */}
          <div className="flex items-center space-x-1.5 text-white font-mono font-black text-sm" title="绿宝石奖励">
            <span className="text-base">❇️</span>
            <span>{profile.emeralds}</span>
          </div>

          <div className="h-6 w-px bg-white/30" />

          {/* Streak Counter 🔥 */}
          <div className="flex items-center space-x-1.5 text-[#FFD700] font-mono font-black text-sm" title="连续连胜天数">
            <Flame className="w-4 h-4 text-[#FF6321] fill-[#FF6321] animate-pulse" />
            <span>{profile.streakDays}d</span>
          </div>
        </div>

        {/* Right Actions: Sound & Settings */}
        <div className="flex items-center space-x-2">
          {/* Parent Guardian Center button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenParentDashboard();
            }}
            className="px-3 py-2 bg-[#FFD700] hover:bg-[#ffea75] border-2 border-black text-[#2D2D2D] rounded-xl transition-all flex items-center space-x-1 text-xs font-black font-mono shadow-[0_3px_0_0_#998000]"
            title="家长护航与周报报告"
          >
            <Shield className="w-4 h-4 text-[#487E2C]" />
            <span className="hidden sm:inline">家长中心</span>
          </button>

          {/* Help / Guide */}
          <button
            onClick={() => {
              playClickSound();
              onOpenHelpWizard();
            }}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white rounded-xl transition-all flex items-center space-x-1 text-xs font-bold font-mono shadow-sm"
            title="查看白皮书与引导指南"
          >
            <HelpCircle className="w-4 h-4 text-[#7CFC00]" />
            <span className="hidden sm:inline">指南</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 border-2 rounded-xl transition-all shadow-sm ${
              soundEnabled
                ? 'bg-white/20 border-white text-white'
                : 'bg-black/30 border-white/30 text-white/60 hover:bg-black/40'
            }`}
            title={soundEnabled ? '音效已开启' : '音效已静音'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Settings / API Key */}
          <button
            onClick={() => {
              playClickSound();
              onOpenSettings();
            }}
            className="px-3 py-2 bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white rounded-xl transition-all flex items-center space-x-1.5 text-xs font-black font-mono shadow-[0_3px_0_0_#993300]"
            title="配置 DeepSeek API Key 与系统设置"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">API 设置</span>
          </button>
        </div>

      </div>
    </header>
  );
};
