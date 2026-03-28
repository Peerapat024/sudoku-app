import { useGame } from './context/GameContext';
import Menu from './components/Menu/Menu';
import Board from './components/Board/Board';
import Timer from './components/Timer/Timer';
import Actions from './components/Controls/Actions';
import NumberPad from './components/NumberPad/NumberPad';
import WinModal from './components/WinModal/WinModal';
import './App.css';

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
} as const;

export default function App() {
  const { state, dispatch } = useGame();

  if (state.screen === 'menu') {
    return <Menu />;
  }

  return (
    <div className="game">
      <header className="game-header">
        <button className="back-btn" onClick={() => dispatch({ type: 'GO_TO_MENU' })}>
          ← Back
        </button>
        <span className="game-difficulty">{difficultyLabels[state.difficulty]}</span>
        <Timer />
      </header>

      <Board />
      <Actions />
      <NumberPad />

      <WinModal />
    </div>
  );
}
