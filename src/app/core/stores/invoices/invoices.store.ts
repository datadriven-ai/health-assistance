import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from '@angular/core';
import {InvoiceFilters} from "./invoices.query";
import {Invoice} from "../../models/element";

@StoreConfig({ name: 'invoices', idKey: 'id' })
@Injectable({providedIn: 'root'})
export class InvoiceStore extends EntityStore<InvoiceFilters, Invoice> {
  constructor() {
    super({...getEmptyMeta()});
  }
}
