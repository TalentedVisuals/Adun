export type Currency = 'NGN' | 'USD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // 1 USD = rate
}

export type MenuCategory = 'tasting' | 'alacarte' | 'cocktails' | 'dessert';

export type DietaryTag = 'gluten-free' | 'pescatarian' | 'dairy-free' | 'woodfire' | 'signature';

export interface MenuItem {
  id: string;
  name: string;
  nativeTitle?: string;
  category: MenuCategory;
  courseNumber?: string;
  priceNGN: number;
  description: string;
  provenance: string;
  pairing?: string;
  dietary: DietaryTag[];
  chefNote?: string;
  image: string;
}

export interface PrivateSalon {
  id: string;
  name: string;
  subtitle: string;
  capacity: string;
  minSpendNGN: number;
  description: string;
  features: string[];
  image: string;
}

export interface ReservationData {
  referenceCode: string;
  experience: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  notes: string;
  createdAt: string;
}
