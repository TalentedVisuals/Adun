import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface DynamicScrollButtonProps {
  isLightMode?: boolean;
}

export const DynamicScrollButton: React.FC<DynamicScrollButtonProps> = ({ isLightMode = false }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Calculate scroll position and determine if at the bottom
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const maxScroll = Math.max(fullHeight - windowHeight, 1);

    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    setScrollProgress(progress);
    setHasScrolled(scrollTop > 40);

    // Consider at bottom if within 90px of document end or progress > 0.96
    const atBottom = scrollTop + windowHeight >= fullHeight - 90 || progress >= 0.96;
    setIsAtBottom(atBottom);
  }, []);

  useEffect(() => {
    // Initial check
    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [handleScroll]);

  // Dynamic scroll action: Scroll to bottom immediately if not at bottom; scroll to top if at bottom
  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const target = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    }
  };

  // SVG Progress Ring calculations
  const size = 52;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth * 2) / 2;
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
                ? 'bg-[#fbf9f5]/95 text-[#1a1715] border-[#94691b]/30 shadow-black/10'
                : 'bg-[#141210]/95 text-[#f7ecd5] border-[#cba358]/30 shadow-black/50'
            }`}
          >
            <span className="text-[#cba358] font-tabular text-[10px] uppercase tracking-widest font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
            <span className="w-1 h-1 rounded-full bg-[#cba358]/50" />
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
        className={`relative w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cba358] cursor-pointer group ${
          isLightMode
            ? 'bg-[#fbf9f5]/90 text-[#1a1715] shadow-[0_8px_25px_rgba(148,105,27,0.18),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(148,105,27,0.32)] border border-[#94691b]/20 hover:border-[#94691b]/60'
            : 'bg-[#141210]/90 text-[#e8ded1] shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(203,163,88,0.2)] hover:shadow-[0_12px_36px_rgba(203,163,88,0.38)] border border-[#cba358]/25 hover:border-[#cba358]/70'
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
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#cba358]/20 to-transparent -z-10 blur-sm pointer-events-none"
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
            stroke={isLightMode ? 'rgba(148, 105, 27, 0.15)' : 'rgba(203, 163, 88, 0.15)'}
            strokeWidth={strokeWidth}
          />
          {/* Active Animated Progress Stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isLightMode ? '#94691b' : '#cba358'}
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
          className="relative flex items-center justify-center text-[#cba358] group-hover:text-[#f7ecd5] transition-colors duration-300"
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
              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#cba358] border-2 border-[#141210] shadow-[0_0_8px_#cba358]"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
