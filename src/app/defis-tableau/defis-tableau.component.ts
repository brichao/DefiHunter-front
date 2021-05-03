import { ModifierDefisComponent } from './modifier-defis/modifier-defis.component';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent{
  private defis: Defis | null = null;
  defis$: Observable<Defis[]>;

  constructor(public defisService: DefisService, private dialog : MatDialog) {
    this.defis$ = defisService.defis;
  }

  ajouterDefis(): void{
    const dialogRef =  this.dialog.open(AjoutDefiComponent, {width: '80%'});
  }

  modifierDefis(defi: Defis): void{
    this.defis=defi;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.defis.id,
      titre: this.defis.titre,
      arret: this.defis.codeArret,
      motscles: '',
      description: this.defis.commentaire
    };
    dialogConfig.width = '80%';
    const dialogRefModifier = this.dialog.open(ModifierDefisComponent, dialogConfig);
  }
}
