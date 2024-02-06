import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from "../../shared/material.module";
import {RouterModule} from "@angular/router";
import {UserInfoComponent} from "../user-info/user-info.component";
import {CommonModule} from "@angular/common";

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.css'],
  standalone: true,
  imports: [MaterialModule, RouterModule, UserInfoComponent, CommonModule],
})
export class ContainerComponent {
  @Output() openSideNav = new EventEmitter<any>();
  showInfo = false;
}
