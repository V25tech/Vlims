import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEffectiveComponent } from './document-effective.component';

describe('DocumentEffectiveComponent', () => {
  let component: DocumentEffectiveComponent;
  let fixture: ComponentFixture<DocumentEffectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentEffectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEffectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
