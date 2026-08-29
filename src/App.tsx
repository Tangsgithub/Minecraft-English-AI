import React, { useState, useEffect } from 'react';
import { UserProfile, Lesson, ChatMessage, APP_VERSION_INFO, CourseVolumeId, VolumeProgress } from './types';
import { getLevelFromXp, evaluateMissionsForProfile } from './data/gamificationData';
import { getVolumeProgress, updateVolumeProgress, switchActiveVolume, DEFAULT_VOLUME_PROGRESS, hasLessonAccess } from './utils/volumeProgress';
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
import { UserProfileModal } from './components/UserProfileModal';
import { StudyGuideManualModal } from './components/StudyGuideManualModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { EyeCareModal } from './components/EyeCareModal';
import { VipActivationModal } from './components/VipActivationModal';
import { RadioImmersionView } from './components/RadioImmersionView';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { CustomerServiceModal, CustomerServiceFloatingButton } from './components/CustomerServiceModal';
import { auth, User, saveUserProfileToCloud, fetchUserProfileFromCloud } from './lib/firebase';
import { getSoundEnabled, playClickSound, playLevelUpSound, playEmeraldSound } from './utils/audio';
import { unlockMobileAudio } from './services/edgeTtsService';
import { Map, MessageSquare, BookOpen, Scroll, Trophy, Sparkles, Hammer, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';

const getTodayDateString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_001',
  nickname: 'Olaf',
  age: 8,
  level: 1,
  xp: 40,
  emeralds: 15,
  streakDays: 1,
  totalStudyDays: 1,
  activeDates: [getTodayDateString()],
  lastActiveDate: getTodayDateString(),
  selectedAvatar: 'steve',
  avatar: 'steve',
  selectedVolumeId: 'vol1',
  currentLessonId: 1,
  unlockedLessonIds: [1],
  completedLessonIds: [],
  volumeProgress: {
    vol1: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
  },
  completedMissionIds: [],
  unlockedBadgeIds: [],
  masteredWords: [],
  apiKeyConfig: {
    provider: 'deepseek',
    apiKey: '',
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat'
  },
  isInitialSetupDone: true
};

