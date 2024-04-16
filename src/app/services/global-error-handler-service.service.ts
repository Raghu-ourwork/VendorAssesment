import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './api.service';
import {Observable,throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
@Injectable()
export class GlobalErrorHandlerService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        if(error.status==401){
          this.authService.logoutUser();
        }
        else  if(error.status==400){
          return throwError(error);
        }
        
        return throwError(error.message);
      })
    )
  }
}
