import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private chamisEmail = '';
  // private utilisateurSource = new BehaviorSubject<Chamis | null>(null);
  // utilisateur!: any;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState
      .subscribe(chamis => {
        if (chamis) {
          this.chamisEmail = chamis?.email as string;
          console.log(this.chamisEmail);
        }
      });
  }

  getChamisEmail(): string{
    return this.chamisEmail;
  }
}
