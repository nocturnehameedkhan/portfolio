let tiles = [], moves = 0, seconds = 0, timerInterval = null, started = false;
const goal = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

function initBoard() {
  tiles = [...goal];
  shuffleBoard();
}

function shuffleBoard() {
  document.getElementById('winMessage').classList.add('hidden');
  moves = 0; seconds = 0; started = false;
  clearInterval(timerInterval);
  document.getElementById('moves').textContent = 0;
  document.getElementById('time').textContent = '00:00';

  // Shuffle via random valid moves (guarantees solvability)
  tiles = [...goal];
  for (let i = 0; i < 200; i++) {
    const empty = tiles.indexOf(0);
    const neighbors = getMovable(empty);
    const n = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[empty], tiles[n]] = [tiles[n], tiles[empty]];
  }
  render();
}

function getMovable(emptyIdx) {
  const row = Math.floor(emptyIdx / 4), col = emptyIdx % 4;
  const neighbors = [];
  if (row > 0) neighbors.push(emptyIdx - 4);
  if (row < 3) neighbors.push(emptyIdx + 4);
  if (col > 0) neighbors.push(emptyIdx - 1);
  if (col < 3) neighbors.push(emptyIdx + 1);
  return neighbors;
}

function clickTile(idx) {
  const empty = tiles.indexOf(0);
  if (!getMovable(empty).includes(idx)) return;
  if (!started) { started = true; timerInterval = setInterval(tick, 1000); }
  [tiles[empty], tiles[idx]] = [tiles[idx], tiles[empty]];
  moves++;
  document.getElementById('moves').textContent = moves;
  render();
  if (tiles.join(',') === goal.join(',')) setTimeout(showWin, 300);
}

function tick() {
  seconds++;
  const m = String(Math.floor(seconds/60)).padStart(2,'0');
  const s = String(seconds%60).padStart(2,'0');
  document.getElementById('time').textContent = `${m}:${s}`;
}

function showWin() {
  clearInterval(timerInterval);
  document.getElementById('winMessage').classList.remove('hidden');
}

function solveHint() {
  // Highlight the tile that should move toward goal position
  const empty = tiles.indexOf(0);
  const movable = getMovable(empty);
  // Find which neighbor is misplaced and closest to goal
  let best = movable[0];
  movable.forEach(idx => {
    const val = tiles[idx];
    if (val !== 0 && val - 1 !== idx) best = idx; // tile not in goal position
  });
  const cells = document.querySelectorAll('.tile');
  cells[best].classList.add('hint');
  setTimeout(() => cells[best].classList.remove('hint'), 800);
}

function render() {
  document.getElementById('board').innerHTML = tiles.map((val, i) => `
    <div class="tile ${val === 0 ? 'empty' : 'number'}" onclick="clickTile(${i})">
      ${val === 0 ? '' : val}
    </div>
  `).join('');
}

initBoard();