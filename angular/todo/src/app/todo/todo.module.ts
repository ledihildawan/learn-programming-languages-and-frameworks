import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { CommonModule } from '@angular/common';
// import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './todo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoRoutingModule } from './todo-routing.module';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  exports: [],
  imports: [FormsModule, CommonModule, TodoRoutingModule],
  providers: [TodoService],
  declarations: [
    TodoComponent,
    ListComponent,
    HeaderComponent,
    FooterComponent,
    ListItemComponent,
  ],
})
export class TodoModule {}
