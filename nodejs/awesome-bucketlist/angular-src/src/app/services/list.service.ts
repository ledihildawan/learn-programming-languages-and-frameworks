import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  readonly #http = inject(HttpClient);

  private readonly _serverApi = 'http://localhost:3000';
  private readonly _uri = `${this._serverApi}/bucketlist`;

  getAllLists() {
    return this.#http
      .get<{ success: boolean; lists: List[] }>(this._uri)
      .pipe(map((res) => res.lists));
  }

  deleteList(listId: string) {
    return this.#http.delete<{ success: boolean; message: string }>(`${this._uri}/${listId}`);
  }

  addList(list: List) {
    return this.#http.post<{ success: boolean; message: string }>(this._uri, list);
  }
}
