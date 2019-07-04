const tasks = [
  'Learn JavaScript',
  'Learn Angular 4'
];

const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const form = document.forms['addTodoItem'];
const itemTitle = form.elements['todoText'];

function clearList() {
  tasks.splice(0);
  ul.innerHTML = '';
}

function deleteListItem(e) {
  if (e.target.classList.contains('delete-item')) {
    const index = tasks.indexOf(e.target.parentElement.textContent);
    tasks.splice(index, 1);
    e.target.parentElement.remove();
  }
}

function listTemplate(task) {
  const li = document.createElement('li');
  li.textContent = task;
  li.className = 'list-group-item d-flex align-items-center';

  const i  = document.createElement('i');
  i.className = 'fas fa-trash-alt delete-item ml-auto';

  li.appendChild(i);

  return li;
}

function addListItem(title) {
  tasks.unshift(title);
  ul.insertAdjacentElement('afterbegin', listTemplate(title));
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