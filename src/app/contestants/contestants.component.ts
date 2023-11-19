import { Component, Input } from '@angular/core';
import { PlayerScore } from '../interfaces/PlayerScores';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.css'],
})
export class ContestantsComponent {
  @Input() playerScores: PlayerScore[] = [
    { id: 1, name: 'Sean', score: 0, game_id: 1 },
    { id: 2, name: 'Raquel', score: 0, game_id: 1 },
    { id: 3, name: 'James', score: 0, game_id: 1 },
  ];

  @Input() currentPlayerName = '';
}
