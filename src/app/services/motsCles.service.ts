import { MotsCles} from '../../generator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MotsClesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get MotsCles(): Observable<MotsCles[]> {
    return this.http.get<MotsCles[]>(`${this.apiServerUrl}/api/defis/motscles`);
  }

  addMotsCles(motsCles: MotsCles): Observable<MotsCles> {
    return this.http.post<MotsCles>(`${this.apiServerUrl}/api/defis/${motsCles.defisId}/motscles/${motsCles.motCle}`, motsCles);
  }

  updateMotsCles(motsCles: MotsCles): Observable<MotsCles> {
    return this.http.put<MotsCles>(`${this.apiServerUrl}/api/defis/${motsCles.defisId}/motscles/${motsCles.motCle}`, motsCles);
  }

  deleteMotsCles(motsCles: MotsCles): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/defis/${motsCles.defisId}/motscles/${motsCles.motCle}`);
  }
}
