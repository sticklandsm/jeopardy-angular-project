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
import { ResponsePassService } from '../response-pass.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { TimerService } from '../timer.service';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-jeopardy-card',
  templateUrl: './jeopardy-card.component.html',
  styleUrls: ['./jeopardy-card.component.css'],
})
export class JeopardyCardComponent implements OnInit {
  @Input() categoryIndex: number = 0;
  @Input() clueIndex: number = 0;
  @Input() question: Clue = {} as Clue;
  @Input() category: string = '';

  responseGiven = '';
  isQuestionVisible: boolean = false;

  constructor(
    private responsePassService: ResponsePassService,
    private dialog: MatDialog,
    private timerService: TimerService
  ) {}

  openCardClicked(playerName: string) {
    //add logic to stop the timeout of open card using websockets.
    this.openEnterResponseModal();
  }
  openCardTimedOut(itTimedOut: boolean) {}

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

      this.responsePassService.sendQuestion(
        {
          ...this.question,
          playerId: 1,
          playerName: 'Sean',
          responseCorrect:
            this.question.response.toLowerCase() ===
              (responseGiven || '').toLowerCase() || responseGiven === 'pass',
          categoryIndex: this.categoryIndex,
          clueIndex: this.clueIndex,
          // onScreenCurrently: true,
        },
        { x: 0, y: 0, width: 0 },
        'clueHasBeenAnswered'
      );
    });
  }

  ngOnInit(): void {}

  displayContent(): string {
    if (this.question.has_been_answered) return '';
    if (this.question) return '$' + this.question.value;
    return '';
  }

  onClickShowQuestion({ target }: MouseEvent) {
    if (this.question.onScreenCurrently) return;
    if (this.question.has_been_answered) return;

    this.timerService.timerObservable$.pipe(take(1)).subscribe((itTimedOut) => {
      if (itTimedOut) {
        this.responsePassService.sendQuestion(
          {
            ...this.question,
            playerId: 1,
            playerName: 'null',
            responseCorrect: true,
            categoryIndex: this.categoryIndex,
            clueIndex: this.clueIndex,
          },
          { x: 0, y: 0, width: 0 },
          'clueHasTimedOut'
        );
      }
    });

    const elementDetails = (target as Element).getBoundingClientRect();

    console.log('What is ', this.question.response, '?');

    this.responsePassService.sendQuestion(
      {
        ...this.question,
        playerId: 1,
        playerName: 'Sean',
        responseCorrect: false,
        categoryIndex: this.categoryIndex,
        clueIndex: this.clueIndex,
      },
      {
        x: elementDetails.top,
        y: elementDetails.left,
        width: elementDetails.width,
      },
      'clueHasBeenClicked'
    );

    //uncomment the below to have it start ticking answers off as answered

    // this.databaseService.clueHasBeenAnswered(this.question.id).subscribe();
  }
}
