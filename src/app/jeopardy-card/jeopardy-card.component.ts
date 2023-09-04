import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Question } from '../interfaces/JeopardyBoard';
import { MaximizeDirective } from '../maximize.directive';

@Component({
  selector: 'app-jeopardy-card',
  templateUrl: './jeopardy-card.component.html',
  styleUrls: ['./jeopardy-card.component.css'],
})
export class JeopardyCardComponent implements OnChanges {
  @Input() question: Question = {} as Question;
  constructor() {}

  isQuestionVisible: boolean = false;

  //0 = not answered, 1 = on screen, 2 = answered so card it blank
  questionAnswered: number = 0;

  displayContent(): string {
    if (this.questionAnswered === 2) return '';
    if (this.isQuestionVisible) return this.question.clue.toUpperCase();
    else return '$' + this.question.value;
  }

  ngOnChanges(changes: SimpleChanges): void {}
  onClickShowQuestion() {
    if (this.questionAnswered === 2) return;
    this.isQuestionVisible = !this.isQuestionVisible;
    this.question.value = 0;
    console.log('What is ', this.question.response, '?');
    this.questionAnswered += 1;
  }
}
