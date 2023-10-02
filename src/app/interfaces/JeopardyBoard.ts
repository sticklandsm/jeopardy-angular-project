type JeopardyValue = 100 | 200 | 400 | 800 | 1000;
type DoubleJeopardyValue = 400 | 800 | 1200 | 1600 | 2000;

export interface Clue {
  id: number;
  value: number;
  daily_double: boolean;
  clue: string;
  response: string;
  has_been_answered: boolean;
  onScreenCurrently: boolean;
}

export interface ClueAnswered extends Clue {
  playerId: number;
  playerName: string;
  responseCorrect: boolean;
  categoryIndex: number;
  clueIndex: number;
}

export interface ClueSelected extends Clue {
  categoryIndex: number;
  clueIndex: number;
}

export interface Questions {
  data: Clue[];
}

export interface Category {
  categoryName: string;
  clues: Clue[];
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
