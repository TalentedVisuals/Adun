import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, Flame, Sparkles, Info, ArrowUpRight } from 'lucide-react';
import { MenuCategory, DietaryTag, MenuItem, Currency } from '../types';
import { MENU_ITEMS, formatPrice } from '../data/restaurantData';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuSectionProps {
  currency: Currency;
  isLightMode: boolean;
  onOpenBooking: (experience?: string) => void;
  onSelectDish: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  currency,
  isLightMode,
  onOpenBooking,
  onSelectDish,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('tasting');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCategory = item.category === activeCategory;
    if (!matchCategory) return false;
    if (selectedDietary === 'all') return true;
    return item.dietary.includes(selectedDietary as DietaryTag);
  });

  return (
    <section
      id="tasting-menu"
      className={`py-24 px-6 sm:px-8 border-t transition-colors ${
        isLightMode ? 'bg-[#f0ebe1] border-[#1a1715]/10' : 'bg-[#11100e]/80 border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold block mb-2">
              The Gastronomy
            </span>
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-normal ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
            >
              Seasonal Tasting & Culinary Repertory
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-60 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Menus evolve with moon phases and harvests across Ogun, Jos Plateau, and the Gulf of Guinea.
          </p>
        </div>

        {/* Category Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {[
              { id: 'tasting', label: `Chef’s Tasting (${formatPrice(85000, currency)})` },
              { id: 'alacarte', label: 'À La Carte' },
              { id: 'cocktails', label: 'Mixology & Cellar' },
              { id: 'dessert', label: 'Late Night & Sweets' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuCategory)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#cba358] text-[#080706] font-bold shadow-md'
                      : isLightMode
                      ? 'bg-white/80 text-[#1a1715]/80 hover:bg-white border border-[#1a1715]/10'
                      : 'bg-[#171513] text-[#e8ded1]/80 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Dietary Filter Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] tracking-wider uppercase font-medium overflow-x-auto max-w-full pb-1 no-scrollbar">
            <span className="opacity-50 hidden sm:inline mr-1 shrink-0">Filter:</span>
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'signature', label: 'Signature' },
              { id: 'pescatarian', label: 'Pescatarian' },
              { id: 'gluten-free', label: 'Gluten-Free' },
              { id: 'woodfire', label: 'Woodfire' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDietary(d.id)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedDietary === d.id
                    ? isLightMode
                      ? 'bg-[#1a1715] text-[#f7f4ee]'
                      : 'bg-white/20 text-white font-medium'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Grid Container with Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => onSelectDish(item)}
                className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border relative flex flex-col justify-between card-interactive ${
                  isLightMode
                    ? 'bg-white border-[#1a1715]/10 hover:border-[#cba358]'
                    : 'bg-[#171513] border-white/5 hover:border-[#cba358]/40 hover:bg-[#1c1917]'
                }`}
              >
                <div>
                  
                  {/* Card Header & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      {item.courseNumber && (
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#cba358] mb-1">
                          <span>{item.courseNumber}</span>
                          {item.nativeTitle && (
                            <>
                              <span className="opacity-40">·</span>
                              <span className="font-serif-luxury italic text-xs tracking-normal opacity-80">{item.nativeTitle}</span>
                            </>
                          )}
                        </div>
                      )}
                      <h3
                        className={`font-serif-luxury text-xl sm:text-2xl font-normal leading-snug group-hover:text-[#cba358] transition-colors ${
                          isLightMode ? 'text-[#1a1715]' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right shrink-0 mt-0.5 sm:mt-0">
                      <span className="font-serif-luxury text-xl sm:text-2xl text-[#cba358] font-medium font-tabular block">
                        {formatPrice(item.priceNGN, currency)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm opacity-75 font-light mt-2.5 sm:mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Provenance note */}
                  <div className="mt-3.5 sm:mt-4 flex items-center gap-2 text-[11px] opacity-60">
                    <span className="uppercase tracking-widest text-[10px]">Harvest:</span>
                    <span>{item.provenance}</span>
                  </div>

                </div>

                {/* Card Footer: Pairing or Tags */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {item.pairing ? (
                    <div className="flex items-center gap-1.5 opacity-80 text-[11px] min-w-0">
                      <Wine className="w-3.5 h-3.5 text-[#cba358] shrink-0" />
                      <span className="truncate">{item.pairing}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] opacity-60">
                      <span>Artisanal Preparation</span>
                    </div>
                  )}

                  <span className="flex items-center gap-1 text-[11px] text-[#cba358] group-hover:underline shrink-0">
                    <span>Story & Tasting Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 9-Course Journey Reservation Banner */}
        <div
          onClick={() => onOpenBooking("Chef's Table")}
          className={`mt-14 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all talkbox-interactive cursor-pointer ${
            isLightMode
              ? 'bg-white border-[#cba358]/40 shadow-xl'
              : 'bg-gradient-to-r from-[#171513] via-[#1c1917] to-[#171513] border-white/10 gold-border-glow'
          }`}
        >
          <div className="text-left w-full md:w-auto">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#cba358] font-semibold block mb-1">
              The Grand Experience
            </span>
            <h3
              className={`font-serif-luxury text-2xl sm:text-3xl font-normal leading-snug ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
            >
              Ready to embark on the 9-Course Tasting Journey?
            </h3>
            <p className="text-xs sm:text-sm opacity-70 mt-1 max-w-xl font-light">
              Limited to 24 guests per evening across our Obsidian Salon and Fire Counter. Dietary accommodations catered with 48 hours notice.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking("Chef's Table")}
            className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#cba358] text-[#080706] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold hover:bg-[#e4c47e] transition-all duration-200 whitespace-nowrap shadow-lg shrink-0 text-center"
          >
            Reserve 9-Course Journey
          </button>
        </div>

      </div>
    </section>
  );
};
