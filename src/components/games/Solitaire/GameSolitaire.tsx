import { useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { Card as CardType } from '../../../types';
import './GameSolitaire.css';

const SUIT_SYMBOLS: Record<string, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

export default function GameSolitaire() {
  const { state, dispatch } = useGame();
  const { deck, waste, foundations, piles, isWin } = state.solitaire;
  const [selected, setSelected] = useState<{ from: string, cardIndex: number } | null>(null);

  const handleCardClick = (from: string, cardIndex: number) => {
    // If we have a selection, try to move to the target
    if (selected) {
      if (selected.from === from && selected.cardIndex === cardIndex) {
        // Toggle off if clicking the same card
        setSelected(null);
      } else {
        dispatch({ type: 'SOLITAIRE_MOVE_CARD', from: selected.from, to: from, cardIndex: selected.cardIndex });
        setSelected(null);
      }
    } else {
      // One-tap magic: try to auto-move
      dispatch({ type: 'SOLITAIRE_AUTO_MOVE', from, cardIndex });
      // We also select it just in case the user wants to manually pick a target
      setSelected({ from, cardIndex });
    }
  };

  const handleDraw = () => {
    dispatch({ type: 'SOLITAIRE_DRAW_CARD' });
    setSelected(null);
  };

  const renderCard = (card: CardType, from: string, index: number, isStack = false) => {
    const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
    const isSelected = selected?.from === from && selected?.cardIndex === index;

    return (
      <div 
        key={`${from}-${index}`}
        className={`solitaire-card ${card.isFaceUp ? 'face-up' : 'face-down'} ${isSelected ? 'selected' : ''} ${isStack ? 'stacked' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (card.isFaceUp) handleCardClick(from, index);
        }}
        style={{ '--stack-index': index } as React.CSSProperties}
      >
        {card.isFaceUp ? (
          <div className={`card-content ${isRed ? 'red' : 'black'}`}>
            <div className="card-corner top-left">
              <span>{card.rank}</span>
              <span>{SUIT_SYMBOLS[card.suit]}</span>
            </div>
            <div className="card-suit-large">{SUIT_SYMBOLS[card.suit]}</div>
            <div className="card-corner bottom-right">
              <span>{card.rank}</span>
              <span>{SUIT_SYMBOLS[card.suit]}</span>
            </div>
          </div>
        ) : (
          <div className="card-back">
            <div className="pattern"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="game-solitaire">
      <div className="solitaire-top">
        <div className="solitaire-decks">
          <div className="deck-slot" onClick={handleDraw}>
            {deck.length > 0 ? (
              <div className="solitaire-card face-down">
                <div className="card-back"><div className="pattern"></div></div>
              </div>
            ) : (
              <div className="empty-slot reset-icon">↺</div>
            )}
            <span className="count">{deck.length}</span>
          </div>
          <div className="waste-slot">
            {waste.length > 0 && renderCard(waste[waste.length - 1], 'waste', waste.length - 1)}
          </div>
        </div>

        <div className="solitaire-foundations">
          {foundations.map((f, i) => (
            <div 
              key={i} 
              className="foundation-slot"
              onClick={() => {
                if (selected) dispatch({ type: 'SOLITAIRE_MOVE_CARD', from: selected.from, to: `foundation-${i}`, cardIndex: selected.cardIndex });
                setSelected(null);
              }}
            >
              {f.length > 0 ? (
                renderCard(f[f.length - 1], `foundation-${i}`, f.length - 1)
              ) : (
                <div className="empty-slot foundation-icon">
                  {Object.values(SUIT_SYMBOLS)[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="solitaire-tableau">
        {piles.map((p, i) => (
          <div 
            key={i} 
            className="tableau-pile"
            onClick={() => {
              if (selected) dispatch({ type: 'SOLITAIRE_MOVE_CARD', from: selected.from, to: `pile-${i}`, cardIndex: selected.cardIndex });
              setSelected(null);
            }}
          >
            {p.length > 0 ? (
              p.map((card, idx) => renderCard(card, `pile-${i}`, idx, true))
            ) : (
              <div className="empty-slot"></div>
            )}
          </div>
        ))}
      </div>

      {isWin && (
        <div className="solitaire-overlay">
          <div className="overlay-content">
            <h2>You Win!</h2>
            <p>Congratulations, you've solved the solitaire!</p>
            <button className="restart-btn" onClick={() => dispatch({ type: 'SOLITAIRE_RESTART' })}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
