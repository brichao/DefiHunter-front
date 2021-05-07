import { DialogDataDefis } from './../../../generator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Defis } from 'src/generator';

@Component({
  selector: 'app-selection-defi',
  templateUrl: './selection-defi.component.html',
  styleUrls: ['./selection-defi.component.scss']
})
export class SelectionDefiComponent {

  private defi: Defis | null = null;

  constructor(public dialogRefModifier: MatDialogRef<SelectionDefiComponent>, @Inject(MAT_DIALOG_DATA) public donnees: DialogDataDefis) {
    this.defi = {
      id: donnees.id,
      titre: donnees.titre,
      nomType: donnees.nomType,
      dateDeCreation: new Date(),
      dateDeModification: new Date(),
      auteur: donnees.auteur,
      codeArret: donnees.codeArret,
      points: donnees.points,
      duree: donnees.duree,
      prologue: donnees.prologue,
      epilogue: donnees.epilogue,
      commentaire: donnees.commentaire
    }
   }

  fermerDialogue(): void{
    this.dialogRefModifier.close();
  }

}
