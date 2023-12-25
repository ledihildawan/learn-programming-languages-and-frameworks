import { Todo } from './todo.entity';
import { AuthService } from '../auth.service';
import { TodoService } from './todo.service';
import { OnInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'todo',
  styleUrl: './todo.component.scss',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _todoService = inject(TodoService);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public todos: Todo[] = this._todoService.todos$.value;

  public doSignOut(): void {
    this._authService.doSignOut();
    this._router.navigate(['/sign-in']);
  }

  public ngOnInit(): void {
    this._activatedRoute.data
      .pipe(map((data: Data) => data['todos']))
      .subscribe((todos: Todo[]) => {
        todos && this._todoService.todos$.next((this.todos = todos));
      });
  }
}
