import { TodoItem } from './todoItem.js';

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private _nextId = 1;

  protected readonly itemMap = new Map<number, TodoItem>();

  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string) {
    while (this.getTodoById(this._nextId)) {
      this._nextId++;
    }

    this.itemMap.set(this._nextId, new TodoItem(this._nextId, task));

    return this._nextId;
  }

  getTodoById(id: number) {
    return this.itemMap.get(id);
  }

  getTodoItems(includeComplete: boolean) {
    return [...this.itemMap.values()].filter((item) => includeComplete || !item.complete);
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);

    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  removeComplete() {
    const toDelete: number[] = [];

    this.itemMap.forEach((item) => {
      if (item.complete) {
        toDelete.push(item.id);
      }
    });

    toDelete.forEach((id) => this.itemMap.delete(id));
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
