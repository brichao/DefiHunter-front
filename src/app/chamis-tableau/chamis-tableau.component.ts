import { ModifierChamisComponent } from './modifier-chamis/modifier-chamis.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChamisService } from './../services/chamis.service';
import { Chamis } from '../../generator';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  public chamis$!: Observable<Chamis[]>;
  private chami!: Chamis;

  constructor(public chamisService: ChamisService, private dialogueChamis: MatDialog) {
    this.chamis$ = chamisService.getChamis();
   }

   modifierChamis(chami: Chamis){
    this.chami = chami;
    const dialogueConfiguration = new MatDialogConfig();
    dialogueConfiguration.data = {
      pseudo : this.chami.pseudo,
      email : this.chami.email,
      age : this.chami.age,
      ville : this.chami.ville,
      description : this.chami.description
    }
    dialogueConfiguration.width = '80%';
    this.dialogueChamis.open(ModifierChamisComponent,dialogueConfiguration);
  }
}
