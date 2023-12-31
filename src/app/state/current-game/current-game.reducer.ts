import { createReducer, on } from '@ngrx/store';
import {
  ClueSelectedCoordinates,
  FullGame,
} from '../../interfaces/JeopardyBoard';
import {
  setJeopardyGame,
  markClueAnswered,
  openClueOnScreen,
  closeClueOnScreen,
} from './current-game.action';
import { PlayerScore } from 'src/app/interfaces/PlayerScores';

export interface CurrentGame {
  game: FullGame;
  playerScores: PlayerScore[];
}

export const initialState: CurrentGame = {
  game: {
    gameId: 0,
    jeopardyRound: [],
    doubleJeopardyRound: [],
    finalJeopardy: {
      id: 0,
      answer: 'Initial Answer!',
      question: 'Initial Clue!',
      airdate: '',
      category: { title: 'initial FJ Category' },
    },
  },
  playerScores: [],
};

export const currentGameReducer = createReducer(
  initialState,
  on(setJeopardyGame, (state, { game }) => {
    return game;
  }),
  on(
    markClueAnswered,
    (
      state,
      payload
      // { clueId, category, doubleJeopardy, answerGiven, playerAnswering }
    ) => {
      const {
        id,
        playerId,
        responseCorrect,
        categoryIndex,
        clueIndex,
        playerName,
      } = payload.ClueAnswered;

      //make sure they're in the same game

      if (state.game.jeopardyRound[categoryIndex].clues[clueIndex].id !== id)
        return state;

      //create newState this way because doing it through Splice didn't work for some reason.
      const newState = JSON.parse(JSON.stringify(state)) as CurrentGame;

      let { value } =
        newState.game.jeopardyRound[categoryIndex].clues[clueIndex];

      const playerToUpdate = newState.playerScores.find(
        (player) => player.name === playerName
      );

      if (playerToUpdate) {
        playerToUpdate.score += value * (Number(responseCorrect) - 1 || 1);
      }

      //update the value of the card to 0, and mark it as answered
      // newState.game.jeopardyRound[categoryIndex].clues[clueIndex].value = 0;

      return { ...state, playerScores: newState.playerScores };
    }
  ),
  on(openClueOnScreen, (state, payload) => {
    console.log('opening clue');
    const { id, categoryIndex, clueIndex } = payload.clueSelected;
    const { clueSelectedCoordinates } = payload;

    //make sure they're in the same game
    if (state.game.jeopardyRound[categoryIndex].clues[clueIndex].id !== id)
      return state;

    //create newState this way because doing it through Splice didn't work for some reason.
    const newState = JSON.parse(JSON.stringify(state)) as CurrentGame;

    //making it toggle between on screen and off screen.
    const currentStateOfDisplay =
      newState.game.jeopardyRound[categoryIndex].clues[clueIndex]
        .onScreenCurrently;

    newState.game.jeopardyRound[categoryIndex].clues[clueIndex] = {
      ...newState.game.jeopardyRound[categoryIndex].clues[clueIndex],
      onScreenCurrently: true,
      clueCoordinates: clueSelectedCoordinates,
    };

    return newState;
  }),
  on(closeClueOnScreen, (state, payload) => {
    console.log('closing clue');
    const { id, categoryIndex, clueIndex } = payload.clueSelected;
    const { clueSelectedCoordinates } = payload;

    //make sure they're in the same game
    if (state.game.jeopardyRound[categoryIndex].clues[clueIndex].id !== id)
      return state;

    //create newState this way because doing it through Splice didn't work for some reason.
    const newState = JSON.parse(JSON.stringify(state)) as CurrentGame;

    newState.game.jeopardyRound[categoryIndex].clues[
      clueIndex
    ].has_been_answered = true;

    //making it toggle between on screen and off screen.
    const currentStateOfDisplay =
      newState.game.jeopardyRound[categoryIndex].clues[clueIndex]
        .onScreenCurrently;

    newState.game.jeopardyRound[categoryIndex].clues[clueIndex] = {
      ...newState.game.jeopardyRound[categoryIndex].clues[clueIndex],
      onScreenCurrently: false,
      clueCoordinates: clueSelectedCoordinates,
    };

    return newState;
  })
);
