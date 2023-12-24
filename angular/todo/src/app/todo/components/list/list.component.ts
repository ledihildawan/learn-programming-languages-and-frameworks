import { Todo } from '../../todo.entity';
import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  styleUrl: './list.component.scss',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  @Input()
  public todos!: Todo[];

  public ngOnInit(): void {}
}
