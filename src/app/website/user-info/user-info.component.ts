import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  standalone: true,
  imports:[MaterialModule],
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
