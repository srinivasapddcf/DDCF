import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetailssubmitionComponent } from './paymentdetailssubmition.component';

describe('PaymentdetailssubmitionComponent', () => {
  let component: PaymentdetailssubmitionComponent;
  let fixture: ComponentFixture<PaymentdetailssubmitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdetailssubmitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdetailssubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
