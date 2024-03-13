import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {Section} from "../import-excel/error-validation/error-validation.component";
import {FormControl, FormGroup} from "@angular/forms";
import {SessionQuery} from "../../core/stores/session/session.query";
import {UserInfo} from "angular-oauth2-oidc";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  imports:[MaterialModule],
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  data: any = {};
  user: any;
  folders: Section[] = []

  constructor(
    private _sessionQuery: SessionQuery,
  ) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('currentUser-sts'));
    this.user = JSON.parse(localStorage.getItem('me'));
    console.log(this.data);
    this.folders = [
      {
        name: this.user.nome,
        updated: 'Nome',
      },
      {
        name: this.user.cognome,
        updated: 'Cognome',
      },
      {
        name: this.data.username,
        updated: 'Username',
      },
      {
        name: this.data.email,
        updated: 'Email',
      },
    ];
  }

}
