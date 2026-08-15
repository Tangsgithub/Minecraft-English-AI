import { UserProfile, CourseVolumeId, VolumeProgress } from '../types';

export const VOLUME_LESSON_COUNTS: Record<CourseVolumeId, number> = {
  vol1: 144,
  vol2: 96,
  vol3: 60,
  vol4: 48
};

export const DEFAULT_VOLUME_PROGRESS: Record<CourseVolumeId, VolumeProgress> = {
  vol1: {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  },
  vol2: {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  },
  vol3: {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  },
  vol4: {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  }
};

/**
 * Free Trial Limits:
 * Volume 1 (第一册): Lessons 1-10 are free trial for all users.
 * Volume 1 Lessons 11-144: Requires VIP or Volume 1 activation.
 * Volume 2, 3, 4: Requires specific volume activation or VIP.
 */
export const FREE_TRIAL_LESSONS_LIMIT = 10;

/**
 * Check if the user has full access to a specific volume.
 */
export function isVolumeFullyUnlocked(profile: UserProfile, volumeId: CourseVolumeId = 'vol1'): boolean {
  if (!profile) return false;
  if (profile.isVip === true || String(profile.isVip) === 'true') return true;
  if (profile.activatedVolumes && Array.isArray(profile.activatedVolumes)) {
    const vols = profile.activatedVolumes.map(v => String(v).toLowerCase());
    if (vols.includes(volumeId.toLowerCase()) || vols.includes('all') || vols.includes('*')) {
      return true;
    }
  }
  return false;
}

/**
 * Check if the user has access to study a specific lesson in a volume.
 */
export function hasLessonAccess(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1',
  lessonId: number
): boolean {
  if (!profile) {
    return volumeId === 'vol1' && lessonId <= FREE_TRIAL_LESSONS_LIMIT;
  }
  if (isVolumeFullyUnlocked(profile, volumeId)) {
    return true;
  }
  // Free trial policy: Volume 1 lessons 1 to 10 are completely free
  if (volumeId === 'vol1' && lessonId <= FREE_TRIAL_LESSONS_LIMIT) {
    return true;
  }
  return false;
}

/**
 * Check if a lesson is locked due to needing VIP / Activation (Paywall),
 * vs locked because prior lessons haven't been completed yet.
 */
export function isLessonPaywallLocked(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1',
  lessonId: number
): boolean {
  return !hasLessonAccess(profile, volumeId, lessonId);
}

export interface LessonUnlockStatus {
  isUnlocked: boolean;          // Can be clicked and studied
  isCompleted: boolean;         // Has been passed/completed
  isCurrent: boolean;           // Currently active node
  hasAccess: boolean;           // Has VIP or trial access permission
  isPaywallLocked: boolean;     // Blocked because lacking activation code / VIP
  isProgressionLocked: boolean; // Blocked because previous lesson (N-1) is not completed yet
  lockReasonMsg: string;        // Friendly explanation message
}

/**
 * Determine full unlock status for a lesson:
 * Rule 1: Must have activation code / VIP (or be within free trial lessons 1-10 in Volume 1).
 * Rule 2: Must have completed the previous lesson (Lesson N - 1) before unlocking Lesson N.
 */
export function getLessonUnlockStatus(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1',
  lessonId: number
): LessonUnlockStatus {
  const volProg = getVolumeProgress(profile, volumeId);
  const completedList = Array.isArray(volProg.completedLessonIds) ? volProg.completedLessonIds : [];
  const unlockedList = Array.isArray(volProg.unlockedLessonIds) ? volProg.unlockedLessonIds : [1];
  const currentId = volProg.currentLessonId || 1;

  const hasAccess = hasLessonAccess(profile, volumeId, lessonId);
  const isPaywallLocked = !hasAccess;
  const isCompleted = completedList.includes(lessonId);
  const isCurrent = currentId === lessonId;

  // Lesson 1 is always the start node.
  // For lessonId > 1, previous lesson (lessonId - 1) must be completed.
  // If this lesson is already completed or recorded in unlockedList, it is progression-unlocked.
  const isPrevCompleted = lessonId === 1 || completedList.includes(lessonId - 1);
  const isProgressionUnlocked = isPrevCompleted || isCompleted || unlockedList.includes(lessonId);
  const isProgressionLocked = hasAccess && !isProgressionUnlocked;

  const isUnlocked = hasAccess && isProgressionUnlocked;

  let lockReasonMsg = '';
  if (isPaywallLocked) {
    if (volumeId === 'vol1') {
      lockReasonMsg = `🔒 VIP 专享关卡：第 ${lessonId} 课需使用 16 位激活码解锁（前 10 课免费试学）`;
    } else {
      const volMap: Record<string, string> = { vol2: '第二册', vol3: '第三册', vol4: '第四册' };
      lockReasonMsg = `🔒 需激活：${volMap[volumeId] || volumeId}第 ${lessonId} 课需使用激活码或开通 VIP 解锁`;
    }
  } else if (isProgressionLocked) {
    lockReasonMsg = `🔒 关卡锁定：请先学习并完成第 ${lessonId - 1} 课（打卡或通关对练）才能解锁本课！`;
  }

  return {
    isUnlocked,
    isCompleted,
    isCurrent,
    hasAccess,
    isPaywallLocked,
    isProgressionLocked,
    lockReasonMsg
  };
}

