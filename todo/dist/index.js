import inquirer from 'inquirer';
import { JsonTodoCollection } from './jsonTodoCollection.js';
import { TodoItem } from './todoItem.js';
const todos = [
    new TodoItem(1, 'Buy Flowers'),
    new TodoItem(2, 'Get Shoes'),
    new TodoItem(3, 'Collect Tickets'),
    new TodoItem(4, 'Call Joe', true),
];
const collection = new JsonTodoCollection('Adam', todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List (${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Quit"] = "Quit";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Complete"] = "Complete Task";
    Commands["Purge"] = "Remove Completed Tasks";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer.prompt({ type: 'input', name: 'add', message: 'Enter Task:' }).then((answers) => {
        const task = answers['add'];
        if (task !== '') {
            collection.addTodo(task);
        }
        promptUser();
    });
}
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark Tasks Complete',
        choices: collection
            .getTodoItems(showCompleted)
            .map((item) => ({ name: item.task, value: item.id, checked: item.complete })),
    })
        .then((answers) => {
        let completedTasks = answers['complete'];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, Boolean(completedTasks.find((id) => id === item.id))));
        promptUser();
    });
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
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
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
