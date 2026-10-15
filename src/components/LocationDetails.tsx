import React from 'react';
import { MapPin, Clock, ShieldCheck, Phone, Navigation, ArrowRight } from 'lucide-react';
import { ThreeDLocationIcon } from './ThreeDLocationIcon';

interface LocationDetailsProps {
  isLightMode: boolean;
  onOpenBooking: () => void;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({ isLightMode, onOpenBooking }) => {
  return (
    <section
      id="location"
      className={`py-24 px-6 sm:px-8 border-t transition-colors ${
        isLightMode ? 'bg-[#f7f4ee] border-[#1a1715]/10' : 'bg-[#11100e]/70 border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ThreeDLocationIcon size={18} />
                <span className="text-xs uppercase tracking-[0.25em] text-[#cba358] font-semibold">
                  Arrival & Protocol
                </span>
              </div>
              <h2
                className={`font-serif-luxury text-3xl sm:text-5xl font-normal mb-4 ${
                  isLightMode ? 'text-[#1a1715]' : 'text-white'
                }`}
              >
                Victoria Island, Lagos
              </h2>
              <p className="text-xs sm:text-sm opacity-75 font-light leading-relaxed">
                Situated in a discreet residential sanctuary off Adeola Odeku, <strong>Adùn</strong> offers private gated driveway access with dedicated security and valet reception.
              </p>
            </div>

            {/* Protocol Specs */}
            <div className="space-y-5 text-xs opacity-85">
              
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-inherit block text-sm">Physical Sanctuary</span>
                  <span className="font-light opacity-80">
                    Plot 14B Sinari Daranijo Street, Off Adeola Odeku, Victoria Island, Lagos, Nigeria
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-inherit block text-sm">Operating Hours</span>
                  <span className="block font-light">Tuesday – Sunday: 6:00 PM – Late</span>
                  <span className="text-[11px] opacity-60 block mt-0.5">
                    Mondays: Closed for regional harvest trips & fermentation R&D
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-inherit block text-sm">Valet & Dress Code</span>
                  <span className="block font-light">
                    Complimentary secure valet parking inside compound gates.
                  </span>
                  <span className="text-[#cba358] block mt-0.5 font-medium">
                    Dress Code: Elevated Casual / Evening Glamour. No sportswear or beachwear.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-inherit block text-sm">Reservations & Host Desk</span>
                  <span className="block font-light">Direct Desk: +234 813 547 5432</span>
                  <span className="text-[11px] opacity-60 block">
                    WhatsApp Concierge Desk: +234 813 547 5432 (Daily 10:00 AM – 8:00 PM)
                  </span>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Adeola+Odeku+Victoria+Island+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full border text-xs uppercase tracking-wider sm:tracking-widest transition flex items-center justify-center gap-2 text-center ${
                  isLightMode
                    ? 'border-[#1a1715]/20 hover:border-[#cba358] text-[#1a1715]'
                    : 'border-white/20 hover:border-[#cba358] text-white'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 text-[#cba358] shrink-0" />
                <span>Google Maps Directions</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#cba358] text-[#080706] font-semibold text-xs uppercase tracking-wider sm:tracking-widest hover:bg-[#e4c47e] transition shadow-md text-center"
              >
                Reserve Online
              </button>
            </div>

          </div>

          {/* Interactive Styled Map View Card */}
          <div
            className={`lg:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden border relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-4 sm:p-8 transition-colors card-interactive ${
              isLightMode ? 'bg-white border-[#1a1715]/10' : 'bg-[#171513] border-white/10'
            }`}
          >
            <div className="absolute inset-0 opacity-40">
              <iframe
                title="Restaurant Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?q=Adeola%20Odeku%20Victoria%20Island%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className={isLightMode ? 'filter grayscale contrast-125' : 'filter grayscale invert contrast-125'}
              />
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#11100e]/90 border border-[#cba358]/30 text-[#cba358] text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold backdrop-blur-md">
                Secure Private Grounds
              </span>
              <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-[11px] font-medium backdrop-blur-md">
                24/7 Diplomatic Detail
              </span>
            </div>

            <div
              className={`relative z-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-md mt-16 sm:mt-24 talkbox-interactive cursor-pointer ${
                isLightMode ? 'bg-white/95 border-[#1a1715]/10 text-[#1a1715]' : 'bg-[#11100e]/95 border-white/10 text-white'
              }`}
            >
              <h4 className="font-serif-luxury text-lg sm:text-xl font-medium mb-1">Host Desk Notice</h4>
              <p className="text-xs opacity-75 font-light leading-relaxed">
                Tables are graciously held for 15 minutes past your reserved seating time. For parties larger than 6 guests or custom salon menus, please contact our concierge desk directly.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
