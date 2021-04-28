import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AgeValidators {
  static isNumber(control: AbstractControl) : ValidationErrors | null {
    if (!Number.isInteger(control.value)) {
      return { isNotNumber: true };
    }
    else {
      return null;
    }
  }
}
