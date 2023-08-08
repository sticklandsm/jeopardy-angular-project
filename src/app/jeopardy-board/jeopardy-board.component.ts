import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { Category } from '../interfaces/JeopardyBoard';
import { SplashScreenStateService } from '../splash-screen-state.service';

@Component({
  selector: 'app-jeopardy-board',
  templateUrl: './jeopardy-board.component.html',
  styleUrls: ['./jeopardy-board.component.css'],
  animations: [
    trigger('boardAppear', [
      state(
        'contentIsntLoaded',
        style({
          opacity: 0,
        })
      ),
      state(
        'contentIsLoaded',
        style({
          opacity: 1,
        })
      ),
      transition('contentIsntLoaded => contentIsLoaded', [animate('2s')]),
    ]),
  ],
})
export class JeopardyBoardComponent implements OnChanges {
  @Input() categories: Category[] = [];
  contentLoaded: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (this.categories[0].categoryName) {
      this.contentLoaded = true;
      console.log('content loaded: ', this.categories);
      this.splashScreenStateService.stop();
    }
  }

  constructor(private splashScreenStateService: SplashScreenStateService) {}
}
