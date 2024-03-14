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
import {MatPaginator} from "@angular/material/paginator";
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, TssFormComponent, FilterModalComponent, SearchModalComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ProtocolsService],
})
export class HomeComponent implements OnInit{
  protocols: Protocol[];
  user:any;
  modificaPassword: any;
  ultimaDataInvio: any;
  dataSource: MatTableDataSource<Protocol>;
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
    private dialog: MatDialog) {}
  @Output() openSideNav = new EventEmitter();
  displayedColumns= ['id', 'stato', 'dataCreazione', 'esito', 'tipo'];

  ngOnInit() {
    console.log(localStorage, this.sessionStore, ProtocolStatus);
    this.user = JSON.parse(localStorage.getItem('me'));
    this.userService.getUltimaOperazione().subscribe(res => this.ultimaDataInvio = res);
    this.userService.getUltimaModificaPassword().subscribe(res => this.modificaPassword = res);
    console.log(this.sessionStore);
    this.protocolsService.getProtocols().subscribe(res=> {
      console.log(this.protocolsStore._value());
      this.protocols = res;
      this.dataSource = new MatTableDataSource(this.protocols);
      console.log(res, this.dataSource, );
      this.dataSource.paginator = this.paginatorPageSize;
      console.log(this.dataSource);
    });
  }

  ngAfterViewInit() {

  }

  search(f: FormGroup){
    const s = f.get('search').value;
    this.dataSource.filter = s.trim().toLowerCase();
  }


  filter(f: FormGroup){
    this.dataSource = new MatTableDataSource(this.protocols);
    const start = new Date(f.get('start').value);
    const end = new Date(f.get('end').value);
    const array = [];
    this.dataSource.filteredData.filter(t => {
   //   const d = new Date(t.date.setHours(0,0,0,0));
     // if(d.getTime().valueOf() >= start.getTime().valueOf() && d.getTime().valueOf() <= end.getTime().valueOf()){
        //array.push(t);
      // }
    });
    this.dataSource = new MatTableDataSource(array);
    this.dataSource.paginator = this.paginatorPageSize;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(sortState.direction);
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(r => {} );
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(r => {});
    }
  }

  showF(){
    this.showFilters= !this.showFilters;
    this.dataSource = new MatTableDataSource(this.protocols);
    this.dataSource.paginator = this.paginatorPageSize;
  }
  showS(){
    this.showSearch = !this.showSearch;
    this.dataSource = new MatTableDataSource(this.protocols);
    this.dataSource.paginator = this.paginatorPageSize;
  }


}
