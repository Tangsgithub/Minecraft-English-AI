import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lesson, UserProfile, CourseVolumeId, ChatMessage } from '../types';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, 
  Clock, Sparkles, Disc, List, Eye, EyeOff, Award, ChevronDown, CheckCircle2, Moon, X,
  Filter, Layers, BookOpen, Mic, Music, HelpCircle, Brain, ArrowRight, BookMarked,
  Sparkle, Volume1, ChevronRight, Bookmark, Plus, Wand2, MessageSquare, Radio, PhoneCall,
  Volume, Check, Search, Folder, FolderOpen, SlidersHorizontal, Maximize2, Minimize2,
  Headphones, Settings2, Sliders, Zap
} from 'lucide-react';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { LESSONS_DATA, getLessonById } from '../data/lessonsData';
import { RADIO_STORIES, RadioStory, StoryParagraph, StoryVocab } from '../data/radioStoriesData';
import { fetchCustomStories } from '../services/customStoriesService';
import { CustomStoryImporterModal } from './CustomStoryImporterModal';
import { AlexChatView } from './AlexChatView';
import { MinecraftAvatar } from './MinecraftAvatar';

export type RadioChannel = 'lessons' | 'mc_stories' | 'classic_fables' | 'alex_chat';
export type PlayMode = 'three_times' | 'sequential' | 'shuffle' | 'single_loop';
export type SubtitleMode = 'bilingual' | 'english_only' | 'chinese_only' | 'blind_listening';
export type PlaylistScope = 'all' | 'current' | 'recent5' | 'smart_review';

interface PlaylistItem {
  id: string;
  lessonId: number;
  lessonTitle: string;
  speaker: string;
  english: string;
  chinese: string;
  type: 'dialogue' | 'target_sentence' | 'vocab';
  discName: string;
  discColor: string;
}

export interface LessonGroup {
  lessonId: number;
  lessonTitle: string;
  lessonTitleZh: string;
  discName: string;
  discColor: string;
  discIcon: string;
  items: { item: PlaylistItem; globalIndex: number }[];
}

