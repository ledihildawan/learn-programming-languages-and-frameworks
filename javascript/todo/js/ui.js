const UI = (() => {
  const ul = document.querySelector('.list-group');
  const emptyAlert = document.querySelector('.empty-alert');

  const listTemplate = (task) => {
    const li = document.createElement('li');
    const iDelete = document.createElement('i');

    li.className = 'list-group-item d-flex align-items-center';
    li.textContent = task.text;
    iDelete.className = 'fas fa-trash-alt delete-item ml-auto';

    li.setAttribute('data-id', task.id);
    li.appendChild(iDelete);

    return li;
  };

  const addTask = (task) => {
    ul.insertAdjacentElement('afterbegin', listTemplate(task));
  };

  const deleteTask = (id) => {
    const li = ul.querySelector(`[data-id="${id}"]`);

    li.remove();
  };

  const checkList = () => {
    emptyAlert.style.display = ul.children.length ? 'none' : 'block';
  };

  const deleteAll = () => {
    ul.innerHTML = '';
  };

  return {
    addTask,
    checkList,
    deleteAll,
    deleteTask,
  };
})();
