import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthConfig, OAuthEvent, OAuthService, OAuthStorage,} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import Moment from 'moment';
import {SessionStore} from '../stores/session/session.store';
import {SessionQuery} from '../stores/session/session.query';
import {LogService} from './log.service';
import {UserService} from "../../website/services/user.service";
import {User, UserManager, UserManagerSettings, WebStorageStateStore} from "oidc-client";
import {BehaviorSubject, Observable} from "rxjs";

export class LocalUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  refreshToken?: string | undefined;
  tokenExpire?: Date | undefined;
  tokenExpireIn?: number | undefined;

  constructor(u: User) {
    // console.log(u);
    this.username = u.profile.preferred_username;
    if (u.profile.email != null) {
      this.email = u.profile.email;
    }
    this.id = u.profile.sub;
    this.firstName = u.profile.given_name;
    this.lastName = u.profile.family_name;
    this.token = u.access_token;
    this.refreshToken = u.refresh_token;
    this.tokenExpireIn = u.expires_in;

    const d = new Date();
    const ex = d.getTime() + u.expires_in * 1000;
    const dx = new Date(ex);
    this.tokenExpire = dx;
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {

  public user: User = null;
  public currentUser: Observable<LocalUser>;

  private currentUserSubject: BehaviorSubject<LocalUser>;
  private manager = new UserManager(getClientSettings());

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient,
    private _oauthService: OAuthService,
    private _oAuthStorage: OAuthStorage,
    private _router: Router,
    private _sessionQuery: SessionQuery,
    private _userService: UserService,
    private _session: SessionStore,
    private _log: LogService,
    private router: Router,
  ) {

    this.manager.events.addUserLoaded(() => {
      this.manager.getUser().then(u => {
        this.user = u;
        this.setCurrentUserPublic(u);
      });
    });

    this.manager.getUser().then(user => {
      this.user = user;
    });

    this.currentUserSubject = new BehaviorSubject<LocalUser>(JSON.parse(localStorage.getItem('currentUser-sts')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LocalUser {
    this.currentUserSubject.subscribe(res=> console.log(res));
    console.log(this.currentUserSubject);
    return this.currentUserSubject.getValue();
  }

  public getUserDescription(): string {
    if (this.currentUserValue) {
      return `${this.currentUserValue?.firstName} ${this.currentUserValue?.lastName}`;
    }
    return null;
  }
  setCurrentUserPublic(u: User): void {
    this.setCurrentUser(new LocalUser(u));
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  silentRefresh(): Promise<User> {
    return this.manager.signinSilent()
      .catch(r => {
        console.log(r);
        console.log('REFRESH TOKEN SCADUTO!');
        this.logout();
        return null;
      });
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log(user);
      this.user = user;
      this.setCurrentUser(new LocalUser(user));
      console.log(user, this.currentUserSubject.getValue());
      this.router.navigate(['otp']);
    });
  }

  forceLogOut(): void {
    this.logoutInternal();
    // this.router.navigate(['log-out']);
    this.logoutIds4();
  }

  logout(): void {
    console.log('Logout...');
    this.logoutInternal();
    this.finishLogout();
  }

  getToken(): string {
    return this.currentUserValue.token;
    // return this.user?.access_token;
  }


  public finishLogout = () => {
    if (this.router.url !== environment.homeUrl) {
      this.router.navigate(['login']);
    } else {
      this.startAuthentication();
    }
    return this.manager.signoutRedirectCallback();
  };

  private setCurrentUser(user: LocalUser): void {
    localStorage.setItem('currentUser-sts', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  setLastRoute(r: string): void {
    if (!localStorage.getItem('lastRoute-sts')) {
      console.log('SetLastRoute: ' + r);
      localStorage.setItem('lastRoute-sts', r);
    }
  }

  getLastRoute(): string {
    const lr = localStorage.getItem('lastRoute-sts');
    console.log('GetLastRoute: ' + lr);
    localStorage.removeItem('lastRoute-sts');
    return lr;
  }

  private logoutInternal(): void {
    localStorage.removeItem('currentUser-sts');
    localStorage.removeItem('ente_id');
    localStorage.removeItem('ente_nome');
    this.currentUserSubject.next(null);
  }

  private logoutIds4(): void {
    this.manager.getUser().then(u => {
      if (u){
        console.log('Logout ids4...');
        this.manager.signoutRedirect();
      }
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.authServer,
    client_id:  environment.clientID,
    redirect_uri:  window.location.origin + '/redirect',
    post_logout_redirect_uri: environment.postLogoutRedirectUri,
    response_type: 'code',
    scope: 'openid dati_integrativi profile email roles STS.WebApi offline_access',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: environment.automaticSilentRenew,
    silent_redirect_uri: environment.silentRedirectUri,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  };
}
