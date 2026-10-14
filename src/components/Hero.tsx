import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Compass, Wine, Clock } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { ThreeDLocationIcon } from './ThreeDLocationIcon';
import { Currency } from '../types';
import { formatPrice } from '../data/restaurantData';

interface HeroHeadlineVariation {
  id: number;
  leadingText: string;
  highlightedText: string;
  trailingText: string;
  subheadline: string;
}

const HERO_VARIATIONS: HeroHeadlineVariation[] = [
  {
    id: 1,
    leadingText: 'West African Food, ',
    highlightedText: 'Taken Seriously',
    trailingText: '.',
    subheadline: 'Fire-cooked classics, aged suya, and bold Nigerian flavors, made with fine-dining care.',
  },
  {
    id: 2,
    leadingText: 'Old Flavors. ',
    highlightedText: 'New Standards',
    trailingText: '.',
    subheadline: 'The West African dishes you grew up with, cooked with precision and served with pride.',
  },
  {
    id: 3,
    leadingText: 'Nigerian Soul. ',
    highlightedText: 'World-Class Kitchen',
    trailingText: '.',
    subheadline: 'Slow-cooked stews, smoky grills, and handcrafted plates, rooted in tradition and refined for today.',
  },
  {
    id: 4,
    leadingText: 'Where Tradition ',
    highlightedText: 'Meets the Fire',
    trailingText: '.',
    subheadline: 'Authentic West African cooking elevated, from clay-pot stews to perfectly aged suya.',
  },
];

