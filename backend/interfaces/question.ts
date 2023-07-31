export interface Question {
  id: number;
  game_id: number;
  value: number;
  daily_double: boolean;
  round: string;
  category: string;
  clue: string;
  response: string;
}

// "id": 241903,
// "game_id": 4142,
// "value": 400,
// "daily_double": false,
// "round": "DJ!",
// "category": "“WH”AT IS IT?",
// "clue": "In a song from “Snow White”, it's what you do “while you work”",
// "response": "whistle"
