import { Chamis } from './chamis';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChamisService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  get chamis(): Observable<Chamis[]> {
    return this.http.get<Chamis[]>(`${this.apiServerUrl}/api/chamis/`);
  }

  addChamis(chamis: Chamis) {
    console.log(chamis);
    console.log(chamis.pseudo);

    return this.http.post<Chamis>(`http://localhost:5000/api/chamis/${chamis.pseudo}`, chamis).subscribe();

  }

  updateChamis(chamis: Chamis) {
    return this.http.put<Chamis>(`${this.apiServerUrl}/api/chamis/${chamis.pseudo}`, chamis);
  }

  deleteChamis(chamis: Chamis): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/chamis/${chamis.pseudo}`);
  }



}
