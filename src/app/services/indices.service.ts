import { Indices} from '../../generator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getIndices(): Observable<Indices[]> {
    return this.http.get<Indices[]>(`${this.apiServerUrl}/api/defis/indices`);
  }

  addIndices(indices: Indices) : Observable<Indices> {
    return this.http.post<Indices>(`${this.apiServerUrl}/api/defis/${indices.defisId}/indices/${indices.indicesId}`, indices);

  }

  updateIndices(indices: Indices) {
    return this.http.put<Indices>(`${this.apiServerUrl}/api/defis/${indices.defisId}/indices/${indices.indicesId}`, indices).subscribe();
  }

  deleteIndices(indices: Indices){
    return this.http.delete<void>(`${this.apiServerUrl}/api/defis/${indices.defisId}/indices/${indices.indicesId}`).subscribe();
  }



}
