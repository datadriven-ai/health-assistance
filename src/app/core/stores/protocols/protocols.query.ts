import {Injectable} from '@angular/core';
import {MetaQuery, QueryState} from '../../classes/meta';
import {map} from 'rxjs/operators';
import {toMoment} from '../../../shared/utils/functions';
import {Moment} from 'moment/moment';
import {ProtocolsStore} from "./protocols.store";
import {Protocol, ProtocolStatus} from "../../models/protocol";
import {Observable} from "rxjs";

export interface ProtocolsFilter extends QueryState {
  status: string;
  filters: any | null;
}

@Injectable({providedIn: 'root'})
export class ProtocolsQuery extends MetaQuery<ProtocolsFilter, Protocol> {
  protocols$: Observable<Protocol[]> = this.selectAll();
 /* hasReservations$ = this.selectCount().pipe(map(res => res > 0 ));
  mainPage$ = this.selectAll({limitTo: 5, filterBy: res =>
      (res.dataCreazione === ProtocolStatus. ||
        res.dataCreazione === ProtocolStatus.Fatture) &&
      toMoment(res.dataCreazione).format('MMDD') === toMoment().format('MMDD')
  });*/


  override get meta(): any {
    const meta = super.meta;
    meta.status = this.getValue().status;
    const filters = this.getValue().filters || {};
    Object.keys(filters).forEach(filterName => {
      if (filters[filterName]) {
        meta[filterName] = filterName.includes('date') ? (filters[filterName] as Moment).format('DD-MM-YYYY') : filters[filterName];
      }
    });
    return meta;
  }

  constructor(public override store: ProtocolsStore) {
    super(store);
  }

}
