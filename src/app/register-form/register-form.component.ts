import { CommunicationComposantService } from './../services/communication-composant.service';
import { PseudoValidators } from './pseudo.validators';
import { AgeValidators } from './age.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChamisService } from '../services/chamis.service';
import { Chamis } from '../services/chamis';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  private chamis: Chamis | null = null;

  constructor(private service: ChamisService,
              private pseudoService: PseudoValidators,
              private router: Router,
              private emailService: CommunicationComposantService) {}

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
          AgeValidators.cannotContainDotOrComma,
          AgeValidators.cannotContainSpace,
          AgeValidators.tooOld
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
    let mail = this.emailService.recupererMail();
    console.log(mail);
    this.chamis = {
      pseudo: this.pseudo?.value,
      email: mail!,
      age: this.age?.value,
      ville: this.ville?.value,
      description: this.description?.value,
      // defisCrees: 0
    };
    this.service.addChamis(this.chamis).subscribe((chami) => console.log(chami));
    this.router.navigate([''], { state: { redirect: this.router.url } } );
  }
}
