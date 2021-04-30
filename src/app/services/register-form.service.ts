import { Injectable } from '@angular/core';
import { ChamisService } from './chamis.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

  static _pseudos: Array<string> = [];
  static _emails: Array<string> = [];

  constructor(service: ChamisService) {
    service.chamis
      .subscribe((chamis) => {
        chamis.forEach(c => {
          RegisterFormService._pseudos.push(c.pseudo);
          RegisterFormService._emails.push(c.email);
        });
      });
  }

  static get pseudos(): Array<string> {
    return RegisterFormService._pseudos;
  }

  static get emails(): Array<string> {
    return RegisterFormService._emails;
  }
}
