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

  constructor(private defiService: DefisService, public dialogRef: MatDialogRef<AjoutDefiComponent>) { }


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

  ngOnInit() {
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

  get arret(){
    return this.formDefis.get('defis.arret');
  }

  get motsCles(){
    return this.formDefis.get('defis.motscles');
  }

  get description(){
    return this.formDefis.get('defis.description');
  }

  addDefis(){
    this.defis={
      id: this.id?.value,
      titre : this.titre?.value,
      nomType : "",
      dateDeCreation: new Date(Date.now()),
      dateDeModification: new Date(Date.now()),
      auteur: "",
      codeArret: this.arret?.value,
      points: 0,
      duree: "",
      prologue: "",
      epilogue: "",
      commentaire: this.description?.value
    }
    this.defiService.addDefis(this.defis).subscribe(defi => console.log(defi));
    this.dialogRef.close();
  }

  fermerAjout(): void {
    this.dialogRef.close();
  }

}
