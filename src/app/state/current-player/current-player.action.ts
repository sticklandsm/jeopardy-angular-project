import { createAction, props } from '@ngrx/store';
import { CurrentPlayer } from './current-player.reducer';

export const setCurrentPlayer = createAction(
  '[Jeopardy] Set the current plater',
  props<{ currentPlayer: CurrentPlayer }>()
);
