export class Filter {

  constructor(text: string = null,
              filterBy: FilterOperation = null) {

    this.filter.text = text;
    this.filter.filterBy = filterBy;
  }

  get filters(): FilterOperation {
    return this.filter.filterBy;
  }

  get sorting(): Sort[] {
    return this.filter.sort;
  }

  filter: {
    text: string;
    filterBy: FilterOperation;
    sort: Sort[];
  } = {
    text: null,
    filterBy: null,
    sort: null
  };

  toString() {
    return btoa(JSON.stringify(this));
  }

  filterBy(filterBy: FilterOperation) {
    this.filter.filterBy = filterBy;

    return this;
  }

  sort(sort) {
    this.filter.sort = sort;
    return this;
  }
}

export class FilterOperation {

  filters: FilterOperation[] = [];
  options: any = null;

  constructor(
    public field: string = null,
    public operation: OperationType = null,
    public value: string | any[] | Date = null,
  ) {
  }

  where(filters: FilterOperation[]) {
    this.filters = filters;

    return this;
  }

  setOptions(options: any) {
    this.options = options;

    return this;
  }
}

export enum OperationType {
  OR = 'OR',
  LIKE = 'LIKE',
  IN = 'IN',
  LTE = 'LTE',
  GTE = 'GTE',
  AND = 'AND',
  EQ = 'EQ'
}

export class Sort {

  constructor(public field: string, public direction: SortDirection | string) {
  }
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}
