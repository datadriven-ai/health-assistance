import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class LogService {

  log(message: any) {
    if (!environment.production) { console.log(message); }
  }

  error(message: string) {
    if (!environment.production) {console.error(message); }
  }
}
