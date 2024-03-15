import {Component, Input, OnInit} from '@angular/core';
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
export class ErrorValidationComponent implements OnInit{
  @Input() messages: any[] = [];
  panelOpenState = false;
  folders: Section[] = [
    {
      name: 'Riga 2:',
      updated: ' Codice fiscale sbagliato',
    },
  ];

  ngOnInit() {
    console.log(this.messages);
    this.folders = this.messages;
  }
}
