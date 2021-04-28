import { Injectable } from '@angular/core';
import { ChamisService } from './chamis.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  static _pseudos: Array<string> = [];

  constructor(service: ChamisService) {
    service.chamis
      .subscribe((chamis) => {
        chamis.forEach(c => {
          RegisterFormService._pseudos.push(c.pseudo);
        });
      });
  }

  static get pseudos(): Array<string> {
    return RegisterFormService._pseudos;
  }
}
