import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lesson, UserProfile, CourseVolumeId } from '../types';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, 
  Clock, Sparkles, Disc, List, Eye, EyeOff, Award, ChevronDown, CheckCircle2, Moon, X,
  Filter, Layers, BookOpen, Mic, Music, HelpCircle, Brain, ArrowRight, BookMarked,
  Sparkle, Volume1, ChevronRight, Bookmark, Plus, Wand2
} from 'lucide-react';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { LESSONS_DATA, getLessonById } from '../data/lessonsData';
import { RADIO_STORIES, RadioStory, StoryParagraph, StoryVocab } from '../data/radioStoriesData';
import { fetchCustomStories } from '../services/customStoriesService';
import { CustomStoryImporterModal } from './CustomStoryImporterModal';

interface AudioImmersionRadioModalProps {
  isOpen?: boolean;
  lessons?: Lesson[];
  currentLessonId?: number;
  selectedVolumeId?: CourseVolumeId;
  profile?: UserProfile;
  onAwardEmeralds?: (emeralds: number, xp: number, reason?: string) => void;
  onClose: () => void;
}

export type RadioChannel = 'lessons' | 'mc_stories' | 'classic_fables';
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

const MINECRAFT_DISCS = [
  { name: 'Cat', color: 'from-emerald-500 to-teal-700', border: 'border-emerald-400', icon: '🟢' },
  { name: 'Blocks', color: 'from-amber-500 to-orange-700', border: 'border-amber-400', icon: '🟠' },
  { name: 'Chirp', color: 'from-rose-500 to-red-700', border: 'border-rose-400', icon: '🔴' },
  { name: 'Mall', color: 'from-purple-500 to-indigo-700', border: 'border-purple-400', icon: '🟣' },
  { name: 'Mellohi', color: 'from-fuchsia-500 to-pink-700', border: 'border-fuchsia-400', icon: '🌸' },
  { name: 'Pigstep', color: 'from-amber-600 to-yellow-800', border: 'border-yellow-500', icon: '🟡' },
  { name: 'Stal', color: 'from-slate-700 to-slate-950', border: 'border-slate-400', icon: '⚫' },
  { name: 'Netherite (智能复盘)', color: 'from-purple-900 via-indigo-900 to-slate-950', border: 'border-purple-400', icon: '🌌' }
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

// Prosodic Sentence Component with safe static keys
const ProsodicSentence: React.FC<{ text: string; showProsody: boolean }> = ({ text, showProsody }) => {
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
              className="inline-block px-1.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-200 font-black shadow-xs"
              title="连读 (Linking)"
            >
              {displayToken}
            </span>
          );
        }

        if (isWeak) {
          return (
            <span key={`weak-${i}`} className="text-slate-400 font-medium opacity-80" title="弱读词 (Weak Form)">
              {token}
            </span>
          );
        }

        // Content / Stressed word
        return (
          <span key={`stress-${i}`} className="text-white font-black tracking-tight relative" title="句子重音 (Sentence Stress)">
            {token}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full opacity-60 pointer-events-none" />
          </span>
        );
      })}
    </span>
  );
};

