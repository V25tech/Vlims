import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerHomeComponent } from './document-manager-home.component';

describe('DocumentManagerHomeComponent', () => {
  let component: DocumentManagerHomeComponent;
  let fixture: ComponentFixture<DocumentManagerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagerHomeComponent]
    });
    fixture = TestBed.createComponent(DocumentManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
