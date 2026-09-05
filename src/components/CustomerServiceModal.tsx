import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { User } from '../lib/neonAuth';
import { sendChatMessageToAlex } from '../services/aiService';
import { playClickSound, playEmeraldSound, speakText, stopSpeech } from '../utils/audio';
import { StudyGuideManualContent } from './StudyGuideManualModal';
import {
  Compass,
  X,
  Send,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Radio,
  Mic,
  Hammer,
  Award,
  Shield,
  HelpCircle,
  ChevronRight,
  Flame,
  CheckCircle2,
  ExternalLink,
  MessageSquareQuote,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';

export type CustomerServiceTabType = 'guide' | 'manual' | 'gameplay' | 'daily' | 'parents';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  currentUser: User | null;
  onOpenAuthModal?: () => void;
  initialTab?: CustomerServiceTabType;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  timestamp: string;
}

// Preset Q&As tailored specifically for kids playing the app
const KID_PLAY_PRESETS: { question: string; icon: string; answer: string }[] = [
  {
    question: '我第一次来，应该先玩什么？',
    icon: '🎮',
    answer: `🎉 欢迎来到 Minecraft English 方块世界！\n\n推荐你的第一步：\n1. 🌟 从主界面【世界地图】的第一关「Lesson 1: Excuse me!」开始！\n2. 🎧 用【三遍精听法】：先不看文字听一遍，再看中文搞懂意思，最后点亮麦克风跟读！\n3. 💎 只要跟读及格，就能点亮小星星 ⭐ 并获得你的第一批绿宝石！`
  },
  {
    question: '怎么才能赚到超多绿宝石？',
    icon: '💎',
    answer: `💰 哈哈，想要成为绿宝石大富翁？向导把 5 大秘籍传授给你：\n\n1. 📻 【听磨耳朵电台】：每听满 3 分钟，系统自动掉落 +2 颗绿宝石 💎！\n2. 🌟 【通关主线课】：每个句子准确朗读，拿满 3 颗星送大量绿宝石！\n3. 🎁 【收集故事词汇】：听电台时点击掉落的「核心词汇卡片」，每张奖励 +1 颗！\n4. 🗡️ 【合成台锻造】：把学过的单词方块带进合成台，合成道具得额外经验！\n5. 👨‍👩‍👧 【找爸爸妈妈要奖励】：在「家长中心」里，爸爸妈妈可以直接给你发放赞赏绿宝石红包哦！`
  },
  {
    question: '磨耳朵电台怎么玩？有故事听吗？',
    icon: '📻',
    answer: `📻 电台是放松耳朵的神器！点击顶部或地图上的【📻 磨耳朵电台】：\n\n1. 🌲 【MC探险故事】：里面有《雪原迷路小白狼》、《沙漠金字塔》、《突进下界要塞》等 7 部超长探险！\n2. 🏰 【经典童话寓言】：有《方块龟兔赛跑》、《三只小猪建房记》等 6 部趣味寓言！\n3. 👥 Alex 与 Steve 会交替讲故事，一边听一边有中文双语字幕！\n4. 🌙 【睡前定时关机】：可以点 15m 或 30m，听着故事睡觉，时间到了自动停止播放！`
  },
  {
    question: '怎么跟 Alex 语音连麦练习英语？',
    icon: '🗣️',
    answer: `🎙️ 想和 Alex 成为无话不谈的探险伙伴？超级简单：\n\n1. 点击主界面的【🗣️ Alex AI 对练】或在关卡中点击连麦；\n2. 长按麦克风 🎙️ 用英语对 Alex 说一句话（比如："Hi Alex, what are you crafting today?"）；\n3. 松开手后，Alex 会立刻用纯正美音回答你，还会夸你的发音好听哦！`
  },
  {
    question: '收集的词汇方块可以做什么？',
    icon: '⚔️',
    answer: `⚒️ 在方块世界里，你掌握的每一个英语单词都是一种神奇材料！\n\n点击【🛠️ 词汇合成台】：\n- 掌握名词和动词可以合成木镐、铁剑和钻石甲！\n- 掌握高级句型可以用来合成红石火把与红石中继器，用来搭建能真正运转的「红石英语密码门」！`
  },
  {
    question: '睡前想听故事，怎么设置定时关机？',
    icon: '🌙',
    answer: `😴 睡前磨耳朵最舒服啦！\n\n1. 打开【📻 沉浸磨耳朵电台】；\n2. 挑选一个你喜欢的频道（比如 MC 探险故事）；\n3. 在唱片下方找到带有月亮 🌙 的【定时关机】控制条；\n4. 点击【15m】或【30m】，右侧就会开始倒计时；\n5. 放心躺在被窝里听，倒计时结束时电台就会轻轻自动关机，不会吵醒你哦！`
  }
];

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  profile,
  currentUser,
  onOpenAuthModal,
  initialTab = 'guide'
}) => {
  const [activeTab, setActiveTab] = useState<CustomerServiceTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);
  
  // Guide messages state
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      sender: 'guide',
      text: `👋 嗨！勇敢的小探险家！我是你的方块世界【玩法小向导 🧭】！\n\n不管你是不知道从哪里开始探险，还是想知道怎么赚到更多绿宝石 💎，或者怎么听好玩的睡前故事，都可以随时问我哦！\n\n👇 点击下方的快捷问题，或者直接在下面打字问我吧！`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'guide') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isLoading]);

  // Clean up speech on close
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  if (!isOpen) return null;

  const handleSpeak = async (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      stopSpeech();
      setSpeakingMsgId(null);
      return;
    }
    stopSpeech();
    setSpeakingMsgId(msgId);
    // Clean text of emojis and symbols for clear TTS reading
    const cleanSpeech = text
      .replace(/[💎⭐📻🎮🗣️⚔️🌙🎉💰🎁👨‍👩‍👧🎙️⚒️😴👋👇]/g, '')
      .replace(/[#*`]/g, '');
    await speakText(cleanSpeech, { gender: 'female', lang: 'zh-CN' });
    setSpeakingMsgId(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    playClickSound();
    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Check if it matches preset questions for instant response
    const matchedPreset = KID_PLAY_PRESETS.find(p => p.question === text);
    if (matchedPreset) {
      setTimeout(() => {
        playEmeraldSound();
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'guide',
            text: matchedPreset.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
      return;
    }

    // Otherwise call AI Guide
    setIsLoading(true);
    try {
      const systemPrompt = `你现在是《Minecraft English 麦块英语》里的【方块世界玩法小向导】（一位热心幽默的村庄图书管理员向导，专门指导6~15岁小朋友玩这款英语学习软件）。
核心任务：热情、亲切、简单易懂地告诉小朋友这个软件怎么玩，鼓励他们开心学英语、拿绿宝石！
知识库参考：
1. 主线关卡：从世界地图第1课Excuse me开始，通过“三遍精听法”（盲听、看中文、麦克风跟读打分）通关并收集星星与绿宝石。
2. 磨耳朵电台：有MC探险故事（7篇）和经典童话寓言（6篇），Alex和Steve双人交替中英朗读，每听3分钟送2颗绿宝石，支持15/30/45分钟定时关机。
3. Alex AI对练：随时长按麦克风跟Alex连麦聊Minecraft，练纯正美式口语。
4. 词汇合成台与红石：掌握的单词会变成方块，在合成台合成装备，在红石工坊搭建密码门。
5. 家长护航：右上角有家长锁（PIN码保护），单次学满20分钟会自动弹护眼远眺提醒，家长还可以在家长中心直接发放赞赏绿宝石。
请用充满鼓励、充满Minecraft代入感的中文回答，分点清晰，语气温柔友好，字数适中。`;

      const aiReply = await sendChatMessageToAlex(
        text,
        systemPrompt,
        messages.map(m => ({
          id: m.id,
          sender: m.sender === 'user' ? 'user' : 'alex',
          text: m.text,
          timestamp: Date.now()
        }))
      );

      playEmeraldSound();
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'guide',
          text: aiReply || '向导收到啦！带上你的木剑和指南针，先去地图第一关试试三遍精听吧！',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'guide',
          text: '哎呀，红石信号有点闪烁！不过向导随时都在哦！建议你点击上面的快捷玩法卡片，或者去世界地图第 1 关开始探险吧！',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    playEmeraldSound();
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-4 border-slate-950 rounded-2xl w-full max-w-4xl h-[92vh] max-h-[780px] flex flex-col shadow-[8px_8px_0_0_#000] overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-3 sm:p-4 border-b-4 border-slate-950 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950/40 border-2 border-emerald-300 flex items-center justify-center shadow-inner">
              <Compass className="w-6 h-6 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-black text-base sm:text-lg tracking-wide text-white flex items-center gap-1.5">
                  <span>方块世界探险向导</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                    GUIDE
                  </span>
                </h2>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-100 font-mono">
                教你如何畅玩方块世界 • 赚绿宝石 • 听故事 • 练口语 • 新手全景手册
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              stopSpeech();
              onClose();
            }}
            className="p-1.5 bg-slate-950/40 hover:bg-slate-950/70 text-emerald-100 hover:text-white rounded-xl border border-emerald-400/40 transition-colors cursor-pointer"
            title="关闭向导"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950/90 border-b-2 border-slate-800 p-1.5 flex items-center gap-1 sm:gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('guide');
            }}
            className={`flex-1 min-w-[76px] sm:min-w-[90px] py-2 px-1.5 sm:px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer border ${
              activeTab === 'guide'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#000]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>向导问答</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('manual');
            }}
            className={`flex-1 min-w-[76px] sm:min-w-[90px] py-2 px-1.5 sm:px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer border ${
              activeTab === 'manual'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#000]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>学习指南</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('gameplay');
            }}
            className={`flex-1 min-w-[76px] sm:min-w-[90px] py-2 px-1.5 sm:px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer border ${
              activeTab === 'gameplay'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#000]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>玩法宝典</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('daily');
            }}
            className={`flex-1 min-w-[76px] sm:min-w-[90px] py-2 px-1.5 sm:px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer border ${
              activeTab === 'daily'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#000]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>今日任务</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('parents');
            }}
            className={`flex-1 min-w-[76px] sm:min-w-[90px] py-2 px-1.5 sm:px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer border ${
              activeTab === 'parents'
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[2px_2px_0_0_#000]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>家长/售后</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-slate-900/60">

          {/* TAB 1: 向导问答 (Ask the Guide) */}
          {activeTab === 'guide' && (
            <div className="flex flex-col h-full space-y-3">
              
              {/* Preset Quick Question Chips */}
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 shrink-0">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>点击想知道的玩法秘密：</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {KID_PLAY_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(preset.question)}
                      className="text-left bg-slate-900/90 hover:bg-emerald-950/70 border border-slate-700 hover:border-emerald-500/80 p-2 rounded-lg transition-all text-[11px] font-bold text-slate-200 hover:text-emerald-300 flex items-center space-x-1.5 group cursor-pointer"
                    >
                      <span className="text-sm shrink-0">{preset.icon}</span>
                      <span className="truncate">{preset.question}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-[220px]">
                {messages.map((msg) => {
                  const isGuide = msg.sender === 'guide';
                  const isSpeaking = speakingMsgId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-2.5 ${isGuide ? 'justify-start' : 'justify-end'}`}
                    >
                      {isGuide && (
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 border-2 border-slate-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                          <Compass className="w-4 h-4 text-slate-950" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[78%] p-3 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed border shadow-md relative ${
                          isGuide
                            ? 'bg-slate-800 text-slate-100 border-slate-700/80 rounded-tl-sm'
                            : 'bg-emerald-500 text-slate-950 font-medium border-emerald-600 rounded-tr-sm'
                        }`}
                      >
                        <div className="whitespace-pre-line break-words">
                          {msg.text}
                        </div>

                        {/* Speech & Timestamp Footer */}
                        <div className="mt-2 pt-1 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{msg.timestamp}</span>
                          {isGuide && (
                            <button
                              onClick={() => handleSpeak(msg.id, msg.text)}
                              className={`flex items-center space-x-1 px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                                isSpeaking
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                  : 'hover:bg-slate-700 text-slate-300'
                              }`}
                              title={isSpeaking ? '停止朗读' : '朗读给小朋友听'}
                            >
                              {isSpeaking ? (
                                <>
                                  <VolumeX className="w-3 h-3 text-amber-400 animate-pulse" />
                                  <span>正在朗读...</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-emerald-400" />
                                  <span>听向导说</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono p-2">
                    <Compass className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>小向导正在翻看方块指南书...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="shrink-0 flex items-center space-x-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="想知道怎么玩？直接打字问小向导吧..."
                  className="flex-1 bg-slate-950 border-2 border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-xl border-2 border-slate-950 shadow-[2px_2px_0_0_#000] flex items-center space-x-1 transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>发送</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: 学习指南 (Full Study Guide Manual) */}
          {activeTab === 'manual' && (
            <div className="h-full -m-3 sm:-m-4 overflow-hidden">
              <StudyGuideManualContent embedded={true} onClose={onClose} />
            </div>
          )}

          {/* TAB: 玩法宝典 (How to Play) */}
          {activeTab === 'gameplay' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/30 p-3 rounded-xl flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">方块世界 4 大核心玩法指引</h3>
                  <p className="text-xs text-slate-300">掌握这 4 大法宝，轻松成为最懂英语的 MC 小霸王！</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Gameplay 1: 主线闯关 */}
                <div className="bg-slate-800/80 border-2 border-slate-700 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <span className="p-1.5 bg-emerald-950 rounded-lg border border-emerald-600/40">🗡️</span>
                    <span>1. 三遍精听 · 主线闯关</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-white">第 1 遍盲听：</strong>不看文字，听标准美音猜场景；</li>
                    <li><strong className="text-white">第 2 遍对照：</strong>看中英文对照，搞懂生词意思；</li>
                    <li><strong className="text-white">第 3 遍跟读：</strong>长按麦克风大声朗读，系统实时打分评出 3 颗星！</li>
                  </ul>
                </div>

                {/* Gameplay 2: 磨耳朵电台 */}
                <div className="bg-slate-800/80 border-2 border-slate-700 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <span className="p-1.5 bg-amber-950 rounded-lg border border-amber-600/40">📻</span>
                    <span>2. 沉浸磨耳朵 · 睡前听故事</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-white">双大频道：</strong>包含 7 部 MC 原生冒险与 6 部伊索寓言；</li>
                    <li><strong className="text-white">双人旁白：</strong>Alex 与 Steve 轮流带你置身探险现场；</li>
                    <li><strong className="text-white">定时关机：</strong>支持 15/30/45 分钟倒计时自动关机！</li>
                  </ul>
                </div>

                {/* Gameplay 3: Alex AI 连麦 */}
                <div className="bg-slate-800/80 border-2 border-slate-700 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                    <span className="p-1.5 bg-indigo-950 rounded-lg border border-indigo-600/40">🗣️</span>
                    <span>3. Alex AI 语音连麦对练</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>像跟游戏搭子连麦一样，按住说话；</li>
                    <li>不用怕说错，Alex 会温柔地引导你并夸奖你的发音；</li>
                    <li>随时练习日常英语、Minecraft 道具问答与探险任务！</li>
                  </ul>
                </div>

                {/* Gameplay 4: 词汇合成与红石 */}
                <div className="bg-slate-800/80 border-2 border-slate-700 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                    <span className="p-1.5 bg-rose-950 rounded-lg border border-rose-600/40">⚒️</span>
                    <span>4. 词汇合成台与红石密码门</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>掌握的生词会自动转成原木、铁矿和红石材料；</li>
                    <li>在合成台拼装单词配方，铸造高阶武器；</li>
                    <li>在红石工坊搭建真实运转的机关密码门！</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 今日探险任务 (Daily Quests) */}
          {activeTab === 'daily' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-emerald-300">⭐ 今日探险轻量 3 步走</h3>
                  <p className="text-xs text-slate-400">每天只要 15 分钟，轻松积累大量绿宝石！</p>
                </div>
                <div className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-lg text-emerald-300 font-black text-xs">
                  💎 预计可得 +10 绿宝石
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">通关 1 个主线课句型</h4>
                      <p className="text-[11px] text-slate-400">在世界地图挑战关卡，完成跟读录音</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+5 💎</span>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">听 3 分钟磨耳朵电台</h4>
                      <p className="text-[11px] text-slate-400">听一段《雪原迷路小白狼》或寓言故事</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+2 💎</span>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">跟 Alex 聊一句日常问候</h4>
                      <p className="text-[11px] text-slate-400">用语音对 Alex 说声 "Hello, what's up?"</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400">+3 💎</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 家长中心与技术支持 (Parents & Support) */}
          {activeTab === 'parents' && (
            <div className="space-y-3.5">
              <div className="bg-slate-800/90 border-2 border-slate-700 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>家长专属护航提示</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  家长护航中心位于主界面右上角或个人中心，受 4 位独立 PIN 码保护。您可以随时为孩子设定<strong>单次学习限时（15/20/30分钟）</strong>、<strong>护眼强制远眺中断</strong>，以及<strong>查看真实学情词汇与发放赞赏绿宝石</strong>。
                </p>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-white">🔑 VIP 激活码怎么用？</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  在主界面右上角点击【💎 开通VIP】，输入 16 位专属激活码即可永久解锁全套 1~144 课！
                </p>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-white">💬 技术与售后服务联系</h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-xs font-mono text-slate-300">
                    客服微信：<strong className="text-emerald-400">MineEnglish_Support</strong>
                  </span>
                  <button
                    onClick={() => copyToClipboard('MineEnglish_Support')}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    {copiedText === 'MineEnglish_Support' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>复制微信号</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-950 border-t-2 border-slate-800 p-2.5 px-4 text-[11px] text-slate-400 font-mono flex items-center justify-between shrink-0">
          <span className="flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>方块世界探险小向导 · 伴你快乐学英语</span>
          </span>
          <span className="text-emerald-400 font-bold">
            💎 当前绿宝石：{profile.emeralds || 0}
          </span>
        </div>

      </div>
    </div>
  );
};

/* Floating Game Guide Button Component to replace old customer service button */
export const CustomerServiceFloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        playClickSound();
        onClick();
      }}
      className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 p-3 sm:px-4 sm:py-3 rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0_0_#000] flex items-center space-x-2 transition-all active:translate-y-0.5 group cursor-pointer"
      title="🧭 不知道怎么玩？点击让向导教你！"
    >
      <div className="relative">
        <Compass className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-slate-950" />
      </div>
      <span className="hidden sm:inline font-black font-mono text-xs text-slate-950">
        玩法向导 🧭
      </span>
    </button>
  );
};
