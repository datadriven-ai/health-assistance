import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";

@Component({
  selector: 'app-confirm-validation',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './confirm-validation.component.html',
  styleUrl: './confirm-validation.component.css'
})
export class ConfirmValidationComponent {
  @Input() id; string = 0;

}
