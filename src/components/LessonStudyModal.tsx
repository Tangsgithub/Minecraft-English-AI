import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Volume2, Play, Square, X } from 'lucide-react';
import { Lesson } from '../types';
import { getBiomeChapterByUnit } from '../data/storyData';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';

interface LessonStudyModalProps {
  lesson: Lesson;
  onClose: () => void;
  onStartPractice: (lesson: Lesson) => void;
}

export const LessonStudyModal: React.FC<LessonStudyModalProps> = ({ lesson, onClose, onStartPractice }) => {
  const [playedAudioIds, setPlayedAudioIds] = useState<Set<string>>(new Set());
  const [isPlayingAllDialogue, setIsPlayingAllDialogue] = useState<boolean>(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number | null>(null);
  const stopPlayRef = useRef<boolean>(false);

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

    setIsPlayingAllDialogue(false);
    setCurrentDialogueIndex(null);
  };

  const totalAudioItems = lesson.targetSentences.length + lesson.vocabulary.length + lesson.dialogueScript.length;
  const isAllPlayed = playedAudioIds.size >= totalAudioItems;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto pt-safe pb-safe animate-in fade-in duration-200">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-3xl text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#487E2C] p-4 sm:p-6 border-b-4 border-[#355E20] flex items-center justify-between text-white shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#7CFC00] font-bold mb-1">
              <span>Unit {lesson.unit}</span>
              <span>•</span>
              <span>Lesson {lesson.id}</span>
              <span>•</span>
              <span className="bg-black/20 px-2 py-0.5 rounded-full border border-white/20 text-white">
                {lesson.minecraftScene}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono leading-tight">
              {lesson.title} ({lesson.titleZh})
            </h2>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="bg-black/20 hover:bg-black/40 text-white px-3 sm:px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border-2 border-white/30 transition-colors shrink-0 whitespace-nowrap ml-2"
          >
            ✕ 暂离
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300">
            <h3 className="text-xs font-mono font-black text-amber-900 mb-2">📜 场景提要</h3>
            <p className="text-sm text-amber-950 font-bold">{lesson.sceneDescription}</p>
          </div>

          {/* Minecraft Scene Original Dialogue */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <h3 className="text-xs sm:text-sm font-mono font-black text-[#487E2C] uppercase tracking-wider">
                  🎭 原版课文对话练习
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

            <div className="space-y-3 pt-1">
              {lesson.dialogueScript.map((turn, index) => {
                const audioId = `dialogue_${index}`;
                const isPlayed = playedAudioIds.has(audioId);
                const isCurrentlyPlaying = index === currentDialogueIndex;

                return (
                  <div key={index} className={`flex items-start space-x-3 text-xs transition-all duration-300 ${isCurrentlyPlaying ? 'scale-[1.01]' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl bg-white border-2 flex items-center justify-center text-lg shrink-0 shadow-sm transition-all ${
                      isCurrentlyPlaying ? 'border-emerald-500 ring-2 ring-emerald-400 bg-emerald-50' : 'border-slate-300'
                    }`}>
                      {turn.avatar || (turn.speaker === 'Alex' ? '👩' : '👦')}
                    </div>
                    <div className={`flex-1 p-3 rounded-2xl border-2 shadow-sm transition-all ${
                      isCurrentlyPlaying
                        ? 'bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-400/50 shadow-md'
                        : isPlayed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-[#487E2C]">
                            {turn.speaker}
                          </span>
                          {isCurrentlyPlaying && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-200/80 font-bold px-1.5 py-0.2 rounded border border-emerald-400 animate-pulse">
                              🔊 正在朗读...
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handlePlayAudio(audioId, turn.text, turn.speaker)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isCurrentlyPlaying
                              ? 'bg-emerald-600 text-white border-black'
                              : isPlayed
                                ? 'bg-[#487E2C] text-white border-black'
                                : 'bg-slate-100 text-slate-500 hover:text-[#487E2C] border-slate-300'
                          }`}
                          title="朗读本句"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isCurrentlyPlaying ? 'animate-bounce' : ''}`} />
                        </button>
                      </div>
                      <p className="font-mono font-bold text-[#2D2D2D] text-xs sm:text-sm mb-0.5 leading-relaxed">{turn.text}</p>
                      <p className="text-[11px] sm:text-xs text-slate-500">{turn.translation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Sentences Section */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 space-y-3">
            <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>核心句型挑战 (Target Sentences)</span>
            </h3>
            <div className="space-y-2">
              {lesson.targetSentences.map((sentence, idx) => {
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
                        {lesson.targetSentenceTranslations[idx]}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(audioId, sentence)}
                      className={`p-2.5 rounded-xl border-2 transition-colors shadow-sm shrink-0 ${isPlayed ? 'bg-[#487E2C] text-white border-black' : 'bg-slate-100 text-[#487E2C] border-[#487E2C] hover:bg-green-100'}`}
                      title="朗读示范发音"
                    >
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Target Vocabulary */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-black text-[#487E2C] flex items-center space-x-2 uppercase tracking-wider">
              <span>📦 本课 Minecraft 核心词汇</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <button
                          onClick={() => handlePlayAudio(audioId, vocab.word)}
                          className={`p-1.5 rounded-lg border transition-colors ${isPlayed ? 'bg-[#487E2C] text-white border-black' : 'bg-slate-200 text-[#487E2C] border-slate-300 hover:bg-slate-300'}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
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
          {!isAllPlayed ? (
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-full bg-slate-300 rounded-full h-2.5 mb-1 overflow-hidden border border-slate-400">
                <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.round((playedAudioIds.size / totalAudioItems) * 100))}%` }}></div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-500 font-mono">
                📝 任务要求: 请先收听并学习所有课文对话、句型与词汇 ({playedAudioIds.size}/{totalAudioItems})
              </p>
              <button disabled className="w-full py-3 sm:py-4 bg-slate-300 text-slate-500 font-black rounded-xl border-2 border-slate-400 text-sm sm:text-base cursor-not-allowed">
                锁定的实战练习通道 🔒
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-2 animate-in slide-in-from-bottom-2">
              <p className="text-xs sm:text-sm font-black text-[#487E2C] font-mono animate-pulse">
                ✨ 基础学习完成！Alex 老师正在实战区等你 ✨
              </p>
              <button
                onClick={() => {
                  playEmeraldSound();
                  onStartPractice(lesson);
                }}
                className="w-full py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl border-4 border-slate-950 shadow-[4px_4px_0_0_#0F172A] transition-transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                进入 1V1 沉浸式实战练习 ⚔️
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
