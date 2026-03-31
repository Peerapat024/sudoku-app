import { useEffect, useCallback } from 'react';
import { useGame } from '../../../context/GameContext';
import { getLetterStatus } from '../../../lib/wordle';
import './GameWordle.css';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function GameWordle() {
  const { state, dispatch } = useGame();
  const { board, currentRow, isGameOver, isWin, solution, usedLetters } = state.wordle;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isGameOver) return;
    if (e.key === 'Enter') dispatch({ type: 'WORDLE_SUBMIT' });
    else if (e.key === 'Backspace') dispatch({ type: 'WORDLE_DELETE' });
    else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      dispatch({ type: 'WORDLE_KEY_PRESS', key: e.key.toUpperCase() });
    }
  }, [dispatch, isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getStatusClass = (rowIdx: number, colIdx: number) => {
    if (rowIdx >= currentRow || (rowIdx === currentRow && !isGameOver)) return '';
    const guess = board[rowIdx].join('');
    const status = getLetterStatus(guess, solution)[colIdx];
    return `status-${status}`;
  };

  return (
    <div className="game-wordle">
      <div className="wordle-grid">
        {board.map((row, r) => (
          <div key={r} className="wordle-row">
            {row.map((letter, c) => (
              <div key={c} className={`wordle-cell ${letter ? 'has-letter' : ''} ${getStatusClass(r, c)}`}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="wordle-keyboard">
        {KEYS.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map(key => {
              const status = usedLetters[key];
              return (
                <button
                  key={key}
                  className={`key ${key.length > 1 ? 'large' : ''} ${status ? `status-${status}` : ''}`}
                  onClick={() => {
                    if (key === 'ENTER') dispatch({ type: 'WORDLE_SUBMIT' });
                    else if (key === 'DEL') dispatch({ type: 'WORDLE_DELETE' });
                    else dispatch({ type: 'WORDLE_KEY_PRESS', key });
                  }}
                >
                  {key === 'DEL' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {isGameOver && (
        <div className="wordle-overlay">
          <div className="overlay-content">
            <h2>{isWin ? 'Magnificent!' : 'Game Over'}</h2>
            {!isWin && <p>The word was <strong>{solution}</strong></p>}
            <button className="restart-btn" onClick={() => dispatch({ type: 'WORDLE_RESTART' })}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
