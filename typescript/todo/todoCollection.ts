import { TodoItem } from './todoItem';

type TodoCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  #nextId: number = 1;

  protected itemMap: Map<number, TodoItem> = new Map<number, TodoItem>();

  constructor(public userName: string, public todos: TodoItem[] = []) {
    todos.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.getTodoById(this.#nextId)) {
      this.#nextId++;
    }

    this.itemMap.set(this.#nextId, new TodoItem(this.#nextId, task));

    return this.#nextId;
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.itemMap.get(id);
  }

  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter((item) => includeComplete || !item.completed);
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);

    if (todoItem) {
      todoItem.completed = complete;
    }
  }

  removeComplete() {
    this.itemMap.forEach((item) => {
      if (item.completed) {
        this.itemMap.delete(item.id);
      }
    });
  }

  getItemCounts(): TodoCounts {
    return {
      incomplete: this.getTodoItems(false).length,
      total: this.itemMap.size,
    };
  }
}
