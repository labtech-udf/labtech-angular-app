import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../env/env';
import { EventoDTO } from '../interfaces/EventoDTO';
import { Observable } from 'rxjs';

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

  createEvento(evento: EventoDTO, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('evento', JSON.stringify({ ...evento }));
    return this.http.post(this.api, formData);
  }

  updateEvento(evento: EventoDTO, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('evento', JSON.stringify({ ...evento }));
    return this.http.put(this.api, formData);
  }

  async delete(id: number) {
    return this.http.delete<any>(`${this.api}/event/${id}`).toPromise();
  }
}
