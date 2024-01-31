import {Component, OnInit} from '@angular/core';
import {CommonModule, UpperCasePipe} from '@angular/common';
import {environment} from "../../../../environments/environment";
import {MaterialModule} from "../../material.module";

@Component({
  selector: 'app-environment-bar',
  standalone: true,
  imports:[MaterialModule, CommonModule],
  templateUrl: './environment-bar.component.html',
  styleUrl: './environment-bar.component.css'
})
export class EnvironmentBarComponent implements OnInit{

  get show(): boolean {
    return !environment.production;
  }

  get text(): string {
    return environment.environmentName;
  }
ngOnInit() {
    console.log(environment);
}
}
