import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { TodoCollection } from './todoCollection';
import { TodoItem } from './todoItem';

type schemaType = {
  tasks: TodoItem[];
};

export class JsonTodoCollection extends TodoCollection {
  #database: LowSync<schemaType>;

  constructor(public userName: string, public todoItems: TodoItem[] = []) {
    super(userName, []);

    this.#database = new LowSync(new JSONFileSync('Todos.json'), { tasks: [] });

    this.#database.read();

    if (this.#database.data == null) {
      this.#database.data = { tasks: todoItems };
    } else {
      this.#database.data.tasks.forEach((item) =>
        this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.completed))
      );
    }
  }

  addTodo(task: string): number {
    const result = super.addTodo(task);

    this.#storeTasks();

    return result;
  }

  markComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);

    this.#storeTasks();
  }

  removeComplete() {
    super.removeComplete();

    this.#storeTasks();
  }

  #storeTasks() {
    this.#database.data.tasks = [...this.itemMap.values()];
    this.#database.write();
  }
}
