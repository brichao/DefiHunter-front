import { PseudoValidators } from './pseudo.validators';
import { AgeValidators } from './age.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form = new FormGroup({
    account: new FormGroup({
      pseudo: new FormControl('',
        Validators.required,
        PseudoValidators.shouldBeUnique),
      age: new FormControl('', [
        Validators.required,
        AgeValidators.isNumber
      ]),
      ville: new FormControl('',
        Validators.required)
    })
  });

  get pseudo() {
    return this.form.get('account.pseudo');
  }

  get age() {
    return this.form.get('account.password');
  }

  get ville() {
    return this.form.get('account.ville');
  }

  login() {
    this.form.setErrors({
      invalidLogin: true
    })
  }
}
