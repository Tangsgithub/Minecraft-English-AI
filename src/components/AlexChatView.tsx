import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Lesson, UserProfile } from '../types';
import { sendChatMessageToAlex } from '../services/aiService';
import { buildAlexSystemPrompt } from '../utils/aiTeacherPrompt';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { unlockMobileAudio } from '../services/edgeTtsService';
import { transcribeAudioBlob } from '../services/speechAssessmentService';
import { hasLessonAccess } from '../utils/volumeProgress';
import { Send, Volume2, Sparkles, Mic, MicOff, RefreshCw, MessageSquare, Lightbulb, CheckCircle2, Award, Phone, PhoneOff, PhoneCall, Lock, HelpCircle, ExternalLink, AlertTriangle, Check, ShieldAlert } from 'lucide-react';
import { MinecraftAvatar } from './MinecraftAvatar';

interface AlexChatViewProps {
  profile: UserProfile;
  activeLesson: Lesson | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardEmeralds: (amount: number, xpAmount: number) => void;
  onCompleteLesson: (lessonId: number) => void;
  onCheckMission?: (userText: string) => void;
  onBackToMap: () => void;
  onOpenSettings: () => void;
}

// Helper function to split dialogue into English and Chinese parts cleanly
interface DialogueParts {
  english: string;
  chinese?: string;
}

function splitDialogueParts(text: string): DialogueParts {
  if (!text) return { english: '' };
  let en = text.trim();
  let zh = '';

  const bracketMatch = en.match(/\[([^\]]+)\]/);
  if (bracketMatch) {
    zh = bracketMatch[1].trim();
    en = en.replace(/\[[^\]]+\]/g, '').trim();
  } else {
    const parenMatch = en.match(/([（(][^）)]*[\u4e00-\u9fa5]+[^）)]*[）)])/);
    if (parenMatch) {
      zh = parenMatch[1].replace(/^[（(]|[）)]$/g, '').trim();
      en = en.replace(/([（(][^）)]*[\u4e00-\u9fa5]+[^）)]*[）)])/g, '').trim();
    }
  }

  return { english: en || text, chinese: zh || undefined };
}

// Helper function to format Alex dialogue with clear linebreaks for kids and translation toggle
function formatAlexDialogue(text: string, showTranslation: boolean = true): string {
  if (!text) return '';
  const parts = splitDialogueParts(text);
  if (!showTranslation || !parts.chinese) {
    return parts.english;
  }
  return `${parts.english}\n\n[${parts.chinese}]`;
}

