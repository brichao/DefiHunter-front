import { ChamisService } from './../services/chamis.service';
import { Chamis } from './../services/chamis';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  chamis: Chamis[] = [];

  constructor(public chamisService: ChamisService) { }

  ngOnInit() {
    this.getChamis();
  }

   getChamis() {
     this.chamisService.chamis
      .subscribe((response: Chamis[]) => {
        this.chamis = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   }
}
