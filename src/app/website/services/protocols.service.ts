import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProtocolsStore} from "../../core/stores/protocols/protocols.store";
import {ProtocolsQuery} from "../../core/stores/protocols/protocols.query";
import {LogService} from "../../core/services/log.service";
import {BaseService} from "../../core/services/base.service";

@Injectable()
export class ProtocolsService extends BaseService {

  constructor(
    protected override  _http: HttpClient,
    protected override  _log: LogService,
    protected override _store: ProtocolsStore,
    protected _query: ProtocolsQuery,
  ) {
    super(_http, _log, _store);
    //this.baseURL += 'bookings-api/v1/';
  }

}
