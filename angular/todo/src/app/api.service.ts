import { Todo } from './todos/todo.entity';
import { SessionService } from './session.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../environments/environment';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _sessionService: SessionService = inject(SessionService);

  private _getRequestOptions(): { headers: HttpHeaders } {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this._sessionService.accessToken}`,
    });

    return { headers };
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message));
  }

  public signIn(username: string, password: string) {
    return this._http
      .post(`${API_URL}/sign-in`, {
        username,
        password,
      })
      .pipe(
        map((res: any) => res),
        catchError(this._handleError)
      );
  }

  /**
   * Create a new todo
   *
   * @param {Todo} todo
   *
   * @return {Observable<Todo>}
   */
  public createTodo(todo: Todo): Observable<Todo> {
    return this._http
      .post<Todo>(`${API_URL}/todos`, todo, this._getRequestOptions())
      .pipe(
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
  public deleteTodoById(id: any): Observable<null> {
    return this._http
      .delete<null>(`${API_URL}/todos/${id}`, this._getRequestOptions())
      .pipe(
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
    return this._http
      .get<Todo[]>(`${API_URL}/todos`, this._getRequestOptions())
      .pipe(
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
    return this._http
      .get<Todo>(`${API_URL}/todos/${id}`, this._getRequestOptions())
      .pipe(
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
  public updateTodoById(id: any, todo: Todo): Observable<Todo> {
    return this._http
      .put<Todo>(`${API_URL}/todos/${id}`, todo, this._getRequestOptions())
      .pipe(map((todo) => todo));
  }
}
