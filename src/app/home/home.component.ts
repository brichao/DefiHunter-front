import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { RawResult } from 'leaflet-geosearch/dist/providers/bingProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  provider = new OpenStreetMapProvider();

  lienDonne = "https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM";
  donnee$: Observable<any[]>;
  donnee: any = [];

  constructor(private http: HttpClient) {
    this.donnee$ = http.get(this.lienDonne) as Observable<any[]>;
  }

  async getResults(query: HTMLInputElement) {
    const results = await this.provider.search({ query: query.value});
    if (results.length > 0) {
      return(results[0]);
    }
    return null;
    // results.forEach(r => {
    //   this.log(r.label + ":");
    //   this.log(r.x);
    //   this.log(r.y);
    // });
  }

  ngOnInit(): void {
    this.getDonnee();
  }

  getDonnee(){
    this.http.get(this.lienDonne).subscribe((lignes)=>{
      this.donnee = lignes;

      console.log(this.donnee);
      console.log(this.donnee.features[0].properties.COULEUR);
    })
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
  }
}
