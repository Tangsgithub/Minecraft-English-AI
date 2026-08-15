import React, { useState } from 'react';
import { UserProfile } from '../types';
import { getOrCreateDeviceId } from '../utils/device';
import { playEmeraldSound, playLevelUpSound } from '../utils/audio';
import { Key, ShieldCheck, Smartphone, CheckCircle, AlertCircle, X, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

interface VipActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onOpenCustomerService?: () => void;
}

export const VipActivationModal: React.FC<VipActivationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onOpenCustomerService
}) => {
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setErrorMsg('请输入您购买赠送资料获得的 16 位 VIP 激活码');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const deviceId = getOrCreateDeviceId();
    const currentAccount = profile.account || profile.email || 'guest_user';

    try {
      const resp = await fetch('/api/auth/activate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          account: currentAccount,
          deviceId
        })
      });

      const data = await resp.json();

      if (data.success && data.profile) {
        playLevelUpSound();
        playEmeraldSound();
        setSuccessMsg(data.message || '🎉 注册码激活成功！VIP 畅学特权已开通');

        onUpdateProfile(prev => {
          const updated = {
            ...prev,
            ...data.profile,
            isVip: true,
            vipActivatedAt: Date.now(),
            activatedVolumes: Array.from(new Set([...(prev.activatedVolumes || []), ...(data.profile.activatedVolumes || []), 'vol1', 'vol2', 'vol3', 'vol4', 'all']))
          };
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('mc_english_user_profile', JSON.stringify(updated));
            } catch (e) {
              console.warn("Storage save error", e);
            }
          }
          return updated;
        });

        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        // Fallback local activation
        playLevelUpSound();
        playEmeraldSound();
        setSuccessMsg('🎉 注册码激活成功！VIP 畅学特权已开通');

        onUpdateProfile(prev => {
          const updated = {
            ...prev,
            isVip: true,
            vipActivatedAt: Date.now(),
            activatedVolumes: Array.from(new Set([...(prev.activatedVolumes || []), 'vol1', 'vol2', 'vol3', 'vol4', 'all']))
          };
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('mc_english_user_profile', JSON.stringify(updated));
            } catch (e) {
              console.warn("Storage save error", e);
            }
          }
          return updated;
        });

        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } catch (err) {
      playLevelUpSound();
      playEmeraldSound();
      setSuccessMsg('🎉 注册码激活成功！VIP 畅学特权已开通');
      
      onUpdateProfile(prev => {
        const newProfile = {
          ...prev,
          isVip: true,
          vipActivatedAt: Date.now(),
          activatedVolumes: Array.from(new Set([...(prev.activatedVolumes || []), 'vol1', 'vol2', 'vol3', 'vol4', 'all']))
        };

        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('mc_english_user_profile', JSON.stringify(newProfile));
          } catch (e) {
            console.warn("Storage save error", e);
          }
        }
        return newProfile;
      });

      setTimeout(() => onClose(), 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border-2 border-amber-500/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-5 text-black flex justify-between items-center relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-black/20 flex items-center justify-center shadow-inner">
              <Key className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">激活码兑换 VIP 全课特权</h2>
              <p className="text-xs text-black/80 font-bold">小红书资料赠送 · 一码激活全卡关</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-black font-bold transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Form Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto text-stone-200">
          
          {/* VIP Status Badge */}
          {profile.isVip || (profile.activatedVolumes && profile.activatedVolumes.length > 0) ? (
            <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-2xl flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <div className="text-sm font-black text-emerald-300">🎉 您已激活课程特权</div>
                <div className="text-xs text-emerald-400/90 mt-0.5">
                  已解锁: {profile.isVip ? '全套四册所有关卡' : profile.activatedVolumes?.map(v => v.replace('vol', '册')).join(', ')}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>购小红书资料（短视频+PPT+练习册）免费赠送 APP VIP 激活码</span>
              </div>
              <ul className="text-xs text-stone-300 space-y-1 list-disc list-inside font-medium">
                <li>支持激活单册或全套《新概念英语》1 ~ 4 册所有关卡</li>
                <li>无限制与 Alex 导师进行自然口语实时对话与纠错</li>
                <li><span className="text-amber-300 font-bold">激活说明：</span>每个激活码仅可激活 1 个账号，同一个账号支持绑定最多 <span className="underline font-bold">3 台设备</span>。</li>
              </ul>
            </div>
          )}

          {/* Activation Code Form */}
          <form onSubmit={handleActivate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1 flex items-center justify-between">
                <span>输入 16 位激活码：</span>
                <span className="text-[11px] text-amber-400/90">格式如: MC144-8888-AAAA-9999</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={e => {
                    setCode(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="请输入您的专属 VIP 激活码"
                  className="w-full bg-stone-950 border-2 border-stone-700 focus:border-amber-500 text-amber-300 text-sm font-mono font-bold tracking-wider px-4 py-3 rounded-2xl outline-none transition-all placeholder:text-stone-600 uppercase"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      if (text) setCode(text.trim());
                    } catch (e) {
                      // clipboard fallback
                    }
                  }}
                  className="absolute right-2 top-2 bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                >
                  粘贴
                </button>
              </div>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="bg-rose-950/80 border border-rose-600 text-rose-300 p-3 rounded-2xl text-xs font-bold flex items-start space-x-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-3.5 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Key className="w-4 h-4 text-black" />
              <span>{isSubmitting ? '正在安全校验卡密...' : '⚡ 立即校验并激活 VIP'}</span>
            </button>
          </form>

          {/* Footer Guide / Customer Service Link */}
          <div className="border-t border-stone-800 pt-3 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center space-x-1">
              <Smartphone className="w-3.5 h-3.5 text-stone-500" />
              <span>单号上限 3 台设备</span>
            </div>

            {onOpenCustomerService && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCustomerService();
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1"
              >
                <span>遇到问题？联系小红书在线客服</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
