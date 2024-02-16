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

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) {}

  ngOnInit(): void {
  }

}
