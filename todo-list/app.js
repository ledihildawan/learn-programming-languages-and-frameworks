const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const todoList = document.querySelector('.todos');

const generateTodoItem = name => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${name}</span>
      <i class="fa fa-trash-o delete" aria-hidden="true"></i>
    </li>
  `;

  todoList.innerHTML += html;
};

const deleteTodo = e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
};

const filteredTodos = _ => {
  
};

todoList.addEventListener('click', e => {
  deleteTodo(e);
});

addForm.addEventListener('submit', e => {
  e.preventDefault();

  let todoText = addForm.add.value

  if (todoText) {
    generateTodoItem(todoText);
    addForm.reset();
  }
});

search.addEventListener('keyup', _ => {
  let term = search.value.toLowerCase().trim();

  Array.from(todoList.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  Array.from(todoList.children)
  .filter(todo => todo.textContent.toLowerCase().includes(term))
  .forEach(todo => todo.classList.remove('filtered'));
});