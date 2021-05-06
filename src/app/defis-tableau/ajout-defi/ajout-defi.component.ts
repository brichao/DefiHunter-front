import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefisService } from '../../services/defis.service';
import { Defis, DialogDataAjout } from 'src/generator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient} from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-ajout-defi',
  templateUrl: './ajout-defi.component.html',
  styleUrls: ['./ajout-defi.component.scss']
})
export class AjoutDefiComponent implements OnInit{
  private defis: Defis | null = null;
  public Larrets: any[] = [];
  auteur: string = '';


  constructor(private http: HttpClient, private defiService: DefisService, public dialogRef: MatDialogRef<AjoutDefiComponent>,
    @Inject(MAT_DIALOG_DATA) public donnees : DialogDataAjout) {
      this.auteur = donnees.auteur;
    }

  ngOnInit(): void {
    this.defiService.defis.subscribe((defis) => {
      for (const defi of defis) {
        this.setNewArret(defi.codeArret)
      }
    });
  }

  formDefis = new FormGroup({
    defis: new FormGroup({
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

  get nomType(){
    return this.formDefis.get('defis.nomType');
  }

  get arret(){
    return this.formDefis.get('defis.arret');
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

  addDefis(){
    console.log(this.auteur);
    this.defis={
      id: this.id?.value,
      titre : this.titre?.value,
      nomType : this.nomType?.value,
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: this.auteur,
      codeArret: this.arret?.value,
      points: this.points?.value,
      duree: this.duree?.value,
      prologue: this.prologue?.value,
      epilogue: '',
      commentaire: ''
    }
    console.log(this.defis);
    this.defiService.addDefis(this.defis).subscribe(defi => console.log(defi));
    this.dialogRef.close();
  }

  fermerAjout(): void {
    this.dialogRef.close();
  }

  setNewArret(codeArret: string): void {
    this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${codeArret}`)
      .subscribe((arrets) => {
        this.Larrets.push(arrets);
      });
  }
}
