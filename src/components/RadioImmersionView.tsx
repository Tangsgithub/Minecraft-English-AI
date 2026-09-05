import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lesson, UserProfile, CourseVolumeId, ChatMessage } from '../types';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Shuffle, 
  Clock, Sparkles, Disc, List, EyeOff, Award, ChevronDown, ChevronUp, ChevronRight, Moon, X,
  BookOpen, Mic, Music, HelpCircle, Brain, ArrowRight, BookMarked,
  Plus, Search, Layers
} from 'lucide-react';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { LESSONS_DATA } from '../data/lessonsData';
import { RADIO_STORIES, RadioStory, StoryVocab } from '../data/radioStoriesData';
import { fetchCustomStories } from '../services/customStoriesService';
import { CustomStoryImporterModal } from './CustomStoryImporterModal';
import { MinecraftAvatar } from './MinecraftAvatar';

export type RadioChannel = 'lessons' | 'mc_stories' | 'classic_fables';
export type PlayMode = 'three_times' | 'sequential' | 'shuffle' | 'single_loop';
export type SubtitleMode = 'bilingual' | 'english_only' | 'chinese_only' | 'blind_listening';
export type PlaylistScope = 'all' | 'current' | 'recent5' | 'smart_review';

export interface PlaylistItem {
  id: string;
  lessonId: number;
  lessonTitle: string;
  speaker: string;
  avatar?: string;
  english: string;
  chinese: string;
  type: 'dialogue' | 'target_sentence' | 'vocab';
  discName: string;
  discColor: string;
}

const MINECRAFT_DISCS = [
  { name: 'Cat', color: 'from-emerald-500 to-teal-700', border: 'border-emerald-400', glow: 'rgba(16,185,129,0.3)', icon: '🟢' },
  { name: 'Blocks', color: 'from-amber-500 to-orange-700', border: 'border-amber-400', glow: 'rgba(245,158,11,0.3)', icon: '🟠' },
  { name: 'Chirp', color: 'from-rose-500 to-red-700', border: 'border-rose-400', glow: 'rgba(244,63,94,0.3)', icon: '🔴' },
  { name: 'Mall', color: 'from-purple-500 to-indigo-700', border: 'border-purple-400', glow: 'rgba(168,85,247,0.3)', icon: '🟣' },
  { name: 'Mellohi', color: 'from-fuchsia-500 to-pink-700', border: 'border-fuchsia-400', glow: 'rgba(236,72,153,0.3)', icon: '🌸' },
  { name: 'Pigstep', color: 'from-amber-600 to-yellow-800', border: 'border-yellow-500', glow: 'rgba(234,179,8,0.3)', icon: '🟡' },
  { name: 'Stal', color: 'from-slate-700 to-slate-950', border: 'border-slate-400', glow: 'rgba(148,163,184,0.2)', icon: '⚫' },
  { name: 'Netherite (智能复盘)', color: 'from-purple-900 via-indigo-900 to-slate-950', border: 'border-purple-400', glow: 'rgba(147,51,234,0.4)', icon: '🌌' }
];

// High-frequency English Liaison & Connected Speech rules
const COMMON_LINKINGS: [RegExp, string][] = [
  [/\b(is)\s+(this|that|it|a|an|in|on|at|your|he|she)\b/gi, '$1‿$2'],
  [/\b(this|that)\s+(is|a|an)\b/gi, '$1‿$2'],
  [/\b(an)\s+([aeiou]\w*)\b/gi, '$1‿$2'],
  [/\b(look|pick|take|put|turn|come|stand|sit|get|wake|give|make|leave|clean|dress|run)\s+(at|it|up|on|in|out|off|away|over|down|me|us|her|him|all)\b/gi, '$1‿$2'],
  [/\b(not)\s+(at\s+all|at|a|it)\b/gi, '$1‿$2'],
  [/\b(thank)\s+(you)\b/gi, '$1‿$2'],
  [/\b(excuse)\s+(me)\b/gi, '$1‿$2'],
  [/\b(good)\s+(morning|afternoon|evening)\b/gi, '$1‿$2'],
  [/\b(here|there|where|what|how|who)\s+(is|are)\b/gi, '$1‿$2'],
  [/\b(nice|glad)\s+(to)\s+(meet)\s+(you)\b/gi, '$1 $2 $3‿$4'],
  [/\b(first)\s+(of)\s+(all)\b/gi, '$1‿$2‿$3'],
];

// Prosodic Sentence Component with clean liaison highlights
const ProsodicSentence: React.FC<{ text: string; showProsody: boolean; onWordClick?: (word: string) => void }> = ({ text, showProsody, onWordClick }) => {
  if (!showProsody || !text) {
    return <span>{text}</span>;
  }

  let linkedText = text;
  for (const [pattern, replacement] of COMMON_LINKINGS) {
    linkedText = linkedText.replace(pattern, replacement);
  }

  const tokens = linkedText.split(' ').filter(Boolean);
  const weakWords = new Set([
    'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'to', 'of', 'in', 'on', 'at', 
    'for', 'with', 'and', 'or', 'but', 'it', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
  ]);

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5">
      {tokens.map((token, i) => {
        const cleanWord = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const hasLinking = token.includes('‿');
        const isWeak = weakWords.has(cleanWord) && !hasLinking;

        if (hasLinking) {
          const displayToken = token.replace(/‿/g, ' ‿ ');
          return (
            <span 
              key={`linked-${i}`} 
              onClick={(e) => {
                e.stopPropagation();
                if (onWordClick) onWordClick(cleanWord);
              }}
              className="inline-block px-1.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-200 font-black shadow-xs cursor-pointer hover:bg-amber-400/30 transition-colors"
              title="连读 (Linking) - 点击朗读"
            >
              {displayToken}
            </span>
          );
        }

        if (isWeak) {
          return (
            <span 
              key={`weak-${i}`} 
              onClick={(e) => {
                e.stopPropagation();
                if (onWordClick) onWordClick(cleanWord);
              }}
              className="text-slate-400 font-medium opacity-80 cursor-pointer hover:text-slate-200 transition-colors" 
              title="弱读词 (Weak Form)"
            >
              {token}
            </span>
          );
        }

        // Content / Stressed word
        return (
          <span 
            key={`stress-${i}`} 
            onClick={(e) => {
              e.stopPropagation();
              if (onWordClick) onWordClick(cleanWord);
            }}
            className="text-white font-black tracking-tight relative cursor-pointer hover:text-amber-200 transition-colors" 
            title="句子重音 (Sentence Stress) - 点击朗读"
          >
            {token}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full opacity-70 pointer-events-none" />
          </span>
        );
      })}
    </span>
  );
};

export interface RadioImmersionViewProps {
  lessons?: Lesson[];
  currentLessonId?: number;
  selectedVolumeId?: CourseVolumeId;
  profile?: UserProfile;
  activeLessonForChat?: Lesson | null;
  chatMessages?: ChatMessage[];
  setChatMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardEmeralds?: (emeralds: number, xp: number, reason?: string) => void;
  onCompleteLesson?: (lessonId: number) => void;
  onOpenSettings?: () => void;
  onCheckMission?: (userText: string) => void;
  onOpenUserProfile?: () => void;
  onOpenVipModal?: () => void;
  onToggleMasterWord?: (word: string) => void;
  onSelectLessonForChat?: (lesson: Lesson) => void;
  initialChannel?: RadioChannel;
  listenedMinutes?: number;
}

