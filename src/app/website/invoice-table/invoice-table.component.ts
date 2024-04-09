import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {MatDialog} from "@angular/material/dialog";
import {FilterModalComponent} from "../modal/filter-modal/filter-modal.component";
import {CommonModule} from "@angular/common";
import {LoadingExcelComponent} from "../loading-excel/loading-excel.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SearchModalComponent} from "../modal/search-modal/search-modal.component";
import {FormGroup} from "@angular/forms";
import {ProtocolsService} from "../services/protocols.service";
import {InvoicesService} from "../services/invoices.service";
import {HttpClientModule} from "@angular/common/http";
import {InvoicesQuery} from "../../core/stores/invoices/invoices.query";
import {Observable} from "rxjs";
import { Sort } from '@angular/material/sort';
import {LiveAnnouncer} from "@angular/cdk/a11y";

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
  invoices$: Observable<Invoice[]>;
  pagination$ = this.invoiceQuery.pagination$;
  showSearch: boolean = false;
  showFilters: boolean = false;
  constructor(
    private invoicesService: InvoicesService,
    private _liveAnnouncer: LiveAnnouncer,
    private invoiceQuery: InvoicesQuery,
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  pageSizes = [5, 10];
  displayedColumns = [ 'numeroFattura', 'numeroProtocollo', 'metodoPagamento', 'importo', 'dataEmissione', 'dataCreazione', 'cf', 'canaleId'];
  /*  data : Invoice[] = [
      {invoiceId: '1',numberInvoice: 1, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 123,paymentData: this.date, status: 'inviata'},
      {invoiceId: '2',numberInvoice: 2, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 432,paymentData: this.date, status: 'Errore'},
      {invoiceId: '3',numberInvoice: 3, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 432,paymentData: this.date, status: 'inviata'},
      {invoiceId: '4',numberInvoice: 4, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 654,paymentData: this.date, status: 'inviata'},
      {invoiceId: '5',numberInvoice: 5, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 765,paymentData: this.date, status: 'inviata'},
      {invoiceId: '6',numberInvoice: 6, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 876,paymentData: this.date, status: 'Errore'},
      {invoiceId: '7',numberInvoice: 7, protocol: 1, payment: 'MP08', emissionDate: this.date, fiscalCode: 'CRDMTT96D11H501F', amount: 987,paymentData: this.date, status: 'Errore'},

  ];*/
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  //dataSource = new MatTableDataSource(this.data);

  ngOnInit() {
    this.loadInvoices();
  }

  ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginatorPageSize;
  }

  loadInvoices(){
    this.invoicesService.g().subscribe(res => {
      console.log(res);
      this.invoices$ = this.invoiceQuery.invoices$;
    });
  }

  search(f: FormGroup, c:string){
    this.invoiceQuery.updateMeta('status', c);
    this.invoicesService.g().subscribe(res => console.log(res));
    const s = f.get('search').value;
   // this.dataSource.filter = s.trim().toLowerCase();
  }

  updatePage(page: PageEvent, p): void {
    console.log(p);
    this.invoiceQuery.updateMeta('page', page.pageIndex);
    this.loadInvoices();
  }

  filter(f: FormGroup){
  //  this.dataSource = new MatTableDataSource(this.data);
    const start = new Date(f.get('start').value);
    const end = new Date(f.get('end').value);
    const array = [];
 /*   this.dataSource.filteredData.filter(t => {
      const d = new Date(t.emissionDate.setHours(0,0,0,0));
      if(d.getTime().valueOf() >= start.getTime().valueOf() && d.getTime().valueOf() <= end.getTime().valueOf()){
        array.push(t);
      }
    });
    this.dataSource = new MatTableDataSource(array);*/
  }
  announceSortChange(sortState: Sort) {
    console.log(sortState.direction);
    if (sortState.direction) {
      console.log(sortState.direction);
      this.invoiceQuery.updateMeta('sort', 'dataCreazione,' + sortState.direction );
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(r => {} );
      this.loadInvoices();
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(r => {});
    }
  }

}
