import { useEffect, useCallback, useRef, useState } from 'react';
import { useGame } from '../../../context/GameContext';
import { fetchCrosswordPuzzle } from '../../../lib/crossword';
import { CrosswordClue } from '../../../types';
import './GameCrossword.css';

const THEMES = ['animals', 'food', 'sports', 'science', 'history', 'geography', 'music', 'movies'];
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export default function GameCrossword() {
  const { state, dispatch } = useGame();
  const { grid, acrossClues, downClues, selectedCell, direction, isWin, isLoading, error, theme } = state.crossword;
  const [activeClue, setActiveClue] = useState<CrosswordClue | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('animals');
  const [selectedDifficulty, setSelectedDifficulty] = useState<typeof DIFFICULTIES[number]>('medium');
  const clueListRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);
  // Hidden input ref for native mobile keyboard
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch puzzle ───────────────────────────────────────────────────────────
  const loadPuzzle = useCallback(async (t?: string, d?: typeof DIFFICULTIES[number]) => {
    dispatch({ type: 'CROSSWORD_RESTART' });
    try {
      const puzzle = await fetchCrosswordPuzzle({ theme: t, difficulty: d });
      dispatch({ type: 'CROSSWORD_LOAD_PUZZLE', puzzle });
    } catch (e) {
      dispatch({ type: 'CROSSWORD_LOAD_ERROR', error: (e as Error).message ?? 'Failed to fetch puzzle' });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetched.current && isLoading && grid.length === 0) {
      hasFetched.current = true;
      loadPuzzle(selectedTheme, selectedDifficulty);
    }
  }, [isLoading, grid.length, loadPuzzle, selectedTheme, selectedDifficulty]);

  // ── Focus hidden input whenever a cell is selected ────────────────────────
  useEffect(() => {
    if (selectedCell && hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
  }, [selectedCell]);

  // ── Active clue derivation ────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedCell) { setActiveClue(null); return; }
    const [r, c] = selectedCell;
    const clues = direction === 'across' ? acrossClues : downClues;
    const found = clues.find((clue) => {
      if (direction === 'across') {
        return r === clue.row && c >= clue.col && c < clue.col + clue.answer.length;
      } else {
        return c === clue.col && r >= clue.row && r < clue.row + clue.answer.length;
      }
    });
    setActiveClue(found ?? null);

    if (found) {
      const el = document.getElementById(`clue-${found.direction}-${found.number}`);
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedCell, direction, acrossClues, downClues]);

  // ── Hidden input: handles mobile letter input ─────────────────────────────
  const handleHiddenInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if (!val) return;
    const letter = val[val.length - 1];
    if (letter && letter.match(/[a-zA-Z]/)) {
      dispatch({ type: 'CROSSWORD_SET_LETTER', letter: letter.toUpperCase() });
    }
    // Reset so the next keystroke is always captured fresh
    e.currentTarget.value = '';
  }, [dispatch]);

  const handleHiddenKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isWin || isLoading) return;
    if (e.key === 'Backspace') {
      dispatch({ type: 'CROSSWORD_DELETE' });
      e.preventDefault();
    } else if (e.key === 'ArrowUp') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'up' }); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'down' }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'left' }); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'right' }); }
    else if (e.key === 'Tab') { e.preventDefault(); dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' }); }
  }, [dispatch, isWin, isLoading]);

  // ── Desktop keyboard fallback (window-level) ──────────────────────────────
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (document.activeElement === hiddenInputRef.current) return;
    if (isWin || isLoading) return;
    if (e.key === 'ArrowUp') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'up' }); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'down' }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'left' }); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); dispatch({ type: 'CROSSWORD_MOVE_CURSOR', direction: 'right' }); }
    else if (e.key === 'Tab') { e.preventDefault(); dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' }); }
    else if (e.key === 'Backspace') dispatch({ type: 'CROSSWORD_DELETE' });
    else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      dispatch({ type: 'CROSSWORD_SET_LETTER', letter: e.key.toUpperCase() });
    }
  }, [dispatch, isWin, isLoading]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── Highlight helpers ─────────────────────────────────────────────────────
  function getCellClass(r: number, c: number): string {
    const cell = grid[r][c];
    if (cell.isBlocked) return 'cw-cell blocked';
    const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
    let isWordHighlight = false;
    if (selectedCell && activeClue) {
      if (direction === 'across') {
        isWordHighlight = r === activeClue.row && c >= activeClue.col && c < activeClue.col + activeClue.answer.length;
      } else {
        isWordHighlight = c === activeClue.col && r >= activeClue.row && r < activeClue.row + activeClue.answer.length;
      }
    }
    return [
      'cw-cell',
      isSelected ? 'selected' : '',
      isWordHighlight && !isSelected ? 'highlighted' : '',
      cell.isError ? 'error' : '',
      cell.isRevealed ? 'revealed' : '',
    ].filter(Boolean).join(' ');
  }

  // ── Cell tap: select + focus hidden input ─────────────────────────────────
  function handleCellTap(r: number, c: number) {
    if (grid[r][c].isBlocked) return;
    // If already selected, just re-focus without re-dispatching SELECT_CELL
    // (re-dispatching the same cell would wrongly toggle direction)
    if (selectedCell?.[0] === r && selectedCell?.[1] === c) {
      hiddenInputRef.current?.focus({ preventScroll: true });
      return;
    }
    dispatch({ type: 'CROSSWORD_SELECT_CELL', row: r, col: c });
    hiddenInputRef.current?.focus({ preventScroll: true });
  }

  // ── Clue click ────────────────────────────────────────────────────────────
  function handleClueClick(clue: CrosswordClue) {
    if (direction !== clue.direction) dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' });
    dispatch({ type: 'CROSSWORD_SELECT_CELL', row: clue.row, col: clue.col });
    hiddenInputRef.current?.focus({ preventScroll: true });
  }

  // ── New game ──────────────────────────────────────────────────────────────
  function handleNewGame() {
    hasFetched.current = false;
    loadPuzzle(selectedTheme, selectedDifficulty);
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="crossword-loading">
        <div className="cw-spinner" />
        <p>Generating puzzle…</p>
        <p className="cw-loading-sub">Fetching a fresh crossword</p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error || grid.length === 0) {
    return (
      <div className="crossword-error">
        <div className="cw-error-icon">⚠️</div>
        <h3>Couldn't load puzzle</h3>
        <p>{error ?? 'No puzzle data returned.'}</p>
        <p className="cw-error-hint">Make sure your API key is set in <code>VITE_CROSSWORD_API_KEY</code></p>
        <button className="cw-btn primary" onClick={handleNewGame}>Try Again</button>
      </div>
    );
  }

  const gridSize = grid.length;

  return (
    <div className="game-crossword">
      {/*
        Hidden input — must use opacity:0 + position:fixed (NOT display:none)
        so iOS/Android will actually focus it and show the native keyboard.
        font-size:16px prevents iOS auto-zoom on focus.
      */}
      <input
        ref={hiddenInputRef}
        className="cw-hidden-input"
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        onInput={handleHiddenInput}
        onKeyDown={handleHiddenKeyDown}
        aria-label="Crossword letter input"
        tabIndex={-1}
      />

      {/* ── Controls bar ──────────────────────────────────────── */}
      <div className="cw-controls">
        <select
          className="cw-select"
          value={selectedTheme}
          onChange={e => setSelectedTheme(e.target.value)}
        >
          {THEMES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>

        <select
          className="cw-select"
          value={selectedDifficulty}
          onChange={e => setSelectedDifficulty(e.target.value as typeof DIFFICULTIES[number])}
        >
          {DIFFICULTIES.map(d => (
            <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
          ))}
        </select>

        <button className="cw-btn primary" onClick={handleNewGame}>New Puzzle</button>
        <button className="cw-btn" onClick={() => dispatch({ type: 'CROSSWORD_CHECK_ERRORS' })}>Check</button>
        <button className="cw-btn" onClick={() => dispatch({ type: 'CROSSWORD_REVEAL_WORD' })}>Reveal Word</button>
      </div>

      {/* ── Theme badge ───────────────────────────────────────── */}
      <div className="cw-theme-badge">
        <span className="cw-theme-label">Theme:</span>
        <span className="cw-theme-val">{theme || 'General'}</span>
        <span className="cw-direction-toggle" onClick={() => dispatch({ type: 'CROSSWORD_TOGGLE_DIRECTION' })}>
          {direction === 'across' ? '→ Across' : '↓ Down'} <span className="cw-tab-hint">Tab</span>
        </span>
      </div>

      {/* ── Active clue — tap to re-open keyboard ─────────────── */}
      {activeClue && (
        <div
          className="cw-active-clue"
          onClick={() => hiddenInputRef.current?.focus({ preventScroll: true })}
        >
          <span className="cw-active-clue-num">{activeClue.number}{activeClue.direction === 'across' ? 'A' : 'D'}</span>
          <span className="cw-active-clue-text">{activeClue.clue}</span>
          <span className="cw-active-clue-tap">⌨️</span>
        </div>
      )}

      {/* ── Main layout ───────────────────────────────────────── */}
      <div className="cw-main">
        {/* Grid */}
        <div
          className="cw-grid"
          style={{ '--grid-size': gridSize } as React.CSSProperties}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={getCellClass(r, c)}
                onClick={() => handleCellTap(r, c)}
              >
                {cell.number && <span className="cw-cell-num">{cell.number}</span>}
                {!cell.isBlocked && <span className="cw-cell-letter">{cell.letter}</span>}
              </div>
            ))
          )}
        </div>

        {/* Clue panel */}
        <div className="cw-clues" ref={clueListRef}>
          <div className="cw-clue-section">
            <h3 className="cw-clue-heading">Across</h3>
            {acrossClues.map(clue => (
              <div
                key={clue.number}
                id={`clue-across-${clue.number}`}
                className={`cw-clue-item ${activeClue?.number === clue.number && activeClue?.direction === 'across' ? 'active' : ''}`}
                onClick={() => handleClueClick(clue)}
              >
                <span className="cw-clue-num">{clue.number}.</span>
                <span className="cw-clue-text">{clue.clue}</span>
                <span className="cw-clue-len">({clue.answer.length})</span>
              </div>
            ))}
          </div>

          <div className="cw-clue-section">
            <h3 className="cw-clue-heading">Down</h3>
            {downClues.map(clue => (
              <div
                key={clue.number}
                id={`clue-down-${clue.number}`}
                className={`cw-clue-item ${activeClue?.number === clue.number && activeClue?.direction === 'down' ? 'active' : ''}`}
                onClick={() => handleClueClick(clue)}
              >
                <span className="cw-clue-num">{clue.number}.</span>
                <span className="cw-clue-text">{clue.clue}</span>
                <span className="cw-clue-len">({clue.answer.length})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Win overlay ───────────────────────────────────────── */}
      {isWin && (
        <div className="cw-win-overlay">
          <div className="cw-win-card">
            <div className="cw-win-emoji">🎉</div>
            <h2>Puzzle Complete!</h2>
            <p>Excellent work! You solved the <strong>{theme}</strong> crossword.</p>
            <button className="cw-btn primary large" onClick={handleNewGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}
