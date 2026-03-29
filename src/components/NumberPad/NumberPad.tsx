import { useEffect, useRef } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { useGame } from '../../context/GameContext';
import { useDigitCounts } from '../../hooks/useDigitCounts';
import { sounds } from '../../lib/sounds';
import NumberButton from './NumberButton';
import './NumberPad.css';

export default function NumberPad() {
  const { state, dispatch } = useGame();
  const digitCounts = useDigitCounts(state.board);
  const { trigger } = useWebHaptics();
  const prevBoardRef = useRef(state.board);
  const prevComplete = useRef(state.isComplete);

  useEffect(() => {
    const prevBoard = prevBoardRef.current;
    const hasNewConflict = state.board.some((row, r) =>
      row.some((cell, c) => cell.isConflict && !prevBoard[r][c].isConflict)
    );
    if (hasNewConflict) { trigger('error'); sounds.conflict(); }
    prevBoardRef.current = state.board;
  }, [state.board, trigger]);

  // Win sound
  useEffect(() => {
    if (state.isComplete && !prevComplete.current) sounds.complete();
    prevComplete.current = state.isComplete;
  }, [state.isComplete]);

  function handleTap(digit: number) {
    trigger('light');
    const cell = state.selectedCell ? state.board[state.selectedCell[0]][state.selectedCell[1]] : null;
    if (state.isNotesMode) {
      sounds.note();
    } else if (cell && cell.value === digit) {
      sounds.erase();
    } else {
      sounds.place();
    }
    dispatch({ type: 'SET_VALUE', value: digit });
  }

  return (
    <div className="numpad">
      <div className="numpad-row">
        {[1,2,3,4,5].map(d => (
          <NumberButton key={d} digit={d} remaining={9 - (digitCounts.get(d) ?? 0)} onTap={handleTap} />
        ))}
      </div>
      <div className="numpad-row">
        {[6,7,8,9].map(d => (
          <NumberButton key={d} digit={d} remaining={9 - (digitCounts.get(d) ?? 0)} onTap={handleTap} />
        ))}
      </div>
    </div>
  );
}
