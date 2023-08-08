import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeopardyBoardComponent } from './jeopardy-board.component';

describe('JeopardyBoardComponent', () => {
  let component: JeopardyBoardComponent;
  let fixture: ComponentFixture<JeopardyBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JeopardyBoardComponent]
    });
    fixture = TestBed.createComponent(JeopardyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
