import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BotanicalChaliceIconProps {
  size?: number;
  className?: string;
}

export const BotanicalChaliceIcon: React.FC<BotanicalChaliceIconProps> = ({
  size,
  className = 'w-6 h-6',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const pxSize = size || 24;

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '800px' }}
      title="Artisanal Botanical Elixir (100% Halal)"
      aria-label="3D Artisanal Botanical Elixir Chalice Icon"
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
          width: size ? pxSize : undefined,
          height: size ? pxSize : undefined,
        }}
        className="w-full h-full flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(184,137,74,0.45)]"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* 3D Glass Body Gradient with Crystal Sheen */}
            <linearGradient id="chaliceGlassBody" x1="8" y1="4" x2="28" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="25%" stopColor="#EDE0CE" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#1C1410" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>

            {/* 3D Liquid Gradient (Terracotta & Burnished Brass Botanical Elixir) */}
            <linearGradient id="elixirLiquidGrad" x1="10" y1="12" x2="26" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8C3B1E" />
              <stop offset="45%" stopColor="#B8894A" />
              <stop offset="85%" stopColor="#5E220F" />
              <stop offset="100%" stopColor="#CD9B58" stopOpacity="0.9" />
            </linearGradient>

            {/* Liquid Meniscus Surface */}
            <linearGradient id="elixirMeniscus" x1="10" y1="12.5" x2="26" y2="12.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A84D29" />
              <stop offset="45%" stopColor="#CD9B58" />
              <stop offset="100%" stopColor="#8C3B1E" />
            </linearGradient>

            {/* 3D Stem Gradient */}
            <linearGradient id="chaliceStem" x1="17" y1="21" x2="19" y2="31.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EDE0CE" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#B8894A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8C632C" stopOpacity="1" />
            </linearGradient>

            {/* Specular Highlight Streak */}
            <linearGradient id="specularStreak" x1="12" y1="6" x2="15.5" y2="19" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Base Bevel Sheen */}
            <radialGradient id="baseSheen" cx="18" cy="32" r="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF6EF" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#B8894A" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1C1410" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* 3D Ambient Floor Shadow */}
          <ellipse cx="18" cy="33.5" rx="8.5" ry="2" fill="#1C1410" fillOpacity="0.5" />

          {/* Circular Crystal Glass Base with 3D Bevel */}
          <ellipse cx="18" cy="32" rx="7.8" ry="2.2" fill="url(#baseSheen)" stroke="#B8894A" strokeWidth="0.6" />
          <ellipse cx="18" cy="31.6" rx="5.2" ry="1.3" fill="#ffffff" fillOpacity="0.4" />

          {/* Slender 3D Crystal Stem */}
          <path d="M17.3 21H18.7V31.5H17.3V21Z" fill="url(#chaliceStem)" />

          {/* Outer Crystal Bowl Silhouette with 3D Depth */}
          <path
            d="M10 5.5 C10 4.5, 26 4.5, 26 5.5 C26 13.5, 23.8 21, 18 21.5 C12.2 21, 10 13.5, 10 5.5 Z"
            fill="url(#chaliceGlassBody)"
            stroke="rgba(237,224,206,0.45)"
            strokeWidth="0.8"
          />

          {/* Deep Rich Terracotta & Burnished Brass Elixir Liquid Fill */}
          <path
            d="M10.8 12.8 C11.5 17.5, 13.8 20.8, 18 21 C22.2 20.8, 24.5 17.5, 25.2 12.8 C23 13.5, 13 13.5, 10.8 12.8 Z"
            fill="url(#elixirLiquidGrad)"
          />

          {/* Liquid Curved Meniscus Surface */}
          <ellipse cx="18" cy="12.7" rx="7.1" ry="1.6" fill="url(#elixirMeniscus)" fillOpacity="0.95" />

          {/* Glass Top Rim Ellipse */}
          <ellipse cx="18" cy="5.5" rx="7.9" ry="1.5" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.75" />

          {/* Primary 3D Light Highlight Streak */}
          <path
            d="M12.2 7 C12.1 11, 13 16, 15 19 C14.1 16, 13.5 11, 13.7 7 Z"
            fill="url(#specularStreak)"
          />

          {/* Secondary Rim Reflection */}
          <path
            d="M23.6 7.5 C24.1 9.5, 24.2 12, 23.8 14"
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeOpacity="0.55"
          />

          {/* Specular Glint on Elixir Surface */}
          <ellipse cx="15.2" cy="12.6" rx="1.5" ry="0.65" fill="#ffffff" fillOpacity="0.85" />
        </svg>
      </motion.div>
    </div>
  );
};
