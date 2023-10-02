import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Clue } from '../interfaces/JeopardyBoard';
import { DatabaseService } from '../database-service.service';
import { Store } from '@ngrx/store';
import { WebsocketService } from '../web-socket.service';
import { ResponsePassService } from '../response-pass.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { putClueOnScreen } from '../state/current-game.action';

@Component({
  selector: 'app-jeopardy-card',
  templateUrl: './jeopardy-card.component.html',
  styleUrls: ['./jeopardy-card.component.css'],
})
export class JeopardyCardComponent implements OnChanges, OnInit, DoCheck {
  // need to set up an observable in this class so that it can send out an alert when a question is clicked and the Game class can listen and send off a message through WS.

  @Input() categoryIndex: number = 0;
  @Input() clueIndex: number = 0;
  @Input() question: Clue = {} as Clue;
  @Input() category: string = '';

  responseGiven = '';
  isQuestionVisible: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private store: Store,
    private responsePassService: ResponsePassService,
    private dialog: MatDialog
  ) {}

  openEnterResponseModal() {
    const modalData = {
      title: 'Enter Respose',
      content: '',
      placeholder: 'What is ____',
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.responseGiven = result;
    });
  }

  //0 = not answered, 1 = showing the clue on screen, 2 = answered so card is blank
  ClueAnswered: number = 0;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.question.has_been_answered) {
      this.ClueAnswered = 2;
    }
    console.log('change to input detected');
  }

  ngDoCheck(): void {
    if (this.question.onScreenCurrently) {
      console.log(this.question);
    }
  }

  displayContent(): string {
    if (this.ClueAnswered === 2) return '';
    if (this.isQuestionVisible) return this.question.clue.toUpperCase();
    if (this.question.value) return '$' + this.question.value;
    return '';
  }
  onClickShowQuestion() {
    if (this.ClueAnswered === 2) return;

    this.isQuestionVisible = !this.isQuestionVisible;

    console.log('What is ', this.question.response, '?');

    this.ClueAnswered += 1;
    if (this.ClueAnswered === 1) {
      this.openEnterResponseModal();

      this.responsePassService.sendQuestion({
        ...this.question,
        playerId: 1,
        playerName: 'Sean',
        responseCorrect: true,
        categoryIndex: this.categoryIndex,
        clueIndex: this.clueIndex,
        onScreenCurrently: true,
      });

      this.store.dispatch(
        putClueOnScreen({
          clueSelected: {
            ...this.question,
            categoryIndex: this.categoryIndex,
            clueIndex: this.clueIndex,
            onScreenCurrently: true,
          },
        })
      );
    }

    this.databaseService.clueHasBeenAnswered(this.question.id).subscribe();
  }
}
