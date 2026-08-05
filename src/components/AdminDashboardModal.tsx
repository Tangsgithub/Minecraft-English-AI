import React, { useState } from 'react';
import { UserProfile, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { ShieldCheck, Unlock, Zap, Database, Terminal, RefreshCw, Key, Award, Check, AlertTriangle, Eye, Volume2, X } from 'lucide-react';
import { playClickSound, playEmeraldSound, playLevelUpSound, speakText } from '../utils/audio';

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
  const DEVELOPER_EMAIL = 'deantang2014@gmail.com';
  const MASTER_PIN = '2026888';

  const isEmailDev = profile.email?.toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isEmailDev);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [selectedLessonInspect, setSelectedLessonInspect] = useState<Lesson>(LESSONS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'quick' | 'raw' | 'lessons'>('quick');

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === MASTER_PIN || pinInput.trim().toLowerCase() === 'admin') {
      playLevelUpSound();
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('安全口令错误！请重试或检查开发者密码。');
    }
  };

  // 1-Click Unlock All 144 Lessons
  const handleUnlockAllLessons = () => {
    playLevelUpSound();
    playEmeraldSound();
    const allIds = Array.from({ length: 144 }, (_, i) => i + 1);
    onUpdateProfile(prev => ({
      ...prev,
      unlockedLessonIds: allIds,
      completedLessonIds: allIds.slice(0, 50),
      level: Math.max(prev.level, 10),
      emeralds: prev.emeralds + 500
    }));
    alert('⚡ 开发者命令已执行：成功解锁全系 144 门课目关卡！');
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
    if (confirm('⚠️ 警告：确定要重置当前账号的所有关卡进度和绿宝石吗？')) {
      onUpdateProfile(prev => ({
        ...prev,
        level: 1,
        xp: 0,
        emeralds: 100,
        unlockedLessonIds: [1, 2],
        completedLessonIds: []
      }));
      alert('已恢复至初始 1 级状态。');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
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
              🔒
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-black text-amber-400">
                开发者身份安全门禁
              </h3>
              <p className="text-xs text-stone-300">
                该控制台仅面向全服系统开发者开放。如果是开发者，请输入安全口令验证：
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="w-full max-w-sm space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="请输入开发者口令 (PIN)"
                className="w-full bg-stone-900 border-2 border-stone-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-center text-sm text-white font-bold tracking-widest outline-none"
              />

              {pinError && (
                <div className="text-xs text-rose-400 font-bold bg-rose-950/60 p-2 rounded-lg border border-rose-800">
                  {pinError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
              >
                验证身份解锁后台
              </button>
            </form>

            <div className="text-[11px] text-stone-500 pt-2">
              Tips: 当前登录账号为 <span className="text-amber-300 font-bold">{profile.email || '未登录/游客'}</span>
            </div>
          </div>
        ) : (
          /* Main Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Sub-Nav */}
            <div className="bg-stone-900 p-2 border-b border-stone-800 flex gap-2 shrink-0 overflow-x-auto">
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
                <Database className="w-4 h-4" />
                <span>全量数据 JSON 检视</span>
              </button>

              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                  activeTab === 'lessons'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>144 课数据热查器</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* TAB 1: QUICK CONTROLS */}
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
