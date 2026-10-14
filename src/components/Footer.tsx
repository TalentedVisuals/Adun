import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  isLightMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isLightMode }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/32056367a847e46a95ba48aca22f7755', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New VIP Guest Ledger Member: ${email}`,
          _template: 'table',
          _captcha: 'false',
          'Subscriber Email': email,
          'Interest': 'Secret Pop-Ups & Harvest Drops VIP Ledger',
          'Submitted At': new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }) + ' (WAT)',
        }),
      });
    } catch (err) {
      console.warn('FormSubmit newsletter notice:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 6000);
    }
  };

  return (
    <footer
      className={`border-t py-16 px-6 sm:px-8 text-xs transition-colors ${
        isLightMode
          ? 'bg-[#ece6dc] border-[#1a1715]/10 text-[#1a1715]/70'
          : 'bg-[#080706] border-white/10 text-[#e8ded1]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`font-serif-luxury text-3xl tracking-[0.25em] uppercase font-bold ${
                isLightMode ? 'text-[#1a1715]' : 'text-white'
              }`}
            >
              À D Ù N
            </span>
          </div>
          <p className="text-xs max-w-sm font-light leading-relaxed opacity-80">
            A temple to contemporary West African flavor. Chef’s tasting counter, private dining salons, and vinyl rooftop lounge in Victoria Island, Lagos.
          </p>
          <div className="text-[11px] font-mono text-[#cba358]">
            RC: 1983021 · Federal Republic of Nigeria
          </div>
        </div>

        {/* Quick Nav */}
        <div className="md:col-span-2 space-y-3">
          <h4
            className={`text-xs uppercase tracking-widest font-semibold ${
              isLightMode ? 'text-[#1a1715]' : 'text-white'
            }`}
          >
            The House
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#philosophy" className="hover:text-[#cba358] transition">
                Philosophy
              </a>
            </li>
            <li>
              <a href="#tasting-menu" className="hover:text-[#cba358] transition">
                Tasting Menu
              </a>
            </li>
            <li>
              <a href="#mixology" className="hover:text-[#cba358] transition">
                The Cellar
              </a>
            </li>
            <li>
              <a href="#private-salons" className="hover:text-[#cba358] transition">
                Private Salons
              </a>
            </li>
            <li>
              <a href="#location" className="hover:text-[#cba358] transition">
                Contact & Valet
              </a>
            </li>
          </ul>
        </div>

        {/* Confidential Newsletter Drops */}
        <div className="md:col-span-5 space-y-4">
          <h4
            className={`text-xs uppercase tracking-widest font-semibold ${
              isLightMode ? 'text-[#1a1715]' : 'text-white'
            }`}
          >
            Secret Pop-Ups & Harvest Drops
          </h4>
          <p className="text-xs font-light opacity-80 leading-relaxed">
            Receive confidential notices for guest Michelin-chef collaborations, rare wine allocations, and seasonal harvest menus.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="email"
              required
              placeholder="Your email address (e.g. adeleke@domain.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-full border text-xs placeholder:opacity-40 focus:outline-none focus:border-[#cba358] transition ${
                isLightMode ? 'bg-white border-[#1a1715]/15 text-[#1a1715]' : 'bg-[#11100e] border-white/10 text-white'
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#cba358] hover:bg-[#e4c47e] text-[#080706] font-bold text-xs uppercase tracking-wider transition shrink-0 text-center disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? 'Joining...' : 'Join'}
            </button>
          </form>

          {isSubscribed && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>You have been added to the private guest ledger.</span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Attribution */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] opacity-60 gap-4 text-center sm:text-left">
        <div>
          © 2026 Àdùn Group Ltd. All rights reserved. Victoria Island, Lagos.
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
          <a href="#" className="hover:text-[#cba358] transition">
            Instagram (@adunlagos)
          </a>
          <a href="#" className="hover:text-[#cba358] transition">
            Curated Soundscapes
          </a>
          <a href="#" className="hover:text-[#cba358] transition">
            Dining & Valet Policies
          </a>
        </div>
      </div>
    </footer>
  );
};
