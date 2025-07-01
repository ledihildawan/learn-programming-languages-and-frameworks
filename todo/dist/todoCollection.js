"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
    userName;
    todoItems;
    #nextId = 1;
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
    }
    getTodoById(id) {
        return this.todoItems.find((todoItem) => todoItem.id === id);
    }
    addTodo(task) {
        while (this.getTodoById(this.#nextId)) {
            this.#nextId++;
        }
        this.todoItems.push(new todoItem_1.TodoItem(this.#nextId, task));
        return this.#nextId;
    }
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
}
exports.TodoCollection = TodoCollection;
