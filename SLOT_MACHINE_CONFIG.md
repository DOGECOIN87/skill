# Arcade Skill Game - Slot Machine Configuration

## Overview
A fully functional Pace-O-Matic style slot machine game with 9 unique symbols, rarity tiers, and payout mechanics.

## Symbol Rarity & Payout Structure

### Tier 1 - Highest Rarity (Rarest)
| Symbol | Name | Rarity | Weight | Payout |
|--------|------|--------|--------|--------|
| 3 | Don't Tread | 1 | 2 | 50x |

### Tier 2 - Second Highest
| Symbol | Name | Rarity | Weight | Payout |
|--------|------|--------|--------|--------|
| 4 | Hairy Creature | 2 | 4 | 25x |
| 5 | Green Creature | 2 | 4 | 25x |
| 7 | Trash Can | 2 | 4 | 25x |

### Tier 3-5 - Medium Rarity
| Symbol | Name | Rarity | Weight | Payout |
|--------|------|--------|--------|--------|
| 6 | Gorbi-O's | 5 | 8 | 8x |
| 8 | Trash Bag | 6 | 7 | 5x |
| 9 | Green Pod | 7 | 10 | 3x |

### Tier 6-7 - Common
| Symbol | Name | Rarity | Weight | Payout |
|--------|------|--------|--------|--------|
| 2 | Beige Trash | 8 | 12 | 2x |
| 1 | Blue Trash | 9 | 15 | 1.5x |

## Game Mechanics

### How to Play
1. **Set Bet**: Choose your bet amount (1-100 credits)
2. **Spin**: Click the SPIN button to start the reels
3. **Win Condition**: Match three identical symbols in the middle row
4. **Payout**: Win = Bet × Symbol Payout Multiplier

### Starting Balance
- Players start with 1,000 credits

### Spinning Animation
- Reels spin for 2 seconds
- Symbols are randomly selected based on their weight/probability
- Higher rarity symbols have lower probability of appearing

## Technical Details

### File Structure
```
skill/
├── src/
│   ├── components/
│   │   ├── SlotMachine.tsx      # Main game component
│   │   └── SlotMachine.css      # Game styling
│   ├── config/
│   │   └── symbols.ts           # Symbol configuration
│   ├── App.tsx                  # App entry point
│   ├── main.tsx                 # React root
│   └── index.css                # Global styles
├── public/
│   └── symbols/
│       ├── symbol1.png          # Blue Trash
│       ├── symbol2.png          # Beige Trash
│       ├── symbol3.png          # Don't Tread (Highest Value)
│       ├── symbol4.png          # Hairy Creature
│       ├── symbol5.png          # Green Creature
│       ├── symbol6.png          # Gorbi-O's
│       ├── symbol7.png          # Trash Can
│       ├── symbol8.png          # Trash Bag
│       └── symbol9.png          # Green Pod
└── dist/                        # Production build
```

### Technologies Used
- React 19
- TypeScript
- Vite
- Tailwind CSS
- CSS3 Animations

## Building & Running

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` folder.

## Customization

To modify symbol payouts or probabilities, edit `/src/config/symbols.ts`:
- `weight`: Affects probability (higher = more common)
- `payout`: Multiplier for winning (higher = better prize)
- `rarity`: Visual indicator (1 = rarest, 9 = most common)

## Features
✅ 9 unique symbols with custom artwork
✅ Rarity-based probability system
✅ Dynamic payout calculations
✅ Balance tracking
✅ Adjustable bet amounts
✅ Spinning animation
✅ Win/loss messages
✅ Responsive design
✅ Neon-themed UI
