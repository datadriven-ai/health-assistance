import {Component, Inject, OnInit} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-loading-excel',
  templateUrl: './loading-excel.component.html',
  standalone:true,
  imports:[MaterialModule],
  styleUrls: ['./loading-excel.component.css']
})
export class LoadingExcelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadingExcelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {}

  ngOnInit(): void {
  }

}
