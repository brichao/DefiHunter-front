import { HeaderComponent } from './../../header/header.component';
import { MotsClesService } from './../../services/motsCles.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefisService } from '../../services/defis.service';
import { Defis, DialogDataAjout, MotsCles } from 'src/generator';
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
  private motsCles: MotsCles | null = null;


  constructor(private http: HttpClient, private defiService: DefisService, public dialogRef: MatDialogRef<AjoutDefiComponent>,
    @Inject(MAT_DIALOG_DATA) public donnees : DialogDataAjout, private motsClesService: MotsClesService) {
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
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
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
      points : new FormControl ('', [
        Validators.required
      ]),
      duree : new FormControl ('', [
        Validators.required
      ]),
      prologue : new FormControl(''),
      epilogue : new FormControl(''),
      commentaire : new FormControl('')
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

  get motscles(){
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
    console.log(this.auteur);
    this.defis= {
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
      epilogue: this.epilogue?.value,
      commentaire: this.commentaire?.value
    }
    this.motsCles= {
      defisId: this.id?.value,
      motCle: this.motscles?.value
    }
    this.defiService.addDefis(this!.defis).subscribe(defi => console.log(defi));
    this.motsClesService.addMotsCles(this!.motsCles).subscribe(motcles => console.log(motcles));
    HeaderComponent.defiCree += 1;
    this.dialogRef.close();
  }

  fermerAjout(): void {
    this.dialogRef.close();
  }

  setNewArret(codeArret: string): void {
    this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${codeArret}`)
      .subscribe((arrets) => {
        if(!this.Larrets.includes(arrets))
          this.Larrets.push(arrets);
      });
  }
}
