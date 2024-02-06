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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  showSearch: boolean= false
  constructor(
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  displayedColumns = ['numberInvoice', 'protocol', 'state', 'channel', 'result', 'payment', 'creationDate', 'emissionDate'];

  dataSource : Invoice[] = [
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},

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
