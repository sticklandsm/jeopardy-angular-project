import { Component, OnInit } from '@angular/core';
import { FullGame } from '../interfaces/JeopardyBoard';
import emptyData from '../dummyData/emptyData.json';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;

  constructor(private jeopardyService: HelpersService) {}

  async ngOnInit() {
    this.jeopardyService.getJeopardyGame().subscribe({
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
