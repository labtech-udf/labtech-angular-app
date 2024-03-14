import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { environment } from '../../../env/env';
import { Evento } from '../../interfaces/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private api = `${environment.API_URL}`;
  eventos$: Observable<Evento[]> | undefined;

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    if (!this.eventos$) {
      this.eventos$ = this.http.get<Evento[]>(`${this.api}/public/getAllEvents`).pipe(
        shareReplay(1)
      )
    }
    return this.eventos$;
  }

  async getById(id: number) {
    return this.http.get<any>(`${this.api}/public/evento/${id}`);
  }

  createEvento(evento: Evento, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('evento', JSON.stringify({ ...evento }));
    return this.http.post(this.api, formData);
  }

  updateEvento(evento: Evento, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('evento', JSON.stringify({ ...evento }));
    return this.http.put(this.api, formData);
  }

  async delete(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`).toPromise();
  }
}
