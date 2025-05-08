import { checkbox, input, rawlist } from '@inquirer/prompts';
import { JsonTodoCollection } from './jsonTodoCollection';
import { TodoItem } from './todoItem';

const collection = new JsonTodoCollection('John', [
  new TodoItem(1, 'Buy groceries'),
  new TodoItem(2, 'Clean the house', true),
  new TodoItem(3, 'Finish homework'),
  new TodoItem(4, 'Read a book'),
]);

let showCompleted = true;

enum Commands {
  Add = 'Add New Task',
  Quit = 'Quit',
  Purge = 'Remove Completed Tasks',
  Toggle = 'Show/Hide Completed',
  Complete = 'Complete Task',
}

function displayTodoList(): void {
  console.log(`${collection.userName}'s Todo List (${collection.getItemCounts().incomplete} items todo)`);
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

async function promptAdd(): Promise<void> {
  console.clear();

  const todo = await input({ message: 'Enter task:' });

  collection.addTodo(todo);

  promptUser();
}

async function promptUser(): Promise<void> {
  console.clear();

  displayTodoList();

  const command = await rawlist({ choices: Object.values(Commands), message: 'Choose option' });

  switch (command) {
    case Commands.Add:
      promptAdd();
      break;
    case Commands.Purge:
      collection.removeComplete();
      promptUser();
      break;
    case Commands.Toggle:
      showCompleted = !showCompleted;
      promptUser();
      break;
    case Commands.Complete:
      if (collection.getItemCounts().incomplete > 0) {
        promptComplete();
      } else {
        promptUser();
      }
      break;
  }
}

async function promptComplete(): Promise<void> {
  console.clear();

  const completedTasks = await checkbox({
    message: 'Mark Tasks Complete',
    choices: collection
      .getTodoItems(false)
      .map((item) => ({ name: item.task, value: item.id, checked: item.completed })),
  });

  completedTasks.forEach((id) => collection.markComplete(id, true));

  promptUser();
}

promptUser();
