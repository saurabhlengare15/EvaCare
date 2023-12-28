import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocregistrationComponent } from './docregistration.component';

describe('DocregistrationComponent', () => {
  let component: DocregistrationComponent;
  let fixture: ComponentFixture<DocregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocregistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
