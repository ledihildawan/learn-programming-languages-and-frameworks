import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { Input, Component } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'todo-footer',
  styleUrl: './footer.component.scss',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input({ required: true })
  public todos!: Todo[];
}
