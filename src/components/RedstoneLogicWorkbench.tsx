import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { Lesson } from '../types';
import { speakText, playClickSound, playEmeraldSound } from '../utils/audio';

interface RedstoneLogicWorkbenchProps {
  lesson: Lesson;
  onSuccessReward?: (emeralds: number, xp: number) => void;
}

interface RedstoneConnectorItem {
  id: string;
  type: 'connector' | 'tense_shifter' | 'clause_combiner';
  title: string;
  clauseA: string;
  clauseA_zh: string;
  clauseB: string;
  clauseB_zh: string;
  connectorOptions: { label: string; isCorrect: boolean; reason: string }[];
  resultSentence: string;
  resultSentence_zh: string;
  grammarRuleTip: string;
}

export function getRedstoneConnectorsForLesson(lesson: Lesson): RedstoneConnectorItem[] {
  const lessonId = lesson.id;

  // 1. Lesson 1: A private conversation (Past tense / Inattention)
  if (lessonId === 1) {
    return [
      {
        id: 'rs-1-1',
        type: 'clause_combiner',
        title: '⚡ 红石电路一：转折门逻辑 (but vs and)',
        clauseA: 'I went to the theater last night,',
        clauseA_zh: '我昨晚去看了戏，',
        clauseB: 'I did not enjoy it.',
        clauseB_zh: '我却一点也不觉得好玩。',
        connectorOptions: [
          { label: 'but', isCorrect: true, reason: '表示转折逻辑：去了戏院本应开心，但却没享受到' },
          { label: 'and', isCorrect: false, reason: 'and 表示顺承，不能表达出事与愿违的转折感' },
          { label: 'so', isCorrect: false, reason: 'so 表示因果结果，前后并非因果关系' }
        ],
        resultSentence: 'I went to the theater last night, but I did not enjoy it.',
        resultSentence_zh: '我昨晚去看了戏，但我却一点也不觉得好玩。',
        grammarRuleTip: '并列连词 but 用于连接两个分句，表示事实与预期相反的转折。'
      },
      {
        id: 'rs-1-2',
        type: 'connector',
        title: '⚡ 红石电路二：因果中继器 (because vs although)',
        clauseA: 'I could not hear the actors,',
        clauseA_zh: '我听不清演员在说什么，',
        clauseB: 'a young man and a young woman were talking loudly.',
        clauseB_zh: '一对青年男女正在大声喧哗。',
        connectorOptions: [
          { label: 'because', isCorrect: true, reason: '引导原因状语从句：听不清的直接原因就是后面有人喧哗' },
          { label: 'although', isCorrect: false, reason: 'although 表示让步“尽管”，逻辑颠倒' },
          { label: 'if', isCorrect: false, reason: 'if 表示条件“如果”，此处是既定发生的事实' }
        ],
        resultSentence: 'I could not hear the actors because a young man and a young woman were talking loudly.',
        resultSentence_zh: '我听不清演员的声音，因为一对青年男女正在大声说话。',
        grammarRuleTip: 'because 引导从句解释主句发生的核心原因。'
      }
    ];
  }

  // 2. Lesson 2: Breakfast or lunch? (Present continuous vs Simple present)
  if (lessonId === 2) {
    return [
      {
        id: 'rs-2-1',
        type: 'tense_shifter',
        title: '⚡ 红石时态转换：一般现在 vs 进行时 (always / now)',
        clauseA: 'I always get up late on Sundays,',
        clauseA_zh: '我在周日常常起得很晚，',
        clauseB: 'it was already one o\'clock in the afternoon.',
        clauseB_zh: '当时已经是下午一点钟了。',
        connectorOptions: [
          { label: 'and', isCorrect: true, reason: '并列顺承：习惯晚起且当天确实已经一点了' },
          { label: 'because', isCorrect: false, reason: '起得晚并不是一点钟的原因' },
          { label: 'but', isCorrect: false, reason: '前后无相反转折' }
        ],
        resultSentence: 'It was Sunday. I never get up early on Sundays and it was already one o\'clock.',
        resultSentence_zh: '那天是星期天。我星期天从不早起，当时已经是一点钟了。',
        grammarRuleTip: '注意区分描述日常习惯的 never/always + 一般现在时，与具体事件的一般过去时。'
      }
    ];
  }

  // 3. Lesson 25: Do the English speak English? (Railway & Accent)
  if (lessonId === 25) {
    return [
      {
        id: 'rs-25-1',
        type: 'clause_combiner',
        title: '⚡ 红石双路分流：并列对比逻辑 (so vs but)',
        clauseA: 'I did not know the way to my hotel,',
        clauseA_zh: '我不知道去旅馆的路，',
        clauseB: 'I asked a railway porter.',
        clauseB_zh: '我向一位铁路搬运工问路。',
        connectorOptions: [
          { label: 'so', isCorrect: true, reason: '因果结果：因为不知道路，所以上前问路' },
          { label: 'but', isCorrect: false, reason: '前后没有转折关系' },
          { label: 'or', isCorrect: false, reason: 'or 表示选择，不合句意' }
        ],
        resultSentence: 'I did not know the way to my hotel, so I asked a porter.',
        resultSentence_zh: '我不知道去旅馆的路，于是我问了一位搬运工。',
        grammarRuleTip: 'so 引导结果并列分句：前因导致后果。'
      },
      {
        id: 'rs-25-2',
        type: 'connector',
        title: '⚡ 红石转折电路：语言通畅但无法沟通',
        clauseA: 'Each of us spoke English,',
        clauseA_zh: '我们各自都讲英语，',
        clauseB: 'we could not understand each other!',
        clauseB_zh: '我们却谁也听不懂谁！',
        connectorOptions: [
          { label: 'but', isCorrect: true, reason: '强烈转折：都说英语，结果却彼此听不懂' },
          { label: 'because', isCorrect: false, reason: '互相听不懂不是都说英语的原因' },
          { label: 'and', isCorrect: false, reason: '不能表现出讽刺转折的荒诞幽默感' }
        ],
        resultSentence: 'Each of us spoke English, but we could not understand each other!',
        resultSentence_zh: '我们两个都讲英语，但我们谁也听不懂对方！',
        grammarRuleTip: 'but 强调荒诞强烈的转折对比。'
      }
    ];
  }

  // 4. Lesson 36: Across the Channel (Future perfect / Time clauses)
  if (lessonId === 36) {
    return [
      {
        id: 'rs-36-1',
        type: 'tense_shifter',
        title: '⚡ 红石将来完成时：截止时间逻辑 (by tomorrow evening)',
        clauseA: 'By tomorrow evening,',
        clauseA_zh: '到明天傍晚时分，',
        clauseB: 'she _____ twenty-six miles across the Channel.',
        clauseB_zh: '她将已经游完全程二十六英里。',
        connectorOptions: [
          { label: 'will have swum', isCorrect: true, reason: '将来完成时 will have + done：在未来某一时刻之前完成' },
          { label: 'has swum', isCorrect: false, reason: '现在完成时不能配合将来的时间状语 By tomorrow' },
          { label: 'is swimming', isCorrect: false, reason: '进行时无法表达“游完了26英里”的完整结果' }
        ],
        resultSentence: 'By tomorrow evening, she will have swum twenty-six miles.',
        resultSentence_zh: '到明天傍晚，她将已经游完了二十六英里。',
        grammarRuleTip: 'by + 将来时间点是将来完成时 (will have done) 的经典标志。'
      }
    ];
  }

  // 5. Lesson 38: Everything except the weather (Past perfect continuous)
  if (lessonId === 38) {
    return [
      {
        id: 'rs-38-1',
        type: 'tense_shifter',
        title: '⚡ 过去完成进行时逻辑 (had been raining)',
        clauseA: 'When he finally arrived in the south,',
        clauseA_zh: '当他终于抵达南方时，',
        clauseB: 'it had been raining continually for two weeks.',
        clauseB_zh: '大雨已经连续下了整整两周。',
        connectorOptions: [
          { label: 'had been raining', isCorrect: true, reason: '过去完成进行时 had been doing：强调在过去某一时刻前一直在持续发生' },
          { label: 'was raining', isCorrect: false, reason: '过去进行时不能很好体现已持续了“两周”的时间跨度' },
          { label: 'rains', isCorrect: false, reason: '一般现在时与过去的上下文时态不符' }
        ],
        resultSentence: 'It had been raining continually for two weeks.',
        resultSentence_zh: '大雨已经连续下了整整两个星期。',
        grammarRuleTip: 'had been + doing 表示在过去的某个参照点之前，动作已持续进行了一段时间。'
      }
    ];
  }

  // Generic fallback for any Book 2 lesson
  const mainSentence = lesson.targetSentences?.[0] || 'I looked at it carefully, but I could not see anything.';
  return [
    {
      id: `rs-gen-${lessonId}`,
      type: 'clause_combiner',
      title: '⚡ 红石逻辑连词：复合句拼接',
      clauseA: 'The player pushed the redstone lever,',
      clauseA_zh: '玩家拉下了红石拉杆，',
      clauseB: 'the heavy iron door opened immediately.',
      clauseB_zh: '沉重的铁门立刻打开了。',
      connectorOptions: [
        { label: 'and', isCorrect: true, reason: '顺承关系：拉下开关，门随即打开' },
        { label: 'but', isCorrect: false, reason: '前后符合预期，无转折' },
        { label: 'although', isCorrect: false, reason: '让步连词不合语境' }
      ],
      resultSentence: 'The player pushed the lever, and the iron door opened.',
      resultSentence_zh: '玩家拉下拉杆，铁门应声而开。',
      grammarRuleTip: '复合句通过并列与从属连词连通，如同红石电路传输信号。'
    }
  ];
}

