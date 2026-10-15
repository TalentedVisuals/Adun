import React, { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { PRIVATE_SALONS, formatPrice } from '../data/restaurantData';
import { Currency } from '../types';
import { BotanicalChaliceIcon } from './BotanicalChaliceIcon';

interface PrivateSalonsProps {
  currency: Currency;
  isLightMode: boolean;
  onOpenBooking: (experience?: string) => void;
}

export const PrivateSalons: React.FC<PrivateSalonsProps> = ({
  currency,
  isLightMode,
  onOpenBooking,
}) => {
  const [selectedSalonId, setSelectedSalonId] = useState('salon-oba');
  const [guestCount, setGuestCount] = useState(14);
  const [includeElixirPairing, setIncludeElixirPairing] = useState(true);

  const selectedSalon = PRIVATE_SALONS.find((s) => s.id === selectedSalonId) || PRIVATE_SALONS[0];

  // Calculate estimated spend based on guest count and zero-proof elixir pairing
  const basePerGuest = selectedSalon.id === 'terrace-skyline' ? 60000 : 95000;
  const elixirAddonPerGuest = includeElixirPairing ? 45000 : 0;
  const calculatedTotalNGN = Math.max(
    selectedSalon.minSpendNGN,
    guestCount * (basePerGuest + elixirAddonPerGuest)
  );

  return (
    <section
      id="private-salons"
      className={`py-24 px-6 sm:px-8 border-t transition-colors ${
        isLightMode ? 'bg-[#f0ebe1] border-[#1a1715]/10' : 'bg-[#11100e]/60 border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold block mb-2">
            Discreet Luxury
          </span>
          <h2
            className={`font-serif-luxury text-3xl sm:text-5xl font-normal mb-4 ${
              isLightMode ? 'text-[#1a1715]' : 'text-white'
            }`}
          >
            The Private Salons & Executive Buyouts
          </h2>
          <p className="text-xs sm:text-sm opacity-70 font-light leading-relaxed">
            Designed for diplomatic delegations, sovereign board retreats, tech milestones, and celebratory feasts in the heart of Victoria Island.
          </p>
        </div>

        {/* 3-Card Salon Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {PRIVATE_SALONS.map((salon) => {
            const isSelected = selectedSalonId === salon.id;
            return (
              <div
                key={salon.id}
                onClick={() => {
                  setSelectedSalonId(salon.id);
                  if (salon.id === 'salon-oba') setGuestCount(14);
                  if (salon.id === 'terrace-skyline') setGuestCount(45);
                  if (salon.id === 'fire-counter') setGuestCount(10);
                }}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl border p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden card-interactive ${
                  isSelected
                    ? isLightMode
                      ? 'bg-white border-[#cba358] shadow-2xl scale-[1.01]'
                      : 'bg-[#171513] border-[#cba358] gold-border-glow shadow-2xl scale-[1.01]'
                    : isLightMode
                    ? 'bg-white/60 border-[#1a1715]/10 hover:border-[#cba358]/50'
                    : 'bg-[#11100e] border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  
                  {/* Top Salon Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-4">
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#cba358]">
                      {salon.capacity}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider opacity-50">
                      {salon.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif-luxury text-2xl sm:text-3xl font-normal mb-3 ${
                      isLightMode ? 'text-[#1a1715]' : 'text-white'
                    }`}
                  >
                    {salon.name}
                  </h3>

                  <p className="text-xs opacity-75 font-light leading-relaxed mb-6">
                    {salon.description}
                  </p>

                  {/* Key Features List */}
                  <ul className="space-y-2.5 text-xs opacity-85 mb-8">
                    {salon.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#cba358] shrink-0 mt-0.5" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Footer Spend & CTA */}
                <div className="pt-5 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest opacity-50">
                      Minimum Spend
                    </span>
                    <span className="font-serif-luxury text-xl sm:text-2xl text-[#cba358] font-medium font-tabular">
                      {formatPrice(salon.minSpendNGN, currency)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(salon.name);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#cba358] text-[#080706] text-xs tracking-widest uppercase font-semibold hover:bg-[#e4c47e] transition shrink-0"
                  >
                    Inquire
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Private Event Spend Calculator & WhatsApp Desk */}
        <div
          className={`p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border transition-all talkbox-interactive ${
            isLightMode ? 'bg-white border-[#1a1715]/10 shadow-xl' : 'bg-[#171513] border-white/10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Estimator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#cba358] font-semibold block mb-1">
                  Interactive Event Estimator
                </span>
                <h3
                  className={`font-serif-luxury text-2xl sm:text-3xl font-normal leading-snug ${
                    isLightMode ? 'text-[#1a1715]' : 'text-white'
                  }`}
                >
                  Configure Your Private Feast: {selectedSalon.name}
                </h3>
                <p className="text-xs opacity-70 mt-1 font-light">
                  Adjust guest numbers and artisanal botanical pairings to preview minimum food & beverage spend.
                </p>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider opacity-60">Estimated Guest Count:</span>
                  <span className="font-serif-luxury text-xl font-medium text-[#cba358]">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedSalon.id === 'terrace-skyline' ? 20 : selectedSalon.id === 'fire-counter' ? 6 : 8}
                  max={selectedSalon.id === 'terrace-skyline' ? 75 : selectedSalon.id === 'fire-counter' ? 10 : 16}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#cba358]/20 rounded-lg appearance-none cursor-pointer accent-[#cba358]"
                />
              </div>

              {/* Botanical Elixir Pairing Toggle */}
              <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-white/10 min-w-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <BotanicalChaliceIcon className="w-7 h-7 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider font-semibold block leading-snug">
                      Artisanal Botanical Elixir Flight (100% Halal)
                    </span>
                    <span className="text-[10px] sm:text-[11px] opacity-60 block leading-tight mt-0.5">
                      Hand-curated zero-proof virgin cordial or rare cold-pressed infusion for each course
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeElixirPairing(!includeElixirPairing)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    includeElixirPairing ? 'bg-[#cba358]' : 'bg-white/20'
                  }`}
                  aria-label="Toggle Artisanal Botanical Elixir Flight"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-[#080706] transition-transform ${
                      includeElixirPairing ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Instant Total & WhatsApp Concierge */}
            <div
              className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between talkbox-interactive ${
                isLightMode ? 'bg-[#f7f4ee] border-[#1a1715]/10' : 'bg-[#11100e] border-white/10'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest opacity-50 block">
                  Projected Minimum Spend
                </span>
                <div className="font-serif-luxury text-2xl sm:text-4xl text-[#cba358] font-medium font-tabular mt-1 mb-2">
                  {formatPrice(calculatedTotalNGN, currency)}
                </div>
                <p className="text-[11px] opacity-60 leading-relaxed font-light mb-6">
                  Inclusive of bespoke personalized printed menu cards, dedicated executive butler, and private master elixir specialist service (100% Halal).
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onOpenBooking(selectedSalon.name)}
                  className="w-full py-3 rounded-full bg-[#cba358] text-[#080706] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold hover:bg-[#e4c47e] transition text-center"
                >
                  Submit Salon Inquiry
                </button>

                <a
                  href={`https://wa.me/2348135475432?text=${encodeURIComponent(
                    `Hello Adùn VIP Concierge, I would like to inquire about reserving ${selectedSalon.name} for ${guestCount} guests on an upcoming date.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-semibold transition flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp VIP Concierge</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
