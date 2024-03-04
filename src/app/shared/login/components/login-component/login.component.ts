import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../../core/services/auth.service";
import {LoginModule} from "../../login.module";
import {MaterialModule} from "../../../material.module";

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
  ) { }

  login(): void {
    console.log(this._auth);
    this._auth.startAuthentication();
  }

}
