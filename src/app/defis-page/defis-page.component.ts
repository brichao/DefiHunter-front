import { Component, OnInit } from '@angular/core';
import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'defis-page',
  templateUrl: './defis-page.component.html',
  styleUrls: ['./defis-page.component.scss']
})
export class DefisPageComponent  {

  defis: Defis[] = [];

  constructor(public defisService: DefisService) { }



  getDefis() : void {
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
