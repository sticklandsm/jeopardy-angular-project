import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../interfaces/JeopardyBoard';

@Component({
  selector: 'app-jeopardy-category',
  templateUrl: './jeopardy-category.component.html',
  styleUrls: ['./jeopardy-category.component.css'],
})
export class JeopardyCategoryComponent implements OnChanges {
  @Input() category: Category = { categoryName: '', clues: [] };

  ngOnChanges(changes: SimpleChanges): void {}
}
