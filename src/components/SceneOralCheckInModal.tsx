import React, { useState, useEffect, useRef } from 'react';
import { speakText, stopSpeech, playClickSound, playLevelUpSound, playEmeraldSound } from '../utils/audio';
import { evaluateSpeech, SpeechAssessmentResult, cleanSpokenText } from '../services/speechAssessmentService';
import {
  Mic, MicOff, Volume2, CheckCircle2, Award, Sparkles, X,
  AlertCircle, ShieldCheck, Headphones, ArrowRight, Star
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
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedSpoken, setRecordedSpoken] = useState<string>('');
  const [assessmentResult, setAssessmentResult] = useState<SpeechAssessmentResult | null>(null);
  const [oralFeedback, setOralFeedback] = useState<string>('');
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<any>(null);

  // Silent Mode State (Must listen to model audio before quiz unlocks)
  const [hasListenedAudio, setHasListenedAudio] = useState<boolean>(false);
  const [isPlayingModelAudio, setIsPlayingModelAudio] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      setRecordedSpoken('');
      setAssessmentResult(null);
      setOralFeedback('');
      setHasListenedAudio(false);
      setQuizAnswer(null);
      setIsRecording(false);
      setRecordingSeconds(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Voice Speech Recognition Logic
  const startRecording = () => {
    playClickSound();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setOralFeedback('当前浏览器暂不支持实时收音，建议在 Chrome/Edge 中打开，或切换至下方【无麦克风/静音自测】通道完成打卡！');
      setRecordedSpoken('');
      setAssessmentResult(null);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      setIsRecording(true);
      setRecordingSeconds(0);
      setRecordedSpoken('');
      setAssessmentResult(null);
      setOralFeedback('');

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);

      let capturedTranscript = '';

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        capturedTranscript = current;
        setRecordedSpoken(current);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event?.error);
        setIsRecording(false);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        if (event?.error === 'not-allowed') {
          setOralFeedback('麦克风权限未开启。请点击地址栏锁头图标允许麦克风，或切换到【无麦克风/静音自测】通道！');
        } else if (event?.error === 'no-speech') {
          setOralFeedback('未检测到发音，请靠近麦克风并大声朗读哦！');
        } else {
          setOralFeedback('收音中断，请离麦克风近一点再大声试一次～');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        setTimeout(() => {
          evaluateSpoken(capturedTranscript);
        }, 200);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecording(false);
  };

  const evaluateSpoken = (transcriptToEval?: string) => {
    const textToTest = transcriptToEval !== undefined ? transcriptToEval : recordedSpoken;
    const duration = Math.max(1.0, recordingSeconds);

    if (!cleanSpokenText(textToTest)) {
      setAssessmentResult(null);
      setOralFeedback('⚠️ 未检测到有效发音。请靠近麦克风大声朗读上方英文，或切换至【无麦克风/静音自测】！');
      return;
    }

    const result = evaluateSpeech(scene.realPhrase, textToTest, duration);
    setAssessmentResult(result);

    if (result.overallScore >= 85) {
      setOralFeedback(`🌟 ${result.encouragement}`);
      playLevelUpSound();
    } else if (result.overallScore >= 60) {
      setOralFeedback(`👍 ${result.encouragement}`);
      playEmeraldSound();
    } else {
      setOralFeedback(`👏 ${result.encouragement}`);
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
      rate: 0.9
    });
  };

  const handleFinalSubmit = (isSpoken: boolean) => {
    playLevelUpSound();
    const emeralds = isSpoken ? 4 : 2; // Spoken gives double emeralds
    const xp = isSpoken ? 30 : 15;
    onCompleteSceneCheckIn(scene.id, emeralds, xp, isSpoken);
    onClose();
  };

  const oralScore = assessmentResult ? assessmentResult.overallScore : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#2D1B00] border-4 border-amber-500 rounded-3xl w-full max-w-lg text-amber-50 shadow-[0_0_30px_rgba(245,158,11,0.4)] overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1A0E00] p-4 border-b-2 border-amber-600/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{scene.icon}</span>
            <div>
              <h3 className="text-base sm:text-lg font-black font-mono text-amber-400">
                {scene.sceneTitle} • 生活口语打卡
              </h3>
              <p className="text-[11px] font-mono text-amber-200/80">
                将游戏英语活学活用到现实生活真实场景中
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-300 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Dual Phrases Display */}
          <div className="space-y-2">
            {/* Game Context */}
            <div className="bg-black/30 border border-amber-500/20 rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-300/70">🎮 MC 游戏场景:</span>
              <span className="font-bold text-amber-100">"{scene.gamePhrase}"</span>
            </div>

            {/* Real Life Golden Phrase */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-400 rounded-2xl p-4 text-center space-y-2 relative shadow-inner">
              <span className="text-[11px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                🌍 现实生活地道金句
              </span>
              <h4 className="text-lg sm:text-xl font-black font-mono text-white tracking-wide">
                "{scene.realPhrase}"
              </h4>
              <p className="text-xs font-mono text-amber-300 font-bold">
                含义: {scene.cnMeaning}
              </p>

              <button
                type="button"
                onClick={handlePlayModel}
                className="mt-1 inline-flex items-center space-x-1.5 bg-amber-500/30 hover:bg-amber-500/50 text-amber-200 border border-amber-400/50 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingModelAudio ? 'animate-pulse text-white' : ''}`} />
                <span>{isPlayingModelAudio ? '正在播放示范...' : '听标准示范'}</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-amber-500/20 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMode('spoken_reading');
              }}
              className={`py-2 rounded-lg font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                mode === 'spoken_reading'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-amber-200/70 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>麦克风口语打卡 (双倍 ❇️)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setMode('silent_listen');
              }}
              className={`py-2 rounded-lg font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                mode === 'silent_listen'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-amber-200/70 hover:text-white'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>无麦克风/静音自测</span>
            </button>
          </div>

          {/* BRANCH 1: Spoken Reading (Microphone Recording) */}
          {mode === 'spoken_reading' && (
            <div className="bg-black/30 border border-amber-500/30 rounded-2xl p-4 space-y-4 text-center">
              
              <div className="space-y-2">
                <div className="relative inline-flex items-center justify-center">
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-rose-500/40 animate-ping" />
                  )}
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                      isRecording
                        ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                        : oralScore !== null && oralScore >= 60
                        ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 border-amber-300 text-slate-950'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-7 h-7 mb-0.5" />
                        <span className="text-[10px] font-mono font-black">完成</span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Mic className="w-7 h-7 mb-0.5" />
                        <span className="text-[10px] font-mono font-black">
                          {oralScore !== null ? '重新朗读' : '点击朗读'}
                        </span>
                      </div>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono text-slate-300">
                  {isRecording
                    ? `正在录入您的发音 (${recordingSeconds}s)，读完点击停止...`
                    : oralScore !== null
                    ? '发音已真实评估，点击下方按钮完成打卡！'
                    : '点击麦克风按钮，大声读出上方黄色框生活英文'}
                </p>
              </div>

              {/* Recorded Transcript & Score Card */}
              {(recordedSpoken || oralFeedback || assessmentResult) && (
                <div className="bg-black/50 border border-amber-500/40 rounded-xl p-3 text-left space-y-2.5">
                  {recordedSpoken && (
                    <div className="text-xs font-mono">
                      <span className="text-slate-400">听到你说: </span>
                      <span className="text-amber-300 font-bold">"{recordedSpoken}"</span>
                    </div>
                  )}

                  {/* Word Badges */}
                  {assessmentResult && assessmentResult.wordAssessments.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {assessmentResult.wordAssessments.map((wa, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-mono font-black px-2 py-0.5 rounded border ${
                            wa.status === 'perfect'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                              : wa.status === 'good'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500'
                              : 'bg-rose-950/80 text-rose-300 border-rose-500'
                          }`}
                          title={wa.feedback}
                        >
                          {wa.word} ({wa.score}分)
                        </span>
                      ))}
                    </div>
                  )}

                  {assessmentResult && (
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
                      <div className="bg-slate-900/80 p-1.5 rounded border border-slate-700">
                        <span className="text-slate-400 block">准确度</span>
                        <span className="text-emerald-400 font-bold text-xs">{assessmentResult.accuracy}%</span>
                      </div>
                      <div className="bg-slate-900/80 p-1.5 rounded border border-slate-700">
                        <span className="text-slate-400 block">流利度</span>
                        <span className="text-blue-400 font-bold text-xs">{assessmentResult.fluency}%</span>
                      </div>
                      <div className="bg-slate-900/80 p-1.5 rounded border border-slate-700">
                        <span className="text-slate-400 block">完整度</span>
                        <span className="text-amber-400 font-bold text-xs">{assessmentResult.completeness}%</span>
                      </div>
                    </div>
                  )}

                  {oralScore !== null && (
                    <div className="flex items-center justify-between border-t border-white/10 pt-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-mono font-black text-amber-300">
                          发音得分: {oralScore} 分
                        </span>
                        {assessmentResult && (
                          <div className="flex items-center space-x-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < assessmentResult.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                              />
                            ))}
                          </div>
                        )}
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
              {oralScore !== null && oralScore >= 50 ? (
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
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{oralScore !== null ? '得分偏低，请靠近麦克风大声朗读重试，或切换静音自测！' : '请大声录音朗读，系统将根据实际发音真实打分！'}</span>
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
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span>已理解生活应用，完成静音打卡 (领 +2 ❇️)</span>
                </button>
              ) : (
                <div className="text-[11px] font-mono text-slate-400 text-center">
                  完成上方两步验证后，即可激活静音打卡按钮！
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
