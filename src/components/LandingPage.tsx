import React, { useState } from 'react';
import { APP_VERSION_INFO } from '../types';
import { User } from 'firebase/auth';
import {
  Sparkles,
  Gamepad2,
  Check,
  Zap,
  UserCheck,
  QrCode,
  Map,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Award,
  LogIn,
  KeyRound,
  Headphones
} from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface LandingPageProps {
  currentUser: User | null;
  isAuthenticated?: boolean;
  onEnterApp: (targetTab?: 'map' | 'chat' | 'vocab' | 'missions') => void;
  onOpenAuth: () => void;
  onOpenParentDashboard: () => void;
  onOpenCustomerService?: () => void;
  onOpenVipModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentUser,
  isAuthenticated,
  onEnterApp,
  onOpenAuth,
  onOpenParentDashboard,
  onOpenCustomerService,
  onOpenVipModal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handleBuyClick = () => {
    playEmeraldSound();
    if (onOpenVipModal) {
      onOpenVipModal();
    } else {
      setIsPurchaseModalOpen(true);
    }
  };

  const handleEnterClick = (targetTab?: 'map' | 'chat' | 'vocab' | 'missions') => {
    if (!currentUser) {
      playClickSound();
      onOpenAuth();
    } else {
      playEmeraldSound();
      onEnterApp(targetTab);
    }
  };

  const toggleFaq = (index: number) => {
    playClickSound();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-16 overflow-x-hidden relative">
      {/* 像素背景点阵网格纹理 */}
      <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50 z-0" />

      {/* ===== 顶部 Header ===== */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b-4 border-slate-950 px-4 lg:px-8 py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => handleEnterClick('map')}
          >
            <div className="w-9 h-9 bg-emerald-600 border-2 border-slate-950 shadow-[2px_2px_0_0_#000] flex items-center justify-center text-lg font-mono">
              🟩
            </div>
            <div>
              <div className="font-black text-base sm:text-lg text-emerald-400 flex items-center gap-1.5 tracking-wide">
                Minecraft English
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-400 text-slate-950 border border-black font-extrabold shadow-sm">
                  {APP_VERSION_INFO.version}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                6-12岁方块英语启蒙世界
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenCustomerService && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCustomerService();
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-slate-950 shadow-[2px_2px_0_0_#000] text-xs font-bold transition-all active:translate-y-0.5 flex items-center space-x-1"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>在线客服</span>
              </button>
            )}

            <button
              onClick={() => {
                playClickSound();
                onOpenParentDashboard();
              }}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border-2 border-slate-950 shadow-[2px_2px_0_0_#000] text-xs font-bold transition-all active:translate-y-0.5 active:shadow-none"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>家长控制</span>
            </button>

            {currentUser || isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenAuth();
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-950 shadow-[2px_2px_0_0_#000] text-xs font-bold transition-all active:translate-y-0.5 flex items-center space-x-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 truncate max-w-[90px]">{currentUser?.email?.split('@')[0] || '账号中心'}</span>
                </button>

                <button
                  onClick={() => handleEnterClick('map')}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs border-2 border-slate-950 shadow-[3px_3px_0_0_#000] transition-all flex items-center space-x-1 active:translate-y-0.5 active:shadow-none"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>进入学习大厅</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAuth();
                }}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs border-2 border-slate-950 shadow-[3px_3px_0_0_#000] transition-all flex items-center space-x-1 active:translate-y-0.5 active:shadow-none"
              >
                <KeyRound className="w-4 h-4 text-slate-950" />
                <span>注册 / 登录</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="relative z-10">
        {/* ===== HERO 区域：简洁直接 ===== */}
        <section className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900 border-2 border-emerald-500/80 text-emerald-400 text-xs font-bold font-mono shadow-[2px_2px_0_0_#000]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Minecraft 游戏化情境启蒙 • 新概念1/2/3册课程体系</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            🎮 Minecraft 英语启蒙学习世界
            <span className="block mt-2 text-2xl sm:text-4xl text-amber-300 font-black">
              不用逼！让孩子在方块世界里快乐开口说英语
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            把枯燥的语法和单词，变成有趣的
            <span className="text-emerald-400 font-bold px-1">探索任务</span>、
            <span className="text-amber-300 font-bold px-1">Alex AI 伴读对练</span> 与
            <span className="text-cyan-300 font-bold px-1">方块合成实验室</span>！
          </p>

          {/* 核心操作按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleEnterClick('map')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base border-4 border-slate-950 shadow-[4px_4px_0_0_#000] transition-all flex items-center justify-center space-x-2 active:translate-y-0.5 active:shadow-none"
            >
              {currentUser || isAuthenticated ? (
                <>
                  <Gamepad2 className="w-5 h-5 text-slate-950" />
                  <span>🎮 进入学习大厅 (已登录)</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 text-slate-950" />
                  <span>🔑 注册 / 登录开启学习</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyClick}
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base border-4 border-slate-950 shadow-[4px_4px_0_0_#000] transition-all flex items-center justify-center space-x-2 active:translate-y-0.5 active:shadow-none"
            >
              <Zap className="w-5 h-5 text-slate-950 fill-current" />
              <span>开通/激活 VIP 终身包 (¥99)</span>
            </button>
          </div>

          {/* 登录状态醒目标示 */}
          <div className="pt-1">
            {currentUser || isAuthenticated ? (
              <div className="text-emerald-300 text-xs sm:text-sm font-bold font-mono inline-flex items-center gap-1.5 bg-slate-900/90 px-4 py-2 border-2 border-emerald-500/60 shadow-[2px_2px_0_0_#000] rounded-lg">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>已安全登录并连接云端同步，随时可以开始练习！</span>
              </div>
            ) : (
              <div className="text-amber-300 text-xs sm:text-sm font-bold font-mono inline-flex items-center gap-1.5 bg-slate-900/90 px-4 py-2 border-2 border-amber-500/60 shadow-[2px_2px_0_0_#000] rounded-lg">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>🔒 提示：首页不提供直接进入，必须先注册或登录账号才可进入学习页面</span>
              </div>
            )}
          </div>

          {/* 精简 Hero 视觉展示卡片 */}
          <div className="mt-8 bg-slate-900 border-4 border-slate-800 p-4 sm:p-6 shadow-[8px_8px_0_0_#000] text-left">
            <div className="bg-slate-950 border-2 border-dashed border-emerald-500/40 rounded-xl p-6 sm:p-10 text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl border-2 border-emerald-500/30 font-mono">
                🗺️
              </div>
              <div className="text-amber-300 font-extrabold text-sm sm:text-base font-mono">
                【Minecraft 双语关卡世界全景预览】
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                包含 144 个场景关卡地图、Alex AI 语音对话框、方块词汇合成台与家长监控面板
              </p>
            </div>
          </div>
        </section>

        {/* ===== 三大重点关注核心亮点 ===== */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t-4 border-slate-900">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              三大核心重难点破局
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              专攻传统英语学习痛点，打造高效沉浸闭环
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 亮点 1 */}
            <div className="bg-slate-900 border-4 border-slate-800 p-5 space-y-3 shadow-[5px_5px_0_0_#000]">
              <div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold text-xl">
                🗺️
              </div>
              <h3 className="font-extrabold text-base text-white">01. 方块情境记忆</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                告别凭空死记硬背！144 个 Minecraft 场景与新概念1/2/3册语法深度融合，看得到的方块才记得牢。
              </p>
            </div>

            {/* 亮点 2 */}
            <div className="bg-slate-900 border-4 border-slate-800 p-5 space-y-3 shadow-[5px_5px_0_0_#000]">
              <div className="w-10 h-10 bg-amber-500/20 border-2 border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-xl">
                🤖
              </div>
              <h3 className="font-extrabold text-base text-white">02. Alex AI 伴读纠音</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                纯正美音导师随时在线对话，孩子无社交压力，智能实时评测发音与句型得分。
              </p>
            </div>

            {/* 亮点 3 */}
            <div className="bg-slate-900 border-4 border-slate-800 p-5 space-y-3 shadow-[5px_5px_0_0_#000]">
              <div className="w-10 h-10 bg-blue-500/20 border-2 border-blue-400/40 text-blue-300 flex items-center justify-center font-bold text-xl">
                🛡️
              </div>
              <h3 className="font-extrabold text-base text-white">03. 家长护眼与讲义</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                内置护眼防沉迷定时提醒，提供可视化学习数据周报与配套 PDF 高清练习册打印。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 价格与特惠 ===== */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t-4 border-slate-900">
          <div className="bg-slate-900 border-4 border-emerald-500 p-6 sm:p-8 space-y-5 shadow-[8px_8px_0_0_#000] relative">
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 px-3 py-1 font-black text-xs font-mono shadow">
              🔥 终身学习包
            </div>

            <div>
              <h2 className="text-xl font-black text-white">Minecraft 英语启蒙全套 VIP</h2>
              <p className="text-xs text-slate-400 mt-1">解锁全部 144 关卡 + Alex AI 陪练 + PDF 练习册 + 新概念分册矩阵</p>
            </div>

            <div className="flex items-baseline space-x-3 border-y border-slate-800 py-3">
              <span className="text-4xl font-black text-emerald-400">¥99</span>
              <span className="text-xs text-slate-500 line-through">原价 ¥299</span>
              <span className="text-xs font-bold text-amber-300 ml-auto bg-amber-400/10 px-2 py-0.5 border border-amber-400/30">
                限时买断 • 永久有效
              </span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>144 课 Minecraft 双语关卡</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alex AI 语音实时评测纠音</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>可打印 PDF 高清练习册</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>新概念 1/2/3 册系统化矩阵</span>
              </li>
            </ul>

            <button
              onClick={handleBuyClick}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base border-4 border-slate-950 shadow-[4px_4px_0_0_#000] transition-all active:translate-y-0.5 active:shadow-none flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>开通 VIP / 输入激活码</span>
            </button>
          </div>
        </section>

        {/* ===== 精简 FAQ ===== */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t-4 border-slate-900">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ❓ 常见问题
            </h2>
          </div>

          <div className="space-y-2.5">
            {[
              {
                q: '适合多大年龄的孩子学习？',
                a: '适合 6-12 岁（小学阶段）孩子。课程难度循序渐进，从零基础基础词汇到复杂语法长句。'
              },
              {
                q: '需要单独购买或安装 Minecraft 游戏本体吗？',
                a: '不需要！本系统为独立网页端动画与交互学习软件，无需安装游戏，随开随学。'
              },
              {
                q: '如何使用激活码或获取账号？',
                a: '开通或使用激活码后系统会自动绑定当前账号，支持手机、平板与电脑跨设备使用。'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border-2 border-slate-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left font-bold text-xs sm:text-sm text-slate-200 flex items-center justify-between hover:bg-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-400 border-t border-slate-800 pt-2 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="pt-8 pb-6 border-t-4 border-slate-900 text-slate-500 text-xs text-center max-w-5xl mx-auto px-4 space-y-3 font-mono">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-bold">
            <button onClick={() => handleEnterClick('map')} className="hover:text-emerald-400">
              学习大厅
            </button>
            {onOpenCustomerService && (
              <button onClick={onOpenCustomerService} className="text-emerald-400 hover:underline flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" />
                <span>官方客服与工单</span>
              </button>
            )}
            <button onClick={onOpenParentDashboard} className="hover:text-emerald-400">
              家长控制中心
            </button>
            <button onClick={onOpenAuth} className="hover:text-emerald-400">
              登录账号
            </button>
          </div>
          <p>© 2026 Minecraft English World • {APP_VERSION_INFO.version}</p>
        </footer>
      </div>

      {/* ===== 购买/激活弹窗 Modal ===== */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border-4 border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center relative shadow-2xl">
            <button
              onClick={() => setIsPurchaseModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs"
            >
              ✕
            </button>

            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mx-auto border-2 border-emerald-500/40 font-mono">
              💎
            </div>

            <div>
              <h3 className="font-black text-base text-white">开通 Minecraft 英语 VIP</h3>
              <p className="text-xs text-slate-400 mt-0.5">全量关卡 + Alex AI 陪练 + 新概念三册矩阵</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400">终身买断特惠</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">¥99.00</div>
            </div>

            <div className="p-3 bg-white rounded-xl flex flex-col items-center justify-center space-y-1">
              <QrCode className="w-14 h-14 text-slate-800" />
              <span className="text-[11px] font-bold text-slate-800">微信 / 支付宝 扫码开通</span>
            </div>

            <button
              onClick={() => {
                setIsPurchaseModalOpen(false);
                handleEnterClick('map');
              }}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs border-2 border-slate-950 shadow-[2px_2px_0_0_#000]"
            >
              已付款？立即开始学习
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
