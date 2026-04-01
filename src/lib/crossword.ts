import { PUZZLE_LIBRARY } from './puzzles';

export function getInitialCrossword(puzzleId?: string): any {
  let puzzle = puzzleId ? PUZZLE_LIBRARY.find((p: any) => p.id === puzzleId) : null;
  
  if (!puzzle) {
    // Select a random Flagship (15x15)
    const flagships = PUZZLE_LIBRARY.filter((p: any) => p.size === 15);
    puzzle = flagships[Math.floor(Math.random() * flagships.length)];
  }

  // Ensure we have a puzzle, fallback to first if none
  if (!puzzle) puzzle = PUZZLE_LIBRARY[0];

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
    acrossClues: puzzle.clues?.across || [],
    downClues: puzzle.clues?.down || [],
    isWin: false,
    theme: puzzle.theme,
    puzzleId: puzzle.id,
    revealer: puzzle.revealer,
  };
}
