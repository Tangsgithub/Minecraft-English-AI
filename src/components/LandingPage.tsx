import React, { useState } from 'react';
import { APP_VERSION_INFO } from '../types';
import { User } from '../lib/firebase';
import {
  Gamepad2,
  Check,
  Zap,
  UserCheck,
  QrCode,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Headphones,
  ArrowRight
} from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';
import { UserProfile } from '../types';

interface LandingPageProps {
  currentUser: User | null;
  isAuthenticated?: boolean;
  profile?: UserProfile;
  onEnterApp: (targetTab?: 'map' | 'chat' | 'vocab' | 'missions') => void;
  onOpenAuth: () => void;
  onOpenParentDashboard: () => void;
  onOpenCustomerService?: () => void;
  onOpenAdminConsole?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentUser,
  onEnterApp,
  onOpenAuth,
  onOpenParentDashboard,
  onOpenCustomerService,
  onOpenAdminConsole
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleEnterClick = (targetTab?: 'map' | 'chat' | 'vocab' | 'missions') => {
    playEmeraldSound();
    onEnterApp(targetTab);
  };

  const toggleFaq = (index: number) => {
    playClickSound();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-16 relative overflow-x-hidden">
      {/* 极简网格纹理背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      {/* ===== 极简 Header ===== */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleEnterClick('map')}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              🟩
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base text-white tracking-tight">
                Minecraft English
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-emerald-400 rounded-full border border-slate-700">
                {APP_VERSION_INFO.version}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {onOpenAdminConsole && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAdminConsole();
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/90 hover:bg-red-900 text-red-200 border border-red-500/80 text-xs font-black transition-all shadow-md active:scale-95"
                title="超级管理员控制台"
              >
                <span>🛠️ 管理员后台</span>
              </button>
            )}

            <button
              onClick={() => {
                playClickSound();
                onOpenAuth();
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                currentUser
                  ? 'bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {currentUser ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="max-w-[100px] truncate text-emerald-300 font-extrabold">
                    {currentUser.nickname || currentUser.account}
                  </span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>注册 / 登录</span>
                </>
              )}
            </button>

            {onOpenCustomerService && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenCustomerService();
                }}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-medium transition-colors"
              >
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>客服</span>
              </button>
            )}

            <button
              onClick={() => {
                playClickSound();
                onOpenParentDashboard();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>家长中心</span>
            </button>

            <button
              onClick={() => handleEnterClick('map')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>开始学习</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* ===== HERO 极简大标题区 ===== */}
        <section className="pt-16 pb-12 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Minecraft 方块双语启蒙 • 新概念1/2/3/4册体系</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            在方块世界里，快乐开口说英语
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            无需逼迫背诵。结合 Minecraft 探索关卡、Alex AI 智能伴读与词汇实验室，让孩子边玩边掌握英语表达。
          </p>

          {/* 核心操作按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleEnterClick('map')}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>直接进入学习大厅</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* ===== 极简三大亮点 Grid ===== */}
        <section className="py-12 border-t border-slate-800/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                🗺️
              </div>
              <h3 className="font-bold text-sm text-white">144 关双语地图</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                融汇新概念核心词汇与语法，看得到的方块场景，记得牢的实景表达。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center text-lg">
                🤖
              </div>
              <h3 className="font-bold text-sm text-white">Alex AI 伴读纠音</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                美音导师随时语音对话，无社交压力，智能实时评测发音与语法。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center text-lg">
                🛡️
              </div>
              <h3 className="font-bold text-sm text-white">家长护眼与数据</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                防沉迷定时提醒，学习统计数据明晰，支持配套 PDF 讲义与练习册。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 极简 FAQ 折叠面板 ===== */}
        <section className="py-8 border-t border-slate-800/60">
          <h2 className="text-base font-bold text-white mb-4 text-center">常见问题</h2>
          <div className="space-y-2">
            {[
              {
                q: '适合多大年龄的孩子学习？',
                a: '适合 6-12 岁（小学阶段）孩子，课程难度循序渐进，从基础词汇到复杂句型。'
              },
              {
                q: '需要单独安装 Minecraft 游戏吗？',
                a: '不需要！本系统为独立网页端学习软件，打开即学。'
              },
              {
                q: '支持跨设备学习与数据同步吗？',
                a: '支持！个人学习进度自动同步，电脑、手机和平板均可随时随地学习。'
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl bg-slate-900/40 border border-slate-800/80 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left font-medium text-xs text-slate-200 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-400 border-t border-slate-800/60 pt-2.5 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== 极简 Footer ===== */}
        <footer className="pt-8 pb-4 text-center text-slate-500 text-xs space-y-2 border-t border-slate-800/60">
          <div className="flex items-center justify-center space-x-4 text-slate-400">
            <button onClick={() => handleEnterClick('map')} className="hover:text-emerald-400 transition-colors">
              学习大厅
            </button>
            {onOpenCustomerService && (
              <button onClick={onOpenCustomerService} className="hover:text-emerald-400 transition-colors">
                联系客服
              </button>
            )}
            <button onClick={onOpenParentDashboard} className="hover:text-emerald-400 transition-colors">
              家长控制
            </button>
            <button onClick={onOpenAuth} className="hover:text-emerald-400 transition-colors">
              登录账号
            </button>
            {onOpenAdminConsole && (
              <button onClick={onOpenAdminConsole} className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                🛠️ 管理员后台
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-600 font-mono">© 2026 Minecraft English World • {APP_VERSION_INFO.version}</p>
        </footer>
      </div>
    </div>
  );
};

