import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../material.module";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionQuery} from "../../core/stores/session/session.query";
import {AuthService} from "../../core/services/auth.service";
import {LogService} from "../../core/services/log.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent  implements OnInit{
  private user$ = this._user.user$;
  constructor(
    private _session: SessionQuery,
    private _route: ActivatedRoute,
    private _router: Router,
    private _log: LogService,
    private _auth: AuthService,
    private route: ActivatedRoute,
    private _user: SessionQuery,
  ) {
  }

  ngOnInit(): void {
      this._auth.completeAuthentication();
  }
}
