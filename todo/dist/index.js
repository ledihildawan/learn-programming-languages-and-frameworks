"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoItem_1 = require("./todoItem");
const todos = [
    new todoItem_1.TodoItem(1, 'Buy Flowers'),
    new todoItem_1.TodoItem(2, 'Get Shoes'),
    new todoItem_1.TodoItem(3, 'Collect Tickets'),
    new todoItem_1.TodoItem(4, 'Call Joe', true),
];
const collection = new todoCollection_1.TodoCollection('Adam', todos);
console.clear();
console.log(`${collection.userName}'s Todo List`);
const newId = collection.addTodo('Go fo run');
const todoItem = collection.getTodoById(newId);
todoItem.printDetails();
