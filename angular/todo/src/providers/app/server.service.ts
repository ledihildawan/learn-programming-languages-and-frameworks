import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class ServerService {
  private _url = 'http://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  checkUsers(email: string): Observable<any> {
    return this.http.get(this._url).pipe(
      map((users: any) => users.filter((user: any) => user.email === email)),
      map((users: any) => !users.length)
    );

    // .map((res) => res.json())
    // .map((users) => users.filter((user) => user.email === email))
    // .map((users) => !users.length);
  }
}
