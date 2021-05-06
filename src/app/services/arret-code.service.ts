import { Arrets} from '../../generator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArretsService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getArrets(): Observable<Arrets[]> {
    return this.http.get<Arrets[]>(`${this.apiServerUrl}/api/Arrets/`);
  }

  addArrets(arrets: Arrets) : Observable<Arrets> {
    return this.http.post<Arrets>(`${this.apiServerUrl}/api/Arrets/${arrets.codeArret}`, arrets);

  }

  updateArrets(arrets: Arrets) {
    return this.http.put<Arrets>(`${this.apiServerUrl}/api/Arrets/${arrets.codeArret}`, arrets);
  }

  deleteArrets(arrets: Arrets){
    return this.http.delete<void>(`${this.apiServerUrl}/api/Arrets/${arrets.codeArret}`).subscribe();
  }
}
