import { useEffect, useCallback } from 'react';
import { useGame } from '../../../context/GameContext';
import './GameCrossword.css';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function GameCrossword() {
  const { state, dispatch } = useGame();
  const { grid, acrossClues, downClues, selectedCell, direction, isWin } = state.crossword;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isWin) return;
    
    if (e.key === 'Backspace') {
      dispatch({ type: 'CROSSWORD_DELETE' });
    } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
      dispatch({ type: 'CROSSWORD_SET_LETTER', letter: e.key });
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Future: handle arrow navigation
    }
  }, [dispatch, isWin]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getCurrentClue = () => {
    if (!selectedCell) return null;
    const [r, c] = selectedCell;
    
    // Find the clue that applies to this cell in the current direction
    const clueList = direction === 'across' ? acrossClues : downClues;
    return clueList.find(clue => {
      if (direction === 'across') {
        return r === clue.row && c >= clue.col && c < clue.col + clue.answer.length;
      } else {
        return c === clue.col && r >= clue.row && r < clue.row + clue.answer.length;
      }
    });
  };

  const currentClue = getCurrentClue();

  return (
    <div className="game-crossword">
      <div className="crossword-grid-container">
        <div 
          className="crossword-grid" 
          style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
        >
          {grid.map((row, r) => (
            row.map((cell, c) => {
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInCurrentWord = currentClue && (
                direction === 'across' 
                  ? (r === currentClue.row && c >= currentClue.col && c < currentClue.col + currentClue.answer.length)
                  : (c === currentClue.col && r === currentClue.row && r < currentClue.row + currentClue.answer.length)
              );

              return (
                <div 
                  key={`${r}-${c}`}
                  className={`crossword-cell ${cell.isBlocked ? 'blocked' : ''} ${isSelected ? 'selected' : ''} ${isInCurrentWord ? 'highlight' : ''} ${cell.isError ? 'error' : ''} ${cell.isRevealed ? 'revealed' : ''}`}
                  onClick={() => !cell.isBlocked && dispatch({ type: 'CROSSWORD_SELECT_CELL', row: r, col: c })}
                >
                  {!cell.isBlocked && (
                    <>
                      {cell.number && <span className="cell-number">{cell.number}</span>}
                      <span className="cell-letter">{cell.letter}</span>
                    </>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      <div className="crossword-toolbar">
        <button 
          className="tool-btn" 
          onClick={() => dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' })}
          title="Switch Direction"
        >
          🔄 {direction === 'across' ? 'Across' : 'Down'}
        </button>
        <button 
          className="tool-btn" 
          onClick={() => dispatch({ type: 'CROSSWORD_CHECK_ERRORS' })}
          title="Check Errors"
        >
          ✅ Check
        </button>
        <div className="tool-dropdown">
          <button className="tool-btn main">💡 Hint</button>
          <div className="dropdown-content">
            <button onClick={() => dispatch({ type: 'CROSSWORD_REVEAL_LETTER' })}>Reveal Letter</button>
            <button onClick={() => dispatch({ type: 'CROSSWORD_REVEAL_WORD' })}>Reveal Word</button>
          </div>
        </div>
      </div>

      <div className="crossword-clue-display">
        {currentClue ? (
          <div className="current-clue">
            <span className="clue-label">{currentClue.number} {direction.toUpperCase()}:</span>
            <span className="clue-text">{currentClue.clue}</span>
          </div>
        ) : (
          <div className="current-clue hint">Select a cell to see the clue</div>
        )}
      </div>

      <div className="crossword-clue-lists">
        <div className="clue-section">
          <h3>Across</h3>
          <div className="clue-list">
            {acrossClues.map(clue => (
              <div 
                key={`across-${clue.number}`} 
                className={`clue-item ${currentClue === clue ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'CROSSWORD_SELECT_CELL', row: clue.row, col: clue.col })}
              >
                <strong>{clue.number}.</strong> {clue.clue}
              </div>
            ))}
          </div>
        </div>
        <div className="clue-section">
          <h3>Down</h3>
          <div className="clue-list">
            {downClues.map(clue => (
              <div 
                key={`down-${clue.number}`} 
                className={`clue-item ${currentClue === clue ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'CROSSWORD_SELECT_CELL', row: clue.row, col: clue.col })}
              >
                <strong>{clue.number}.</strong> {clue.clue}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="crossword-keyboard">
        {KEYS.map((row, i) => (
          <div key={i} className="keyboard-row">
            {row.map(key => (
              <button 
                key={key} 
                className={`key ${key === 'DEL' ? 'large' : ''}`}
                onClick={() => {
                  if (key === 'DEL') dispatch({ type: 'CROSSWORD_DELETE' });
                  else dispatch({ type: 'CROSSWORD_SET_LETTER', letter: key });
                }}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {isWin && (
        <div className="crossword-overlay">
          <div className="overlay-content">
            <h2>Marvelous!</h2>
            <p>You've solved the crossword puzzle!</p>
            <button className="restart-btn" onClick={() => dispatch({ type: 'CROSSWORD_RESTART' })}>
              New Puzzle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