const MINECRAFT_DISCS = [
  { name: 'Cat', color: 'from-emerald-500 to-teal-700', border: 'border-emerald-400', glow: 'rgba(16,185,129,0.3)', icon: '🟢' },
  { name: 'Blocks', color: 'from-amber-500 to-orange-700', border: 'border-amber-400', glow: 'rgba(245,158,11,0.3)', icon: '🟠' },
  { name: 'Chirp', color: 'from-rose-500 to-red-700', border: 'border-rose-400', glow: 'rgba(244,63,94,0.3)', icon: '🔴' },
  { name: 'Mall', color: 'from-purple-500 to-indigo-700', border: 'border-purple-400', glow: 'rgba(168,85,247,0.3)', icon: '🟣' },
  { name: 'Mellohi', color: 'from-fuchsia-500 to-pink-700', border: 'border-fuchsia-400', glow: 'rgba(217,70,239,0.3)', icon: '🌸' },
  { name: 'Pigstep', color: 'from-amber-600 to-yellow-800', border: 'border-yellow-500', glow: 'rgba(234,179,8,0.3)', icon: '🟡' },
  { name: 'Stal', color: 'from-slate-700 to-slate-950', border: 'border-slate-400', glow: 'rgba(148,163,184,0.2)', icon: '⚫' },
  { name: 'Netherite', color: 'from-purple-900 via-indigo-900 to-slate-950', border: 'border-purple-400', glow: 'rgba(147,51,234,0.4)', icon: '🌌' }
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
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
      {tokens.map((token, i) => {
        const cleanWord = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const hasLinking = token.includes('‿');
        const isWeak = weakWords.has(cleanWord) && !hasLinking;

        if (hasLinking) {
          const displayToken = token.replace(/‿/g, ' ‿ ');
          const speakable = token.replace(/‿/g, ' ');
          return (
            <span 
              key={`linked-${i}`} 
              onClick={(e) => {
                e.stopPropagation();
                if (onWordClick) onWordClick(speakable);
              }}
              className="inline-flex items-center px-2 py-0.5 rounded-lg bg-amber-400/20 border border-amber-400/60 text-amber-200 font-black cursor-pointer hover:bg-amber-400/30 transition-all shadow-xs"
              title="连读 (Linking) - 点击发音"
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
                if (onWordClick) onWordClick(cleanWord || token);
              }}
              className="text-slate-400/90 font-medium cursor-pointer hover:text-white transition-colors" 
              title="弱读词 (Weak Form) - 点击发音"
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
              if (onWordClick) onWordClick(cleanWord || token);
            }}
            className="text-white font-black tracking-tight relative cursor-pointer hover:text-amber-200 transition-colors" 
            title="句子重音 (Sentence Stress) - 点击发音"
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
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardEmeralds?: (emeralds: number, xp: number, reason?: string) => void;
  onCompleteLesson: (lessonId: number) => void;
  onOpenSettings: () => void;
  onCheckMission?: (userText: string) => void;
  onSelectLessonForChat?: (lesson: Lesson) => void;
  initialChannel?: RadioChannel;
}

export const RadioImmersionView: React.FC<RadioImmersionViewProps> = ({
  lessons,
  currentLessonId = 1,
  selectedVolumeId = 'vol1',
  profile,
  activeLessonForChat,
  chatMessages,
  setChatMessages,
  onAwardEmeralds,
  onCompleteLesson,
  onOpenSettings,
  onCheckMission,
  onSelectLessonForChat,
  initialChannel = 'lessons'
}) => {
  // 1. Resolve effective lessons securely
  const effectiveLessons: Lesson[] = lessons && lessons.length > 0
    ? lessons
    : (selectedVolumeId === 'vol2'
        ? Array.from({ length: 96 }, (_, i) => getLessonById(i + 1, 'vol2'))
        : LESSONS_DATA);

  // Custom Stories state & dynamic loading from Cloud DB
  const [customStories, setCustomStories] = useState<RadioStory[]>([]);
  const [showCustomImporter, setShowCustomImporter] = useState<boolean>(false);

  useEffect(() => {
    fetchCustomStories().then(stories => {
      if (stories && Array.isArray(stories) && stories.length > 0) {
        setCustomStories(stories);
      }
    });
  }, []);

  const allStories = useMemo<RadioStory[]>(() => {
    return [...customStories, ...RADIO_STORIES];
  }, [customStories]);

  // Channels state: lessons vs mc_stories vs classic_fables vs alex_chat
  const [currentChannel, setCurrentChannel] = useState<RadioChannel>(() => {
    if (activeLessonForChat) return 'alex_chat';
    return initialChannel;
  });

  // When activeLessonForChat updates, jump to alex_chat channel
  useEffect(() => {
    if (activeLessonForChat) {
      setCurrentChannel('alex_chat');
    }
  }, [activeLessonForChat]);

  const [selectedStoryId, setSelectedStoryId] = useState<string>(RADIO_STORIES[0].id);
  const [storyParagraphIdx, setStoryParagraphIdx] = useState<number>(0);
  const [showVocabLoot, setShowVocabLoot] = useState<boolean>(true);
  const [collectedVocabWords, setCollectedVocabWords] = useState<Set<string>>(new Set());

  // UI Mode Toggles: Zen Immersion Mode & Settings Drawer
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [zenShowSubtitlesTemp, setZenShowSubtitlesTemp] = useState<boolean>(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false);

  // Lesson Playback State
  const [playlistScope, setPlaylistScope] = useState<PlaylistScope>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playMode, setPlayMode] = useState<PlayMode>('three_times');
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('bilingual');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [repeatCount, setRepeatCount] = useState<number>(1); // For three_times mode: 1, 2, 3
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepRemainingSeconds, setSleepRemainingSeconds] = useState<number | null>(null);
  const [discRotation, setDiscRotation] = useState<number>(0);

  // Pedagogical Feature Toggles
  const [enableEchoPause, setEnableEchoPause] = useState<boolean>(true);
  const [isEchoPausing, setIsEchoPausing] = useState<boolean>(false);
  const [echoRemainingSeconds, setEchoRemainingSeconds] = useState<number>(0);
  const [echoTotalSeconds, setEchoTotalSeconds] = useState<number>(0);
  const [showProsodyCues, setShowProsodyCues] = useState<boolean>(true);

  // Listening time statistics
  const [listenedSeconds, setListenedSeconds] = useState<number>(0);

  // Active Story Item
  const currentStory = useMemo<RadioStory>(() => {
    return allStories.find(s => s.id === selectedStoryId) || allStories[0];
  }, [allStories, selectedStoryId]);

  const activeStories = useMemo<RadioStory[]>(() => {
    if (currentChannel === 'mc_stories') {
      return allStories.filter(s => s.category === 'mc_adventure');
    }
    if (currentChannel === 'classic_fables') {
      return allStories.filter(s => s.category === 'fables');
    }
    return allStories;
  }, [allStories, currentChannel]);

  // Build Lesson Playlist
  const playlist = useMemo<PlaylistItem[]>(() => {
    let filteredLessons = effectiveLessons;
    if (playlistScope === 'current') {
      filteredLessons = effectiveLessons.filter(l => l.id === currentLessonId);
    } else if (playlistScope === 'recent5') {
      const minId = Math.max(1, currentLessonId - 4);
      filteredLessons = effectiveLessons.filter(l => l.id >= minId && l.id <= currentLessonId);
    } else if (playlistScope === 'smart_review') {
      const uncompletedOrRecent = effectiveLessons.filter(l => 
        !(profile?.completedLessonIds || []).includes(l.id) || l.id === currentLessonId
      );
      filteredLessons = uncompletedOrRecent.slice(0, 8);
    }

    const items: PlaylistItem[] = [];
    filteredLessons.forEach((lesson, lIdx) => {
      const disc = MINECRAFT_DISCS[lIdx % MINECRAFT_DISCS.length];
      
      // Dialogues from dialogueScript
      if (lesson.dialogueScript && lesson.dialogueScript.length > 0) {
        lesson.dialogueScript.forEach((d, dIdx) => {
          items.push({
            id: `lesson_${lesson.id}_dlg_${dIdx}`,
            lessonId: lesson.id,
            lessonTitle: `Lesson ${lesson.id}: ${lesson.title}`,
            speaker: d.speaker || 'Alex',
            english: d.text,
            chinese: d.translation,
            type: 'dialogue',
            discName: disc.name,
            discColor: disc.color
          });
        });
      }
      
      // Target sentences
      if (lesson.targetSentences && lesson.targetSentences.length > 0) {
        lesson.targetSentences.forEach((ts, tsIdx) => {
          items.push({
            id: `lesson_${lesson.id}_target_${tsIdx}`,
            lessonId: lesson.id,
            lessonTitle: `Lesson ${lesson.id}: ${lesson.title}`,
            speaker: 'Alex',
            english: ts,
            chinese: (lesson.targetSentenceTranslations && lesson.targetSentenceTranslations[tsIdx]) || lesson.titleZh,
            type: 'target_sentence',
            discName: disc.name,
            discColor: disc.color
          });
        });
      }
    });

    return items.length > 0 ? items : [{
      id: 'fallback_1',
      lessonId: 1,
      lessonTitle: 'Lesson 1: Excuse me!',
      speaker: 'Alex',
      english: 'Excuse me! Is this your handbag?',
      chinese: '对不起！这是你的手提包吗？',
      type: 'dialogue',
      discName: 'Cat',
      discColor: 'from-emerald-500 to-teal-700'
    }];
  }, [effectiveLessons, playlistScope, currentLessonId, profile?.completedLessonIds]);

  const safeCurrentIndex = Math.min(currentIndex, Math.max(0, playlist.length - 1));
  const currentLessonItem = playlist[safeCurrentIndex] || playlist[0];
  const currentParagraph = currentStory.paragraphs[storyParagraphIdx] || currentStory.paragraphs[0];

  // Group playlist items by Lesson for clear, non-overwhelming display
  const lessonGroups = useMemo<LessonGroup[]>(() => {
    const groupMap = new Map<number, { item: PlaylistItem; globalIndex: number }[]>();

    playlist.forEach((item, globalIndex) => {
      if (!groupMap.has(item.lessonId)) {
        groupMap.set(item.lessonId, []);
      }
      groupMap.get(item.lessonId)!.push({ item, globalIndex });
    });

    const groups: LessonGroup[] = [];
    groupMap.forEach((indexedItems, lessonId) => {
      const lesson = effectiveLessons.find(l => l.id === lessonId);
      const disc = MINECRAFT_DISCS[lessonId % MINECRAFT_DISCS.length];
      groups.push({
        lessonId,
        lessonTitle: lesson ? `Lesson ${lesson.id}: ${lesson.title}` : `Lesson ${lessonId}`,
        lessonTitleZh: lesson ? lesson.titleZh : '',
        discName: disc.name,
        discColor: disc.color,
        discIcon: disc.icon,
        items: indexedItems
      });
    });

    return groups;
  }, [playlist, effectiveLessons]);

  // Accordion expansion state for lesson groups
  const [expandedLessonIds, setExpandedLessonIds] = useState<Set<number>>(() => new Set([currentLessonItem?.lessonId || 1]));
  const [lessonFilterQuery, setLessonFilterQuery] = useState<string>('');

  // Automatically expand the currently playing lesson
  useEffect(() => {
    if (currentLessonItem?.lessonId) {
      setExpandedLessonIds(prev => {
        if (!prev.has(currentLessonItem.lessonId)) {
          const next = new Set(prev);
          next.add(currentLessonItem.lessonId);
          return next;
        }
        return prev;
      });
    }
  }, [currentLessonItem?.lessonId]);

  const toggleLessonExpand = (lessonId: number) => {
    playClickSound();
    setExpandedLessonIds(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const expandAllLessons = () => {
    playClickSound();
    setExpandedLessonIds(new Set(lessonGroups.map(g => g.lessonId)));
  };

  const collapseAllLessons = () => {
    playClickSound();
    setExpandedLessonIds(new Set([currentLessonItem?.lessonId || 1]));
  };

  // Filtered Lesson Groups
  const filteredLessonGroups = useMemo(() => {
    if (!lessonFilterQuery.trim()) return lessonGroups;
    const q = lessonFilterQuery.trim().toLowerCase();
    return lessonGroups.filter(g => 
      g.lessonTitle.toLowerCase().includes(q) ||
      g.lessonTitleZh.toLowerCase().includes(q) ||
      `第${g.lessonId}课`.includes(q) ||
      `lesson ${g.lessonId}`.includes(q) ||
      `l${g.lessonId}`.includes(q) ||
      g.items.some(({ item }) => 
        item.english.toLowerCase().includes(q) || 
        item.chinese.toLowerCase().includes(q)
      )
    );
  }, [lessonGroups, lessonFilterQuery]);

  // Active Disc Theme for ambient glow and styling
  const displayDisc = useMemo(() => {
    if (currentChannel === 'lessons') {
      const discIdx = (currentLessonItem?.lessonId || 1) % MINECRAFT_DISCS.length;
      return MINECRAFT_DISCS[discIdx];
    }
    return {
      name: currentStory.discTheme?.name || 'Blocks',
      color: currentStory.discTheme?.color || 'from-amber-500 to-orange-700',
      border: currentStory.discTheme?.border || 'border-amber-400',
      glow: 'rgba(245,158,11,0.3)',
      icon: currentStory.discTheme?.icon || '🌲'
    };
  }, [currentChannel, currentLessonItem, currentStory]);

  // Refs for tracking playback loop
  const isPlayingRef = useRef<boolean>(isPlaying);
  const speechRateRef = useRef<number>(speechRate);
  const playModeRef = useRef<PlayMode>(playMode);
  const repeatCountRef = useRef<number>(repeatCount);
  const currentChannelRef = useRef<RadioChannel>(currentChannel);
  const currentIndexRef = useRef<number>(safeCurrentIndex);
  const storyParagraphIdxRef = useRef<number>(storyParagraphIdx);
  const selectedStoryIdRef = useRef<string>(selectedStoryId);
  const enableEchoPauseRef = useRef<boolean>(enableEchoPause);
  const playlistRef = useRef<PlaylistItem[]>(playlist);
  const echoTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speechRateRef.current = speechRate; }, [speechRate]);
  useEffect(() => { playModeRef.current = playMode; }, [playMode]);
  useEffect(() => { repeatCountRef.current = repeatCount; }, [repeatCount]);
  useEffect(() => { currentChannelRef.current = currentChannel; }, [currentChannel]);
  useEffect(() => { currentIndexRef.current = safeCurrentIndex; }, [safeCurrentIndex]);
  useEffect(() => { storyParagraphIdxRef.current = storyParagraphIdx; }, [storyParagraphIdx]);
  useEffect(() => { selectedStoryIdRef.current = selectedStoryId; }, [selectedStoryId]);
  useEffect(() => { enableEchoPauseRef.current = enableEchoPause; }, [enableEchoPause]);
  useEffect(() => { playlistRef.current = playlist; }, [playlist]);

  // Vinyl Spin Animation loop
  useEffect(() => {
    let animationFrameId: number;
    const rotate = () => {
      if (isPlayingRef.current) {
        setDiscRotation(prev => (prev + 1.2) % 360);
      }
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Sleep Timer Tick
  useEffect(() => {
    if (sleepTimerMinutes === null) {
      setSleepRemainingSeconds(null);
      return;
    }
    setSleepRemainingSeconds(sleepTimerMinutes * 60);

    const interval = setInterval(() => {
      setSleepRemainingSeconds(prev => {
        if (prev === null || prev <= 1) {
          handlePause();
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerMinutes]);

  // Listening time accumulation & emerald reward
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setListenedSeconds(prev => {
          const next = prev + 1;
          // Award emeralds every 3 minutes (180s)
          if (next % 180 === 0 && onAwardEmeralds) {
            onAwardEmeralds(2, 5, '电台磨耳朵听满 3 分钟');
            playEmeraldSound();
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, onAwardEmeralds]);

  // Component unmount audio & timer cleanup
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      stopSpeech();
      clearEchoTimers();
    };
  }, []);

  // Smooth autoscroll for currently active item in playlist
  const activeItemRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [safeCurrentIndex, storyParagraphIdx]);

  const clearEchoTimers = () => {
    if (echoTimerRef.current) {
      clearInterval(echoTimerRef.current);
      echoTimerRef.current = null;
    }
    setIsEchoPausing(false);
    setEchoRemainingSeconds(0);
    setEchoTotalSeconds(0);
  };

  // Play a single Lesson Item with Three-Times / Sequential / Loop Support
  const playLessonItem = (idx: number, currentRepeat: number = 1) => {
    const list = playlistRef.current;
    if (!list || list.length === 0) return;
    const safeIdx = Math.max(0, Math.min(idx, list.length - 1));
    const item = list[safeIdx];
    if (!item) return;

    clearEchoTimers();
    setIsPlaying(true);
    isPlayingRef.current = true;
    setCurrentIndex(safeIdx);
    currentIndexRef.current = safeIdx;
    setRepeatCount(currentRepeat);
    repeatCountRef.current = currentRepeat;

    // Rate calculation for Three-Times Mode
    let effectiveRate = speechRateRef.current;
    if (playModeRef.current === 'three_times') {
      if (currentRepeat === 1) effectiveRate = 1.0;
      else if (currentRepeat === 2) effectiveRate = 0.82; // Slower for phonetic absorption
      else effectiveRate = 0.95;
    }

    speakText(item.english, () => {
      if (!isPlayingRef.current) return;

      // Check if echo pause is enabled
      const isThreeTimes = playModeRef.current === 'three_times';
      const shouldEchoPause = enableEchoPauseRef.current && (!isThreeTimes || currentRepeat >= 3);

      if (shouldEchoPause) {
        // Calculate echo duration based on word count
        const wordCount = item.english.split(' ').filter(Boolean).length;
        const echoDuration = Math.max(2, Math.min(6, Math.round(wordCount * 0.6)));
        setIsEchoPausing(true);
        setEchoTotalSeconds(echoDuration);
        setEchoRemainingSeconds(echoDuration);

        let left = echoDuration;
        echoTimerRef.current = setInterval(() => {
          left -= 1;
          setEchoRemainingSeconds(left);
          if (left <= 0) {
            clearEchoTimers();
            onAfterLessonSentenceEnded(safeIdx, currentRepeat);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          if (isPlayingRef.current) {
            onAfterLessonSentenceEnded(safeIdx, currentRepeat);
          }
        }, 350);
      }
    }, { speaker: item.speaker, rate: effectiveRate });
  };

  const onAfterLessonSentenceEnded = (idx: number, currentRepeat: number) => {
    if (!isPlayingRef.current) return;

    const currentMode = playModeRef.current;

    if (currentMode === 'three_times') {
      if (currentRepeat < 3) {
        const nextRepeat = currentRepeat + 1;
        setRepeatCount(nextRepeat);
        repeatCountRef.current = nextRepeat;
        playLessonItem(idx, nextRepeat);
      } else {
        // Done with 3 times! Move to next track
        setRepeatCount(1);
        repeatCountRef.current = 1;
        handleNextTrack(idx);
      }
    } else if (currentMode === 'single_loop') {
      setRepeatCount(1);
      repeatCountRef.current = 1;
      playLessonItem(idx, 1);
    } else {
      // Sequential or Shuffle: advance to next track
      setRepeatCount(1);
      repeatCountRef.current = 1;
      handleNextTrack(idx);
    }
  };

  const handleNextTrack = (fromIdx?: number) => {
    clearEchoTimers();
    if (currentChannelRef.current === 'lessons') {
      const list = playlistRef.current;
      if (!list || list.length === 0) return;
      const baseIdx = fromIdx !== undefined ? fromIdx : currentIndexRef.current;
      let nextIdx = baseIdx + 1;

      if (playModeRef.current === 'shuffle') {
        if (list.length > 1) {
          let rnd = Math.floor(Math.random() * list.length);
          let attempts = 0;
          while (rnd === baseIdx && attempts < 10) {
            rnd = Math.floor(Math.random() * list.length);
            attempts++;
          }
          nextIdx = rnd;
        } else {
          nextIdx = 0;
        }
      } else if (nextIdx >= list.length) {
        nextIdx = 0;
      }
      setCurrentIndex(nextIdx);
      currentIndexRef.current = nextIdx;
      setRepeatCount(1);
      repeatCountRef.current = 1;
      setTimeout(() => {
        if (isPlayingRef.current) {
          playLessonItem(nextIdx, 1);
        }
      }, 250);
    } else {
      // Next story paragraph
      const story = allStories.find(s => s.id === selectedStoryIdRef.current) || allStories[0];
      const totalP = story.paragraphs.length;
      const baseP = fromIdx !== undefined ? fromIdx : storyParagraphIdxRef.current;
      let nextP = baseP + 1;
      if (nextP >= totalP) {
        nextP = 0;
      }
      setStoryParagraphIdx(nextP);
      storyParagraphIdxRef.current = nextP;
      setTimeout(() => {
        if (isPlayingRef.current) {
          playStoryParagraph(story, nextP);
        }
      }, 250);
    }
  };

  const handlePrevTrack = () => {
    clearEchoTimers();
    if (currentChannelRef.current === 'lessons') {
      const list = playlistRef.current;
      if (!list || list.length === 0) return;
      const cur = currentIndexRef.current;
      const prevIdx = cur > 0 ? cur - 1 : list.length - 1;
      setCurrentIndex(prevIdx);
      currentIndexRef.current = prevIdx;
      setRepeatCount(1);
      repeatCountRef.current = 1;
      setTimeout(() => {
        if (isPlayingRef.current) {
          playLessonItem(prevIdx, 1);
        }
      }, 250);
    } else {
      const story = allStories.find(s => s.id === selectedStoryIdRef.current) || allStories[0];
      const curP = storyParagraphIdxRef.current;
      const prevP = curP > 0 ? curP - 1 : story.paragraphs.length - 1;
      setStoryParagraphIdx(prevP);
      storyParagraphIdxRef.current = prevP;
      setTimeout(() => {
        if (isPlayingRef.current) {
          playStoryParagraph(story, prevP);
        }
      }, 250);
    }
  };

  // Play Story Paragraph
  const playStoryParagraph = (story: RadioStory, pIdx: number) => {
    const p = story.paragraphs[pIdx];
    if (!p) return;

    clearEchoTimers();
    setIsPlaying(true);
    isPlayingRef.current = true;
    setStoryParagraphIdx(pIdx);
    storyParagraphIdxRef.current = pIdx;

    speakText(p.english, () => {
      if (!isPlayingRef.current) return;

      setTimeout(() => {
        if (!isPlayingRef.current) return;
        const total = story.paragraphs.length;
        if (pIdx + 1 < total) {
          const nextIdx = pIdx + 1;
          setStoryParagraphIdx(nextIdx);
          storyParagraphIdxRef.current = nextIdx;
          playStoryParagraph(story, nextIdx);
        } else {
          // Finished story! Award emeralds
          if (onAwardEmeralds) {
            onAwardEmeralds(5, 20, `听完故事《${story.titleZh}》`);
            playEmeraldSound();
          }
          const nextIdx = 0;
          setStoryParagraphIdx(nextIdx);
          storyParagraphIdxRef.current = nextIdx;
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }, 800);
    }, { speaker: p.speaker, rate: speechRateRef.current });
  };

  const handleTogglePlay = () => {
    playClickSound();
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    if (currentChannelRef.current === 'lessons') {
      playLessonItem(currentIndexRef.current, repeatCountRef.current || 1);
    } else {
      const story = allStories.find(s => s.id === selectedStoryIdRef.current) || allStories[0];
      playStoryParagraph(story, storyParagraphIdxRef.current);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    stopSpeech();
    clearEchoTimers();
  };

  const handleSkipEchoPause = () => {
    playClickSound();
    clearEchoTimers();
    onAfterLessonSentenceEnded(currentIndexRef.current, repeatCountRef.current);
  };

  const handleChannelSwitch = (channel: RadioChannel) => {
    playClickSound();
    handlePause();
    setCurrentChannel(channel);
    currentChannelRef.current = channel;
    setRepeatCount(1);
    repeatCountRef.current = 1;
  };

  const handleScopeChange = (scope: PlaylistScope) => {
    playClickSound();
    handlePause();
    setPlaylistScope(scope);
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    setRepeatCount(1);
  };

  const handleCollectVocab = (vocab: StoryVocab) => {
    playClickSound();
    speakText(vocab.word, { speaker: 'Alex', rate: 0.9 });
    if (!collectedVocabWords.has(vocab.word)) {
      setCollectedVocabWords(prev => new Set(prev).add(vocab.word));
      if (onAwardEmeralds) {
        onAwardEmeralds(1, 5, `收集故事生词 [${vocab.word}]`);
        playEmeraldSound();
      }
    }
  };

  // Switch to Alex Chat with active lesson or story prompt primed
  const handleLaunchAlexChatForCurrent = () => {
    playClickSound();
    handlePause();
    if (currentChannel === 'lessons') {
      const activeLesson = effectiveLessons.find(l => l.id === currentLessonItem.lessonId) || effectiveLessons[0];
      if (onSelectLessonForChat) {
        onSelectLessonForChat(activeLesson);
      }
    } else {
      setChatMessages(prev => [
        ...prev,
        {
          id: `story_discuss_${Date.now()}`,
          sender: 'system',
          text: `📖 开启《${currentStory.titleZh} (${currentStory.title})》故事讨论角！你可以问 Alex 老师关于本篇故事的任何情节！`,
          timestamp: Date.now()
        }
      ]);
    }
    setCurrentChannel('alex_chat');
  };

  const listenedMinutes = Math.floor(listenedSeconds / 60);

  return (
    <div className="w-full bg-slate-900 border-2 sm:border-4 border-[#355E20] rounded-2xl sm:rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] text-slate-100 font-sans relative overflow-hidden flex flex-col transition-all">
      
      {/* 1. Header & Channel Navigation Bar */}
      <div className="bg-slate-950 border-b-2 border-slate-800 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        
        {/* Channel Segmented Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => handleChannelSwitch('lessons')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono font-black text-xs transition-all flex items-center space-x-1.5 shrink-0 active:scale-95 ${
              currentChannel === 'lessons'
                ? 'bg-[#487E2C] text-white border-2 border-[#7CFC00] shadow-[0_0_10px_rgba(72,126,44,0.5)]'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>📘 课文精听</span>
          </button>

          <button
            onClick={() => handleChannelSwitch('mc_stories')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono font-black text-xs transition-all flex items-center space-x-1.5 shrink-0 active:scale-95 ${
              currentChannel === 'mc_stories'
                ? 'bg-amber-600 text-white border-2 border-amber-300 shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🌲 探险故事</span>
          </button>

          <button
            onClick={() => handleChannelSwitch('classic_fables')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono font-black text-xs transition-all flex items-center space-x-1.5 shrink-0 active:scale-95 ${
              currentChannel === 'classic_fables'
                ? 'bg-purple-600 text-white border-2 border-purple-300 shadow-[0_0_10px_rgba(147,51,234,0.5)]'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📜 经典寓言</span>
          </button>

          <button
            onClick={() => handleChannelSwitch('alex_chat')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono font-black text-xs transition-all flex items-center space-x-1.5 shrink-0 relative active:scale-95 ${
              currentChannel === 'alex_chat'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-2 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>🎙️ 连线 Alex (听后说)</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
          </button>
        </div>

        {/* Global Radio Controls & Listening Stats */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {currentChannel !== 'alex_chat' && (
            <>
              {/* Zen Immersion Blind Listening Toggle */}
              <button
                onClick={() => {
                  playClickSound();
                  setZenMode(!zenMode);
                }}
                className={`px-2.5 py-1 rounded-xl font-mono font-black text-xs flex items-center space-x-1.5 transition-all active:scale-95 border cursor-pointer ${
                  zenMode
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                    : 'bg-slate-900 text-amber-300 hover:text-amber-200 border-amber-500/40 hover:bg-slate-800'
                }`}
                title="切换至 Zen 盲听沉浸模式 (大唱盘·音波起伏·专注听辨)"
              >
                <Sparkles className="w-3.5 h-3.5 text-current" />
                <span>{zenMode ? '普通视图' : '✨ 盲听禅意'}</span>
              </button>

              {/* Radio Tuning Console (Settings Drawer) */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowSettingsDrawer(true);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-white hover:bg-slate-800 font-mono font-bold text-xs flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                title="打开电台调音台 (语速/字幕/连读/定时)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">调音台</span>
              </button>

              <button
                onClick={() => setShowCustomImporter(true)}
                className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 border border-yellow-300 rounded-xl text-xs font-mono font-black flex items-center space-x-1 transition-all active:scale-95 shadow-sm cursor-pointer"
                title="导入或创作自定义英语故事"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">导入故事</span>
              </button>
            </>
          )}

          {/* Sleep Timer */}
          <div className="relative flex items-center">
            <button
              onClick={() => {
                playClickSound();
                const timers: (number | null)[] = [null, 15, 30, 45, 60];
                const curIdx = timers.indexOf(sleepTimerMinutes);
                const next = timers[(curIdx + 1) % timers.length];
                setSleepTimerMinutes(next);
              }}
              className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                sleepTimerMinutes !== null
                  ? 'bg-purple-900/80 border-purple-400 text-purple-200 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="睡眠定时器"
            >
              <Moon className="w-3 h-3" />
              <span>{sleepTimerMinutes !== null ? `${Math.ceil((sleepRemainingSeconds || 0) / 60)}分` : '定时'}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-emerald-300 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/40 hidden sm:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>已听 {listenedMinutes} 分</span>
          </div>
        </div>
      </div>

      {/* 2. Main Content View */}
      {currentChannel === 'alex_chat' ? (
        <div className="p-3 sm:p-4">
          <AlexChatView
            profile={profile || ({} as UserProfile)}
            activeLesson={activeLessonForChat || (currentChannel === 'lessons' ? effectiveLessons.find(l => l.id === currentLessonItem.lessonId) || null : null)}
            messages={chatMessages}
            setMessages={setChatMessages}
            onAwardEmeralds={(amt, xp) => {
              if (onAwardEmeralds) onAwardEmeralds(amt, xp);
            }}
            onOpenSettings={onOpenSettings}
            onCompleteLesson={onCompleteLesson}
            onCheckMission={onCheckMission}
            onBackToMap={() => {
              setCurrentChannel('lessons');
            }}
          />
        </div>
      ) : zenMode ? (
        /* ================= ZEN BLIND LISTENING FULL IMMERSION VIEW ================= */
        <div className="p-3 sm:p-5 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px] relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Ambient Glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-25"
            style={{ background: `radial-gradient(circle at center, ${displayDisc.glow || 'rgba(16,185,129,0.4)'} 0%, transparent 65%)` }}
          />

          {/* Top Zen Bar */}
          <div className="w-full max-w-xl flex items-center justify-between gap-2 mb-2 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="bg-slate-900/90 text-amber-300 px-2.5 py-0.5 rounded-xl border border-slate-800 font-mono font-bold text-xs flex items-center space-x-1.5 shadow-sm">
                <span>{displayDisc.icon} Disc: {displayDisc.name}</span>
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold rounded-xl border border-emerald-500/40 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5" />
                <span>Zen 纯听力沉浸</span>
              </span>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setZenMode(false);
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono text-xs font-bold flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              title="退出 Zen 沉浸模式"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>退出禅意</span>
            </button>
          </div>

          {/* Vinyl Record in Zen Mode */}
          <div className="relative py-2 sm:py-3 flex items-center justify-center relative z-10">
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
              <div 
                className="w-full h-full rounded-full border-3 sm:border-4 border-black bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 shadow-[0_0_40px_rgba(0,0,0,0.9)] relative flex items-center justify-center"
                style={{ transform: `rotate(${discRotation}deg)` }}
              >
                {/* Concentric Groove Rings */}
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-slate-700/30" />
                <div className="absolute inset-4 sm:inset-6 rounded-full border border-slate-700/50" />
                <div className="absolute inset-7 sm:inset-9 rounded-full border border-slate-700/30" />
                <div className="absolute inset-10 sm:inset-12 rounded-full border border-slate-700/40" />
                
                {/* Vinyl Center Core Label */}
                <div className={`w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr ${displayDisc.color} border-2 border-black flex flex-col items-center justify-center text-white shadow-xl relative`}>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-950 rounded-full border border-white/60 shadow-inner" />
                  <span className="text-[8px] sm:text-[10px] font-mono font-black mt-1 uppercase tracking-wider text-amber-200 truncate max-w-[90%] text-center">
                    {displayDisc.name}
                  </span>
                </div>
              </div>

              {/* Stylus Tonearm Needle */}
              <div 
                className={`absolute top-0 right-1 w-10 h-16 sm:w-14 sm:h-24 border-r-3 sm:border-r-4 border-t-3 sm:border-t-4 border-amber-400 rounded-tr-2xl transition-transform duration-500 origin-top-right drop-shadow-xl ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              >
                <div className="absolute -bottom-1 -right-1.5 w-3 h-3 bg-amber-300 rounded-full border border-black" />
              </div>
            </div>
          </div>

          {/* Dynamic Audio Visualizer Waves */}
          <div className="flex items-center justify-center space-x-1.5 h-6 my-1.5 relative z-10">
            {[35, 75, 100, 50, 90, 60, 95, 45, 85, 70, 100, 40, 65, 80].map((heightPct, barIdx) => (
              <div
                key={barIdx}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? 'bg-gradient-to-t from-[#487E2C] via-emerald-400 to-amber-300 animate-pulse'
                    : 'bg-slate-800'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, heightPct)}%` : '4px',
                  animationDelay: `${barIdx * 60}ms`
                }}
              />
            ))}
          </div>

          {/* Track Headline in Zen Mode */}
          <div className="text-center space-y-0.5 my-1.5 max-w-lg relative z-10">
            <span className="text-xs sm:text-sm font-mono text-amber-300 font-bold bg-amber-950/80 px-3 py-0.5 rounded-full border border-amber-500/40 inline-block shadow-sm">
              {currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.titleZh}
            </span>
            <p className="text-[11px] text-slate-400 font-mono">
              主讲: <span className="text-white font-bold">{currentChannel === 'lessons' ? currentLessonItem?.speaker || 'Alex' : currentParagraph?.speaker || 'Alex'}</span>
              {currentChannel === 'lessons' && (
                <span className="ml-2 text-emerald-400">· 进度 {safeCurrentIndex + 1} / {playlist.length} 句</span>
              )}
            </p>
          </div>

          {/* Interactive Shadow Echo Pause Bar (Zen Mode) */}
          {isEchoPausing && (
            <div className="w-full max-w-md bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400/90 rounded-2xl p-2.5 my-1.5 animate-in fade-in zoom-in-95 duration-200 z-10 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <div className="flex items-center space-x-1.5 text-amber-300 font-black">
                  <Mic className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>🎙️ 影子跟读：大声复述刚才听到的句子！</span>
                </div>
                <button
                  onClick={handleSkipEchoPause}
                  className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs flex items-center space-x-1 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  <span>跳过</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-amber-400/40">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${echoTotalSeconds > 0 ? (echoRemainingSeconds / echoTotalSeconds) * 100 : 0}%` }}
                />
              </div>
              <div className="text-[10px] text-amber-200 font-mono mt-0.5 text-right font-bold">
                剩余练习时间: {echoRemainingSeconds} 秒
              </div>
            </div>
          )}

          {/* Subtitle Peek Strip in Zen Mode */}
          <div className="w-full max-w-lg my-1.5 relative z-10">
            {zenShowSubtitlesTemp ? (
              <div className="p-3 bg-slate-950/95 border border-slate-700/80 rounded-2xl text-center space-y-1.5 animate-in fade-in zoom-in-95 duration-200 shadow-xl">
                <div className="text-base sm:text-lg font-black text-white font-mono">
                  <ProsodicSentence 
                    text={currentChannel === 'lessons' ? currentLessonItem?.english : (currentParagraph?.english || '')} 
                    showProsody={showProsodyCues} 
                    onWordClick={(word) => {
                      handlePause();
                      speakText(word, { speaker: 'Alex', rate: 0.85 });
                    }}
                  />
                </div>
                <p className="text-xs text-emerald-300 font-medium font-mono">
                  {currentChannel === 'lessons' ? currentLessonItem?.chinese : (currentParagraph?.chinese || '')}
                </p>
                <button
                  onClick={() => setZenShowSubtitlesTemp(false)}
                  className="text-[10px] text-slate-400 hover:text-white font-mono underline cursor-pointer pt-0.5"
                >
                  隐藏字幕返回纯盲听
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => {
                    playClickSound();
                    setZenShowSubtitlesTemp(true);
                  }}
                  className="px-3.5 py-1.5 rounded-2xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 font-mono text-xs flex items-center justify-center space-x-2 mx-auto transition-all cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>🙈 盲听磨耳朵中 · 点击偷看原文字幕</span>
                </button>
              </div>
            )}
          </div>

          {/* Three Times Method Status */}
          {currentChannel === 'lessons' && playMode === 'three_times' && isPlaying && !isEchoPausing && (
            <div className="flex justify-center my-0.5 relative z-10">
              <div className="inline-flex items-center space-x-1.5 bg-[#1B3314] border border-[#7CFC00]/60 px-3 py-1 rounded-full text-xs font-mono text-emerald-300 shadow-sm animate-pulse">
                <span>🎧 三遍精听: </span>
                <span className="font-black text-amber-300">
                  {repeatCount === 1 ? '第 1 遍（听音律）' : repeatCount === 2 ? '第 2 遍（辨词义）' : '第 3 遍（跟读）'}
                </span>
                <span className="text-[10px] text-slate-400">({repeatCount}/3)</span>
              </div>
            </div>
          )}

          {/* Zen Mode Transport Controls */}
          <div className="flex items-center justify-center space-x-5 sm:space-x-8 mt-2 relative z-10">
            <button
              onClick={handlePrevTrack}
              className="p-2.5 sm:p-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 active:scale-95 transition-all shadow-md cursor-pointer"
              title="上一句 / 上一段"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)]'
                  : 'bg-gradient-to-tr from-[#487E2C] to-emerald-600 text-white border-[#7CFC00] hover:from-[#355E20] hover:to-emerald-500 shadow-[0_0_25px_rgba(72,126,44,0.6)]'
              }`}
              title={isPlaying ? '暂停' : '开始播讲'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => handleNextTrack()}
              className="p-2.5 sm:p-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 active:scale-95 transition-all shadow-md cursor-pointer"
              title="下一句 / 下一段"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>
      ) : (
        /* ================= IMMERSIVE 2-COLUMN BALANCED BENTO LAYOUT (6:6 GRID) ================= */
        <div className="p-2 sm:p-3 lg:p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
          
          {/* ================= LEFT COLUMN: Compact Hi-Fi Player Deck & Dynamic Subtitles (6 Cols) ================= */}
          <div className="lg:col-span-6 flex flex-col space-y-2.5 sm:space-y-3">
            
            {/* Jukebox Stage Card - Compact High-Fi Design */}
            <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-800 rounded-2xl p-3 sm:p-3.5 shadow-inner overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Theme Glow */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
                style={{ background: `radial-gradient(circle at 30% 30%, ${displayDisc.glow || 'rgba(16,185,129,0.3)'} 0%, transparent 70%)` }}
              />

              {/* Stage Top Bar: Disc Badge & Scope Selector */}
              <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                <div className="flex items-center space-x-1.5">
                  <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-lg border border-slate-800 font-mono font-bold text-xs flex items-center space-x-1 shadow-xs">
                    <span>{displayDisc.icon} Disc: {displayDisc.name}</span>
                  </span>
                  {isPlaying && (
                    <span className="flex items-center space-x-0.5 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold rounded-md border border-emerald-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                      播讲中
                    </span>
                  )}
                </div>

                {/* Scope filter (Lesson Mode) */}
                {currentChannel === 'lessons' ? (
                  <div className="flex items-center space-x-0.5 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] sm:text-[11px] font-mono">
                    <button
                      onClick={() => handleScopeChange('all')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-bold ${
                        playlistScope === 'all' ? 'bg-[#487E2C] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      全部
                    </button>
                    <button
                      onClick={() => handleScopeChange('current')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-bold ${
                        playlistScope === 'current' ? 'bg-[#487E2C] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      本课
                    </button>
                    <button
                      onClick={() => handleScopeChange('recent5')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-bold ${
                        playlistScope === 'recent5' ? 'bg-[#487E2C] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      近5课
                    </button>
                    <button
                      onClick={() => handleScopeChange('smart_review')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded-md transition-all font-bold flex items-center space-x-0.5 ${
                        playlistScope === 'smart_review' 
                          ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white shadow-xs' 
                          : 'text-amber-400/80 hover:text-amber-300'
                      }`}
                    >
                      <Brain className="w-2.5 h-2.5 mr-0.5" />
                      <span>复盘</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                    段落 {storyParagraphIdx + 1} / {currentStory.paragraphs.length}
                  </span>
                )}
              </div>

              {/* Compact Integrated Jukebox Strip */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2 sm:p-2.5 my-0.5 flex items-center gap-2.5 sm:gap-3.5 relative z-10 shadow-xs">
                
                {/* Compact Spinning Vinyl Disc with Stylus */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
                  <div 
                    className="w-full h-full rounded-full border-2 border-black bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 shadow-[0_0_15px_rgba(0,0,0,0.8)] relative flex items-center justify-center transition-transform"
                    style={{ transform: `rotate(${discRotation}deg)` }}
                  >
                    {/* Concentric Groove Rings */}
                    <div className="absolute inset-1 rounded-full border border-slate-700/30" />
                    <div className="absolute inset-2 rounded-full border border-slate-700/50" />
                    
                    {/* Vinyl Center Core Label */}
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr ${displayDisc.color} border border-black flex flex-col items-center justify-center text-white shadow-md relative`}>
                      <div className="w-1.5 h-1.5 bg-slate-950 rounded-full border border-white/60 shadow-inner" />
                      <span className="text-[5px] sm:text-[6px] font-mono font-black uppercase tracking-tighter text-amber-200 truncate max-w-[90%] text-center">
                        {displayDisc.name}
                      </span>
                    </div>
                  </div>

                  {/* Stylus Tonearm Needle */}
                  <div 
                    className={`absolute -top-1 right-0 w-5 h-8 sm:w-6 sm:h-10 border-r-2 border-t-2 border-amber-400 rounded-tr-lg transition-transform duration-500 origin-top-right drop-shadow-sm pointer-events-none ${
                      isPlaying ? 'rotate-12' : '-rotate-12 opacity-50'
                    }`}
                  >
                    <div className="absolute -bottom-1 -right-0.5 w-1.5 h-1.5 bg-amber-300 rounded-full border border-black" />
                  </div>
                </div>

                {/* Track Info & Realtime Dynamic Audio Waves */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs sm:text-sm font-mono text-amber-300 font-black truncate">
                      {currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.titleZh}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                      {currentChannel === 'lessons' ? `${safeCurrentIndex + 1}/${playlist.length} 句` : `第 ${storyParagraphIdx + 1} 段`}
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                    主讲: <span className="text-slate-200 font-bold">{currentChannel === 'lessons' ? currentLessonItem?.speaker || 'Alex' : currentParagraph?.speaker || 'Alex'}</span>
                  </p>

                  {/* Dynamic Soundwave Bars */}
                  <div className="flex items-center space-x-1 h-3 pt-0.5">
                    {[30, 65, 100, 45, 80, 50, 90, 40, 75, 55, 95, 35, 60, 85].map((heightPct, barIdx) => (
                      <div
                        key={barIdx}
                        className={`w-0.5 sm:w-1 rounded-full transition-all duration-300 ${
                          isPlaying
                            ? 'bg-gradient-to-t from-emerald-500 to-amber-300 animate-pulse'
                            : 'bg-slate-800'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(25, heightPct)}%` : '2px',
                          animationDelay: `${barIdx * 60}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Subtitle Teleprompter Board - Extended & Prominent */}
              <div className="my-1 p-2 sm:p-2.5 bg-slate-950/95 rounded-xl border border-slate-800 min-h-[68px] sm:min-h-[78px] flex flex-col justify-center items-center space-y-1 shadow-inner relative z-10">
                {subtitleMode !== 'chinese_only' && subtitleMode !== 'blind_listening' && (
                  <div className="text-sm sm:text-base lg:text-lg font-black text-white leading-snug tracking-wide text-center">
                    <ProsodicSentence 
                      text={currentChannel === 'lessons' ? currentLessonItem?.english : (currentParagraph?.english || '')} 
                      showProsody={showProsodyCues} 
                      onWordClick={(word) => {
                        handlePause();
                        speakText(word, { speaker: 'Alex', rate: 0.85 });
                      }}
                    />
                  </div>
                )}

                {subtitleMode !== 'english_only' && subtitleMode !== 'blind_listening' && (
                  <p className="text-[11px] sm:text-xs text-slate-300 font-bold text-center">
                    {currentChannel === 'lessons' ? currentLessonItem?.chinese : (currentParagraph?.chinese || '')}
                  </p>
                )}

                {subtitleMode === 'blind_listening' && (
                  <div className="text-center space-y-1 py-0.5">
                    <p className="text-[11px] text-amber-300 font-mono italic flex items-center justify-center gap-1">
                      <span>🙈</span>
                      <span>盲听磨耳朵模式 · 专注辨听原声音调</span>
                    </p>
                    <button
                      onClick={() => {
                        playClickSound();
                        setSubtitleMode('bilingual');
                      }}
                      className="text-[10px] text-slate-400 hover:text-white font-mono underline cursor-pointer"
                    >
                      点击显示双语对照
                    </button>
                  </div>
                )}
              </div>

              {/* Interactive Shadow Echo Pause Bar */}
              {isEchoPausing && (
                <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400/80 rounded-xl p-2 my-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <div className="flex items-center space-x-1.5 text-amber-300 font-black">
                      <Mic className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                      <span>🎙️ 影子跟读槽：请大声模仿刚才的英文！</span>
                    </div>
                    <button
                      onClick={handleSkipEchoPause}
                      className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-md font-black text-[11px] flex items-center space-x-1 active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      <span>跳过</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-amber-400/40">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${echoTotalSeconds > 0 ? (echoRemainingSeconds / echoTotalSeconds) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-amber-200/80 font-mono mt-0.5 text-right font-bold">
                    剩余练习: {echoRemainingSeconds} 秒
                  </div>
                </div>
              )}

              {/* Three-Times Method Status Indicator */}
              {currentChannel === 'lessons' && playMode === 'three_times' && isPlaying && !isEchoPausing && (
                <div className="flex justify-center my-0.5">
                  <div className="inline-flex items-center space-x-1.5 bg-[#1B3314] border border-[#7CFC00]/60 px-3 py-0.5 rounded-full text-[11px] font-mono text-emerald-300 shadow-xs animate-pulse">
                    <span>🎧 三遍精听法: </span>
                    <span className="font-black text-amber-300">
                      {repeatCount === 1 ? '第 1 遍（听辨音律）' : repeatCount === 2 ? '第 2 遍（强化理解）' : '第 3 遍（口型跟读）'}
                    </span>
                    <span className="text-[10px] text-slate-400">({repeatCount}/3)</span>
                  </div>
                </div>
              )}

            </div>

            {/* Transport Control Deck */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-2.5 sm:p-3 space-y-2">
              
              {/* Play Progress & Transport Buttons */}
              <div className="flex items-center justify-center space-x-3 sm:space-x-6">
                <button
                  onClick={handlePrevTrack}
                  className="p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
                  title="上一句 / 上一段"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer ${
                    isPlaying
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'bg-gradient-to-tr from-[#487E2C] to-emerald-600 text-white border-[#7CFC00] hover:from-[#355E20] hover:to-emerald-500 shadow-[0_0_20px_rgba(72,126,44,0.5)]'
                  }`}
                  title={isPlaying ? '暂停' : '开始播讲'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={() => handleNextTrack()}
                  className="p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
                  title="下一句 / 下一段"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Play Mode Selector Ribbon (Lesson Channel) */}
              {currentChannel === 'lessons' && (
                <div className="grid grid-cols-4 gap-1 pt-0.5 text-[10px] sm:text-[11px] font-mono">
                  <button
                    onClick={() => {
                      playClickSound();
                      setPlayMode('three_times');
                      playModeRef.current = 'three_times';
                      setRepeatCount(1);
                      repeatCountRef.current = 1;
                    }}
                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center space-y-0.5 transition-all cursor-pointer ${
                      playMode === 'three_times'
                        ? 'bg-[#487E2C]/30 border-[#7CFC00] text-emerald-200 font-black shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>三遍精听</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setPlayMode('sequential');
                      playModeRef.current = 'sequential';
                      setRepeatCount(1);
                      repeatCountRef.current = 1;
                    }}
                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center space-y-0.5 transition-all cursor-pointer ${
                      playMode === 'sequential'
                        ? 'bg-[#487E2C]/30 border-[#7CFC00] text-emerald-200 font-black shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Repeat className="w-3 h-3" />
                    <span>顺序播</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setPlayMode('shuffle');
                      playModeRef.current = 'shuffle';
                      setRepeatCount(1);
                      repeatCountRef.current = 1;
                    }}
                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center space-y-0.5 transition-all cursor-pointer ${
                      playMode === 'shuffle'
                        ? 'bg-[#487E2C]/30 border-[#7CFC00] text-emerald-200 font-black shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>随机播</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setPlayMode('single_loop');
                      playModeRef.current = 'single_loop';
                      setRepeatCount(1);
                      repeatCountRef.current = 1;
                    }}
                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center space-y-0.5 transition-all cursor-pointer ${
                      playMode === 'single_loop'
                        ? 'bg-[#487E2C]/30 border-[#7CFC00] text-emerald-200 font-black shadow-xs'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Disc className="w-3 h-3" />
                    <span>单句循环</span>
                  </button>
                </div>
              )}

              {/* Subtitle & Audio Feature Buttons (Cleaned Up & Streamlined) */}
              <div className="bg-slate-900/90 p-1.5 sm:p-2 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => {
                      playClickSound();
                      const nextVal = !enableEchoPause;
                      setEnableEchoPause(nextVal);
                      enableEchoPauseRef.current = nextVal;
                      if (!nextVal && isEchoPausing) {
                        clearEchoTimers();
                        onAfterLessonSentenceEnded(currentIndexRef.current, repeatCountRef.current);
                      }
                    }}
                    className={`px-2 py-0.5 rounded-md border font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      enableEchoPause 
                        ? 'bg-amber-500/20 border-amber-400/70 text-amber-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Mic className="w-2.5 h-2.5" />
                    <span>跟读停顿 ({enableEchoPause ? '开' : '关'})</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      setShowProsodyCues(!showProsodyCues);
                    }}
                    className={`px-2 py-0.5 rounded-md border font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      showProsodyCues 
                        ? 'bg-emerald-500/20 border-emerald-400/70 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Sparkle className="w-2.5 h-2.5" />
                    <span>连读标注</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      playClickSound();
                      setShowSettingsDrawer(true);
                    }}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-emerald-300 hover:text-emerald-200 rounded-md border border-slate-800 text-[10px] sm:text-[11px] font-bold cursor-pointer flex items-center space-x-1"
                    title="展开调音台设置"
                  >
                    <Sliders className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{speechRate}x · {subtitleMode === 'bilingual' ? '双语' : subtitleMode === 'english_only' ? '纯英' : subtitleMode === 'chinese_only' ? '纯中' : '盲听'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Quick 1-Click Transition to Alex Chat */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-500/40 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center space-x-2 text-left min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#487E2C] border border-[#7CFC00] flex items-center justify-center text-base shrink-0">
                  👩‍🦰
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-[11px] sm:text-xs text-white font-mono flex items-center gap-1 truncate">
                    <span>听后说实战：与 Alex 交流本篇</span>
                    <span className="px-1 py-0.2 bg-[#FF6321] text-white text-[8px] font-black rounded-full">+5💎</span>
                  </h4>
                  <p className="text-[10px] text-emerald-300/80 font-mono truncate">
                    针对《{currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.titleZh}》练口语
                  </p>
                </div>
              </div>

              <button
                onClick={handleLaunchAlexChatForCurrent}
                className="px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-mono font-black text-xs rounded-lg border border-emerald-300 shadow-xs flex items-center space-x-1 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <PhoneCall className="w-3 h-3 text-slate-950" />
                <span>连线</span>
              </button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: Interactive Playlist & Story Catalog & Vocab Chest (6 Cols) ================= */}
          <div className="lg:col-span-6 flex flex-col space-y-2.5 sm:space-y-3">
            
            {/* If Story Channel: Story Catalog Carousel */}
            {currentChannel !== 'lessons' && (
              <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-2.5 sm:p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono font-black text-xs text-white flex items-center space-x-1.5">
                    <BookMarked className="w-3.5 h-3.5 text-amber-400" />
                    <span>故事选集 ({activeStories.length})</span>
                  </h4>
                </div>

                <div className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar pr-1">
                  {activeStories.map(story => (
                    <button
                      key={story.id}
                      onClick={() => {
                        playClickSound();
                        setSelectedStoryId(story.id);
                        selectedStoryIdRef.current = story.id;
                        setStoryParagraphIdx(0);
                        storyParagraphIdxRef.current = 0;
                        setTimeout(() => playStoryParagraph(story, 0), 150);
                      }}
                      className={`w-full p-1.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                        selectedStoryId === story.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-xs'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className="text-base shrink-0">{story.discTheme.icon}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-xs truncate font-mono">{story.titleZh}</div>
                          <div className="text-[9px] text-slate-400 truncate font-mono">{story.title}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-amber-400 shrink-0">
                        {story.durationApprox}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Playlist Track Items / Story Paragraphs */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-2.5 sm:p-3 space-y-2 flex-1 flex flex-col">
              
              {/* Header with Title & Quick Controls */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-slate-800">
                <div className="flex items-center space-x-1.5">
                  <List className="w-3.5 h-3.5 text-emerald-400" />
                  <h4 className="font-mono font-black text-xs text-white">
                    {currentChannel === 'lessons' 
                      ? `课文剧目 (${lessonGroups.length} 课 · ${playlist.length} 句)` 
                      : `故事段落 (${currentStory.paragraphs.length} 段)`}
                  </h4>
                </div>

                {currentChannel === 'lessons' ? (
                  <div className="flex items-center space-x-1 text-[10px] font-mono">
                    <button
                      onClick={expandAllLessons}
                      className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                      title="展开所有课文"
                    >
                      展开
                    </button>
                    <button
                      onClick={collapseAllLessons}
                      className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                      title="只保留当前播放课文"
                    >
                      折叠
                    </button>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">
                    第 {storyParagraphIdx + 1} 段
                  </span>
                )}
              </div>

              {/* Lesson Channel Quick Search / Filter Bar */}
              {currentChannel === 'lessons' && lessonGroups.length > 3 && (
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={lessonFilterQuery}
                    onChange={(e) => setLessonFilterQuery(e.target.value)}
                    placeholder="搜索课文标题、课号或重点句..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-7 pr-7 py-1 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-all"
                  />
                  {lessonFilterQuery && (
                    <button
                      onClick={() => setLessonFilterQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Scrollable Grouped Lesson List */}
              <div className="space-y-1.5 max-h-[280px] sm:max-h-[320px] lg:max-h-[350px] xl:max-h-[380px] overflow-y-auto custom-scrollbar pr-1 flex-1">
                {currentChannel === 'lessons' ? (
                  filteredLessonGroups.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 font-mono text-xs">
                      没有匹配到相关课文或句子
                    </div>
                  ) : (
                    filteredLessonGroups.map((group) => {
                      const isExpanded = expandedLessonIds.has(group.lessonId);
                      const isGroupActive = group.items.some(({ globalIndex }) => globalIndex === safeCurrentIndex);

                      return (
                        <div
                          key={group.lessonId}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            isGroupActive
                              ? 'bg-[#12230e] border-[#7CFC00]/60 shadow-[0_0_12px_rgba(124,252,0,0.12)]'
                              : 'bg-slate-900/90 border-slate-800/90 hover:border-slate-700'
                          }`}
                        >
                          {/* Lesson Card Accordion Header */}
                          <div
                            onClick={() => toggleLessonExpand(group.lessonId)}
                            className="p-2 sm:p-2.5 flex items-center justify-between gap-1.5 cursor-pointer select-none hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="flex items-center space-x-2 min-w-0">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-black shrink-0 border ${
                                isGroupActive
                                  ? 'bg-[#487E2C] text-white border-[#7CFC00]'
                                  : 'bg-slate-950 text-slate-300 border-slate-800'
                              }`}>
                                {group.discIcon || `L${group.lessonId}`}
                              </span>

                              <div className="min-w-0">
                                <div className="flex items-center space-x-1.5">
                                  <span className={`font-mono font-bold text-[11px] sm:text-xs truncate ${
                                    isGroupActive ? 'text-emerald-300' : 'text-white'
                                  }`}>
                                    {group.lessonTitle}
                                  </span>
                                  {isGroupActive && isPlaying && (
                                    <span className="flex items-center space-x-0.5 px-1 py-0.2 bg-emerald-500/20 text-emerald-300 text-[8px] font-mono font-black rounded border border-emerald-500/40 shrink-0">
                                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping mr-0.5" />
                                      播放中
                                    </span>
                                  )}
                                </div>
                                {group.lessonTitleZh && (
                                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">
                                    {group.lessonTitleZh}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-1 shrink-0">
                              {/* Quick Play Button for this whole lesson */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClickSound();
                                  const firstGlobalIndex = group.items[0]?.globalIndex ?? 0;
                                  setCurrentIndex(firstGlobalIndex);
                                  currentIndexRef.current = firstGlobalIndex;
                                  setRepeatCount(1);
                                  repeatCountRef.current = 1;
                                  setExpandedLessonIds(prev => new Set(prev).add(group.lessonId));
                                  playLessonItem(firstGlobalIndex, 1);
                                }}
                                className={`p-1 rounded-lg border flex items-center space-x-0.5 text-[9px] font-mono font-black transition-all active:scale-95 ${
                                  isGroupActive && isPlaying
                                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                                    : 'bg-slate-950 hover:bg-[#487E2C] text-slate-300 hover:text-white border-slate-800'
                                }`}
                                title="播放整课"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span className="hidden sm:inline">{group.items.length}句</span>
                              </button>

                              <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-emerald-400' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Sentences Inside This Lesson */}
                          {isExpanded && (
                            <div className="p-1.5 pt-0 space-y-1 border-t border-slate-800/80 bg-slate-950/60 animate-in fade-in duration-150">
                              {group.items.map(({ item, globalIndex }, itemIdx) => {
                                const isCurrent = globalIndex === safeCurrentIndex;
                                return (
                                  <div
                                    key={item.id}
                                    ref={isCurrent ? activeItemRef : undefined}
                                    onClick={() => {
                                      playClickSound();
                                      setCurrentIndex(globalIndex);
                                      currentIndexRef.current = globalIndex;
                                      setRepeatCount(1);
                                      repeatCountRef.current = 1;
                                      playLessonItem(globalIndex, 1);
                                    }}
                                    className={`p-1.5 sm:p-2 rounded-lg border text-left transition-all cursor-pointer flex items-start space-x-1.5 ${
                                      isCurrent
                                        ? 'bg-[#1B3314] border-[#7CFC00] text-emerald-100 shadow-xs'
                                        : 'bg-slate-900/70 border-slate-800/70 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                                    }`}
                                  >
                                    <div className="mt-0.5 shrink-0">
                                      {isCurrent && isPlaying ? (
                                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[7px] font-black animate-pulse">
                                          ▶
                                        </span>
                                      ) : (
                                        <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[8px] font-mono">
                                          {itemIdx + 1}
                                        </span>
                                      )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center space-x-1 mb-0.5">
                                        <span className="text-[8px] font-mono bg-slate-950 px-1 py-0.2 rounded text-slate-400">
                                          {item.speaker}
                                        </span>
                                        {item.type === 'target_sentence' && (
                                          <span className="text-[8px] font-mono text-amber-400/90 bg-amber-950/60 px-1 rounded">
                                            重点
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-[11px] sm:text-xs font-bold font-mono leading-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                                        {item.english}
                                      </p>
                                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 font-mono">
                                        {item.chinese}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )
                ) : (
                  currentStory.paragraphs.map((p, pIdx) => {
                    const isCurrent = pIdx === storyParagraphIdx;
                    return (
                      <div
                        key={pIdx}
                        ref={isCurrent ? activeItemRef : undefined}
                        onClick={() => {
                          playClickSound();
                          setStoryParagraphIdx(pIdx);
                          storyParagraphIdxRef.current = pIdx;
                          playStoryParagraph(currentStory, pIdx);
                        }}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-start space-x-2 ${
                          isCurrent
                            ? 'bg-amber-950/40 border-amber-400 text-amber-100 shadow-xs'
                            : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCurrent && isPlaying ? (
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[8px] font-black animate-pulse">
                              ▶
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px] font-mono">
                              {pIdx + 1}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1 mb-0.5">
                            <span className="text-[9px] font-mono bg-slate-950 px-1 py-0.2 rounded text-amber-300">
                              {p.speaker}
                            </span>
                          </div>
                          <p className={`text-xs font-bold font-mono ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                            {p.english}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {p.chinese}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Story Vocabulary Loot Chest (If In Story Channel) */}
            {currentChannel !== 'lessons' && currentStory.vocabularyLoot && (
              <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 space-y-2.5">
                <button
                  onClick={() => setShowVocabLoot(!showVocabLoot)}
                  className="w-full flex items-center justify-between text-xs font-mono font-bold text-amber-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>故事词汇宝箱 (点击领绿宝石 💎)</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showVocabLoot ? 'rotate-180' : ''}`} />
                </button>

                {showVocabLoot && (
                  <div className="grid grid-cols-2 gap-2 pt-1 animate-in fade-in">
                    {currentStory.vocabularyLoot.map((vocab, vIdx) => {
                      const isCollected = collectedVocabWords.has(vocab.word);
                      return (
                        <button
                          key={vIdx}
                          onClick={() => handleCollectVocab(vocab)}
                          className={`p-2.5 rounded-xl border text-left font-mono transition-all duration-150 flex flex-col justify-between hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm ${
                            isCollected 
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                              : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-black text-xs text-white">{vocab.word}</span>
                            <Volume2 className="w-3 h-3 text-amber-400" />
                          </div>
                          <p className="text-[9px] text-slate-400 mt-0.5">{vocab.phonetic}</p>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-800">
                            <span className="text-[10px] text-amber-300 truncate">{vocab.meaning}</span>
                            {isCollected ? (
                              <span className="text-[9px] text-emerald-400 font-bold">已收录 ✓</span>
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

          </div>

        </div>
      )}

      {/* Mobile Sticky Bottom Floating Playback Capsule */}
      {!zenMode && currentChannel !== 'alex_chat' && (
        <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-950/95 backdrop-blur-md border-2 border-emerald-500/50 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-2 animate-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
            <div 
              className="w-8 h-8 rounded-full border border-black bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center shrink-0 shadow-sm"
              style={{ transform: `rotate(${discRotation}deg)` }}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${displayDisc.color}`} />
            </div>
            <div className="min-w-0">
              <div className="font-mono font-black text-xs text-white truncate">
                {currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.titleZh}
              </div>
              <div className="text-[10px] text-emerald-300 font-mono truncate">
                {currentChannel === 'lessons' ? currentLessonItem?.english : currentParagraph?.english}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={handlePrevTrack}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 cursor-pointer"
              title="上一句"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={handleTogglePlay}
              className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 border cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 border-amber-300'
                  : 'bg-[#487E2C] text-white border-[#7CFC00]'
              }`}
              title={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={() => handleNextTrack()}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 cursor-pointer"
              title="下一句"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                setShowSettingsDrawer(true);
              }}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 active:scale-95 cursor-pointer"
              title="调音台"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Radio Tuning Console Settings Modal (调音台抽屉/弹窗) */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-slate-950 border-2 sm:border-4 border-[#355E20] rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 text-slate-100 font-sans shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#487E2C] border border-[#7CFC00] flex items-center justify-center text-white shadow-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black font-mono text-white flex items-center gap-2">
                    <span>🎛️ 电台调音台 (Radio Console)</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">自定义磨耳朵语速、字幕提词与沉浸模式</p>
                </div>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setShowSettingsDrawer(false);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Speech Speed Control */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-amber-300 flex items-center justify-between">
                <span>🎚️ 播讲语速 (Speech Speed)</span>
                <span className="text-emerald-400 font-black">{speechRate}x</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5 font-mono text-xs">
                {[
                  { rate: 0.7, label: '0.7x 慢速' },
                  { rate: 0.85, label: '0.85x 舒适' },
                  { rate: 1.0, label: '1.0x 标准' },
                  { rate: 1.15, label: '1.15x 进阶' },
                  { rate: 1.25, label: '1.25x 极速' }
                ].map(({ rate, label }) => (
                  <button
                    key={rate}
                    onClick={() => {
                      playClickSound();
                      setSpeechRate(rate);
                      speechRateRef.current = rate;
                    }}
                    className={`py-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      speechRate === rate
                        ? 'bg-[#487E2C] border-[#7CFC00] text-white shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    <span className="block text-[11px]">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Subtitle Display Mode */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-amber-300 flex items-center justify-between">
                <span>📝 字幕提词方式 (Subtitles)</span>
                <span className="text-slate-400 text-[11px]">
                  {subtitleMode === 'bilingual' ? '双语对照' : subtitleMode === 'english_only' ? '纯英文' : subtitleMode === 'chinese_only' ? '纯中文' : '盲听磨耳'}
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {[
                  { mode: 'bilingual', title: '双语对照', desc: '英汉同行' },
                  { mode: 'english_only', title: '纯英文', desc: '原声浸润' },
                  { mode: 'chinese_only', title: '纯中文', desc: '释义先导' },
                  { mode: 'blind_listening', title: '盲听磨耳', desc: '隐藏文字' }
                ].map(({ mode, title, desc }) => (
                  <button
                    key={mode}
                    onClick={() => {
                      playClickSound();
                      setSubtitleMode(mode as SubtitleMode);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      subtitleMode === mode
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Prosody & Connected Speech Toggles */}
            <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-blue-400" />
                    <span>连读与音律标注 (Connected Speech)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    在英文句子中显示连读符号 ‿ 、重音着重号与弱读虚化
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    setShowProsodyCues(!showProsodyCues);
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                    showProsodyCues ? 'bg-[#487E2C]' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${showProsodyCues ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* 4. Shadow Echo Pause Toggle */}
            <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono font-bold text-xs text-white flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    <span>影子跟读停顿槽 (Echo Shadow Pause)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    每句播讲完毕后预留 1~1.5x 句子时长的跟读停顿
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    const nextVal = !enableEchoPause;
                    setEnableEchoPause(nextVal);
                    enableEchoPauseRef.current = nextVal;
                  }}
                  className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                    enableEchoPause ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${enableEchoPause ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* 5. Sleep Timer */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-purple-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5" />
                  <span>🌙 睡眠定时器 (Sleep Timer)</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  {sleepTimerMinutes !== null ? `剩余约 ${Math.ceil((sleepRemainingSeconds || 0) / 60)} 分钟` : '关闭'}
                </span>
              </label>
              <div className="grid grid-cols-5 gap-1.5 font-mono text-xs">
                {[
                  { min: null, label: '关闭' },
                  { min: 15, label: '15分钟' },
                  { min: 30, label: '30分钟' },
                  { min: 45, label: '45分钟' },
                  { min: 60, label: '60分钟' }
                ].map(({ min, label }) => (
                  <button
                    key={label}
                    onClick={() => {
                      playClickSound();
                      setSleepTimerMinutes(min);
                    }}
                    className={`py-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      sleepTimerMinutes === min
                        ? 'bg-purple-900/80 border-purple-400 text-purple-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-[11px]">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Save & Confirm Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  setShowSettingsDrawer(false);
                }}
                className="w-full py-3 bg-[#487E2C] hover:bg-[#355E20] text-white font-mono font-black text-xs rounded-xl border-2 border-[#7CFC00] shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>保存调音并返回电台</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Custom Story Importer & Creator Management Modal */}
      {showCustomImporter && (
        <CustomStoryImporterModal
          isOpen={true}
          onClose={() => setShowCustomImporter(false)}
          customStories={customStories}
          userAccount={profile?.account}
          onStorySaved={(newStory) => {
            setCustomStories(prev => {
              const idx = prev.findIndex(s => s.id === newStory.id);
              if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = newStory;
                return updated;
              }
              return [newStory, ...prev];
            });
            const targetChannel: RadioChannel = newStory.category === 'mc_adventure' ? 'mc_stories' : 'classic_fables';
            setCurrentChannel(targetChannel);
            currentChannelRef.current = targetChannel;
            setSelectedStoryId(newStory.id);
            selectedStoryIdRef.current = newStory.id;
            setStoryParagraphIdx(0);
            storyParagraphIdxRef.current = 0;
            setTimeout(() => playStoryParagraph(newStory, 0), 200);
          }}
          onStoryDeleted={(deletedId) => {
            setCustomStories(prev => prev.filter(s => s.id !== deletedId));
            if (selectedStoryId === deletedId) {
              setSelectedStoryId(RADIO_STORIES[0].id);
              selectedStoryIdRef.current = RADIO_STORIES[0].id;
            }
          }}
        />
      )}
    </div>
  );
};
