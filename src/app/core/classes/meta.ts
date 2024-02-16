import {QueryEntity} from '@datorama/akita';
import {PaginationRequest, PaginationResponse, Sort} from '../models/responseMeta';

export interface QueryState {
  filter: string | undefined;
  sort: Sort | undefined;
  pagination: PaginationRequest | undefined;
  paginationResponse?: PaginationResponse;
}

export class MetaQuery<State extends QueryState, Entity> extends QueryEntity<State, Entity> {

  meta$ = this.select(state => state);
  filterText$ = this.select(state => state.filter);
  pagination$ = this.select('paginationResponse');
  sort$ = this.select('sort');

  get meta(): any {
    const meta = this.getValue();
    return {
      filter: meta.filter,
      page: meta.pagination.page,
      size: meta.pagination.size
    };
  }

  get queryString(): string {
    let q = '?';
    Object.entries(this.meta).forEach(values => q += values[1] || values[0] === 'page' ? values[0] + '=' + values[1] + '&' : '');
    return q.slice(0, -1);
  }

  resetMeta(): void {
    const meta: any = getEmptyMeta();
    this.store.update({...meta});
  }


  resetStore(): void {
    this.resetActive();
    this.resetMeta();
    this.resetError();
    this.store.set([]);
  }

  resetError(): void {
    this.store.setError(null);
  }

  setLoading(isLoading: boolean): void {
    this.store.setLoading(isLoading);
  }


  updateMeta(field: string, value: any): void  {
    this.store.update(this.changeMeta(field, value));
  }

  resetActive(): void {
    this.store.removeActive(this.getActiveId());
  }

  private changeMeta(field: string, value: any[] | Sort[] | PaginationResponse | string | any): any {
    const meta: any = {... this.getValue()};
    switch (field) {
      case 'sort': meta.sort = value; break;
      case 'pagination': meta.pagination = value ? {...meta.pagination, ...value} : {}; break;
      case 'page': meta.pagination = {...meta.pagination, page: value || 0}; break;
      case 'text': meta.filter = {...meta.filter, text: value}; break;
      default: meta[field] = value;
    }
    return meta;
  }
}

export function getEmptyMeta(): QueryState {
  return {
    filter: null,
    sort: null,
    pagination: {
      page: 0,
      size: 10,
    }
  };
}
