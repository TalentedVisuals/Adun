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
        isLightMode ? 'bg-[#E5D5C1]/50 border-[#1C1410]/10' : 'bg-[#251C17]/40 border-[#EDE0CE]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C3B1E] font-semibold block mb-2">
            Discreet Luxury
          </span>
          <h2
            className={`font-serif-luxury text-3xl sm:text-5xl font-normal mb-4 ${
              isLightMode ? 'text-[#1C1410]' : 'text-[#EDE0CE]'
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
                      ? 'bg-[#FAF6EF] border-[#B8894A] shadow-2xl scale-[1.01] text-[#1C1410]'
                      : 'bg-[#2E221D] border-[#B8894A] gold-border-glow shadow-2xl scale-[1.01] text-[#EDE0CE]'
                    : isLightMode
                    ? 'bg-[#FAF6EF]/70 border-[#1C1410]/10 hover:border-[#B8894A]/50 text-[#1C1410]'
                    : 'bg-[#251C17] border-[#EDE0CE]/10 hover:border-[#EDE0CE]/25 text-[#EDE0CE]'
                }`}
              >
                <div>
                  
                  {/* Top Salon Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-4">
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8C3B1E] bg-[#8C3B1E]/15 px-2.5 py-0.5 rounded-full border border-[#8C3B1E]/30">
                      {salon.capacity}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider opacity-60">
                      {salon.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif-luxury text-2xl sm:text-3xl font-normal mb-3 text-inherit"
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
                        <Check className="w-3.5 h-3.5 text-[#B8894A] shrink-0 mt-0.5" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Footer Spend & CTA */}
                <div className={`pt-5 sm:pt-6 border-t flex flex-wrap items-center justify-between gap-3 ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest opacity-60">
                      Minimum Spend
                    </span>
                    <span className="font-serif-luxury text-xl sm:text-2xl text-[#B8894A] font-medium font-tabular">
                      {formatPrice(salon.minSpendNGN, currency)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking(salon.name);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#B8894A] text-[#1C1410] text-xs tracking-widest uppercase font-bold hover:bg-[#CD9B58] transition shrink-0 shadow-md"
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
            isLightMode ? 'bg-[#FAF6EF] border-[#1C1410]/10 shadow-xl text-[#1C1410]' : 'bg-[#251C17] border-[#EDE0CE]/10 text-[#EDE0CE]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Estimator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#B8894A] font-semibold block mb-1">
                  Interactive Event Estimator
                </span>
                <h3
                  className="font-serif-luxury text-2xl sm:text-3xl font-normal leading-snug text-inherit"
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
                  <span className="font-serif-luxury text-xl font-medium text-[#B8894A]">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedSalon.id === 'terrace-skyline' ? 20 : selectedSalon.id === 'fire-counter' ? 6 : 8}
                  max={selectedSalon.id === 'terrace-skyline' ? 75 : selectedSalon.id === 'fire-counter' ? 10 : 16}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#B8894A]/25 rounded-lg appearance-none cursor-pointer accent-[#B8894A]"
                />
              </div>

              {/* Botanical Elixir Pairing Toggle */}
              <div className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border min-w-0 ${isLightMode ? 'border-[#1C1410]/10 bg-white/60' : 'border-[#EDE0CE]/10 bg-[#1C1410]/60'}`}>
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
                    includeElixirPairing ? 'bg-[#B8894A]' : isLightMode ? 'bg-black/20' : 'bg-white/20'
                  }`}
                  aria-label="Toggle Artisanal Botanical Elixir Flight"
                >
                  <span
                    className={`block w-4 h-4 rounded-full transition-transform ${
                      includeElixirPairing ? 'translate-x-7 bg-[#1C1410]' : 'translate-x-1 bg-white'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Instant Total & WhatsApp Concierge */}
            <div
              className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between talkbox-interactive ${
                isLightMode ? 'bg-white border-[#1C1410]/10' : 'bg-[#1C1410] border-[#EDE0CE]/10'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest opacity-60 block">
                  Projected Minimum Spend
                </span>
                <div className="font-serif-luxury text-2xl sm:text-4xl text-[#B8894A] font-medium font-tabular mt-1 mb-2">
                  {formatPrice(calculatedTotalNGN, currency)}
                </div>
                <p className="text-[11px] opacity-70 leading-relaxed font-light mb-6">
                  Inclusive of bespoke personalized printed menu cards, dedicated executive butler, and private master elixir specialist service (100% Halal).
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onOpenBooking(selectedSalon.name)}
                  className="w-full py-3 rounded-full bg-[#B8894A] text-[#1C1410] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold hover:bg-[#CD9B58] transition text-center shadow-md"
                >
                  Submit Salon Inquiry
                </button>

                <a
                  href={`https://wa.me/2348135475432?text=${encodeURIComponent(
                    `Hello Adùn VIP Concierge, I would like to inquire about reserving ${selectedSalon.name} for ${guestCount} guests on an upcoming date.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-[#8C3B1E]/60 text-[#8C3B1E] hover:bg-[#8C3B1E] hover:text-[#EDE0CE] text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-semibold transition flex items-center justify-center gap-2 text-center"
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
