import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chamis-tableau',
  templateUrl: './chamis-tableau.component.html',
  styleUrls: ['./chamis-tableau.component.scss']
})
export class ChamisTableauComponent {

  listeChamis: any;

  private dbUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(public http: HttpClient) {
    http.get(this.dbUrl, {observe: 'body', responseType: 'json'})
      .subscribe((response) => {
        this.listeChamis = response;
      })
   }

}
