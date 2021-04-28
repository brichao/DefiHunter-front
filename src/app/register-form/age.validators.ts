import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AgeValidators {
  static isNotNumber(control: AbstractControl): ValidationErrors | null {
    if (isNaN(control.value)) {
      return { isNotNumber: true };
    }
    else {
      return null;
    }
  }

  static tooOld(control: AbstractControl): ValidationErrors | null {
    if(control.value > 150) {
      return { tooOld: true };
    }
    else {
      return null;
    }
  }

  static cannotContainDotOrComma(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf('.') >= 0 || (control.value as string).indexOf(',') >= 0) {
      return { cannotContainDotOrComma: true };
    }
    else
    return null;
  }

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    else
    return null;
  }
}
