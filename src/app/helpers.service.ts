import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullGame } from './interfaces/JeopardyBoard';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  private apiUrl = 'http://localhost:8999/';

  constructor(private http: HttpClient) {}

  getJeopardyGame(): Observable<FullGame> {
    return this.http.get(this.apiUrl) as Observable<FullGame>;
  }
}
