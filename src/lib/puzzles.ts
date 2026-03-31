export interface PuzzleData {
  id: string;
  theme: string;
  size: number;
  cells: [number, number, string, number | null][];
  clues: {
    across: { number: number, clue: string, row: number, col: number, answer: string }[];
    down: { number: number, clue: string, row: number, col: number, answer: string }[];
  };
  revealer?: string;
}

export const PUZZLE_LIBRARY: PuzzleData[] = [
  {
    id: 'f1',
    theme: 'Double Talk',
    size: 15,
    revealer: 'Common phrases with repeated words.',
    cells: [
      // Row 0
      [0, 0, 'N', 1], [0, 1, 'E', 2], [0, 2, 'V', 3], [0, 3, 'E', 4], [0, 4, 'R', 5], [0, 5, 'N', 6], [0, 6, 'E', 7], [0, 7, 'V', 8], [0, 8, 'E', 9], [0, 9, 'R', 10], [0, 10, '.', null], [0, 11, 'T', 11], [0, 12, 'A', 12], [0, 13, 'L', 13], [0, 14, 'K', 14],
      // Row 1
      [1, 0, 'O', null], [1, 1, 'R', null], [1, 2, 'A', null], [1, 3, 'L', null], [1, 4, '.', null], [1, 5, '.', null], [1, 6, 'L', 15], [1, 7, 'I', null], [1, 8, 'D', null], [1, 9, 'S', null], [1, 10, '.', null], [1, 11, 'A', null], [1, 12, 'L', null], [1, 13, 'O', null], [1, 14, 'E', null],
      // Row 2
      [2, 0, 'D', 16], [2, 1, 'A', null], [2, 2, 'C', null], [2, 3, 'E', null], [2, 4, '.', null], [2, 5, 'R', 17], [2, 6, 'A', null], [2, 7, 'V', null], [2, 8, 'I', null], [2, 9, 'O', null], [2, 10, 'L', 18], [2, 11, 'I', null], [2, 12, '.', null], [2, 13, '.', null], [2, 14, '.', null],
    ],
    clues: {
      across: [
        { number: 1, clue: 'Certainly not, repeated', row: 0, col: 0, answer: 'NEVERNEVER' },
        { number: 11, clue: 'Speak or chat', row: 0, col: 11, answer: 'TALK' },
        { number: 15, clue: 'Jar covers', row: 1, col: 6, answer: 'LIDS' },
        { number: 17, clue: 'Pasta square', row: 2, col: 5, answer: 'RAVIOLI' },
      ],
      down: [
        { number: 1, clue: 'Unspoken, say', row: 0, col: 0, answer: 'NOD' },
        { number: 6, clue: 'Zero in scoring', row: 0, col: 5, answer: 'NIL' },
      ]
    }
  },
  {
    id: 'f2',
    theme: 'Urban Legends',
    size: 15,
    revealer: 'Famous city nicknames and landmarks.',
    cells: [
       // Row 0
       [0, 0, 'B', 1], [0, 1, 'I', 2], [0, 2, 'G', 3], [0, 3, 'A', 4], [0, 4, 'P', 5], [0, 5, 'P', 6], [0, 6, 'L', 7], [0, 7, 'E', 8], [0, 8, '.', null], [0, 9, 'V', 9], [0, 10, 'E', 10], [0, 11, 'N', 11], [0, 12, 'I', 12], [0, 13, 'C', 13], [0, 14, 'E', 14],
    ],
    clues: {
      across: [
        { number: 1, clue: 'New York\'s nickname', row: 0, col: 0, answer: 'BIGAPPLE' },
        { number: 9, clue: 'City of Canals', row: 0, col: 9, answer: 'VENICE' },
      ],
      down: [
        { number: 1, clue: 'London\'s clock chime', row: 0, col: 0, answer: 'BONG' }
      ]
    }
  },
  // (Adding elite 15x15 flagship entries)
];
