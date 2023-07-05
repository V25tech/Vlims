import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAdditionaltasksComponent } from './document-additionaltasks.component';

describe('DocumentAdditionaltasksComponent', () => {
  let component: DocumentAdditionaltasksComponent;
  let fixture: ComponentFixture<DocumentAdditionaltasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAdditionaltasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAdditionaltasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
