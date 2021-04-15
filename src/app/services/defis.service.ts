import { environment } from './../../environments/environment.prod';
import { Defis } from './defis';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefisService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get defis(): Observable<Defis[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/defis/`);
  }

  addDefis(defis: Defis): Observable<Defis> {
    return this.http.post<any>(`${this.apiServerUrl}/api/defis/${defis.id}`, defis);
  }

  updateDefis(defis: Defis): Observable<Defis> {
    return this.http.put<any>(`${this.apiServerUrl}/api/defis/${defis.id}`, defis);
  }

  deleteDefis(defis: Defis): Observable<void> {
    return this.http.delete<any>(`${this.apiServerUrl}/api/defis/${defis.id}`);
  }
}
