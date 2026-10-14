import React from 'react';
import { Sparkles, Wine, GlassWater, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Currency } from '../types';
import { formatPrice } from '../data/restaurantData';

interface MixologySkylineProps {
  currency: Currency;
  isLightMode: boolean;
  onOpenBooking: (experience?: string) => void;
}

export const MixologySkyline: React.FC<MixologySkylineProps> = ({
  currency,
  isLightMode,
  onOpenBooking,
}) => {
  return (
    <section id="mixology" className="py-24 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Duo with Subtle Parallax Lift */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56 sm:h-80 md:h-96 shadow-xl card-interactive cursor-pointer">
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/pw/AP1GczOT-yXxxSaR3qwJBzAKajwJ5hnDWaZh0UwZjFFWcGwVmze5oYGg9hn8d9-0cHS9l6uvIp3kITtiOfraxxQHuFcvYZIVgJVZeXmNed5TuyIJo9jcPbsDwYDMS9NgXQdgoELkriucb5f4ZMEEAE7LEb77lw=w607-h607-s-no-gm"
                alt="Àdùn Mixology & Dining Table Craft"
                fallbackTitle="THE OBSIDIAN CELLAR"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56 sm:h-80 md:h-96 mt-4 sm:mt-6 shadow-xl card-interactive cursor-pointer">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                alt="Artisanal Cocktail Service and Smoke"
                fallbackTitle="LIQUID ALCHEMY"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Narrative & Features */}
          <div className="lg:col-span-6">
            
            <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold block mb-2">
              Liquid Alchemy
            </span>
            
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight mb-6 ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Clarified Palm Wine, Wild Botanicals & Grand Cru Champagnes.
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed font-light mb-8 ${
                isLightMode ? 'text-[#1a1715]/75' : 'text-[#e8ded1]/75'
              }`}
            >
              Our bar program treats spirits with the same reverence as our kitchen. Led by beverage director <strong>Nkem Okafor</strong>, we forage wild herbs across Southern Nigeria and distill bespoke cordials in our in-house glass rotary evaporator.
            </p>

            <div className="space-y-4 mb-8">
              
              <div
                className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-colors talkbox-interactive cursor-pointer min-w-0 ${
                  isLightMode
                    ? 'bg-white border-[#1a1715]/10 shadow-sm'
                    : 'bg-[#171513] border-white/5'
                }`}
              >
                <GlassWater className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs uppercase tracking-widest font-semibold">House Clarified Palm Wine</h4>
                  <p className="text-xs opacity-75 mt-0.5 font-light leading-relaxed">
                    Morning sap from Ogun palms centrifuged to water clarity, scented with bruised lemongrass and star anise.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-colors talkbox-interactive cursor-pointer min-w-0 ${
                  isLightMode
                    ? 'bg-white border-[#1a1715]/10 shadow-sm'
                    : 'bg-[#171513] border-white/5'
                }`}
              >
                <Wine className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs uppercase tracking-widest font-semibold">The Sommelier’s Obsidian Cellar</h4>
                  <p className="text-xs opacity-75 mt-0.5 font-light leading-relaxed">
                    Over 140 temperature-controlled allocations including rare Stellenbosch Old Vines, Châteauneuf-du-Pape, and vintage Champagnes.
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={() => onOpenBooking('Sunset Terrace Lounge')}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full border border-[#cba358]/60 text-[#cba358] hover:bg-[#cba358] hover:text-[#080706] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-center"
            >
              <span>Reserve Rooftop Sunset Lounge</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
