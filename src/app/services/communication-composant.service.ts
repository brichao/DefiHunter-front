import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationComposantService {

  private email: string | null = '';

  constructor() { }

  envoieMail(email: string | null): void{
    this.email = email;
  }

  recupererMail(): string | null{
    return this.email;
  }
}
