import { Component } from '@angular/core';
import { ViewListComponent } from './view-list/view-list.component';

@Component({
  selector: 'app-root',
  imports: [ViewListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
