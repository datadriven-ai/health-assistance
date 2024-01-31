import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./website/home/home.component";
import {ContainerComponent} from "./website/container/container.component";
import {MaterialModule} from "./shared/material.module";
import {WebsiteModule} from "./website/website.module";

@NgModule(
  {
    declarations:[
      AppComponent,
      EnvironmentBarComponent,
      RouterOutlet
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      WebsiteModule,
      BrowserAnimationsModule,
      MaterialModule,
    ],
  }
)
export class AppModule { }
