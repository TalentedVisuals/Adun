import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Flame, MapPin } from 'lucide-react';
import { TERROIR_LOCATIONS, PRESS_ACCOLADES } from '../data/restaurantData';
import { ImageWithFallback } from './ImageWithFallback';

interface PhilosophyProps {
  isLightMode: boolean;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ isLightMode }) => {
  const [activeTerroir, setActiveTerroir] = useState(0);

  return (
    <section id="philosophy" className="py-24 px-6 sm:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7">
            
            <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.28em] font-semibold mb-4 ${isLightMode ? 'text-[#7a5412]' : 'text-[#cba358]'}`}>
              <Compass className="w-4 h-4" />
              <span>The Culinary Manifesto</span>
            </div>

            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6 ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
              style={{ textWrap: 'balance' }}
            >
              We do not mimic European classics. We elevate Nigerian memory into{' '}
              <span className={`italic font-light ${isLightMode ? 'gold-gradient-text-light font-normal' : 'text-[#cba358]'}`}>
                haute cuisine
              </span>.
            </h2>

            <div
              className={`space-y-4 text-sm sm:text-base leading-relaxed font-light ${
                isLightMode ? 'text-[#1a1715]/75' : 'text-[#e8ded1]/75'
              }`}
            >
              <p>
                Founded in Victoria Island by culinary director <strong>Tunde Adeleke</strong> and beverage visionary <strong>Nkem Okafor</strong>, <strong>Àdùn</strong> rejects the ordinary. We honor centuries of Yoruba, Igbo, and Niger-Delta culinary intelligence: the subtle smoke of ijebu garri, aged palm oils filtered through activated charcoal, sweet-tart àgbálùmọ́ coulis, and wild-caught Atlantic crayfish simmered for thirty hours.
              </p>
              <p>
                Every evening is choreographed: from the low glow of handcrafted clay lanterns to the gentle warmth of our open charcoal hearth. This is Lagos dining at the highest sovereign standard.
              </p>
            </div>

            {/* Editorial Quote Talk Box */}
            <div
              className={`mt-8 p-5 sm:p-6 rounded-2xl border transition-colors talkbox-interactive cursor-pointer ${
                isLightMode
                  ? 'bg-white border-[#1a1715]/10 shadow-md'
                  : 'bg-[#11100e] border-white/10'
              }`}
            >
              <blockquote className="font-serif-luxury italic text-base sm:text-xl leading-snug text-inherit opacity-90">
                "Lagos is chaotic poetry. Àdùn is the quiet sanctuary where that intensity is distilled into one transcendent bite."
              </blockquote>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#cba358]/20 flex items-center justify-center font-serif-luxury text-[#cba358] font-bold text-sm shrink-0">
                    TA
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest font-semibold">Tunde Adeleke</span>
                    <span className="block text-[11px] opacity-60">Executive Chef & Co-Founder</span>
                  </div>
                </div>
                <span className="font-serif-luxury italic text-[#cba358] text-xs sm:text-sm">Victoria Island, Lagos</span>
              </div>
            </div>

            {/* Quantitative Rigor Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-6 mt-8 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif-luxury text-2xl sm:text-4xl text-[#cba358] block font-tabular font-normal">
                  100%
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-wider uppercase opacity-60 block mt-0.5 leading-tight">
                  Artisanal Nigerian Sourcing
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-4xl text-[#cba358] block font-tabular font-normal">
                  9-Course
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-wider uppercase opacity-60 block mt-0.5 leading-tight">
                  Chef’s Tasting Journey
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-4xl text-[#cba358] block font-tabular font-normal">
                  140+
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-wider uppercase opacity-60 block mt-0.5 leading-tight">
                  Cellar Allocation Labels
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Hearth Composition with Interactive Zoom */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#cba358]/40 shadow-2xl group cursor-pointer transition-colors duration-500">
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/pw/AP1GczOwPbCj4_D0BU3f3aRSoQSVv0udj0mPjS_oRFiUWlxD-my0qq7KVtIgw9se515p6TXzzK251w0VmHVQi6nU4pKLsUbdmpgVj1rexJBKVl4LKk2yCH0B7IodK0bagytikaIy0nXUXa5L1eZNSOUuPDWwXw=w759-h607-s-no-gm"
                alt="Culinary Manifesto - Àdùn Dining Sanctuary"
                fallbackTitle="THE CULINARY MANIFESTO"
                className="w-full h-80 sm:h-[420px] lg:h-[520px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

              {/* Quiet Floating Indicator with Subtle Hover Lift */}
              <div
                className={`absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3.5 sm:p-4 rounded-xl backdrop-blur-md border transition-all duration-500 group-hover:-translate-y-1 ${
                  isLightMode
                    ? 'bg-white/90 border-[#1a1715]/10 group-hover:border-[#cba358]/50 shadow-lg text-[#1a1715]'
                    : 'bg-[#11100e]/90 border-white/10 group-hover:border-[#cba358]/30 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-[#b8542c] shrink-0" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-semibold">Open Woodfire Hearth</h4>
                    <p className="text-[11px] opacity-70 mt-0.5">
                      Fired with cured Nigerian cherrywood and aged mahogany embers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Terroir Provenance Explorer */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold block mb-2">
                Terroir Provenance
              </span>
              <h3
                className={`font-serif-luxury text-2xl sm:text-4xl font-normal ${
                  isLightMode ? 'text-[#1a1715]' : 'text-white'
                }`}
              >
                Where Indigenous Intelligence Meets The Plate
              </h3>
            </div>
            <p className="text-xs sm:text-sm opacity-60 max-w-md mt-2 md:mt-0 font-light">
              Click a regional terroir to examine how raw wild harvests are transformed in our kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TERROIR_LOCATIONS.map((loc, idx) => {
              const isSelected = activeTerroir === idx;
              return (
                <button
                  key={loc.name}
                  onClick={() => setActiveTerroir(idx)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 card-interactive cursor-pointer ${
                    isSelected
                      ? isLightMode
                        ? 'bg-white border-[#cba358] shadow-lg'
                        : 'bg-[#171513] border-[#cba358] gold-border-glow'
                      : isLightMode
                      ? 'bg-white/50 border-[#1a1715]/10 hover:border-[#cba358]/50'
                      : 'bg-[#11100e] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-sans-clean font-semibold uppercase tracking-wider text-[#cba358]">
                      {loc.name}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#cba358] opacity-75" />
                  </div>
                  <h4 className="font-serif-luxury text-lg text-inherit font-medium mb-2 leading-snug">
                    {loc.ingredient}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed font-light mb-3">
                    {loc.technique}
                  </p>
                  <span className="text-[10px] tracking-wide uppercase opacity-50 block font-mono">
                    Note: {loc.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accolades & Testimonial Critic Proof */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
          {PRESS_ACCOLADES.map((accolade) => (
            <div
              key={accolade.publication}
              className={`p-6 rounded-2xl border talkbox-interactive cursor-pointer transition-all ${
                isLightMode ? 'bg-white/60 border-[#1a1715]/10 shadow-sm' : 'bg-[#11100e]/70 border-white/5'
              }`}
            >
              <div className="mb-3">
                <span className={`text-[11px] uppercase tracking-widest font-semibold ${isLightMode ? 'text-[#7a5412]' : 'text-[#cba358]'}`}>
                  {accolade.publication}
                </span>
              </div>
              <p className="font-serif-luxury italic text-sm sm:text-base opacity-90 leading-relaxed mb-4">
                "{accolade.quote}"
              </p>
              <div className="text-xs opacity-60">
                <span className="font-medium">{accolade.critic}</span> · <span>{accolade.year}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
