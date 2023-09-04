import { createReducer, on } from '@ngrx/store';
import { FullGame } from '../interfaces/JeopardyBoard';
import { setJeopardyGame, questionAnswered } from './current-game.action';

export interface currentGameState {
  game: FullGame;
  scores: number[];
}

export const initialState: currentGameState = {
  game: {
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
  scores: [],
};

export const jeopardyReducer = createReducer(
  initialState,
  on(setJeopardyGame, (state, { game }) => game),
  on(
    questionAnswered,
    (state, { column, row, doubleJeopardy, answerGiven, playerAnswering }) => {
      const newState = { ...state };

      //Gets the answer for jeopardy and doubleJeopardy and then extracts the correct one
      const clueBeinganswered = [
        newState.game.jeopardyRound[column].clues[row],
        newState.game.doubleJeopardyRound[column].clues[row],
      ][Number(doubleJeopardy)];

      const isItCorrect = clueBeinganswered.response === answerGiven;

      newState.scores[playerAnswering] +=
        clueBeinganswered.value * (Number(isItCorrect) - 1 || 1);

      clueBeinganswered.value = 0;

      return newState;
    }
  )
);
