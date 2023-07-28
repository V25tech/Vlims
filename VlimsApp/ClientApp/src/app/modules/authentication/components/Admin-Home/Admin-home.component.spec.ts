import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMasterHomeComponent } from './document-master-home.component';

describe('DocumentMasterHomeComponent', () => {
  let component: DocumentMasterHomeComponent;
  let fixture: ComponentFixture<DocumentMasterHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentMasterHomeComponent]
    });
    fixture = TestBed.createComponent(DocumentMasterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
