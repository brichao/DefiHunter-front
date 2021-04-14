import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'defis-tableau',
  templateUrl: './defis-tableau.component.html',
  styleUrls: ['./defis-tableau.component.scss']
})
export class DefisTableauComponent {

  // defis = Array<firebase.default.User | null>();
  defis: any;

  private dbUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(public http: HttpClient) {
    http.get(this.dbUrl, {observe: 'body', responseType: 'json'})
      .subscribe((response) => {
        this.defis = response;
      })
   }

}
