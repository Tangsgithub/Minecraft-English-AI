import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Volume2, Play, Square, X, Mic, Headphones, CheckCircle2, Maximize2, Minimize2, Lock, ShieldCheck, Check, AlertTriangle, ArrowDown } from 'lucide-react';
import { Lesson, UserProfile } from '../types';
import { getBiomeChapterByUnit } from '../data/storyData';
import { speakText, stopSpeech, playClickSound, playEmeraldSound, playAnvilSound, playLevelUpSound } from '../utils/audio';
import { hasLessonAccess } from '../utils/volumeProgress';
import { MinecraftAvatar } from './MinecraftAvatar';
import { SceneOralCheckInModal, RealWorldSceneItem } from './SceneOralCheckInModal';
import { RedstoneLogicWorkbench } from './RedstoneLogicWorkbench';
import { StoryRetellingDeck } from './StoryRetellingDeck';
import { OralEvaluationModal } from './OralEvaluationModal';

interface LessonStudyModalProps {
  lesson: Lesson;
  profile?: UserProfile;
  isAlreadyCompleted?: boolean;
  onClose: () => void;
  onStartPractice: (lesson: Lesson) => void;
  onCompleteLesson?: (lessonId: number) => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
  onOpenVipModal?: () => void;
}

export interface WordGrammarRole {
  roleName: '主语' | '谓语' | '宾语' | '虚词';
  badgeCode: string;
  bgClass: string;
  badgeClass: string;
  slotClass: string;
}

export function getWordGrammarRole(word: string): WordGrammarRole {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');

  // Subjects / Pronouns
  if (['i', 'you', 'he', 'she', 'it', 'we', 'they', 'this', 'that', 'lets', "let's"].includes(clean)) {
    return {
      roleName: '主语',
      badgeCode: '主 S',
      bgClass: 'bg-blue-500 hover:bg-blue-400 text-white border-blue-900',
      badgeClass: 'bg-blue-950 text-blue-200 border-blue-400',
      slotClass: 'bg-blue-500 text-white border-black'
    };
  }

  // Verbs / Action words
  if (['want', 'craft', 'dig', 'look', 'find', 'build', 'make', 'use', 'need', 'see', 'eat', 'play', 'go', 'is', 'are', 'am', 'have', 'has', 'mine', 'place', 'smelt', 'cook', 'gather'].includes(clean)) {
    return {
      roleName: '谓语',
      badgeCode: '谓 V',
      bgClass: 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-black',
      badgeClass: 'bg-amber-950 text-amber-300 border-amber-500',
      slotClass: 'bg-amber-400 text-slate-950 border-black'
    };
  }

  // Auxiliary / Prepositions / Articles
  if (['a', 'an', 'the', 'to', 'for', 'at', 'in', 'on', 'with', 'of', 'from', 'my', 'your', 'his', 'her', 'our', 'their'].includes(clean)) {
    return {
      roleName: '虚词',
      badgeCode: '助 Aux',
      bgClass: 'bg-purple-600 hover:bg-purple-500 text-white border-purple-900',
      badgeClass: 'bg-purple-950 text-purple-200 border-purple-400',
      slotClass: 'bg-purple-600 text-white border-black'
    };
  }

  // Default: Nouns / Adjectives / Objects
  return {
    roleName: '宾语',
    badgeCode: '宾 O',
    bgClass: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-black',
    badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-400',
    slotClass: 'bg-emerald-500 text-slate-950 border-black'
  };
}

