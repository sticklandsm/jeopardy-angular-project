import { createAction, props } from '@ngrx/store';
import { DatabaseService } from '../database-service.service';
import { CurrentGame } from './current-game.reducer';

export const setJeopardyGame = createAction(
  '[Jeopardy] Set Whole Game',
  props<{ game: CurrentGame }>()
);

export const questionAnswered = createAction(
  '[Jeopardy] Question Answered',
  props<{
    clueId: number;
    categoryName: string;
    doubleJeopardy: boolean;
    responseGiven: string;
    playerAnswering: string;
  }>()
);
