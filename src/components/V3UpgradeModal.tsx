import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ExternalLink, Check, Copy, Compass, Zap, ShieldCheck } from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface V3UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const V3UpgradeModal: React.FC<V3UpgradeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetUrl = 'https://v3.minecraftenglish.top/?from=legacy_v2';

  const handleCopyUrl = () => {
    playClickSound();
    navigator.clipboard.writeText('https://v3.minecraftenglish.top');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJumpToV3 = () => {
    playEmeraldSound();
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#24351c] via-[#1a2515] to-[#121a0f] border-4 border-[#487E2C] shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-3xl p-5 sm:p-7 text-white font-mono my-auto">
        
        {/* Top Gold Trim Accent */}
        <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-80" />

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl bg-black/40 hover:bg-black/70 border border-white/10 transition-colors cursor-pointer"
          title="关闭窗口"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="flex items-center space-x-2 text-amber-400 mb-2.5">
          <div className="flex items-center space-x-1.5 bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-bounce" />
            <span>全新大版本上线通知</span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-xl sm:text-2xl font-black text-amber-300 mb-1.5 drop-shadow-md tracking-tight">
          🚀 切换至 V3.0 像素新纪元
        </h2>
        <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
          新一代 Minecraft 英语探索平台已全面就绪，带来更震撼的像素声画与互动体验！
        </p>

        {/* Domains Comparison */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="p-2.5 bg-black/40 rounded-xl border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase">当前版本 (旧版)</span>
            <span className="text-white font-bold truncate mt-0.5 font-mono">www.minecraftenglish.top</span>
            <span className="text-[10px] text-amber-300 mt-1">经典体验 · 稳定运行</span>
          </div>
          <div className="p-2.5 bg-emerald-950/70 rounded-xl border-2 border-emerald-500/60 flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-bold uppercase">最新发布 (V3.0)</span>
              <span className="text-[9px] bg-emerald-400 text-slate-950 font-black px-1.5 rounded">NEW</span>
            </div>
            <span className="text-emerald-200 font-black truncate mt-0.5 font-mono">v3.minecraftenglish.top</span>
            <span className="text-[10px] text-emerald-300 mt-1">全新功能 · 体验升级</span>
          </div>
        </div>

        {/* Highlights: V3 三大重磅升级体系 */}
        <div className="space-y-3 bg-black/65 border-2 border-black/90 rounded-2xl p-3.5 sm:p-4 mb-4 text-xs text-slate-200 leading-relaxed max-h-[52vh] sm:max-h-[460px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500/30">
          
          {/* 一、 融入式的沉浸闯关体系 */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent border-2 border-amber-400/40 shadow-xs">
            <div className="flex items-center space-x-1.5 text-amber-300 font-black mb-1.5">
              <span className="text-base">⚔️</span>
              <span className="text-xs sm:text-sm tracking-wide">一、 融入式的沉浸闯关体系（词汇与合成真正缝进主线）</span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1.5 pl-1 sm:pl-2">
              <p className="text-slate-200">
                <b className="text-amber-200">告别割裂功能，打造完整主线闭环：</b>
                在 V3.0 里，词汇和合成不再是飘在外面的独立功能，而是每一关探险必经的核心环节！
              </p>
              <div className="bg-black/40 border border-amber-400/20 p-2 rounded-lg space-y-1 text-[10.5px]">
                <div className="text-amber-300 font-bold flex items-center gap-1">
                  <span>🗺️</span> 自然合理的使用逻辑：
                </div>
                <p className="text-slate-300 leading-relaxed">
                  进入关卡 → 先在【词汇讲台】点亮本课核心单词、在靶场射击验证 → 赢取像素词汇材料后，直接在关卡内推入【合成台】拼接句型与语法配方 → 最终合成出通关道具击破路障！
                </p>
              </div>
              <p className="text-[10px] text-amber-300 font-mono bg-amber-950/40 border border-amber-500/30 px-2 py-1 rounded">
                💡 超强沉浸感：不再是“做完阅读做词汇题”，而是【搜集词汇原料 → 打造语法装备 → 攻略关卡地图】！
              </p>
            </div>
          </div>

          {/* 二、 全新的原版 Minecraft UI 设计 */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-transparent border-2 border-blue-400/40 shadow-xs">
            <div className="flex items-center space-x-1.5 text-blue-300 font-black mb-1.5">
              <span className="text-base">⛏️</span>
              <span className="text-xs sm:text-sm tracking-wide">二、 全新的原版 Minecraft UI 设计</span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1.5 pl-1 sm:pl-2">
              <p className="text-slate-200">
                <b className="text-blue-200">告别“教育软件的模板感”：</b>
                彻底剔除了现代网页的花哨渐变与扁平卡片，全量重构为原汁原味的 Minecraft 游戏界面。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px]">
                <div className="bg-black/40 border border-blue-400/20 p-2 rounded-lg">
                  <span className="text-blue-200 font-bold block mb-0.5">🧱 真实像素质感与触感</span>
                  <span className="text-slate-300">橡木木板衬底、石砖边框，具 3D 凹陷厚度的物品槽（Slot）与深陷按压动效。</span>
                </div>
                <div className="bg-black/40 border border-blue-400/20 p-2 rounded-lg">
                  <span className="text-blue-200 font-bold block mb-0.5">🔊 全套原版音画细节</span>
                  <span className="text-slate-300">箱子开合、方块碎裂、经验球拾取音效与血条 HUD 完美统一，真正像在玩 Minecraft！</span>
                </div>
              </div>
            </div>
          </div>

          {/* 三、 动物园系统（Zoo & Ranch） */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/15 via-green-500/10 to-transparent border-2 border-emerald-400/40 shadow-xs">
            <div className="flex items-center space-x-1.5 text-emerald-300 font-black mb-1.5">
              <span className="text-base">🐾</span>
              <span className="text-xs sm:text-sm tracking-wide">三、 动物园系统（Zoo & Ranch：学习成果的生命化载体）</span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-1.5 pl-1 sm:pl-2">
              <p className="text-slate-200">
                <b className="text-emerald-200">长效的情感激励中枢：</b>
                把传统枯燥的“分数/星级”，转化成了有生命的专属像素动物庄园。
              </p>
              <div className="bg-black/40 border border-emerald-400/20 p-2 rounded-lg space-y-1 text-[10.5px]">
                <div className="text-emerald-300 font-bold flex items-center gap-1">
                  <span>🌾</span> 学有所用，为爱喂养：
                </div>
                <p className="text-slate-300 leading-relaxed">
                  在主线闯关中拼对单词、合成句型产出小麦、胡萝卜和种子；带入动物园亲手喂养羊驼、小狐狸、熊猫和小蜜蜂！
                </p>
              </div>
              <p className="text-[10px] text-emerald-300 font-mono bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded">
                ❤️ 陪伴感与每日期待：小动物冒出爱心与原版叫声，孩子每天主动上线只为“照料我用知识喂养大的小动物”！
              </p>
            </div>
          </div>

          {/* 账号互通声明 */}
          <div className="pt-0.5 flex items-center justify-between text-[11px] text-amber-200/90 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="flex items-center gap-1 font-bold">
              <span>💎</span> 账号数据互通无忧：
            </span>
            <span className="text-slate-300">同一账号登录，原有经验、等级与绿宝石进度均同步保留</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-3 bg-slate-800 hover:bg-slate-700 border-2 border-black text-slate-300 font-bold text-xs rounded-xl cursor-pointer transition-all active:translate-y-0.5 shrink-0"
          >
            继续留在当前版
          </button>

          <button
            onClick={handleJumpToV3}
            className="w-full sm:w-auto flex-1 px-5 py-3 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 hover:from-emerald-400 hover:to-lime-200 border-2 border-black text-slate-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-[0_4px_0_0_#1b4313] active:translate-y-0.5 transition-all text-center"
          >
            <span>🚀 立即前往 V3.0 新版</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Footer Copy link */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[260px] sm:max-w-xs font-mono text-[10px]">
            网址: https://v3.minecraftenglish.top
          </span>
          <button
            onClick={handleCopyUrl}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 shrink-0 font-bold cursor-pointer ml-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>复制网址</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
