import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmModalComponent} from "../modal/confirm-modal/confirm-modal.component";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-tss-form',
  templateUrl: './tss-form.component.html',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  styleUrls: ['./tss-form.component.css']
})
export class TssFormComponent implements OnInit {
  eye: boolean= false;
  errorLabel: boolean = false;
  reinsert_eye: boolean = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    re_password: new FormControl('', Validators.required),
  });
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => {
      if(res.password === res.re_password){
        this.errorLabel = false;
      }
    })
  }

  saveForm(){
    console.log(this.form.getRawValue(), this.form.get('password').value,this.form.get('re_password').value  );
    if(this.form.get('password').value === this.form.get('re_password').value){
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width:'600px',
        data: null,
      });
    }
    else {
      this.errorLabel = true;
    }
  }


  resetForm(){
    this.form.reset();
  }
}
