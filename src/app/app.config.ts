import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { ThemeService } from './shared/utils/theme.service';
import { UtilsService } from './shared/Utils/utils.service';
import { HttpInterceptor } from './shared/utils/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideOAuthClient(),
    MessageService,
    ThemeService,
    UtilsService,
    provideHttpClient(withFetch(), withInterceptors([HttpInterceptor])),
  ],
};
