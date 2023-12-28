import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientaccountComponent } from './patientaccount.component';

describe('PatientaccountComponent', () => {
  let component: PatientaccountComponent;
  let fixture: ComponentFixture<PatientaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
