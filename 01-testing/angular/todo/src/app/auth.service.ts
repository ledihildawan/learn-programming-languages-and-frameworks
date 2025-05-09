import { SessionService } from './session.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _session: SessionService = inject(SessionService);

  constructor() {}

  public isSignedIn(): boolean {
    return Boolean(this._session.accessToken);
  }

  public doSignOut(): void {
    this._session.destroy();
  }

  public doSign(accessToken: string, name: string): void {
    if (!accessToken || !name) {
      return;
    }

    this._session.accessToken = accessToken;
    this._session.name = name;
  }
}
