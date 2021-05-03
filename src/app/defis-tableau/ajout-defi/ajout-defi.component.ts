import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefisService } from '../../services/defis.service';
import { Defis } from '../../services/defis';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajout-defi',
  templateUrl: './ajout-defi.component.html',
  styleUrls: ['./ajout-defi.component.scss']
})
export class AjoutDefiComponent implements OnInit{
  private defis: Defis | null = null;
  public arrets: any = [];

  constructor(private defiService : DefisService, public dialogRef: MatDialogRef<AjoutDefiComponent>) { }

  ngOnInit() {
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

  addDefis(){
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
    this.defiService.addDefis(this.defis);
    this.dialogRef.close();
  }

  fermerAjout(): void {
    this.dialogRef.close();
  }

}
