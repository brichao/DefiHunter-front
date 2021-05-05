import { Chamis } from '../../generator';
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


  getchamis(): Observable<Chamis[]> {
    return this.http.get<Chamis[]>(`${this.apiServerUrl}/api/chamis/`);
  }

  addChamis(chamis: Chamis) : Observable<Chamis> {
    return this.http.post<Chamis>(`${this.apiServerUrl}/api/chamis/${chamis.pseudo}`, chamis);

  }

  updateChamis(chamis: Chamis) {
    return this.http.put<Chamis>(`${this.apiServerUrl}/api/chamis/${chamis.pseudo}`, chamis);
  }

  deleteChamis(chamis: Chamis){
    return this.http.delete<void>(`${this.apiServerUrl}/api/chamis/${chamis.pseudo}`).subscribe();
  }



}