/**
 * Get isolated progress for a specific volume
 */
export function getVolumeProgress(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1'
): VolumeProgress {
  const totalCount = VOLUME_LESSON_COUNTS[volumeId] || 144;

  const existing = profile.volumeProgress?.[volumeId];
  if (existing) {
    const completedSet = new Set<number>(Array.isArray(existing.completedLessonIds) ? existing.completedLessonIds : []);
    const unlockedSet = new Set<number>(Array.isArray(existing.unlockedLessonIds) ? existing.unlockedLessonIds : [1]);
    
    // Always unlock Lesson 1
    unlockedSet.add(1);

    // Any completed lesson and its immediate successor (lesson + 1) are unlocked
    completedSet.forEach(id => {
      unlockedSet.add(id);
      if (id < totalCount) {
        unlockedSet.add(id + 1);
      }
    });

    if (existing.currentLessonId) {
      unlockedSet.add(existing.currentLessonId);
    }

    return {
      currentLessonId: existing.currentLessonId || 1,
      unlockedLessonIds: Array.from(unlockedSet).sort((a, b) => a - b),
      completedLessonIds: Array.from(completedSet).sort((a, b) => a - b)
    };
  }

  // Fallback for legacy profile
  if (volumeId === 'vol1' || !profile.selectedVolumeId || profile.selectedVolumeId === 'vol1') {
    const completedSet = new Set<number>(Array.isArray(profile.completedLessonIds) ? profile.completedLessonIds : []);
    const unlockedSet = new Set<number>(Array.isArray(profile.unlockedLessonIds) ? profile.unlockedLessonIds : [1]);
    unlockedSet.add(1);

    completedSet.forEach(id => {
      unlockedSet.add(id);
      if (id < totalCount) {
        unlockedSet.add(id + 1);
      }
    });

    if (profile.currentLessonId) {
      unlockedSet.add(profile.currentLessonId);
    }

    return {
      currentLessonId: profile.currentLessonId || 1,
      unlockedLessonIds: Array.from(unlockedSet).sort((a, b) => a - b),
      completedLessonIds: Array.from(completedSet).sort((a, b) => a - b)
    };
  }

  return DEFAULT_VOLUME_PROGRESS[volumeId] || {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  };
}

/**
 * Update volume-specific progress and sync active profile fields
 */
export function updateVolumeProgress(
  profile: UserProfile,
  volumeId: CourseVolumeId,
  updates: Partial<VolumeProgress>
): UserProfile {
  const currentVolProg = getVolumeProgress(profile, volumeId);
  const updatedVolProg: VolumeProgress = {
    ...currentVolProg,
    ...updates
  };

  const newVolumeProgress = {
    ...(profile.volumeProgress || {}),
    [volumeId]: updatedVolProg
  };

  const isCurrentActive = (profile.selectedVolumeId || 'vol1') === volumeId;

  return {
    ...profile,
    volumeProgress: newVolumeProgress,
    ...(isCurrentActive
      ? {
          currentLessonId: updatedVolProg.currentLessonId,
          unlockedLessonIds: updatedVolProg.unlockedLessonIds,
          completedLessonIds: updatedVolProg.completedLessonIds
        }
      : {})
  };
}

/**
 * Switch volume: save old volume progress, activate new volume progress
 */
export function switchActiveVolume(
  profile: UserProfile,
  newVolumeId: CourseVolumeId
): UserProfile {
  const oldVolumeId = profile.selectedVolumeId || 'vol1';
  
  // Save current active progress into old volume slot
  const updatedVolumeMap = {
    ...(profile.volumeProgress || {}),
    [oldVolumeId]: {
      currentLessonId: profile.currentLessonId || 1,
      unlockedLessonIds: profile.unlockedLessonIds || [1],
      completedLessonIds: profile.completedLessonIds || []
    }
  };

  // Load new volume progress
  const targetProg = updatedVolumeMap[newVolumeId] || DEFAULT_VOLUME_PROGRESS[newVolumeId] || {
    currentLessonId: 1,
    unlockedLessonIds: [1],
    completedLessonIds: []
  };

  return {
    ...profile,
    selectedVolumeId: newVolumeId,
    volumeProgress: updatedVolumeMap,
    currentLessonId: targetProg.currentLessonId,
    unlockedLessonIds: targetProg.unlockedLessonIds,
    completedLessonIds: targetProg.completedLessonIds
  };
}
