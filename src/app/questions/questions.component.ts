import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Questions, emptyQuestions } from 'src/generator';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() question: Questions = emptyQuestions;

  constructor(private questions: QuestionsService) {

  }

  ngOnInit(): void {
  }

}
