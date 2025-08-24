'use strict';

const keysPressed = {};
const ROWS = 21;
const COLS = 31;
let maze = [];
let playerPos = { row: 1, col: 1 };
let goalPos = { row: 1, col: 1 };
let showPlayer = false;
let hasWarped = false;
let canRegenerate = false;
let isInitializing = false;
let goalReached = false;

const mazeContainer = document.getElementById("maze");
const info = document.getElementById("info");
const startDisplay = document.getElementById("startPos");
const goalDisplay = document.getElementById("goalPos");

function generateMaze(rows, cols) {
  const grid = Array.from({ length: rows }, () => Array(cols).fill(1));
  grid[1][1] = 0;

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function carve(row, col) {
    const directions = shuffleArray([[0, 2], [2, 0], [-2, 0], [0, -2]]);
    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc] === 1) {
        grid[nr][nc] = 0;
        grid[row + dr / 2][col + dc / 2] = 0;
        carve(nr, nc);
      }
    }
  }

  carve(1, 1);
  grid[rows - 2][cols - 2] = 0;
  return grid;
}

function pickStartGoal(grid) {
  const pathCells = [];
  for (let r = 1; r < ROWS - 1; r++) {
    for (let c = 1; c < COLS - 1; c++) {
      if (grid[r][c] === 0) pathCells.push({ row: r, col: c });
    }
  }

  function distance(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  const start = pathCells[Math.floor(Math.random() * pathCells.length)];
  const candidates = pathCells.filter(cell => distance(cell, start) >= 20);
  const goal = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : start;
  return { start, goal };
}

function renderMaze() {
  mazeContainer.style.gridTemplateRows = `repeat(${ROWS}, 20px)`;
  mazeContainer.style.gridTemplateColumns = `repeat(${COLS}, 20px)`;
  mazeContainer.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (maze[r][c] === 1) cell.classList.add("wall");
      else cell.classList.add("path");

      if (r === goalPos.row && c === goalPos.col) {
        cell.classList.add("goal");
        cell.setAttribute("aria-label", "ゴール");
      }

      if (showPlayer && r === playerPos.row && c === playerPos.col) {
        cell.classList.add("player");
      }

      mazeContainer.appendChild(cell);
    }
  }

  startDisplay.textContent = `(${playerPos.row}, ${playerPos.col})`;
  goalDisplay.textContent = `(${goalPos.row}, ${goalPos.col})`;

  if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
    if (!isInitializing) {
      info.style.visibility = "visible";
      info.textContent = " ゴールに到達しました！";
      canRegenerate = true;
      goalReached = true;
    }
  } else {
    info.style.visibility = "hidden";
  }
}

function movePlayer(dr, dc) {
  const newRow = playerPos.row + dr;
  const newCol = playerPos.col + dc;
  if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && maze[newRow][newCol] === 0) {
    playerPos = { row: newRow, col: newCol };
    renderMaze();
  }
}

function movePlayerToGoal() {
  if (!hasWarped) {
    playerPos = { ...goalPos };
    renderMaze();
    info.textContent = " ゴールに到達しました！";
    info.style.visibility = "visible";
    hasWarped = true;
    canRegenerate = true;
    goalReached = true;
  }
}

function regenerateMaze() {
  isInitializing = true;
  maze = generateMaze(ROWS, COLS);
  const { start, goal } = pickStartGoal(maze);
  playerPos = start;
  goalPos = goal;
  hasWarped = false;
  canRegenerate = false;
  goalReached = false;
  info.textContent = "";
  Object.keys(keysPressed).forEach(key => keysPressed[key] = false);
  renderMaze();
  isInitializing = false;
}

window.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;

  if (e.key === " ") {
    e.preventDefault();
  }

  if (e.key === "Control") {
    if (!showPlayer) {
      showPlayer = true;
      renderMaze();
    }
  }

  if (!info.textContent.includes("ゴール")) {
    switch (e.key.toLowerCase()) {
      case "w": case "arrowup": movePlayer(-1, 0); break;
      case "s": case "arrowdown": movePlayer(1, 0); break;
      case "a": case "arrowleft": movePlayer(0, -1); break;
      case "d": case "arrowright": movePlayer(0, 1); break;
    }
  }

  if (keysPressed[" "] && keysPressed["g"]) {
    movePlayerToGoal();
  }

  if (e.key === "Enter" && canRegenerate) {
    regenerateMaze();
  }
});

window.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
  if (e.key === "Control") {
    showPlayer = false;
    renderMaze();
  }
});

document.getElementById("btnNew").addEventListener("click", () => {
  regenerateMaze();
});

regenerateMaze();