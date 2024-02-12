import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api = `${environment.API_URL}`;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private http: HttpClient
  ) {
    this.initsOAuth();
  }

  authConfigs: AuthConfig = {
    issuer: 'http://localhost:8090/realms/labtech-events-realm',
    tokenEndpoint: 'http://localhost:8090/realms/labtech-events-realm/protocol/openid-connect/token',
    redirectUri: 'http://localhost:4200/admin',
    clientId: 'labtech-events-client',
    responseType: 'code',
    scope: 'openid profile',
  };
  initsOAuth() {
    console.log("ksalndkla")
    this.oauthService.configure(this.authConfigs);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  initOAuth() {
    this.oauthService.initImplicitFlow();
  }

  async logOut() {
    this.oauthService.logOut();
    setTimeout(() => {
      this.router.navigate(['/home']);

    },500)
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.api}/token`, {
      headers: {
        Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
      },
    });
  }

  getNoUser(): Observable<any> {
    return this.http.get<any>(`${this.api}/public/get`);
  }
}

