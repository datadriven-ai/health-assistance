import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from "../material.module";
import {Router, RouterModule} from "@angular/router";
import {UserInfoComponent} from "../../website/user-info/user-info.component";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {SessionQuery} from "../../core/stores/session/session.query";
import {UserInfo} from "angular-oauth2-oidc";

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
  ente = localStorage.getItem('ente_nome');
  @Output() openSideNav = new EventEmitter<any>();
  showInfo = false;
  constructor(private _router: Router,
              private _auth: AuthService) {
  }
  ngOnInit() {
  }

  logOut(){
    this._auth.logout();
  }
}
