import { useEffect, useRef } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { useGame } from '../../context/GameContext';
import { useDigitCounts } from '../../hooks/useDigitCounts';
import { sounds } from '../../lib/sounds';
import NumberButton from './NumberButton';
import './NumberPad.css';

export default function NumberPad() {
  const { state, dispatch } = useGame();
  const { board, isComplete, isNotesMode, selectedCell } = state.sudoku;
  const digitCounts = useDigitCounts(board);
  const { trigger } = useWebHaptics();
  const prevBoardRef = useRef(board);
  const prevComplete = useRef(isComplete);

  useEffect(() => {
    const prevBoard = prevBoardRef.current;
    const hasNewConflict = board.some((row, r) =>
      row.some((cell, c) => cell.isConflict && !prevBoard[r][c].isConflict)
    );
    if (hasNewConflict) { trigger('error'); sounds.conflict(); }
    prevBoardRef.current = board;
  }, [board, trigger]);

  // Win sound
  useEffect(() => {
    if (isComplete && !prevComplete.current) sounds.complete();
    prevComplete.current = isComplete;
  }, [isComplete]);

  function handleTap(digit: number) {
    trigger('light');
    const cell = selectedCell ? board[selectedCell[0]][selectedCell[1]] : null;
    if (isNotesMode) {
      sounds.note();
    } else if (cell && cell.value === digit) {
      sounds.erase();
    } else {
      sounds.place();
    }
    dispatch({ type: 'SUDOKU_SET_VALUE', value: digit });
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
