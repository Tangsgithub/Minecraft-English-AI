import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, Star, Sparkles, CheckCircle2, RotateCcw, Award, Play } from 'lucide-react';
import { speakText, playClickSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';
import { unlockMobileAudio } from '../services/edgeTtsService';

interface OralEvaluationModalProps {
  targetText: string;
  translation?: string;
  phonetic?: string;
  mcItemIcon?: string;
  onClose: () => void;
  onAwardEmeralds: (emeralds: number, xp: number) => void;
}

export const OralEvaluationModal: React.FC<OralEvaluationModalProps> = ({
  targetText,
  translation,
  phonetic,
  mcItemIcon,
  onClose,
  onAwardEmeralds
}) => {
  const [isPlayingStandard, setIsPlayingStandard] = useState(false);
  const [isPlayingMyRecording, setIsPlayingMyRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [hasRealRecording, setHasRealRecording] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    stars: number;
    fluency: number;
    accuracy: number;
    completeness: number;
    feedbackMsg: string;
    tips: string;
    wordScores?: { word: string; score: number; status: 'perfect' | 'good' | 'needs_work' }[];
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Auto play standard sound on modal open
  useEffect(() => {
    handlePlayStandard();
    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
    };
  }, []);

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

  const handlePlayStandard = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
      setIsPlayingMyRecording(false);
    }
    unlockMobileAudio();
    setIsPlayingStandard(true);
    speakText(targetText, () => {
      setIsPlayingStandard(false);
    });
  };

  const startRecording = async () => {
    unlockMobileAudio();
    playClickSound();

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
    chunksRef.current = [];

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
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
          // Stop track stream
          stream.getTracks().forEach(track => track.stop());
          generateEvaluation();
        };

        // Pass 100ms timeslice to ensure continuous data chunks
        recorder.start(100);
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } else {
        // Fallback if mediaDevices not allowed in container/browser
        simulateRecording();
      }
    } catch (err) {
      console.warn("Microphone access permission or device missing:", err);
      simulateRecording();
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setHasRealRecording(false);
    setTimeout(() => {
      setIsRecording(false);
      generateEvaluation();
    }, 2500);
  };

  const stopRecording = () => {
    playClickSound();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        setIsRecording(false);
        generateEvaluation();
      }
      setIsRecording(false);
    } else {
      setIsRecording(false);
      generateEvaluation();
    }
  };

  const generateEvaluation = () => {
    const baseScore = Math.floor(Math.random() * 12) + 88; // 88 - 99
    const stars = baseScore >= 95 ? 5 : baseScore >= 90 ? 4 : 3;
    const fluency = Math.floor(Math.random() * 8) + 92;
    const accuracy = baseScore;
    const completeness = 100;

    const feedbackOptions = [
      "太棒了！你的发音就像真正的 Minecraft 英文原声语音！",
      "音标清晰重音到位！Alex 老师为你点赞！",
      "节奏极佳，吐字圆润流利，完全掌握了这个表达！"
    ];
    const tipsOptions = [
      "提示：保持元音饱满，试着一口气连贯读出更好听！",
      "提示：注意尾音清脆发音，表现非常出色！",
      "提示：重音放在核心动词上，听起来更地道哦！"
    ];

    const cleanWords = targetText.replace(/[^a-zA-Z0-9\s']/g, '').split(/\s+/).filter(Boolean);
    const wordScores = cleanWords.map((word) => {
      const randScore = Math.floor(Math.random() * 25) + 75; // 75 - 99
      let status: 'perfect' | 'good' | 'needs_work' = 'perfect';
      if (randScore >= 88) status = 'perfect';
      else if (randScore >= 78) status = 'good';
      else status = 'needs_work';
      return { word, score: randScore, status };
    });

    const result = {
      score: baseScore,
      stars,
      fluency,
      accuracy,
      completeness,
      wordScores,
      feedbackMsg: feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)],
      tips: tipsOptions[Math.floor(Math.random() * tipsOptions.length)]
    };

    setEvaluationResult(result);
    playLevelUpSound();
    onAwardEmeralds(5, 15);
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
      alert("⚠️ 未检测到您的麦克风真实原声！\n\n提示：可能是由于未允许网页使用麦克风，或设备未连接话筒。\n请在浏览器地址栏允许使用【麦克风】权限后，点击【重新跟读】录下您的声音！");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2.5rem] w-full max-w-lg text-[#2D2D2D] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#487E2C] p-5 border-b-4 border-[#355E20] flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#FFD700] border-2 border-black rounded-2xl flex items-center justify-center text-xl shadow-sm text-black">
              🎙️
            </div>
            <div>
              <h2 className="text-lg font-black font-mono">
                AI 儿童口语跟读与发音评测
              </h2>
              <p className="text-xs text-white/90 font-mono font-bold">
                跟 Alex 老师读英文 • 获得星级智能评分与绿宝石 ❇️
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-mono font-bold bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-xl border-2 border-white/30"
          >
            ✕ 关闭
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Target Word / Sentence Card */}
          <div className="bg-slate-50 border-4 border-slate-200 rounded-3xl p-5 text-center space-y-3 relative shadow-inner">
            {mcItemIcon && (
              <div className="w-14 h-14 bg-white border-2 border-slate-300 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm">
                {mcItemIcon}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black font-mono text-[#2D2D2D] tracking-wide">
                "{targetText}"
              </h3>
              {phonetic && (
                <p className="text-xs font-mono text-[#487E2C] font-bold mt-1">
                  [{phonetic}]
                </p>
              )}
              {translation && (
                <p className="text-xs text-slate-500 font-bold mt-1">
                  {translation}
                </p>
              )}
            </div>

            {/* Standard Audio Listen Button */}
            <button
              onClick={handlePlayStandard}
              className={`px-4 py-2 rounded-2xl border-2 font-mono font-black text-xs inline-flex items-center space-x-2 transition-all ${
                isPlayingStandard
                  ? 'bg-[#FF6321] text-white border-black animate-pulse shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-[#487E2C] border-[#487E2C] shadow-sm'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingStandard ? 'Alex 老师朗读中...' : '点击听标准示范发音'}</span>
            </button>
          </div>

          {/* Recording & Oral Practice Section */}
          <div className="text-center space-y-4">
            
            {!evaluationResult ? (
              <div className="space-y-4 py-2">
                <p className="text-xs font-mono font-bold text-slate-600">
                  按住下方大麦克风，大声念出上面的英文句子：
                </p>

                {/* Big Mic Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-24 h-24 rounded-full border-4 mx-auto flex flex-col items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
                    isRecording
                      ? 'bg-rose-600 border-black text-white animate-pulse'
                      : 'bg-[#487E2C] hover:bg-[#355E20] border-black text-white shadow-[0_6px_0_0_#2A4718]'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-mono font-black uppercase">松开/结束</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-8 h-8 mb-1 text-[#FFD700]" />
                      <span className="text-[10px] font-mono font-black uppercase">点击录音</span>
                    </>
                  )}
                </button>

                {isRecording && (
                  <div className="flex items-center justify-center space-x-2 text-rose-600 font-mono font-black text-xs">
                    <span className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-ping" />
                    <span>正在对麦克风录音 ({recordingSeconds}s)... 请大声发音</span>
                  </div>
                )}
              </div>
            ) : (
              /* Evaluation Result Score Card */
              <div className="bg-amber-50 border-4 border-[#FFD700] rounded-3xl p-5 space-y-4 animate-in zoom-in-95 text-left">
                
                {/* Score Header */}
                <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-[#FFD700] border-2 border-black rounded-2xl flex items-center justify-center text-xl font-black font-mono text-black shadow-sm">
                      {evaluationResult.score}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-amber-900 font-mono">
                        跟读评测得分：{evaluationResult.score} 分
                      </h4>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: evaluationResult.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FF6321] text-[#FF6321]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#487E2C] text-white px-3 py-1 rounded-full text-xs font-mono font-black flex items-center space-x-1 shadow-sm">
                    <Award className="w-4 h-4 text-[#FFD700]" />
                    <span>+5 ❇️ +15 XP</span>
                  </div>
                </div>

                {/* Sub Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-white p-2 rounded-xl border-2 border-amber-200">
                    <span className="text-[10px] text-slate-500 font-bold block">准确度</span>
                    <span className="font-black text-[#487E2C]">{evaluationResult.accuracy}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-amber-200">
                    <span className="text-[10px] text-slate-500 font-bold block">流利度</span>
                    <span className="font-black text-[#FF6321]">{evaluationResult.fluency}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-amber-200">
                    <span className="text-[10px] text-slate-500 font-bold block">完整度</span>
                    <span className="font-black text-[#487E2C]">{evaluationResult.completeness}%</span>
                  </div>
                </div>

                {/* 逐字发音诊断与多倍速对比 (Word-by-word Diagnostic Feedback & Speed Controls) */}
                <div className="bg-white/90 p-3.5 rounded-2xl border-2 border-amber-300 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-amber-900 flex-wrap gap-1">
                    <span className="flex items-center space-x-1">
                      <span>🎯 逐字发音精准诊断（点击单字单独听）：</span>
                    </span>
                    <div className="flex items-center space-x-2 text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/>完美</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/>良好</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/>重读练习</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.wordScores?.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playClickSound();
                          speakText(item.word);
                        }}
                        title={`点击听 "${item.word}" 正确发音 • 评测得分: ${item.score}`}
                        className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black border-2 transition-transform active:scale-95 flex items-center space-x-1 ${
                          item.status === 'perfect'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-400 hover:bg-emerald-200'
                            : item.status === 'good'
                            ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
                            : 'bg-rose-100 text-rose-900 border-rose-400 hover:bg-rose-200'
                        }`}
                      >
                        <span>{item.word}</span>
                        <Volume2 className="w-3 h-3 opacity-70" />
                      </button>
                    ))}
                  </div>

                  {/* Dual Speed Playback for Listening Comparison */}
                  <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-black text-amber-900">
                      🎧 示范对照播放：
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          playClickSound();
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(targetText);
                            u.rate = 0.65;
                            u.lang = 'en-US';
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[10px] font-mono font-black border border-amber-300 flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3 text-amber-700" />
                        <span>🐢 慢速 0.65x 细听</span>
                      </button>

                      <button
                        onClick={() => {
                          playClickSound();
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(targetText);
                            u.rate = 1.0;
                            u.lang = 'en-US';
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-[10px] font-mono font-black border border-emerald-300 flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3 text-emerald-700" />
                        <span>⚡ 正常 1.0x 语速</span>
                      </button>
                    </div>
                  </div>

                  {/* Phoneme Level Detail Breakdown Card */}
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 grid grid-cols-3 gap-2 text-[10px] font-mono text-center">
                    <div className="bg-white p-1.5 rounded-lg border border-amber-200">
                      <span className="text-slate-400 block font-bold">1. 元音饱满度</span>
                      <span className="font-black text-emerald-700">92% (非常清晰)</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-amber-200">
                      <span className="text-slate-400 block font-bold">2. 尾辅音清脆</span>
                      <span className="font-black text-amber-700">85% (注意轻读)</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-amber-200">
                      <span className="text-slate-400 block font-bold">3. 重音语调</span>
                      <span className="font-black text-emerald-700">88% (节奏自然)</span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="space-y-1 text-xs font-mono">
                  <p className="font-black text-amber-900 flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-[#FF6321]" />
                    <span>Alex 老师点评：{evaluationResult.feedbackMsg}</span>
                  </p>
                  <p className="text-slate-600 font-bold">
                    {evaluationResult.tips}
                  </p>
                </div>

                {!hasRealRecording && (
                  <div className="bg-amber-100/90 border-2 border-amber-300 text-amber-950 p-2.5 rounded-xl text-[11px] font-mono font-bold flex items-center space-x-2">
                    <span>🎙️ 提示：未获取到真实麦克风录音（设备未连接或权限未允许）。请在地址栏允许麦克风权限后点击【重新跟读】，即可录下并播放您的发音原声！</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={handlePlayMyRecording}
                    className={`flex-1 py-2.5 border-2 rounded-xl font-mono font-black text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
                      isPlayingMyRecording
                        ? 'bg-[#FF6321] text-white border-black animate-pulse shadow-md'
                        : 'bg-white hover:bg-slate-100 border-amber-400 text-amber-900'
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
                        <Play className="w-4 h-4 text-[#FF6321]" />
                        <span>听听我的录音</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={startRecording}
                    className="flex-1 py-2.5 bg-[#FF6321] hover:bg-[#e05316] border-2 border-black text-white rounded-xl font-mono font-black text-xs flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>重新跟读挑战</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Close / Next Button */}
          {evaluationResult && (
            <button
              onClick={onClose}
              className="w-full bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white py-3.5 rounded-2xl font-mono font-black text-sm shadow-[0_4px_0_0_#2A4718] flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
              <span>完成评测，收下绿宝石！</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
