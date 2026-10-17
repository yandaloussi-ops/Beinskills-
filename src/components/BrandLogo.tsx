import React from 'react';

export const LOGO_IMAGE_URL = '/src/assets/images/beinskills_logo_1792099109840.jpg';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  showSlogan?: boolean;
  sloganText?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  showBadge = false,
  badgeText,
  showSlogan = false,
  sloganText,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    xs: {
      imageSize: 'w-7 h-7',
      textSize: 'text-base',
      badgeSize: 'text-[9px] px-1.5 py-0.2',
      sloganSize: 'text-[9px]',
      containerGap: 'gap-2',
    },
    sm: {
      imageSize: 'w-8 h-8 sm:w-9 sm:h-9',
      textSize: 'text-lg sm:text-xl',
      badgeSize: 'text-[10px] px-2 py-0.5',
      sloganSize: 'text-[10px]',
      containerGap: 'gap-2.5',
    },
    md: {
      imageSize: 'w-10 h-10 sm:w-11 sm:h-11',
      textSize: 'text-xl sm:text-2xl',
      badgeSize: 'text-xs px-2.5 py-0.5',
      sloganSize: 'text-xs',
      containerGap: 'gap-3',
    },
    lg: {
      imageSize: 'w-14 h-14 sm:w-16 sm:h-16',
      textSize: 'text-2xl sm:text-3xl',
      badgeSize: 'text-xs px-3 py-1',
      sloganSize: 'text-sm',
      containerGap: 'gap-3.5',
    },
    xl: {
      imageSize: 'w-24 h-24 sm:w-28 sm:h-28',
      textSize: 'text-4xl sm:text-5xl',
      badgeSize: 'text-sm px-3.5 py-1',
      sloganSize: 'text-base',
      containerGap: 'gap-4',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${currentSize.containerGap} ${
        onClick ? 'cursor-pointer select-none group' : ''
      } ${className}`}
    >
      {/* 3D Infinity Emblem Icon */}
      <div className="relative shrink-0">
        <div className="relative rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#06B6D4] shadow-lg shadow-[#7C3AED]/30 group-hover:shadow-cyan-500/30 transition-all duration-300">
          <img
            src={LOGO_IMAGE_URL}
            alt="BeInSkills Official Logo"
            className={`${currentSize.imageSize} rounded-[14px] object-cover bg-[#0F172A] transform group-hover:scale-105 transition-transform duration-300`}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient Pulsing Glow Dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#06B6D4] border border-[#0F172A]"></span>
        </span>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-black tracking-tight text-white font-['Alexandria'] ${currentSize.textSize} leading-none`}>
              Be<span className="text-[#9333EA] mx-0.5 font-black drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]">In</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#06B6D4]">Skills</span>
            </span>

            {showBadge && badgeText && (
              <span
                className={`rounded-full bg-slate-800/90 text-[#06B6D4] font-bold border border-[#06B6D4]/30 shadow-sm ${currentSize.badgeSize} hidden sm:inline-block`}
              >
                {badgeText}
              </span>
            )}
          </div>

          {showSlogan && sloganText && (
            <p className={`text-slate-400 font-medium mt-1 leading-tight ${currentSize.sloganSize}`}>
              {sloganText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
