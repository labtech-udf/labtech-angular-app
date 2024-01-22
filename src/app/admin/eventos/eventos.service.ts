import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../env/env';
import { Evento } from '../../interfaces/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private api = `${environment.API_URL}/evento`;

  constructor(private http: HttpClient) { }

  async getList() {
    return this.http.get<any>(`${this.api}`);
  }

  async getByIds(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createEvento(evento: Evento, photo: File): Observable<any> {
    console.error(evento)
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
