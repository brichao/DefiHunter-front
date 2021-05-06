import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chamis } from 'src/generator';

@Injectable({
  providedIn: 'root'
})
export class CommunicationComposantService {

  private chamisSource = new BehaviorSubject<Chamis | null>(null);
  private emailSource = new BehaviorSubject<string | null>(null);
  chamisConnecte = this.chamisSource.asObservable();
  email = this.emailSource.asObservable();

  constructor() { }

  setChamisConnecte(chamis: Chamis | null): void {
    this.chamisSource.next(chamis);
  }

  setMail(email: string | null) {
    this.emailSource.next(email);
  }
}
