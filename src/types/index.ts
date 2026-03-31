export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number;        // 0 = empty
  isGiven: boolean;     // true = part of the original puzzle
  notes: number[];      // pencil marks (subset of 1-9)
  isConflict: boolean;  // computed: duplicate in row/col/box
}

export type Board = Cell[][];  // 9x9

export type GameId = 'sudoku' | 'wordle' | 'solitaire' | '2048';
export type Screen = 'lobby' | 'playing';

export interface GameState {
  screen: Screen;
  currentGameId: GameId | null;
  sudoku: SudokuGameState;
  g2048: Game2048State;
  solitaire: SolitaireState;
  wordle: WordleState;
}

export interface WordleState {
  board: string[][]; // 6x5
  currentRow: number;
  currentCol: number;
  solution: string;
  isGameOver: boolean;
  isWin: boolean;
  usedLetters: Record<string, 'correct' | 'present' | 'absent'>;
}

export interface SudokuGameState {
  board: Board;
  solution: number[][];
  difficulty: Difficulty;
  selectedCell: [number, number] | null;
  isNotesMode: boolean;
  history: Board[];
  isComplete: boolean;
  elapsedSeconds: number;
  isPaused: boolean;
}

export interface Game2048State {
  grid: number[][]; // 4x4
  score: number;
  bestScore: number;
  isGameOver: boolean;
  isWin: boolean;
}

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  isFaceUp: boolean;
}

export interface SolitaireState {
  deck: Card[];
  waste: Card[];
  foundations: Card[][]; // 4 foundations
  piles: Card[][];       // 7 tableau piles
  isWin: boolean;
}

export interface PersonalRecord {
  difficulty: Difficulty;
  bestTime: number;   // seconds
  date: string;       // ISO string
}

export type GameAction =
  | { type: 'GOTO_LOBBY' }
  | { type: 'SELECT_GAME'; gameId: GameId }
  | { type: 'START_SUDOKU'; difficulty: Difficulty; puzzle: number[][]; solution: number[][] }
  | { type: 'SUDOKU_SELECT_CELL'; row: number; col: number }
  | { type: 'SUDOKU_SET_VALUE'; value: number }
  | { type: 'SUDOKU_TOGGLE_NOTE'; value: number }
  | { type: 'SUDOKU_TOGGLE_NOTES_MODE' }
  | { type: 'SUDOKU_ERASE' }
  | { type: 'SUDOKU_UNDO' }
  | { type: 'SUDOKU_HINT' }
  | { type: 'SUDOKU_TICK' }
  | { type: 'G2048_MOVE'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'G2048_RESTART' }
  | { type: 'SOLITAIRE_MOVE_CARD'; from: string; to: string; cardIndex: number }
  | { type: 'SOLITAIRE_DRAW_CARD' }
  | { type: 'SOLITAIRE_RESTART' }
  | { type: 'WORDLE_SUBMIT' }
  | { type: 'WORDLE_KEY_PRESS'; key: string }
  | { type: 'WORDLE_DELETE' }
  | { type: 'SOLITAIRE_AUTO_MOVE'; from: string; cardIndex: number }
  | { type: 'WORDLE_RESTART' };
