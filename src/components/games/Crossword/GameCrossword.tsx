import { useEffect, useCallback, useMemo } from 'react';
import { useGame } from '../../../context/GameContext';
import './GameCrossword.css';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export default function GameCrossword() {
  const { state, dispatch } = useGame();
  const { grid, direction, selectedCell, isWin, theme, puzzleId } = state.crossword;

  const currentClue = useMemo(() => {
    if (!selectedCell) return null;
    const [r, c] = selectedCell;
    
    // Find the word starting cell
    let startR = r, startC = c;
    if (direction === 'across') {
      while (startC > 0 && !grid[r][startC - 1].isBlocked) startC--;
    } else {
      while (startR > 0 && !grid[startR - 1][c].isBlocked) startR--;
    }
    
    const startCell = grid[startR][startC];
    return `Clue for ${startCell.number} ${direction.toUpperCase()}`;
  }, [grid, direction, selectedCell, state.crossword]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isWin) return;
    if (e.key === 'Backspace') dispatch({ type: 'CROSSWORD_DELETE' });
    else if (e.key === ' ') { e.preventDefault(); dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' }); }
    else if (e.key === 'ArrowUp') dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'up' });
    else if (e.key === 'ArrowDown') dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'down' });
    else if (e.key === 'ArrowLeft') dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'left' });
    else if (e.key === 'ArrowRight') dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'right' });
    else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) dispatch({ type: 'CROSSWORD_SET_LETTER', letter: e.key });
  }, [dispatch, isWin]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onKeyClick = (key: string) => {
    if (key === '⌫') dispatch({ type: 'CROSSWORD_DELETE' });
    else dispatch({ type: 'CROSSWORD_SET_LETTER', letter: key });
  };

  const getActiveWordRange = () => {
    if (!selectedCell) return [];
    const [r, c] = selectedCell;
    const range = [];
    if (direction === 'across') {
      let currC = c;
      while (currC > 0 && !grid[r][currC - 1].isBlocked) currC--;
      while (currC < grid[0].length && !grid[r][currC].isBlocked) {
        range.push(`${r}-${currC}`);
        currC++;
      }
    } else {
      let currR = r;
      while (currR > 0 && !grid[currR - 1][c].isBlocked) currR--;
      while (currR < grid.length && !grid[currR][c].isBlocked) {
        range.push(`${currR}-${c}`);
        currR++;
      }
    }
    return range;
  };

  const activeWordRange = getActiveWordRange();

  return (
    <div className="full-crossword">
      <div className="crossword-hud">
        <div className="hud-meta">
          <span className="hud-id">#{puzzleId}</span>
          <span className="hud-theme">{theme}</span>
        </div>
        <div className="hud-word-preview">
          {activeWordRange.map(id => {
            const [r, c] = id.split('-').map(Number);
            return (
              <span key={id} className={`preview-letter ${selectedCell?.[0] === r && selectedCell?.[1] === c ? 'active' : ''}`}>
                {grid[r][c].letter || '_'}
              </span>
            );
          })}
        </div>
      </div>

      <div className="crossword-grid-container">
        <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
          {grid.map((row, r) => row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`grid-cell ${cell.isBlocked ? 'blocked' : ''} ${selectedCell?.[0] === r && selectedCell?.[1] === c ? 'selected' : ''} ${activeWordRange.includes(`${r}-${c}`) ? 'in-word' : ''} ${cell.isError ? 'error' : ''}`}
              onClick={() => !cell.isBlocked && dispatch({ type: 'CROSSWORD_SELECT_CELL', row: r, col: c })}
            >
              {!cell.isBlocked && (
                <>
                  {cell.number && <span className="cell-number">{cell.number}</span>}
                  <span className="cell-letter">{cell.letter}</span>
                </>
              )}
            </div>
          )))}
        </div>
      </div>

      <div className="clue-bar">
        <button className="clue-nav prev">‹</button>
        <div className="current-clue-text">
          <strong>{direction.toUpperCase()}:</strong> {currentClue}
        </div>
        <button className="clue-nav next">›</button>
      </div>

      <div className="custom-keyboard">
        {KEYBOARD_ROWS.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map(key => (
              <button key={key} className={`key ${key === '⌫' ? 'backspace' : ''}`} onClick={() => onKeyClick(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {isWin && (
        <div className="crossword-overlay">
          <div className="overlay-content">
            <div className="win-emoji">🎉</div>
            <h2>Magnificent!</h2>
            <p>You conquered the full grid.</p>
            <button className="restart-btn" onClick={() => dispatch({ type: 'CROSSWORD_RESTART' })}>
              Next Puzzle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
