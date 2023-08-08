import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeopardyCardComponent } from './jeopardy-card.component';

describe('JeopardyCardComponent', () => {
  let component: JeopardyCardComponent;
  let fixture: ComponentFixture<JeopardyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JeopardyCardComponent]
    });
    fixture = TestBed.createComponent(JeopardyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
