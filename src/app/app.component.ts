import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {EnvironmentBarComponent} from "./shared/components/environment-bar/environment-bar.component";
import {MaterialModule} from "./shared/material.module";

@Component({
  standalone: true,
  imports:[RouterOutlet,
    MaterialModule,
    EnvironmentBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
