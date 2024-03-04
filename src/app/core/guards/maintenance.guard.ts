import {Injectable} from '@angular/core';
import {SessionQuery} from '../stores/session/session.query';
import {SessionStore} from '../stores/session/session.store';
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import Moment from "moment";


@Injectable()
export class MaintenanceGuard implements CanActivate {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _sessionStore: SessionStore,
    private _sessionQuery: SessionQuery,
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const maintenance: any = await this._http.get('/assets/systemInfo/maintenance.json').toPromise();
    if (maintenance && !maintenance.inMaintenance) {
      return true;
    }
    const params = route.queryParams;
    if (params['bypass']) {
      this._sessionStore.update({bypass: params['bypass']})
    }
    if (this._sessionQuery.bypassToken) {
      const check = Moment().format('D-M-YYYY');
      if (this._sessionQuery.bypassToken === check) { return true;}
    }
    return this._router.navigateByUrl('/info');
  }

}
