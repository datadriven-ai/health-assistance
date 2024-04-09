import {Injectable} from '@angular/core';
import {MetaQuery, QueryState} from '../../classes/meta';
import {map} from 'rxjs/operators';
import {toMoment} from '../../../shared/utils/functions';
import {Moment} from 'moment/moment';
import {InvoiceStore} from "./invoices.store";
import {Invoice, InvoiceStatus} from "../../models/element";
import {Observable} from "rxjs";
import {Protocol} from "../../models/protocol";

export interface InvoiceFilters extends QueryState {
  status: string;
  filters: any | null;
}

@Injectable({providedIn: 'root'})
export class InvoicesQuery extends MetaQuery<InvoiceFilters, Invoice> {
  invoices$: Observable<Invoice[]> = this.selectAll();
  hasReservations$ = this.selectCount().pipe(map(res => res > 0 ));
 /* mainPage$ = this.selectAll({limitTo: 5, filterBy: res =>
      (res.status === InvoiceStatus.Nota_di_credito ||
        res.status === InvoiceStatus.Fatture) &&
      toMoment(res.emissionDate).format('MMDD') === toMoment().format('MMDD')
  });*/

//  todaysReservations$ = this.mainPage$.pipe(map(reservations => reservations.length > 0));
 // todaysReservationsCount$ = this.mainPage$.pipe(map(res => res ? res.length : 0));

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

  constructor(public override store: InvoiceStore) {
    super(store);
  }

}
