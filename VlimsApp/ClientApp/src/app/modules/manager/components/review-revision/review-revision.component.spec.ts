import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRevisionComponent } from './review-revision.component';

describe('ReviewEffectiveComponent', () => {
  let component: ReviewRevisionComponent;
  let fixture: ComponentFixture<ReviewRevisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRevisionComponent]
    });
    fixture = TestBed.createComponent(ReviewRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
