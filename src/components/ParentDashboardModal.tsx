import React, { useState } from 'react';
import { UserProfile, ParentSettings, APP_VERSION_INFO } from '../types';
import { Shield, Clock, Award, Eye, Volume2, Sparkles, CheckCircle, BarChart3, Lock, Heart, Gift, MessageSquare, AlertCircle, Share2, Copy, Star, Check, Zap } from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface ParentDashboardModalProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
  onTriggerEyeCareTest: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
  onTriggerEyeCareTest
}) => {
  // Simple parent lock math question to prevent child mis-touch
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mathNum1] = useState(Math.floor(Math.random() * 5) + 4); // e.g. 4..8
  const [mathNum2] = useState(Math.floor(Math.random() * 5) + 3); // e.g. 3..7
  const [userAnswer, setUserAnswer] = useState('');
  const [lockError, setLockError] = useState('');
  const [activeTab, setActiveTab] = useState<'report' | 'phonics' | 'settings' | 'reward'>('report');
  const [copiedPoster, setCopiedPoster] = useState(false);

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

  // Weekly study data
  const todayMinutes = profile.todayStudyMinutes || 18;
  const totalMinutes = profile.totalStudyMinutes || 140;
  const masteredCount = profile.masteredWords.length;
  const fluencyScore = Math.min(98, 82 + profile.level * 2);

  // Weekly time distribution simulation (Mon-Sun)
  const weeklyDailyMinutes = [15, 22, 18, 25, 20, 30, todayMinutes];
  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const maxMins = Math.max(...weeklyDailyMinutes, 30);

  // Phonics radar dimensions
  const phonicsDimensions = [
    { name: 'th 咬舌音', score: 92, status: '良好', desc: '如 this, that, thank, with，舌尖轻触门牙到位', tip: '继续保持轻咬吐气' },
    { name: 'r 卷舌音', score: 86, status: '达标', desc: '如 red, craft, tree, sword，舌尖微卷不触上颚', tip: '练习时嘴唇稍收圆' },
    { name: 'ee/ea 长元音', score: 95, status: '优秀', desc: '如 see, need, speak, eat，嘴角拉开微笑状', tip: '发音饱满清晰' },
    { name: 'sh/ch 舌面后缩', score: 88, status: '良好', desc: '如 she, child, check，双唇突出圆唇气流', tip: '气息有力' },
    { name: 'v 咬唇浊辅音', score: 82, status: '达标', desc: '如 have, very, live，上齿轻触下唇发音', tip: '声带注意振动' },
    { name: '-ed 过去式尾音', score: 90, status: '良好', desc: '如 crafted, mined, played，清浊音变化准确', tip: '注意轻读尾音' }
  ];

  const handleCopyReportText = () => {
    const reportText = `🏆【Minecraft English AI · 学员本周学情周报】\n` +
      `👤 学员: ${profile.nickname} (${profile.age}岁)\n` +
      `⏱️ 本周累计学习: ${weeklyDailyMinutes.reduce((a, b) => a + b, 0)} 分钟 (打卡 ${profile.streakDays || 1} 天)\n` +
      `📚 攻克词汇总量: ${masteredCount} 个高频词\n` +
      `🎙️ 口语发音准确率: ${fluencyScore}%\n` +
      `💎 累计获得绿宝石: ${profile.emeralds} 颗\n` +
      `💡 Alex 老师评语: 发音自然，句型组织能力稳步提升，尤其在长元音和连读表现出色！`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(reportText).then(() => {
        setCopiedPoster(true);
        setTimeout(() => setCopiedPoster(false), 2500);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-3xl w-full max-w-2xl text-[#2D2D2D] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden my-auto max-h-[94dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-4 sm:p-5 border-b-4 border-[#355E20] flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFD700] text-black border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow">
              👨‍👩‍👧
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono text-white flex items-center space-x-2">
                <span>家长护航中心 · 学情周报与 AI 诊断</span>
                <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 rounded-full font-bold shadow-sm">
                  {APP_VERSION_INFO.version}
                </span>
              </h2>
              <p className="text-xs text-white/90 font-mono font-bold">
                学习效果周报 • 音素发音诊断 • 护眼防沉迷控制
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
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="bg-slate-100 border-b-2 border-slate-200 p-2 flex items-center space-x-2 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('report');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all shrink-0 ${
                  activeTab === 'report'
                    ? 'bg-[#487E2C] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>📊 学情可视化周报</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('phonics');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all shrink-0 ${
                  activeTab === 'phonics'
                    ? 'bg-[#487E2C] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>🎙️ AI 音素诊断雷达</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('settings');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-[#487E2C] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>🛡️ 护眼与教学偏好</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('reward');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all shrink-0 ${
                  activeTab === 'reward'
                    ? 'bg-[#487E2C] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>🎁 绿宝石与家长奖励</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs font-mono custom-scrollbar">
              
              {/* TAB 1: Weekly Report & Poster */}
              {activeTab === 'report' && (
                <div className="space-y-4">
                  {/* Top Stats Overview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-200 text-center space-y-0.5">
                      <span className="text-[10px] text-emerald-800 font-bold block">本周学习总时长</span>
                      <span className="text-lg font-black text-emerald-700">{weeklyDailyMinutes.reduce((a, b) => a + b, 0)} 分钟</span>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 text-center space-y-0.5">
                      <span className="text-[10px] text-amber-800 font-bold block">掌握高频生词</span>
                      <span className="text-lg font-black text-amber-700">{masteredCount} 个</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-200 text-center space-y-0.5">
                      <span className="text-[10px] text-blue-800 font-bold block">口语综合得分</span>
                      <span className="text-lg font-black text-blue-700">{fluencyScore}% 优秀</span>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-2xl border-2 border-purple-200 text-center space-y-0.5">
                      <span className="text-[10px] text-purple-800 font-bold block">连续打卡天数</span>
                      <span className="text-lg font-black text-purple-700">{profile.streakDays || 1} 天 🔥</span>
                    </div>
                  </div>

                  {/* 7-Day Study Time Bar Chart */}
                  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800 text-xs flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>本周每日学习时长分布 (分钟)：</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">目标: 20分钟/天</span>
                    </div>

                    <div className="flex items-end justify-between h-28 pt-4 pb-2 px-2 bg-white rounded-xl border border-slate-200">
                      {weeklyDailyMinutes.map((mins, idx) => {
                        const heightPct = Math.min(100, Math.round((mins / maxMins) * 100));
                        const isToday = idx === 6;
                        return (
                          <div key={idx} className="flex flex-col items-center flex-1 space-y-1">
                            <span className="text-[10px] font-black text-slate-600">{mins}m</span>
                            <div className="w-6 sm:w-8 bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-16">
                              <div
                                className={`w-full rounded-t-lg transition-all ${
                                  isToday
                                    ? 'bg-gradient-to-t from-emerald-600 to-green-400'
                                    : 'bg-gradient-to-t from-blue-600 to-blue-400'
                                }`}
                                style={{ height: `${heightPct}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-bold ${isToday ? 'text-emerald-700 font-black' : 'text-slate-500'}`}>
                              {weekDays[idx]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Alex AI Pedagogical Summary */}
                  <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 space-y-2 text-slate-700">
                    <span className="font-black text-amber-900 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-[#FF6321]" />
                      <span>Alex 老师专属本周学情诊断：</span>
                    </span>
                    <p className="text-[11px] font-bold leading-relaxed text-slate-700">
                      “{profile.nickname} 同学本周表现极其优异！在 <strong>新概念英语核心句型拼装</strong> 与 <strong>三场景口语打卡</strong> 中展现了出色的语感。在发音方面，长元音 /i:/ 与卷舌音 /r/ 准确率已超 90%，建议在接下来的学习中，继续多听【唱片机磨耳朵电台】的三遍精听法，加强语调起伏！”
                    </p>
                  </div>

                  {/* Copy / Share Weekly Certificate Poster */}
                  <div className="bg-gradient-to-r from-emerald-800 to-green-900 p-4 rounded-2xl text-white flex items-center justify-between shadow-md">
                    <div>
                      <h4 className="font-black text-sm text-amber-300 flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>一键生成家长微信学情周报</span>
                      </h4>
                      <p className="text-[10px] text-emerald-200/90 mt-0.5">
                        支持一键复制周报文本分享至朋友圈或家庭群，记录孩子成长！
                      </p>
                    </div>

                    <button
                      onClick={handleCopyReportText}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-mono font-black text-xs flex items-center space-x-1.5 shadow-md active:scale-95 transition-all shrink-0"
                    >
                      {copiedPoster ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPoster ? '已复制周报！' : '复制周报文本'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Phonics Diagnostics Radar */}
              {activeTab === 'phonics' && (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm text-emerald-400 flex items-center space-x-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>AI 音素级发音能力诊断雷达</span>
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        基于日常口语跟读评测大数据的多维度音素精准对齐分析
                      </p>
                    </div>
                    <span className="text-xl font-black text-amber-300 font-mono">
                      {fluencyScore} <span className="text-xs text-slate-400">综合分</span>
                    </span>
                  </div>

                  {/* Phonics Dimension Breakdown List */}
                  <div className="space-y-2.5">
                    {phonicsDimensions.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-slate-800 text-xs">【{item.name}】</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              item.score >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {item.status} ({item.score}%)
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold">建议：{item.tip}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              item.score >= 90
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                                : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Eye Care & Pedagogy Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  {/* Eye Protection & Limits */}
                  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                    <h3 className="font-black text-[#487E2C] text-sm flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-[#487E2C]" />
                      <span>护眼模式与防沉迷时长控制</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">
                          单次连续学习休息提醒:
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
                        <label className="block text-slate-700 font-bold mb-1">
                          每日单日最高学习上限:
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

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
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

                    <button
                      type="button"
                      onClick={onTriggerEyeCareTest}
                      className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded-xl font-bold text-[11px] flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>预览测试护眼休息弹窗</span>
                    </button>
                  </div>

                  {/* Alex AI Pedagogical Tuning */}
                  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                    <h3 className="font-black text-cyan-700 text-sm flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-cyan-600" />
                      <span>Alex AI 教学语速与纠错偏好</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">
                          Alex 英文朗读语速:
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
                        <label className="block text-slate-700 font-bold mb-1">
                          语法与口语纠错严格度:
                        </label>
                        <select
                          value={strictness}
                          onChange={(e) => setStrictness(e.target.value as any)}
                          className="w-full bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold"
                        >
                          <option value="gentle">温和引导 (多表扬，少挑错)</option>
                          <option value="standard">标准提炼 (重重点，改错附带示范)</option>
                          <option value="strict">严谨复述 (完全规范发音与结构)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Emeralds & Custom Rewards */}
              {activeTab === 'reward' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                    <h3 className="font-black text-rose-600 text-sm flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-rose-600" />
                      <span>家长许愿奖励承诺 (真实生活奖励)</span>
                    </h3>

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
                      <span className="text-slate-500 font-bold">当前绿宝石: {profile.emeralds} ❇️</span>
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
              )}

              {/* Bottom Action Save */}
              <div className="pt-2 flex justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-xl font-bold text-xs"
                >
                  关闭
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-5 py-2 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl font-black text-xs shadow-[0_3px_0_0_#2A4718]"
                >
                  保存家长护航配置
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

