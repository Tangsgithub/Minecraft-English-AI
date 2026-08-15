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
  if (profile.isVip) return true;
  if (profile.activatedVolumes && Array.isArray(profile.activatedVolumes)) {
    if (profile.activatedVolumes.includes(volumeId) || profile.activatedVolumes.includes('all' as any)) {
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

/**
 * Get isolated progress for a specific volume
 */
export function getVolumeProgress(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1'
): VolumeProgress {
  const isVolFullyUnlocked = isVolumeFullyUnlocked(profile, volumeId);
  const totalLessons = VOLUME_LESSON_COUNTS[volumeId] || 144;
  const allLessonIds = Array.from({ length: totalLessons }, (_, i) => i + 1);

  const existing = profile.volumeProgress?.[volumeId];
  if (existing) {
    const unlockedSet = new Set<number>(existing.unlockedLessonIds || [1]);
    unlockedSet.add(1);

    if (isVolFullyUnlocked) {
      allLessonIds.forEach(id => unlockedSet.add(id));
    } else {
      if (existing.currentLessonId) {
        for (let i = 1; i <= existing.currentLessonId; i++) {
          unlockedSet.add(i);
        }
      }
      if (existing.completedLessonIds && existing.completedLessonIds.length > 0) {
        existing.completedLessonIds.forEach(id => {
          unlockedSet.add(id);
          unlockedSet.add(id + 1);
        });
      }
    }

    return {
      currentLessonId: existing.currentLessonId || 1,
      unlockedLessonIds: Array.from(unlockedSet).sort((a, b) => a - b),
      completedLessonIds: Array.isArray(existing.completedLessonIds) ? existing.completedLessonIds : []
    };
  }

  // Fallback for legacy profile that only had global progress on vol1
  if (volumeId === 'vol1' || !profile.selectedVolumeId || profile.selectedVolumeId === 'vol1') {
    if (isVolFullyUnlocked) {
      return {
        currentLessonId: profile.currentLessonId || 1,
        unlockedLessonIds: allLessonIds,
        completedLessonIds: profile.completedLessonIds || []
      };
    }
    return {
      currentLessonId: profile.currentLessonId || 1,
      unlockedLessonIds: profile.unlockedLessonIds?.length ? profile.unlockedLessonIds : [1],
      completedLessonIds: profile.completedLessonIds || []
    };
  }

  // Brand new volume progress
  if (isVolFullyUnlocked) {
    return {
      currentLessonId: 1,
      unlockedLessonIds: allLessonIds,
      completedLessonIds: []
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
