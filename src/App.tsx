import { useGame } from './context/GameContext';
import Menu from './components/Menu/Menu';
import Board from './components/Board/Board';
import Timer from './components/Timer/Timer';
import Actions from './components/Controls/Actions';
import NumberPad from './components/NumberPad/NumberPad';
import WinModal from './components/WinModal/WinModal';
import Lobby from './components/Lobby/Lobby';
import Game2048 from './components/games/2048/Game2048';
import GameWordle from './components/games/Wordle/GameWordle';
import GameSolitaire from './components/games/Solitaire/GameSolitaire';
import GameCrossword from './components/games/Crossword/GameCrossword';
import './App.css';

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
} as const;

export default function App() {
  const { state, dispatch } = useGame();

  if (state.screen === 'lobby') {
    return <Lobby />;
  }

  // Handle Sudoku Game View
  if (state.currentGameId === 'sudoku') {
    const s = state.sudoku;

    // If we're in 'playing' but no puzzle started, show Sudoku Menu (Difficulty selector)
    if (s.board[0][0].value === 0 && s.solution.length === 0) {
      return <Menu />;
    }

    return (
      <div className="game">
        <header className="game-header">
          <button className="back-btn" onClick={() => dispatch({ type: 'GOTO_LOBBY' })}>
            ← Lobby
          </button>
          <span className="game-difficulty">{difficultyLabels[s.difficulty]}</span>
          <Timer />
        </header>

        <Board />
        <Actions />
        <NumberPad />

        <WinModal />
      </div>
    );
  }

  // Handle Wordle Game View
  if (state.currentGameId === 'wordle') {
    return (
      <div className="game">
        <header className="game-header">
          <button className="back-btn" onClick={() => dispatch({ type: 'GOTO_LOBBY' })}>
            ← Lobby
          </button>
          <span className="game-difficulty">Wordle</span>
          <div className="header-spacer" />
        </header>

        <GameWordle />
      </div>
    );
  }

  // Handle 2048 Game View
  if (state.currentGameId === '2048') {
    return (
      <div className="game">
        <header className="game-header">
          <button className="back-btn" onClick={() => dispatch({ type: 'GOTO_LOBBY' })}>
            ← Lobby
          </button>
          <span className="game-difficulty">2048</span>
          <div className="header-spacer" />
        </header>

        <Game2048 />
      </div>
    );
  }

  // Handle Solitaire Game View
  if (state.currentGameId === 'solitaire') {
    return (
      <div className="game">
        <header className="game-header">
          <button className="back-btn" onClick={() => dispatch({ type: 'GOTO_LOBBY' })}>
            ← Lobby
          </button>
          <span className="game-difficulty">Solitaire</span>
          <div className="header-spacer" />
        </header>

        <GameSolitaire />
      </div>
    );
  }

  // Handle Crossword Game View
  if (state.currentGameId === 'crossword') {
    return (
      <div className="game">
        <header className="game-header">
          <button className="back-btn" onClick={() => dispatch({ type: 'GOTO_LOBBY' })}>
            ← Lobby
          </button>
          <span className="game-difficulty">Crossword</span>
          <div className="header-spacer" />
        </header>

        <GameCrossword />
      </div>
    );
  }

  // Final fallback (Should not happen if all games are covered)
  return <Lobby />;
}
