const questions = [
  { q: "What is the capital of France?", opts: ["Berlin","Madrid","Paris","Rome"], ans: 2 },
  { q: "Which planet is known as the Red Planet?", opts: ["Earth","Mars","Jupiter","Venus"], ans: 1 },
  { q: "What is 7 × 8?", opts: ["54","56","58","64"], ans: 1 },
  { q: "Who painted the Mona Lisa?", opts: ["Van Gogh","Picasso","Da Vinci","Rembrandt"], ans: 2 },
  { q: "What is the chemical symbol for Gold?", opts: ["Go","Gd","Au","Ag"], ans: 2 },
  { q: "How many continents are on Earth?", opts: ["5","6","7","8"], ans: 2 },
  { q: "Which language runs in a web browser?", opts: ["Java","Python","C++","JavaScript"], ans: 3 },
  { q: "What is the largest ocean on Earth?", opts: ["Atlantic","Indian","Arctic","Pacific"], ans: 3 },
  { q: "Who wrote 'Romeo and Juliet'?", opts: ["Dickens","Shakespeare","Tolkien","Austen"], ans: 1 },
  { q: "What does HTML stand for?", opts: ["HyperText Markup Language","High Tech Modern Language","HyperText Machine Language","Hyperlink and Text Markup Language"], ans: 0 }
];

let current = 0, score = 0, timer = null, timeLeft = 15;

function startQuiz() {
  current = 0; score = 0;
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById('qNum').textContent = current + 1;
  document.getElementById('liveScore').textContent = score;
  document.getElementById('progress').style.width = ((current / 10) * 100) + '%';
  document.getElementById('questionBox').textContent = q.q;
  document.getElementById('feedback').textContent = '';
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    opts.appendChild(btn);
  });
  startTimer();
}

function startTimer() {
  timeLeft = 15;
  clearInterval(timer);
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) { clearInterval(timer); autoNext(); }
  }, 1000);
}

function updateTimer() {
  const el = document.getElementById('timer');
  el.textContent = `⏱ ${timeLeft}s`;
  el.className = 'timer' + (timeLeft <= 5 ? ' urgent' : '');
}

function selectAnswer(idx) {
  clearInterval(timer);
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);
  const correct = questions[current].ans;
  btns[correct].classList.add('correct');
  if (idx === correct) {
    score++;
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').style.color = '#28a745';
  } else {
    btns[idx].classList.add('wrong');
    document.getElementById('feedback').textContent = '❌ Wrong!';
    document.getElementById('feedback').style.color = '#dc3545';
  }
  setTimeout(nextQuestion, 1500);
}

function autoNext() {
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  document.querySelectorAll('.option-btn')[questions[current].ans].classList.add('correct');
  document.getElementById('feedback').textContent = '⏰ Time\'s up!';
  document.getElementById('feedback').style.color = '#856404';
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  current++;
  if (current < questions.length) showQuestion();
  else showResults();
}

function showResults() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('finalScore').textContent = `${score}/10`;
  const msgs = ['Keep practicing! 💪','Not bad! 👍','Great job! 🎉','Almost perfect! 🌟','Perfect score! 🏆'];
  const icon = ['😅','🙂','😊','🌟','🏆'];
  const idx = Math.floor(score / 2);
  document.getElementById('resultMsg').textContent = msgs[idx];
  document.getElementById('resultIcon').textContent = icon[idx];
}

function restartQuiz() {
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
}