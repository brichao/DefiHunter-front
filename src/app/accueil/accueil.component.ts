import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { Observable } from 'rxjs';
import { ArretsService } from '../services/arrets.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';
  public donnee:any = [];

  defis: Defis[] = [];

  defis$: Observable<Defis[]>;

  constructor(private http: HttpClient,
              private defisServ: DefisService,
              private arretsServ: ArretsService) {
    this.defis$ = this.defisServ.defis;
    arretsServ.arrets
      .subscribe(data => {
        console.log(data);
      })
    this.defis$
      .subscribe(defis => {
        for(let defi of defis) {
          this.defis.push(defi);
        }
      });
  }

  /*createChami(){
    let chamis:chamis ={
    }
  }*/

  ngOnInit(): void {
    this.getDonnee();
  }

  addUser() {
    //...
  }

  getDonnee(){
    const lien="https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM"
    this.http.get(lien).subscribe((lignes)=>{
      this.donnee = lignes;
    })
  }

  // getDefisarret(code: String) {
  //   this.defis$.
  //     subscribe(defis => {
  //       for(let defi of defis){
  //         this.codeArrets.push(defi.codeArret);
  //       }
  //       console.log(this.codeArrets);
  //     });
  //   this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${code}`).subscribe((arrets)=>{
  //     this.arrets = arrets;
  //     console.log(this.arrets);
  //   });
  //   return this.arrets;
  // }

  // getLngArret(code : String) : number {

  //   this.arrets = this.getDefisarret(code);
  //   console.log(this.arrets);
  //   return this.arrets.features[0]?.geometry.coordinates[0];
  // }

  // getLatArret(code : String) : number {
  //   this.arrets = this.getDefisarret(code);
  //   return this.arrets.features[0]?.geometry.coordinates[1];
  // }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }


}
