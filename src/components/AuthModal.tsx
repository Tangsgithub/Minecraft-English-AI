import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { 
  auth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  saveUserProfileToCloud,
  fetchUserProfileFromCloud,
  checkUserExistsInFirestore,
  findUserAccountByEmail,
  updateUserPassword,
  serverProxyLogin,
  serverProxyRegister
} from '../lib/firebase';
import { UserProfile } from '../types';
import { playClickSound, playLevelUpSound, playEmeraldSound } from '../utils/audio';
import { LogIn, UserPlus, LogOut, Cloud, Shield, CheckCircle, AlertCircle, Sparkles, KeyRound, Mail, User as UserIcon, Lock } from 'lucide-react';

interface AuthModalProps {
  currentUser: User | null;
  currentProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onProfileLoaded: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  currentProfile,
  isOpen,
  onClose,
  onProfileLoaded
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'change_password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const formatEmailInput = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed) return '';
    if (trimmed.includes('@')) return trimmed;
    return `${trimmed}@minecraft.com`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('请填写完整的邮箱/用户名与密码！');
      return;
    }

    const targetEmail = formatEmailInput(email);

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Primary: Server Proxy Login (bypasses China client-side network restrictions, directly queries Firestore on server)
      const serverResult = await serverProxyLogin(targetEmail, password);
      if (serverResult) {
        if (serverResult.success && serverResult.profile) {
          localStorage.setItem('mc_account_' + targetEmail, JSON.stringify({ profile: serverResult.profile, password }));
          onProfileLoaded(serverResult.profile);
          playLevelUpSound();
          setSuccessMsg(serverResult.message || '登录成功！(服务端直连 Firestore 数据库已同步)');
          setTimeout(() => onClose(), 1000);
          return;
        } else if (serverResult.message) {
          setErrorMsg(serverResult.message);
          return;
        }
      }

      // 2. Client SDK Firebase Auth Login fallback
      try {
        const userCredential = await signInWithEmailAndPassword(auth, targetEmail, password);
        const uid = userCredential.user.uid;
        
        const cloudProfile = await fetchUserProfileFromCloud(uid);
        if (cloudProfile) {
          onProfileLoaded(cloudProfile);
        } else {
          const updated = {
            ...currentProfile,
            id: uid,
            email: userCredential.user.email || targetEmail,
            nickname: nickname || currentProfile.nickname || 'Minecraft探险家'
          };
          await saveUserProfileToCloud(updated, uid, password);
          onProfileLoaded(updated);
        }

        playLevelUpSound();
        setSuccessMsg('登录成功！云端档案已准备就绪。');
        setTimeout(() => onClose(), 1000);
        return;
      } catch (authErr: any) {
        console.warn('Client Firebase Auth login error:', authErr);
      }

      // 3. Fallback to local account check if offline
      const localAccountStr = localStorage.getItem('mc_account_' + targetEmail);
      if (localAccountStr) {
        try {
          const localAcc = JSON.parse(localAccountStr);
          if (localAcc.password === password) {
            onProfileLoaded(localAcc.profile);
            playLevelUpSound();
            setSuccessMsg('登录成功！(已自动切入本地离线无缝存档)');
            setTimeout(() => onClose(), 1000);
            return;
          } else {
            setErrorMsg('密码不正确，请重新输入或点击【修改密码】！');
            return;
          }
        } catch (e) {}
      }

      setErrorMsg('账号不存在或密码错误！若为新玩家，请切换至【注册账号】。');

    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || '登录遇到网络波动，请重试或检查账户！');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !nickname) {
      setErrorMsg('请填写所有必需注册信息！');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('密码长度不能少于 6 位！');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('两次输入的密码不一致！');
      return;
    }

    const targetEmail = formatEmailInput(email);

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Primary: Server Proxy Registration & Deduplication (Directly writes to Firestore from server)
      const serverResult = await serverProxyRegister(targetEmail, password, nickname, currentProfile);
      if (serverResult) {
        if (serverResult.success && serverResult.profile) {
          localStorage.setItem('mc_account_' + targetEmail, JSON.stringify({ profile: serverResult.profile, password }));
          onProfileLoaded(serverResult.profile);
          playEmeraldSound();
          setSuccessMsg(serverResult.message || '注册成功！全量数据已中转保存至 Firestore 云端数据库。');
          setTimeout(() => onClose(), 1200);
          return;
        } else if (serverResult.message) {
          setErrorMsg(serverResult.message);
          return;
        }
      }

      // 2. Client SDK Deduplication & Registration Fallback
      const dupCheck = await checkUserExistsInFirestore(targetEmail, nickname);
      if (dupCheck.exists) {
        if (dupCheck.reason === 'email') {
          setErrorMsg('该邮箱/用户名已被注册！请切换至【登录账号】或【修改密码】。');
        } else {
          setErrorMsg('该玩家昵称已被占用！请使用一个独特独一无二的昵称。');
        }
        return;
      }

      let uid = 'mc-user-' + Date.now();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, targetEmail, password);
        uid = userCredential.user.uid;
      } catch (authErr: any) {
        console.warn('Firebase Auth native registration unavailable:', authErr);
      }

      const newProfile: UserProfile = {
        ...currentProfile,
        id: uid,
        email: targetEmail,
        nickname: nickname.trim(),
        isInitialSetupDone: true
      };

      await saveUserProfileToCloud(newProfile, uid, password);
      localStorage.setItem('mc_account_' + targetEmail, JSON.stringify({ profile: newProfile, password }));
      
      onProfileLoaded(newProfile);
      playEmeraldSound();
      setSuccessMsg('注册成功！云端 Firestore 数据库探险家档案已建立！');
      setTimeout(() => onClose(), 1200);

    } catch (err: any) {
      console.error('Register error:', err);
      setErrorMsg('注册失败：' + (err.message || '网络连接超时'));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('请输入账号与新密码！');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('新密码长度不能少于 6 位！');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('两次输入的新密码不一致！');
      return;
    }

    const targetEmail = formatEmailInput(email);

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const result = await updateUserPassword(targetEmail, password, oldPassword);
      if (result.success) {
        // Update local backup if existing
        const localAccountStr = localStorage.getItem('mc_account_' + targetEmail);
        if (localAccountStr) {
          try {
            const localAcc = JSON.parse(localAccountStr);
            localAcc.password = password;
            localStorage.setItem('mc_account_' + targetEmail, JSON.stringify(localAcc));
          } catch (e) {}
        }

        playLevelUpSound();
        setSuccessMsg(result.message);
        setTimeout(() => {
          setMode('login');
          setSuccessMsg('');
        }, 1500);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg('修改密码失败：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    playClickSound();
    setLoading(true);
    try {
      await signOut(auth);
      setSuccessMsg('已成功退出登录！');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      setErrorMsg('退出失败：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#1f2937] border-4 border-[#355E20] rounded-3xl w-full max-w-md text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden my-auto p-5 sm:p-6 relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-xl font-mono text-base font-black border-2 border-white/20 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center space-x-3 border-b-2 border-white/10 pb-4 mb-4">
          <div className="w-12 h-12 bg-[#487E2C] border-3 border-black rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0">
            ❇️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-black uppercase text-[#7CFC00] bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                Minecraft English 会员中心
              </span>
            </div>
            <h3 className="text-xl font-mono font-black text-white mt-0.5">
              {currentUser ? '云端会员档案' : mode === 'login' ? '玩家账号登录' : mode === 'register' ? '注册新探险家账号' : '修改/重置账号密码'}
            </h3>
          </div>
        </div>

        {/* Member Privileges Notice Banner */}
        {!currentUser && (
          <div className="mb-4 p-3 bg-slate-900/90 rounded-2xl border-2 border-emerald-500/40 text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold font-mono border-b border-slate-800 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>正规会员体系与权益说明</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Firestore去重保障
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-1">
                <div className="text-emerald-300 font-extrabold flex items-center gap-1">
                  <span>🎁 普通注册会员</span>
                  <span className="text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-black">免费体验</span>
                </div>
                <p className="text-slate-300 leading-tight">
                  • <strong className="text-amber-300">免费体验 1 ~ 10 课</strong>全量关卡内容<br />
                  • 涵盖 Alex AI 语音交互与听说评测<br />
                  • 云端自动无缝同步进度与单词本
                </p>
              </div>

              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-1">
                <div className="text-amber-300 font-extrabold flex items-center gap-1">
                  <span>💎 VIP 尊享会员</span>
                  <span className="text-[9px] bg-amber-400 text-slate-950 px-1 rounded font-black">全量通关</span>
                </div>
                <p className="text-slate-300 leading-tight">
                  • 解锁 <strong className="text-amber-300">第 11 ~ 144 全套课程</strong><br />
                  • 解锁 2册红石篇与 3册末地篇课程矩阵<br />
                  • 激活码随时兑换，终身无损保存
                </p>
              </div>
            </div>
          </div>
        )}

        {/* If user is already logged in */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="bg-emerald-950/60 border-2 border-emerald-400/50 rounded-2xl p-4 text-xs font-mono space-y-2">
              <div className="flex items-center space-x-2 text-emerald-300 font-black text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>已连接 Firebase 云端数据库</span>
              </div>
              <p className="text-slate-200">
                当前登录邮箱/账号：<span className="text-amber-300 font-bold">{currentUser.email || currentProfile.email}</span>
              </p>
              <p className="text-slate-200">
                玩家昵称：<span className="text-emerald-300 font-bold">{currentProfile.nickname}</span> (Lv.{currentProfile.level})
              </p>
              <p className="text-slate-400 text-[11px] pt-1 border-t border-emerald-800/50">
                ⚡ 你的绿宝石、词汇库、通关进度已在 Firebase Firestore 进行秒级实时同步！
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode('change_password');
                  setEmail(currentUser.email || currentProfile.email || '');
                }}
                className="bg-slate-800 hover:bg-slate-700 border-2 border-black py-2.5 rounded-2xl font-mono text-xs font-bold text-amber-300 flex items-center justify-center space-x-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>修改当前密码</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="bg-rose-700 hover:bg-rose-600 border-2 border-black py-2.5 rounded-2xl font-mono text-xs font-black text-white flex items-center justify-center space-x-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Login / Register / Change Password Toggle Tabs */}
            <div className="grid grid-cols-3 gap-1.5 mb-4 bg-black/40 p-1 rounded-2xl border border-white/10 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 rounded-xl font-mono font-black flex items-center justify-center space-x-1 transition-colors ${
                  mode === 'login'
                    ? 'bg-[#487E2C] text-white border-2 border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>登录账号</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 rounded-xl font-mono font-black flex items-center justify-center space-x-1 transition-colors ${
                  mode === 'register'
                    ? 'bg-[#487E2C] text-white border-2 border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>注册账号</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode('change_password');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 rounded-xl font-mono font-black flex items-center justify-center space-x-1 transition-colors ${
                  mode === 'change_password'
                    ? 'bg-[#487E2C] text-white border-2 border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>修改密码</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleChangePassword} className="space-y-3">
              
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-black text-amber-300 flex items-center space-x-1">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>玩家昵称 (Nickname - 全局唯一去重):</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder="例如: Steve_Builder"
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#487E2C] focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-black text-amber-300 flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>电子邮箱 / 用户名:</span>
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com 或纯用户名"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#487E2C] focus:outline-none"
                />
              </div>

              {mode === 'change_password' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-black text-amber-300 flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>原密码 (如有，可选):</span>
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="不填写则进行安全直接重置"
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#487E2C] focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-black text-amber-300 flex items-center space-x-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{mode === 'change_password' ? '新密码 (New Password):' : '密码 (Password):'}</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="至少 6 位密码"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#487E2C] focus:outline-none"
                />
              </div>

              {(mode === 'register' || mode === 'change_password') && (
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-black text-amber-300 flex items-center space-x-1">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>确认密码:</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="再次输入相同密码"
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#487E2C] focus:outline-none"
                  />
                </div>
              )}

              {/* Status alerts */}
              {errorMsg && (
                <div className="bg-rose-950/80 border-2 border-rose-500 text-rose-200 p-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 p-2.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#487E2C] hover:bg-[#3d6e23] border-2 border-black text-white py-3 rounded-2xl font-mono text-xs font-black flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#224013] active:translate-y-0.5 mt-2"
              >
                {loading ? (
                  <span className="animate-pulse">正在同步 Firestore 数据库...</span>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 text-[#7CFC00]" />
                    <span>
                      {mode === 'login' 
                        ? '立即登录并同步档案' 
                        : mode === 'register' 
                          ? '去重校验并完成注册' 
                          : '确认修改数据库密码'}
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-400 font-mono">
                {mode === 'register' 
                  ? '系统在注册时会自动在 Firestore 数据库进行邮箱及昵称去重校验。'
                  : mode === 'change_password'
                    ? '密码修改后将立即同步更新至 Firestore 数据库及本地存储。'
                    : '登录后您的学习成就、绿宝石及单词本将永久保存在 Firestore 云端数据库。'}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

