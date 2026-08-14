import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, RotateCcw, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Lesson } from '../types';
import { speakText, playClickSound, playEmeraldSound } from '../utils/audio';

interface StoryRetellingDeckProps {
  lesson: Lesson;
  onSuccessReward?: (emeralds: number, xp: number) => void;
}

interface RetellKeyPoint {
  stepNumber: number;
  mcStage: string;
  keyWords: string[];
  hintEn: string;
  hintZh: string;
}

export function getStoryRetellSteps(lesson: Lesson): RetellKeyPoint[] {
  const lessonId = lesson.id;

  // Book 2 Lesson 1: A private conversation
  if (lessonId === 1) {
    return [
      {
        stepNumber: 1,
        mcStage: '🎬 开场：剧院入场',
        keyWords: ['went to theater', 'good seat', 'play was interesting'],
        hintEn: 'The writer went to the theater last night and had a very good seat.',
        hintZh: '昨晚作者去戏院看戏，并且买到了一个很好的座位。'
      },
      {
        stepNumber: 2,
        mcStage: '😠 冲突：男女喧哗',
        keyWords: ['could not hear', 'talking loudly', 'got very angry'],
        hintEn: 'A young man and a young woman were talking loudly, so the writer could not hear the actors.',
        hintZh: '后排一对青年男女大声喧哗，导致作者完全听不清台上演员在说什么。'
      },
      {
        stepNumber: 3,
        mcStage: '🎭 结局：绝妙反转',
        keyWords: ['turned round', 'private conversation', 'none of your business'],
        hintEn: 'The writer told them to be quiet, but the young man said: "It is a private conversation!"',
        hintZh: '作者转身让他们小声点，年轻男子却反驳道：“这是私人谈话，不关你的事！”'
      }
    ];
  }

  // Book 2 Lesson 25: Do the English speak English?
  if (lessonId === 25) {
    return [
      {
        stepNumber: 1,
        mcStage: '🚂 抵英：火车站问路',
        keyWords: ['arrived in London', 'did not know way', 'asked a porter'],
        hintEn: 'The writer arrived in London by train and asked a railway porter for the way.',
        hintZh: '作者乘火车刚到伦敦，向火车站的一位搬运工询问去旅馆的路线。'
      },
      {
        stepNumber: 2,
        mcStage: '❓ 困惑：方言与语速',
        keyWords: ['spoke slowly', 'repeated several times', 'not understand'],
        hintEn: 'The porter answered, but his English was so strange that the writer could not understand.',
        hintZh: '搬运工重复了好几遍，但他的发音太奇特，作者还是没听懂。'
      },
      {
        stepNumber: 3,
        mcStage: '💡 顿悟：英格兰的方言',
        keyWords: ['speak English', 'different accents', 'do English speak English'],
        hintEn: 'Both spoke English, but they could not understand each other!',
        hintZh: '两人都讲英语，却谁也听不懂谁，让作者感叹“英国人讲的是英语吗”。'
      }
    ];
  }

  // Generic 3-step retelling template extracted from lesson dialogue/sentences
  const textA = lesson.dialogueScript?.[0]?.text || lesson.targetSentences?.[0] || 'At the beginning of the story...';
  const textB = lesson.dialogueScript?.[1]?.text || lesson.targetSentences?.[1] || 'Then something unexpected happened...';
  const textC = lesson.dialogueScript?.[2]?.text || 'In the end, everyone was surprised!';

  return [
    {
      stepNumber: 1,
      mcStage: '🗺️ 故事起因 (Beginning)',
      keyWords: ['First', 'In the beginning', lesson.vocabulary?.[0]?.word || 'adventure'],
      hintEn: textA,
      hintZh: lesson.dialogueScript?.[0]?.translation || '故事在 Minecraft 领地展开...'
    },
    {
      stepNumber: 2,
      mcStage: '⚔️ 核心发展 (Development)',
      keyWords: ['Then', 'Suddenly', lesson.vocabulary?.[1]?.word || 'challenge'],
      hintEn: textB,
      hintZh: lesson.dialogueScript?.[1]?.translation || '事情发生了意料之外的发展...'
    },
    {
      stepNumber: 3,
      mcStage: '🏆 结局高潮 (Climax & End)',
      keyWords: ['Finally', 'In the end', lesson.vocabulary?.[2]?.word || 'victory'],
      hintEn: textC,
      hintZh: lesson.dialogueScript?.[2]?.translation || '最后迎来了令人深思的结局！'
    }
  ];
}

