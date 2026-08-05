import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle, Flame, Shield, Volume2, X } from 'lucide-react';
import { playEmeraldSound, playClickSound, speakText } from '../utils/audio';

export interface RandomEvent {
  id: string;
  type: 'creeper' | 'villager' | 'trader' | 'enderman' | 'zombie' | 'piglin';
  titleEn: string;
  titleZh: string;
  avatar: string;
  locationName: string;
  bgGradient: string;
  borderColor: string;
  storyEn: string;
  storyZh: string;
  questionEn: string;
  questionZh: string;
  options: {
    label: string;
    textEn: string;
    textZh: string;
    isCorrect: boolean;
  }[];
  explanationZh: string;
  rewardEmeralds: number;
  rewardXp: number;
}

export const RANDOM_ADVENTURE_EVENTS: RandomEvent[] = [
  {
    id: 'evt_creeper_1',
    type: 'creeper',
    titleEn: 'Creeper Sneak Attack!',
    titleZh: '⚠️ 苦力怕紧急拆弹危机',
    avatar: '🟩',
    locationName: '主城平原边缘',
    bgGradient: 'from-emerald-900 via-green-950 to-black',
    borderColor: 'border-emerald-400',
    storyEn: 'A sneaky Creeper is tssss-ing behind your oak shelter! Answer fast to defuse it!',
    storyZh: '一只苦力怕正在你的木屋后方发出“嘶嘶”声音！快速回答英语礼貌用语拆除危机！',
    questionEn: 'Which English phrase means "请问 / 打扰一下"?',
    questionZh: '哪个英语短语表达“请问 / 打扰一下”？',
    options: [
      { label: 'A', textEn: 'Thank you very much', textZh: '非常感谢', isCorrect: false },
      { label: 'B', textEn: 'Excuse me', textZh: '打扰一下 / 请问', isCorrect: true },
      { label: 'C', textEn: 'Good night', textZh: '晚安', isCorrect: false },
      { label: 'D', textEn: 'Nice to meet you', textZh: '很高兴认识你', isCorrect: false }
    ],
    explanationZh: '“Excuse me” 是《新概念英语》第 1 课的核心礼貌搭讪用语！',
    rewardEmeralds: 8,
    rewardXp: 20
  },
  {
    id: 'evt_villager_1',
    type: 'villager',
    titleEn: 'Villager Handbag Crisis!',
    titleZh: '🆘 村民遗失手提包求助',
    avatar: '👨‍🌾',
    locationName: '橡木村庄广场',
    bgGradient: 'from-amber-900 via-stone-900 to-black',
    borderColor: 'border-amber-400',
    storyEn: 'A villager lost his handbag in the acacia woods! Help him confirm ownership!',
    storyZh: '一位村民在相思木森林遗失了手提包！帮他问一句确认是不是他的包！',
    questionEn: 'How do you ask "这是你的手提包吗？" in English?',
    questionZh: '用英语怎么表达“这是你的手提包吗？”？',
    options: [
      { label: 'A', textEn: 'Where is my handbag?', textZh: '我的手提包在哪？', isCorrect: false },
      { label: 'B', textEn: 'This is my coat.', textZh: '这是我的外套。', isCorrect: false },
      { label: 'C', textEn: 'Is this your handbag?', textZh: '这是你的手提包吗？', isCorrect: true },
      { label: 'D', textEn: 'Give me your handbag.', textZh: '把你的包给我。', isCorrect: false }
    ],
    explanationZh: '“Is this your...?” 是询问物品归属的标准一般疑问句型。',
    rewardEmeralds: 8,
    rewardXp: 20
  },
  {
    id: 'evt_trader_1',
    type: 'trader',
    titleEn: 'Wandering Trader Secret Deal',
    titleZh: '🎒 流浪商人的职业密信',
    avatar: '🦙',
    locationName: '沙漠神殿门前',
    bgGradient: 'from-blue-900 via-indigo-950 to-black',
    borderColor: 'border-blue-400',
    storyEn: 'The Wandering Trader offers 10 emeralds if you can identify his friend\'s job!',
    storyZh: '神秘的流浪商人承诺：如果你能准确用不定冠词拼出职业词汇，就送你大额绿宝石！',
    questionEn: 'Complete the sentence: "Is he a miner?" - "No, he is _____ engineer."',
    questionZh: '填空：“Is he a miner?” - “No, he is _____ engineer.”',
    options: [
      { label: 'A', textEn: 'an', textZh: 'an（接元音音素开头的单词）', isCorrect: true },
      { label: 'B', textEn: 'a', textZh: 'a', isCorrect: false },
      { label: 'C', textEn: 'the', textZh: 'the', isCorrect: false },
      { label: 'D', textEn: '/', textZh: '无需填冠词', isCorrect: false }
    ],
    explanationZh: '“engineer” 以元音音素 /e/ 开头，冠词必须用 “an”！',
    rewardEmeralds: 10,
    rewardXp: 25
  },
  {
    id: 'evt_enderman_1',
    type: 'enderman',
    titleEn: 'Enderman Teleport Riddle',
    titleZh: '👁️ 末影人的国家谜题',
    avatar: '👽',
    locationName: '诡异森林高台',
    bgGradient: 'from-[#2e0854] via-[#120323] to-black',
    borderColor: 'border-purple-400',
    storyEn: 'An Enderman holding a purple block whispers a question about nationality!',
    storyZh: '手持紫颂方块的末影人飘在你身后，用低沉的声音考考你关于国籍的表达！',
    questionEn: 'How do you ask someone if they are French or Swedish?',
    questionZh: '如何询问对方是法国人还是瑞典人（选择疑问句）？',
    options: [
      { label: 'A', textEn: 'Do you French and Swedish?', textZh: '错用助动词', isCorrect: false },
      { label: 'B', textEn: 'Where are French or Swedish?', textZh: '句意不通', isCorrect: false },
      { label: 'C', textEn: 'Who is French or Swedish?', textZh: '谁是法国人或瑞典人', isCorrect: false },
      { label: 'D', textEn: 'Are you French or Swedish?', textZh: '你是法国人还是瑞典人？', isCorrect: true }
    ],
    explanationZh: '选择疑问句用 “A or B” 连接，并升调问出！',
    rewardEmeralds: 10,
    rewardXp: 25
  },
  {
    id: 'evt_piglin_1',
    type: 'piglin',
    titleEn: 'Piglin Gold Barter Trade',
    titleZh: '🐖 猪灵要塞金锭置换',
    avatar: '👺',
    locationName: '下界熔岩要塞',
    bgGradient: 'from-red-950 via-orange-950 to-black',
    borderColor: 'border-amber-500',
    storyEn: 'A Piglin Brute guards a golden chest! Spell the correct plural word to trade!',
    storyZh: '下界要塞里的猪灵守卫着金宝箱！给出正确的“孩子”复数形式就能换取金锭与绿宝石！',
    questionEn: 'What is the correct plural form of the word "child"?',
    questionZh: '单词 "child"（孩子）的复数形式是什么？',
    options: [
      { label: 'A', textEn: 'children', textZh: 'children（不规则复数）', isCorrect: true },
      { label: 'B', textEn: 'childs', textZh: 'childs', isCorrect: false },
      { label: 'C', textEn: 'childrens', textZh: 'childrens', isCorrect: false },
      { label: 'D', textEn: 'childes', textZh: 'childes', isCorrect: false }
    ],
    explanationZh: 'child 的复数是不规则名词复数 “children”！',
    rewardEmeralds: 12,
    rewardXp: 30
  }
];

