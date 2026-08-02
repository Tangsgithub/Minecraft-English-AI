import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Lesson, UserProfile } from '../types';
import { sendChatMessageToAlex } from '../services/aiService';
import { buildAlexSystemPrompt } from '../utils/aiTeacherPrompt';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';
import { Send, Volume2, Sparkles, Mic, MicOff, RefreshCw, MessageSquare, Lightbulb, CheckCircle2, Award } from 'lucide-react';

interface AlexChatViewProps {
  profile: UserProfile;
  activeLesson: Lesson | null;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAwardEmeralds: (amount: number, xpAmount: number) => void;
  onOpenSettings: () => void;
}

export const AlexChatView: React.FC<AlexChatViewProps> = ({
  profile,
  activeLesson,
  messages,
  setMessages,
  onAwardEmeralds,
  onOpenSettings
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

    const alexMsg: ChatMessage = {
      id: `alex_${Date.now()}`,
      sender: 'alex',
      text: alexRes.text,
      grammarCorrection: alexRes.grammarCorrection,
      betterExpression: alexRes.betterExpression,
      encouragement: alexRes.encouragement,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, alexMsg]);

    // Speak Alex's response automatically
    speakText(alexRes.text);

    // Award small emeralds & XP for speaking English
    playEmeraldSound();
    onAwardEmeralds(5, 10);
  };

  // Pre-set prompt recommendations for children
  const promptHints = [
    activeLesson
      ? `Lesson ${activeLesson.id}: ${activeLesson.targetSentences[0] || 'Are you a teacher?'}`
      : 'Hello Alex! What are you building?',
    'I want a diamond sword! ⚔️',
    'Let\'s build a house together! 🏰',
    'Look! Is that a creeper? 💥',
    'Help me find wood and stone! 🪵'
  ];

  return (
    <div className="flex flex-col h-[78vh] bg-white border-4 border-[#487E2C] rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#2D2D2D]">
      
      {/* Top Banner: Alex NPC Status & Active Lesson */}
      <div className="bg-[#487E2C] p-3 sm:p-4 border-b-4 border-[#355E20] text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Animated Alex Character Frame */}
          <div className="relative">
            <div className="w-12 h-12 bg-[#EEDDCC] border-4 border-[#C89D7C] rounded-2xl flex items-center justify-center text-2xl shadow-md">
              👩‍🦰
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#7CFC00] border-2 border-black rounded-full animate-pulse" title="Alex 在线" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black font-mono text-white text-sm sm:text-base drop-shadow-sm">
                Alex 老师 (Minecraft AI English Companion)
              </h3>
              <span className="text-[10px] bg-[#FF6321] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                {profile.apiKeyConfig.provider === 'deepseek' ? 'DeepSeek API' : 'Gemini AI'}
              </span>
            </div>
            <p className="text-xs text-white/90 font-bold">
              {activeLesson
                ? `当前课程：Lesson ${activeLesson.id} - ${activeLesson.title}`
                : 'Minecraft 村庄自由英语实战交流'}
            </p>
          </div>
        </div>

        {/* Translation Toggle & Config */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border-2 transition-all ${
              showTranslations
                ? 'bg-white text-[#487E2C] border-white shadow-sm'
                : 'bg-black/20 text-white/80 border-white/30 hover:bg-black/30'
            }`}
            title="切换中文解释显示"
          >
            {showTranslations ? '中英双语' : '仅英文'}
          </button>

          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1.5 bg-[#FF6321] hover:bg-[#e05316] text-white rounded-xl border-2 border-black text-xs font-bold shadow-sm"
            title="配置 Key"
          >
            ⚙️ Key
          </button>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F9F9F9]">
        
        {/* Welcome Message if empty */}
        {messages.length === 0 && (
          <div className="text-center py-8 space-y-3 max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#EEDDCC] border-4 border-[#C89D7C] rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-sm">
              👩‍🦰
            </div>
            <h4 className="text-base font-black font-mono text-[#2D2D2D]">
              Hello, adventurer {profile.nickname || 'Tom'}!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-bold">
              我是你的 Minecraft 英语陪伴老师 Alex。你可以随时用英文和我聊天、询问方块合成、或者练习今天的新概念课程句型！
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
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg border-2 shadow-sm shrink-0 ${
                isAlex
                  ? 'bg-[#EEDDCC] border-[#C89D7C]'
                  : 'bg-amber-100 border-amber-300'
              }`}>
                {isAlex ? '👩‍🦰' : profile.selectedAvatar || '👦'}
              </div>

              {/* Message Content Bubble */}
              <div className={`max-w-[82%] rounded-2xl p-4 border-2 text-xs leading-relaxed space-y-2 shadow-sm ${
                isAlex
                  ? 'bg-white border-[#487E2C] text-[#2D2D2D] rounded-tl-none'
                  : 'bg-[#487E2C] border-black text-white rounded-tr-none'
              }`}>
                
                {/* Sender Title */}
                <div className={`flex items-center justify-between text-[11px] font-mono border-b pb-1 mb-1 ${
                  isAlex ? 'border-slate-200' : 'border-white/20'
                }`}>
                  <span className={isAlex ? 'text-[#487E2C] font-black' : 'text-[#FFD700] font-black'}>
                    {isAlex ? 'Alex 老师' : profile.nickname || 'You'}
                  </span>
                  
                  {isAlex && (
                    <button
                      onClick={() => speakText(msg.text)}
                      className="text-slate-400 hover:text-[#487E2C] flex items-center space-x-1"
                      title="朗读 Alex 语音"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Main Text */}
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm font-medium">
                  {msg.text}
                </div>

                {/* Optional Alex Encouragement Badge */}
                {isAlex && msg.encouragement && (
                  <div className="inline-flex items-center space-x-1 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-amber-900">
                    <Award className="w-3 h-3 text-[#FF6321]" />
                    <span>{msg.encouragement}</span>
                  </div>
                )}

                {/* Better Expression Suggestion */}
                {isAlex && msg.betterExpression && (
                  <div className="p-2.5 bg-blue-50 border-2 border-blue-200 rounded-xl text-[11px] font-mono text-blue-900">
                    <span className="font-bold text-blue-600">✨ 推荐表达 (Try this): </span>
                    <span className="font-semibold">"{msg.betterExpression}"</span>
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

      {/* Quick Prompt Recommendation Chips */}
      <div className="px-4 py-2.5 bg-slate-100 border-t-2 border-slate-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-mono font-black text-slate-500 whitespace-nowrap flex items-center space-x-1 uppercase">
          <Lightbulb className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>提问灵感：</span>
        </span>
        {promptHints.map((hint, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(hint)}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border-2 border-slate-300 hover:border-[#487E2C] text-slate-700 hover:text-[#487E2C] text-xs font-mono font-bold whitespace-nowrap transition-all shadow-sm"
          >
            {hint}
          </button>
        ))}
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
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#487E2C]" />}
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
          placeholder={isListening ? '请对麦克风用英文说话...' : '输入英文与 Alex 老师对话 (例如: "Excuse me, where is the house?")...'}
          className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 font-mono font-bold focus:border-[#487E2C] focus:outline-none"
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

    </div>
  );
};
