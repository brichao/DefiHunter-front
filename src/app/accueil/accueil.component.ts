import { Observable } from 'rxjs';
import { DefisService } from './../services/defis.service';
import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import "leaflet/dist/images/marker-shadow.png";
import { Arret, Defis } from 'src/generator';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';
  public lignes: any;
  public arrets: Arret[] = [];
  public defis: Defis[] = [];

  constructor(private http: HttpClient, private defisServ: DefisService) { }

  ngOnInit(): void {
    this.getDonnee();
    this.setDefis();
  }

  getDonnee(){
    this.http.get('https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM')
      .subscribe((lignes) => {
        this.lignes = lignes;
      });
  }

  setDefis(): void {
    this.defisServ.defis
      .subscribe((defis) => {
        this.defis = defis;
        for (const defi of this.defis) {
          // Pour chaque defi recupere d'apres le service de defis
          // On rajoute l'arret avec le codeArret du defi
          this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${defi.codeArret}`)
            .subscribe((arret) => {
              defi.arret = (arret as Arret);
            });

          this.defisServ.getMotsCles(defi)
            .subscribe(motsCles => {
              let mCs = '';
              for (const motCle of motsCles) {
                mCs = mCs + (motCle.motCle) + `\n`;
              }
              defi.motsCles = mCs;
            })
        }
      });
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }
}
