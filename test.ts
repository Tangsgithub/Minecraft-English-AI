const DEFAULT_PROFILE = {
  id: 'user_001', nickname: 'Olaf',
  volumeProgress: {
    vol1: { currentLessonId: 1, unlockedLessonIds: [1, 2], completedLessonIds: [] },
    vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] }
  }
};
const sanitizeProfile = (raw: any) => {
  const rawVolProgress = raw.volumeProgress && typeof raw.volumeProgress === 'object' ? raw.volumeProgress : {};
  const volProgress: any = {
    vol1: { currentLessonId: 1, unlockedLessonIds: [1, 2], completedLessonIds: [] },
    vol2: { currentLessonId: 1, unlockedLessonIds: [1], completedLessonIds: [] },
    ...rawVolProgress
  };
  if (!raw.volumeProgress?.vol1 && (raw.currentLessonId || raw.unlockedLessonIds)) {
    volProgress.vol1 = {
      currentLessonId: raw.currentLessonId || 1,
      unlockedLessonIds: Array.isArray(raw.unlockedLessonIds) ? raw.unlockedLessonIds : [1, 2],
      completedLessonIds: Array.isArray(raw.completedLessonIds) ? raw.completedLessonIds : []
    };
  }
  ['vol1', 'vol2'].forEach(vId => {
    const vp = volProgress[vId];
    if (vp) {
      const uSet = new Set<number>(Array.isArray(vp.unlockedLessonIds) ? vp.unlockedLessonIds : [1]);
      uSet.add(1);
      if (vp.currentLessonId) {
        for (let i = 1; i <= vp.currentLessonId; i++) uSet.add(i);
      }
      if (vp.completedLessonIds && Array.isArray(vp.completedLessonIds)) {
        vp.completedLessonIds.forEach(id => {
          uSet.add(id);
          uSet.add(id + 1);
        });
      }
      vp.unlockedLessonIds = Array.from(uSet).sort((a, b) => a - b);
    }
  });
  return volProgress;
};

// Simulate new user registered from backend:
const newUserFromCloud = {
  id: 'user_new',
  currentLessonId: 1,
  unlockedLessonIds: [1, 2],
  completedLessonIds: []
};

console.log("newUserFromCloud:", sanitizeProfile(newUserFromCloud));

// Simulate what App.tsx does when isSwitchingAccount is false:
const localPrev = DEFAULT_PROFILE;
const merged = { ...localPrev, ...newUserFromCloud, unlockedLessonIds: [1, 2] };
console.log("merged:", sanitizeProfile(merged));
