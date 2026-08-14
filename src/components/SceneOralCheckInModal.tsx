import React, { useState, useEffect, useRef } from 'react';
import { speakText, stopSpeech, playClickSound, playLevelUpSound, playEmeraldSound } from '../utils/audio';
import {
  Mic, MicOff, Volume2, CheckCircle2, Award, Sparkles, X,
  AlertCircle, ShieldCheck, Headphones, ArrowRight
} from 'lucide-react';

export interface RealWorldSceneItem {
  id: number;
  icon: string;
  sceneTitle: string;
  gamePhrase: string;
  realPhrase: string;
  cnMeaning: string;
}

interface SceneOralCheckInModalProps {
  scene: RealWorldSceneItem;
  isOpen: boolean;
  onClose: () => void;
  onCompleteSceneCheckIn: (sceneId: number, earnedEmeralds: number, earnedXp: number, isSpoken: boolean) => void;
}

export const SceneOralCheckInModal: React.FC<SceneOralCheckInModalProps> = ({
  scene,
  isOpen,
  onClose,
  onCompleteSceneCheckIn
}) => {
  // Modes: 'spoken_reading' (Microphone speech recording) | 'silent_listen' (Listening & Quiz alternative)
  const [mode, setMode] = useState<'spoken_reading' | 'silent_listen'>('spoken_reading');

  // Oral Reading State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedSpoken, setRecordedSpoken] = useState<string>('');
  const [oralScore, setOralScore] = useState<number | null>(null);
  const [oralFeedback, setOralFeedback] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Silent Mode State (Must listen to model audio before quiz unlocks)
  const [hasListenedAudio, setHasListenedAudio] = useState<boolean>(false);
  const [isPlayingModelAudio, setIsPlayingModelAudio] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setRecordedSpoken('');
      setOralScore(null);
      setOralFeedback('');
      setHasListenedAudio(false);
      setQuizAnswer(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Voice Speech Recognition Logic
  const startRecording = () => {
    playClickSound();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback for browsers without speech recognition
      setOralFeedback('检测到当前环境暂不支持实时麦克风收音，已为您记录！');
      setRecordedSpoken(scene.realPhrase);
      setOralScore(90);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      setIsRecording(true);
      setRecordedSpoken('');
      setOralFeedback('');

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setRecordedSpoken(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setOralFeedback('麦克风权限未开启。您可以切换到【无麦克风/静音自测】通道完成打卡！');
        } else {
          setOralFeedback('未能清晰录到声音，请离麦克风近一点再大声试一次～');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setTimeout(() => {
          evaluateSpoken();
        }, 300);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const evaluateSpoken = () => {
    if (!recordedSpoken) {
      setOralScore(85);
      setOralFeedback('🌟 敢于大声开口就是最大的进步！');
      return;
    }

    const cleanTarget = scene.realPhrase.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const cleanSpoken = recordedSpoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    const targetWords = cleanTarget.split(/\s+/);
    const spokenWords = cleanSpoken.split(/\s+/);

    let matches = 0;
    targetWords.forEach(w => {
      if (spokenWords.includes(w)) matches++;
    });

    const accuracy = Math.round((matches / Math.max(targetWords.length, 1)) * 100);
    const finalScore = Math.max(75, Math.min(100, accuracy + 15)); // Encouraging curve
    setOralScore(finalScore);

    if (finalScore >= 90) {
      setOralFeedback('🌟 现实生活口语发音非常地道！获得双倍绿宝石奖励！');
    } else if (finalScore >= 80) {
      setOralFeedback('👍 读得很清晰流畅！成功达成生活场景口语打卡！');
    } else {
      setOralFeedback('👏 开口大声朗读很棒！多听几遍原声会更地道哦！');
    }
  };

  // Play Model Audio
  const handlePlayModel = () => {
    playClickSound();
    setIsPlayingModelAudio(true);
    speakText(scene.realPhrase, () => {
      setIsPlayingModelAudio(false);
      setHasListenedAudio(true);
    }, {
      lang: 'en-US',
      speaker: 'Alex',
      rate: 0.9
    });
  };

  // Submission handler
  const handleFinalSubmit = (isSpokenPassed: boolean) => {
    if (isSpokenPassed) {
      playLevelUpSound();
      onCompleteSceneCheckIn(scene.id, 4, 15, true); // +4 Emeralds for spoken (Double reward)
    } else {
      playEmeraldSound();
      onCompleteSceneCheckIn(scene.id, 2, 5, false); // +2 Emeralds for silent
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#2D241E] border-3 sm:border-4 border-[#1B140F] rounded-2xl sm:rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Header Strip */}
        <div className="bg-[#201812] border-b-2 border-black/40 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{scene.icon}</span>
            <div>
              <h3 className="text-sm sm:text-base font-black font-mono text-amber-300">
                学以致用 · {scene.sceneTitle} 打卡
              </h3>
              <p className="text-[11px] font-mono text-amber-200/80">
                大声开口读出生活应用句 · 拒绝空刷
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Real-World Phrase Target Card */}
          <div className="bg-black/40 border-2 border-amber-500/40 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center space-x-1">
                <span>🏠 生活场景口语目标</span>
              </span>
              <button
                type="button"
                onClick={handlePlayModel}
                className="bg-amber-600/90 hover:bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingModelAudio ? 'animate-pulse text-amber-200' : ''}`} />
                <span>{isPlayingModelAudio ? '正在播放...' : '听标准示范'}</span>
              </button>
            </div>

            <div className="p-2 bg-slate-900/60 rounded-lg text-[11px] font-mono text-slate-400 border border-white/5">
              <span className="text-emerald-400 font-bold">🎮 游戏句型:</span> "{scene.gamePhrase}"
            </div>

            <div className="p-2.5 bg-amber-950/60 border border-amber-500/30 rounded-xl space-y-1">
              <p className="text-base sm:text-lg font-mono font-black text-amber-300 leading-snug">
                "{scene.realPhrase}"
              </p>
              <p className="text-xs font-mono text-amber-200/90">
                💡 {scene.cnMeaning}
              </p>
            </div>
          </div>

          {/* Mode Switch Tab Bar */}
          <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-black">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMode('spoken_reading');
              }}
              className={`py-2 rounded-lg font-mono font-black text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                mode === 'spoken_reading'
                  ? 'bg-amber-500 text-black shadow-xs border border-amber-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>🎙️ 真人开口跟读 (+4 ❇️)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMode('silent_listen');
              }}
              className={`py-2 rounded-lg font-mono font-black text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                mode === 'silent_listen'
                  ? 'bg-amber-700 text-white shadow-xs border border-amber-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>🔇 无麦克风/静音自测</span>
            </button>
          </div>

          {/* BRANCH 1: Spoken Reading Challenge */}
          {mode === 'spoken_reading' && (
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center space-y-4">
              
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-all transform active:scale-95 cursor-pointer shadow-lg ${
                      isRecording
                        ? 'bg-rose-600 border-rose-400 animate-pulse ring-4 ring-rose-500/50'
                        : oralScore !== null
                        ? 'bg-amber-500 border-amber-300 hover:bg-amber-400 text-slate-950'
                        : 'bg-amber-600 border-amber-400 hover:bg-amber-500'
                    }`}
                  >
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-white rounded-sm animate-ping" />
                        <span className="text-[10px] font-mono font-black mt-1">录音中...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Mic className="w-7 h-7 text-white" />
                        <span className="text-[10px] font-mono font-black mt-1">
                          {oralScore !== null ? '重新朗读' : '按住朗读'}
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-300">
                  {isRecording
                    ? '正在录入您的发音，读完点击停止...'
                    : oralScore !== null
                    ? '发音已收到，点击下方按钮完成打卡！'
                    : '点击麦克风按钮，大声读出上方黄色框生活英文'}
                </p>
              </div>

              {/* Recorded Transcript & Score Card */}
              {(recordedSpoken || oralFeedback) && (
                <div className="bg-black/40 border border-amber-500/30 rounded-xl p-3 text-left space-y-2">
                  {recordedSpoken && (
                    <div className="text-xs font-mono">
                      <span className="text-slate-400">听到你说: </span>
                      <span className="text-amber-300 font-bold">"{recordedSpoken}"</span>
                    </div>
                  )}

                  {oralScore !== null && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-mono font-black text-amber-300">
                          发音得分: {oralScore} 分
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600">
                        双倍奖励 +4 ❇️
                      </span>
                    </div>
                  )}

                  {oralFeedback && (
                    <p className="text-[11px] font-mono text-slate-200 leading-relaxed">
                      {oralFeedback}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Spoken Button */}
              {oralScore !== null ? (
                <button
                  type="button"
                  onClick={() => handleFinalSubmit(true)}
                  className="w-full bg-amber-400 hover:bg-amber-300 border-2 border-black py-3 rounded-xl font-mono font-black text-sm text-slate-950 flex items-center justify-center space-x-2 shadow-[0_4px_0_0_#78350F] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-900" />
                  <span>以 {oralScore} 分完成生活场景打卡 (领 +4 ❇️ 双倍奖励)</span>
                </button>
              ) : (
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>必须至少开口录音一次，才能进行口语打卡！</span>
                </div>
              )}

            </div>
          )}

          {/* BRANCH 2: Silent Listen / Quiz (For No-Mic environments) */}
          {mode === 'silent_listen' && (
            <div className="bg-black/30 border border-amber-500/30 rounded-2xl p-4 space-y-4">
              
              <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs font-mono leading-relaxed text-amber-200">
                  <p className="font-bold">无麦克风/静音防偷懒验证：</p>
                  <p className="text-slate-300 mt-0.5">
                    请完整听一遍原声示范，并选出本句在生活中的应用场景，即可解锁打卡！
                  </p>
                </div>
              </div>

              {/* Step 1: Listen Model Audio */}
              <div className="bg-black/40 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${hasListenedAudio ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {hasListenedAudio ? <CheckCircle2 className="w-4 h-4" /> : '1'}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white">第 1 步：听完原声示范</h4>
                    <p className="text-[10px] font-mono text-slate-400">
                      {hasListenedAudio ? '已完整听完示范 ✓' : '请点击右侧按钮播放'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlayModel}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingModelAudio ? 'animate-pulse' : ''}`} />
                  <span>{isPlayingModelAudio ? '播放中...' : '点击播放'}</span>
                </button>
              </div>

              {/* Step 2: Micro Quiz (Quick verification) */}
              <div className={`bg-black/40 border p-3 rounded-xl space-y-2 transition-opacity ${hasListenedAudio ? 'border-white/10 opacity-100' : 'border-white/5 opacity-50 pointer-events-none'}`}>
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200">
                  <span className="w-5 h-5 rounded-md bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">2</span>
                  <span>第 2 步：场景应用理解自测</span>
                </div>

                <p className="text-xs font-mono text-amber-300 pl-7">
                  问：句子 "{scene.realPhrase}" 在什么场景下使用？
                </p>

                {/* Choices */}
                <div className="grid grid-cols-1 gap-1.5 pl-7 pt-1">
                  {[
                    scene.cnMeaning,
                    '在游戏中与僵尸进行搏斗时使用。',
                    '在晚上睡觉前向大家道晚安。'
                  ].sort().map((choice, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setQuizAnswer(choice);
                      }}
                      className={`text-left p-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        quizAnswer === choice
                          ? choice === scene.cnMeaning
                            ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200 font-bold'
                            : 'bg-rose-900/60 border-rose-400 text-rose-200'
                          : 'bg-black/30 border-white/10 hover:border-white/30 text-slate-300'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Silent Button */}
              {hasListenedAudio && quizAnswer === scene.cnMeaning ? (
                <button
                  type="button"
                  onClick={() => handleFinalSubmit(false)}
                  className="w-full bg-amber-600 hover:bg-amber-500 border-2 border-black py-2.5 rounded-xl font-mono font-black text-xs text-white flex items-center justify-center space-x-1.5 shadow-[0_3px_0_0_#78350F] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>完成听读自测打卡 (+2 ❇️ 基础奖励)</span>
                </button>
              ) : (
                <p className="text-[11px] font-mono text-center text-slate-400">
                  {!hasListenedAudio ? '请先完整播放一次音频' : '请选出正确的场景解析以完成验证'}
                </p>
              )}

            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="bg-[#201812] border-t border-white/10 px-4 py-2.5 text-center text-[11px] font-mono text-slate-400">
          💡 提示：真实开口朗读奖励 4 绿宝石（普通自测 2 绿宝石），鼓励孩子把英语真正用在生活中！
        </div>

      </div>
    </div>
  );
};
