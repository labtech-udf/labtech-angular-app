import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api = `${environment.API_URL}`;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getUser(): Observable<any> {

    return this.http.get<any>(`${this.api}/token`, {
      headers: {
        Authorization: `Bearer `,
      },
    });
  }

  getNoUser(): Observable<any> {
    return this.http.get<any>(`${this.api}/public/get`);
  }

  register(usr: Usuario) {
    console.log(`${this.api}/public/auth/register`);
    console.log(usr);
    return this.http.post<any>(`${this.api}/public/auth/register`, usr);
  }

  login(usr: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    return this.http.post(`${this.api}/public/login`, usr, { headers: headers });
  }


}

