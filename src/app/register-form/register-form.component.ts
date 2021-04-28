import { PseudoValidators } from './pseudo.validators';
import { AgeValidators } from './age.validators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterFormService } from '../services/register-form.service';
import { ChamisService } from '../services/chamis.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  constructor(private pseudoService: PseudoValidators) {}

  form = new FormGroup({
    account: new FormGroup({
      pseudo: new FormControl('',[
        Validators.required,
        PseudoValidators.cannotContainSpace
      ],
        PseudoValidators.shouldBeUnique
      ),
      age: new FormControl('',[
          Validators.required,
          AgeValidators.isNotNumber,
          AgeValidators.cannotContainSpace,
          AgeValidators.tooOld,
          AgeValidators.cannotContainDotOrComma
        ]
      ),
      ville: new FormControl('',
        Validators.required)
    })
  });

  get pseudo() {
    return this.form.get('account.pseudo');
  }

  get age() {
    return this.form.get('account.age');
  }

  get ville() {
    return this.form.get('account.ville');
  }

  inscription() {
    this.form.setErrors({
      invalidLogin: true
    })
  }
}
