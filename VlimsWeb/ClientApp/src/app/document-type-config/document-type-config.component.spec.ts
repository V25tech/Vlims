import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeConfigComponent } from './document-type-config.component';

describe('DocumentTypeConfigComponent', () => {
  let component: DocumentTypeConfigComponent;
  let fixture: ComponentFixture<DocumentTypeConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
