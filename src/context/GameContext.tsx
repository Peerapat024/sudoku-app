import { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from 'react';
import { GameState, GameAction, Board, Cell, SudokuGameState, Game2048State, Screen, SolitaireState, WordleState } from '../types';
import { computeConflicts, isBoardComplete } from '../lib/validator';
import { saveRecord } from '../lib/records';
import { createEmptyGrid, addRandomTile, moveGrid, isGameOver, hasWon } from '../lib/g2048';
import { dealGame, canMoveToPile, canMoveToFoundation } from '../lib/solitaire';
import { getRandomWord, getLetterStatus } from '../lib/wordle';
import { getInitialCrossword } from '../lib/crossword';

const STORAGE_KEY = 'multi_game_hub_state';

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

const initialSudokuState: SudokuGameState = {
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

const initialG2048State: Game2048State = {
  grid: createEmptyGrid(),
  score: 0,
  bestScore: 0,
  isGameOver: false,
  isWin: false,
};

const initialSolitaireState: SolitaireState = {
  deck: [],
  waste: [],
  foundations: [[], [], [], []],
  piles: [[], [], [], [], [], [], []],
  isWin: false,
};

const initialWordleState: WordleState = {
  board: Array.from({ length: 6 }, () => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
  solution: '', 
  isGameOver: false,
  isWin: false,
  usedLetters: {},
};

const initialCrosswordState = getInitialCrossword();

const initialState: GameState = {
  screen: 'lobby',
  currentGameId: null,
  sudoku: initialSudokuState,
  g2048: initialG2048State,
  solitaire: initialSolitaireState,
  wordle: initialWordleState,
  crossword: initialCrosswordState,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GOTO_LOBBY':
      return { ...state, screen: 'lobby' };

    case 'SELECT_GAME': {
      let nextState: GameState = { ...state, currentGameId: action.gameId, screen: 'playing' as Screen };
      if (action.gameId === '2048' && state.g2048.score === 0 && !state.g2048.isGameOver) {
        const grid = addRandomTile(addRandomTile(createEmptyGrid()));
        nextState.g2048 = { ...initialG2048State, grid };
      } else if (action.gameId === 'solitaire' && state.solitaire.deck.length === 0) {
        nextState.solitaire = dealGame();
      } else if (action.gameId === 'wordle' && state.wordle.solution === '') {
        nextState.wordle = { ...initialWordleState, solution: getRandomWord() };
      } else if (action.gameId === 'crossword' && state.crossword.acrossClues.length === 0) {
        nextState.crossword = getInitialCrossword();
      }
      return nextState;
    }

    case 'START_SUDOKU': {
      const board: Board = action.puzzle.map(row =>
        row.map(val => ({
          value: val,
          isGiven: val !== 0,
          notes: [],
          isConflict: false,
        }))
      );
      return {
        ...state,
        screen: 'playing',
        currentGameId: 'sudoku',
        sudoku: {
          ...initialSudokuState,
          board,
          solution: action.solution,
          difficulty: action.difficulty,
          history: [cloneBoard(board)],
        }
      };
    }

    case 'SUDOKU_SELECT_CELL': {
      if (state.sudoku.isComplete) return state;
      return { 
        ...state, 
        sudoku: { ...state.sudoku, selectedCell: [action.row, action.col] } 
      };
    }

    case 'SUDOKU_SET_VALUE': {
      const s = state.sudoku;
      if (s.isComplete || !s.selectedCell) return state;
      const [r, c] = s.selectedCell;
      if (s.board[r][c].isGiven) return state;
      if (s.isNotesMode) return gameReducer(state, { type: 'SUDOKU_TOGGLE_NOTE', value: action.value });
      if (s.board[r][c].value === action.value) return gameReducer(state, { type: 'SUDOKU_ERASE' });

      const newBoard = cloneBoard(s.board);
      newBoard[r][c] = { ...newBoard[r][c], value: action.value, notes: [] };
      const boardWithConflicts = applyConflicts(newBoard);
      const complete = isBoardComplete(boardWithConflicts, s.solution);

      return {
        ...state,
        sudoku: {
          ...s,
          board: boardWithConflicts,
          history: [...s.history, cloneBoard(boardWithConflicts)],
          isComplete: complete,
        }
      };
    }

    case 'SUDOKU_TOGGLE_NOTE': {
      const s = state.sudoku;
      if (s.isComplete || !s.selectedCell) return state;
      const [r, c] = s.selectedCell;
      if (s.board[r][c].isGiven || s.board[r][c].value !== 0) return state;

      const newBoard = cloneBoard(s.board);
      const cell = newBoard[r][c];
      const idx = cell.notes.indexOf(action.value);
      if (idx >= 0) cell.notes.splice(idx, 1);
      else {
        cell.notes.push(action.value);
        cell.notes.sort();
      }

      return {
        ...state,
        sudoku: {
          ...s,
          board: newBoard,
          history: [...s.history, cloneBoard(newBoard)],
        }
      };
    }

    case 'SUDOKU_TOGGLE_NOTES_MODE':
      return { ...state, sudoku: { ...state.sudoku, isNotesMode: !state.sudoku.isNotesMode } };

    case 'SUDOKU_ERASE': {
      const s = state.sudoku;
      if (s.isComplete || !s.selectedCell) return state;
      const [r, c] = s.selectedCell;
      if (s.board[r][c].isGiven) return state;

      const newBoard = cloneBoard(s.board);
      newBoard[r][c] = { ...newBoard[r][c], value: 0, notes: [] };
      const boardWithConflicts = applyConflicts(newBoard);
      return {
        ...state,
        sudoku: {
          ...s,
          board: boardWithConflicts,
          history: [...s.history, cloneBoard(boardWithConflicts)],
        }
      };
    }

    case 'SUDOKU_UNDO': {
      const s = state.sudoku;
      if (s.isComplete || s.history.length <= 1) return state;
      const newHistory = s.history.slice(0, -1);
      const prevBoard = applyConflicts(cloneBoard(newHistory[newHistory.length - 1]));
      return {
        ...state,
        sudoku: { ...s, board: prevBoard, history: newHistory }
      };
    }

    case 'SUDOKU_HINT': {
      const s = state.sudoku;
      if (s.isComplete || !s.selectedCell) return state;
      const [r, c] = s.selectedCell;
      if (s.board[r][c].isGiven) return state;

      const newBoard = cloneBoard(s.board);
      newBoard[r][c] = { value: s.solution[r][c], isGiven: true, notes: [], isConflict: false };
      const boardWithConflicts = applyConflicts(newBoard);
      const complete = isBoardComplete(boardWithConflicts, s.solution);

      return {
        ...state,
        sudoku: {
          ...s,
          board: boardWithConflicts,
          history: [...s.history, cloneBoard(boardWithConflicts)],
          isComplete: complete,
        }
      };
    }

    case 'SUDOKU_TICK':
      if (state.sudoku.isComplete || state.sudoku.isPaused) return state;
      return { 
        ...state, 
        sudoku: { ...state.sudoku, elapsedSeconds: state.sudoku.elapsedSeconds + 1 } 
      };

    case 'G2048_MOVE': {
      if (state.g2048.isGameOver) return state;
      const { grid, score } = moveGrid(state.g2048.grid, action.direction);
      if (JSON.stringify(grid) === JSON.stringify(state.g2048.grid)) return state;

      const gridWithRandom = addRandomTile(grid);
      const win = hasWon(gridWithRandom);
      const over = isGameOver(gridWithRandom);

      return {
        ...state,
        g2048: {
          ...state.g2048,
          grid: gridWithRandom,
          score: state.g2048.score + score,
          bestScore: Math.max(state.g2048.bestScore, state.g2048.score + score),
          isWin: win,
          isGameOver: over,
        }
      };
    }

    case 'G2048_RESTART': {
      const grid = addRandomTile(addRandomTile(createEmptyGrid()));
      return {
        ...state,
        g2048: { ...initialG2048State, grid, bestScore: state.g2048.bestScore }
      };
    }

    case 'SOLITAIRE_DRAW_CARD': {
      const sol = state.solitaire;
      if (sol.deck.length === 0 && sol.waste.length === 0) return state;
      const newDeck = [...sol.deck];
      const newWaste = [...sol.waste];

      if (newDeck.length === 0) {
        const resettedDeck = newWaste.reverse().map(c => ({ ...c, isFaceUp: false }));
        return { ...state, solitaire: { ...sol, deck: resettedDeck, waste: [] } };
      }

      const card = newDeck.pop()!;
      card.isFaceUp = true;
      newWaste.push(card);
      return { ...state, solitaire: { ...sol, deck: newDeck, waste: newWaste } };
    }

    case 'SOLITAIRE_MOVE_CARD': {
      const sol = state.solitaire;
      const { from, to, cardIndex } = action;

      const getSourceList = () => {
        if (from === 'waste') return sol.waste;
        if (from.startsWith('foundation-')) return sol.foundations[parseInt(from.split('-')[1])];
        if (from.startsWith('pile-')) return sol.piles[parseInt(from.split('-')[1])];
        return [];
      };

      const getTargetList = () => {
        if (to.startsWith('foundation-')) return sol.foundations[parseInt(to.split('-')[1])];
        if (to.startsWith('pile-')) return sol.piles[parseInt(to.split('-')[1])];
        return [];
      };

      const source = [...getSourceList()];
      const target = [...getTargetList()];
      const cardsToMove = source.splice(cardIndex);

      if (cardsToMove.length === 0) return state;
      const baseCard = cardsToMove[0];

      let isValid = false;
      if (to.startsWith('foundation-')) {
        if (cardsToMove.length === 1) isValid = canMoveToFoundation(baseCard, target);
      } else if (to.startsWith('pile-')) {
        isValid = canMoveToPile(baseCard, target);
      }

      if (!isValid) return state;

      target.push(...cardsToMove);
      if (source.length > 0) source[source.length - 1].isFaceUp = true;

      const newSol = { ...sol };
      if (from === 'waste') newSol.waste = source;
      else if (from.startsWith('foundation-')) newSol.foundations[parseInt(from.split('-')[1])] = source;
      else if (from.startsWith('pile-')) newSol.piles[parseInt(from.split('-')[1])] = source;

      if (to.startsWith('foundation-')) newSol.foundations[parseInt(to.split('-')[1])] = target;
      else if (to.startsWith('pile-')) newSol.piles[parseInt(to.split('-')[1])] = target;

      newSol.isWin = newSol.foundations.every(f => f.length === 13);
      return { ...state, solitaire: newSol };
    }

    case 'SOLITAIRE_AUTO_MOVE': {
      const sol = state.solitaire;
      const { from, cardIndex } = action;

      const getSourceList = () => {
        if (from === 'waste') return sol.waste;
        if (from.startsWith('foundation-')) return sol.foundations[parseInt(from.split('-')[1])];
        if (from.startsWith('pile-')) return sol.piles[parseInt(from.split('-')[1])];
        return [];
      };

      const source = getSourceList();
      if (source.length === 0) return state;
      const cardsToMove = source.slice(cardIndex);
      if (cardsToMove.length === 0) return state;
      const card = cardsToMove[0];

      // 1. Try foundations
      if (cardsToMove.length === 1) {
        for (let i = 0; i < 4; i++) {
          if (canMoveToFoundation(card, sol.foundations[i])) {
            return gameReducer(state, { type: 'SOLITAIRE_MOVE_CARD', from, to: `foundation-${i}`, cardIndex });
          }
        }
      }

      // 2. Try tableau piles
      for (let i = 0; i < 7; i++) {
        if (from === `pile-${i}`) continue;
        if (canMoveToPile(card, sol.piles[i])) {
          return gameReducer(state, { type: 'SOLITAIRE_MOVE_CARD', from, to: `pile-${i}`, cardIndex });
        }
      }

      return state;
    }

    case 'SOLITAIRE_RESTART':
      return { ...state, solitaire: dealGame() };

    case 'WORDLE_KEY_PRESS': {
      const w = state.wordle;
      if (w.isGameOver || w.currentCol >= 5) return state;
      const newBoard = w.board.map(row => [...row]);
      newBoard[w.currentRow][w.currentCol] = action.key.toUpperCase();
      return { ...state, wordle: { ...w, board: newBoard, currentCol: w.currentCol + 1 } };
    }

    case 'WORDLE_DELETE': {
      const w = state.wordle;
      if (w.isGameOver || w.currentCol === 0) return state;
      const newBoard = w.board.map(row => [...row]);
      newBoard[w.currentRow][w.currentCol - 1] = '';
      return { ...state, wordle: { ...w, board: newBoard, currentCol: w.currentCol - 1 } };
    }

    case 'WORDLE_SUBMIT': {
      const w = state.wordle;
      if (w.isGameOver || w.currentCol < 5) return state;
      const guess = w.board[w.currentRow].join('');
      const statuses = getLetterStatus(guess, w.solution);
      
      const newUsedLetters = { ...w.usedLetters };
      guess.split('').forEach((letter, i) => {
        const current = newUsedLetters[letter];
        const status = statuses[i];
        if (status === 'correct') newUsedLetters[letter] = 'correct';
        else if (status === 'present' && current !== 'correct') newUsedLetters[letter] = 'present';
        else if (status === 'absent' && !current) newUsedLetters[letter] = 'absent';
      });

      const win = guess === w.solution;
      const over = win || w.currentRow === 5;

      return {
        ...state,
        wordle: {
          ...w,
          currentRow: win ? w.currentRow : w.currentRow + 1,
          currentCol: 0,
          isWin: win,
          isGameOver: over,
          usedLetters: newUsedLetters,
        }
      };
    }

    case 'CROSSWORD_SELECT_CELL': {
      const c = state.crossword;
      if (c.grid[action.row][action.col].isBlocked) return state;
      const same = c.selectedCell && c.selectedCell[0] === action.row && c.selectedCell[1] === action.col;
      return {
        ...state,
        crossword: {
          ...c,
          selectedCell: [action.row, action.col],
          direction: same ? (c.direction === 'across' ? 'down' : 'across') : c.direction
        }
      };
    }

    case 'CROSSWORD_SET_LETTER': {
      const c = state.crossword;
      if (!c.selectedCell || c.isWin) return state;
      const [r, col] = c.selectedCell;
      const newGrid = c.grid.map(row => row.map(cell => ({ ...cell })));
      newGrid[r][col].letter = action.letter.toUpperCase();
      
      const isWin = newGrid.every(row => row.every(cell => cell.isBlocked || cell.letter === cell.solution));

      // Auto move cursor
      let nextR = r;
      let nextCol = col;
      if (c.direction === 'across') {
        nextCol++;
        while (nextCol < newGrid[r].length && newGrid[r][nextCol].isBlocked) nextCol++;
        if (nextCol >= newGrid[r].length) nextCol = col;
      } else {
        nextR++;
        while (nextR < newGrid.length && newGrid[nextR][col].isBlocked) nextR++;
        if (nextR >= newGrid.length) nextR = r;
      }

      return {
        ...state,
        crossword: {
          ...c,
          grid: newGrid,
          isWin,
          selectedCell: [nextR, nextCol]
        }
      };
    }

    case 'CROSSWORD_DELETE': {
      const c = state.crossword;
      if (!c.selectedCell || c.isWin) return state;
      const [r, col] = c.selectedCell;
      const newGrid = c.grid.map(row => row.map(cell => ({ ...cell })));
      
      if (newGrid[r][col].letter === '') {
        // move back
        let prevR = r;
        let prevCol = col;
        if (c.direction === 'across') {
          prevCol--;
          while (prevCol >= 0 && newGrid[r][prevCol].isBlocked) prevCol--;
          if (prevCol >= 0) {
            newGrid[r][prevCol].letter = '';
            return { ...state, crossword: { ...c, grid: newGrid, selectedCell: [r, prevCol] } };
          }
        } else {
          prevR--;
          while (prevR >= 0 && newGrid[prevR][col].isBlocked) prevR--;
          if (prevR >= 0) {
            newGrid[prevR][col].letter = '';
            return { ...state, crossword: { ...c, grid: newGrid, selectedCell: [prevR, col] } };
          }
        }
      } else {
        newGrid[r][col].letter = '';
      }

      return { ...state, crossword: { ...c, grid: newGrid } };
    }

    case 'CROSSWORD_TOGGLE_DIRECTION':
      return { ...state, crossword: { ...state.crossword, direction: state.crossword.direction === 'across' ? 'down' : 'across' } };

    case 'CROSSWORD_RESTART':
      return { ...state, crossword: getInitialCrossword() };

    case 'WORDLE_RESTART':
      return { ...state, wordle: { ...initialWordleState, solution: getRandomWord() } };

    default:
      return state;
  }
}

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

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (init) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...init, ...parsed, screen: 'lobby' }; 
      } catch (e) {
        return init;
      }
    }
    return init;
  });

  const prevCompleteRef = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      sudoku: state.sudoku,
      g2048: state.g2048,
      solitaire: state.solitaire,
      wordle: state.wordle
    }));
  }, [state.sudoku, state.g2048, state.solitaire, state.wordle]);

  useEffect(() => {
    if (state.currentGameId !== 'sudoku' || state.screen !== 'playing' || state.sudoku.isComplete) return;
    const id = setInterval(() => dispatch({ type: 'SUDOKU_TICK' }), 1000);
    return () => clearInterval(id);
  }, [state.currentGameId, state.screen, state.sudoku.isComplete]);

  useEffect(() => {
    if (state.currentGameId === 'sudoku' && state.sudoku.isComplete && !prevCompleteRef.current) {
      saveRecord(state.sudoku.difficulty, state.sudoku.elapsedSeconds);
    }
    prevCompleteRef.current = state.sudoku.isComplete;
  }, [state.currentGameId, state.sudoku.isComplete, state.sudoku.difficulty, state.sudoku.elapsedSeconds]);

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
