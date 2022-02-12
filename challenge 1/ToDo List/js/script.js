// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');
// array which stores every todos
let todos = [];
// add an eventListener on form
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

// function to add todo
function addTodo(item) {
    // if item is not empty
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        // add it to array
        todos.push(todo);
        addToLocalStorage(todos);
        // clear input box
        todoInput.value = '';
    }
}

// function to render todo list
function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function (item) {
        // check if the item is completed
        const checked = item.completed ? 'checked' : null;
        // make a <li> element and fill it
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        // if completed, add class to'checked',
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    });
}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver array to string and store
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        // converts back to array 
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// toggle completed/completed
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

// deletes a todo from todos array
function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();
todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});