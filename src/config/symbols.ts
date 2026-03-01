/**
 * Slot Machine Symbols Configuration
 * Defines rarity tiers, payouts, and symbol properties
 */

export interface Symbol {
  id: number;
  name: string;
  image: string;
  rarity: number; // 1 = highest (rarest), 9 = lowest (most common)
  weight: number; // Probability weight for spinning
  payout: number; // Multiplier for matching symbols
}

export const SYMBOLS: Symbol[] = [
  {
    id: 1,
    name: 'Blue Trash',
    image: '/symbols/symbol1.png',
    rarity: 9,
    weight: 15,
    payout: 1.5,
  },
  {
    id: 2,
    name: 'Beige Trash',
    image: '/symbols/symbol2.png',
    rarity: 8,
    weight: 12,
    payout: 2,
  },
  {
    id: 3,
    name: 'Don\'t Tread',
    image: '/symbols/symbol3.png',
    rarity: 1, // HIGHEST RARITY
    weight: 2,
    payout: 50, // Highest payout
  },
  {
    id: 4,
    name: 'Hairy Creature',
    image: '/symbols/symbol4.png',
    rarity: 2, // SECOND TIER
    weight: 4,
    payout: 25,
  },
  {
    id: 5,
    name: 'Green Creature',
    image: '/symbols/symbol5.png',
    rarity: 2, // SECOND TIER
    weight: 4,
    payout: 25,
  },
  {
    id: 6,
    name: 'Gorbi-O\'s',
    image: '/symbols/symbol6.png',
    rarity: 5,
    weight: 8,
    payout: 8,
  },
  {
    id: 7,
    name: 'Trash Can',
    image: '/symbols/symbol7.png',
    rarity: 2, // SECOND TIER
    weight: 4,
    payout: 25,
  },
  {
    id: 8,
    name: 'Trash Bag',
    image: '/symbols/symbol8.png',
    rarity: 6,
    weight: 7,
    payout: 5,
  },
  {
    id: 9,
    name: 'Green Pod',
    image: '/symbols/symbol9.png',
    rarity: 7,
    weight: 10,
    payout: 3,
  },
];

// Calculate total weight for probability
export const TOTAL_WEIGHT = SYMBOLS.reduce((sum, symbol) => sum + symbol.weight, 0);

// Get symbol by ID
export const getSymbolById = (id: number): Symbol | undefined => {
  return SYMBOLS.find((symbol) => symbol.id === id);
};

// Get random symbol based on weights
export const getRandomSymbol = (): Symbol => {
  let random = Math.random() * TOTAL_WEIGHT;
  for (const symbol of SYMBOLS) {
    random -= symbol.weight;
    if (random <= 0) {
      return symbol;
    }
  }
  return SYMBOLS[SYMBOLS.length - 1];
};
