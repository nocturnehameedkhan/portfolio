let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function save() { localStorage.setItem('todos', JSON.stringify(todos)); updateStats(); }

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;
  todos.unshift({ id: Date.now(), text, done: false });
  input.value = '';
  save(); render();
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save(); render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save(); render();
}

function clearDone() {
  todos = todos.filter(t => !t.done);
  save(); render();
}

function filterTodos(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

function updateStats() {
  const done = todos.filter(t => t.done).length;
  document.getElementById('totalTasks').textContent = `${todos.length} tasks`;
  document.getElementById('doneTasks').textContent = `${done} done`;
}

function render() {
  const list = document.getElementById('todoList');
  const filtered = todos.filter(t => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });
  if (filtered.length === 0) {
    list.innerHTML = '<li style="text-align:center;color:#94a3b8;padding:2rem">No tasks here!</li>';
    return;
  }
  list.innerHTML = filtered.map(t => `
    <li class="todo-item ${t.done ? 'done' : ''}">
      <input type="checkbox" class="todo-check" ${t.done ? 'checked' : ''} onchange="toggleTodo(${t.id})"/>
      <span class="todo-text">${escapeHtml(t.text)}</span>
      <button class="todo-delete" onclick="deleteTodo(${t.id})">✕</button>
    </li>
  `).join('');
  updateStats();
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.getElementById('todoInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});

render();