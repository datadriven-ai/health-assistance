import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogService} from "../../core/services/log.service";
import {BaseService} from "../../core/services/base.service";
import {InvoiceStore} from "../../core/stores/invoices/invoices.store";
import {InvoicesQuery} from "../../core/stores/invoices/invoices.query";
import {Invoice} from "../../core/models/element";

@Injectable()
export class InvoicesService extends BaseService {

  constructor(
    protected override  _http: HttpClient,
    protected override  _log: LogService,
    protected override _store: InvoiceStore,
    protected _query: InvoicesQuery,
  ) {
    super(_http, _log, _store);
  }

  g(){
    return this.get(this.baseURL + '/1/documento-spesa', true).pipe();
  }
}
