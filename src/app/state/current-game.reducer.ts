import { createReducer, on } from '@ngrx/store';
import { FullGame } from '../interfaces/JeopardyBoard';
import { setJeopardyGame, questionAnswered } from './current-game.action';

export interface CurrentGame {
  game: FullGame;
  playerScores: { playerName: string; score: number }[];
}

export const initialState: CurrentGame = {
  game: {
    gameId: 0,
    jeopardyRound: [],
    doubleJeopardyRound: [],
    finalJeopardy: {
      id: 0,
      answer: 'Initial Answer!',
      question: 'Initial Question!',
      airdate: '',
      category: { title: 'initial FJ Category' },
    },
  },
  playerScores: [],
};

export const jeopardyReducer = createReducer(
  initialState,
  on(setJeopardyGame, (state, { game }) => game),
  on(
    questionAnswered,
    (
      state,
      payload
      // { clueId, category, doubleJeopardy, answerGiven, playerAnswering }
    ) => {
      // const newState = { ...state };
      const newState = JSON.parse(JSON.stringify(state)) as CurrentGame;

      //Gets the answer for jeopardy and doubleJeopardy and then extracts the correct one
      const categoryBeingAnswered = newState.game.jeopardyRound.find(
        (category) => {
          return category.categoryName.toUpperCase() === payload.categoryName;
        }
      );
      if (!categoryBeingAnswered) {
        console.error(
          'category not found, somethings gone wrong in state management'
        );
        return newState;
      }

      const clueBeingAnswered = categoryBeingAnswered.clues.find((clue) => {
        return clue.id === payload.clueId;
      });

      if (!clueBeingAnswered) {
        console.error(
          'clue not found, somethings gone wrong in state management'
        );
        return newState;
      }

      clueBeingAnswered.has_been_answered = true;

      const wasItCorrect = clueBeingAnswered.response === payload.responseGiven;

      const playerScoreToChange = newState.playerScores.find((playerScore) => {
        return playerScore.playerName === payload.playerAnswering;
      });

      if (!playerScoreToChange) {
        console.error(
          'player not found, somethings gone wrong in state management'
        );
        return newState;
      }

      playerScoreToChange.score +=
        clueBeingAnswered.value * (Number(wasItCorrect) - 1) ||
        clueBeingAnswered.value;

      return newState;
    }
  )
);
