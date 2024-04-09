import {Component, Inject} from '@angular/core';
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

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent, SearchModalComponent, HttpClientModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css',
  providers: [ProtocolsService,UserService, AuthInterceptor],
})
export class InfoModalComponent {

  constructor(
    private protocol: ProtocolsService,
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {}

}
