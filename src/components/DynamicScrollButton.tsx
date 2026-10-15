import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface DynamicScrollButtonProps {
  isLightMode: boolean;
}

export const DynamicScrollButton: React.FC<DynamicScrollButtonProps> = ({ isLightMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = Math.max(1, scrollHeight - clientHeight);
      
      const progress = Math.min(1, Math.max(0, scrollY / totalScrollable));
      setScrollProgress(progress);

      // Check if user is within 100px of page bottom
      const nearBottom = scrollY + clientHeight >= scrollHeight - 100;
      setIsAtBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      // Smooth immediate scroll to top of window
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Smooth immediate scroll to bottom of document
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Circular progress ring calculation
  const size = 52;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <div
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic luxury tooltip label on hover or scroll */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-serif-luxury tracking-wider shadow-lg border backdrop-blur-md pointer-events-none ${
              isLightMode
                ? 'bg-[#FAF6EF]/95 text-[#1C1410] border-[#8C632C]/30 shadow-black/10'
                : 'bg-[#251C17]/95 text-[#EDE0CE] border-[#B8894A]/30 shadow-black/50'
            }`}
          >
            <span className="text-[#B8894A] font-tabular text-[10px] uppercase tracking-widest font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
            <span className="w-1 h-1 rounded-full bg-[#B8894A]/50" />
            <span className="whitespace-nowrap">
              {isAtBottom ? 'Return to Top' : 'Scroll to Bottom'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dynamic Scroll Button */}
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={isAtBottom ? 'Scroll immediately to top' : 'Scroll immediately to bottom'}
        title={isAtBottom ? 'Return to Top' : 'Scroll to Bottom'}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8894A] cursor-pointer group ${
          isLightMode
            ? 'bg-[#FAF6EF]/95 text-[#1C1410] shadow-[0_8px_25px_rgba(140,59,30,0.15),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(140,59,30,0.25)] border border-[#8C632C]/25 hover:border-[#8C632C]/60'
            : 'bg-[#251C17]/95 text-[#EDE0CE] shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(184,137,74,0.2)] hover:shadow-[0_12px_36px_rgba(184,137,74,0.38)] border border-[#B8894A]/30 hover:border-[#B8894A]/70'
        }`}
      >
        {/* Subtle breathing ambient halo */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B8894A]/25 to-transparent -z-10 blur-sm pointer-events-none"
        />

        {/* Circular SVG Scroll Progress Indicator Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isLightMode ? 'rgba(140, 59, 30, 0.15)' : 'rgba(184, 137, 74, 0.15)'}
            strokeWidth={strokeWidth}
          />
          {/* Active Animated Progress Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isLightMode ? '#8C632C' : '#B8894A'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Dynamic Animated Icon with Rotation & Directional Micro-Bounce */}
        <motion.div
          animate={{
            rotate: isAtBottom ? 180 : 0,
            y: isAtBottom ? [0, -2.5, 0] : [0, 2.5, 0],
          }}
          transition={{
            rotate: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative flex items-center justify-center text-[#B8894A] group-hover:text-[#EDE0CE] transition-colors duration-300"
        >
          <ArrowDown className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        </motion.div>

        {/* Quick bottom indicator dot */}
        <AnimatePresence>
          {isAtBottom && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#B8894A] border-2 border-[#1C1410] shadow-[0_0_8px_#B8894A]"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
