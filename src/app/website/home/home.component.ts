import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContainerComponent} from "../container/container.component";
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {SideNavComponent} from "../../shared/components/side-nav/side-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContainerComponent, MaterialModule, SideNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @Output() openSideNav = new EventEmitter();
  displayedColumns = ['position', 'name', 'weight', 'symbol'];

  dataSource : Invoice[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  ];

  ngOnInit() {

  }
}
