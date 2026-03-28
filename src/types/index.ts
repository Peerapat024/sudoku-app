export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number;        // 0 = empty
  isGiven: boolean;     // true = part of the original puzzle
  notes: number[];      // pencil marks (subset of 1-9)
  isConflict: boolean;  // computed: duplicate in row/col/box
}

export type Board = Cell[][];  // 9x9

export type Screen = 'menu' | 'playing';

export interface GameState {
  screen: Screen;
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

export interface PersonalRecord {
  difficulty: Difficulty;
  bestTime: number;   // seconds
  date: string;       // ISO string
}

export type GameAction =
  | { type: 'START_GAME'; difficulty: Difficulty; puzzle: number[][]; solution: number[][] }
  | { type: 'SELECT_CELL'; row: number; col: number }
  | { type: 'SET_VALUE'; value: number }
  | { type: 'TOGGLE_NOTE'; value: number }
  | { type: 'TOGGLE_NOTES_MODE' }
  | { type: 'ERASE' }
  | { type: 'UNDO' }
  | { type: 'HINT' }
  | { type: 'TICK' }
  | { type: 'GO_TO_MENU' };
