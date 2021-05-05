import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefisService } from '../../services/defis.service';
import { Defis } from 'src/generator';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ajout-defi',
  templateUrl: './ajout-defi.component.html',
  styleUrls: ['./ajout-defi.component.scss']
})
export class AjoutDefiComponent implements OnInit{
  private defis: Defis | null = null;
  public arrets: any = [];
  public Larrets: any[] = [];


  constructor(private http: HttpClient, private defiService: DefisService, public dialogRef: MatDialogRef<AjoutDefiComponent>) { }


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

  get nomType(){
    return this.formDefis.get('defis.nomType');
  }

  get dateDeCreation(){
    return this.formDefis.get('defis.dateDeCreation');
  }

  get dateDeModification(){
    return this.formDefis.get('defis.dateDeModification');
  }

  get auteur(){
    return this.formDefis.get('defis.auteur');
  }

  get codeArret(){
    return this.formDefis.get('defis.codeArret');
  }

  get points(){
    return this.formDefis.get('defis.points');
  }

  get motsCles(){
    return this.formDefis.get('defis.motscles');
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


  addDefis(){
    this.defis={
      id: this.id?.value,
      titre : this.titre?.value,
      nomType : this.nomType?.value,
      dateDeCreation: this.dateDeCreation?.value,
      dateDeModification: new Date(Date.now()),
      auteur: this.auteur?.value,
      codeArret: this.arrets?.value,
      points: this.points?.value,
      duree: this.duree?.value,
      prologue: this.prologue?.value,
      epilogue: this.epilogue?.value,
      commentaire: this.commentaire?.value
    }
    this.defiService.addDefis(this.defis).subscribe(defi => console.log(defi));
    this.dialogRef.close();
  }

  fermerAjout(): void {
    this.dialogRef.close();
  }

  setNewArret(codeArret: string): void {
    this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${codeArret}`)
      .subscribe((arrets)=>{
        this.Larrets.push(arrets);
      });
  }
}
