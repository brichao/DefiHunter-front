import { ModifierChamisComponent } from './modifier-chamis/modifier-chamis.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChamisService } from './../services/chamis.service';
import { Chamis } from './../services/chamis';
import { Component } from '@angular/core';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  public chamis!: Chamis[];
  private chami!: Chamis;

  constructor(public chamisService: ChamisService, private dialogueChamis: MatDialog) {
    chamisService.getchamis().subscribe(chamis => this.chamis = chamis);
   }

   modifierChamis(chami: Chamis){
    this.chami=chami;
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
