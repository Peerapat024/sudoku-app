import { Difficulty } from '../types';
import { solveRandom, countSolutions } from './solver';

const CLUE_COUNTS: Record<Difficulty, [number, number]> = {
  easy:   [38, 42],
  medium: [30, 34],
  hard:   [25, 29],
  expert: [22, 24],
};

export function generatePuzzle(difficulty: Difficulty): {
  puzzle: number[][];
  solution: number[][];
} {
  // Step 1: Generate a complete solved grid
  const empty = Array.from({ length: 9 }, () => Array(9).fill(0));
  const solution = solveRandom(empty);
  if (!solution) throw new Error('Failed to generate a solved grid');

  // Step 2: Dig out cells while maintaining unique solution
  const puzzle = solution.map(row => [...row]);
  const [minClues, maxClues] = CLUE_COUNTS[difficulty];
  const targetClues = minClues + Math.floor(Math.random() * (maxClues - minClues + 1));

  // Build list of all positions and shuffle
  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  shuffleArray(positions);

  let currentClues = 81;

  for (const [r, c] of positions) {
    if (currentClues <= targetClues) break;
    if (puzzle[r][c] === 0) continue;

    const saved = puzzle[r][c];
    puzzle[r][c] = 0;

    if (countSolutions(puzzle, 2) !== 1) {
      // Removing this cell creates multiple solutions — restore it
      puzzle[r][c] = saved;
    } else {
      currentClues--;
    }
  }

  return { puzzle, solution };
}

function shuffleArray<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
