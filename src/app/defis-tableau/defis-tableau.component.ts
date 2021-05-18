import { IndicesService } from './../services/indices.service';
import { MotsClesService } from './../services/motsCles.service';
import { BlocsTexte, Questions,Indices } from './../../generator';
import { QuestionsService } from './../services/questions.service';
import { DefisService } from './../services/defis.service';
import {  Defis, MotsCles } from 'src/generator';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlocsTexteService } from '../services/blocsTexte.service';
import { SelectionDefiComponent } from '../accueil/selection-defi/selection-defi.component';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent implements OnInit{
  defis$: Observable<Defis[]>;
  motsCles$: Observable<MotsCles[]>;
  questions$: Observable<Questions[]>;
  bloctexte$: Observable<BlocsTexte[]>;
  indices$: Observable<Indices[]>;

  constructor(public defisService: DefisService,
              private questionsService: QuestionsService,
              private motsClesService: MotsClesService,
              private blocTexteService: BlocsTexteService,
              private indicesService: IndicesService,
              private dialogue: MatDialog,
              )
  {
    this.defis$ = this.defisService.defis;
    this.motsCles$ = this.motsClesService.MotsCles;
    this.questions$ = this.questionsService.getQuestions();
    this.bloctexte$ = this.blocTexteService.BlocsTexte;
    this.indices$ = this.indicesService.getIndices();

  }

  ngOnInit(): void {}

  selectionnerDefi(defi: Defis): void {
    const dialogueConfig = new MatDialogConfig();
    dialogueConfig.width = '60%';
    dialogueConfig.data = {
      id: defi.id,
      titre: defi.titre,
      nomType: defi.nomType,
      arret: defi.codeArret,
      prologue: defi.prologue,
      auteur: defi.auteur,
      points: defi.points,
      duree: defi.duree,
      epilogue: defi.epilogue,
      commentaire: defi.commentaire
    }
    this.dialogue.open(SelectionDefiComponent, dialogueConfig);
  }

  /*libelleArret(codeArret: string): string{
    let libelle:string = '';
    this.arretService.getArret(codeArret).subscribe(arret => libelle = arret.features[0].properties.LIBELLE)
    console.log(codeArret);
    console.log(this.arretService.getArret(codeArret));
    console.log(libelle);
    return libelle;
  }*/
}
