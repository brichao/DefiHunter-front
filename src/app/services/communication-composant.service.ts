import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chamis } from 'src/generator';
import { ChamisService } from './chamis.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationComposantService {

  private listeChamis$!: Observable<Chamis[]>;

  private chamisSource = new BehaviorSubject<Chamis | null>(null);
  private emailSource = new BehaviorSubject<string | null>(null);

  chamisConnecte = this.chamisSource.asObservable();
  email = this.emailSource.asObservable();
  utilisateurConnecte: any;

  constructor(private auth: AngularFireAuth, private chamisService: ChamisService) {
    this.listeChamis$ = this.chamisService.getListeChamis();

    // Recuperer l'utilisateur connecte
    this.auth.authState
      .subscribe(uConnecte => {
        // Recuperer le chamis
        this.listeChamis$
          .subscribe(chamis => {
            for (const c of chamis) {
              if (c.email == uConnecte?.email) {
                this.setChamisConnecte(c);
              }
            }
          });
      });
   }

  setChamisConnecte(chamis: Chamis | null): void {
    this.chamisSource.next(chamis);
  }

  setMail(email: string | null) {
    this.emailSource.next(email);
  }
}
