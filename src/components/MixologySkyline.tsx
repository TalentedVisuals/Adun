import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { ThreeDApothecaryIcon } from './ThreeDApothecaryIcon';
import { ThreeDKunuGobletIcon } from './ThreeDKunuGobletIcon';
import { Currency } from '../types';

interface MixologySkylineProps {
  currency: Currency;
  isLightMode: boolean;
  onOpenBooking: (experience?: string) => void;
}

export const MixologySkyline: React.FC<MixologySkylineProps> = ({
  isLightMode,
  onOpenBooking,
}) => {
  return (
    <section id="mixology" className="py-24 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Duo with Subtle Parallax Lift */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className={`rounded-2xl overflow-hidden border h-56 sm:h-80 md:h-96 shadow-xl card-interactive cursor-pointer ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/pw/AP1GczOT-yXxxSaR3qwJBzAKajwJ5hnDWaZh0UwZjFFWcGwVmze5oYGg9hn8d9-0cHS9l6uvIp3kITtiOfraxxQHuFcvYZIVgJVZeXmNed5TuyIJo9jcPbsDwYDMS9NgXQdgoELkriucb5f4ZMEEAE7LEb77lw=w607-h607-s-no-gm"
                alt="Adùn Zero-Proof Mixology & Dining Table Craft"
                fallbackTitle="THE BOTANICAL SANCTUARY"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className={`rounded-2xl overflow-hidden border h-56 sm:h-80 md:h-96 mt-4 sm:mt-6 shadow-xl card-interactive cursor-pointer ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                alt="Artisanal Zero-Proof Elixirs and Woodfire Essence"
                fallbackTitle="BOTANICAL ALCHEMY"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Narrative & Features */}
          <div className="lg:col-span-6">
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8894A] font-semibold block">
                Zero-Proof Botanical Alchemy
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-[#8C3B1E]/15 text-[#8C3B1E] border border-[#8C3B1E]/30">
                <ShieldCheck className="w-3 h-3" />
                100% Halal
              </span>
            </div>
            
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-normal leading-tight mb-6 ${
                isLightMode ? 'text-[#1C1410]' : 'text-[#EDE0CE]'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Cold-Extracted Botanicals, Rare Tisanes & 100% Halal Elixirs.
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed font-light mb-8 ${
                isLightMode ? 'text-[#1C1410]/80' : 'text-[#EDE0CE]/80'
              }`}
            >
              Our beverage program treats zero-proof mixology with the same reverence as our kitchen. Led by beverage director <strong>Nkem Okafor</strong>, we forage wild herbs across Southern Nigeria and distill bespoke virgin cordials, cold-pressed reductions, and aged botanicals in our in-house glass rotary evaporator. Strictly alcohol-free and 100% halal.
            </p>

            <div className="space-y-4 mb-8">
              
              <div
                className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-colors talkbox-interactive cursor-pointer min-w-0 ${
                  isLightMode
                    ? 'bg-[#FAF6EF] border-[#1C1410]/10 shadow-sm text-[#1C1410]'
                    : 'bg-[#251C17] border-[#EDE0CE]/10 text-[#EDE0CE]'
                }`}
              >
                <ThreeDKunuGobletIcon size={26} className="shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs uppercase tracking-widest font-semibold">House Clarified Kunu Aya & Lemongrass</h4>
                  <p className="text-xs opacity-75 mt-0.5 font-light leading-relaxed">
                    Organic northern tiger nuts and sun-dried baobab fruit centrifuged to pristine crystal silk, scented with bruised lemongrass and lime blossom.
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-colors talkbox-interactive cursor-pointer min-w-0 ${
                  isLightMode
                    ? 'bg-[#FAF6EF] border-[#1C1410]/10 shadow-sm text-[#1C1410]'
                    : 'bg-[#251C17] border-[#EDE0CE]/10 text-[#EDE0CE]'
                }`}
              >
                <ThreeDApothecaryIcon size={26} className="shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs uppercase tracking-widest font-semibold">The Apothecary & Rare Tisane Reserve</h4>
                  <p className="text-xs opacity-75 mt-0.5 font-light leading-relaxed">
                    Over 80 temperature-controlled single-estate micro-lots including wild Jos highland mint, Kano deep-red hibiscus, and smoked spiced date cordials.
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={() => onOpenBooking('Sunset Terrace Lounge')}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full border border-[#B8894A]/70 text-[#B8894A] hover:bg-[#B8894A] hover:text-[#1C1410] text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-center"
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
