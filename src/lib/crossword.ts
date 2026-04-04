import { CrosswordState, CrosswordClue, CrosswordCell } from '../types';

const API_URL = 'https://api.apiverve.com/v1/crossword';
const API_KEY = import.meta.env.VITE_CROSSWORD_API_KEY ?? '';

// ── Empty / loading state ──────────────────────────────────────────────────

export function getInitialCrossword(): CrosswordState {
  return {
    grid: [],
    acrossClues: [],
    downClues: [],
    selectedCell: null,
    direction: 'across',
    isWin: false,
    theme: '',
    puzzleId: '',
    revealer: undefined,
    isLoading: true,
    error: null,
  };
}

// ── API response types ────────────────────────────────────────────────────

interface ApiClue {
  number: number;
  clue: string;
  answer: string;
  length: number;
}

interface ApiResponse {
  status: string;
  data: {
    size: number;
    difficulty: string;
    theme: string;
    grid: (string | null)[][];
    across: ApiClue[];
    down: ApiClue[];
    wordCount: number;
  };
}

// ── Position derivation ───────────────────────────────────────────────────
// The API doesn't return row/col for clues, so we derive them from the grid.

function derivePositions(
  grid: (string | null)[][],
  across: ApiClue[],
  down: ApiClue[]
): { acrossClues: CrosswordClue[]; downClues: CrosswordClue[] } {
  const size = grid.length;

  // Assign cell numbers: scan left-to-right, top-to-bottom
  // A cell gets a number if it starts an across or down word
  const cellNumbers: Map<string, number> = new Map();
  let num = 1;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === null) continue;

      const startsAcross =
        (c === 0 || grid[r][c - 1] === null) &&
        c + 1 < size &&
        grid[r][c + 1] !== null;

      const startsDown =
        (r === 0 || grid[r - 1][c] === null) &&
        r + 1 < size &&
        grid[r + 1][c] !== null;

      if (startsAcross || startsDown) {
        cellNumbers.set(`${r},${c}`, num++);
      }
    }
  }

  // Build a lookup: number -> {row, col}
  const numToPos: Map<number, { row: number; col: number }> = new Map();
  cellNumbers.forEach((n, key) => {
    const [r, c] = key.split(',').map(Number);
    numToPos.set(n, { row: r, col: c });
  });

  const toClues = (apiClues: ApiClue[], direction: 'across' | 'down'): CrosswordClue[] =>
    apiClues
      .map((c) => {
        const pos = numToPos.get(c.number);
        if (!pos) return null;
        return {
          number: c.number,
          direction,
          clue: c.clue,
          answer: c.answer.toUpperCase(),
          row: pos.row,
          col: pos.col,
        };
      })
      .filter((c): c is CrosswordClue => c !== null);

  return {
    acrossClues: toClues(across, 'across'),
    downClues: toClues(down, 'down'),
  };
}

// ── Transform API response → CrosswordState ───────────────────────────────

function transformApiResponse(data: ApiResponse['data']): CrosswordState {
  const rawGrid = data.grid;
  const size = rawGrid.length;

  // Build across/down clue lookup keyed by [number, direction]
  const { acrossClues, downClues } = derivePositions(rawGrid, data.across, data.down);

  // Build a solution map: {row,col} -> letter
  const solutionMap: Map<string, string> = new Map();
  acrossClues.forEach((clue) => {
    for (let i = 0; i < clue.answer.length; i++) {
      solutionMap.set(`${clue.row},${clue.col + i}`, clue.answer[i]);
    }
  });
  downClues.forEach((clue) => {
    for (let i = 0; i < clue.answer.length; i++) {
      solutionMap.set(`${clue.row + i},${clue.col}`, clue.answer[i]);
    }
  });

  // Build cell numbers map
  const cellNumbers: Map<string, number> = new Map();
  [...acrossClues, ...downClues].forEach((clue) => {
    const key = `${clue.row},${clue.col}`;
    if (!cellNumbers.has(key)) {
      cellNumbers.set(key, clue.number);
    }
  });

  // Build grid
  const grid: CrosswordCell[][] = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => {
      const cellVal = rawGrid[r]?.[c];
      const isBlocked = cellVal === null;
      const solution = solutionMap.get(`${r},${c}`) ?? '';
      const number = cellNumbers.get(`${r},${c}`);
      return {
        letter: '',
        solution,
        isBlocked,
        number,
        isError: false,
        isRevealed: false,
      };
    })
  );

  return {
    grid,
    acrossClues,
    downClues,
    selectedCell: null,
    direction: 'across',
    isWin: false,
    theme: data.theme || 'General',
    puzzleId: `${data.theme}-${data.difficulty}-${data.wordCount}`,
    revealer: undefined,
    isLoading: false,
    error: null,
  };
}

// ── Public API ────────────────────────────────────────────────────────────

export async function fetchCrosswordPuzzle(params?: {
  theme?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  size?: 'small' | 'medium' | 'large';
}): Promise<CrosswordState> {
  const url = new URL(API_URL);
  if (params?.theme) url.searchParams.set('theme', params.theme);
  if (params?.difficulty) url.searchParams.set('difficulty', params.difficulty);
  if (params?.size) url.searchParams.set('size', params.size);

  const response = await fetch(url.toString(), {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`429: API Rate Limit reached. Please wait a minute and try again.`);
    }
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  const json: ApiResponse = await response.json();
  if (json.status !== 'ok') {
    throw new Error('API returned error status');
  }

  return transformApiResponse(json.data);
}