export const AlexChatView: React.FC<AlexChatViewProps> = ({
  profile,
  activeLesson,
  messages,
  setMessages,
  onAwardEmeralds,
  onOpenSettings,
  onCompleteLesson,
  onCheckMission,
  onBackToMap
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(0.85); // 0.7x slow or 1.0x normal for kids
  const [isLargeFont, setIsLargeFont] = useState<boolean>(true); // Default to larger fonts for kids
  const [alexMood, setAlexMood] = useState<'happy' | 'craft' | 'battle' | 'star'>('happy');
  const [recentGift, setRecentGift] = useState<string | null>(null);

  // Phone Call Mode state
  const [isPhoneCallActive, setIsPhoneCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connected');
  const [phoneSubtitle, setPhoneSubtitle] = useState<string>('Hello! Press mic to talk to Alex!');
  const [autoListenMode, setAutoListenMode] = useState<boolean>(false);
  const [callMicError, setCallMicError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isTranscribingVoice, setIsTranscribingVoice] = useState<boolean>(false);
  const liveTranscriptRef = useRef<string>('');

  // Mic Permission Guide Modal & Diagnostic State
  const [showMicHelpModal, setShowMicHelpModal] = useState<boolean>(false);
  const [micTestStatus, setMicTestStatus] = useState<'idle' | 'testing' | 'success' | 'denied' | 'error'>('idle');
  const [micTestMessage, setMicTestMessage] = useState<string>('');

  const isPhoneCallActiveRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const autoListenModeRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if current view is running inside an iframe
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    isPhoneCallActiveRef.current = isPhoneCallActive;
  }, [isPhoneCallActive]);

  useEffect(() => {
    autoListenModeRef.current = autoListenMode;
  }, [autoListenMode]);

  // Call timer interval
  useEffect(() => {
    let timer: any;
    if (isPhoneCallActive && callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isPhoneCallActive, callStatus]);

  // Clean up audio & recognition on unmount
  useEffect(() => {
    return () => {
      stopAllRecordingAndMeter();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleTestMicrophone = async () => {
    setMicTestStatus('testing');
    setMicTestMessage('正在申请麦克风硬件访问权限，请在浏览器弹窗中点击【允许】...');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicTestStatus('error');
        setMicTestMessage('您的浏览器环境不支持媒体录音 API，请使用 Chrome 或 Edge 浏览器。');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Successfully got permission!
      setMicTestStatus('success');
      setMicTestMessage('✅ 麦克风已成功授权并连通！您可以正常与 Alex 语音对练。');
      // Stop stream right away so it doesn't hold hardware
      stream.getTracks().forEach(t => t.stop());
    } catch (err: any) {
      console.warn('Microphone test error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicTestStatus('denied');
        setMicTestMessage('⚠️ 麦克风权限被拒绝。请按照下方指引点击浏览器地址栏 🔒 允许麦克风权限。');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setMicTestStatus('error');
        setMicTestMessage('⚠️ 未检测到可用的麦克风硬件设备，请检查您的耳机或麦克风连接。');
      } else {
        setMicTestStatus('error');
        setMicTestMessage(`⚠️ 麦克风检测失败 (${err.name || '未知原因'})，请在新标签页打开尝试。`);
      }
    }
  };

  const stopAllRecordingAndMeter = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      } catch {}
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  const handleStartPhoneCall = () => {
    setIsPhoneCallActive(true);
    isPhoneCallActiveRef.current = true;
    setCallStatus('connected');
    setCallMicError(null);
    playClickSound();
    unlockMobileAudio();

    const greeting = `Hello ${profile.nickname || 'there'}! I'm Alex! What are you building in Minecraft today? [你好呀！我是 Alex 老师！你今天在我的世界里造了什么呢？]`;
    setPhoneSubtitle(greeting);

    isSpeakingRef.current = true;
    speakText(greeting, () => {
      isSpeakingRef.current = false;
      if (isPhoneCallActiveRef.current && autoListenModeRef.current) {
        handleToggleVoiceInput();
      }
    }, { speaker: 'Alex', rate: speechRate });
  };

  const handleEndPhoneCall = () => {
    isPhoneCallActiveRef.current = false;
    isSpeakingRef.current = false;
    stopSpeech();
    setIsListening(false);
    setIsTranscribingVoice(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
    if (chatMediaRecorderRef.current && chatMediaRecorderRef.current.state !== 'inactive') {
      try { chatMediaRecorderRef.current.stop(); } catch {}
    }
    stopAllRecordingAndMeter();
    setCallStatus('ended');
    onAwardEmeralds(5, 10);
    playEmeraldSound();
    setTimeout(() => {
      setIsPhoneCallActive(false);
    }, 500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll to bottom when a new message is added, not continuously on loading
    scrollToBottom();
  }, [messages.length]);

  // Handle Alex speech with speed setting
  const playAlexVoice = (text: string) => {
    speakText(text, { speaker: 'Alex', rate: speechRate });
  };

  const chatMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chatAudioChunksRef = useRef<Blob[]>([]);

  // Unified Web Speech API + MediaRecorder Audio STT Engine
  const handleToggleVoiceInput = async () => {
    if (typeof window === 'undefined') return;

    playClickSound();
    unlockMobileAudio();

    // If Alex is currently speaking, interrupt playback so the user can speak immediately
    if (isSpeakingRef.current) {
      stopSpeech();
      isSpeakingRef.current = false;
    }

    // A) If already listening: User clicked to finish speaking & send
    if (isListening) {
      setIsListening(false);
      setIsTranscribingVoice(true);

      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }

      if (chatMediaRecorderRef.current && chatMediaRecorderRef.current.state !== 'inactive') {
        try {
          chatMediaRecorderRef.current.stop();
        } catch {
          finalizeVoiceInput();
        }
      } else {
        finalizeVoiceInput();
      }
      return;
    }

    // B) Not listening: User clicked to start talking
    setCallMicError(null);
    liveTranscriptRef.current = '';
    chatAudioChunksRef.current = [];

    // 1. Check browser mediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const errMsg = '当前浏览器环境不支持麦克风录音，请在 Chrome / Edge 中打开，或点击下方例句卡直接交流。';
      setCallMicError(errMsg);
      setShowMicHelpModal(true);
      return;
    }

    // 2. Request microphone stream
    let stream: MediaStream;
    try {
      stopAllRecordingAndMeter();
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
    } catch (err: any) {
      console.warn('Microphone permission / access error:', err);
      setIsListening(false);
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setCallMicError('麦克风权限被拒绝。请在浏览器地址栏点击 🔒 允许麦克风，或在新标签页打开。');
        setShowMicHelpModal(true);
      } else if (err?.name === 'NotFoundError' || err?.name === 'DevicesNotFoundError') {
        setCallMicError('未检测到可用的麦克风硬件设备，请检查耳机或麦克风连接。');
      } else {
        setCallMicError(`麦克风启动失败 (${err?.name || '未知原因'})，请重试或在新标签页打开。`);
      }
      return;
    }

    // 3. Set listening state
    setIsListening(true);

    // 4. Setup AudioContext Analyser for real-time audio volume visualizer
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkLevel = () => {
          if (!mediaStreamRef.current) return;
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
          animationFrameRef.current = requestAnimationFrame(checkLevel);
        };
        checkLevel();
      }
    } catch (e) {
      console.warn('AudioContext setup notice:', e);
    }

    // 5. Setup MediaRecorder
    let mimeType = '';
    if (typeof MediaRecorder !== 'undefined') {
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mimeType = 'audio/webm;codecs=opus';
      else if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
      else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
      else if (MediaRecorder.isTypeSupported('audio/aac')) mimeType = 'audio/aac';
    }

    try {
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chatMediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chatAudioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        finalizeVoiceInput(mimeType || recorder.mimeType);
      };

      recorder.start(100);
    } catch (recErr) {
      console.warn('MediaRecorder start notice:', recErr);
    }

    // 6. Concurrently start Web Speech Recognition for instant on-screen transcription
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.abort(); } catch {}
          recognitionRef.current = null;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let words = '';
          for (let i = 0; i < event.results.length; ++i) {
            words += event.results[i][0].transcript + ' ';
          }
          const clean = words.trim();
          if (clean) {
            liveTranscriptRef.current = clean;
            setInputText(clean);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Web Speech recognition notice:', event?.error);
        };

        recognition.start();
      } catch (err) {
        console.warn('SpeechRecognition start notice:', err);
      }
    }
  };

  const finalizeVoiceInput = async (mimeType?: string) => {
    stopAllRecordingAndMeter();

    const quickCaptured = liveTranscriptRef.current.trim() || inputText.trim();
    liveTranscriptRef.current = '';

    if (quickCaptured) {
      setIsTranscribingVoice(false);
      handleSendMessage(quickCaptured);
      return;
    }

    // Fallback to server-side AI transcription if Web Speech API didn't capture text
    if (chatAudioChunksRef.current.length > 0) {
      try {
        const blob = new Blob(chatAudioChunksRef.current, { type: mimeType || 'audio/webm' });
        if (blob.size > 200) {
          const transcribed = await transcribeAudioBlob(blob);
          setIsTranscribingVoice(false);
          if (transcribed && transcribed.trim()) {
            handleSendMessage(transcribed.trim());
            return;
          }
        }
      } catch (sttErr) {
        console.warn('Server transcribe error:', sttErr);
      }
    }

    setIsTranscribingVoice(false);
    setCallMicError('未能听清声音，请离麦克风近一点重试，或点击下方快捷卡交流~');
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;
    if (onCheckMission) onCheckMission(textToSend);

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }

    // Trigger mobile audio unlock directly within user gesture
    unlockMobileAudio();
    playClickSound();
    setInputText('');

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    const systemPrompt = buildAlexSystemPrompt(
      profile,
      activeLesson ? `Lesson ${activeLesson.id}: ${activeLesson.title}` : undefined,
      'Build a house & practice English',
      profile.selectedVolumeId || 'vol1'
    );

    const alexRes = await sendChatMessageToAlex(newHistory, systemPrompt, profile.apiKeyConfig);

    setIsLoading(false);

    const formattedAlexText = formatAlexDialogue(alexRes.text, true);

    const alexMsg: ChatMessage = {
      id: `alex_${Date.now()}`,
      sender: 'alex',
      text: formattedAlexText,
      grammarCorrection: alexRes.grammarCorrection,
      betterExpression: alexRes.betterExpression,
      encouragement: alexRes.encouragement,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, alexMsg]);
    setPhoneSubtitle(formattedAlexText);

    // Speak Alex's response automatically using chosen speech rate
    isSpeakingRef.current = true;
    speakText(formattedAlexText, () => {
      isSpeakingRef.current = false;
      if (isPhoneCallActiveRef.current && autoListenModeRef.current) {
        handleToggleVoiceInput();
      }
    }, { speaker: 'Alex', rate: speechRate });

    // Update Alex mood based on response content
    const lowerText = (textToSend + alexRes.text).toLowerCase();
    if (lowerText.includes('sword') || lowerText.includes('creeper') || lowerText.includes('zombie') || lowerText.includes('fight')) {
      setAlexMood('battle');
    } else if (lowerText.includes('craft') || lowerText.includes('build') || lowerText.includes('house') || lowerText.includes('block')) {
      setAlexMood('craft');
    } else if (alexRes.encouragement || alexRes.betterExpression) {
      setAlexMood('star');
    } else {
      setAlexMood('happy');
    }

    // Award small emeralds & XP for speaking English
    playEmeraldSound();
    onAwardEmeralds(5, 10);
  };

  // Gift Item Action
  const handleGiftAlex = (itemEmoji: string, itemName: string, englishText: string) => {
    setRecentGift(`${itemEmoji} ${itemName}`);
    handleSendMessage(englishText);
    setTimeout(() => setRecentGift(null), 4000);
  };

  // Structured Scenario Roleplay Chips for Children & Book 2 Redstone Engineers
  const isVol2 = profile.selectedVolumeId === 'vol2';

  const promptCategories = isVol2 ? [
    {
      categoryName: '⚡ 红石与叙事逻辑',
      icon: '🔴',
      prompts: [
        'I turned on the redstone lamp because it was getting dark. 💡',
        'Although the creeper exploded, our cobblestone wall stayed strong! 🧱',
        'When we arrived at the Nether fortress, the blazes were flying everywhere! 🔥',
        'By tomorrow morning, we will have gathered thirty diamonds! 💎'
      ]
    },
    {
      categoryName: '📚 第二册核心句',
      icon: '📖',
      prompts: [
        activeLesson
          ? `Lesson ${activeLesson.id}: ${activeLesson.targetSentences[0] || 'It was a very interesting story!'}`
          : 'Can you explain why the redstone circuit needs a repeater?',
        activeLesson && activeLesson.targetSentences[1]
          ? activeLesson.targetSentences[1]
          : 'What happened after Steve entered the ancient stronghold?'
      ]
    },
    {
      categoryName: '🏰 远古要塞与工业',
      icon: '🏛️',
      prompts: [
        'Let\'s build an automated sugarcane farm with redstone pistons! ⚙️',
        'We must be careful because the Warden is sleeping nearby! 🤫',
        'I upgraded my armor to netherite so that I can survive lava! 🛡️'
      ]
    }
  ] : [
    {
      categoryName: '📚 本课核心句',
      icon: '✨',
      prompts: [
        activeLesson
          ? `Lesson ${activeLesson.id}: ${activeLesson.targetSentences[0] || 'Is this your book?'}`
          : 'Hello Alex! Nice to meet you in Minecraft!',
        activeLesson && activeLesson.targetSentences[1]
          ? activeLesson.targetSentences[1]
          : 'What are you building today?'
      ]
    },
    {
      categoryName: '🛠️ 建造与合成',
      icon: '🧱',
      prompts: [
        'I want to craft a wooden pickaxe! 🪵',
        'Let\'s build a small house together! 🏠',
        'Do you have any iron blocks? 🪨'
      ]
    },
    {
      categoryName: '⚔️ 冒险与战斗',
      icon: '🧟',
      prompts: [
        'Watch out! A creeper is over there! 💥',
        'I have a diamond sword! Let\'s go! 🗡️',
        'Where is the nearest village? 🏰'
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100dvh-13rem)] min-h-[440px] max-h-[760px] bg-white border border-emerald-700/40 rounded-2xl overflow-hidden shadow-md text-[#2D2D2D]">
      
      {/* Top Banner: Alex NPC Status & Active Lesson */}
      <div className="bg-[#487E2C] px-3 py-2 sm:px-4 sm:py-2.5 border-b border-[#355E20] text-white flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5 min-w-0">
          {/* Animated Alex Character Frame with Moods */}
          <div className="relative shrink-0">
            <MinecraftAvatar speaker="Alex" size={36} />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#7CFC00] border-2 border-[#355E20] rounded-full animate-pulse" title="Alex 在线伴学" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold font-mono text-white text-xs sm:text-sm truncate">
                Alex 老师
              </h3>
              <span className="text-[10px] bg-emerald-950/50 text-emerald-200 border border-emerald-400/30 font-medium px-1.5 py-0.5 rounded shrink-0">
                {profile.apiKeyConfig.provider === 'deepseek' ? 'DeepSeek' : 'Gemini AI'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/90 font-normal truncate">
              {activeLesson ? `Lesson ${activeLesson.id} · ${activeLesson.title}` : 'Minecraft 自由口语角'}
            </p>
          </div>
        </div>

        {/* Translation Toggle, Speech Speed, Font Size, Phone Call & Key Config */}
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-1.5">
          {/* Phone Call Button */}
          <button
            onClick={handleStartPhoneCall}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#7CFC00] hover:bg-[#6edb00] text-emerald-950 rounded-lg border border-emerald-900/30 text-xs font-bold shadow-2xs flex items-center gap-1 shrink-0 transition-transform active:translate-y-0.5 cursor-pointer"
            title="与 Alex 老师打实时语音电话"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-950" />
            <span className="hidden xs:inline">语音通话</span>
          </button>

          {/* Bilingual Toggle */}
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
              showTranslations
                ? 'bg-white text-emerald-900 border-white shadow-2xs'
                : 'bg-black/20 text-white/90 border-white/20 hover:bg-black/30'
            }`}
            title="切换中文解释显示"
          >
            {showTranslations ? '双语' : '仅英'}
          </button>

          {/* Speech Rate Toggle */}
          <button
            onClick={() => setSpeechRate(prev => (prev === 0.85 ? 1.0 : 0.85))}
            className="px-2 py-1 rounded-md text-[11px] font-medium bg-amber-400 hover:bg-amber-300 text-amber-950 border border-amber-500/60 shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer"
            title="点击切换 Alex 语音语速"
          >
            {speechRate === 0.85 ? '🐢 慢速' : '🐇 标准'}
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={() => setIsLargeFont(!isLargeFont)}
            className="hidden md:flex px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 border border-emerald-500/30 shadow-2xs items-center gap-1 shrink-0 cursor-pointer"
            title="切换聊天字体大小"
          >
            {isLargeFont ? '放大' : '标准'}
          </button>

          {/* Mic Help Button */}
          <button
            onClick={() => {
              playClickSound();
              setShowMicHelpModal(true);
            }}
            className="p-1 text-white/80 hover:text-white rounded-md bg-black/20 hover:bg-black/30 border border-white/20 text-xs shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer"
            title="麦克风权限排查与帮助"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {activeLesson && (() => {
            const nextLessonId = activeLesson.id + 1;
            const currentVolId = profile.selectedVolumeId || 'vol1';
            const canAccessNext = hasLessonAccess(profile, currentVolId, nextLessonId);

            return (
              <button
                onClick={() => {
                  playEmeraldSound();
                  onCompleteLesson(activeLesson.id);
                  onBackToMap();
                }}
                className={`px-2 py-1 font-bold text-[11px] rounded-md border shadow-2xs active:translate-y-0.5 flex items-center gap-1 shrink-0 cursor-pointer ${
                  canAccessNext
                    ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-500/50'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 border-emerald-500/50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{canAccessNext ? `通关 L${nextLessonId}` : '完成本课'}</span>
              </button>
            );
          })()}

          <button
            onClick={onOpenSettings}
            className="px-2 py-1 bg-[#FF6321] hover:bg-[#e05316] text-white rounded-md border border-orange-600/40 text-[11px] font-medium shadow-2xs cursor-pointer"
            title="配置 Key"
          >
            Key
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
        
        {/* Welcome Message if empty */}
        {messages.length === 0 && (
          <div className="text-center py-6 sm:py-8 space-y-2.5 max-w-sm mx-auto">
            <div className="w-12 h-12 bg-amber-100 border-2 border-amber-300 rounded-xl mx-auto flex items-center justify-center text-2xl shadow-xs">
              👩‍🦰
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800">
              Hi, adventurer {profile.nickname || 'Tom'}! 👋
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/80 p-3 rounded-xl border border-amber-200/80">
              我是你的 Alex 老师！我会用精简、地道的英语和你聊天。试着用下方的例句或直接点击麦克风和我交流吧！
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isAlex = msg.sender === 'alex';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isAlex ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div className="shrink-0 mt-0.5">
                <MinecraftAvatar
                  speaker={isAlex ? 'Alex' : (profile.nickname || 'Steve')}
                  avatar={isAlex ? '👩‍🦰' : profile.selectedAvatar}
                  size={34}
                />
              </div>

              {/* Message Content Bubble */}
              <div className={`max-w-[82%] rounded-2xl p-2.5 sm:p-3 border text-xs sm:text-sm leading-relaxed space-y-1.5 shadow-2xs ${
                isAlex
                  ? 'bg-white border-slate-200/80 text-slate-800 rounded-tl-xs'
                  : 'bg-[#8de460] border-[#7cd351] text-slate-950 rounded-tr-xs'
              }`}>
                
                {/* Sender Title */}
                <div className={`flex items-center justify-between text-[11px] font-semibold pb-1 border-b ${
                  isAlex ? 'border-slate-100 text-slate-500' : 'border-[#7cd351]/80 text-slate-900'
                }`}>
                  <span className={isAlex ? 'text-emerald-800 font-bold' : 'text-slate-950 font-bold'}>
                    {isAlex ? 'Alex 老师' : profile.nickname || 'You'}
                  </span>
                  
                  {isAlex && (
                    <button
                      onClick={() => {
                        const parts = splitDialogueParts(msg.text);
                        speakText(parts.english || msg.text, { speaker: 'Alex', rate: speechRate });
                      }}
                      className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded text-[10px] font-medium flex items-center space-x-1 transition-colors cursor-pointer"
                      title="朗读 Alex 语音"
                    >
                      <Volume2 className="w-3 h-3 text-emerald-700" />
                      <span>发音</span>
                    </button>
                  )}
                </div>

                {/* Main Text Content */}
                {(() => {
                  if (!isAlex) {
                    return (
                      <div className={`font-sans font-medium text-slate-950 leading-relaxed ${
                        isLargeFont ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                      }`}>
                        {msg.text}
                      </div>
                    );
                  }
                  const parts = splitDialogueParts(msg.text);
                  return (
                    <div className="space-y-1">
                      <div className={`font-sans font-medium text-slate-900 leading-relaxed ${
                        isLargeFont ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                      }`}>
                        {parts.english}
                      </div>
                      {showTranslations && parts.chinese && (
                        <div className={`font-sans text-slate-500 font-normal leading-normal pt-1 border-t border-slate-100 ${
                          isLargeFont ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'
                        }`}>
                          {parts.chinese}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Optional Alex Encouragement Badge */}
                {isAlex && msg.encouragement && (
                  <div className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-medium text-amber-900 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-[#FF6321]" />
                    <span>{msg.encouragement}</span>
                  </div>
                )}

                {/* Better Expression Suggestion */}
                {isAlex && msg.betterExpression && (
                  <div className="p-2 bg-sky-50 border border-sky-200/80 rounded-lg text-xs font-sans text-sky-900 leading-normal">
                    <span className="font-semibold text-sky-700">✨ 试试这样说: </span>
                    <span className="font-bold">"{msg.betterExpression}"</span>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-2.5">
            <div className="shrink-0 animate-pulse mt-0.5">
              <MinecraftAvatar speaker="Alex" size={34} />
            </div>
            <div className="bg-white border border-emerald-500/50 px-3 py-2 rounded-xl rounded-tl-xs text-xs font-medium text-emerald-800 flex items-center space-x-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Alex 老师正在思考回复...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Gift Items to Alex Bar */}
      <div className="px-3 py-1.5 bg-amber-50/70 border-t border-amber-200/70 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-amber-900 whitespace-nowrap flex items-center space-x-1 shrink-0">
          <span>🎁 给 Alex 送礼:</span>
        </span>
        {[
          { emoji: '🗡️', name: '钻石剑', text: 'Here is a diamond sword for you, Alex!' },
          { emoji: '🍎', name: '金苹果', text: 'I have a delicious golden apple for you, Alex!' },
          { emoji: '🥪', name: '三明治', text: 'Here is a warm sandwich for you!' },
          { emoji: '💎', name: '钻石', text: 'Look! I found a shiny diamond for you!' },
          { emoji: '🪵', name: '原木', text: 'Here is some oak wood to build our shelter!' }
        ].map((gift, idx) => (
          <button
            key={idx}
            onClick={() => handleGiftAlex(gift.emoji, gift.name, gift.text)}
            disabled={isLoading}
            className="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-100/80 border border-amber-200 text-amber-950 text-xs font-normal whitespace-nowrap transition-colors shadow-2xs flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
          >
            <span>{gift.emoji}</span>
            <span>{gift.name}</span>
          </button>
        ))}
      </div>

      {/* Categorized Quick Scenario Roleplay Chips */}
      <div className="px-3 py-1.5 bg-slate-100/80 border-t border-slate-200/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap flex items-center space-x-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>例句卡:</span>
        </span>
        {promptCategories.map((cat, catIdx) => (
          <div key={catIdx} className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">{cat.categoryName}:</span>
            {cat.prompts.map((hint, hIdx) => (
              <button
                key={hIdx}
                onClick={() => handleSendMessage(hint)}
                disabled={isLoading}
                className="px-2 py-0.5 rounded-lg bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-800 text-xs font-normal whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                {hint}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Mic Error Banner in Main Chat View */}
      {callMicError && !isPhoneCallActive && (
        <div className="px-3 py-1.5 bg-amber-100 border-t border-amber-300 text-amber-950 text-xs font-medium flex items-center justify-between gap-2 shrink-0">
          <span className="truncate">⚠️ {callMicError}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {isInIframe && (
              <button
                onClick={() => window.open(window.location.href, '_blank')}
                className="px-2 py-0.5 bg-amber-400 hover:bg-amber-500 text-amber-950 border border-amber-950 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>新标签打开</span>
              </button>
            )}
            <button
              onClick={() => setShowMicHelpModal(true)}
              className="px-2 py-0.5 bg-white border border-amber-400 text-amber-900 rounded text-[11px] font-bold hover:bg-amber-50 cursor-pointer"
            >
              帮助
            </button>
            <button
              onClick={() => setCallMicError(null)}
              className="text-amber-800 hover:text-amber-950 text-xs px-1 cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom Input Field */}
      <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-1.5 sm:gap-2">
        {/* Call Alex Quick Green Button */}
        <button
          onClick={handleStartPhoneCall}
          className="px-2.5 py-2 bg-[#7CFC00] hover:bg-[#6edb00] text-emerald-950 border border-emerald-900/30 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 shadow-2xs active:translate-y-0.5 cursor-pointer"
          title="点击拨打与 Alex 老师的实时语音电话"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">通话</span>
        </button>

        {/* Mic Voice Input Button */}
        <button
          onClick={handleToggleVoiceInput}
          disabled={isTranscribingVoice || isLoading}
          className={`p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
            isTranscribingVoice
              ? 'bg-amber-400 border-amber-500 text-amber-950 animate-pulse'
              : isListening
                ? 'bg-rose-600 border-rose-700 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
          }`}
          title={isListening ? '正在录音...点击结束并发送' : '点击进行语音输入'}
        >
          {isTranscribingVoice ? (
            <RefreshCw className="w-4 h-4 animate-spin text-amber-950" />
          ) : isListening ? (
            <MicOff className="w-4 h-4 text-white" />
          ) : (
            <Mic className="w-4 h-4 text-[#487E2C]" />
          )}
        </button>

        {/* Text Area Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={isTranscribingVoice ? '正在识别您的语音中...' : isListening ? '正在录音中...请说英文' : '用英文与 Alex 对话 (如: "Where is the house?")...'}
          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 font-sans focus:border-[#487E2C] focus:bg-white focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="bg-[#487E2C] hover:bg-[#355E20] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs disabled:opacity-40 disabled:cursor-not-allowed transition-colors active:translate-y-0.5 cursor-pointer flex items-center justify-center shrink-0"
          title="发送消息"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Fullscreen Alex Voice Phone Call Overlay Modal - Simplified, Clean, 100% In-View */}
      {isPhoneCallActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between items-center p-3 sm:p-5 animate-fadeIn text-white font-mono select-none overflow-hidden max-h-[100dvh]">
          
          {/* Top Call Info Bar */}
          <div className="w-full max-w-sm flex items-center justify-between bg-emerald-950/90 border border-emerald-500/40 rounded-xl px-3 py-1.5 shadow-lg shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="text-xs font-bold text-emerald-300">
                通话中 · Alex 老师
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs font-mono text-amber-300 bg-black/40 px-2 py-0.5 rounded-lg border border-amber-400/20">
                ⏱️ {Math.floor(callDuration / 60).toString().padStart(2, '0')}:{(callDuration % 60).toString().padStart(2, '0')}
              </div>
              <button
                onClick={handleEndPhoneCall}
                className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                title="挂断通话"
              >
                挂断
              </button>
            </div>
          </div>

          {/* Center Alex Character Voice Call Visualizer */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full my-auto space-y-2.5 min-h-0 overflow-y-auto px-1 py-1">
            
            {/* Alex Animated Character & Status */}
            <div className="flex flex-col items-center space-y-1.5 shrink-0">
              <div className="relative">
                <div className={`absolute -inset-1.5 rounded-2xl blur-xs transition-all ${
                  isListening ? 'bg-emerald-400/50 animate-ping' : isLoading ? 'bg-amber-400/40 animate-pulse' : 'bg-emerald-500/20'
                }`} />
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 bg-[#EEDDCC] border-2 border-[#C89D7C] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md">
                  👩‍🦰
                </div>
              </div>

              {/* Status Pill */}
              {isLoading ? (
                <div className="bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500 flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Alex 思考中...</span>
                </div>
              ) : isTranscribingVoice ? (
                <div className="bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500 animate-pulse flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>正在识别语音...</span>
                </div>
              ) : isListening ? (
                <div className="bg-emerald-400 text-emerald-950 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500 animate-pulse flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping" />
                  <span>正在听你说话...</span>
                </div>
              ) : (
                <div className="bg-emerald-900/80 text-emerald-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>通话正常 · 点击下方绿色按钮说话</span>
                </div>
              )}

              {/* Real-time Dynamic Volume Visualizer Bar when listening */}
              {isListening && (
                <div className="w-44 bg-black/60 border border-emerald-500/50 rounded-full px-2.5 py-0.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[10px] text-emerald-300 font-medium shrink-0">音量</span>
                  <div className="flex-1 h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-lime-300 transition-all duration-75"
                      style={{ width: `${Math.max(12, audioLevel)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Subtitle Dialogue Box */}
            <div className="w-full bg-slate-900/90 border border-[#487E2C] rounded-xl p-2.5 sm:p-3 text-left shadow-md max-h-24 sm:max-h-28 overflow-y-auto">
              <div className="text-[10px] font-semibold text-emerald-400 mb-1 flex items-center justify-between border-b border-emerald-800/60 pb-0.5">
                <span>💬 Alex 老师说:</span>
                <button
                  onClick={() => {
                    const parts = splitDialogueParts(phoneSubtitle);
                    speakText(parts.english || phoneSubtitle, { speaker: 'Alex', rate: speechRate });
                  }}
                  className="text-[10px] bg-emerald-800/80 hover:bg-emerald-700 text-white px-1.5 py-0.5 rounded flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-2.5 h-2.5" />
                  <span>重听</span>
                </button>
              </div>
              {(() => {
                const parts = splitDialogueParts(phoneSubtitle);
                return (
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-medium leading-relaxed text-white">
                      {parts.english}
                    </div>
                    {showTranslations && parts.chinese && (
                      <div className="text-[11px] text-emerald-300/90 font-normal leading-normal pt-0.5 border-t border-emerald-800/40">
                        {parts.chinese}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Mic Error Notice */}
            {callMicError && (
              <div className="w-full text-xs bg-amber-500/20 border border-amber-400/50 text-amber-200 p-2 rounded-xl text-center font-medium flex items-center justify-between gap-1.5 shrink-0">
                <span className="truncate flex-1 text-left">⚠️ {callMicError}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {isInIframe && (
                    <button
                      onClick={() => window.open(window.location.href, '_blank')}
                      className="px-2 py-0.5 bg-amber-400 text-amber-950 rounded text-[10px] font-bold hover:bg-amber-300 cursor-pointer flex items-center gap-1"
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      <span>新标签打开</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowMicHelpModal(true)}
                    className="px-2 py-0.5 bg-white/20 text-white rounded text-[10px] font-medium hover:bg-white/30 cursor-pointer"
                  >
                    排查
                  </button>
                </div>
              </div>
            )}

            {/* Quick Talk Chips in Call */}
            <div className="w-full">
              <p className="text-[10px] text-slate-400 font-medium mb-1 text-center">💡 点击直接说:</p>
              <div className="flex items-center justify-center gap-1 flex-wrap">
                {[
                  'Hello Alex! 👩‍🦰',
                  'I built a house! 🪵',
                  'Let\'s go mining! ⛏️',
                  'Look at this diamond! 💎'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.replace(/[^\w\s!?,]/g, '').trim())}
                    disabled={isLoading || isTranscribingVoice}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-950 hover:border-emerald-500 text-slate-200 rounded text-xs font-normal border border-slate-700 whitespace-nowrap transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Voice Call Action Controls */}
          <div className="w-full max-w-sm shrink-0 pt-2 pb-1 border-t border-slate-800 flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-center gap-2.5 w-full">
              {/* PRIMARY GREEN TALK BUTTON */}
              <button
                onClick={handleToggleVoiceInput}
                disabled={isTranscribingVoice || isLoading}
                className={`flex-1 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base border border-emerald-900/40 shadow-sm flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer ${
                  isTranscribingVoice
                    ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                    : isListening
                      ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                      : 'bg-[#7CFC00] hover:bg-[#68d600] text-emerald-950'
                }`}
                title={isListening ? '点击结束录音并发送' : '点击开始说话'}
              >
                {isTranscribingVoice ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-950" />
                    <span>正在解析语音...</span>
                  </>
                ) : isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>说完了，点击发送</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-emerald-950" />
                    <span>🎙️ 点击开始说话</span>
                  </>
                )}
              </button>

              {/* Hang Up Button */}
              <button
                onClick={handleEndPhoneCall}
                className="p-2.5 sm:p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl border border-rose-800 shadow-sm flex items-center justify-center transition-all active:translate-y-0.5 cursor-pointer shrink-0"
                title="挂断电话"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              {isTranscribingVoice ? '正在将您的发音转换为文字...' : isListening ? '正在录音中，说英文后点击红色按钮发送' : '点击绿色按钮说话，说完再点一下即可发送'}
            </p>
          </div>

        </div>
      )}

      {/* Mic Permission Diagnostics & Setup Guide Modal */}
      {showMicHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white border-4 border-[#487E2C] rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 space-y-4 text-slate-800">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald-100 border-2 border-[#487E2C] rounded-xl flex items-center justify-center text-xl">
                  🎙️
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-mono text-slate-900">
                    麦克风权限开启与排查指引
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    解决与 Alex 老师语音对话提示未开启的问题
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMicHelpModal(false)}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* 1. Quick Diagnostic Test */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>第一步：一键检测麦克风状态</span>
                </span>
                <button
                  onClick={handleTestMicrophone}
                  disabled={micTestStatus === 'testing'}
                  className="px-3 py-1 bg-[#487E2C] hover:bg-[#355E20] text-white text-xs font-bold rounded-lg shadow-xs active:scale-95 transition-all"
                >
                  {micTestStatus === 'testing' ? '正在检测...' : '▶️ 点击检测'}
                </button>
              </div>

              {micTestStatus !== 'idle' && (
                <div className={`p-2.5 rounded-lg text-xs font-bold ${
                  micTestStatus === 'success'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : micTestStatus === 'testing'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {micTestMessage}
                </div>
              )}
            </div>

            {/* 2. Iframe Preview Notice (If in Iframe) */}
            {isInIframe && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3.5 space-y-2">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-black text-amber-950">
                      提示：当前处于内嵌预览窗口 (Iframe)
                    </p>
                    <p className="text-amber-900 leading-relaxed">
                      现代浏览器（如 Chrome/Safari）为保护隐私，默认会阻止内嵌小窗访问麦克风。点击下方按钮在新标签页打开即可完美使用！
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="w-full py-2 bg-amber-400 hover:bg-amber-500 border-2 border-amber-950 text-amber-950 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>在新标签页打开（推荐 🚀）</span>
                </button>
              </div>
            )}

            {/* 3. Browser Specific Step-by-Step Guides */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                <span>🛠️ 常见浏览器开启方法：</span>
              </h4>

              {/* Chrome / Edge */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span>💻 Google Chrome / 微软 Edge 浏览器：</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                  <li>点击浏览器最上方地址栏左侧的 <strong>🔒 锁形图标</strong> 或 <strong>⚙️ 网站设置</strong></li>
                  <li>找到 <strong>【麦克风 (Microphone)】</strong> 选项，从“禁止”修改为 <strong>【允许】</strong></li>
                  <li>点击刷新页面即可正常开启语音识别对练</li>
                </ol>
              </div>

              {/* iOS / Safari */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span>🍎 苹果 iPhone / iPad / Mac Safari：</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                  <li>点击 Safari 网址左侧的 <strong>aA</strong> 或 <strong>大小</strong> 图标</li>
                  <li>点击 <strong>【网站设置】</strong> ➔ 将【麦克风】设置为 <strong>【允许】</strong></li>
                  <li>若提示系统未授权：进入手机【设置】➔【Safari 浏览器】➔【麦克风】允许</li>
                </ol>
              </div>

              {/* WeChat / Mobile App */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span>📱 微信内置浏览器：</span>
                </p>
                <p className="text-slate-600 leading-relaxed">
                  微信内嵌窗口不支持 Web 语音识别。请点击右上角 <strong>「...」</strong> ➔ 选择 <strong>「在默认浏览器中打开」</strong> 即可体验全自动语音。
                </p>
              </div>
            </div>

            {/* 4. Alternate Talking Mode Notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-900">
              <p className="font-black text-blue-950 flex items-center gap-1">
                <span>💡 免麦克风也能练口语：</span>
              </p>
              <p className="leading-relaxed">
                即使暂时不方便开麦，也可以直接点击输入框上方的 <strong>【快捷例句卡】</strong> 或给 Alex <strong>【赠送礼物】</strong>，Alex 老师同样会全语音朗读、纠正语法并互动！
              </p>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowMicHelpModal(false)}
                className="w-full py-2.5 bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white rounded-xl text-sm font-black shadow-sm"
              >
                我知道了，返回对话
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
