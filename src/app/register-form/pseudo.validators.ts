import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PseudoValidators {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    else
    return null;
  }

  static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((control.value as string) == ("banana")) {
          resolve({ shouldBeUnique: true });
          reject("a reason");
        }
        else {
          resolve(null);
        }
      }, 500);
    });
  }
}
