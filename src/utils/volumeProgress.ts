import { UserProfile, CourseVolumeId, VolumeProgress } from '../types';

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
 * Get isolated progress for a specific volume
 */
export function getVolumeProgress(
  profile: UserProfile,
  volumeId: CourseVolumeId = 'vol1'
): VolumeProgress {
  const existing = profile.volumeProgress?.[volumeId];
  if (existing) {
    const unlockedSet = new Set<number>(existing.unlockedLessonIds || [1]);
    unlockedSet.add(1);
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

    return {
      currentLessonId: existing.currentLessonId || 1,
      unlockedLessonIds: Array.from(unlockedSet).sort((a, b) => a - b),
      completedLessonIds: Array.isArray(existing.completedLessonIds) ? existing.completedLessonIds : []
    };
  }

  // Fallback for legacy profile that only had global progress on vol1
  if (volumeId === 'vol1' || !profile.selectedVolumeId || profile.selectedVolumeId === 'vol1') {
    return {
      currentLessonId: profile.currentLessonId || 1,
      unlockedLessonIds: profile.unlockedLessonIds?.length ? profile.unlockedLessonIds : [1],
      completedLessonIds: profile.completedLessonIds || []
    };
  }

  // Brand new volume progress (e.g. vol2 defaults to lesson 1 unlocked only)
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
