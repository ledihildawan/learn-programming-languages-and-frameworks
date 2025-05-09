const id = Id;

const Tasks = (() => {
  let tasks = [];
  let instance;

  const getTasks = () => {
    return tasks;
  };

  const setTasks = (array) => {
    return (tasks = array);
  };

  const addTask = async (task) => {
    task.id = id.generate();

    await tasks.unshift(task);

    return task;
  };

  const removeTask = async (id) => {
    tasks = await tasks.filter((task) => task.id !== id);

    return tasks;
  };

  const removeAll = async () => {
    tasks = [];
  };

  const createInstance = () => {
    return {
      addTask,
      getTasks,
      setTasks,
      removeAll,
      removeTask,
    };
  };

  return {
    getInstance() {
      return instance || (instance = createInstance());
    },
  };
})();
