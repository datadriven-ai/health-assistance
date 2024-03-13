import {EntityStore, StoreConfig} from '@datorama/akita';
import {getEmptyMeta, QueryState} from '../../classes/meta';
import {Injectable} from '@angular/core';
import {Protocol} from "../../models/protocol";
import {ProtocolsFilter} from "./protocols.query";

@StoreConfig({ name: 'protocols', idKey: 'id' })
@Injectable({providedIn: 'root'})
export class ProtocolsStore extends EntityStore<ProtocolsFilter, Protocol> {
  constructor() {
    super({...getEmptyMeta()});
  }
}
