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
    this._auth.completeAuthentication();
    this.route.queryParams.subscribe((p) => {
      console.log(p);
     // this._auth.startAuthentication();
    });
   console.log(localStorage.getItem('currentUser-sts').valueOf());
    this.user$.pipe(untilDestroyed(this)).subscribe(user => {
      console.log('user', user, this._auth);
      if (this._auth.isLogged) {
        this._log.log('[Auth] is Logged. Redirecting to dashboard');
        if (this._user) {
         this._router.navigateByUrl('dashboard');
          return;
        }
      } else {
      // this._router.navigateByUrl('');
        this._log.log('[Auth] is not logged.');
      }
    });
  }

  ngOnInit(): void {
  }
}
