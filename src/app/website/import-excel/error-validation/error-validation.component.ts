import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";
import {DatePipe} from '@angular/common';
import {FormGroup} from "@angular/forms";
import {ProtocolsService} from "../../services/protocols.service";
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
  @Input() file: File;
  @Input() form: FormGroup;
  @Input() disabilitare: boolean = false;
  panelOpenState = false;
  folders: Section[] = [
  ];
constructor(
  private protocolsService: ProtocolsService,
) {
}

  ngOnInit() {
    console.log(this.messages);
    this.folders = this.messages;
  }

  forzoInvio(){
    this.protocolsService.uploadDocument(this.file, this.form.value).subscribe();
    console.log(this.form.value);
  }
}
