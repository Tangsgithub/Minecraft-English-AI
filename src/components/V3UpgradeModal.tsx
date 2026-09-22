import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export const V3UpgradeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#2b2b2b] border-4 border-black shadow-2xl rounded-sm p-5 sm:p-6 text-white font-mono">
        
        {/* 关闭按钮 */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 标题 */}
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <Sparkles className="w-5 h-5 animate-bounce" />
          <span className="text-xs font-bold uppercase bg-amber-400/20 px-2 py-0.5 rounded-sm">
            全新改版升级
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-amber-300 mb-3">
          📢 全新 V3.0 像素新纪元正式上线！
        </h2>

        {/* 亮点卡片 */}
        <div className="space-y-2 bg-[#1e1e1e] border-2 border-black p-3 mb-4 text-xs text-slate-300 leading-relaxed">
          <div>⛏️ <b className="text-white">144 关全量重构：</b>新概念英语第一册全场景像素探险！</div>
          <div>🗣️ <b className="text-white">Alex 智能语音陪练：</b>全新自然口语对话与实时发音评测！</div>
          <div>💎 <b className="text-white">数据无缝互通：</b>您的旧版账号与绿宝石已完整打通！</div>
        </div>

        {/* 按钮 */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#4a4a4a] border-2 border-black text-slate-300 font-bold text-xs cursor-pointer"
          >
            留在旧版
          </button>

          <a
            href="https://v3.minecraftenglish.top/?from=v1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 border-2 border-black text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 cursor-pointer text-center no-underline"
          >
            <span>🚀 立即前往 V3.0 新版体验</span>
            <ArrowRight className="w-4 h-4 inline" />
          </a>
        </div>

      </div>
    </div>
  );
};
