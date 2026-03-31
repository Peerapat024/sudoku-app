import { CrosswordState, CrosswordCell } from '../types';

export function getInitialCrossword(): CrosswordState {
  // Puzzle data
  const samplePuzzle = {
    size: 9,
    cells: [
      // row, col, solution, number (optional)
      [1, 1, 'S', 1], [1, 2, 'U', null], [1, 3, 'D', null], [1, 4, 'O', null], [1, 5, 'K', null], [1, 6, 'U', null],
      [1, 1, 'S', 1], [2, 1, 'L', 2], [3, 1, 'E', null], [4, 1, 'E', null], [5, 1, 'K', null], // SLEEK
      [3, 0, '2', 3], [3, 1, '0', null], [3, 2, '4', null], [3, 3, '8', null], // 2048
      [5, 2, 'W', 4], [5, 3, 'O', null], [5, 4, 'R', null], [5, 5, 'D', null], [5, 6, 'L', null], [5, 7, 'E', null], // WORDLE
      [0, 3, 'A', 5], [1, 3, 'D', null], [2, 3, 'A', null], [3, 3, 'P', null], [4, 3, 'T', null], // ADAPT
      [7, 1, 'C', 6], [7, 2, 'A', null], [7, 3, 'R', null], [7, 4, 'D', null], // CARD
      [1, 6, 'U', null], [2, 6, 'N', 7], [3, 6, 'I', null], [4, 6, 'T', null], // UNIT
    ],
    clues: {
      across: [
        { number: 1, clue: 'Grid puzzle in this app', row: 1, col: 1, answer: 'SUDOKU' },
        { number: 3, clue: 'Tile merging game', row: 3, col: 0, answer: '2048' },
        { number: 4, clue: 'Six-try word game', row: 5, col: 2, answer: 'WORDLE' },
        { number: 6, clue: 'Solitaire uses them', row: 7, col: 1, answer: 'CARD' },
      ],
      down: [
        { number: 1, clue: 'Smooth and modern', row: 1, col: 1, answer: 'SLEEK' },
        { number: 5, clue: 'Adjust to new conditions', row: 0, col: 3, answer: 'ADAPT' },
        { number: 7, clue: 'Single part of a whole', row: 2, col: 6, answer: 'UNIT' },
      ]
    }
  };

  const finalGrid: CrosswordCell[][] = Array.from({ length: samplePuzzle.size }, () =>
    Array.from({ length: samplePuzzle.size }, () => ({
      letter: '',
      solution: '',
      isBlocked: true,
    }))
  );

  samplePuzzle.cells.forEach(([r, c, sol, num]) => {
    finalGrid[r as number][c as number] = {
      letter: '',
      solution: sol as string,
      isBlocked: false,
      number: num as number || undefined
    };
  });

  return {
    grid: finalGrid,
    acrossClues: samplePuzzle.clues.across.map(c => ({ ...c, direction: 'across' })),
    downClues: samplePuzzle.clues.down.map(c => ({ ...c, direction: 'down' })),
    selectedCell: null,
    direction: 'across',
    isWin: false,
  };
}
