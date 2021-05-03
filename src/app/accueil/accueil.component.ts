import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ErrorHandler } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, ErrorHandler {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';

  private lienLignes="https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM";
  lignes$: any;

  constructor(private http: HttpClient) {
    this.lignes$ = http.get(this.lienLignes, {observe: 'body', responseType: 'json'});
    console.log(this.lignes$);
  }

  handleError(error: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.getDonnee();
  }

  async getDonnee(){
    // const lien="https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM"
    // this.lignes = this.http.get(lien, {observe: 'body', responseType: 'json'})
    //   .subscribe((lignes)=>{
    //     this.lignes = lignes;
    //     console.log(lignes);
    //   });
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }
}
