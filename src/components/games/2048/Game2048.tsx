import { useEffect, useCallback } from 'react';
import { useGame } from '../../../context/GameContext';
import './Game2048.css';

const TILE_COLORS: Record<number, string> = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
};

const TILE_TEXT_COLORS: Record<number, string> = {
  2: '#776e65',
  4: '#776e65',
  8: '#f9f6f2',
  16: '#f9f6f2',
  32: '#f9f6f2',
  64: '#f9f6f2',
  128: '#f9f6f2',
  256: '#f9f6f2',
  512: '#f9f6f2',
  1024: '#f9f6f2',
  2048: '#f9f6f2',
};

export default function Game2048() {
  const { state, dispatch } = useGame();
  const { grid, score, bestScore, isGameOver, isWin } = state.g2048;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isGameOver) return;
    if (e.key === 'ArrowUp') dispatch({ type: 'G2048_MOVE', direction: 'up' });
    if (e.key === 'ArrowDown') dispatch({ type: 'G2048_MOVE', direction: 'down' });
    if (e.key === 'ArrowLeft') dispatch({ type: 'G2048_MOVE', direction: 'left' });
    if (e.key === 'ArrowRight') dispatch({ type: 'G2048_MOVE', direction: 'right' });
  }, [dispatch, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch Support
  let touchStart: { x: number, y: number } | null = null;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) dispatch({ type: 'G2048_MOVE', direction: dx > 0 ? 'right' : 'left' });
    } else {
      if (Math.abs(dy) > 30) dispatch({ type: 'G2048_MOVE', direction: dy > 0 ? 'down' : 'up' });
    }
  };

  return (
    <div className="game-2048">
      <div className="g2048-header">
        <div className="g2048-scores">
          <div className="score-box">
            <span className="score-label">SCORE</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="score-box">
            <span className="score-label">BEST</span>
            <span className="score-value">{bestScore}</span>
          </div>
        </div>
      </div>

      <div 
        className="g2048-grid"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {grid.map((row, r) => (
          row.map((cell, c) => (
            <div key={`${r}-${c}`} className="grid-cell">
              {cell !== 0 && (
                <div 
                  className={`tile tile-${cell}`}
                  style={{ 
                    backgroundColor: TILE_COLORS[cell] || '#3c3a32',
                    color: TILE_TEXT_COLORS[cell] || '#f9f6f2',
                    fontSize: cell >= 1000 ? '1.8rem' : cell >= 100 ? '2.2rem' : '2.8rem'
                  }}
                >
                  {cell}
                </div>
              )}
            </div>
          ))
        ))}

        {isGameOver && (
          <div className="g2048-overlay">
            <h2>Game Over!</h2>
            <button className="restart-btn" onClick={() => dispatch({ type: 'G2048_RESTART' })}>
              Try Again
            </button>
          </div>
        )}

        {isWin && !isGameOver && (
          <div className="g2048-overlay win">
            <h2>You Win!</h2>
            <button className="restart-btn" onClick={() => dispatch({ type: 'G2048_RESTART' })}>
              Keep Going
            </button>
          </div>
        )}
      </div>

      <div className="g2048-footer">
        <p>Swipe or use arrows to join tiles!</p>
      </div>
    </div>
  );
}
