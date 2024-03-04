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
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalUser} from "../models/session";
import {AuthInterceptor} from "../guards/auth.interceptor";

@Injectable({providedIn: 'root'})
export class AuthService {
  public user: User = null;
  public currentUser: Observable<LocalUser>;
  private currentUserSubject: BehaviorSubject<LocalUser>;
  private custom_token: string | undefined = environment.customToken;
  private manager = new UserManager(getClientSettings());


 private authConfig: AuthConfig = {
    issuer: environment.authServer,
    requireHttps: environment.production,
   redirectUri:  window.location.origin + '/redirect',
    clientId: environment.clientID,
    scope: 'openid dati_integrativi profile email roles STS.WebApi offline_access',
    showDebugInformation: environment.production,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false,
  };

  get isLogged(): boolean {
    return this._oauthService.hasValidAccessToken();
  }

  get token(): string {
    return this._oauthService.getAccessToken();
  }

  get userId(): number {
    return this._sessionQuery.user.userId;
  }

  get editURL(): string {
    return environment.authServer + 'account?referrer=' + environment.clientID + '&redirect_uri=' + encodeURIComponent(window.location.origin);
  }

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
    this._oauthService.events.subscribe(res=> console.log(res));
    this._oauthService.events.subscribe(e => this.eventHandler(e));
    if (this.custom_token && !environment.production) {
      this._log.log('[Auth Service] Set Token: ' + this.custom_token);
      this._log.log(this.custom_token);
      this._oAuthStorage.setItem('access_token', this.custom_token);
      this._oAuthStorage.setItem('expires_in', '1621382253');
    }
    this.currentUserSubject = new BehaviorSubject<LocalUser>(JSON.parse(localStorage.getItem('currentUser-sts')));
    this.currentUser = this.currentUserSubject.asObservable();
    const httpClientModule = new HttpClientModule();
  }

  private async configure(): Promise<void> {
    this._oauthService.configure(this.authConfig);
    await this._oauthService.loadDiscoveryDocumentAndTryLogin();
    await this.setUserInfo();
  }

  private async setUserInfo(): Promise<void> {
    console.log('setUser',this._oauthService);
    if (this._oauthService.hasValidAccessToken()) {
      this._log.log('[Auth Service] expiration date: ' + Moment(this._oauthService.getAccessTokenExpiration()));
      this._userService.getUserInfo();
    } else {
      console.log('ciao');
      this._log.log('[Auth Service] JTW Token non più valido.');
     this.logout();
    }
  }

  async connect() {
    await this.configure();
  }

  async initAuth() {
    this._oauthService.configure(this.authConfig);
    this._oauthService.setupAutomaticSilentRefresh();
    await this._oauthService.loadDiscoveryDocumentAndTryLogin();
    await this.setUserInfo();
  }


  login() {
    this.initAuth();
   this._oauthService.initCodeFlow();
  }


  logout() {
    this._oauthService.logOut();
  }

  isLoggedIn(): Observable<boolean> {
    return of(this._oauthService.hasValidIdToken());
  }

  getAccessToken(): string {
    const accessToken = this._oauthService.getAccessToken();
    return accessToken;
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log('user=', user);
      if(user.access_token){
        this._oAuthStorage.setItem('access_token', this.custom_token);
      }else{
        this.logout();
      }
      console.log('manager', user);
      this.user = user;
      this.setCurrentUser(new LocalUser(user));
     // this.router.navigate([this.getLastRoute() ?? '/']);
      this._router.navigateByUrl('dashboard');
    });
  }

  getLastRoute(): string {
    const lr = localStorage.getItem('lastRoute-diversamente');
    console.log('GetLastRoute: ' + lr);
    localStorage.removeItem('lastRoute-diversamente');
    return lr;
  }
  private setCurrentUser(user: LocalUser): void {
    localStorage.setItem('currentUser-sts', JSON.stringify(user));
    this.connect().then(r => r);
    console.log('currentUserSubject', this.currentUserSubject);
    this.currentUserSubject.next(user);
  }
  startAuthentication(): Promise<void> {
    this.configure();
    return this.manager.signinRedirect();
  }

  /*async login() {
    this._oauthService.initImplicitFlow();
  }*/

 /* logout(): void {
   // this._oauthService.logOut();
   // this._router.navigateByUrl('/');
  }*/

  private async eventHandler(event: OAuthEvent) {
    switch (event.type) {
      case 'token_expires':
        this._log.log('[Identity-Server] Token expired');
        break;
      case 'token_received':
        this._log.log('[Identity-Server] Token received');
        break;
      case 'token_refresh_error':
        this._log.log('[Identity-Server] Refresh Error');
        this.logout();
        break;
      case 'invalid_nonce_in_state':
        this._log.log('[Identity-Server] Token Error');
        this.logout();
        break;
      case 'discovery_document_load_error':
        this._log.log('[Identity-Server] KeyCloak non raggiungibile.');
        this._snackBar.open('Impossibile effettuare la Login', 'CHIUDI');
        break;
      case 'silent_refresh_timeout':
        break;
      case 'discovery_document_loaded':
        if ((event as any).info) {
          this._log.log('[Identity-Server] Identity-Server connesso.');
        }
        break;
      default:
        this._log.log('[KeyCloak Event] ' + event.type);
    }

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
