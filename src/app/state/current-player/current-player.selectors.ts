import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PlayerScore } from 'src/app/interfaces/PlayerScores';

export const selectCurrentPlayer =
  createFeatureSelector<PlayerScore>('currentPlayer');
