import React, { useState } from 'react';
import { Mission, UserProfile } from '../types';
import { INITIAL_MISSIONS, getMissionProgress } from '../data/gamificationData';
import { Scroll, Award, CheckCircle2, Sparkles, Compass, Swords, ShieldCheck, Gift, ArrowRight, Zap, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMissionCompleteSound, playEmeraldSound, playLevelUpSound, playClickSound } from '../utils/audio';

interface MissionsViewProps {
  profile: UserProfile;
  onCompleteMission: (missionId: string, xpReward: number, emeraldReward: number) => void;
  onNavigateToChat: () => void;
  onNavigateToMap?: () => void;
  onNavigateToVocab?: () => void;
  onNavigateToCrafting?: () => void;
  onDailyCheckIn?: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  profile,
  onCompleteMission,
  onNavigateToChat,
  onNavigateToMap,
  onNavigateToVocab,
  onNavigateToCrafting,
  onDailyCheckIn,
  onUpdateProfile
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'daily' | 'adventure' | 'challenge'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'ready' | 'in_progress' | 'completed'>('all');

  const todayStr = new Date().toISOString().split('T')[0];
  const chestOpened = profile.lastEnderChestClaimDate === todayStr;

  const completedDailyIds = profile.completedDailyMissionIds || [];
  const completedPermanentIds = profile.completedMissionIds || [];
  const readyToClaimMissionIds = profile.readyToClaimMissionIds || [];

  const isMissionCompleted = (mission: Mission) => {
    return mission.category === 'daily'
      ? completedDailyIds.includes(mission.id)
      : completedPermanentIds.includes(mission.id);
  };

  const isMissionReady = (mission: Mission) => {
    return readyToClaimMissionIds.includes(mission.id) && !isMissionCompleted(mission);
  };

  const completedCount = INITIAL_MISSIONS.filter(m => isMissionCompleted(m)).length;
  const readyCount = INITIAL_MISSIONS.filter(m => isMissionReady(m)).length;

  const dailyDoneCount = INITIAL_MISSIONS.filter(m => m.category === 'daily' && isMissionCompleted(m)).length;
  const dailyReadyCount = INITIAL_MISSIONS.filter(m => m.category === 'daily' && isMissionReady(m)).length;
  const isChestReady = (dailyDoneCount + dailyReadyCount) >= 2;

  const handleClaimReward = (mission: Mission) => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    playMissionCompleteSound();
    playEmeraldSound();

