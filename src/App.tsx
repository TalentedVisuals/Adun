import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { MenuSection } from './components/MenuSection';
import { MixologySkyline } from './components/MixologySkyline';
import { PrivateSalons } from './components/PrivateSalons';
import { AtmosphereVinyl } from './components/AtmosphereVinyl';
import { LocationDetails } from './components/LocationDetails';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { DishDetailModal } from './components/DishDetailModal';
import { DynamicScrollButton } from './components/DynamicScrollButton';
import { Currency, MenuItem } from './types';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [isLightMode, setIsLightMode] = useState(false);

  // Reservation Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedExperience, setPreselectedExperience] = useState<string | undefined>();
  const [preselectedDate, setPreselectedDate] = useState<string | undefined>();
  const [preselectedGuests, setPreselectedGuests] = useState<string | undefined>();

  // Dish Story Inspector State
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const handleOpenBooking = (experience?: string, date?: string, guests?: string) => {
    setPreselectedExperience(experience);
    setPreselectedDate(date);
    setPreselectedGuests(guests);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSelectDish = (dish: MenuItem) => {
    setSelectedDish(dish);
  };

  const handleCloseDish = () => {
    setSelectedDish(null);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans-clean ${
        isLightMode
          ? 'light-theme bg-[#EDE0CE] text-[#1C1410]'
          : 'dark-theme bg-[#1C1410] text-[#EDE0CE] bg-grain'
      }`}
    >
      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        currency={currency}
        onCurrencyChange={setCurrency}
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
      />

      <main>
        {/* Cinematic Hero */}
        <Hero
          onOpenBooking={handleOpenBooking}
          currency={currency}
          isLightMode={isLightMode}
        />

        {/* Philosophy & Terroir Harvest */}
        <Philosophy isLightMode={isLightMode} />

        {/* Tasting Menu & Repertory */}
        <MenuSection
          currency={currency}
          isLightMode={isLightMode}
          onOpenBooking={handleOpenBooking}
          onSelectDish={handleSelectDish}
        />

        {/* Mixology & Rooftop Cellar */}
        <MixologySkyline
          currency={currency}
          isLightMode={isLightMode}
          onOpenBooking={handleOpenBooking}
        />

        {/* Private Salons & Executive Buyouts */}
        <PrivateSalons
          currency={currency}
          isLightMode={isLightMode}
          onOpenBooking={handleOpenBooking}
        />

        {/* Atmosphere & Vinyl Audio Soundscape */}
        <AtmosphereVinyl isLightMode={isLightMode} />

        {/* Location & Arrival Protocol */}
        <LocationDetails
          isLightMode={isLightMode}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer isLightMode={isLightMode} />

      {/* Dynamic Floating Scroll to Bottom / Top Controller */}
      <DynamicScrollButton isLightMode={isLightMode} />

      {/* Interactive Reservation Flow */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedExperience={preselectedExperience}
        preselectedDate={preselectedDate}
        preselectedGuests={preselectedGuests}
        isLightMode={isLightMode}
      />

      {/* Dish Story & Pairing Inspector Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={handleCloseDish}
        currency={currency}
        isLightMode={isLightMode}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
