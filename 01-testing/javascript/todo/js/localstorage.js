const allTasks = Tasks.getInstance();

const Localstorage = (() => {
  function update() {
    localStorage.setItem('tasks', JSON.stringify(allTasks.getTasks()));
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  return {
    update,
    getTasks,
  };
})();
