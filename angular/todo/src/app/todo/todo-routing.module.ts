import { NgModule } from '@angular/core';
import { TodosResolver } from './todos.resolver';
import { TodoComponent } from './todo.component';
import { RouterModule, Routes } from '@angular/router';

const todoRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Example of static route data',
    },
    resolve: {
      todos: TodosResolver,
    },
    component: TodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
  providers: [TodosResolver],
})
export class TodoRoutingModule {}
