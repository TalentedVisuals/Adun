import React from 'react';
import { X, MapPin } from 'lucide-react';
import { MenuItem, Currency } from '../types';
import { formatPrice } from '../data/restaurantData';
import { ImageWithFallback } from './ImageWithFallback';
import { BotanicalChaliceIcon } from './BotanicalChaliceIcon';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1410]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className={`relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden transition-colors max-h-[92vh] overflow-y-auto ${
          isLightMode ? 'bg-[#FAF6EF] border-[#1C1410]/15 text-[#1C1410]' : 'bg-[#251C17] border-[#EDE0CE]/15 text-[#EDE0CE]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-inherit transition z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#8C3B1E] font-semibold mb-1">
            <span>{dish.courseNumber || 'Adùn Repertory'}</span>
            {dish.nativeTitle && (
              <>
                <span>·</span>
                <span className="font-serif-luxury italic text-sm tracking-normal text-[#B8894A]">{dish.nativeTitle}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <h3 className="font-serif-luxury text-xl sm:text-3xl text-inherit font-normal">
              {dish.name}
            </h3>
            <span className="font-serif-luxury text-xl sm:text-3xl text-[#B8894A] font-medium font-tabular whitespace-nowrap">
              {formatPrice(dish.priceNGN, currency)}
            </span>
          </div>
        </div>

        {/* Image Showcase */}
        <div className={`relative rounded-2xl overflow-hidden h-52 sm:h-72 border mb-6 ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
          <ImageWithFallback
            src={dish.image}
            alt={dish.name}
            fallbackTitle={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/75 to-transparent" />
          <div className="absolute bottom-3 left-4 text-[11px] text-[#EDE0CE] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B8894A]" />
            <span>Sourced from: {dish.provenance}</span>
          </div>
        </div>

        {/* Description & Chef Note */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed opacity-85 font-light mb-6">
          <p>{dish.description}</p>
          {dish.chefNote && (
            <div className={`p-4 rounded-xl border ${isLightMode ? 'bg-white border-[#1C1410]/10' : 'bg-[#1C1410] border-[#EDE0CE]/10'}`}>
              <span className="text-[10px] tracking-widest uppercase text-[#8C3B1E] font-semibold block mb-1">
                Chef Tunde's Culinary Note
              </span>
              <p className="italic font-serif-luxury text-sm sm:text-base opacity-95">
                "{dish.chefNote}"
              </p>
            </div>
          )}
        </div>

        {/* Botanical Elixir Pairing */}
        {dish.pairing && (
          <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${isLightMode ? 'border-[#8C3B1E]/20 bg-[#8C3B1E]/5' : 'border-[#B8894A]/25 bg-[#B8894A]/10'}`}>
            <BotanicalChaliceIcon size={24} className="shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#B8894A] font-semibold block">
                Artisanal Botanical Elixir Pairing (100% Halal)
              </span>
              <span className="text-xs sm:text-sm font-medium">{dish.pairing}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className={`pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t ${isLightMode ? 'border-[#1C1410]/10' : 'border-[#EDE0CE]/10'}`}>
          <span className="text-xs opacity-60">
            Available on dinner tasting menus and private salons.
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking(dish.category === 'tasting' ? "Chef's Table" : 'Main Dining Salon');
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#B8894A] hover:bg-[#CD9B58] text-[#1C1410] text-xs tracking-[0.2em] uppercase font-bold transition shadow-lg shrink-0"
          >
            Reserve Table For This Dish
          </button>
        </div>

      </div>
    </div>
  );
};
