import { AjoutDefiComponent } from './ajout-defi/ajout-defi.component';
import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent{

  defis$: Observable<Defis[]>;

  constructor(public defisService: DefisService, private dialog : MatDialog) {
    this.defis$ = defisService.defis;
  }

  openAjout(){
    const dialogRef =  this.dialog.open(AjoutDefiComponent, {width: '80%'});
  }

  /*openModification(){
    const dialogRef2 = this.dialog.open(, { width : '80%' };)
  }*/
}
