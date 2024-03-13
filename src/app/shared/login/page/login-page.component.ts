import {Component} from '@angular/core';
import {SessionQuery} from '../../../core/stores/session/session.query';
import {Router} from '@angular/router';
import {LogService} from '../../../core/services/log.service';
import {AuthService} from '../../../core/services/auth.service';
import {LoginModule} from "../login.module";
import {LoginComponent} from "../components/login-component/login.component";
import {MaterialModule} from "../../material.module";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {OAuthModule, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {CommonModule} from "@angular/common";
import {UserService} from "../../../website/services/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  imports: [LoginModule,CommonModule,LoginModule, LoginComponent, MaterialModule, HttpClientModule],
  providers: [HttpClient, AuthService, OAuthService, UrlHelperService,UserService],
  selector: 'hpm-login',
  standalone: true,
  styleUrls: ['./login-page.component.css'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {

  private user$ = this._user.user$;

  constructor(
    private _session: SessionQuery,
    private _router: Router,
    private _log: LogService,
    private _auth: AuthService,
    private _user: SessionQuery,
  ) {
    /*this.user$.pipe(untilDestroyed(this)).subscribe(user => {
      console.log(user);
      if (this._auth.isLogged) {
        this._log.log('[Auth] is Logged. Redirecting to dashboard');
        this._router.navigateByUrl('otp');
      } else {
        this._log.log('[Auth] is not logged.');
        this._router.navigateByUrl('');
      }
    });*/
  }

}
