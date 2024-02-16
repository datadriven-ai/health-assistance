import {Component, OnInit} from '@angular/core';
import {MaterialModule} from "../material.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent  implements OnInit{

  constructor(
    private _router: Router,
  ) {
    this._router.navigateByUrl('/dashboard/home').then(r => {} );
  }
  ngOnInit(): void {
  }
}
