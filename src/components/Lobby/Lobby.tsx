import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { GameId, GameState } from '../../types';
import './Lobby.css';

interface GameCard {
  id: GameId;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const games: GameCard[] = [
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'The classic logic-based number placement puzzle.',
    icon: '🔢',
    color: '#ff9500'
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the 5-letter word in 6 tries.',
    icon: '🔤',
    color: '#007aff'
  },
  {
    id: 'solitaire',
    title: 'Solitaire',
    description: 'A relaxing strategic card game.',
    icon: '🃏',
    color: '#34c759'
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    icon: '✨',
    color: '#af52de'
  },
  {
    id: 'crossword',
    title: 'Crossword',
    description: 'Solve the AI-generated crossword puzzle.',
    icon: '🔠',
    color: '#ff3b30'
  }
];

function hasActiveGame(state: GameState, id: GameId): boolean {
  switch(id) {
    case 'sudoku': 
      return state.sudoku.solution.length > 0 && !state.sudoku.isComplete;
    case 'wordle':
      return state.wordle.board.some(row => row[0] !== '') && !state.wordle.isGameOver;
    case 'solitaire':
      // Stock size differs from 24, or waste has cards (means player interacted)
      return (state.solitaire.waste.length > 0 || state.solitaire.deck.length !== 24) && !state.solitaire.isWin;
    case '2048':
      return state.g2048.score > 0 && !state.g2048.isGameOver;
    case 'crossword':
      return state.crossword.grid.length > 0 && !state.crossword.isWin && !state.crossword.isLoading;
    default:
      return false;
  }
}

export default function Lobby() {
  const { state, dispatch } = useGame();
  const [pendingGame, setPendingGame] = useState<GameId | null>(null);

  function selectGame(id: GameId) {
    if (hasActiveGame(state, id)) {
      setPendingGame(id);
    } else {
      dispatch({ type: 'SELECT_GAME', gameId: id });
    }
  }

  function handleResume() {
    if (pendingGame) {
      dispatch({ type: 'SELECT_GAME', gameId: pendingGame });
      setPendingGame(null);
    }
  }

  function handleStartNew() {
    if (pendingGame) {
      dispatch({ type: 'RESET_GAME', gameId: pendingGame });
      setPendingGame(null);
    }
  }

  return (
    <div className="lobby">
      <header className="lobby-header">
        <h1 className="lobby-title">Game Hub</h1>
        <p className="lobby-subtitle">Pulse & Puzzles</p>
      </header>

      <div className="game-grid">
        {games.map(game => (
          <button
            key={game.id}
            className="game-card"
            onClick={() => selectGame(game.id)}
            style={{ '--card-accent': game.color } as React.CSSProperties}
          >
            <div className="game-card-icon">{game.icon}</div>
            <div className="game-card-content">
              <h2 className="game-card-title">{game.title}</h2>
              <p className="game-card-description">{game.description}</p>
            </div>
            <div className="game-card-arrow">→</div>
          </button>
        ))}
      </div>

      <footer className="lobby-footer">
        <p>Premium Puzzle Experience</p>
      </footer>

      {pendingGame && (
        <div className="lobby-modal-overlay">
          <div className="lobby-modal">
            <h2>Game in Progress</h2>
            <p>You have an unfinished game of {games.find(g => g.id === pendingGame)?.title}. What would you like to do?</p>
            <div className="lobby-modal-actions">
              <button className="btn-resume" onClick={handleResume}>
                Continue Game
              </button>
              <button className="btn-new" onClick={handleStartNew}>
                Start New Game
              </button>
              <button className="btn-cancel" onClick={() => setPendingGame(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
