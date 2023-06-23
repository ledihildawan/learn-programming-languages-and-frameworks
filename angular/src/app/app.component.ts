import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Ledi Hildawan';
  sisters = ['Windi Lestari', 'Eva Nur Rizkia'];

  setValue(event: string) {
    this.name = event;
  }
}
