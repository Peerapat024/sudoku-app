import { PuzzleData } from './puzzles';

export function getInitialCrossword(puzzleId?: string): any {
  const allPuzzles = require('./puzzles').PUZZLE_LIBRARY;
  let puzzle = puzzleId ? allPuzzles.find((p: any) => p.id === puzzleId) : null;
  
  if (!puzzle) {
    // Select a random Flagship (15x15)
    const flagships = allPuzzles.filter((p: any) => p.size === 15);
    puzzle = flagships[Math.floor(Math.random() * flagships.length)];
  }

  // Ensure we have a puzzle, fallback to first if none
  if (!puzzle) puzzle = allPuzzles[0];

  const grid = Array(puzzle.size).fill(null).map(() => 
    Array(puzzle.size).fill(null).map(() => ({
      letter: '',
      solution: '',
      isBlocked: true,
      number: null,
      isError: false,
    }))
  );

  puzzle.cells.forEach(([r, c, solution, number]: any) => {
    grid[r][c] = {
      letter: '',
      solution: solution.toUpperCase(),
      isBlocked: false,
      number: number,
      isError: false,
    };
  });

  return {
    grid,
    direction: 'across',
    selectedCell: puzzle.cells[0] ? [puzzle.cells[0][0], puzzle.cells[0][1]] : [0, 0],
    isWin: false,
    theme: puzzle.theme,
    puzzleId: puzzle.id,
    revealer: puzzle.revealer,
  };
}
