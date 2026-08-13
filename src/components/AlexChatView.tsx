import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Lesson, UserProfile } from '../types';
import { sendChatMessageToAlex } from '../services/aiService';
import { buildAlexSystemPrompt } from '../utils/aiTeacherPrompt';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { unlockMobileAudio } from '../services/edgeTtsService';
import { Send, Volume2, Sparkles, Mic, MicOff, RefreshCw, MessageSquare, Lightbulb, CheckCircle2, Award, Phone, PhoneOff, PhoneCall } from 'lucide-react';

interface AlexChatViewProps {
  profile: UserProfile;
  activeLesson: Lesson | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardEmeralds: (amount: number, xpAmount: number) => void;
  onCompleteLesson: (lessonId: number) => void;
  onBackToMap: () => void;
  onOpenSettings: () => void;
}

// Helper function to format Alex dialogue with clear linebreaks for kids
function formatAlexDialogueWithLineBreaks(text: string): string {
  if (!text) return '';
  let cleaned = text.trim();
  // Ensure [中文...] bracketed translation is on its own paragraph with double linebreaks
  cleaned = cleaned
    .replace(/(\S)\s*(\[[^\]]+\])/g, '$1\n\n$2')
    .replace(/(\[[^\]]+\])\s*(\S)/g, '$1\n\n$2')
    .replace(/\n{3,}/g, '\n\n');
  return cleaned;
}

