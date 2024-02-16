import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-modal',
  standalone: true,
    imports: [MaterialModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent {
  @Output() formSearch = new EventEmitter<FormGroup>();
  form = new FormGroup({
    search: new FormControl(''),
  });
  search(){
    console.log(this.formSearch);
    this.formSearch.emit(this.form);
  }
}
