import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Àdùn Fine Dining',
  fallbackTitle = 'ÀDÙN CULINARY',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#171513] via-[#0f0e0c] to-[#080706] border border-[#cba358]/20 ${className}`}
        style={{ minHeight: '220px' }}
      >
        <div className="w-12 h-12 rounded-full border border-[#cba358]/30 flex items-center justify-center text-[#cba358] mb-3">
          <Utensils className="w-5 h-5" />
        </div>
        <span className="font-serif-luxury text-lg tracking-widest uppercase text-white/90">
          {fallbackTitle}
        </span>
        <span className="text-[11px] font-sans-clean tracking-widest uppercase text-[#cba358]/70 mt-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