export const StoryRetellingDeck: React.FC<StoryRetellingDeckProps> = ({
  lesson,
  onSuccessReward
}) => {
  const steps = getStoryRetellSteps(lesson);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentStep = steps[activeStepIdx] || steps[0];

  const handleCompleteStep = () => {
    playEmeraldSound();
    setCompletedSteps(prev => new Set(prev).add(activeStepIdx));
    if (onSuccessReward) {
      onSuccessReward(8, 15);
    }
    if (activeStepIdx < steps.length - 1) {
      setActiveStepIdx(prev => prev + 1);
      setShowHint(false);
    }
  };

  return (
    <div className="bg-amber-950 border-4 border-amber-500 rounded-2xl p-4 sm:p-5 text-amber-50 shadow-[6px_6px_0px_0px_#451a03] space-y-4">
      {/* Retelling Header */}
      <div className="flex items-center justify-between border-b border-amber-800/80 pb-3 flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 bg-amber-500 border-2 border-amber-200 rounded-xl flex items-center justify-center text-xl shadow-inner text-amber-950">
            📖
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-black font-mono text-amber-300 uppercase tracking-wider">
                课文摘要复述挑战 (Story Retelling Deck)
              </h3>
              <span className="bg-amber-900 text-amber-200 border border-amber-500 px-2 py-0.5 rounded-full text-[10px] font-mono font-black">
                第 2 册篇章能力训练
              </span>
            </div>
            <p className="text-[11px] text-amber-200/80 font-mono">
              根据 3 段关键词提纲，用自己的英文口述还原全篇故事脉络
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-amber-300 bg-amber-900/90 px-3 py-1.5 rounded-xl border border-amber-700">
          进度: {completedSteps.size} / {steps.length} 段落
        </div>
      </div>

      {/* Step Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {steps.map((st, idx) => {
          const isSelected = activeStepIdx === idx;
          const isDone = completedSteps.has(idx);
          return (
            <button
              key={idx}
              onClick={() => {
                playClickSound();
                setActiveStepIdx(idx);
                setShowHint(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-mono font-black border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-400 text-amber-950 border-white shadow-md scale-102'
                  : isDone
                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500'
                  : 'bg-amber-900/60 text-amber-300 border-amber-800 hover:bg-amber-900'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span>第 {idx + 1} 幕</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="truncate font-bold text-[11px] mt-1">{st.mcStage}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Retell Prompt Card */}
      <div className="bg-amber-900/50 p-4 rounded-xl border-2 border-amber-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-black text-amber-300">
            {currentStep.mcStage}
          </span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] font-mono text-amber-200 underline hover:text-white"
          >
            {showHint ? '隐藏示范表达' : '💡 偷看参考提示'}
          </button>
        </div>

        {/* Key Words Pills */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-amber-300 font-bold">
            🔑 本段核心复述线索词 (Keywords):
          </div>
          <div className="flex flex-wrap gap-2">
            {currentStep.keyWords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-amber-400 text-amber-950 font-black font-mono text-xs rounded-lg border border-amber-950 shadow-xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Reference Hint if expanded */}
        {showHint && (
          <div className="p-3 bg-amber-950/90 border border-amber-500 rounded-xl space-y-1 text-xs font-mono animate-in fade-in">
            <div className="flex items-center justify-between text-amber-300 font-bold">
              <span>参考示范句子:</span>
              <button
                onClick={() => speakText(currentStep.hintEn)}
                className="p-1 bg-amber-800 hover:bg-amber-700 rounded text-amber-200 flex items-center gap-1"
                title="听示范朗读"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>听发音</span>
              </button>
            </div>
            <p className="font-bold text-white leading-relaxed">"{currentStep.hintEn}"</p>
            <p className="text-amber-300/80">{currentStep.hintZh}</p>
          </div>
        )}

        {/* Oral Retelling Action Bar */}
        <div className="pt-2 border-t border-amber-800 flex items-center justify-between gap-2 flex-wrap">
          <p className="text-[11px] font-mono text-amber-200/90">
            🎙️ 大声朗读或用线索词复述 1~2 句话，然后点击打卡：
          </p>

          <button
            onClick={handleCompleteStep}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-mono text-xs rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>达成第 {activeStepIdx + 1} 幕复述 (+8 ❇️ 绿宝石)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
