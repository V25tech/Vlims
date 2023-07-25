import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRevisonComponent } from './document-revison.component';

describe('DocumentRevisonComponent', () => {
  let component: DocumentRevisonComponent;
  let fixture: ComponentFixture<DocumentRevisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRevisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRevisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
