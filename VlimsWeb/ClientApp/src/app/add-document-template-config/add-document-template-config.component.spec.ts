import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTemplateConfigComponent } from './add-document-template-config.component';

describe('AddDocumentTemplateConfigComponent', () => {
  let component: AddDocumentTemplateConfigComponent;
  let fixture: ComponentFixture<AddDocumentTemplateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentTemplateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentTemplateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
