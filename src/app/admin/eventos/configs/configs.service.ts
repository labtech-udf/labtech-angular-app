import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  private _api = `${environment.API_URL}`;
  private oauthService = inject(OAuthService);
  private token = this.oauthService.getAccessToken();

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // ODS - Objetivos de Desenvolvimento Sustentável
  getLists(type: string) {
    return this.http.get<any>(`${this._api}/private/${type}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    });
  }
  
  getPublic() {
    return this.http.get<any>(`${this._api}/public/listods/active`);
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
