import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class LogService {

  log(message: any) {
    if (!environment.production) { console.log(message); }
  }

  error(message: string) {
    if (!environment.production) {console.error(message); }
  }
}
