import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DragDropZoneComponent} from "../drag-drop-zone/drag-drop-zone.component";
import {ErrorValidationComponent} from "./error-validation/error-validation.component";
import {ConfirmValidationComponent} from "./confirm-validation/confirm-validation.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, DragDropZoneComponent, ErrorValidationComponent, ConfirmValidationComponent],
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  file: File | undefined;
  form = new FormGroup({
    state: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    iva: new FormControl('', Validators.required),
  });

  formFile = new FormGroup({
    category: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),
    eventDate:new FormControl('', Validators.required),
    fileDescription: new FormControl('', Validators.required),
    documentType: new FormControl('', Validators.required),
  });
  showValidation:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  validateForm(){
    this.showValidation = !this.showValidation;
    console.log(this.form.getRawValue(), this.formFile);
  }

  fileAdded(file: any): void {
    this.addFile(file);
  }

  addFile(f: File){
    this.file = f;
    this.formFile.get('fileName').setValue(f.name);
    console.log(this.file);
  }
}
