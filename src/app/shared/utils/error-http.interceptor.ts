import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        if (error.status == 0) {
          console.error(error)
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: error.statusText } })
        } else {
          router.navigate(['/error'], { queryParams: { errorCode: error.status, message: error.error.error } })

        }
      }
      return throwError(() => error);
    })
  )
};
