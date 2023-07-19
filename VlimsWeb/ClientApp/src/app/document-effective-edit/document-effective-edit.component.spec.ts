import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEffectiveEditComponent } from './document-effective-edit.component';

describe('DocumentEffectiveEditComponent', () => {
  let component: DocumentEffectiveEditComponent;
  let fixture: ComponentFixture<DocumentEffectiveEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEffectiveEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEffectiveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
