import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {MaterialModule} from "./shared/material.module";
import {ContainerComponent} from "./shared/container/container.component";
import {SideNavComponent} from "./shared/components/side-nav/side-nav.component";
import {AuthService} from "./core/services/auth.service";
import {LoginModule} from "./shared/login/login.module";
import {LoginComponent} from "./shared/login/components/login-component/login.component";
import {OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {UserService} from "./website/services/user.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./core/guards/auth.guard";

@Component({
  standalone: true,
  imports: [RouterOutlet,
    LoginModule,CommonModule,LoginModule, LoginComponent, HttpClientModule,
    MaterialModule,
    EnvironmentBarComponent, ContainerComponent, SideNavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient, AuthService, OAuthService, UrlHelperService,UserService, AuthService, AuthGuard],
})
export class AppComponent {
  title = 'BaseProject';

  constructor(private _authService: AuthService) {
  }
}
