import { BlocsTexte} from '../../generator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlocsTexteService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getBlocsTexte(): Observable<BlocsTexte[]> {
    return this.http.get<BlocsTexte[]>(`${this.apiServerUrl}/api/BlocsTexte/`);
  }

  addBlocsTexte(blocsTexte: BlocsTexte) : Observable<BlocsTexte> {
    return this.http.post<BlocsTexte>(`${this.apiServerUrl}/api/BlocsTexte/${blocsTexte.bloctexteId}`, blocsTexte);

  }

  updateBlocsTexte(blocsTexte: BlocsTexte) {
    return this.http.put<BlocsTexte>(`${this.apiServerUrl}/api/BlocsTexte/${blocsTexte.bloctexteId}`, blocsTexte).subscribe();
  }

  deleteBlocsTexte(blocsTexte: BlocsTexte){
    return this.http.delete<void>(`${this.apiServerUrl}/api/BlocsTexte/${blocsTexte.bloctexteId}`).subscribe();
  }



}
