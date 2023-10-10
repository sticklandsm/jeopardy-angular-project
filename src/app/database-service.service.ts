import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullGame } from './interfaces/JeopardyBoard';
import { environment } from 'src/environments/environment';
import { PlayerScore } from './interfaces/PlayerScores';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJeopardyGame(
    gameId?: number
  ): Observable<{ game: FullGame; playerScores: PlayerScore[] }> {
    try {
      return this.http.get(this.apiUrl + 'game/' + gameId) as Observable<{
        game: FullGame;
        playerScores: PlayerScore[];
      }>;
    } catch (error) {
      console.error(error);
      return new Observable<{ game: FullGame; playerScores: PlayerScore[] }>();
    }
  }
  newJeopardyGame(): Observable<number> {
    try {
      return this.http.get(this.apiUrl + 'newGame') as Observable<number>;
    } catch (error) {
      console.error(error);
      return new Observable<500>();
    }
  }

  checkPlayerScore(
    gameId: number,
    playerName: string
  ): Observable<PlayerScore> {
    try {
      const player = this.http.get(
        this.apiUrl + 'game/' + gameId + '/playerAdded/' + playerName
      ) as Observable<PlayerScore>;
      return player;
    } catch (error) {
      console.error('error in checkPlayerScore: ', error);
      return new Observable<PlayerScore>();
    }
  }

  clueHasBeenAnswered(clueId: number): Observable<number> {
    try {
      return this.http.get(
        this.apiUrl + 'ClueAnswered/' + clueId
      ) as Observable<number>;
    } catch (error) {
      console.error(error);
      return new Observable<500>();
    }
  }
}
