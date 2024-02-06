import { Component, OnInit } from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tss-form',
  templateUrl: './tss-form.component.html',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  styleUrls: ['./tss-form.component.css']
})
export class TssFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
