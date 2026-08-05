import React, { useState } from 'react';
import {
  Sparkles,
  Gamepad2,
  CheckCircle2,
  XCircle,
  Video,
  FileText,
  BookOpen,
  Layers,
  Map,
  MessageSquare,
  Trophy,
  Scroll,
  Clock,
  Eye,
  Heart,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  UserCheck,
  QrCode,
  Check,
  Lock,
  Mail,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface LandingPageProps {
  onEnterApp: (targetTab?: 'map' | 'chat' | 'vocab' | 'missions') => void;
  onOpenAuth: () => void;
  onOpenParentDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenAuth,
  onOpenParentDashboard
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'map' | 'alex' | 'vocab' | 'missions' | 'trophy'>('map');

  const handleBuyClick = () => {
    playEmeraldSound();
    setIsPurchaseModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    playClickSound();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-12 overflow-x-hidden">
      {/* ===== 顶部 Sticky Header ===== */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onEnterApp('map')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 p-0.5 shadow-lg shadow-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
              <span className="text-2xl">🟩</span>
            </div>
            <div>
              <div className="font-extrabold text-lg bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300 bg-clip-text text-transparent flex items-center gap-1.5">
                Minecraft English World
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  官网
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">专为 6-12 岁设计的 Minecraft 启蒙系统</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                playClickSound();
                onOpenParentDashboard();
              }}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>家长监控中心</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenAuth();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              登录 / 注册
            </button>

            <button
              onClick={() => {
                playEmeraldSound();
                onEnterApp('map');
              }}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center space-x-1"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>进入孩子学习大厅</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== ① 首屏 Hero 区域 ===== */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* 背景虚化与MC方块氛围 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span>Minecraft 游戏化情境教学体系 • 144个主线双语场景</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            🎮 Minecraft 英语启蒙学习世界
            <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-emerald-400 via-green-300 to-amber-300 bg-clip-text text-transparent font-extrabold">
              让孩子在喜欢的世界里，真正爱上英语
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            专为 6-12 岁儿童设计的游戏化英语学习系统。把枯燥的语法单词，变成充满乐趣的：
            <span className="text-emerald-400 font-bold">🏡 探索任务</span>、
            <span className="text-amber-300 font-bold">⛏ 冒险挑战</span> 与
            <span className="text-purple-300 font-bold">🎒 成长升级</span>！
          </p>

          {/* 四大核心卖点 Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto pt-2">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-left flex items-center space-x-2.5 shadow-sm">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">144 课英语视频</div>
                <div className="text-[10px] text-slate-400">情境化短视频教学</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-left flex items-center space-x-2.5 shadow-sm">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">144 课配套 PPT</div>
                <div className="text-[10px] text-slate-400">家庭陪学/精讲复习</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-left flex items-center space-x-2.5 shadow-sm">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">方块英语练习册</div>
                <div className="text-[10px] text-slate-400">可打印闭环强化</div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-left flex items-center space-x-2.5 shadow-sm">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-100">持续更新内容</div>
                <div className="text-[10px] text-slate-400">一次购买 永久升级</div>
              </div>
            </div>
          </div>

          {/* CTA 双按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                playEmeraldSound();
                onEnterApp('map');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 border border-emerald-300/40"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>🎁 免费体验 3 课 (进入试学)</span>
            </button>

            <button
              onClick={handleBuyClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 border border-amber-200/50"
            >
              <Zap className="w-5 h-5 text-slate-950 fill-current" />
              <span>🚀 开启英语冒险 (¥99 终身包)</span>
            </button>
          </div>
        </div>

        {/* 学习大厅直观预览框 */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 p-2 sm:p-4 shadow-2xl shadow-emerald-950/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-3 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="font-mono text-slate-300 ml-2">minecraftenglish.top • 孩子学习世界实时预览</span>
            </div>
            <button
              onClick={() => onEnterApp('map')}
              className="text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <span>直接打开学习大厅</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 p-4 sm:p-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 space-y-3">
                <div className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  🎮 关卡1: Oak Forest Village (橡木森林村庄)
                </div>
                <h3 className="text-xl font-bold text-white">"Alex Teacher, look! A wooden house!"</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  孩子跟随 Alex 老师在 MC 村庄里收集木头、建造房屋，在真实语境中自然掌握 <code className="text-emerald-300 font-mono">wood, house, craft, build</code> 等核心词汇与日常应用句型！
                </p>
                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">🟢 听力理解: 100%</span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">💎 获得绿宝石: +15</span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">⭐ XP 增长: +30</span>
                </div>
              </div>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-center space-y-2">
                <div className="text-4xl">🤖💬</div>
                <div className="font-bold text-sm text-emerald-300">Alex 老师 AI 互动音色</div>
                <div className="text-[11px] text-slate-400">支持智能语音互动与多轮口语对练</div>
                <button
                  onClick={() => onEnterApp('chat')}
                  className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow"
                >
                  试听 Alex 老师发音
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ② 第二屏：家长痛点对比 ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            孩子不是不喜欢英语，而是不喜欢枯燥的传统方式
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            用孩子最热爱的游戏世界作为激发兴趣的钥匙，让死记硬背变成主动探险
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* 左侧：传统学习 */}
          <div className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-base text-red-400 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                传统英语学习方式
              </span>
              <span className="text-xs text-slate-500 font-mono">死记硬背 • 被动抗拒</span>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">❌</span>
                <span><strong>枯燥背单词：</strong>缺乏生动画面，死记硬背拼写，几天后迅速遗忘。</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">❌</span>
                <span><strong>缺少真实场景：</strong>脱离生活与兴趣，孩子无法理解单词在实际环境中的含义。</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">❌</span>
                <span><strong>家长催促抗拒：</strong>每次做英语练习都要反复催促，孩子产生抵触心理。</span>
              </li>
            </ul>
          </div>

          {/* 右侧：Minecraft English */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl shadow-emerald-950/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-base text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Minecraft English 世界
              </span>
              <span className="text-xs text-emerald-400/80 font-mono">情境理解 • 主动探索</span>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✅</span>
                <span><strong>三维场景理解：</strong>在方块建造与生存冒险中，自然将英文词汇与事物对应。</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✅</span>
                <span><strong>游戏任务驱动：</strong>完成英文挑战解锁新区域，用成就感代替死板考试。</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✅</span>
                <span><strong>孩子主动要学：</strong>“妈妈，我今天还要完成 Alex 老师的方块英语冒险！”</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== ③ 第三屏：展示核心产品界面 (5大模块) ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
            模块一览
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            一个完整属于孩子的 Minecraft 英语学习世界
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            集成地图、AI对练、词库、任务与勋章，全面闭环保障学习效果
          </p>
        </div>

        {/* 标签切换导航 */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-8">
          {[
            { id: 'map', label: '🗺 冒险地图 (144关)', icon: Map },
            { id: 'alex', label: '👩 Alex 英语老师', icon: MessageSquare },
            { id: 'vocab', label: '📚 MC 核心词库', icon: BookOpen },
            { id: 'missions', label: '⚒ 每日任务系统', icon: Scroll },
            { id: 'trophy', label: '🏆 成就勋章树', icon: Trophy }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActivePreviewTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 border ${
                activePreviewTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 动态内容展示框 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          {activePreviewTab === 'map' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <Map className="w-5 h-5 text-emerald-400" />
                  144 关 Minecraft 启蒙地图路线图
                </h3>
                <span className="text-xs text-slate-400">逐步解锁 • 进阶式成长</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                包含 Oak Forest (森林村庄)、Deep Mine (深层矿洞)、Nether Citadel (下界要塞) 等丰富高频生活与自然科学场景，引导孩子沿着地图一步步打关通关！
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-xs">
                  <div className="font-bold text-emerald-300">Level 1 ~ 30</div>
                  <div className="text-slate-400 text-[11px] mt-1">基础词汇、方块色彩、环境与动作</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/30 text-xs">
                  <div className="font-bold text-blue-300">Level 31 ~ 90</div>
                  <div className="text-slate-400 text-[11px] mt-1">日常对话、工具合成、生存指令</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 text-xs">
                  <div className="font-bold text-amber-300">Level 91 ~ 144</div>
                  <div className="text-slate-400 text-[11px] mt-1">进阶短句表达、故事理解、情境表达</div>
                </div>
              </div>
            </div>
          )}

          {activePreviewTab === 'alex' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  Alex 英语 AI 对练导师
                </h3>
                <span className="text-xs text-slate-400">实时发音 • 鼓励式教学</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                由 AI 驱动的 Alex 老师时刻守护在孩子身边，拥有标准美式发音与清晰的双语讲解能力，耐心回答孩子的每一个疑问，并送上绿宝石与经验奖励！
              </p>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="text-emerald-400 font-bold">👩 Alex Teacher:</div>
                <div className="text-slate-200">"Great job! You crafted a wooden pickaxe! What materials do we need for a stone one?"</div>
                <div className="text-slate-400 text-[11px]">[太棒了！你合成了木镐！我们制作石镐需要什么材料呢？]</div>
              </div>
            </div>
          )}

          {activePreviewTab === 'vocab' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Minecraft 实用核心词库
                </h3>
                <span className="text-xs text-slate-400">已收录 300+ 核心词汇</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                覆盖分类闪卡、例句演练、一键掌握标记以及发音播报，让每个新词都能在三维场景中快速关联理解。
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['oak_log (橡木)', 'iron_ingot (铁锭)', 'diamond (钻石)', 'creeper (苦力怕)', 'shield (盾牌)'].map(w => (
                  <span key={w} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activePreviewTab === 'missions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <Scroll className="w-5 h-5 text-emerald-400" />
                  每日英语挑战任务
                </h3>
                <span className="text-xs text-slate-400">每日更新 • 积累绿宝石</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                设置每天10分钟可完成的小任务，如“向 Alex 老师问好”、“复习 5 个方块单词”，每天获得绿宝石，培养良好学习习惯！
              </p>
            </div>
          )}

          {activePreviewTab === 'trophy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                  成就与勋章荣誉体系
                </h3>
                <span className="text-xs text-slate-400">记录每一次成长</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                解锁“初级冒险家”、“词汇大师”、“语言合成本领”等定制勋章，通过荣誉驱动孩子的内在自信！
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-slate-800 flex justify-center">
            <button
              onClick={() => {
                playEmeraldSound();
                onEnterApp(activePreviewTab === 'alex' ? 'chat' : activePreviewTab === 'vocab' ? 'vocab' : 'map');
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <span>👉 体验孩子每天打开的学习世界</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== ④ 第四屏：课程内容价值四大卡片 ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold">
            学习资源包
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            一套完整、系统的 Minecraft 英语启蒙体系
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            不仅仅是视频，更涵盖完整的配套课件与纸质练习册闭环
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl font-bold border border-emerald-500/20">
              🎬
            </div>
            <h3 className="font-extrabold text-base text-white">Minecraft 英语短视频</h3>
            <div className="text-xs text-emerald-400 font-semibold">144 课 • 每课约 30 秒</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              精选高频场景，结合动画与真人发音，让孩子在纯正情境中瞬间理解英文含义。
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl font-bold border border-blue-500/20">
              🖥
            </div>
            <h3 className="font-extrabold text-base text-white">配套精讲 PPT 课件</h3>
            <div className="text-xs text-blue-400 font-semibold">144 课 • 每课约 10 页</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              超高颜值配图与知识点拆解，非常适合家庭亲子陪学或直接打印巩固。
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl font-bold border border-amber-500/20">
              ✏️
            </div>
            <h3 className="font-extrabold text-base text-white">方块英语纸质练习册</h3>
            <div className="text-xs text-amber-400 font-semibold">支持高清可打印 PDF</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              覆盖单词拼写、短句填空与方块迷宫，从“看懂”升级到“独立书写”。
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl font-bold border border-purple-500/20">
              📖
            </div>
            <h3 className="font-extrabold text-base text-white">教材配套学习资源</h3>
            <div className="text-xs text-purple-400 font-semibold">科学进阶 • 覆盖核心考点</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              无缝对接国家英语课程标准，在兴趣拓展的同时奠定学校听力与口语基础。
            </p>
          </div>
        </div>
      </section>

      {/* ===== ⑤ 第五屏：游戏化学习流程 ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            每天 10 分钟，完成一次英语探险
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            不是让孩子玩游戏，而是利用孩子最喜欢的世界培养英语兴趣
          </p>
        </div>

        {/* 5 步流程展示 */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-5xl mx-auto text-center">
          {[
            { step: '01', icon: '🎮', title: '进入地图', desc: '选择今日英语冒险关卡' },
            { step: '02', icon: '📖', title: '学习任务', desc: '观看情境短片掌握新词' },
            { step: '03', icon: '💬', title: '英语表达', desc: '与 Alex 老师语音口语互动' },
            { step: '04', icon: '⭐', title: '获得奖励', desc: '收获绿宝石与能力经验' },
            { step: '05', icon: '🏆', title: '解锁成长', desc: '合成新卡牌与荣誉勋章' }
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 relative">
              <div className="text-2xl">{s.icon}</div>
              <div className="text-xs font-mono font-bold text-emerald-400">STEP {s.step}</div>
              <div className="text-sm font-bold text-white">{s.title}</div>
              <div className="text-[11px] text-slate-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ⑥ 第六屏：家长关切保障 ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            家长贴心设计
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            家长最关心的，我们都提前考虑到了
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-bold text-base text-white">控制学习节奏与护眼锁</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                每天建议 10-20 分钟，内置智能护眼休息提醒与连续学习计时锁定，轻松坚持不沉迷。
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-bold text-base text-white">清晰掌控学习过程</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                包含独立“家长监控中心”，一键查看孩子的今日学习时长、已掌握词汇量与任务完成率。
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-bold text-base text-white">家庭陪学超级简单</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                无需家长具备高深英语水平，配套 PPT 与参考手卡让零基础父母也能轻松指导。
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="font-bold text-base text-white">内容持续免费升级</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                一次购买，后续拓展地图、新主题词汇与 Alex AI 体验升级全量免费获取。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ⑦ 第七屏：持续更新路线图 (99元核心价值) ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            长期价值承诺
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Minecraft 英语世界正在不断扩建
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            你购买的不只是一套资料，而是一座持续成长的英语学习大厅！
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs">
              现已上线 V1.0
            </span>
            <span className="text-sm font-bold text-white">144 课 Minecraft 英语冒险基础地图及全套资源</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <div className="text-xs font-bold text-amber-300">🏫 School World</div>
              <div className="text-[11px] text-slate-400 mt-1">学校与校园常用表达拓展</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <div className="text-xs font-bold text-green-300">🐾 Animal World</div>
              <div className="text-[11px] text-slate-400 mt-1">自然界与各种动物生物百科</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <div className="text-xs font-bold text-blue-300">🌎 Life World</div>
              <div className="text-[11px] text-slate-400 mt-1">生活常识与环球探险英语</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <div className="text-xs font-bold text-purple-300">🤖 Alex AI 进化</div>
              <div className="text-[11px] text-slate-400 mt-1">更加智能的自由多轮对练</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ⑧ 第八屏：产品价格购买卡片 (游戏商店风) ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900" id="pricing">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            游戏商店
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            开启孩子的 Minecraft 英语冒险
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            一次购买，获取全套资源与线上互动平台永久使用权限
          </p>
        </div>

        <div className="max-w-md mx-auto bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
          {/* 限时优惠标签 */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[11px] shadow">
            🔥 终身学习包
          </div>

          <div>
            <div className="text-lg font-extrabold text-white">Minecraft 英语启蒙全套学习包</div>
            <div className="text-xs text-slate-400 mt-0.5">解锁全部 144 关卡 + Alex AI 陪练 + PDF 下载</div>
          </div>

          <div className="flex items-baseline space-x-2 border-y border-slate-800/80 py-4">
            <span className="text-4xl font-black text-emerald-400">¥99</span>
            <span className="text-xs text-slate-500 line-through">原价 ¥299</span>
            <span className="text-xs font-bold text-amber-300 ml-auto bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              限时立省 200 元
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-200">
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>144 课 Minecraft 英语视频课程</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>144 课配套精讲 PPT 课件</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>方块英语纸质练习册 (高清 PDF 打印)</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>国家教材配套英语学习体系资源</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Alex 老师 AI 语音对练与实时指导</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>后续拓展地图与更新内容全量免费领</span>
            </li>
          </ul>

          <button
            onClick={handleBuyClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 border border-emerald-300/40"
          >
            🎁 立即加入 (¥99 购买)
          </button>

          <div className="text-[11px] text-center text-slate-500">
            虚拟数字产品，购买后系统自动解锁，可直接登录账号使用
          </div>
        </div>
      </section>

      {/* ===== ⑨ 第九屏：FAQ 常见问题 ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            ❓ 常见问题解答 (FAQ)
          </h2>
          <p className="text-slate-400 text-sm">
            帮助您全面了解 Minecraft English World
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: '适合多大年龄的孩子学习？',
              a: '最适合 6-12 岁（小学 1-6 年级）英语启蒙与基础拓展阶段的孩子。课程难度由浅入深，非常契合此年龄段孩子的认知水平与兴趣。'
            },
            {
              q: '需要另外购买或安装 Minecraft 游戏本体吗？',
              a: '不需要！本系统是完全独立运行在网页端的动画与互动学习系统，利用孩子喜爱的 Minecraft 场景辅助教学，无需另外安装游戏。'
            },
            {
              q: '购买后多久可以使用？如何获取资源？',
              a: '付款成功后系统会自动把全量权益绑定到您的账号上。您可以随时在本官网登录进入“孩子学习世界”，并在资源区下载 PPT 与练习册。'
            },
            {
              q: '后续更新需要另外收费吗？',
              a: '不需要！后续扩建的 V2.0 场景地图、新词汇包以及 Alex AI 升级均对已购买用户永久免费共享。'
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left font-bold text-sm sm:text-base text-slate-200 flex items-center justify-between hover:bg-slate-850"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== ⑩ 第十屏：Footer ===== */}
      <footer className="pt-12 pb-8 border-t border-slate-900 text-slate-500 text-xs text-center max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-slate-400">
          <button onClick={() => onEnterApp('map')} className="hover:text-emerald-400 transition-colors">
            孩子学习世界
          </button>
          <button onClick={onOpenParentDashboard} className="hover:text-emerald-400 transition-colors">
            家长监控中心
          </button>
          <button onClick={onOpenAuth} className="hover:text-emerald-400 transition-colors">
            用户登录 / 注册
          </button>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">
            购买说明
          </a>
        </div>

        <div className="space-y-1">
          <p>© 2026 MinecraftEnglish.top • All Rights Reserved.</p>
          <p className="text-[11px] text-slate-600">
            Minecraft 属于 Mojang AB / Microsoft 注册商标。本站为独立开发的英语启蒙教育辅助工具。
          </p>
        </div>
      </footer>

      {/* ===== 购买 199元 弹窗 (Modal) ===== */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 text-center relative shadow-2xl">
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mx-auto border border-emerald-500/30">
              💎
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-white">开启 Minecraft 英语启蒙</h3>
              <p className="text-xs text-slate-400 mt-1">解锁全部 144 关卡 + Alex AI 陪练</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">订单金额</div>
              <div className="text-3xl font-black text-emerald-400">¥99.00</div>
              <div className="text-[10px] text-emerald-300/80 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                终身学习包 • 自动开通所有权限
              </div>
            </div>

            {/* 微信 / 扫码说明 */}
            <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center space-y-2">
              <div className="w-36 h-36 bg-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-300 text-slate-800 text-xs font-mono p-2 text-center">
                <QrCode className="w-16 h-16 text-slate-800 mb-1" />
                <span>微信/支付宝扫码</span>
                <span className="text-[10px] text-slate-500 font-sans">扫码快捷支付开通</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsPurchaseModalOpen(false);
                onEnterApp('map');
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all"
            >
              ✅ 已完成付款？立即进入学习大厅
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
