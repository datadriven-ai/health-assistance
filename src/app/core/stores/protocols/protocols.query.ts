import {Injectable} from '@angular/core';
import {MetaQuery, QueryState} from '../../classes/meta';
import {map} from 'rxjs/operators';
import {toMoment} from '../../../shared/utils/functions';
import {Moment} from 'moment/moment';
import {ProtocolsStore} from "./protocols.store";
import {Protocol, ProtocolStatus} from "../../models/protocol";

export interface ProtocolsFilter extends QueryState {
  status: string;
  filters: any | null;
}

@Injectable({providedIn: 'root'})
export class ProtocolsQuery extends MetaQuery<ProtocolsFilter, Protocol> {

  hasReservations$ = this.selectCount().pipe(map(res => res > 0 ));
  mainPage$ = this.selectAll({limitTo: 5, filterBy: res =>
      (res.status === ProtocolStatus.Nota_di_credito ||
        res.status === ProtocolStatus.Fatture) &&
      toMoment(res.date).format('MMDD') === toMoment().format('MMDD')
  });

  todaysReservations$ = this.mainPage$.pipe(map(reservations => reservations.length > 0));
  todaysReservationsCount$ = this.mainPage$.pipe(map(res => res ? res.length : 0));

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
