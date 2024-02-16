import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../material.module";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.css'
})
export class LoginCardComponent implements OnInit{
  station: boolean = false;
  constructor(
    private _router: Router,
  ) {
  }
ngOnInit() {
}
  login(){
    this._router.navigateByUrl('/redirect').then(r => {} );
  }

  chooseStation(){
    this.station = !this.station;
  }

}
