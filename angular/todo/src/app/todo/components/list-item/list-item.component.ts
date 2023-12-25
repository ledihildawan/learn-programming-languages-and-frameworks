import { Todo } from '../../todo.entity';
import { TodoService } from '../../todo.service';
import { Component, Input, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'todo-list-item',
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input()
  todo!: Todo;

  private readonly _todoService = inject(TodoService);

  public async removeTodo(todo: Todo): Promise<void> {
    const todos: Todo[] = this._todoService.todos$.value;

    await lastValueFrom(this._todoService.deleteTodoById(todo.id));

    this._todoService.todos$.next(todos.filter((t: Todo) => t.id !== todo.id));
  }

  public async toggleTodoComplete(todo: Todo): Promise<void> {
    await lastValueFrom(this._todoService.toggleTodoComplete(todo));
  }
}
