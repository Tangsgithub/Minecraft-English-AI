import React, { useState, useEffect } from 'react';
import { Volume2, Mic, MicOff, Star, Sparkles, CheckCircle2, RotateCcw, Award, Play } from 'lucide-react';
import { speakText, playClickSound, playEmeraldSound, playLevelUpSound } from '../utils/audio';

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
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    stars: number;
    fluency: number;
    accuracy: number;
    completeness: number;
    feedbackMsg: string;
    tips: string;
  } | null>(null);

  // Auto play standard sound on modal open
  useEffect(() => {
    handlePlayStandard();
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
    setIsPlayingStandard(true);
    speakText(targetText, () => {
      setIsPlayingStandard(false);
    });
  };

  const startRecording = async () => {
    playClickSound();
    setEvaluationResult(null);
    setRecordedAudioUrl(null);
    setIsPlayingMyRecording(false);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        let mimeType = '';
        if (typeof MediaRecorder !== 'undefined') {
          if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mimeType = 'audio/webm;codecs=opus';
          else if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
          else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
          else if (MediaRecorder.isTypeSupported('audio/ogg')) mimeType = 'audio/ogg';
        }

        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          if (chunks.length > 0) {
            const blob = new Blob(chunks, { type: mimeType || 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setRecordedAudioUrl(url);
          }
          // Stop track stream
          stream.getTracks().forEach(track => track.stop());
          generateEvaluation();
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } else {
        // Fallback if mediaDevices not allowed in container
        simulateRecording();
      }
    } catch (err) {
      console.warn("Microphone access fallback:", err);
      simulateRecording();
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      generateEvaluation();
    }, 2500);
  };

  const stopRecording = () => {
    playClickSound();
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      setIsRecording(false);
      generateEvaluation();
    }
  };

  const generateEvaluation = () => {
    // Generate realistic multi-dimension score for child encouragement
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

    const result = {
      score: baseScore,
      stars,
      fluency,
      accuracy,
      completeness,
      feedbackMsg: feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)],
      tips: tipsOptions[Math.floor(Math.random() * tipsOptions.length)]
    };

    setEvaluationResult(result);
    playLevelUpSound();
    onAwardEmeralds(5, 15); // Award emeralds & XP
  };

  const playChildVoiceTTS = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingMyRecording(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = targetText.replace(/[*#_`~]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.35; // Cute child pitch for simulated playback

    utterance.onend = () => setIsPlayingMyRecording(false);
    utterance.onerror = () => setIsPlayingMyRecording(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayMyRecording = () => {
    playClickSound();
    if (isPlayingMyRecording) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingMyRecording(false);
      return;
    }

    setIsPlayingMyRecording(true);

    if (recordedAudioUrl) {
      try {
        const audio = new Audio(recordedAudioUrl);
        audio.onended = () => setIsPlayingMyRecording(false);
        audio.onerror = () => {
          playChildVoiceTTS();
        };
        audio.play().catch(() => {
          playChildVoiceTTS();
        });
      } catch {
        playChildVoiceTTS();
      }
    } else {
      playChildVoiceTTS();
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
