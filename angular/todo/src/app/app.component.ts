import { Todo } from './todo';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodoDataService } from './todo-data.service';
import { HttpClientModule } from '@angular/common/http';
import { OnInit, Component, inject } from '@angular/core';

@Component({
  imports: [
    RouterOutlet,
    CommonModule,
    ListComponent,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
  ],
  selector: 'app-root',
  providers: [TodoDataService],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly _todoDataService: TodoDataService = inject(TodoDataService);

  public get todos(): Todo[] {
    return this._todoDataService.getAllTodos();
  }

  public onAddTodo(todo: Todo): void {
    this._todoDataService.addTodo(todo);
  }

  public removeTodo(todo: Todo): void {
    this._todoDataService.deleteTodoById(todo.id);
  }

  public toggleTodoComplete(todo: Todo): void {
    this._todoDataService.toggleTodoComplete(todo);
  }

  public ngOnInit(): void {}
}
