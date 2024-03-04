import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material.module";
import {OAuthModule} from "angular-oauth2-oidc";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../../core/guards/auth.interceptor";

@NgModule({
  declarations: [
  ],
  imports: [
    OAuthModule.forRoot(),
    CommonModule,
    HttpClientModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class LoginModule { }
