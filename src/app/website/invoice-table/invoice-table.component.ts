import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {MatDialog} from "@angular/material/dialog";
import {FilterModalComponent} from "../modal/filter-modal/filter-modal.component";
import {CommonModule} from "@angular/common";
import {LoadingExcelComponent} from "../loading-excel/loading-excel.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SearchModalComponent} from "../modal/search-modal/search-modal.component";
import {FormGroup} from "@angular/forms";
import {ProtocolsService} from "../services/protocols.service";
import {InvoicesService} from "../services/invoices.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-invoice-table',
  standalone: true,
    imports: [MaterialModule, FilterModalComponent, CommonModule, SearchModalComponent, HttpClientModule],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.css',
  providers: [InvoicesService],
})
export class InvoiceTableComponent implements OnInit{
  date = new Date;
  showSearch: boolean = false;
  showFilters: boolean = false;
  constructor(
    private invoicesService: InvoicesService,
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  pageSizes = [5, 10];
  displayedColumns = ['invoiceId', 'numberInvoice', 'protocol','payment','emissionDate', 'fiscalCode', 'amount', 'paymentData', 'status'];
    data : Invoice[] = [
      {invoiceId: '1',numberInvoice: 1, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 123,paymentData: this.date, status: 'prova' },
      {invoiceId: '2',numberInvoice: 2, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 432,paymentData: this.date, status: 'prova'  },
      {invoiceId: '3',numberInvoice: 3, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 432,paymentData: this.date, status: 'prova' },
      {invoiceId: '4',numberInvoice: 4, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 654,paymentData: this.date, status: 'prova' },
      {invoiceId: '5',numberInvoice: 5, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 765,paymentData: this.date, status: 'prova' },
      {invoiceId: '6',numberInvoice: 6, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 876,paymentData: this.date, status: 'prova' },
      {invoiceId: '7',numberInvoice: 7, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 987,paymentData: this.date, status: 'prova' },

  ];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  dataSource = new MatTableDataSource(this.data);

  ngOnInit() {
    this.invoicesService.g().subscribe(res => console.log(res));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorPageSize;
  }

  search(f: FormGroup){
    const s = f.get('search').value;
    this.dataSource.filter = s.trim().toLowerCase();
  }

  filter(f: FormGroup){
    this.dataSource = new MatTableDataSource(this.data);
    const start = new Date(f.get('start').value);
    const end = new Date(f.get('end').value);
    const array = [];
    this.dataSource.filteredData.filter(t => {
      const d = new Date(t.emissionDate.setHours(0,0,0,0));
      if(d.getTime().valueOf() >= start.getTime().valueOf() && d.getTime().valueOf() <= end.getTime().valueOf()){
        array.push(t);
      }
    });
    this.dataSource = new MatTableDataSource(array);
  }

}
