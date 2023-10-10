import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  ClueAnswered,
  ClueSelectedCoordinates,
} from './interfaces/JeopardyBoard';

@Injectable({
  providedIn: 'root',
})
export class ResponsePassService {
  constructor() {}

  private dataSubject = new Subject<{
    clueAnswered: ClueAnswered;
    event: string;
  }>();
  data$ = this.dataSubject.asObservable();

  sendQuestion(
    question: ClueAnswered,
    clueSelectedCoordinates: ClueSelectedCoordinates,
    event: string
  ) {
    this.dataSubject.next({
      clueAnswered: {
        ...question,
        clueCoordinates: clueSelectedCoordinates,
      },
      event,
    });
  }
}
