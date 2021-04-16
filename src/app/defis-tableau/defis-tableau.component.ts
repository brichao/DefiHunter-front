import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent implements OnInit {

  defis: Defis[] = [];

  constructor(public defisService: DefisService) { }

  ngOnInit() {
    this.getDefis();
  }

  getDefis() {
    this.defisService.defis
      .subscribe((response: Defis[]) => {
        this.defis = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
