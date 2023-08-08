import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeopardyCategoryComponent } from './jeopardy-category.component';

describe('JeopardyCategoryComponent', () => {
  let component: JeopardyCategoryComponent;
  let fixture: ComponentFixture<JeopardyCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JeopardyCategoryComponent]
    });
    fixture = TestBed.createComponent(JeopardyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
