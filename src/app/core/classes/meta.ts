import {QueryEntity} from '@datorama/akita';
import {PaginationRequest, PaginationResponse, Sort} from '../models/responseMeta';

export interface QueryState {
  filter: string | undefined;
  cf: string | undefined;
  numProtocollo: string | undefined;
  numFattura: string | undefined;
  importo: string | undefined;
  dataDa: string | undefined;
  dataA: string | undefined;
  stato: string | undefined;
  sort: Sort | undefined;
  pagination: PaginationRequest | undefined;
  paginationResponse?: PaginationResponse;
}

export class MetaQuery<State extends QueryState, Entity> extends QueryEntity<State, Entity> {
  pagination$ = this.select('paginationResponse');
  meta$ = this.select(state => state);
  filterText$ = this.select(state => state.filter);
  sort$ = this.select('sort');

  get meta(): any {
    const meta = this.getValue();
    return {
      filter: meta.filter,
      cf: meta.cf,
      numProtocollo: meta.numProtocollo,
      numFattura: meta.numFattura,
      importo: meta.importo,
      dataDa: meta.dataDa,
      dataA: meta.dataA,
      stato: meta.stato,
      sort: meta.sort,
      page: meta.pagination.page,
      size: meta.pagination.size
    };
  }

  get queryString(): string {
    let q = '?';
    Object.entries(this.meta).forEach(values => {
      return q += values[1] || values[0] === 'page' ? values[0] + '=' + values[1] + '&' : ''
    });
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
    console.log(field);
    this.store.update(this.changeMeta(field, value));
  }

  resetActive(): void {
    this.store.removeActive(this.getActiveId());
  }

  private changeMeta(field: string, value: any[] | Sort[] | PaginationResponse | string | any): any {
    const meta: any = {... this.getValue()};
    console.log(meta, field.toString() === 'pagination');
    switch (field) {
      case 'sort': meta.sort = value; break;
      case 'pagination': meta.pagination = value ? {...meta.pagination, ...value} : {}; break;
      case 'text': meta.filter = value; break;
      case 'numProtocollo': meta.numProtocollo = value; break;
      case 'dataDa': meta.dataDa = value; break;
      case 'dataA': meta.dataA = value; break;
      case 'stato': meta.stato = value; break;
      case 'cf': meta.cf = value; break;
      case 'importo': meta.importo = value; break;
      default: meta[field] = value;
    }
    console.log(meta);
    return meta;
  }
}

export function getEmptyMeta(): QueryState {
  return {
    filter: null,
    cf: null,
    numProtocollo: null,
    numFattura: null,
    importo: null,
    dataDa: null,
    dataA: null,
    stato: null,
    sort: null,
    pagination: {
      page: 0,
      size: 5,
    }
  };
}
