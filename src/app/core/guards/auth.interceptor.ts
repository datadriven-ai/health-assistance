import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, finalize, switchMap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {CoreService} from "../services/core.service";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private coreService: CoreService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept', request);
    const n = Math.random();
    this.coreService.showLoader(n);

    const expired = this.authService.user?.expired;

    if (this.coreService.getTestEnvironment()) {
      request = this.setTestEnvironmentQueryParam(request, this.coreService.getTestEnvironment());
    }

    if (expired) {
      console.log('Accesso scaduto ' + n);
      if (!this.refreshTokenInProgress) {
        console.log('Silent refresh ' + n);
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return from(this.authService.silentRefresh()).pipe(
          switchMap((u) => {
            if (u) {
              this.refreshTokenSubject.next(u.access_token);
              console.log('Silent refresh complete ' + n);
              return next
                .handle(this.setHeaderToken(request, u.access_token))
                .pipe(finalize(() => this.coreService.hideLoader(n)));
            } else {
              return next.handle(request);
            }
          })
        );
      } else {
        console.log('Silent refresh in corso, attendo ' + n);
        return this.refreshTokenSubject.pipe(
          filter((result) => result !== null),
          take(1),
          switchMap((res) => {
            console.log('Attesa silent refresh complete ' + n);
            return next
              .handle(this.setHeaderToken(request, res))
              .pipe(finalize(() => this.coreService.hideLoader(n)));
          })
        );
      }
    } else {
      // add authorization header with jwt token if available
      const token = this.authService.getToken();
      if (token) {
        request = this.setHeaderToken(request, token);
      }
      console.log(next);
      return next.handle(request)
        .pipe(finalize(() => this.coreService.hideLoader(n)));
    }
  }

  public setHeaderToken(
    request: HttpRequest<any>,
    token: string,
    next?: HttpHandler,
  ): HttpRequest<any> {
    console.log(localStorage.getItem('ente_id'));
    return request.clone({
      setHeaders: {
        'Accept-Language': 'en-US,en;q=0.9,it;q=0.8',
        Authorization: `Bearer ${token}`,
        'Mock': 'true',
        'Ente': localStorage.getItem('ente_id') ? localStorage.getItem('ente_id') : ' ' ,
      },
    }
    );
  }

  private setTestEnvironmentQueryParam(request: HttpRequest<any>, t: string): HttpRequest<any> {
    let params = new HttpParams();
    params = params.append('TestEnvironment', t);

    request.params.keys().forEach(k => {
      const ps = request.params.getAll(k);
      ps.forEach(p => params = params.append(k, p));
    });

    return request.clone({
      params
    });
  }
}
