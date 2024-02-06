import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {MaterialModule} from "./shared/material.module";
import {ContainerComponent} from "./website/container/container.component";
import {SideNavComponent} from "./shared/components/side-nav/side-nav.component";

@Component({
  standalone: true,
  imports: [RouterOutlet,
    MaterialModule,
    EnvironmentBarComponent, ContainerComponent, SideNavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
