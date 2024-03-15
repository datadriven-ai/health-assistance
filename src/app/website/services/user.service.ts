import {Injectable} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogService} from '../../core/services/log.service';
import {catchError, tap} from 'rxjs/operators';
import {SessionStore} from '../../core/stores/session/session.store';
import {Observable, of} from 'rxjs';
import {AuthService} from "../../core/services/auth.service";

@Injectable()
export class UserService extends BaseService {

  constructor(
    protected override _http: HttpClient,
    protected override _log: LogService,
    protected override _store: SessionStore,
  ) {
    super(_http, _log, _store);
  }

  getUserInfo(): Observable<any> {
   return  this.get( '/utente/me', false).pipe(tap(response => localStorage.setItem('me', JSON.stringify(response))));
  }

  getUltimaOperazione(): Observable<any> {
    return this.get('/utente/operazione/ultima');
  }

  getUltimaModificaPassword():  Observable<any>  {
    return this.get('/utente/ente/credenziali');
  }

  putTSSPassword(body: any): Observable<any> {
   return this.put('/utente/ente/'+localStorage.getItem('ente_id')+'/credenziali', body);
  }
}
