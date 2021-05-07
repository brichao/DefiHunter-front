import { VisitesService } from './../../../services/visites.service';
import { AccueilComponent } from './../../accueil.component';
import { Chamis, Visites } from './../../../../generator';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataPoints } from 'src/generator';
import { CommunicationComposantService } from 'src/app/services/communication-composant.service';

@Component({
  selector: 'app-points-visite',
  templateUrl: './points-visite.component.html',
  styleUrls: ['./points-visite.component.scss']
})
export class PointsVisiteComponent implements OnInit {

  points: number = 0;
  chamisConnecte!: Chamis | null;
  visite: Visites | null = null;
  epilogue: string = "";
  defiId: string = '';
  notations: number = 0;

  constructor(public dialogRefModifier: MatDialogRef<PointsVisiteComponent>,
              private chamisConnecteService: CommunicationComposantService,
              @Inject(MAT_DIALOG_DATA) public donnees: DialogDataPoints,
              private visiteService: VisitesService) {
                this.points = donnees.points;
                this.epilogue = donnees.epilogue;
                this.defiId = donnees.defiId;
  }

  ngOnInit(): void {
    this.chamisConnecteService.chamisConnecte.subscribe(chamis => this.chamisConnecte = chamis);
  }

  formFinal = new FormGroup({
    visite: new FormGroup({
      commentaire: new FormControl(''),
      duree: new FormControl('')
    })
  })

  get commentaire(){
    return this.formFinal.get('visite.commentaire');
  }

  get duree(){
    return this.formFinal.get('visite.duree');
  }

  fermerDialogue(): void{
    let nomVisite = this.defiId.slice(1);
    AccueilComponent.visiteId += 1;
    let visiteid: number = AccueilComponent.visiteId;
    nomVisite = "V" + nomVisite + "-" + visiteid;
    let temps: number = parseInt(this.duree?.value);
    this.visite = {
      visiteId: nomVisite,
      defisId: this.donnees.defiId,
      visiteur: this.chamisConnecte?.pseudo,
      dateVisite: new Date(),
      modeDP: this.donnees.modeDP,
      notation: this.notations,
      score: this.donnees.points,
      temps: temps,
      status: "completed",
      commentaire: this.commentaire?.value
    }
    console.log(this.visite);
    this.visiteService.addVisites(this.visite).subscribe(visite => console.log(visite));
    this.dialogRefModifier.close();
  }

}