export function getRealWorldBridgesForLesson(lesson: Lesson) {
  const titleLower = (lesson.title || '').toLowerCase();
  const topicLower = (lesson.topic || '').toLowerCase();
  const sentences = lesson.targetSentences || [];
  const mainSentence = sentences[0] || lesson.dialogueScript?.[0]?.text || 'Is this your book?';

  // 1. Greetings, Belongings & Politeness (打扰/问候/失物认领)
  if (titleLower.includes('excuse me') || titleLower.includes('is this your') || titleLower.includes('sorry') || titleLower.includes('pardon') || titleLower.includes('whose') || topicLower.includes('belonging') || topicLower.includes('politeness')) {
    return [
      {
        id: 1,
        icon: '🏫',
        sceneTitle: '校园失物认领',
        gamePhrase: 'Excuse me! Is this your diamond sword?',
        realPhrase: 'Excuse me! Is this your water bottle on the desk?',
        cnMeaning: '把游戏里的“钻石剑”替换为校园里的“水壶”，礼貌询问同学'
      },
      {
        id: 2,
        icon: '🏠',
        sceneTitle: '家庭归属确认',
        gamePhrase: 'Is this Steve\'s handbag?',
        realPhrase: 'Excuse me, Mom! Is this your car key on the table?',
        cnMeaning: '把游戏里的“手提包”替换为生活中的“车钥匙”，向家人确认归属'
      },
      {
        id: 3,
        icon: '🚌',
        sceneTitle: '公共场所提醒',
        gamePhrase: 'Pardon? Is this your coat?',
        realPhrase: 'Pardon me, sir! Is this your umbrella by the door?',
        cnMeaning: '在图书馆或公交车站，礼貌提醒他人遗落的雨伞'
      }
    ];
  }

  // 2. Kitchen, Food, Grocery & Requests (厨房/美食/超市购物)
  if (titleLower.includes('kitchen') || titleLower.includes('coffee') || titleLower.includes('butcher') || titleLower.includes('food') || titleLower.includes('tea') || titleLower.includes('cup') || topicLower.includes('food') || topicLower.includes('kitchen') || topicLower.includes('shopping')) {
    return [
      {
        id: 1,
        icon: '🥪',
        sceneTitle: '家庭餐桌请求',
        gamePhrase: 'Give me some golden apples, please.',
        realPhrase: 'Could you please pass me some milk and bread for breakfast?',
        cnMeaning: '把游戏里的“金苹果”换成早餐桌上的“牛奶面包”，学会礼貌表达请求'
      },
      {
        id: 2,
        icon: '🛒',
        sceneTitle: '超市/水果店采买',
        gamePhrase: 'Do you want any pork or beef?',
        realPhrase: 'Do you want any fresh apples or bananas today?',
        cnMeaning: '在水果店或超市采买食材时，用该句型询问同伴需求'
      },
      {
        id: 3,
        icon: '☕',
        sceneTitle: '饮品店点餐',
        gamePhrase: 'A cup of potion, please.',
        realPhrase: 'A cup of warm chocolate milk, please!',
        cnMeaning: '在饮品店向店员礼貌点餐时的真实生活口语'
      }
    ];
  }

  // 3. Time, Urgency & Daily Routines (时间问答/紧急/日常作息)
  if (titleLower.includes('time') || titleLower.includes('hurry') || titleLower.includes('clock') || topicLower.includes('time') || topicLower.includes('routine')) {
    return [
      {
        id: 1,
        icon: '⏰',
        sceneTitle: '早晨起床时间',
        gamePhrase: 'What\'s the time? It\'s seven o\'clock.',
        realPhrase: 'What\'s the time? It\'s 7:15, time to get up for school!',
        cnMeaning: '早晨看钟表时，与家人询问和交流具体时间作息'
      },
      {
        id: 2,
        icon: '🏃',
        sceneTitle: '出门上学催促',
        gamePhrase: 'Hurry up! The creeper is coming!',
        realPhrase: 'Hurry up! The school bus is waiting at the gate!',
        cnMeaning: '临出门前提醒伙伴快速准备好的生动表达'
      },
      {
        id: 3,
        icon: '📅',
        sceneTitle: '周末习惯交流',
        gamePhrase: 'What do you do every morning?',
        realPhrase: 'What do you usually do on Saturday morning? I play soccer.',
        cnMeaning: '向同学分享自己周末的习惯和运动安排'
      }
    ];
  }

  // 4. Locations & Furniture (方位指示/家具陈设)
  if (titleLower.includes('where') || titleLower.includes('living room') || titleLower.includes('bookcase') || topicLower.includes('location') || topicLower.includes('furniture')) {
    return [
      {
        id: 1,
        icon: '🛋️',
        sceneTitle: '整理书房文具',
        gamePhrase: 'Where is the iron block? It\'s on the table.',
        realPhrase: 'Where is my English book? It\'s on the study desk.',
        cnMeaning: '在家寻找学习用品时，准确运用方位介词'
      },
      {
        id: 2,
        icon: '🎒',
        sceneTitle: '文具盒物品描述',
        gamePhrase: 'There are three chests in the room.',
        realPhrase: 'There are two pencils and a ruler in my pencil box.',
        cnMeaning: '向老师或同学介绍文具盒里的物品陈列'
      },
      {
        id: 3,
        icon: '🚪',
        sceneTitle: '玄关寻找随身物品',
        gamePhrase: 'Where are my diamonds? They are under the bed.',
        realPhrase: 'Where are my home keys? They are beside the door.',
        cnMeaning: '出门前寻找钥匙、红领巾等随身物品的对话'
      }
    ];
  }

  // 5. Weather & Climate (天气与季节)
  if (titleLower.includes('weather') || titleLower.includes('fine day') || titleLower.includes('climate') || topicLower.includes('weather')) {
    return [
      {
        id: 1,
        icon: '☀️',
        sceneTitle: '晨间出行选择',
        gamePhrase: 'What\'s the weather like in Nether? It\'s hot.',
        realPhrase: 'What\'s the weather like today? It\'s sunny and warm outside!',
        cnMeaning: '早上出门前根据天气情况选择穿搭与活动'
      },
      {
        id: 2,
        icon: '🌧️',
        sceneTitle: '雨天室内计划',
        gamePhrase: 'It is a fine day in Oak Forest.',
        realPhrase: 'It is raining outside today, so let\'s read books indoors.',
        cnMeaning: '下雨天与家人协商安排室内阅读或游戏'
      },
      {
        id: 3,
        icon: '❄️',
        sceneTitle: '季节运动交流',
        gamePhrase: 'Which season do you like?',
        realPhrase: 'I like winter because I can play in the snow with friends.',
        cnMeaning: '与同学表达对不同季节和户外运动的喜爱'
      }
    ];
  }

  // 6. Generic Smart Fallback - Dynamically adapted from lesson's main sentence!
  const cleanedMain = mainSentence
    .replace(/zombie|creeper|nether|enderman|steve|alex/gi, 'my friend')
    .replace(/diamond sword|wooden sword|iron pickaxe/gi, 'English textbook')
    .replace(/craft|mine|dig/gi, 'read');

  return [
    {
      id: 1,
      icon: '🏠',
      sceneTitle: '家庭日常实践',
      gamePhrase: mainSentence,
      realPhrase: cleanedMain,
      cnMeaning: `将《${lesson.titleZh}》的核心句型应用于家庭生活口语表达`
    },
    {
      id: 2,
      icon: '🏫',
      sceneTitle: '校园对话拓展',
      gamePhrase: `Look at this in Minecraft!`,
      realPhrase: `Look at this picture in our storybook, it's so interesting!`,
      cnMeaning: '在英语课堂和课间向同学用英文展示和交流'
    },
    {
      id: 3,
      icon: '⚽',
      sceneTitle: '课外运动社交',
      gamePhrase: `Let's build in Minecraft together.`,
      realPhrase: `Let's play basketball in the school playground together!`,
      cnMeaning: '在日常课外社交中邀请好朋友一起运动娱乐'
    }
  ];
}

