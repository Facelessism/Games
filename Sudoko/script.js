const startingGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createSudokuBoard(grid) {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = 1;
      cell.classList.add('sudoku-cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      if (grid[row][col] !== 0) {
        cell.value = grid[row][col];
        cell.disabled = true;
        cell.classList.add('fixed');
      } else {
        cell.addEventListener('input', function () {
          this.value = this.value.replace(/[^1-9]/g, '');
        });
      }
      board.appendChild(cell);
    }
  }
}

function getCurrentGrid() {
  const cells = document.querySelectorAll('.sudoku-cell');
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    grid[row][col] = cell.value === '' ? 0 : parseInt(cell.value, 10);
  });
  return grid;
}

function checkSudoku() {
  const grid = getCurrentGrid();
  const msg = document.getElementById('message');
  if (validateSudoku(grid)) {
    msg.textContent = 'Congratulations!!! Your Sudoku is correct!';
    msg.style.color = "green";
  } else {
    msg.textContent = 'Incorrect or incomplete Sudoku.';
    msg.style.color = "red";
  }
}

function validateSudoku(grid) {
  for (let i = 0; i < 9; i++) {
    const row = new Set(), col = new Set(), block = new Set();
    for (let j = 0; j < 9; j++) {
      if (grid[i][j]) {
        if (row.has(grid[i][j])) return false;
        row.add(grid[i][j]);
      }
      if (grid[j][i]) {
        if (col.has(grid[j][i])) return false;
        col.add(grid[j][i]);
      }
      const r = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const c = 3 * (i % 3) + (j % 3);
      if (grid[r][c]) {
        if (block.has(grid[r][c])) return false;
        block.add(grid[r][c]);
      }
    }
  }
  for (let row of grid) for (let v of row) if (!v) return false;
  return true;
}

createSudokuBoard(startingGrid);