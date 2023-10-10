import { createAction, props } from '@ngrx/store';
import { PlayerScore } from 'src/app/interfaces/PlayerScores';

export const setCurrentPlayer = createAction(
  '[Jeopardy] Set the current plater',
  props<{ currentPlayer: PlayerScore }>()
);
