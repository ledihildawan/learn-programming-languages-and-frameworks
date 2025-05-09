import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public accessToken!: string | undefined;
  public name!: string | undefined;

  constructor() {}

  public destroy(): void {
    this.accessToken = undefined;
    this.name = undefined;
  }
}
