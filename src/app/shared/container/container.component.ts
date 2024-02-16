import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from "../material.module";
import {Router, RouterModule} from "@angular/router";
import {UserInfoComponent} from "../../website/user-info/user-info.component";
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
export class ContainerComponent implements OnInit{
  @Output() openSideNav = new EventEmitter<any>();
  showInfo = false;
  constructor(private _router: Router,) {
  }
  ngOnInit() {
  }

  logOut(){
    this._router.navigateByUrl('').then(r => {} );
  }
}
