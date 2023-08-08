import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRevisionRequestsComponent } from './document-revision.component';

describe('RequestsComponent', () => {
  let component: DocumentRevisionRequestsComponent;
  let fixture: ComponentFixture<DocumentRevisionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentRevisionRequestsComponent]
    });
    fixture = TestBed.createComponent(DocumentRevisionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
