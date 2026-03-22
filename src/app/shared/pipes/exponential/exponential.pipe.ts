import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'exponential',
    standalone: false
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number): any {
    return Math.pow(value, 2);
  }

}
