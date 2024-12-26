import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationofLandallotmentAMCUComponent } from './verificationof-landallotment-amcu.component';

describe('VerificationofLandallotmentAMCUComponent', () => {
  let component: VerificationofLandallotmentAMCUComponent;
  let fixture: ComponentFixture<VerificationofLandallotmentAMCUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationofLandallotmentAMCUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationofLandallotmentAMCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
