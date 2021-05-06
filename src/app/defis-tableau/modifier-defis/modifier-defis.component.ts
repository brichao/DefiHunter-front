import { DefisService } from './../../services/defis.service';
import { Component, OnInit } from '@angular/core';
import { Defis } from 'src/generator';
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

  constructor(private defiService: DefisService,
              public dialogRefModifier: MatDialogRef<ModifierDefisComponent>,
              @Inject(MAT_DIALOG_DATA) public donnees : DialogData)
  {
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

  ngOnInit(): void {
    this.getArrets();
  }

  getArrets() {
    const lien = "https://data.mobilites-m.fr/api/lines/json?types=arret&reseaux=SEM";
  }

  get id(){
    return this.formDefis.get('defis.id');
  }

  get titre(){
    return this.formDefis.get('defis.titre');
  }

  get nomType(){
    return this.formDefis.get('defis.nomtype');
  }

  get dateDeCreation(){
    return this.formDefis.get('defis.datedecreation');
  }

  get auteur(){
    return this.formDefis.get('defis.auteur');
  }

  get arret(){
    return this.formDefis.get('defis.codearret');
  }

  get points(){
    return this.formDefis.get('defis.points');
  }

  get duree(){
    return this.formDefis.get('defis.duree');
  }

  get prologue(){
    return this.formDefis.get('defis.prologue');
  }

  get epilogue(){
    return this.formDefis.get('defis.epilogue');
  }

  get commentaire(){
    return this.formDefis.get('defis.commentaire');
  }


  modifierDefis(){
    this.defis={
      id: this.id?.value,
      titre : this.titre?.value,
      nomType : this.nomType?.value,
      dateDeCreation: this.dateDeCreation?.value,
      dateDeModification: new Date(Date.now()),
      auteur: this.auteur?.value,
      codeArret: this.arret?.value,
      points: this.points?.value,
      duree: this.duree?.value,
      prologue: this.prologue?.value,
      epilogue: this.epilogue?.value,
      commentaire: this.commentaire?.value
    }
    this.defiService.updateDefis(this.defis).subscribe(defi => console.log(defi));
    this.dialogRefModifier.close();
  }

  fermerModification(): void {
    this.dialogRefModifier.close();
  }
}