export const RadioImmersionView: React.FC<RadioImmersionViewProps> = ({
  lessons,
  currentLessonId = 1,
  selectedVolumeId: _selectedVolumeId = 'vol1',
  profile,
  activeLessonForChat: _activeLessonForChat,
  chatMessages: _chatMessages,
  setChatMessages: _setChatMessages,
  onAwardEmeralds,
  onCompleteLesson: _onCompleteLesson,
  onOpenSettings: _onOpenSettings,
  onCheckMission: _onCheckMission,
  onOpenUserProfile: _onOpenUserProfile,
  onOpenVipModal: _onOpenVipModal,
  onToggleMasterWord: _onToggleMasterWord,
  onSelectLessonForChat: _onSelectLessonForChat,
  initialChannel = 'lessons',
  listenedMinutes: externalListenedMinutes
}) => {
  // 1. Resolve effective lessons securely (Book 1 144 Lessons)
  const effectiveLessons: Lesson[] = lessons && lessons.length > 0
    ? lessons
    : LESSONS_DATA;

  // Custom Stories state & dynamic loading from Cloud DB
  const [customStories, setCustomStories] = useState<RadioStory[]>([]);
  const [showCustomImporter, setShowCustomImporter] = useState<boolean>(false);

  useEffect(() => {
    fetchCustomStories().then(stories => {
      if (stories && Array.isArray(stories) && stories.length > 0) {
        setCustomStories(stories);
      }
    }).catch(err => {
      console.warn('Failed to load custom stories:', err);
    });
  }, []);

  const allStories = useMemo(() => {
    return [...customStories, ...RADIO_STORIES];
  }, [customStories]);

  // Channel & Scope States
  const [currentChannel, setCurrentChannel] = useState<RadioChannel>(initialChannel === 'lessons' ? 'lessons' : initialChannel);
  const [playlistScope, setPlaylistScope] = useState<PlaylistScope>('all');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(RADIO_STORIES[0].id);

  // Playback States
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [storyParagraphIdx, setStoryParagraphIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playMode, setPlayMode] = useState<PlayMode>('sequential');
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('bilingual');
  const [enableEchoPause, setEnableEchoPause] = useState<boolean>(false);
  const [showProsodyCues, setShowProsodyCues] = useState<boolean>(true);
  const [showProsodyHelp, setShowProsodyHelp] = useState<boolean>(false);

  // Echo Pause & Sleep Timer States
  const [isEchoPausing, setIsEchoPausing] = useState<boolean>(false);
  const [echoRemainingSeconds, setEchoRemainingSeconds] = useState<number>(0);
  const [echoTotalSeconds, setEchoTotalSeconds] = useState<number>(0);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepRemainingSeconds, setSleepRemainingSeconds] = useState<number | null>(null);
  const [discRotation, setDiscRotation] = useState<number>(0);
  const [internalListenedMinutes, setInternalListenedMinutes] = useState<number>(0);
  const listenedMinutes = typeof externalListenedMinutes === 'number' ? externalListenedMinutes : internalListenedMinutes;

  // Story Vocab & Interaction States
  const [showVocabLoot, setShowVocabLoot] = useState<boolean>(false);
  const [collectedVocabWords, setCollectedVocabWords] = useState<Set<string>>(new Set());

  // Lesson Selection, Filter & Accordion Folding States
  const [selectedLessonId, setSelectedLessonId] = useState<number>(currentLessonId || 1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTracklistOpen, setIsTracklistOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [collapsedLessonIds, setCollapsedLessonIds] = useState<Set<number>>(new Set());
  const [isGroupedByLesson, setIsGroupedByLesson] = useState<boolean>(true);
  const activeTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentLessonId) {
      setSelectedLessonId(currentLessonId);
    }
  }, [currentLessonId]);

  // References for live callback closures
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
  const storyParagraphIdxRef = useRef(storyParagraphIdx);
  storyParagraphIdxRef.current = storyParagraphIdx;
  const playModeRef = useRef(playMode);
  playModeRef.current = playMode;
  const speechRateRef = useRef(speechRate);
  speechRateRef.current = speechRate;
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const echoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const enableEchoPauseRef = useRef(enableEchoPause);
  enableEchoPauseRef.current = enableEchoPause;

  // Filter stories by category
  const activeStories = useMemo(() => {
    if (currentChannel === 'mc_stories') {
      return allStories.filter(s => s.category === 'mc_adventure');
    }
    if (currentChannel === 'classic_fables') {
      return allStories.filter(s => s.category === 'classic_fables');
    }
    return allStories;
  }, [currentChannel, allStories]);

  const currentStory = useMemo<RadioStory>(() => {
    const foundInActive = activeStories.find(s => s.id === selectedStoryId);
    if (foundInActive) return foundInActive;
    return activeStories[0] || allStories[0] || RADIO_STORIES[0];
  }, [selectedStoryId, activeStories, allStories]);

  // Lesson Playlist with Scope Filter, Lesson Selector & Complete Sentences
  const playlist = useMemo<PlaylistItem[]>(() => {
    if (playlistScope === 'smart_review') {
      const masteredSet = new Set((profile?.masteredWords || []).map(w => w.toLowerCase()));
      const smartItems: PlaylistItem[] = [];

      effectiveLessons.forEach((lesson) => {
        const seen = new Set<string>();
        if (lesson.targetSentences && lesson.targetSentences.length > 0) {
          lesson.targetSentences.forEach((sentence, sIdx) => {
            const norm = sentence.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            seen.add(norm);
            smartItems.push({
              id: `smart_l${lesson.id}_sent_${sIdx}`,
              lessonId: lesson.id,
              lessonTitle: `L${lesson.id}: ${lesson.title} [智能复盘]`,
              speaker: sIdx % 2 === 0 ? 'Alex' : 'Steve',
              avatar: sIdx % 2 === 0 ? '👩‍🦰' : '👦',
              english: sentence,
              chinese: lesson.targetSentenceTranslations?.[sIdx] || lesson.grammarNote || '核心重点句型',
              type: 'target_sentence',
              discName: 'Netherite (智能复盘)',
              discColor: 'from-purple-900 via-indigo-900 to-slate-950'
            });
          });
        }

        const hasUnmastered = (lesson.vocabulary || []).some(v => !masteredSet.has(v.word.toLowerCase()));
        if (hasUnmastered && lesson.dialogueScript && lesson.dialogueScript.length > 0) {
          lesson.dialogueScript.forEach((turn, tIdx) => {
            const norm = turn.text.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!seen.has(norm)) {
              seen.add(norm);
              smartItems.push({
                id: `smart_l${lesson.id}_turn_${tIdx}`,
                lessonId: lesson.id,
                lessonTitle: `L${lesson.id}: ${lesson.title} [语境强化]`,
                speaker: turn.speaker || 'Alex',
                avatar: turn.avatar,
                english: turn.text,
                chinese: turn.translation || '高频易错情境对话',
                type: 'dialogue',
                discName: 'Netherite (智能复盘)',
                discColor: 'from-purple-900 via-indigo-900 to-slate-950'
              });
            }
          });
        }
      });

      if (smartItems.length > 0) return smartItems;
    }

    let scopedLessons = [...effectiveLessons];
    if (playlistScope === 'current') {
      const targetId = selectedLessonId || currentLessonId || 1;
      scopedLessons = effectiveLessons.filter(l => l.id === targetId);
      if (scopedLessons.length === 0 && effectiveLessons.length > 0) {
        scopedLessons = [effectiveLessons[0]];
      }
    } else if (playlistScope === 'recent5') {
      const targetId = selectedLessonId || currentLessonId || 1;
      const currIdx = effectiveLessons.findIndex(l => l.id === targetId);
      const endIdx = currIdx >= 0 ? currIdx + 1 : 5;
      const startIdx = Math.max(0, endIdx - 5);
      scopedLessons = effectiveLessons.slice(startIdx, endIdx);
    } else {
      // 'all' -> all 144 lessons
      scopedLessons = effectiveLessons;
    }

    const items: PlaylistItem[] = [];
    scopedLessons.forEach((lesson, lIdx) => {
      const discInfo = MINECRAFT_DISCS[lIdx % (MINECRAFT_DISCS.length - 1)];
      const seenTexts = new Set<string>();

      // 1. Dialogue Turns
      if (lesson.dialogueScript && lesson.dialogueScript.length > 0) {
        lesson.dialogueScript.forEach((turn, tIdx) => {
          const norm = turn.text.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
          seenTexts.add(norm);
          items.push({
            id: `l${lesson.id}_turn_${tIdx}`,
            lessonId: lesson.id,
            lessonTitle: `L${lesson.id}: ${lesson.title}`,
            speaker: turn.speaker || (tIdx % 2 === 0 ? 'Steve' : 'Alex'),
            avatar: turn.avatar,
            english: turn.text,
            chinese: turn.translation || '课文情境对话',
            type: 'dialogue',
            discName: discInfo.name,
            discColor: discInfo.color
          });
        });
      }

      // 2. Target drill sentences (both core sentences & textbook practice patterns)
      if (lesson.targetSentences && lesson.targetSentences.length > 0) {
        lesson.targetSentences.forEach((sentence, sIdx) => {
          const norm = sentence.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!seenTexts.has(norm)) {
            seenTexts.add(norm);
            const spk = sIdx % 2 === 0 ? 'Steve' : 'Alex';
            items.push({
              id: `l${lesson.id}_sent_${sIdx}`,
              lessonId: lesson.id,
              lessonTitle: `L${lesson.id}: ${lesson.title}`,
              speaker: spk,
              avatar: spk === 'Steve' ? '👦' : '👩‍🦰',
              english: sentence,
              chinese: lesson.targetSentenceTranslations?.[sIdx] || lesson.grammarNote || '核心重点句型',
              type: 'target_sentence',
              discName: discInfo.name,
              discColor: discInfo.color
            });
          }
        });
      }

      // 3. Fallback if both empty
      if (items.filter(it => it.lessonId === lesson.id).length === 0 &&
          lesson.vocabulary && lesson.vocabulary.length > 0) {
        lesson.vocabulary.slice(0, 5).forEach((v, vIdx) => {
          items.push({
            id: `l${lesson.id}_vocab_${vIdx}`,
            lessonId: lesson.id,
            lessonTitle: `L${lesson.id}: ${lesson.title}`,
            speaker: 'Alex',
            english: v.word,
            chinese: `${v.phonetic ? `[${v.phonetic}] ` : ''}${v.meaning || '核心词汇'}`,
            type: 'vocab',
            discName: discInfo.name,
            discColor: discInfo.color
          });
        });
      }
    });

    if (items.length === 0) {
      items.push({
        id: 'fallback_track_1',
        lessonId: 1,
        lessonTitle: 'L1: Excuse me!',
        speaker: 'Alex',
        english: 'Excuse me! Is this your handbag?',
        chinese: '对不起，打扰一下！这是您的手提包吗？',
        type: 'target_sentence',
        discName: 'Cat',
        discColor: 'from-emerald-500 to-teal-700'
      });
    }

    return items;
  }, [effectiveLessons, playlistScope, selectedLessonId, currentLessonId, profile?.masteredWords]);

  const playlistRef = useRef(playlist);
  playlistRef.current = playlist;

  // Filtered playlist by user search query
  const filteredPlaylist = useMemo(() => {
    if (!searchQuery.trim()) return playlist;
    const q = searchQuery.toLowerCase().trim();
    return playlist.filter(item => 
      item.english.toLowerCase().includes(q) || 
      item.chinese.toLowerCase().includes(q) ||
      item.lessonTitle.toLowerCase().includes(q)
    );
  }, [playlist, searchQuery]);

  // Group filtered playlist by Lesson for collapsible accordion view
  const groupedPlaylist = useMemo(() => {
    const groups: {
      lessonId: number;
      lessonTitle: string;
      items: Array<{
        item: PlaylistItem;
        realIdx: number;
        filteredIdx: number;
      }>;
    }[] = [];
    const groupMap = new Map<number, typeof groups[0]>();

    filteredPlaylist.forEach((item, fIdx) => {
      const realIdx = playlist.findIndex(p => p.id === item.id);
      const targetIdx = realIdx >= 0 ? realIdx : fIdx;

      let group = groupMap.get(item.lessonId);
      if (!group) {
        group = {
          lessonId: item.lessonId,
          lessonTitle: item.lessonTitle.replace(/\[.*?\]/, '').trim(),
          items: []
        };
        groupMap.set(item.lessonId, group);
        groups.push(group);
      }
      group.items.push({
        item,
        realIdx: targetIdx,
        filteredIdx: fIdx
      });
    });

    return groups;
  }, [filteredPlaylist, playlist]);

  // Safe current items
  const safeCurrentIndex = currentIndex < playlist.length ? currentIndex : 0;
  const currentLessonItem = playlist[safeCurrentIndex] || playlist[0];
  const currentParagraph = currentStory.paragraphs[storyParagraphIdx] || currentStory.paragraphs[0];

  // Auto-expand the currently playing lesson
  useEffect(() => {
    if (currentLessonItem?.lessonId) {
      setCollapsedLessonIds(prev => {
        if (prev.has(currentLessonItem.lessonId)) {
          const next = new Set(prev);
          next.delete(currentLessonItem.lessonId);
          return next;
        }
        return prev;
      });
    }
  }, [safeCurrentIndex, currentLessonItem?.lessonId]);

  // When search query is entered, auto-expand all matching lessons
  useEffect(() => {
    if (searchQuery.trim()) {
      setCollapsedLessonIds(new Set());
    }
  }, [searchQuery]);

  // When playlist scope changes to 'all' or 'recent5', collapse other lessons to keep UI tidy
  useEffect(() => {
    if (playlistScope === 'all' && groupedPlaylist.length > 2) {
      const currentActiveLessonId = currentLessonItem?.lessonId || selectedLessonId || 1;
      const initialCollapsed = new Set<number>();
      groupedPlaylist.forEach(g => {
        if (g.lessonId !== currentActiveLessonId) {
          initialCollapsed.add(g.lessonId);
        }
      });
      setCollapsedLessonIds(initialCollapsed);
    } else {
      setCollapsedLessonIds(new Set());
    }
  }, [playlistScope]);

  const toggleLessonCollapse = (lessonId: number) => {
    playClickSound();
    setCollapsedLessonIds(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const handleCollapseAllLessons = () => {
    playClickSound();
    const currentActiveLessonId = currentLessonItem?.lessonId || selectedLessonId || 1;
    const allLessonIds = new Set<number>();
    groupedPlaylist.forEach(g => {
      if (g.lessonId !== currentActiveLessonId) {
        allLessonIds.add(g.lessonId);
      }
    });
    setCollapsedLessonIds(allLessonIds);
  };

  const handleExpandAllLessons = () => {
    playClickSound();
    setCollapsedLessonIds(new Set());
  };

  const handleFocusCurrentLesson = () => {
    playClickSound();
    const activeLessonId = currentLessonItem?.lessonId || selectedLessonId;
    setCollapsedLessonIds(prev => {
      const next = new Set(prev);
      next.delete(activeLessonId);
      return next;
    });
    setTimeout(() => {
      activeTrackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Helper to clear pending timeouts and echo intervals
  const clearPendingPlaybackTimer = () => {
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }
    if (echoIntervalRef.current) {
      clearInterval(echoIntervalRef.current);
      echoIntervalRef.current = null;
    }
    setIsEchoPausing(false);
  };

  // Disc rotation animation
  useEffect(() => {
    let animId: any;
    if (isPlaying) {
      const step = () => {
        setDiscRotation(prev => (prev + 1.2) % 360);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  // Sleep Timer Countdown
  const hasActiveSleepTimer = sleepRemainingSeconds !== null && sleepRemainingSeconds > 0;
  useEffect(() => {
    let timer: any;
    if (hasActiveSleepTimer && isPlaying) {
      timer = setInterval(() => {
        setSleepRemainingSeconds(prev => {
          if (prev === null || prev <= 1) {
            stopPlayback();
            setSleepTimerMinutes(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [hasActiveSleepTimer, isPlaying]);

  // Track listening minutes for emerald rewards
  useEffect(() => {
    let listenTimer: any;
    if (isPlaying) {
      listenTimer = setInterval(() => {
        setInternalListenedMinutes(prev => {
          const next = prev + 1;
          if (next % 3 === 0 && onAwardEmeralds) {
            onAwardEmeralds(2, 10, '沉浸式磨耳朵电台听力奖励');
            playEmeraldSound();
          }
          return next;
        });
      }, 60000);
    }
    return () => clearInterval(listenTimer);
  }, [isPlaying, onAwardEmeralds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPendingPlaybackTimer();
      stopSpeech();
    };
  }, []);

  const stopPlayback = () => {
    clearPendingPlaybackTimer();
    stopSpeech();
    setIsPlaying(false);
  };

  // Echo Pause Interval
  const startEchoPause = (durationSec: number, onComplete: () => void) => {
    setIsEchoPausing(true);
    setEchoRemainingSeconds(durationSec);
    setEchoTotalSeconds(durationSec);

    let currentSec = durationSec;
    echoIntervalRef.current = setInterval(() => {
      currentSec -= 1;
      setEchoRemainingSeconds(Math.max(0, currentSec));
      if (currentSec <= 0) {
        if (echoIntervalRef.current) {
          clearInterval(echoIntervalRef.current);
          echoIntervalRef.current = null;
        }
        setIsEchoPausing(false);
        onComplete();
      }
    }, 1000);
  };

  // Play Story Paragraph
  const playStoryParagraph = (story: RadioStory, pIdx: number = 0) => {
    clearPendingPlaybackTimer();
    stopSpeech();

    const targetIdx = Math.max(0, Math.min(pIdx, story.paragraphs.length - 1));
    setStoryParagraphIdx(targetIdx);
    storyParagraphIdxRef.current = targetIdx;
    setIsPlaying(true);

    const p = story.paragraphs[targetIdx];
    if (!p) return;

    speakText(p.english, () => {
      if (!isPlayingRef.current) return;

      const wordCount = p.english.split(/\s+/).filter(Boolean).length;
      const calculatedEchoDuration = Math.max(3, Math.min(6, Math.ceil(wordCount * 0.4)));

      const proceedToNext = () => {
        if (!isPlayingRef.current) return;

        if (targetIdx + 1 >= story.paragraphs.length) {
          // Finished story: award emeralds & loop
          if (onAwardEmeralds) {
            onAwardEmeralds(5, 20, `完整听完故事《${story.titleZh}》`);
            playEmeraldSound();
          }

          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playStoryParagraph(story, 0);
            }
          }, 1500);
        } else {
          // Play next paragraph with natural storytelling pacing
          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playStoryParagraph(story, targetIdx + 1);
            }
          }, 800);
        }
      };

      if (enableEchoPauseRef.current) {
        startEchoPause(calculatedEchoDuration, proceedToNext);
      } else {
        proceedToNext();
      }
    }, {
      rate: speechRateRef.current,
      speaker: p.speaker || story.narrator
    });
  };

  // Play Lesson Track
  const playCurrentLessonTrack = (indexToPlay?: number, customRepeatStep: number = 1) => {
    clearPendingPlaybackTimer();
    stopSpeech();

    const currentList = playlistRef.current;
    const targetIdx = typeof indexToPlay === 'number' 
      ? Math.max(0, Math.min(indexToPlay, currentList.length - 1))
      : currentIndexRef.current;
    
    const item = currentList[targetIdx];
    if (!item) return;

    setCurrentIndex(targetIdx);
    currentIndexRef.current = targetIdx;
    setIsPlaying(true);
    setRepeatCount(customRepeatStep);

    speakText(item.english, () => {
      if (!isPlayingRef.current) return;

      const activeMode = playModeRef.current;
      const wordCount = item.english.split(/\s+/).filter(Boolean).length;
      const calculatedEchoDuration = Math.max(2, Math.min(5, Math.ceil(wordCount * 0.45)));

      if (activeMode === 'three_times') {
        if (customRepeatStep < 3) {
          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playCurrentLessonTrack(targetIdx, customRepeatStep + 1);
            }
          }, 800);
        } else {
          if (enableEchoPauseRef.current) {
            startEchoPause(calculatedEchoDuration, () => {
              handleNextTrack(targetIdx);
            });
          } else {
            playbackTimerRef.current = setTimeout(() => {
              if (isPlayingRef.current) {
                handleNextTrack(targetIdx);
              }
            }, 1000);
          }
        }
      } else if (activeMode === 'single_loop') {
        if (enableEchoPauseRef.current) {
          startEchoPause(calculatedEchoDuration, () => {
            playCurrentLessonTrack(targetIdx, 1);
          });
        } else {
          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              playCurrentLessonTrack(targetIdx, 1);
            }
          }, 800);
        }
      } else {
        if (enableEchoPauseRef.current) {
          startEchoPause(calculatedEchoDuration, () => {
            handleNextTrack(targetIdx);
          });
        } else {
          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              handleNextTrack(targetIdx);
            }
          }, 800);
        }
      }
    }, { 
      rate: speechRateRef.current,
      speaker: item.speaker
    });
  };

  // Master Toggle Play
  const handleTogglePlay = () => {
    playClickSound();
    if (isPlaying) {
      stopPlayback();
    } else {
      if (currentChannel === 'lessons') {
        playCurrentLessonTrack(currentIndexRef.current, 1);
      } else {
        playStoryParagraph(currentStory, storyParagraphIdxRef.current);
      }
    }
  };

  // Master Next Track
  const handleNextTrack = (fromIdx?: number) => {
    clearPendingPlaybackTimer();
    if (currentChannel === 'lessons') {
      const currentList = playlistRef.current;
      if (currentList.length === 0) return;

      const baseIdx = typeof fromIdx === 'number' ? fromIdx : currentIndexRef.current;
      let nextIdx = baseIdx + 1;
      if (playModeRef.current === 'shuffle') {
        nextIdx = Math.floor(Math.random() * currentList.length);
      } else if (nextIdx >= currentList.length) {
        nextIdx = 0;
      }
      playCurrentLessonTrack(nextIdx, 1);
    } else {
      const nextPIdx = (storyParagraphIdxRef.current + 1) % currentStory.paragraphs.length;
      playStoryParagraph(currentStory, nextPIdx);
    }
  };

  // Master Prev Track
  const handlePrevTrack = () => {
    playClickSound();
    clearPendingPlaybackTimer();
    if (currentChannel === 'lessons') {
      const currentList = playlistRef.current;
      if (currentList.length === 0) return;
      const prevIdx = (currentIndexRef.current - 1 + currentList.length) % currentList.length;
      playCurrentLessonTrack(prevIdx, 1);
    } else {
      const prevPIdx = (storyParagraphIdxRef.current - 1 + currentStory.paragraphs.length) % currentStory.paragraphs.length;
      playStoryParagraph(currentStory, prevPIdx);
    }
  };

  // Channel Switcher Handler
  const handleChannelSwitch = (channel: RadioChannel) => {
    playClickSound();
    stopPlayback();
    setCurrentChannel(channel);
    setCurrentIndex(0);
    setStoryParagraphIdx(0);
    storyParagraphIdxRef.current = 0;
    setShowVocabLoot(false);

    if (channel === 'mc_stories') {
      const firstMc = allStories.find(s => s.category === 'mc_adventure');
      if (firstMc) {
        setSelectedStoryId(firstMc.id);
      }
    } else if (channel === 'classic_fables') {
      const firstFable = allStories.find(s => s.category === 'classic_fables');
      if (firstFable) {
        setSelectedStoryId(firstFable.id);
      }
    }
  };

  // Scope Change Handler (Lessons)
  const handleScopeChange = (scope: PlaylistScope) => {
    playClickSound();
    stopPlayback();
    setPlaylistScope(scope);
    setCurrentIndex(0);
  };

  // Story Vocab Collector
  const handleCollectVocab = (vocab: StoryVocab) => {
    playClickSound();
    speakText(vocab.word, { speaker: 'Alex', rate: 0.9 });
    if (!collectedVocabWords.has(vocab.word)) {
      setCollectedVocabWords(prev => new Set(prev).add(vocab.word));
      if (onAwardEmeralds) {
        onAwardEmeralds(1, 5, `掌握故事词汇: ${vocab.word}`);
        playEmeraldSound();
      }
    }
  };

  // Sleep Timer Setter
  const setTimerPreset = (minutes: number | null) => {
    playClickSound();
    setSleepTimerMinutes(minutes);
    if (minutes === null) {
      setSleepRemainingSeconds(null);
    } else {
      setSleepRemainingSeconds(minutes * 60);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkipEchoPause = () => {
    clearPendingPlaybackTimer();
    if (currentChannel === 'lessons') {
      if (playMode === 'single_loop') {
        playCurrentLessonTrack(currentIndexRef.current, 1);
      } else {
        handleNextTrack(currentIndexRef.current);
      }
    } else {
      handleNextTrack();
    }
  };

  // Current display attributes based on channel
  const displayDisc = currentChannel === 'lessons'
    ? {
        name: currentLessonItem?.discName || 'Cat',
        color: currentLessonItem?.discColor || 'from-emerald-500 to-teal-700',
        icon: '🎵'
      }
    : {
        name: currentStory.discTheme.name,
        color: currentStory.discTheme.color,
        icon: currentStory.discTheme.icon
      };

  const currentEnglishText = currentChannel === 'lessons'
    ? currentLessonItem?.english || ''
    : currentParagraph?.english || '';

  const currentChineseText = currentChannel === 'lessons'
    ? currentLessonItem?.chinese || ''
    : currentParagraph?.chinese || '';

  const currentSpeaker = currentChannel === 'lessons'
    ? (currentLessonItem?.speaker || 'Alex')
    : (currentParagraph?.speaker || currentStory.narrator);

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#18181b] border-2 sm:border-4 border-[#3b82f6] rounded-2xl sm:rounded-3xl text-slate-100 shadow-[0_0_35px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col my-1 sm:my-3 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Top Header: Jukebox Title & Actions */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 p-3 sm:p-4 border-b-2 border-blue-500/40 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-400 border-2 border-black rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-md text-black shrink-0">
            📻
          </div>
          <div>
            <h2 className="text-sm sm:text-lg font-black font-mono text-white flex items-center space-x-1.5 sm:space-x-2">
              <span>Minecraft 磨耳朵电台</span>
              <span className="text-[9px] sm:text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full font-bold">Jukebox</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-blue-200/90 font-mono">
              纯正美音 • 课文精听 • 睡前故事 • 智能抗遗忘
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Tracklist Toggle (Both Desktop & Mobile) */}
          <button
            onClick={() => {
              playClickSound();
              setIsTracklistOpen(!isTracklistOpen);
            }}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
              isTracklistOpen
                ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border-blue-400/40'
            }`}
            title={isTracklistOpen ? '折叠收起课程曲目清单' : '展开课程曲目清单'}
          >
            <List className="w-3.5 h-3.5" />
            <span>{isTracklistOpen ? '收起曲目' : '展开曲目'}</span>
            <span className="text-[10px] opacity-80">
              ({currentChannel === 'lessons' ? filteredPlaylist.length : activeStories.length})
            </span>
          </button>

          <div className="text-[11px] font-mono text-emerald-300 font-bold bg-emerald-950/70 px-2.5 py-1 rounded-xl border border-emerald-500/40 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{listenedMinutes}分</span>
          </div>
        </div>
      </div>

      {/* Channel Switcher Tabs Bar */}
      <div className="bg-slate-950 border-b border-slate-800 p-1.5 sm:p-2 flex items-center justify-between gap-1 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => handleChannelSwitch('lessons')}
          className={`flex-1 min-w-[100px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            currentChannel === 'lessons'
              ? 'bg-blue-600 text-white shadow-md border border-blue-400'
              : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <span>📘</span>
          <span className="truncate">课文精听台</span>
        </button>

        <button
          onClick={() => handleChannelSwitch('mc_stories')}
          className={`flex-1 min-w-[110px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            currentChannel === 'mc_stories'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md border border-emerald-400'
              : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <span>🌲</span>
          <span className="truncate">MC探险故事</span>
        </button>

        <button
          onClick={() => handleChannelSwitch('classic_fables')}
          className={`flex-1 min-w-[110px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            currentChannel === 'classic_fables'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md border border-purple-400'
              : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <span>🏰</span>
          <span className="truncate">经典童话寓言</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            setShowCustomImporter(true);
          }}
          className="py-1.5 px-2.5 rounded-xl text-xs font-mono font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 shadow-md flex items-center justify-center space-x-1 shrink-0 transition-all active:scale-95 border border-yellow-300 cursor-pointer"
          title="一键粘贴文本或导入自定义英语故事"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">导入故事</span>
          <span className="sm:hidden">导入</span>
        </button>
      </div>

      {/* Main Two-Column Side-by-Side Area */}
      <div className="p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start flex-1 overflow-hidden">
        
        {/* Left Column: Player, Subtitle Card & Audio Settings (expands to full width when tracklist is collapsed) */}
        <div className={`flex flex-col space-y-2.5 transition-all duration-300 ${
          isTracklistOpen ? 'lg:col-span-7 xl:col-span-7' : 'lg:col-span-12 xl:col-span-12 max-w-5xl mx-auto w-full'
        }`}>

        {/* Collapsed Tracklist Floating Indicator Bar */}
        {!isTracklistOpen && (
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 overflow-hidden mr-2">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">
                {currentChannel === 'lessons' ? (
                  <>课程曲目已折叠 · 当前播放: <strong className="text-amber-300">第 {selectedLessonId} 课</strong> ({playlist.length} 句)</>
                ) : (
                  <>故事剧本文档已折叠 · 当前: <strong className="text-purple-300">{currentStory.titleZh}</strong></>
                )}
              </span>
            </div>
            <button
              onClick={() => {
                playClickSound();
                setIsTracklistOpen(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-bold rounded-lg shadow-xs border border-blue-400 flex items-center space-x-1 cursor-pointer transition-all shrink-0"
            >
              <List className="w-3.5 h-3.5" />
              <span>{currentChannel === 'lessons' ? '展开课程曲目' : '展开剧本文档'}</span>
            </button>
          </div>
        )}
        
        {/* If Story Channel: Quick Story Switcher Banner */}
        {currentChannel !== 'lessons' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="text-xl shrink-0">{currentStory.discTheme.icon}</span>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-xs sm:text-sm text-white font-mono truncate">{currentStory.titleZh}</h3>
                  <span className="text-[10px] bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono shrink-0">
                    ⏱️ {currentStory.durationApprox}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate font-mono">{currentStory.title}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => {
                  playClickSound();
                  setIsTracklistOpen(!isTracklistOpen);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
              >
                <List className="w-3 h-3" />
                <span>{isTracklistOpen ? '收起故事' : '换故事'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Jukebox Visualizer & Vinyl Disc */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-2xl p-3.5 sm:p-5 text-center shadow-inner overflow-hidden">
          
          {/* Ambient Background Disc Glow */}
          <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Track Info & Scope Selector */}
          <div className="flex items-center justify-between mb-2 text-xs font-mono">
            <span className="bg-slate-800 text-blue-300 px-2 sm:px-2.5 py-1 rounded-lg border border-slate-700 font-bold flex items-center space-x-1 text-[11px] sm:text-xs">
              <span>{displayDisc.icon} Disc: {displayDisc.name}</span>
            </span>

            {/* In lesson mode: Scope Selector */}
            {currentChannel === 'lessons' ? (
              <div className="flex items-center space-x-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-700 text-[10px]">
                <button
                  onClick={() => handleScopeChange('all')}
                  className={`px-1.5 py-0.5 rounded transition-all font-bold cursor-pointer ${
                    playlistScope === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => handleScopeChange('current')}
                  className={`px-1.5 py-0.5 rounded transition-all font-bold cursor-pointer ${
                    playlistScope === 'current' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  本课
                </button>
                <button
                  onClick={() => handleScopeChange('recent5')}
                  className={`px-1.5 py-0.5 rounded transition-all font-bold cursor-pointer ${
                    playlistScope === 'recent5' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  近5课
                </button>
                <button
                  onClick={() => handleScopeChange('smart_review')}
                  className={`px-1.5 py-0.5 rounded transition-all font-bold flex items-center space-x-0.5 cursor-pointer ${
                    playlistScope === 'smart_review' 
                      ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-xs' 
                      : 'text-amber-400/80 hover:text-amber-300'
                  }`}
                >
                  <Brain className="w-2.5 h-2.5 inline mr-0.5" />
                  <span>复盘</span>
                </button>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-amber-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                段落 {storyParagraphIdx + 1} / {currentStory.paragraphs.length}
              </div>
            )}

            {currentChannel === 'lessons' && (
              <span className="text-slate-400 text-[11px]">
                {safeCurrentIndex + 1} / {playlist.length} 句
              </span>
            )}
          </div>

          {/* Compact Integrated Jukebox Strip */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-2.5 sm:p-3 my-1 flex items-center gap-3 sm:gap-4 text-left shadow-sm">
            
            {/* Spinning Minecraft Vinyl Record */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              {/* Outer Grooves */}
              <div 
                className="w-full h-full rounded-full border-2 border-black bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 shadow-[0_0_15px_rgba(0,0,0,0.8)] relative flex items-center justify-center transition-transform"
                style={{ transform: `rotate(${discRotation}deg)` }}
              >
                {/* Vinyl Ring Lines */}
                <div className="absolute inset-1 rounded-full border border-slate-700/40" />
                <div className="absolute inset-2.5 rounded-full border border-slate-700/60" />
                
                {/* Center Disc Color Core */}
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr ${displayDisc.color} border border-black flex flex-col items-center justify-center text-white shadow-md relative`}>
                  <div className="w-1.5 h-1.5 bg-slate-950 rounded-full border border-white/50" />
                  <span className="text-[5px] font-mono font-black uppercase tracking-tighter text-amber-200 truncate">DISC</span>
                </div>
              </div>

              {/* Tonearm Stylus needle */}
              <div 
                className={`absolute -top-1 right-0 w-5 h-8 sm:w-6 sm:h-9 border-r-2 border-t-2 border-amber-400 rounded-tr-lg transition-transform duration-500 origin-top-right pointer-events-none ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-50'
                }`}
              >
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-300 rounded-full border border-black" />
              </div>
            </div>

            {/* Title & Narrator Badge */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs sm:text-sm font-mono text-amber-300 font-bold truncate">
                  {currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.categoryName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {currentChannel === 'lessons' ? `${safeCurrentIndex + 1}/${playlist.length}句` : `第${storyParagraphIdx + 1}段`}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                讲读: <span className="text-slate-200 font-bold">{currentSpeaker === 'Steve' ? '👨 Steve (美音男声)' : '👩‍🦰 Alex (美音女声)'}</span>
              </p>

              {/* Dynamic Soundwave Bars */}
              <div className="flex items-center space-x-1 h-3 pt-0.5">
                {[25, 60, 100, 40, 75, 50, 90, 35, 70, 50, 90, 30].map((heightPct, barIdx) => (
                  <div
                    key={barIdx}
                    className={`w-0.5 sm:w-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? 'bg-gradient-to-t from-emerald-500 to-amber-300 animate-pulse'
                        : 'bg-slate-800'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(25, heightPct)}%` : '3px',
                      animationDelay: `${barIdx * 60}ms`
                    }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Subtitles Box with Character Dialogue Presentation */}
          <div className={`rounded-xl p-3.5 sm:p-4 my-2.5 sm:my-3 text-center space-y-2 min-h-[90px] sm:min-h-[100px] flex flex-col justify-center shadow-md relative transition-all border-2 ${
            currentChannel === 'lessons'
              ? currentSpeaker === 'Steve' 
                ? 'bg-slate-900/95 border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                : 'bg-slate-900/95 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'bg-slate-900/90 border-slate-700'
          }`}>
            {/* Character Dialogue Header for Lesson Listening */}
            {currentChannel === 'lessons' && currentLessonItem && (
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <div className="rounded-lg overflow-hidden ring-1 ring-white/20">
                    <MinecraftAvatar speaker={currentLessonItem.speaker} avatar={currentLessonItem.avatar} size={24} />
                  </div>
                  <span className={`font-black ${currentSpeaker === 'Steve' ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {currentLessonItem.speaker}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                    课文原声
                  </span>
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    speakText(currentEnglishText, { speaker: currentLessonItem.speaker, rate: speechRate });
                  }}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-0.5 rounded flex items-center space-x-1 cursor-pointer transition-colors"
                  title="重听本句"
                >
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  <span>重听本句</span>
                </button>
              </div>
            )}
            
            {subtitleMode !== 'blind_listening' && (
              <div className="font-mono text-sm sm:text-base md:text-lg font-black text-white leading-relaxed">
                <ProsodicSentence 
                  text={currentEnglishText} 
                  showProsody={showProsodyCues} 
                  onWordClick={(word) => {
                    stopPlayback();
                    speakText(word, { speaker: currentSpeaker, rate: 0.85 });
                  }}
                />
              </div>
            )}

            {(subtitleMode === 'bilingual' || subtitleMode === 'chinese_only') && (
              <p className="text-xs sm:text-sm text-slate-300 font-medium font-sans">
                {currentChineseText}
              </p>
            )}

            {subtitleMode === 'blind_listening' && (
              <div className="flex flex-col items-center justify-center py-2 text-slate-400 space-y-1">
                <EyeOff className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono font-bold">盲听磨耳朵模式中 · 专注辨听发音</span>
                <button
                  onClick={() => setSubtitleMode('bilingual')}
                  className="text-[10px] text-amber-300 underline font-mono cursor-pointer"
                >
                  点击显示字幕
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Echo Pause Overlay */}
          {isEchoPausing && (
            <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400/80 rounded-xl p-2.5 my-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                <div className="flex items-center space-x-1.5 text-amber-300 font-black">
                  <Mic className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>🎙️ 影子跟读槽：请大声模仿刚才的句子！</span>
                </div>
                <button
                  onClick={handleSkipEchoPause}
                  className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded font-black text-[10px] flex items-center space-x-1 active:scale-95 transition-all cursor-pointer"
                >
                  <span>跳过</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-amber-400/40">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${echoTotalSeconds > 0 ? (echoRemainingSeconds / echoTotalSeconds) * 100 : 0}%` }}
                />
              </div>
              <div className="text-[10px] text-amber-200/80 font-mono mt-1 text-right">
                剩余跟读时间: {echoRemainingSeconds} 秒
              </div>
            </div>
          )}

          {/* Three-Times Method Status Pill (Lesson Mode) */}
          {currentChannel === 'lessons' && playMode === 'three_times' && isPlaying && !isEchoPausing && (
            <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-mono text-blue-300 animate-pulse">
              <span>🎧 三遍精听法: </span>
              <span className="font-black text-amber-300">
                {repeatCount === 1 ? '第 1 遍（听辨音律）' : repeatCount === 2 ? '第 2 遍（强化理解）' : '第 3 遍（口型跟读）'}
              </span>
              <span className="text-[10px] text-slate-400">({repeatCount}/3)</span>
            </div>
          )}
        </div>

        {/* Story Channel: Vocabulary Loot Box Expandable Drawer */}
        {currentChannel !== 'lessons' && currentStory.vocabularyLoot && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-2">
            <button
              onClick={() => setShowVocabLoot(!showVocabLoot)}
              className="w-full flex items-center justify-between text-xs font-mono font-bold text-amber-300 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>故事词汇宝箱（点击听读并领取绿宝石 💎）</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showVocabLoot ? 'rotate-180' : ''}`} />
            </button>

            {showVocabLoot && (
              <div className="grid grid-cols-2 gap-2 pt-2 animate-in fade-in">
                {currentStory.vocabularyLoot.map((vocab, vIdx) => {
                  const isCollected = collectedVocabWords.has(vocab.word);
                  return (
                    <button
                      key={vIdx}
                      onClick={() => handleCollectVocab(vocab)}
                      className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-150 flex flex-col justify-between hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm ${
                        isCollected 
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-black text-sm text-white">{vocab.word}</span>
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{vocab.phonetic}</p>
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-700/50">
                        <span className="text-[11px] text-amber-300 truncate">{vocab.meaning}</span>
                        {isCollected ? (
                          <span className="text-[9px] text-emerald-400 font-bold">已掌握 ✓</span>
                        ) : (
                          <span className="text-[9px] text-blue-400 font-bold">+1💎 收集</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Player Transport Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 space-y-3.5 sm:space-y-4">
          
          {/* Play/Pause/Prev/Next Bar */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            <button
              onClick={handlePrevTrack}
              className="p-2.5 sm:p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm cursor-pointer"
              title="上一句 / 上一段"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-400 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
              }`}
              title={isPlaying ? '暂停' : '开始播讲'}
            >
              {isPlaying ? <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950" /> : <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => handleNextTrack()}
              className="p-2.5 sm:p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm cursor-pointer"
              title="下一句 / 下一段"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Play Modes Grid (In Lesson Mode) */}
          {currentChannel === 'lessons' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-1 text-xs font-mono">
              <button
                onClick={() => {
                  playClickSound();
                  setPlayMode('three_times');
                  playModeRef.current = 'three_times';
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  playMode === 'three_times'
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200 font-black shadow-xs'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>三遍精听法</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setPlayMode('sequential');
                  playModeRef.current = 'sequential';
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  playMode === 'sequential'
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200 font-black shadow-xs'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>顺序连续播</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setPlayMode('shuffle');
                  playModeRef.current = 'shuffle';
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  playMode === 'shuffle'
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200 font-black shadow-xs'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>随机混播</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setPlayMode('single_loop');
                  playModeRef.current = 'single_loop';
                }}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                  playMode === 'single_loop'
                    ? 'bg-blue-600/30 border-blue-400 text-blue-200 font-black shadow-xs'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>单句循环</span>
              </button>
            </div>
          )}

          {/* Pedagogical Feature Toggles Bar: Echo Pause + Prosody Cues */}
          <div className="bg-slate-800/40 p-2 sm:p-2.5 rounded-xl border border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  playClickSound();
                  setEnableEchoPause(!enableEchoPause);
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  enableEchoPause 
                    ? 'bg-amber-500/20 border-amber-400/70 text-amber-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>跟读停顿槽: {enableEchoPause ? '开' : '关'}</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setShowProsodyCues(!showProsodyCues);
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  showProsodyCues 
                    ? 'bg-blue-500/20 border-blue-400/70 text-blue-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>音律连读标注: {showProsodyCues ? '开' : '关'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowProsodyHelp(!showProsodyHelp)}
              className="text-slate-400 hover:text-amber-300 p-1 text-[11px] flex items-center space-x-0.5 cursor-pointer"
              title="查看教研音律标记说明"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>标记说明</span>
            </button>
          </div>

          {/* Prosody Guide Tip Box */}
          {showProsodyHelp && (
            <div className="bg-blue-950/60 border border-blue-400/40 rounded-xl p-2.5 text-[11px] font-mono text-blue-200 space-y-1 animate-in fade-in">
              <div className="font-bold text-amber-300 flex items-center space-x-1">
                <span>💡 英语音律与二语习得标记说明：</span>
              </div>
              <p>• <span className="text-amber-300 font-bold bg-amber-400/20 px-1 rounded">is‿this</span> 弧线符号表示<strong>「辅音+元音自然连读」</strong>；</p>
              <p>• <strong className="text-white">高亮粗体+圆点</strong> 表示<strong>「实词重音（Sentence Stress）」</strong>；</p>
              <p>• <span className="text-slate-400">灰色字体</span> 表示<strong>「虚词弱读（Weak Form）」</strong>。</p>
            </div>
          )}

          {/* Playback Settings Controls (Speed, Subtitles, Sleep Timer) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-2 border-t border-slate-800 text-xs font-mono">
            
            {/* Speed control */}
            <div className="bg-slate-800/70 p-2 sm:p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[11px] text-slate-400 font-bold block">⚡ 语速调节：</span>
              <div className="flex items-center space-x-1">
                {[0.75, 1.0, 1.25].map(rate => (
                  <button
                    key={rate}
                    onClick={() => {
                      playClickSound();
                      setSpeechRate(rate);
                      speechRateRef.current = rate;
                    }}
                    className={`flex-1 py-1 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                      speechRate === rate
                        ? 'bg-amber-400 text-slate-950 border-black'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {rate === 0.75 ? '🐢 0.75x' : rate === 1.0 ? '1.0x' : '1.25x'}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitle visibility control */}
            <div className="bg-slate-800/70 p-2 sm:p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[11px] text-slate-400 font-bold block">👁️ 字幕模式：</span>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => {
                    playClickSound();
                    setSubtitleMode('bilingual');
                  }}
                  className={`py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    subtitleMode === 'bilingual'
                      ? 'bg-blue-600 text-white border-blue-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  双语全显
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setSubtitleMode('blind_listening');
                  }}
                  className={`py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    subtitleMode === 'blind_listening'
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  盲听磨耳
                </button>
              </div>
            </div>

            {/* Sleep timer control */}
            <div className="bg-slate-800/70 p-2 sm:p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[11px] text-slate-400 font-bold flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <Moon className="w-3 h-3 text-indigo-400" />
                  <span>定时关机：</span>
                </span>
                {sleepRemainingSeconds !== null && (
                  <span className="text-amber-400 font-black">{formatTimer(sleepRemainingSeconds)}</span>
                )}
              </span>
              <div className="flex items-center space-x-1">
                {[null, 15, 30, 45].map((mins, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTimerPreset(mins)}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer ${
                      sleepTimerMinutes === mins
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {mins === null ? '无' : `${mins}m`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Immersion reward banner */}
          <div className="bg-emerald-950/70 border border-emerald-500/40 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-300">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>已沉浸磨音: <strong className="text-white">{listenedMinutes} 分钟</strong> (每满3分钟自动奖励绿宝石 💎)</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-black">
              +2 💎 / 3m
            </span>
          </div>

        </div>
        </div>

        {/* Right Column: 课程曲目 / 播放清单 (Side-by-side on desktop, collapsible) */}
        {isTracklistOpen && (
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-lg h-[590px] lg:h-[640px] animate-in fade-in duration-200">
            {currentChannel === 'lessons' ? (
              <>
                {/* Header */}
                <div className="bg-slate-950/90 p-2.5 sm:p-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono font-bold text-xs sm:text-sm text-white shrink-0">课程曲目清单</span>
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 px-1.5 py-0.5 rounded-full font-bold truncate">
                      共 {filteredPlaylist.length} 句 · {groupedPlaylist.length} 课
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                      当前: <strong className="text-amber-300">#{safeCurrentIndex + 1}</strong>/{playlist.length}
                    </span>
                    <button
                      onClick={() => {
                        playClickSound();
                        setIsTracklistOpen(false);
                      }}
                      className="text-slate-400 hover:text-white px-2 py-1 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 border border-slate-700/60 transition-colors cursor-pointer"
                      title="折叠收起曲目清单"
                    >
                      <span>收起</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scope Selector Pills */}
                <div className="bg-slate-950/60 px-2.5 py-1.5 border-b border-slate-800/80 flex items-center justify-between gap-1 text-[11px] font-mono">
                  <span className="text-slate-400 shrink-0 font-bold">范围:</span>
                  <div className="flex items-center space-x-1 flex-1 justify-end">
                    <button
                      onClick={() => handleScopeChange('all')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        playlistScope === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-slate-800/60'
                      }`}
                    >
                      全部
                    </button>
                    <button
                      onClick={() => handleScopeChange('current')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        playlistScope === 'current' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-slate-800/60'
                      }`}
                    >
                      本课
                    </button>
                    <button
                      onClick={() => handleScopeChange('recent5')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                        playlistScope === 'recent5' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-slate-800/60'
                      }`}
                    >
                      近5课
                    </button>
                    <button
                      onClick={() => handleScopeChange('smart_review')}
                      className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center space-x-0.5 ${
                        playlistScope === 'smart_review' ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-xs' : 'text-amber-400/80 hover:text-amber-300 bg-slate-800/60'
                      }`}
                    >
                      <Brain className="w-2.5 h-2.5 inline mr-0.5" />
                      <span>智能复盘</span>
                    </button>
                  </div>
                </div>

                {/* Quick Lesson Switcher Dropdown */}
                <div className="bg-slate-950/40 px-2.5 py-1.5 border-b border-slate-800/60 flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">选择课目:</span>
                  <select
                    value={selectedLessonId}
                    onChange={(e) => {
                      const newId = Number(e.target.value);
                      playClickSound();
                      setSelectedLessonId(newId);
                      setPlaylistScope('current');
                      setCurrentIndex(0);
                      currentIndexRef.current = 0;
                      clearPendingPlaybackTimer();
                    }}
                    className="flex-1 bg-slate-800 text-amber-300 font-mono text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-amber-400 truncate cursor-pointer"
                  >
                    {effectiveLessons.map(l => (
                      <option key={l.id} value={l.id}>
                        第 {l.id} 课: {l.title} ({l.titleZh})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Filter Search Input */}
                <div className="bg-slate-950/20 px-2.5 py-1.5 border-b border-slate-800 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索句型或课文 (英/中)..."
                    className="w-full bg-transparent text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white text-xs px-1 cursor-pointer">
                      ✕
                    </button>
                  )}
                </div>

                {/* Accordion / Fold Toolbar */}
                <div className="bg-slate-950/70 px-2.5 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>课时:</span>
                    <button
                      onClick={handleCollapseAllLessons}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 font-bold transition-all cursor-pointer"
                      title="折叠除当前课外的所有课时"
                    >
                      全部折叠
                    </button>
                    <button
                      onClick={handleExpandAllLessons}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 font-bold transition-all cursor-pointer"
                      title="展开所有课时"
                    >
                      全部展开
                    </button>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handleFocusCurrentLesson}
                      className="px-1.5 py-0.5 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 font-bold transition-all cursor-pointer"
                      title="展开并定位当前播放课时"
                    >
                      定位当前课
                    </button>
                    <button
                      onClick={() => {
                        playClickSound();
                        setIsGroupedByLesson(!isGroupedByLesson);
                      }}
                      className={`px-1.5 py-0.5 rounded border text-[10px] font-bold transition-all cursor-pointer ${
                        isGroupedByLesson ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      }`}
                      title={isGroupedByLesson ? '切换为全部平铺显示' : '切换为按课折叠显示'}
                    >
                      {isGroupedByLesson ? '按课折叠' : '平铺'}
                    </button>
                  </div>
                </div>

                {/* Scrollable Tracklist */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                  {filteredPlaylist.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 font-mono text-xs">
                      没有找到匹配的曲目句子
                    </div>
                  ) : isGroupedByLesson ? (
                    /* Grouped & Collapsible Accordion by Lesson */
                    groupedPlaylist.map(group => {
                      const isLessonCollapsed = collapsedLessonIds.has(group.lessonId);
                      const isCurrentLessonActive = group.items.some(it => it.realIdx === safeCurrentIndex);

                      return (
                        <div
                          key={group.lessonId}
                          className={`rounded-xl border overflow-hidden transition-all ${
                            isCurrentLessonActive
                              ? 'border-blue-500/60 bg-slate-900/90 shadow-xs'
                              : 'border-slate-800/80 bg-slate-900/50'
                          }`}
                        >
                          {/* Lesson Group Header */}
                          <div
                            onClick={() => toggleLessonCollapse(group.lessonId)}
                            className={`w-full p-2 flex items-center justify-between text-xs font-mono transition-colors cursor-pointer select-none ${
                              isCurrentLessonActive
                                ? 'bg-blue-950/40 hover:bg-blue-950/60 text-white'
                                : 'hover:bg-slate-800/50 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center space-x-1.5 overflow-hidden mr-1">
                              <span className="text-slate-400 p-0.5">
                                {isLessonCollapsed ? (
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
                                )}
                              </span>
                              <span className="font-bold text-amber-300 shrink-0">
                                第 {group.lessonId} 课
                              </span>
                              <span className="truncate text-slate-300 font-medium">
                                {group.lessonTitle}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1.5 shrink-0">
                              {isCurrentLessonActive && (
                                <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 border border-blue-400/30 px-1.5 py-0.2 rounded-full flex items-center space-x-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                                  <span>播放中</span>
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                {group.items.length} 句
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClickSound();
                                  clearPendingPlaybackTimer();
                                  const firstItem = group.items[0];
                                  if (firstItem) {
                                    setCurrentIndex(firstItem.realIdx);
                                    currentIndexRef.current = firstItem.realIdx;
                                    playCurrentLessonTrack(firstItem.realIdx, 1);
                                    setCollapsedLessonIds(prev => {
                                      const next = new Set(prev);
                                      next.delete(group.lessonId);
                                      return next;
                                    });
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-amber-300 hover:bg-slate-700/60 rounded transition-colors"
                                title={`从第 ${group.lessonId} 课第一句开始播放`}
                              >
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Items */}
                          {!isLessonCollapsed && (
                            <div className="p-1.5 pt-0 space-y-1 border-t border-slate-800/40 bg-slate-950/30">
                              {group.items.map(({ item, realIdx, filteredIdx }) => {
                                const isCurrent = realIdx === safeCurrentIndex;
                                return (
                                  <div
                                    key={item.id}
                                    ref={isCurrent ? activeTrackRef : null}
                                    onClick={() => {
                                      playClickSound();
                                      clearPendingPlaybackTimer();
                                      setCurrentIndex(realIdx);
                                      currentIndexRef.current = realIdx;
                                      playCurrentLessonTrack(realIdx, 1);
                                    }}
                                    className={`w-full text-left p-2 rounded-xl border text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                                      isCurrent
                                        ? 'bg-blue-600/30 border-blue-400 text-white font-bold ring-1 ring-blue-400 shadow-sm'
                                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2 overflow-hidden mr-1.5">
                                      <span className={`text-[10px] font-mono px-1 rounded font-bold shrink-0 ${
                                        isCurrent ? 'bg-amber-400 text-slate-950' : 'text-slate-500'
                                      }`}>
                                        #{filteredIdx + 1}
                                      </span>
                                      <div className="shrink-0 rounded-md overflow-hidden ring-1 ring-white/10">
                                        <MinecraftAvatar speaker={item.speaker} avatar={item.avatar} size={24} />
                                      </div>
                                      <div className="truncate">
                                        <div className="flex items-center space-x-1.5 mb-0.5">
                                          <span className={`text-[9px] font-mono px-1 rounded font-bold ${
                                            item.speaker === 'Steve' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                                          }`}>
                                            {item.speaker}
                                          </span>
                                          <span className={`text-[9px] px-1 rounded font-bold ${
                                            item.type === 'dialogue' ? 'bg-blue-950 text-blue-300' : 'bg-amber-950 text-amber-300'
                                          }`}>
                                            {item.type === 'dialogue' ? '情境' : '句型'}
                                          </span>
                                        </div>
                                        <p className="truncate font-semibold text-slate-200">{item.english}</p>
                                        <p className="text-[10px] text-slate-400 truncate">{item.chinese}</p>
                                      </div>
                                    </div>
                                    {isCurrent && (
                                      <div className="shrink-0 flex items-center space-x-1 text-blue-400 font-bold text-[10px] ml-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                                        <span>播放中</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    /* Flat List */
                    filteredPlaylist.map((item, idx) => {
                      const realIdx = playlist.findIndex(p => p.id === item.id);
                      const targetIdx = realIdx >= 0 ? realIdx : idx;
                      const isCurrent = targetIdx === safeCurrentIndex;
                      return (
                        <div
                          key={item.id}
                          ref={isCurrent ? activeTrackRef : null}
                          onClick={() => {
                            playClickSound();
                            clearPendingPlaybackTimer();
                            setCurrentIndex(targetIdx);
                            currentIndexRef.current = targetIdx;
                            playCurrentLessonTrack(targetIdx, 1);
                          }}
                          className={`w-full text-left p-2 rounded-xl border text-xs font-mono flex items-center justify-between transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-blue-600/30 border-blue-400 text-white font-bold ring-1 ring-blue-400 shadow-sm'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2 overflow-hidden mr-1.5">
                            <span className={`text-[10px] font-mono px-1 rounded font-bold shrink-0 ${
                              isCurrent ? 'bg-amber-400 text-slate-950' : 'text-slate-500'
                            }`}>
                              #{idx + 1}
                            </span>
                            <div className="shrink-0 rounded-md overflow-hidden ring-1 ring-white/10">
                              <MinecraftAvatar speaker={item.speaker} avatar={item.avatar} size={26} />
                            </div>
                            <div className="truncate">
                              <div className="flex items-center space-x-1.5 mb-0.5">
                                <span className={`text-[9px] font-mono px-1 rounded font-bold ${
                                  item.speaker === 'Steve' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                                }`}>
                                  {item.speaker}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate">{item.lessonTitle}</span>
                                <span className={`text-[9px] px-1 rounded font-bold ${
                                  item.type === 'dialogue' ? 'bg-blue-950 text-blue-300' : 'bg-amber-950 text-amber-300'
                                }`}>
                                  {item.type === 'dialogue' ? '情境' : '句型'}
                                </span>
                              </div>
                              <p className="truncate font-semibold text-slate-200">{item.english}</p>
                              <p className="text-[10px] text-slate-400 truncate">{item.chinese}</p>
                            </div>
                          </div>
                          {isCurrent && (
                            <div className="shrink-0 flex items-center space-x-1 text-blue-400 font-bold text-[10px] ml-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                              <span>播放中</span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
            <>
              {/* Story Channel Right Panel: Stories & Transcript */}
              <div className="bg-slate-950/90 p-2.5 sm:p-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookMarked className="w-4 h-4 text-purple-400" />
                  <span className="font-mono font-bold text-xs sm:text-sm text-white">故事剧本文档</span>
                  <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 px-1.5 py-0.5 rounded-full font-bold">
                    共 {activeStories.length} 篇
                  </span>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    setIsTracklistOpen(false);
                  }}
                  className="text-slate-400 hover:text-white px-2 py-1 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 border border-slate-700/60 transition-colors cursor-pointer"
                  title="折叠收起剧本文档"
                >
                  <span>收起</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Story Switcher Dropdown */}
              <div className="bg-slate-950/50 p-2 border-b border-slate-800 flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 shrink-0">选择故事:</span>
                <select
                  value={currentStory.id}
                  onChange={(e) => {
                    const found = activeStories.find(s => s.id === e.target.value);
                    if (found) {
                      playClickSound();
                      setSelectedStoryId(found.id);
                      setStoryParagraphIdx(0);
                      storyParagraphIdxRef.current = 0;
                      clearPendingPlaybackTimer();
                      playStoryParagraph(found, 0);
                    }
                  }}
                  className="flex-1 bg-slate-800 text-purple-300 font-mono text-xs rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-purple-400 truncate cursor-pointer"
                >
                  {activeStories.map(story => (
                    <option key={story.id} value={story.id}>
                      {story.discTheme.icon} {story.titleZh} ({story.title}) - {story.durationApprox}
                    </option>
                  ))}
                </select>
              </div>

              {/* Paragraphs List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {currentStory.paragraphs.map((p, pIdx) => {
                  const isCurrent = pIdx === storyParagraphIdx;
                  return (
                    <div
                      key={pIdx}
                      onClick={() => {
                        playClickSound();
                        clearPendingPlaybackTimer();
                        setStoryParagraphIdx(pIdx);
                        storyParagraphIdxRef.current = pIdx;
                        playStoryParagraph(currentStory, pIdx);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer space-y-1 ${
                        isCurrent
                          ? 'bg-purple-900/40 border-purple-400 text-white font-bold ring-1 ring-purple-400 shadow-md'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-amber-300">
                          第 {pIdx + 1} 段 · {p.speaker || currentStory.narrator}
                        </span>
                        {isCurrent && <span className="text-purple-300 font-black animate-pulse">▶ 朗读中</span>}
                      </div>
                      <p className="text-slate-200 leading-relaxed">{p.english}</p>
                      <p className="text-slate-400 text-[11px]">{p.chinese}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        )}

      </div>

      {/* Custom Story Importer Modal */}
      {showCustomImporter && (
        <CustomStoryImporterModal
          isOpen={showCustomImporter}
          onClose={() => setShowCustomImporter(false)}
          onStoryCreated={(newStory) => {
            setCustomStories(prev => [newStory, ...prev]);
            setSelectedStoryId(newStory.id);
            setStoryParagraphIdx(0);
            storyParagraphIdxRef.current = 0;
            setCurrentChannel('mc_stories');
            setShowCustomImporter(false);
            setTimeout(() => {
              playStoryParagraph(newStory, 0);
            }, 300);
          }}
        />
      )}

    </div>
  );
};
