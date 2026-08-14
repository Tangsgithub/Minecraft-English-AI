import React, { useState } from 'react';
import { UserProfile } from '../types';
import { serverProxyLogin, serverProxyRegister, updateUserPassword, auth, User } from '../lib/firebase';
import { playClickSound, playLevelUpSound } from '../utils/audio';
import { UserCheck, UserPlus, KeyRound, ShieldCheck, Zap, Sparkles, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null, profile?: UserProfile) => void;
  currentProfile: UserProfile;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  currentProfile,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'reset'>('login');
  
  // Form fields
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account.trim() || !password) {
      setMessage({ type: 'error', text: '请输入账号和密码' });
      return;
    }

    setLoading(true);
    setMessage(null);
    playClickSound();

    const res = await serverProxyLogin(account.trim(), password);
    setLoading(false);

    if (res.success && res.user && res.profile) {
      playLevelUpSound();
      setMessage({ type: 'success', text: res.message || '登录成功！已从云端同步您的学习进度' });
      onUserChange(res.user, res.profile);
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1000);
    } else {
      setMessage({ type: 'error', text: res.message || '登录失败，请检查账号和密码' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account.trim()) {
      setMessage({ type: 'error', text: '请输入手机号、邮箱或用户名' });
      return;
    }
    if (account.trim().length < 3) {
      setMessage({ type: 'error', text: '账号长度至少需要 3 个字符' });
      return;
    }
    if (!password || password.length < 6) {
      setMessage({ type: 'error', text: '密码长度至少需要 6 位' });
      return;
    }

    setLoading(true);
    setMessage(null);
    playClickSound();

    const finalNickname = nickname.trim() || account.trim();
    const res = await serverProxyRegister(account.trim(), password, finalNickname, currentProfile);
    setLoading(false);

    if (res.success && res.user && res.profile) {
      playLevelUpSound();
      setMessage({ type: 'success', text: res.message || '注册成功！账户已云端关联' });
      onUserChange(res.user, res.profile);
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1000);
    } else {
      setMessage({ type: 'error', text: res.message || '注册失败，该账号可能已被占用' });
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account.trim()) {
      setMessage({ type: 'error', text: '请输入已注册的账号' });
      return;
    }
    if (!password || password.length < 6) {
      setMessage({ type: 'error', text: '新密码长度至少需要 6 位' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: '两次输入的密码不一致' });
      return;
    }

    setLoading(true);
    setMessage(null);
    playClickSound();

    const res = await updateUserPassword(account.trim(), password, nickname.trim());
    setLoading(false);

    if (res.success) {
      playLevelUpSound();
      setMessage({ type: 'success', text: '密码重置成功，请使用新密码登录' });
      setTimeout(() => {
        setTab('login');
        setPassword('');
        setConfirmPassword('');
        setMessage(null);
      }, 1200);
    } else {
      setMessage({ type: 'error', text: res.message || '重置失败，请核对账号信息' });
    }
  };

  const handleSignOut = () => {
    playClickSound();
    auth.currentUser = null;
    localStorage.removeItem('mc_english_user_profile');
    localStorage.removeItem('mc_english_current_user');
    onUserChange(null);
    setMessage({ type: 'success', text: '已退出登录，您现在处于本地游客状态' });
    setTimeout(() => {
      setMessage(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-4 border-emerald-500/80 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] text-white font-mono relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-5 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              🛡️
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span>Minecraft 云端通行证</span>
                <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  直连无忧
                </span>
              </h2>
              <p className="text-[11px] text-emerald-300/80 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>中国境内无需VPN • 多端进度实时同步</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition-all"
          >
            ✕
          </button>
        </div>

        {/* Currently Logged In Banner */}
        {currentUser && (
          <div className="bg-emerald-950/60 border-b border-emerald-500/20 px-5 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">当前已登录: <strong className="text-emerald-300 font-extrabold">{currentUser.nickname || currentUser.account}</strong></span>
            </div>
            <button
              onClick={handleSignOut}
              className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg font-bold flex items-center gap-1 transition-all text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span>退出登录</span>
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/80 text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setMessage(null); playClickSound(); }}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              tab === 'login'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>账号登录</span>
          </button>

          <button
            onClick={() => { setTab('register'); setMessage(null); playClickSound(); }}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              tab === 'register'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>快速注册</span>
          </button>

          <button
            onClick={() => { setTab('reset'); setMessage(null); playClickSound(); }}
            className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              tab === 'reset'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>重置密码</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Notification Message */}
          {message && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                : 'bg-red-500/20 border-red-400/50 text-red-300'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span className="leading-tight">{message.text}</span>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  账号 (手机号 / 邮箱 / 用户名)
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="例如: 13800138000 或 steve"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  登录密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl border-2 border-emerald-300 shadow-[0_4px_0_0_#065f46] transition-all active:translate-y-0.5 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin">⏳</span>
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>{loading ? '正在安全登录...' : '立即登录并同步云端进度'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  注册账号 <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="支持手机号 / 邮箱 / 自定义英文名"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  史蒂夫角色昵称 (选填)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="例如: 小史蒂夫 / Alex_Hero"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  设置密码 <span className="text-emerald-400">* (至少6位)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入6位以上密码"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl border-2 border-emerald-300 shadow-[0_4px_0_0_#065f46] transition-all active:translate-y-0.5 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin">⏳</span>
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{loading ? '正在建立云端账号...' : '一键免费注册 (国内直连)'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: RESET */}
          {tab === 'reset' && (
            <form onSubmit={handleReset} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  注册时使用的账号 (手机号 / 邮箱 / 用户名)
                </label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="输入您的注册账号"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  设置新密码 (至少 6 位)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入新密码"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  确认新密码
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入新密码"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-xl text-sm text-white outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl border-2 border-emerald-300 shadow-[0_4px_0_0_#065f46] transition-all active:translate-y-0.5 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? '正在提交...' : '确认重置密码'}
              </button>
            </form>
          )}

          {/* Guarantees Footer */}
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>零门槛 • 境内直接访问</span>
            </span>
            <span className="text-slate-500">加密算法数据安全传输</span>
          </div>

        </div>

      </div>
    </div>
  );
};