export const AlexChatView: React.FC<AlexChatViewProps> = ({
  profile,
  activeLesson,
  messages,
  setMessages,
  onAwardEmeralds,
  onOpenSettings,
  onCompleteLesson,
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleStartPhoneCall = () => {
    setIsPhoneCallActive(true);
    setCallStatus('connected');
    playClickSound();
    unlockMobileAudio();
    const greeting = `Hello ${profile.nickname || 'there'}! I'm Alex! [你好呀！我是 Alex！]` + '\n\n' + `What are you building in Minecraft today?`;
    setPhoneSubtitle(greeting);
    speakText(greeting, { speaker: 'Alex', rate: speechRate });
  };

  const handleEndPhoneCall = () => {
    stopSpeech();
    setCallStatus('ended');
    onAwardEmeralds(5, 10);
    playEmeraldSound();
    setTimeout(() => {
      setIsPhoneCallActive(false);
    }, 1200);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Alex speech with speed setting
  const playAlexVoice = (text: string) => {
    speakText(text, { speaker: 'Alex', rate: speechRate });
  };

  // Web Speech API Voice Input
  const handleToggleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('您的浏览器暂不支持语音识别，请直接使用键盘输入英文哦！');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

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
      'Build a house & practice English'
    );

    const alexRes = await sendChatMessageToAlex(newHistory, systemPrompt, profile.apiKeyConfig);

    setIsLoading(false);

    const formattedAlexText = formatAlexDialogueWithLineBreaks(alexRes.text);

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
    speakText(formattedAlexText, { speaker: 'Alex', rate: speechRate });

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

  // Structured Scenario Roleplay Chips for Children
  const promptCategories = [
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
    <div className="flex flex-col h-[calc(100dvh-12rem)] min-h-[420px] max-h-[820px] bg-white border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#2D2D2D]">
      
      {/* Top Banner: Alex NPC Status & Active Lesson */}
      <div className="bg-[#487E2C] p-2.5 sm:p-4 border-b-2 sm:border-b-4 border-[#355E20] text-white flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* Animated Alex Character Frame with Moods */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#EEDDCC] border-2 sm:border-4 border-[#C89D7C] rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-md transition-all duration-300">
              {alexMood === 'happy' && '👩‍🦰'}
              {alexMood === 'craft' && '🛠️'}
              {alexMood === 'battle' && '⚔️'}
              {alexMood === 'star' && '🌟'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#7CFC00] border-2 border-black rounded-full animate-pulse" title="Alex 在线伴学" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <h3 className="font-black font-mono text-white text-xs sm:text-base drop-shadow-sm truncate">
                Alex 老师
              </h3>
              <span className="text-[9px] sm:text-[10px] bg-[#FF6321] text-white font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                {profile.apiKeyConfig.provider === 'deepseek' ? 'DeepSeek' : 'Gemini AI'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/90 font-bold truncate flex items-center gap-1">
              <span>{activeLesson ? `Lesson ${activeLesson.id} - ${activeLesson.title}` : 'Minecraft 自由口语角'}</span>
            </p>
          </div>
        </div>

        {/* Translation Toggle, Speech Speed, Font Size, Phone Call & Key Config */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Phone Call Alex Button */}
          <button
            onClick={handleStartPhoneCall}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-[#7CFC00] hover:bg-[#68d600] text-emerald-950 rounded-xl border-2 border-black text-xs font-black shadow-md flex items-center gap-1.5 shrink-0 animate-pulse transition-transform active:scale-95"
            title="与 Alex 老师打语音电话"
          >
            <PhoneCall className="w-4 h-4 text-emerald-950" />
            <span>📞 电话连线 Alex</span>
          </button>

          {/* Font Size Toggle for Kids */}
          <button
            onClick={() => setIsLargeFont(!isLargeFont)}
            className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold bg-emerald-100 text-emerald-950 border-2 border-black shadow-sm flex items-center gap-1 shrink-0"
            title="切换聊天字体大小"
          >
            {isLargeFont ? '🔍 特大字' : '🔎 标准字'}
          </button>

          {/* Speech Rate Toggle button for kids */}
          <button
            onClick={() => setSpeechRate(prev => (prev === 0.85 ? 1.0 : 0.85))}
            className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold bg-amber-400 text-amber-950 border-2 border-black shadow-sm flex items-center gap-1 shrink-0"
            title="点击切换 Alex 语音语速"
          >
            {speechRate === 0.85 ? '🐢 0.7x 慢速' : '🐇 1.0x 标准'}
          </button>

          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold border-2 transition-all ${
              showTranslations
                ? 'bg-white text-[#487E2C] border-white shadow-sm'
                : 'bg-black/20 text-white/80 border-white/30 hover:bg-black/30'
            }`}
            title="切换中文解释显示"
          >
            {showTranslations ? '双语' : '仅英文'}
          </button>

          {activeLesson && (
            <div className="flex items-center gap-2">
              {messages.length < 4 ? (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-xl border border-white/20 text-white text-[10px] font-mono">
                  <span className="animate-pulse">🔒</span>
                  <span>对话 2 轮解锁打卡</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    playEmeraldSound();
                    onCompleteLesson(activeLesson.id);
                    onBackToMap();
                  }}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black font-mono text-[10px] sm:text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-none flex items-center gap-1 shrink-0 animate-in fade-in zoom-in"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
                  <span className="hidden sm:inline">打卡通关</span>
                  <span className="sm:hidden">通关</span>
                </button>
              )}
            </div>
          )}

          <button
            onClick={onOpenSettings}
            className="px-2 py-1.5 bg-[#FF6321] hover:bg-[#e05316] text-white rounded-xl border-2 border-black text-xs font-bold shadow-sm"
            title="配置 Key"
          >
            ⚙️ Key
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4 bg-[#F9F9F9]">
        
        {/* Welcome Message if empty */}
        {messages.length === 0 && (
          <div className="text-center py-6 sm:py-10 space-y-3 max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#EEDDCC] border-4 border-[#C89D7C] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm animate-bounce">
              👩‍🦰
            </div>
            <h4 className="text-lg sm:text-xl font-black font-mono text-[#2D2D2D]">
              Hi, adventurer {profile.nickname || 'Tom'}! 👋
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bold bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-200">
              我是你的 Alex 老师！我会用精简、好懂的英语和你聊天。快试着用下面的按钮或直接用麦克风和我说话吧！
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isAlex = msg.sender === 'alex';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isAlex ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl border-2 sm:border-3 shadow-sm shrink-0 ${
                isAlex
                  ? 'bg-[#EEDDCC] border-[#C89D7C]'
                  : 'bg-amber-100 border-amber-300'
              }`}>
                {isAlex ? '👩‍🦰' : profile.selectedAvatar || '👦'}
              </div>

              {/* Message Content Bubble */}
              <div className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4.5 border-2 text-sm sm:text-base leading-snug space-y-2 shadow-sm ${
                isAlex
                  ? 'bg-white border-slate-300 text-[#2D2D2D] rounded-tl-none'
                  : 'bg-[#95ec69] border-[#82e054] text-slate-950 rounded-tr-none'
              }`}>
                
                {/* Sender Title */}
                <div className={`flex items-center justify-between text-xs sm:text-sm font-mono border-b pb-1.5 mb-1.5 ${
                  isAlex ? 'border-slate-200' : 'border-[#82e054]/80'
                }`}>
                  <span className={isAlex ? 'text-[#487E2C] font-black' : 'text-slate-950 font-black'}>
                    {isAlex ? 'Alex 老师' : profile.nickname || 'You'}
                  </span>
                  
                  {isAlex && (
                    <button
                      onClick={() => speakText(msg.text, { speaker: 'Alex', rate: speechRate })}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#487E2C] border border-emerald-300 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-xs transition-all active:scale-95"
                      title="朗读 Alex 语音"
                    >
                      <Volume2 className="w-4 h-4 text-[#487E2C]" />
                      <span>🔊 听发音</span>
                    </button>
                  )}
                </div>

                {/* Main Text - Extra large and clear for kids */}
                <div className={`whitespace-pre-wrap font-sans font-bold transition-all ${
                  isLargeFont
                    ? 'text-base sm:text-xl leading-relaxed tracking-wide'
                    : 'text-sm sm:text-base leading-normal'
                }`}>
                  {isAlex ? formatAlexDialogueWithLineBreaks(msg.text) : msg.text}
                </div>

                {/* Optional Alex Encouragement Badge */}
                {isAlex && msg.encouragement && (
                  <div className="inline-flex items-center space-x-1.5 bg-amber-100 border-2 border-amber-300 px-3 py-1 rounded-full text-xs sm:text-sm font-mono font-bold text-amber-950 shadow-xs">
                    <Award className="w-4 h-4 text-[#FF6321]" />
                    <span>{msg.encouragement}</span>
                  </div>
                )}

                {/* Better Expression Suggestion */}
                {isAlex && msg.betterExpression && (
                  <div className="p-2.5 sm:p-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-xs sm:text-sm font-mono text-blue-900 leading-normal">
                    <span className="font-bold text-blue-700">✨ 试试这样说 (Try this): </span>
                    <span className="font-black">"{msg.betterExpression}"</span>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-[#EEDDCC] border-2 border-[#C89D7C] rounded-2xl flex items-center justify-center text-lg animate-pulse">
              👩‍🦰
            </div>
            <div className="bg-white border-2 border-[#487E2C] p-3.5 rounded-2xl rounded-tl-none text-xs font-mono font-bold text-[#487E2C] flex items-center space-x-2 shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Alex 老师正在按 Minecraft 世界观思考回复...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Gift Items to Alex Bar */}
      <div className="px-3 sm:px-4 py-2 bg-amber-50/90 border-t-2 border-amber-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-xs sm:text-sm font-mono font-black text-amber-900 whitespace-nowrap flex items-center space-x-1 shrink-0">
          <span>🎁 给 Alex 送礼：</span>
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
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-all shadow-xs flex items-center gap-1 shrink-0 active:scale-95"
          >
            <span className="text-base">{gift.emoji}</span>
            <span>{gift.name}</span>
          </button>
        ))}
      </div>

      {/* Categorized Quick Scenario Roleplay Chips */}
      <div className="px-3 sm:px-4 py-2 bg-slate-100 border-t border-slate-200 space-y-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs sm:text-sm font-mono font-black text-slate-600 whitespace-nowrap flex items-center space-x-1 uppercase shrink-0">
            <Lightbulb className="w-4 h-4 text-[#FFD700]" />
            <span>快捷例句卡:</span>
          </span>
          {promptCategories.map((cat, catIdx) => (
            <div key={catIdx} className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-mono font-bold text-slate-500 pl-1">{cat.categoryName}</span>
              {cat.prompts.map((hint, hIdx) => (
                <button
                  key={hIdx}
                  onClick={() => handleSendMessage(hint)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-300 hover:border-[#487E2C] text-slate-800 hover:text-[#487E2C] text-xs sm:text-sm font-mono font-bold whitespace-nowrap transition-all shadow-xs"
                >
                  {hint}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Field */}
      <div className="p-3 sm:p-4 bg-white border-t-4 border-[#487E2C] flex items-center space-x-2">
        {/* Mic Voice Input Button */}
        <button
          onClick={handleToggleVoiceInput}
          className={`p-3 rounded-xl border-2 transition-all ${
            isListening
              ? 'bg-rose-600 border-black text-white animate-pulse'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
          }`}
          title={isListening ? '正在录音...再次点击结束' : '按住用英文说话'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#487E2C]" />}
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
          placeholder={isListening ? '请用英文说话...' : '用英文与 Alex 老师对话 (例: "Where is the house?")...'}
          className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="bg-[#487E2C] hover:bg-[#355E20] border-2 border-black text-white px-5 py-2.5 rounded-xl font-mono text-sm font-black shadow-[0_4px_0_0_#2A4718] disabled:opacity-40 disabled:cursor-not-allowed transition-all transform hover:translate-y-0.5 active:translate-y-[4px] active:shadow-none"
          title="发送消息"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Alex Voice Phone Call Overlay Modal */}
      {isPhoneCallActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn text-white font-mono">
          
          {/* Top Call Info Bar */}
          <div className="w-full max-w-lg flex items-center justify-between bg-emerald-950/80 border-2 border-emerald-500/50 rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-widest">
                {callStatus === 'connected' ? '📞 通话连线中' : '通话结束'}
              </span>
            </div>
            
            <div className="text-base sm:text-lg font-black font-mono text-amber-300 bg-black/40 px-3 py-1 rounded-xl border border-amber-400/30">
              ⏱️ {Math.floor(callDuration / 60).toString().padStart(2, '0')}:{(callDuration % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Center Alex Character Voice Call Visualizer */}
          <div className="my-auto flex flex-col items-center text-center max-w-lg w-full space-y-6">
            
            {/* Alex Animated Portrait Frame */}
            <div className="relative">
              {/* Outer Soundwaves Pulse */}
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping blur-sm" />
              <div className="absolute -inset-8 bg-amber-500/10 rounded-full animate-pulse blur-md" />

              <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-[#EEDDCC] border-4 sm:border-6 border-[#C89D7C] rounded-3xl flex items-center justify-center text-6xl sm:text-7xl shadow-2xl">
                👩‍🦰
              </div>

              {isLoading && (
                <div className="absolute -bottom-2 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full border-2 border-black animate-bounce shadow-md">
                  Thinking... 💭
                </div>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                Alex 老师
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-bold">
                Minecraft 语音即时通话角
              </p>
            </div>

            {/* Subtitle Dialogue Box */}
            <div className="w-full bg-slate-900/90 border-2 sm:border-4 border-[#487E2C] rounded-2xl p-4 sm:p-5 text-left shadow-2xl min-h-[120px] max-h-[220px] overflow-y-auto">
              <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center justify-between border-b border-emerald-800 pb-1">
                <span>💬 Alex 说:</span>
                <button
                  onClick={() => speakText(phoneSubtitle, { speaker: 'Alex', rate: speechRate })}
                  className="text-xs bg-emerald-800/80 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>重听</span>
                </button>
              </div>
              <div className="text-base sm:text-xl font-bold leading-relaxed whitespace-pre-wrap text-white tracking-wide">
                {formatAlexDialogueWithLineBreaks(phoneSubtitle)}
              </div>
            </div>
          </div>

          {/* Bottom Voice Call Action Controls */}
          <div className="w-full max-w-lg flex items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-slate-800">
            {/* Mic Speech Button */}
            <button
              onClick={handleToggleVoiceInput}
              className={`flex-1 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg border-2 sm:border-4 border-black shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#7CFC00] hover:bg-[#68d600] text-emerald-950'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              <span>{isListening ? '正在听你说话...' : '按住用英文说话'}</span>
            </button>

            {/* Hang Up Button */}
            <button
              onClick={handleEndPhoneCall}
              className="p-4 sm:p-5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl border-2 sm:border-4 border-black shadow-lg flex items-center justify-center active:scale-95"
              title="挂断电话"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
