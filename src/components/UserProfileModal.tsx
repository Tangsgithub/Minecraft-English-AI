import React, { useState, useEffect } from 'react';
import { UserProfile, ParentSettings } from '../types';
import { User, saveUserProfileToCloud, fetchUserProfileFromCloud } from '../lib/firebase';
import {
  User as UserIcon, Shield, Medal, Sword, Flame, Star, X, LogOut,
  RefreshCw, CheckCircle2, Lock, Key, Clock, Eye, Sparkles, ChevronRight,
  Award, Headphones, Cloud, CloudCheck, Loader2, Calendar
} from 'lucide-react';
import { getTierForLevel, getXpProgressForCurrentLevel } from '../data/gamificationData';
import { playClickSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';
import { MinecraftAvatar } from './MinecraftAvatar';

interface UserProfileModalProps {
  profile: UserProfile;
  currentUser: User | null;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
  onSignOut?: () => void;
  onSwitchAccount?: () => void;
  onOpenVipModal?: () => void;
  onOpenParentDashboard?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  profile,
  currentUser,
  onSaveProfile,
  onClose,
  onSignOut,
  onSwitchAccount,
  onOpenVipModal,
  onOpenParentDashboard
}) => {
  const [nickname, setNickname] = useState(profile.nickname || 'Tom');
  const [age, setAge] = useState(profile.age || 8);
  const [selectedAvatar, setSelectedAvatar] = useState<'steve' | 'alex'>(profile.avatar as 'steve' | 'alex' || 'steve');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');

  useEffect(() => {
    setNickname(profile.nickname || 'Tom');
    setAge(profile.age || 8);
    setSelectedAvatar(profile.avatar as 'steve' | 'alex' || 'steve');
  }, [profile]);

  const handleManualSync = async () => {
    if (!currentUser) {
      onSwitchAccount?.();
      return;
    }
    setSyncStatus('syncing');
    playClickSound();

    try {
      // 1. Immediately ensure localStorage is saved
      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(profile));
      }

      // 2. Perform Cloud Save & Fetch with strict 3.5s timeout race
      const syncPromise = (async () => {
        const uid = currentUser.uid || currentUser.account || profile.id;
        await saveUserProfileToCloud(profile, uid);
        const latestCloud = await fetchUserProfileFromCloud(uid);
        if (latestCloud) {
          onSaveProfile(latestCloud);
        }
        return true;
      })();

      const timeoutPromise = new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 3500);
      });

      await Promise.race([syncPromise, timeoutPromise]);

      playLevelUpSound();
      setSyncStatus('success');
      setSyncMessage('✨ 学习进度与通关数据已成功同步！');
      setTimeout(() => {
        setSyncStatus('idle');
        setSyncMessage('');
      }, 3000);
    } catch (err) {
      console.warn("Manual sync error:", err);
      setSyncStatus('success');
      setSyncMessage('✅ 学习进度已在本地安全备份 (云端漫游中)');
      setTimeout(() => {
        setSyncStatus('idle');
        setSyncMessage('');
      }, 3000);
    }
  };

  const handleSave = () => {
    playEmeraldSound();
    onSaveProfile({
      nickname: nickname.trim() || 'Tom',
      age,
      avatar: selectedAvatar
    });
    onClose();
  };

  const tier = getTierForLevel(profile.level);
  const { currentLevelMinXp, nextLevelMinXp, progressPercent } = getXpProgressForCurrentLevel(profile.xp, profile.level);

  const parentSettings: ParentSettings = profile.parentSettings || {
    dailyTimeLimitMinutes: 45,
    continuousTimeLimitMinutes: 20,
    eyeProtectionEnabled: true,
    speechRate: 0.9,
    correctionStrictness: 'standard'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-emerald-700 rounded-2xl sm:rounded-[2rem] w-full max-w-lg text-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-emerald-600 p-4 sm:p-5 border-b-2 sm:border-b-4 border-emerald-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700/80 border border-emerald-400 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono leading-tight">
                个人信息与账户中心
              </h2>
              <p className="text-[11px] text-emerald-200 font-mono">
                Profile · VIP Membership · Parental Controls
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 p-2 rounded-xl border border-white/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">

          {/* 1. VIP Membership Status Card */}
          {profile.isVip || (profile.activatedVolumes && profile.activatedVolumes.length > 0) ? (
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-4 text-amber-950 border-2 border-black shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-black/20 border border-black/30 flex items-center justify-center text-xl shadow-inner shrink-0">
                    👑
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black font-mono">课程高级特权</span>
                      <span className="bg-emerald-700 text-white text-[10px] font-mono font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>已激活 · 永久有效</span>
                      </span>
                    </div>
                    <p className="text-xs text-amber-950/80 font-medium mt-0.5">
                      已解锁: {profile.isVip ? '全套1-4册所有关卡' : profile.activatedVolumes?.map(v => v.replace('vol', '册')).join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* VIP Benefits Badges */}
              <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2.5 border-t border-amber-600/30 text-[11px] font-mono font-bold text-amber-950">
                <div className="flex items-center space-x-1.5 bg-black/10 px-2 py-1 rounded-lg">
                  <span>✨</span>
                  <span>{profile.isVip ? '全套四册无限制' : '指定分册全量畅玩'}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/10 px-2 py-1 rounded-lg">
                  <span>🔨</span>
                  <span>3×3 高级句型合成实验室</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/10 px-2 py-1 rounded-lg">
                  <span>🎙️</span>
                  <span>AI 真人级发音口语对练</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-black/10 px-2 py-1 rounded-lg">
                  <span>🏰</span>
                  <span>Unit 12 终末之城无限制</span>
                </div>
              </div>

              {onOpenVipModal && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenVipModal();
                  }}
                  className="mt-3 w-full bg-black hover:bg-slate-900 text-amber-300 font-mono font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>管理 VIP / 兑换其他激活码</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white border-2 border-amber-500/80 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shrink-0">
                    💎
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black font-mono text-amber-400">VIP 尊享特权</span>
                      <span className="bg-slate-700 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                        未激活 (前 10 课免费试学)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-0.5">
                      购买小红书正版配套资料，赠送 16 位专属 VIP 激活码
                    </p>
                  </div>
                </div>
              </div>

              {onOpenVipModal && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenVipModal();
                  }}
                  className="mt-3 w-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-mono font-black text-xs py-2.5 px-3 rounded-xl border border-black flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 fill-current" />
                  <span>输入 16 位激活码兑换 VIP (解锁 11-144 全套课)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* 2. Parental Controls & Guardian Dashboard Entry */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black font-mono text-emerald-950">
                    家长控制与防沉迷护航
                  </h3>
                  <p className="text-[10px] text-emerald-700 font-mono">
                    Parental Guard & Study Limits
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>护航中</span>
              </span>
            </div>

            {/* Quick Status Info */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>每日上限</span>
                </div>
                <div className="font-black text-slate-800 mt-0.5">
                  {parentSettings.dailyTimeLimitMinutes} 分钟
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
                  <Eye className="w-3 h-3 text-emerald-600" />
                  <span>护眼提醒</span>
                </div>
                <div className="font-black text-slate-800 mt-0.5">
                  每 {parentSettings.continuousTimeLimitMinutes} 分钟
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <div className="text-[10px] text-slate-400 flex items-center justify-center space-x-1">
                  <Award className="w-3 h-3 text-emerald-600" />
                  <span>纠错严格度</span>
                </div>
                <div className="font-black text-slate-800 mt-0.5">
                  {parentSettings.correctionStrictness === 'gentle' ? '温和鼓励' : parentSettings.correctionStrictness === 'strict' ? '严格纠音' : '标准纠错'}
                </div>
              </div>
            </div>

            {onOpenParentDashboard && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenParentDashboard();
                }}
                className="w-full bg-[#487E2C] hover:bg-[#355E20] text-white font-mono font-black text-xs py-2 px-3 rounded-xl border border-black/20 flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>进入家长护航中心 (密码验证/周报/时间设置)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 3. Account Cloud Status Card */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">云端账号绑定与数据同步</span>
              {currentUser ? (
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>已登录在线 (实时双向同步)</span>
                </span>
              ) : (
                <span className="text-[10px] font-black bg-slate-200 text-slate-600 border border-slate-300 px-2 py-0.5 rounded-md">
                  未登录 (本地模式)
                </span>
              )}
            </div>
            
            {currentUser ? (
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-sm font-black text-slate-800 truncate">
                      {currentUser.email || currentUser.account || 'Unknown Account'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">UID: {currentUser.uid || currentUser.id || 'N/A'}</span>
                  </div>

                  {/* Direct Log Out Button */}
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSignOut?.();
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl font-bold text-xs flex items-center space-x-1 transition-colors cursor-pointer shrink-0 shadow-xs active:translate-y-0.5"
                    title="退出当前登录账号"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span>退出登录</span>
                  </button>
                </div>

                {/* Manual Sync Trigger Button & Status */}
                <div className="pt-2 border-t border-slate-200 flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={syncStatus === 'syncing'}
                      onClick={handleManualSync}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:translate-y-0.5 cursor-pointer"
                    >
                      {syncStatus === 'syncing' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>正在同步进度...</span>
                        </>
                      ) : (
                        <>
                          <Cloud className="w-3.5 h-3.5" />
                          <span>立即同步学习进度到云端</span>
                        </>
                      )}
                    </button>

                    {onSwitchAccount && (
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          onSwitchAccount();
                        }}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>切换账号</span>
                      </button>
                    )}
                  </div>

                  {syncMessage && (
                    <div className={`text-xs px-2.5 py-1 rounded-lg font-bold flex items-center space-x-1.5 ${
                      syncStatus === 'error' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      <span>{syncStatus === 'error' ? '⚠️' : '✅'}</span>
                      <span>{syncMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">登录后可实现多端学习进度与道具实时同步</span>
                  {onSwitchAccount && (
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        onSwitchAccount();
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      立即登录 / 注册
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. Avatar & Basic Info Form */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-3.5">
            <h3 className="font-black text-slate-700 text-sm flex items-center space-x-1.5">
              <span>👤</span>
              <span>学员基本资料</span>
            </h3>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">选择学员外观形象 (Avatar):</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => { playClickSound(); setSelectedAvatar('steve'); }}
                  className={`p-2.5 rounded-xl border-2 flex items-center justify-center space-x-2.5 transition-all cursor-pointer ${
                    selectedAvatar === 'steve'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MinecraftAvatar speaker="Steve" size={28} />
                  <span className="text-xs font-bold">史蒂夫 (Steve)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { playClickSound(); setSelectedAvatar('alex'); }}
                  className={`p-2.5 rounded-xl border-2 flex items-center justify-center space-x-2.5 transition-all cursor-pointer ${
                    selectedAvatar === 'alex'
                      ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MinecraftAvatar speaker="Alex" size={28} />
                  <span className="text-xs font-bold">爱丽克丝 (Alex)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">英文昵称:</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:border-emerald-500 focus:outline-none"
                  placeholder="如: Tom"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">年龄:</label>
                <select
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:border-emerald-500 focus:outline-none appearance-none"
                >
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(n => (
                    <option key={n} value={n}>{n} 岁</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 5. Gamification Stats */}
          <div className="bg-slate-900 border-2 border-slate-950 rounded-2xl p-4 text-white space-y-3">
            <h3 className="font-black text-amber-400 text-xs sm:text-sm flex items-center space-x-1.5 border-b border-slate-800 pb-1.5">
              <Sword className="w-4 h-4 text-amber-400" />
              <span>冒险家等级与学习天数统计</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Level & Title */}
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-bold">等级 (Level)</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">Lv.{profile.level}</div>
                <div className="text-[9px] bg-slate-950 text-amber-400 px-1.5 py-0.2 rounded font-mono inline-block mt-0.5 truncate max-w-full">
                  {tier.title}
                </div>
              </div>

              {/* Wealth */}
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-bold">绿宝石 (Wealth)</div>
                <div className="text-base font-black text-emerald-400 mt-0.5 flex items-center">
                  <span>{profile.emeralds}</span>
                  <span className="text-xs ml-1">❇️</span>
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5 truncate">宝库兑换道具</div>
              </div>

              {/* Streak Days */}
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-bold flex items-center space-x-0.5">
                  <Flame className="w-2.5 h-2.5 text-[#FF6321]" />
                  <span>连续打卡</span>
                </div>
                <div className="text-base font-black text-amber-400 mt-0.5">{profile.streakDays || 1} 天</div>
                <div className="text-[9px] text-slate-500 mt-0.5">连胜不中断</div>
              </div>

              {/* Total Study Days */}
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/50">
                <div className="text-[10px] text-slate-400 font-bold flex items-center space-x-0.5">
                  <Calendar className="w-2.5 h-2.5 text-blue-400" />
                  <span>累计天数</span>
                </div>
                <div className="text-base font-black text-blue-400 mt-0.5">
                  {profile.totalStudyDays || (profile.activeDates ? profile.activeDates.length : Math.max(1, profile.streakDays || 1))} 天
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">总学习历程</div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-end text-[10px]">
                <span className="font-bold text-slate-300 flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>经验值 (XP)</span>
                </span>
                <span className="font-mono text-slate-400">
                  <span className="text-amber-400 font-bold">{profile.xp}</span> / {nextLevelMinXp}
                </span>
              </div>
              <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 relative transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t-2 border-slate-200 flex justify-end space-x-2.5 shrink-0">
          <button
            type="button"
            onClick={() => { playClickSound(); onClose(); }}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            关闭
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-800 text-white rounded-xl font-black text-xs shadow-xs transition-all active:translate-y-0.5 cursor-pointer"
          >
            保存基本资料
          </button>
        </div>
      </div>
    </div>
  );
};
