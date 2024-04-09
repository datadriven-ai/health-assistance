import { Pipe, PipeTransform } from '@angular/core';
import Moment from "moment";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
  standalone: true,
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return Moment(value).format('DD/MM/YYYY HH:mm')
  }
}
