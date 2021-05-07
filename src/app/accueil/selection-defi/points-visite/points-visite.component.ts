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
  defiId: string = "";
  visiteur: string = "";

  constructor(public dialogRefModifier: MatDialogRef<PointsVisiteComponent>,
              private chamisConnecteService: CommunicationComposantService,
              @Inject(MAT_DIALOG_DATA) public donnees: DialogDataPoints) {

                this.points = donnees.points;
                this.epilogue = donnees.epilogue;
                this.defiId = donnees.defiId;
                this.visiteur = donnees.visiteur;
  }

  ngOnInit(): void {
    this.chamisConnecteService.chamisConnecte.subscribe(chamis => this.chamisConnecte = chamis);
  }

  formFinal = new FormGroup({
    visite: new FormGroup({
      commentaire: new FormControl(''),
      notation: new FormControl(''),
      duree: new FormControl('')
    })
  })

  get commentaire(){
    return this.formFinal.get('visite.commentaire');
  }

  get notation(){
    return this.formFinal.get('visite.notation');
  }

  get duree(){
    return this.formFinal.get('visite.duree');
  }

  fermerDialogue(): void{
    AccueilComponent.visiteId += 1;
    let visiteid: number = AccueilComponent.visiteId;
    this.visite = {
      visiteId: visiteid.toString(),
      defisId: this.defiId,
      visiteur: this.chamisConnecte?.pseudo,
      dateDeVisite: new Date(),
      modeDP: "",
      notation: this.notation?.value,
      score: this.points,
      temps: this.duree?.value,
      status: "",
      commentaire: this.commentaire?.value
    }
    console.log(this.visite);
    this.dialogRefModifier.close();
  }

}
