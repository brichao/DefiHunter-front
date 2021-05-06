import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private chamisEmail = '';

  constructor(private auth: AngularFireAuth) {
    this.auth.authState
      .subscribe(chamis => {
        if (chamis) {
          this.chamisEmail = chamis?.email as string;
        }
      });
  }

  getChamisEmail(): string{
    return this.chamisEmail;
  }
}
