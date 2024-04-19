import {Component, Inject, OnInit} from '@angular/core';
import {ProtocolsService} from "../../services/protocols.service";
import {MaterialModule} from "../../../shared/material.module";
import {TssFormComponent} from "../../tss-form/tss-form.component";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";
import {SearchModalComponent} from "../search-modal/search-modal.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {AuthInterceptor} from "../../../core/guards/auth.interceptor";
import {Section} from "../../import-excel/error-validation/error-validation.component";
import {Protocol} from "../../../core/models/protocol";

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent, SearchModalComponent, HttpClientModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css',
  providers: [ProtocolsService,UserService, AuthInterceptor],
})
export class InfoModalComponent implements OnInit{
  esito: any = {};
  protocollo: Protocol = null;
  descrizione: boolean = false;
  folders: any[] = [
    {
      name: 'Fatture valide',
      updated: 3
    },
    {
      name: 'Fatture da controllare',
      updated: 4
    },
    {
      name: 'Fatture errate',
      updated: 5
    },
  ];
  constructor(
    private protocolService: ProtocolsService,
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {
    // @ts-ignore
    this.protocollo = this.data.element;
    // @ts-ignore
    this.esito = this.data.res;
  }

  ngOnInit() {
    if(this.esito.descrizioneEsito === 'Esito negativo'){
      this.descrizione = false;
    }
    else {
      if (this.esito.descrizioneEsito === 'Esito positivo'){
        this.descrizione = true;
      }
      else {
        this.descrizione = null;
      }
    };
    console.log(this.protocollo, this.esito, this.descrizione);
  }
}
