import { UtilisateurService } from './../services/utilisateur.service';
import { ModifierChamisComponent } from './modifier-chamis/modifier-chamis.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChamisService } from './../services/chamis.service';
import { Chamis } from '../../generator';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  public chamis$!: Observable<Chamis[]>;
  private chami!: Chamis;
  private pseudo: string='';

  constructor(public chamisService: ChamisService, private dialogueChamis: MatDialog, private connectee: UtilisateurService) {
    this.chamis$ = chamisService.getChamis();
   }

   modifierChamis(chami: Chamis){
    this.chami = chami;
    let mail:string = this.connectee.getChamisEmail();
    this.chamis$.pipe(map(chamis => chamis.filter(chami => chami.email === mail))).subscribe(user => this.pseudo = user[0].pseudo);

    if(this.chami.pseudo===this.pseudo){
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
