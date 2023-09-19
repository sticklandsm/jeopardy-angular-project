import { Component } from '@angular/core';
import { DatabaseService } from '../database-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  gameToLoad: number | string = '';
  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  loadGame() {
    this.router.navigate(['/game', this.gameToLoad]);
  }

  async newGame() {
    this.databaseService.NewJeopardyGame().subscribe({
      next: (gameId: number) => {
        this.router.navigate(['/game', gameId]);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }
}
