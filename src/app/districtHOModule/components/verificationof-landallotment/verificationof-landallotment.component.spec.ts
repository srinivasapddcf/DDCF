import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationofLandallotmentComponent } from './verificationof-landallotment.component';

describe('VerificationofLandallotmentComponent', () => {
  let component: VerificationofLandallotmentComponent;
  let fixture: ComponentFixture<VerificationofLandallotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationofLandallotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationofLandallotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
