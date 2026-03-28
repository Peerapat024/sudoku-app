import { Board } from '../types';

export function computeConflicts(board: Board): Set<string> {
  const conflicts = new Set<string>();

  for (let i = 0; i < 9; i++) {
    // Check row
    checkGroup(
      Array.from({ length: 9 }, (_, c) => ({ r: i, c, val: board[i][c].value })),
      conflicts
    );
    // Check column
    checkGroup(
      Array.from({ length: 9 }, (_, r) => ({ r, c: i, val: board[r][i].value })),
      conflicts
    );
  }

  // Check 3x3 boxes
  for (let boxR = 0; boxR < 3; boxR++) {
    for (let boxC = 0; boxC < 3; boxC++) {
      const cells: { r: number; c: number; val: number }[] = [];
      for (let r = boxR * 3; r < boxR * 3 + 3; r++) {
        for (let c = boxC * 3; c < boxC * 3 + 3; c++) {
          cells.push({ r, c, val: board[r][c].value });
        }
      }
      checkGroup(cells, conflicts);
    }
  }

  return conflicts;
}

function checkGroup(
  cells: { r: number; c: number; val: number }[],
  conflicts: Set<string>
) {
  const seen = new Map<number, { r: number; c: number }[]>();
  for (const cell of cells) {
    if (cell.val === 0) continue;
    const existing = seen.get(cell.val);
    if (existing) {
      existing.push({ r: cell.r, c: cell.c });
    } else {
      seen.set(cell.val, [{ r: cell.r, c: cell.c }]);
    }
  }
  for (const positions of seen.values()) {
    if (positions.length > 1) {
      for (const pos of positions) {
        conflicts.add(`${pos.r},${pos.c}`);
      }
    }
  }
}

export function isBoardComplete(board: Board, solution: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c].value !== solution[r][c]) return false;
    }
  }
  return true;
}
