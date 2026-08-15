import React, { useState } from 'react';
import { UserProfile, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { ShieldCheck, Unlock, Zap, Database, Terminal, RefreshCw, Key, Award, Check, AlertTriangle, Eye, Volume2, X, Download, Upload, Copy, FileText } from 'lucide-react';
import { playClickSound, playEmeraldSound, playLevelUpSound, speakText } from '../utils/audio';
import { fetchAllUsersFromFirestore, fetchActivationCodesFromFirestore, saveActivationCodeToFirestore } from '../lib/firebase';

interface AdminDashboardModalProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  profile,
  onUpdateProfile,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminAccountInput, setAdminAccountInput] = useState<string>('');
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [selectedLessonInspect, setSelectedLessonInspect] = useState<Lesson>(LESSONS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'codes' | 'users' | 'quick' | 'raw' | 'lessons'>('codes');

  // Registered users state
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<string>('');
  const [selectedUserDetail, setSelectedUserDetail] = useState<any | null>(null);
  const [fetchStatusMsg, setFetchStatusMsg] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<{ neonConnected: boolean; databaseUrlConfigured: boolean }>({ neonConnected: false, databaseUrlConfigured: false });

  // Activation Codes Management State
  const [activationCodes, setActivationCodes] = useState<any[]>([]);
  const [isLoadingCodes, setIsLoadingCodes] = useState<boolean>(false);
  const [batchCount, setBatchCount] = useState<number>(10);
  const [batchPrefix, setBatchPrefix] = useState<string>('MC144');
  const [batchTargetVolume, setBatchTargetVolume] = useState<string>('all');
  const [codeSearch, setCodeSearch] = useState<string>('');
  const [codeFilter, setCodeFilter] = useState<'all' | 'unused' | 'used'>('all');
  const [codeMsg, setCodeMsg] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importInputText, setImportInputText] = useState<string>('');
  const [confirmDialog, setConfirmDialog] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const fetchActivationCodes = async () => {
    setIsLoadingCodes(true);
    try {
      const codeMap = new Map<string, any>();

      // 1. Load from Local Storage Backup first
      try {
        const localBackup = localStorage.getItem('mc_activation_codes_backup');
        if (localBackup) {
          const parsed = JSON.parse(localBackup);
          if (Array.isArray(parsed)) {
            parsed.forEach((c: any) => {
              if (c && c.code) {
                codeMap.set(c.code.trim().toUpperCase(), c);
              }
            });
          }
        }
      } catch (e) {
        console.warn("Local codes backup parse warning:", e);
      }

      // 2. Load from Express Backend API (Neon Postgres)
      try {
        const resp = await fetch('/api/admin/codes');
        if (resp.ok) {
          const data = await resp.json();
          if (data.success && Array.isArray(data.codes)) {
            data.codes.forEach((c: any) => {
              if (c && c.code) {
                codeMap.set(c.code.trim().toUpperCase(), c);
              }
            });
          }
        }
      } catch (e) {
        console.warn("Fetch backend codes warning:", e);
      }

      // 3. Load from Cloud Firestore
      try {
        const firestoreList = await fetchActivationCodesFromFirestore();
        if (Array.isArray(firestoreList)) {
          firestoreList.forEach((c: any) => {
            if (c && c.code) {
              const clean = c.code.trim().toUpperCase();
              const existing = codeMap.get(clean);
              codeMap.set(clean, {
                ...(existing || {}),
                ...c
              });
            }
          });
        }
      } catch (e) {
        console.warn("Fetch firestore codes warning:", e);
      }

      const mergedList = Array.from(codeMap.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setActivationCodes(mergedList);

      // Save updated merged backup to LocalStorage
      try {
        localStorage.setItem('mc_activation_codes_backup', JSON.stringify(mergedList));
      } catch {}

      // Auto sync any local-only codes back to server
      if (mergedList.length > 0) {
        fetch('/api/admin/sync-codes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codes: mergedList })
        }).catch(() => {});
      }

    } catch (e) {
      console.warn("Fetch codes warning:", e);
    } finally {
      setIsLoadingCodes(false);
    }
  };

  const handleImportRawCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importInputText.trim()) {
      alert('请先输入或粘贴激活码内容！');
      return;
    }

    try {
      const lines = importInputText
        .split(/[\n,;]+/)
        .map(s => s.trim().toUpperCase().replace(/\s+/g, ''))
        .filter(s => s.length >= 5);

      if (lines.length === 0) {
        alert('未识别到有效的激活码字符串');
        return;
      }

      const newItems: any[] = lines.map(c => ({
        code: c,
        isUsed: false,
        usedByAccount: '',
        usedAt: 0,
        devices: [],
        maxDevices: 3,
        createdAt: Date.now()
      }));

      // Sync to Server
      const resp = await fetch('/api/admin/sync-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: newItems })
      });
      const data = await resp.json();

      // Sync to Firestore
      for (const item of newItems) {
        saveActivationCodeToFirestore(item).catch(() => {});
      }

      playLevelUpSound();
      setShowImportModal(false);
      setImportInputText('');
      setCodeMsg(data.message || `成功导入并恢复 ${newItems.length} 个激活码！`);
      await fetchActivationCodes();
    } catch (err) {
      alert('导入失败，请检查网络或格式');
    }
  };

  const handleExportCodesTxt = () => {
    if (activationCodes.length === 0) {
      alert('当前暂无激活码数据');
      return;
    }
    const txtContent = activationCodes
      .map(c => `${c.code}\t[${c.isUsed ? `已激活: ${c.usedByAccount}` : '未使用待发货'}]\t分册: ${c.targetVolume === 'vol1' ? '册1' : c.targetVolume === 'vol2' ? '册2' : c.targetVolume === 'vol3' ? '册3' : c.targetVolume === 'vol4' ? '册4' : '全套'}\t设备: ${c.devices?.length || 0}/${c.maxDevices || 3}`)
      .join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minecraft_vip_codes_export_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    playEmeraldSound();
  };

  const handleGenerateBatchCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingCodes(true);
    setCodeMsg(null);
    try {
      const resp = await fetch('/api/admin/generate-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: batchCount,
          prefix: batchPrefix.trim().toUpperCase() || 'MC144',
          maxDevices: 3,
          targetVolume: batchTargetVolume
        })
      });
      const data = await resp.json();
      if (data.success) {
        playLevelUpSound();
        setCodeMsg(data.message || `成功生成 ${data.codes?.length} 个激活码！`);
        // Save to Firestore as well
        if (Array.isArray(data.codes)) {
          data.codes.forEach((c: string) => {
            saveActivationCodeToFirestore({
              code: c,
              isUsed: false,
              usedByAccount: '',
              usedAt: 0,
              devices: [],
              maxDevices: 3,
              createdAt: Date.now()
            }).catch(() => {});
          });
        }
        await fetchActivationCodes();
      } else {
        alert(data.error || '生成卡密失败');
      }
    } catch (err) {
      alert('连接服务端异常，请稍后重试');
    } finally {
      setIsLoadingCodes(false);
    }
  };

  const handleCopyUnusedCodes = () => {
    const unusedList = activationCodes.filter(c => !c.isUsed).map(c => c.code);
    if (unusedList.length === 0) {
      alert('当前没有【未使用】的卡密可供复制！请先批量生成。');
      return;
    }
    const textToCopy = unusedList.join('\n');
    navigator.clipboard.writeText(textToCopy);
    playEmeraldSound();
    setCodeMsg(`📋 已复制 ${unusedList.length} 张未使用卡密到剪贴板！可直接粘贴到小红书发货工具`);
    setTimeout(() => setCodeMsg(null), 4000);
  };

  const handleClearAllCodes = () => {
    setConfirmDialog({
      message: '🚨 危险操作！确定要彻底删除云端数据库中所有的激活码吗？此操作不可逆转！',
      onConfirm: async () => {
        try {
          const resp = await fetch('/api/admin/clear-codes', { method: 'POST' });
          const data = await resp.json();
          if (data.success) {
            localStorage.removeItem('mc_activation_codes_backup');
            playEmeraldSound();
            setCodeMsg(data.message);
            await fetchActivationCodes();
            setTimeout(() => setCodeMsg(null), 3000);
          } else {
            setCodeMsg(`❌ ${data.error || '操作失败'}`);
            setTimeout(() => setCodeMsg(null), 3000);
          }
        } catch {
          setCodeMsg(`❌ 处理异常，请稍后重试`);
          setTimeout(() => setCodeMsg(null), 3000);
        }
      }
    });
  };

  const handleRevokeCode = async (code: string, action: 'unbind' | 'reset') => {
    const confirmMsg = action === 'unbind' 
      ? `确定要清空激活码 (${code}) 绑定的所有设备列表吗？` 
      : `确定重置激活码 (${code}) 为全新未使用状态吗？`;
    
    setConfirmDialog({
      message: confirmMsg,
      onConfirm: async () => {
        try {
          const resp = await fetch('/api/admin/revoke-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, action })
          });
          const data = await resp.json();
          if (data.success) {
            playEmeraldSound();
            setCodeMsg(data.message);
            await fetchActivationCodes();
            setTimeout(() => setCodeMsg(null), 3000);
          } else {
            setCodeMsg(`❌ ${data.error || '操作失败'}`);
            setTimeout(() => setCodeMsg(null), 3000);
          }
        } catch {
          setCodeMsg(`❌ 处理异常，请稍后重试`);
          setTimeout(() => setCodeMsg(null), 3000);
        }
      }
    });
  };

  const fetchRegisteredUsers = async () => {
    setIsLoadingUsers(true);
    setFetchStatusMsg(null);
    try {
      let combinedMap = new Map<string, any>();

      // 1. Fetch from Express Server Admin API (Neon PostgreSQL)
      try {
        const resp = await fetch('/api/admin/users');
        if (resp.ok) {
          const data = await resp.json();
          if (data.success && Array.isArray(data.users)) {
            setDbStatus({
              neonConnected: Boolean(data.neonConnected),
              databaseUrlConfigured: Boolean(data.databaseUrlConfigured)
            });
            data.users.forEach((u: any) => {
              if (u.account) {
                combinedMap.set(u.account.toLowerCase(), u);
              }
            });
          }
        }
      } catch (e) {
        console.warn("Server API admin query warning:", e);
      }

      // 2. Fallback: Include local active profile if not yet in backend array
      try {
        const localProfileRaw = localStorage.getItem('mc_english_user_profile');
        if (localProfileRaw) {
          const lp = JSON.parse(localProfileRaw);
          const acc = (lp.account || lp.nickname || '').toLowerCase();
          if (acc && !combinedMap.has(acc)) {
            combinedMap.set(acc, {
              uid: lp.id || 'local_user',
              account: lp.account || lp.nickname || '当前用户',
              nickname: lp.nickname || '玩家学员',
              createdAt: Date.now(),
              updatedAt: Date.now(),
              level: lp.level || 1,
              emeralds: lp.emeralds || 0,
              xp: lp.xp || 0,
              streakDays: lp.streakDays || 1,
              lastActiveDate: lp.lastActiveDate || '',
              unlockedLessonsCount: lp.unlockedLessonIds?.length || 0,
              profile: lp
            });
          }
        }
      } catch (e) {
        console.warn("Local profile merge warning:", e);
      }

      const list = Array.from(combinedMap.values());
      setRegisteredUsers(list);
      setFetchStatusMsg(`已成功刷新：共查询到 ${list.length} 个学员记录！`);
      setTimeout(() => setFetchStatusMsg(null), 3000);
    } catch (err) {
      console.error("Failed to fetch admin users:", err);
      setFetchStatusMsg('载入失败，请检查网络或重试');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchActivationCodes();
      if (activeTab === 'users') {
        fetchRegisteredUsers();
      }
    }
  }, [isAuthenticated, activeTab]);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `minecraft_english_ai_progress_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminAccountInput.trim() || !adminPasswordInput.trim()) {
      setLoginError('请输入管理员账号与登录密码！');
      return;
    }

    setIsVerifying(true);
    setLoginError(null);

    try {
      const resp = await fetch('/api/admin/verify-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: adminAccountInput.trim(),
          password: adminPasswordInput.trim()
        })
      });

      const data = await resp.json();
      if (data.success) {
        playLevelUpSound();
        setIsAuthenticated(true);
        setLoginError(null);
      } else {
        setLoginError(data.error || '管理员账号或密码错误！非管理员禁止访问。');
      }
    } catch {
      setLoginError('连接后端验证服务失败，请检查网络后重试。');
    } finally {
      setIsVerifying(false);
    }
  };

  // 1-Click Unlock All 144 Lessons & VIP
  const handleUnlockAllLessons = () => {
    playLevelUpSound();
    playEmeraldSound();
    const allVol1Ids = Array.from({ length: 144 }, (_, i) => i + 1);
    const allVol2Ids = Array.from({ length: 96 }, (_, i) => i + 1);
    const allVol3Ids = Array.from({ length: 60 }, (_, i) => i + 1);
    const allVol4Ids = Array.from({ length: 48 }, (_, i) => i + 1);

    onUpdateProfile(prev => {
      const updated = {
        ...prev,
        isVip: true,
        vipActivatedAt: Date.now(),
        activatedVolumes: ['vol1', 'vol2', 'vol3', 'vol4', 'all'],
        unlockedLessonIds: allVol1Ids,
        completedLessonIds: allVol1Ids.slice(0, 20),
        level: Math.max(prev.level, 10),
        emeralds: prev.emeralds + 500,
        volumeProgress: {
          vol1: { currentLessonId: 1, unlockedLessonIds: allVol1Ids, completedLessonIds: allVol1Ids.slice(0, 20) },
          vol2: { currentLessonId: 1, unlockedLessonIds: allVol2Ids, completedLessonIds: [] },
          vol3: { currentLessonId: 1, unlockedLessonIds: allVol3Ids, completedLessonIds: [] },
          vol4: { currentLessonId: 1, unlockedLessonIds: allVol4Ids, completedLessonIds: [] }
        }
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(updated));
      }
      return updated;
    });
    playEmeraldSound();
    setCodeMsg('⚡ 开发者命令已执行：成功开通全套 VIP 并解锁全系 1~4 册全部关卡！');
    setTimeout(() => setCodeMsg(null), 4000);
  };

  // Add 1000 Emeralds and 5000 XP
  const handleAddResources = () => {
    playEmeraldSound();
    onUpdateProfile(prev => ({
      ...prev,
      emeralds: prev.emeralds + 1000,
      xp: prev.xp + 5000,
      level: Math.min(prev.level + 2, 50)
    }));
  };

  // Adjust User Level
  const handleSetLevel = (targetLevel: number) => {
    playClickSound();
    onUpdateProfile(prev => ({
      ...prev,
      level: targetLevel
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    setConfirmDialog({
      message: '⚠️ 警告：确定要重置当前账号的所有关卡进度和绿宝石吗？',
      onConfirm: () => {
        onUpdateProfile(prev => ({
          ...prev,
          level: 1,
          xp: 0,
          emeralds: 100,
          unlockedLessonIds: [1],
          completedLessonIds: [],
          isVip: false,
          vipActivatedAt: 0,
          activatedVolumes: [],
          volumeProgress: {
            vol1: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
            vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
          }
        }));
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      {/* Custom Confirm Dialog Overlay */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
            <p className="text-sm text-slate-200 mb-6 font-mono leading-relaxed">{confirmDialog.message}</p>
            <div className="flex w-full space-x-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 font-bold transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setConfirmDialog(null);
                  confirmDialog.onConfirm();
                }}
                className="flex-1 py-2.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-500 shadow-md transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#18181B] border-2 sm:border-4 border-amber-500 rounded-2xl sm:rounded-[2rem] w-full max-w-4xl text-amber-50 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col font-mono">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-black p-4 sm:p-5 border-b-2 border-amber-600/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 border-2 border-amber-500 rounded-xl flex items-center justify-center text-2xl shrink-0">
              👑
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-amber-400 flex items-center space-x-2">
                <span>后台开发者管理控制台</span>
                <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-bold uppercase">
                  Admin Console
                </span>
              </h2>
              <p className="text-xs text-amber-200/70 font-medium mt-0.5">
                独立开发者管理入口 • 全服级别诊断与数据热重载
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white text-xs bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-xl border border-stone-600 transition-all flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>退出</span>
          </button>
        </div>

        {/* Gatekeeper Check */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-5 my-auto">
            <div className="w-16 h-16 bg-amber-900/40 border-2 border-amber-500/60 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🛡️
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-black text-amber-400">
                系统后台超级管理员安全鉴权
              </h3>
              <p className="text-xs text-stone-300">
                后台已启用双因子身份核验，必须同时输入正确的<strong>管理员专属账号</strong>与<strong>独立管理密码</strong>：
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="w-full max-w-sm space-y-3 text-left">
              <div>
                <label className="text-[11px] font-bold text-amber-300/90 block mb-1">
                  管理员账号 (Admin Account)
                </label>
                <input
                  type="text"
                  value={adminAccountInput}
                  onChange={e => setAdminAccountInput(e.target.value)}
                  placeholder="例如: admin / deantang"
                  autoComplete="username"
                  required
                  className="w-full bg-stone-950 border-2 border-stone-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white font-medium outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-amber-300/90 block mb-1">
                  管理超级密码 (Password)
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={e => setAdminPasswordInput(e.target.value)}
                  placeholder="请输入管理安全密码"
                  autoComplete="current-password"
                  required
                  className="w-full bg-stone-950 border-2 border-stone-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white font-medium tracking-wider outline-none transition-colors"
                />
              </div>

              {loginError && (
                <div className="text-xs text-rose-400 font-bold bg-rose-950/60 p-2.5 rounded-lg border border-rose-800 flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md mt-2 disabled:opacity-50"
              >
                {isVerifying ? '正在核验证据库鉴权...' : '🔐 验证管理员身份并登录'}
              </button>
            </form>

            <div className="text-[11px] text-stone-500 pt-2 flex items-center justify-center space-x-1">
              <span>🛡️ 仅授权管理员账号可访问 • Neon PostgreSQL 独立鉴权</span>
            </div>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Sub-Nav */}
            <div className="bg-stone-900 p-2 border-b border-stone-800 flex gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('codes')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'codes'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>🔑 小红书卡密管理 ({activationCodes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'users'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>👥 全服注册用户数据 ({registeredUsers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('quick')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'quick'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>快捷操作与控制</span>
              </button>

              <button
                onClick={() => setActiveTab('raw')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'raw'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>当前账号 JSON 检视</span>
              </button>

              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'lessons'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>144 课数据热查器</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* TAB: ACTIVATION CODES MANAGEMENT */}
              {activeTab === 'codes' && (
                <div className="space-y-4">
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">数据库卡密总数</div>
                      <div className="text-xl font-black text-amber-400 mt-1">{activationCodes.length} 张</div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">未使用 (待发货)</div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        {activationCodes.filter(c => !c.isUsed).length} 张
                      </div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">已激活使用</div>
                      <div className="text-xl font-black text-orange-400 mt-1">
                        {activationCodes.filter(c => c.isUsed).length} 张
                      </div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">持久化引擎</div>
                      <div className="text-xs font-bold text-amber-300 mt-1 flex flex-wrap gap-1 items-center">
                        <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">🐘 Neon PostgreSQL</span>
                      </div>
                    </div>
                  </div>

                  {/* Batch Code Generator Box & Toolbar */}
                  <div className="bg-stone-900 border-2 border-amber-500/60 p-4 rounded-2xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between border-b border-stone-800 pb-2.5 gap-2">
                      <h3 className="text-sm font-black text-amber-400 flex items-center space-x-2">
                        <Key className="w-4 h-4 text-amber-400" />
                        <span>小红书专属 VIP 激活码生成与全库检索</span>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={fetchActivationCodes}
                          disabled={isLoadingCodes}
                          className="bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-amber-300 border border-stone-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCodes ? 'animate-spin' : ''}`} />
                          <span>{isLoadingCodes ? '正在查询云端库...' : '🔄 强制拉取数据库'}</span>
                        </button>
                        <button
                          onClick={() => setShowImportModal(true)}
                          className="bg-blue-900 hover:bg-blue-800 text-blue-200 border border-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>📥 导入/找回历史卡密</span>
                        </button>
                        <button
                          onClick={handleExportCodesTxt}
                          className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>📤 导出卡密列表</span>
                        </button>
                        <button
                          onClick={handleCopyUnusedCodes}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>📋 一键复制全部未使用卡密</span>
                        </button>
                        <button
                          onClick={handleClearAllCodes}
                          className="bg-red-900 hover:bg-red-800 text-red-200 border border-red-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>🔥 清空全部库卡密</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleGenerateBatchCodes} className="flex flex-wrap items-center gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] text-stone-400 font-bold mb-1">生成数量</label>
                        <select
                          value={batchCount}
                          onChange={e => setBatchCount(Number(e.target.value))}
                          className="bg-stone-950 border border-stone-700 text-xs text-amber-300 px-3 py-1.5 rounded-xl outline-none"
                        >
                          <option value={10}>生成 10 张</option>
                          <option value={20}>生成 20 张</option>
                          <option value={50}>生成 50 张</option>
                          <option value={100}>生成 100 张</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 font-bold mb-1">前缀标识</label>
                        <input
                          type="text"
                          value={batchPrefix}
                          onChange={e => setBatchPrefix(e.target.value)}
                          placeholder="例如: MC144"
                          className="bg-stone-950 border border-stone-700 text-xs text-amber-300 px-3 py-1.5 rounded-xl outline-none w-28 uppercase font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-400 font-bold mb-1">分册授权</label>
                        <select
                          value={batchTargetVolume}
                          onChange={e => setBatchTargetVolume(e.target.value)}
                          className="bg-stone-950 border border-stone-700 text-xs text-amber-300 px-3 py-1.5 rounded-xl outline-none"
                        >
                          <option value="all">全套四册</option>
                          <option value="vol1">仅第一册</option>
                          <option value="vol2">仅第二册</option>
                          <option value="vol3">仅第三册</option>
                          <option value="vol4">仅第四册</option>
                        </select>
                      </div>

                      <div className="pt-5">
                        <button
                          type="submit"
                          disabled={isLoadingCodes}
                          className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
                        >
                          {isLoadingCodes ? '正在生成中...' : '⚡ 立即批量生成并持久化存库'}
                        </button>
                      </div>
                    </form>

                    {codeMsg && (
                      <div className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-600 p-2.5 rounded-xl animate-fade-in">
                        {codeMsg}
                      </div>
                    )}
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between bg-stone-900 border border-stone-800 p-3 rounded-xl">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => setCodeFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${codeFilter === 'all' ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-300'}`}
                      >
                        全部 ({activationCodes.length})
                      </button>
                      <button
                        onClick={() => setCodeFilter('unused')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${codeFilter === 'unused' ? 'bg-emerald-500 text-black' : 'bg-stone-800 text-stone-300'}`}
                      >
                        未使用 ({activationCodes.filter(c => !c.isUsed).length})
                      </button>
                      <button
                        onClick={() => setCodeFilter('used')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${codeFilter === 'used' ? 'bg-orange-500 text-black' : 'bg-stone-800 text-stone-300'}`}
                      >
                        已激活 ({activationCodes.filter(c => c.isUsed).length})
                      </button>
                    </div>

                    <div className="w-full sm:w-64">
                      <input
                        type="text"
                        value={codeSearch}
                        onChange={e => setCodeSearch(e.target.value)}
                        placeholder="🔍 搜索卡密或绑定账号..."
                        className="w-full bg-stone-950 border border-stone-700 text-xs text-amber-200 px-3 py-1.5 rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  {/* Codes Table */}
                  <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-950 text-amber-400 border-b border-stone-800 font-bold sticky top-0 z-10">
                          <tr>
                            <th className="p-3">激活码 (Code)</th>
                            <th className="p-3">状态</th>
                            <th className="p-3">授权分册</th>
                            <th className="p-3">已激活绑定账号</th>
                            <th className="p-3">绑定设备</th>
                            <th className="p-3">生成时间</th>
                            <th className="p-3 text-right">管理操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800 text-stone-300 font-mono">
                          {activationCodes
                            .filter(c => {
                              if (codeFilter === 'unused') return !c.isUsed;
                              if (codeFilter === 'used') return c.isUsed;
                              return true;
                            })
                            .filter(c => 
                              !codeSearch || 
                              c.code?.toLowerCase().includes(codeSearch.toLowerCase()) || 
                              c.usedByAccount?.toLowerCase().includes(codeSearch.toLowerCase())
                            )
                            .map((c, idx) => (
                              <tr key={c.code || idx} className="hover:bg-stone-800/50 transition-colors">
                                <td className="p-3 font-bold text-amber-300 select-all">
                                  <div className="flex items-center space-x-2">
                                    <span>{c.code}</span>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(c.code);
                                        playClickSound();
                                        setCodeMsg(`📋 已复制卡密: ${c.code}`);
                                        setTimeout(() => setCodeMsg(null), 2500);
                                      }}
                                      title="复制卡密"
                                      className="text-stone-500 hover:text-amber-300 p-1"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3">
                                  {c.isUsed ? (
                                    <span className="bg-orange-950 text-orange-400 border border-orange-800 px-2 py-0.5 rounded font-bold">
                                      已激活
                                    </span>
                                  ) : (
                                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                                      未使用
                                    </span>
                                  )}
                                </td>
                                <td className="p-3">
                                  <span className="bg-blue-950/60 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded text-[10px] uppercase">
                                    {c.targetVolume === 'vol1' ? '册1' : c.targetVolume === 'vol2' ? '册2' : c.targetVolume === 'vol3' ? '册3' : c.targetVolume === 'vol4' ? '册4' : '全套'}
                                  </span>
                                </td>
                                <td className="p-3 font-bold text-stone-200">{c.usedByAccount || '—'}</td>
                                <td className="p-3 text-blue-400 font-bold">
                                  {c.devices?.length || 0} / {c.maxDevices || 3} 台
                                </td>
                                <td className="p-3 text-stone-400 text-[11px]">
                                  {c.createdAt ? new Date(c.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '刚刚'}
                                </td>
                                <td className="p-3 text-right space-x-1">
                                  {c.isUsed && (
                                    <button
                                      onClick={() => handleRevokeCode(c.code, 'unbind')}
                                      className="bg-blue-900/60 hover:bg-blue-800 text-blue-200 px-2 py-1 rounded text-[11px] font-bold"
                                    >
                                      解绑设备
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleRevokeCode(c.code, 'reset')}
                                    className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 px-2 py-1 rounded text-[11px] font-bold"
                                  >
                                    重置
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {activationCodes.length === 0 && (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-stone-400 space-y-2">
                                <div className="text-sm font-bold text-amber-400">数据库卡密列表为空或暂未加载</div>
                                <div className="text-xs text-stone-500">
                                  您可以点击上方【🔄 强制拉取数据库】重新读取，或点击【📥 导入/找回历史卡密】恢复历史卡密，或点击【⚡ 立即批量生成】。
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Import Modal */}
                  {showImportModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-stone-900 border-2 border-amber-500/80 rounded-2xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                          <h3 className="text-sm font-black text-amber-400 flex items-center space-x-2">
                            <Upload className="w-4 h-4 text-amber-400" />
                            <span>批量导入 / 找回已生成的激活码</span>
                          </h3>
                          <button
                            onClick={() => setShowImportModal(false)}
                            className="text-stone-400 hover:text-white p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleImportRawCodes} className="space-y-3">
                          <p className="text-xs text-stone-300">
                            将您先前保存的激活码文本粘贴在下方（支持每行一个，或逗号/分号分隔），系统会自动去重并实时写入 Neon 数据库与 Firestore 云端：
                          </p>
                          <textarea
                            value={importInputText}
                            onChange={e => setImportInputText(e.target.value)}
                            placeholder="例如：&#10;MC144-A1B2-C3D4-E5F6&#10;MC144-9988-7766-5544&#10;VIP8888"
                            rows={6}
                            className="w-full bg-stone-950 border border-stone-700 focus:border-amber-400 rounded-xl p-3 text-xs text-amber-300 font-mono outline-none resize-none"
                          />
                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => setShowImportModal(false)}
                              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300"
                            >
                              取消
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-black text-black shadow-md"
                            >
                              🚀 立即导入存库
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: REGISTERED USERS DATA */}
              {activeTab === 'users' && (
                <div className="space-y-4">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">总注册账号数</div>
                      <div className="text-xl font-black text-amber-400 mt-1">{registeredUsers.length} 人</div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">最新注册账号</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1 truncate">
                        {registeredUsers[registeredUsers.length - 1]?.account || '暂无'}
                      </div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">全服累计绿宝石</div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        ❇️ {registeredUsers.reduce((acc, u) => acc + (u.emeralds || 0), 0)}
                      </div>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl">
                      <div className="text-[11px] text-stone-400">云端数据库引擎</div>
                      <div className="text-xs font-bold mt-1 flex items-center">
                        {dbStatus.neonConnected ? (
                          <span className="text-emerald-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1 inline-block" />
                            Neon 已连接 🐘
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-amber-500 mr-1 inline-block" />
                            未配置 DATABASE_URL
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!dbStatus.databaseUrlConfigured && (
                    <div className="bg-amber-950/80 border border-amber-600/60 p-3.5 rounded-xl text-xs text-amber-200 leading-relaxed space-y-1">
                      <div className="font-bold text-amber-400 flex items-center space-x-1">
                        <span>⚠️ 提示：服务端当前尚未配置 Neon 数据库连接（DATABASE_URL）</span>
                      </div>
                      <div>
                        由于环境变量中缺少 Neon 数据库连接串，当前注册数据仅储存在服务器<b>临时内存缓存</b>中。
                        要让数据真正写入 Neon 数据库，请在环境变量/Secrets设置中添加 <code className="bg-stone-900 px-1 py-0.5 rounded text-amber-300 font-mono">DATABASE_URL</code>（例：<code className="bg-stone-900 px-1 py-0.5 rounded text-amber-300 font-mono">postgres://user:pass@ep-xxx.neon.tech/neondb?sslmode=require</code>）。
                      </div>
                    </div>
                  )}

                  {/* Filter and Refresh */}
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between bg-stone-900 border border-stone-800 p-3 rounded-xl">
                    <div className="w-full sm:w-72">
                      <input
                        type="text"
                        value={userSearch}
                        onChange={e => setUserSearch(e.target.value)}
                        placeholder="🔍 搜索账号/昵称/ID..."
                        className="w-full bg-stone-950 border border-stone-700 focus:border-amber-500 text-xs text-amber-200 px-3 py-2 rounded-lg outline-none"
                      />
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                      {fetchStatusMsg && (
                        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg animate-fade-in">
                          {fetchStatusMsg}
                        </span>
                      )}
                      <button
                        onClick={fetchRegisteredUsers}
                        disabled={isLoadingUsers}
                        className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1 transition-all active:scale-95"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? 'animate-spin' : ''}`} />
                        <span>{isLoadingUsers ? '刷新中...' : '重新载入后端数据'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-950 text-amber-400 border-b border-stone-800 font-bold">
                          <tr>
                            <th className="p-3">账号 (Account)</th>
                            <th className="p-3">昵称</th>
                            <th className="p-3">等级</th>
                            <th className="p-3">绿宝石</th>
                            <th className="p-3">连签</th>
                            <th className="p-3">解锁课数</th>
                            <th className="p-3">注册时间</th>
                            <th className="p-3 text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800 text-stone-300 font-mono">
                          {registeredUsers
                            .filter(u => 
                              !userSearch || 
                              u.account?.toLowerCase().includes(userSearch.toLowerCase()) || 
                              u.nickname?.toLowerCase().includes(userSearch.toLowerCase()) ||
                              u.uid?.includes(userSearch)
                            )
                            .map((u, idx) => (
                              <tr key={u.uid || idx} className="hover:bg-stone-800/50 transition-colors">
                                <td className="p-3 font-bold text-amber-300">{u.account}</td>
                                <td className="p-3 font-semibold text-stone-200">{u.nickname}</td>
                                <td className="p-3 text-amber-400 font-bold">Lv.{u.level}</td>
                                <td className="p-3 text-emerald-400 font-bold">❇️ {u.emeralds}</td>
                                <td className="p-3 text-orange-400">🔥 {u.streakDays} 天</td>
                                <td className="p-3 text-blue-400">{u.unlockedLessonsCount} 课</td>
                                <td className="p-3 text-stone-400 text-[11px]">
                                  {u.createdAt ? new Date(u.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '更早以前'}
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => setSelectedUserDetail(u)}
                                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                                  >
                                    检视 Profile
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {registeredUsers.length === 0 && (
                            <tr>
                              <td colSpan={8} className="p-6 text-center text-stone-500">
                                暂无全服注册用户，或者正在连接后端数据中...
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* User Profile JSON Inspect Modal */}
                  {selectedUserDetail && (
                    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                      <div className="bg-stone-900 border-2 border-amber-500 rounded-2xl p-5 w-full max-w-xl text-amber-50 space-y-3 font-mono shadow-2xl">
                        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                          <h3 className="font-black text-amber-400 text-sm">
                            玩家账号详情: {selectedUserDetail.account} ({selectedUserDetail.nickname})
                          </h3>
                          <button
                            onClick={() => setSelectedUserDetail(null)}
                            className="text-stone-400 hover:text-white text-xs bg-stone-800 px-2 py-1 rounded"
                          >
                            ✕ 关闭
                          </button>
                        </div>
                        <pre className="bg-black/90 p-3 rounded-xl border border-stone-800 text-[11px] text-amber-300 overflow-x-auto max-h-[350px]">
                          {JSON.stringify(selectedUserDetail.profile || selectedUserDetail, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'quick' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Unlock All Lessons Card */}
                    <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                          <Unlock className="w-4 h-4" />
                          <span>一键通关/解锁 144 课</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">
                          快速解锁地图上全部 144 课目，便于测试任意关卡或大地图浏览。
                        </p>
                      </div>

                      <button
                        onClick={handleUnlockAllLessons}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-all"
                      >
                        ⚡ 一键解锁全系 144 课
                      </button>
                    </div>

                    {/* Resources Generator Card */}
                    <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                          <Award className="w-4 h-4" />
                          <span>无限资源注入器</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">
                          快速注入 +1000 绿宝石 & +5000 经验值，测试流浪商人宝库与高级防具。
                        </p>
                      </div>

                      <button
                        onClick={handleAddResources}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2 rounded-xl text-xs shadow-md transition-all"
                      >
                        ❇️ 增加 1000 绿宝石 + 5000 XP
                      </button>
                    </div>

                  </div>

                  {/* Level Setter */}
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-3">
                    <div className="text-amber-400 font-bold text-sm flex items-center justify-between">
                      <span>快捷修改玩家等级 (Current: Lv.{profile.level})</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[1, 5, 10, 20, 30, 50].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => handleSetLevel(lvl)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            profile.level === lvl
                              ? 'bg-amber-500 text-black'
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                          }`}
                        >
                          设置 Lv.{lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Data Backup */}
                  <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-emerald-400 font-bold text-xs flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>本地数据备份</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        导出当前学习进度 (progress.json) 用于备份
                      </div>
                    </div>

                    <button
                      onClick={handleExportData}
                      className="bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 font-bold px-3 py-1.5 rounded-xl text-xs shrink-0"
                    >
                      下载 JSON 备份
                    </button>
                  </div>

                  {/* Progress Reset Warning */}
                  <div className="bg-rose-950/40 border border-rose-900/60 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <div className="text-rose-400 font-bold text-xs flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>数据重置控制</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        恢复账号数据为刚注册的初始化状态
                      </div>
                    </div>

                    <button
                      onClick={handleResetProgress}
                      className="bg-rose-700 hover:bg-rose-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shrink-0"
                    >
                      重置到 1 级
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: RAW JSON INSPECTOR */}
              {activeTab === 'raw' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>当前实时 UserProfile JSON 状态快照:</span>
                    <span className="text-emerald-400">● Live Dynamic State</span>
                  </div>

                  <pre className="bg-black/90 border border-stone-800 p-4 rounded-2xl text-[11px] text-amber-300 overflow-x-auto max-h-[360px] leading-relaxed">
                    {JSON.stringify(profile, null, 2)}
                  </pre>
                </div>
              )}

              {/* TAB 3: LESSONS CATALOG */}
              {activeTab === 'lessons' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Selector */}
                  <div className="md:col-span-4 bg-stone-900 border border-stone-800 p-3 rounded-2xl max-h-[350px] overflow-y-auto space-y-1">
                    <div className="text-xs font-bold text-amber-400 mb-2 px-1">
                      选择课目查看数据 ({LESSONS_DATA.length} 课):
                    </div>
                    {LESSONS_DATA.slice(0, 30).map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLessonInspect(lesson)}
                        className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all ${
                          selectedLessonInspect.id === lesson.id
                            ? 'bg-amber-500 text-black'
                            : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        Lesson {lesson.id} • {lesson.title}
                      </button>
                    ))}
                  </div>

                  {/* Detailed Inspect */}
                  <div className="md:col-span-8 bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                      <div>
                        <h4 className="font-bold text-amber-400 text-sm">
                          Lesson {selectedLessonInspect.id}: {selectedLessonInspect.title}
                        </h4>
                        <div className="text-xs text-stone-400">
                          {selectedLessonInspect.titleZh}
                        </div>
                      </div>

                      <span className="text-[10px] bg-stone-800 text-amber-300 px-2 py-1 rounded">
                        场景: {selectedLessonInspect.minecraftScene}
                      </span>
                    </div>

                    {/* Vocab list */}
                    <div className="space-y-1">
                      <div className="text-xs text-stone-400 font-bold">核心单词:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedLessonInspect.vocabulary.map((v, idx) => (
                          <div key={idx} className="bg-stone-800/80 p-2 rounded-lg text-xs flex items-center justify-between">
                            <div>
                              <span className="text-amber-300 font-bold">{v.word}</span>
                              <span className="text-[10px] text-stone-400 block">{v.meaning}</span>
                            </div>
                            <button
                              onClick={() => speakText(v.word, { lang: 'en-US' })}
                              className="p-1 hover:bg-stone-700 rounded text-stone-300"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Status Bar */}
            <div className="bg-stone-900 p-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>全服调试控制台运行正常</span>
              </div>

              <div className="font-bold text-amber-400">
                Email: {profile.email || '未指定开发邮箱'}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
