import React, { useState, useRef, useEffect } from 'react';
import { SYMBOLS, getRandomSymbol, Symbol } from '../config/symbols';
import './SlotMachine.css';

interface Reel {
  symbols: Symbol[];
  isSpinning: boolean;
}

export default function SlotMachine() {
  const [reels, setReels] = useState<Reel[]>([
    { symbols: [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()], isSpinning: false },
    { symbols: [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()], isSpinning: false },
    { symbols: [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()], isSpinning: false },
  ]);

  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const spinReels = () => {
    if (balance < bet) {
      setMessage('Insufficient balance!');
      return;
    }

    setIsSpinning(true);
    setMessage('');
    setBalance(balance - bet);

    // Animate spinning
    const newReels = reels.map(() => ({
      symbols: [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      isSpinning: true,
    }));
    setReels(newReels);

    // Stop spinning after 2 seconds
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }

    spinTimeoutRef.current = setTimeout(() => {
      const finalReels = reels.map(() => ({
        symbols: [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
        isSpinning: false,
      }));
      setReels(finalReels);
      setIsSpinning(false);

      // Check for wins
      checkWin(finalReels);
    }, 2000);
  };

  const checkWin = (finalReels: Reel[]) => {
    const middleSymbols = finalReels.map((reel) => reel.symbols[1]);

    // Check if all three middle symbols match
    if (
      middleSymbols[0].id === middleSymbols[1].id &&
      middleSymbols[1].id === middleSymbols[2].id
    ) {
      const winAmount = bet * middleSymbols[0].payout;
      setBalance((prev) => prev + winAmount);
      setMessage(`🎉 WIN! ${middleSymbols[0].name} x3! Won ${winAmount} credits!`);
    } else {
      setMessage('No match. Try again!');
    }
  };

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseInt(e.target.value);
    if (newBet > 0 && newBet <= balance) {
      setBet(newBet);
    }
  };

  const handleMaxBet = () => {
    setBet(Math.min(balance, 100));
  };

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="slot-machine-container">
      <div className="slot-machine-header">
        <h1>Arcade Skill Game</h1>
        <p className="subtitle">Pace-O-Matic Style Slot Machine</p>
      </div>

      <div className="balance-section">
        <div className="balance-display">
          <span className="label">Balance:</span>
          <span className="amount">{balance} Credits</span>
        </div>
      </div>

      <div className="reels-container">
        {reels.map((reel, reelIndex) => (
          <div key={reelIndex} className={`reel ${reel.isSpinning ? 'spinning' : ''}`}>
            {reel.symbols.map((symbol, symbolIndex) => (
              <div
                key={symbolIndex}
                className={`symbol-slot ${symbolIndex === 1 ? 'active' : ''}`}
              >
                <img src={symbol.image} alt={symbol.name} className="symbol-image" />
                <div className="symbol-label">{symbol.name}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="controls-section">
        <div className="bet-control">
          <label htmlFor="bet-input">Bet Amount:</label>
          <input
            id="bet-input"
            type="number"
            min="1"
            max={balance}
            value={bet}
            onChange={handleBetChange}
            disabled={isSpinning}
            className="bet-input"
          />
          <button onClick={handleMaxBet} disabled={isSpinning} className="max-bet-btn">
            Max Bet
          </button>
        </div>

        <button
          onClick={spinReels}
          disabled={isSpinning || balance < bet}
          className="spin-button"
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>

      {message && <div className={`message ${message.includes('WIN') ? 'win' : 'lose'}`}>{message}</div>}

      <div className="info-section">
        <h3>Symbol Payouts</h3>
        <div className="payout-grid">
          {SYMBOLS.map((symbol) => (
            <div key={symbol.id} className="payout-item">
              <img src={symbol.image} alt={symbol.name} className="payout-symbol" />
              <div className="payout-info">
                <span className="payout-name">{symbol.name}</span>
                <span className="payout-value">x{symbol.payout}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
