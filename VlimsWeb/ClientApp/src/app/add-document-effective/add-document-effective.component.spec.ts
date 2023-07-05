import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentEffectiveComponent } from './add-document-effective.component';

describe('AddDocumentEffectiveComponent', () => {
  let component: AddDocumentEffectiveComponent;
  let fixture: ComponentFixture<AddDocumentEffectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentEffectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentEffectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
