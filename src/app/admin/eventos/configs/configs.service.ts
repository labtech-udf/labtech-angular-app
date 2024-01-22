import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { environment } from '../../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {
  private _api = `${environment.API_URL}`;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // ODS - Objetivos de Desenvolvimento Sustentável
  getListOds() {
    return this.http.get<any>(`${this._api}/ods`)
  }


  //Metodos utilizaveis
  async delete(id: number, api?: string) {
    if (!api) {
      this.msg('error', 'Erro', 'Erro ao excluir, contate o suporte ')
    }
    const url = this._api + '/' + api;
    return this.http.delete<any>(`${url}/${id}`);
  }
  msg(severity: string, summary: string, detail: string) {
    this.messageService.add(
      {
        severity: severity,
        summary: summary,
        detail: detail
      });
  }

}
