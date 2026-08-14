import React, { useState } from 'react';
import { Compass, BookOpen, MessageSquare, Hammer, Shield, Sparkles, CheckCircle2, Trophy, Volume2, UserCheck, X, Layers, Zap } from 'lucide-react';
import { playClickSound, speakText } from '../utils/audio';

interface StudyGuideManualModalProps {
  onClose: () => void;
}

export const StudyGuideManualModal: React.FC<StudyGuideManualModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'quickstart' | 'volumes' | 'map' | 'alex' | 'craft' | 'parents'>('quickstart');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-4xl text-[#2D2D2D] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.25)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-4 sm:p-6 border-b-2 sm:border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-900 border-2 border-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0">
              📖
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black font-mono text-white flex items-center space-x-2">
                <span>Minecraft English 学习指导手册</span>
                <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 rounded-full font-bold">
                  用户指南 V2.0
                </span>
              </h2>
              <p className="text-xs text-emerald-100 font-mono font-bold mt-0.5">
                新概念英语第一册 144 课 • 探索式口语学习完全指南
              </p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30 transition-all flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>关闭</span>
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="bg-slate-100 p-2 sm:p-3 border-b-2 border-slate-200 flex gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'quickstart', label: '🚀 快速上手', icon: Compass },
            { id: 'volumes', label: '🏛️ 四册差异化教学法', icon: Layers },
            { id: 'map', label: '🗺️ 课程地图', icon: BookOpen },
            { id: 'alex', label: '💬 Alex AI口语', icon: MessageSquare },
            { id: 'craft', label: '🔨 3x3合成工坊', icon: Hammer },
            { id: 'parents', label: '🛡️ 家长管理中心', icon: Shield },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playClickSound(); setActiveSection(tab.id as any); }}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black transition-all flex items-center space-x-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#487E2C] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 font-mono text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* TAB 1: QUICKSTART */}
          {activeSection === 'quickstart' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl">
                <h3 className="text-base font-black text-[#487E2C] flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#487E2C]" />
                  <span>欢迎来到 Minecraft 英语冒险世界！</span>
                </h3>
                <p>
                  本应用将 **《新概念英语》第一册 (144 课全量内容)** 与 **Minecraft (我的世界)** 沙盒世界观深度融合。孩子将扮演一名探险家，在方块大陆中跟着 **Alex AI 语音导师** 边学边练口语！
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border-2 border-slate-200 space-y-1">
                  <div className="font-black text-[#FF6321] text-sm flex items-center space-x-1">
                    <span>1. 探险地图解密</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    从村庄广场 (Lesson 1) 逐步向外探险，解锁橡木森林、沙漠神殿与末地大门。
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border-2 border-slate-200 space-y-1">
                  <div className="font-black text-[#487E2C] text-sm flex items-center space-x-1">
                    <span>2. 朗读与 AI 对话</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    每一课提供标准的系统发音示范与麦克风评测，与 Alex AI 进行实时双语角色扮演。
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border-2 border-slate-200 space-y-1">
                  <div className="font-black text-cyan-700 text-sm flex items-center space-x-1">
                    <span>3. 3x3 语法合成</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    在 3x3 工作台中摆放单词方块，拼出课文句型，锻造钻石剑与神级防具。
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border-2 border-slate-200 space-y-1">
                  <div className="font-black text-amber-700 text-sm flex items-center space-x-1">
                    <span>4. 绿宝石与大事件</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    完成日常任务与随机突发事件，赚取绿宝石，在流浪商人宝库换取稀有防具！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VOLUMES DIFFERENTIATION */}
          {activeSection === 'volumes' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-amber-900 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-amber-800" />
                  <span>《新概念英语》四册阶梯差异化教学体系</span>
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  各分册语言难度与认知要求呈阶梯式跃升。我们深度结合 Minecraft 沙盒机制，为每一册量身打造了<strong>完全不同的学习互动方式</strong>：
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {/* Book 1 */}
                <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-950 text-sm flex items-center gap-1.5">
                      <span>🏡</span>
                      <span>第一册《英语初阶》(First Things First · 144课)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                      宁静村庄与农场 · 听说启蒙
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 font-bold">
                    🎯 专属学习方式：【图文配对 + 3x3 积木拼句 + 场景朗读】
                  </p>
                  <ul className="text-xs text-emerald-800 space-y-1 pl-4 list-disc">
                    <li><strong>基础三词排砖</strong>：直观掌握主语 (S)、谓语 (V)、宾语 (O) 词序。</li>
                    <li><strong>原声听音与跟读评分</strong>：儿童友好语音慢速带读，建立纯正音感。</li>
                    <li><strong>生活场景迁移</strong>：将游戏道具替换为校园文具、家庭餐桌与日常礼貌表达。</li>
                  </ul>
                </div>

                {/* Book 2 */}
                <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-red-950 text-sm flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>第二册《实践与进步》(Practice & Progress · 96课)</span>
                    </span>
                    <span className="text-[10px] bg-red-200 text-red-900 px-2 py-0.5 rounded-full font-bold">
                      红石工业与远古要塞 · 逻辑进阶
                    </span>
                  </div>
                  <p className="text-xs text-red-900 font-bold">
                    🎯 专属学习方式：【红石电路逻辑连线 + 故事摘要 3 段式复述】
                  </p>
                  <ul className="text-xs text-red-800 space-y-1 pl-4 list-disc">
                    <li><strong>红石逻辑连词门</strong>：使用 but, because, so, although 连通红石信号，击破复合句难点。</li>
                    <li><strong>时态中继器拨片</strong>：强化过去完成时 (had done)、将来完成时 (will have done) 与被动语态。</li>
                    <li><strong>篇章复述挑战 (Story Retelling)</strong>：根据 3 组核心线索词，口述还原整篇幽默叙事短文。</li>
                  </ul>
                </div>

                {/* Book 3 */}
                <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-950 text-sm flex items-center gap-1.5">
                      <span>🌌</span>
                      <span>第三册《培养技能》(Developing Skills · 60篇社科名篇)</span>
                    </span>
                    <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">
                      末地神殿与炼药附魔 · 高阶精读
                    </span>
                  </div>
                  <p className="text-xs text-purple-900 font-bold">
                    🎯 专属学习方式：【长难句附魔台 + 同义词提纯 + AI 辩论】
                  </p>
                  <ul className="text-xs text-purple-800 space-y-1 pl-4 list-disc">
                    <li><strong>非谓语与倒装附魔</strong>：剖析长难句结构，给句子注入高级修辞属性。</li>
                    <li><strong>同义替换炼药</strong>：进阶词汇精准替换，提升书面写作表达质感。</li>
                  </ul>
                </div>

                {/* Book 4 */}
                <div className="bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>第四册《流利英语》(Fluency in English · 48篇原版典籍)</span>
                    </span>
                    <span className="text-[10px] bg-slate-300 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                      远古图书馆 · 学术流利
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">
                    🎯 专属学习方式：【名篇断句精译 + 学术讲台演讲答辩】
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAP */}
          {activeSection === 'map' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-amber-900 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-amber-800" />
                  <span>144 课新概念全景地图指南</span>
                </h3>
                <p className="text-xs text-amber-800">
                  地图分为 **巨型全景地图** 与 **关卡详情** 两种视图。您可以在顶部栏随时切换视角。
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">解锁机制 (Progress Unlocking)</strong>
                    通关上一课（完成生词朗读 + 课文评测或 AI 聊天）后，下一课将自动解锁并亮起。
                  </div>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">🎲</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">随机冒险事件 (Random Events)</strong>
                    在地图探险时，有概率触发苦力怕危机或流浪商人密信，答对英语选择题可获得大额绿宝石奖励！
                  </div>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">🔊</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">手机端发音与音效</strong>
                    手机端进入应用后，点击页面任意按钮（如“开声测试”）即可自动解除 iOS / Android 浏览器的自动播放限制。
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALEX AI */}
          {activeSection === 'alex' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-emerald-900 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-emerald-800" />
                  <span>与 Alex AI 导师自然交流</span>
                </h3>
                <p className="text-xs text-emerald-800">
                  Alex 是耐心友善的 Minecraft 村庄教师。她会根据孩子当前学的课文进行角色扮演引导。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-[#487E2C] font-black block mb-1">🎤 语音与键盘双模式</span>
                  支持长按/点击麦克风直接说英语，也可以直接输入文字对话。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-[#487E2C] font-black block mb-1">💡 实时智能语法纠错</span>
                  当孩子说错语法时，Alex 会温柔给出改正建议并带读正确例句。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-[#487E2C] font-black block mb-1">🔊 纯正英美音切换</span>
                  系统搭载自然语音引擎，发音清晰平滑，极具沉浸感。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-[#487E2C] font-black block mb-1">🔑 密钥支持</span>
                  设置中可填入您自己的 Gemini / DeepSeek API 密钥，零等待流畅应答。
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CRAFT */}
          {activeSection === 'craft' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-amber-900 flex items-center space-x-2">
                  <Hammer className="w-5 h-5 text-amber-800" />
                  <span>MC 3x3 英语合成实验室使用说明</span>
                </h3>
                <p className="text-xs text-amber-800">
                  实验室包含三个小功能：**3x3 物品合成台**、**3x3 语法句子工坊** 与 **⚔️ 怪物英语擂台**。
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">🔨</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">3x3 物品合成</strong>
                    根据秘籍摆放方块，成功合成物品将自动掌握对应的 MC 英语单词（如 Crafting Table, Pickaxe, Diamond Sword）。
                  </div>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">语法句子拼接与自动复位</strong>
                    内容根据学习进度实时更新。选择词汇方块进行拼接，如果错误，**单词方块将自动复位恢复到备选槽**，可无缝重新尝试！
                  </div>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl flex items-start space-x-3">
                  <span className="text-xl">⚔️</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">怪物英语擂台</strong>
                    挑战夜袭僵尸、苦力怕与末影龙，题目选项位置已随机分布（不局限于固定答案），斩击 Boss 赢取高额绿宝石！
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PARENTS */}
          {activeSection === 'parents' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-blue-900 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-800" />
                  <span>家长管理中心与防沉迷系统</span>
                </h3>
                <p className="text-xs text-blue-800">
                  专为家长打造的护航系统，保护孩子视力并实时追踪学习数据。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-blue-900 font-black block mb-1">⏱️ 视力保护与定时锁屏</span>
                  支持设置单次学习时长（如 15分钟 / 30分钟）。时间到达后自动进入护眼休息页面。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-blue-900 font-black block mb-1">🔒 家长口令保护</span>
                  修改防沉迷时间与重置数据需要解答家长加减法验证或口令。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-blue-900 font-black block mb-1">📊 周度学习周报导出</span>
                  可视化展示孩子本周学习时长、掌握单词数、语法分与对话互动次数。
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <span className="text-blue-900 font-black block mb-1">☁️ Firebase 云端同步</span>
                  登录后学习数据自动同步至云端，更换手机或电脑无缝接续学习！
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-500 font-bold hidden sm:block">
            如有问题或建议，欢迎联系开发者支持团队
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-2.5 rounded-xl font-mono font-black text-xs shadow-[0_3px_0_0_#2A4718] transition-all ml-auto"
          >
            我已明白，开始学习 ➔
          </button>
        </div>

      </div>
    </div>
  );
};
