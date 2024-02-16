import {throwError} from 'rxjs';
import Moment from 'moment';

export function handleError(response: any, store: any): any {
    store.setError(response.error.errorMessage);
    return throwError(response);
}

export function toMoment(date?: string | Date): Moment.Moment {
    return  date ? Moment(date) : Moment();
}
