import { CommunicationComposantService } from './../services/communication-composant.service';
import { PseudoValidators } from './pseudo.validators';
import { AgeValidators } from './age.validators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChamisService } from '../services/chamis.service';
import { Chamis } from '../../generator';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  private chamis: Chamis | null = null;
  private mailChamis: string | null = null;

  constructor(private service: ChamisService,
              private pseudoService: PseudoValidators,
              private router: Router,
              private userService: CommunicationComposantService) {}

  form = new FormGroup({
    account: new FormGroup({
      pseudo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        PseudoValidators.cannotContainSpace
      ],
        PseudoValidators.shouldBeUnique
      ),
      age: new FormControl('', [
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
    this.userService.email.subscribe(mail => this.mailChamis = mail);
    this.chamis = {
      pseudo: this.pseudo?.value,
      email: this.mailChamis!,
      age: this.age?.value,
      ville: this.ville?.value,
      description: this.description?.value,
    };
    this.userService.setChamisConnecte(this.chamis);
    this.service.addChamis(this.chamis).subscribe((chami) => console.log(chami));
    this.router.navigate([''], { state: { redirect: this.router.url } } );
  }
}
