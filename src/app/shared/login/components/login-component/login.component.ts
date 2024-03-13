import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../core/services/auth.service";
import {LoginModule} from "../../login.module";
import {MaterialModule} from "../../../material.module";
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'hpm-login-component',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[LoginModule, MaterialModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _oauthService: OAuthService,
  ) {
  }

  login(): void {
    this._auth.startAuthentication();
  }

}
