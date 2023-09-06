import { createAction, props } from '@ngrx/store';
import { HelpersService } from '../helpers.service';
import { currentGameState } from './current-game.reducer';

export const setJeopardyGame = createAction(
  '[Jeopardy] Set Whole Game',
  props<{ game: currentGameState }>()
);

export const questionAnswered = createAction(
  '[Jeopardy] Question Answered',
  props<{
    column: number;
    row: number;
    doubleJeopardy: boolean;
    answerGiven: string;
    playerAnswering: number;
  }>()
);
