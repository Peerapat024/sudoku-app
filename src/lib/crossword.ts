import { CrosswordState, CrosswordCell } from '../types';

interface PuzzleData {
  size: number;
  cells: [number, number, string, number | null][];
  clues: {
    across: { number: number, clue: string, row: number, col: number, answer: string }[];
    down: { number: number, clue: string, row: number, col: number, answer: string }[];
  }
}

const PUZZLE_LIBRARY: PuzzleData[] = [
  // Puzzle 1: Multi-Game Hub Theme
  {
    size: 9,
    cells: [
      [1, 1, 'S', 1], [1, 2, 'U', null], [1, 3, 'D', null], [1, 4, 'O', null], [1, 5, 'K', null], [1, 6, 'U', null],
      [2, 1, 'L', 2], [3, 1, 'E', null], [4, 1, 'E', null], [5, 1, 'K', null],
      [3, 0, '2', 3], [3, 1, '0', null], [3, 2, '4', null], [3, 3, '8', null],
      [5, 2, 'W', 4], [5, 3, 'O', null], [5, 4, 'R', null], [5, 5, 'D', null], [5, 6, 'L', null], [5, 7, 'E', null],
      [0, 3, 'A', 5], [1, 3, 'D', null], [2, 3, 'A', null], [3, 3, 'P', null], [4, 3, 'T', null],
      [7, 1, 'C', 6], [7, 2, 'A', null], [7, 3, 'R', null], [7, 4, 'D', null],
      [2, 6, 'N', 7], [3, 6, 'I', null], [4, 6, 'T', null],
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
  },
  // Puzzle 2: Tech Theme
  {
    size: 9,
    cells: [
      [1, 1, 'C', 1], [1, 2, 'O', null], [1, 3, 'D', null], [1, 4, 'E', null],
      [1, 1, 'C', 1], [2, 1, 'L', 2], [3, 1, 'O', null], [4, 1, 'U', null], [5, 1, 'D', null],
      [3, 1, 'O', null], [3, 2, 'P', 3], [3, 3, 'E', null], [3, 4, 'N', null],
      [1, 4, 'E', null], [2, 4, 'M', 4], [3, 4, 'N', null], [4, 4, 'I', null], [5, 4, 'T', null],
      [5, 1, 'D', null], [5, 2, 'A', 5], [5, 3, 'T', null], [5, 4, 'A', null],
      [7, 3, 'F', 6], [7, 4, 'A', null], [7, 5, 'S', null], [7, 6, 'T', null],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Programmer write it', row: 1, col: 1, answer: 'CODE' },
        { number: 3, clue: 'Available to everyone', row: 3, col: 1, answer: 'OPEN' },
        { number: 5, clue: 'Information stored', row: 5, col: 1, answer: 'DATA' },
        { number: 6, clue: 'Quick response time', row: 7, col: 3, answer: 'FAST' },
      ],
      down: [
        { number: 1, clue: 'Online storage/hosting', row: 1, col: 1, answer: 'CLOUD' },
        { number: 4, clue: 'Small or tiny (prefix)', row: 2, col: 4, answer: 'EMIT' },
      ]
    }
  },
  // Puzzle 3: Nature Theme
  {
    size: 9,
    cells: [
      [1, 2, 'F', 1], [1, 3, 'L', null], [1, 4, 'O', null], [1, 5, 'W', null], [1, 6, 'E', null], [1, 7, 'R', null],
      [1, 2, 'F', 1], [2, 2, 'O', 2], [3, 2, 'R', null], [4, 2, 'E', null], [5, 2, 'S', null], [6, 2, 'T', null],
      [3, 0, 'W', 3], [3, 1, 'A', null], [3, 2, 'R', null], [3, 3, 'M', null],
      [0, 5, 'O', 4], [1, 5, 'W', null], [2, 5, 'L', null],
      [5, 0, 'S', 5], [5, 1, 'E', null], [5, 2, 'S', null],
      [5, 5, 'T', 6], [5, 6, 'R', null], [5, 7, 'E', null], [5, 8, 'E', null],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Rose or Tulip', row: 1, col: 2, answer: 'FLOWER' },
        { number: 3, clue: 'Pleasant temperature', row: 3, col: 0, answer: 'WARM' },
        { number: 5, clue: 'Great (ocean)', row: 5, col: 0, answer: 'SEA' },
        { number: 6, clue: 'Tall plant with trunk', row: 5, col: 5, answer: 'TREE' },
      ],
      down: [
        { number: 1, clue: 'Dense collection of trees', row: 1, col: 2, answer: 'FOREST' },
        { number: 4, clue: 'Nocturnal bird', row: 0, col: 5, answer: 'OWL' },
      ]
    }
  }
];

export function getInitialCrossword(): CrosswordState {
  // Pick random puzzle
  const puzzle = PUZZLE_LIBRARY[Math.floor(Math.random() * PUZZLE_LIBRARY.length)];

  const finalGrid: CrosswordCell[][] = Array.from({ length: puzzle.size }, () =>
    Array.from({ length: puzzle.size }, () => ({
      letter: '',
      solution: '',
      isBlocked: true,
    }))
  );

  puzzle.cells.forEach(([r, c, sol, num]) => {
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
  };
}
