import React, { useState } from 'react';
import { ShieldCheck, Lock, Cpu, Eye, EyeOff, Trash2, ExternalLink, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ApiSecurityNoticeProps {
  requestMode: 'direct' | 'proxy';
  onRequestModeChange: (mode: 'direct' | 'proxy') => void;
  onClearKey: () => void;
  hasKey: boolean;
}

export const ApiSecurityNotice: React.FC<ApiSecurityNoticeProps> = ({
  requestMode,
  onRequestModeChange,
  onClearKey,
  hasKey
}) => {
  const [showVerificationGuide, setShowVerificationGuide] = useState(false);
  const [justCleared, setJustCleared] = useState(false);

  const handleClear = () => {
    onClearKey();
    setJustCleared(true);
    setTimeout(() => setJustCleared(false), 3000);
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      
      {/* Local Storage Security Badge */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 space-y-2 text-emerald-900 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-black text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>🔒 API Key 隐私与安全承诺 (100% 本地化)</span>
          </div>
          {hasKey && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800 border border-emerald-400 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>仅本地可访问</span>
            </span>
          )}
        </div>

        <ul className="text-[11px] space-y-1 text-emerald-800/90 font-medium list-disc list-inside">
          <li><strong>零中转/零日志：</strong> Key 仅保存在您本地浏览器的 LocalStorage 中，绝对不上传或保存至任何开发者服务器。</li>
          <li><strong>一键随时销毁：</strong> 随时可以彻底擦除本地 Key，关闭网页后无法被他人窥探。</li>
        </ul>

        {hasKey && (
          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="text-[11px] font-bold text-rose-700 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 border border-rose-300 px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>{justCleared ? '已从本地销毁！' : '一键清除本地 API Key'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Request Mode Switcher */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3 space-y-2">
        <div className="flex items-center justify-between font-bold text-slate-700">
          <span className="flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>网络通信传输模式:</span>
          </span>
          <span className="text-[10px] text-slate-500 font-normal">可随时按需切换</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onRequestModeChange('direct')}
            className={`p-2.5 rounded-xl border-2 text-left transition-all ${
              requestMode === 'direct'
                ? 'bg-emerald-100/80 border-emerald-600 text-emerald-950 font-black shadow-sm'
                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-1 font-bold text-xs mb-0.5">
              <span>⚡ 浏览器直连模式</span>
              {requestMode === 'direct' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </div>
            <p className="text-[10px] text-slate-500 font-normal leading-tight">
              前端直接 Fetch 官方 API (无中转，最高安全级别)
            </p>
          </button>

          <button
            type="button"
            onClick={() => onRequestModeChange('proxy')}
            className={`p-2.5 rounded-xl border-2 text-left transition-all ${
              requestMode === 'proxy'
                ? 'bg-blue-100/80 border-blue-600 text-blue-950 font-black shadow-sm'
                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-1 font-bold text-xs mb-0.5">
              <span>🛡️ 后端代理转发</span>
              {requestMode === 'proxy' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
            </div>
            <p className="text-[10px] text-slate-500 font-normal leading-tight">
              请求经由开发服务器统一代理转发，解决跨域/防火墙
            </p>
          </button>
        </div>
      </div>

      {/* Accordion: F12 Inspection & DeepSeek Link */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 space-y-2">
        <button
          type="button"
          onClick={() => setShowVerificationGuide(!showVerificationGuide)}
          className="w-full flex items-center justify-between font-bold text-amber-800 hover:text-amber-950"
        >
          <span className="flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>如何验证我的 API Key 未被泄露？(F12 调试审计)</span>
          </span>
          {showVerificationGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showVerificationGuide && (
          <div className="space-y-1.5 pt-1.5 border-t border-amber-200 text-slate-700 leading-relaxed">
            <p>1. 按键盘 <kbd className="bg-amber-200/80 px-1 py-0.5 rounded font-mono text-[10px]">F12</kbd> 打开浏览器开发者工具。</p>
            <p>2. 点击 <strong>Network (网络)</strong> 选项卡，发送一条英语对话。</p>
            <p>3. 检查请求目标地址：直连模式下直接请求 <code className="bg-amber-200/60 px-1 rounded">https://api.deepseek.com</code>，中间没有任何第三方接口。</p>
            <p className="text-[10px] text-amber-800 pt-1 border-t border-amber-200">
              💡 免费获取 Key：注册 DeepSeek 官方开放平台 (<a href="https://platform.deepseek.com" target="_blank" rel="noreferrer" className="underline font-bold text-amber-900 hover:text-amber-600">platform.deepseek.com</a>) 即赠送 5 元测试额度，足够与 Alex 对话数十万字！
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
