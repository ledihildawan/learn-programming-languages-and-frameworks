import { MyClass } from './models/my-class';
import { Component } from '@angular/core';
import { ChildComponent } from './child.component';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './server.service';

@Component({
  imports: [ChildComponent, HttpClientModule],
  selector: 'prev-demo',
  template: `
    <header>
      <h2>Demo</h2>
    </header>
    <div>
      Here is the main provider-component
      <child-comp></child-comp>
    </div>
  `,
  providers: [MyClass, ServerService],
  standalone: true,
})
export class ProvDemoComponent {
  constructor(
    private _myClass: MyClass,
    private _serverService: ServerService
  ) {
    console.log('ProvDemo _myClass', {
      myClassNum: _myClass.num,
      myClassTime: _myClass.time,
    });

    this._serverService.checkUsers('test').subscribe((res: any) => {
      console.log(res);
    });
  }
}
