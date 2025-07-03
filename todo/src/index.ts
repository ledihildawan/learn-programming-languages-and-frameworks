import { TodoCollection } from './todoCollection';
import { TodoItem } from './todoItem';

const todos = [
  new TodoItem(1, 'Buy Flowers'),
  new TodoItem(2, 'Get Shoes'),
  new TodoItem(3, 'Collect Tickets'),
  new TodoItem(4, 'Call Joe', true),
];

const collection = new TodoCollection('Adam', todos);

console.clear();
console.log(`${collection.userName}'s Todo List (${collection.getItemCount().incomplete} items to do)`);

// const newId = collection.addTodo('Go fo run');
// const todoItem = collection.getTodoById(newId);

// todoItem.printDetails();

// collection.addTodo(todoItem);
// collection.removeComplete();
collection.getTodoItems(true).forEach((item) => item.printDetails());
