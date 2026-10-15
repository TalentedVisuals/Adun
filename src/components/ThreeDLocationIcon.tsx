import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ThreeDLocationIconProps {
  size?: number;
  className?: string;
}

export const ThreeDLocationIcon: React.FC<ThreeDLocationIconProps> = ({
  size = 24,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const height = Math.round(size * 1.25);

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '800px' }}
      title="Victoria Island, Lagos"
      aria-label="Location: Victoria Island, Lagos"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 360 : 0,
          y: isHovered ? -2.5 : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          rotateY: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 0.3, ease: 'easeOut' },
          scale: { duration: 0.3, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: size,
          height: height,
        }}
        className="relative flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(184,137,74,0.45)]"
      >
        <svg
          width={size}
          height={height}
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* 3D Metallic Burnished Brass Gradient for Pin */}
            <linearGradient id="pinBody3D" x1="4" y1="2" x2="28" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EDE0CE" />
              <stop offset="25%" stopColor="#CD9B58" />
              <stop offset="55%" stopColor="#B8894A" />
              <stop offset="85%" stopColor="#8C632C" />
              <stop offset="100%" stopColor="#1C1410" />
            </linearGradient>

            {/* Specular Edge Highlight */}
            <linearGradient id="rimSpecular" x1="6" y1="3" x2="26" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#B8894A" stopOpacity="0" />
              <stop offset="100%" stopColor="#1C1410" stopOpacity="0.65" />
            </linearGradient>

            {/* Deep Espresso Core Eye with Terracotta Accent */}
            <radialGradient id="recessedCore" cx="16" cy="15" r="7" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C1410" />
              <stop offset="70%" stopColor="#251C17" />
              <stop offset="100%" stopColor="#8C3B1E" />
            </radialGradient>

            {/* Radiant Burnished Brass Jewel */}
            <radialGradient id="centerJewel" cx="15.2" cy="14.2" r="3.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF6EF" />
              <stop offset="35%" stopColor="#CD9B58" />
              <stop offset="75%" stopColor="#B8894A" />
              <stop offset="100%" stopColor="#8C3B1E" />
            </radialGradient>

            {/* Ground Contact Shadow */}
            <radialGradient id="groundShadow" cx="16" cy="38" r="7.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C1410" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1C1410" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dynamic 3D Ground Shadow */}
          <ellipse cx="16" cy="38.5" rx="6.5" ry="1.6" fill="url(#groundShadow)" opacity="0.85" />

          {/* 3D Teardrop Pin Body */}
          <path
            d="M16 1C8.268 1 2 7.268 2 15C2 24.5 14.2 36.8 15.2 37.8C15.65 38.25 16.35 38.25 16.8 37.8C17.8 36.8 30 24.5 30 15C30 7.268 23.732 1 16 1Z"
            fill="url(#pinBody3D)"
            stroke="#8C632C"
            strokeWidth="0.7"
          />

          {/* Specular Bevel Ridge */}
          <path
            d="M16 2.5C9.1 2.5 3.5 8.1 3.5 15C3.5 22.8 13.8 33.6 16 35.8C18.2 33.6 28.5 22.8 28.5 15C28.5 8.1 22.9 2.5 16 2.5Z"
            stroke="url(#rimSpecular)"
            strokeWidth="1"
            fill="none"
          />

          {/* Recessed Center Ring */}
          <circle cx="16" cy="15" r="6.8" fill="url(#recessedCore)" stroke="#B8894A" strokeWidth="0.8" />

          {/* Inner Golden Sphere */}
          <circle cx="16" cy="15" r="3.2" fill="url(#centerJewel)" />

          {/* Specular Light Reflection Spot */}
          <circle cx="14.8" cy="13.8" r="0.9" fill="#ffffff" opacity="0.95" />
        </svg>
      </motion.div>
    </div>
  );
};
