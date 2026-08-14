import React from 'react';

interface MinecraftAvatarProps {
  speaker?: string;
  avatar?: string;
  size?: number;
  className?: string;
}

export const MinecraftAvatar: React.FC<MinecraftAvatarProps> = ({
  speaker = 'Steve',
  avatar,
  size = 40,
  className = ''
}) => {
  const name = (speaker || '').toLowerCase();

  const isAlex = name.includes('alex') || name.includes('girl') || name.includes('woman') || name.includes('alice') || name.includes('carol') || name.includes('pauline') || avatar === '👩' || avatar === '👩‍🦰';
  const isVillager = name.includes('villager') || name.includes('trader') || name.includes('shopkeeper') || name.includes('boss');
  const isCreeper = name.includes('creeper');
  const isZombie = name.includes('zombie');

  if (isAlex) {
    // Pixel-perfect Minecraft Alex Head SVG
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 rounded-md border-2 border-amber-950 shadow-xs bg-[#B04B18] overflow-hidden ${className}`}
        style={{ width: size, height: size }}
        title="Alex 老师"
      >
        <svg width="100%" height="100%" viewBox="0 0 16 16" className="shape-rendering-crisp">
          {/* Hair Base */}
          <rect width="16" height="16" fill="#C25920" />
          {/* Face Skin */}
          <rect x="2" y="4" width="12" height="11" fill="#E8B898" />
          {/* Bangs & Side Hair */}
          <rect x="0" y="0" width="16" height="4" fill="#C25920" />
          <rect x="0" y="4" width="3" height="9" fill="#B04B18" />
          <rect x="13" y="4" width="3" height="7" fill="#B04B18" />
          <rect x="3" y="4" width="2" height="2" fill="#B04B18" />
          {/* Eyes (Green & White) */}
          <rect x="3" y="7" width="3" height="2" fill="#FFFFFF" />
          <rect x="4" y="7" width="2" height="2" fill="#2E8B57" />
          <rect x="10" y="7" width="3" height="2" fill="#FFFFFF" />
          <rect x="10" y="7" width="2" height="2" fill="#2E8B57" />
          {/* Lips */}
          <rect x="6" y="11" width="4" height="1" fill="#C76B58" />
        </svg>
      </div>
    );
  }

  if (isVillager) {
    // Pixel-perfect Minecraft Villager Head SVG
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 rounded-md border-2 border-stone-900 shadow-xs bg-[#5B3E22] overflow-hidden ${className}`}
        style={{ width: size, height: size }}
        title="村民NPC"
      >
        <svg width="100%" height="100%" viewBox="0 0 16 16" className="shape-rendering-crisp">
          <rect width="16" height="16" fill="#8B5A2B" />
          <rect x="2" y="2" width="12" height="12" fill="#C49A6C" />
          {/* Unibrow */}
          <rect x="3" y="6" width="10" height="1" fill="#4A3525" />
          {/* Eyes */}
          <rect x="3" y="7" width="2" height="2" fill="#FFFFFF" />
          <rect x="4" y="7" width="1" height="2" fill="#2E8B57" />
          <rect x="11" y="7" width="2" height="2" fill="#FFFFFF" />
          <rect x="11" y="7" width="1" height="2" fill="#2E8B57" />
          {/* Large Nose */}
          <rect x="6" y="8" width="4" height="5" fill="#A87A50" />
        </svg>
      </div>
    );
  }

  if (isCreeper) {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 rounded-md border-2 border-emerald-950 shadow-xs bg-[#41AD32] overflow-hidden ${className}`}
        style={{ width: size, height: size }}
        title="苦力怕"
      >
        <svg width="100%" height="100%" viewBox="0 0 16 16" className="shape-rendering-crisp">
          <rect width="16" height="16" fill="#52C43F" />
          {/* Eyes */}
          <rect x="2" y="3" width="4" height="4" fill="#000000" />
          <rect x="10" y="3" width="4" height="4" fill="#000000" />
          {/* Nose/Mouth */}
          <rect x="6" y="7" width="4" height="5" fill="#000000" />
          <rect x="4" y="9" width="2" height="6" fill="#000000" />
          <rect x="10" y="9" width="2" height="6" fill="#000000" />
        </svg>
      </div>
    );
  }

  if (isZombie) {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 rounded-md border-2 border-emerald-950 shadow-xs bg-[#2E6B48] overflow-hidden ${className}`}
        style={{ width: size, height: size }}
        title="僵尸"
      >
        <svg width="100%" height="100%" viewBox="0 0 16 16" className="shape-rendering-crisp">
          <rect width="16" height="16" fill="#3B8259" />
          <rect x="0" y="0" width="16" height="4" fill="#1E4731" />
          {/* Eyes */}
          <rect x="2" y="7" width="3" height="2" fill="#000000" />
          <rect x="3" y="7" width="2" height="2" fill="#1C5E85" />
          <rect x="11" y="7" width="3" height="2" fill="#000000" />
          <rect x="11" y="7" width="2" height="2" fill="#1C5E85" />
          {/* Nose */}
          <rect x="7" y="9" width="2" height="2" fill="#245439" />
        </svg>
      </div>
    );
  }

  // Default: Pixel-perfect Minecraft Steve Head SVG
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 rounded-md border-2 border-slate-950 shadow-xs bg-[#42220F] overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      title="Steve 史蒂夫"
    >
      <svg width="100%" height="100%" viewBox="0 0 16 16" className="shape-rendering-crisp">
        {/* Skin */}
        <rect width="16" height="16" fill="#BD8B62" />
        {/* Hair */}
        <rect x="0" y="0" width="16" height="4" fill="#42220F" />
        <rect x="0" y="4" width="2" height="4" fill="#42220F" />
        <rect x="14" y="4" width="2" height="4" fill="#42220F" />
        {/* Eyes (White + Indigo/Cyan) */}
        <rect x="2" y="7" width="3" height="2" fill="#FFFFFF" />
        <rect x="3" y="7" width="2" height="2" fill="#2E5288" />
        <rect x="11" y="7" width="3" height="2" fill="#FFFFFF" />
        <rect x="11" y="7" width="2" height="2" fill="#2E5288" />
        {/* Nose */}
        <rect x="7" y="9" width="2" height="1" fill="#996947" />
        {/* Beard/Mouth */}
        <rect x="5" y="11" width="6" height="2" fill="#54301A" />
        <rect x="6" y="11" width="4" height="1" fill="#CC8870" />
      </svg>
    </div>
  );
};
