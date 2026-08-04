import React from 'react';
import { BookOpen, Compass, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhitepaperGuideModalProps {
  onClose: () => void;
}

export const WhitepaperGuideModal: React.FC<WhitepaperGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-3xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#8B8B8B] border-2 border-black rounded-xl flex items-center justify-center text-xl shadow shrink-0">
              📄
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono text-white">
                《Minecraft English AI 本地智能学习客户端》白皮书 V1.0
              </h2>
              <p className="text-xs text-white/90 font-mono font-bold">
                个人开发者 / 小团队落地产品白皮书与架构指导说明
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed text-slate-700 font-bold">
          
          {/* Section 1 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-2">
            <h3 className="text-sm font-black text-[#FF6321] flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#FF6321]" />
              <span>一、项目概述与定位</span>
            </h3>
            <p>
              暂定名称：<strong className="text-[#487E2C] font-black">Minecraft English Adventure AI (我的世界英语冒险AI学习助手)</strong>
            </p>
            <p>
              定位：一款基于 Minecraft 世界观打造的儿童英语 AI 学习客户端。通过 Minecraft 场景、Alex AI 角色互动、新概念英语课程体系与游戏任务机制，帮助 6-12 岁儿童进行英语启蒙与口语练习。
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-2">
            <h3 className="text-sm font-black text-[#487E2C] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#487E2C]" />
              <span>二、三大核心设计原则</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li><strong className="text-[#FF6321]">原则 1：零服务器成本 (Zero Server Cost)</strong> — AI 计算由用户自带的 DeepSeek API / Gemini API 承担，开发者无需垫付 Token 费用与高额服务器开销。</li>
              <li><strong className="text-[#FF6321]">原则 2：本地优先 (Local First)</strong> — 学习记录、单词掌握度、难度进度全量保存在本地设备中。</li>
              <li><strong className="text-[#FF6321]">原则 3：儿童友好 (Child Friendly)</strong> — 不是干瘪的聊天框，而是可互动的“AI 英语游戏伙伴 Alex”。</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-2">
            <h3 className="text-sm font-black text-cyan-700 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>三、功能模块落地矩阵</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-700">
              <div className="p-3 bg-white rounded-xl border-2 border-slate-200">
                <span className="text-[#487E2C] font-black block mb-1">模块 1：Alex AI 老师</span>
                友善耐心的 Minecraft 村庄教师 NPC，具备双语提示与改错引导。
              </div>
              <div className="p-3 bg-white rounded-xl border-2 border-slate-200">
                <span className="text-[#487E2C] font-black block mb-1">模块 2：144 课新概念体系</span>
                涵盖新概念英语第一册全量课目结构与 Minecraft 村庄场景。
              </div>
              <div className="p-3 bg-white rounded-xl border-2 border-slate-200">
                <span className="text-[#487E2C] font-black block mb-1">模块 3：MC 专属词库</span>
                结合方块 (block)、合成 (craft)、采矿 (mine) 等 60+ MC 核心生词。
              </div>
              <div className="p-3 bg-white rounded-xl border-2 border-slate-200">
                <span className="text-[#487E2C] font-black block mb-1">模块 4：游戏化任务与阶梯</span>
                Lv1 草方块新人 → Lv10 石器时代 → Lv30 钻石玩家 → Lv50 宗师。
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-2.5 rounded-xl font-mono font-black text-xs shadow-[0_3px_0_0_#2A4718]"
          >
            已阅读白皮书，继续学习
          </button>
        </div>

      </div>
    </div>
  );
};
