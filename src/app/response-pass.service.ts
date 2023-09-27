import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionAnswered } from './interfaces/JeopardyBoard';

@Injectable({
  providedIn: 'root',
})
export class ResponsePassService {
  constructor() {}

  private dataSubject = new Subject<QuestionAnswered>();
  data$ = this.dataSubject.asObservable();

  sendQuestion(question: QuestionAnswered) {
    this.dataSubject.next(question);
  }
}
