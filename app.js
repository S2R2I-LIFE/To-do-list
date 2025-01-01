// Selectors
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// Event Listeners
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', handleListClick);

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
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add('complete-btn');

  // Create Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add('delete-btn');

  // Append elements
  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  // Clear input
  todoInput.value = '';

  // Save todo
  saveLocalTodos(todoInput.value);
}

function handleListClick(event) {
    // ... existing code ...
  
    if (target.classList.contains('complete-btn')) {
      // ... existing code ...
      updateLocalTodos();
    } else if (target.classList.contains('delete-btn')) {
      // ... existing code ...
      updateLocalTodos();
    }
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

function saveLocalTodos(todo) {
  let todos = getLocalTodos();
  todos.push({ text: todo, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

function loadTodos() {
  let todos = getLocalTodos();
  todos.forEach((todo) => {
    // Create list item as before using todo.text and todo.completed
    // Add logic to mark as completed if todo.completed is true
  });
}

// Call loadTodos on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
});