import { Todo } from './todo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);

  private _handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message));
  }

  /**
   * Create a new todo
   *
   * @param {Todo} todo
   *
   * @return {Observable<Todo>}
   */
  public createTodo(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(`${API_URL}/todos`, todo).pipe(
      map((todo: Todo) => todo),
      catchError(this._handleError)
    );
  }

  /**
   * Delete an existing todo
   *
   * @param {number} id
   *
   * @return {Observable<null>}
   */
  public deleteTodoById(id: number): Observable<null> {
    return this._http.delete<null>(`${API_URL}/todos/${id}`).pipe(
      map(() => null),
      catchError(this._handleError)
    );
  }

  /**
   * Get all existing todos
   *
   * @return {Observable<Todo[]>}
   */
  public getAllTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(`${API_URL}/todos`).pipe(
      map((todos: Todo[]) => todos.map((todo: Todo) => todo)),
      catchError(this._handleError)
    );
  }

  /**
   * Delete an existing todo
   *
   * @param {number} id
   *
   * @return {Observable<Todo>}
   */
  public getTodoById(id: number): Observable<Todo> {
    return this._http.get<Todo>(`${API_URL}/todos/${id}`).pipe(
      map((todo) => todo),
      catchError(this._handleError)
    );
  }

  /**
   * Update an existing todo
   *
   * @param {number} id
   * @param {Todo} todo
   *
   * @return {Observable<Todo>}
   */
  public updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this._http
      .put<Todo>(`${API_URL}/todos/${id}`, todo)
      .pipe(map((todo) => todo));
  }
}
