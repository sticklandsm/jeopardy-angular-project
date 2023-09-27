type JeopardyValue = 100 | 200 | 400 | 800 | 1000;
type DoubleJeopardyValue = 400 | 800 | 1200 | 1600 | 2000;

export interface Question {
  id: number;
  game_id: number;
  value: number;
  daily_double: boolean;
  round: string;
  category: string;
  clue: string;
  response: string;
  has_been_answered?: boolean;
}

export interface QuestionAnswered extends Question {
  playerId: number;
  playerName: string;
  responseCorrect: boolean;
  categoryIndex: number;
  clueIndex: number;
}

export interface Questions {
  data: Question[];
}

export interface Category {
  categoryName: string;
  clues: Question[];
}

export interface FullGame {
  gameId: Number;
  jeopardyRound: Category[];
  doubleJeopardyRound: Category[];
  finalJeopardy: FinalJeopardy;
}

export interface FinalJeopardy {
  id: number;
  answer: string;
  question: string;
  airdate: string;
  category: {
    title: string;
  };
}
