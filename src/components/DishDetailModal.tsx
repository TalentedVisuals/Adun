import React from 'react';
import { X, Wine, Sparkles, Flame, MapPin, Check } from 'lucide-react';
import { MenuItem, Currency } from '../types';
import { formatPrice } from '../data/restaurantData';
import { ImageWithFallback } from './ImageWithFallback';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  currency: Currency;
  isLightMode: boolean;
  onOpenBooking: (experience?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  currency,
  isLightMode,
  onOpenBooking,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden transition-colors max-h-[92vh] overflow-y-auto ${
          isLightMode ? 'bg-[#f7f4ee] border-[#1a1715]/15 text-[#1a1715]' : 'bg-[#171513] border-white/15 text-[#e8ded1]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-inherit transition z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#cba358] font-semibold mb-1">
            <span>{dish.courseNumber || 'Àdùn Repertory'}</span>
            {dish.nativeTitle && (
              <>
                <span>·</span>
                <span className="font-serif-luxury italic text-sm tracking-normal">{dish.nativeTitle}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <h3 className="font-serif-luxury text-xl sm:text-3xl text-inherit font-normal">
              {dish.name}
            </h3>
            <span className="font-serif-luxury text-xl sm:text-3xl text-[#cba358] font-medium font-tabular whitespace-nowrap">
              {formatPrice(dish.priceNGN, currency)}
            </span>
          </div>
        </div>

        {/* Image Showcase */}
        <div className="relative rounded-2xl overflow-hidden h-52 sm:h-72 border border-white/10 mb-6">
          <ImageWithFallback
            src={dish.image}
            alt={dish.name}
            fallbackTitle={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-[11px] text-white/80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#cba358]" />
            <span>Sourced from: {dish.provenance}</span>
          </div>
        </div>

        {/* Description & Chef Note */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed opacity-85 font-light mb-6">
          <p>{dish.description}</p>
          {dish.chefNote && (
            <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white border-[#1a1715]/10' : 'bg-[#11100e] border-white/5'}`}>
              <span className="text-[10px] tracking-widest uppercase text-[#cba358] font-semibold block mb-1">
                Chef Tunde's Culinary Note
              </span>
              <p className="italic font-serif-luxury text-sm sm:text-base opacity-90">
                "{dish.chefNote}"
              </p>
            </div>
          )}
        </div>

        {/* Sommelier Pairing */}
        {dish.pairing && (
          <div className="p-4 rounded-xl border border-[#cba358]/20 bg-[#cba358]/5 mb-6 flex items-start gap-3">
            <Wine className="w-5 h-5 text-[#cba358] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#cba358] font-semibold block">
                Sommelier Pairing Recommendation
              </span>
              <span className="text-xs sm:text-sm font-medium">{dish.pairing}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <span className="text-xs opacity-60">
            Available on dinner tasting menus and private salons.
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking(dish.category === 'tasting' ? "Chef's Table" : 'Main Dining Salon');
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#cba358] hover:bg-[#e4c47e] text-[#080706] text-xs tracking-[0.2em] uppercase font-bold transition shadow-lg shrink-0"
          >
            Reserve Table For This Dish
          </button>
        </div>

      </div>
    </div>
  );
};
