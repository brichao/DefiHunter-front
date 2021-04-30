import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ChamisService } from "../services/chamis.service";
import { RegisterFormService } from '../services/register-form.service';


@Injectable({
  providedIn: 'root',
})
export class PseudoValidators {

  constructor(private service: RegisterFormService) {}

  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    else
    return null;
  }

  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
        if (RegisterFormService.pseudos.includes(control.value)) {
          resolve({ shouldBeUnique: true });
        }
        else {
          resolve(null);
        }
    });
  }
}
