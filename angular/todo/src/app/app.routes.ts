import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
