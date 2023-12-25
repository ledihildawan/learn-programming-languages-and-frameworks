import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable()
export class CanActivateTodosGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.isSignedIn()) {
      this._router.navigate(['/sign-in']);

      return false;
    }

    return true;
  }
}
