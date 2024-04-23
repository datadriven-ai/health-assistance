import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ContainerComponent} from "../../shared/container/container.component";
import {MaterialModule} from "../../shared/material.module";
import {Invoice} from "../../core/models/element";
import {SideNavComponent} from "../../shared/components/side-nav/side-nav.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {LoadingExcelComponent} from "../loading-excel/loading-excel.component";
import {RouterModule} from "@angular/router";
import {TssFormComponent} from "../tss-form/tss-form.component";
import {FilterModalComponent} from "../modal/filter-modal/filter-modal.component";
import {Protocol, ProtocolStatus} from "../../core/models/protocol";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SearchModalComponent} from "../modal/search-modal/search-modal.component";
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";
import { Sort } from '@angular/material/sort';
import {BaseService} from "../../core/services/base.service";
import {HttpClient} from "@angular/common/http";
import {LogService} from "../../core/services/log.service";
import {ProtocolsStore} from "../../core/stores/protocols/protocols.store";
import {ProtocolsService} from "../services/protocols.service";
import {Section} from "../import-excel/error-validation/error-validation.component";
import {ProtocolsQuery} from "../../core/stores/protocols/protocols.query";
import {SessionStore} from "../../core/stores/session/session.store";
import {SessionQuery} from "../../core/stores/session/session.query";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {CustomDatePipe} from "../../shared/pipe/customDate";
import Moment from "moment";
import {InfoModalComponent} from "../modal/info-modal/info-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent, SearchModalComponent, HttpClientModule, CustomDatePipe, InfoModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ProtocolsService],
})
export class HomeComponent implements OnInit{
  protocols: Protocol[];
  protocols$: Observable<Protocol[]>;
  pagination$ = this.protocolsQuery.pagination$;
  filterText$ = this.protocolsQuery.filterText$;
  user:any;
  modificaPassword: any;
  ultimaDataInvio: any;
  dataSource: Protocol[];
  pageSizes = [5, 10];
  showSearch: boolean = false;
  showFilters: boolean = false;
  date = new Date();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  constructor(
    private protocolsService: ProtocolsService,
    private userService: UserService,
    private protocolsQuery: ProtocolsQuery,
    private sessionStore: SessionStore,
    private _sessionQuery: SessionQuery,
    private protocolsStore: ProtocolsStore,
    private _liveAnnouncer: LiveAnnouncer,
    protected _dialog: MatDialog,
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  displayedColumns= ['numeroProtocollo', 'stato', 'dataCreazione', 'esito', 'tipo', 'action'];

  ngOnInit() {
    console.log(this.pagination$);
    this.user = JSON.parse(localStorage.getItem('me'));
    this.userService.getUltimaOperazione().subscribe(res => this.ultimaDataInvio = res);
    this.userService.getUltimaModificaPassword().subscribe(res => this.modificaPassword = res);
    console.log(this.sessionStore);
    this.loadProtocols();
    this.protocols$ = this.protocolsQuery.protocols$;
  }

  loadProtocols(){
    this.protocolsService.getProtocols().subscribe(res=> {
      console.log(this.protocolsStore._value());
      //this.dataSource = this.protocols;
    });
  }
  ngAfterViewInit() {
  }

  search(f: FormGroup){
    console.log( f.get('search').value);
    //this.protocolsQuery.updateMeta('cf', f.get('search').value );
    this.protocolsQuery.updateMeta('numProtocollo', f.get('search').value );
   // this.protocolsQuery.updateMeta('sort', 'desc');
    this.loadProtocols();
  }

  updatePage(pagination: PageEvent, p): void {
    console.log(p, pagination);
    this.protocolsQuery.updateMeta('pagination', {page: pagination.pageIndex, size: pagination.pageSize});
    console.log(this.protocolsQuery.meta);
    this.loadProtocols();
  }

  filter(f: FormGroup){
    this.dataSource = this.protocols;
    const start = Moment(f.get('start').value) ? Moment(f.get('end').value).format('DD/MM/YYYY'): null;
    const end = Moment(f.get('end').value) ? Moment(f.get('end').value).format('DD/MM/YYYY') : null;
    this.protocolsQuery.updateMeta('dataDa', start);
    this.protocolsQuery.updateMeta('dataA', end);
    this.protocolsQuery.updateMeta('stato', f.get('state').value);
    this.loadProtocols();
    const array = [];
    console.log(f, start, end);
    this.dataSource = array;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState.direction);
    if (sortState.direction) {
      console.log(sortState.direction);
      this.protocolsQuery.updateMeta('sort', 'dataCreazione,' + sortState.direction );
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(r => {} );
      this.loadProtocols();
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(r => {});
    }
  }

  showF(){
    this.showFilters= !this.showFilters;
    this.dataSource = this.protocols;
   // this.dataSource.paginator = this.paginatorPageSize;
  }
  showS(){
    this.showSearch = !this.showSearch;
    this.dataSource = this.protocols;
  //  this.dataSource.paginator = this.paginatorPageSize;
  }


  infoSTS(element: Protocol){
    this.protocolsService.getInfoErrorProtocol().subscribe(res =>{
      this._dialog.open(InfoModalComponent, {data: {element, res} , width: '600px', height: '400px'});
      }
    );
  }


}
