import React, { useState } from 'react';
import { Compass, BookOpen, MessageSquare, Hammer, Shield, Sparkles, CheckCircle2, Trophy, Volume2, UserCheck, X, Layers, Zap, Radio, Disc, KeyRound, HelpCircle, ArrowRight, HeartHandshake, FileText, Headphones } from 'lucide-react';
import { playClickSound, speakText } from '../utils/audio';

interface StudyGuideManualModalProps {
  onClose: () => void;
}

type GuideSection = 'roadmap' | 'radio' | 'alex' | 'vocab_craft' | 'gamification' | 'parents' | 'faq';

export const StudyGuideManualModal: React.FC<StudyGuideManualModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<GuideSection>('roadmap');

  const guideTabs: { id: GuideSection; label: string; icon: any }[] = [
    { id: 'roadmap', label: '🚀 学习路线闭环', icon: Compass },
    { id: 'radio', label: '📻 听力电台与三遍法', icon: Radio },
    { id: 'alex', label: '👩‍🦰 Alex 1V1 口语对练', icon: MessageSquare },
    { id: 'vocab_craft', label: '📦 词汇与3x3工坊', icon: Hammer },
    { id: 'gamification', label: '💎 绿宝石与成就体系', icon: Trophy },
    { id: 'parents', label: '🛡️ 家长护航与护眼', icon: Shield },
    { id: 'faq', label: '❓ 常见问答 FAQ', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-4xl text-[#2D2D2D] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-4 sm:p-5 border-b-2 sm:border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-900 border-2 border-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0">
              📖
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono text-white flex items-center space-x-2">
                <span>Minecraft English 学习与实战指南</span>
                <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 rounded-full font-bold">
                  官方全量教研版
                </span>
              </h2>
              <p className="text-xs text-emerald-100 font-mono font-bold mt-0.5">
                新概念体系 • 三遍精听法 • Alex 听后说闭环 • 家长护航全景手册
              </p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>关闭</span>
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="bg-slate-100 p-2 border-b-2 border-slate-200 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {guideTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { playClickSound(); setActiveSection(tab.id); }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-black transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#487E2C] text-white shadow-sm border-2 border-[#355E20]'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 font-mono text-xs sm:text-sm leading-relaxed text-slate-700">
          
          {/* SECTION 1: ROADMAP & CLOSED LOOP */}
          {activeSection === 'roadmap' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl">
                <h3 className="text-base font-black text-[#487E2C] flex items-center space-x-2 mb-1.5">
                  <Sparkles className="w-5 h-5 text-[#487E2C]" />
                  <span>科学 4 步学习闭环：从「纯正输入」到「自信输出」</span>
                </h3>
                <p className="text-xs text-slate-600">
                  本平台严谨整合《新概念英语》官方全量课文与 Minecraft 沙盒沉浸世界观，拒绝死记硬背，为孩子构建完整的语言习得闭环：
                </p>
              </div>

              {/* 4 Step Process Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50/80 p-3.5 rounded-2xl border-2 border-blue-200 space-y-1.5">
                  <div className="font-black text-blue-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>📻 沉浸电台 · 三遍精听输入</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    在电台中通过「音律感知 $\rightarrow$ 慢速精听 $\rightarrow$ 影子跟读」三遍法，彻底打磨纯正美音语感与连读弱读习惯。
                  </p>
                </div>

                <div className="bg-amber-50/80 p-3.5 rounded-2xl border-2 border-amber-200 space-y-1.5">
                  <div className="font-black text-amber-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                    <span>🗺️ 关卡地图 · 句型精讲与发音评测</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    逐步探索 144 关 Minecraft 主题场景，由易到难掌握核心句型、双语词汇与重点语法规则。
                  </p>
                </div>

                <div className="bg-purple-50/80 p-3.5 rounded-2xl border-2 border-purple-200 space-y-1.5">
                  <div className="font-black text-purple-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>🔨 3x3 积木工坊 · 语法排砖与合成</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    在 Minecraft 经典工作台中摆放单词方块，像搭积木一样拼装句型，掌握主谓宾与疑问句结构。
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-3.5 rounded-2xl border-2 border-emerald-200 space-y-1.5">
                  <div className="font-black text-emerald-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">4</span>
                    <span>👩‍🦰 Alex 1V1 对练 · 听后说实战输出</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    与耐心友善的 Alex AI 导师进行 1V1 英文情景对谈，实时纠正发音结构，将输入真正转化为自由表达！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: RADIO IMMERSION & THREE TIMES LISTENING METHOD */}
          {activeSection === 'radio' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-purple-900 flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-purple-700" />
                  <span>听力电台与「三遍精听磨耳朵法」权威指南</span>
                </h3>
                <p className="text-xs text-purple-800">
                  语言学研究表明：<strong>听是说的前置母体</strong>。没有足够高频次、清晰的有效输入，口语表达就如同无源之水。
                </p>
              </div>

              {/* The Three-Times Method Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 space-y-3">
                <div className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                  <Disc className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>三遍精听法 (Three-Times Listening Method) 深度执行步骤：</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-black text-[11px] shrink-0">第 1 遍</span>
                    <div>
                      <strong className="text-slate-900 block font-bold">【全英文原速 · 音律盲听感知】</strong>
                      <p className="text-slate-600 mt-0.5">闭上眼睛或观察唱片机律动，不看中文，专注于语音的连读、爆破音、弱读节奏与语调起伏，建立大脑的音律反射区。</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-black text-[11px] shrink-0">第 2 遍</span>
                    <div>
                      <strong className="text-slate-900 block font-bold">【0.85x 慢速精听 · 中英对照剖析】</strong>
                      <p className="text-slate-600 mt-0.5">系统自动降速带读并播放中文释义，帮助孩子扫清生词盲区与句型结构，理清每个单词的具体含义与语法逻辑。</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-[11px] shrink-0">第 3 遍</span>
                    <div>
                      <strong className="text-slate-900 block font-bold">【标准原速 · 影子跟读 (Shadowing) + 回音间隔】</strong>
                      <p className="text-slate-600 mt-0.5">播放原声并在播完后留出 2~3 秒「回音静音间隔」，引导孩子大声模仿原声的语调与发音，形成肌肉发音记忆。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel Types & Custom Importer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <strong className="text-blue-700 block mb-1">📻 课文磨耳朵</strong>
                  100% 覆盖新概念课文重点句型与经典对话，支持顺序连播与智能复盘。
                </div>
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <strong className="text-amber-700 block mb-1">🗡️ MC 探险故事</strong>
                  沉浸式我的世界矿洞、下界与村庄原创探险短剧，激发孩子原汁原味的探索欲望。
                </div>
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <strong className="text-purple-700 block mb-1">📜 经典寓言与导入</strong>
                  精选伊索寓言等经典名篇，同时支持家长/学员一键导入自定义英文故事与生词。
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: ALEX AI 1V1 SPEAKING */}
          {activeSection === 'alex' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-emerald-900 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-emerald-800" />
                  <span>Alex 1V1 导师：听后说实战联动（方案 C 架构）</span>
                </h3>
                <p className="text-xs text-emerald-800">
                  Alex 不仅是 Minecraft 村庄的导师，更是一位永远耐心、鼓励开口、能精准指出发音与语法问题的专属 AI 外教。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-[#487E2C] font-black text-sm block">🎙️ 听后说联动闭环 (电台直通)</span>
                  <p className="text-slate-600">在电台听完故事或课文后，点击「连线 Alex」，系统会自动载入当前故事的情节背景，开启有针对性的 1V1 探讨。</p>
                </div>

                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-[#487E2C] font-black text-sm block">🎤 语音与按键双输入</span>
                  <p className="text-slate-600">支持点击麦克风直接用英语说话，精准识别口语；也支持软键盘打字，满足不同网络与环境下的练习需求。</p>
                </div>

                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-[#487E2C] font-black text-sm block">💡 智能纠错与带读示范</span>
                  <p className="text-slate-600">如果孩子单复数搞混或遗漏冠词（如 a / an），Alex 会温柔提醒并给出标准例句示范，鼓励重新尝试。</p>
                </div>

                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-[#487E2C] font-black text-sm block">🐢 0.7x 慢速助读 & 大字助读</span>
                  <p className="text-slate-600">在对话框内点击慢速播放按钮，Alex 会以清晰慢速单独重放该句，帮助孩子听清每一个尾音与连读细节。</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: VOCABULARY & CRAFTING LAB */}
          {activeSection === 'vocab_craft' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-amber-900 flex items-center space-x-2">
                  <Hammer className="w-5 h-5 text-amber-800" />
                  <span>词汇宝典与 3x3 语法合成工坊</span>
                </h3>
                <p className="text-xs text-amber-800">
                  将抽象的英语语法具象化为 Minecraft 方块搭建，让背单词和学语法像玩游戏一样自然有趣。
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">词汇宝典 (艾宾浩斯抗遗忘记忆库)</strong>
                    收录全册所有官方生词与例句，自动标记掌握状态。生词可通过朗读发音和拼写测试一键掌握并加入熟词库。
                  </div>
                </div>

                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">🔨</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">3x3 语法工作台 (排砖拼句)</strong>
                    孩子需要将单词方块拖入 3x3 格子中组成正确句型。若顺序有误，**单词方块将自动复位恢复到备选槽**，让孩子在安全试错中顿悟语序。
                  </div>
                </div>

                <div className="p-3.5 bg-white border-2 border-slate-200 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-sm">怪物英语擂台 (斩击 Boss)</strong>
                    在限时挑战中击退夜袭僵尸、苦力怕与末影龙，快速判断词义与句型，斩获高额经验值与绿宝石！
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: GAMIFICATION & EMERALDS */}
          {activeSection === 'gamification' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-amber-900 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-amber-800" />
                  <span>绿宝石经济学与游戏化正向激励</span>
                </h3>
                <p className="text-xs text-amber-800">
                  绿宝石 ❇️ 是 Minecraft 英语世界的通用货币，所有奖励均来自孩子的主动学习与口语实践。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <strong className="text-emerald-700 block mb-1">❇️ 绿宝石获取方式</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                    <li>完成每日登录签到 (+10 绿宝石)</li>
                    <li>通关新概念关卡评测 (+15~30 绿宝石)</li>
                    <li>电台听读与收集故事生词 (+1~5 绿宝石)</li>
                    <li>完成日常任务与突发冒险事件</li>
                    <li>家长在家长中心给予赞赏奖励</li>
                  </ul>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl">
                  <strong className="text-blue-700 block mb-1">🛡️ 流浪商人宝库兑换</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                    <li>在合成与宝库中兑换铁剑、钻石头盔、下界合金甲</li>
                    <li>解锁稀有成就徽章（如「发音大师」「勤奋矿工」）</li>
                    <li>兑换现实中家长的许愿奖励承诺</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: PARENT GUARD & PIN PROTECTION */}
          {activeSection === 'parents' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-2xl space-y-2">
                <h3 className="text-base font-black text-blue-900 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-800" />
                  <span>家长护航中心与专属安全门禁</span>
                </h3>
                <p className="text-xs text-blue-800">
                  为家长提供全面的视力保护、学情追踪与双重防孩子误触机制。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-blue-900 font-black block">🔐 专属 4 位 PIN 码门禁</span>
                  <p className="text-slate-600">已彻底淘汰低级乘法，支持家长设置专属 4 位密码，并提供成人常识问答双重备份，孩子无法自行修改限制。</p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-blue-900 font-black block">⏱️ 护眼防沉迷黑屏休息</span>
                  <p className="text-slate-600">支持设定单次连续使用时长（如 15/20 分钟），到达后自动触发护眼黑屏，引导孩子远眺休息视力。</p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-blue-900 font-black block">📊 6 维发音雷达与学情周报</span>
                  <p className="text-slate-600">精准诊断 th 咬舌音、r 卷舌音、长元音等 6 个发音维度，一键生成学情报告复制发至家长群。</p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <span className="text-blue-900 font-black block">☁️ Firebase 跨设备云同步</span>
                  <p className="text-slate-600">登录账号后，学习进度、词汇掌握和绿宝石余额实时同步，手机、iPad 与电脑无缝衔接。</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: FAQ & TROUBLESHOOTING */}
          {activeSection === 'faq' && (
            <div className="space-y-3">
              <div className="bg-slate-100 border-2 border-slate-300 p-3.5 rounded-2xl">
                <h3 className="text-sm font-black text-slate-800 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#487E2C]" />
                  <span>常见问题与使用技巧解答 (FAQ)</span>
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-black">Q1: 手机或 iPad 浏览器打开后听不到声音怎么办？</strong>
                  <p className="text-slate-600">
                    因为 iOS Safari 和部分 Android 浏览器存在「网页自动播放限制」，进入应用后只需<strong>点击任意按钮（或顶部的音效开关）</strong>，系统就会瞬间激活音频通道，恢复正常发音与音效。
                  </p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-black">Q2: 孩子觉得 Alex 语速稍快，如何调节？</strong>
                  <p className="text-slate-600">
                    在电台界面可点击「0.8x 慢速」按钮；或者进入「家长中心」/「设置」将默认语速调整为 0.8x 慢速带读。
                  </p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-black">Q3: 如何跨设备（如从手机换到平板电脑）继续学习？</strong>
                  <p className="text-slate-600">
                    点击右上角用户头像注册/登录您的账号，学习进度（关卡、生词、绿宝石）会自动加密同步到云端数据库。在另一台设备登录相同账号即可无缝继续。
                  </p>
                </div>

                <div className="p-3 bg-white border-2 border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 block font-black">Q4: 如何使用自己的 AI 密钥（DeepSeek / Gemini）？</strong>
                  <p className="text-slate-600">
                    点击右上角「设置」$\rightarrow$「AI 导师模型与 API 密钥」，选择您的提供商并填入 API Key，即可获得零等待的超高并发对话响应。
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono text-slate-500 font-bold hidden sm:flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#487E2C]" />
            <span>Minecraft 英语教研中心 • 陪伴孩子流利开口说英语</span>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-6 py-2.5 rounded-xl font-mono font-black text-xs shadow-[0_3px_0_0_#2A4718] transition-all ml-auto cursor-pointer active:translate-y-0.5"
          >
            我已掌握，开始探索 ➔
          </button>
        </div>

      </div>
    </div>
  );
};
