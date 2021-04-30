import {  OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import firebase from 'firebase';
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
  public donnee:any = []


  chamis$: Observable<firebase.User | null>;

  constructor(public auth: AngularFireAuth, private http: HttpClient) {
    this.chamis$ = auth.authState;
  }

  /*createChami(){
    let chamis:chamis ={

    }
  }*/

  ngOnInit(): void {
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
