import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNgxMask } from 'ngx-mask/lib/ngx-mask.providers';
import { NgxMaskDirective } from 'ngx-mask/lib/ngx-mask.directive';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() format = '';
}
