import { Component } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modals: ModalService) {}

  openAuthModal($event: Event) {
    $event.preventDefault();

    this.modals.toggleModal('auth');
  }
}
