import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEffectiveComponent } from './review-effective.component';

describe('ReviewEffectiveComponent', () => {
  let component: ReviewEffectiveComponent;
  let fixture: ComponentFixture<ReviewEffectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewEffectiveComponent]
    });
    fixture = TestBed.createComponent(ReviewEffectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
