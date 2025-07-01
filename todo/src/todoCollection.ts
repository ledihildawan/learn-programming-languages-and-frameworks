import { TodoItem } from './todoItem';

export class TodoCollection {
  #nextId = 1;

  constructor(public userName: string, public todoItems: TodoItem[] = []) {}

  getTodoById(id: number) {
    return this.todoItems.find((todoItem) => todoItem.id === id);
  }

  addTodo(task: string) {
    while (this.getTodoById(this.#nextId)) {
      this.#nextId++;
    }

    this.todoItems.push(new TodoItem(this.#nextId, task));

    return this.#nextId;
  }

  markComplete(id: number, complete: boolean) {
    const todoItem = this.getTodoById(id);

    if (todoItem) {
      todoItem.complete = complete;
    }
  }
}
