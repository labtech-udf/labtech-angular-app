import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"; // Importe corrigido
import { environment } from "../env/env";
import { Observable, map } from "rxjs";

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

}
