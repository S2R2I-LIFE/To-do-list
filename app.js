// app.js

// Selectors
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const themeToggleBtn = document.querySelector('#theme-toggle');

// Event Listeners
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleListClick);
themeToggleBtn.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();

  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = 'Switch to Light Theme';
  }
});

// Functions

function addTodo(event) {
  event.preventDefault();

  // Create list item
  const li = document.createElement('li');

  // Create span for text
  const span = document.createElement('span');
  span.textContent = todoInput.value;

  // Create Complete Button
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '👍';
  completeBtn.classList.add('complete-btn');

  // Create Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '❌';
  deleteBtn.classList.add('delete-btn');

  // Append elements
  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  // Save to localStorage
  saveLocalTodos(todoInput.value, false);

  // Clear input
  todoInput.value = '';
}

function handleListClick(event) {
  let target = event.target;

  if (target.tagName === 'I') {
    target = target.parentElement;
  }

  const listItem = target.parentElement;

  if (target.classList.contains('complete-btn')) {
    listItem.classList.toggle('completed');
    updateLocalTodos();
  } else if (target.classList.contains('delete-btn')) {
    // **Add confirmation prompt before deleting**
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      todoList.removeChild(listItem);
      updateLocalTodos();
    }
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');

  // Save preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    themeToggleBtn.textContent = 'Switch to Light Theme';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggleBtn.textContent = 'Switch to Dark Theme';
    localStorage.setItem('theme', 'light');
  }
}

// Local Storage Functions

function saveLocalTodos(todoText, completed) {
  let todos = getLocalTodos();
  todos.push({ text: todoText, completed: completed });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

function loadTodos() {
  let todos = getLocalTodos();
  todos.forEach((todo) => {
    // Create list item
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }

    // Create span for text
    const span = document.createElement('span');
    span.textContent = todo.text;

    // Create Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '👍';
    completeBtn.classList.add('complete-btn');

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '❌';
    deleteBtn.classList.add('delete-btn');

    // Append elements
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function updateLocalTodos() {
  let todos = [];
  document.querySelectorAll('#todo-list li').forEach((li) => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    todos.push({ text, completed });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
