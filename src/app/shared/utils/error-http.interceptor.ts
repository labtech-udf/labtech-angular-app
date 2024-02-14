import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ThemeService } from './theme.service';

export const errorHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const theme = inject(ThemeService);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        const status = error.status;
        if (status == '401') {
          theme.backgroundStored();
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: 'Você não tem permissão para realizar essa requisição' } })
        } else {
          theme.backgroundStored();
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: error.status } })
        }
      }
      return throwError(() => error);
    })
  )
};

