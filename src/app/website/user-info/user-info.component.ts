import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {Section} from "../import-excel/error-validation/error-validation.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  imports:[MaterialModule],
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  folders: Section[] = [
    {
      name: 'Mario ',
      updated: 'nome utente',
    },
    {
      name: 'Rossi',
      updated: 'cognome utente',
    },
    {
      name: 'mario.rossi@gmail.com',
      updated: 'email',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
