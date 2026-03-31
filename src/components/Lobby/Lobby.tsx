import { useGame } from '../../context/GameContext';
import { GameId } from '../../types';
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
    id: 'crossword',
    title: 'Crossword',
    description: 'Solve the grid with clever clues.',
    icon: '✍️',
    color: '#ffa502'
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    icon: '✨',
    color: '#af52de'
  }
];

export default function Lobby() {
  const { dispatch } = useGame();

  function selectGame(id: GameId) {
    dispatch({ type: 'SELECT_GAME', gameId: id });
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
    </div>
  );
}
