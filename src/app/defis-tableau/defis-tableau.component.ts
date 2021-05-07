import { IndicesService } from './../services/indices.service';
import { MotsClesService } from './../services/motsCles.service';
import { BlocsTexte, Questions,Indices } from './../../generator';
import { QuestionsService } from './../services/questions.service';
import { ChamisService } from './../services/chamis.service';
import { ModifierDefisComponent } from './modifier-defis/modifier-defis.component';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { DefisService } from './../services/defis.service';
import { Chamis, Defis, MotsCles } from 'src/generator';
import { Arret } from '../services/arret';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ArretsService } from '../services/arrets.service';
import { CommunicationComposantService } from '../services/communication-composant.service';
import { BlocsTexteService } from '../services/blocsTexte.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent implements OnInit {
  private defis: Defis | null = null;
  defis$: Observable<Defis[]>;
  public pseudo: string = '';
  public chamiConnecte!: Chamis | null;
  public date = Date.now();
  public arrets$!: Observable<Arret[]>;
  private motsCles: MotsCles | null = null;
  motsCles$: Observable<MotsCles[]>;
  questions$: Observable<Questions[]>;
  bloctexte$: Observable<BlocsTexte[]>;
  indices$: Observable<Indices[]>;
  public listeChamis$!: Observable<Chamis[]>;
  public chamiConnecte$!: Observable<Chamis | null>;


  constructor(public defisService: DefisService,
              private dialog: MatDialog,
              private chamisConnecteService: CommunicationComposantService,
              private chamisService: ChamisService,
              public arretsService: ArretsService,
              private questionsService: QuestionsService,
              private motsClesService: MotsClesService,
              private blocTexteService: BlocsTexteService,
              private indicesService: IndicesService,
              private auth: AngularFireAuth
              )
  {
    this.defis$ = defisService.defis;
    this.listeChamis$ = chamisService.getListeChamis();
    this.arrets$ = arretsService.arrets;
    this.motsCles$ = motsClesService.MotsCles;
    this.questions$ = this.questionsService.getQuestions();
    this.bloctexte$ = this.blocTexteService.BlocsTexte;
    this.indices$ = this.indicesService.getIndices();

  }

  ngOnInit() {
    this.chamiConnecte$ = this.chamisConnecteService.chamisConnecte;
    this.chamiConnecte$.subscribe(chamisC => this.chamiConnecte = chamisC);
  }

  ajouterDefis(): void{
    this.chamiConnecte$.subscribe(chamisC => this.chamiConnecte = chamisC);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      auteur: this.chamiConnecte?.pseudo
    }
    dialogConfig.width = '80%';
    const dialogRef =  this.dialog.open(AjoutDefiComponent, dialogConfig);
  }

  modifierDefis(defi: Defis): void{
    this.motsCles$.pipe(map(motcles => motcles.filter(motcle => (motcle.defisId === defi.id)))).subscribe(mot => this.motsCles = mot[0]);
    if (this.chamiConnecte?.pseudo === defi.auteur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        id: defi.id,
        titre: defi.titre,
        nomType: defi.nomType,
        codeArret: defi.codeArret,
        prologue: defi.prologue,
        auteur: defi.auteur,
        points: defi.points,
        duree: defi.duree,
        motsCles: this.motsCles?.motCle,
        epilogue: defi.epilogue,
        commentaire: defi.commentaire
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
