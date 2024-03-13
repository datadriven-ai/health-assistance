import {Injectable} from '@angular/core';
import {SessionQuery} from '../stores/session/session.query';
import {SessionStore} from '../stores/session/session.store';
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import Moment from "moment";
import {AuthService} from "../services/auth.service";
import {LogService} from "../services/log.service";


@Injectable()
export class MaintenanceGuard implements CanActivate {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _sessionStore: SessionStore,
    private _sessionQuery: SessionQuery,
    private _auth: AuthService,
    private _log: LogService,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._auth.currentUserValue;
    console.log( localStorage.getItem('ente_id'));
    if (localStorage.getItem('ente_id')) {
      return true;
    } else {
      this._router.navigate(['otp']);
      this._log.log('[Guard] Token not valid.');
      return false;
    }
  }

}
