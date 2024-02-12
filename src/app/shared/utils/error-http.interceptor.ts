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
        if (error.status == 0) {
          console.error(error)
          theme.backgroundStored();
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: error.statusText } })
        } else {
          theme.backgroundStored();
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: error.error.error } })

        }
      }
      return throwError(() => error);
    })
  )
};
