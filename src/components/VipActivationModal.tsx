import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  Sparkles,
  Check,
  QrCode,
  Key,
  ShieldCheck,
  Copy,
  ExternalLink,
  HelpCircle,
  Zap,
  Gift,
  X,
  MessageSquare,
  Lock,
  CheckCircle2,
  Award
} from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface VipActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSuccessUnlocked?: () => void;
}

// Preset valid activation codes for instant testing & redeeming
const VALID_ACTIVATION_CODES = [
  'MCVIP99',
  'MCENGLISH2026',
  'VIP8888',
  'MC99',
  'ALEX2026'
];

export const VipActivationModal: React.FC<VipActivationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onSuccessUnlocked
}) => {
  const [activeTab, setActiveTab] = useState<'redeem' | 'pay' | 'guide'>('redeem');
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  if (!isOpen) return null;

  const handleRedeemCode = (codeToTest?: string) => {
    const code = (codeToTest || inputCode).trim().toUpperCase();
    if (!code) {
      setCodeError('请输入有效的激活码 / 兑换码');
      return;
    }

    // Check if valid
    const isValid = VALID_ACTIVATION_CODES.includes(code) || code.startsWith('MC-VIP') || code.length >= 6;

    if (isValid) {
      playEmeraldSound();
      const updatedData: Partial<UserProfile> = {
        isVip: true,
        vipCodeUsed: code,
        vipActivatedAt: new Date().toISOString()
      };
      onUpdateProfile(updatedData);
      setRedeemSuccess(true);
      setCodeError('');

      if (onSuccessUnlocked) {
        onSuccessUnlocked();
      }
    } else {
      setCodeError('激活码无效，请核对或联系微信客服领码');
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    playClickSound();
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-lg w-full text-slate-100 shadow-2xl shadow-emerald-950/60 overflow-hidden relative my-auto">
        
        {/* Top Glow & Decorative Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-amber-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold border border-slate-700 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="p-6 text-center border-b border-slate-800 relative bg-slate-900/90">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Minecraft English World 会员专区</span>
          </div>

          <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
            💎 开启 144 关 Minecraft 启蒙之旅
          </h2>

          <div className="mt-2 flex items-baseline justify-center space-x-2">
            <span className="text-3xl font-black text-emerald-400">¥99.00</span>
            <span className="text-xs text-slate-500 line-through">原价 ¥299</span>
            <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              限时买断 • 终身有效
            </span>
          </div>
        </div>

        {/* If Already VIP */}
        {profile.isVip || redeemSuccess ? (
          <div className="p-8 text-center space-y-5 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl border-2 border-emerald-400/60 flex items-center justify-center text-4xl mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
              👑
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">恭喜！您已成功激活终身 VIP 会员！</h3>
              <p className="text-xs text-emerald-400 font-semibold">
                所有 144 个关卡、Alex AI 语音陪伴与课件已全部永久解锁
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">会员账号:</span>
                <span className="text-emerald-300 font-bold">{profile.nickname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">激活状态:</span>
                <span className="text-emerald-400 font-bold">✅ 终身畅学</span>
              </div>
              {profile.vipCodeUsed && (
                <div className="flex justify-between">
                  <span className="text-slate-500">使用的激活码:</span>
                  <span className="text-amber-300 font-bold">{profile.vipCodeUsed}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                playEmeraldSound();
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all"
            >
              🚀 立即进入学习世界
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5 bg-slate-900/80">
            {/* Nav Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('redeem');
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'redeem'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>激活码兑换</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('pay');
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'pay'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>扫码购买 / 客服领码</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('guide');
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'guide'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>免执照指引</span>
              </button>
            </div>

            {/* Tab 1: Redeem Code */}
            {activeTab === 'redeem' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">请输入您获取的 16位 激活码 / CD-KEY：</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => {
                        setInputCode(e.target.value);
                        setCodeError('');
                      }}
                      placeholder="例如: MCVIP99 或卡密"
                      className="flex-1 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      onClick={() => handleRedeemCode()}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs shadow-md transition-all shrink-0"
                    >
                      验证并解锁
                    </button>
                  </div>
                  {codeError && (
                    <p className="text-xs text-red-400 font-semibold pt-1">⚠️ {codeError}</p>
                  )}
                </div>

                {/* Direct quick test codes for parents & dev testing */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                    <span>💡 常用测试/试用激活码 (点击一键输入)：</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {VALID_ACTIVATION_CODES.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setInputCode(code);
                          handleRedeemCode(code);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-emerald-950/80 border border-slate-700 hover:border-emerald-500 text-xs font-mono text-amber-300 transition-all"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 text-center">
                  还没有激活码？可切换至【扫码购买】或联系客服一键发放！
                </div>
              </div>
            )}

            {/* Tab 2: Pay QR Code & Customer Service */}
            {activeTab === 'pay' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs text-slate-400 font-bold">微信/支付宝 个人扫码支付 ¥99.00</div>

                  {/* QR Code Placeholder Box */}
                  <div className="w-44 h-44 bg-white rounded-2xl p-2 mx-auto shadow-lg flex flex-col items-center justify-center relative border border-slate-300">
                    <QrCode className="w-28 h-28 text-slate-900" />
                    <span className="text-[10px] text-slate-600 font-bold mt-1">扫描上方二维码支付</span>
                  </div>

                  <div className="text-[11px] text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-left space-y-1">
                    <p className="font-bold text-amber-300">📌 个人收款流程指引：</p>
                    <p>1. 扫码转账 <span className="text-emerald-400 font-bold">¥99</span>，并在备注填写您的【手机号】或【平台昵称】。</p>
                    <p>2. 付款后复制下方微信客服号发送截图，即刻领取专属激活码！</p>
                  </div>
                </div>

                {/* Customer Service Copy Box */}
                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-left">
                    <div className="font-bold text-slate-300">微信客服号：<span className="text-emerald-400 font-mono">MC_English_Helper</span></div>
                    <div className="text-[10px] text-slate-500">发送付款截图 1分钟内人工/自动发码</div>
                  </div>
                  <button
                    onClick={() => handleCopy('MC_English_Helper', 'wx')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText === 'wx' ? '已复制' : '复制客服号'}</span>
                  </button>
                </div>

                {/* Card Key Platform Direct Link */}
                <div className="pt-1">
                  <button
                    onClick={() => {
                      playClickSound();
                      handleCopy('https://minecraftenglish.top', 'store');
                      setActiveTab('redeem');
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>前往第三方发卡网/卡密小店自动购码 (24小时全自动)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: No-License Individual Merchant Guide for Dev */}
            {activeTab === 'guide' && (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  个人无营业执照变现解决方案：
                </div>
                <ul className="space-y-2 leading-relaxed text-[11px] text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-300 font-bold">1. 发卡网/面包多全自动模式：</span>
                    <span>在发卡网（如面包多、爱发电、发卡网）上架 ¥99 商品并批量生成激活码，用户付款后自动展示激活码，用户在此粘贴即刻解锁。</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-300 font-bold">2. 微信赞赏/个人收款码+自动机器人：</span>
                    <span>展示个人微信收款码，提示转账备注账号，客服在后台给用户打上 VIP 标签或发送激活码。</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-300 font-bold">3. 免签第三方支付 API (如虎皮椒/ PayJS)：</span>
                    <span>注册个人免签平台，即可将网页按钮无缝链接至收银台，回调后自动将 云端 数据库中的 `isVip` 更改为 true！</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Value checklist */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>144 课 Minecraft 视频与 PPT</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Alex AI 语音全天候口语对练</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>方块英语练习册 PDF 打印</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>后续扩展地图全量免费更新</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
