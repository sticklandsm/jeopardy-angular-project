import questions from '../data/questions.json';
import { Question } from '../interfaces/question';

export function getAllQuestions() {
  return questions.data as Question[];
}

export function getRandomJeopardyRound(round: string): Question {
  let randomNum = generateRandom(questions.data.length - 1);
  let possibleQuestion = questions.data[randomNum];
  while (possibleQuestion.round !== round) {
    // console.log('Nope not that one: ', possibleQuestion);
    randomNum = generateRandom(questions.data.length - 1);
    possibleQuestion = questions.data[randomNum];
  }
  return possibleQuestion;
}

function generateRandom(maxLimit = 100) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}
