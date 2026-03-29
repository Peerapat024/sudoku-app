import { useRef, useEffect, useState } from 'react';
import { useWebHaptics } from 'web-haptics/react';
import { Cell as CellType } from '../../types';
import { sounds } from '../../lib/sounds';
import './Board.css';

interface CellProps {
  cell: CellType;
  row: number;
  col: number;
  isSelected: boolean;
  isRegionHighlight: boolean;
  isSameValue: boolean;
  onSelect: (row: number, col: number) => void;
}

export default function Cell({ cell, row, col, isSelected, isRegionHighlight, isSameValue, onSelect }: CellProps) {
  const { trigger } = useWebHaptics();
  const prevValue = useRef(cell.value);
  const [popping, setPopping] = useState(false);

  // Trigger pop animation when a number is placed
  useEffect(() => {
    if (cell.value !== 0 && cell.value !== prevValue.current && !cell.isGiven) {
      setPopping(false);
      requestAnimationFrame(() => setPopping(true));
      setTimeout(() => setPopping(false), 250);
    }
    prevValue.current = cell.value;
  }, [cell.value]);

  const classNames = ['cell'];
  if (isSelected)          classNames.push('cell--selected');
  else if (cell.isConflict) classNames.push('cell--conflict');
  else if (isSameValue)    classNames.push('cell--same-value');
  else if (isRegionHighlight) classNames.push('cell--region');
  if (cell.isGiven) classNames.push('cell--given');
  if (col % 3 === 0 && col !== 0) classNames.push('cell--box-left');
  if (row % 3 === 0 && row !== 0) classNames.push('cell--box-top');

  return (
    <div
      className={classNames.join(' ')}
      onClick={() => { trigger('selection'); sounds.tap(); onSelect(row, col); }}
    >
      {cell.value !== 0 ? (
        <span className={`cell-value${popping ? ' cell-value--pop' : ''}`}>
          {cell.value}
        </span>
      ) : cell.notes.length > 0 ? (
        <div className="cell-notes">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <span key={n} className="cell-note">{cell.notes.includes(n) ? n : ''}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
