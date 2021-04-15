import { Chamis } from './chamis';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChamisService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get chamis(): Observable<Chamis[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/chamis/`);
  }

  addChamis(chamis: Chamis): Observable<Chamis> {
    return this.http.post<any>(`${this.apiServerUrl}/api/chamis/${chamis.auteur}`, chamis);
  }

  updateChamis(chamis: Chamis): Observable<Chamis> {
    return this.http.put<any>(`${this.apiServerUrl}/api/chamis/${chamis.auteur}`, chamis);
  }

  deleteChamis(chamis: Chamis): Observable<void> {
    return this.http.delete<any>(`${this.apiServerUrl}/api/chamis/${chamis.auteur}`);
  }
}
