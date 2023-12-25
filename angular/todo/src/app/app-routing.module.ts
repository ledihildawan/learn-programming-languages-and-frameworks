import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodosResolver } from './todo/todos.resolver';
import { SignInComponent } from './sign-in/sign-in.component';
import { CanActivateTodosGuard } from './can-active-todos.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'todos',
    resolve: {
      todos: TodosResolver,
    },
    component: TodoComponent,
    canActivate: [CanActivateTodosGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [TodosResolver, CanActivateTodosGuard],
})
export class AppRoutingModule {}
