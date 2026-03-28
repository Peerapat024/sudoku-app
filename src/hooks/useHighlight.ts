import { useMemo } from 'react';
import { Board } from '../types';

export interface HighlightSets {
  regionCells: Set<string>;
  sameValueCells: Set<string>;
}

export function useHighlight(
  board: Board,
  selectedCell: [number, number] | null
): HighlightSets {
  return useMemo(() => {
    const regionCells = new Set<string>();
    const sameValueCells = new Set<string>();

    if (!selectedCell) return { regionCells, sameValueCells };

    const [sr, sc] = selectedCell;

    // Same row
    for (let c = 0; c < 9; c++) regionCells.add(`${sr},${c}`);
    // Same column
    for (let r = 0; r < 9; r++) regionCells.add(`${r},${sc}`);
    // Same 3x3 box
    const boxR = Math.floor(sr / 3) * 3;
    const boxC = Math.floor(sc / 3) * 3;
    for (let r = boxR; r < boxR + 3; r++) {
      for (let c = boxC; c < boxC + 3; c++) {
        regionCells.add(`${r},${c}`);
      }
    }

    // Same value
    const val = board[sr][sc].value;
    if (val !== 0) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c].value === val) {
            sameValueCells.add(`${r},${c}`);
          }
        }
      }
    }

    return { regionCells, sameValueCells };
  }, [board, selectedCell]);
}
