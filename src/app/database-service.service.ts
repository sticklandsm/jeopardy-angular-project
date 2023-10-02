import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullGame } from './interfaces/JeopardyBoard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJeopardyGame(gameId?: number): Observable<FullGame> {
    return this.http.get(
      this.apiUrl + 'game/' + gameId
    ) as Observable<FullGame>;
  }
  NewJeopardyGame(): Observable<number> {
    return this.http.get(this.apiUrl + 'newGame') as Observable<number>;
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
