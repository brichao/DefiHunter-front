import { DefisService } from './../../services/defis.service';
import { Component } from '@angular/core';
import { Defis } from 'src/generator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

export interface DialogData  {
  id: string,
  titre: string,
  nomType: string,
  arret: string,
  motscles: string,
  prologue: string,
  auteur: string,
  points: number,
  duree: string
}

@Component({
  selector: 'app-modifier-defis',
  templateUrl: './modifier-defis.component.html',
  styleUrls: ['./modifier-defis.component.scss']
})
export class ModifierDefisComponent {
  private defis: Defis | null = null;
  public arrets: any = [];

  constructor(private defiService: DefisService,
              public dialogRefModifier: MatDialogRef<ModifierDefisComponent>,
              @Inject(MAT_DIALOG_DATA) public donnees : DialogData)
  {
    this.defis={
      id: donnees.id,
      titre: donnees.titre,
      nomType: donnees.nomType,
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: donnees.auteur,
      codeArret: donnees.arret,
      points: donnees.points,
      duree: donnees.duree,
      prologue: donnees.prologue,
      epilogue: "",
      commentaire: ""}
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
      nomType : new FormControl('', [
        Validators.required
      ]),
      arret : new FormControl('', [
        Validators.required
      ]),
      motscles : new FormControl ('',[
        Validators.required
      ]),
      prologue : new FormControl ('', [
        Validators.required
      ]),
      points : new FormControl ('', [
        Validators.required
      ]),
      duree : new FormControl ('', [
        Validators.required
      ])
    })
  })

  get id(){
    return this.formDefis.get('defis.id');
  }

  get titre(){
    return this.formDefis.get('defis.titre');
  }

  get arret(){
    return this.formDefis.get('defis.arret');
  }

  get motsCles(){
    return this.formDefis.get('defis.motscles');
  }

  get prologue(){
    return this.formDefis.get('defis.prologue');
  }

  get points(){
    return this.formDefis.get('defis.points');
  }

  get duree(){
    return this.formDefis.get('defis.duree');
  }

  get nomType(){
    return this.formDefis.get('defis.nomType');
  }

  modifierDefis(){
    this.defis={
      id: this.id?.value,
      titre : this.titre?.value,
      nomType : this.nomType?.value,
      dateDeCreation: new Date(),
      dateDeModification: new Date(Date.now()),
      auteur: this.donnees.auteur,
      codeArret: this.arret?.value,
      points: this.points?.value,
      duree: this.duree?.value,
      prologue: this.prologue?.value,
      epilogue: "",
      commentaire: ''
    }
    console.log(this.defis);
    this.defiService.updateDefis(this.defis).subscribe(defi => console.log(defi));
    this.dialogRefModifier.close();
  }

  fermerModification(): void {
    this.dialogRefModifier.close();
  }
}
