import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  private timerSubject = new Subject<boolean>();
  timerObservable$ = this.timerSubject.asObservable();

  timer: ReturnType<typeof setTimeout> = setTimeout(() => {});

  startTimer(timeInSeconds: number) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.timerSubject.next(true);
    }, timeInSeconds * 1000);
  }
}
