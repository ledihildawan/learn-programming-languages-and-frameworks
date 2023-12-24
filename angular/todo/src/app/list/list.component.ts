import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  imports: [CommonModule, ListItemComponent],
  selector: 'todo-list',
  styleUrl: './list.component.scss',
  standalone: true,
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input({ required: true })
  public todos!: Todo[];

  @Output('remove')
  private readonly _remove: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output('toggleComplete')
  private readonly _toggleComplete: EventEmitter<Todo> =
    new EventEmitter<Todo>();

  public onToggleTodoComplete(todo: Todo): void {
    this._toggleComplete.emit(todo);
  }

  public onRemoveTodo(todo: Todo): void {
    this._remove.emit(todo);
  }
}
