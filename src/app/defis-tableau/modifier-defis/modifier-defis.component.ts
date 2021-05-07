import { MotsClesService } from './../../services/motsCles.service';
import { MotsCles } from './../../../generator';
import { HttpClient } from '@angular/common/http';
import { DefisService } from './../../services/defis.service';
import { Component, OnInit } from '@angular/core';
import { Defis, DialogDataDefis } from 'src/generator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modifier-defis',
  templateUrl: './modifier-defis.component.html',
  styleUrls: ['./modifier-defis.component.scss']
})
export class ModifierDefisComponent implements OnInit{
  private defis: Defis | null = null;
  public Larrets: any[] = [];
  private motsCles: MotsCles | null = null;

  constructor(private defiService: DefisService,
              public dialogRefModifier: MatDialogRef<ModifierDefisComponent>,
              @Inject(MAT_DIALOG_DATA) public donnees : DialogDataDefis,
              private http: HttpClient, private motsClesService: MotsClesService){
    this.defis = {
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
      commentaire: ""
    }
    this.motsCles = {
      defisId: donnees.id,
      motCle: donnees.motsCles
    }
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

  get motscles(){
    return this.formDefis.get('defis.motscles');
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
      epilogue: this.epilogue?.value,
      commentaire: this.commentaire?.value
    }
    this.motsCles= {
      defisId: this.id?.value,
      motCle: this.motscles?.value
    }
    console.log(this.defis);
    this.defiService.updateDefis(this.defis).subscribe(defi => console.log(defi));
    this.motsClesService.updateMotsCles(this.motsCles).subscribe(motscle => console.log(motscle));
    this.dialogRefModifier.close();
  }

  fermerModification(): void {
    this.dialogRefModifier.close();
  }

  setNewArret(codeArret: string): void {
    this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${codeArret}`)
      .subscribe((arrets) => {
        this.Larrets.push(arrets);
      });
  }
}
