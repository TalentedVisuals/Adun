import { MenuItem, PrivateSalon, Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  NGN: { symbol: '₦', rate: 1, label: 'NGN (₦)' },
  USD: { symbol: '$', rate: 1 / 1480, label: 'USD ($)' },
};

export function formatPrice(amountNGN: number, currency: Currency): string {
  const conf = CURRENCY_RATES[currency];
  const converted = amountNGN * conf.rate;
  if (currency === 'NGN') {
    return `${conf.symbol}${amountNGN.toLocaleString('en-NG')}`;
  }
  return `${conf.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'course-1',
    name: 'Smoked Atlantic Prawn & Àgbálùmọ́ Gelée',
    nativeTitle: 'Edé Bonny & Ìrànwọ́ Àgbálùmọ́',
    category: 'tasting',
    courseNumber: 'Course I · Amuse',
    priceNGN: 18500,
    description: 'Wild Bonny Island tiger prawn cold-smoked over dried lemongrass, topped with white palm wine foam, fermented African star apple gelée, and puffed wild mangrove rice.',
    provenance: 'Bonny Island waters & Osun wild star apples',
    pairing: 'Domaine Vacheron Sancerre Blanc 2021',
    dietary: ['pescatarian', 'signature'],
    chefNote: 'The sharp acidity of seasonal àgbálùmọ́ cuts cleanly through the richness of the cold-smoked tiger prawn.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'course-2',
    name: 'Charred Calabar Octopus & Plantain Velouté',
    nativeTitle: 'Ẹja Calabar & Ọ̀gẹ̀dẹ̀ Yíyán',
    category: 'tasting',
    courseNumber: 'Course III · Entrée',
    priceNGN: 24000,
    description: 'Atlantic octopus tenderized in citrus and alligator pepper court-bouillon, flash-charred on cherrywood embers, velvety ripe plantain puree, and fermented locust bean vinaigrette.',
    provenance: 'Gulf of Guinea & Ondo heritage plantains',
    pairing: 'Chablis Premier Cru Fourchaume 2020',
    dietary: ['pescatarian', 'woodfire'],
    chefNote: 'We char the octopus tentacles directly on red-hot mahogany embers for precisely 45 seconds to achieve a crisp skin with a butter-tender core.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'course-3',
    name: 'Suya-Rubbed A5 Wagyu Rib & Yam Fondant',
    nativeTitle: 'Ẹran Wagyu Yaji & Iṣu Àgbàlá',
    category: 'tasting',
    courseNumber: 'Course V · Principal',
    priceNGN: 42000,
    description: 'A5 Wagyu slow-braised for 16 hours in smoked Cameroon pepper broth, crusted with bespoke 7-spice yaji, caramelized yam mousseline, and 30-hour bone marrow jus.',
    provenance: 'Miyazaki Wagyu, Benue tuber roots & Kano spices',
    pairing: 'Kanonkop Estate Cabernet Sauvignon 2017 (Stellenbosch)',
    dietary: ['woodfire', 'signature'],
    chefNote: 'Our yaji is ground fresh each morning using roasted cloves, fermented ginger, kuli-kuli, and alligator pepper sourced directly from ancient northern markets.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'course-4',
    name: 'Jos Guinea Fowl Supreme & Fermented Locust Jus',
    nativeTitle: 'Ẹyẹ Àwòdì Jos & Ọbẹ̀ Irú Àdùn',
    category: 'tasting',
    courseNumber: 'Course VII · Hearth',
    priceNGN: 28000,
    description: 'Crisp-skinned Jos Plateau guinea fowl breast, sweet plantain gnocchi, charcoal charred spring leeks, and deep reduction of iru (fermented carob) with truffle butter.',
    provenance: 'Jos Plateau free-range poultry & Ogun artisanal iru',
    pairing: 'Domaine du Vieux Télégraphe Châteauneuf-du-Pape 2019',
    dietary: ['gluten-free', 'signature'],
    chefNote: 'Iru has a deep umami profile that rivals Japanese black miso and aged balsamic vinegar when tempered with cultured butter.',
    image: 'https://images.unsplash.com/photo-1514944298352-f47228a49c96?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'course-5',
    name: 'Smoked Ondo Cocoa Pod & Hibiscus Sphere',
    nativeTitle: 'Koko Ondo & Zobo Àdùn',
    category: 'tasting',
    courseNumber: 'Course IX · Grand Finale',
    priceNGN: 16000,
    description: 'Single-origin Ondo 72% dark chocolate shell, spiced hibiscus-zobo coulis, edible 24k gold leaf, roasted chin-chin crumble, and smoked coconut palm cream.',
    provenance: 'Ondo Rainforest regenerative cacao & Kano dried hibiscus',
    pairing: 'Taylor’s 20 Year Old Tawny Port',
    dietary: ['signature'],
    chefNote: 'Crack open the cocoa sphere at the table to release the aromatic hibiscus vapour trapped inside.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80',
  },

  // À La Carte
  {
    id: 'alacarte-1',
    name: 'Wood-Fired Goat Neck & Fermented Tuwo Crisp',
    nativeTitle: 'Orùn Ewúrẹ́ & Tuwo Yíyán',
    category: 'alacarte',
    priceNGN: 34000,
    description: 'Slow-braised goat neck steeped in fragrant aromatic pepper soup reduction for 14 hours, charred baby shallots, crispy fermented rice cracker, and fresh scent leaf pesto.',
    provenance: 'Sokoto goat & Niger-Delta scent leaf',
    pairing: 'Syrah, Mullineux Old Vines 2018 (Swartland)',
    dietary: ['gluten-free', 'woodfire'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'alacarte-2',
    name: 'Pan-Seared Red Snapper with Ofe Owerri Broth',
    nativeTitle: 'Ẹja Pupa & Ofe Owerri',
    category: 'alacarte',
    priceNGN: 32000,
    description: 'Line-caught Gulf of Guinea red snapper with crisp golden skin, served over roasted cocoyam pave, wilted bitterleaf crisps, and concentrated smoked fish consommé.',
    provenance: 'Lekki artisanal fishing cooperative',
    pairing: 'Meursault Premier Cru Les Charmes 2020',
    dietary: ['pescatarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'alacarte-3',
    name: 'Smoked Efo Riro Ravioli with Truffled Egusi Puree',
    nativeTitle: 'Ravioli Èfọ́ Rírò & Ègúsí',
    category: 'alacarte',
    priceNGN: 26000,
    description: 'Handmade yolk pasta filled with slow-cooked shredded shaki and water greens, resting in a velvet puree of toasted melon seeds and black summer truffle butter.',
    provenance: 'Ogun melon seeds & Epe lagoon garden greens',
    pairing: 'Viognier, Condrieu Guigal 2021',
    dietary: ['signature'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  },

  // Cocktails & Cellar
  {
    id: 'cocktail-1',
    name: 'The Àdùn Smoked Old Fashioned',
    nativeTitle: 'Old Fashioned Àdùn Ẹ̀éfín',
    category: 'cocktails',
    priceNGN: 16500,
    description: 'Bourbon whiskey washed with cold-pressed coconut oil, house-made palm wine reduction, alligator pepper and Angostura bitters, smoked under cherrywood cloche.',
    provenance: 'In-house rotary evaporator distillation',
    dietary: ['signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cocktail-2',
    name: 'Zobo Spritz Royal with Brut Champagne',
    nativeTitle: 'Zobo Spritz Ọba',
    category: 'cocktails',
    priceNGN: 15000,
    description: 'Artisanal dry gin, cold-infused hibiscus cordial, ginger and grains of selim, topped with chilled Laurent-Perrier Brut and edible cornflower petals.',
    provenance: 'Kano botanical infusion & Champagne Laurent-Perrier',
    dietary: [],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cocktail-3',
    name: 'Clarified Palm Wine Nectar & Lemongrass',
    nativeTitle: 'Ẹmu Gidi & Ewe Lemongrass',
    category: 'cocktails',
    priceNGN: 14000,
    description: 'Fresh sap from Ogun state oil palms, micro-centrifuged to crystal clarity, infused with bruised lemongrass, botanical gin, and lime flower oil.',
    provenance: 'Morning tap from Ogun rural estate',
    dietary: ['signature'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  },

  // Late Night & Sweets
  {
    id: 'dessert-1',
    name: 'Deconstructed Puff-Puff Mille-Feuille',
    nativeTitle: 'Puff-Puff Mille-Feuille',
    category: 'dessert',
    priceNGN: 14000,
    description: 'Caramelized nutmeg wafer crisps, vanilla bean mascarpone chantilly, passionfruit coulis, and roasted crushed cashew praline.',
    provenance: 'Madagascan bourbon vanilla & Ogbomoso cashews',
    pairing: 'Château d’Yquem Sauternes 2015',
    dietary: ['signature'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'dessert-2',
    name: 'Smoked Plantain Gelato & Aged Rum Caramel',
    nativeTitle: 'Gelato Ọ̀gẹ̀dẹ̀ & Rum Àgbà',
    category: 'dessert',
    priceNGN: 13500,
    description: 'Artisanal churned gelato made from roasted plantains smoked over sweet wood embers, topped with warm 12-year rum caramel and sea salt flakes.',
    provenance: 'Artisanal dairy from Bokkos, Jos',
    dietary: ['gluten-free'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PRIVATE_SALONS: PrivateSalon[] = [
  {
    id: 'salon-oba',
    name: 'Salon Ọba',
    subtitle: 'The Sovereign Dining Room',
    capacity: '12 – 16 Guests',
    minSpendNGN: 1600000,
    description: 'An obsidian-clad inner sanctuary designed for discreet executive councils, diplomatic banquets, and intimate celebrations. Features custom acoustic ceilings, private restroom suite, dedicated sommelier, and discrete rear driveway access.',
    features: [
      'Dedicated Head Sommelier & Private Butler Service',
      'Bespoke 7 or 9-course personalized menu cards embossed with host insignia',
      'Private pre-dinner champagne reception terrace',
      'Integrated Bang & Olufsen acoustic system with curated sound selections',
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'terrace-skyline',
    name: 'The Skyline Terrace & Vinyl Parlour',
    subtitle: 'Exclusive 4th Floor Rooftop Buyout',
    capacity: 'Up to 75 Guests',
    minSpendNGN: 4500000,
    description: 'Full exclusive takeover of our elevated open-air rooftop terrace overlooking the illuminated Victoria Island skyline. Features 2 craft mixology stations, live wood-fire charcoal grill pit, vintage vinyl turntable booth, and VIP valet priority.',
    features: [
      'Full open-air terrace with panoramic views of Victoria Island and Atlantic breeze',
      'Bespoke signature cocktail menu crafted specifically for your event',
      'Open woodfire canapé pass and live chef carving station',
      'Dedicated security detail, private elevator key, and valet coordination',
    ],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fire-counter',
    name: 'The Hearth Fire Counter',
    subtitle: 'Chef’s Table (Front Row Culinary Theatre)',
    capacity: '10 Guests (Single Seating per Night)',
    minSpendNGN: 850000,
    description: 'An immersive culinary arena directly fronting the wood-fired charcoal hearth. Ten leather counter seats hosted personally by Executive Chef Tunde Adeleke with interactive dish storytelling.',
    features: [
      'Direct interaction with Chef Tunde Adeleke across all 9 courses',
      'Rare cellar pours from limited vintage allocations',
      'Complimentary signed collector tasting ledger and gift provision',
    ],
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const TERROIR_LOCATIONS = [
  {
    name: 'Ogun Valley',
    ingredient: 'Artisanal Morning Palm Wine & Wild Star Apples',
    technique: 'Direct tree tapping at dawn, micro-clarified via rotary centrifugation.',
    note: 'Delivers high natural sugars balanced by wild yeasts.',
  },
  {
    name: 'Jos Plateau',
    ingredient: 'Organic Guinea Fowl & Highland Leeks',
    technique: 'Cool altitude pasture feeding that produces dense, rich game meat.',
    note: 'Slow-charred with wild mahogany wood.',
  },
  {
    name: 'Bonny Island & Gulf of Guinea',
    ingredient: 'Wild Tiger Prawns & Line-Caught Red Snapper',
    technique: 'Harvested by local artisanal fleets within 6 hours of dinner service.',
    note: 'Cold-smoked with fresh citrus leaf and dried lemongrass.',
  },
  {
    name: 'Ondo Forest Reserve',
    ingredient: 'Heritage Trinitario Cacao Beans (72%)',
    technique: 'Fermented in banana leaves for 6 days, sun-dried on bamboo racks.',
    note: 'Yields intense notes of dark cherry, cedar, and roasted hazelnut.',
  },
];

export const PRESS_ACCOLADES = [
  {
    quote: 'Àdùn does not merely cook Nigerian food; it deconstructs centuries of West African memory into a sovereign haute cuisine that leaves international critics breathless.',
    critic: 'Olamide Coker',
    publication: 'Gastronomy International',
    year: '2026',
  },
  {
    quote: 'The 9-course journey under Chef Tunde Adeleke is the most intellectually rigorous and sensually thrilling dining experience south of the Sahara.',
    critic: 'Jean-Luc Moreau',
    publication: 'World Culinary Journal',
    year: '2025',
  },
  {
    quote: 'Salon Oba sets a new benchmark for private luxury dining in Lagos. Discrete, architecturally magnificent, and flawlessly choreographed.',
    critic: 'Kemi Fashola',
    publication: 'Financial Times Special Report',
    year: '2026',
  },
];
