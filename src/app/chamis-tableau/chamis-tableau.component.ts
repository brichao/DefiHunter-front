import { UtilisateurService } from './../services/utilisateur.service';
import { ModifierChamisComponent } from './modifier-chamis/modifier-chamis.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChamisService } from './../services/chamis.service';
import { Chamis } from '../../generator';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunicationComposantService } from '../services/communication-composant.service';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent implements OnInit {

  public chamis$!: Observable<Chamis[]>;
  private chami!: Chamis | null;

  constructor(public chamisService: ChamisService,
              private dialogueChamis: MatDialog,
              private utilisateurConnecte: CommunicationComposantService)
  {
    this.chamis$ = chamisService.getChamis();
  }

  ngOnInit() {
    this.utilisateurConnecte.chamisConnecte.subscribe(chami => {
      this.chami = chami;
      console.log(chami);
    });
   }

  modifierChamis(chami: Chamis){
    console.log(this.chami);
    if (this.chami?.pseudo === chami.pseudo) {
      const dialogueConfiguration = new MatDialogConfig();
      dialogueConfiguration.data = {
        pseudo : this.chami.pseudo,
        email : this.chami.email,
        age : this.chami.age,
        ville : this.chami.ville,
        description : this.chami.description
      }
      dialogueConfiguration.width = '80%';
      this.dialogueChamis.open(ModifierChamisComponent, dialogueConfiguration);
    } else {
      console.log('tu peux pas changer le chami')
    }
  }
}
