import { ChamisService } from './../services/chamis.service';
import { Chamis } from '../../generator';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationComposantService } from '../services/communication-composant.service';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent implements OnInit {

  public chamis$!: Observable<Chamis[]>;
  private chamiConnecte!: Chamis | null;

  constructor(public chamisService: ChamisService,
              private utilisateurConnecte: CommunicationComposantService)
  {
    this.chamis$ = chamisService.getListeChamis();
  }

  ngOnInit() {
    this.utilisateurConnecte.chamisConnecte.subscribe(chami => {
      this.chamiConnecte = chami;
    });
   }
}
