import { useGame } from '../../context/GameContext';
import { useDigitCounts } from '../../hooks/useDigitCounts';
import NumberButton from './NumberButton';
import './NumberPad.css';

export default function NumberPad() {
  const { state, dispatch } = useGame();
  const digitCounts = useDigitCounts(state.board);

  function handleTap(digit: number) {
    dispatch({ type: 'SET_VALUE', value: digit });
  }

  function handleErase() {
    dispatch({ type: 'ERASE' });
  }

  return (
    <div className="numpad">
      <div className="numpad-row">
        {[1, 2, 3, 4, 5].map(d => (
          <NumberButton
            key={d}
            digit={d}
            remaining={9 - (digitCounts.get(d) ?? 0)}
            onTap={handleTap}
          />
        ))}
      </div>
      <div className="numpad-row">
        {[6, 7, 8, 9].map(d => (
          <NumberButton
            key={d}
            digit={d}
            remaining={9 - (digitCounts.get(d) ?? 0)}
            onTap={handleTap}
          />
        ))}
      </div>
    </div>
  );
}
