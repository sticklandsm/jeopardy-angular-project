import { createAction, props } from '@ngrx/store';
import { HelpersService } from '../helpers.service';

export const getJeopardyGame = createAction(
  '[Jeopardy] Get Whole Game',
  props<{ playersNames: string[] }>()
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
