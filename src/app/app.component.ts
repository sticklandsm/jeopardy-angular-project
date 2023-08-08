import {
  AfterContentInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FinalJeopardy, FullGame } from './interfaces/JeopardyBoard';
import { HelpersService } from './helpers.service';
import emptyData from './dummyData/emptyData.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'jeopardy-angular-project';
  jeopardyGame: FullGame = emptyData;
  contentLoaded: boolean = false;

  constructor(private helpers: HelpersService) {}

  async ngOnInit() {
    this.jeopardyGame = await this.helpers.getJeopardyGame();
  }
}
