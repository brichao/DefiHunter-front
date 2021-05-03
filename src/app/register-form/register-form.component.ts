import { PseudoValidators } from './pseudo.validators';
import { AgeValidators } from './age.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterFormService } from '../services/register-form.service';
import { ChamisService } from '../services/chamis.service';
import { Chamis } from '../services/chamis';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  private chamis: Chamis | null = null;

  constructor(private service: ChamisService, private pseudoService: PseudoValidators) {}

  form = new FormGroup({
    account: new FormGroup({
      pseudo: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
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
        Validators.required
      ),
      description: new FormControl('',)
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

  get description() {
    return this.form.get('account.description');
  }

  inscription() {
    this.chamis = {
      pseudo: this.pseudo?.value,
      email: "",
      age: this.age?.value,
      ville: this.ville?.value,
      description: this.description?.value,
      // defisCrees: 0
    };
    this.service.addChamis(this.chamis).subscribe((chami) => console.log(chami));
  }
}
