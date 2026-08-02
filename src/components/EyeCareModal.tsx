import React, { useState, useEffect } from 'react';
import { Eye, Coffee, CheckCircle, Clock } from 'lucide-react';
import { playClickSound, playEmeraldSound } from '../utils/audio';

interface EyeCareModalProps {
  continuousMinutes: number;
  onClose: () => void;
  onGrantReward: () => void;
}

export const EyeCareModal: React.FC<EyeCareModalProps> = ({
  continuousMinutes,
  onClose,
  onGrantReward
}) => {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [canResume, setCanResume] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResume(true);
    }
  }, [secondsLeft]);

  const handleFinishRest = () => {
    playEmeraldSound();
    onGrantReward(); // Give 5 emeralds for taking a healthy eye break!
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-4 border-[#487E2C] rounded-[2.5rem] w-full max-w-lg text-[#2D2D2D] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden text-center p-6 space-y-6 animate-in zoom-in-95">
        
        {/* Banner Graphic */}
        <div className="w-24 h-24 bg-green-100 border-4 border-[#487E2C] rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-md animate-bounce">
          🌱
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FF6321] text-white rounded-full text-xs font-mono font-black uppercase">
            <Eye className="w-4 h-4" />
            <span>护眼与健康休息提醒 (Eye Protection)</span>
          </div>
          <h2 className="text-xl font-black font-mono text-[#2D2D2D]">
            小探险家，你已经连续学习了 {continuousMinutes} 分钟啦！
          </h2>
          <p className="text-xs text-slate-600 font-bold max-w-sm mx-auto leading-relaxed">
            Alex 老师提醒你：保护眼睛非常重要！请站起来活动一下，看看窗外的绿色树木，喝一口水吧 🍵
          </p>
        </div>

        {/* Stretch exercises guidance */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-left text-xs font-mono space-y-2.5">
          <div className="font-black text-[#487E2C] flex items-center space-x-1.5">
            <Coffee className="w-4 h-4 text-[#487E2C]" />
            <span>Minecraft 护眼三部曲：</span>
          </div>
          <ul className="space-y-1 text-slate-700 font-bold pl-2">
            <li>1. 👁️ 眼睛转圈圈：眨眨眼，转动眼球看向四方</li>
            <li>2. 🌲 远眺大森林：向窗外看 6 米以外的绿植 20 秒</li>
            <li>3. 💧 补充水分：喝一口水，揉揉肩背 relax!</li>
          </ul>
        </div>

        {/* Rest countdown */}
        <div className="flex items-center justify-center space-x-2 font-mono font-black text-slate-700">
          <Clock className="w-5 h-5 text-[#FF6321] animate-spin" />
          <span>建议休息剩余：</span>
          <span className="text-lg text-[#FF6321] font-bold">{secondsLeft}s</span>
        </div>

        {/* Resume button */}
        <button
          onClick={() => {
            playClickSound();
            handleFinishRest();
          }}
          className={`w-full py-3.5 rounded-2xl font-mono font-black text-sm border-2 flex items-center justify-center space-x-2 transition-all ${
            canResume || secondsLeft <= 15
              ? 'bg-[#487E2C] hover:bg-[#355E20] border-black text-white shadow-[0_4px_0_0_#2A4718] transform hover:translate-y-0.5'
              : 'bg-slate-200 border-slate-400 text-slate-600 shadow-sm'
          }`}
        >
          <CheckCircle className="w-5 h-5 text-[#FFD700]" />
          <span>我已经完成远眺休息 (+5 ❇️ 奖赏绿宝石)</span>
        </button>

      </div>
    </div>
  );
};
