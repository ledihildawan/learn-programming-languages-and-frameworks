import inquirer from 'inquirer';
import { TodoCollection } from './todoCollection.js';
import { TodoItem } from './todoItem.js';

const todos = [
  new TodoItem(1, 'Buy Flowers'),
  new TodoItem(2, 'Get Shoes'),
  new TodoItem(3, 'Collect Tickets'),
  new TodoItem(4, 'Call Joe', true),
];

const collection = new TodoCollection('Adam', todos);

let showCompleted = true;

function displayTodoList() {
  console.log(`${collection.userName}'s Todo List (${collection.getItemCount().incomplete} items to do)`);
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Quit = 'Quit',
  Toggle = 'Show/Hide Completed',
}

function promptUser() {
  console.clear();

  displayTodoList();

  inquirer
    .prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers['command']) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
      }
    });
}

promptUser();

// const newId = collection.addTodo('Go fo run');
// const todoItem = collection.getTodoById(newId);

// todoItem.printDetails();

// collection.addTodo(todoItem);
// collection.removeComplete();
