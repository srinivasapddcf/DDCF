import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusCheckComponent } from './payment-status-check.component';

describe('PaymentStatusCheckComponent', () => {
  let component: PaymentStatusCheckComponent;
  let fixture: ComponentFixture<PaymentStatusCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
