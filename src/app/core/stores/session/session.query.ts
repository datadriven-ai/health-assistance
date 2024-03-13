import {Query} from '@datorama/akita';
import {SessionStore} from './session.store';
import {UserInfo} from '../../models/session';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SessionQuery extends Query<UserInfo> {
  user$ = this.select(store => store.id ? store : null);
  hasUser$ = this.select(store => !!store.id);
  get user(): UserInfo {
    return this.getValue();
  }
  get fullName(): string {
    return this.user.nome + ' ' + this.user.cognome;
  }
  constructor(protected override store: SessionStore) {
    super(store);
  }
  hasRole(role: 'secretary' | 'medic' | 'admin'):void {
    if (!this.user.enti) {console.log('ruolo')}
  }
}
