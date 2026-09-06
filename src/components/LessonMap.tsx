import React, { useState } from 'react';
import { Lesson, UserProfile, CourseVolumeId } from '../types';
import { getLessonById } from '../data/lessonsData';
import { getBiomeChapterByUnit } from '../data/storyData';
import { getVolumeProgress, hasLessonAccess } from '../utils/volumeProgress';
import {
  Lock, Play, MessageSquare, ArrowRight
} from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { GiantWorldMap } from './GiantWorldMap';
import { LessonStudyModal } from './LessonStudyModal';
import { MinecraftAvatar } from './MinecraftAvatar';

interface LessonMapProps {
  selectedVolumeId: CourseVolumeId;
  profile: UserProfile;
  onSelectLessonForChat: (lesson: Lesson) => void;
  onCompleteLesson: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
  onOpenVipModal?: () => void;
  onMasterWord?: (word: string) => void;
}

export const LessonMap: React.FC<LessonMapProps> = ({
  selectedVolumeId,
  profile,
  onSelectLessonForChat,
  onCompleteLesson,
  onAwardEmeralds,
  onOpenVipModal,
  onMasterWord
}) => {
  const volProg = getVolumeProgress(profile, selectedVolumeId);
  const currentLessonId = volProg.currentLessonId;
  const currentLesson = getLessonById(currentLessonId, selectedVolumeId);
  const currentUnitNum = Math.min(6, Math.max(1, Math.ceil(currentLessonId / 24)));
  const currentBiome = getBiomeChapterByUnit(currentUnitNum);
  const hasCurrentLessonAccess = hasLessonAccess(profile, selectedVolumeId, currentLesson.id);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleOpenCurrentLesson = () => {
    if (!hasCurrentLessonAccess) {
      playClickSound();
      if (onOpenVipModal) onOpenVipModal();
      return;
    }
    playClickSound();
    setActiveLesson(currentLesson);
  };

  return (
    <div className="space-y-4">
      {/* 1. Concise, High-Efficiency "Continue Learning" Quick-Action Hero Bar */}
      <div className="bg-gradient-to-r from-[#244318] via-[#355E20] to-[#1E3314] border-2 sm:border-3 border-black rounded-2xl p-3.5 sm:p-4 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative shrink-0">
            <MinecraftAvatar speaker="Alex" size={44} className="shadow-md" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border border-black flex items-center justify-center text-[9px] font-black text-black">
              ✓
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-black text-[10px] font-mono font-black px-1.5 py-0.2 rounded uppercase">
                当前主线
              </span>
              <span className="text-xs font-mono text-emerald-300 font-bold truncate">
                Unit {currentUnitNum} · {currentBiome.biomeNameZh}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black font-mono text-amber-200 truncate mt-0.5">
              Lesson {currentLesson.id}: {currentLesson.title}
              <span className="text-slate-300 text-xs font-normal ml-1.5 hidden md:inline font-sans">
                ({currentLesson.titleZh})
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
          {hasCurrentLessonAccess ? (
            <button
              type="button"
              onClick={handleOpenCurrentLesson}
              className="flex-1 sm:flex-none bg-[#FF6321] hover:bg-[#ff7a42] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black border border-black flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>进入学习 (第 {currentLesson.id} 课)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                if (onOpenVipModal) onOpenVipModal();
              }}
              className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black border border-black flex items-center justify-center space-x-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>激活 VIP 解锁第 {currentLesson.id} 课</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (!hasCurrentLessonAccess) {
                playClickSound();
                if (onOpenVipModal) onOpenVipModal();
                return;
              }
              onSelectLessonForChat(currentLesson);
            }}
            className="bg-black/40 hover:bg-black/60 text-emerald-300 border border-emerald-500/40 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-1 shrink-0 cursor-pointer"
            title="与 Alex 老师练习本课口语"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI 对练</span>
          </button>
        </div>
      </div>

      {/* 2. Canonical Panorama World Map (全景探险大地图) */}
      <GiantWorldMap
        profile={profile}
        onSelectLessonForChat={onSelectLessonForChat}
        onCompleteLesson={onCompleteLesson}
        onAwardEmeralds={onAwardEmeralds}
        onOpenVipModal={onOpenVipModal}
        onMasterWord={onMasterWord}
      />

      {/* Study Modal when opening from top hero bar */}
      {activeLesson && (
        <LessonStudyModal
          lesson={activeLesson}
          profile={profile}
          onClose={() => setActiveLesson(null)}
          onMasterWord={onMasterWord}
          onCompleteLesson={(lessonId) => {
            if (onCompleteLesson) {
              onCompleteLesson(lessonId);
            }
          }}
          onStartPractice={(lesson) => {
            setActiveLesson(null);
            onSelectLessonForChat(lesson);
          }}
          onAwardEmeralds={onAwardEmeralds}
          onOpenVipModal={onOpenVipModal}
        />
      )}
    </div>
  );
};
