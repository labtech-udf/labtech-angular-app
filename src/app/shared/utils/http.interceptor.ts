import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { ThemeService } from './theme.service';
import { isPlatformBrowser } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

export const HttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const theme = inject(ThemeService);
  const oAuthService = inject(OAuthService);

  const token = oAuthService.getAccessToken();
  console.log(token);
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + token,
      },
    });

    return next(cloned).pipe(
      catchError((error) => {
        if (error) {
          const status = error.status;
          if (status == '401') {
            theme.backgroundStored();
            router.navigate(['/error'], {
              queryParams: {
                errorCode: error.status,
                message: 'Você não tem permissão para realizar essa requisição',
              },
            });
          } else {
            theme.backgroundStored();
            router.navigate(['/error'], {
              queryParams: { errorCode: error.status, message: error.status },
            });
          }
        }
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
