import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantComponent } from './contestant.component';

describe('ContestantComponent', () => {
  let component: ContestantComponent;
  let fixture: ComponentFixture<ContestantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestantComponent]
    });
    fixture = TestBed.createComponent(ContestantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
