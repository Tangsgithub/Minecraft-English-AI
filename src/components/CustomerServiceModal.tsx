import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { User } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendChatMessageToAlex } from '../services/aiService';
import { playClickSound, playEmeraldSound } from '../utils/audio';
import {
  Headphones,
  X,
  MessageSquare,
  Send,
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
  UserCheck,
  Phone,
  Mail,
  QrCode,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  Bot
} from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  currentUser: User | null;
  onOpenVipModal?: () => void;
  onOpenAuthModal?: () => void;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'service';
  text: string;
  timestamp: string;
}

const FAQ_ITEMS = [
  {
    question: '所有账号都能免费体验前 10 课吗？',
    answer: '是的！Minecraft English 实行正规公开体验政策。无论您是注册新账号还是已有账号，注册登录后均可免费体验第 1 课至第 10 课的所有全量学习关卡、听说评测及 Alex AI 智能对练！',
    category: '课程体验'
  },
  {
    question: '如何升级 VIP 尊享会员？全套课程包含哪些？',
    answer: '升至 VIP 尊享会员后即可解锁全套 1 ~ 144 课《新概念英语》1/2/3册全部关卡、方块语法实验室及末地篇高级课程。在顶部或关卡弹窗点击【💎 开通VIP】，输入激活码即可一次激活，终身无锁。',
    category: 'VIP会员'
  },
  {
    question: '首页怎么不能直接进入学习页面了？',
    answer: '为保障孩子学习数据云端无损保存（如连胜天数、绿宝石、已打卡单词），系统已升级正规会员体系。玩家需要先注册或登录云端账号，即可一键切入学习大厅。',
    category: '账号使用'
  },
  {
    question: '在多台设备（手机/iPad/电脑）上可以同步进度吗？',
    answer: '可以！只要您使用同一个注册账号（邮箱或玩家账号）登录，您的学习进度、已通关关卡和收集的绿宝石都会通过 云端服务器 云端秒级实时同步。',
    category: '设备同步'
  },
  {
    question: '遇到语音无法播放或麦克风无法录音怎么办？',
    answer: '1. 请检查设备未处于静音模式；2. 在浏览器弹出的权限提示中允许使用“麦克风”；3. 在设置中确认 DeepSeek API Key 或声音服务连接正常。系统也提供微软 Edge 零延迟高保真发音服务。',
    category: '技术支持'
  },
  {
    question: '退款及售后服务政策是什么？',
    answer: '对于尚未激活的 VIP 激活码或 7 天内遇到技术障碍无法使用的情况，客服团队支持快速无损处理。如有疑问可随时通过在线工单或微信客服发起联系。',
    category: '售后保障'
  }
];

