import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Chamis } from 'src/generator';
import { CommunicationComposantService } from '../services/communication-composant.service';
import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';

@Component({
  selector: 'app-mes-defis',
  templateUrl: './mes-defis.component.html',
  styleUrls: ['./mes-defis.component.scss']
})
export class MesDefisComponent implements OnInit {

  public chamiConnecte$!: Observable<Chamis | null>;
  public chamiConnecte!: Chamis | null;

  constructor(private chamisConnecteService: CommunicationComposantService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.chamiConnecte$ = this.chamisConnecteService.chamisConnecte;
  }

  ajouterDefis(): void{
    this.chamiConnecte$.subscribe(chamisC => this.chamiConnecte = chamisC);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      auteur: this.chamiConnecte?.pseudo
    }
    dialogConfig.width = '80%';
    const dialogRef =  this.dialog.open(AjoutDefiComponent, dialogConfig);
  }

}
