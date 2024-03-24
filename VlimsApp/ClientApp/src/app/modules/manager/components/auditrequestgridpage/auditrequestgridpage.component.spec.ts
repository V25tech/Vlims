import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditrequestgridpageComponent } from './auditrequestgridpage.component';

describe('AuditrequestgridpageComponent', () => {
  let component: AuditrequestgridpageComponent;
  let fixture: ComponentFixture<AuditrequestgridpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditrequestgridpageComponent]
    });
    fixture = TestBed.createComponent(AuditrequestgridpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
