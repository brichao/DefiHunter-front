import { ChamisService } from './../../services/chamis.service';
import { Component, Inject } from '@angular/core';
import { Chamis, DialogData } from 'src/generator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgeValidators } from 'src/app/register-form/age.validators';
import { CommunicationComposantService } from 'src/app/services/communication-composant.service';

@Component({
  selector: 'app-modifier-chamis',
  templateUrl: './modifier-chamis.component.html',
  styleUrls: ['./modifier-chamis.component.scss']
})
export class ModifierChamisComponent {

  private chamis: Chamis | null = null;

  constructor(private chamiService: ChamisService,
              private utilisateurConnecte: CommunicationComposantService,
              public dialogRefModifier: MatDialogRef<ModifierChamisComponent>,
              @Inject (MAT_DIALOG_DATA) public donnees : DialogData)
  {
    this.chamis={
      pseudo: donnees.pseudo,
      email: donnees.email,
      age: donnees.age,
      ville: donnees.ville,
      description: donnees.description
    }
  }

  formChamis = new FormGroup({
    chamis: new FormGroup({
      pseudo: new FormControl(''),
      email : new FormControl(''),
      age : new FormControl('', [
        Validators.required,
        AgeValidators.isNotNumber,
        AgeValidators.cannotContainSpace,
        AgeValidators.tooOld,
        AgeValidators.cannotContainDotOrComma
      ]),
      ville : new FormControl ('',[
        Validators.required
      ]),
      description : new FormControl ('', [
        Validators.required,
        Validators.maxLength(380)
      ]),
    })
  })

  get pseudo(){
    return this.formChamis.get('chamis.pseudo');
  }

  get email(){
    return this.formChamis.get('chamis.email');
  }

  get age(){
    return this.formChamis.get('chamis.age');
  }

  get ville(){
    return this.formChamis.get('chamis.ville');
  }

  get description(){
    return this.formChamis.get('chamis.description');
  }

  modifierChamis(){
    this.chamis={
      pseudo: this.pseudo?.value,
      email: this.email?.value,
      age: this.age?.value,
      ville: this.ville?.value,
      description: this.description?.value
    }
    this.utilisateurConnecte.setChamisConnecte(this.chamis);
    this.chamiService.updateChamis(this.chamis).subscribe(chami => console.log(chami));
    this.dialogRefModifier.close();
  }

  fermerModification(): void {
    this.dialogRefModifier.close();
  }
}
