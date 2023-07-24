import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsLandingComponent } from './documents-landing.component';

describe('DocumentsLandingComponent', () => {
  let component: DocumentsLandingComponent;
  let fixture: ComponentFixture<DocumentsLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsLandingComponent]
    });
    fixture = TestBed.createComponent(DocumentsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
