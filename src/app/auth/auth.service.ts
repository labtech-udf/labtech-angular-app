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
  login(usr: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    return this.http.post(
      `${this.api}/public/login`,
      usr,
      { headers: headers }
    );
  }

  getUser(dados: any): Observable<any> {
    console.log(dados);

    if (!dados.token) {
      throw new Error('Missing token');
    }

    const url = `${this.api}/private/getUser?email=${encodeURIComponent(dados.email)}`;
    return this.http.get<any>(url, {
      headers: {
        Authorization: `Bearer ${dados.token}`
      }
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



}

