import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/components/login-component/login.component";
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent  implements OnInit{

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
