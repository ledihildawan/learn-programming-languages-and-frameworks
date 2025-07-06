import { TodoItem } from './todoItem.js';
export class TodoCollection {
    userName;
    _nextId = 1;
    itemMap = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.getTodoById(this._nextId)) {
            this._nextId++;
        }
        this.itemMap.set(this._nextId, new TodoItem(this._nextId, task));
        return this._nextId;
    }
    getTodoById(id) {
        return this.itemMap.get(id);
    }
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter((item) => includeComplete || !item.complete);
    }
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
    removeComplete() {
        const toDelete = [];
        this.itemMap.forEach((item) => {
            if (item.complete) {
                toDelete.push(item.id);
            }
        });
        toDelete.forEach((id) => this.itemMap.delete(id));
    }
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
