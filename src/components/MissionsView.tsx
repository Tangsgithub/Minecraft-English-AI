import React, { useState } from 'react';
import { Mission, UserProfile } from '../types';
import { INITIAL_MISSIONS } from '../data/gamificationData';
import { Scroll, Award, CheckCircle2, Sparkles, Compass, Swords, ShieldCheck, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMissionCompleteSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';

interface MissionsViewProps {
  profile: UserProfile;
  onCompleteMission: (missionId: string, xpReward: number, emeraldReward: number) => void;
  onNavigateToChat: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  profile,
  onCompleteMission,
  onNavigateToChat,
  onUpdateProfile
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const chestOpened = profile.lastEnderChestClaimDate === todayStr;

  const completedCount = INITIAL_MISSIONS.filter(m => profile.completedMissionIds.includes(m.id)).length;
  const isChestReady = completedCount >= 2;

  const handleClaimReward = (mission: Mission) => {
    // Fire confetti celebration
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    playMissionCompleteSound();
    playEmeraldSound();

    onCompleteMission(mission.id, mission.xpReward, mission.emeraldReward);
  };

  const handleOpenEnderChest = () => {
    if (chestOpened) return;
    playLevelUpSound();
    playEmeraldSound();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });

    // Award +50 emeralds & +100 XP
    onCompleteMission('daily_ender_chest', 100, 50);
    onUpdateProfile({ lastEnderChestClaimDate: todayStr });
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
            <h2 className="text-lg font-black font-mono text-[#2D2D2D]">
              Minecraft 英语探险任务告示板
            </h2>
            <p className="text-xs text-slate-500 font-mono font-bold">
              完成英语挑战任务即可领取绿宝石 ❇️ 与经验值 XP 升级！
            </p>
          </div>
        </div>

        {/* Quest Chain Progress */}
        <div className="bg-slate-100 p-3 rounded-2xl border-2 border-slate-300 flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">今日完成度</span>
            <span className="text-sm font-black font-mono text-[#487E2C]">{completedCount} / {INITIAL_MISSIONS.length} 任务</span>
          </div>
          <div className="w-24 bg-slate-200 h-3 rounded-full overflow-hidden border border-slate-300">
            <div
              className="bg-[#487E2C] h-full transition-all duration-300"
              style={{ width: `${(completedCount / INITIAL_MISSIONS.length) * 100}%` }}
            />
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
                ? '已成功领取末影龙宝箱奖励 (+50 ❇️ 绿宝石 +100 XP)！明日继续加油！'
                : isChestReady
                ? '解锁条件已达成！点击开启获取 50 ❇️ 绿宝石大奖与 100 XP！'
                : `再完成 ${2 - completedCount} 个探险任务即可解锁末影龙探险大宝箱！`}
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
              <span>{isChestReady ? '开启神秘宝箱 🎁' : '尚未解锁'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mission Cards */}
      <div className="space-y-4">
        {INITIAL_MISSIONS.map(mission => {
          const isCompleted = profile.completedMissionIds.includes(mission.id);
          const maxUnlocked = Math.max(...(profile.unlockedLessonIds || [1]), 1);
          const isUnlockedByLesson = !mission.requiredLessonId || mission.requiredLessonId <= maxUnlocked;

          return (
            <div
              key={mission.id}
              className={`p-5 rounded-3xl border-4 transition-all duration-200 ${
                isCompleted
                  ? 'bg-amber-50/80 border-[#FFD700] shadow-[6px_6px_0px_0px_rgba(255,215,0,0.2)]'
                  : isUnlockedByLesson
                  ? 'bg-white border-slate-200 hover:border-[#487E2C] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.06)]'
                  : 'bg-slate-50 border-slate-300 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-[#FF6321] text-white uppercase tracking-wider">
                      {mission.category.toUpperCase()}
                    </span>
                    {!isUnlockedByLesson && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-300">
                        🔒 需解锁 Lesson {mission.requiredLessonId}
                      </span>
                    )}
                    <h3 className="font-black text-base text-[#2D2D2D] font-mono">
                      {mission.titleZh} ({mission.title})
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 font-bold font-mono">
                    {mission.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-xs font-mono font-bold text-[#487E2C]">
                      🎮 游戏任务：{mission.mcChallenge}
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border-2 border-slate-200 text-xs font-mono font-bold text-[#FF6321]">
                      🗣️ 英语挑战：{mission.englishChallenge}
                    </div>
                  </div>
                </div>

                {/* Right Rewards & Action */}
                <div className="flex flex-col items-end justify-between space-y-3 shrink-0">
                  <div className="flex items-center space-x-2 font-mono text-xs font-black bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-300">
                    <span className="text-[#487E2C]">+{mission.xpReward} XP</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[#2D2D2D]">+{mission.emeraldReward} ❇️</span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center space-x-1 text-green-800 font-mono font-black text-xs bg-green-100 border-2 border-green-300 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                      <span>任务已完成</span>
                    </div>
                  ) : !isUnlockedByLesson ? (
                    <span className="px-3.5 py-2 bg-slate-200 text-slate-500 border border-slate-300 rounded-xl text-xs font-mono font-bold">
                      地图关卡未达到
                    </span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={onNavigateToChat}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border-2 border-slate-300 rounded-xl text-xs font-mono font-bold shadow-sm"
                      >
                        与 Alex 对话完成
                      </button>

                      <button
                        onClick={() => handleClaimReward(mission)}
                        className="px-4 py-2 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl text-xs font-mono font-black shadow-[0_3px_0_0_#2A4718] transform hover:translate-y-0.5 active:translate-y-[3px] active:shadow-none transition-all"
                      >
                        领取奖励
                      </button>
                    </div>
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
