import { Component, OnInit } from '@angular/core';
import { FullGame, ClueAnswered } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { DatabaseService } from '../database-service.service';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentGame } from '../state/current-game/current-game.selectors';
import {
  markClueAnswered,
  putClueOnScreen,
  setJeopardyGame,
} from '../state/current-game/current-game.action';
import { Store } from '@ngrx/store';
import { PlayerScore } from '../interfaces/PlayerScores';
import { WebsocketService } from '../web-socket.service';
import { ResponsePassService } from '../response-pass.service';
import { selectCurrentPlayer } from '../state/current-player/current-player.selectors';
import { setCurrentPlayer } from '../state/current-player/current-player.action';

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
    private websocketService: WebsocketService
  ) {
    websocketService.messages.subscribe(
      //What to do when it gets a websocket message from server:
      (receivedData: {
        source: string;
        content: {
          clueAnswered: ClueAnswered | any;
          event: string;
        };
      }) => {
        console.log('web socket received: ', receivedData);

        //if there's nothing in there then do nothing
        if (!receivedData.content) {
          return;
        }

        //handles clues being answered
        //Should probably split this into 2 things, one for showing the card, one for judging if the answer is correct
        this.received.push(receivedData.content);

        if (
          receivedData.content.event === 'clueHasBeenClicked' ||
          (receivedData.content.event === 'clueHasBeenAnswered' &&
            receivedData.content.clueAnswered.responseCorrect)
        ) {
          this.store.dispatch(
            putClueOnScreen({
              clueSelected: receivedData.content.clueAnswered,
              clueSelectedCoordinates: receivedData.content.clueAnswered
                .clueCoordinates || {
                x: 0,
                y: 0,
                width: 0,
              },
            })
          );

          if (receivedData.content.event === 'clueHasBeenClicked') {
            this.store.dispatch(
              markClueAnswered({
                ClueAnswered: receivedData.content.clueAnswered,
              })
            );
          }

          return;
        }
      }
    );

    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });
  }

  async ngOnInit() {
    this.store.select(selectCurrentPlayer).subscribe((state) => {
      this.currentPlayerName = state.name || 'Guy Incognito';
    });

    this.jeopardyService
      .checkPlayerScore(this.gameId, this.currentPlayerName)
      .subscribe({
        next: (playerScore) => {
          this.store.dispatch(setCurrentPlayer({ currentPlayer: playerScore }));
        },
      });

    //If a Card component sends through a response (card answered) then send through a websocket thing, telling everyone.
    this.responsePassService.data$.subscribe((playerResponse) => {
      this.websocketService.messages.next({
        source: 'gameComponenet',
        content: playerResponse,
      });
    });

    this.jeopardyService.getJeopardyGame(this.gameId).subscribe({
      //When the game loads, it needs to send a WS to everyone letting them know a new player has entered, and their details
      //But how would it know who is already in the game???
      //Does it need to use the database?
      //database would definitely keep the scores. But does it keep who is currently playing right now?
      //Not exactly. On boot it sends a message to everyone saying there's a new user. Other players send back a thing with their users
      //Send a response with a 'currentUsers' tag from people already playing.

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
        console.error(error);
      },
    });
  }
}
