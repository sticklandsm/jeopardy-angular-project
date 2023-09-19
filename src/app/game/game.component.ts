import { Component, OnInit } from '@angular/core';
import { FullGame } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { DatabaseService } from '../database-service.service';
import { ActivatedRoute } from '@angular/router';
import { selectCurrentGame } from '../state/current-game.selectors';
import { setJeopardyGame } from '../state/current-game.action';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;
  gameId = 0;
  ws: WebSocket;

  constructor(
    private jeopardyService: DatabaseService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });

    const serverHost = environment.wsUrl;

    this.ws = new WebSocket(serverHost);

    this.ws.addEventListener('open', (event) => {
      console.log('Websocket connection opened');
    });

    this.ws.addEventListener('close', (event) => {
      console.log('Websocket connection closed');
    });

    this.ws.onmessage = function (message) {
      console.log('ws onmessage: ', message.data);
    };
  }

  async ngOnInit() {
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
