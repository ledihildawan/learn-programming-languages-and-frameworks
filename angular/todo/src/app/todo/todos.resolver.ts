import { Todo } from './todo.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from './todo.service';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable()
export class TodosResolver implements Resolve<Observable<Todo[]>> {
  constructor(private readonly _todoService: TodoService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[]> {
    return this._todoService.getAllTodos();
  }
}
