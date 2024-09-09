const cells = document.querySelectorAll("[data-cell]");
const turnTitle = document.getElementById("turn");
const restartButton = document.getElementById("restartButton");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameActive = true;

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameActive = false;
      cells[a].style.backgroundColor = "aqua";
      cells[b].style.backgroundColor = "aqua";
      cells[c].style.backgroundColor = "aqua";
      announceWinner(cells[a].textContent);
      return;
    }
  }

  if ([...cells].every((cell) => cell.textContent !== "")) {
    gameActive = false;
    announceDraw();
  }
}

function announceWinner(winner) {
  turnTitle.textContent = `${winner} wins`;
  setTimeout(restartGame, 2200);
}

function announceDraw() {
  turnTitle.textContent = "It's a draw!";
  setTimeout(restartGame, 2200);
}

function updateTurnDisplay() {
  turnTitle.textContent = `${currentPlayer}'s turn`;
}

function handleCellClick(e) {
  const cell = e.target;
  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnDisplay();
  }
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  updateTurnDisplay();
}

updateTurnDisplay();
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
