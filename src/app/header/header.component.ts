import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Output()
  public menuEvent = new EventEmitter<MouseEvent>();

  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  chamis$: Observable<firebase.User | null>;

  constructor(public auth: AngularFireAuth) {
    this.chamis$ = auth.authState;
  }

  handleMenuClick(event: MouseEvent): void {
    this.menuEvent.emit(event);
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

  isLoggedIn(): boolean {
    return this.chamis$ != null;
  }

  addUser(): void {
    // ...
  }
}
