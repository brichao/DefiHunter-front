import { ChamisService } from './../services/chamis.service';
import { UtilisateurService } from './../services/utilisateur.service';
import { ModifierDefisComponent } from './modifier-defis/modifier-defis.component';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { DefisService } from './../services/defis.service';
import { Chamis, Defis } from 'src/generator';
import { Arret } from '../services/arret';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ArretsService } from '../services/arrets.service';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent{
  private defis: Defis | null = null;
  defis$: Observable<Defis[]>;
  public pseudo: string = '';
  public chamis$!: Observable<Chamis[]>;
  public date = Date.now();
  public arrets$!: Observable<Arret[]>;

  constructor(public defisService: DefisService, private dialog : MatDialog, private connectee: UtilisateurService,
    private chamisService: ChamisService, public arretsService: ArretsService) {
    this.defis$ = defisService.defis;
    this.chamis$ = chamisService.getChamis();
    this.arrets$ = arretsService.arrets;
  }


  ajouterDefis(): void{
    let mail: string = this.connectee.getChamisEmail();
    this.chamis$.pipe(map(chamis => chamis.filter(chami => chami.email === mail))).subscribe(user => this.pseudo = user[0].pseudo );
    console.log(this.pseudo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      auteur: this.pseudo
    }
    dialogConfig.width = '80%';
    const dialogRef =  this.dialog.open(AjoutDefiComponent, dialogConfig);
  }

  modifierDefis(defi: Defis): void{
    this.defis=defi;
    let mail: string = this.connectee.getChamisEmail();
    this.chamis$.pipe(map(chamis => chamis.filter(chami => chami.email === mail))).subscribe(user => this.pseudo = user[0].pseudo);

    console.log(this.pseudo);
    if(this.pseudo === this.defis.auteur){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        id: this.defis.id,
        titre: this.defis.titre,
        nomType: this.defis.nomType,
        arret: this.defis.codeArret,
        motscles: '',
        prologue: this.defis.prologue,
        auteur: this.pseudo,
        points: this.defis.points,
        duree: this.defis.duree
      };
      dialogConfig.width = '80%';
      const dialogRefModifier = this.dialog.open(ModifierDefisComponent, dialogConfig);
    } else {
      console.log('vous ne pouvez pas modifier le defi');
    }
  }
}
