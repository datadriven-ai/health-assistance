import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DragDropZoneComponent} from "../drag-drop-zone/drag-drop-zone.component";
import {ErrorValidationComponent} from "./error-validation/error-validation.component";
import {ConfirmValidationComponent} from "./confirm-validation/confirm-validation.component";

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, DragDropZoneComponent, ErrorValidationComponent, ConfirmValidationComponent],
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  showValidation:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
