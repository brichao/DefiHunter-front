import { environment } from './../../environments/environment.prod';
import { Visites } from 'src/generator';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get visites(): Observable<Visites[]> {
    return this.http.get<Visites[]>(`${this.apiServerUrl}/api/visites/`);
  }

  addVisites(visite: Visites): Observable<Visites> {
    return this.http.post<Visites>(`${this.apiServerUrl}/api/visites/${visite.visiteId}`, visite);
  }

  updateVisites(visite: Visites): Observable<Visites> {
    return this.http.put<Visites>(`${this.apiServerUrl}/api/visites/${visite.visiteId}`, visite);
  }

  deleteVisites(visite: Visites): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/visites/${visite.visiteId}`);
  }
}
