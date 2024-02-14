import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { ThemeService } from './shared/utils/theme.service';


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
