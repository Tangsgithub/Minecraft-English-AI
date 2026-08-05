import React, { useState } from 'react';
import { UserProfile, ApiKeyConfig, ApiRequestMode } from '../types';
import { testApiKeyConnection } from '../services/aiService';
import { ApiSecurityNotice } from './ApiSecurityNotice';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Key, Shield, User, Compass, Eye, EyeOff } from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface FirstLaunchModalProps {
  profile: UserProfile;
  onComplete: (updatedProfile: Partial<UserProfile>) => void;
  onClose?: () => void;
  isWizardModeOnly?: boolean;
}

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
  profile,
  onComplete,
  onClose,
  isWizardModeOnly = false
}) => {
  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>(profile.nickname === 'Tom' ? 'Olaf' : (profile.nickname || 'Olaf'));
  const [age, setAge] = useState<number>(profile.age || 8);
  const [avatar, setAvatar] = useState<string>(profile.selectedAvatar || '👦');

  // API Config State
  const [provider, setProvider] = useState<'deepseek' | 'gemini' | 'custom'>(profile.apiKeyConfig.provider || 'deepseek');
  const [apiKey, setApiKey] = useState<string>(profile.apiKeyConfig.apiKey || '');
  const [baseUrl, setBaseUrl] = useState<string>(profile.apiKeyConfig.baseUrl || 'https://api.deepseek.com');
  const [model, setModel] = useState<string>(profile.apiKeyConfig.model || 'deepseek-chat');
  const [requestMode, setRequestMode] = useState<ApiRequestMode>(profile.apiKeyConfig.requestMode || 'direct');
  const [showKey, setShowKey] = useState<boolean>(false);

  // Test Connection State
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);

  const avatars = ['👦 Steve', '👩 Alex', '👳 Villager', '🤖 Iron Golem', '🏹 Archer'];

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    playClickSound();

    const config: ApiKeyConfig = {
      provider,
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim(),
      model,
      requestMode
    };

    const result = await testApiKeyConnection(config);
    setIsTesting(false);
    setTestResult(result);
    if (result.success) {
      playEmeraldSound();
    }
  };

  const handleFinish = () => {
    playEmeraldSound();
    onComplete({
      nickname: nickname.trim() || 'Olaf',
      age,
      selectedAvatar: avatar,
      apiKeyConfig: {
        provider,
        apiKey: apiKey.trim(),
        baseUrl: baseUrl.trim(),
        model,
        requestMode
      },
      isInitialSetupDone: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto pt-safe pb-safe">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden relative my-auto max-h-[92dvh] flex flex-col">
        
        {/* Top Header Banner */}
        <div className="bg-[#487E2C] p-4 sm:p-6 border-b-4 border-[#355E20] text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#8B8B8B] border-4 border-black flex items-center justify-center text-xl sm:text-2xl shadow-md font-mono select-none shrink-0">
                ⛏️
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-black font-mono text-white tracking-wide uppercase drop-shadow-sm">
                  Minecraft English AI
                </h2>
                <p className="text-[11px] sm:text-xs text-white/90 font-bold">
                  我的世界英语冒险 AI 学习助手 V1.0 初始化指南
                </p>
              </div>
            </div>

            {isWizardModeOnly && onClose && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30 shrink-0"
              >
                ✕ 关闭
              </button>
            )}
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 px-1 sm:px-2">
            <div className={`flex items-center space-x-1.5 sm:space-x-2 ${step >= 1 ? 'text-[#7CFC00] font-black' : 'text-white/50'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= 1 ? 'border-white bg-black/30' : 'border-white/30'}`}>1</span>
              <span className="text-xs font-mono">档案创建</span>
            </div>
            <div className="h-1 flex-1 bg-white/30 mx-2 sm:mx-3 rounded-full" />
            <div className={`flex items-center space-x-1.5 sm:space-x-2 ${step >= 2 ? 'text-[#7CFC00] font-black' : 'text-white/50'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= 2 ? 'border-white bg-black/30' : 'border-white/30'}`}>2</span>
              <span className="text-xs font-mono">DeepSeek AI</span>
            </div>
            <div className="h-1 flex-1 bg-white/30 mx-2 sm:mx-3 rounded-full" />
            <div className={`flex items-center space-x-1.5 sm:space-x-2 ${step >= 3 ? 'text-[#7CFC00] font-black' : 'text-white/50'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-black border-2 ${step >= 3 ? 'border-white bg-black/30' : 'border-white/30'}`}>3</span>
              <span className="text-xs font-mono">开始冒险</span>
            </div>
          </div>
        </div>

        {/* Step 1: Child Profile */}
        {step === 1 && (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-black text-[#FF6321] flex items-center justify-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>创建你的 Minecraft 小冒险家档案</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  告诉 Alex 老师你的名字和年龄，定制最适合你的英语游戏陪伴！
                </p>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-mono font-black text-[#487E2C] mb-1.5">
                    小冒险家英文昵称 (Nickname):
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. Tom, Lucy, Alex Junior"
                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 font-mono text-sm font-bold focus:border-[#487E2C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black text-[#487E2C] mb-1.5">
                    小朋友年龄 (Age 6-12 岁):
                  </label>
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAge(num)}
                        className={`py-2 rounded-xl font-mono font-black text-xs sm:text-sm border-2 transition-all ${
                          age === num
                            ? 'bg-[#487E2C] border-black text-white shadow-sm'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {num}岁
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-black text-[#487E2C] mb-1.5">
                    选择你的冒险角色形象 (Avatar):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {avatars.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setAvatar(item.split(' ')[0])}
                        className={`p-2.5 rounded-2xl border-2 text-xs font-mono font-bold flex items-center space-x-2 transition-all ${
                          avatar === item.split(' ')[0]
                            ? 'bg-[#EEDDCC] border-[#C89D7C] text-[#2D2D2D] shadow-sm'
                            : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <span className="text-lg">{item.split(' ')[0]}</span>
                        <span>{item.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50 border-t-2 border-slate-200 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(2);
                }}
                className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-2.5 rounded-xl font-mono font-black text-xs sm:text-sm flex items-center space-x-2 shadow-[0_3px_0_0_#2A4718] active:translate-y-0.5"
              >
                <span>下一步：配置 AI Key</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: DeepSeek API Config */}
        {step === 2 && (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 min-h-0">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-black text-[#FF6321] flex items-center justify-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>配置用户 DeepSeek API Key</span>
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  本程序基于“自带 API Key 零服务器成本”设计。数据全保存在本地！
                </p>
              </div>

              <div className="space-y-3 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200">
                {/* Provider selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProvider('deepseek');
                      setBaseUrl('https://api.deepseek.com');
                      setModel('deepseek-chat');
                    }}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-mono font-black flex items-center justify-center space-x-2 ${
                      provider === 'deepseek'
                        ? 'bg-[#FF6321] border-black text-white shadow-[0_3px_0_0_#993300]'
                        : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>🐋 DeepSeek API</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProvider('gemini');
                      setModel('gemini-3.6-flash');
                    }}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-mono font-black flex items-center justify-center space-x-2 ${
                      provider === 'gemini'
                        ? 'bg-[#FF6321] border-black text-white shadow-[0_3px_0_0_#993300]'
                        : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>✨ Gemini AI (内置/标准)</span>
                  </button>
                </div>

                {/* Key input */}
                <div>
                  <label className="block text-xs font-mono font-black text-[#487E2C] mb-1">
                    {provider === 'deepseek' ? 'DeepSeek API Key (sk-...):' : 'Gemini API Key (自定义):'}
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={provider === 'deepseek' ? 'sk-xxxxxxxxxxxxxxxxxxxxxxxx' : '可留空使用服务预置 Key'}
                      className="w-full bg-white border-2 border-slate-300 rounded-xl pl-3 pr-9 py-2 text-slate-800 font-mono font-bold text-xs focus:border-[#487E2C] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      title={showKey ? "隐藏密钥" : "显示密钥"}
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold mt-1">
                    💡 未填 API Key 时将自动启动智能小导师备用回答模式。
                  </p>
                </div>

                {provider === 'deepseek' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-bold mb-1">模型选择 (Model):</label>
                      <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-2 py-1.5 text-slate-800 font-mono text-xs font-bold"
                      >
                        <option value="deepseek-chat">deepseek-chat (V3 对话)</option>
                        <option value="deepseek-reasoner">deepseek-reasoner (R1 深度思考)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-600 font-bold mb-1">Base URL (接口地址):</label>
                      <input
                        type="text"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-2 py-1.5 text-slate-800 font-mono text-xs font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* Privacy Security Notice Component */}
                <ApiSecurityNotice
                  requestMode={requestMode}
                  onRequestModeChange={setRequestMode}
                  onClearKey={() => setApiKey('')}
                  hasKey={!!apiKey.trim()}
                />

                {/* Test Connection Button */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="bg-[#FF6321] hover:bg-[#e05316] text-white px-4 py-2 rounded-xl text-xs font-mono font-black border-2 border-black shadow-[0_3px_0_0_#993300] flex items-center space-x-1.5 disabled:opacity-50 active:translate-y-0.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTesting ? '正在测试连接...' : '测试 API 连接'}</span>
                  </button>

                  {testResult && (
                    <div className={`text-xs font-mono font-bold flex items-center space-x-1 ${testResult.success ? 'text-[#487E2C]' : 'text-rose-600'}`}>
                      {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span className="max-w-[200px] truncate">{testResult.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Bar: Always visible & clickable */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t-2 border-slate-200 flex justify-between items-center shrink-0">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-800 text-xs font-mono font-bold underline px-2 py-1"
              >
                ← 上一步
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep(3);
                }}
                className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-2.5 rounded-xl font-mono font-black text-xs sm:text-sm flex items-center space-x-2 shadow-[0_3px_0_0_#2A4718] active:translate-y-0.5"
              >
                <span>确认 / 下一步：探索准备</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Welcome & Finish */}
        {step === 3 && (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="p-4 sm:p-6 text-center space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#EEDDCC] border-4 border-[#C89D7C] rounded-2xl mx-auto flex items-center justify-center text-3xl sm:text-4xl shadow-md animate-bounce">
                👩‍🦰
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-base sm:text-xl font-black text-[#487E2C] font-mono">
                  Welcome to Minecraft English World, {nickname}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold">
                  Alex 老师已经在村庄广场准备好了第 1 课《Excuse me!》与绿宝石奖励。
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-left text-xs font-mono space-y-2 text-slate-700 font-bold">
                <div className="flex items-center justify-between text-[#FF6321] font-black border-b-2 border-slate-200 pb-2">
                  <span>🎒 初始探险包就位</span>
                  <span>+50 XP • 10 ❇️</span>
                </div>
                <p>✅ 学习课程：《新概念英语第一册 144 课体系》</p>
                <p>✅ AI 陪伴角色：Alex 老师 ({provider === 'deepseek' ? 'DeepSeek API' : 'Gemini AI'})</p>
                <p>✅ 玩法特色：Minecraft 场景 + 口语互动 + 任务探索</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-50 border-t-2 border-slate-200 shrink-0">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white py-3 rounded-2xl font-mono font-black text-sm sm:text-base shadow-[0_4px_0_0_#2A4718] flex items-center justify-center space-x-2 transform hover:translate-y-0.5 active:translate-y-[4px] active:shadow-none transition-all"
              >
                <Compass className="w-5 h-5" />
                <span>完成设置：进入 Minecraft 英语世界！</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
