import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Question } from '../interfaces/JeopardyBoard';
import { DatabaseService } from '../database-service.service';
import { Store } from '@ngrx/store';
import { WebsocketService } from '../web-socket.service';
import { ResponsePassService } from '../response-pass.service';

@Component({
  selector: 'app-jeopardy-card',
  templateUrl: './jeopardy-card.component.html',
  styleUrls: ['./jeopardy-card.component.css'],
})
export class JeopardyCardComponent implements OnChanges, OnInit {
  // need to set up an observable in this class so that it can send out an alert when a question is clicked and the Game class can listen and send off a message through WS.

  @Input() categoryIndex: number = 0;
  @Input() clueIndex: number = 0;
  @Input() question: Question = {} as Question;
  @Input() category: string = '';

  constructor(
    private databaseService: DatabaseService,
    private store: Store,
    private responsePassService: ResponsePassService
  ) {}

  isQuestionVisible: boolean = false;

  //0 = not answered, 1 = showing the clue on screen, 2 = answered so card is blank
  clueAnswered: number = 0;

  displayContent(): string {
    if (this.clueAnswered === 2) return '';
    if (this.isQuestionVisible) return this.question.clue.toUpperCase();
    else return '$' + this.question.value;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.question.has_been_answered) {
      this.clueAnswered = 2;
    }
  }
  onClickShowQuestion() {
    if (this.clueAnswered === 2) return;

    this.isQuestionVisible = !this.isQuestionVisible;

    // this.store.dispatch(
    //   questionAnswered({
    //     clueId: this.question.id,
    //     categoryName: this.category,
    //     doubleJeopardy: false,
    //     responseGiven: 'Sean',
    //     playerAnswering: 'Sean',
    //   })
    // );

    console.log('What is ', this.question.response, '?');

    this.clueAnswered += 1;
    if (this.clueAnswered === 1) {
      this.responsePassService.sendQuestion({
        ...this.question,
        playerId: 1,
        playerName: 'Sean',
        responseCorrect: true,
        categoryIndex: this.categoryIndex,
        clueIndex: this.clueIndex,
      });
    }

    this.databaseService.clueHasBeenAnswered(this.question.id).subscribe();
  }
}
