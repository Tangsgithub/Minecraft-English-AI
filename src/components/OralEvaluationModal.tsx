import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, Star, Sparkles, CheckCircle2, RotateCcw, Award, Play, AlertCircle, HelpCircle, ShieldCheck, Zap } from 'lucide-react';
import { speakText, stopSpeech, playClickSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';
import { unlockMobileAudio } from '../services/edgeTtsService';
import { evaluateSpeech, SpeechAssessmentResult, WordAssessment } from '../services/speechAssessmentService';
import confetti from 'canvas-confetti';

interface OralEvaluationModalProps {
  targetText: string;
  translation?: string;
  phonetic?: string;
  mcItemIcon?: string;
  onClose: () => void;
  onAwardEmeralds?: (emeralds: number, xp: number, reason?: string) => void;
  onMasterWord?: (word: string) => void;
}

export const OralEvaluationModal: React.FC<OralEvaluationModalProps> = ({
  targetText,
  translation,
  phonetic,
  mcItemIcon,
  onClose,
  onAwardEmeralds,
  onMasterWord
}) => {
  const [isPlayingStandard, setIsPlayingStandard] = useState(false);
  const [isPlayingMyRecording, setIsPlayingMyRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [hasRealRecording, setHasRealRecording] = useState(false);
  const [micAudioLevel, setMicAudioLevel] = useState<number>(0);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<SpeechAssessmentResult | null>(null);
  const [selectedWordTip, setSelectedWordTip] = useState<{ word: string; tip?: string; score: number } | null>(null);
  const [showMicPermissionGuide, setShowMicPermissionGuide] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Auto play standard sound on modal open
  useEffect(() => {
    handlePlayStandard();
    return () => {
      stopSpeech();
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      cleanupAudioStream();
    };
  }, []);

  const cleanupAudioStream = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  // Timer for recording duration
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handlePlayStandard = (rate: number = 1.0) => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
      setIsPlayingMyRecording(false);
    }
    unlockMobileAudio();
    setIsPlayingStandard(true);
    speakText(targetText, () => {
      setIsPlayingStandard(false);
    }, { rate });
  };

  const startRecording = async () => {
    unlockMobileAudio();
    playClickSound();
    stopSpeech();

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }

    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
    }

    setEvaluationResult(null);
    setRecordedAudioUrl(null);
    setHasRealRecording(false);
    setIsPlayingMyRecording(false);
    setLiveTranscript('');
    setSelectedWordTip(null);
    chunksRef.current = [];

    // 1. Initialize Web Speech API for real-time speech-to-text recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recognitionInstance: any = null;
    let spokenAcc = '';

    if (SpeechRecognition) {
      try {
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = 'en-US';
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;

        recognitionInstance.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          spokenAcc = currentTranscript;
          setLiveTranscript(currentTranscript);
        };

        recognitionInstance.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event?.error);
        };

        recognitionInstance.start();
        recognitionRef.current = recognitionInstance;
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }

    // 2. Initialize MediaRecorder & Web Audio Analyser for Audio Level Meter
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        // Setup Analyser
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            audioContextRef.current = audioCtx;
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const updateLevel = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setMicAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
              animFrameRef.current = requestAnimationFrame(updateLevel);
            };
            updateLevel();
          }
        } catch (e) {
          console.warn('AudioContext setup error:', e);
        }

        let mimeType = '';
        if (typeof MediaRecorder !== 'undefined') {
          if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mimeType = 'audio/webm;codecs=opus';
          else if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
          else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
          else if (MediaRecorder.isTypeSupported('audio/aac')) mimeType = 'audio/aac';
          else if (MediaRecorder.isTypeSupported('audio/ogg')) mimeType = 'audio/ogg';
        }

        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          if (chunksRef.current.length > 0) {
            const blob = new Blob(chunksRef.current, { type: mimeType || recorder.mimeType || 'audio/webm' });
            if (blob.size > 0) {
              const url = URL.createObjectURL(blob);
              setRecordedAudioUrl(url);
              setHasRealRecording(true);
            }
          }
          cleanupAudioStream();
          finishAssessment(spokenAcc || liveTranscript);
        };

        recorder.start(100);
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } else {
        // Microphone API not available in this environment
        setIsRecording(true);
        setHasRealRecording(false);
      }
    } catch (err: any) {
      console.warn("Microphone access permission or device missing:", err);
      setShowMicPermissionGuide(true);
      setIsRecording(false);
      finishAssessment('');
    }
  };

  const stopRecording = () => {
    playClickSound();
    setIsRecording(false);
    setMicAudioLevel(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        finishAssessment(liveTranscript);
      }
    } else {
      finishAssessment(liveTranscript);
    }
  };

  const finishAssessment = (spoken: string) => {
    const duration = Math.max(1.0, recordingSeconds);
    const result = evaluateSpeech(targetText, spoken, duration);
    setEvaluationResult(result);

    // Audio & Confetti Feedback (Only for genuine 4+ stars)
    if (result.stars >= 4) {
      playLevelUpSound();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    } else if (result.stars >= 3) {
      playEmeraldSound();
    }

    // Award rewards only if valid speech score >= 40
    if (onAwardEmeralds && result.overallScore >= 40 && (result.emeraldReward > 0 || result.xpReward > 0)) {
      onAwardEmeralds(result.emeraldReward, result.xpReward, '口语跟读打分');
    }

    // Auto master word only if genuinely 4+ stars
    if (result.stars >= 4 && onMasterWord && targetText.split(' ').length <= 2) {
      onMasterWord(targetText);
    }
  };

  const handlePlayMyRecording = () => {
    playClickSound();

    if (isPlayingMyRecording) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      setIsPlayingMyRecording(false);
      return;
    }

    if (hasRealRecording && recordedAudioUrl) {
      unlockMobileAudio();
      setIsPlayingMyRecording(true);

      const audio = new Audio(recordedAudioUrl);
      activeAudioRef.current = audio;

      audio.onended = () => {
        setIsPlayingMyRecording(false);
        activeAudioRef.current = null;
      };

      audio.onerror = () => {
        setIsPlayingMyRecording(false);
        activeAudioRef.current = null;
        alert("原声录音播放失败，请确保开启麦克风权限后点击【重新跟读】！");
      };

      audio.play().catch((err) => {
        console.warn("Failed to play user recording:", err);
        setIsPlayingMyRecording(false);
        activeAudioRef.current = null;
      });
    } else {
      setIsPlayingMyRecording(false);
      setShowMicPermissionGuide(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-[#18181b] border-2 sm:border-4 border-[#3b82f6] rounded-2xl sm:rounded-3xl w-full max-w-xl text-slate-100 shadow-[0_0_30px_rgba(59,130,246,0.3)] overflow-hidden my-auto max-h-[94dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-4 sm:p-5 border-b-2 border-blue-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-400 border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow-md text-black">
              🎙️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-mono text-white flex items-center space-x-2">
                <span>AI 智能语音发音评测与音素纠音</span>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/40">Phonics AI</span>
              </h2>
              <p className="text-xs text-blue-200/90 font-mono">
                跟随 Alex 老师标准发音 • 智能音素对齐与星级打分 💎
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white text-xs font-mono font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/20 transition-colors"
          >
            ✕ 关闭
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Target Word / Sentence Card */}
          <div className="bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl p-4 sm:p-5 text-center space-y-3 relative shadow-inner">
            {mcItemIcon && (
              <div className="w-12 h-12 bg-slate-800 border border-slate-600 rounded-xl mx-auto flex items-center justify-center text-2xl shadow-sm">
                {mcItemIcon}
              </div>
            )}

            <div>
              <h3 className="text-xl sm:text-2xl font-black font-mono text-white tracking-wide">
                "{targetText}"
              </h3>
              {phonetic && (
                <p className="text-xs font-mono text-emerald-400 font-bold mt-1">
                  [{phonetic}]
                </p>
              )}
              {translation && (
                <p className="text-xs text-slate-300 font-medium mt-1">
                  {translation}
                </p>
              )}
            </div>

            {/* Standard Audio Controls (Normal & Slow) */}
            <div className="flex items-center justify-center space-x-2 pt-1">
              <button
                onClick={() => handlePlayStandard(1.0)}
                className={`px-3.5 py-1.5 rounded-xl border font-mono font-bold text-xs inline-flex items-center space-x-1.5 transition-all ${
                  isPlayingStandard
                    ? 'bg-blue-600 text-white border-blue-400 animate-pulse shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-blue-500/50 shadow-sm'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{isPlayingStandard ? '标准示范播放中...' : '标准原声 (1.0x)'}</span>
              </button>

              <button
                onClick={() => handlePlayStandard(0.7)}
                className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-xs inline-flex items-center space-x-1 transition-all"
              >
                <span>🐢 慢速听 (0.7x)</span>
              </button>
            </div>
          </div>

          {/* Recording & Oral Practice Section */}
          <div className="text-center space-y-4">
            
            {!evaluationResult ? (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-mono font-bold text-slate-300">
                  {isRecording ? '正在收音，请清晰大声念出上面的英文：' : '点击下方大麦克风，大声跟读上方英文句子：'}
                </p>

                {/* Big Mic Button with Pulsing Wave */}
                <div className="relative inline-flex items-center justify-center">
                  {isRecording && (
                    <div 
                      className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping"
                      style={{ transform: `scale(${1 + micAudioLevel / 100})` }}
                    />
                  )}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center shadow-xl transition-all transform hover:scale-105 active:scale-95 z-10 ${
                      isRecording
                        ? 'bg-gradient-to-br from-rose-600 to-red-700 border-rose-400 text-white animate-pulse shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                        : 'bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-8 h-8 mb-0.5 text-white" />
                        <span className="text-[10px] font-mono font-black uppercase">点击完成</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-8 h-8 mb-0.5 text-amber-300" />
                        <span className="text-[10px] font-mono font-black uppercase">开始录音</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Real-time Audio Wave Visualizer Meter */}
                {isRecording && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-1.5 h-6">
                      {[40, 70, 90, 60, 100, 75, 45, 80, 60, 85].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-emerald-500 to-rose-400 rounded-full transition-all duration-75"
                          style={{
                            height: `${Math.max(4, (micAudioLevel / 100) * h)}px`,
                            opacity: micAudioLevel > 10 ? 1 : 0.4
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-rose-400 font-mono font-bold text-xs">
                      <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                      <span>正在录制 ({recordingSeconds}s)... 音量: {micAudioLevel}%</span>
                    </div>

                    {liveTranscript && (
                      <div className="text-xs font-mono text-emerald-300 bg-emerald-950/50 p-2 rounded-lg border border-emerald-500/30 animate-in fade-in">
                        识别中: "{liveTranscript}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Evaluation Result Score Card */
              <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 space-y-4 animate-in zoom-in-95 text-left shadow-lg">
                
                {/* Score Header */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-black rounded-2xl flex flex-col items-center justify-center shadow-md text-slate-950 font-black">
                      <span className="text-xl leading-none">{evaluationResult.overallScore}</span>
                      <span className="text-[9px] font-mono uppercase tracking-tighter">分</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-black text-sm sm:text-base text-white font-mono">
                          {evaluationResult.gradeZh}
                        </h4>
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono border border-amber-400/40">
                          {evaluationResult.overallScore >= 90 ? '🌟 优秀' : '👍 达标'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < evaluationResult.stars 
                                ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]' 
                                : 'text-slate-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 px-3 py-1.5 rounded-xl text-xs font-mono font-black flex items-center space-x-1.5 shadow-sm">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>+{evaluationResult.emeraldReward} 💎 +{evaluationResult.xpReward} XP</span>
                  </div>
                </div>

                {/* 3-Dimensional Assessment Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">🎯 准确度 (Accuracy)</span>
                    <span className="font-black text-emerald-400 text-sm">{evaluationResult.accuracy}%</span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">🌊 流利度 (Fluency)</span>
                    <span className="font-black text-blue-400 text-sm">{evaluationResult.fluency}%</span>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 font-bold block">📈 完整度 (Completeness)</span>
                    <span className="font-black text-amber-400 text-sm">{evaluationResult.completeness}%</span>
                  </div>
                </div>

                {/* Word-by-Word Alignment & Phonics Diagnostics */}
                <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-200 flex-wrap gap-1">
                    <span>🔤 逐词音素发音对齐（点击单词单独听音）：</span>
                    <div className="flex items-center space-x-2 text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/>完美</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>良好</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block"/>待强化</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.wordAssessments.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playClickSound();
                          speakText(item.word);
                          setSelectedWordTip({
                            word: item.word,
                            tip: item.phoneticTip,
                            score: item.score
                          });
                        }}
                        title={`点击试听 "${item.word}" • 匹配得分: ${item.score}`}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border transition-transform active:scale-95 flex items-center space-x-1 ${
                          item.status === 'perfect'
                            ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/60 hover:bg-emerald-900/60'
                            : item.status === 'good'
                            ? 'bg-amber-950/70 text-amber-300 border-amber-500/60 hover:bg-amber-900/60'
                            : 'bg-rose-950/70 text-rose-300 border-rose-500/60 hover:bg-rose-900/60'
                        }`}
                      >
                        <span>{item.word}</span>
                        <span className="text-[9px] opacity-70">({item.score})</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Word Phonics Tip */}
                  {selectedWordTip && (
                    <div className="bg-blue-950/60 border border-blue-500/40 p-2.5 rounded-lg text-xs font-mono text-blue-200 flex items-start space-x-2 animate-in fade-in">
                      <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-black text-white">【{selectedWordTip.word}】</span>
                        <span>{selectedWordTip.tip || `得分 ${selectedWordTip.score} 分。发音时注意重音位置，舌位到位。`}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Phonics & Pedagogical Feedback */}
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 space-y-1.5 text-xs font-mono">
                  <div className="flex items-start space-x-1.5 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Alex 老师点评：{evaluationResult.encouragement}</span>
                  </div>
                  {evaluationResult.phonicsTips.map((tip, idx) => (
                    <div key={idx} className="text-slate-300 text-[11px] pl-5">
                      💡 {tip}
                    </div>
                  ))}
                </div>

                {/* Spoken Transcript Comparison */}
                <div className="text-[11px] font-mono text-slate-400 bg-slate-950/50 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>识别结果: <span className="text-slate-200">"{evaluationResult.spokenTranscript}"</span></span>
                  <span className="text-slate-500">时长: {recordingSeconds}s</span>
                </div>

                {/* Dual Audio Comparison Buttons */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={handlePlayMyRecording}
                    className={`flex-1 py-2.5 border rounded-xl font-mono font-black text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                      isPlayingMyRecording
                        ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-blue-300'
                    }`}
                  >
                    {isPlayingMyRecording ? (
                      <>
                        <div className="flex items-end space-x-0.5 h-3">
                          <span className="w-1 bg-white animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 bg-white animate-bounce h-3" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 bg-white animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span>播放录音中...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-blue-400" />
                        <span>🎧 听听我的录音原声</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={startRecording}
                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-xl font-mono font-black text-xs flex items-center justify-center space-x-1 shadow-md"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>🔄 重新跟读冲刺 5 星</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Mic Permission Guide Modal / Banner */}
          {showMicPermissionGuide && (
            <div className="bg-amber-950/80 border-2 border-amber-500/60 rounded-xl p-3.5 text-xs font-mono text-amber-200 space-y-2">
              <div className="flex items-center justify-between font-black text-white">
                <span className="flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>如何开启麦克风权限？</span>
                </span>
                <button 
                  onClick={() => setShowMicPermissionGuide(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-amber-300">
                1. 点击浏览器地址栏左侧的 <strong>【🔒 网站设置 / 权限】</strong> 图标。<br/>
                2. 将 <strong>【麦克风 (Microphone)】</strong> 设置为 <strong>【允许】</strong>。<br/>
                3. 刷新页面即可开启真实原声录音！
              </p>
            </div>
          )}

          {/* Done / Collect Rewards Button */}
          {evaluationResult && (
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-3 rounded-xl font-mono font-black text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center space-x-2 transition-transform active:scale-98"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>完成评测，收入词汇与绿宝石！</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
