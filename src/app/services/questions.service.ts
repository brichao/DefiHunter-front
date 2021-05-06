import { Questions, Defis} from '../../generator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  getQuestions(Defis: Defis, Questions: Questions): Observable<Questions[]> {
    return this.http.get<Questions[]>(`${this.apiServerUrl}/api/${Defis.id}/questions/${Questions.questionNum}`);
  }

  addQuestions(Defis: Defis, Questions: Questions) : Observable<Questions> {
    return this.http.post<Questions>(`${this.apiServerUrl}/api/${Defis.id}/questions/${Questions.questionNum}`, Questions);

  }

  updateQuestions(Defis: Defis, Questions: Questions) {
    return this.http.put<Questions>(`${this.apiServerUrl}/api/${Defis.id}/questions/${Questions.questionNum}`, Questions).subscribe();
  }

  deleteQuestions(Defis: Defis, Questions: Questions){
    return this.http.delete<void>(`${this.apiServerUrl}/api/${Defis.id}/questions/${Questions.questionNum}`).subscribe();
  }



}
