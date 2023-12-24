import { Customvalidators } from './custom-validators';
import { MyClass } from './models/my-class';
import { Component } from '@angular/core';

@Component({
  selector: 'child-comp',
  template: ` <div>This is child-comp</div> `,
  standalone: true,
})
export class ChildComponent {
  constructor(private _myClass: MyClass) {
    console.log('ProvDemo _myClass', {
      myClassNum: _myClass.num,
      myClassTime: _myClass.time,
    });

    // Customvalidators.checkDuplicateEmail('Nathan@yesenia.net');
  }
}
