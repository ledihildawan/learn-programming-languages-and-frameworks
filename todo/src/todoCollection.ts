import { TodoItem } from './todoItem.js';

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  readonly #itemMap = new Map<number, TodoItem>();

  #nextId: number = 1;

  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.#itemMap.set(item.id, item));
  }

  addTodo(task: string) {
    while (this.getTodoById(this.#nextId)) {
      this.#nextId++;
    }

    this.#itemMap.set(this.#nextId, new TodoItem(this.#nextId, task));

    return this.#nextId;
  }

  getTodoById(id: number) {
    return this.#itemMap.get(id);
  }

  getTodoItems(includeComplete: boolean) {
    return [...this.#itemMap.values()].filter((item) => includeComplete || !item.complete);
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);

    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  removeComplete() {
    const toDelete: number[] = [];

    this.#itemMap.forEach((item) => {
      if (item.complete) {
        toDelete.push(item.id);
      }
    });

    toDelete.forEach((id) => this.#itemMap.delete(id));
  }

  getItemCount(): ItemCounts {
    return {
      total: this.#itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
