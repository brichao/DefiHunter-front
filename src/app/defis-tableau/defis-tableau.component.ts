import { Questions } from './../../generator';
import { QuestionsService } from './../services/questions.service';
import { ChamisService } from './../services/chamis.service';
import { UtilisateurService } from './../services/utilisateur.service';
import { ModifierDefisComponent } from './modifier-defis/modifier-defis.component';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { DefisService } from './../services/defis.service';
import { Chamis, Defis } from 'src/generator';
import { Arret } from '../services/arret';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ArretsService } from '../services/arrets.service';
import { CommunicationComposantService } from '../services/communication-composant.service';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent implements OnInit {
  private defis: Defis | null = null;
  defis$: Observable<Defis[]>;
  public pseudo: string = '';
  public chamis$!: Observable<Chamis[]>;
  public chamiConnecte!: Chamis | null;
  public date = Date.now();
  public arrets$!: Observable<Arret[]>;

  constructor(public defisService: DefisService,
              private dialog: MatDialog,
              private chamisConnecteService: CommunicationComposantService,
              private chamisService: ChamisService,
              public arretsService: ArretsService,
              private questionsService: QuestionsService)
  {
    this.defis$ = defisService.defis;
    this.chamis$ = chamisService.getListeChamis();
    this.arrets$ = arretsService.arrets;
  }

  ngOnInit() {
    this.chamisConnecteService.chamisConnecte.subscribe(chamisC => this.chamiConnecte = chamisC);
  }


  ajouterDefis(): void{
    console.log(this.chamiConnecte);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      auteur: this.chamiConnecte?.pseudo
    }
    dialogConfig.width = '80%';
    const dialogRef =  this.dialog.open(AjoutDefiComponent, dialogConfig);
  }

  modifierDefis(defi: Defis): void{
    console.log(this.chamiConnecte?.pseudo);
    if (this.chamiConnecte?.pseudo === defi.auteur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        id: defi.id,
        titre: defi.titre,
        nomType: defi.nomType,
        arret: defi.codeArret,
        motscles: '',
        prologue: defi.prologue,
        auteur: defi.auteur,
        points: defi.points,
        duree: defi.duree
      };
      dialogConfig.width = '80%';
      const dialogRefModifier = this.dialog.open(ModifierDefisComponent, dialogConfig);
    } else {
      console.log('vous ne pouvez pas modifier le defi');
    }
  }

  // QuestionDefis(defi: Defis,  question: Questions){
  //   this.questionsService.getQuestions(defi, question).subscribe( (question) => console.log(question));

  // }
}
