import { useGame } from '../../context/GameContext';
import { formatTime, getBestTime } from '../../lib/records';
import { Difficulty } from '../../types';
import { generatePuzzle } from '../../lib/generator';
import './WinModal.css';

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
};

export default function WinModal() {
  const { state, dispatch } = useGame();

  if (!state.isComplete) return null;

  const bestTime = getBestTime(state.difficulty);
  const isNewRecord = bestTime !== null && bestTime >= state.elapsedSeconds;

  function handleNewGame() {
    const { puzzle, solution } = generatePuzzle(state.difficulty);
    dispatch({ type: 'START_GAME', difficulty: state.difficulty, puzzle, solution });
  }

  function handleMenu() {
    dispatch({ type: 'GO_TO_MENU' });
  }

  return (
    <div className="win-overlay">
      <div className="win-modal">
        <h2 className="win-title">
          {isNewRecord ? '🏆 New Record!' : '🎉 Congratulations!'}
        </h2>
        <p className="win-difficulty">{difficultyLabels[state.difficulty]}</p>
        <p className="win-time">{formatTime(state.elapsedSeconds)}</p>
        {bestTime !== null && (
          <p className="win-best">Personal best: {formatTime(bestTime)}</p>
        )}
        <div className="win-buttons">
          <button className="win-btn win-btn--primary" onClick={handleNewGame}>
            Play Again
          </button>
          <button className="win-btn win-btn--secondary" onClick={handleMenu}>
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}
