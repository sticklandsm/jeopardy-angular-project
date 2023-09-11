import { Component } from '@angular/core';
import { HelpersService } from '../helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  gameToLoad: number = 0;
  constructor(
    private jeopardyService: HelpersService,
    private router: Router
  ) {}

  loadGame() {
    this.router.navigate(['/game', this.gameToLoad]);
  }

  async newGame() {
    this.jeopardyService.NewJeopardyGame().subscribe({
      next: (gameId) => {
        this.router.navigate(['/game', gameId]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
