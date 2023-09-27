import { Component, OnInit } from '@angular/core';
import { FullGame, QuestionAnswered } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { DatabaseService } from '../database-service.service';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentGame } from '../state/current-game.selectors';
import {
  questionAnswered,
  setJeopardyGame,
} from '../state/current-game.action';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { PlayerScore } from '../interfaces/PlayerScores';
import { WebsocketService } from '../web-socket.service';
import { ResponsePassService } from '../response-pass.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  received: any[] = [];
  contentToSend = questionAnswered;

  playerScores: PlayerScore[] = [
    { id: 1, name: 'Sean', score: 0 },
    { id: 2, name: 'Raquel', score: 0 },
    { id: 3, name: 'James', score: 0 },
  ];
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;
  gameId = 0;

  constructor(
    private jeopardyService: DatabaseService,
    private route: ActivatedRoute,
    private store: Store,
    private responsePassService: ResponsePassService,
    private websocketService: WebsocketService
  ) {
    websocketService.messages.subscribe(
      (receivedData: { source: string; content: QuestionAnswered }) => {
        this.received.push(receivedData);

        if (!receivedData.content) return;
        const categoryIndex = receivedData.content.categoryIndex;
        const clueIndex = receivedData.content.clueIndex;
        console.log(
          'clues: ',
          this.jeopardyGame.jeopardyRound[categoryIndex].clues
        );
        this.jeopardyGame.jeopardyRound[categoryIndex].clues[
          clueIndex
        ].value = 0;
      }
    );

    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });
  }

  async ngOnInit() {
    this.responsePassService.data$.subscribe((playerResponse) => {
      console.log('QUESTION FROM GAME COMPONENT', playerResponse);
      this.websocketService.messages.next({
        source: 'gameComponenet',
        content: playerResponse,
      });
    });

    this.jeopardyService.getJeopardyGame(this.gameId).subscribe({
      next: (game) => {
        this.store.dispatch(
          setJeopardyGame({
            game: { game, playerScores: [{ playerName: 'Sean', score: 0 }] },
          })
        );

        this.store.select(selectCurrentGame).subscribe((state) => {
          this.jeopardyGame = state.game;
        });
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
