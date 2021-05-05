import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arret } from './arret';

@Injectable({
  providedIn: 'root'
})
export class ArretsService {

  constructor(private http: HttpClient) { }

  get arrets(): Observable<Arret[]> {
    return this.http.get<Arret[]>('https://data.mobilites-m.fr/api/findType/json?types=arret');
  }

  getArret(a: Arret): Observable<Arret> {
    return this.http.get<Arret>(`https://data.mobilites-m.fr/api/findType/json?types=arret&code=${a.code}`);
  }
}
