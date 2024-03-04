import { Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {WebsiteRoutes} from "./website";
import {LoginPageComponent} from "./shared/login/page/login-page.component";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./shared/login/login.module";
import {AuthService} from "./core/services/auth.service";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "./shared/material.module";
import {HomeComponent} from "./website/home/home.component";
import {RedirectComponent} from "./shared/redirect/redirect.component";
import {OtpComponent} from "./shared/otp/otp.component";

export const routes: Routes = [

  {path: '', component: LoginPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'redirect', component: RedirectComponent},
  {providers:[AuthGuard, HttpClientModule],canActivate: [AuthGuard], path: 'otp', component:OtpComponent},
  { providers:[AuthGuard, HttpClientModule],canActivate: [AuthGuard], path: 'dashboard',
    loadChildren: () => import('./website').then(m => m.WebsiteRoutes)
  },
];
