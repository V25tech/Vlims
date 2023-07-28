import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrintRequestComponent } from './new-print-request.component';

describe('NewPrintRequestComponent', () => {
  let component: NewPrintRequestComponent;
  let fixture: ComponentFixture<NewPrintRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrintRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrintRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
