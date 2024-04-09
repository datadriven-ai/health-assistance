import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DragDropZoneComponent} from "../drag-drop-zone/drag-drop-zone.component";
import {ErrorValidationComponent} from "./error-validation/error-validation.component";
import {ConfirmValidationComponent} from "./confirm-validation/confirm-validation.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProtocolsService} from "../services/protocols.service";
import {ProtocolsQuery} from "../../core/stores/protocols/protocols.query";

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, DragDropZoneComponent, ErrorValidationComponent, ConfirmValidationComponent],
  providers: [ProtocolsService],
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  file: File | undefined;
  messaggi=[];
  disableSelect = new FormControl(true);
  form = new FormGroup({
    tipoOperazione: new FormControl('', Validators.required),
    tipoSpesa: new FormControl('', Validators.required),
    tipoDocumentoSpesa: new FormControl('F', Validators.required),
    flagOpposizione:  new FormControl(false, Validators.required),
    pagamentoAnticipato: new FormControl(false, Validators.required),
    aliquotaIva: new FormControl('', Validators.required),
    forzoInvio: new FormControl(false, Validators.required),
  //iva: new FormControl('', Validators.required),
  });

  formFile = new FormGroup({
    category: new FormControl('', Validators.required),
    fileName: new FormControl('', Validators.required),
    eventDate:new FormControl('', Validators.required),
    fileDescription: new FormControl('', Validators.required),
    documentType: new FormControl('', Validators.required),
  });
  showValidation:boolean = false;
  error:boolean =false;
  id= '';

  constructor(
    private protocolsService: ProtocolsService,
    private protocolsQuery: ProtocolsQuery,
  ) { }

  ngOnInit(): void {
    this.disableSelect.setValue(true);
    this.form.valueChanges.subscribe(res=> this.showValidation = false);
    this.form.get('tipoSpesa').valueChanges.subscribe(res=> {
      switch (res){
        case 'SR': this.form.get('aliquotaIva').setValue('N4');
        break;
        case 'IC': this.form.get('aliquotaIva').setValue('22%');
        break;
        case 'AA':this.form.get('aliquotaIva').setValue('N4');
        break;
        default: console.log('default');
      }
    });
  }
  validateForm(){
    console.log(this.form.getRawValue(), this.file);
    this.protocolsService.validationDocument(this.file, this.form.getRawValue()).subscribe(res=> {
      this.showValidation = true;
      this.id = res;
    }, err => {
      this.messaggi = JSON.parse(err.error).messaggi;
      console.log(JSON.parse(err.error).messaggi);
      this.error = true
    });
  }

  fileAdded(file: any): void {
    this.showValidation = false;
    this.addFile(file);
  }

  addFile(f: File){
    this.file = f;
    this.formFile.get('fileName').setValue(f.name);
    console.log(this.file);
  }
}
