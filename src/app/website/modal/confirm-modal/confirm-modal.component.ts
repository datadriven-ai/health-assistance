import {Component, Inject, OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, MatDialogModule,
} from '@angular/material/dialog';
import {MaterialModule} from "../../../shared/material.module";
import {UserService} from "../../services/user.service";
import {TssFormComponent} from "../../tss-form/tss-form.component";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";
import {SearchModalComponent} from "../search-modal/search-modal.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../../../core/guards/auth.interceptor";
import {ProtocolsService} from "../../services/protocols.service";

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent, SearchModalComponent, HttpClientModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
  providers: [ProtocolsService,UserService, AuthInterceptor],
})
export class ConfirmModalComponent implements OnInit{
  constructor(
    private protocol: ProtocolsService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  modificaPassword(){
    this.dialogRef.close('yes');
  }
}
