import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { MenuCategory, DietaryTag, MenuItem, Currency } from '../types';
import { MENU_ITEMS, formatPrice } from '../data/restaurantData';
import { BotanicalChaliceIcon } from './BotanicalChaliceIcon';

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
        isLightMode ? 'bg-[#E5D5C1]/50 border-[#1C1410]/10' : 'bg-[#251C17]/40 border-[#EDE0CE]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8894A] font-semibold block">
                The Gastronomy
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-[#8C3B1E]/15 text-[#8C3B1E] border border-[#8C3B1E]/30">
                <ShieldCheck className="w-3 h-3" />
                100% Halal Kitchen & Zero-Proof Cellar
              </span>
            </div>
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-normal ${
                isLightMode ? 'text-[#1C1410]' : 'text-[#EDE0CE]'
              }`}
            >
              Seasonal Tasting & Culinary Repertory
            </h2>
          </div>
          <p className="text-xs sm:text-sm opacity-70 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Menus evolve with moon phases and harvests across Ogun, Jos Plateau, and the Gulf of Guinea. All meats are certified halal; entirely alcohol-free.
          </p>
        </div>

        {/* Category Navigation Controls */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
            {[
              { id: 'tasting', label: `Chef’s Tasting (${formatPrice(85000, currency)})` },
              { id: 'alacarte', label: 'À La Carte' },
              { id: 'elixirs', label: 'Zero-Proof Elixirs' },
              { id: 'dessert', label: 'Late Night & Sweets' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuCategory)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#B8894A] text-[#1C1410] font-bold shadow-md'
                      : isLightMode
                      ? 'bg-[#FAF6EF] text-[#1C1410]/80 hover:bg-white border border-[#1C1410]/10'
                      : 'bg-[#251C17] text-[#EDE0CE]/80 hover:text-white border border-[#EDE0CE]/10'
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
                      ? 'bg-[#1C1410] text-[#EDE0CE]'
                      : 'bg-[#EDE0CE]/20 text-[#EDE0CE] font-semibold'
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
                    ? 'bg-[#FAF6EF] border-[#1C1410]/10 hover:border-[#B8894A] text-[#1C1410]'
                    : 'bg-[#251C17] border-[#EDE0CE]/10 hover:border-[#B8894A]/50 hover:bg-[#2E221D] text-[#EDE0CE]'
                }`}
              >
                <div>
                  
                  {/* Card Header & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      {item.courseNumber && (
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#8C3B1E] mb-1">
                          <span>{item.courseNumber}</span>
                          {item.nativeTitle && (
                            <>
                              <span className="opacity-40">·</span>
                              <span className="font-serif-luxury italic text-xs tracking-normal opacity-85 text-[#B8894A]">{item.nativeTitle}</span>
                            </>
                          )}
                        </div>
                      )}
                      <h3
                        className={`font-serif-luxury text-xl sm:text-2xl font-normal leading-snug group-hover:text-[#B8894A] transition-colors ${
                          isLightMode ? 'text-[#1C1410]' : 'text-[#EDE0CE]'
                        }`}
                      >
                        {item.name}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right shrink-0 mt-0.5 sm:mt-0">
                      <span className="font-serif-luxury text-xl sm:text-2xl text-[#B8894A] font-medium font-tabular block">
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
                <div className={`mt-5 pt-3.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
                  {item.pairing ? (
                    <div className="flex items-center gap-1.5 opacity-85 text-[11px] min-w-0">
                      <BotanicalChaliceIcon size={16} className="shrink-0" />
                      <span className="truncate">{item.pairing}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] opacity-60">
                      <span>Artisanal Preparation</span>
                    </div>
                  )}

                  <span className="flex items-center gap-1 text-[11px] text-[#B8894A] group-hover:underline shrink-0 font-medium">
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
              ? 'bg-[#FAF6EF] border-[#B8894A]/40 shadow-xl text-[#1C1410]'
              : 'bg-gradient-to-r from-[#251C17] via-[#2E221D] to-[#251C17] border-[#EDE0CE]/10 gold-border-glow text-[#EDE0CE]'
          }`}
        >
          <div className="text-left w-full md:w-auto">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C3B1E] font-semibold block mb-1">
              The Grand Experience
            </span>
            <h3
              className={`font-serif-luxury text-2xl sm:text-3xl font-normal leading-snug ${
                isLightMode ? 'text-[#1C1410]' : 'text-[#EDE0CE]'
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
            className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#B8894A] text-[#1C1410] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold hover:bg-[#CD9B58] transition-all duration-200 whitespace-nowrap shadow-lg shrink-0 text-center"
          >
            Reserve 9-Course Journey
          </button>
        </div>

      </div>
    </section>
  );
};
