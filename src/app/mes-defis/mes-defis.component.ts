import { MotsClesService } from './../services/motsCles.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BlocsTexte, Chamis, Defis, Indices, MotsCles, Questions } from 'src/generator';
import { CommunicationComposantService } from '../services/communication-composant.service';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { ModifierDefisComponent } from './modifier-defis/modifier-defis.component';
import { BlocsTexteService } from '../services/blocsTexte.service';
import { DefisService } from '../services/defis.service';
import { IndicesService } from '../services/indices.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-mes-defis',
  templateUrl: './mes-defis.component.html',
  styleUrls: ['./mes-defis.component.scss']
})
export class MesDefisComponent implements OnInit {

  defis$: Observable<Defis[]>;
  public chamiConnecte!: Chamis | null;
  private motsCles: MotsCles | null = null;
  private motsClesASupprimer$: Observable<MotsCles[]>;
  motsCles$: Observable<MotsCles[]>;
  questions$: Observable<Questions[]>;
  bloctexte$: Observable<BlocsTexte[]>;
  indices$: Observable<Indices[]>;
  public chamiConnecte$!: Observable<Chamis | null>;


  constructor(public defisService: DefisService,
              private dialog: MatDialog,
              private chamisConnecteService: CommunicationComposantService,
              private questionsService: QuestionsService,
              private motsClesService: MotsClesService,
              private blocTexteService: BlocsTexteService,
              private indicesService: IndicesService
              )
  {
    this.defis$ = this.defisService.defis;
    this.motsCles$ = this.motsClesService.MotsCles;
    this.questions$ = this.questionsService.getQuestions();
    this.bloctexte$ = this.blocTexteService.BlocsTexte;
    this.indices$ = this.indicesService.getIndices();
    this.motsClesASupprimer$ = this.motsClesService.MotsCles;
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
    }
  }

  supprimerDefis(defi: Defis): void {
    this.motsClesASupprimer$ = this.defisService.getMotsCles(defi);
    this.motsClesASupprimer$.pipe(map(mots => mots.map(mot => this.motsClesService.deleteMotsCles(mot))));
    this.defisService.deleteDefis(defi).subscribe(defi => console.log(defi));
  }
}
