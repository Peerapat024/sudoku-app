import { useGame } from '../../context/GameContext';
import { formatTime } from '../../lib/records';
import './Timer.css';

export default function Timer() {
  const { state } = useGame();
  return (
    <span className="timer">{formatTime(state.elapsedSeconds)}</span>
  );
}
