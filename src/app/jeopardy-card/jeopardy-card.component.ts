import { Component, Input } from '@angular/core';
import { Question } from '../interfaces/JeopardyBoard';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-jeopardy-card',
  templateUrl: './jeopardy-card.component.html',
  styleUrls: ['./jeopardy-card.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          width: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          width: '100px',
          opacity: 0.8,
          backgroundColor: 'purple',
        })
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
      transition('void => open', [animate('1s')]),
      transition('open => void', [animate('0.5s')]),
      transition('void => closed', [animate('1s')]),
      transition('closed => void', [animate('0.5s')]),
    ]),
  ],
})
export class JeopardyCardComponent {
  @Input() question: Question = {} as Question;
  isQuestionVisible: boolean = false;
  questionAnswered: boolean = false;

  onClickShowQuestion() {
    this.isQuestionVisible = true;
  }
}
