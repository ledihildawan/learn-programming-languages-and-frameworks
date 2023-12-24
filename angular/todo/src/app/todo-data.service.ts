import { ITodo, Todo } from './todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  private _lastId: number = 0;

  public todos: Todo[] = [];

  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this._lastId;
    }

    this.todos.push(todo);

    return this;
  }

  public deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);

    return this;
  }

  public getAllTodos(): Todo[] {
    return this.todos;
  }

  public getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo: Todo) => todo.id === id);
  }

  public toggleTodoComplete(todo: Todo): Todo | null {
    const updatedTodo: Todo | null = this.updateTodo(todo.id, {
      complete: !todo.complete,
    });

    return updatedTodo;
  }

  public reset(): void {
    this.todos = [];
  }

  public updateTodo(id: number, values: ITodo = {}): Todo | null {
    const todo = this.getTodoById(id);

    if (!todo) {
      return null;
    }

    return {
      ...todo,
      ...values,
    };
  }
}
