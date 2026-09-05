import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, CheckCircle2, ArrowRight, Volume2, Star, Gift, Check, ShieldCheck } from 'lucide-react';
import { Lesson } from '../types';
import { speakText, playEmeraldSound, playLevelUpSound, playClickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LootChestVictoryModalProps {
  isOpen: boolean;
  lesson: Lesson;
  emeraldsEarned?: number;
  xpEarned?: number;
  onClose: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export const LootChestVictoryModal: React.FC<LootChestVictoryModalProps> = ({
  isOpen,
  lesson,
  emeraldsEarned = 15,
  xpEarned = 30,
  onClose,
  onNextLesson,
  hasNextLesson = true,
}) => {
  const [chestOpened, setChestOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setChestOpened(false);
      return;
    }

    // Play victory sounds and launch confetti
    playLevelUpSound();
    setTimeout(() => {
      setChestOpened(true);
      playEmeraldSound();
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti launch notice:', e);
      }
    }, 450);
  }, [isOpen]);

  if (!isOpen) return null;

  const goldenSentence = lesson.targetSentences?.[0] || lesson.dialogueScript?.[0]?.text || 'Well done! Adventure complete!';
  const goldenTranslation = lesson.targetSentenceTranslations?.[0] || lesson.dialogueScript?.[0]?.translation || '做得好！探险大捷！';

  const handlePlaySentence = () => {
    playClickSound();
    setIsPlayingAudio(true);
    speakText(goldenSentence, () => setIsPlayingAudio(false));
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto pt-safe pb-safe animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-3 sm:border-4 border-[#FFD700] rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 text-white shadow-[0_0_50px_rgba(255,215,0,0.3)] space-y-4 my-auto relative animate-in zoom-in-95 duration-300">
        
        {/* Glow Header Banner */}
        <div className="text-center space-y-1 relative">
          <div className="inline-flex items-center justify-center space-x-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/60 rounded-full text-[11px] font-mono font-black text-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>LEVEL COMPLETED · 关卡探险大捷</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            🎉 第 {lesson.id} 关 通关宝箱已开启！
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            《{lesson.title}》
          </p>
        </div>

        {/* Animated Minecraft Loot Chest Graphic */}
        <div className="flex flex-col items-center justify-center py-2 relative">
          <div className="relative">
            {/* Background Halo */}
            <div className="absolute inset-0 bg-amber-400/20 rounded-full filter blur-xl animate-pulse" />

            {/* Chest Icon representation */}
            <div className={`text-6xl sm:text-7xl transition-all duration-500 cursor-pointer transform select-none ${
              chestOpened ? 'scale-110 -translate-y-1' : 'animate-bounce'
            }`}>
              {chestOpened ? '🎁' : '📦'}
            </div>

            {/* Floating Emeralds */}
            {chestOpened && (
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 text-xs font-mono font-black px-2 py-0.5 rounded-full border-2 border-white shadow-lg animate-bounce">
                +{emeraldsEarned} 💎
              </div>
            )}
            {chestOpened && (
              <div className="absolute -bottom-2 -left-3 bg-amber-400 text-slate-950 text-xs font-mono font-black px-2 py-0.5 rounded-full border-2 border-white shadow-lg">
                +{xpEarned} ⭐ XP
              </div>
            )}
          </div>

          {/* Reward Badges Bar */}
          <div className="flex items-center justify-center gap-2 mt-3 font-mono font-bold text-xs">
            <div className="bg-emerald-950/80 border border-emerald-500/70 text-emerald-300 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <span className="text-base">💎</span>
              <span>+{emeraldsEarned} 绿宝石</span>
            </div>
            <div className="bg-amber-950/80 border border-amber-500/70 text-amber-300 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <span className="text-base">⭐</span>
              <span>+{xpEarned} 探险经验</span>
            </div>
          </div>
        </div>

        {/* Lesson Golden Sentence Card (本课通关金句) */}
        <div className="bg-slate-900/90 border-2 border-emerald-500/50 rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold border-b border-slate-800 pb-1.5">
            <span className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>本课核心通关金句</span>
            </span>
            <button
              onClick={handlePlaySentence}
              className="text-amber-300 hover:text-amber-200 flex items-center space-x-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 cursor-pointer"
            >
              <Volume2 className={`w-3 h-3 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>标准示范</span>
            </button>
          </div>

          <p className="font-mono text-sm sm:text-base font-black text-white leading-snug">
            "{goldenSentence}"
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {goldenTranslation}
          </p>
        </div>

        {/* 3-Step Mastery Checklist (学习闭环全达成) */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[10px] text-slate-400">情境对话精听</span>
            <span className="text-xs font-bold text-emerald-300">100% 达成</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[10px] text-slate-400">方块语法拼句</span>
            <span className="text-xs font-bold text-emerald-300">100% 掌握</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2 flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[10px] text-slate-400">现实场景运用</span>
            <span className="text-xs font-bold text-emerald-300">100% 打卡</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-black text-xs rounded-xl border border-slate-600 shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <Gift className="w-4 h-4 text-amber-400" />
            <span>收下战利品并返回</span>
          </button>

          {hasNextLesson && onNextLesson ? (
            <button
              onClick={() => {
                playClickSound();
                onNextLesson();
              }}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono font-black text-xs rounded-xl border-2 border-[#7CFC00] shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>🚀 开启下一关探险</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-full py-2.5 sm:py-3 bg-[#487E2C] hover:bg-[#355E20] text-white font-mono font-black text-xs rounded-xl border-2 border-[#7CFC00] shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>太棒了！完成全部探险</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
