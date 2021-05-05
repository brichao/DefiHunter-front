import { Arret } from './../services/arret';
import { DefisService } from './../services/defis.service';
import { Defis } from './../services/defis';
import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';
  public donnee: any;
  public arrets: any[] = [];

  constructor(private http: HttpClient, private defisServ: DefisService) {
    this.defisServ.defis
      .subscribe( (defis) => {
        for(const defi of defis){
          this.setArret(defi.codeArret);
        }
      });
  }

  ngOnInit(): void {
    this.getDonnee();
  }


  getDonnee(){
    const lien = 'https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM';
    this.http.get(lien)
      .subscribe((lignes)=>{
        this.donnee = lignes;
      });
  }

  setArret(codeArret: string): void {
    this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${codeArret}`)
      .subscribe((arrets)=>{
        this.arrets.push(arrets);
      });
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }
}
