import React, { useState, useEffect } from 'react';
import { UserProfile, Lesson, ChatMessage } from './types';
import { getLevelFromXp } from './data/gamificationData';
import { HeaderBar } from './components/HeaderBar';
import { FirstLaunchModal } from './components/FirstLaunchModal';
import { LessonMap } from './components/LessonMap';
import { AlexChatView } from './components/AlexChatView';
import { MinecraftVocabView } from './components/MinecraftVocabView';
import { CraftingLabView } from './components/CraftingLabView';
import { VocabProgressChart } from './components/VocabProgressChart';
import { MissionsView } from './components/MissionsView';
import { AchievementsView } from './components/AchievementsView';
import { SettingsModal } from './components/SettingsModal';
import { StudyGuideManualModal } from './components/StudyGuideManualModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { EyeCareModal } from './components/EyeCareModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { auth, onAuthStateChanged, fetchUserProfileFromCloud, saveUserProfileToCloud, User } from './lib/firebase';
import { getSoundEnabled, playClickSound, playLevelUpSound, playEmeraldSound } from './utils/audio';
import { unlockMobileAudio } from './services/edgeTtsService';
import { Map, MessageSquare, BookOpen, Scroll, Trophy, Sparkles, Hammer } from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_001',
  nickname: 'Olaf',
  age: 8,
  level: 1,
  xp: 40,
  emeralds: 15,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  selectedAvatar: '👦',
  currentLessonId: 1,
  unlockedLessonIds: [1, 2],
  completedMissionIds: [],
  unlockedBadgeIds: ['badge_first_words'],
  masteredWords: ['block', 'craft', 'house'],
  apiKeyConfig: {
    provider: 'deepseek',
    apiKey: '',
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat'
  },
  isInitialSetupDone: false
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mc_english_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.nickname === 'Tom') {
            parsed.nickname = 'Olaf';
          }
          // Repair and ensure valid unlockedLessonIds continuous sequence
          if (Array.isArray(parsed.unlockedLessonIds)) {
            const unlockedSet = new Set<number>(parsed.unlockedLessonIds);
            unlockedSet.add(1);
            if (parsed.currentLessonId) {
              for (let i = 1; i <= parsed.currentLessonId; i++) {
                unlockedSet.add(i);
              }
            }
            parsed.unlockedLessonIds = Array.from(unlockedSet).sort((a, b) => a - b);
          } else {
            parsed.unlockedLessonIds = [1, 2];
          }
          // Recalibrate level strictly from XP to prevent level-XP mismatch
          parsed.level = getLevelFromXp(parsed.xp || 40);
          return parsed;
        } catch {
          return DEFAULT_PROFILE;
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isLandingView, setIsLandingView] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'map' | 'chat' | 'vocab' | 'crafting' | 'missions' | 'achievements'>('map');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Active Lesson Context for Alex Chat
  const [selectedLessonForChat, setSelectedLessonForChat] = useState<Lesson | null>(null);

  // Modals
  const [isFirstLaunchOpen, setIsFirstLaunchOpen] = useState<boolean>(!profile.isInitialSetupDone);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState<boolean>(false);
  const [isEyeCareOpen, setIsEyeCareOpen] = useState<boolean>(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState<boolean>(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const cloudProfile = await fetchUserProfileFromCloud(user.uid);
        if (cloudProfile) {
          setProfile(cloudProfile);
        } else {
          // Push initial profile to Firestore for newly authenticated user
          await saveUserProfileToCloud(profile, user.uid);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync profile to localStorage and Cloud Firestore
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mc_english_user_profile', JSON.stringify(profile));
    }
    if (currentUser) {
      saveUserProfileToCloud(profile, currentUser.uid);
    }
  }, [profile, currentUser]);

  // Continuous study timer for Eye Care
  const [continuousMinutes, setContinuousMinutes] = useState<number>(0);

  useEffect(() => {
    // 1-minute ticker for study time
    const interval = setInterval(() => {
      setContinuousMinutes(prev => {
        const next = prev + 1;
        const limit = profile.parentSettings?.continuousTimeLimitMinutes || 20;
        const eyeEnabled = profile.parentSettings?.eyeProtectionEnabled ?? true;

        if (eyeEnabled && next >= limit && !isEyeCareOpen) {
          setIsEyeCareOpen(true);
        }
        return next;
      });

      // Update study time in profile
      setProfile(p => ({
        ...p,
        todayStudyMinutes: (p.todayStudyMinutes || 0) + 1,
        totalStudyMinutes: (p.totalStudyMinutes || 0) + 1
      }));
    }, 60000); // 1 min

    return () => clearInterval(interval);
  }, [profile.parentSettings, isEyeCareOpen]);

  // Chat Messages History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init_alex_1',
      sender: 'alex',
      text: `Hello, ${profile.nickname || 'Olaf'}! 🌲 Welcome to Minecraft English World! I am your teacher Alex. Are you ready for our English mission today? [你好！欢迎来到我的世界英语村庄！我是你的 Alex 老师。你准备好参加今天的英语探索任务了吗？]`,
      encouragement: "Welcome Adventurer! ❇️ +15 Emeralds",
      timestamp: Date.now()
    }
  ]);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('mc_english_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    setSoundEnabled(getSoundEnabled());

    const handleUserTouch = () => {
      unlockMobileAudio();
    };

    window.addEventListener('touchstart', handleUserTouch, { passive: true });
    window.addEventListener('pointerdown', handleUserTouch, { passive: true });
    window.addEventListener('click', handleUserTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserTouch);
      window.removeEventListener('pointerdown', handleUserTouch);
      window.removeEventListener('click', handleUserTouch);
    };
  }, []);

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      next.level = getLevelFromXp(next.xp);
      return next;
    });
  };

  // Award Emeralds & XP with Level Up check
  const handleAwardEmeralds = (emeraldAmount: number, xpAmount: number) => {
    setProfile(prev => {
      const newXp = prev.xp + xpAmount;
      const calculatedLevel = getLevelFromXp(newXp);
      let newLevel = Math.max(prev.level, calculatedLevel);

      if (newLevel > prev.level) {
        playLevelUpSound();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }

      return {
        ...prev,
        emeralds: prev.emeralds + emeraldAmount,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const handleCompleteLesson = (lessonId: number) => {
    handleAwardEmeralds(10, 30);
    setProfile(prev => {
      const nextUnlocked = Array.from(new Set([...prev.unlockedLessonIds, lessonId, lessonId + 1]));
      return {
        ...prev,
        currentLessonId: Math.max(prev.currentLessonId, lessonId + 1),
        unlockedLessonIds: nextUnlocked
      };
    });
  };

  const handleCompleteMission = (missionId: string, xpReward: number, emeraldReward: number) => {
    handleAwardEmeralds(emeraldReward, xpReward);
    setProfile(prev => ({
      ...prev,
      completedMissionIds: Array.from(new Set([...prev.completedMissionIds, missionId]))
    }));
  };

  const handleToggleMasterWord = (word: string) => {
    setProfile(prev => {
      const isAlready = prev.masteredWords.includes(word);
      const nextMastered = isAlready
        ? prev.masteredWords.filter(w => w !== word)
        : [...prev.masteredWords, word];

      if (!isAlready) {
        // Grant bonus for mastering new word
        handleAwardEmeralds(5, 10);
      }

      return {
        ...prev,
        masteredWords: nextMastered
      };
    });
  };

  const handleSelectLessonForChat = (lesson: Lesson) => {
    setSelectedLessonForChat(lesson);
    setActiveTab('chat');
    // Add lesson prompt context into chat history
    setChatMessages(prev => [
      ...prev,
      {
        id: `system_${Date.now()}`,
        sender: 'system',
        text: `📖 开启第 ${lesson.id} 课《${lesson.title}》与 Alex 老师练习！句型提示："${lesson.targetSentences[0] || ''}"`,
        timestamp: Date.now()
      }
    ]);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('mc_english_user_profile');
    setProfile(DEFAULT_PROFILE);
    setIsFirstLaunchOpen(true);
  };

  if (isLandingView) {
    return (
      <>
        <LandingPage
          onEnterApp={(targetTab) => {
            if (targetTab) setActiveTab(targetTab);
            setIsLandingView(false);
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenParentDashboard={() => setIsParentDashboardOpen(true)}
        />
        {isAuthOpen && (
          <AuthModal
            currentUser={currentUser}
            currentProfile={profile}
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onProfileLoaded={(loaded) => setProfile(loaded)}
          />
        )}
        {isParentDashboardOpen && (
          <ParentDashboardModal
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onClose={() => setIsParentDashboardOpen(false)}
            onTriggerEyeCareTest={() => setIsEyeCareOpen(true)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#6194E3] text-[#2D2D2D] flex flex-col font-sans selection:bg-[#7CFC00] selection:text-black">
      
      {/* Fixed Top Status Header */}
      <HeaderBar
        profile={profile}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelpWizard={() => setIsGuideOpen(true)}
        onOpenParentDashboard={() => setIsParentDashboardOpen(true)}
        onGoToLandingPage={() => setIsLandingView(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-3 sm:py-6 flex flex-col space-y-4 sm:space-y-5 pb-safe">
        
        {/* Navigation Tabs Bar (Vibrant Palette Tactile Style) */}
        <nav className="bg-white/95 border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
          
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('map');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'map'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🗺️ 冒险地图</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('chat');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all relative transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'chat'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">👩‍🦰 Alex 对话</span>
            {selectedLessonForChat && (
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF6321] animate-ping absolute top-1.5 right-1.5 border border-white" />
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('vocab');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'vocab'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">📦 MC 词库</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('crafting');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'crafting'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Hammer className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🔨 合成实验室</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('missions');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'missions'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">📜 任务告示</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('achievements');
            }}
            className={`flex-1 min-w-[95px] sm:min-w-[120px] shrink-0 snap-start py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all transform hover:translate-y-[-2px] active:translate-y-[2px] ${
              activeTab === 'achievements'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_3px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🏆 成就阶梯</span>
          </button>

        </nav>

        {/* Tab View Contents */}
        <div className="flex-1 space-y-4">
          {activeTab === 'map' && (
            <>
              <VocabProgressChart
                profile={profile}
                onNavigateToVocab={() => setActiveTab('vocab')}
              />
              <LessonMap
                profile={profile}
                onSelectLessonForChat={handleSelectLessonForChat}
                onCompleteLesson={handleCompleteLesson}
                onAwardEmeralds={handleAwardEmeralds}
              />
            </>
          )}

          {activeTab === 'chat' && (
            <AlexChatView
              profile={profile}
              activeLesson={selectedLessonForChat}
              messages={chatMessages}
              setMessages={setChatMessages}
              onAwardEmeralds={handleAwardEmeralds}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {activeTab === 'vocab' && (
            <>
              <VocabProgressChart
                profile={profile}
                onNavigateToVocab={() => setActiveTab('vocab')}
              />
              <MinecraftVocabView
                profile={profile}
                onToggleMasterWord={handleToggleMasterWord}
                onAwardEmeralds={handleAwardEmeralds}
              />
            </>
          )}

          {activeTab === 'crafting' && (
            <CraftingLabView
              profile={profile}
              onAwardEmeralds={handleAwardEmeralds}
              onMasterWord={handleToggleMasterWord}
            />
          )}

          {activeTab === 'missions' && (
            <MissionsView
              profile={profile}
              onCompleteMission={handleCompleteMission}
              onNavigateToChat={() => setActiveTab('chat')}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView profile={profile} />
          )}
        </div>

      </main>

      {/* Modals & Dialogs */}
      {isFirstLaunchOpen && (
        <FirstLaunchModal
          profile={profile}
          onComplete={(updated) => {
            handleUpdateProfile(updated);
            setIsFirstLaunchOpen(false);
          }}
          onClose={() => setIsFirstLaunchOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          profile={profile}
          onSaveProfile={handleUpdateProfile}
          onClose={() => setIsSettingsOpen(false)}
          onResetProgress={handleResetProgress}
          onOpenAdminConsole={() => setIsAdminConsoleOpen(true)}
        />
      )}

      {isGuideOpen && (
        <StudyGuideManualModal onClose={() => setIsGuideOpen(false)} />
      )}

      {isAdminConsoleOpen && (
        <AdminDashboardModal
          profile={profile}
          onUpdateProfile={(updater) => setProfile(updater)}
          onClose={() => setIsAdminConsoleOpen(false)}
        />
      )}

      {isParentDashboardOpen && (
        <ParentDashboardModal
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setIsParentDashboardOpen(false)}
          onTriggerEyeCareTest={() => setIsEyeCareOpen(true)}
        />
      )}

      {isEyeCareOpen && (
        <EyeCareModal
          continuousMinutes={continuousMinutes || 20}
          onClose={() => {
            setIsEyeCareOpen(false);
            setContinuousMinutes(0);
          }}
          onGrantReward={() => handleAwardEmeralds(5, 10)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          currentUser={currentUser}
          currentProfile={profile}
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onProfileLoaded={(loaded) => setProfile(loaded)}
        />
      )}

    </div>
  );
}
