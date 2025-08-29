// Get elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
}

// Save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos to the DOM
function renderTodos() {
    todoList.innerHTML = '';
    const todos = loadTodos();
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text';
        if (todo.completed) {
            span.classList.add('todo-completed');
        }
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleComplete(index));

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeTodo(index));

        li.appendChild(span);
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    });
}

// Add a new todo
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text === '') return;
    const todos = loadTodos();
    todos.push({ text, completed: false });
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
});

// Toggle completed state
function toggleComplete(index) {
    const todos = loadTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

// Remove a todo
function removeTodo(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
}

// Initial render
renderTodos();
