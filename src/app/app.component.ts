import { CarteService } from './services/carte.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { FeatureCollection, MultiLineString, LineString, Polygon, Point} from 'geojson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;
  private geoJsonMap: Map<string, Promise<FeatureCollection<LineString | Polygon | Point>>> = new Map();
  public donnee:any = []

  chamis$: Observable<firebase.User | null>;


  constructor(public auth: AngularFireAuth, private http: HttpClient) {
    this.chamis$ = auth.authState;
  }

  ngOnInit() {
    this.getDonnee();
  }

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
  }

  logout(): void {
    this.auth.signOut();
  }

  isLoggedIn() {
    return this.chamis$ != null;
  }

  addUser() {
    //...
  }

 /* public getFeatureCollection(path: string): Promise<FeatureCollection<LineString | Polygon | Point>>{
    const promise = this.http.get('/assets/geojson/' + path).toPromise() as Promise<FeatureCollection<LineString | Polygon | Point>>;
    this.geoJsonMap.set(path, promise);
    return promise;
  }*/

  getDonnee(){
    const lien="https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM"
    this.http.get(lien).subscribe((lignes)=>{
      this.donnee = lignes;

      console.log(this.donnee);
      console.log(this.donnee.features[0].properties.COULEUR);
    })
  }

  couleur(colorRGB: any): string {
    return `rgb( ${colorRGB} )`;
}

}
