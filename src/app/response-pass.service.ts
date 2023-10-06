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

  private dataSubject = new Subject<ClueAnswered>();
  data$ = this.dataSubject.asObservable();

  sendQuestion(
    question: ClueAnswered,
    clueSelectedCoordinates: ClueSelectedCoordinates
  ) {
    this.dataSubject.next({
      ...question,
      clueCoordinates: clueSelectedCoordinates,
    });
  }
}
