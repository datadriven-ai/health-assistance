import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {MatDialog} from "@angular/material/dialog";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-invoice-table',
  standalone: true,
  imports: [MaterialModule, FilterModalComponent, CommonModule ],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.css'
})
export class InvoiceTableComponent {
  showSearch: boolean = false;
  showFilters: boolean = false;
  constructor(
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  displayedColumns = ['numberInvoice', 'protocol', 'state', 'channel', 'result', 'payment', 'creationDate', 'emissionDate'];
    data : Invoice[] = [
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},
    {numberInvoice: 1, protocol: 'Hydrogen', state: 'ciao', channel: 'H', result: 'ciao' , creationDate: 'ciao', emissionDate: 'ciao'},

  ];

}
