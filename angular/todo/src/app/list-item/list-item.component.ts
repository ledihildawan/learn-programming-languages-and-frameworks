import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  imports: [],
  selector: 'todo-list-item',
  styleUrl: './list-item.component.scss',
  standalone: true,
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input({ required: true })
  todo!: Todo;

  @Output('remove')
  private _remove: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output('toggleComplete')
  private _toggleComplete: EventEmitter<Todo> = new EventEmitter<Todo>();

  public toggleTodoComplete(todo: Todo): void {
    this._toggleComplete.emit(todo);
  }

  public removeTodo(todo: Todo): void {
    this._remove.emit(todo);
  }
}
