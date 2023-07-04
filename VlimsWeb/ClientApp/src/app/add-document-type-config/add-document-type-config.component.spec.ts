import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTypeConfigComponent } from './add-document-type-config.component';

describe('AddDocumentTypeConfigComponent', () => {
  let component: AddDocumentTypeConfigComponent;
  let fixture: ComponentFixture<AddDocumentTypeConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentTypeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