    onCompleteMission(mission.id, mission.xpReward, mission.emeraldReward);
    const nextReady = readyToClaimMissionIds.filter(id => id !== mission.id);
    onUpdateProfile({
      readyToClaimMissionIds: nextReady
    });
  };

  const handleClaimAllReady = () => {
    const readyMissions = INITIAL_MISSIONS.filter(m => isMissionReady(m));
    if (readyMissions.length === 0) return;

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    playLevelUpSound();
    playEmeraldSound();

    readyMissions.forEach(target => {
      onCompleteMission(target.id, target.xpReward, target.emeraldReward);
    });

    onUpdateProfile({
      readyToClaimMissionIds: []
    });
  };

  const handleOpenEnderChest = () => {
    if (chestOpened) return;
    playLevelUpSound();
    playEmeraldSound();

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 }
    });

    onCompleteMission('daily_ender_chest', 100, 50);
    onUpdateProfile({ lastEnderChestClaimDate: todayStr });
  };

  // Filter missions
  const filteredMissions = INITIAL_MISSIONS.filter(mission => {
    if (activeCategory !== 'all' && mission.category !== activeCategory) {
      return false;
    }
    const isCompleted = isMissionCompleted(mission);
    const isReady = isMissionReady(mission);
    
    if (filterStatus === 'ready' && !isReady) return false;
    if (filterStatus === 'completed' && !isCompleted) return false;
    if (filterStatus === 'in_progress' && (isCompleted || isReady)) return false;

    return true;
  });

  const getActionForMission = (mission: Mission) => {
    if (mission.id === 'daily_001' && onDailyCheckIn && !profile.todayCheckedIn) {
      return {
        label: '今日签到打卡',
        icon: '📍',
        onClick: () => {
          onDailyCheckIn();
        }
      };
    }
    if (mission.id === 'daily_003' || mission.id.startsWith('chal_vocab') || mission.id.startsWith('chal_001') || mission.id.startsWith('chal_002') || mission.id.startsWith('chal_003')) {
      return { label: '去词汇宝典', icon: '📖', onClick: onNavigateToVocab || onNavigateToChat };
    }
    if (mission.id === 'chal_004') {
      return { label: '去合成工坊', icon: '🛠️', onClick: onNavigateToCrafting || onNavigateToChat };
    }
    if (mission.id === 'daily_004') {
      return { label: '去与 Alex 对话', icon: '💬', onClick: onNavigateToChat };
    }
    return { label: '去地图闯关', icon: '🗺️', onClick: onNavigateToMap || onNavigateToChat };
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white/95 border-4 border-[#487E2C] rounded-[2rem] p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#FFD700] border-2 border-black rounded-2xl flex items-center justify-center text-2xl shadow-sm">
            📜
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black font-mono text-[#2D2D2D]">
                Minecraft 英语探险任务告示板
              </h2>
              {readyCount > 0 && (
                <span className="px-2 py-0.5 bg-[#487E2C] text-white text-[10px] font-mono font-black rounded-full animate-bounce">
                  {readyCount} 个奖励可领取
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono font-bold">
              跟随课程进度挑战任务，完成即可领取绿宝石 ❇️ 与经验值 XP 升级！
            </p>
          </div>
        </div>

        {/* Quest Chain Progress & Claim All */}
        <div className="flex items-center space-x-3">
          {readyCount > 0 && (
            <button
              onClick={handleClaimAllReady}
              className="px-4 py-2 bg-[#487E2C] hover:bg-[#386322] text-white rounded-2xl border-2 border-black font-mono font-black text-xs shadow-[0_3px_0_0_#234114] transform hover:translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all flex items-center space-x-1.5"
            >
              <Zap className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              <span>一键领取全部 ({readyCount})</span>
            </button>
          )}

          <div className="bg-slate-100 p-3 rounded-2xl border-2 border-slate-300 flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">总任务达成</span>
              <span className="text-sm font-black font-mono text-[#487E2C]">{completedCount} / {INITIAL_MISSIONS.length}</span>
            </div>
            <div className="w-20 sm:w-24 bg-slate-200 h-3 rounded-full overflow-hidden border border-slate-300">
              <div
                className="bg-[#487E2C] h-full transition-all duration-300"
                style={{ width: `${(completedCount / INITIAL_MISSIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ender Dragon Grand Chest Banner */}
      <div className={`p-5 rounded-3xl border-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        chestOpened
          ? 'bg-slate-100 border-slate-300 text-slate-500'
          : isChestReady
          ? 'bg-gradient-to-r from-purple-900 to-indigo-900 border-[#FFD700] text-white shadow-[8px_8px_0px_0px_rgba(255,215,0,0.3)] animate-pulse'
          : 'bg-slate-800 border-slate-600 text-slate-300'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-purple-950 border-2 border-purple-400 rounded-2xl flex items-center justify-center text-3xl shadow-md">
            {chestOpened ? '📦' : '🎁'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-mono font-black text-base text-[#FFD700]">
                末影龙每日探险大宝箱 (Daily Quest Treasure Chest)
              </h3>
              {isChestReady && !chestOpened && (
                <span className="bg-[#FF6321] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">可领取</span>
              )}
            </div>
            <p className="text-xs font-mono font-semibold opacity-90">
              {chestOpened
                ? '已成功领取今日末影龙宝箱奖励 (+50 ❇️ 绿宝石 +100 XP)！明日 00:00 刷新后继续加油！'
                : isChestReady
                ? '今日日常达标！点击开启获取 50 ❇️ 绿宝石大奖与 100 XP！'
                : `今日再完成 ${Math.max(0, 2 - (dailyDoneCount + dailyReadyCount))} 个每日任务即可开启今日末影龙宝箱！`}
            </p>
          </div>
        </div>

        <div>
          {chestOpened ? (
            <span className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl font-mono font-black text-xs border border-slate-400">
              今日已拆箱
            </span>
          ) : (
            <button
              onClick={handleOpenEnderChest}
              disabled={!isChestReady}
              className={`px-5 py-2.5 rounded-xl font-mono font-black text-xs border-2 transition-all flex items-center space-x-1.5 ${
                isChestReady
                  ? 'bg-[#FFD700] hover:bg-amber-400 border-black text-black shadow-[0_4px_0_0_#b39700] transform hover:translate-y-0.5 active:translate-y-[4px] active:shadow-none'
                  : 'bg-slate-700 border-slate-600 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{isChestReady ? '开启每日宝箱 🎁' : '需达成 2 个每日任务'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs & Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/90 p-3 rounded-2xl border-2 border-slate-200 shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => { playClickSound(); setActiveCategory('all'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#487E2C] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全部任务 ({INITIAL_MISSIONS.length})
          </button>
          <button
            onClick={() => { playClickSound(); setActiveCategory('daily'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCategory === 'daily'
                ? 'bg-[#FF6321] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🌅 每日必做 ({INITIAL_MISSIONS.filter(m => m.category === 'daily').length})
          </button>
          <button
            onClick={() => { playClickSound(); setActiveCategory('adventure'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCategory === 'adventure'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🗺️ 关卡探险 ({INITIAL_MISSIONS.filter(m => m.category === 'adventure').length})
          </button>
          <button
            onClick={() => { playClickSound(); setActiveCategory('challenge'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeCategory === 'challenge'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🏆 传奇挑战 ({INITIAL_MISSIONS.filter(m => m.category === 'challenge').length})
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => { playClickSound(); setFilterStatus('all'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
              filterStatus === 'all' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => { playClickSound(); setFilterStatus('ready'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
              filterStatus === 'ready' ? 'bg-[#487E2C] text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            ✨ 可领取 {readyCount > 0 && `(${readyCount})`}
          </button>
          <button
            onClick={() => { playClickSound(); setFilterStatus('in_progress'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
              filterStatus === 'in_progress' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            ⏳ 进行中
          </button>
          <button
            onClick={() => { playClickSound(); setFilterStatus('completed'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
              filterStatus === 'completed' ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            ✓ 已完成
          </button>
        </div>
      </div>

      {/* Mission Cards */}
      <div className="space-y-4">
        {filteredMissions.map(mission => {
          const isCompleted = isMissionCompleted(mission);
          const isReadyToClaim = isMissionReady(mission);
          const maxUnlocked = Math.max(...(profile.unlockedLessonIds || [1]), 1);
          const isUnlockedByLesson = !mission.requiredLessonId || mission.requiredLessonId <= maxUnlocked;
          const progress = getMissionProgress(mission, profile);
          const action = getActionForMission(mission);

          return (
            <div
              key={mission.id}
              className={`p-5 rounded-3xl border-4 transition-all duration-200 ${
                isCompleted
                  ? 'bg-amber-50/80 border-[#FFD700] shadow-[6px_6px_0px_0px_rgba(255,215,0,0.2)]'
                  : isReadyToClaim
                  ? 'bg-emerald-50 border-[#487E2C] shadow-[6px_6px_0px_0px_rgba(72,126,44,0.3)] ring-2 ring-[#487E2C]'
                  : isUnlockedByLesson
                  ? 'bg-white border-slate-200 hover:border-[#487E2C] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.06)]'
                  : 'bg-slate-50 border-slate-300 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black text-white uppercase tracking-wider ${
                      mission.category === 'daily' ? 'bg-[#FF6321]' : mission.category === 'adventure' ? 'bg-amber-600' : 'bg-purple-700'
                    }`}>
                      {mission.category.toUpperCase()}
                    </span>

                    {isReadyToClaim && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#487E2C] text-white flex items-center space-x-1 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        <span>已达成 · 可领取</span>
                      </span>
                    )}

                    {!isUnlockedByLesson && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-300">
                        🔒 需解锁 Lesson {mission.requiredLessonId}
                      </span>
                    )}

                    <h3 className="font-black text-base text-[#2D2D2D] font-mono">
                      {mission.titleZh}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 font-bold font-mono">
                    {mission.description}
                  </p>

                  {/* Challenge Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-xs font-mono font-bold text-[#487E2C]">
                      🎮 游戏任务：{mission.mcChallenge}
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-xs font-mono font-bold text-[#FF6321]">
                      🗣️ 英语挑战：{mission.englishChallenge}
                    </div>
                  </div>

                  {/* Dynamic Progress Bar */}
                  {!isCompleted && (
                    <div className="pt-2 flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isReadyToClaim ? 'bg-[#487E2C]' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 shrink-0">
                        {isReadyToClaim ? '100% 已达成' : `${progress.current}/${progress.target} (${progress.percent}%)`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Rewards & Action */}
                <div className="flex flex-col items-end justify-between space-y-3 shrink-0">
                  <div className="flex items-center space-x-2 font-mono text-xs font-black bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-300">
                    <span className="text-[#487E2C]">+{mission.xpReward} XP</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[#2D2D2D]">+{mission.emeraldReward} ❇️</span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center space-x-1 text-green-800 font-mono font-black text-xs bg-green-100 border-2 border-green-300 px-3.5 py-2 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      <span>奖励已领取</span>
                    </div>
                  ) : isReadyToClaim ? (
                    <button
                      onClick={() => handleClaimReward(mission)}
                      className="px-5 py-2 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl text-xs font-mono font-black shadow-[0_3px_0_0_#2A4718] transform hover:translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all flex items-center space-x-1.5 animate-bounce"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFD700]" />
                      <span>领取奖励</span>
                    </button>
                  ) : !isUnlockedByLesson ? (
                    <span className="px-3.5 py-2 bg-slate-200 text-slate-500 border border-slate-300 rounded-xl text-xs font-mono font-bold">
                      关卡未达到
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        playClickSound();
                        action.onClick();
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 rounded-xl text-xs font-mono font-bold shadow-sm flex items-center space-x-1.5 transition-all"
                    >
                      <span>{action.icon}</span>
                      <span>{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