export const RedstoneLogicWorkbench: React.FC<RedstoneLogicWorkbenchProps> = ({
  lesson,
  onSuccessReward
}) => {
  const challenges = getRedstoneConnectorsForLesson(lesson);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [isPowerActive, setIsPowerActive] = useState<boolean>(false);
  const [completedList, setCompletedList] = useState<Set<string>>(new Set());

  const currentChallenge = challenges[activeChallengeIdx] || challenges[0];

  const handleSelectConnector = (option: { label: string; isCorrect: boolean; reason: string }) => {
    playClickSound();
    setSelectedConnector(option.label);

    if (option.isCorrect) {
      setIsPowerActive(true);
      playEmeraldSound();
      setCompletedList(prev => new Set(prev).add(currentChallenge.id));
      if (onSuccessReward) {
        onSuccessReward(6, 12);
      }
    } else {
      setIsPowerActive(false);
    }
  };

  const handleReset = () => {
    playClickSound();
    setSelectedConnector(null);
    setIsPowerActive(false);
  };

  return (
    <div className="bg-slate-900 border-4 border-red-600 rounded-2xl p-4 sm:p-5 text-white shadow-[6px_6px_0px_0px_#7f1d1d] space-y-4">
      {/* Workbench Header */}
      <div className="flex items-center justify-between border-b border-red-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 bg-red-600 border-2 border-red-300 rounded-xl flex items-center justify-center text-xl shadow-inner animate-pulse">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-black font-mono text-red-400 uppercase tracking-wider">
                红石逻辑电路工作台 (Redstone Circuitry)
              </h3>
              <span className="bg-red-950 text-red-300 border border-red-600 px-2 py-0.5 rounded-full text-[10px] font-mono font-black">
                第 2 册专属进阶模式
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              为复合句选择正确的逻辑连词/时态中继器，接通红石火把并激活铁门
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-600 flex items-center gap-1 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>重置电路</span>
        </button>
      </div>

      {/* Challenge Switcher Tabs if multiple */}
      {challenges.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-bold text-slate-400">选择红石回路:</span>
          {challenges.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                playClickSound();
                setActiveChallengeIdx(idx);
                setSelectedConnector(null);
                setIsPowerActive(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-black border transition-all ${
                activeChallengeIdx === idx
                  ? 'bg-red-600 text-white border-red-300 shadow-md scale-105'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              回路 {idx + 1} {completedList.has(c.id) ? '✓' : ''}
            </button>
          ))}
        </div>
      )}

      {/* Circuit Board Visualization */}
      <div className="bg-slate-950 p-4 rounded-xl border-2 border-red-900 space-y-4">
        <div className="text-xs font-mono font-black text-amber-300 flex items-center justify-between">
          <span>{currentChallenge.title}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${isPowerActive ? 'bg-emerald-500 text-slate-950 animate-pulse' : 'bg-red-950 text-red-400'}`}>
            {isPowerActive ? '⚡ 强充能通电 (POWERED)' : '⛔ 电路断开 (UNPOWERED)'}
          </span>
        </div>

        {/* Clauses and Connector Slot */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-2 items-center text-xs font-mono">
          {/* Clause A */}
          <div className="md:col-span-4 bg-slate-900 p-3 rounded-xl border-2 border-slate-700 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold">分句 A (Input A):</div>
            <div className="font-black text-slate-100 text-sm">{currentChallenge.clauseA}</div>
            <div className="text-[11px] text-slate-400">{currentChallenge.clauseA_zh}</div>
          </div>

          {/* Redstone Middle Slot */}
          <div className="md:col-span-3 flex flex-col items-center justify-center p-2 bg-slate-900/60 rounded-xl border border-dashed border-red-600/60 min-h-[70px]">
            <div className="text-[10px] font-bold text-red-400 mb-1 flex items-center gap-1">
              <Zap className={`w-3 h-3 ${isPowerActive ? 'text-red-400 animate-spin' : 'text-slate-600'}`} />
              <span>红石逻辑中继器</span>
            </div>
            {selectedConnector ? (
              <span className={`px-3 py-1.5 rounded-lg font-black text-sm font-mono border-2 shadow-md animate-in zoom-in-90 ${
                isPowerActive
                  ? 'bg-red-600 text-white border-red-300 ring-2 ring-red-400'
                  : 'bg-slate-800 text-slate-400 border-slate-600 line-through'
              }`}>
                {selectedConnector}
              </span>
            ) : (
              <span className="text-slate-500 text-[11px] italic">
                [ 选择下方连词插槽 ]
              </span>
            )}
          </div>

          {/* Clause B */}
          <div className="md:col-span-4 bg-slate-900 p-3 rounded-xl border-2 border-slate-700 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold">分句 B (Input B):</div>
            <div className="font-black text-slate-100 text-sm">{currentChallenge.clauseB}</div>
            <div className="text-[11px] text-slate-400">{currentChallenge.clauseB_zh}</div>
          </div>
        </div>

        {/* Options to Choose */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-xs font-mono font-bold text-slate-400">
            点击插入正确的红石逻辑连词 / 语法中继器：
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {currentChallenge.connectorOptions.map((opt, idx) => {
              const isChosen = selectedConnector === opt.label;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectConnector(opt)}
                  className={`p-2.5 rounded-xl font-mono text-xs text-left border-2 transition-all flex flex-col justify-between ${
                    isChosen
                      ? opt.isCorrect
                        ? 'bg-red-600 text-white border-red-300 shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                        : 'bg-slate-800 text-red-300 border-red-900'
                      : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-red-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-black text-sm mb-1">
                    <span>{opt.label}</span>
                    {isChosen && (
                      <span>{opt.isCorrect ? '✅ 导通' : '❌ 阻断'}</span>
                    )}
                  </div>
                  <div className="text-[10px] opacity-80 leading-tight">
                    {opt.reason}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Success / Result Broadcast */}
        {isPowerActive && (
          <div className="p-3 bg-red-950/80 border-2 border-red-500 rounded-xl space-y-1.5 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-mono font-black text-red-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>🎉 红石信号成功接通！复合句合成完毕 (+6 ❇️ 绿宝石)</span>
              </span>
              <button
                onClick={() => speakText(currentChallenge.resultSentence)}
                className="p-1 bg-red-900 hover:bg-red-800 text-red-200 rounded flex items-center gap-1 text-[11px]"
                title="收听整句原声"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>原声朗读</span>
              </button>
            </div>
            <p className="text-sm font-mono font-black text-white">
              "{currentChallenge.resultSentence}"
            </p>
            <p className="text-xs font-mono text-slate-300">
              {currentChallenge.resultSentence_zh}
            </p>
            <p className="text-[11px] font-mono text-amber-300 pt-1 border-t border-red-900/60">
              💡 考点点拨: {currentChallenge.grammarRuleTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
