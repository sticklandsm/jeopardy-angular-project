import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CurrentPlayer } from './current-player.reducer';

export const selectCurrentPlayer =
  createFeatureSelector<CurrentPlayer>('currentPlayer');
