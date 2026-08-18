import React, { useState, useEffect, useRef } from 'react';
import { Lesson, UserProfile, CourseVolumeId } from '../types';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle, 
  Clock, Sparkles, Disc, List, Eye, EyeOff, Award, ChevronDown, CheckCircle2, Moon, X
} from 'lucide-react';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { LESSONS_DATA, getLessonById } from '../data/lessonsData';

interface AudioImmersionRadioModalProps {
  isOpen?: boolean;
  lessons?: Lesson[];
  currentLessonId?: number;
  selectedVolumeId?: CourseVolumeId;
  profile?: UserProfile;
  onAwardEmeralds?: (emeralds: number, xp: number, reason?: string) => void;
  onClose: () => void;
}

export type PlayMode = 'three_times' | 'sequential' | 'shuffle' | 'single_loop';
export type SubtitleMode = 'bilingual' | 'english_only' | 'chinese_only' | 'blind_listening';

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
  { name: 'Stal', color: 'from-slate-700 to-slate-950', border: 'border-slate-400', icon: '⚫' }
];

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

  // Resolve effective lessons
  const effectiveLessons: Lesson[] = lessons && lessons.length > 0
    ? lessons
    : (selectedVolumeId === 'vol2'
        ? Array.from({ length: 96 }, (_, i) => getLessonById(i + 1, 'vol2'))
        : LESSONS_DATA);

  // Build Playlist from unlocked lessons safely
  const unlockedIds = profile?.unlockedLessonIds || [1];
  const unlockedLessons = effectiveLessons.filter(l => unlockedIds.includes(l.id));
  const activeLessonList = unlockedLessons.length > 0 ? unlockedLessons : effectiveLessons.slice(0, 10);

  const playlist: PlaylistItem[] = [];
  activeLessonList.forEach((lesson, lIdx) => {
    const discInfo = MINECRAFT_DISCS[lIdx % MINECRAFT_DISCS.length];

    // Add Dialogue turns
    if (lesson.dialogueScript && lesson.dialogueScript.length > 0) {
      lesson.dialogueScript.forEach((turn, tIdx) => {
        playlist.push({
          id: `l${lesson.id}_turn_${tIdx}`,
          lessonId: lesson.id,
          lessonTitle: `L${lesson.id}: ${lesson.title}`,
          speaker: turn.speaker,
          english: turn.text,
          chinese: turn.translation,
          type: 'dialogue',
          discName: discInfo.name,
          discColor: discInfo.color
        });
      });
    } else if (lesson.targetSentences && lesson.targetSentences.length > 0) {
      lesson.targetSentences.forEach((sentence, sIdx) => {
        playlist.push({
          id: `l${lesson.id}_sent_${sIdx}`,
          lessonId: lesson.id,
          lessonTitle: `L${lesson.id}: ${lesson.title}`,
          speaker: 'Alex',
          english: sentence,
          chinese: lesson.targetSentenceTranslations?.[sIdx] || lesson.grammarNote || '核心重点句型',
          type: 'target_sentence',
          discName: discInfo.name,
          discColor: discInfo.color
        });
      });
    }
  });

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

  const currentItem = playlist[currentIndex] || playlist[0];
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

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

  // Sleep Timer Countdown & Listening tracker
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
          // Award emeralds every 3 minutes of immersion listening
          if (next % 3 === 0 && onAwardEmeralds) {
            onAwardEmeralds(2, 10, '沉浸式磨耳朵电台听力奖励');
            playEmeraldSound();
          }
          return next;
        });
      }, 60000);
    }
    return () => clearInterval(listenTimer);
  }, [isPlaying]);

  // Cleanup speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const stopPlayback = () => {
    stopSpeech();
    setIsPlaying(false);
  };

  const playCurrentTrack = (indexToPlay?: number, customRepeatStep: number = 1) => {
    const idx = typeof indexToPlay === 'number' ? indexToPlay : currentIndex;
    const item = playlist[idx];
    if (!item) return;

    stopSpeech();
    setIsPlaying(true);
    setRepeatCount(customRepeatStep);

    // Speak using Edge-TTS with current rate
    speakText(item.english, () => {
      if (!isPlayingRef.current) return;

      // Handle Play Modes
      if (playMode === 'three_times') {
        if (customRepeatStep < 3) {
          // Play next repeat of the same sentence (with brief pause)
          setTimeout(() => {
            if (isPlayingRef.current) {
              playCurrentTrack(idx, customRepeatStep + 1);
            }
          }, 800);
          return;
        } else {
          // Move to next item after 3 repeats
          setTimeout(() => {
            if (isPlayingRef.current) {
              handleNextTrack();
            }
          }, 1200);
          return;
        }
      } else if (playMode === 'single_loop') {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playCurrentTrack(idx, 1);
          }
        }, 800);
      } else {
        // Sequential or Shuffle
        setTimeout(() => {
          if (isPlayingRef.current) {
            handleNextTrack();
          }
        }, 800);
      }
    }, { rate: speechRate });
  };

  const handleTogglePlay = () => {
    playClickSound();
    if (isPlaying) {
      stopPlayback();
    } else {
      playCurrentTrack(currentIndex, 1);
    }
  };

  const handleNextTrack = () => {
    let nextIdx = currentIndex + 1;
    if (playMode === 'shuffle') {
      nextIdx = Math.floor(Math.random() * playlist.length);
    } else if (nextIdx >= playlist.length) {
      nextIdx = 0;
    }
    setCurrentIndex(nextIdx);
    if (isPlaying) {
      playCurrentTrack(nextIdx, 1);
    }
  };

  const handlePrevTrack = () => {
    let prevIdx = currentIndex - 1;
    if (prevIdx < 0) prevIdx = playlist.length - 1;
    setCurrentIndex(prevIdx);
    if (isPlaying) {
      playCurrentTrack(prevIdx, 1);
    }
  };

  const handleSelectTrack = (idx: number) => {
    playClickSound();
    setCurrentIndex(idx);
    setShowPlaylistDrawer(false);
    playCurrentTrack(idx, 1);
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-[#18181b] border-2 sm:border-4 border-[#3b82f6] rounded-2xl sm:rounded-3xl w-full max-w-xl text-slate-100 shadow-[0_0_40px_rgba(59,130,246,0.35)] overflow-hidden my-auto max-h-[94dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header: Jukebox Title & Close */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-4 sm:p-5 border-b-2 border-blue-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-400 border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow-md text-black">
              📻
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono text-white flex items-center space-x-2">
                <span>Minecraft 唱片机 · 听力磨耳朵电台</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">Jukebox</span>
              </h2>
              <p className="text-xs text-blue-200/90 font-mono">
                纯正美音随身听 • 三遍精听法 • 睡前/碎片时间沉浸磨音
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
              className="px-2.5 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 text-xs font-mono font-bold rounded-xl border border-blue-400/40 flex items-center space-x-1 transition-all"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">曲目清单</span>
              <span>({playlist.length})</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white text-xs font-mono font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/20 transition-colors"
            >
              ✕ 关闭
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Main Jukebox Visualizer & Vinyl Disc */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-2xl p-4 sm:p-6 text-center shadow-inner overflow-hidden">
            
            {/* Ambient Background Disc Glow */}
            <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Top Track Info & Lesson Badge */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className="bg-slate-800 text-blue-300 px-2.5 py-1 rounded-lg border border-slate-700 font-bold flex items-center space-x-1">
                <span>🎵 Disc: {currentItem?.discName || 'Cat'}</span>
              </span>

              <span className="text-slate-400">
                {currentIndex + 1} / {playlist.length} 句
              </span>
            </div>

            {/* Spinning Minecraft Vinyl Record */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto my-2 flex items-center justify-center">
              {/* Outer Grooves */}
              <div 
                className={`w-full h-full rounded-full border-4 border-black bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 shadow-[0_0_25px_rgba(0,0,0,0.8)] relative flex items-center justify-center`}
                style={{ transform: `rotate(${discRotation}deg)` }}
              >
                {/* Vinyl Ring Lines */}
                <div className="absolute inset-2 rounded-full border border-slate-700/40" />
                <div className="absolute inset-4 rounded-full border border-slate-700/60" />
                <div className="absolute inset-7 rounded-full border border-slate-700/40" />
                
                {/* Center Disc Color Core */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr ${currentItem?.discColor || 'from-emerald-500 to-teal-700'} border-2 border-black flex flex-col items-center justify-center text-white shadow-md relative`}>
                  <div className="w-4 h-4 bg-slate-950 rounded-full border border-white/50" />
                  <span className="text-[9px] font-mono font-black mt-1 uppercase tracking-tighter">MC DISK</span>
                </div>
              </div>

              {/* Tonearm Stylus needle */}
              <div 
                className={`absolute top-0 right-2 w-10 h-16 sm:w-12 sm:h-20 border-r-4 border-t-4 border-amber-400 rounded-tr-2xl transition-transform duration-500 origin-top-right ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              />
            </div>

            {/* Lesson Title & Speaker */}
            <div className="space-y-1 mt-3">
              <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {currentItem?.lessonTitle}
              </span>
              <p className="text-xs text-slate-400 font-mono font-semibold">
                Speaker: <span className="text-white font-bold">{currentItem?.speaker}</span>
              </p>
            </div>

            {/* Subtitles Box */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 my-3 text-center space-y-2 min-h-[90px] flex flex-col justify-center shadow-sm">
              {subtitleMode !== 'blind_listening' && (
                <p className="font-mono text-base sm:text-lg font-black text-white leading-snug">
                  {currentItem?.english}
                </p>
              )}

              {(subtitleMode === 'bilingual' || subtitleMode === 'chinese_only') && (
                <p className="text-xs sm:text-sm text-slate-300 font-medium font-sans">
                  {currentItem?.chinese}
                </p>
              )}

              {subtitleMode === 'blind_listening' && (
                <div className="flex flex-col items-center justify-center py-2 text-slate-400 space-y-1">
                  <EyeOff className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono font-bold">盲听磨耳朵模式中 · 专注听觉反射</span>
                </div>
              )}
            </div>

            {/* Three-Times Method Status Pill */}
            {playMode === 'three_times' && isPlaying && (
              <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-mono text-blue-300 animate-pulse">
                <span>🎧 三遍精听法: </span>
                <span className="font-black text-amber-300">
                  {repeatCount === 1 ? '第 1 遍（听辨音律）' : repeatCount === 2 ? '第 2 遍（强化理解）' : '第 3 遍（口型跟读）'}
                </span>
                <span className="text-[10px] text-slate-400">({repeatCount}/3)</span>
              </div>
            )}
          </div>

          {/* Player Transport Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            
            {/* Play/Pause/Prev/Next Bar */}
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <button
                onClick={handlePrevTrack}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm"
                title="上一句"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl active:scale-95 ${
                  isPlaying
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                    : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-blue-400 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                }`}
                title={isPlaying ? '暂停' : '开始连播'}
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-slate-950" /> : <Play className="w-7 h-7 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 active:scale-95 transition-all shadow-sm"
                title="下一句"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Play Modes Grid Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
              <button
                onClick={() => {
                  playClickSound();
                  setPlayMode('three_times');
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

            {/* Playback Settings Controls (Speed, Subtitles, Sleep Timer) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800 text-xs font-mono">
              
              {/* Speed control */}
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
                <span className="text-[11px] text-slate-400 font-bold block">⚡ 语速调节：</span>
                <div className="flex items-center space-x-1">
                  {[0.75, 1.0, 1.25].map(rate => (
                    <button
                      key={rate}
                      onClick={() => {
                        playClickSound();
                        setSpeechRate(rate);
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
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
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
              <div className="bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/80 space-y-1.5">
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

          {/* Playlist Drawer Toggle */}
          {showPlaylistDrawer && (
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-3 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                <span>📜 当前播放列表（点击立即切歌）：</span>
                <button
                  onClick={() => setShowPlaylistDrawer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕ 收起
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                {playlist.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                      idx === currentIndex
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
                    {idx === currentIndex && (
                      <span className="shrink-0 text-blue-400 animate-pulse">▶ 播放中</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
