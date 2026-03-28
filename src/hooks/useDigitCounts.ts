import { useMemo } from 'react';
import { Board } from '../types';

export function useDigitCounts(board: Board): Map<number, number> {
  return useMemo(() => {
    const counts = new Map<number, number>();
    for (let d = 1; d <= 9; d++) counts.set(d, 0);

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c].value;
        if (val >= 1 && val <= 9) {
          counts.set(val, (counts.get(val) ?? 0) + 1);
        }
      }
    }

    return counts;
  }, [board]);
}
