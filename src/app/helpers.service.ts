import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullGame } from './interfaces/JeopardyBoard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  private apiUrl = 'http://localhost:8999/';

  constructor(private http: HttpClient) {}

  getJeopardyGame(gameId?: number): Observable<FullGame> {
    return this.http.get(
      this.apiUrl + 'game/' + gameId
    ) as Observable<FullGame>;
  }
  NewJeopardyGame(): Observable<number> {
    return this.http.get(this.apiUrl + 'newGame') as Observable<number>;
  }
}
