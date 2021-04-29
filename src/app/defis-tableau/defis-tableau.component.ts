import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent {

  defis$: Observable<Defis[]>;

  constructor(public defisService: DefisService) {
    this.defis$ = defisService.defis;
  }
}
