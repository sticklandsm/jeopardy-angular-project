import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClueAnswered } from './interfaces/JeopardyBoard';

@Injectable({
  providedIn: 'root',
})
export class ResponsePassService {
  constructor() {}

  private dataSubject = new Subject<ClueAnswered>();
  data$ = this.dataSubject.asObservable();

  sendQuestion(question: ClueAnswered) {
    this.dataSubject.next(question);
  }
}
