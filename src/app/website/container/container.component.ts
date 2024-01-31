import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from "../../shared/material.module";

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.css'],
  standalone: true,
  imports: [MaterialModule],
})
export class ContainerComponent {
  @Output() openSideNav = new EventEmitter<any>();
}
