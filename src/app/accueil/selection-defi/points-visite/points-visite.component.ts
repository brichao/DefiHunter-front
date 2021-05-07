import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataPoints } from 'src/generator';

@Component({
  selector: 'app-points-visite',
  templateUrl: './points-visite.component.html',
  styleUrls: ['./points-visite.component.scss']
})
export class PointsVisiteComponent implements OnInit {

  points: number = 0;

  constructor(public dialogRefModifier: MatDialogRef<PointsVisiteComponent>,
              @Inject(MAT_DIALOG_DATA) public donnees: DialogDataPoints) {

                this.points = donnees.points;
  }

  ngOnInit(): void {
  }

  fermerDialogue(): void{
    this.dialogRefModifier.close();
  }

}
