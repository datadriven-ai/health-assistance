import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/components/login-component/login.component";
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {UserService} from "../../website/services/user.service";
import {SessionStore} from "../../core/stores/session/session.store";
import {SessionQuery} from "../../core/stores/session/session.query";
import {Ente} from "../../core/models/session";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthInterceptor} from "../../core/guards/auth.interceptor";
import {HttpHeaders, HttpRequest} from "@angular/common/http";

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent  implements OnInit{
  form = new FormGroup({
    ente: new FormControl({id: '', nome: ''}, Validators.required),
  });
  station: boolean = false;
  enti: Ente[];
  constructor(
    private userService: UserService,
    private _router: Router,
    private _session: SessionStore,
    private _sessionQuery: SessionQuery
  ) {
  }
  ngOnInit() {
    this.userService.getUserInfo();
    this.enti = JSON.parse(localStorage.getItem('me')).enti;
  }
  chooseStation(){
    this.station = !this.station;
  }

  addEnte(){
    console.log(this.form.value, localStorage);
    localStorage.setItem('ente_id', this.form.value.ente.id);
    localStorage.setItem('ente_nome', this.form.value.ente.nome);
    console.log(localStorage);
    this._router.navigate(['dashboard/home']);
  }

}
