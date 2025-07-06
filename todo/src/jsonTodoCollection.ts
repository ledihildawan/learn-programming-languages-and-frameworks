import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { TodoCollection } from './todoCollection.js';
import { TodoItem } from './todoItem.js';

type schemaType = {
  tasks: {
    id: number;
    task: string;
    complete: boolean;
  }[];
};

export class JsonTodoCollection extends TodoCollection {
  private _database!: LowSync<schemaType>;

  constructor(public userName: string, public todoItems: TodoItem[] = []) {
    super(userName, []);

    this._database = new LowSync(new JSONFileSync('Todos.json'));

    this._database.read();

    if (this._database.data) {
      this._database.data.tasks.forEach((item) =>
        this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete))
      );
    } else {
      this._database.data = { tasks: todoItems };

      this._database.write();

      this.itemMap.forEach((item) => this.itemMap.set(item.id, item));
    }
  }

  addTodo(task: string) {
    const result = super.addTodo(task);

    this._storeTasks();

    return result;
  }

  markComplete(id: number, complete: boolean) {
    super.markComplete(id, complete);

    this._storeTasks();
  }

  removeComplete(): void {
    super.removeComplete();

    this._storeTasks();
  }

  private _storeTasks() {
    this._database.data.tasks = [...this.itemMap.values()];

    this._database.write();
  }
}
