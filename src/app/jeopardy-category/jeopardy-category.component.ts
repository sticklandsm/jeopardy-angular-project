import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../interfaces/JeopardyBoard';

@Component({
  selector: 'app-jeopardy-category',
  templateUrl: './jeopardy-category.component.html',
  styleUrls: ['./jeopardy-category.component.css'],
})
export class JeopardyCategoryComponent implements OnChanges {
  @Input() categoryIndex: number = 0;
  @Input() category: Category = { categoryName: '', clues: [] };
  @Input() currentPlayerName: string = '';

  ngOnChanges(changes: SimpleChanges): void {}

  configureFontSize(categoryName: string): string {
    const lengthOfCategory = categoryName.length;
    const amountOfSpaces = categoryName.split(' ').length;
    const avgLettersPerWord = lengthOfCategory / amountOfSpaces;
    if (avgLettersPerWord < 4) {
      return 1.9 + 'rem';
    }
    if (amountOfSpaces <= 3) {
      return 13 / avgLettersPerWord + 'rem';
    }
    return 8 / avgLettersPerWord + 'rem';
  }
}
