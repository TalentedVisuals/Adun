import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ThreeDKunuGobletIconProps {
  size?: number;
  className?: string;
}

export const ThreeDKunuGobletIcon: React.FC<ThreeDKunuGobletIconProps> = ({
  size = 24,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const height = Math.round(size * 1.15);

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '800px' }}
      title="House Clarified Kunu Aya & Lemongrass"
      aria-label="3D House Clarified Kunu Aya & Lemongrass Icon"
      role="img"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 360 : 0,
          y: isHovered ? -2.5 : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          rotateY: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 0.3, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: size,
          height: height,
        }}
        className="relative flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(184,137,74,0.4)]"
      >
        <svg
          width={size}
          height={height}
          viewBox="0 0 36 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* 3D Crystal Bowl */}
            <linearGradient id="kunuGlass" x1="6" y1="6" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#EDE0CE" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#1C1410" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#B8894A" stopOpacity="0.45" />
            </linearGradient>

            {/* Clarified Kunu Aya Silk Liquid (Silky Cream Brass) */}
            <linearGradient id="kunuLiquid" x1="8" y1="14" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF6EF" />
              <stop offset="40%" stopColor="#EDE0CE" />
              <stop offset="85%" stopColor="#CD9B58" />
              <stop offset="100%" stopColor="#B8894A" />
            </linearGradient>

            {/* Liquid Surface Meniscus */}
            <linearGradient id="kunuMeniscus" x1="9" y1="14" x2="27" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#EDE0CE" />
              <stop offset="100%" stopColor="#B8894A" />
            </linearGradient>

            {/* Slender Stem & Base Gold */}
            <linearGradient id="kunuStem" x1="17" y1="24" x2="19" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EDE0CE" />
              <stop offset="50%" stopColor="#B8894A" />
              <stop offset="100%" stopColor="#8C632C" />
            </linearGradient>

            {/* Fresh Bruised Lemongrass Spear */}
            <linearGradient id="lemongrass" x1="22" y1="4" x2="15" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="40%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Specular Highlight Streak */}
            <linearGradient id="kunuStreak" x1="10" y1="8" x2="13" y2="23" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Floor Contact Shadow */}
            <radialGradient id="kunuShadow" cx="18" cy="38" r="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C1410" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1C1410" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dynamic Floor Shadow */}
          <ellipse cx="18" cy="38" rx="8" ry="1.8" fill="url(#kunuShadow)" />

          {/* Base of Stemware */}
          <ellipse cx="18" cy="36.5" rx="7" ry="2" fill="url(#kunuStem)" stroke="#CD9B58" strokeWidth="0.5" />
          <ellipse cx="18" cy="36" rx="4.5" ry="1.1" fill="#ffffff" fillOpacity="0.4" />

          {/* Crystal Stem */}
          <rect x="17.2" y="24" width="1.6" height="12.5" rx="0.8" fill="url(#kunuStem)" />

          {/* Fresh Lemongrass Shoot Resting in Glass */}
          <path
            d="M24 2 C23 6, 20 14, 15 22 L17 22 C21 15, 24 7, 26 3 Z"
            fill="url(#lemongrass)"
            opacity="0.95"
          />

          {/* Goblet Bowl Glass */}
          <path
            d="M9 7 C9 6, 27 6, 27 7 C27 16, 24 24, 18 24.5 C12 24, 9 16, 9 7 Z"
            fill="url(#kunuGlass)"
            stroke="rgba(237,224,206,0.4)"
            strokeWidth="0.8"
          />

          {/* Clarified Silk Kunu Aya Fill */}
          <path
            d="M10.2 14.5 C11.2 19.5, 13.8 23.5, 18 23.8 C22.2 23.5, 24.8 19.5, 25.8 14.5 C23 15.2, 13 15.2, 10.2 14.5 Z"
            fill="url(#kunuLiquid)"
          />

          {/* Meniscus */}
          <ellipse cx="18" cy="14.5" rx="7.5" ry="1.8" fill="url(#kunuMeniscus)" fillOpacity="0.95" />

          {/* Rim */}
          <ellipse cx="18" cy="6.8" rx="8.6" ry="1.6" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.75" />

          {/* Specular Highlight Streak */}
          <path
            d="M11.5 8.5 C11.3 12.5, 12.5 18, 14.8 21.5 C13.8 18, 13 12.5, 13.2 8.5 Z"
            fill="url(#kunuStreak)"
          />

          {/* Glint Spot */}
          <circle cx="23.5" cy="15" r="0.9" fill="#ffffff" opacity="0.8" />
        </svg>
      </motion.div>
    </div>
  );
};
