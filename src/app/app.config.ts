import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { ThemeService } from './shared/utils/theme.service';
import { UtilsService } from './shared/Utils/utils.service';


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
    MessageService,
    ThemeService,
    UtilsService
    // { provide: HTTP_INTERCEPTORS, useValue: errorHttpInterceptor, multi: true }
  ]
};
