import { Component, OnInit } from '@angular/core';
import { FullGame, ClueAnswered } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { DatabaseService } from '../database-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { selectCurrentGame } from '../state/current-game/current-game.selectors';
import {
  closeClueOnScreen,
  markClueAnswered,
  openClueOnScreen,
  setJeopardyGame,
} from '../state/current-game/current-game.action';
import { Store } from '@ngrx/store';
import { PlayerScore } from '../interfaces/PlayerScores';
import { WebsocketService } from '../web-socket.service';
import { ResponsePassService } from '../response-pass.service';
import { selectCurrentPlayer } from '../state/current-player/current-player.selectors';
import { setCurrentPlayer } from '../state/current-player/current-player.action';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  received: any[] = [];

  playerScores: PlayerScore[] = [
    { id: 1, name: 'Sean', score: 0, game_id: 1 },
    { id: 2, name: 'Raquel', score: 0, game_id: 1 },
    { id: 3, name: 'James', score: 0, game_id: 1 },
  ];
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;
  gameId = 0;
  currentPlayerName = '';

  constructor(
    private jeopardyService: DatabaseService,
    private route: ActivatedRoute,
    private store: Store,
    private responsePassService: ResponsePassService,
    private websocketService: WebsocketService,
    private router: Router,
    private dialog: MatDialog
  ) {
    websocketService.messages.subscribe(
      //What to do when it gets a websocket message from server:
      (receivedData: {
        source: string;
        content: {
          clueAnswered: ClueAnswered;
          event: string;
        };
      }) => {
        console.log('web socket received: ', receivedData);

        //if there's nothing in there then do nothing
        if (!receivedData.content) {
          return;
        }

        //handles clues being answered
        this.received.push(receivedData.content);

        if (receivedData.content.event === 'clueHasBeenClicked') {
          this.store.dispatch(
            openClueOnScreen({
              clueSelected: receivedData.content.clueAnswered,
              clueSelectedCoordinates: receivedData.content.clueAnswered
                .clueCoordinates || {
                x: 0,
                y: 0,
                width: 0,
              },
            })
          );

          return;
        }
        if (
          receivedData.content.event === 'clueHasBeenAnswered' ||
          receivedData.content.event === 'clueHasTimedOut'
        ) {
          this.store.dispatch(
            markClueAnswered({
              ClueAnswered: receivedData.content.clueAnswered,
            })
          );
          if (!receivedData.content.clueAnswered.responseCorrect) return;
          this.store.dispatch(
            closeClueOnScreen({
              clueSelected: receivedData.content.clueAnswered,
              clueSelectedCoordinates: receivedData.content.clueAnswered
                .clueCoordinates || {
                x: 0,
                y: 0,
                width: 0,
              },
            })
          );
          return;
        }
      }
    );

    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });
  }

  openEnterNameModal(): void {
    const modalData = {
      title: 'Enter Name',
      content: '',
      placeholder: '',
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((responseGiven) => {
      localStorage.setItem('name', responseGiven);
    });
  }

  async ngOnInit() {
    if (!localStorage.getItem('name')) {
      this.openEnterNameModal();
    }

    this.store.select(selectCurrentPlayer).subscribe((state) => {
      this.currentPlayerName =
        state.name || localStorage.getItem('name') || 'Guy Incognito';
    });

    this.jeopardyService
      .checkPlayerScore(this.gameId, this.currentPlayerName)
      .subscribe({
        next: (playerScore) => {
          this.store.dispatch(setCurrentPlayer({ currentPlayer: playerScore }));
        },
        error: (error) => {
          console.error('Error retreiving player: ', error);
        },
      });

    //If a Card component sends through a response (card answered) then send through a websocket thing, telling everyone.
    this.responsePassService.data$.subscribe((playerResponse) => {
      this.websocketService.messages.next({
        source: 'gameComponenet',
        content: playerResponse,
      });
    });
    //Get a jeopardy game form server based on game Id
    this.jeopardyService.getJeopardyGame(this.gameId).subscribe({
      next: ({ game, playerScores }) => {
        this.store.dispatch(
          setJeopardyGame({
            game: {
              game,
              playerScores,
            },
          })
        );

        this.store.select(selectCurrentGame).subscribe((state) => {
          this.jeopardyGame = state.game;
          this.playerScores = state.playerScores;
        });
      },

      error: (error) => {
        alert('Does that game exist? ' + error.statusText);
        console.error(error.statusText);
        this.router.navigate(['/']);
      },
    });
  }
}
