let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, Draw: 0 };

const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function renderBoard() {
  const el = document.getElementById('board');
  el.innerHTML = board.map((cell, i) => `
    <div class="cell ${cell.toLowerCase()} ${cell ? 'taken' : ''}" onclick="makeMove(${i})">${cell}</div>
  `).join('');
}

function makeMove(i) {
  if (board[i] || gameOver) return;
  board[i] = currentPlayer;
  renderBoard();
  const result = checkWin();
  if (result) {
    handleEnd(result);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  for (const combo of wins) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return { winner: board[a], combo };
  }
  if (board.every(cell => cell)) return { winner: null };
  return null;
}

function handleEnd(result) {
  gameOver = true;
  if (result.winner) {
    scores[result.winner]++;
    document.getElementById('status').textContent = `🎉 Player ${result.winner} wins!`;
    result.combo.forEach(i => document.querySelectorAll('.cell')[i].classList.add('win'));
  } else {
    scores.Draw++;
    document.getElementById('status').textContent = "It's a draw! 🤝";
  }
  updateScores();
  setTimeout(resetGame, 2500);
}

function updateScores() {
  document.getElementById('scoreX').textContent = scores.X;
  document.getElementById('scoreO').textContent = scores.O;
  document.getElementById('scoreDraw').textContent = scores.Draw;
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function resetScores() {
  scores = { X: 0, O: 0, Draw: 0 };
  updateScores();
  resetGame();
}

renderBoard();