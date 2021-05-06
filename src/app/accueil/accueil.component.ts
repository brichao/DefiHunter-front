import { DefisService } from './../services/defis.service';
import {  OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import "leaflet/dist/images/marker-shadow.png";
import { Arret } from '../services/arret';
import { Observable } from 'rxjs';
import { ArretDefis, Defis } from 'src/generator';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  dataIconGoogle = 'assets/images/iconGoogle.png';

  arretDefis: ArretDefis[];
  public lignes: any;

  constructor(private http: HttpClient, private defisServ: DefisService) {
    this.arretDefis = [];
  }

  ngOnInit(): void {
    this.getLignes();
    this.setDefisArrets();
  }


  getLignes(){
    const lien = 'https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM';
    this.http.get(lien)
      .subscribe((lignes) => {
        this.lignes = lignes;
      });
  }

  setDefisArrets(): void {
    this.defisServ.defis
      .subscribe((defis) => {
        for (const defi of defis) {
          // Pour chaque defi recupere d'apres le service de defis
          // On rajoute l'arret avec le codeArret du defi
          this.http.get(`https://data.mobilites-m.fr/api/findType/json?types=arret&codes=${defi.codeArret}`)
            .subscribe((arret) => {
              this.arretDefis.push({
                defis: defi,
                arret: arret as Arret
              })
            });

          // this.defisServ.getMotsCles(defi)
          //   .subscribe(motsCles => {
          //     let mCs = '';
          //     for (const motCle of motsCles) {
          //       mCs = mCs + (motCle.motCle) + `\n`;
          //     }
          //     defi.motsCles = mCs;
          //   })
        }
      });
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }
}