interface RandomAdventureModalProps {
  event: RandomEvent;
  onClose: () => void;
  onAwardEmeralds?: (emeralds: number, xp: number) => void;
}

export const RandomAdventureModal: React.FC<RandomAdventureModalProps> = ({
  event,
  onClose,
  onAwardEmeralds
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    playClickSound();
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isSubmitted) return;
    const choice = event.options[selectedOptionIndex];
    setIsSubmitted(true);

    if (choice.isCorrect) {
      setIsCorrect(true);
      playEmeraldSound();
      if (onAwardEmeralds) {
        onAwardEmeralds(event.rewardEmeralds, event.rewardXp);
      }
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className={`bg-gradient-to-b ${event.bgGradient} border-4 ${event.borderColor} rounded-3xl w-full max-w-lg text-white shadow-[16px_16px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden my-auto space-y-4 p-5 sm:p-6 relative`}>
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-9 h-9 rounded-xl font-mono text-base font-black border-2 border-white/20 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {/* Event Header */}
        <div className="flex items-center space-x-3.5 border-b-2 border-white/10 pb-4">
          <div className="w-16 h-16 bg-black/40 border-3 border-amber-400 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg animate-bounce">
            {event.avatar}
          </div>
          <div>
            <span className="text-[10px] font-mono font-black uppercase text-amber-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              ⚡ 随机探险突发事件 • {event.locationName}
            </span>
            <h3 className="text-xl font-black font-mono text-white mt-1 leading-tight">
              {event.titleZh}
            </h3>
            <p className="text-xs font-bold text-amber-200 font-mono">
              {event.titleEn}
            </p>
          </div>
        </div>

        {/* Story Scenario */}
        <div className="bg-black/40 border-2 border-white/15 rounded-2xl p-4 space-y-1.5">
          <p className="text-xs font-mono font-black text-amber-300 flex items-center space-x-1">
            <span>📖 探险情境:</span>
          </p>
          <p className="text-xs font-bold text-slate-100 leading-relaxed">
            {event.storyZh}
          </p>
          <p className="text-[11px] text-amber-200/80 font-mono italic">
            "{event.storyEn}"
          </p>
        </div>

        {/* Question Challenge */}
        <div className="space-y-3">
          <div className="bg-amber-950/60 border-2 border-amber-400/40 rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center justify-between text-amber-300 text-xs font-mono font-black">
              <span className="flex items-center space-x-1">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>突发英语关卡挑战:</span>
              </span>
              <button
                type="button"
                onClick={() => speakText(event.questionEn)}
                className="p-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 rounded-lg flex items-center space-x-1 text-[10px]"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>朗读</span>
              </button>
            </div>
            <p className="text-sm font-mono font-black text-white">
              {event.questionEn}
            </p>
            <p className="text-xs text-amber-200 font-bold">
              {event.questionZh}
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2">
            {event.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let btnClass = 'bg-black/50 border-white/20 text-white hover:bg-black/70';

              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-600/90 border-emerald-300 text-white font-black ring-2 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-rose-700/90 border-rose-400 text-white';
                } else {
                  btnClass = 'bg-black/30 border-white/10 text-slate-400 opacity-50';
                }
              } else if (isSelected) {
                btnClass = 'bg-amber-500 text-amber-950 font-black border-amber-300 ring-2 ring-amber-300';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 rounded-2xl border-2 font-mono text-xs flex items-center justify-between transition-all ${btnClass}`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center font-black text-xs shrink-0">
                      {opt.label}
                    </span>
                    <div>
                      <p className="font-black text-xs">{opt.textEn}</p>
                      <p className="text-[10px] opacity-80 font-bold">{opt.textZh}</p>
                    </div>
                  </div>

                  {isSubmitted && opt.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit & Result Section */}
        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={selectedOptionIndex === null}
            className={`w-full py-3.5 rounded-2xl font-mono text-xs font-black border-2 border-black flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#78350F] transition-all ${
              selectedOptionIndex !== null
                ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 cursor-pointer active:translate-y-0.5'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60 border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>确认提交答案 (挑战成功可获 +{event.rewardEmeralds} ❇️ 绿宝石)</span>
          </button>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className={`p-4 rounded-2xl border-2 text-xs font-mono font-bold space-y-1 ${
              isCorrect
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                : 'bg-rose-950/90 border-rose-400 text-rose-100'
            }`}>
              <p className="text-sm font-black flex items-center space-x-1.5">
                <span>{isCorrect ? '🎉 危机解除！获得奖励！' : '❌ 挑战未通过，再次复习要点：'}</span>
              </p>
              <p className="text-xs font-bold leading-relaxed">
                {event.explanationZh}
              </p>
              {isCorrect && (
                <p className="text-amber-300 font-mono text-xs font-black pt-1">
                  ❇️ +{event.rewardEmeralds} 绿宝石 | ⚡ +{event.rewardXp} XP 额外注入已归仓！
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-600 py-3 rounded-2xl font-mono text-xs font-bold shadow-md"
            >
              继续探索 Minecraft 英语大地图
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
