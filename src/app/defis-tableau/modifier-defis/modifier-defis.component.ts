import { DefisService } from './../../services/defis.service';
import { Component, OnInit } from '@angular/core';
import { Defis } from 'src/app/services/defis';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

export interface DialogData  {
  id: string,
  titre: string,
  arret: string,
  motscles: string,
  description: string
}

@Component({
  selector: 'app-modifier-defis',
  templateUrl: './modifier-defis.component.html',
  styleUrls: ['./modifier-defis.component.scss']
})
export class ModifierDefisComponent implements OnInit {
  private defis: Defis | null = null;
  public arrets: any = [];

  constructor(private defiService: DefisService, public dialogRefModifier: MatDialogRef<ModifierDefisComponent>, @Inject(MAT_DIALOG_DATA) public donnees : DialogData) {
    this.defis={
      id: donnees.id,
      titre: donnees.titre,
      nomType: '',
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: "",
      codeArret: donnees.arret,
      points: 0,
      duree: "",
      prologue: "",
      epilogue: "",
      commentaire: donnees.description
    }
   }

  ngOnInit(): void {
    this.getArrets();
  }

  getArrets() {
    const lien = "https://data.mobilites-m.fr/api/lines/json?types=arret&reseaux=SEM";
  }

  formDefis = new FormGroup({
    defis: new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      titre : new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      arret : new FormControl('', [
        Validators.required
      ]),
      motscles : new FormControl ('',[
        Validators.required
      ]),
      description : new FormControl ('', [
        Validators.required
      ]),
    })
  })

  getId(){
    return this.formDefis.get('defis.id');
  }

  getTitre(){
    return this.formDefis.get('defis.titre');
  }

  getArret(){
    return this.formDefis.get('defis.arret');
  }

  getMotsCles(){
    return this.formDefis.get('defis.motscles');
  }

  getDescription(){
    return this.formDefis.get('defis.description');
  }

  modifierDefis(){
    this.defis={
      id: this.getId()?.value,
      titre : this.getTitre()?.value,
      nomType : "",
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: "",
      codeArret: this.getArret()?.value,
      points: 0,
      duree: "",
      prologue: "",
      epilogue: "",
      commentaire: this.getDescription()?.value
    }
    this.defiService.updateDefis(this.defis);
    this.dialogRefModifier.close();
  }

  fermerModification(): void {
    this.dialogRefModifier.close();
  }
}
