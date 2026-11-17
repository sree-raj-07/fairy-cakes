export type MenuCategory =
  | 'All Treats'
  | 'Fresh Cream Cakes'
  | 'Crunchy & Premium'
  | 'Signature Specials'
  | 'Café Bites & Snacks'
  | 'Shakes, Coffee & Jars';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All Treats'>;
  priceDisplay: string;
  unitPrice: number | null;
  basePricePerKg: number | null;
  isCake: boolean;
  isCustomQuote?: boolean;
  isBestseller?: boolean;
  description: string;
  tastingNotes: string;
  prepInfo: string;
  stripColor: string;
  stripTextColor: string;
  stripLabel: string;
  accentHex: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  'All Treats',
  'Fresh Cream Cakes',
  'Crunchy & Premium',
  'Signature Specials',
  'Café Bites & Snacks',
  'Shakes, Coffee & Jars',
];

export const MENU_ITEMS: MenuItem[] = [
  // Fresh Cream Cakes
  {
    id: 'black-forest',
    name: 'Black Forest',
    category: 'Fresh Cream Cakes',
    priceDisplay: '₹650 / kg',
    unitPrice: 650,
    basePricePerKg: 650,
    isCake: true,
    description: 'Classic chocolate sponge, whipped cream & cherries',
    tastingNotes: 'Moist cocoa layers brushed with cherry syrup, light Chantilly cream, and dark chocolate curls.',
    prepInfo: 'Available in Classic or 100% Eggless · 3 hrs notice',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: 'Fresh Cream',
    accentHex: '#5C2B29',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'Fresh Cream Cakes',
    priceDisplay: '₹750 / kg',
    unitPrice: 750,
    basePricePerKg: 750,
    isCake: true,
    description: 'Fresh berry crush layered with vanilla cream',
    tastingNotes: 'Fluffy vanilla bean sponge filled with tangy strawberry compote and pink berry cream.',
    prepInfo: 'Available in Classic or 100% Eggless · Fresh daily',
    stripColor: '#2EC4B6',
    stripTextColor: '#241118',
    stripLabel: 'Fresh Cream',
    accentHex: '#EC4899',
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'Fresh Cream Cakes',
    priceDisplay: '₹800 / kg',
    unitPrice: 800,
    basePricePerKg: 800,
    isCake: true,
    description: 'Juicy tropical pineapple chunks & light cream',
    tastingNotes: 'Bright golden pineapple reduction folded between airy sponge layers for a refreshing finish.',
    prepInfo: 'Available in Classic or 100% Eggless · Crowd favorite',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: 'Fresh Cream',
    accentHex: '#F59E0B',
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    category: 'Fresh Cream Cakes',
    priceDisplay: '₹900 / kg',
    unitPrice: 900,
    basePricePerKg: 900,
    isCake: true,
    description: 'Rich blueberry compote & velvety cream',
    tastingNotes: 'Wild blueberry preserve swirled into smooth whipped frosting with vanilla sponge.',
    prepInfo: 'Available in Classic or 100% Eggless · 4 hrs notice',
    stripColor: '#007982',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Fresh Cream',
    accentHex: '#6366F1',
  },

  // Crunchy & Premium
  {
    id: 'choco-chip',
    name: 'Choco Chip',
    category: 'Crunchy & Premium',
    priceDisplay: '₹900 / kg',
    unitPrice: 900,
    basePricePerKg: 900,
    isCake: true,
    description: 'Loaded with dark & milk chocolate chips',
    tastingNotes: 'Double chocolate sponge studded generously with semi-sweet and milk choco chips in every slice.',
    prepInfo: 'Available in Classic or 100% Eggless · Kids favorite',
    stripColor: '#C9185B',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Crunchy & Premium',
    accentHex: '#4A2511',
  },
  {
    id: 'spanish-delight',
    name: 'Spanish Delight',
    category: 'Crunchy & Premium',
    priceDisplay: '₹1,100 / kg',
    unitPrice: 1100,
    basePricePerKg: 1100,
    isCake: true,
    isBestseller: true,
    description: 'Caramelized praline crunch & rich cream — Bestseller',
    tastingNotes: 'Signature Parippally bestseller! Golden butterscotch-almond praline meets velvety coffee-caramel cream.',
    prepInfo: 'Most Ordered in Kollam · Classic or Eggless',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: 'Bestseller • Premium',
    accentHex: '#D97706',
  },
  {
    id: 'choco-orange',
    name: 'Choco Orange',
    category: 'Crunchy & Premium',
    priceDisplay: '₹1,200 / kg',
    unitPrice: 1200,
    basePricePerKg: 1200,
    isCake: true,
    description: 'Zesty citrus glaze paired with dark chocolate',
    tastingNotes: 'Candied Valencia orange peel infused into dark Belgian-style chocolate ganache.',
    prepInfo: 'Crafted to order · 4 hrs notice',
    stripColor: '#D84315',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Crunchy & Premium',
    accentHex: '#EA580C',
  },
  {
    id: 'hazelnut',
    name: 'Hazelnut',
    category: 'Crunchy & Premium',
    priceDisplay: '₹1,200 / kg',
    unitPrice: 1200,
    basePricePerKg: 1200,
    isCake: true,
    description: 'Roasted hazelnut paste & silky chocolate ganache',
    tastingNotes: 'Slow-roasted hazelnut gianduja cream finished with glossy cocoa drip and toasted nuts.',
    prepInfo: 'Gourmet Studio Pick · 4 hrs notice',
    stripColor: '#241118',
    stripTextColor: '#FFD166',
    stripLabel: 'Crunchy & Premium',
    accentHex: '#6B3E26',
  },

  // Signature Specials
  {
    id: 'tres-leches',
    name: 'Tres Leches',
    category: 'Signature Specials',
    priceDisplay: '₹1,300 / kg',
    unitPrice: 1300,
    basePricePerKg: 1300,
    isCake: true,
    description: 'Ultra-moist three-milk soaked sponge',
    tastingNotes: 'Sponge soaked overnight in cardamom-vanilla three-milk blend, crowned with whipped cream and cinnamon.',
    prepInfo: 'Chilled Dessert Cake · 6 hrs notice',
    stripColor: '#2EC4B6',
    stripTextColor: '#241118',
    stripLabel: 'Signature Special',
    accentHex: '#F3E5AB',
  },
  {
    id: 'kitkat-gems',
    name: 'KitKat & Gems',
    category: 'Signature Specials',
    priceDisplay: '₹1,400 / kg',
    unitPrice: 1400,
    basePricePerKg: 1400,
    isCake: true,
    description: 'Crunchy wafer fence topped with colorful Gems',
    tastingNotes: 'Rich chocolate truffle core wrapped in crisp KitKat bars and overflowing with rainbow Gems.',
    prepInfo: 'Party Centerpiece · 4 hrs notice',
    stripColor: '#C9185B',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Signature Special',
    accentHex: '#E11D48',
  },
  {
    id: 'custom-theme',
    name: 'Custom Theme Cakes',
    category: 'Signature Specials',
    priceDisplay: 'Custom Quote',
    unitPrice: null,
    basePricePerKg: null,
    isCake: true,
    isCustomQuote: true,
    description: 'Unicorn, Toy Story, Wedding & 3D Fondant Designs',
    tastingNotes: 'Bespoke sculpted tiers, hand-piped buttercream florals, cartoon toppers, and anniversary centerpieces.',
    prepInfo: '99.9% Design Accuracy · Book 24–48 hrs ahead',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: '99.9% Design Accuracy',
    accentHex: '#C9185B',
  },

  // Café Bites & Snacks
  {
    id: 'loaded-fries',
    name: 'Loaded Cheese Fries',
    category: 'Café Bites & Snacks',
    priceDisplay: '₹160',
    unitPrice: 160,
    basePricePerKg: null,
    isCake: false,
    isBestseller: true,
    description: 'Crispy fries smothered in cheese & signature sauces',
    tastingNotes: 'Golden skin-on fries topped with warm cheddar sauce, peri-peri drizzle, jalapeños, and herbs.',
    prepInfo: 'Café Dine-In & Takeaway · Served hot',
    stripColor: '#D84315',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Café Bestseller',
    accentHex: '#EA580C',
  },
  {
    id: 'artisan-pizzas',
    name: 'Artisan Pizzas',
    category: 'Café Bites & Snacks',
    priceDisplay: '₹220',
    unitPrice: 220,
    basePricePerKg: null,
    isCake: false,
    description: 'Freshly baked crusts with BBQ chicken or peri-peri paneer',
    tastingNotes: 'Hand-stretched dough baked golden with house marinara, pulled mozzarella, and smoky toppings.',
    prepInfo: 'Freshly baked in 15 mins · Veg & Non-Veg',
    stripColor: '#007982',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Café Kitchen',
    accentHex: '#007982',
  },
  {
    id: 'juicy-burgers',
    name: 'Juicy Stacked Burgers',
    category: 'Café Bites & Snacks',
    priceDisplay: '₹180',
    unitPrice: 180,
    basePricePerKg: null,
    isCake: false,
    description: 'Toasted brioche buns, crispy patty & house burger sauce',
    tastingNotes: 'Double-crunch fried chicken or spiced veggie patty stacked with melted cheese and crisp lettuce.',
    prepInfo: 'Served with salted crisps · Dine-in or takeaway',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: 'Café Bite',
    accentHex: '#D97706',
  },
  {
    id: 'momos',
    name: 'Steamed & Fried Momos',
    category: 'Café Bites & Snacks',
    priceDisplay: '₹120',
    unitPrice: 120,
    basePricePerKg: null,
    isCake: false,
    description: 'Served with spicy schezwan dip',
    tastingNotes: '6 plump dumplings—choose steamed, crispy golden fried, or tossed in smoky peri-peri mayo.',
    prepInfo: '6 pcs per plate · Veg & Chicken',
    stripColor: '#C9185B',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Café Bite',
    accentHex: '#C9185B',
  },
  {
    id: 'club-sandwiches',
    name: 'Club Sandwiches & Pasta',
    category: 'Café Bites & Snacks',
    priceDisplay: '₹140',
    unitPrice: 140,
    basePricePerKg: null,
    isCake: false,
    description: 'Triple-decker grilled sandwiches & creamy penne pasta',
    tastingNotes: 'Herb-grilled club sandwiches alongside creamy white Alfredo or fiery red Arrabbiata penne.',
    prepInfo: 'Perfect evening hangout meal',
    stripColor: '#241118',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Café Bite',
    accentHex: '#241118',
  },

  // Shakes, Coffee & Jars
  {
    id: 'cold-coffee-frappe',
    name: 'Cold Coffee & Frappés',
    category: 'Shakes, Coffee & Jars',
    priceDisplay: '₹110',
    unitPrice: 110,
    basePricePerKg: null,
    isCake: false,
    description: 'Chilled espresso blend with whipped cream & cocoa drizzle',
    tastingNotes: 'Slow-brewed South Indian espresso spun with vanilla ice cream, chocolate fudge, and thick cream.',
    prepInfo: 'Served in 350ml tall jar · Hot & Cold options',
    stripColor: '#241118',
    stripTextColor: '#FFD166',
    stripLabel: 'Café Bar',
    accentHex: '#4A2511',
  },
  {
    id: 'belgian-oreo-shake',
    name: 'Belgian Choco & Oreo Shake',
    category: 'Shakes, Coffee & Jars',
    priceDisplay: '₹140',
    unitPrice: 140,
    basePricePerKg: null,
    isCake: false,
    isBestseller: true,
    description: 'Thick ice-cream shake loaded with crushed Oreos & fudge',
    tastingNotes: 'Ultra-thick chocolate gelato shake rimmed with crushed cookies and topped with chocolate syrup.',
    prepInfo: 'Made fresh to order · Crowd favorite',
    stripColor: '#2EC4B6',
    stripTextColor: '#241118',
    stripLabel: 'Shake Bar',
    accentHex: '#2EC4B6',
  },
  {
    id: 'brownies-dessert-jars',
    name: 'Fudge Brownies & Jar Cakes',
    category: 'Shakes, Coffee & Jars',
    priceDisplay: '₹130',
    unitPrice: 130,
    basePricePerKg: null,
    isCake: false,
    description: 'Warm walnut brownies & layered chocolate mousse tubs',
    tastingNotes: 'Gooey crackle-top dark chocolate brownies and chilled triple-layer mousse & Lotus Biscoff jars.',
    prepInfo: 'Grab-and-go jars or warmed with vanilla scoop',
    stripColor: '#C9185B',
    stripTextColor: '#FFFFFF',
    stripLabel: 'Dessert Counter',
    accentHex: '#C9185B',
  },
  {
    id: 'cupcake-pastry-box',
    name: 'Cupcakes & Pastry Slices',
    category: 'Shakes, Coffee & Jars',
    priceDisplay: '₹80',
    unitPrice: 80,
    basePricePerKg: null,
    isCake: false,
    description: 'Freshly frosted cupcakes, red velvet & Belgian truffle slices',
    tastingNotes: 'Counter-fresh daily slices and pastel swirl cupcakes—perfect for quick celebrations or gifting.',
    prepInfo: 'Single slice or Box of 4 / 6',
    stripColor: '#FFD166',
    stripTextColor: '#241118',
    stripLabel: 'Daily Bakery',
    accentHex: '#EC4899',
  },
];

