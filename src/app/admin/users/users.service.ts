import { Injectable, inject } from '@angular/core';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _api = `${environment.API_URL}`;
  private http = inject(HttpClient);
  constructor() { }

  getLists() {
    return this.http.get<any>(`${this._api}/public/user`);
  }

}
