import { Todo } from './todo.entity';
import { ApiService } from '../api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly _api: ApiService = inject(ApiService);

  public todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  public addTodo(todo: Todo): Observable<Todo> {
    return this._api.createTodo(todo);
  }

  public deleteTodoById(id: number): Observable<null> {
    return this._api.deleteTodoById(id);
  }

  public getAllTodos(): Observable<Todo[]> {
    return this._api.getAllTodos();
  }

  public getTodoById(id: number): Observable<Todo | null> {
    return this._api.getTodoById(id);
  }

  public toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;

    return this._api.updateTodoById(todo.id, todo);
  }

  public updateTodoById(id: any, todo: Todo): Observable<Todo | null> {
    return this._api.updateTodoById(id, todo);
  }

  public ngOnDestroy(): void {
    this.todos$.unsubscribe();
  }
}
