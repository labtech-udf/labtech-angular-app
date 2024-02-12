import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, PLATFORM_ID } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { isPlatformBrowser } from '@angular/common';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { ThemeService } from './shared/utils/theme.service';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8090/realms/labtech-events-realm',
  tokenEndpoint: 'http://localhost:8090/realms/labtech-events-realm/protocol/openid-connect/token',
  redirectUri: isPlatformBrowser(PLATFORM_ID) ? window.location.origin : 'http://localhost:4200',
  clientId: 'labtech-events-client',
  responseType: 'code',
  scope: 'openid profile'

}

function initOAuth(authService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    authService.configure(authCodeFlowConfig);
    authService.setupAutomaticSilentRefresh();
    authService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      // withInterceptors([errorHttpInterceptor])
    ),
    provideOAuthClient(),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (o: OAuthService) => {
    //     return () => {
    //       initOAuth(o);

    //     }
    //   },
    //   multi: true,
    //   deps: [
    //     OAuthService,
    //     PLATFORM_ID
    //   ]
    // },

    MessageService,
    ThemeService,
    // { provide: HTTP_INTERCEPTORS, useValue: errorHttpInterceptor, multi: true }
  ]
};
