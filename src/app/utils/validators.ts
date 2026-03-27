import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }
  

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if(!value) return null;

    const hasNumber = /\d/.test(value);

    return !hasNumber ? {invalid_password: true} : null;
    // if(!contrainNumber(value)){
    //   return {invalid_password: true}
    // }
    // return null;
  }
  static matchPassword(control: AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(password === confirmPassword){
      return null;
    }
    return {match_password: true};
  }
}

// function contrainNumber(value: string){
//   return value.split('').find(v => isNumber(v) !== undefined);
// }

// function isNumber(value: string){
//   return !isNaN(parseInt(value, 10));
// }
