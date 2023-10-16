import { createAction, props } from '@ngrx/store';
import { DatabaseService } from '../../database-service.service';
import { CurrentGame } from '../current-game/current-game.reducer';
import {
  Clue,
  ClueAnswered,
  ClueSelected,
  ClueSelectedCoordinates,
} from '../../interfaces/JeopardyBoard';

export const setJeopardyGame = createAction(
  '[Jeopardy] Set Whole Game',
  props<{ game: CurrentGame }>()
);

export const markClueAnswered = createAction(
  '[Jeopardy] Clue Answered',
  props<{
    ClueAnswered: ClueAnswered;
  }>()
);

export const toggleClueOnScreen = createAction(
  '[Jeopardy] Put the Clue on Screen',
  props<{
    clueSelected: ClueSelected;
    clueSelectedCoordinates: ClueSelectedCoordinates;
  }>()
);
