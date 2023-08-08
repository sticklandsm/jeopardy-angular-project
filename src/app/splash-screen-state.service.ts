import { Injectable } from '@angular/core';
import { Observer, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashScreenStateService {
  subject = new Subject();

  subscribe(
    onNext: Partial<Observer<unknown>> | ((value: unknown) => void) | undefined
  ): Subscription {
    return this.subject.subscribe(onNext);
  }

  stop() {
    this.subject.next(false);
  }

  constructor() {}
}
