import { Todo } from '../../todo.entity';
import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  @Input()
  public todos!: Todo[];

  public ngOnInit(): void {}
}
