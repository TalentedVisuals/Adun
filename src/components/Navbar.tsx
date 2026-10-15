import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  onOpenBooking: (experience?: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currency,
  onCurrencyChange,
  isLightMode,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled
          ? isLightMode
            ? 'bg-[#f7f4ee]/95 backdrop-blur-md border-[#080706]/10 shadow-sm'
            : 'bg-[#080706]/92 backdrop-blur-md border-white/10 shadow-2xl'
          : isLightMode
          ? 'bg-[#f7f4ee] border-[#080706]/5'
          : 'bg-[#080706] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 w-full flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className={`font-serif-luxury text-2xl sm:text-3xl xl:text-3xl tracking-[0.12em] font-medium whitespace-nowrap shrink-0 transition-colors ${
            isLightMode ? 'text-[#1a1715] hover:text-[#9e7528]' : 'text-[#f5ede0] hover:text-[#cba358]'
          }`}
        >
          Adùn
        </a>

        {/* Zone 2: Concise nav links with reduced font size & tighter responsive spacing */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[10px] xl:text-[11px] tracking-[0.12em] xl:tracking-[0.16em] uppercase font-medium whitespace-nowrap min-w-0 shrink">
          <a
            href="#philosophy"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Philosophy
          </a>
          <a
            href="#tasting-menu"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Tasting Menu
          </a>
          <a
            href="#mixology"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Mixology
          </a>
          <a
            href="#private-salons"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Salons
          </a>
          <a
            href="#atmosphere"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Atmosphere
          </a>
          <a
            href="#location"
            className={`transition-colors py-1 ${
              isLightMode ? 'text-[#1a1715]/75 hover:text-[#9e7528]' : 'text-[#e8ded1]/75 hover:text-[#cba358]'
            }`}
          >
            Location
          </a>
        </nav>

        {/* Zone 3: Primary action + controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Currency Toggle: Naira & Dollar Only (Shown on Tablet & Desktop) */}
          <div
            className={`hidden md:flex items-center rounded-full border p-0.5 text-[9px] xl:text-[10px] font-tabular tracking-wider transition-colors shrink-0 ${
              isLightMode ? 'border-[#1a1715]/15 bg-white/70' : 'border-white/15 bg-[#171513]/80'
            }`}
          >
            {(['NGN', 'USD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`px-2 py-0.5 rounded-full transition-all duration-200 font-semibold ${
                  currency === c
                    ? isLightMode
                      ? 'bg-[#1a1715] text-[#f7f4ee] shadow-sm'
                      : 'bg-[#cba358] text-[#080706] shadow-sm'
                    : isLightMode
                    ? 'text-[#1a1715]/60 hover:text-[#1a1715]'
                    : 'text-[#e8ded1]/60 hover:text-[#e8ded1]'
                }`}
                title={`Switch currency to ${c === 'NGN' ? 'Nigerian Naira (₦)' : 'US Dollar ($)'}`}
              >
                {c === 'NGN' ? '₦ NGN' : '$ USD'}
              </button>
            ))}
          </div>

          {/* Theme Mode Toggle (Shown on Tablet & Desktop) */}
          <button
            onClick={onToggleTheme}
            className={`hidden sm:flex p-1.5 rounded-full border transition-colors shrink-0 ${
              isLightMode
                ? 'border-[#080706]/15 text-[#1a1715] hover:bg-[#080706]/5'
                : 'border-white/15 text-[#e8ded1] hover:bg-white/5'
            }`}
            aria-label="Toggle dark/light ambiance"
            title={isLightMode ? 'Switch to Obsidian Nocturne' : 'Switch to Travertine Day'}
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Primary CTA: "Reserve Table" (Scaled cleanly across mobile, tablet, desktop) */}
          <button
            onClick={() => onOpenBooking()}
            className="group px-3.5 sm:px-4 xl:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#cba358] to-[#ab8235] text-[#080706] text-[10px] sm:text-[11px] xl:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase font-semibold hover:shadow-lg hover:shadow-[#cba358]/20 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Reserve Table</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Button (Visible on mobile and tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 rounded-lg border transition-colors shrink-0 ${
              isLightMode
                ? 'border-[#1a1715]/10 text-[#1a1715] hover:bg-black/5'
                : 'border-white/10 text-[#e8ded1] hover:bg-white/5'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Always accessible and contains all nav, currency, and theme toggles) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 transition-all ${
            isLightMode ? 'bg-[#f7f4ee] border-[#080706]/10' : 'bg-[#11100e] border-white/10'
          }`}
        >
          <nav className="flex flex-col space-y-4 text-xs tracking-[0.2em] uppercase font-medium">
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Philosophy
            </a>
            <a
              href="#tasting-menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Tasting Menu
            </a>
            <a
              href="#mixology"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Mixology & Cellar
            </a>
            <a
              href="#private-salons"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Private Salons
            </a>
            <a
              href="#atmosphere"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Atmosphere & Vinyl
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-inherit hover:text-[#cba358]"
            >
              Location & Valet
            </a>
          </nav>

          {/* Mobile Drawer Controls: Currency & Ambiance */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] uppercase tracking-widest opacity-60 mr-1">Currency:</span>
              {(['NGN', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    currency === c
                      ? isLightMode
                        ? 'bg-[#1a1715] text-[#f7f4ee]'
                        : 'bg-[#cba358] text-[#080706]'
                      : 'opacity-70 hover:opacity-100 border border-white/10'
                  }`}
                >
                  {c === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
              ))}
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs tracking-wider transition ${
                isLightMode
                  ? 'border-[#080706]/15 text-[#1a1715]'
                  : 'border-white/15 text-[#e8ded1]'
              }`}
            >
              {isLightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>Day Mode</span>
                </>
              )}
            </button>

          </div>

          {/* Big Mobile Action */}
          <div className="mt-5 pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#cba358] to-[#ab8235] text-[#080706] text-xs tracking-[0.2em] uppercase font-bold text-center shadow-lg"
            >
              Reserve Table Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