const sanitizeProfile = (raw: any): UserProfile => {
  if (!raw || typeof raw !== 'object') return DEFAULT_PROFILE;

  const todayStr = getTodayDateString();
  const rawLastActive = raw.lastActiveDate || todayStr;
  let streakDays = typeof raw.streakDays === 'number' && raw.streakDays > 0 ? raw.streakDays : 1;
  let totalStudyDays = typeof raw.totalStudyDays === 'number' && raw.totalStudyDays > 0 
    ? raw.totalStudyDays 
    : (typeof raw.studyDays === 'number' && raw.studyDays > 0 ? raw.studyDays : streakDays);

  const rawDailyMissionsDate = raw.dailyMissionsDate || rawLastActive;
  const isNewDay = rawDailyMissionsDate !== todayStr || rawLastActive !== todayStr;

  const activeDatesSet = new Set<string>(Array.isArray(raw.activeDates) ? raw.activeDates : [rawLastActive]);
  activeDatesSet.add(todayStr);
  totalStudyDays = Math.max(totalStudyDays, activeDatesSet.size);

  let todayStudyMinutes = isNewDay ? 0 : (typeof raw.todayStudyMinutes === 'number' ? raw.todayStudyMinutes : 0);
  let todayCompletedLessonsCount = isNewDay ? 0 : (typeof raw.todayCompletedLessonsCount === 'number' ? raw.todayCompletedLessonsCount : 0);
  let todayMasteredWordsCount = isNewDay ? 0 : (typeof raw.todayMasteredWordsCount === 'number' ? raw.todayMasteredWordsCount : 0);
  let todayAlexChatDone = isNewDay ? false : Boolean(raw.todayAlexChatDone);
  let todayCheckedIn = isNewDay ? false : Boolean(raw.todayCheckedIn);
  let completedDailyMissionIds: string[] = isNewDay
    ? []
    : (Array.isArray(raw.completedDailyMissionIds) ? raw.completedDailyMissionIds : []);

  if (rawLastActive !== todayStr) {
    try {
      const [lY, lM, lD] = rawLastActive.split('-').map(Number);
      const [cY, cM, cD] = todayStr.split('-').map(Number);
      if (lY && lM && lD && cY && cM && cD) {
        const lastDate = new Date(lY, lM - 1, lD);
        const currDate = new Date(cY, cM - 1, cD);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Logged in on consecutive day
          streakDays = streakDays + 1;
          totalStudyDays = totalStudyDays + 1;
        } else if (diffDays > 1) {
          // Missed one or more days: reset streak to 1, increment total study days
          streakDays = 1;
          totalStudyDays = totalStudyDays + 1;
        }
      }
    } catch (e) {
      console.warn("Date parse error", e);
    }
  }

  const rawVolProgress = raw.volumeProgress && typeof raw.volumeProgress === 'object' ? raw.volumeProgress : {};
  const volProgress: Record<CourseVolumeId, VolumeProgress> = {
    vol1: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol3: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    vol4: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    ...rawVolProgress
  };

  // If raw has legacy top-level progress, preserve it in vol1
  if (!raw.volumeProgress?.vol1 && (raw.currentLessonId || raw.unlockedLessonIds)) {
    volProgress.vol1 = {
      currentLessonId: raw.currentLessonId || 1,
      unlockedLessonIds: Array.isArray(raw.unlockedLessonIds) ? raw.unlockedLessonIds : [1],
      completedLessonIds: Array.isArray(raw.completedLessonIds) ? raw.completedLessonIds : []
    };
  }

  // Sanitize each volume progress individually
  const isVipUser = raw.isVip === true || String(raw.isVip) === 'true';
  const activatedVols: string[] = Array.isArray(raw.activatedVolumes)
    ? raw.activatedVolumes.map((v: any) => String(v).toLowerCase())
    : [];

  (['vol1', 'vol2', 'vol3', 'vol4'] as CourseVolumeId[]).forEach(vId => {
    const vp = volProgress[vId];
    const totalCount = vId === 'vol1' ? 144 : vId === 'vol2' ? 96 : vId === 'vol3' ? 60 : 48;

    if (vp) {
      const cSet = new Set<number>(Array.isArray(vp.completedLessonIds) ? vp.completedLessonIds : []);
      const uSet = new Set<number>(Array.isArray(vp.unlockedLessonIds) ? vp.unlockedLessonIds : [1]);
      uSet.add(1);

      const isVolUnlocked = isVipUser || activatedVols.includes(vId) || activatedVols.includes('all');
      if (isVolUnlocked && vId === 'vol1') {
        for (let i = 1; i <= totalCount; i++) {
          uSet.add(i);
        }
      } else {
        cSet.forEach(id => {
          uSet.add(id);
          if (id < totalCount) {
            uSet.add(id + 1);
          }
        });

        if (vp.currentLessonId) {
          uSet.add(vp.currentLessonId);
        }
      }

      vp.unlockedLessonIds = Array.from(uSet).sort((a, b) => a - b);
      vp.completedLessonIds = Array.from(cSet).sort((a, b) => a - b);
    }
  });

  const activeVolId: CourseVolumeId = 'vol1';
  const activeProg = volProgress.vol1;

  // Separate permanent completed mission IDs from daily mission IDs
  const rawCompletedMissions: string[] = Array.isArray(raw.completedMissionIds)
    ? raw.completedMissionIds
    : (Array.isArray(raw.completedMissions) ? raw.completedMissions : []);
  const permanentCompletedMissions = rawCompletedMissions.filter(id => !id.startsWith('daily_'));
  const effectiveCompletedMissions = Array.from(new Set([...permanentCompletedMissions, ...completedDailyMissionIds]));

  const merged: UserProfile = {
    ...DEFAULT_PROFILE,
    ...raw,
    streakDays,
    totalStudyDays,
    activeDates: Array.from(activeDatesSet),
    lastActiveDate: todayStr,
    dailyMissionsDate: todayStr,
    todayStudyMinutes,
    todayCompletedLessonsCount,
    todayMasteredWordsCount,
    todayAlexChatDone,
    todayCheckedIn,
    completedDailyMissionIds,
    selectedAvatar: raw.selectedAvatar || raw.avatar || 'steve',
    avatar: raw.avatar || raw.selectedAvatar || 'steve',
    selectedVolumeId: activeVolId,
    volumeProgress: volProgress,
    currentLessonId: activeProg.currentLessonId,
    unlockedLessonIds: activeProg.unlockedLessonIds,
    completedLessonIds: activeProg.completedLessonIds,
    completedMissionIds: effectiveCompletedMissions,
    readyToClaimMissionIds: Array.isArray(raw.readyToClaimMissionIds) ? raw.readyToClaimMissionIds : [],
    unlockedBadgeIds: Array.isArray(raw.unlockedBadgeIds) ? raw.unlockedBadgeIds : ['badge_first_words'],
    masteredWords: Array.isArray(raw.masteredWords) ? raw.masteredWords : []
  };

  if (merged.nickname === 'Tom') merged.nickname = 'Olaf';
  merged.level = getLevelFromXp(merged.xp || 40);

  // If user account is 测试001 or test001, ensure set to regular user (普通用户)
  const cleanAcc = (merged.account || merged.nickname || '').trim().toLowerCase();
  if (cleanAcc === '测试001' || cleanAcc === 'test001') {
    merged.isVip = false;
    merged.vipActivatedAt = 0;
    merged.activatedVolumes = [];
    merged.isAdmin = false;
  }

  // Strictly evaluate and populate readyToClaimMissionIds based on existing real completed lessons & achievements
  const evaluatedReady = evaluateMissionsForProfile(merged);
  merged.readyToClaimMissionIds = evaluatedReady.filter(id => !(merged.completedMissionIds || []).includes(id));

  return merged;
};

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mc_english_user_profile');
      if (saved) {
        try {
          return sanitizeProfile(JSON.parse(saved));
        } catch {
          return DEFAULT_PROFILE;
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  // User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => auth.currentUser);
  const [isLandingView, setIsLandingView] = useState<boolean>(() => !auth.currentUser);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const [selectedVolumeId, setSelectedVolumeId] = useState<CourseVolumeId>('vol1');
  const [activeTab, setActiveTab] = useState<'map' | 'radio' | 'vocab' | 'crafting' | 'missions' | 'achievements'>('map');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Lesson Context for Alex Chat
  const [selectedLessonForChat, setSelectedLessonForChat] = useState<Lesson | null>(null);

  // Modals
  const [isFirstLaunchOpen, setIsFirstLaunchOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState<boolean>(false);
  const [isEyeCareOpen, setIsEyeCareOpen] = useState<boolean>(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState<boolean>(false);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState<boolean>(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);

  // Fetch latest cloud profile on login or user switch
  useEffect(() => {
    const target = currentUser?.uid || currentUser?.account || profile?.account;
    if (target) {
      fetchUserProfileFromCloud(target).then(cloudProfile => {
        if (cloudProfile) {
          setProfile(prev => {
            const isSwitchingAccount = prev.account && currentUser?.account && prev.account !== currentUser.account;
            
            let merged;

            if (isSwitchingAccount) {
              // Completely overwrite local state when switching to a different account
              merged = sanitizeProfile({
                ...cloudProfile,
                account: currentUser?.account || cloudProfile.account,
                nickname: currentUser?.nickname || cloudProfile.nickname
              });
            } else {
              // Merge local guest progress with cloud profile, or update existing
              const mergedUnlocked = Array.from(new Set([...(prev.unlockedLessonIds || [1]), ...(cloudProfile.unlockedLessonIds || [1])])).sort((a, b) => a - b);
              const mergedCompleted = Array.from(new Set([...(prev.completedLessonIds || []), ...(cloudProfile.completedLessonIds || [])])).sort((a, b) => a - b);
              const mergedMissions = Array.from(new Set([...(prev.completedMissionIds || []), ...(cloudProfile.completedMissionIds || [])]));
              const mergedWords = Array.from(new Set([...(prev.masteredWords || []), ...(cloudProfile.masteredWords || [])]));
              const maxLevel = Math.max(prev.level || 1, cloudProfile.level || 1);
              const maxEmeralds = Math.max(prev.emeralds ?? 100, cloudProfile.emeralds ?? 100);
              const maxXp = Math.max(prev.xp || 0, cloudProfile.xp || 0);
              const maxCurrentLesson = Math.max(prev.currentLessonId || 1, cloudProfile.currentLessonId || 1);
              const isVip = Boolean(prev.isVip || cloudProfile.isVip);
              
              const mergedActivatedVolumes = Array.from(new Set([
                ...(prev.activatedVolumes || []),
                ...(cloudProfile.activatedVolumes || [])
              ]));

              merged = sanitizeProfile({
                ...prev,
                ...cloudProfile,
                account: currentUser?.account || cloudProfile.account || prev.account,
                nickname: currentUser?.nickname || cloudProfile.nickname || prev.nickname,
                isVip,
                activatedVolumes: mergedActivatedVolumes,
                level: maxLevel,
                emeralds: maxEmeralds,
                xp: maxXp,
                currentLessonId: maxCurrentLesson,
                unlockedLessonIds: mergedUnlocked,
                completedLessonIds: mergedCompleted,
                completedMissionIds: mergedMissions,
                masteredWords: mergedWords
              });
            }

            if (typeof window !== 'undefined') {
              localStorage.setItem('mc_english_user_profile', JSON.stringify(merged));
            }
            return merged;
          });
        }
      });
    }
  }, [currentUser?.uid, currentUser?.account]);

  // Sync profile to localStorage and Cloud
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mc_english_user_profile', JSON.stringify(profile));
      const syncTarget = currentUser?.uid || profile?.account || profile?.id;
      if (syncTarget) {
        saveUserProfileToCloud(profile, syncTarget);
      }
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

  const handleUpdateProfile = (updated: Partial<UserProfile> | ((prev: UserProfile) => UserProfile)) => {
    setProfile(prev => {
      const computed = typeof updated === 'function' ? updated(prev) : { ...prev, ...updated };
      const next = sanitizeProfile(computed);
      next.level = getLevelFromXp(next.xp);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('mc_english_user_profile', JSON.stringify(next));
        } catch (e) {
          console.warn("Storage save error", e);
        }
      }
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

  const currentVolume = APP_VERSION_INFO.volumes.find(v => v.id === selectedVolumeId) || APP_VERSION_INFO.volumes[0];

  const handleChangeVolumeId = (newVolId: CourseVolumeId) => {
    if (newVolId !== 'vol1') {
      alert('《新概念英语》第二册目前正由教研团队深度打磨中，已全量锁定，暂未开放，敬请期待！');
      setSelectedVolumeId('vol1');
      return;
    }
    setSelectedVolumeId('vol1');
    setProfile(prev => {
      const updated = switchActiveVolume(prev, 'vol1');
      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(updated));
      }
      saveUserProfileToCloud(updated, currentUser?.uid);
      return updated;
    });
  };

  const handleCompleteLesson = (lessonId: number) => {
    handleAwardEmeralds(10, 30);
    playEmeraldSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setProfile(prev => {
      const currentVolId = selectedVolumeId || prev.selectedVolumeId || 'vol1';
      const volProg = getVolumeProgress(prev, currentVolId);

      const nextCompleted = Array.from(new Set([...(volProg.completedLessonIds || []), lessonId])).sort((a, b) => a - b);
      
      const nextLessonId = lessonId + 1;
      const canAccessNext = hasLessonAccess(prev, currentVolId, nextLessonId);

      let nextUnlocked = [...volProg.unlockedLessonIds, lessonId];
      if (canAccessNext) {
        nextUnlocked.push(nextLessonId);
      }
      nextUnlocked = Array.from(new Set(nextUnlocked)).sort((a, b) => a - b);

      const nextCurrentLessonId = canAccessNext
        ? Math.max(volProg.currentLessonId, nextLessonId)
        : Math.min(volProg.currentLessonId, lessonId);

      const nextProfile = updateVolumeProgress(prev, currentVolId, {
        currentLessonId: nextCurrentLessonId,
        unlockedLessonIds: nextUnlocked,
        completedLessonIds: nextCompleted
      });

      // Increment today's completed lessons count
      nextProfile.todayCompletedLessonsCount = (nextProfile.todayCompletedLessonsCount || 0) + 1;

      // Automatically evaluate missions for newly completed lesson
      const newlyReadyMissions = evaluateMissionsForProfile(nextProfile);
      nextProfile.readyToClaimMissionIds = Array.from(new Set([
        ...(nextProfile.readyToClaimMissionIds || []),
        ...newlyReadyMissions
      ])).filter(id => !(nextProfile.completedMissionIds || []).includes(id));

      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(nextProfile));
      }
      saveUserProfileToCloud(nextProfile, currentUser?.uid);

      return nextProfile;
    });
  };

  const handleCompleteMission = (missionId: string, xpReward: number, emeraldReward: number) => {
    handleAwardEmeralds(emeraldReward, xpReward);
    setProfile(prev => {
      const isDaily = missionId.startsWith('daily_');
      const nextDailyCompleted = isDaily
        ? Array.from(new Set([...(prev.completedDailyMissionIds || []), missionId]))
        : (prev.completedDailyMissionIds || []);
      const nextCompleted = Array.from(new Set([...prev.completedMissionIds, missionId]));
      const nextReady = (prev.readyToClaimMissionIds || []).filter(id => id !== missionId);

      const next: UserProfile = {
        ...prev,
        completedDailyMissionIds: nextDailyCompleted,
        completedMissionIds: nextCompleted,
        readyToClaimMissionIds: nextReady
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(next));
      }
      saveUserProfileToCloud(next, currentUser?.uid);
      return next;
    });
  };

  const handleDailyCheckIn = () => {
    setProfile(prev => {
      if (prev.todayCheckedIn) return prev;
      playEmeraldSound();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

      const next: UserProfile = {
        ...prev,
        todayCheckedIn: true
      };

      const newlyReadyMissions = evaluateMissionsForProfile(next);
      next.readyToClaimMissionIds = Array.from(new Set([
        ...(next.readyToClaimMissionIds || []),
        ...newlyReadyMissions
      ])).filter(id => !(next.completedMissionIds || []).includes(id));

      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(next));
      }
      saveUserProfileToCloud(next, currentUser?.uid);
      return next;
    });
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

      const next: UserProfile = {
        ...prev,
        masteredWords: nextMastered,
        todayMasteredWordsCount: !isAlready ? (prev.todayMasteredWordsCount || 0) + 1 : prev.todayMasteredWordsCount
      };

      const newlyReadyMissions = evaluateMissionsForProfile(next);
      next.readyToClaimMissionIds = Array.from(new Set([
        ...(next.readyToClaimMissionIds || []),
        ...newlyReadyMissions
      ])).filter(id => !(next.completedMissionIds || []).includes(id));

      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_english_user_profile', JSON.stringify(next));
      }
      saveUserProfileToCloud(next, currentUser?.uid);

      return next;
    });
  };

  const handleSelectLessonForChat = (lesson: Lesson) => {
    setSelectedLessonForChat(lesson);
    setActiveTab('radio');
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

  const handleSignOut = () => {
    playClickSound();
    auth.currentUser = null;
    setCurrentUser(null);
    setIsUserProfileOpen(false);
    setIsLandingView(true);
    localStorage.removeItem('mc_english_user_profile');
    localStorage.removeItem('mc_english_current_user');
    setProfile(DEFAULT_PROFILE);
  };

  const handleEnterApp = (targetTab?: 'map' | 'radio' | 'vocab' | 'crafting' | 'missions' | 'achievements') => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    if (targetTab) {
      setActiveTab(targetTab);
    }
    setIsLandingView(false);
  };

  if (isLandingView) {
    return (
      <>
        <LandingPage
          currentUser={currentUser}
          isAuthenticated={!!currentUser}
          profile={profile}
          onEnterApp={handleEnterApp}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenParentDashboard={() => setIsParentDashboardOpen(true)}
          onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
          onOpenAdminConsole={() => setIsAdminConsoleOpen(true)}
        />
        <CustomerServiceFloatingButton onClick={() => setIsCustomerServiceOpen(true)} />
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
        <CustomerServiceModal
          isOpen={isCustomerServiceOpen}
          onClose={() => setIsCustomerServiceOpen(false)}
          profile={profile}
          currentUser={currentUser}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          currentUser={currentUser}
          onUserChange={(user, newProfile) => {
            setCurrentUser(user);
            if (newProfile) setProfile(sanitizeProfile(newProfile));
            if (user && isLandingView) {
              setIsLandingView(false);
            } else if (!user) {
              setIsLandingView(true);
              setProfile(DEFAULT_PROFILE);
            }
          }}
          currentProfile={profile}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#6194E3] text-[#2D2D2D] flex flex-col font-sans selection:bg-[#7CFC00] selection:text-black">
      
      {/* Fixed Top Status Header */}
      <HeaderBar
        selectedVolumeId={selectedVolumeId}
        onChangeVolumeId={handleChangeVolumeId}
        profile={profile}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenUserProfile={() => setIsUserProfileOpen(true)}
        onOpenHelpWizard={() => setIsGuideOpen(true)}
        onOpenParentDashboard={() => setIsParentDashboardOpen(true)}
        onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
        onGoToLandingPage={() => setIsLandingView(true)}
        onOpenAdminConsole={() => setIsAdminConsoleOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main App Container */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 flex flex-col pb-safe ${
        activeTab === 'radio' ? 'py-1.5 sm:py-2.5 space-y-2 sm:space-y-2.5' : 'py-3 sm:py-6 space-y-4 sm:space-y-5'
      }`}>
        
        {/* Navigation Tabs Bar (Responsive Mobile Optimized) */}
        <nav className="bg-white/95 border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] p-1 sm:p-2 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
          
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('map');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all active:translate-y-0.5 ${
              activeTab === 'map'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🗺️ 地图</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('radio');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all relative active:translate-y-0.5 ${
              activeTab === 'radio'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">📻 磨耳朵</span>
            {selectedLessonForChat && (
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF6321] animate-ping absolute top-1 right-1 border border-white" />
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('vocab');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all active:translate-y-0.5 ${
              activeTab === 'vocab'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">📦 词汇</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('crafting');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all active:translate-y-0.5 ${
              activeTab === 'crafting'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Hammer className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🔨 合成</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('missions');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all active:translate-y-0.5 relative ${
              activeTab === 'missions'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">📜 任务</span>
            {((profile.readyToClaimMissionIds || []).filter(id => !(profile.completedMissionIds || []).includes(id))).length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#FF6321] text-white text-[9px] font-black rounded-full animate-pulse">
                {((profile.readyToClaimMissionIds || []).filter(id => !(profile.completedMissionIds || []).includes(id))).length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('achievements');
            }}
            className={`flex-1 min-w-[70px] xs:min-w-[85px] sm:min-w-[110px] shrink-0 snap-start py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs md:text-sm flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all active:translate-y-0.5 ${
              activeTab === 'achievements'
                ? 'bg-[#487E2C] border-2 border-[#355E20] text-white shadow-[0_2px_0_0_#2A4718] sm:shadow-[0_4px_0_0_#2A4718]'
                : 'bg-transparent border-2 border-transparent text-slate-700 hover:text-[#487E2C] hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">🏆 成就</span>
          </button>

        </nav>

        {/* Tab View Contents */}
        <div className="flex-1 space-y-4">
          {activeTab === 'map' && (
            <>
              <LessonMap
                selectedVolumeId={selectedVolumeId}
                profile={profile}
                onSelectLessonForChat={handleSelectLessonForChat}
                onCompleteLesson={handleCompleteLesson}
                onAwardEmeralds={handleAwardEmeralds}
                onOpenVipModal={() => setIsVipModalOpen(true)}
              />
            </>
          )}

          {activeTab === 'radio' && (
            <RadioImmersionView
              selectedVolumeId={selectedVolumeId}
              profile={profile}
              currentLessonId={profile.currentLessonId || 1}
              activeLessonForChat={selectedLessonForChat}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              onAwardEmeralds={handleAwardEmeralds}
              onCompleteLesson={handleCompleteLesson}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onSelectLessonForChat={handleSelectLessonForChat}
              onCheckMission={(text) => {
                const lowerText = text.toLowerCase();
                setProfile(prev => {
                  const next: UserProfile = {
                    ...prev,
                    todayAlexChatDone: true
                  };
                  const newlyReadyMissions = evaluateMissionsForProfile(next);
                  next.readyToClaimMissionIds = Array.from(new Set([
                    ...(next.readyToClaimMissionIds || []),
                    ...newlyReadyMissions
                  ])).filter(id => !(next.completedMissionIds || []).includes(id));

                  const hiddenReady: string[] = [];
                  import('./data/gamificationData').then(({ INITIAL_MISSIONS }) => {
                    INITIAL_MISSIONS.forEach(mission => {
                      if ((next.completedMissionIds || []).includes(mission.id)) return;
                      if ((next.readyToClaimMissionIds || []).includes(mission.id)) return;
                      
                      let matched = false;
                      if (mission.id === 'mission_001' && lowerText.includes('wooden door')) matched = true;
                      if (mission.id === 'mission_002' && (lowerText.includes('excuse me') || lowerText.includes('teacher'))) matched = true;
                      if (mission.id === 'mission_003' && lowerText.includes('diamonds')) matched = true;
                      if (mission.id === 'mission_004' && (lowerText.includes('how much') || lowerText.includes('emerald'))) matched = true;
                      
                      if (matched) {
                        hiddenReady.push(mission.id);
                        alert(`🎉 恭喜！你通过对话完成了隐藏任务: [${mission.titleZh}]！请去"任务"页面领取奖励吧！`);
                      }
                    });
                    if (hiddenReady.length > 0) {
                      handleUpdateProfile({
                        readyToClaimMissionIds: Array.from(new Set([...(next.readyToClaimMissionIds || []), ...hiddenReady]))
                      });
                    }
                  });

                  if (typeof window !== 'undefined') {
                    localStorage.setItem('mc_english_user_profile', JSON.stringify(next));
                  }
                  saveUserProfileToCloud(next, currentUser?.uid);
                  return next;
                });
              }}
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
                onOpenVipModal={() => setIsVipModalOpen(true)}
                onNavigateToLesson={handleSelectLessonForChat}
              />
            </>
          )}

          {activeTab === 'crafting' && (
            <CraftingLabView
              profile={profile}
              onAwardEmeralds={handleAwardEmeralds}
              onMasterWord={handleToggleMasterWord}
              onOpenVipModal={() => setIsVipModalOpen(true)}
              onNavigateToLesson={handleSelectLessonForChat}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === 'missions' && (
            <MissionsView
              profile={profile}
              onCompleteMission={handleCompleteMission}
              onNavigateToChat={() => setActiveTab('chat')}
              onNavigateToMap={() => setActiveTab('map')}
              onNavigateToVocab={() => setActiveTab('vocab')}
              onNavigateToCrafting={() => setActiveTab('crafting')}
              onDailyCheckIn={handleDailyCheckIn}
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

      {isUserProfileOpen && (
        <UserProfileModal
          profile={profile}
          currentUser={currentUser}
          onSaveProfile={handleUpdateProfile}
          onClose={() => setIsUserProfileOpen(false)}
          onSignOut={handleSignOut}
          onSwitchAccount={() => {
            setIsUserProfileOpen(false);
            setIsAuthOpen(true);
          }}
          onOpenVipModal={() => {
            setIsUserProfileOpen(false);
            setIsVipModalOpen(true);
          }}
          onOpenParentDashboard={() => {
            setIsUserProfileOpen(false);
            setIsParentDashboardOpen(true);
          }}
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

      <CustomerServiceFloatingButton onClick={() => setIsCustomerServiceOpen(true)} />

      <CustomerServiceModal
        isOpen={isCustomerServiceOpen}
        onClose={() => setIsCustomerServiceOpen(false)}
        profile={profile}
        currentUser={currentUser}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUserChange={(user, newProfile) => {
          setCurrentUser(user);
          if (newProfile) setProfile(sanitizeProfile(newProfile));
          if (user && isLandingView) {
            setIsLandingView(false);
          } else if (!user) {
            setIsLandingView(true);
            setProfile(DEFAULT_PROFILE);
          }
        }}
        currentProfile={profile}
      />

      <VipActivationModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
      />

    </div>
  );
}
