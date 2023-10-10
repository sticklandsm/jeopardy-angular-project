import { createReducer, on } from '@ngrx/store';
import { setCurrentPlayer } from './current-player.action';
import { PlayerScore } from 'src/app/interfaces/PlayerScores';

export const initialState: PlayerScore = {
  name: '',
  id: 0,
  score: 0,
  game_id: 0,
};

export const currentPlayerReducer = createReducer(
  initialState,
  on(setCurrentPlayer, (state, payload) => {
    return payload.currentPlayer;
  })
);
