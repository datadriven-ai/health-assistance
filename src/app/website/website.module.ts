import { NgModule } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {ContainerComponent} from "./container/container.component";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../shared/material.module";

@NgModule(
  {
    declarations:[
      HomeComponent,
      ContainerComponent,
      RouterOutlet,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
    ],
  }
)
export class WebsiteModule { }
