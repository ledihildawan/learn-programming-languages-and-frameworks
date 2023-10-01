const ui = UI;
const tasks = Tasks.getInstance();

const localstorage = Localstorage;
const info = Info;
const addTaskObserver = new EventObserver();
const removeTaskObserver = new EventObserver();
const removeAllTaskObserver = new EventObserver();

addTaskObserver.subscribe(localstorage.update);
addTaskObserver.subscribe(info.show);
addTaskObserver.subscribe(ui.checkList);

removeTaskObserver.subscribe(localstorage.update);
removeTaskObserver.subscribe(info.show);
removeTaskObserver.subscribe(ui.checklist);

removeAllTaskObserver.subscribe(localstorage.update);
removeAllTaskObserver.subscribe(info.show);
removeAllTaskObserver.subscribe(ui.checklist);

const ul = document.querySelector('.list-group');
const form = document.forms['addTodoItem'];
const inputText = form.elements['todoText'];
const clearBtn = document.querySelector('.clear-btn');

window.addEventListener('load', (e) => {
  const ls = localstorage.getTasks();

  ls.forEach((task) => {
    tasks.addTask(task).then((oneTask) => {
      ui.addTask(oneTask);
      ui.checkList();
    });
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!inputText.value) {
    //
  } else {
    tasks
      .addTask({ text: inputText.value })
      .then((task) => {
        UI.addTask(task);
      })
      .then(() => {
        addTaskObserver.fire({ text: 'Add', class: 'alert alert-success' });
      });
  }
});

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-item')) {
    const id = e.target.closest('li').getAttribute('data-id');

    tasks
      .removeTask(id)
      .then(() => {
        ui.deleteTask(id);
      })
      .then(() => {
        removeTaskObserver.fire({
          text: 'Delete',
          class: 'alert alert-warning',
        });
      });
  }
});

clearBtn.addEventListener('click', () => {
  tasks
    .removeAll()
    .then(() => {
      ui.deleteAll();
    })
    .then(() => {
      removeAllTaskObserver.fire({
        text: 'Delete All',
        class: 'alert alert-warning',
      });
    });
});
