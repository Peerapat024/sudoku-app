import { useEffect, useCallback, useRef, useState } from 'react';
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
  2: '#3c3a32',
  4: '#3c3a32',
  8: '#ffffff',
  16: '#ffffff',
  32: '#ffffff',
  64: '#ffffff',
  128: '#ffffff',
  256: '#ffffff',
  512: '#ffffff',
  1024: '#ffffff',
  2048: '#ffffff',
};

export default function Game2048() {
  const { state, dispatch } = useGame();
  const { grid, score, bestScore, isGameOver, isWin } = state.g2048;
  const [isMoving, setIsMoving] = useState(false);
  const prevGridRef = useRef<number[][]>(grid);

  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (isGameOver) return;
    setIsMoving(true);
    dispatch({ type: 'G2048_MOVE', direction });
    setTimeout(() => setIsMoving(false), 100);
  }, [dispatch, isGameOver]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') handleMove('up');
    if (e.key === 'ArrowDown') handleMove('down');
    if (e.key === 'ArrowLeft') handleMove('left');
    if (e.key === 'ArrowRight') handleMove('right');
  }, [handleMove]);

  const touchStart = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    prevGridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    const handleTS = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    
    const handleTE = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) handleMove(dx > 0 ? 'right' : 'left');
      } else {
        if (Math.abs(dy) > 30) handleMove(dy > 0 ? 'down' : 'up');
      }
      touchStart.current = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTS, { passive: false });
    window.addEventListener('touchend', handleTE, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTS);
      window.removeEventListener('touchend', handleTE);
    };
  }, [handleKeyDown, handleMove]);

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

      <div className={`g2048-grid ${isMoving ? 'moving' : ''}`}>
        {grid.map((row, r) => (
          row.map((cell, c) => {
            const isMerged = cell !== 0 && cell > (prevGridRef.current[r]?.[c] || 0) && (prevGridRef.current[r]?.[c] || 0) !== 0;
            
            return (
              <div key={`${r}-${c}`} className="grid-cell">
                {cell !== 0 && (
                  <div 
                    className={`tile tile-${cell} ${isMerged ? 'tile-merged' : ''}`}
                    style={{ 
                      backgroundColor: TILE_COLORS[cell] || '#3c3a32',
                      color: TILE_TEXT_COLORS[cell] || '#f9f6f2',
                      fontSize: cell >= 1000 ? '1.5rem' : cell >= 100 ? '1.8rem' : '2.2rem'
                    }}
                  >
                    {cell}
                  </div>
                )}
              </div>
            );
          })
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
