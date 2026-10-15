import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ThreeDApothecaryIconProps {
  size?: number;
  className?: string;
}

export const ThreeDApothecaryIcon: React.FC<ThreeDApothecaryIconProps> = ({
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
      title="The Apothecary & Rare Tisane Reserve"
      aria-label="3D Apothecary & Rare Tisane Reserve Icon"
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
            {/* 3D Glass Body Gradient */}
            <linearGradient id="apothGlass" x1="4" y1="8" x2="32" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="30%" stopColor="#EDE0CE" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#1C1410" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B8894A" stopOpacity="0.4" />
            </linearGradient>

            {/* 3D Liquid Infusion Gradient: Terracotta, Hibiscus & Spiced Date Cordial */}
            <linearGradient id="tisaneLiquid" x1="6" y1="18" x2="30" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8C3B1E" />
              <stop offset="40%" stopColor="#6E2C14" />
              <stop offset="75%" stopColor="#4A1C0B" />
              <stop offset="100%" stopColor="#B8894A" stopOpacity="0.9" />
            </linearGradient>

            {/* Liquid Surface Meniscus */}
            <linearGradient id="tisaneMeniscus" x1="7" y1="18" x2="29" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A84D29" />
              <stop offset="50%" stopColor="#CD9B58" />
              <stop offset="100%" stopColor="#8C3B1E" />
            </linearGradient>

            {/* Brass / Burnished Gold Stopper Gradient */}
            <linearGradient id="goldStopper" x1="12" y1="2" x2="24" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EDE0CE" />
              <stop offset="35%" stopColor="#CD9B58" />
              <stop offset="75%" stopColor="#B8894A" />
              <stop offset="100%" stopColor="#1C1410" />
            </linearGradient>

            {/* Botanical Leaf Gradient: Highland Jos Mint & Botanicals */}
            <linearGradient id="botanicalLeaf" x1="14" y1="19" x2="22" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="45%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Specular Highlight Streak */}
            <linearGradient id="apothStreak" x1="8" y1="12" x2="11" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Contact Floor Shadow */}
            <radialGradient id="apothShadow" cx="18" cy="38" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C1410" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1C1410" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="18" cy="38" rx="9" ry="2" fill="url(#apothShadow)" />

          {/* 3D Glass Flask Outer Vessel */}
          <path
            d="M14 9 C14 8, 22 8, 22 9 L22 13 C22 14, 30 18, 30 26 C30 33, 25 37, 18 37 C11 37, 6 33, 6 26 C6 18, 14 14, 14 13 Z"
            fill="url(#apothGlass)"
            stroke="rgba(237,224,206,0.4)"
            strokeWidth="0.8"
          />

          {/* Tisane & Elixir Infusion Liquid Fill */}
          <path
            d="M7.8 22 C9.2 18.5, 14 17.5, 18 17.5 C22 17.5, 26.8 18.5, 28.2 22 C29.5 25.5, 28 35.5, 18 35.5 C8 35.5, 6.5 25.5, 7.8 22 Z"
            fill="url(#tisaneLiquid)"
          />

          {/* Liquid Meniscus Curve */}
          <ellipse cx="18" cy="18" rx="10" ry="2.2" fill="url(#tisaneMeniscus)" opacity="0.95" />

          {/* Floating Botanical Mint Sprig */}
          <g transform="translate(18, 26) rotate(-15) scale(0.85)">
            <path
              d="M0 0 C-4 -6, -8 -2, -6 4 C-4 10, 0 8, 0 8 C0 8, 4 10, 6 4 C8 -2, 4 -6, 0 0 Z"
              fill="url(#botanicalLeaf)"
              opacity="0.95"
            />
            <path d="M0 0 L0 8" stroke="#052e16" strokeWidth="0.6" />
          </g>

          {/* Specular Left Highlight Reflection */}
          <path
            d="M9 22 C9 18, 12 15, 14 14 L13 13 C10 14, 7 18, 7 24 C7 28, 9 32, 11 34 L12 33 C10 31, 9 27, 9 22 Z"
            fill="url(#apothStreak)"
          />

          {/* Glass Rim Top */}
          <ellipse cx="18" cy="9" rx="4.2" ry="1.5" fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.8" />

          {/* Burnished Brass Geometric Stopper */}
          <path
            d="M14.5 9 L15 3.5 C15 2.5, 21 2.5, 21 3.5 L21.5 9 Z"
            fill="url(#goldStopper)"
            stroke="#8C632C"
            strokeWidth="0.6"
          />
          <ellipse cx="18" cy="4.5" rx="5" ry="2.2" fill="url(#goldStopper)" stroke="#EDE0CE" strokeWidth="0.6" />
        </svg>
      </motion.div>
    </div>
  );
};