export interface WeightOption {
  id: string;
  label: string;
  multiplier: number;
  servingsHint: string;
}

export const WEIGHT_OPTIONS: WeightOption[] = [
  { id: '0.5kg', label: '0.5 kg', multiplier: 0.6, servingsHint: '4–6 servings' },
  { id: '1kg', label: '1 kg', multiplier: 1, servingsHint: '8–12 servings' },
  { id: '2kg', label: '2 kg', multiplier: 2, servingsHint: '18–24 servings' },
  { id: '3kg', label: '3 kg', multiplier: 3, servingsHint: '28–35 servings' },
];

export interface CakeShapeOption {
  id: string;
  label: string;
  extraPrice: number;
}

export const CAKE_SHAPES: CakeShapeOption[] = [
  { id: 'round', label: 'Classic Round', extraPrice: 0 },
  { id: 'square', label: 'Modern Square', extraPrice: 0 },
  { id: 'heart', label: 'Heart Shape', extraPrice: 100 },
  { id: 'two-tier', label: 'Two-Tier Party', extraPrice: 400 },
];

export interface FrostingOption {
  id: string;
  label: string;
  extraPrice: number;
}

export const FROSTING_OPTIONS: FrostingOption[] = [
  { id: 'fresh-cream', label: 'Whipped Fresh Cream', extraPrice: 0 },
  { id: 'choco-ganache', label: 'Silky Choco Ganache', extraPrice: 150 },
  { id: 'semi-fondant', label: 'Semi-Fondant Accents', extraPrice: 350 },
  { id: 'full-fondant', label: 'Full 3D Theme Fondant', extraPrice: 0 },
];

