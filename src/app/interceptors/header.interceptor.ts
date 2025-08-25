import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(ApiService)
  const router = inject(Router)

  let clonedReq = req.clone({
    url: "http://localhost:3000" + req.url,
    setHeaders: { 'Authorization': `Bearer ${api.access_token}` },
    withCredentials: true


  })
  return next(clonedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 403&&err.error.message=="Token not found!") {
        return api.onRefreshToken().pipe(
          switchMap((res: any) => {
            api.access_token = res.accessToken
            return next(req.clone({
              url: "http://localhost:3000" + req.url,
              setHeaders: { 'Authorization': `Bearer ${api.access_token}` },
              withCredentials: true

            }))
          })
        )
      } else if (err.status == 404 && err.error.message == "Refresh token required!") {
        router.navigateByUrl("/login")
      }
      return throwError(err)
    })
  )
};
