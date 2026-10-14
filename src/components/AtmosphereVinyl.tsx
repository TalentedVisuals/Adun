import React, { useState } from 'react';
import { Disc, Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { audioVibe } from '../utils/audioVibe';
import { ImageWithFallback } from './ImageWithFallback';

interface AtmosphereVinylProps {
  isLightMode: boolean;
}

export const AtmosphereVinyl: React.FC<AtmosphereVinylProps> = ({ isLightMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [activeTrack, setActiveTrack] = useState('Late Night at Salon Ọba (Afro-Jazz & Hearth)');

  const tracks = [
    'Late Night at Salon Ọba (Afro-Jazz & Hearth)',
    'Rain Over Lagos Lagoon & Cherrywood Embers',
    'Fela, Highlife & Muted Brass Re-edits (1974)',
  ];

  const handleTogglePlay = () => {
    const nextState = audioVibe.toggle();
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioVibe.setVolume(val);
  };

  return (
    <section id="atmosphere" className="py-24 px-6 sm:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold block mb-2">
              The Atmosphere & Sound
            </span>
            <h2
              className={`font-serif-luxury text-3xl sm:text-5xl font-normal ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
            >
              Lagos Nights, Curated Analog Grooves
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 mt-4 md:mt-0">
            <Radio className="w-4 h-4 text-[#cba358]" />
            <span>Thursday Vinyl Sessions · Afro-Jazz & Rare Grooves</span>
          </div>
        </div>

        {/* Sofra-Inspired Ambient Vinyl Player Deck */}
        <div
          className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl border mb-12 transition-all talkbox-interactive ${
            isLightMode
              ? 'bg-white border-[#1a1715]/10 shadow-xl'
              : 'bg-[#171513] border-white/10 gold-border-glow'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Spinning Vinyl & Track Info */}
            <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto min-w-0">
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#121110] to-[#262420] border-2 border-[#cba358]/40 flex items-center justify-center shrink-0 shadow-lg ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#080706] border border-[#cba358]/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cba358]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#cba358] font-semibold truncate">
                    {isPlaying ? 'Now Playing Ambient Analog' : 'Muted Sanctuary Sound'}
                  </span>
                  {isPlaying && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                </div>
                <h4 className="font-serif-luxury text-base sm:text-xl text-inherit font-medium leading-snug break-words">
                  {activeTrack}
                </h4>
                <p className="text-[11px] sm:text-xs opacity-60 font-light mt-0.5">
                  Generative warm vinyl surface crackle & mellow Rhodes harmonies.
                </p>
              </div>
            </div>

            {/* Controls: Play/Pause, Track Selector, Volume */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto justify-end">
              
              {/* Track Picker */}
              <select
                value={activeTrack}
                onChange={(e) => setActiveTrack(e.target.value)}
                className={`w-full sm:w-auto text-xs px-3 py-2.5 rounded-xl border focus:outline-none cursor-pointer max-w-full ${
                  isLightMode
                    ? 'bg-[#f7f4ee] border-[#1a1715]/10 text-[#1a1715]'
                    : 'bg-[#11100e] border-white/10 text-white'
                }`}
              >
                {tracks.map((t) => (
                  <option key={t} value={t} className="bg-[#11100e] text-white">
                    {t}
                  </option>
                ))}
              </select>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#cba358] opacity-75 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#cba358]"
                  title="Ambiance Volume"
                />
              </div>

              {/* Play / Stop Master Button */}
              <button
                onClick={handleTogglePlay}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#cba358] hover:bg-[#e4c47e] text-[#080706] text-xs uppercase tracking-widest font-bold transition flex items-center justify-center gap-2 shrink-0 shadow-md text-center"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 shrink-0" />
                    <span>Mute Vibe</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 shrink-0" />
                    <span>Experience Audio</span>
                  </>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* High-Fashion Photographic Atmosphere Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="relative group rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/10 shadow-lg card-interactive cursor-pointer">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
              alt="Main Salon Glow"
              fallbackTitle="MAIN SALON"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-3 left-3 text-[11px] text-white font-medium drop-shadow">
              Main Salon Candle Glow
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/10 shadow-lg card-interactive cursor-pointer">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80"
              alt="Artisanal Cocktails"
              fallbackTitle="BOTANICAL GLASSWARE"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-3 left-3 text-[11px] text-white font-medium drop-shadow">
              Àdùn Smoked Sour
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/10 shadow-lg card-interactive cursor-pointer">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=700&q=80"
              alt="Bespoke Table Setting"
              fallbackTitle="BRONZE TABLECRAFT"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-3 left-3 text-[11px] text-white font-medium drop-shadow">
              Bespoke Ceramic Craft
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/10 shadow-lg card-interactive cursor-pointer">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80"
              alt="Late Night Skyline"
              fallbackTitle="TERRACE AT DUSK"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
            <div className="absolute bottom-3 left-3 text-[11px] text-white font-medium drop-shadow">
              Terrace Skyline at Dusk
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
