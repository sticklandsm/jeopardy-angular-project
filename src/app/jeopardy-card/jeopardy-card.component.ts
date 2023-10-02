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
import {
  markClueAnswered,
  putClueOnScreen,
} from '../state/current-game.action';

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

  openCardClicked(playerName: string) {
    this.openEnterResponseModal();
  }

  openEnterResponseModal(): void {
    const modalData = {
      title: 'Enter Respose',
      content: '',
      placeholder: 'What is ____',
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((responseGiven) => {
      this.responseGiven = responseGiven;

      this.responsePassService.sendQuestion({
        ...this.question,
        playerId: 1,
        playerName: 'Sean',
        responseCorrect:
          this.question.response.toLowerCase() ===
            (responseGiven || '').toLowerCase() || responseGiven === 'pass',
        categoryIndex: this.categoryIndex,
        clueIndex: this.clueIndex,
        // onScreenCurrently: true,
      });
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngDoCheck(): void {}

  displayContent(): string {
    if (this.question.has_been_answered) return '';
    if (this.question.value) return '$' + this.question.value;
    return '';
  }
  onClickShowQuestion() {
    if (this.question.has_been_answered) return;

    //commenting this out in order to try to get the web sockets to handle more of the stuff.
    // this.store.dispatch(
    //   putClueOnScreen({
    //     clueSelected: {
    //       ...this.question,
    //       categoryIndex: this.categoryIndex,
    //       clueIndex: this.clueIndex,
    //       onScreenCurrently: true,
    //     },
    //   })
    // );

    console.log('What is ', this.question.response, '?');

    this.responsePassService.sendQuestion({
      ...this.question,
      playerId: 1,
      playerName: 'Sean',
      responseCorrect: true,
      categoryIndex: this.categoryIndex,
      clueIndex: this.clueIndex,
      // onScreenCurrently: true,
    });

    this.databaseService.clueHasBeenAnswered(this.question.id).subscribe();
  }
}
