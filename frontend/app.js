const API = 'http://localhost:5001/api/todos';
const list = document.getElementById('list');
const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const bar = document.getElementById('bar');
const percent = document.getElementById('percent');

let todos = [];
let mode = 'all';

const load = async () => {
  const res = await fetch(API);
  todos = await res.json();
  render();
};

const render = () => {
  list.innerHTML = '';
  let filtered = todos;

  if (mode === 'done') filtered = todos.filter(t => t.completed);
  if (mode === 'todo') filtered = todos.filter(t => !t.completed);

  filtered.forEach(t => {
    const div = document.createElement('div');
    div.className = 'todo' + (t.completed ? ' done' : '');
    div.innerHTML = `
      <span>${t.title}</span>
      <div>
        <button onclick=\"toggle('${t._id}', ${t.completed})\">✓</button>
        <button onclick=\"del('${t._id}')\">🗑</button>
      </div>`;
    list.appendChild(div);
  });

  updateProgress();
};

const updateProgress = () => {
  const done = todos.filter(t => t.completed).length;
  const total = todos.length || 1;
  const p = Math.round((done / total) * 100);
  bar.style.width = p + '%';
  percent.textContent = p + '%';
};

const toggle = async (id, done) => {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !done })
  });
  load();
};

const del = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  load();
};

addBtn.onclick = async () => {
  if (!input.value.trim()) return;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value })
  });
  input.value = '';
  load();
};

const filter = f => { mode = f; render(); };

const toggleTheme = () => {
  document.body.classList.toggle('dark');
};

load();
