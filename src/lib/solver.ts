// Backtracking Sudoku solver

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) return false;
    if (grid[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  return true;
}

function findEmpty(grid: number[][]): [number, number] | null {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) return [r, c];
    }
  }
  return null;
}

export function solve(grid: number[][]): number[][] | null {
  const copy = grid.map(row => [...row]);
  if (solveInPlace(copy)) return copy;
  return null;
}

function solveInPlace(grid: number[][]): boolean {
  const empty = findEmpty(grid);
  if (!empty) return true;
  const [row, col] = empty;
  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveInPlace(grid)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

// Solve with randomized candidate order (for generation)
export function solveRandom(grid: number[][]): number[][] | null {
  const copy = grid.map(row => [...row]);
  if (solveRandomInPlace(copy)) return copy;
  return null;
}

function solveRandomInPlace(grid: number[][]): boolean {
  const empty = findEmpty(grid);
  if (!empty) return true;
  const [row, col] = empty;
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (const num of nums) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveRandomInPlace(grid)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
}

export function countSolutions(grid: number[][], limit: number): number {
  const copy = grid.map(row => [...row]);
  let count = 0;

  function search(): boolean {
    const empty = findEmpty(copy);
    if (!empty) {
      count++;
      return count >= limit;
    }
    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
      if (isValid(copy, row, col, num)) {
        copy[row][col] = num;
        if (search()) return true;
        copy[row][col] = 0;
      }
    }
    return false;
  }

  search();
  return count;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
