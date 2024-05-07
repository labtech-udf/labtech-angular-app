import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  private api = `${environment.API_URL}`;

  constructor(
    private http: HttpClient
  ) { }
}
