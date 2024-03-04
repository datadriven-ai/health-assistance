import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  expired = this.authService.user?.expired;

  constructor(
    private authService: AuthService,
  ) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = localStorage.getItem('currentUser-sts');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token).token}` // Aggiunge il token all'header di autorizzazione
        }
      });
    }

    return next.handle(request);
  }
}
