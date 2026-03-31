export function createEmptyGrid(): number[][] {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}

export function addRandomTile(grid: number[][]): number[][] {
  const emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) emptyCells.push([r, c]);
    }
  }

  if (emptyCells.length === 0) return grid;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
}

export function moveGrid(grid: number[][], direction: 'up' | 'down' | 'left' | 'right'): { grid: number[][], score: number } {
  let score = 0;
  const newGrid = grid.map(row => [...row]);

  const rotate = (g: number[][]) => {
    const result = createEmptyGrid();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i][j] = g[4 - 1 - j][i];
      }
    }
    return result;
  };

  // Convert all directions to 'left' move
  let rotations = 0;
  if (direction === 'up') rotations = 3;
  else if (direction === 'right') rotations = 2;
  else if (direction === 'down') rotations = 1;

  let currentGrid = newGrid;
  for (let i = 0; i < rotations; i++) currentGrid = rotate(currentGrid);

  // Move left logic
  for (let r = 0; r < 4; r++) {
    let row = currentGrid[r].filter(v => v !== 0);
    const newRow = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === row[i + 1]) {
        const val = row[i] * 2;
        newRow.push(val);
        score += val;
        i++;
      } else {
        newRow.push(row[i]);
      }
    }
    while (newRow.length < 4) newRow.push(0);
    currentGrid[r] = newRow;
  }

  // Rotate back
  for (let i = 0; i < (4 - rotations) % 4; i++) currentGrid = rotate(currentGrid);

  return { grid: currentGrid, score };
}

export function isGameOver(grid: number[][]): boolean {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return false;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
}

export function hasWon(grid: number[][]): boolean {
  return grid.some(row => row.some(cell => cell === 2048));
}
