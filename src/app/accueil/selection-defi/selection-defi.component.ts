import { PointsVisiteComponent } from './points-visite/points-visite.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BlocsTexte, DialogDataDefis, Indices, Questions } from './../../../generator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Defis } from 'src/generator';
import { Observable } from 'rxjs';
import { BlocsTexteService } from 'src/app/services/blocsTexte.service';
import { IndicesService } from 'src/app/services/indices.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-selection-defi',
  templateUrl: './selection-defi.component.html',
  styleUrls: ['./selection-defi.component.scss']
})
export class SelectionDefiComponent {

  private defi: Defis | null = null;
  questions$: Observable<Questions[]>;
  bloctexte$: Observable<BlocsTexte[]>;
  indices$: Observable<Indices[]>;
  points: number = 0;
  indiceOuvert = false;

  constructor(public dialogRefModifier: MatDialogRef<SelectionDefiComponent>,
             @Inject(MAT_DIALOG_DATA) public donnees: DialogDataDefis,
              private questionsService: QuestionsService,
              private blocTexteService: BlocsTexteService,
              private indicesService: IndicesService,
              private dialoguePoints: MatDialog) {
    this.defi = {
      id: donnees.id,
      titre: donnees.titre,
      nomType: donnees.nomType,
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: donnees.auteur,
      codeArret: donnees.codeArret,
      points: donnees.points,
      duree: donnees.duree,
      prologue: donnees.prologue,
      epilogue: donnees.epilogue,
      commentaire: donnees.commentaire
    }
    this.questions$ = this.questionsService.getQuestions();
    this.bloctexte$ = this.blocTexteService.BlocsTexte;
    this.indices$ = this.indicesService.getIndices();
   }

   formeVisite = new FormGroup({
     visite: new FormGroup({
       question: new FormControl('')
     })
   })

   get question(){
     return this.formeVisite.get('visite.question');
   }

   ajouterVisite(){

    //Calcul points a faire

     const dialogueConfig = new MatDialogConfig();
     dialogueConfig.data = {
       points: this.points
     }
     dialogueConfig.width = '40%';
     this.dialoguePoints.open(PointsVisiteComponent, dialogueConfig)
    this.dialogRefModifier.close();
   }

   ouvert(indice: Indices): void{
     if(this.indiceOuvert=false){
       this.indiceOuvert=true;
       this.points = this.points - indice.points;
     }
   }

  fermerDialogue(): void{
    this.dialogRefModifier.close();
  }

}
