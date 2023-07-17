import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentprepAddComponent } from './documentprep-add.component';

describe('DocumentprepAddComponent', () => {
  let component: DocumentprepAddComponent;
  let fixture: ComponentFixture<DocumentprepAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentprepAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentprepAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
