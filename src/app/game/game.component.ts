import { Component, OnInit } from '@angular/core';
import { FullGame } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { HelpersService } from '../helpers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;
  gameId = 0;

  constructor(
    private jeopardyService: HelpersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.gameId = params['gameId'];
    });
  }

  async ngOnInit() {
    this.jeopardyService.getJeopardyGame(this.gameId).subscribe({
      next: (game) => {
        console.log('GameID: ', game);
        this.jeopardyGame = game;
      },
      error: (error) => {
        console.error(error);
      },
    });

    console.log(this.jeopardyGame);
  }
}
