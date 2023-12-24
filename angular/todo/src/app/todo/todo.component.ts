import { ActivatedRoute, Data } from '@angular/router';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { OnInit, Component, inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  private readonly _todoService = inject(TodoService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public todos: Todo[] = this._todoService.todos$.getValue();

  public ngOnInit(): void {
    this._activatedRoute.data
      .pipe(map((data: Data) => data['todos']))
      .subscribe((todos: Todo[]) => {
        this._todoService.todos$.next((this.todos = todos));
      });
  }
}
