import { createReducer, on } from '@ngrx/store';
import { setCurrentPlayer } from './current-player.action';

export interface CurrentPlayer {
  name: string;
  playerNumber: number;
}

export const initialState: CurrentPlayer = {
  name: '',
  playerNumber: 0,
};

export const currentPlayerReducer = createReducer(
  initialState,
  on(setCurrentPlayer, (state, payload) => {
    return payload.currentPlayer;
  })
);
