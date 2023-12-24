import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ServerService } from './server.service';
import { map } from 'rxjs';

export class Customvalidators {
  static checkDuplicateEmail(serverService: ServerService) {
    return (control: AbstractControl) => {
      return serverService.checkUsers(control.value).pipe(
        map((res: any) => {
          return res ? null : { duplicateEmail: true };
        })
      );
    };
  }
}
