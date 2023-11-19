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
import { first, take, timeout } from 'rxjs';
import { selectCurrentPlayer } from '../state/current-player/current-player.selectors';

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
  @Input() currentPlayerName: string = '';

  responseGiven = '';
  isQuestionVisible: boolean = false;
  hasTriedToAnswer: boolean = false;

  constructor(
    private responsePassService: ResponsePassService,
    private dialog: MatDialog,
    private timerService: TimerService
  ) {}

  openCardClicked(playerName: string) {
    if (this.hasTriedToAnswer) {
      return;
    }
    this.hasTriedToAnswer = true;
    this.openEnterResponseModal();
    setTimeout(() => {
      const timeOutSound = new Audio('../../assets/sounds/times-up.mp3');
      timeOutSound.play();
      this.dialog.closeAll();
    }, 5000);
  }
  openCardTimedOut(itTimedOut: boolean) {
    console.log('opencardtimedout ');
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

    //after the dialogue asking for an answer has closed.
    dialogRef.afterClosed().subscribe((responseGiven) => {
      this.responsePassService.sendQuestion(
        {
          ...this.question,
          playerId: 1,
          playerName: this.currentPlayerName,
          responseCorrect:
            this.question.response.toLowerCase() ===
            (responseGiven || '').toLowerCase(),
          categoryIndex: this.categoryIndex,
          clueIndex: this.clueIndex,
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
        const timeOutSound = new Audio('../../assets/sounds/times-up.mp3');
        timeOutSound.play();
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
        playerName: 'null',
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