interface HeroProps {
  onOpenBooking: (experience?: string, date?: string, guests?: string) => void;
  currency: Currency;
  isLightMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, currency, isLightMode }) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 80]);
  const scaleParallax = useTransform(scrollY, [0, 600], [1, 1.04]);

  const [currentVariation, setCurrentVariation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVariation((prev) => (prev + 1) % HERO_VARIATIONS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const activeVariation = HERO_VARIATIONS[currentVariation];

  const [selectedArea, setSelectedArea] = useState("Chef's Table");
  const [selectedGuests, setSelectedGuests] = useState('2 Guests');
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedArea, selectedDate, selectedGuests);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-10 pb-20 px-6 sm:px-8 overflow-hidden">
      
      {/* Ambient Atmospheric Glow Orbs */}
      <div
        className={`absolute -top-36 left-1/2 -translate-x-1/2 w-[700px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
          isLightMode ? 'bg-[#cba358]/10' : 'bg-[#cba358]/12'
        }`}
      />
      <div
        className={`absolute bottom-10 right-[-120px] w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-700 ${
          isLightMode ? 'bg-[#b8542c]/5' : 'bg-[#b8542c]/10'
        }`}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Top Editorial Location Kicker with 3D Rotating Pin */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 text-xs tracking-[0.28em] uppercase font-medium mb-6 group cursor-pointer"
        >
          <ThreeDLocationIcon size={22} />
          <span className={`transition-colors font-semibold ${isLightMode ? 'text-[#7a5412] group-hover:text-[#9e7426]' : 'text-[#cba358] group-hover:text-[#e4c47e]'}`}>
            Victoria Island · Lagos
          </span>
        </motion.div>

        {/* Dynamic Rotating Master Headline (10s Interval) */}
        <div className="max-w-4xl mx-auto mb-6 min-h-[160px] sm:min-h-[200px] md:min-h-[220px] flex flex-col justify-center px-2 sm:px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVariation}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1
                className={`font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-normal leading-[1.08] sm:leading-[1.05] tracking-tight mb-4 sm:mb-5 ${
                  isLightMode ? 'text-[#1a1715]' : 'text-white'
                }`}
                style={{ textWrap: 'balance' }}
              >
                {activeVariation.leadingText}
                <span
                  className={`italic transition-colors ${
                    isLightMode
                      ? 'gold-gradient-text-light font-normal drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]'
                      : 'gold-gradient-text font-light'
                  }`}
                >
                  {activeVariation.highlightedText}
                </span>
                {activeVariation.trailingText}
              </h1>
              <p
                className={`text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed ${
                  isLightMode ? 'text-[#1a1715]/80' : 'text-[#e8ded1]/75'
                }`}
              >
                {activeVariation.subheadline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quiet Elegance Variation Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {HERO_VARIATIONS.map((v, idx) => (
            <button
              key={v.id}
              onClick={() => setCurrentVariation(idx)}
              className="p-1 cursor-pointer focus:outline-none"
              aria-label={`Show variation ${idx + 1}`}
              title={`Variation ${idx + 1}: ${v.leadingText}${v.highlightedText}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  currentVariation === idx
                    ? isLightMode
                      ? 'w-8 bg-[#875f1b]'
                      : 'w-8 bg-[#cba358]'
                    : isLightMode
                    ? 'w-2 bg-[#1a1715]/20 hover:bg-[#1a1715]/40'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Quick Table Seeker Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className={`max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl border backdrop-blur-md mb-12 shadow-2xl talkbox-interactive ${
            isLightMode
              ? 'bg-[#ffffff]/90 border-[#1a1715]/10'
              : 'bg-[#11100e]/90 border-white/10 gold-border-glow'
          }`}
        >
          <form onSubmit={handleQuickReserve} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* Seating Salon */}
            <div
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isLightMode
                  ? 'bg-[#f7f4ee] border-[#1a1715]/10 hover:border-[#cba358]'
                  : 'bg-[#080706]/70 border-white/5 hover:border-[#cba358]/40'
              }`}
            >
              <label className="block text-[10px] tracking-widest uppercase opacity-60 font-medium">Seating Salon</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none cursor-pointer mt-0.5 text-inherit"
              >
                <option value="Chef's Table" className="bg-[#11100e] text-[#e8ded1]">Chef’s Table (Front Row)</option>
                <option value="Main Dining Salon" className="bg-[#11100e] text-[#e8ded1]">Main Obsidian Salon</option>
                <option value="Sunset Terrace Lounge" className="bg-[#11100e] text-[#e8ded1]">Sunset Rooftop Lounge</option>
                <option value="Salon Ọba (Private)" className="bg-[#11100e] text-[#e8ded1]">Salon Ọba (Private 12-16)</option>
              </select>
            </div>

            {/* Date */}
            <div
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isLightMode
                  ? 'bg-[#f7f4ee] border-[#1a1715]/10 hover:border-[#cba358]'
                  : 'bg-[#080706]/70 border-white/5 hover:border-[#cba358]/40'
              }`}
            >
              <label className="block text-[10px] tracking-widest uppercase opacity-60 font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none cursor-pointer mt-0.5 text-inherit"
              />
            </div>

            {/* Guests */}
            <div
              className={`px-4 py-2.5 rounded-xl border transition-colors ${
                isLightMode
                  ? 'bg-[#f7f4ee] border-[#1a1715]/10 hover:border-[#cba358]'
                  : 'bg-[#080706]/70 border-white/5 hover:border-[#cba358]/40'
              }`}
            >
              <label className="block text-[10px] tracking-widest uppercase opacity-60 font-medium">Party Size</label>
              <select
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none cursor-pointer mt-0.5 text-inherit"
              >
                <option value="2 Guests" className="bg-[#11100e] text-[#e8ded1]">2 Guests (Intimate Table)</option>
                <option value="4 Guests" className="bg-[#11100e] text-[#e8ded1]">4 Guests (Social Table)</option>
                <option value="6 Guests" className="bg-[#11100e] text-[#e8ded1]">6 Guests (Celebration)</option>
                <option value="8+ Guests (VIP)" className="bg-[#11100e] text-[#e8ded1]">8+ Guests (Salon Request)</option>
              </select>
            </div>

            {/* Check Button */}
            <button
              type="submit"
              className="w-full h-full min-h-[48px] rounded-xl bg-[#cba358] hover:bg-[#e4c47e] text-[#080706] font-semibold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center gap-2"
            >
              <span>Find Table</span>
              <Calendar className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        {/* Visual Composition: Split Parallax Showcase */}
        <motion.div
          style={{ y: yParallax }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
        >
          {/* Main Visual Card */}
          <div
            onClick={() => onOpenBooking("Chef's Table")}
            className="md:col-span-7 relative group rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[460px] border border-white/10 shadow-2xl card-interactive cursor-pointer"
          >
            <motion.div style={{ scale: scaleParallax }} className="w-full h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80"
                alt="Wood-Fired Afro-Fusion Gastronomy"
                fallbackTitle="ÀDÙN SIGNATURE DISH"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/50 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#cba358] font-medium block mb-1">
                  The Signature 9-Course Journey
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-white font-normal leading-snug">
                  Slow-Roasted Lamb Saddle, Suya Crust & Fermented Locust Jus
                </h2>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/15 sm:pl-4 shrink-0">
                <span className="block text-[11px] sm:text-xs uppercase tracking-widest text-[#e8ded1]/60">Tasting</span>
                <span className="font-serif-luxury text-xl sm:text-2xl text-[#cba358] font-medium">
                  {formatPrice(85000, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Atmosphere Cards */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
            
            {/* Card 1: Rooftop Skyline */}
            <div
              onClick={() => onOpenBooking('Sunset Terrace Lounge')}
              className="relative group rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[220px] border border-white/10 shadow-lg card-interactive cursor-pointer"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80"
                alt="Skyline Terrace Cocktails"
                fallbackTitle="ROOFTOP & SKYLINE"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                <span className="text-[10px] tracking-widest uppercase text-[#cba358] font-medium">4th Floor Skyline</span>
                <h3 className="font-serif-luxury text-lg sm:text-xl text-white font-medium mt-0.5">Terrace Lounge & Vinyl Parlour</h3>
                <p className="text-xs text-[#e8ded1]/70 mt-1 line-clamp-1">Palm wine reductions, rare rums, and highlife-jazz reworks.</p>
              </div>
            </div>

            {/* Card 2: Chef's Hearth Counter */}
            <div
              onClick={() => onOpenBooking("Chef's Table")}
              className="relative group rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[220px] border border-white/10 shadow-lg card-interactive cursor-pointer"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
                alt="Intimate Chef Table"
                fallbackTitle="THE HEARTH FIRE COUNTER"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2.5">
                <div className="min-w-0">
                  <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-medium">10 Seats · Single Seating</span>
                  <h3 className="font-serif-luxury text-lg sm:text-xl text-white font-medium mt-0.5">The Fire Counter</h3>
                  <p className="text-xs text-[#e8ded1]/70 mt-0.5 line-clamp-1 sm:line-clamp-none">Direct culinary choreography with Chef Tunde Adeleke.</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking("Chef's Table");
                  }}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-white/10 hover:bg-[#cba358] hover:text-[#080706] text-xs font-medium transition text-white border border-white/20 shrink-0 text-center"
                >
                  Book
                </button>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
