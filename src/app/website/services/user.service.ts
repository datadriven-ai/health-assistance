import {Injectable} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {HttpClient} from '@angular/common/http';
import {LogService} from '../../core/services/log.service';
import {catchError, tap} from 'rxjs/operators';
import {SessionStore} from '../../core/stores/session/session.store';
import {Observable, of} from 'rxjs';

@Injectable()
export class UserService extends BaseService {

  constructor(
    protected override _http: HttpClient,
    protected override _log: LogService,
    protected override _store: SessionStore,
  ) {
    super(_http, _log);
    this.baseURL += '/v1/';
  }

  getUserInfo(): void {
    this.get('me').pipe(tap(response => this._store.update(response))).subscribe();
  }

  getSingleMedic(medicId): Observable<any> {
    return this.get('medic/retrievebyid/' + medicId);
  }

  getConventions(): Observable<any[]> {
    return this.get('secretary/conventions/all');
  }

  putUpdateProfileMedic(body): Observable<any> {
    return this.put('medic/profile/update', body);
  }

  putUpdateProfileSecretary(body): Observable<any> {
    return this.put('secretary/profile/update', body);
  }

  creationProfileMedic(body): Observable<any> {
    return this.post('secretary/medic/registration', body);
  }

  verifyProfile(email, fiscalCode, phoneNumber): Observable<any> {
    return this.get('public/check_user?email=' + email + '&fiscalCode=' + fiscalCode + '&phoneNumber=' + phoneNumber)
      .pipe(catchError(err => of(true)));
  }

  resetpassword(id): Observable<any> {
    return this.post('secretary/medic/' + id + '/resetPassword', {});
  }

  getMedicById(id): Observable<any> {
    return this.get('medic/retrievebyid/' + id);
  }

  calculateFiscalCode(userForm: any): Observable<string> {
    return this._http.get(this.baseURL + 'public/patient/fiscalcode?surname=' +
      userForm.surname + '&name=' + userForm.name + '&gender=' +
      userForm.gender + '&birthDate=' +  userForm.birthDate + '&city=' + userForm.birthPlace, {responseType: "text"})
      .pipe(catchError(err => of('')));
  }

}
