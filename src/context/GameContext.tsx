import { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from 'react';
import { GameState, GameAction, Board, Cell } from '../types';
import { computeConflicts, isBoardComplete } from '../lib/validator';
import { saveRecord } from '../lib/records';

function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, (): Cell => ({
      value: 0,
      isGiven: false,
      notes: [],
      isConflict: false,
    }))
  );
}

const initialState: GameState = {
  screen: 'menu',
  board: createEmptyBoard(),
  solution: [],
  difficulty: 'easy',
  selectedCell: null,
  isNotesMode: false,
  history: [],
  isComplete: false,
  elapsedSeconds: 0,
  isPaused: false,
};

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => ({ ...cell, notes: [...cell.notes] })));
}

function applyConflicts(board: Board): Board {
  const conflicts = computeConflicts(board);
  return board.map((row, r) =>
    row.map((cell, c) => ({
      ...cell,
      isConflict: conflicts.has(`${r},${c}`),
    }))
  );
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const board: Board = action.puzzle.map(row =>
        row.map(val => ({
          value: val,
          isGiven: val !== 0,
          notes: [],
          isConflict: false,
        }))
      );
      return {
        ...initialState,
        screen: 'playing',
        board,
        solution: action.solution,
        difficulty: action.difficulty,
        history: [cloneBoard(board)],
      };
    }

    case 'SELECT_CELL': {
      if (state.isComplete) return state;
      return { ...state, selectedCell: [action.row, action.col] };
    }

    case 'SET_VALUE': {
      if (state.isComplete || !state.selectedCell) return state;
      const [r, c] = state.selectedCell;
      if (state.board[r][c].isGiven) return state;

      if (state.isNotesMode) {
        return gameReducer(state, { type: 'TOGGLE_NOTE', value: action.value });
      }

      // Tapping the same number that's already in the cell clears it
      if (state.board[r][c].value === action.value) {
        return gameReducer(state, { type: 'ERASE' });
      }

      const newBoard = cloneBoard(state.board);
      newBoard[r][c] = {
        ...newBoard[r][c],
        value: action.value,
        notes: [],
      };

      const boardWithConflicts = applyConflicts(newBoard);
      const complete = isBoardComplete(boardWithConflicts, state.solution);

      return {
        ...state,
        board: boardWithConflicts,
        history: [...state.history, cloneBoard(boardWithConflicts)],
        isComplete: complete,
      };
    }

    case 'TOGGLE_NOTE': {
      if (state.isComplete || !state.selectedCell) return state;
      const [r, c] = state.selectedCell;
      if (state.board[r][c].isGiven || state.board[r][c].value !== 0) return state;

      const newBoard = cloneBoard(state.board);
      const cell = newBoard[r][c];
      const idx = cell.notes.indexOf(action.value);
      if (idx >= 0) {
        cell.notes.splice(idx, 1);
      } else {
        cell.notes.push(action.value);
        cell.notes.sort();
      }

      return {
        ...state,
        board: newBoard,
        history: [...state.history, cloneBoard(newBoard)],
      };
    }

    case 'TOGGLE_NOTES_MODE':
      return { ...state, isNotesMode: !state.isNotesMode };

    case 'ERASE': {
      if (state.isComplete || !state.selectedCell) return state;
      const [r, c] = state.selectedCell;
      if (state.board[r][c].isGiven) return state;

      const newBoard = cloneBoard(state.board);
      newBoard[r][c] = { ...newBoard[r][c], value: 0, notes: [] };

      const boardWithConflicts = applyConflicts(newBoard);
      return {
        ...state,
        board: boardWithConflicts,
        history: [...state.history, cloneBoard(boardWithConflicts)],
      };
    }

    case 'UNDO': {
      if (state.isComplete || state.history.length <= 1) return state;
      const newHistory = state.history.slice(0, -1);
      const prevBoard = applyConflicts(cloneBoard(newHistory[newHistory.length - 1]));
      return {
        ...state,
        board: prevBoard,
        history: newHistory,
      };
    }

    case 'HINT': {
      if (state.isComplete || !state.selectedCell) return state;
      const [r, c] = state.selectedCell;
      if (state.board[r][c].isGiven) return state;

      const newBoard = cloneBoard(state.board);
      newBoard[r][c] = {
        value: state.solution[r][c],
        isGiven: true,
        notes: [],
        isConflict: false,
      };

      const boardWithConflicts = applyConflicts(newBoard);
      const complete = isBoardComplete(boardWithConflicts, state.solution);

      return {
        ...state,
        board: boardWithConflicts,
        history: [...state.history, cloneBoard(boardWithConflicts)],
        isComplete: complete,
      };
    }

    case 'TICK':
      if (state.isComplete || state.isPaused) return state;
      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 };

    case 'GO_TO_MENU':
      return { ...initialState };

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const prevCompleteRef = useRef(false);

  // Timer
  useEffect(() => {
    if (state.screen !== 'playing' || state.isComplete) return;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [state.screen, state.isComplete]);

  // Save record on completion
  useEffect(() => {
    if (state.isComplete && !prevCompleteRef.current) {
      saveRecord(state.difficulty, state.elapsedSeconds);
    }
    prevCompleteRef.current = state.isComplete;
  }, [state.isComplete, state.difficulty, state.elapsedSeconds]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
