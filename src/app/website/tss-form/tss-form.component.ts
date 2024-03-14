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
import {FilterModalComponent} from "../modal/filter-modal/filter-modal.component";
import {SearchModalComponent} from "../modal/search-modal/search-modal.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-tss-form',
  templateUrl: './tss-form.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FilterModalComponent, SearchModalComponent, HttpClientModule],
  styleUrls: ['./tss-form.component.css'],
  providers:[UserService]
})
export class TssFormComponent implements OnInit {
  eye: boolean= false;
  errorLabel: boolean = false;
  successful: boolean = false;
  reinsert_eye: boolean = false;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    re_password: new FormControl('', Validators.required),
  });
  constructor(public dialog: MatDialog,
              private userService: UserService) { }

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
        data: this.form.getRawValue(),
      }).afterClosed().subscribe(res => {
        if(res === 'yes'){
          this.userService.putTSSPassword(this.form.getRawValue()).subscribe(res => {
            this.successful = true;
          });
        }
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