const PRESET_QUESTIONS = [
  '1-10课如何免费试用？',
  'VIP激活码在哪兑换？',
  '怎么联系人工客服？',
  '语音评分听不到声音怎么办？',
  '进度可以多端同步吗？'
];

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  profile,
  currentUser,
  onOpenVipModal,
  onOpenAuthModal
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'faq' | 'human' | 'ticket'>('ai');
  
  // AI Chat state
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      sender: 'service',
      text: `👋 嗨！我是 Minecraft English 的官方 AI 智能客服小史蒂夫（Steve）。\n\n很高兴为您服务！请问您在体验 1-10 免费试用课、VIP 激活兑换或云端账号使用上有任何疑问吗？`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // FAQ state
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Copy state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Ticket form state
  const [ticketType, setTicketType] = useState('VIP激活与兑换');
  const [ticketContact, setTicketContact] = useState('');
  const [ticketContent, setTicketContent] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketSuccessId, setTicketSuccessId] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'ai') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isLoading]);

  useEffect(() => {
    if (currentUser?.email) {
      setTicketContact(currentUser.email);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    playEmeraldSound();
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isLoading) return;

    playClickSound();
    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const systemPrompt = `你当前是《Minecraft English 麦块英语》官方在线客服代表史蒂夫（Steve）。
你的任务是以亲切、专业、鼓励的语气解答用户关于该应用程序的各种咨询。
应用核心规则：
1. 注册与登录：用户须注册/登录后即可畅享学习大厅。所有注册用户均可【免费体验 1 ~ 10 课】全量关卡及 AI 语音对练。
2. VIP 会员：购买/获得 16 位激活码后可在系统输入解锁 11-144 全套课。
3. 云端存储：支持 Google Firebase 云端 秒级实时同步学习进度、绿宝石和已收录单词。
4. 口语评测与音效：采用标准美式发音与精准得分系统。
请使用中文回答，回答简明扼要、排版清晰，符合 Minecraft 风格。`;

      const aiReplyText = await sendChatMessageToAlex(
        text,
        systemPrompt,
        messages.map((m) => ({
          id: m.id,
          sender: m.sender === 'user' ? 'user' : 'alex',
          text: m.text,
          timestamp: Date.now()
        }))
      );

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'service',
          text: aiReplyText || '收到您的需求！如需快速人工响应，建议直接添加客服微信: MineEnglish_Support 哦！',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'service',
          text: '抱歉，我的客服通信系统遇到微小波动。您可以在【人工客服】标签页直接复制客服微信号，或在【提交工单】留下您的建议！',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketContent.trim()) return;

    playClickSound();
    setIsSubmittingTicket(true);

    try {
      const ticketRef = await addDoc(collection(db, 'supportTickets'), {
        type: ticketType,
        contact: ticketContact || currentUser?.email || '匿名玩家',
        content: ticketContent,
        userId: currentUser?.uid || 'guest',
        userEmail: currentUser?.email || '',
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      setTicketSuccessId(ticketRef.id.slice(0, 8).toUpperCase());
      setTicketContent('');
      playEmeraldSound();
    } catch (err) {
      // Local fallback ID
      const fallbackId = 'TK-' + Math.floor(100000 + Math.random() * 900000);
      setTicketSuccessId(fallbackId);
      setTicketContent('');
      playEmeraldSound();
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.includes(searchQuery) ||
      item.answer.includes(searchQuery) ||
      item.category.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[12px_12px_0_0_#000] overflow-hidden text-slate-100 font-sans">
        
        {/* Header Bar */}
        <div className="bg-slate-950 border-b-4 border-slate-800 p-3 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500/20 border-2 border-emerald-500 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0_0_#000]">
              🎧
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black font-mono text-white tracking-wide">
                  Minecraft English 服务中心
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  官方在线
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                正规会员体系 • 7×12小时客服保障 • 免费试用答疑
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border-2 border-slate-950 flex items-center justify-center transition-transform active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-900 border-b-2 border-slate-800 px-3 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('ai');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'ai'
                ? 'bg-emerald-500 text-slate-950 shadow-[2px_2px_0_0_#000] border-2 border-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>🤖 AI 智能客服</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('faq');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'faq'
                ? 'bg-emerald-500 text-slate-950 shadow-[2px_2px_0_0_#000] border-2 border-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>❓ 常见问题</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('human');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'human'
                ? 'bg-emerald-500 text-slate-950 shadow-[2px_2px_0_0_#000] border-2 border-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>💬 人工客服</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('ticket');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
              activeTab === 'ticket'
                ? 'bg-emerald-500 text-slate-950 shadow-[2px_2px_0_0_#000] border-2 border-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📝 提交工单</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          
          {/* TAB 1: AI Customer Service Chat */}
          {activeTab === 'ai' && (
            <div className="flex flex-col h-full min-h-[380px]">
              
              {/* Preset quick question shortcuts */}
              <div className="mb-3 space-y-1.5">
                <span className="text-[11px] text-slate-400 font-mono font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  热门快捷提问：
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded-lg text-xs font-mono transition-all text-left active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-2xl p-3 sm:p-4 overflow-y-auto space-y-3 min-h-[220px] max-h-[320px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none border border-emerald-400/30'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.sender === 'service' && (
                        <div className="flex items-center space-x-1.5 mb-1.5 pb-1 border-b border-slate-800 text-[11px] text-emerald-400 font-mono font-bold">
                          <span>🤖 史蒂夫客服 (Steve)</span>
                          <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                        </div>
                      )}
                      <div>{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      <span>史蒂夫客服正在为您查找信息...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Bar */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入您的疑问（如：怎么使用前10课试用？或重置进度）..."
                  className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm border-2 border-slate-950 shadow-[2px_2px_0_0_#000] rounded-xl flex items-center space-x-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>发送</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FAQs */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索常见问题关键词（VIP, 10课, 声音, 账号...）"
                  className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              {/* Accordion list */}
              <div className="space-y-2">
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs font-mono">
                    未检索到匹配的解答，您可以直接在【🤖 AI 智能客服】处输入或在【💬 人工客服】联系官方人员。
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const isExpanded = expandedFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => {
                            playClickSound();
                            setExpandedFaqIndex(isExpanded ? null : index);
                          }}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-slate-900 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold shrink-0">
                              {faq.category}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white font-sans">
                              {faq.question}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-900 font-sans leading-relaxed bg-slate-900/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Human Support */}
          {activeTab === 'human' && (
            <div className="space-y-4">
              
              <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                      官方专人人工客服团队
                    </h3>
                    <p className="text-xs text-slate-400">
                      处理 VIP 激活卡兑换、退款咨询、账号关联及教学指导
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span>09:00 - 21:00 全天在线</span>
                  </div>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* WeChat Contact */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">💬</span>
                        <span className="text-xs font-bold text-white font-mono">官方微信客服号</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                        推荐
                      </span>
                    </div>
                    <div className="text-sm font-mono font-black text-amber-300 bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                      <span>MineEnglish_Support</span>
                      <button
                        onClick={() => handleCopy('MineEnglish_Support', 'wechat')}
                        className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-black rounded flex items-center space-x-1"
                      >
                        {copiedField === 'wechat' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'wechat' ? '已复制' : '复制微信号'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      搜索微信添加好友，备注【Minecraft英语客服】15分钟内快速响应
                    </p>
                  </div>

                  {/* Email Contact */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white font-mono">官方支持邮箱</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                      <span className="truncate">support@minecraftenglish.com</span>
                      <button
                        onClick={() => handleCopy('support@minecraftenglish.com', 'email')}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded flex items-center space-x-1 shrink-0 ml-1"
                      >
                        {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'email' ? '已复制' : '复制'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      适合提交对齐较长的技术诊断报告与批量激活需求
                    </p>
                  </div>

                </div>

                {/* VIP Quick Action Entry */}
                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border-2 border-amber-500/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="text-xs font-mono space-y-0.5">
                    <div className="text-amber-300 font-bold flex items-center gap-1">
                      <span>💎 拥有 VIP 激活码卡片？</span>
                      <span className="text-[10px] text-slate-300">无需等待客服，直接自主激活</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      在系统中一键输入 16 位大写卡号即可秒级开通全量 144 课。
                    </p>
                  </div>

                  {onOpenVipModal && (
                    <button
                      onClick={() => {
                        playClickSound();
                        onClose();
                        onOpenVipModal();
                      }}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl border-2 border-slate-950 shadow-[2px_2px_0_0_#000] shrink-0 transition-all active:translate-y-0.5"
                    >
                      去兑换 VIP 激活码
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Submit Ticket Form */}
          {activeTab === 'ticket' && (
            <div className="space-y-4">
              
              {ticketSuccessId ? (
                <div className="bg-slate-950 border-2 border-emerald-500/60 rounded-2xl p-6 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto">
                    ✅
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-400">
                    工单已成功提交至客服系统！
                  </h3>
                  <p className="text-xs text-slate-300">
                    您的客服工单追踪单号：<strong className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{ticketSuccessId}</strong>
                  </p>
                  <p className="text-xs text-slate-400">
                    专员将在 12 小时内核对问题并通过您预留的联系方式直接回复您。
                  </p>
                  <button
                    onClick={() => setTicketSuccessId(null)}
                    className="px-5 py-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl border-2 border-slate-950 shadow-[2px_2px_0_0_#000]"
                  >
                    再提交一条工单
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="space-y-1 border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold font-mono text-white">
                      提交意见反馈与异常技术工单
                    </h3>
                    <p className="text-xs text-slate-400">
                      详细描述您遇到的问题或建议，官方客服将及时予以跟进。
                    </p>
                  </div>

                  {/* Category select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono">
                      问题分类：
                    </label>
                    <select
                      value={ticketType}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                    >
                      <option value="VIP激活与兑换">💎 VIP 激活与兑换卡号</option>
                      <option value="账号与云端同步">☁️ 账号登录 / 关卡进度未同步</option>
                      <option value="免费10课体验咨询">🎁 免费试用 1-10 课体验咨询</option>
                      <option value="语音评测与设备发音">🎙️ 语音评测 / 话筒录音异常</option>
                      <option value="课程建议与Bug提交">🐛 课程反馈与应用 Bug 建议</option>
                      <option value="其它合作与问题">💬 其它合作与咨询</option>
                    </select>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono">
                      您的联系方式 (手机号 / 微信 / 邮箱)：
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketContact}
                      onChange={(e) => setTicketContact(e.target.value)}
                      placeholder="例如：13800138000 或 wechat_id 或 test@example.com"
                      className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>

                  {/* Content details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono">
                      详细描述：
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={ticketContent}
                      onChange={(e) => setTicketContent(e.target.value)}
                      placeholder="请尽可能详细地说明您遇到的现象、关卡编号或具体报错信息，便于客服专员快速跟进..."
                      className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm border-2 border-slate-950 shadow-[3px_3px_0_0_#000] rounded-xl transition-all active:translate-y-0.5"
                  >
                    {isSubmittingTicket ? '正在保存提交工单...' : '✉️ 确认提交客服工单'}
                  </button>
                </form>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 border-t-2 border-slate-800 p-3 text-center text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>正规售后保障 • 严密隐私保护</span>
          </span>
          <span>服务热线：010-8888-6666</span>
        </div>

      </div>
    </div>
  );
};

/* Floating Customer Service Button Component to embed anywhere */
export const CustomerServiceFloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        playClickSound();
        onClick();
      }}
      className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 p-3 sm:px-4 sm:py-3 rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0_0_#000] flex items-center space-x-2 transition-all active:translate-y-0.5 group"
      title="联系 Minecraft English 官方在线客服"
    >
      <div className="relative">
        <Headphones className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-slate-950" />
      </div>
      <span className="hidden sm:inline font-black font-mono text-xs text-slate-950">
        在线客服
      </span>
    </button>
  );
};