export const LessonStudyModal: React.FC<LessonStudyModalProps> = ({
  lesson,
  profile,
  isAlreadyCompleted: isAlreadyCompletedProp,
  onClose,
  onStartPractice,
  onCompleteLesson,
  onAwardEmeralds,
  onOpenVipModal
}) => {
  const [hasPlayedFullDialogue, setHasPlayedFullDialogue] = useState<boolean>(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [studyNotice, setStudyNotice] = useState<string | null>(null);

  const [playedAudioIds, setPlayedAudioIds] = useState<Set<string>>(new Set());
  const [isPlayingAllDialogue, setIsPlayingAllDialogue] = useState<boolean>(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number | null>(null);
  const [isMaximized, setIsMaximized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mc_study_modal_maximized') === 'true';
    }
    return false;
  });
  const stopPlayRef = useRef<boolean>(false);

  const toggleMaximize = () => {
    playClickSound();
    setIsMaximized(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('mc_study_modal_maximized', String(next));
      }
      return next;
    });
  };

  const isAlreadyCompleted = isAlreadyCompletedProp || (profile ? (
    (profile.completedLessonIds || []).includes(lesson.id) ||
    lesson.id < profile.currentLessonId ||
    (profile.unlockedLessonIds.includes(lesson.id) && profile.unlockedLessonIds.includes(lesson.id + 1))
  ) : false);

  // Focus only on the top 1-2 core target sentence patterns per lesson
  const coreSentences = (lesson.targetSentences && lesson.targetSentences.length > 0)
    ? lesson.targetSentences.slice(0, 2)
    : [lesson.dialogueScript?.[0]?.text || 'Look at this!'];

  const coreSentenceTranslations = (lesson.targetSentenceTranslations && lesson.targetSentenceTranslations.length > 0)
    ? lesson.targetSentenceTranslations.slice(0, 2)
    : [lesson.dialogueScript?.[0]?.translation || '看看这个！'];

  // Scaffolding game state
  const [activeScaffoldSentenceIdx, setActiveScaffoldSentenceIdx] = useState<number>(0);
  const targetSentenceForScaffold = coreSentences[activeScaffoldSentenceIdx] || coreSentences[0];
  const cleanTargetWords = targetSentenceForScaffold.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [completedScaffoldIndices, setCompletedScaffoldIndices] = useState<Set<number>>(new Set());
  const isCurrentScaffoldFinished = completedScaffoldIndices.has(activeScaffoldSentenceIdx);
  const [isScaffoldSuccess, setIsScaffoldSuccess] = useState<boolean>(false);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());
  const [completedSceneTypes, setCompletedSceneTypes] = useState<Record<number, boolean>>({}); // sceneId -> isSpoken
  const [activeSceneForCheckIn, setActiveSceneForCheckIn] = useState<RealWorldSceneItem | null>(null);
  const [oralTarget, setOralTarget] = useState<{ text: string; translation?: string; phonetic?: string; mcIcon?: string } | null>(null);

  useEffect(() => {
    // Shuffle words for sentence crafting
    const scrambled = [...cleanTargetWords].sort(() => Math.random() - 0.5);
    setShuffledWords(scrambled);
    setSelectedWords([]);
    setIsScaffoldSuccess(completedScaffoldIndices.has(activeScaffoldSentenceIdx));
  }, [lesson.id, activeScaffoldSentenceIdx]);

  const handleSelectWordBlock = (word: string, indexInShuffled: number) => {
    playClickSound();
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    const newShuffled = shuffledWords.filter((_, i) => i !== indexInShuffled);
    setShuffledWords(newShuffled);

    // Check if finished
    if (newSelected.length === cleanTargetWords.length) {
      if (newSelected.join(' ').toLowerCase() === cleanTargetWords.join(' ').toLowerCase()) {
        setIsScaffoldSuccess(true);
        setCompletedScaffoldIndices(prev => new Set(prev).add(activeScaffoldSentenceIdx));
        playEmeraldSound();
        speakText(targetSentenceForScaffold);
        if (onAwardEmeralds) {
          onAwardEmeralds(3, 10);
        }
      }
    }
  };

  const handleResetScaffold = () => {
    playClickSound();
    const scrambled = [...cleanTargetWords].sort(() => Math.random() - 0.5);
    setShuffledWords(scrambled);
    setSelectedWords([]);
    setIsScaffoldSuccess(completedScaffoldIndices.has(activeScaffoldSentenceIdx));
  };

  useEffect(() => {
    return () => {
      stopPlayRef.current = true;
      stopSpeech();
    };
  }, []);

  const handlePlayAudio = (id: string, text: string, speaker?: string) => {
    if (isPlayingAllDialogue) {
      stopPlayRef.current = true;
      stopSpeech();
      setIsPlayingAllDialogue(false);
      setCurrentDialogueIndex(null);
    }
    speakText(text, { speaker });
    setPlayedAudioIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleTogglePlayAllDialogue = async () => {
    if (isPlayingAllDialogue) {
      stopPlayRef.current = true;
      stopSpeech();
      setIsPlayingAllDialogue(false);
      setCurrentDialogueIndex(null);
      return;
    }

    stopPlayRef.current = false;
    setIsPlayingAllDialogue(true);
    playClickSound();

    const script = lesson.dialogueScript;
    for (let i = 0; i < script.length; i++) {
      if (stopPlayRef.current) break;

      const turn = script[i];
      const audioId = `dialogue_${i}`;

      setCurrentDialogueIndex(i);
      setPlayedAudioIds(prev => {
        const next = new Set(prev);
        next.add(audioId);
        return next;
      });

      await speakText(turn.text, { speaker: turn.speaker });

      if (stopPlayRef.current) break;

      // Small natural pause between dialogue turns
      await new Promise(res => setTimeout(res, 350));
    }

    if (!stopPlayRef.current) {
      setHasPlayedFullDialogue(true);
      playEmeraldSound();
    }

    setIsPlayingAllDialogue(false);
    setCurrentDialogueIndex(null);
  };

  // Vocabulary Continuous Playback
  const [isPlayingAllVocab, setIsPlayingAllVocab] = useState<boolean>(false);
  const stopVocabPlayRef = useRef<boolean>(false);

  const handleTogglePlayAllVocab = async () => {
    if (isPlayingAllVocab) {
      stopVocabPlayRef.current = true;
      stopSpeech();
      setIsPlayingAllVocab(false);
      return;
    }

    stopVocabPlayRef.current = false;
    setIsPlayingAllVocab(true);
    playClickSound();

    const vocabs = lesson.vocabulary;
    for (let i = 0; i < vocabs.length; i++) {
      if (stopVocabPlayRef.current) break;
      const v = vocabs[i];
      const audioId = `vocab_${v.id}_${i}`;

      setPlayedAudioIds(prev => new Set(prev).add(audioId));
      await speakText(v.word);
      if (stopVocabPlayRef.current) break;
      await new Promise(res => setTimeout(res, 400));
    }

    if (!stopVocabPlayRef.current) {
      playEmeraldSound();
    }
    setIsPlayingAllVocab(false);
  };

  // Study Requirements Validation - Strict & Complete
  const realWorldScenes = getRealWorldBridgesForLesson(lesson);
  const dialogueAudioCount = Array.from(playedAudioIds).filter((id: string) => id.startsWith('dialogue_')).length;
  const playedVocabIds = Array.from(playedAudioIds).filter((id: string) => id.startsWith('vocab_'));

  const isDialogueDone = isAlreadyCompleted || hasPlayedFullDialogue || dialogueAudioCount >= lesson.dialogueScript.length;
  const isScaffoldDone = isAlreadyCompleted || completedScaffoldIndices.size >= coreSentences.length;
  const isRealWorldDone = isAlreadyCompleted || (realWorldScenes.length > 0 && completedQuests.size >= realWorldScenes.length);
  const isVocabDone = isAlreadyCompleted || (lesson.vocabulary.length > 0 && playedVocabIds.length >= lesson.vocabulary.length);

  const completedTaskCount = (isDialogueDone ? 1 : 0) + (isScaffoldDone ? 1 : 0) + (isRealWorldDone ? 1 : 0) + (isVocabDone ? 1 : 0);
  const isAllTasksCompleted = isAlreadyCompleted || completedTaskCount === 4;

  const scrollToSection = (sectionId: string, noticeText: string) => {
    setHighlightedSection(sectionId);
    setStudyNotice(noticeText);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setHighlightedSection(null), 3500);
    setTimeout(() => setStudyNotice(null), 4500);
  };

  const handleTriggerCompleteLesson = () => {
    if (!isAllTasksCompleted) {
      playAnvilSound();
      if (!isDialogueDone) {
        scrollToSection('section-dialogue', '🎧 任务 1：请收听课文对话全文（可点击【一键连读】整篇）！');
      } else if (!isScaffoldDone) {
        scrollToSection('section-scaffold', `🧱 任务 2：请完成全部 ${coreSentences.length} 个句型脚手架拼句（当前已完成 ${completedScaffoldIndices.size}/${coreSentences.length}）！`);
      } else if (!isRealWorldDone) {
        scrollToSection('section-realworld', `🎙️ 任务 3：请完成全部 ${realWorldScenes.length} 个生活场景的朗读打卡（当前已打卡 ${completedQuests.size}/${realWorldScenes.length}）！`);
      } else if (!isVocabDone) {
        scrollToSection('section-vocabulary', `📦 任务 4：请收听本课所有 ${lesson.vocabulary.length} 个核心词汇发音（当前已听 ${playedVocabIds.length}/${lesson.vocabulary.length}）！`);
      }
      return;
    }

    playEmeraldSound();
    if (onAwardEmeralds) {
      onAwardEmeralds(15, 30);
    }
    if (onCompleteLesson) {
      onCompleteLesson(lesson.id);
    }
    onClose();
  };

  const totalAudioItems = coreSentences.length + lesson.vocabulary.length + lesson.dialogueScript.length;
  const isAllPlayed = isAlreadyCompleted || playedAudioIds.size >= totalAudioItems;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto pt-safe pb-safe animate-in fade-in duration-200">
      <div
        className={`bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden my-auto flex flex-col transition-all duration-300 ${
          isMaximized
            ? 'w-[98vw] max-w-[98vw] h-[96dvh] max-h-[96dvh]'
            : 'w-full max-w-5xl xl:max-w-6xl max-h-[94dvh]'
        }`}
      >
        
        {/* Modal Header */}
        <div className="bg-[#487E2C] p-3.5 sm:p-5 border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#7CFC00] font-bold mb-1 flex-wrap gap-y-1">
              <span>Unit {lesson.unit}</span>
              <span>•</span>
              <span>Lesson {lesson.id}</span>
              <span>•</span>
              <span className="bg-black/20 px-2 py-0.5 rounded-full border border-white/20 text-white">
                {lesson.minecraftScene}
              </span>
              <span>•</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black border ${
                isAllTasksCompleted
                  ? 'bg-emerald-500/80 text-white border-emerald-300'
                  : 'bg-amber-500/80 text-amber-950 border-amber-300'
              }`}>
                {isAllTasksCompleted ? '✓ 学习已达标' : `学习任务: ${completedTaskCount}/4`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono leading-tight flex flex-wrap items-baseline gap-2">
              <span>{lesson.title}</span>
              <span className="text-sm sm:text-base font-normal text-amber-200 font-sans">({lesson.titleZh})</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-2">
            <button
              onClick={toggleMaximize}
              className="bg-black/20 hover:bg-black/40 text-white px-2.5 sm:px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border-2 border-white/30 transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
              title={isMaximized ? "还原窗口大小" : "切换为全屏大窗口"}
            >
              {isMaximized ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">还原小窗</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">全屏大窗</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="bg-black/20 hover:bg-red-600/80 text-white px-3 sm:px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border-2 border-white/30 transition-all shrink-0 whitespace-nowrap active:scale-95 shadow-sm"
            >
              ✕ 暂离
            </button>
          </div>
        </div>

        {/* Floating Study Guidance Toast */}
        {studyNotice && (
          <div className="sticky top-0 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 font-mono text-xs sm:text-sm font-black border-b-2 border-amber-700 shadow-md flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0 animate-bounce" />
              <span>{studyNotice}</span>
            </div>
            <button
              onClick={() => setStudyNotice(null)}
              className="text-slate-900 hover:text-black font-bold text-xs bg-amber-400 px-2 py-0.5 rounded border border-amber-600 ml-2"
            >
              知道了
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300">
            <h3 className="text-xs font-mono font-black text-amber-900 mb-2">📜 场景提要</h3>
            <p className="text-sm text-amber-950 font-bold">{lesson.sceneDescription}</p>
          </div>

          {/* 🛡️ 通关探险任务清单 (Study Quest Progress Tracker) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 sm:p-5 rounded-2xl border-3 border-emerald-600 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📋</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>探险通关学习任务单</span>
                    <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-2 py-0.2 rounded border border-emerald-600 font-bold">
                      {isAllTasksCompleted ? '全部已达成 ✨' : `达标进度: ${completedTaskCount}/4`}
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    完成以下 4 项核心学习环节，即可通关并解锁下一课探险！
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isAllTasksCompleted ? 'bg-gradient-to-r from-amber-400 to-emerald-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${isAlreadyCompleted ? 100 : (completedTaskCount / 4) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {isAlreadyCompleted ? '100%' : `${Math.round((completedTaskCount / 4) * 100)}%`}
                </span>
              </div>
            </div>

            {/* 4 Interactive Quest Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
              {/* Task 1: Dialogue Listening */}
              <div
                onClick={() => {
                  if (!isDialogueDone) {
                    scrollToSection('section-dialogue', '🎧 正在定位课文对话：可点击【连续朗读】连听整篇！');
                  }
                }}
                className={`p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isDialogueDone
                    ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span>🎧 1. 课文听读</span>
                  </span>
                  {isDialogueDone ? (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> 已完成
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 border border-amber-500/60 px-1.5 py-0.2 rounded">
                      待收听
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  {isDialogueDone ? '✓ 课文对话已听完' : `点击【连读整篇】听完全文 (${dialogueAudioCount}/${lesson.dialogueScript.length})`}
                </p>
              </div>

              {/* Task 2: Sentence Scaffolding */}
              <div
                onClick={() => {
                  if (!isScaffoldDone) {
                    scrollToSection('section-scaffold', `🧱 正在定位语法拼句：需完成本课全部 ${coreSentences.length} 个核心句型拼句！`);
                  }
                }}
                className={`p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isScaffoldDone
                    ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span>🧱 2. 方块拼句</span>
                  </span>
                  {isScaffoldDone ? (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> 已完成
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 border border-amber-500/60 px-1.5 py-0.2 rounded">
                      待拼句
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  {isScaffoldDone ? `✓ 全部 ${coreSentences.length} 个句型均已拼对` : `需拼对全部句型 (${completedScaffoldIndices.size}/${coreSentences.length})`}
                </p>
              </div>

              {/* Task 3: Real-World Oral Bridge */}
              <div
                onClick={() => {
                  if (!isRealWorldDone) {
                    scrollToSection('section-realworld', `🎙️ 正在定位生活场景：需完成全部 ${realWorldScenes.length} 个场景的朗读打卡！`);
                  }
                }}
                className={`p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isRealWorldDone
                    ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span>🎙️ 3. 场景打卡</span>
                  </span>
                  {isRealWorldDone ? (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> 已完成
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 border border-amber-500/60 px-1.5 py-0.2 rounded">
                      待打卡
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  {isRealWorldDone ? `✓ 全部 ${realWorldScenes.length} 个场景均已打卡` : `需打卡全部 3 场景 (${completedQuests.size}/${realWorldScenes.length})`}
                </p>
              </div>

              {/* Task 4: Vocabulary Study */}
              <div
                onClick={() => {
                  if (!isVocabDone) {
                    scrollToSection('section-vocabulary', `📦 正在定位核心词汇：需收听全部 ${lesson.vocabulary.length} 个生词发音！`);
                  }
                }}
                className={`p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isVocabDone
                    ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:border-amber-400 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span>📦 4. 词汇听读</span>
                  </span>
                  {isVocabDone ? (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> 已完成
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/30 text-amber-300 border border-amber-500/60 px-1.5 py-0.2 rounded">
                      待收听
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  {isVocabDone ? `✓ 全部 ${lesson.vocabulary.length} 个词汇发音已收听` : `需收听全量生词 (${playedVocabIds.length}/${lesson.vocabulary.length})`}
                </p>
              </div>
            </div>
          </div>

          {/* Minecraft Scene Original Dialogue - WeChat Style */}
          <div
            id="section-dialogue"
            className={`bg-[#EDEDED] p-3 sm:p-5 rounded-2xl border-2 border-[#DCDCDC] space-y-3 shadow-inner transition-all duration-300 ${
              highlightedSection === 'section-dialogue' ? 'ring-4 ring-amber-400 animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#CCCCCC]">
              <div className="flex items-center space-x-2">
                <span className="text-lg">💬</span>
                <h3 className="text-xs sm:text-sm font-mono font-black text-[#2D2D2D] uppercase tracking-wider">
                  原版对话练习 (微信风格)
                </h3>
                {isPlayingAllDialogue && (
                  <span className="inline-flex items-center space-x-1.5 text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>连读中 ({currentDialogueIndex !== null ? currentDialogueIndex + 1 : 1}/{lesson.dialogueScript.length})</span>
                  </span>
                )}
              </div>

              <button
                onClick={handleTogglePlayAllDialogue}
                className={`px-3 py-1.5 rounded-xl border-2 font-mono text-xs font-black transition-all flex items-center space-x-1.5 shadow-sm active:translate-y-0.5 ${
                  isPlayingAllDialogue
                    ? 'bg-amber-500 hover:bg-amber-600 text-white border-black animate-pulse'
                    : 'bg-[#487E2C] hover:bg-[#355E20] text-white border-black hover:scale-105'
                }`}
              >
                {isPlayingAllDialogue ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>⏹ 停止连读</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>▶ 连续朗读整篇对话</span>
                  </>
                )}
              </button>
            </div>

            {/* WeChat Style Chat Feed */}
            <div className="space-y-3.5 pt-1">
              {lesson.dialogueScript.map((turn, index) => {
                const audioId = `dialogue_${index}`;
                const isPlayed = playedAudioIds.has(audioId);
                const isCurrentlyPlaying = index === currentDialogueIndex;

                // Identify left vs right speaker (e.g. Steve/User on Right, Alex/NPC on Left)
                const firstSpeaker = lesson.dialogueScript[0]?.speaker || 'Steve';
                const isRightSpeaker = (turn.speaker !== firstSpeaker && turn.speaker !== 'Alex') || turn.speaker === 'Steve' || turn.speaker === 'You';

                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-2 sm:space-x-3 text-xs transition-all duration-300 ${
                      isRightSpeaker ? 'flex-row-reverse space-x-reverse' : ''
                    } ${isCurrentlyPlaying ? 'scale-[1.01]' : ''}`}
                  >
                    {/* Avatar Block */}
                    <div className={`shrink-0 transition-transform ${isCurrentlyPlaying ? 'scale-110 ring-2 ring-emerald-500 rounded-md' : ''}`}>
                      <MinecraftAvatar speaker={turn.speaker} avatar={turn.avatar} size={42} />
                    </div>

                    {/* Chat Bubble Box */}
                    <div className={`max-w-[80%] sm:max-w-[75%] space-y-1 ${
                      isRightSpeaker ? 'items-end text-right' : 'items-start text-left'
                    }`}>
                      {/* Speaker Name */}
                      <div className={`text-[10px] font-mono font-bold px-1 text-slate-500 flex items-center gap-1.5 ${
                        isRightSpeaker ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{turn.speaker}</span>
                        {isCurrentlyPlaying && (
                          <span className="text-[9px] text-emerald-800 bg-emerald-200 px-1.5 py-0.2 rounded border border-emerald-400 font-bold animate-pulse">
                            🔊 正在朗读...
                          </span>
                        )}
                      </div>

                      {/* WeChat Message Bubble */}
                      <div className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm border shadow-xs transition-all relative ${
                        isRightSpeaker
                          ? 'bg-[#95ec69] text-slate-950 border-[#82e054] rounded-tr-none'
                          : 'bg-white text-slate-900 border-[#E0E0E0] rounded-tl-none'
                      } ${
                        isCurrentlyPlaying
                          ? 'ring-2 ring-emerald-500 shadow-md'
                          : isPlayed
                            ? 'opacity-95'
                            : ''
                      }`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-mono font-bold leading-relaxed text-[#111111] text-xs sm:text-sm flex-1">
                            {turn.text}
                          </p>
                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              onClick={() => handlePlayAudio(audioId, turn.text, turn.speaker)}
                              className={`p-1.5 rounded-lg border transition-all active:scale-95 ${
                                isCurrentlyPlaying
                                  ? 'bg-emerald-600 text-white border-black'
                                  : isRightSpeaker
                                    ? 'bg-[#82e054] text-slate-900 border-[#6fc843] hover:bg-[#72d444]'
                                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                              }`}
                              title="点击朗读此句"
                            >
                              <Volume2 className={`w-3.5 h-3.5 ${isCurrentlyPlaying ? 'animate-bounce' : ''}`} />
                            </button>

                            <button
                              onClick={() => {
                                playClickSound();
                                setOralTarget({
                                  text: turn.text,
                                  translation: turn.translation,
                                  mcIcon: '🎙️'
                                });
                              }}
                              className="px-2 py-1 bg-amber-200/90 hover:bg-amber-300 text-amber-900 border border-amber-400 rounded-lg text-[10px] font-mono font-black flex items-center space-x-0.5 active:scale-95 shadow-xs"
                              title="跟读并开启 AI 发音评测与星星打分"
                            >
                              <span>🎙️ 跟读</span>
                            </button>
                          </div>
                        </div>

                        {/* Translation */}
                        <div className={`text-[11px] sm:text-xs pt-1 mt-1 border-t ${
                          isRightSpeaker
                            ? 'text-slate-800 border-[#82e054]/60'
                            : 'text-slate-500 border-slate-100'
                        }`}>
                          {turn.translation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Sentences Section - Focus strictly on top 1-2 core target sentence patterns */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-3">
            <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center justify-between uppercase tracking-wider">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>核心句型与发音 (Target Sentences)</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-[#487E2C] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                本课精选 {coreSentences.length} 个核心句型
              </span>
            </h3>
            <div className="space-y-2">
              {coreSentences.map((sentence, idx) => {
                const audioId = `sentence_${idx}`;
                const isPlayed = playedAudioIds.has(audioId);
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 shadow-sm transition-colors ${isPlayed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
                  >
                    <div className="flex-1 pr-3">
                      <p className="text-sm sm:text-base font-black font-mono text-[#2D2D2D] leading-tight mb-1">
                        "{sentence}"
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-bold">
                        {coreSentenceTranslations[idx] || ''}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handlePlayAudio(audioId, sentence)}
                        className={`p-2 sm:p-2.5 rounded-xl border-2 transition-colors shadow-sm ${isPlayed ? 'bg-[#487E2C] text-white border-black' : 'bg-slate-100 text-[#487E2C] border-[#487E2C] hover:bg-green-100'}`}
                        title="朗读示范发音"
                      >
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button
                        onClick={() => {
                          playClickSound();
                          setOralTarget({
                            text: sentence,
                            translation: coreSentenceTranslations[idx],
                            mcIcon: '✨'
                          });
                        }}
                        className="px-2.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-black text-xs rounded-xl border-2 border-black shadow-sm flex items-center space-x-1 active:scale-95 transition-all"
                        title="开启核心句 AI 发音评测与星级打分"
                      >
                        <span>🎙️ AI 评测打分</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1. 句型脚手架：方块拼句工作台与语法拆解 (Scaffolding Sentence Crafting & Grammar Breakdown) */}
          <div
            id="section-scaffold"
            className={`bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_0_#000] space-y-3.5 transition-all duration-300 ${
              highlightedSection === 'section-scaffold' ? 'ring-4 ring-amber-400 animate-pulse' : ''
            }`}
          >
            {/* Header & Reset */}
            <div className="flex items-center justify-between border-b border-emerald-800 pb-2.5 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🧱</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-black text-amber-300 uppercase tracking-wider">
                    句型脚手架 • 语法拆解拼句工作台
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    智能标注 [主S] [谓V] [宾O] [助Aux]，直观培养语法语感
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetScaffold}
                className="text-[10px] font-mono font-bold bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-2.5 py-1.5 rounded-lg border border-emerald-600 shrink-0 shadow-sm"
              >
                🔄 重置方块
              </button>
            </div>

            {/* Sentence Selector Tabs - Clean flex-wrap tabs for core sentences */}
            <div className="flex items-center justify-between gap-2 flex-wrap pb-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold text-amber-200 shrink-0">核心句型脚手架:</span>
                {coreSentences.map((sentence, idx) => {
                  const isDone = completedScaffoldIndices.has(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        playClickSound();
                        setActiveScaffoldSentenceIdx(idx);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-mono font-black text-xs border transition-all flex items-center gap-1.5 ${
                        activeScaffoldSentenceIdx === idx
                          ? 'bg-amber-400 text-slate-950 border-black shadow-sm'
                          : isDone
                          ? 'bg-emerald-900 text-emerald-100 border-emerald-500 hover:bg-emerald-800'
                          : 'bg-emerald-950/80 text-emerald-300 border-emerald-700 hover:bg-emerald-900'
                      }`}
                      title={sentence}
                    >
                      <span>{isDone ? '✓ ' : ''}句型 {idx + 1}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isDone ? '已达标' : '待拼句'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono font-bold text-amber-300 bg-emerald-900/80 px-2 py-1 rounded border border-emerald-700">
                拼句达标: {completedScaffoldIndices.size}/{coreSentences.length}
              </span>
            </div>

            {/* Grammar Structure Legend Banner */}
            <div className="bg-emerald-900/90 p-2.5 rounded-xl border border-emerald-700/80 flex items-center justify-between text-[11px] font-mono flex-wrap gap-2">
              <span className="font-bold text-amber-200">
                🔍 句型 {activeScaffoldSentenceIdx + 1} 目标: "{targetSentenceForScaffold}"
              </span>
              <div className="flex items-center space-x-1.5 text-[9px] font-bold">
                <span className="px-1.5 py-0.5 rounded bg-blue-500 text-white border border-blue-900">👤 主语 S</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 border border-black">⚡ 谓语 V</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 border border-black">📦 宾语 O</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white border border-purple-900">助词 Aux</span>
              </div>
            </div>

            <p className="text-xs text-emerald-200 font-mono">
              点击下方散落的单词方块，按正确的语法顺序合成句子：
            </p>

            {/* Target Slots */}
            <div className="min-h-[56px] bg-slate-950 p-2.5 rounded-xl border-2 border-emerald-500 flex flex-wrap gap-2 items-center">
              {selectedWords.length === 0 ? (
                <span className="text-slate-500 text-xs font-mono italic">
                  点击下方带有 [主] [谓] [宾] [助] 颜色标注的单词方块，放入这里的句子槽...
                </span>
              ) : (
                selectedWords.map((word, idx) => {
                  const role = getWordGrammarRole(word);
                  return (
                    <span
                      key={idx}
                      className={`px-2.5 py-1.5 font-mono font-black text-xs rounded-xl border-2 shadow-sm animate-in zoom-in-95 flex items-center space-x-1.5 ${role.slotClass}`}
                    >
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-black uppercase border ${role.badgeClass}`}>
                        {role.badgeCode}
                      </span>
                      <span>{word}</span>
                    </span>
                  );
                })
              )}
            </div>

            {/* Success Banner */}
            {isScaffoldSuccess ? (
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 p-3 rounded-xl font-mono font-black text-xs flex flex-wrap items-center justify-between gap-2 border-2 border-black animate-in fade-in">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>
                    {completedScaffoldIndices.size >= coreSentences.length
                      ? `🎉 完美！本课全部 ${coreSentences.length} 个核心句型脚手架已全部拼对！获得 +5 ❇️ 绿宝石`
                      : `🎉 句型 ${activeScaffoldSentenceIdx + 1} 拼对！脚手架达标进度 (${completedScaffoldIndices.size}/${coreSentences.length})`}
                  </span>
                </div>
                {completedScaffoldIndices.size < coreSentences.length && (
                  <button
                    onClick={() => {
                      playClickSound();
                      const nextIdx = (activeScaffoldSentenceIdx + 1) % coreSentences.length;
                      setActiveScaffoldSentenceIdx(nextIdx);
                    }}
                    className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-amber-300 rounded-lg text-xs font-bold border border-black transition-transform active:scale-95 cursor-pointer"
                  >
                    👉 立即挑战【句型 {(activeScaffoldSentenceIdx + 1) % coreSentences.length + 1}】
                  </button>
                )}
              </div>
            ) : (
              /* Shuffled Word Blocks with Grammar Roles */
              <div className="flex flex-wrap gap-2 pt-1">
                {shuffledWords.map((word, idx) => {
                  const role = getWordGrammarRole(word);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectWordBlock(word, idx)}
                      className={`px-3 py-2 font-mono font-black text-xs border-2 shadow-[2px_2px_0_0_#000] rounded-xl active:translate-y-0.5 active:shadow-none transition-all flex items-center space-x-1.5 ${role.bgClass}`}
                    >
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-black uppercase border ${role.badgeClass}`}>
                        {role.badgeCode}
                      </span>
                      <span>{word}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 第二册专属差异化学习模式：红石逻辑电路工作台 & 篇章复述挑战 */}
          {(profile?.selectedVolumeId === 'vol2' || lesson.topic.toLowerCase().includes('past') || lesson.topic.toLowerCase().includes('perfect') || lesson.topic.toLowerCase().includes('infinitive') || lesson.topic.toLowerCase().includes('indirect')) && (
            <div className="space-y-5">
              {/* 1. 红石逻辑连词与时态中继器 */}
              <RedstoneLogicWorkbench
                lesson={lesson}
                onSuccessReward={(emeralds, xp) => {
                  if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
                }}
              />

              {/* 2. 篇章摘要与故事复述挑战 */}
              <StoryRetellingDeck
                lesson={lesson}
                onSuccessReward={(emeralds, xp) => {
                  if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
                }}
              />
            </div>
          )}

          {/* 4. 丰富生活场景迁移 (Real-World Bridge) - Dynamically tailored to current lesson theme */}
          <div
            id="section-realworld"
            className={`bg-amber-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-300 space-y-4 transition-all duration-300 ${
              highlightedSection === 'section-realworld' ? 'ring-4 ring-amber-400 animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-between border-b border-amber-200 pb-2 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌍</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-black text-amber-900 uppercase tracking-wider">
                    现实生活场景拓展 (Real-World Bridge)
                  </h3>
                  <p className="text-[10px] text-amber-700 font-mono">
                    依据《{lesson.titleZh}》话题，从游戏场景延伸至家庭、校园生活沟通
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${
                  isRealWorldDone
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-200 text-amber-900 border-amber-300'
                }`}>
                  {isRealWorldDone ? `✓ 全部 3 场景已达标` : `打卡进度: ${completedQuests.size}/${realWorldScenes.length}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {getRealWorldBridgesForLesson(lesson).map((item) => {
                const isCompleted = completedQuests.has(item.id);
                const wasSpoken = completedSceneTypes[item.id];
                return (
                  <div key={item.id} className="bg-white p-3.5 rounded-xl border-2 border-amber-200 space-y-2 flex flex-col justify-between shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-black font-mono text-amber-900">
                        <span className="flex items-center gap-1">
                          <span>{item.icon}</span>
                          <span>{item.sceneTitle}</span>
                        </span>
                        <button
                          onClick={() => {
                            playClickSound();
                            speakText(item.realPhrase);
                          }}
                          className="p-1 bg-amber-100 hover:bg-amber-200 rounded text-amber-900 transition-colors"
                          title="听现实场景朗读"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-2 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 border border-slate-200">
                        <span className="text-emerald-700 font-bold">🎮 游戏句型:</span> "{item.gamePhrase}"
                      </div>

                      <div className="p-2 bg-amber-100/80 rounded-lg text-[11px] font-mono text-amber-950 font-bold border border-amber-300">
                        <span className="text-amber-900 font-black">🏠 现实应用:</span> "{item.realPhrase}"
                      </div>

                      <p className="text-[10px] text-amber-700 font-mono italic">
                        💡 {item.cnMeaning}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        playClickSound();
                        setActiveSceneForCheckIn(item);
                      }}
                      className={`w-full py-2 rounded-lg text-[11px] font-mono font-black border transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        isCompleted
                          ? wasSpoken
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-400 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 border-amber-400 hover:bg-amber-200'
                          : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-black shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{wasSpoken ? '✓ 口语打卡已达成 (+4 ❇️)' : '✓ 听读自测已打卡 (+2 ❇️)'}</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-amber-950" />
                          <span>🎯 尝试口头朗读并打卡 (+4 ❇️)</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Vocabulary */}
          <div
            id="section-vocabulary"
            className={`space-y-3 transition-all duration-300 ${
              highlightedSection === 'section-vocabulary' ? 'p-3 bg-amber-50/80 rounded-2xl ring-4 ring-amber-400 animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
                <span>📦 本课 Minecraft 核心词汇</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                  isVocabDone
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {isVocabDone ? `✓ 全部 ${lesson.vocabulary.length} 词汇已听` : `听读达标: ${playedVocabIds.length}/${lesson.vocabulary.length}`}
                </span>
              </h3>

              <button
                type="button"
                onClick={handleTogglePlayAllVocab}
                className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  isPlayingAllVocab
                    ? 'bg-red-500 text-white border-black animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-[#487E2C] border-[#487E2C]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAllVocab ? '⏹️ 停止词汇连播' : '▶️ 连播全量词汇'}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {lesson.vocabulary.map((vocab, idx) => {
                const audioId = `vocab_${vocab.id}_${idx}`;
                const isPlayed = playedAudioIds.has(audioId);
                return (
                  <div
                    key={vocab.id}
                    className={`p-3 bg-slate-50 rounded-2xl border-2 flex items-start space-x-3 shadow-sm transition-colors ${isPlayed ? 'border-green-300 bg-green-50/50' : 'border-slate-200'}`}
                  >
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-2xl border-2 border-slate-300 shadow-sm shrink-0">
                      {vocab.mcItemIcon || '🧱'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm sm:text-base text-[#2D2D2D] font-mono truncate">
                          {vocab.word}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handlePlayAudio(audioId, vocab.word)}
                            className={`p-1.5 rounded-lg border transition-colors ${isPlayed ? 'bg-[#487E2C] text-white border-black' : 'bg-slate-200 text-[#487E2C] border-slate-300 hover:bg-slate-300'}`}
                            title="播放读音"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              playClickSound();
                              setOralTarget({
                                text: vocab.word,
                                translation: vocab.meaning,
                                phonetic: vocab.phonetic,
                                mcIcon: vocab.mcItemIcon
                              });
                            }}
                            className="px-1.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-mono font-black flex items-center space-x-0.5 active:scale-95"
                            title="AI 单词发音评测"
                          >
                            <span>🎙️ 打分</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-mono mt-0.5">{vocab.phonetic}</p>
                      <p className="text-[11px] sm:text-xs text-[#FF6321] font-bold truncate mt-0.5">{vocab.meaning}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4">
             <p className="text-indigo-800 font-bold text-xs sm:text-sm">{lesson.grammarNote}</p>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-100 border-t-4 border-slate-200 shrink-0">
          {(() => {
            const currentVol = profile?.selectedVolumeId || 'vol1';
            const hasNextLessonAccess = profile ? hasLessonAccess(profile, currentVol, lesson.id + 1) : true;
            const isFinishingTrial = lesson.id === 20 && !hasNextLessonAccess;

            return (
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Audio study progress hint bar */}
                <div className="w-full flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono font-bold text-slate-600 bg-white/80 border border-slate-300 px-3 py-1.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Headphones className="w-3.5 h-3.5" />
                    <span>学习达标度: {completedTaskCount}/4 项</span>
                  </div>
                  <div className="flex-1 max-w-[140px] sm:max-w-xs bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isAllTasksCompleted ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.round((completedTaskCount / 4) * 100))}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleTogglePlayAllDialogue}
                    className="text-[10px] sm:text-xs text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                  >
                    {isPlayingAllDialogue ? '⏹️ 停止连播' : '▶️ 连播课文'}
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-black font-mono">
                  {isAlreadyCompleted ? (
                    <span className="text-[#487E2C]">🌟 本课已通关！你可以随时重复收听、巩固复习或重新对练 🌟</span>
                  ) : isFinishingTrial ? (
                    <span className="text-amber-800">🎉 完成前 20 课免费试学！激活 VIP 或第 1 册卡密即可畅享 21-144 课！</span>
                  ) : isAllTasksCompleted ? (
                    <span className="text-[#487E2C]">✨ 4 项学习任务均已达标！可点击下方打卡通关并解锁第 {lesson.id + 1} 课 ✨</span>
                  ) : (
                    <span className="text-amber-800">⚠️ 需完成上方学习任务 ({completedTaskCount}/4) 方可打卡通关解锁下一课</span>
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                  {isFinishingTrial ? (
                    <button
                      onClick={() => {
                        if (!isAllTasksCompleted) {
                          handleTriggerCompleteLesson();
                          return;
                        }
                        playEmeraldSound();
                        if (onCompleteLesson) {
                          onCompleteLesson(lesson.id);
                        }
                        onClose();
                        if (onOpenVipModal) {
                          onOpenVipModal();
                        }
                      }}
                      className={`w-full py-3 sm:py-3.5 font-black rounded-xl border-3 border-amber-950 shadow-[3px_3px_0_0_#451a03] transition-transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 text-xs sm:text-sm font-mono cursor-pointer ${
                        isAllTasksCompleted
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950'
                          : 'bg-amber-200 text-amber-900 border-dashed border-amber-600'
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                      <span>{isAllTasksCompleted ? '🎉 打卡通关 · 激活 VIP 解锁 21-144 课' : `🔒 请先完成学习任务 (${completedTaskCount}/4)`}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleTriggerCompleteLesson}
                      className={`w-full py-3 sm:py-3.5 font-black rounded-xl border-3 border-amber-950 shadow-[3px_3px_0_0_#451a03] transition-transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 text-xs sm:text-sm font-mono cursor-pointer ${
                        isAllTasksCompleted
                          ? 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-700'
                      }`}
                    >
                      {isAllTasksCompleted ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-800" />
                          <span>🏅 学习达标 · 打卡通关并解锁第 {lesson.id + 1} 课</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-amber-800" />
                          <span>🔒 完成学习任务后打卡通关 ({completedTaskCount}/4)</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      playEmeraldSound();
                      if (onCompleteLesson) {
                        onCompleteLesson(lesson.id);
                      }
                      onStartPractice(lesson);
                    }}
                    className="w-full py-3 sm:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl border-3 border-slate-950 shadow-[3px_3px_0_0_#0F172A] transition-transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 text-xs sm:text-sm font-mono cursor-pointer"
                  >
                    <span>⚔️ 开启 1V1 AI 口语实战对练</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

      </div>

      {/* Real-World 3-Scene Oral & Anti-Cheat Check-in Modal */}
      {activeSceneForCheckIn && (
        <SceneOralCheckInModal
          scene={activeSceneForCheckIn}
          isOpen={!!activeSceneForCheckIn}
          onClose={() => setActiveSceneForCheckIn(null)}
          onCompleteSceneCheckIn={(sceneId, earnedEmeralds, earnedXp, isSpoken) => {
            setCompletedQuests(prev => new Set(prev).add(sceneId));
            setCompletedSceneTypes(prev => ({ ...prev, [sceneId]: isSpoken }));
            if (onAwardEmeralds) {
              onAwardEmeralds(earnedEmeralds, earnedXp);
            }
          }}
        />
      )}

      {/* AI Speech & Pronunciation Assessment Modal */}
      {oralTarget && (
        <OralEvaluationModal
          targetText={oralTarget.text}
          translation={oralTarget.translation}
          phonetic={oralTarget.phonetic}
          mcItemIcon={oralTarget.mcIcon || '🧱'}
          onClose={() => setOralTarget(null)}
          onAwardEmeralds={(emeralds, xp) => {
            if (onAwardEmeralds) onAwardEmeralds(emeralds, xp);
          }}
        />
      )}
    </div>
  );
};
