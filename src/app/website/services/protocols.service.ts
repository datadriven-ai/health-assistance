import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProtocolsStore} from "../../core/stores/protocols/protocols.store";
import {ProtocolsQuery} from "../../core/stores/protocols/protocols.query";
import {LogService} from "../../core/services/log.service";
import {BaseService} from "../../core/services/base.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Ente} from "../../core/models/session";
import {Protocol} from "../../core/models/protocol";

@Injectable()
export class ProtocolsService extends BaseService {

  constructor(
    protected override  _http: HttpClient,
    protected override  _log: LogService,
    protected override _store: ProtocolsStore,
    protected _query: ProtocolsQuery,
  ) {
    super(_http, _log, _store);
    this.baseURL += '';
  }

  getProtocols(): Observable<Protocol[]> {
    console.log(this._query.queryString);
    return this.get('/operazioni' + this._query.queryString, true);
  }


  validationDocument(file: File, info: any): Observable<string> {
    console.log(file, info);
    const body = new FormData();
    body.set('file', file);
    body.set('input', new Blob([JSON.stringify(info)], {type: 'application/json'}));
    return this._http.post( this.baseURL +'/documento-spesa/validazione', body, {responseType: "text"});
  }

  uploadDocument(file: File, info: any): Observable<string> {
    const body = new FormData();
    body.set('file', file);
    body.set('input', new Blob([JSON.stringify(info)], {type: 'application/json'}));
    return this._http.post( this.baseURL +'/documento-spesa/asincrono', body, {responseType: "text"});
  }

}
