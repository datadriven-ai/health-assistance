import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContainerComponent} from "../container/container.component";
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {SideNavComponent} from "../../shared/components/side-nav/side-nav.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {LoadingExcelComponent} from "../loading-excel/loading-excel.component";
import {RouterModule} from "@angular/router";
import {TssFormComponent} from "../tss-form/tss-form.component";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";
import {Protocol} from "../../core/models/protocol";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  showSearch: boolean = false;
  showFilters: boolean = false;
  date = new Date();
  constructor(
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  displayedColumns = ['protocol', 'send', 'date'];

  dataSource : Protocol[] = [
    {protocol: 1, send: 'Inviata', date: new Date()},
    {protocol: 1, send: 'Non inviata', date: new Date()},
    {protocol: 1, send: 'Inviata', date: new Date()},
    {protocol: 1, send: 'Inviata', date: new Date()},
  ];

  ngOnInit() {

  }

  openImportExcel(){
      const dialogRef = this.dialog.open(LoadingExcelComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
}
