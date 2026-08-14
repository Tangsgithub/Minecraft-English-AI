import React, { useState, useEffect } from 'react';
import { UserProfile, ApiKeyConfig, ApiRequestMode, APP_VERSION_INFO } from '../types';
import { testApiKeyConnection } from '../services/aiService';
import { ApiSecurityNotice } from './ApiSecurityNotice';
import { Settings, Key, Sparkles, CheckCircle2, AlertCircle, Download, Upload, Trash2, Eye, EyeOff, Volume2, Mic, Play } from 'lucide-react';
import {
  playClickSound,
  playEmeraldSound,
  getTtsEngine,
  setTtsEngine,
  getSelectedEdgeVoice,
  setSelectedEdgeVoice,
  speakText,
  unlockAudio,
  testAudioSound,
  TtsEngineType
} from '../utils/audio';
import { EDGE_VOICES } from '../services/edgeTtsService';

interface SettingsModalProps {
  profile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
  onResetProgress: () => void;
  onOpenAdminConsole?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onSaveProfile,
  onClose,
  onResetProgress,
  onOpenAdminConsole
}) => {
  const [provider, setProvider] = useState<'deepseek' | 'gemini' | 'custom'>(profile.apiKeyConfig.provider || 'deepseek');
  const [apiKey, setApiKey] = useState<string>(profile.apiKeyConfig.apiKey || '');
  const [baseUrl, setBaseUrl] = useState<string>(profile.apiKeyConfig.baseUrl || 'https://api.deepseek.com');
  const [model, setModel] = useState<string>(profile.apiKeyConfig.model || 'deepseek-chat');
  const [requestMode, setRequestMode] = useState<ApiRequestMode>(profile.apiKeyConfig.requestMode || 'direct');
  const [showKey, setShowKey] = useState<boolean>(false);

  // TTS Engine & Voice Settings
  const [ttsEngineState, setTtsEngineState] = useState<TtsEngineType>(getTtsEngine());
  const [edgeVoiceState, setEdgeVoiceState] = useState<string>(getSelectedEdgeVoice());
  const [isTestingSpeech, setIsTestingSpeech] = useState(false);

  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);

  const handleTestKey = async () => {
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

    const res = await testApiKeyConnection(config);
    setIsTesting(false);
    setTestResult(res);
    if (res.success) {
      playEmeraldSound();
    }
  };

  const handleTestTtsSpeech = async () => {
    unlockAudio();
    playEmeraldSound();
    setIsTestingSpeech(true);
    await speakText("Welcome to Minecraft English World! Sound is working perfectly!", {
      lang: 'en-US',
      rate: 1.0
    });
    setIsTestingSpeech(false);
  };

  const handleSave = () => {
    playEmeraldSound();
    setTtsEngine(ttsEngineState);
    setSelectedEdgeVoice(edgeVoiceState);

    onSaveProfile({
      apiKeyConfig: {
        provider,
        apiKey: apiKey.trim(),
        baseUrl: baseUrl.trim(),
        model,
        requestMode
      }
    });
    onClose();
  };

  // Export progress JSON file
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `minecraft_english_ai_progress_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto pt-safe pb-safe">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-4 sm:p-5 border-b-2 sm:border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-2.5">
            <Settings className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-base sm:text-lg font-black font-mono text-white">
              系统设置与高级配置
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30"
          >
            ✕ 关闭
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0 text-xs font-mono">
          
          {/* DeepSeek / Gemini Key Config */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-4">
            <div>
              <h3 className="font-black text-[#FF6321] text-sm flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>自定义 AI 密钥 (高级选填)</span>
              </h3>
              <p className="text-[11px] text-[#487E2C] font-bold mt-1 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                ✨ 提示：系统已内置开箱即用的云端智能 AI，无需填入 Key 即可正常对话！仅在您想使用自己的 DeepSeek/Gemini 账号配额时才需配置。
              </p>
            </div>

            {/* Provider Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setProvider('deepseek');
                  setBaseUrl('https://api.deepseek.com');
                  setModel('deepseek-chat');
                }}
                className={`py-2.5 px-3 rounded-xl border-2 font-black flex items-center justify-center space-x-1.5 transition-all ${
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
                  setModel('gemini-3.7-flash');
                }}
                className={`py-2.5 px-3 rounded-xl border-2 font-black flex items-center justify-center space-x-1.5 transition-all ${
                  provider === 'gemini'
                    ? 'bg-[#FF6321] border-black text-white shadow-[0_3px_0_0_#993300]'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>✨ Gemini AI</span>
              </button>
            </div>

            {provider === 'gemini' && (
              <div>
                <label className="block text-slate-600 font-bold mb-1">模型选择 (Model):</label>
                <select
                  value={model.startsWith('gemini') ? model : 'gemini-3.7-flash'}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-mono font-bold"
                >
                  <option value="gemini-3.7-flash">gemini-3.7-flash (默认推荐，思维对话)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (极速响应，超低延迟)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-[#487E2C] font-black mb-1">
                {provider === 'deepseek' ? 'DeepSeek API Key (sk-...):' : 'Gemini API Key:'}
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-white border-2 border-slate-300 rounded-xl pl-3.5 pr-10 py-2 text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showKey ? "隐藏密钥" : "显示密钥"}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {provider === 'deepseek' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">模型选择 (Model):</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-mono font-bold"
                  >
                    <option value="deepseek-chat">deepseek-chat (V3 对话)</option>
                    <option value="deepseek-reasoner">deepseek-reasoner (R1 思考)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Base URL (API Endpoint):</label>
                  <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="w-full bg-white border-2 border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-mono font-bold"
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

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleTestKey}
                disabled={isTesting}
                className="bg-[#FF6321] hover:bg-[#e05316] text-white px-4 py-2 rounded-xl font-black border-2 border-black shadow-[0_3px_0_0_#993300] flex items-center space-x-1 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTesting ? '连接测试中...' : '测试 API 连接'}</span>
              </button>

              {testResult && (
                <div className={`text-[11px] font-bold flex items-center space-x-1 ${testResult.success ? 'text-[#487E2C]' : 'text-rose-600'}`}>
                  {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span className="max-w-[220px] truncate">{testResult.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Neural AI Audio TTS Engine Config */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-4 rounded-2xl border-2 border-emerald-500/40 text-white space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-[#FFD700] text-sm flex items-center space-x-2">
                    <span>🎙️ AI 语音与发音引擎</span>
                    <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
                      优美自然发音
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    为 Alex 教师和单词卡匹配极佳的朗读音色与流利响应速度
                  </p>
                </div>
              </div>
            </div>

            {/* Engine Selection: 2 Online Options */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTtsEngineState('edge');
                }}
                className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                  ttsEngineState === 'edge'
                    ? 'bg-emerald-600/40 border-emerald-400 text-white shadow-md ring-1 ring-emerald-400/50'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between text-emerald-300">
                  <span>✨ 云端 AI 神经网络 (推荐)</span>
                  {ttsEngineState === 'edge' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  服务器端在线高清合成，零显存占用，100ms 极速发音
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTtsEngineState('webspeech');
                }}
                className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                  ttsEngineState === 'webspeech'
                    ? 'bg-amber-600/40 border-amber-400 text-white shadow-md'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between text-amber-300">
                  <span>🤖 浏览器原生系统语音</span>
                  {ttsEngineState === 'webspeech' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  设备内置基础发音引擎
                </div>
              </button>
            </div>

            {/* Edge Voice Selector */}
            {ttsEngineState === 'edge' && (
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-200">
                  选择美音/英音优美音色 (Neural Voice):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EDGE_VOICES.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setEdgeVoiceState(v.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        edgeVoiceState === v.id
                          ? 'bg-emerald-500/30 border-emerald-400 text-white ring-1 ring-emerald-400'
                          : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center justify-between text-emerald-300">
                        <span>{v.name}</span>
                        <span className="text-[10px] text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded font-mono">
                          {v.accent}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{v.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Voice Audition */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-300 font-mono">
                {ttsEngineState === 'edge' ? (
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <span>✨ 云端 AI 神经网络已就绪 (在线合成)</span>
                  </span>
                ) : (
                  <span className="text-slate-400">系统原生 TTS</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleTestTtsSpeech}
                disabled={isTestingSpeech}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-md disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isTestingSpeech ? '播放中...' : '🔊 试听发音'}</span>
              </button>
            </div>
          </div>

          {/* App Version System & Curriculum Matrix */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border-2 border-slate-950 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="font-black text-amber-300 text-sm flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-xs font-mono font-black border border-black">
                  {APP_VERSION_INFO.version}
                </span>
                <span>{APP_VERSION_INFO.editionName}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{APP_VERSION_INFO.buildCode}</span>
            </div>

            <div className="text-[11px] text-slate-300 leading-relaxed">
              {APP_VERSION_INFO.releaseNotes}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {APP_VERSION_INFO.volumes.map(vol => (
                <div key={vol.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-emerald-400 text-xs flex items-center justify-between">
                    <span>{vol.title}</span>
                    <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                      {vol.badge.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{vol.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Save */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex justify-end space-x-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 rounded-xl font-mono font-bold text-xs"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl font-mono font-black text-xs shadow-[0_3px_0_0_#2A4718]"
          >
            保存配置
          </button>
        </div>

      </div>
    </div>
  );
};
