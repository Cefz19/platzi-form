import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '../core/services/categories.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /\d/.test(value);

    return !hasNumber ? { invalid_password: true } : null;
    // if(!contrainNumber(value)){
    //   return {invalid_password: true}
    // }
    // return null;
  }
  static matchPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      return null;
    }
    return { match_password: true };
  }

  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkCategory(value)
      .pipe(
        map((response: any )=> {
          const isAvailable = response.isAvailable;
          if(!isAvailable) {
            return {not_available: true}
          }
          return null;
        }),
          catchError(() => of(null)) 
      );
    }
  }
}

// function contrainNumber(value: string){
//   return value.split('').find(v => isNumber(v) !== undefined);
// }

// function isNumber(value: string){
//   return !isNaN(parseInt(value, 10));
// }
