import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRevisonRequestsComponent } from './document-revision.component';

describe('RequestsComponent', () => {
  let component: DocumentRevisonRequestsComponent;
  let fixture: ComponentFixture<DocumentRevisonRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentRevisonRequestsComponent]
    });
    fixture = TestBed.createComponent(DocumentRevisonRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
