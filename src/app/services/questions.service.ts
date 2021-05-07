import { Questions} from '../../generator';
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


  getQuestions(): Observable<Questions[]> {
    return this.http.get<Questions[]>(`${this.apiServerUrl}/api/defis/questions`);
  }

  addQuestions(Questions: Questions) : Observable<Questions> {
    return this.http.post<Questions>(`${this.apiServerUrl}/api/defis/${Questions.defisId}/questions/${Questions.questionNum}`, Questions);

  }

  updateQuestions(Questions: Questions) : Observable<Questions>  {
    return this.http.put<Questions>(`${this.apiServerUrl}/api/defis/${Questions.defisId}/questions/${Questions.questionNum}`, Questions);
  }

  deleteQuestions(Questions: Questions) {
    return this.http.delete<void>(`${this.apiServerUrl}/api/defis/${Questions.defisId}/questions/${Questions.questionNum}`);
  }



}
