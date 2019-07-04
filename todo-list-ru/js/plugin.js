const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const form = document.forms['addTodoItem'];
const itemTitle = form.elements['todoText'];
const notificationAlert = document.querySelector('.notification-alert');

function generateId() {
  let id = '';
  let characters = '1234567890qwertyuiopasdfghjklzxcvbnm';

  for (let i = 0; i < 15; i++) {
    let position = Math.floor(Math.random() * characters.length);
    id += characters[position];
  }

  return id;
}

function message(options) {
  const { message, className, duration } = options;

  notificationAlert.classList.add(className, 'show');
  notificationAlert.textContent = message;
  
  setTimeout(() => {
    notificationAlert.classList.remove('show', className);
  }, duration)
}

function listTemplate(task) {
  const { id, title } = task;

  const li = document.createElement('li');
  li.className = 'list-group-item d-flex align-items-center';
  li.setAttribute('data-key', id);

  // Task title
  const span = document.createElement('span');
  span.textContent = title;
  li.appendChild(span);

  // Edit item
  const iEdit = document.createElement('i');
  iEdit.className = 'fas fa-edit edit-item ml-auto';
  li.appendChild(iEdit);

  // Delete item
  const iDelete = document.createElement('i');
  iDelete.className = 'fas fa-trash-alt delete-item ml-4';
  li.appendChild(iDelete);

  return li;
}

function clearList() {
  tasks.splice(0);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  ul.innerHTML = '';
}

function deleteListItem(e) {
  e.stopPropagation();

  // Delete item
  if (e.target.classList.contains('delete-item')) {
    const index = e.target.closest('li');
    const id = index.dataset.key;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.parentElement.remove();
  }

  // Edit item
  if (e.target.classList.contains('edit-item')) {
    e.target.classList.toggle('fa-save');
    const id = e.target.closest('li').dataset.key;
    const span = e.target.closest('li').querySelector('span');

    if (e.target.classList.contains('fa-save')) {
      span.setAttribute('contenteditable', true);
      span.focus();
    } else {
      span.setAttribute('contenteditable', false);
      span.blur();

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks[i].title = span.textContent;
          break;
        }
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));

      message({
        message: 'data updated',
        className: 'alert-success',
        duration: 4000
      });
    }
  }
}

function addListItem(title) {
  const newTask = {
    id: generateId(),
    title
  }

  tasks.unshift(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const sameTitle = tasks.filter(task => task.title === title)[0];
  ul.insertAdjacentElement('afterbegin', listTemplate(sameTitle));
}

function generateList(tasksArray) {
  for (let i = 0; i < tasks.length; i++) {
    ul.appendChild(listTemplate(tasksArray[i]));
  }

  ul.addEventListener('click', deleteListItem);
  clearBtn.addEventListener('click', clearList);
}

// Add taks to tasksArr and insert task to the top of list
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = itemTitle.value.trim();

  if (!title) {
    itemTitle.classList.add('is-invalid');
  } else {
    addListItem(title);
    itemTitle.classList.remove('is-invalid');
    itemTitle.placeholder = title;
    form.reset();
  }
});

generateList(tasks);