export const AudioImmersionRadioModal: React.FC<AudioImmersionRadioModalProps> = ({
  isOpen = true,
  lessons,
  currentLessonId = 1,
  selectedVolumeId = 'vol1',
  profile,
  onAwardEmeralds,
  onClose
}) => {
  if (isOpen === false) return null;

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

  // Channels state: lessons vs mc_stories vs classic_fables
  const [currentChannel, setCurrentChannel] = useState<RadioChannel>('lessons');
  const [selectedStoryId, setSelectedStoryId] = useState<string>(RADIO_STORIES[0].id);
  const [storyParagraphIdx, setStoryParagraphIdx] = useState<number>(0);
  const [showVocabLoot, setShowVocabLoot] = useState<boolean>(false);
  const [showTranscriptDrawer, setShowTranscriptDrawer] = useState<boolean>(false);
  const [collectedVocabWords, setCollectedVocabWords] = useState<Set<string>>(new Set());

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
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState<boolean>(false);
  const [discRotation, setDiscRotation] = useState<number>(0);
  const [listenedMinutes, setListenedMinutes] = useState<number>(0);

  // Pedagogical Feature States
  const [enableEchoPause, setEnableEchoPause] = useState<boolean>(true);
  const [showProsodyCues, setShowProsodyCues] = useState<boolean>(true);
  const [showProsodyHelp, setShowProsodyHelp] = useState<boolean>(false);
  const [isEchoPausing, setIsEchoPausing] = useState<boolean>(false);
  const [echoRemainingSeconds, setEchoRemainingSeconds] = useState<number>(0);
  const [echoTotalSeconds, setEchoTotalSeconds] = useState<number>(0);

  // Refs for bulletproof async closure synchronization
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const currentChannelRef = useRef(currentChannel);
  currentChannelRef.current = currentChannel;
  const selectedStoryIdRef = useRef(selectedStoryId);
  selectedStoryIdRef.current = selectedStoryId;
  const storyParagraphIdxRef = useRef(storyParagraphIdx);
  storyParagraphIdxRef.current = storyParagraphIdx;
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
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
    const found = allStories.find(s => s.id === selectedStoryId);
    return found || activeStories[0] || allStories[0] || RADIO_STORIES[0];
  }, [selectedStoryId, activeStories, allStories]);

  // Lesson Playlist with Scope Filter & Robust Fallbacks
  const unlockedIds = profile?.unlockedLessonIds || [1];
  const unlockedLessons = effectiveLessons.filter(l => unlockedIds.includes(l.id));
  const baseLessonPool = unlockedLessons.length > 0 ? unlockedLessons : effectiveLessons.slice(0, 10);

  const playlist = useMemo<PlaylistItem[]>(() => {
    if (playlistScope === 'smart_review') {
      const masteredSet = new Set((profile?.masteredWords || []).map(w => w.toLowerCase()));
      const smartItems: PlaylistItem[] = [];

      baseLessonPool.forEach((lesson) => {
        if (lesson.targetSentences && lesson.targetSentences.length > 0) {
          lesson.targetSentences.forEach((sentence, sIdx) => {
            smartItems.push({
              id: `smart_l${lesson.id}_sent_${sIdx}`,
              lessonId: lesson.id,
              lessonTitle: `L${lesson.id}: ${lesson.title} [智能复盘]`,
              speaker: sIdx % 2 === 0 ? 'Alex' : 'Steve',
              english: sentence,
              chinese: lesson.targetSentenceTranslations?.[sIdx] || lesson.grammarNote || '艾宾浩斯核心重点句型',
              type: 'target_sentence',
              discName: 'Netherite (智能复盘)',
              discColor: 'from-purple-900 via-indigo-900 to-slate-950'
            });
          });
        }

        const hasUnmastered = (lesson.vocabulary || []).some(v => !masteredSet.has(v.word.toLowerCase()));
        if (hasUnmastered && lesson.dialogueScript && lesson.dialogueScript.length > 0) {
          lesson.dialogueScript.slice(0, 2).forEach((turn, tIdx) => {
            smartItems.push({
              id: `smart_l${lesson.id}_turn_${tIdx}`,
              lessonId: lesson.id,
              lessonTitle: `L${lesson.id}: ${lesson.title} [语境强化]`,
              speaker: turn.speaker || 'Alex',
              english: turn.text,
              chinese: turn.translation || '高频易错情境对话',
              type: 'dialogue',
              discName: 'Netherite (智能复盘)',
              discColor: 'from-purple-900 via-indigo-900 to-slate-950'
            });
          });
        }
      });

      if (smartItems.length > 0) return smartItems;
    }

    let scopedLessons = [...baseLessonPool];
    if (playlistScope === 'current') {
      scopedLessons = baseLessonPool.filter(l => l.id === currentLessonId);
      if (scopedLessons.length === 0 && baseLessonPool.length > 0) {
        scopedLessons = [baseLessonPool[baseLessonPool.length - 1]];
      }
    } else if (playlistScope === 'recent5') {
      scopedLessons = baseLessonPool.slice(-5);
    }

    const items: PlaylistItem[] = [];
    scopedLessons.forEach((lesson, lIdx) => {
      const discInfo = MINECRAFT_DISCS[lIdx % (MINECRAFT_DISCS.length - 1)];

      if (lesson.dialogueScript && lesson.dialogueScript.length > 0) {
        lesson.dialogueScript.forEach((turn, tIdx) => {
          items.push({
            id: `l${lesson.id}_turn_${tIdx}`,
            lessonId: lesson.id,
            lessonTitle: `L${lesson.id}: ${lesson.title}`,
            speaker: turn.speaker || 'Alex',
            english: turn.text,
            chinese: turn.translation || '课文情境对话',
            type: 'dialogue',
            discName: discInfo.name,
            discColor: discInfo.color
          });
        });
      }
      
      if (lesson.targetSentences && lesson.targetSentences.length > 0) {
        lesson.targetSentences.forEach((sentence, sIdx) => {
          items.push({
            id: `l${lesson.id}_sent_${sIdx}`,
            lessonId: lesson.id,
            lessonTitle: `L${lesson.id}: ${lesson.title}`,
            speaker: sIdx % 2 === 0 ? 'Alex' : 'Steve',
            english: sentence,
            chinese: lesson.targetSentenceTranslations?.[sIdx] || lesson.grammarNote || '核心重点句型',
            type: 'target_sentence',
            discName: discInfo.name,
            discColor: discInfo.color
          });
        });
      }

      if ((!lesson.dialogueScript || lesson.dialogueScript.length === 0) &&
          (!lesson.targetSentences || lesson.targetSentences.length === 0) &&
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
  }, [baseLessonPool, playlistScope, currentLessonId, profile?.masteredWords]);

  const playlistRef = useRef(playlist);
  playlistRef.current = playlist;

  // Safe current items
  const safeCurrentIndex = currentIndex < playlist.length ? currentIndex : 0;
  const currentLessonItem = playlist[safeCurrentIndex] || playlist[0];
  const currentParagraph = currentStory.paragraphs[storyParagraphIdx] || currentStory.paragraphs[0];

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
  useEffect(() => {
    let timer: any;
    if (sleepRemainingSeconds !== null && sleepRemainingSeconds > 0 && isPlaying) {
      timer = setInterval(() => {
        setSleepRemainingSeconds(prev => {
          if (prev === null || prev <= 1) {
            stopPlayback();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sleepRemainingSeconds, isPlaying]);

  // Track listening minutes for emerald rewards
  useEffect(() => {
    let listenTimer: any;
    if (isPlaying) {
      listenTimer = setInterval(() => {
        setListenedMinutes(prev => {
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
        if (isPlayingRef.current) {
          onComplete();
        }
      }
    }, 1000);
  };

  // Play a story paragraph
  const playStoryParagraph = (story: RadioStory, pIdx: number) => {
    clearPendingPlaybackTimer();
    stopSpeech();

    const targetIdx = Math.max(0, Math.min(pIdx, story.paragraphs.length - 1));
    const p = story.paragraphs[targetIdx];
    if (!p) return;

    setStoryParagraphIdx(targetIdx);
    storyParagraphIdxRef.current = targetIdx;
    setIsPlaying(true);

    speakText(p.english, () => {
      if (!isPlayingRef.current) return;

      const isLastParagraph = targetIdx >= story.paragraphs.length - 1;
      const wordCount = p.english.split(/\s+/).filter(Boolean).length;
      const calculatedEchoDuration = Math.max(2, Math.min(4, Math.ceil(wordCount * 0.35)));

      const proceedToNext = () => {
        if (isLastParagraph) {
          // Finished story, reward emeralds and loop to start or next story
          if (onAwardEmeralds) {
            onAwardEmeralds(5, 20, `完听英文故事《${story.titleZh}》`);
            playEmeraldSound();
          }
          playbackTimerRef.current = setTimeout(() => {
            if (isPlayingRef.current) {
              setStoryParagraphIdx(0);
              storyParagraphIdxRef.current = 0;
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

      setCurrentIndex(nextIdx);
      currentIndexRef.current = nextIdx;
      if (isPlayingRef.current) {
        playCurrentLessonTrack(nextIdx, 1);
      }
    } else {
      // Story next paragraph
      const nextP = (storyParagraphIdxRef.current + 1) % currentStory.paragraphs.length;
      setStoryParagraphIdx(nextP);
      storyParagraphIdxRef.current = nextP;
      if (isPlayingRef.current) {
        playStoryParagraph(currentStory, nextP);
      }
    }
  };

  // Master Prev Track
  const handlePrevTrack = () => {
    clearPendingPlaybackTimer();
    if (currentChannel === 'lessons') {
      const currentList = playlistRef.current;
      if (currentList.length === 0) return;

      let prevIdx = currentIndexRef.current - 1;
      if (prevIdx < 0) prevIdx = currentList.length - 1;

      setCurrentIndex(prevIdx);
      currentIndexRef.current = prevIdx;
      if (isPlayingRef.current) {
        playCurrentLessonTrack(prevIdx, 1);
      }
    } else {
      let prevP = storyParagraphIdxRef.current - 1;
      if (prevP < 0) prevP = currentStory.paragraphs.length - 1;
      setStoryParagraphIdx(prevP);
      storyParagraphIdxRef.current = prevP;
      if (isPlayingRef.current) {
        playStoryParagraph(currentStory, prevP);
      }
    }
  };

  // Channel switch handler
  const handleChannelSwitch = (channel: RadioChannel) => {
    playClickSound();
    clearPendingPlaybackTimer();
    stopSpeech();
    setCurrentChannel(channel);
    currentChannelRef.current = channel;

    if (channel !== 'lessons') {
      const available = allStories.filter(s => 
        channel === 'mc_stories' ? s.category === 'mc_adventure' : s.category === 'classic_fables'
      );
      const targetStory = available[0] || allStories[0] || RADIO_STORIES[0];
      setSelectedStoryId(targetStory.id);
      selectedStoryIdRef.current = targetStory.id;
      setStoryParagraphIdx(0);
      storyParagraphIdxRef.current = 0;
      if (isPlaying) {
        setTimeout(() => playStoryParagraph(targetStory, 0), 100);
      }
    } else {
      if (isPlaying) {
        setTimeout(() => playCurrentLessonTrack(currentIndexRef.current, 1), 100);
      }
    }
  };

  // Story switch handler
  const handleSelectStory = (story: RadioStory) => {
    playClickSound();
    clearPendingPlaybackTimer();
    stopSpeech();
    setSelectedStoryId(story.id);
    selectedStoryIdRef.current = story.id;
    setStoryParagraphIdx(0);
    storyParagraphIdxRef.current = 0;
    setShowTranscriptDrawer(false);
    if (isPlaying) {
      setTimeout(() => playStoryParagraph(story, 0), 100);
    }
  };

  // Collect vocab loot
  const handleCollectVocab = (vocab: StoryVocab) => {
    playClickSound();
    speakText(vocab.word, () => {}, { speaker: currentStory.narrator });
    if (!collectedVocabWords.has(vocab.word)) {
      setCollectedVocabWords(prev => new Set(prev).add(vocab.word));
      if (onAwardEmeralds) {
        onAwardEmeralds(1, 5, `领悟故事生词: ${vocab.word}`);
        playEmeraldSound();
      }
    }
  };

  const handleScopeChange = (newScope: PlaylistScope) => {
    playClickSound();
    clearPendingPlaybackTimer();
    setPlaylistScope(newScope);
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    if (isPlaying) {
      setTimeout(() => {
        playCurrentLessonTrack(0, 1);
      }, 100);
    }
  };

  const setTimerPreset = (minutes: number | null) => {
    playClickSound();
    setSleepTimerMinutes(minutes);
    setSleepRemainingSeconds(minutes ? minutes * 60 : null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleClose = () => {
    clearPendingPlaybackTimer();
    stopPlayback();
    onClose();
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-[#18181b] border-2 sm:border-4 border-[#3b82f6] rounded-2xl sm:rounded-3xl w-full max-w-xl text-slate-100 shadow-[0_0_40px_rgba(59,130,246,0.35)] overflow-hidden my-auto max-h-[94dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Header: Jukebox Title & Close */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-3 sm:p-4 border-b-2 border-blue-500/40 flex items-center justify-between">
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
            {currentChannel === 'lessons' ? (
              <button
                onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
                className="px-2 sm:px-2.5 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-xs font-mono font-bold rounded-xl border border-blue-400/40 flex items-center space-x-1 transition-all"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">曲目</span>
                <span>({playlist.length})</span>
              </button>
            ) : (
              <button
                onClick={() => setShowTranscriptDrawer(!showTranscriptDrawer)}
                className="px-2 sm:px-2.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/40 text-purple-200 text-xs font-mono font-bold rounded-xl border border-purple-400/40 flex items-center space-x-1 transition-all"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">故事库</span>
                <span>({activeStories.length})</span>
              </button>
            )}

            <button
              onClick={handleClose}
              className="text-slate-300 hover:text-white text-xs font-mono font-bold bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/20 transition-colors"
            >
              ✕ 关闭
            </button>
          </div>
        </div>

        {/* Channel Switcher Tabs Bar */}
        <div className="bg-slate-950 border-b border-slate-800 p-1.5 sm:p-2 flex items-center justify-between gap-1 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => handleChannelSwitch('lessons')}
            className={`flex-1 min-w-[100px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all ${
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
            className={`flex-1 min-w-[110px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all ${
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
            className={`flex-1 min-w-[110px] py-1.5 px-2 rounded-xl text-xs font-mono font-black flex items-center justify-center space-x-1.5 transition-all ${
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
            className="py-1.5 px-2.5 rounded-xl text-xs font-mono font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 shadow-md flex items-center justify-center space-x-1 shrink-0 transition-all active:scale-95 border border-yellow-300"
            title="一键粘贴文本或通过 AI 导入自定义英语故事"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">导入/创作故事</span>
            <span className="sm:hidden">导入</span>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-3 sm:p-5 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* If Story Channel: Quick Story Switcher Carousel */}
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
                  onClick={() => setShowTranscriptDrawer(!showTranscriptDrawer)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2 py-1 rounded-lg border border-slate-700 transition-all flex items-center space-x-1"
                >
                  <List className="w-3 h-3" />
                  <span>换故事</span>
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
                    className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                      playlistScope === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    全部
                  </button>
                  <button
                    onClick={() => handleScopeChange('current')}
                    className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                      playlistScope === 'current' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    本课
                  </button>
                  <button
                    onClick={() => handleScopeChange('recent5')}
                    className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                      playlistScope === 'recent5' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    近5课
                  </button>
                  <button
                    onClick={() => handleScopeChange('smart_review')}
                    className={`px-1.5 py-0.5 rounded transition-all font-bold flex items-center space-x-0.5 ${
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

            {/* Spinning Minecraft Vinyl Record */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 landscape-compact-disc mx-auto my-1 sm:my-2 flex items-center justify-center transition-all">
              {/* Outer Grooves */}
              <div 
                className="w-full h-full rounded-full border-4 border-black bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative flex items-center justify-center"
                style={{ transform: `rotate(${discRotation}deg)` }}
              >
                {/* Vinyl Ring Lines */}
                <div className="absolute inset-2 rounded-full border border-slate-700/40" />
                <div className="absolute inset-4 rounded-full border border-slate-700/60" />
                <div className="absolute inset-6 rounded-full border border-slate-700/40" />
                
                {/* Center Disc Color Core */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr ${displayDisc.color} border-2 border-black flex flex-col items-center justify-center text-white shadow-md relative`}>
                  <div className="w-3 h-3 bg-slate-950 rounded-full border border-white/50" />
                  <span className="text-[7px] sm:text-[8px] font-mono font-black mt-0.5 uppercase tracking-tighter">MC DISK</span>
                </div>
              </div>

              {/* Tonearm Stylus needle */}
              <div 
                className={`absolute top-0 right-2 w-8 h-12 sm:w-10 sm:h-16 border-r-4 border-t-4 border-amber-400 rounded-tr-2xl transition-transform duration-500 origin-top-right ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              />
            </div>

            {/* Title & Narrator Badge */}
            <div className="space-y-1 mt-1 sm:mt-2">
              <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {currentChannel === 'lessons' ? currentLessonItem?.lessonTitle : currentStory.categoryName}
              </span>
              <p className="text-xs text-slate-400 font-mono font-semibold">
                讲读人: <span className="text-white font-bold">{currentSpeaker === 'Steve' ? '👨 Steve (美音男声)' : '👩‍🦰 Alex (美音女声)'}</span>
              </p>
            </div>

            {/* Subtitles Box with Prosodic Visual Cues */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-3.5 sm:p-4 my-2.5 sm:my-3 text-center space-y-1.5 min-h-[90px] sm:min-h-[100px] flex flex-col justify-center shadow-sm relative">
              
              {subtitleMode !== 'blind_listening' && (
                <div className="font-mono text-sm sm:text-base md:text-lg font-black text-white leading-relaxed">
                  <ProsodicSentence text={currentEnglishText} showProsody={showProsodyCues} />
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
                  <span className="text-xs font-mono font-bold">盲听磨耳朵模式中 · 专注听觉反射</span>
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
                    className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded font-black text-[10px] flex items-center space-x-1 active:scale-95 transition-all"
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
                className="w-full flex items-center justify-between text-xs font-mono font-bold text-amber-300"
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
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 animate-loot-pulse'
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
                className="p-2.5 sm:p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm"
                title="上一句 / 上一段"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl active:scale-95 ${
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
                className="p-2.5 sm:p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm"
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
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
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
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
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
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
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
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
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
                  className={`px-2.5 py-1 rounded-lg border font-bold flex items-center space-x-1.5 transition-all ${
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
                  className={`px-2.5 py-1 rounded-lg border font-bold flex items-center space-x-1.5 transition-all ${
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
                className="text-slate-400 hover:text-amber-300 p-1 text-[11px] flex items-center space-x-0.5"
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
                <p>• <span className="text-slate-400">灰色较浅字体</span> 表示<strong>「虚词弱读（Weak Form）」</strong>。</p>
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
                      className={`flex-1 py-1 rounded-lg text-xs font-black border transition-all ${
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
                    className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
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
                    className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
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
                      className={`flex-1 py-1 rounded-lg text-[10px] font-black border transition-all ${
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

          {/* Lesson Mode: Playlist Drawer */}
          {showPlaylistDrawer && currentChannel === 'lessons' && (
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-3 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                <span className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>当前曲目清单（点击切歌）：</span>
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleScopeChange('all')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${playlistScope === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    全部
                  </button>
                  <button
                    onClick={() => handleScopeChange('current')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${playlistScope === 'current' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    本课
                  </button>
                  <button
                    onClick={() => handleScopeChange('recent5')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${playlistScope === 'recent5' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    近5课
                  </button>
                  <button
                    onClick={() => handleScopeChange('smart_review')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${playlistScope === 'smart_review' ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-amber-300'}`}
                  >
                    智能复盘
                  </button>
                  <button
                    onClick={() => setShowPlaylistDrawer(false)}
                    className="text-slate-400 hover:text-white ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {playlist.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      clearPendingPlaybackTimer();
                      setCurrentIndex(idx);
                      currentIndexRef.current = idx;
                      setShowPlaylistDrawer(false);
                      playCurrentLessonTrack(idx, 1);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                      idx === safeCurrentIndex
                        ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 overflow-hidden mr-2">
                      <span className="text-slate-500 w-6 text-right shrink-0">{idx + 1}.</span>
                      <div className="truncate">
                        <p className="truncate font-semibold text-slate-200">{item.english}</p>
                        <p className="text-[10px] text-slate-400 truncate">{item.lessonTitle} • {item.chinese}</p>
                      </div>
                    </div>
                    {idx === safeCurrentIndex && (
                      <span className="shrink-0 text-blue-400 animate-pulse">▶ 播放中</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Story Mode: Story Library & Transcript Drawer */}
          {showTranscriptDrawer && currentChannel !== 'lessons' && (
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-3 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                <span className="flex items-center space-x-2">
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <span>故事列表库（点击切换故事）：</span>
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setShowCustomImporter(true);
                    }}
                    className="text-[11px] bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm transition-transform active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>导入新故事</span>
                  </button>
                  <button
                    onClick={() => setShowTranscriptDrawer(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Story selector pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => handleSelectStory(story)}
                    className={`p-2.5 rounded-xl border text-left font-mono transition-all flex items-start space-x-2 ${
                      story.id === currentStory.id
                        ? 'bg-blue-600/30 border-blue-400 text-white font-bold shadow-xs'
                        : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{story.discTheme.icon}</span>
                    <div className="truncate flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-white truncate">{story.titleZh}</h4>
                        <span className="text-[9px] text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">
                          {story.durationApprox}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{story.title}</p>
                      <p className="text-[9px] text-slate-500 line-clamp-1 mt-1">{story.summary}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Current Story Paragraphs Flow */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                  📜 《{currentStory.titleZh}》全文段落（点击选段播放）：
                </span>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {currentStory.paragraphs.map((p, pIdx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playClickSound();
                        clearPendingPlaybackTimer();
                        setStoryParagraphIdx(pIdx);
                        storyParagraphIdxRef.current = pIdx;
                        setShowTranscriptDrawer(false);
                        playStoryParagraph(currentStory, pIdx);
                      }}
                      className={`w-full text-left p-2 rounded-xl border text-xs font-mono transition-all ${
                        pIdx === storyParagraphIdx
                          ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                          : 'bg-slate-800/40 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-amber-400 font-bold text-[10px] shrink-0 mt-0.5">P{pIdx + 1}.</span>
                        <div>
                          <p className="font-semibold text-slate-200 text-xs">{p.english}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{p.chinese}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

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
