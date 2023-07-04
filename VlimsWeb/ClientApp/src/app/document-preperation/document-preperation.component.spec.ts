import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreperationComponent } from './document-preperation.component';

describe('DocumentPreperationComponent', () => {
  let component: DocumentPreperationComponent;
  let fixture: ComponentFixture<DocumentPreperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPreperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPreperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
