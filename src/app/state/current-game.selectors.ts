import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CurrentGame } from './current-game.reducer';

export const selectCurrentGame =
  createFeatureSelector<CurrentGame>('currentGame');
