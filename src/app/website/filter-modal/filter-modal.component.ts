import { Component } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [MaterialModule, CommonModule,],
  templateUrl: 'filter-modal.component.html',
  styleUrl: 'filter-modal.component.css'
})
export class FilterModalComponent {
   today = new Date();
   month = this.today.getMonth();
   year = this.today.getFullYear();
  campaignOne = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 15)),
    end: new FormControl(new Date(this.year, this.month, 19)),
  });

}
