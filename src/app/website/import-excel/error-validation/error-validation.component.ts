import { Component } from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";
import {DatePipe} from '@angular/common';
export interface Section {
  name: string;
  updated: string;
}
@Component({
  selector: 'app-error-validation',
  standalone: true,
  imports: [MaterialModule, DatePipe],
  templateUrl: './error-validation.component.html',
  styleUrl: './error-validation.component.css'
})
export class ErrorValidationComponent {
  panelOpenState = false;
  folders: Section[] = [
    {
      name: 'Riga 144:',
      updated: 'nome utente sbagliato',
    },
    {
      name: 'Riga 134:',
      updated: 'cognome utente sbagliato',
    },
    {
      name: 'Riga 134:',
      updated: 'nome utente sbagliato',
    },
  ];
}
