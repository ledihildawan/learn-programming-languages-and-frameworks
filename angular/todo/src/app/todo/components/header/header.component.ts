import { TodoEntity } from '../../todo.entity';
import { TodoService } from '../../todo.service';
import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'todo-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly _todoService = inject(TodoService);

  public newTodo: TodoEntity = new TodoEntity();

  public async addTodo(): Promise<void> {
    if (!this.newTodo.title) {
      return;
    }

    await lastValueFrom(this._todoService.addTodo(this.newTodo));

    this._todoService.todos$.next([
      ...this._todoService.todos$.value,
      this.newTodo,
    ]);

    this.newTodo = new TodoEntity();
  }
}
