import { Component } from '@angular/core';
import {ContainerComponent} from "../../shared/container/container.component";
import {SideNavComponent} from "../../shared/components/side-nav/side-nav.component";
import {RouterOutlet} from "@angular/router";
import {MaterialModule} from "../../shared/material.module";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        ContainerComponent,
        RouterOutlet,
        SideNavComponent,
        MaterialModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
