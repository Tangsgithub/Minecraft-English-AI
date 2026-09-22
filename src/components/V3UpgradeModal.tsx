import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Compass, Swords, ShieldCheck, Zap } from 'lucide-react';

interface V3UpgradeModalProps {
  onClose?: () => void;
}

export const V3UpgradeModal: React.FC<V3UpgradeModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // 检查今天是否已经主动关闭过，避免每次刷新重复打扰用户
    const dismissedTime = localStorage.getItem('mc_v3_upgrade_dismissed_time');
    const now = Date.now();
    // 超过 24 小时再次提醒，或者从未关闭过
    if (!dismissedTime || now - parseInt(dismissedTime, 10) > 24 * 60 * 60 * 1000) {
      // 延迟 800ms 弹出，体验更平滑自然
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('mc_v3_upgrade_dismissed_time', Date.now().toString());
    setIsOpen(false);
    onClose?.();
  };

  const handleJumpToV3 = () => {
    window.open('https://v3.minecraftenglish.top/?from=v1', '_blank');
    handleDismiss();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs animate-fadeIn">
      {/* 像素质感弹窗容器 */}
      <div className="relative w-full max-w-lg bg-[#2b2b2b] border-4 border-black shadow-[0_12px_32px_rgba(0,0,0,0.8)] rounded-sm p-4 sm:p-6 text-white font-mono">
        
        {/* 顶部关闭按钮 */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-black/40 p-1 rounded-sm border border-transparent hover:border-black transition-colors cursor-pointer"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 标题徽章区 */}
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <Sparkles className="w-5 h-5 animate-bounce" />
          <span className="text-xs font-black tracking-wider uppercase bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-sm">
            Major Upgrade
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-3">
          📢 全新 V3.0 像素新纪元重磅上线！
        </h2>

        {/* 亮点卡片 */}
        <div className="space-y-2.5 bg-[#1e1e1e] border-2 border-black p-3.5 mb-4 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start space-x-2.5">
            <span className="text-emerald-400 text-sm shrink-0">⛏️</span>
            <div>
              <span className="font-bold text-white">144 关全新探险地图：</span>
              <span>新概念英语第一册全量知识点与原版场景重构！</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <span className="text-amber-400 text-sm shrink-0">🗣️</span>
            <div>
              <span className="font-bold text-white">Alex 智能语音陪练：</span>
              <span>实时真人自然发音评估，打造沉浸式像素口语世界。</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <span className="text-cyan-400 text-sm shrink-0">💎</span>
            <div>
              <span className="font-bold text-white">云端数据无缝互通：</span>
              <span>您的账号、通关等级与绿宝石已完整打通，免重新注册！</span>
            </div>
          </div>
        </div>

        {/* 底部按钮区域 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#4a4a4a] hover:bg-[#3a3a3a] border-2 border-black text-slate-300 font-bold text-xs shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.4),inset_2px_2px_0px_rgba(255,255,255,0.2)] active:translate-y-0.5 cursor-pointer text-center"
          >
            继续留在经典旧版
          </button>

          <button
            onClick={handleJumpToV3}
            className="w-full sm:w-auto flex-1 px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 hover:brightness-110 border-2 border-black text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.4),inset_2px_2px_0px_rgba(255,255,255,0.5)] active:translate-y-0.5 cursor-pointer"
          >
            <span>🚀 立即前往 V3.0 体验</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
