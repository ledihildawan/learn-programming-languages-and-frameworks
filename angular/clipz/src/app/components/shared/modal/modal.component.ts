import { Component, OnDestroy, Input, ElementRef, OnInit } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID: string = '';

  constructor(public modals: ModalService, public el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.modals.unregister(this.modalID);
  }

  closeModal() {
    this.modals.toggleModal(this.modalID);
  }
}
