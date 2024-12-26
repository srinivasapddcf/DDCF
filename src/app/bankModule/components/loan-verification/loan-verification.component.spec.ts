import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanVerificationComponent } from './loan-verification.component';

describe('LoanVerificationComponent', () => {
  let component: LoanVerificationComponent;
  let fixture: ComponentFixture<LoanVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
