import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentPreperationComponent } from './add-document-preperation.component';

describe('AddDocumentPreperationComponent', () => {
  let component: AddDocumentPreperationComponent;
  let fixture: ComponentFixture<AddDocumentPreperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentPreperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentPreperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
