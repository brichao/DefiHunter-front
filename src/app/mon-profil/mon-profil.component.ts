import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Chamis } from 'src/generator';
import { ModifierChamisComponent } from './modifier-chamis/modifier-chamis.component';
import { ChamisService } from '../services/chamis.service';
import { CommunicationComposantService } from '../services/communication-composant.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent implements OnInit {

  public chamis$!: Observable<Chamis[]>;
  public chamiConnecte!: Chamis | null;
  public defiNombre: number = HeaderComponent.defiCree;

  constructor(public chamisService: ChamisService,
              private dialogueChamis: MatDialog,
              private utilisateurConnecte: CommunicationComposantService)
  {
    this.chamis$ = chamisService.getListeChamis();
  }

  ngOnInit() {
    this.utilisateurConnecte.chamisConnecte.subscribe(chami => {
      this.chamiConnecte = chami;
    });
   }

  modifierChamis(chami: Chamis){
    if (this.chamiConnecte?.pseudo === chami.pseudo) {
      const dialogueConfiguration = new MatDialogConfig();
      dialogueConfiguration.data = {
        pseudo : this.chamiConnecte.pseudo,
        email : this.chamiConnecte.email,
        age : this.chamiConnecte.age,
        ville : this.chamiConnecte.ville,
        description : this.chamiConnecte.description
      }
      dialogueConfiguration.width = '80%';
      this.dialogueChamis.open(ModifierChamisComponent, dialogueConfiguration);
    }
  }

}
