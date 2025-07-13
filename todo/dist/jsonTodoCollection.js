import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { TodoCollection } from './todoCollection.js';
import { TodoItem } from './todoItem.js';
export class JsonTodoCollection extends TodoCollection {
    userName;
    todoItems;
    _database;
    constructor(userName, todoItems = []) {
        super(userName, []);
        this.userName = userName;
        this.todoItems = todoItems;
        this._database = new LowSync(new JSONFileSync('Todos.json'));
        this._database.read();
        if (this._database.data) {
            this._database.data.tasks.forEach((item) => this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete)));
        }
        else {
            this._database.data = { tasks: todoItems };
            this._database.write();
            this.itemMap.forEach((item) => this.itemMap.set(item.id, item));
        }
    }
    addTodo(task) {
        const result = super.addTodo(task);
        this._storeTasks();
        return result;
    }
    markComplete(id, complete) {
        super.markComplete(id, complete);
        this._storeTasks();
    }
    removeComplete() {
        super.removeComplete();
        this._storeTasks();
    }
    _storeTasks() {
        this._database.data.tasks = [...this.itemMap.values()];
        this._database.write();
    }
}
//# sourceMappingURL=jsonTodoCollection.js.map