import { ChamisService } from './../services/chamis.service';
import { Chamis } from './../services/chamis';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  chamis$: Observable<Chamis[]>;

  constructor(public chamisService: ChamisService) {
    this.chamis$ = chamisService.getchamis();
   }
}
