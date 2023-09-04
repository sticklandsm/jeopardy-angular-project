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

  constructor(private helpers: HelpersService) {}

  async ngOnInit() {
    this.jeopardyGame = await this.helpers.getJeopardyGame();
    console.log(this.jeopardyGame);
  }
}
