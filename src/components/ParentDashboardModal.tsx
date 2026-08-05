import React, { useState } from 'react';
import { UserProfile, ParentSettings, APP_VERSION_INFO } from '../types';
import { Shield, Clock, Award, Eye, Volume2, Sparkles, CheckCircle, BarChart3, Lock, Heart, Gift, MessageSquare, AlertCircle } from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface ParentDashboardModalProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
  onTriggerEyeCareTest: () => void;
  onOpenVipModal?: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
  onTriggerEyeCareTest,
  onOpenVipModal
}) => {
  // Simple parent lock math question to prevent child mis-touch
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mathNum1] = useState(Math.floor(Math.random() * 5) + 4); // e.g. 4..8
  const [mathNum2] = useState(Math.floor(Math.random() * 5) + 3); // e.g. 3..7
  const [userAnswer, setUserAnswer] = useState('');
  const [lockError, setLockError] = useState('');

  // Parent settings local state
  const parentSettings: ParentSettings = profile.parentSettings || {
    dailyTimeLimitMinutes: 45,
    continuousTimeLimitMinutes: 20,
    eyeProtectionEnabled: true,
    speechRate: 0.9,
    correctionStrictness: 'standard',
    customRewardTitle: '周末玩 Minecraft 30 分钟 / 去冰淇淋店'
  };

  const [dailyLimit, setDailyLimit] = useState(parentSettings.dailyTimeLimitMinutes);
  const [continuousLimit, setContinuousLimit] = useState(parentSettings.continuousTimeLimitMinutes);
  const [eyeProtection, setEyeProtection] = useState(parentSettings.eyeProtectionEnabled);
  const [speechRate, setSpeechRate] = useState(parentSettings.speechRate);
  const [strictness, setStrictness] = useState(parentSettings.correctionStrictness);
  const [customReward, setCustomReward] = useState(parentSettings.customRewardTitle || '');

  // Parent reward dispatch state
  const [rewardAmount, setRewardAmount] = useState<number>(30);
  const [rewardNote, setRewardNote] = useState('宝贝今天练习口语非常认真，奖励绿宝石！');
  const [rewardSuccess, setRewardSuccess] = useState(false);

  const handleVerifyLock = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === mathNum1 * mathNum2) {
      playClickSound();
      setIsUnlocked(true);
      setLockError('');
    } else {
      setLockError('验证错误，请重新输入（家长验证防护）');
    }
  };

  const handleSaveSettings = () => {
    playClickSound();
    const updatedParentSettings: ParentSettings = {
      ...parentSettings,
      dailyTimeLimitMinutes: dailyLimit,
      continuousTimeLimitMinutes: continuousLimit,
      eyeProtectionEnabled: eyeProtection,
      speechRate,
      correctionStrictness: strictness,
      customRewardTitle: customReward
    };

    onUpdateProfile({
      parentSettings: updatedParentSettings
    });
    onClose();
  };

  const handleSendParentEmeralds = () => {
    playEmeraldSound();
    onUpdateProfile({
      emeralds: profile.emeralds + rewardAmount
    });
    setRewardSuccess(true);
    setTimeout(() => setRewardSuccess(false), 3000);
  };

  // Simulated learning analytics data based on profile progress
  const todayMinutes = profile.todayStudyMinutes || 18;
  const totalMinutes = profile.totalStudyMinutes || 140;
  const masteredCount = profile.masteredWords.length;
  const fluencyScore = Math.min(98, 80 + profile.level * 2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-2xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-5 border-b-4 border-[#355E20] flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFD700] text-black border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow">
              👨‍👩‍👧
            </div>
            <div>
              <h2 className="text-lg font-black font-mono text-white flex items-center space-x-2">
                <span>家长护航中心与周报仪表盘</span>
                <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 rounded-full font-bold shadow-sm">
                  {APP_VERSION_INFO.version}
                </span>
              </h2>
              <p className="text-xs text-white/90 font-mono font-bold">
                学习效果可视化 • 护眼防沉迷 • 新概念三册体系支持
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30"
          >
            ✕ 关闭
          </button>
        </div>

        {/* Locked State: Parent Security Gate */}
        {!isUnlocked ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-100 border-4 border-amber-400 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-sm">
              🔒
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-black text-[#2D2D2D] font-mono">
                家长安全验证 (Parent Lock)
              </h3>
              <p className="text-xs text-slate-500 font-bold max-w-sm mx-auto">
                为防止小朋友误操作修改学习设置，请解答计算题以进入家长中心：
              </p>
            </div>

            <form onSubmit={handleVerifyLock} className="max-w-xs mx-auto space-y-4 font-mono">
              <div className="bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 font-black text-lg text-[#FF6321] flex items-center justify-center space-x-3">
                <span>{mathNum1} × {mathNum2} = ?</span>
              </div>

              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="请输入计算结果"
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-center font-bold text-sm focus:border-[#487E2C] focus:outline-none"
                autoFocus
              />

              {lockError && (
                <p className="text-xs font-bold text-rose-600 flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{lockError}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white py-2.5 rounded-xl font-mono font-black text-xs shadow-[0_3px_0_0_#2A4718]"
              >
                解锁进入家长管理界面
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Parent Dashboard Content */
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs font-mono">
            
            {/* VIP Membership Status Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border-2 border-amber-400/60 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-lg">
                    👑
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">
                      账号会员状态: {profile.isVip ? '💎 终身VIP会员' : '🎁 普通试学账号'}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {profile.isVip
                        ? '全量 144 个关卡、PPT 与 Alex AI 语音全开放'
                        : '当前仅可试学前 3 个主线关卡，升级获取 144 课'}
                    </p>
                  </div>
                </div>

                {onOpenVipModal && (
                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenVipModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-xs transition-all shadow"
                  >
                    {profile.isVip ? '查看会员权益' : '🔑 输入激活码解锁VIP'}
                  </button>
                )}
              </div>
            </div>

            {/* 1. Learning Report Card */}
            <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
                <h3 className="font-black text-[#FF6321] text-sm flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-[#FF6321]" />
                  <span>学习成果周报与实时诊断 (Study Report)</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-bold">学员: {profile.nickname} ({profile.age}岁)</span>
              </div>

              {/* Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">今日学习时长</span>
                  <span className="text-lg font-black text-[#487E2C]">{todayMinutes} 分钟</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">掌握词汇总量</span>
                  <span className="text-lg font-black text-[#FF6321]">{masteredCount} 个词</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">口语发音流畅度</span>
                  <span className="text-lg font-black text-[#487E2C]">{fluencyScore}% 优秀</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">累计专注天数</span>
                  <span className="text-lg font-black text-amber-600">{profile.streakDays} 天连续</span>
                </div>
              </div>

              {/* Alex AI Pedagogical Diagnosis */}
              <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-200 space-y-1 text-slate-700">
                <span className="font-black text-amber-800 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Alex 老师学习建议:</span>
                </span>
                <p className="text-[11px] font-bold leading-relaxed text-slate-700">
                  “{profile.nickname} 在【句型复述】与【Minecraft方块词汇】方面表现极佳！建议鼓励孩子在 Alex 对话模块中使用完整的句子表达，如 "I have a wooden sword."。”
                </p>
              </div>
            </div>

            {/* 2. Eye Care & Time Limits */}
            <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 space-y-4">
              <h3 className="font-black text-[#487E2C] text-sm flex items-center space-x-2">
                <Eye className="w-4 h-4 text-[#487E2C]" />
                <span>护眼模式与防沉迷时长控制 (Eye Protection & Limits)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    单次连续学习提醒 (Continuous Break):
                  </label>
                  <select
                    value={continuousLimit}
                    onChange={(e) => setContinuousLimit(Number(e.target.value))}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value={15}>15 分钟 (强烈建议儿童)</option>
                    <option value={20}>20 分钟 (标准)</option>
                    <option value={30}>30 分钟 (长时)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    每日单日最高学习上限 (Daily Cap):
                  </label>
                  <select
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value={30}>30 分钟 / 天</option>
                    <option value={45}>45 分钟 / 天</option>
                    <option value={60}>60 分钟 / 天</option>
                    <option value={999}>无限制</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#FF6321]" />
                  <span className="font-bold text-slate-700">开启护眼自动远眺提醒</span>
                </div>
                <input
                  type="checkbox"
                  checked={eyeProtection}
                  onChange={(e) => setEyeProtection(e.target.checked)}
                  className="w-5 h-5 accent-[#487E2C] rounded cursor-pointer"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onTriggerEyeCareTest}
                  className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-xl font-bold text-[11px] flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>预览测试护眼休息弹窗</span>
                </button>
              </div>
            </div>

            {/* 3. Alex Pedagogical Preferences */}
            <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 space-y-4">
              <h3 className="font-black text-cyan-700 text-sm flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-cyan-600" />
                <span>Alex AI 教学语速与纠错偏好 (Pedagogy Tuning)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    Alex 英文朗读语速 (Speech Speed):
                  </label>
                  <select
                    value={speechRate}
                    onChange={(e) => setSpeechRate(Number(e.target.value))}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value={0.8}>0.8x 慢速带读 (适合初学者)</option>
                    <option value={0.9}>0.9x 标准亲和语速 (推荐)</option>
                    <option value={1.0}>1.0x 原速标准口语</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">
                    语法与口语纠错严格度 (Correction):
                  </label>
                  <select
                    value={strictness}
                    onChange={(e) => setStrictness(e.target.value as any)}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                  >
                    <option value="gentle">温和引导 (多表扬，少挑错)</option>
                    <option value="standard">标准提炼 (重重点，改错附带示范)</option>
                    <option value="strict">严谨复述 (完全规范儿童发音与结构)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Parent Custom Rewards & Dispatch */}
            <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 space-y-4">
              <h3 className="font-black text-rose-600 text-sm flex items-center space-x-2">
                <Gift className="w-4 h-4 text-rose-600" />
                <span>家长专属实物/绿宝石激励设立 (Parent Rewards)</span>
              </h3>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  家长许愿奖励承诺 (真实生活奖励):
                </label>
                <input
                  type="text"
                  value={customReward}
                  onChange={(e) => setCustomReward(e.target.value)}
                  placeholder="例如：完成本周任务奖励去游乐园 / 选买一套乐高"
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2 text-slate-800 font-bold"
                />
              </div>

              {/* Direct Grant Emeralds */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#487E2C] flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>发放“家长赞赏绿宝石 ❇️”:</span>
                  </span>
                  <span className="text-slate-500 font-bold">当前绿宝石余额: {profile.emeralds} ❇️</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setRewardAmount(amt)}
                      className={`py-2 rounded-xl font-black text-xs border-2 transition-all ${
                        rewardAmount === amt
                          ? 'bg-[#487E2C] border-black text-white shadow-sm'
                          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      +{amt} 绿宝石 ❇️
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={rewardNote}
                  onChange={(e) => setRewardNote(e.target.value)}
                  placeholder="附言给孩子鼓励..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 font-bold text-xs"
                />

                <button
                  type="button"
                  onClick={handleSendParentEmeralds}
                  className="w-full bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white py-2.5 rounded-xl font-black text-xs shadow-[0_3px_0_0_#993300] flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>立即在 App 内发放家长赞赏奖励</span>
                </button>

                {rewardSuccess && (
                  <p className="text-xs font-bold text-[#487E2C] text-center flex items-center justify-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-[#487E2C]" />
                    <span>成功为 {profile.nickname} 发放了 +{rewardAmount} 绿宝石！</span>
                  </p>
                )}
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-xl font-bold text-xs"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-6 py-2.5 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl font-black text-xs shadow-[0_3px_0_0_#2A4718]"
              >
                保存家长护航配置
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
