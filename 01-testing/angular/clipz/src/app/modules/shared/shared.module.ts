import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalService } from 'src/app/services/modal.service';

import { TabContainerComponent } from 'src/app/components/shared/tab-container/tab-container.component';
import { TabComponent } from 'src/app/components/shared/tab/tab.component';
import { InputComponent } from 'src/app/components/shared/input/input.component';
import { AlertComponent } from 'src/app/components/shared/alert/alert.component';

@NgModule({
  declarations: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  exports: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
  ],
  providers: [ModalService, provideNgxMask()],
})
export class SharedModule {}
