import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';
  public donnee:any = []

  constructor(private http: HttpClient) {
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

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }


}
