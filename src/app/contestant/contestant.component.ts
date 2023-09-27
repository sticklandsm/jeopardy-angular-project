import { Component, Input } from '@angular/core';
import { PlayerScore } from '../interfaces/PlayerScores';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.css'],
})
export class ContestantComponent {
  @Input() namesAndScores: PlayerScore = { id: 0, name: '', score: 0 };
}
