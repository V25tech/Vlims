import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPrepationComponent } from './review-prepation.component';

describe('ReviewPrepationComponent', () => {
  let component: ReviewPrepationComponent;
  let fixture: ComponentFixture<ReviewPrepationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewPrepationComponent]
    });
    fixture = TestBed.createComponent(ReviewPrepationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