export interface AddonOption {
  id: string;
  label: string;
  price: number;
}

export const CAKE_ADDONS: AddonOption[] = [
  { id: 'choco-chips', label: 'Extra Choco Chips', price: 80 },
  { id: 'praline-crunch', label: 'Caramelized Praline', price: 120 },
  { id: 'roasted-nuts', label: 'Roasted Almonds & Hazelnuts', price: 150 },
  { id: 'edible-photo', label: 'Edible Photo Print', price: 250 },
  { id: 'macarons-gold', label: 'Macarons & Gold Leaf', price: 200 },
];

export interface TimeSlotOption {
  id: string;
  label: string;
  extraPrice: number;
}

export const TIME_SLOTS: TimeSlotOption[] = [
  { id: 'morning', label: '10:00 AM – 1:00 PM', extraPrice: 0 },
  { id: 'afternoon', label: '1:00 PM – 5:00 PM', extraPrice: 0 },
  { id: 'evening', label: '5:00 PM – 9:00 PM', extraPrice: 0 },
  { id: 'midnight', label: 'Midnight Surprise (11:00 PM)', extraPrice: 150 },
];

export const CAKE_FLAVORS = MENU_ITEMS.filter((item) => item.isCake);

export const GALLERY_IMAGES = {
  heroCake: '/src/assets/images/hero_custom_cake_1794836981123.jpg',
  freshCream: '/src/assets/images/menu_fresh_cream_1794836982614.jpg',
  signatureSpecials: '/src/assets/images/menu_signature_specials_1794836981417.jpg',
  cafeBites: '/src/assets/images/menu_cafe_bites_1794836983892.jpg',
  shakesCoffee: '/src/assets/images/menu_shakes_coffee_1794902019929.jpg',
  browniesPastries: '/src/assets/images/menu_brownies_pastries_1794902021433.jpg',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
