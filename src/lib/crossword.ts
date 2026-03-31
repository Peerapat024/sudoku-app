import { CrosswordState, CrosswordCell } from '../types';
import { PUZZLE_LIBRARY } from './puzzles';

export function getInitialCrossword(): CrosswordState {
  // Pick random puzzle from library
  const puzzle = PUZZLE_LIBRARY[Math.floor(Math.random() * PUZZLE_LIBRARY.length)];

  const finalGrid: CrosswordCell[][] = Array.from({ length: puzzle.size }, () =>
    Array.from({ length: puzzle.size }, () => ({
      letter: '',
      solution: '',
      isBlocked: true,
    }))
  );

  puzzle.cells.forEach(([r, c, sol, num]) => {
    // Validation for safety
    if (r >= puzzle.size || c >= puzzle.size) return;
    
    finalGrid[r][c] = {
      letter: '',
      solution: sol,
      isBlocked: false,
      number: num || undefined
    };
  });

  return {
    grid: finalGrid,
    acrossClues: puzzle.clues.across.map(c => ({ ...c, direction: 'across' })),
    downClues: puzzle.clues.down.map(c => ({ ...c, direction: 'down' })),
    selectedCell: null,
    direction: 'across',
    isWin: false,
    theme: puzzle.theme,
    puzzleId: puzzle.id,
  };
}
