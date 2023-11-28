import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  AuthConfig,
  OAuthEvent,
  OAuthService, OAuthStorage,
} from "angular-oauth2-oidc";
import {environment} from '../../../environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import * as Moment from 'moment';
import {SessionStore} from "../stores/session/session.store";
import {SessionQuery} from "../stores/session/session.query";
import {LogService} from "./log.service";
import jwtDecode from "jwt-decode";
import {UserService} from "../../website/users/services/user.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private custom_token: string | null = environment.customToken;

  private authConfig: AuthConfig = {
    issuer: environment.authServer,
    requireHttps: environment.production,
    redirectUri: window.location.origin + '/login',
    clientId: environment.clientID,
    scope: 'profile email',
    showDebugInformation: environment.production,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false
  };

  get isLogged(): boolean {
    return this._oauthService.hasValidAccessToken();
  }

  get token(): string {
    return this._oauthService.getAccessToken();
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
    private _log: LogService
  ) {
  }


  async login() {
    this._oauthService.initImplicitFlow();
  }

  logout(): void {
    this._oauthService.logOut();
    this._router.navigate(['']);
  }



}
