import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';
import { Output, Component, EventEmitter } from '@angular/core';

@Component({
  imports: [FormsModule],
  selector: 'todo-header',
  styleUrl: './header.component.scss',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output('add')
  private readonly _add: EventEmitter<Todo> = new EventEmitter<Todo>();

  public newTodo: Todo = new Todo();

  private _reset(value: Todo): void {
    this.newTodo = value;
  }

  public addTodo(): void {
    if (!this.newTodo.title) {
      return;
    }

    this._add.emit(this.newTodo);
    this._reset(new Todo());
  }
}
